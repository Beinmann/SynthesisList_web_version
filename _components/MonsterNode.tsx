'use client'

import { Handle, Position } from '@xyflow/react'
import type { Rank, MonsterType } from './_data'

const rankColors: Record<Rank, string> = {
  X: 'bg-fuchsia-500 text-white',
  S: 'bg-yellow-400 text-black',
  A: 'bg-red-500 text-white',
  B: 'bg-orange-400 text-black',
  C: 'bg-green-500 text-white',
  D: 'bg-blue-500 text-white',
  E: 'bg-zinc-200 text-black',
  F: 'bg-zinc-400 text-black',
}

const typeColors: Record<MonsterType, string> = {
  slime:    'border-blue-400',
  nature:   'border-green-400',
  material: 'border-zinc-400',
  dragon:   'border-yellow-400',
  undead:   'border-fuchsia-400',
  demon:    'border-red-400',
  incarnus: 'border-white',
  beast:    'border-orange-400',
}

export interface MonsterNodeData {
  name: string
  rank: Rank
  type: MonsterType
  onMakeRoot: (name: string) => void
}

export default function MonsterNode({ data }: { data: MonsterNodeData }) {
  const rankCls = rankColors[data.rank] ?? 'bg-zinc-600 text-white'
  const borderCls = typeColors[data.type] ?? 'border-zinc-600'

  return (
    <div
      className={`rounded-lg border-2 ${borderCls} bg-zinc-900 px-3 py-2 text-sm shadow-md min-w-[120px] cursor-pointer hover:brightness-125 transition-all`}
      onClick={() => data.onMakeRoot(data.name)}
      title="Click to make root"
    >
      <Handle type="target" position={Position.Bottom} className="!bg-zinc-600" />
      <div className="flex items-center gap-2">
        <span className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-bold ${rankCls}`}>
          {data.rank}
        </span>
        <span className="text-zinc-100 font-medium leading-tight">{data.name}</span>
      </div>
      <div className="mt-1 text-[10px] text-zinc-500 capitalize">{data.type}</div>
      <Handle type="source" position={Position.Top} className="!bg-zinc-600" />
    </div>
  )
}
