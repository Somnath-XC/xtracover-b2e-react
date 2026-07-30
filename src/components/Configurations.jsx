import { configs } from '../data/content'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Configurations() {
  return (
    <section className="section-space bg-white">
      <div className="container-site">
        <div>
          <Reveal><SectionHeading eyebrow="Popular configurations" title={<><span className="block">Match device specifications</span><span className="block">to the work</span></>} /></Reveal>
          </div>

        <div className="configuration-card-grid mt-16 grid gap-5 sm:mt-20 lg:mt-24 lg:grid-cols-3">
          {configs.map((config, index) => (
            <Reveal key={config.tier} delay={index * 75}>
              <article className={`relative h-full rounded-[26px] bg-white p-7 ${config.featured ? 'border-2 border-brand-600 shadow-2xl shadow-blue-950/10 lg:-translate-y-3' : 'border border-slate-200 shadow-sm'}`}>
                {config.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1.5 text-[8px] font-extrabold uppercase tracking-[0.15em] text-white">Most versatile</span>}
                <span className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-brand-600">{config.tier}</span>
                <h3 className="mt-3 text-xl font-black tracking-[-0.03em] text-brand-950">{config.title}</h3>
                <div className="mt-6 rounded-2xl bg-slate-50 p-5"><strong className="block text-lg text-brand-950">{config.processor}</strong><span className="mt-1 block text-xs text-slate-500">{config.spec}</span></div>
                <ul className="mt-6 grid min-h-[125px] gap-3 text-sm text-slate-600">
                  {[...config.points, 'Warranty support included'].map((point) => <li key={point} className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />{point}</li>)}
                </ul>
                <a href="#quote" className={`mt-7 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl text-sm font-bold transition hover:-translate-y-0.5 ${config.featured ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'border border-slate-200 text-brand-700 hover:border-brand-300'}`}>Request Quote</a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
