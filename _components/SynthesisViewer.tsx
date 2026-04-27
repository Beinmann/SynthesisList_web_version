'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  BaseEdge,
  getBezierPath,
  BackgroundVariant,
  type Node,
  type Edge,
  type EdgeProps,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import MonsterNode, { type MonsterNodeData } from './MonsterNode'
import MonsterSearch from './MonsterSearch'
import FeaturedMonsters from './FeaturedMonsters'
import GlobalEffortMap from './GlobalEffortMap'
import { monsterByName, recipesByResult } from './_data'
import type { Rank, MonsterType } from './_data'

const NODE_W = 200
const NODE_H = 160
const VIEW_PADDING = 24
// Phase 1 (parallel, t = 0..PAN_MS): camera pan + persistent-position RAF +
// exit fade-out for nodes/edges no longer in the new tree.
// Phase 2 (sequential, t = PAN_MS..PAN_MS + FADE_IN_MS): fresh nodes/edges
// fade in.
const PAN_MS = 350
const FADE_OUT_MS = 350
const FADE_IN_MS = 350
// Edges start fading in slightly before the fresh nodes they connect.
// The dark edge stroke against the near-black canvas is below visual
// threshold for a good chunk of its opacity ramp, whereas the bright
// node cards register almost immediately — without a head start the
// edges feel like they pop in noticeably after the nodes.
const EDGE_FADE_HEAD_START_MS = 120
// Fixed 4-level tree (depths 0..3): 1 + 2 + 4 + 8 = 15 slots. Every node
// reserves its canonical slot so the layout stays identical across
// navigations — gaps appear where a subtree is shorter, rather than sibling
// positions sliding horizontally to take up the slack.
const MAX_DEPTH = 3

// Canonical x for a node at (depth, slotK). Depth 0 centers on 0; at depth d
// a node occupies 2^(MAX_DEPTH - d) leaf-slots of width NODE_W.
function slotX(depth: number, slotK: number): number {
  const leafSlotsPerNode = 1 << (MAX_DEPTH - depth)
  const totalLeafSlots = 1 << MAX_DEPTH
  return (slotK + 0.5) * leafSlotsPerNode * NODE_W - (totalLeafSlots * NODE_W) / 2
}

const FlowingEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const isDashed = !!style.strokeDasharray

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={{ ...style, strokeWidth: 2, stroke: '#27272a' }} />
      {!isDashed && (
        <path
          d={edgePath}
          fill="none"
          stroke="url(#edge-gradient)"
          strokeWidth={2}
          strokeDasharray="10, 20"
          className="animate-flow"
        />
      )}
    </>
  )
}

const NODE_TYPES = {
  monster: MonsterNode,
}

const EDGE_TYPES = {
  flowing: FlowingEdge,
}

type NavEntry = { parent: string; isParent1: boolean; recipeIdx: number }
// What drove the upcoming rebuild. Consumed by the rebuild effect so
// persistent nodes can keep their rendered id (and thus CSS-transition their
// transform) across nav-forward / nav-back commits.
type NavAction =
  | { type: 'reset' }
  | { type: 'cycle' }
  | { type: 'fold' }
  | { type: 'nav-forward'; dir: 'p1' | 'p2'; prevRoot: string }
  | { type: 'nav-back'; prevRoot: string; newRoot: string; prevDir: 'p1' | 'p2' }
type Handlers = {
  onMakeRoot: (name: string) => void
  onCycleRecipe: (nodeId: string, dir: 1 | -1) => void
  onToggleFold: (name: string) => void
}

// Unbounded leaf count — monsters with no recipes are leaves.
// Base monsters (catchable) are also treated as leaves unless they are the root.
// Uses an ancestors set for cycle detection and a local memo.
function fullLeafCount(
  name: string,
  ancestors: Set<string>,
  recipeIndices: Record<string, number>,
  memo: Map<string, number>,
  isRoot: boolean = false
): number {
  const key = name.toLowerCase()
  if (ancestors.has(key)) return 0

  const monster = monsterByName.get(key)
  const isBase = (monster?.tags ?? ['base']).includes('base')

  if (isBase && !isRoot) return 1
  if (!isRoot && memo.has(key)) return memo.get(key)!

  const recipes = recipesByResult.get(key) ?? []
  if (recipes.length === 0) {
    if (!isRoot) memo.set(key, 1)
    return 1
  }

  ancestors.add(key)
  const idx = Math.min(recipeIndices[key] ?? 0, Math.max(0, recipes.length - 1))
  const r = recipes[idx]
  const n = fullLeafCount(r.parent1, ancestors, recipeIndices, memo, false) +
            fullLeafCount(r.parent2, ancestors, recipeIndices, memo, false)
  ancestors.delete(key)

  if (!isRoot) memo.set(key, n)
  return n
}

// Base monsters with recipes default to folded (they're catchable — no need
// to recurse); everything else defaults to unfolded. `foldedRecipes[key]`
// stores a user override that flips whichever default applies.
function foldedState(tags: readonly string[], userOverride: boolean): boolean {
  const isBase = tags.includes('base')
  return isBase ? !userOverride : userOverride
}

