import { aboutCards } from '../data/content'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="section-space bg-[#f5f9ff]">
      <div className="container-site">
        <div className=" gap-8">
          <Reveal><SectionHeading eyebrow="About XtraCover B2E" title="Reduce CapEX Without Compromising Performance" /></Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 65}>
              <article className="group h-full min-h-[210px] rounded-2xl border border-blue-100/60 bg-white p-6 shadow-[0_14px_38px_rgba(15,35,92,.055)] transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-blue-950/5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white"><Icon name={card.icon} className="h-5 w-5" /></span>
                <h3 className="mt-7 text-lg font-black tracking-[-0.03em] text-brand-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
