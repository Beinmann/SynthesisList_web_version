'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import MonsterNode, { type MonsterNodeData } from './MonsterNode'
import MonsterSearch from './MonsterSearch'
import { monsterByName, recipesByResult } from './_data'
import type { Rank, MonsterType } from './_data'

const NODE_W = 180
const NODE_H = 130

const ContextSiblingNode = () => (
  <div style={{ width: NODE_W, height: 1 }}>
    <Handle type="target" position={Position.Bottom} style={{ visibility: 'hidden' }} />
  </div>
)

const NODE_TYPES = {
  monster: MonsterNode,
  contextSibling: ContextSiblingNode,
}

type NavEntry = { parent: string; isParent1: boolean; recipeIdx: number }

// Unbounded leaf count — monsters with no recipes are leaves.
// Uses an ancestors set for cycle detection and a persistent memo.
const _leafMemo = new Map<string, number>()
function fullLeafCount(name: string, ancestors: Set<string>): number {
  const key = name.toLowerCase()
  if (ancestors.has(key)) return 0
  if (_leafMemo.has(key)) return _leafMemo.get(key)!
  const recipes = recipesByResult.get(key) ?? []
  if (recipes.length === 0) { _leafMemo.set(key, 1); return 1 }
  ancestors.add(key)
  const r = recipes[0]
  const n = fullLeafCount(r.parent1, ancestors) + fullLeafCount(r.parent2, ancestors)
  ancestors.delete(key)
  _leafMemo.set(key, n)
  return n
}

function buildGraph(
  rootName: string,
  recipeIndices: Map<string, number>,
  maxDepth: number,
  onMakeRoot: (name: string) => void,
  onCycleRecipe: (nodeId: string, dir: 1 | -1) => void,
) {
  const nodes: Node<MonsterNodeData>[] = []
  // source = result monster, target = ingredient — lines flow upward from result (bottom) to ingredients (top)
  const edges: Edge[] = []
  const seen = new Set<string>()

  function visit(name: string, depth: number, resultId: string | null, edgeLabel: string | null) {
    if (depth > maxDepth) return
    const key = name.toLowerCase()
    const nodeId = edgeLabel ? `${edgeLabel}:${key}` : key

    if (!seen.has(nodeId)) {
      seen.add(nodeId)
      const monster = monsterByName.get(key)
      const recipes = recipesByResult.get(key) ?? []
      const recipeIndex = Math.min(recipeIndices.get(nodeId) ?? 0, Math.max(0, recipes.length - 1))

      nodes.push({
        id: nodeId,
        type: 'monster',
        data: {
          name: monster?.name ?? name,
          rank: (monster?.rank ?? '?') as Rank,
          type: (monster?.type ?? 'material') as MonsterType,
          nodeId,
          recipeIndex,
          recipeCount: recipes.length,
          depth,
          truncated: depth === maxDepth && recipes.length > 0,
          leafCount: fullLeafCount(name, new Set()),
          onMakeRoot,
          onCycleRecipe,
        },
        position: { x: 0, y: 0 },
      })

      if (depth < maxDepth && recipes.length > 0) {
        const r = recipes[recipeIndex]
        visit(r.parent1, depth + 1, nodeId, `${nodeId}>p1`)
        visit(r.parent2, depth + 1, nodeId, `${nodeId}>p2`)
      }
    }

    // Edge goes from result (below) up to ingredient (above)
    if (resultId && edgeLabel) {
      edges.push({ id: edgeLabel, source: resultId, target: nodeId, style: { stroke: '#52525b' } })
    }
  }

  visit(rootName, 0, null, null)
  return { nodes, edges }
}

function layoutNodes(nodes: Node<MonsterNodeData>[], edges: Edge[]): Node<MonsterNodeData>[] {
  // source = result, target = ingredient
  const ingredientsOf = new Map<string, string[]>()
  const resultOf = new Map<string, string>()
  for (const e of edges) {
    const list = ingredientsOf.get(e.source) ?? []
    list.push(e.target)
    ingredientsOf.set(e.source, list)
    resultOf.set(e.target, e.source)
  }

  const roots = nodes.filter(n => !resultOf.has(n.id))

  // BFS depth: root at 0, ingredients go deeper upward (negative y)
  const depth = new Map<string, number>()
  const queue = roots.map(r => ({ id: r.id, d: 0 }))
  while (queue.length) {
    const { id, d } = queue.shift()!
    if (depth.has(id)) continue
    depth.set(id, d)
    for (const ing of ingredientsOf.get(id) ?? []) queue.push({ id: ing, d: d + 1 })
  }

  // Post-order x assignment so each result centers under its ingredients
  const x = new Map<string, number>()
  let cursor = 0
  function assignX(id: string) {
    const ings = ingredientsOf.get(id) ?? []
    if (ings.length === 0) {
      x.set(id, cursor)
      cursor += NODE_W
    } else {
      for (const ing of ings) assignX(ing)
      const xs = ings.map(i => x.get(i)!)
      x.set(id, (Math.min(...xs) + Math.max(...xs)) / 2)
    }
  }
  for (const r of roots) assignX(r.id)

  return nodes.map(n => ({
    ...n,
    position: { x: x.get(n.id) ?? 0, y: -(depth.get(n.id) ?? 0) * NODE_H },
  }))
}

