'use client'

import { Handle, Position } from '@xyflow/react'
import type { Rank, MonsterType, MonsterTag } from './_data'
import { MonsterTypeIcon } from './MonsterTypeIcon'
import { MonsterTagIcon } from './MonsterTagIcon'

const rankColors: Record<Rank, string> = {
  X: 'from-fuchsia-600 to-fuchsia-400 text-white shadow-[0_0_10px_rgba(232,121,249,0.5)] animate-pulse-subtle',
  S: 'from-yellow-500 to-yellow-300 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)]',
  A: 'from-red-600 to-red-400 text-white',
  B: 'from-orange-500 to-orange-300 text-black',
  C: 'from-green-600 to-green-400 text-white',
  D: 'from-blue-600 to-blue-400 text-white',
  E: 'from-zinc-300 to-zinc-100 text-black',
  F: 'from-zinc-500 to-zinc-300 text-black',
}

export interface MonsterNodeData extends Record<string, unknown> {
  name: string
  rank: Rank
  type: MonsterType
  tags: MonsterTag[]
  nodeId: string
  recipeIndex: number
  recipeCount: number
  depth: number
  leafCount: number
  truncated: boolean
  folded: boolean
  phase?: 'exiting'
  // Rendered as context (parent/sibling of the current focus) — dimmed, and
  // the fold + recipe-cycle buttons are hidden since they would silently
  // mutate state for a node that isn't actually expanded in the tree.
  isContext?: boolean
  onMakeRoot: (name: string) => void
  onCycleRecipe: (nodeId: string, dir: 1 | -1) => void
  onToggleFold: (name: string) => void
}

export default function MonsterNode({ data }: { data: MonsterNodeData }) {
  const rankCls = rankColors[data.rank] ?? 'from-zinc-600 to-zinc-500 text-white'
  // Show fold button only when a toggle would actually change the view:
  // expanded (not truncated) → can fold; folded → can unfold.
  // Hide on depth-cap / base-stop truncation where toggling fold wouldn't help.
  // Context nodes suppress the button: the sibling isn't really expanded, so
  // folding it wouldn't change anything visible here.
  const canToggleFold = data.recipeCount > 0 && (data.folded || !data.truncated) && !data.isContext
  const showRecipeCycler = data.recipeCount > 1 && !data.isContext
  const ctxCls = data.isContext ? 'opacity-60 hover:opacity-100' : ''

  return (
    <div className={`group relative rounded-xl border border-white/10 bg-zinc-900/80 backdrop-blur-md px-3 py-2.5 shadow-2xl transition-all duration-[350ms] hover:scale-[1.02] hover:border-white/30 hover:shadow-white/5 w-[180px] ${ctxCls} ${data.phase === 'exiting' ? 'opacity-0 pointer-events-none scale-95' : ''}`}>
      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.05); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }
      `}</style>

      {data.truncated && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 w-[1px] h-12 pointer-events-none opacity-40"
          style={{
            backgroundImage: 'repeating-linear-gradient(to top, #71717a 0, #71717a 4px, transparent 4px, transparent 8px)',
          }}
        />
      )}

      <Handle type="target" position={Position.Bottom} className="!w-2 !h-2 !bg-zinc-500 !border-none !transition-colors group-hover:!bg-white" />

      {/* Top Bar: Rank & Leaf Count */}
      <div className="flex items-center justify-between mb-2">
        <span className={`rounded-md bg-gradient-to-br ${rankCls} px-2 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm`}>
          {data.rank}
        </span>
        <span className="text-[9px] font-medium text-zinc-500 bg-zinc-800/50 px-1.5 py-0.5 rounded-full">
          {data.leafCount} {data.leafCount === 1 ? 'leaf' : 'leaves'}
        </span>
      </div>

      {/* Monster Name */}
      <div
        className="cursor-pointer transition-all hover:translate-x-0.5"
        onClick={() => data.onMakeRoot(data.name)}
        title="Click to make root"
      >
        <span className="text-zinc-100 font-bold text-base leading-tight block truncate drop-shadow-sm">
          {data.name}
        </span>
      </div>

      {/* Bottom Bar: Type + Tag icons (fixed layout, same size regardless of tag count) */}
      <div className="mt-3 flex items-center gap-1.5">
        <div className="flex items-center gap-1.5 bg-zinc-800/50 px-2 py-1 rounded-lg border border-white/5 min-w-0">
          <MonsterTypeIcon type={data.type} className="w-3 h-3 shrink-0" />
          <span className="text-[10px] font-bold text-zinc-400 capitalize truncate">
            {data.type}
          </span>
        </div>
        <div className="flex items-center gap-1 ml-auto">
          {data.tags.map(tag => (
            <div
              key={tag}
              title={tag}
              className="flex items-center justify-center w-[22px] h-[22px] bg-zinc-800/50 rounded-md border border-white/5"
            >
              <MonsterTagIcon tag={tag} className="w-3 h-3" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="text-[8px] text-zinc-700 font-mono">d{data.depth}</div>
      </div>

      {canToggleFold && (
        <button
          onClick={e => { e.stopPropagation(); data.onToggleFold(data.name) }}
          title={data.folded ? 'Unfold recipe' : 'Fold recipe (↑)'}
          className={`nodrag absolute -top-2 -right-2 z-20 w-6 h-6 flex items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-all
            ${data.folded
              ? 'bg-amber-500/90 border-amber-300/50 text-amber-50 hover:bg-amber-400'
              : 'bg-zinc-900/95 border-white/20 text-zinc-300 hover:text-white hover:border-white/40'}`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {data.folded ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
            )}
          </svg>
        </button>
      )}

      <Handle type="source" position={Position.Top} className="!w-2 !h-2 !bg-zinc-500 !border-none !transition-colors group-hover:!bg-white" />

      {/* Recipe cycler — floats outside card so it doesn't affect the node's layout box */}
      {showRecipeCycler && (
        <div className="nodrag absolute left-1/2 top-full -translate-x-1/2 mt-1.5 z-20">
          <div className="flex items-center bg-zinc-900/95 backdrop-blur-md rounded-full border border-white/20 shadow-2xl shadow-black/60 overflow-hidden">
            <button
              onClick={e => { e.stopPropagation(); data.onCycleRecipe(data.nodeId, -1) }}
              className="w-7 h-7 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Previous recipe"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="px-2.5 text-[10px] font-bold tracking-wider text-zinc-100 whitespace-nowrap uppercase select-none">
              Recipe {data.recipeIndex + 1}
              <span className="text-zinc-500"> / {data.recipeCount}</span>
            </div>
            <button
              onClick={e => { e.stopPropagation(); data.onCycleRecipe(data.nodeId, 1) }}
              className="w-7 h-7 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Next recipe"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
