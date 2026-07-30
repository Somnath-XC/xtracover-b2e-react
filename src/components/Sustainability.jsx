import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const points = [
  'Reduce unnecessary demand for newly manufactured devices',
  'Keep functional technology in productive use for longer',
  'Limit premature electronic disposal',
  'Support circular technology practices',
  'Reduce the environmental impact of frequent device replacement',
  'Build sustainability into everyday IT procurement decisions',
]

export default function Sustainability() {
  return (
    <section className="section-space bg-[#f4f9ff]">
      <div className="container-site grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading
            eyebrow="Sustainable IT procurement"
            title="Extend Device Life. Reduce Technology Waste."
            text="A responsible procurement strategy does not always require buying new technology. Choosing professionally refurbished devices allows businesses to extend the useful life of functional assets while meeting everyday workplace requirements."
          />
          <a href="#quote" className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700">
            Build a Smarter Device Strategy <Icon name="arrow" className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal delay={90}>
          <div className="rounded-[30px] bg-gradient-to-br from-brand-950 via-brand-900 to-cyan-800 p-7 text-white shadow-2xl shadow-blue-950/20 md:p-9">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-300 text-emerald-950"><Icon name="leaf" className="h-6 w-6" /></span>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-cyan-200">Your organisation can</p>
                <h3 className="mt-1 text-2xl font-bold">Make sustainability part of everyday procurement</h3>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[.055] p-4 text-sm leading-6 text-blue-50/90">
                  <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
                  {point}
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl bg-white p-5 text-brand-950">
              <h4 className="text-lg font-bold">Better Value for Your Business and the Planet</h4>
              <p className="mt-2 text-sm leading-6 text-slate-600">Refurbished procurement can support cost-efficiency and responsible technology use without compromising the essential performance your workforce needs.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
