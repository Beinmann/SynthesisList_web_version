'use client'

import { Handle, Position } from '@xyflow/react'
import type { Rank, MonsterType } from './_data'

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

const typeColors: Record<MonsterType, string> = {
  slime:    'border-blue-400/50 text-blue-400 bg-blue-400/10',
  nature:   'border-green-400/50 text-green-400 bg-green-400/10',
  material: 'border-zinc-400/50 text-zinc-400 bg-zinc-400/10',
  dragon:   'border-yellow-400/50 text-yellow-400 bg-yellow-400/10',
  undead:   'border-fuchsia-400/50 text-fuchsia-400 bg-fuchsia-400/10',
  demon:    'border-red-400/50 text-red-400 bg-red-400/10',
  incarnus: 'border-white/50 text-white bg-white/10',
  beast:    'border-orange-400/50 text-orange-400 bg-orange-400/10',
}

export interface MonsterNodeData extends Record<string, unknown> {
  name: string
  rank: Rank
  type: MonsterType
  nodeId: string
  recipeIndex: number
  recipeCount: number
  depth: number
  leafCount: number
  truncated: boolean
  onMakeRoot: (name: string) => void
  onCycleRecipe: (nodeId: string, dir: 1 | -1) => void
}

export default function MonsterNode({ data }: { data: MonsterNodeData }) {
  const rankCls = rankColors[data.rank] ?? 'from-zinc-600 to-zinc-500 text-white'
  const typeCls = typeColors[data.type] ?? 'border-zinc-600 text-zinc-400 bg-zinc-600/10'

  return (
    <div className={`group relative rounded-xl border border-white/10 bg-zinc-900/80 backdrop-blur-md px-3 py-2.5 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:shadow-white/5 min-w-[160px]`}>
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

      {/* Bottom Bar: Type & Recipe Cycling */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${typeCls} capitalize whitespace-nowrap`}>
          {data.type}
        </span>
        
        {data.recipeCount > 1 && (
          <div className="flex items-center gap-1 bg-zinc-800/50 rounded-lg p-0.5 border border-white/5">
            <button
              onClick={e => { e.stopPropagation(); data.onCycleRecipe(data.nodeId, -1) }}
              className="text-zinc-500 hover:text-white transition-colors p-0.5"
              title="Previous recipe"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-[10px] font-mono text-zinc-400 min-w-[20px] text-center">
              {data.recipeIndex + 1}
            </span>
            <button
              onClick={e => { e.stopPropagation(); data.onCycleRecipe(data.nodeId, 1) }}
              className="text-zinc-500 hover:text-white transition-colors p-0.5"
              title="Next recipe"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="text-[8px] text-zinc-700 font-mono">d{data.depth}</div>
      </div>

      <Handle type="source" position={Position.Top} className="!w-2 !h-2 !bg-zinc-500 !border-none !transition-colors group-hover:!bg-white" />
    </div>
  )
}
