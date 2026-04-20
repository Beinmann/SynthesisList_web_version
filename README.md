# DQMJ2 Synthesis Tree

Interactive synthesis tree viewer for Dragon Quest Monsters: Joker 2. Search for any monster to see the full tree of parent combinations required to create it.

This is an adaptation of an older project: [github.com/Beinmann/SynthesisList](https://github.com/Beinmann/SynthesisList)

## Features

- **Search** for any monster by name
- **Interactive tree** built with React Flow — pan, zoom, and click nodes
- **Cycle recipes** — use ‹ › on a node to switch between alternative synthesis combinations
- **Keyboard navigation** — `←` `→` drill into ingredients, `↓` go back
- **Adjustable depth** — control how many levels of the tree are shown (1–8, default 3)
- **Context nodes** — when navigating into an ingredient, the parent and sibling are shown for reference

## Tech

- [React Flow (@xyflow/react)](https://reactflow.dev) for the graph
- Monster and recipe data in `_components/_data/`
