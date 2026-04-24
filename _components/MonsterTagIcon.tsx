'use client'

import React from 'react'
import { MonsterTag } from './_data/monsters'

const icons: Record<MonsterTag, React.ReactNode> = {
  base: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  synth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v10" />
      <path d="m16 8-4 4-4-4" />
      <path d="M6 20h12" />
      <path d="M12 12v4" />
    </svg>
  ),
  special: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  intermediate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
    </svg>
  )
}

const colors: Record<MonsterTag, string> = {
  base: 'text-emerald-400',
  synth: 'text-indigo-400',
  special: 'text-amber-400',
  intermediate: 'text-zinc-500'
}

export function MonsterTagIcon({ tag, className = "w-4 h-4" }: { tag: MonsterTag; className?: string }) {
  const icon = icons[tag]
  const color = colors[tag]

  return (
    <div className={`${color} ${className} flex-shrink-0`} title={tag}>
      {icon}
    </div>
  )
}
