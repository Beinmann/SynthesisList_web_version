'use client'

import { useState, useRef } from 'react'
import { monsters } from './_data'

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
    <div className="relative w-72">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search monster…"
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-900 shadow-xl overflow-hidden">
          {results.map(m => (
            <li
              key={m.name}
              onMouseDown={() => select(m.name)}
              className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-800 cursor-pointer"
            >
              <span className="text-zinc-400 text-xs w-4 font-bold">{m.rank}</span>
              <span className="text-zinc-100">{m.name}</span>
              <span className="ml-auto text-[10px] text-zinc-500 capitalize">{m.type}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