function buildGraph(
  rootName: string,
  recipeIndices: Record<string, number>,
  foldedRecipes: Record<string, boolean>,
  onMakeRoot: (name: string) => void,
  onCycleRecipe: (nodeId: string, dir: 1 | -1) => void,
  onToggleFold: (name: string) => void,
) {
  const leafMemo = new Map<string, number>()
  const nodes: Node<MonsterNodeData>[] = []
  // source = result monster, target = ingredient — lines flow upward from result (bottom) to ingredients (top)
  const edges: Edge[] = []
  const seen = new Set<string>()

  function visit(name: string, depth: number, slotK: number, resultId: string | null, edgeLabel: string | null) {
    if (depth > MAX_DEPTH) return
    const key = name.toLowerCase()
    const nodeId = edgeLabel ? `${edgeLabel}:${key}` : key

    if (!seen.has(nodeId)) {
      seen.add(nodeId)
      const monster = monsterByName.get(key)
      const recipes = recipesByResult.get(key) ?? []
      const recipeIndex = Math.min(recipeIndices[key] ?? 0, Math.max(0, recipes.length - 1))

      const tags = monster?.tags ?? ['base']
      const isRoot = depth === 0
      // Root always displays its recipe, so the fold override is ignored there.
      const isFolded = !isRoot && foldedState(tags, foldedRecipes[key] === true)

      nodes.push({
        id: nodeId,
        type: 'monster',
        data: {
          name: monster?.name ?? name,
          rank: (monster?.rank ?? '?') as Rank,
          type: (monster?.type ?? 'material') as MonsterType,
          tags,
          nodeId,
          recipeIndex,
          recipeCount: recipes.length,
          depth,
          truncated: (depth === MAX_DEPTH || isFolded) && recipes.length > 0,
          folded: isFolded,
          leafCount: fullLeafCount(name, new Set(), recipeIndices, leafMemo, isRoot),
          onMakeRoot,
          onCycleRecipe,
          onToggleFold,
        },
        position: { x: slotX(depth, slotK), y: -depth * NODE_H },
      })

      if (depth < MAX_DEPTH && recipes.length > 0 && !isFolded) {
        const r = recipes[recipeIndex]
        visit(r.parent1, depth + 1, slotK * 2, nodeId, `${nodeId}>p1`)
        visit(r.parent2, depth + 1, slotK * 2 + 1, nodeId, `${nodeId}>p2`)
      }
    }

    // Edge goes from result (below) up to ingredient (above)
    if (resultId && edgeLabel) {
      edges.push({
        id: edgeLabel,
        source: resultId,
        target: nodeId,
        type: 'flowing',
        style: { stroke: '#3f3f46' }
      })
    }
  }

  visit(rootName, 0, 0, null, null)
  return { nodes, edges }
}

// Append the context parent + sibling nodes and their edges. Pure: the resulting
// positions are in the same coord system as `laid` (root at y=0, parent ctx at y=NODE_H).
function injectContext(
  laid: Node<MonsterNodeData>[],
  edges: Edge[],
  root: string,
  navHistory: NavEntry[],
  recipeIndices: Record<string, number>,
  foldedRecipes: Record<string, boolean>,
  handlers: Handlers,
): { nodes: Node<MonsterNodeData>[]; edges: Edge[] } {
  const parentEntry = navHistory.length > 0 ? navHistory[navHistory.length - 1] : null
  if (!parentEntry) return { nodes: [...laid], edges: [...edges] }

  const { parent, recipeIdx, isParent1 } = parentEntry
  const parentKey = parent.toLowerCase()
  const parentRecipes = recipesByResult.get(parentKey) ?? []
  const safeIdx = Math.min(recipeIdx, Math.max(0, parentRecipes.length - 1))
  const parentMonster = monsterByName.get(parentKey)
  const rootNode = laid.find(n => n.id === root.toLowerCase())

  if (!rootNode) return { nodes: [...laid], edges: [...edges] }

  // Park the parent on the side opposite the descent direction, matching
  // the depth-1 slot offset (2 * NODE_W). Going into the right child
  // (isParent1=false) leaves the parent below-left; going into the left
  // child (isParent1=true) leaves it below-right. With this offset the
  // parent's world position equals where it sat as the previous root, so
  // it doesn't move during the transition — it just sits where it was
  // while the new focus rises into the centre.
  const parentX = rootNode.position.x + (isParent1 ? 2 * NODE_W : -2 * NODE_W)
  const parentY = rootNode.position.y + NODE_H

  const parentNodeId = `__ctx_parent__:${parentKey}`
  const memo = new Map<string, number>()
  const parentTags = parentMonster?.tags ?? ['base']
  const parentFolded = foldedState(parentTags, foldedRecipes[parentKey] === true)

  const allNodes: Node<MonsterNodeData>[] = [
    ...laid,
    {
      id: parentNodeId,
      type: 'monster',
      data: {
        name: parentMonster?.name ?? parent,
        rank: (parentMonster?.rank ?? '?') as Rank,
        type: (parentMonster?.type ?? 'material') as MonsterType,
        tags: parentTags,
        nodeId: parentNodeId,
        recipeIndex: safeIdx,
        recipeCount: 1,
        depth: 0,
        truncated: false,
        folded: parentFolded,
        leafCount: fullLeafCount(parent, new Set(), recipeIndices, memo, true),
        onMakeRoot: handlers.onMakeRoot,
        onCycleRecipe: handlers.onCycleRecipe,
        onToggleFold: handlers.onToggleFold,
      },
      position: { x: parentX, y: parentY },
    },
  ]

  const allEdges: Edge[] = [
    ...edges,
    {
      id: '__ctx_edge_root__',
      source: parentNodeId,
      target: root.toLowerCase(),
      type: 'flowing',
      style: { stroke: '#3f3f46' },
    },
  ]

  return { nodes: allNodes, edges: allEdges }
}

