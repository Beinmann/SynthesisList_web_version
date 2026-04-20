# DQMJ2 Synthesis Tree

Interactive synthesis tree viewer for Dragon Quest Monsters: Joker 2. Search for any monster to see the full tree of parent combinations required to create it.

This is an adaptation of an older project: [github.com/Beinmann/SynthesisList](https://github.com/Beinmann/SynthesisList)

## Features

- **Search** for any monster by name with auto-completion and rank/type indicators.
- **Interactive tree** built with React Flow — pan, zoom, and click nodes to navigate.
- **Visual Indicators**:
    - **Color-coded Ranks**: Quickly identify monster rarity (F up to X).
    - **Monster Families**: Border colors indicate the family (Slime, Beast, Demon, etc.).
- **Cycle Recipes**: Many monsters have multiple ways to be created. Use the `‹` `›` buttons on a node to switch between alternative synthesis combinations.
- **Dynamic Navigation**:
    - Click any monster's name to **Make Root** and refocus the entire tree on that monster.
    - Deep trees are truncated for performance; a dashed line above a node indicates further parents exist.
- **Keyboard Shortcuts**:
    - `←` / `→` (Left/Right Arrow): Drill into the first or second ingredient of the current root.
    - `↓` (Down Arrow): Go back to the previous monster in your navigation history.
- **Adjustable Depth**: Control how many levels of the tree are shown (1–8, default 3).
- **Leaf Count**: Every node displays the total number of "base" monsters required to synthesize it, providing a sense of the total effort needed.

## Technical Details

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Visualization**: [React Flow (@xyflow/react)](https://reactflow.dev)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data**: Static TypeScript files containing ~2,300 monsters and ~3,100 recipes.

### Project Structure

```text
dqmj2_synthesis/
├── _components/            # React components
│   ├── _data/              # Static monster/recipe data
│   ├── MonsterNode.tsx     # Custom React Flow node for monsters
│   ├── MonsterSearch.tsx   # Search bar with suggestions
│   └── SynthesisViewer.tsx # Core graph logic and layout
├── page.tsx                # Main entry point
└── README.md               # You are here
```

## How it Works

The tree is built recursively based on the selected "Root" monster. Since many monsters in DQMJ2 have multiple synthesis recipes, the viewer defaults to the first available recipe but allows the user to cycle through alternatives.

The layout uses a custom hierarchical positioning algorithm to ensure nodes don't overlap while maintaining a clear "bottom-up" flow (results at the bottom, ingredients above).

## Data Source

Monster and recipe data were originally parsed from game FAQs and wikis. This project uses a cleaned-up version of the dataset used in the original [SynthesisList](https://github.com/Beinmann/SynthesisList) project.
