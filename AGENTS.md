# dqmj2_synthesis — agent guide

Start by reading `README.md` for the product view (features, keyboard shortcuts, layout algorithm). This file covers the parts that aren't obvious from code or README: data shape, invariants, where things are wired together, and how to extend cleanly without entangling experiments.

---

# File map

```
dqmj2_synthesis/
├── _components/
│   ├── _data/
│   │   ├── monsters.ts          # ~2.3k monster records + type unions (large)
│   │   ├── recipes.ts           # ~3.1k recipes (large)
│   │   └── index.ts             # builds monsterByName / recipesByResult lookup maps
│   ├── SynthesisViewer.tsx      # core: graph build, layout, state, keyboard, viewport
│   ├── SynthesisViewerLoader.tsx# dynamic() wrapper so @xyflow/react is client-only
│   ├── MonsterNode.tsx          # React Flow custom node
│   ├── MonsterSearch.tsx        # search box + suggestion list
│   ├── MonsterTypeIcon.tsx      # per-type SVG icon + color
│   └── MonsterTagIcon.tsx       # per-tag SVG icon + color
├── page.tsx                     # renders SynthesisViewerLoader
└── README.md
```

**Do not read `monsters.ts` or `recipes.ts` in full.** They are data, not logic — ~9.5k lines combined. Read the type declarations at the top of `monsters.ts` and `recipes.ts` and the first few records if you need a sample. The Map-based accessors live in `_data/index.ts` and that's the surface code should use.

---

# Data shape & invariants

Types (in `_data/monsters.ts` and `recipes.ts`):

```ts
type Rank = 'X' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
type MonsterType = 'slime' | 'nature' | 'material' | 'dragon' | 'undead' | 'demon' | 'incarnus' | 'beast'
type MonsterTag = 'base' | 'synth' | 'special'
interface Monster { name: string; type: MonsterType; rank: Rank; tags: MonsterTag[] }
interface Recipe  { result: string; parent1: string; parent2: string }
```

**All map lookups use `name.toLowerCase()` as the key.** `monsterByName` and `recipesByResult` are keyed by lowercase. Source data casing is inconsistent (mixed title-case and lowercase in `recipes.ts`) — never look up by raw name, always lowercase first.

**`tags` is authoritative for tree semantics.** `base` means catchable/terminal (stops recursion, counts as 1 leaf). `synth` means obtainable via synthesis. `special` marks scripted/unique. `fullLeafCount` treats `base` as a leaf unless it's the current root. If you add a new tag with tree-stopping semantics, update `fullLeafCount` and the `stopAtBase` check in `buildGraph`.

---

# SynthesisViewer — what's where

`SynthesisViewer.tsx` is one 600-line file on purpose; splitting it would add prop-drilling across layout, state, keyboard, and viewport concerns that all coordinate in one effect. Don't split it unless you have a clean seam.

Logical sections, top-to-bottom:
- **Edge / node type defs** — `FlowingEdge` (animated bezier), `ContextSiblingNode` (zero-height handle-only anchor).
- **`fullLeafCount(name, ancestors, recipeIndices, memo, isRoot)`** — recursive leaf counter with cycle-break via ancestors set and a memo. `isRoot=true` forces recursion even into base monsters.
- **`buildGraph(rootName, recipeIndices, maxDepth, onMakeRoot, onCycleRecipe)`** — DFS from root, emits nodes + edges. `nodeId` is either the lowercase monster name (root) or `${parentEdgeLabel}:${key}` for descendants — this is how the same monster appearing twice gets distinct nodes. Edges go source=result → target=ingredient (i.e. bottom to top visually).
- **`layoutNodes(nodes, edges)`** — BFS for y-depth, post-order x assignment so each result centers under its ingredients.
- **`SynthesisViewer` component** — state, effects, keyboard, context-sibling injection, viewport control.

**State owned by the component:**
- `root: string | null` — current root monster name (title case).
- `recipeIndices: Record<string, number>` — keyed by lowercase name, persisted to `localStorage['dqmj2_recipe_indices']` (survives tab close / reopen).
- `foldedRecipes: Record<string, boolean>` — keyed by lowercase name, persisted to `sessionStorage['dqmj2_folded_recipes']` (intentionally per-tab; a closed tab forgets folds). Folding stops recursion in `buildGraph` (same branch as `stopAtBase` / `maxDepth`) and renders the node as truncated. Applies to any occurrence of that monster in the tree, not just the root.
- `navHistory: NavEntry[]` — drill-down stack; each entry remembers parent + which side + which recipe index was used.
- `maxDepth: number` — 1–8.
- React Flow's own `nodes`/`edges` state (via `useNodesState`/`useEdgesState`).

**Context-sibling injection:** when `navHistory` is non-empty, the main effect adds two synthetic nodes (`__ctx_parent__`, `__ctx_sibling__`) and two edges so the user sees where they came from. Any code that walks `nodes` and assumes nodeIds are monster keys must handle these two ids.

