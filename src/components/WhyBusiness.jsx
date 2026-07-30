import { whyBusinessCards } from '../data/content'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function WhyBusiness() {
  return (
    <section className="section-space bg-white">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            center
            eyebrow="Why XtraCover Business"
            title="More Than Refurbished Devices"
            text="Buying refurbished technology for a business requires more than finding the lowest-priced device. Procurement teams need consistent quality, clear documentation, dependable support and confidence that every system is fit for deployment."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {whyBusinessCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 55}>
              <article className="group h-full min-h-[245px] rounded-2xl border border-blue-100/70 bg-[#f8fbff] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-xl hover:shadow-blue-950/5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-brand-600 shadow-sm transition group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-7 text-lg font-bold leading-tight text-brand-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
