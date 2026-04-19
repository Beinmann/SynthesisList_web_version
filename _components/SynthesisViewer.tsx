'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
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

const NODE_TYPES = { monster: MonsterNode }
const MAX_DEPTH = 4
const NODE_W = 180
const NODE_H = 110

function buildGraph(
  rootName: string,
  recipeIndices: Map<string, number>,
  onMakeRoot: (name: string) => void,
  onCycleRecipe: (nodeId: string, dir: 1 | -1) => void,
) {
  const nodes: Node<MonsterNodeData>[] = []
  const edges: Edge[] = []
  const seen = new Set<string>()

  function visit(name: string, depth: number, parentId: string | null, edgeLabel: string | null) {
    if (depth > MAX_DEPTH) return
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
          onMakeRoot,
          onCycleRecipe,
        },
        position: { x: 0, y: 0 },
      })

      if (depth < MAX_DEPTH && recipes.length > 0) {
        const r = recipes[recipeIndex]
        visit(r.parent1, depth + 1, nodeId, `${nodeId}>p1`)
        visit(r.parent2, depth + 1, nodeId, `${nodeId}>p2`)
      }
    }

    if (parentId && edgeLabel) {
      edges.push({ id: edgeLabel, source: nodeId, target: parentId, style: { stroke: '#52525b' } })
    }
  }

  visit(rootName, 0, null, null)
  return { nodes, edges }
}

function layoutNodes(nodes: Node<MonsterNodeData>[], edges: Edge[]): Node<MonsterNodeData>[] {
  const childrenOf = new Map<string, string[]>()
  const parentOf = new Map<string, string>()
  for (const e of edges) {
    const c = childrenOf.get(e.target) ?? []
    c.push(e.source)
    childrenOf.set(e.target, c)
    parentOf.set(e.source, e.target)
  }

  // Assign depth level via BFS from roots
  const roots = nodes.filter(n => !parentOf.has(n.id))
  const depth = new Map<string, number>()
  const queue = roots.map(r => ({ id: r.id, d: 0 }))
  while (queue.length) {
    const { id, d } = queue.shift()!
    if (depth.has(id)) continue
    depth.set(id, d)
    for (const child of childrenOf.get(id) ?? []) queue.push({ id: child, d: d + 1 })
  }

  // Assign x positions via post-order traversal so parent centers over children
  const x = new Map<string, number>()
  let cursor = 0

  function assignX(id: string) {
    const children = childrenOf.get(id) ?? []
    if (children.length === 0) {
      x.set(id, cursor)
      cursor += NODE_W
    } else {
      for (const c of children) assignX(c)
      const xs = children.map(c => x.get(c)!)
      x.set(id, (Math.min(...xs) + Math.max(...xs)) / 2)
    }
  }
  for (const r of roots) assignX(r.id)

  return nodes.map(n => ({
    ...n,
    position: { x: x.get(n.id) ?? 0, y: -(depth.get(n.id) ?? 0) * NODE_H },
  }))
}

export default function SynthesisViewer() {
  const [root, setRoot] = useState<string | null>(null)
  const [recipeIndices, setRecipeIndices] = useState<Map<string, number>>(new Map())
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<MonsterNodeData>>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const handleMakeRoot = useCallback((name: string) => {
    setRoot(name)
    setRecipeIndices(new Map())
  }, [])

  const handleSelect = useCallback((name: string) => {
    setRoot(name)
    setRecipeIndices(new Map())
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

  useEffect(() => {
    if (!root) return
    const { nodes: raw, edges: raw2 } = buildGraph(root, recipeIndices, handleMakeRoot, handleCycleRecipe)
    setNodes(layoutNodes(raw, raw2))
    setEdges(raw2)
  }, [root, recipeIndices, handleMakeRoot, handleCycleRecipe, setNodes, setEdges])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 flex-wrap">
        <MonsterSearch onSelect={handleSelect} />
        {root && (
          <span className="text-sm text-zinc-500">
            Showing synthesis tree for <span className="text-zinc-300 font-medium">{root}</span>
            {' '}— click any node to re-root
          </span>
        )}
      </div>

      <div className="rounded-xl border border-zinc-800 overflow-hidden" style={{ height: 560 }}>
        {root ? (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={NODE_TYPES}
            fitView
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
        Tree shows up to {MAX_DEPTH} levels of parents. Use ‹ › on a node to cycle through alternative recipes.
      </p>
    </div>
  )
}
