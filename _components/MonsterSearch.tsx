'use client'

import { useState, useRef } from 'react'
import { monsters } from './_data'
import { MonsterTypeIcon } from './MonsterTypeIcon'
import { MonsterTagIcon } from './MonsterTagIcon'

interface Props {
  onSelect: (name: string) => void
}

export default function MonsterSearch({ onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = query.length < 1 ? [] : monsters
    .filter(m => m.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 10)

  function select(name: string) {
    setQuery(name)
    setOpen(false)
    onSelect(name)
    inputRef.current?.blur()
  }

  return (
    <div className="relative w-72 group">
      <div className="absolute inset-0 bg-white/5 rounded-xl blur-xl group-focus-within:bg-white/10 transition-all opacity-0 group-focus-within:opacity-100" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search monster…"
        className="relative w-full rounded-xl border border-white/10 bg-zinc-900/90 backdrop-blur-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 shadow-2xl focus:outline-none focus:border-white/30 transition-all"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full rounded-xl border border-white/10 bg-zinc-900/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {results.map(m => (
            <li
              key={m.name}
              onMouseDown={() => select(m.name)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-none"
            >
              <span className="text-zinc-500 text-[10px] w-4 font-black uppercase tracking-tighter">{m.rank}</span>
              <span className="text-zinc-100 font-medium flex-1 truncate">{m.name}</span>
              <div className="ml-auto flex flex-wrap items-center justify-end gap-x-3 gap-y-1 max-w-[55%]">
                <div className="flex items-center gap-1.5">
                  <MonsterTypeIcon type={m.type} className="w-3 h-3" />
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{m.type}</span>
                </div>
                {m.tags.map(tag => (
                  <div key={tag} className="flex items-center gap-1">
                    <MonsterTagIcon tag={tag} className="w-3 h-3" />
                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{tag}</span>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
