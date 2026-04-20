'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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
  // source = result monster, target = ingredient — lines flow upward from result (bottom) to ingredients (top)
  const edges: Edge[] = []
  const seen = new Set<string>()

  function visit(name: string, depth: number, resultId: string | null, edgeLabel: string | null) {
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

export default function SynthesisViewer() {
  const [root, setRoot] = useState<string | null>(null)
  const [recipeIndices, setRecipeIndices] = useState<Map<string, number>>(new Map())
  const [navHistory, setNavHistory] = useState<string[]>([])
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<MonsterNodeData>>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rfInstance = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
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
    setNavHistory(h => [...h, root])
    setRoot(target)
    setRecipeIndices(new Map())
  }, [root, recipeIndices])

  const navigateBack = useCallback(() => {
    if (navHistory.length === 0) return
    const prev = navHistory[navHistory.length - 1]
    setNavHistory(h => h.slice(0, -1))
    setRoot(prev)
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
    const { nodes: raw, edges: raw2 } = buildGraph(root, recipeIndices, handleMakeRoot, handleCycleRecipe)
    const laid = layoutNodes(raw, raw2)
    setNodes(laid)
    setEdges(raw2)

    const container = containerRef.current
    if (!container) return
    const rootNode = laid.find(n => n.id === root.toLowerCase())
    if (!rootNode) return
    const { width, height } = container.getBoundingClientRect()
    const rf = rfInstance.current
    const zoom = rf ? (rf.getViewport().zoom || 1) : 1
    const vp = {
      x: width / 2 - (rootNode.position.x + NODE_W / 2) * zoom,
      y: height - NODE_H * zoom - VIEW_PADDING,
      zoom,
    }
    if (rf) {
      rf.setViewport(vp, { duration: 300 })
    } else {
      pendingViewport.current = vp
    }
  }, [root, recipeIndices, handleMakeRoot, handleCycleRecipe, setNodes, setEdges])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 flex-wrap">
        <MonsterSearch onSelect={handleSelect} />
        {root && (
          <span className="text-sm text-zinc-500">
            <span className="text-zinc-300 font-medium">{root}</span>
            {navHistory.length > 0 && (
              <> — <button onClick={navigateBack} className="underline hover:text-zinc-300">↓ back to {navHistory.at(-1)}</button></>
            )}
            {navHistory.length === 0 && <> — click a node or use ← → ↓ to navigate</>}
          </span>
        )}
      </div>

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
        Tree shows up to {MAX_DEPTH} levels of ingredients. Use ‹ › on a node to cycle recipes. Arrow keys: ← → navigate into ingredients, ↓ go back.
      </p>
    </div>
  )
}
