import Reveal from './Reveal'

export default function FinalCta() {
  return (
    <section className="bg-gradient-to-r from-cyan-500 via-blue-500 to-brand-700 py-11 text-white">
      <div className="container-site">
        <Reveal className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
          <div><span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-50/80">Ready to upgrade your business?</span><h2 className="mt-3 max-w-4xl text-2xl font-black leading-tight tracking-[-0.035em] md:text-3xl">Equip your teams with quality-checked devices with world-class warranty at a smarter price.</h2></div>
          <a href="#quote" className="inline-flex min-h-[48px] shrink-0 items-center rounded-xl bg-white px-6 text-sm font-bold text-brand-700 shadow-xl transition hover:-translate-y-0.5">Request Quote</a>
        </Reveal>
      </div>
    </section>
  )
}
