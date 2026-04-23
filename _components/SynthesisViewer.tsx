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
          truncated: (depth === MAX_DEPTH || stopAtBase || isFolded) && recipes.length > 0,
          folded: isFolded,
          leafCount: fullLeafCount(name, new Set(), recipeIndices, leafMemo, isRoot),
          onMakeRoot,
          onCycleRecipe,
          onToggleFold,
        },
        position: { x: slotX(depth, slotK), y: -depth * NODE_H },
      })

      if (depth < MAX_DEPTH && recipes.length > 0 && !stopAtBase && !isFolded) {
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

  const { parent, isParent1, recipeIdx } = parentEntry
  const parentKey = parent.toLowerCase()
  const parentRecipes = recipesByResult.get(parentKey) ?? []
  const safeIdx = Math.min(recipeIdx, Math.max(0, parentRecipes.length - 1))
  const parentRecipe = parentRecipes[safeIdx]
  const parentMonster = monsterByName.get(parentKey)
  const rootNode = laid.find(n => n.id === root.toLowerCase())

  if (!rootNode || !parentRecipe) return { nodes: [...laid], edges: [...edges] }

  const rootX = rootNode.position.x

  const siblingName = isParent1 ? parentRecipe.parent2 : parentRecipe.parent1
  const siblingKey = siblingName.toLowerCase()
  const siblingMonster = monsterByName.get(siblingKey)
  const siblingRecipes = recipesByResult.get(siblingKey) ?? []

  // Sibling sits one NODE_W outside the root subtree's reserved leaf extent.
  // Using the canonical reservation (not whatever rendered) keeps the parent
  // and sibling pinned to stable positions across navigations.
  const canonicalHalfExtent = ((1 << MAX_DEPTH) - 1) * NODE_W / 2
  const siblingX = isParent1
    ? rootX + canonicalHalfExtent + NODE_W
    : rootX - canonicalHalfExtent - NODE_W
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

// Rewrite new node ids (and edge source/target) to re-use the rendered ids of
// matching previous nodes so React Flow recognises them as the same element
// and CSS can animate their transform to the new position. Only applies to
// nav-forward and nav-back — the tree's root changes deterministically and
// every persistent node's identity can be derived from the nav direction.
function remapForNav(
  newNodes: Node<MonsterNodeData>[],
  newEdges: Edge[],
  prevNodes: Node<MonsterNodeData>[],
  action: NavAction,
): { nodes: Node<MonsterNodeData>[]; edges: Edge[] } {
  if (action.type === 'reset' || action.type === 'cycle' || action.type === 'fold') {
    return { nodes: newNodes, edges: newEdges }
  }

  // prev data.nodeId → prev rendered id (may differ from canonical if that
  // prev was itself the result of a remap on an earlier rebuild).
  const prevRenderedByCanonical = new Map<string, string>()
  for (const p of prevNodes) {
    if (p.data.phase === 'exiting') continue
    prevRenderedByCanonical.set(p.data.nodeId, p.id)
  }

  // new data.nodeId → remapped rendered id.
  const idRewrite = new Map<string, string>()

  if (action.type === 'nav-forward') {
    const prevRootLc = action.prevRoot.toLowerCase()
    const dir = action.dir
    const opp: 'p1' | 'p2' = dir === 'p1' ? 'p2' : 'p1'

    for (const n of newNodes) {
      const nid = n.data.nodeId
      let prevCanonical: string | null = null

      if (nid.startsWith('__ctx_parent__:')) {
        const key = nid.slice('__ctx_parent__:'.length)
        // New ctx parent = the root we just left.
        if (key === prevRootLc) prevCanonical = prevRootLc
      } else if (nid.startsWith('__ctx_sibling__:')) {
        const key = nid.slice('__ctx_sibling__:'.length)
        // New ctx sibling = the opposite-dir child we didn't dive into.
        prevCanonical = `${prevRootLc}>${opp}:${key}`
      } else {
        // Tree node at path X in the new root's tree was at path prevRoot>dir:X
        // in the previous tree.
        prevCanonical = `${prevRootLc}>${dir}:${nid}`
      }

      if (prevCanonical !== null) {
        const prevRendered = prevRenderedByCanonical.get(prevCanonical)
        if (prevRendered !== undefined) idRewrite.set(nid, prevRendered)
      }
    }
  } else if (action.type === 'nav-back') {
    const prevRootLc = action.prevRoot.toLowerCase()
    const newRootLc = action.newRoot.toLowerCase()
    const prevDir = action.prevDir
    const opp: 'p1' | 'p2' = prevDir === 'p1' ? 'p2' : 'p1'
    const prevDirPrefix = `${newRootLc}>${prevDir}:`
    const oppPrefix = `${newRootLc}>${opp}:`

    for (const n of newNodes) {
      const nid = n.data.nodeId
      let prevCanonical: string | null = null

      if (nid === newRootLc) {
        // New root was the ctx parent in the previous tree.
        prevCanonical = `__ctx_parent__:${newRootLc}`
      } else if (nid === `${prevDirPrefix}${prevRootLc}`) {
        // Depth-1 child on prevDir side is the monster we just left.
        prevCanonical = prevRootLc
      } else if (nid.startsWith(`${prevDirPrefix}${prevRootLc}>`)) {
        // Deeper descendant inside the subtree we came from: strip the
        // newRoot>prevDir: prefix to recover the path it had in the previous
        // tree (which was rooted at prevRoot).
        prevCanonical = nid.slice(prevDirPrefix.length)
      } else if (nid.startsWith(oppPrefix)) {
        const rest = nid.slice(oppPrefix.length)
        // The depth-1 opp-side child was the ctx sibling in the previous tree.
        // Deeper nodes on that side didn't exist in the previous tree at all.
        if (!rest.includes('>')) {
          prevCanonical = `__ctx_sibling__:${rest}`
        }
      }

      if (prevCanonical !== null) {
        const prevRendered = prevRenderedByCanonical.get(prevCanonical)
        if (prevRendered !== undefined) idRewrite.set(nid, prevRendered)
      }
    }
  }

  const nodes = newNodes.map(n => {
    const rewritten = idRewrite.get(n.data.nodeId)
    return rewritten !== undefined ? { ...n, id: rewritten } : n
  })

  const edges = newEdges.map(e => {
    const newSource = idRewrite.get(e.source) ?? e.source
    const newTarget = idRewrite.get(e.target) ?? e.target
    return {
      ...e,
      source: newSource,
      target: newTarget,
      id: `${newSource}->${newTarget}`,
    }
  })

  return { nodes, edges }
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
  //   effect and drives remapForNav so persistent nodes keep their rendered
  //   id (and thus CSS-transition) across commits.
  // - exitTimeoutRef: setTimeout that drops exiting ghost nodes after the fade.
  // - resetViewportRef: one-shot flag to run the default-viewport formula (search / make-root / initial).
  // - prevNodesRef: last committed set of non-exiting nodes, for diff-based exit fades and remap lookups.
  const offsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const navActionRef = useRef<NavAction>({ type: 'reset' })
  const exitTimeoutRef = useRef<number | null>(null)
  const resetViewportRef = useRef<boolean>(true)
  const prevNodesRef = useRef<Node<MonsterNodeData>[]>([])

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

    // Ctx parent's canonical position in the current tree — same formula
    // injectContext uses. The new root (= prev.parent) lands there.
    const canonicalHalfExtent = ((1 << MAX_DEPTH) - 1) * NODE_W / 2
    const siblingCanonicalX = prev.isParent1
      ? canonicalHalfExtent + NODE_W
      : -(canonicalHalfExtent + NODE_W)
    const parentCanonical = { x: siblingCanonicalX / 2, y: NODE_H }
    const prevOffset = offsetRef.current
    const newOffset = {
      x: parentCanonical.x + prevOffset.x,
      y: parentCanonical.y + prevOffset.y,
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

    // Remap persistent-node ids so React Flow recognises them across the
    // rebuild and CSS can transition their transform to the new position.
    const action = navActionRef.current
    navActionRef.current = { type: 'reset' }
    const { nodes: remappedNodes, edges: remappedEdges } = remapForNav(
      offsetNodes,
      built.edges,
      prevNodesRef.current,
      action,
    )

    // Ghost nodes for the exit fade: any previously rendered node whose id is
    // not in the new (remapped) set gets re-included with phase='exiting'.
    const prevCommitted = prevNodesRef.current
    const newIds = new Set(remappedNodes.map(n => n.id))
    const exiting: Node<MonsterNodeData>[] = prevCommitted
      .filter(n => n.data.phase !== 'exiting' && !newIds.has(n.id))
      .map(n => ({ ...n, data: { ...n.data, phase: 'exiting' as const } }))

    prevNodesRef.current = remappedNodes

    setNodes([...remappedNodes, ...exiting])
    setEdges(remappedEdges)

    if (exitTimeoutRef.current !== null) clearTimeout(exitTimeoutRef.current)
    if (exiting.length > 0) {
      exitTimeoutRef.current = window.setTimeout(() => {
        setNodes(curr => curr.filter(n => n.data.phase !== 'exiting'))
        exitTimeoutRef.current = null
      }, FADE_MS)
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
          transition: transform ${PAN_MS}ms cubic-bezier(0.45, 0, 0.2, 1);
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
                <div className="flex items-center gap-3 bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-xl p-2 px-3 self-start shadow-xl">
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