const VIEW_PADDING = 24
// Gap between the main tree's x-extent and the context sibling node
const CTX_GAP = NODE_W * 0.75

export default function SynthesisViewer() {
  const [root, setRoot] = useState<string | null>(null)
  const [maxDepth, setMaxDepth] = useState(3)
  const [recipeIndices, setRecipeIndices] = useState<Map<string, number>>(new Map())
  const [navHistory, setNavHistory] = useState<NavEntry[]>([])
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<MonsterNodeData>>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rfInstance = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastRoot = useRef<string | null>(null)
  const pendingViewport = useRef<{ x: number; y: number; zoom: number } | null>(null)

  const handleMakeRoot = useCallback((name: string) => {
    setRoot(name)
    setRecipeIndices(new Map())
    setNavHistory([])
  }, [])

  const handleSelect = useCallback((name: string) => {
    setRoot(name)
    setRecipeIndices(new Map())
    setNavHistory([])
  }, [])

  const handleCycleRecipe = useCallback((nodeId: string, dir: 1 | -1) => {
    setRecipeIndices(prev => {
      const next = new Map(prev)
      const key = nodeId.split(':').at(-1)!
      const recipes = recipesByResult.get(key) ?? []
      if (recipes.length < 2) return prev
      const cur = next.get(nodeId) ?? 0
      next.set(nodeId, (cur + dir + recipes.length) % recipes.length)
      return next
    })
  }, [])

  const navigateToChild = useCallback((dir: 'left' | 'right') => {
    if (!root) return
    const key = root.toLowerCase()
    const recipes = recipesByResult.get(key) ?? []
    const idx = recipeIndices.get(key) ?? 0
    const recipe = recipes[idx]
    if (!recipe) return
    const target = dir === 'left' ? recipe.parent1 : recipe.parent2
    setNavHistory(h => [...h, { parent: root, isParent1: dir === 'left', recipeIdx: idx }])
    setRoot(target)
    setRecipeIndices(new Map())
  }, [root, recipeIndices])

  const navigateBack = useCallback(() => {
    if (navHistory.length === 0) return
    const prev = navHistory[navHistory.length - 1]
    setNavHistory(h => h.slice(0, -1))
    setRoot(prev.parent)
    setRecipeIndices(new Map())
  }, [navHistory])

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
    if (!root) return
    const { nodes: raw, edges: raw2 } = buildGraph(root, recipeIndices, maxDepth, handleMakeRoot, handleCycleRecipe)
    const laid = layoutNodes(raw, raw2)
    const allNodes: Node<MonsterNodeData>[] = [...laid]
    const allEdges: Edge[] = [...raw2]

    // Inject parent + sibling context nodes when we've navigated into a child
    const parentEntry = navHistory.length > 0 ? navHistory[navHistory.length - 1] : null
    if (parentEntry) {
      const { parent, isParent1, recipeIdx } = parentEntry
      const parentKey = parent.toLowerCase()
      const parentRecipes = recipesByResult.get(parentKey) ?? []
      const safeIdx = Math.min(recipeIdx, Math.max(0, parentRecipes.length - 1))
      const parentRecipe = parentRecipes[safeIdx]
      const parentMonster = monsterByName.get(parentKey)

      const rootNode = laid.find(n => n.id === root.toLowerCase())
      if (rootNode && parentRecipe) {
        const rootX = rootNode.position.x
        const treeXs = laid.map(n => n.position.x)
        const treeMaxX = Math.max(...treeXs)
        const treeMinX = Math.min(...treeXs)

        const siblingName = isParent1 ? parentRecipe.parent2 : parentRecipe.parent1
        const siblingKey = siblingName.toLowerCase()
        const siblingMonster = monsterByName.get(siblingKey)
        const siblingRecipes = recipesByResult.get(siblingKey) ?? []

        // Sibling goes outside the tree extent; parent centers between root and sibling
        const siblingX = isParent1
          ? treeMaxX + CTX_GAP
          : treeMinX - CTX_GAP
        const parentX = (rootX + siblingX) / 2
        const parentY = NODE_H  // one level below root (root is at y=0)

        const parentNodeId = '__ctx_parent__'
        const siblingNodeId = '__ctx_sibling__'

        allNodes.push({
          id: parentNodeId,
          type: 'monster',
          data: {
            name: parentMonster?.name ?? parent,
            rank: (parentMonster?.rank ?? '?') as Rank,
            type: (parentMonster?.type ?? 'material') as MonsterType,
            nodeId: parentNodeId,
            recipeIndex: safeIdx,
            recipeCount: 1,
            depth: 0,
            truncated: false,
            leafCount: fullLeafCount(parent, new Set()),
            onMakeRoot: handleMakeRoot,
            onCycleRecipe: handleCycleRecipe,
          },
          position: { x: parentX, y: parentY },
        })

        allNodes.push({
          id: siblingNodeId,
          type: 'contextSibling',
          data: {
            name: siblingMonster?.name ?? siblingName,
            rank: (siblingMonster?.rank ?? '?') as Rank,
            type: (siblingMonster?.type ?? 'material') as MonsterType,
            nodeId: siblingNodeId,
            recipeIndex: 0,
            recipeCount: 1,
            depth: 0,
            truncated: siblingRecipes.length > 0,
            leafCount: fullLeafCount(siblingName, new Set()),
            onMakeRoot: handleMakeRoot,
            onCycleRecipe: handleCycleRecipe,
          },
          position: { x: siblingX, y: 0 },
        })

        // Solid edge: parent → current root (the synthesis connection we came from)
        allEdges.push({
          id: '__ctx_edge_root__',
          source: parentNodeId,
          target: root.toLowerCase(),
          style: { stroke: '#52525b' },
        })

        // Dashed edge: parent → sibling (the other synthesis ingredient, not yet explored)
        allEdges.push({
          id: '__ctx_edge_sibling__',
          source: parentNodeId,
          target: siblingNodeId,
          style: { stroke: '#52525b', strokeDasharray: '6 4' },
        })
      }
    }

    setNodes(allNodes)
    setEdges(allEdges)

    const container = containerRef.current
    if (!container) return
    const rootNode = laid.find(n => n.id === root.toLowerCase())
    if (!rootNode) return
    const { width, height } = container.getBoundingClientRect()
    const rf = rfInstance.current

    // Zoom out enough to show ~4 levels (Parent + Child + 2 levels of depth)
    // Vertical span of 4 nodes: 4 * NODE_H
    const levelsToShow = 4
    const defaultZoom = Math.min(1, (height - VIEW_PADDING * 2) / (levelsToShow * NODE_H))

    // Only reset zoom if root changed (initial load or navigation)
    // Otherwise keep current zoom (e.g. recipe cycle)
    const isNewRoot = lastRoot.current !== root
    const currentZoom = rf ? (rf.getViewport().zoom || 1) : 1
    const zoom = isNewRoot ? defaultZoom : currentZoom
    lastRoot.current = root

    // Parent context is at y=NODE_H, its bottom is at 2*NODE_H
    // If no parent, root (y=0) is the bottom, so bottom is at NODE_H
    const hasParent = navHistory.length > 0
    const bottomY = hasParent ? 2 * NODE_H : NODE_H

    const vp = {
      x: width / 2 - (rootNode.position.x + NODE_W / 2) * zoom,
      y: height - bottomY * zoom - VIEW_PADDING,
      zoom,
    }
    if (rf) {
      rf.setViewport(vp, { duration: 300 })
    } else {
      pendingViewport.current = vp
    }
  }, [root, recipeIndices, maxDepth, navHistory, handleMakeRoot, handleCycleRecipe, setNodes, setEdges])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 flex-wrap">
        <MonsterSearch onSelect={handleSelect} />
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-xs text-zinc-500">Depth</span>
          <button
            onClick={() => setMaxDepth(d => Math.max(1, d - 1))}
            className="w-6 h-6 flex items-center justify-center rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm leading-none"
          >−</button>
          <span className="text-sm text-zinc-300 w-4 text-center">{maxDepth}</span>
          <button
            onClick={() => setMaxDepth(d => Math.min(8, d + 1))}
            className="w-6 h-6 flex items-center justify-center rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-sm leading-none"
          >+</button>
        </div>
      </div>
      {root && (
        <span className="text-sm text-zinc-500 -mt-2">
          <span className="text-zinc-300 font-medium">{root}</span>
          {navHistory.length > 0 && (
            <> — <button onClick={navigateBack} className="underline hover:text-zinc-300">↓ back to {navHistory.at(-1)!.parent}</button></>
          )}
          {navHistory.length === 0 && <> — click a node or use ← → ↓ to navigate</>}
        </span>
      )}

      <div ref={containerRef} className="rounded-xl border border-zinc-800 overflow-hidden" style={{ height: 560 }}>
        {root ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={NODE_TYPES}
            onInit={inst => {
              rfInstance.current = inst
              if (pendingViewport.current) {
                inst.setViewport(pendingViewport.current)
                pendingViewport.current = null
              }
            }}
            colorMode="dark"
          >
            <Background color="#27272a" gap={24} />
            <Controls />
          </ReactFlow>
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-600 text-sm">
            Search for a monster above to see its synthesis tree.
          </div>
        )}
      </div>

      <p className="text-xs text-zinc-600">
        Use ‹ › on a node to cycle recipes. Arrow keys: ← → navigate into ingredients, ↓ go back.
      </p>
    </div>
  )
}
