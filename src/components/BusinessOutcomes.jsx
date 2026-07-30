import { businessOutcomes } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function BusinessOutcomes() {
  return (
    <section className="section-space bg-white">
      <div className="container-site">
        <Reveal>
          <SectionHeading center eyebrow="Business outcomes" title="What Smarter Device Procurement Can Deliver" />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {businessOutcomes.map(([title, text], index) => (
            <Reveal key={title} delay={index * 60}>
              <article className="h-full rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-blue-950/5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-sm font-bold text-brand-600">0{index + 1}</span>
                <h3 className="mt-7 text-xl font-bold leading-tight text-brand-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
