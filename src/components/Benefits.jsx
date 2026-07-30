import { benefits } from '../data/content'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Benefits() {
  return (
    <section className="section-space bg-[#f8fbff]">
      <div className="container-site grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
        <Reveal>
          <SectionHeading eyebrow="Smarter IT procurement" title="Procurement Process" text="Move from requirement planning to device deployment with ease. " />
          <a href="#quote" className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-600">Request a business quote <Icon name="arrow" className="h-4 w-4" /></a>
        </Reveal>

        <div className="overflow-hidden rounded-[30px] border border-blue-100/70 bg-white shadow-[0_25px_65px_rgba(15,35,92,.08)]">
          {benefits.map(([title, text], index) => (
            <Reveal key={title} delay={index * 65}>
              <article className="grid gap-4 border-b border-slate-100 p-6 last:border-0 sm:grid-cols-[46px_1fr] md:px-8 md:py-7">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-[10px] font-black text-brand-600">0{index + 1}</span>
                <div><h3 className="text-lg font-black text-brand-950">{title}</h3><p className="mt-1.5 text-sm leading-6 text-slate-600">{text}</p></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