// One-shot pipeline used by both the main rebuild effect and the simulated
// layouts that nav handlers consult mid-pan.
function buildFullGraph(args: {
  root: string
  navHistory: NavEntry[]
  recipeIndices: Record<string, number>
  foldedRecipes: Record<string, boolean>
  handlers: Handlers
}): { nodes: Node<MonsterNodeData>[]; edges: Edge[] } {
  const { nodes, edges } = buildGraph(
    args.root,
    args.recipeIndices,
    args.foldedRecipes,
    args.handlers.onMakeRoot,
    args.handlers.onCycleRecipe,
    args.handlers.onToggleFold,
  )
  return injectContext(
    nodes,
    edges,
    args.root,
    args.navHistory,
    args.recipeIndices,
    args.foldedRecipes,
    args.handlers,
  )
}

// Translate each new node's `data.nodeId` to the canonical `data.nodeId` a
// previous node would have had if they represent the same spot in the recipe
// DAG. Used to look up the previous rendered id so React Flow can keep that
// element alive and CSS-transition its transform to the new position.
function matchKeyForAction(nid: string, action: NavAction): string {
  if (action.type === 'nav-forward') {
    const prevRootLc = action.prevRoot.toLowerCase()
    const dir = action.dir

    if (nid.startsWith('__ctx_parent__:')) {
      const key = nid.slice('__ctx_parent__:'.length)
      // New ctx parent = the root we just left.
      return key === prevRootLc ? prevRootLc : nid
    }
    // Tree node at path X in the new root's tree was at path prevRoot>dir:X
    // in the previous tree.
    return `${prevRootLc}>${dir}:${nid}`
  }

  if (action.type === 'nav-back') {
    const prevRootLc = action.prevRoot.toLowerCase()
    const newRootLc = action.newRoot.toLowerCase()
    const prevDir = action.prevDir
    const prevDirPrefix = `${newRootLc}>${prevDir}:`

    if (nid === newRootLc) return `__ctx_parent__:${newRootLc}`
    if (nid === `${prevDirPrefix}${prevRootLc}`) return prevRootLc
    if (nid.startsWith(`${prevDirPrefix}${prevRootLc}>`)) return nid.slice(prevDirPrefix.length)
    // Anything on the opposite side of the new root was never visible in the
    // prev tree (we no longer render a ctx sibling), so it's fresh.
    return nid
  }

  // reset / cycle / fold: direct match by data.nodeId.
  return nid
}

// Assign a stable React-Flow id to each new node. Persistent nodes inherit
// the previous render's id so React Flow recognises them as the same element
// and CSS can animate the transform to the new position. Fresh nodes get a
// newly-allocated sequential id from idCounterRef. Sequential ids avoid the
// collision the old path-based remap could hit when recipe cycles make the
// same canonical path string appear at different depths.
function assignNodeIds(
  newNodes: Node<MonsterNodeData>[],
  newEdges: Edge[],
  prevNodes: Node<MonsterNodeData>[],
  action: NavAction,
  idCounterRef: { current: number },
): { nodes: Node<MonsterNodeData>[]; edges: Edge[] } {
  const prevIdByCanonical = new Map<string, string>()
  for (const p of prevNodes) {
    if (p.data.phase === 'exiting') continue
    prevIdByCanonical.set(p.data.nodeId, p.id)
  }

  const idByNid = new Map<string, string>()
  for (const n of newNodes) {
    const nid = n.data.nodeId
    const key = matchKeyForAction(nid, action)
    const prev = prevIdByCanonical.get(key)
    if (prev !== undefined) {
      idByNid.set(nid, prev)
    } else {
      idCounterRef.current += 1
      idByNid.set(nid, `n${idCounterRef.current}`)
    }
  }

  const nodes = newNodes.map(n => ({ ...n, id: idByNid.get(n.data.nodeId)! }))
  const edges = newEdges.map(e => {
    const source = idByNid.get(e.source)!
    const target = idByNid.get(e.target)!
    return { ...e, source, target, id: `${source}->${target}` }
  })
  return { nodes, edges }
}

// Inverts a `cubic-bezier(0.45, 0, 0.2, 1)` curve at parameter t ∈ [0, 1] —
// matches the easing the previous CSS `transition: transform` rule used.
// Newton iteration to solve x(s) = t, then evaluate y(s).
function easeCss(t: number): number {
  if (t <= 0) return 0
  if (t >= 1) return 1
  const p1 = 0.45, p2 = 0.2
  let s = t
  for (let i = 0; i < 5; i++) {
    const omS = 1 - s
    const x = 3 * omS * omS * s * p1 + 3 * omS * s * s * p2 + s * s * s
    const dx = 3 * (omS * omS * p1 + 2 * omS * s * (p2 - p1) + s * s * (1 - p2))
    if (Math.abs(dx) < 1e-6) break
    s = Math.max(0, Math.min(1, s - (x - t) / dx))
  }
  const omS = 1 - s
  return 3 * omS * s * s + s * s * s
}

