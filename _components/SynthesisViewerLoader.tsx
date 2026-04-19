'use client'

import dynamic from 'next/dynamic'

const SynthesisViewer = dynamic(() => import('./SynthesisViewer'), { ssr: false })

export default function SynthesisViewerLoader() {
  return <SynthesisViewer />
}
