import SynthesisViewerLoader from './_components/SynthesisViewerLoader'

export default function DqmJ2Page() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-transparent uppercase italic">
        Synthesis Matrix
      </h1>
      <p className="text-zinc-500 dark:text-zinc-500 mb-8 font-medium max-w-2xl leading-relaxed">
        Dragon Quest Monsters: Joker 2 interactive synthesis architecture. 
        Analyze monster origins, explore recursive parent trees, and discover hidden recipes.
      </p>
      <SynthesisViewerLoader />
    </div>
  )
}
