# Synthesis Matrix

Interactive synthesis tree viewer for Dragon Quest Monsters: Joker 2. Analyze monster origins, explore recursive parent trees, and discover hidden recipes in an interactive graph.

This is an adaptation of an older project: [github.com/Beinmann/SynthesisList](https://github.com/Beinmann/SynthesisList)

## Features

- **Search** for any monster by name with auto-completion and rank/type indicators.
- **Interactive Graph** built with React Flow — pan, zoom, and click nodes to navigate.
- **Visual Intelligence**:
    - **Color-coded Ranks**: Quickly identify monster rarity from F up to X.
    - **Family & Icons**: Custom icons and border colors indicate monster families (Slime, Beast, Demon, etc.).
- **Recipe Cycling**: Many monsters have multiple ways to be created. Use the `‹` `›` buttons on a node to switch between alternative synthesis combinations.
- **Dynamic Navigation**:
    - Click any monster's name to **Make Root** and refocus the entire tree on that monster.
    - Deep trees are truncated for performance; a dashed line above a node indicates further parents exist.
- **Keyboard Shortcuts**:
    - `←` / `→` (Left/Right Arrow): Drill into the first or second ingredient of the current root.
    - `↓` (Down Arrow): Go back to the previous monster in your navigation history.
- **Adjustable Depth**: Control how many levels of the tree are shown (1–8, default 3) using viewer controls.
- **Effort Metrics**: Every node displays a "Leaf Count" — the total number of "base" (catchable) monsters required to synthesize it.

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
│   ├── MonsterTagIcon.tsx  # SVG icons for monster tags/families
│   ├── MonsterTypeIcon.tsx # SVG icons for monster types
│   ├── SynthesisViewer.tsx # Core graph logic and layout
│   └── SynthesisViewerLoader.tsx # Loading state for the viewer
├── page.tsx                # Main entry point
└── README.md               # Documentation
```

## How it Works

The tree is built recursively based on the selected "Root" monster. Since many monsters in DQMJ2 have multiple synthesis recipes, the viewer defaults to the first available recipe but allows the user to cycle through alternatives.

The layout uses a custom hierarchical positioning algorithm to ensure nodes don't overlap while maintaining a clear "bottom-up" flow (ingredients at the top, results at the bottom).

## Data Source

Monster and recipe data were originally parsed from game FAQs and wikis. This project uses a cleaned-up version of the dataset used in the original [SynthesisList](https://github.com/Beinmann/SynthesisList) project.