**Viewport control is manual.** `fitView` is not used — the effect computes a viewport that places the root near the bottom with room above. Zoom is only reset when `root` changes; cycling a recipe keeps the current zoom. If you add a new trigger that should reset zoom, update the `isNewRoot` check.

---

# Gotchas

**Phaser-style "update every switch"** — these unions and records must stay in sync; nothing enforces exhaustiveness at runtime:
- `MonsterType` union ↔ `icons`/`colors` in `MonsterTypeIcon.tsx` (missing entry silently falls back to `???`, masking typos).
- `MonsterTag` union ↔ `icons`/`colors` in `MonsterTagIcon.tsx` (no fallback — missing entry renders nothing).
- `Rank` union ↔ `rankColors` in `MonsterNode.tsx` (falls back to a neutral gradient).
- `MonsterTag` ↔ `fullLeafCount` / `buildGraph` tree-termination logic.

**`nodeId` parsing** — `handleCycleRecipe` recovers the monster key via `nodeId.split(':').at(-1)!`. If you change the nodeId format in `buildGraph`, this breaks silently (wrong recipe cycles).

**Context nodes are not monsters.** `__ctx_parent__` and `__ctx_sibling__` have `type: 'monster'` and `type: 'contextSibling'` respectively. Don't filter by `.type === 'monster'` and assume every result is a real graph node — the parent context node passes that filter. The "{N} monsters" counter in the top-left currently does this; adjust if it becomes misleading.

**`SynthesisViewerLoader` exists for a reason.** `@xyflow/react` + this file's sessionStorage access are client-only. `page.tsx` imports the loader, which `dynamic(..., { ssr: false })`s the viewer. Do not import `SynthesisViewer` directly into a server component.

**Persistence schema is uncommitted.** `localStorage['dqmj2_recipe_indices']` is a flat `{ [lowercaseName]: number }` (persists across sessions). `sessionStorage['dqmj2_folded_recipes']` is a flat `{ [lowercaseName]: true }` (per-tab; entries are deleted when toggled off, and the key is removed entirely when the map empties). If you change either shape (e.g. to version it), guard the parse — currently a malformed value is caught and logged but returns `{}`.

**Base monsters as root.** `fullLeafCount(name, ..., isRoot=true)` intentionally recurses through a base monster when it's the root — otherwise the root would always report 1 leaf. The `stopAtBase` gate in `buildGraph` has the matching `!isRoot` carve-out. Keep these two in lockstep.

---

# How to add X

**A new monster type** (e.g. `'machine'`):
1. Add to the `MonsterType` union in `_data/monsters.ts`.
2. Add an entry to `icons` and `colors` in `MonsterTypeIcon.tsx`.
3. Data records using the new type will then type-check.

**A new monster tag** (e.g. `'legendary'`):
1. Add to the `MonsterTag` union in `_data/monsters.ts`.
2. Add an entry to `icons` and `colors` in `MonsterTagIcon.tsx`.
3. Decide leaf semantics: if the tag should stop recursion like `'base'`, update `fullLeafCount` and `buildGraph`'s `stopAtBase` logic. If it's cosmetic, no further changes.

**A new rank** (e.g. `'SS'`):
1. Add to the `Rank` union.
2. Add a gradient class to `rankColors` in `MonsterNode.tsx`.

**A new viewer control** (e.g. a toggle, a filter):
1. Add state in `SynthesisViewer`.
2. Render it inside the "Viewer Controls" div (top-left overlay).
3. Add the state to the main `useEffect` deps if it affects graph build/layout/viewport.
4. If it affects graph content, thread it through `buildGraph` as a parameter — don't read it from a ref inside.

**A new keyboard shortcut:** add a branch to the keydown `useEffect`. Remember to `e.preventDefault()` for arrow keys to avoid page scroll.

**A new data field on Monster / Recipe:**
1. Extend the interface in `_data/monsters.ts` or `recipes.ts`.
2. Update every data record (the files are large — consider a script).
3. Surface it through `MonsterNodeData` if the UI needs it; update `buildGraph` to populate the field.

---

# Experimental surface

Nothing is currently flagged experimental — the viewer as-is is the load-bearing shape.

When adding an experiment, prefer this pattern so it stays prunable:
- Put it in its own file under `_components/` (or a `_components/experimental/` folder if it gets crowded).
- Wire it into `SynthesisViewer.tsx` at exactly one call site.
- Add a line to this section: `- **X** (file): what it tries, what would promote it or kill it.`

Update this section and remove it from the list when an experiment is either promoted (move it into the main description above) or pruned (delete the file + one import).

---

# Verification

- `npm run build` must pass with zero type errors before any task is complete. Run it from the repo root.
- For UI changes, run the dev server and verify in a browser — type-checking does not catch layout regressions, stale viewport math, or broken recipe cycling.
