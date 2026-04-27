'use client'

import { useMemo } from 'react'
import { monsterByName, recipesByResult } from './_data'
import type { MonsterType } from './_data'

const PANEL_W = 280
const COLLAPSED_W = 36
const HEADER_H = 64
const FOOTER_H = 32

const TYPE_COLORS: Record<MonsterType, string> = {
  slime: '#60a5fa',
  nature: '#4ade80',
  material: '#a1a1aa',
  dragon: '#facc15',
  undead: '#e879f9',
  demon: '#f87171',
  incarnus: '#ffffff',
  beast: '#fb923c',
}

type StopReason = 'base' | 'cycle' | 'no-recipe'

interface IcicleNode {
  nodeId: string
  key: string
  name: string
  type: MonsterType
  depth: number
  leafCount: number
  stopReason: StopReason | null
  children: IcicleNode[]
}

function buildAncestorTree(
  rootName: string,
  recipeIndices: Record<string, number>,
): IcicleNode {
  const visit = (name: string, depth: number, ancestors: Set<string>, edgeLabel: string | null): IcicleNode => {
    const key = name.toLowerCase()
    const nodeId = edgeLabel ? `${edgeLabel}:${key}` : key
    const monster = monsterByName.get(key)
    const tags = monster?.tags ?? ['base']
    const type: MonsterType = monster?.type ?? 'material'
    const displayName = monster?.name ?? name
    const isRoot = depth === 0
    const isBase = tags.includes('base')

    const leaf = (stopReason: StopReason): IcicleNode => ({
      nodeId, key, name: displayName, type, depth, leafCount: 1, stopReason, children: [],
    })

    if (ancestors.has(key)) return leaf('cycle')
    if (isBase && !isRoot) return leaf('base')

    const recipes = recipesByResult.get(key) ?? []
    if (recipes.length === 0) return leaf('no-recipe')

    const idx = Math.min(recipeIndices[key] ?? 0, Math.max(0, recipes.length - 1))
    const r = recipes[idx]

    ancestors.add(key)
    const c1 = visit(r.parent1, depth + 1, ancestors, `${nodeId}>p1`)
    const c2 = visit(r.parent2, depth + 1, ancestors, `${nodeId}>p2`)
    ancestors.delete(key)

    return {
      nodeId, key, name: displayName, type, depth,
      leafCount: c1.leafCount + c2.leafCount,
      stopReason: null,
      children: [c1, c2],
    }
  }

  return visit(rootName, 0, new Set(), null)
}

interface IcicleRect {
  node: IcicleNode
  x: number
  y: number
  w: number
  h: number
}

function layoutIcicle(root: IcicleNode, panelW: number, panelH: number): {
  rects: IcicleRect[]
  maxDepth: number
  totalNodes: number
} {
  const rects: IcicleRect[] = []
  let maxDepth = 0
  let totalNodes = 0
  const collect = (n: IcicleNode) => {
    totalNodes += 1
    if (n.depth > maxDepth) maxDepth = n.depth
    for (const c of n.children) collect(c)
  }
  collect(root)

  const rowH = panelH / (maxDepth + 1)

  const recurse = (node: IcicleNode, x: number, w: number) => {
    // Inverted icicle: root at bottom, ancestors stacked above.
    const y = panelH - (node.depth + 1) * rowH
    rects.push({ node, x, y, w, h: rowH })
    if (node.children.length === 0 || node.leafCount === 0) return
    let cursor = x
    for (const child of node.children) {
      const childW = w * (child.leafCount / node.leafCount)
      recurse(child, cursor, childW)
      cursor += childW
    }
  }
  recurse(root, 0, panelW)
  return { rects, maxDepth, totalNodes }
}

interface Props {
  enabled: boolean
  onToggle: () => void
  totalHeight: number
  rootName: string
  recipeIndices: Record<string, number>
  visibleNodeIds: Set<string>
}

