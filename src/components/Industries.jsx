import { industries } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Industries() {
  return (
    <section id="industries" className="section-space bg-[#f5f9ff]">
      <div className="container-site">
        <Reveal><SectionHeading center eyebrow="Industries we serve" title="Business devices for different operating environments" /></Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(([title, text], index) => (
            <Reveal key={title} delay={(index % 3) * 60}>
              <article className="industry-card group relative min-h-[175px] overflow-hidden rounded-2xl border border-blue-100/60 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-blue-950/5">
                <span className="relative z-10 text-[9px] font-black text-brand-600">0{index + 1}</span>
                <h3 className="relative z-10 mt-7 text-lg font-black text-brand-950">{title}</h3>
                <p className="relative z-10 mt-2 text-sm leading-6 text-slate-600">{text}</p>
                <span className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan-50" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
