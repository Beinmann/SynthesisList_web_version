'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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
import { monsterByName, recipesByResult } from './_data'
import type { Rank, MonsterType } from './_data'

const NODE_W = 200
const NODE_H = 160
const VIEW_PADDING = 24
// Duration of the camera pan that precedes a navigation commit, and of the
// fade used for added/removed nodes.
const PAN_MS = 350
const FADE_MS = 350

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
type AlignTo = { nodeId: string; worldPos: { x: number; y: number } }
type PendingNav = { root: string; navHistory: NavEntry[]; alignTo: AlignTo }
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

function buildGraph(
  rootName: string,
  recipeIndices: Record<string, number>,
  foldedRecipes: Record<string, boolean>,
  maxDepth: number,
  onMakeRoot: (name: string) => void,
  onCycleRecipe: (nodeId: string, dir: 1 | -1) => void,
  onToggleFold: (name: string) => void,
) {
  const leafMemo = new Map<string, number>()
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
      const recipeIndex = Math.min(recipeIndices[key] ?? 0, Math.max(0, recipes.length - 1))

      const tags = monster?.tags ?? ['base']
      const isBase = tags.includes('base')
      const isRoot = depth === 0
      const stopAtBase = isBase && !isRoot
      // Root always displays its recipe even if flagged as folded — the fold
      // flag is a "how to render elsewhere" hint and must not hide the tree
      // the user is currently focused on. Stored state stays untouched.
      const isFolded = !isRoot && foldedRecipes[key] === true

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
          truncated: (depth === maxDepth || stopAtBase || isFolded) && recipes.length > 0,
          folded: isFolded,
          leafCount: fullLeafCount(name, new Set(), recipeIndices, leafMemo, isRoot),
          onMakeRoot,
          onCycleRecipe,
          onToggleFold,
        },
        position: { x: 0, y: 0 },
      })

      if (depth < maxDepth && recipes.length > 0 && !stopAtBase && !isFolded) {
        const r = recipes[recipeIndex]
        visit(r.parent1, depth + 1, nodeId, `${nodeId}>p1`)
        visit(r.parent2, depth + 1, nodeId, `${nodeId}>p2`)
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

  const { parent, isParent1, recipeIdx } = parentEntry
  const parentKey = parent.toLowerCase()
  const parentRecipes = recipesByResult.get(parentKey) ?? []
  const safeIdx = Math.min(recipeIdx, Math.max(0, parentRecipes.length - 1))
  const parentRecipe = parentRecipes[safeIdx]
  const parentMonster = monsterByName.get(parentKey)
  const rootNode = laid.find(n => n.id === root.toLowerCase())

  if (!rootNode || !parentRecipe) return { nodes: [...laid], edges: [...edges] }

  const rootX = rootNode.position.x
  const treeXs = laid.map(n => n.position.x)
  const treeMaxX = Math.max(...treeXs)
  const treeMinX = Math.min(...treeXs)

  const siblingName = isParent1 ? parentRecipe.parent2 : parentRecipe.parent1
  const siblingKey = siblingName.toLowerCase()
  const siblingMonster = monsterByName.get(siblingKey)
  const siblingRecipes = recipesByResult.get(siblingKey) ?? []

  // Sibling sits one layout slot outside the tree's leaf extent — matches the
  // spacing layoutNodes would produce if the parent were laid out as root with
  // the sibling as an un-expanded leaf. Parent then centers between its two
  // immediate children (root-subtree root and sibling), which is the same
  // midpoint formula layoutNodes uses.
  const siblingX = isParent1 ? treeMaxX + NODE_W : treeMinX - NODE_W
  const parentX = (rootX + siblingX) / 2
  const parentY = rootNode.position.y + NODE_H

  // Scope the context ids by monster key so different parents/siblings
  // get distinct DOM nodes and fade in/out between navigations.
  const parentNodeId = `__ctx_parent__:${parentKey}`
  const siblingNodeId = `__ctx_sibling__:${siblingKey}`

  const memo = new Map<string, number>()

  const allNodes: Node<MonsterNodeData>[] = [
    ...laid,
    {
      id: parentNodeId,
      type: 'monster',
      data: {
        name: parentMonster?.name ?? parent,
        rank: (parentMonster?.rank ?? '?') as Rank,
        type: (parentMonster?.type ?? 'material') as MonsterType,
        tags: parentMonster?.tags ?? ['base'],
        nodeId: parentNodeId,
        recipeIndex: safeIdx,
        recipeCount: 1,
        depth: 0,
        truncated: false,
        folded: foldedRecipes[parentKey] === true,
        leafCount: fullLeafCount(parent, new Set(), recipeIndices, memo, true),
        onMakeRoot: handlers.onMakeRoot,
        onCycleRecipe: handlers.onCycleRecipe,
        onToggleFold: handlers.onToggleFold,
      },
      position: { x: parentX, y: parentY },
    },
    {
      id: siblingNodeId,
      type: 'monster',
      data: {
        name: siblingMonster?.name ?? siblingName,
        rank: (siblingMonster?.rank ?? '?') as Rank,
        type: (siblingMonster?.type ?? 'material') as MonsterType,
        tags: siblingMonster?.tags ?? ['base'],
        nodeId: siblingNodeId,
        recipeIndex: 0,
        recipeCount: siblingRecipes.length,
        depth: 0,
        truncated: siblingRecipes.length > 0,
        folded: foldedRecipes[siblingKey] === true,
        isContext: true,
        leafCount: fullLeafCount(siblingName, new Set(), recipeIndices, memo, false),
        onMakeRoot: handlers.onMakeRoot,
        onCycleRecipe: handlers.onCycleRecipe,
        onToggleFold: handlers.onToggleFold,
      },
      position: { x: siblingX, y: rootNode.position.y },
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
    {
      id: '__ctx_edge_sibling__',
      source: parentNodeId,
      target: siblingNodeId,
      type: 'flowing',
      style: { stroke: '#3f3f46', strokeDasharray: '6 4' },
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
  maxDepth: number
  handlers: Handlers
}): { nodes: Node<MonsterNodeData>[]; edges: Edge[] } {
  const { nodes: raw, edges } = buildGraph(
    args.root,
    args.recipeIndices,
    args.foldedRecipes,
    args.maxDepth,
    args.handlers.onMakeRoot,
    args.handlers.onCycleRecipe,
    args.handlers.onToggleFold,
  )
  const laid = layoutNodes(raw, edges)
  return injectContext(
    laid,
    edges,
    args.root,
    args.navHistory,
    args.recipeIndices,
    args.foldedRecipes,
    args.handlers,
  )
}

// Translate every node so the one matching `alignTo.nodeId` lands at
// `alignTo.worldPos`. No-op if the target isn't present.
function applyAlignment(nodes: Node<MonsterNodeData>[], alignTo: AlignTo): Node<MonsterNodeData>[] {
  const target = nodes.find(n => n.id === alignTo.nodeId)
  if (!target) return nodes
  const dx = alignTo.worldPos.x - target.position.x
  const dy = alignTo.worldPos.y - target.position.y
  return nodes.map(n => ({ ...n, position: { x: n.position.x + dx, y: n.position.y + dy } }))
}

export default function SynthesisViewer() {
  const [root, setRoot] = useState<string | null>(null)
  const [maxDepth, setMaxDepth] = useState(3)
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
  const [nodes, setNodes, onNodesChange] = useNodesState<Node<MonsterNodeData>>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rfInstance = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pendingViewport = useRef<{ x: number; y: number; zoom: number } | null>(null)

  // Transition orchestration.
  // - panTimeoutRef: setTimeout that commits a pending navigation after the pan.
  // - exitTimeoutRef: setTimeout that drops exiting ghost nodes after the fade.
  // - pendingNavRef: an in-flight nav (root/navHistory/alignTo) whose commit is delayed for the pan.
  // - alignToRef: one-shot instruction to translate the next rebuild so a chosen node lands at a chosen world position.
  // - resetViewportRef: one-shot flag to run the default-viewport formula (search / make-root / initial).
  // - prevNodesRef: last committed set of non-exiting nodes, for diff-based exit fades.
  const panTimeoutRef = useRef<number | null>(null)
  const exitTimeoutRef = useRef<number | null>(null)
  const pendingNavRef = useRef<PendingNav | null>(null)
  const alignToRef = useRef<AlignTo | null>(null)
  const resetViewportRef = useRef<boolean>(true)
  const prevNodesRef = useRef<Node<MonsterNodeData>[]>([])

  // Mirror state into refs so nav handlers can read current values without being
  // re-memoized on every change. The handlers also write back to these refs at
  // call time, so rapid successive presses see consistent state even before
  // React has rendered the previous change.
  const nodesRef = useRef(nodes)
  const rootRef = useRef(root)
  const navHistoryRef = useRef(navHistory)
  const recipeIndicesRef = useRef(recipeIndices)
  const foldedRecipesRef = useRef(foldedRecipes)
  const maxDepthRef = useRef(maxDepth)
  useEffect(() => { nodesRef.current = nodes }, [nodes])
  useEffect(() => { rootRef.current = root }, [root])
  useEffect(() => { navHistoryRef.current = navHistory }, [navHistory])
  useEffect(() => { recipeIndicesRef.current = recipeIndices }, [recipeIndices])
  useEffect(() => { foldedRecipesRef.current = foldedRecipes }, [foldedRecipes])
  useEffect(() => { maxDepthRef.current = maxDepth }, [maxDepth])

  const cancelPendingNav = useCallback(() => {
    if (panTimeoutRef.current !== null) {
      clearTimeout(panTimeoutRef.current)
      panTimeoutRef.current = null
    }
    pendingNavRef.current = null
  }, [])

  const handleMakeRoot = useCallback((name: string) => {
    cancelPendingNav()
    alignToRef.current = null
    resetViewportRef.current = true
    rootRef.current = name
    navHistoryRef.current = []
    setRoot(name)
    setNavHistory([])
  }, [cancelPendingNav])

  const handleSelect = useCallback((name: string) => {
    cancelPendingNav()
    alignToRef.current = null
    resetViewportRef.current = true
    rootRef.current = name
    navHistoryRef.current = []
    setRoot(name)
    setNavHistory([])
  }, [cancelPendingNav])

  const handleCycleRecipe = useCallback((nodeId: string, dir: 1 | -1) => {
    cancelPendingNav()
    const key = nodeId.split(':').at(-1)!
    const recipes = recipesByResult.get(key) ?? []
    if (recipes.length < 2) return

    // Align the node whose recipe just changed to its current position so the
    // swap pivots around it instead of letting the rest of the tree reflow
    // across the screen.
    const focal = nodesRef.current.find(n => n.id === nodeId && n.data.phase !== 'exiting')
    if (focal) {
      alignToRef.current = { nodeId, worldPos: focal.position }
    }

    const prev = recipeIndicesRef.current
    const cur = prev[key] ?? 0
    const next = { ...prev, [key]: (cur + dir + recipes.length) % recipes.length }
    recipeIndicesRef.current = next
    setRecipeIndices(next)
  }, [cancelPendingNav])

  const handleToggleFold = useCallback((name: string) => {
    cancelPendingNav()
    const key = name.toLowerCase()
    const recipes = recipesByResult.get(key) ?? []
    if (recipes.length === 0) return

    // fold is keyed by monster name — find a rendered instance (root first,
    // else the first descendant) to use as the alignment anchor.
    const current = nodesRef.current.filter(n => n.data.phase !== 'exiting')
    const rootKey = rootRef.current?.toLowerCase() ?? null
    let focal: Node<MonsterNodeData> | undefined
    if (rootKey === key) {
      focal = current.find(n => n.id === key)
    } else {
      focal = current.find(n => n.id.split(':').at(-1) === key)
    }
    if (focal) {
      alignToRef.current = { nodeId: focal.id, worldPos: focal.position }
    }

    const prev = foldedRecipesRef.current
    const nextMap = { ...prev }
    if (nextMap[key]) delete nextMap[key]
    else nextMap[key] = true
    foldedRecipesRef.current = nextMap
    setFoldedRecipes(nextMap)
  }, [cancelPendingNav])

  const changeMaxDepth = useCallback((delta: 1 | -1) => {
    cancelPendingNav()
    const rootKey = rootRef.current?.toLowerCase()
    if (rootKey) {
      const focal = nodesRef.current.find(n => n.id === rootKey && n.data.phase !== 'exiting')
      if (focal) {
        alignToRef.current = { nodeId: rootKey, worldPos: focal.position }
      }
    }
    setMaxDepth(d => {
      const next = Math.max(1, Math.min(8, d + delta))
      maxDepthRef.current = next
      return next
    })
  }, [cancelPendingNav])

  // The "effective" tree a nav handler reasons about: if a prior pending nav
  // is still panning, simulate its post-commit layout (deterministic via
  // buildFullGraph + applyAlignment). Otherwise use the currently rendered
  // nodes (minus any exiting ghosts).
  const effectiveTree = useCallback((): { nodes: Node<MonsterNodeData>[]; root: string; navHistory: NavEntry[] } | null => {
    const handlers: Handlers = {
      onMakeRoot: handleMakeRoot,
      onCycleRecipe: handleCycleRecipe,
      onToggleFold: handleToggleFold,
    }
    if (pendingNavRef.current) {
      const p = pendingNavRef.current
      const built = buildFullGraph({
        root: p.root,
        navHistory: p.navHistory,
        recipeIndices: recipeIndicesRef.current,
        foldedRecipes: foldedRecipesRef.current,
        maxDepth: maxDepthRef.current,
        handlers,
      }).nodes
      return { nodes: applyAlignment(built, p.alignTo), root: p.root, navHistory: p.navHistory }
    }
    if (!rootRef.current) return null
    return {
      nodes: nodesRef.current.filter(n => n.data.phase !== 'exiting'),
      root: rootRef.current,
      navHistory: navHistoryRef.current,
    }
  }, [handleMakeRoot, handleCycleRecipe, handleToggleFold])

  const startPan = useCallback((focalPos: { x: number; y: number }, postNavHasParent: boolean) => {
    const rf = rfInstance.current
    const container = containerRef.current
    if (!rf || !container) return
    const { width, height } = container.getBoundingClientRect()
    const zoom = rf.getViewport().zoom || 1
    // After the commit, the new root will sit at focalPos; the tree's visual
    // bottom will be NODE_H below that (no parent ctx) or 2*NODE_H below
    // (parent ctx also rendered). Place that bottom at the usual padded
    // screen bottom so the landing spot looks identical to a cold default.
    const bottomOffset = postNavHasParent ? 2 * NODE_H : NODE_H
    const target = {
      x: width / 2 - (focalPos.x + NODE_W / 2) * zoom,
      y: height - VIEW_PADDING - (focalPos.y + bottomOffset) * zoom,
      zoom,
    }
    rf.setViewport(target, { duration: PAN_MS })
  }, [])

  const scheduleCommit = useCallback(() => {
    if (panTimeoutRef.current !== null) clearTimeout(panTimeoutRef.current)
    panTimeoutRef.current = window.setTimeout(() => {
      const p = pendingNavRef.current
      if (!p) return
      pendingNavRef.current = null
      panTimeoutRef.current = null
      alignToRef.current = p.alignTo
      // Sync refs alongside setState so a follow-up handler in the same tick
      // (before React renders) reads consistent values.
      rootRef.current = p.root
      navHistoryRef.current = p.navHistory
      setRoot(p.root)
      setNavHistory(p.navHistory)
    }, PAN_MS)
  }, [])

  const navigateToChild = useCallback((dir: 'left' | 'right') => {
    const eff = effectiveTree()
    if (!eff) return
    const rootKey = eff.root.toLowerCase()
    const recipes = recipesByResult.get(rootKey) ?? []
    const idx = recipeIndicesRef.current[rootKey] ?? 0
    const recipe = recipes[idx]
    if (!recipe) return
    const targetName = dir === 'left' ? recipe.parent1 : recipe.parent2
    const targetKey = targetName.toLowerCase()
    const focalId = `${rootKey}>${dir === 'left' ? 'p1' : 'p2'}:${targetKey}`
    const focal = eff.nodes.find(n => n.id === focalId)
    if (!focal) return

    const nextHistory: NavEntry[] = [
      ...eff.navHistory,
      { parent: eff.root, isParent1: dir === 'left', recipeIdx: idx },
    ]
    pendingNavRef.current = {
      root: targetName,
      navHistory: nextHistory,
      alignTo: { nodeId: targetKey, worldPos: focal.position },
    }
    startPan(focal.position, nextHistory.length > 0)
    scheduleCommit()
  }, [effectiveTree, startPan, scheduleCommit])

  const navigateBack = useCallback(() => {
    const eff = effectiveTree()
    if (!eff || eff.navHistory.length === 0) return
    const prev = eff.navHistory[eff.navHistory.length - 1]
    const focal = eff.nodes.find(n => n.id.startsWith('__ctx_parent__'))
    if (!focal) return

    const nextHistory = eff.navHistory.slice(0, -1)
    const targetKey = prev.parent.toLowerCase()
    pendingNavRef.current = {
      root: prev.parent,
      navHistory: nextHistory,
      alignTo: { nodeId: targetKey, worldPos: focal.position },
    }
    startPan(focal.position, nextHistory.length > 0)
    scheduleCommit()
  }, [effectiveTree, startPan, scheduleCommit])

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
      if (panTimeoutRef.current !== null) clearTimeout(panTimeoutRef.current)
      if (exitTimeoutRef.current !== null) clearTimeout(exitTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!root) return
    const handlers: Handlers = {
      onMakeRoot: handleMakeRoot,
      onCycleRecipe: handleCycleRecipe,
      onToggleFold: handleToggleFold,
    }
    const built = buildFullGraph({ root, navHistory, recipeIndices, foldedRecipes, maxDepth, handlers })

    let aligned = built.nodes
    if (alignToRef.current) {
      aligned = applyAlignment(built.nodes, alignToRef.current)
      alignToRef.current = null
    }

    // Ghost-nodes for fade-out: any previously committed node whose id is not
    // in the new set gets re-included with phase='exiting' so CSS can fade it
    // to opacity 0 over FADE_MS, then a timeout drops it.
    const prevCommitted = prevNodesRef.current
    const newIds = new Set(aligned.map(n => n.id))
    const exiting: Node<MonsterNodeData>[] = prevCommitted
      .filter(n => !newIds.has(n.id))
      .map(n => ({ ...n, data: { ...n.data, phase: 'exiting' as const } }))

    prevNodesRef.current = aligned

    setNodes([...aligned, ...exiting])
    setEdges(built.edges)

    if (exitTimeoutRef.current !== null) clearTimeout(exitTimeoutRef.current)
    if (exiting.length > 0) {
      exitTimeoutRef.current = window.setTimeout(() => {
        setNodes(curr => curr.filter(n => n.data.phase !== 'exiting'))
        exitTimeoutRef.current = null
      }, FADE_MS)
    }

    // Viewport. For navigation/fold/cycle the camera is already where it
    // should be (pan ended on the focal; alignment pinned the focal there).
    // Only reset on a true change of context: search, make-root, or initial.
    if (resetViewportRef.current) {
      resetViewportRef.current = false
      const container = containerRef.current
      if (!container) return
      const rootNode = aligned.find(n => n.id === root.toLowerCase())
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
  }, [root, recipeIndices, foldedRecipes, maxDepth, navHistory, handleMakeRoot, handleCycleRecipe, handleToggleFold, setNodes, setEdges])

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
        .react-flow__node {
          animation: dq-node-appear ${FADE_MS}ms ease-out;
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

              <div className="pointer-events-auto flex flex-col gap-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Viewer Controls</span>
                <div className="flex items-center gap-3 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-xl p-2 px-3 self-start shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-zinc-400">Depth</span>
                    <div className="flex items-center bg-zinc-800 rounded-lg p-0.5">
                      <button
                        onClick={() => changeMaxDepth(-1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-zinc-700 transition-colors text-zinc-300 text-xs"
                      >−</button>
                      <span className="text-xs font-bold text-zinc-100 w-6 text-center">{maxDepth}</span>
                      <button
                        onClick={() => changeMaxDepth(1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-zinc-700 transition-colors text-zinc-300 text-xs"
                      >+</button>
                    </div>
                  </div>
                  <div className="w-[1px] h-4 bg-white/10" />
                  <div className="text-[10px] text-zinc-500 font-medium">
                    {nodes.filter(n => n.type === 'monster' && n.data.phase !== 'exiting' && !n.data.isContext).length} monsters
                  </div>
                </div>
              </div>
            </div>

            {navHistory.length > 0 && (
              <div className="absolute bottom-6 left-6 z-10 pointer-events-auto">
                 <button
                  onClick={navigateBack}
                  className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-2 px-4 transition-all shadow-xl"
                >
                  <svg className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter leading-none">Go Back</span>
                    <span className="text-xs text-zinc-200 font-medium truncate max-w-[120px]">{navHistory.at(-1)!.parent}</span>
                  </div>
                </button>
              </div>
            )}

            <div className="absolute top-6 right-6 z-10 text-right pointer-events-none">
              <div className="text-xs font-black text-white/20 uppercase tracking-[0.2em] mb-1">DQMJ2 Synthesis</div>
              <div className="text-[10px] font-medium text-zinc-600">Experimental Protocol v2.0</div>
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
          <div className="flex h-full flex-col items-center justify-center bg-[#09090b]">
            <div className="w-72">
              <MonsterSearch onSelect={handleSelect} />
            </div>
            <p className="mt-4 text-zinc-600 text-sm font-medium">
              Search for a monster to begin the synthesis sequence
            </p>
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