export default function SynthesisViewer() {
  const [root, setRoot] = useState<string | null>(null)
  const [recipeIndices, setRecipeIndices] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dqmj2_recipe_indices')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) { console.error('Failed to load recipe indices', e) }
      }
    }
    return {}
  })
  const [foldedRecipes, setFoldedRecipes] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('dqmj2_folded_recipes')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) { console.error('Failed to load folded recipes', e) }
      }
    }
    return {}
  })
  const [navHistory, setNavHistory] = useState<NavEntry[]>([])
  const [showEffortMap, setShowEffortMap] = useState(false)
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<MonsterNodeData>>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rfInstance = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pendingViewport = useRef<{ x: number; y: number; zoom: number } | null>(null)

  // Transition orchestration.
  // - offsetRef: world-space translation applied to every canonical position.
  //   Updated on each nav so the focal node stays anchored while the tree
  //   slides around it; rebuilds just add this to each canonical (x, y).
  // - navActionRef: what caused the upcoming rebuild. Consumed once by the
  //   effect and drives assignNodeIds so persistent nodes keep their rendered
  //   id (and thus CSS-transition) across commits.
  // - exitTimeoutRef: setTimeout that drops exiting ghost nodes after the fade.
  // - resetViewportRef: one-shot flag to run the default-viewport formula (search / make-root / initial).
  // - prevNodesRef: last committed set of non-exiting nodes, for diff-based exit fades and remap lookups.
  const offsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const navActionRef = useRef<NavAction>({ type: 'reset' })
  const exitTimeoutRef = useRef<number | null>(null)
  // Handle for the running position-interpolation RAF loop. We drive node
  // positions in JS (not via CSS `transition: transform`) so that React Flow
  // recomputes edge paths on every frame — otherwise edges would snap to the
  // new endpoints while the visual node is still mid-flight.
  const animRafRef = useRef<number | null>(null)
  // Full edge objects from the last commit. We diff against this to detect
  // exiting edges (in prev, not in new) and tag them with `exiting-edge` so
  // they fade out before being stripped via edgeCleanupTimeoutRef.
  const prevEdgesRef = useRef<Edge[]>([])
  // Strips exiting edges from the edges state after their fade-out completes.
  const edgeCleanupTimeoutRef = useRef<number | null>(null)
  const resetViewportRef = useRef<boolean>(true)
  const prevNodesRef = useRef<Node<MonsterNodeData>[]>([])
  // Monotonic counter for fresh React-Flow node ids. Using sequential ids
  // (rather than canonical path strings) guarantees a remapped id cannot
  // collide with a same-shape canonical id that appears somewhere else in
  // the new tree — which can happen when recipes form cycles.
  const idCounterRef = useRef<number>(0)

  // Mirror state into refs so nav handlers can read current values without
  // being re-memoized on every change. Handlers also write back to these
  // refs at call time, so rapid successive presses see consistent state even
  // before React has rendered the previous change.
  const rootRef = useRef(root)
  const navHistoryRef = useRef(navHistory)
  const recipeIndicesRef = useRef(recipeIndices)
  const foldedRecipesRef = useRef(foldedRecipes)
  useEffect(() => { rootRef.current = root }, [root])
  useEffect(() => { navHistoryRef.current = navHistory }, [navHistory])
  useEffect(() => { recipeIndicesRef.current = recipeIndices }, [recipeIndices])
  useEffect(() => { foldedRecipesRef.current = foldedRecipes }, [foldedRecipes])

  const handleMakeRoot = useCallback((name: string) => {
    rootRef.current = name
    navHistoryRef.current = []
    offsetRef.current = { x: 0, y: 0 }
    navActionRef.current = { type: 'reset' }
    resetViewportRef.current = true
    setRoot(name)
    setNavHistory([])
  }, [])

  const handleSelect = useCallback((name: string) => {
    rootRef.current = name
    navHistoryRef.current = []
    offsetRef.current = { x: 0, y: 0 }
    navActionRef.current = { type: 'reset' }
    resetViewportRef.current = true
    setRoot(name)
    setNavHistory([])
  }, [])

  const handleCycleRecipe = useCallback((nodeId: string, dir: 1 | -1) => {
    const key = nodeId.split(':').at(-1)!
    const recipes = recipesByResult.get(key) ?? []
    if (recipes.length < 2) return

    // No offset change — with canonical slot positions, the cycled node and
    // everything not in its subtree stays put. New subtree nodes fade in,
    // replaced ones fade out.
    navActionRef.current = { type: 'cycle' }
    const prev = recipeIndicesRef.current
    const cur = prev[key] ?? 0
    const next = { ...prev, [key]: (cur + dir + recipes.length) % recipes.length }
    recipeIndicesRef.current = next
    setRecipeIndices(next)
  }, [])

  const handleToggleFold = useCallback((name: string) => {
    const key = name.toLowerCase()
    const recipes = recipesByResult.get(key) ?? []
    if (recipes.length === 0) return

    navActionRef.current = { type: 'fold' }
    const prev = foldedRecipesRef.current
    const nextMap = { ...prev }
    if (nextMap[key]) delete nextMap[key]
    else nextMap[key] = true
    foldedRecipesRef.current = nextMap
    setFoldedRecipes(nextMap)
  }, [])

  const startCameraPan = useCallback((newRootWorld: { x: number; y: number }, hasParent: boolean) => {
    const rf = rfInstance.current
    const container = containerRef.current
    if (!rf || !container) return
    const { width, height } = container.getBoundingClientRect()
    const zoom = rf.getViewport().zoom || 1
    // After the commit the new root sits at newRootWorld; the visual bottom
    // of the tree is NODE_H below that (no parent ctx) or 2*NODE_H below
    // (parent ctx also rendered). Park that bottom at the usual padded
    // screen bottom so the landing spot matches a cold default.
    const bottomOffset = hasParent ? 2 * NODE_H : NODE_H
    const target = {
      x: width / 2 - (newRootWorld.x + NODE_W / 2) * zoom,
      y: height - VIEW_PADDING - (newRootWorld.y + bottomOffset) * zoom,
      zoom,
    }
    rf.setViewport(target, { duration: PAN_MS })
  }, [])

  const navigateToChild = useCallback((direction: 'left' | 'right') => {
    const currentRoot = rootRef.current
    if (!currentRoot) return
    const rootKey = currentRoot.toLowerCase()
    const recipes = recipesByResult.get(rootKey) ?? []
    const idx = recipeIndicesRef.current[rootKey] ?? 0
    const recipe = recipes[idx]
    if (!recipe) return
    const targetName = direction === 'left' ? recipe.parent1 : recipe.parent2

    // Focal = the depth-1 child we're diving into. Its canonical position is
    // slotX(1, dir-slot); in world coords it's canonical + current offset.
    // After the commit the new root lands at that world position, so the new
    // offset is exactly the focal's current world.
    const focalCanonical = { x: slotX(1, direction === 'left' ? 0 : 1), y: -NODE_H }
    const prevOffset = offsetRef.current
    const newOffset = {
      x: focalCanonical.x + prevOffset.x,
      y: focalCanonical.y + prevOffset.y,
    }

    const nextHistory: NavEntry[] = [
      ...navHistoryRef.current,
      { parent: currentRoot, isParent1: direction === 'left', recipeIdx: idx },
    ]

    rootRef.current = targetName
    navHistoryRef.current = nextHistory
    offsetRef.current = newOffset
    navActionRef.current = {
      type: 'nav-forward',
      dir: direction === 'left' ? 'p1' : 'p2',
      prevRoot: currentRoot,
    }

    setRoot(targetName)
    setNavHistory(nextHistory)

    startCameraPan(newOffset, nextHistory.length > 0)
  }, [startCameraPan])

  const navigateBack = useCallback(() => {
    const history = navHistoryRef.current
    if (history.length === 0) return
    const currentRoot = rootRef.current
    if (!currentRoot) return
    const prev = history[history.length - 1]
    const prevDir: 'p1' | 'p2' = prev.isParent1 ? 'p1' : 'p2'

    // The ctx parent currently sits offset to the side opposite the
    // descent direction (see injectContext). Mirror that here so the new
    // root lands on the parent's actual world position — keeping the
    // formerly-current node anchored in place during the back-nav.
    const sideOffset = prev.isParent1 ? 2 * NODE_W : -2 * NODE_W
    const prevOffset = offsetRef.current
    const newOffset = {
      x: prevOffset.x + sideOffset,
      y: prevOffset.y + NODE_H,
    }

    const nextHistory = history.slice(0, -1)
    const newRoot = prev.parent

    rootRef.current = newRoot
    navHistoryRef.current = nextHistory
    offsetRef.current = newOffset
    navActionRef.current = {
      type: 'nav-back',
      prevRoot: currentRoot,
      newRoot,
      prevDir,
    }

    setRoot(newRoot)
    setNavHistory(nextHistory)

    startCameraPan(newOffset, nextHistory.length > 0)
  }, [startCameraPan])

  useEffect(() => {
    if (Object.keys(recipeIndices).length > 0) {
      localStorage.setItem('dqmj2_recipe_indices', JSON.stringify(recipeIndices))
    }
  }, [recipeIndices])

  useEffect(() => {
    if (Object.keys(foldedRecipes).length > 0) {
      sessionStorage.setItem('dqmj2_folded_recipes', JSON.stringify(foldedRecipes))
    } else {
      sessionStorage.removeItem('dqmj2_folded_recipes')
    }
  }, [foldedRecipes])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); navigateToChild('left') }
      if (e.key === 'ArrowRight') { e.preventDefault(); navigateToChild('right') }
      if (e.key === 'ArrowDown')  { e.preventDefault(); navigateBack() }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigateToChild, navigateBack])

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current !== null) clearTimeout(exitTimeoutRef.current)
      if (animRafRef.current !== null) cancelAnimationFrame(animRafRef.current)
      if (edgeCleanupTimeoutRef.current !== null) clearTimeout(edgeCleanupTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!root) return
    const handlers: Handlers = {
      onMakeRoot: handleMakeRoot,
      onCycleRecipe: handleCycleRecipe,
      onToggleFold: handleToggleFold,
    }
    const built = buildFullGraph({ root, navHistory, recipeIndices, foldedRecipes, handlers })

    // Apply the current world offset to every canonical position.
    const offset = offsetRef.current
    const offsetNodes = built.nodes.map(n => ({
      ...n,
      position: { x: n.position.x + offset.x, y: n.position.y + offset.y },
    }))

    // Assign persistent React-Flow ids so the same element survives the
    // rebuild and CSS can transition its transform to the new position.
    // Fresh ids are sequential integers — never canonical path strings —
    // so a remapped id cannot accidentally equal a canonical id elsewhere
    // in the same render (which can happen when recipes cycle).
    const action = navActionRef.current
    navActionRef.current = { type: 'reset' }
    const { nodes: remappedNodes, edges: remappedEdges } = assignNodeIds(
      offsetNodes,
      built.edges,
      prevNodesRef.current,
      action,
      idCounterRef,
    )

    // Cancel any in-flight transitions; we'll start fresh ones below.
    if (animRafRef.current !== null) {
      cancelAnimationFrame(animRafRef.current)
      animRafRef.current = null
    }
    if (edgeCleanupTimeoutRef.current !== null) {
      clearTimeout(edgeCleanupTimeoutRef.current)
      edgeCleanupTimeoutRef.current = null
    }

    // Exiting nodes: previously rendered, not in the new set. Marked with
    // phase='exiting' so MonsterNode's Tailwind transition fades opacity to 0.
    const prevCommitted = prevNodesRef.current
    const newIds = new Set(remappedNodes.map(n => n.id))
    const exiting: Node<MonsterNodeData>[] = prevCommitted
      .filter(n => n.data.phase !== 'exiting' && !newIds.has(n.id))
      .map(n => ({ ...n, data: { ...n.data, phase: 'exiting' as const } }))

    // Exiting edges: previously rendered, not in remappedEdges. Tagged with
    // className 'exiting-edge' so CSS fades opacity 1→0; stripped from state
    // by edgeCleanupTimeoutRef after FADE_OUT_MS.
    const newEdgeIds = new Set(remappedEdges.map(e => e.id))
    const exitingEdges: Edge[] = prevEdgesRef.current
      .filter(e => !newEdgeIds.has(e.id))
      .map(e => ({ ...e, className: 'exiting-edge' }))

    // Persistent-node FROM positions: same React-Flow id, last-rendered pos.
    const prevPosByRfId = new Map<string, { x: number; y: number }>()
    for (const p of prevCommitted) {
      if (p.data.phase === 'exiting') continue
      prevPosByRfId.set(p.id, p.position)
    }

    // Per-node animation table for phase 1 movement (only persistent nodes
    // that actually move).
    const animations: Array<{ id: string; from: { x: number; y: number }; to: { x: number; y: number } }> = []
    for (const n of remappedNodes) {
      const from = prevPosByRfId.get(n.id)
      if (!from) continue
      if (from.x === n.position.x && from.y === n.position.y) continue
      animations.push({ id: n.id, from, to: n.position })
    }

    // Tag fresh nodes/edges with className so CSS fade-in only fires on them.
    // Persistent elements never carry a fresh-* class, so changes to the
    // wrapper's --fade-in-delay variable can't re-trigger their animations.
    const taggedNodes: Node<MonsterNodeData>[] = remappedNodes.map(n => {
      if (prevPosByRfId.has(n.id)) return n
      return { ...n, className: 'fresh-node' }
    })
    const taggedEdges: Edge[] = remappedEdges.map(e => {
      if (prevEdgesRef.current.some(p => p.id === e.id)) return e
      return { ...e, className: 'fresh-edge' }
    })

    // Initial commit: persistent at FROM, fresh at canonical. Persistent
    // moves from FROM to canonical via RAF (phase 1, parallel to camera pan
    // and fade-out). Fresh stays invisible until the CSS animation-delay
    // elapses (phase 2).
    const initialNodes: Node<MonsterNodeData>[] = taggedNodes.map(n => {
      const from = prevPosByRfId.get(n.id)
      return from ? { ...n, position: from } : n
    })

    // Fresh fade-in waits for the position-move phase to settle. If there
    // are no moves (initial render, cycle, fold), fresh fades in immediately.
    // Fresh edges get a head start so they cross the visual threshold around
    // the same time the fresh nodes do (see EDGE_FADE_HEAD_START_MS).
    const fadeInDelayMs = animations.length > 0 ? PAN_MS : 0
    const edgeFadeInDelayMs = Math.max(0, fadeInDelayMs - EDGE_FADE_HEAD_START_MS)
    if (containerRef.current) {
      containerRef.current.style.setProperty('--fade-in-delay', `${fadeInDelayMs}ms`)
      containerRef.current.style.setProperty('--edge-fade-in-delay', `${edgeFadeInDelayMs}ms`)
    }

    setNodes([...initialNodes, ...exiting])
    setEdges([...taggedEdges, ...exitingEdges])
    prevEdgesRef.current = remappedEdges
    prevNodesRef.current = initialNodes

    // Strip exiting edges after their fade-out keyframe completes.
    if (exitingEdges.length > 0) {
      const exitingEdgeIds = new Set(exitingEdges.map(e => e.id))
      edgeCleanupTimeoutRef.current = window.setTimeout(() => {
        edgeCleanupTimeoutRef.current = null
        setEdges(curr => curr.filter(e => !exitingEdgeIds.has(e.id)))
      }, FADE_OUT_MS)
    }

    if (animations.length > 0) {
      let working: Node<MonsterNodeData>[] = initialNodes
      let startedAt: number | null = null
      const tick = (now: number) => {
        if (startedAt === null) startedAt = now
        const t = Math.min(1, (now - startedAt) / PAN_MS)
        const eased = easeCss(t)
        const updated = new Map<string, { x: number; y: number }>()
        for (const a of animations) {
          updated.set(a.id, {
            x: a.from.x + (a.to.x - a.from.x) * eased,
            y: a.from.y + (a.to.y - a.from.y) * eased,
          })
        }
        working = working.map(n => {
          const u = updated.get(n.id)
          return u ? { ...n, position: u } : n
        })
        prevNodesRef.current = working
        const workingById = new Map(working.map(n => [n.id, n]))
        setNodes(curr => curr.map(n => {
          if (n.data.phase === 'exiting') return n
          const w = workingById.get(n.id)
          return w ?? n
        }))
        if (t < 1) {
          animRafRef.current = requestAnimationFrame(tick)
        } else {
          animRafRef.current = null
        }
      }
      animRafRef.current = requestAnimationFrame(tick)
    }

    if (exitTimeoutRef.current !== null) clearTimeout(exitTimeoutRef.current)
    if (exiting.length > 0) {
      exitTimeoutRef.current = window.setTimeout(() => {
        setNodes(curr => curr.filter(n => n.data.phase !== 'exiting'))
        exitTimeoutRef.current = null
      }, FADE_OUT_MS)
    }

    // Viewport. For nav the camera pan was started in the handler alongside
    // the state update so the camera and the node-transform transitions run
    // in lockstep. Cycle/fold don't move the camera. Reset only on a true
    // change of context: search, make-root, or initial.
    if (resetViewportRef.current) {
      resetViewportRef.current = false
      const container = containerRef.current
      if (!container) return
      const rootNode = remappedNodes.find(n => n.data.nodeId === root.toLowerCase())
      if (!rootNode) return
      const { width, height } = container.getBoundingClientRect()
      const levelsToShow = 5
      const defaultZoom = Math.min(1, (height - VIEW_PADDING * 2) / (levelsToShow * NODE_H))
      const hasParent = navHistory.length > 0
      const bottomY = hasParent ? 2 * NODE_H : NODE_H
      const vp = {
        x: width / 2 - (rootNode.position.x + NODE_W / 2) * defaultZoom,
        y: height - bottomY * defaultZoom - VIEW_PADDING,
        zoom: defaultZoom,
      }
      const rf = rfInstance.current
      if (rf) {
        rf.setViewport(vp, { duration: 300 })
      } else {
        pendingViewport.current = vp
      }
    }
  }, [root, recipeIndices, foldedRecipes, navHistory, handleMakeRoot, handleCycleRecipe, handleToggleFold, setNodes, setEdges])

  // Only computed when the effort map is visible — keeps the toggled-off case
  // free. Derived from buildGraph (no handlers needed), not from `nodes`, so
  // animation-frame mutations of `nodes` don't churn this set.
  const visibleNodeIds = useMemo(() => {
    if (!showEffortMap || !root) return new Set<string>()
    const noop = () => {}
    const built = buildGraph(root, recipeIndices, foldedRecipes, noop, noop, noop)
    const s = new Set<string>()
    for (const n of built.nodes) s.add(n.data.nodeId)
    return s
  }, [showEffortMap, root, recipeIndices, foldedRecipes])

  return (
    <div className="flex flex-col gap-4 relative">
      <style jsx global>{`
        @keyframes flow {
          from { stroke-dashoffset: 300; }
          to { stroke-dashoffset: 0; }
        }
        .animate-flow {
          animation: flow 10s linear infinite;
        }
        @keyframes dq-node-appear {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes dq-edge-appear {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes dq-edge-fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        /* Fade-in rules apply ONLY to fresh elements (tagged in JS at render
           time). Persistent elements never carry these classes, so a change
           to --fade-in-delay cannot re-trigger their animation. fill-mode
           backwards keeps the element at opacity 0 during the delay window. */
        .react-flow__node.fresh-node {
          animation: dq-node-appear ${FADE_IN_MS}ms ease-out var(--fade-in-delay, 0ms) backwards;
        }
        .react-flow__edge.fresh-edge {
          animation: dq-edge-appear ${FADE_IN_MS}ms ease-out var(--edge-fade-in-delay, 0ms) backwards;
        }
        .react-flow__edge.exiting-edge {
          animation: dq-edge-fade-out ${FADE_OUT_MS}ms ease-out forwards;
        }
        .react-flow__controls {
          box-shadow: none !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          background: rgba(24, 24, 27, 0.8) !important;
          backdrop-filter: blur(8px);
          border-radius: 8px !important;
          overflow: hidden;
        }
        .react-flow__controls-button {
          border-bottom: 1px solid rgba(255,255,255,0.1) !important;
          fill: #a1a1aa !important;
        }
        .react-flow__controls-button:hover {
          background: rgba(255,255,255,0.05) !important;
        }
      `}</style>

      <div ref={containerRef} className="relative rounded-3xl border border-white/5 bg-zinc-950 overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]" style={{ height: 700 }}>
        {root ? (
          <>
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-4 pointer-events-none">
              <div className="pointer-events-auto">
                <MonsterSearch onSelect={handleSelect} />
              </div>
            </div>

            {(() => {
              const rootKey = root.toLowerCase()
              const recipes = recipesByResult.get(rootKey) ?? []
              const idx = Math.min(recipeIndices[rootKey] ?? 0, Math.max(0, recipes.length - 1))
              const recipe = recipes[idx]
              const leftName = recipe?.parent1
              const rightName = recipe?.parent2
              const backName = navHistory.at(-1)?.parent
              const cellClass = "group flex flex-col items-center gap-1 px-4 py-2 min-w-[88px] hover:bg-white/10 disabled:hover:bg-transparent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              return (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-auto">
                  <div className="flex bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-xl overflow-hidden divide-x divide-white/10">
                    <button
                      onClick={() => navigateToChild('left')}
                      disabled={!leftName}
                      title={leftName ? `Go to ${leftName}` : 'No recipe'}
                      className={cellClass}
                    >
                      <svg className="w-4 h-4 text-zinc-400 group-enabled:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19L3 12m0 0l7-7m-7 7h18" />
                      </svg>
                      <span className="text-[10px] text-zinc-200 font-medium truncate max-w-[80px] leading-none">{leftName ?? '—'}</span>
                    </button>
                    <button
                      onClick={navigateBack}
                      disabled={!backName}
                      title={backName ? `Back to ${backName}` : 'No history'}
                      className={cellClass}
                    >
                      <svg className="w-4 h-4 text-zinc-400 group-enabled:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      <span className="text-[10px] text-zinc-200 font-medium truncate max-w-[80px] leading-none">{backName ?? 'Back'}</span>
                    </button>
                    <button
                      onClick={() => navigateToChild('right')}
                      disabled={!rightName}
                      title={rightName ? `Go to ${rightName}` : 'No recipe'}
                      className={cellClass}
                    >
                      <svg className="w-4 h-4 text-zinc-400 group-enabled:group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span className="text-[10px] text-zinc-200 font-medium truncate max-w-[80px] leading-none">{rightName ?? '—'}</span>
                    </button>
                  </div>
                </div>
              )
            })()}

            <div className="absolute top-6 right-6 z-10 flex flex-col items-end gap-3 pointer-events-none">
              <div className="text-right">
                <div className="text-xs font-black text-white/20 uppercase tracking-[0.2em] mb-1">DQMJ2 Synthesis</div>
                <div className="text-[10px] font-medium text-zinc-600">Experimental Protocol v2.0</div>
              </div>
              <button
                onClick={() => setShowEffortMap(s => !s)}
                title={showEffortMap ? 'Hide effort map' : 'Show effort map'}
                className="pointer-events-auto flex items-center gap-1.5 bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-lg px-2.5 py-1.5 text-[10px] uppercase tracking-widest text-zinc-300 hover:text-white transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M3 12h18M3 20h18" />
                </svg>
                <span>Effort Map</span>
                <span className="text-zinc-500">{showEffortMap ? '−' : '+'}</span>
              </button>
              {showEffortMap && (
                <div className="pointer-events-auto">
                  <GlobalEffortMap
                    rootName={root}
                    recipeIndices={recipeIndices}
                    visibleNodeIds={visibleNodeIds}
                  />
                </div>
              )}
            </div>

            <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
              <defs>
                <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3f3f46" stopOpacity="0" />
                  <stop offset="50%" stopColor="#a1a1aa" stopOpacity="1" />
                  <stop offset="100%" stopColor="#3f3f46" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={NODE_TYPES}
              edgeTypes={EDGE_TYPES}
              onInit={inst => {
                rfInstance.current = inst
                if (pendingViewport.current) {
                  inst.setViewport(pendingViewport.current)
                  pendingViewport.current = null
                }
              }}
              colorMode="dark"
              proOptions={{ hideAttribution: true }}
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={24}
                size={1}
                color="#27272a"
                style={{ backgroundColor: '#09090b' }}
              />
              <Controls position="bottom-right" showInteractive={false} />
            </ReactFlow>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-[#09090b] px-6 overflow-y-auto">
            <div className="w-72">
              <MonsterSearch onSelect={handleSelect} />
            </div>
            <p className="mt-4 text-zinc-600 text-sm font-medium">
              Search for a monster to begin the synthesis sequence
            </p>
            <FeaturedMonsters onSelect={handleSelect} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-[10px] text-zinc-600 font-medium flex items-center gap-3">
          <span className="flex items-center gap-1"><kbd className="bg-zinc-800 px-1 rounded border border-white/5 text-zinc-400">←</kbd> <kbd className="bg-zinc-800 px-1 rounded border border-white/5 text-zinc-400">→</kbd> Navigate</span>
          <span className="flex items-center gap-1"><kbd className="bg-zinc-800 px-1 rounded border border-white/5 text-zinc-400">↓</kbd> Back</span>
          <span className="flex items-center gap-1"><kbd className="bg-zinc-800 px-1 rounded border border-white/5 text-zinc-400">‹</kbd> <kbd className="bg-zinc-800 px-1 rounded border border-white/5 text-zinc-400">›</kbd> Cycle</span>
        </p>
        <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest">
          Synthesized by Junie
        </p>
      </div>
    </div>
  )
}
