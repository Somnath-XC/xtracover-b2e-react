import { useState } from 'react'
import { faqs } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section-space bg-white">
      <div className="container-site grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
        <Reveal>
          <SectionHeading eyebrow="Frequently asked questions" title="Frequently Asked Questions" text="Need a specific model, configuration or device mix? Share your requirements and the business team can recommend suitable available options." />
          <a href="#quote" className="mt-7 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-600">Contact Us</a>
        </Reveal>

        <Reveal delay={90}>
          <div className="border-t border-slate-200">
            {faqs.map(([question, answer], index) => {
              const active = open === index
              return (
                <div key={question} className="border-b border-slate-200">
                  <button type="button" onClick={() => setOpen(active ? -1 : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-bold text-brand-950 md:text-base">
                    <span>{question}</span><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-lg text-brand-600 transition ${active ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-300 ${active ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden"><p className="max-w-3xl pb-6 text-sm leading-7 text-slate-600">{answer}</p></div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
