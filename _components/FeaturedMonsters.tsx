'use client'

import { monsterByName } from './_data'
import type { Rank } from './_data'
import { MonsterTypeIcon } from './MonsterTypeIcon'

interface Props {
  onSelect: (name: string) => void
}

const FEATURED_NAMES: string[] = [
  'Estark',
  'Leonyx',
  'Mumboh-jumboe',
  'Liquidmetalslimeking',
  'Dragonlord',
  'Zoma',
  'Nokturnus',
  'Rhapthorne',
]

const rankBadge: Record<Rank, string> = {
  X: 'from-fuchsia-600 to-fuchsia-400 text-white shadow-[0_0_8px_rgba(232,121,249,0.45)]',
  S: 'from-yellow-500 to-yellow-300 text-black shadow-[0_0_8px_rgba(234,179,8,0.45)]',
  A: 'from-red-600 to-red-400 text-white',
  B: 'from-orange-500 to-orange-300 text-black',
  C: 'from-green-600 to-green-400 text-white',
  D: 'from-blue-600 to-blue-400 text-white',
  E: 'from-zinc-300 to-zinc-100 text-black',
  F: 'from-zinc-500 to-zinc-300 text-black',
}

export default function FeaturedMonsters({ onSelect }: Props) {
  const items = FEATURED_NAMES
    .map(n => monsterByName.get(n.toLowerCase()))
    .filter((m): m is NonNullable<typeof m> => m !== undefined)

  return (
    <div className="mt-8 w-full max-w-2xl">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 text-center mb-4">
        Or start with one of these
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {items.map(m => {
          const cls = rankBadge[m.rank] ?? 'from-zinc-600 to-zinc-500 text-white'
          return (
            <button
              key={m.name}
              onClick={() => onSelect(m.name)}
              className="group relative rounded-xl border border-white/10 bg-zinc-900/80 backdrop-blur-md px-3 py-2.5 text-left transition-all hover:scale-[1.03] hover:border-white/30 hover:bg-zinc-900 shadow-lg"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`rounded-md bg-gradient-to-br ${cls} px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider`}>
                  {m.rank}
                </span>
                <div className="flex items-center gap-1 bg-zinc-800/50 px-1.5 py-0.5 rounded-md border border-white/5">
                  <MonsterTypeIcon type={m.type} className="w-3 h-3 shrink-0" />
                  <span className="text-[9px] font-bold text-zinc-400 capitalize">
                    {m.type}
                  </span>
                </div>
              </div>
              <div className="text-zinc-100 font-bold text-sm leading-tight truncate group-hover:text-white">
                {m.name}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