export default function GlobalEffortMap({
  enabled,
  onToggle,
  totalHeight,
  rootName,
  recipeIndices,
  visibleNodeIds,
}: Props) {
  if (!enabled) {
    return (
      <button
        onClick={onToggle}
        title="Show effort map"
        style={{ height: totalHeight, width: COLLAPSED_W }}
        className="flex flex-col items-center justify-start gap-3 py-4 rounded-xl border border-white/10 bg-zinc-900/80 backdrop-blur-md hover:border-white/30 text-zinc-400 hover:text-white transition-colors"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span
          className="text-[10px] uppercase tracking-widest font-semibold"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Effort Map
        </span>
      </button>
    )
  }

  return (
    <ExpandedEffortMap
      onToggle={onToggle}
      totalHeight={totalHeight}
      rootName={rootName}
      recipeIndices={recipeIndices}
      visibleNodeIds={visibleNodeIds}
    />
  )
}

interface ExpandedProps {
  onToggle: () => void
  totalHeight: number
  rootName: string
  recipeIndices: Record<string, number>
  visibleNodeIds: Set<string>
}

function ExpandedEffortMap({
  onToggle,
  totalHeight,
  rootName,
  recipeIndices,
  visibleNodeIds,
}: ExpandedProps) {
  const icicleH = Math.max(120, totalHeight - HEADER_H - FOOTER_H)

  const { rects, maxDepth, totalNodes, totalLeaves, visibleCount } = useMemo(() => {
    const tree = buildAncestorTree(rootName, recipeIndices)
    const laid = layoutIcicle(tree, PANEL_W, icicleH)
    let visibleCount = 0
    for (const r of laid.rects) {
      if (visibleNodeIds.has(r.node.nodeId)) visibleCount += 1
    }
    return {
      rects: laid.rects,
      maxDepth: laid.maxDepth,
      totalNodes: laid.totalNodes,
      totalLeaves: tree.leafCount,
      visibleCount,
    }
  }, [rootName, recipeIndices, visibleNodeIds, icicleH])

  const visiblePct = totalNodes > 0 ? Math.round((visibleCount / totalNodes) * 100) : 0

  return (
    <div
      className="rounded-xl border border-white/10 bg-zinc-900/80 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col"
      style={{ width: PANEL_W, height: totalHeight }}
    >
      <div className="px-3 py-2 border-b border-white/5" style={{ height: HEADER_H }}>
        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Effort Map</div>
          <button
            onClick={onToggle}
            title="Hide effort map"
            className="text-zinc-500 hover:text-white transition-colors -mr-1"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="mt-1 grid grid-cols-3 gap-2 text-[11px] text-zinc-300">
          <div>
            <div className="text-zinc-500 text-[9px] uppercase tracking-wider">Depth</div>
            <div className="font-semibold tabular-nums">{maxDepth}</div>
          </div>
          <div>
            <div className="text-zinc-500 text-[9px] uppercase tracking-wider">Nodes</div>
            <div className="font-semibold tabular-nums">{totalNodes}</div>
          </div>
          <div>
            <div className="text-zinc-500 text-[9px] uppercase tracking-wider">Leaves</div>
            <div className="font-semibold tabular-nums">{totalLeaves}</div>
          </div>
        </div>
      </div>
      <svg width={PANEL_W} height={icicleH} className="block bg-zinc-950 flex-1">
        {rects.map(r => {
          const isVisible = visibleNodeIds.has(r.node.nodeId)
          const fill = TYPE_COLORS[r.node.type] ?? '#a1a1aa'
          const fillOpacity = isVisible ? 0.95 : 0.22
          const strokeOpacity = isVisible ? 0.6 : 0.15
          return (
            <rect
              key={r.node.nodeId}
              x={r.x}
              y={r.y}
              width={Math.max(0, r.w - 0.5)}
              height={Math.max(0, r.h - 0.5)}
              fill={fill}
              fillOpacity={fillOpacity}
              stroke="#09090b"
              strokeOpacity={strokeOpacity}
              strokeWidth={0.5}
            >
              <title>
                {`${r.node.name}\nDepth ${r.node.depth} · ${r.node.leafCount} leaf${r.node.leafCount === 1 ? '' : 'es'}${r.node.stopReason ? ` · ${r.node.stopReason}` : ''}`}
              </title>
            </rect>
          )
        })}
      </svg>
      <div
        className="px-3 border-t border-white/5 text-[10px] text-zinc-400 flex items-center justify-between"
        style={{ height: FOOTER_H }}
      >
        <span>Visible</span>
        <span className="tabular-nums text-zinc-200 font-semibold">{visibleCount} / {totalNodes} ({visiblePct}%)</span>
      </div>
    </div>
  )
}
