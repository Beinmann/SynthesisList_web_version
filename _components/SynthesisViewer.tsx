'use client'

import { useCallback, useMemo, useState } from 'react'
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

function buildGraph(rootName: string, onMakeRoot: (name: string) => void) {
  const nodes: Node<MonsterNodeData>[] = []
  const edges: Edge[] = []
  const seen = new Set<string>()

  function visit(name: string, depth: number, parentId: string | null, edgeId: string | null) {
    if (depth > MAX_DEPTH) return
    const key = name.toLowerCase()
    const nodeId = edgeId ? `${edgeId}->${key}` : key

    const monster = monsterByName.get(key)

    const data: MonsterNodeData = {
      name: monster?.name ?? name,
      rank: (monster?.rank ?? '?') as Rank,
      type: (monster?.type ?? 'material') as MonsterType,
      onMakeRoot,
    }

    if (!seen.has(nodeId)) {
      seen.add(nodeId)
      nodes.push({
        id: nodeId,
        type: 'monster',
        data,
        position: { x: 0, y: 0 },
      })
    }

    if (parentId && edgeId) {
      edges.push({ id: edgeId, source: nodeId, target: parentId, style: { stroke: '#52525b' } })
    }

    if (depth < MAX_DEPTH) {
      const recipes = recipesByResult.get(key) ?? []
      recipes.forEach((r, i) => {
        visit(r.parent1, depth + 1, nodeId, `${nodeId}-p1-${i}`)
        visit(r.parent2, depth + 1, nodeId, `${nodeId}-p2-${i}`)
      })
    }
  }

  visit(rootName, 0, null, null)
  return { nodes, edges }
}

// Simple top-down layout: position nodes by BFS level
function layoutNodes(nodes: Node<MonsterNodeData>[], edges: Edge[]): Node<MonsterNodeData>[] {
  const children = new Map<string, string[]>()
  const parents = new Map<string, string[]>()
  for (const e of edges) {
    const c = children.get(e.target) ?? []
    c.push(e.source)
    children.set(e.target, c)
    const p = parents.get(e.source) ?? []
    p.push(e.target)
    parents.set(e.source, p)
  }

  const roots = nodes.filter(n => !(parents.get(n.id)?.length))
  const levels = new Map<string, number>()
  const queue = roots.map(r => ({ id: r.id, level: 0 }))
  while (queue.length) {
    const { id, level } = queue.shift()!
    if ((levels.get(id) ?? Infinity) <= level) continue
    levels.set(id, level)
    for (const child of children.get(id) ?? []) {
      queue.push({ id: child, level: level + 1 })
    }
  }

  const byLevel = new Map<number, string[]>()
  for (const [id, lvl] of levels) {
    const arr = byLevel.get(lvl) ?? []
    arr.push(id)
    byLevel.set(lvl, arr)
  }

  const NODE_W = 160
  const NODE_H = 100
  const positions = new Map<string, { x: number; y: number }>()
  for (const [lvl, ids] of byLevel) {
    const total = ids.length
    ids.forEach((id, i) => {
      positions.set(id, {
        x: (i - (total - 1) / 2) * NODE_W,
        y: -lvl * NODE_H,
      })
    })
  }

  return nodes.map(n => ({ ...n, position: positions.get(n.id) ?? { x: 0, y: 0 } }))
}

export default function SynthesisViewer() {
  const [root, setRoot] = useState<string | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<MonsterNodeData>>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])

  const handleSelect = useCallback((name: string) => {
    setRoot(name)
  }, [])

  const handleMakeRoot = useCallback((name: string) => {
    setRoot(name)
  }, [])

  useMemo(() => {
    if (!root) return
    const { nodes: rawNodes, edges: rawEdges } = buildGraph(root, handleMakeRoot)
    const laid = layoutNodes(rawNodes, rawEdges)
    setNodes(laid)
    setEdges(rawEdges)
  }, [root, handleMakeRoot, setNodes, setEdges])

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
        Tree shows up to {MAX_DEPTH} levels of parents. Nodes are colored by rank; borders by family type.
      </p>
    </div>
  )
}
