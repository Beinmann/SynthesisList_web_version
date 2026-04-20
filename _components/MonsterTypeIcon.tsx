'use client'

import React from 'react'
import { MonsterType } from './_data'

const icons: Record<string, React.ReactNode> = {
  slime: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c4.418 0 8-3.582 8-8 0-4.418-3.582-12-8-12s-8 7.582-8 12c0 4.418 3.582 8 8 8z" />
      <path d="M9 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0z" fill="currentColor" />
      <path d="M13 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0z" fill="currentColor" />
    </svg>
  ),
  nature: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2a7 7 0 0 1-9 8.8zm0 0v-2" />
      <path d="M11 20c2-2 3-5 3-5" />
    </svg>
  ),
  material: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20M2 14h20M2 8h20M7 8v6M17 8v6M12 14v6M12 2v6M7 14v6M17 14v6" />
    </svg>
  ),
  dragon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8c0 0 4-4 8-4s8 4 8 4-4 4-8 4-8-4-8-4z" />
      <path d="M12 4v8" />
      <path d="M8 6l4 2 4-2" />
      <path d="M4 8l8 12 8-12" />
    </svg>
  ),
  undead: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M10 16h4" />
      <path d="M18 13a6 6 0 1 0-12 0c0 3 2 5 2 7h8s2-4 2-7z" />
    </svg>
  ),
  demon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10c0-3.87 3.13-7 7-7s7 3.13 7 7c0 3.87-3.13 7-7 7s-7-3.13-7-7z" />
      <path d="M12 17v5" />
      <path d="M8 2h1" />
      <path d="M15 2h1" />
      <path d="M9 22h6" />
    </svg>
  ),
  incarnus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  beast: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="5" r="2" fill="currentColor" />
      <circle cx="17" cy="5" r="2" fill="currentColor" />
      <circle cx="3" cy="10" r="2" fill="currentColor" />
      <circle cx="21" cy="10" r="2" fill="currentColor" />
      <path d="M12 12c-3 0-6 2-6 5s3 5 6 5s6-2 6-5s-3-5-6-5z" />
    </svg>
  ),
  '???': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

const colors: Record<string, string> = {
  slime: 'text-blue-400',
  nature: 'text-green-400',
  material: 'text-zinc-400',
  dragon: 'text-yellow-400',
  undead: 'text-fuchsia-400',
  demon: 'text-red-400',
  incarnus: 'text-white',
  beast: 'text-orange-400',
  '???': 'text-zinc-500'
}

export function MonsterTypeIcon({ type, className = "w-4 h-4" }: { type: string; className?: string }) {
  const normalizedType = type.toLowerCase()
  const icon = icons[normalizedType] || icons['???']
  const color = colors[normalizedType] || colors['???']

  return (
    <div className={`${color} ${className} flex-shrink-0`} title={type}>
      {icon}
    </div>
  )
}
