import SynthesisViewerLoader from './_components/SynthesisViewerLoader'

export default function DqmJ2Page() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-2">DQMJ2 Synthesis Tree</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-6">
        Interactive synthesis (breeding) tree for Dragon Quest Monsters: Joker 2.
        Search a monster to see all the parent combinations needed to create it.
      </p>
      <SynthesisViewerLoader />
    </div>
  )
}
