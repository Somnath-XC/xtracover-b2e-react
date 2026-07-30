import { useEffect, useState } from 'react'
import { reviews } from '../data/content'
import Icon from './Icon'
import Reveal from './Reveal'

export default function Reviews() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % reviews.length), 5500)
    return () => window.clearInterval(timer)
  }, [])

  const review = reviews[active]
  const next = () => setActive((active + 1) % reviews.length)
  const previous = () => setActive((active - 1 + reviews.length) % reviews.length)

  return (
    <section id="reviews" className="reviews-bg section-space relative overflow-hidden text-white">
      <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-cyan-400/10" />
      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/10" />

      <div className="container-site relative">
        <Reveal className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.19em] text-cyan-200"><span className="h-0.5 w-8 bg-current" />What businesses say</div>
            <h2 className="mt-4 max-w-3xl text-balance text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-5xl">Procurement experiences that build confidence</h2>
          </div>
          <div className="lg:text-right">
            <div className="flex gap-1 text-amber-300 lg:justify-end">{Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" className="h-5 w-5 fill-current" />)}</div>
            <p className="mt-2 text-xs text-blue-100/50">Sample customer feedback for layout preview</p>
          </div>
        </Reveal>

        <div className="mt-11 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
          <Reveal>
            <article className="relative min-h-[340px] rounded-[30px] border border-white/10 bg-white/[0.08] p-7 backdrop-blur md:p-10">
              <div className="inline-flex rounded-full bg-cyan-300/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.15em] text-cyan-200">Client story</div>
              <div className="absolute right-8 top-8 flex gap-1 text-amber-300">{Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-9 max-w-3xl text-balance text-2xl font-semibold leading-9 md:text-3xl md:leading-[1.35]">{review.text}</p>
              <div className="mt-9 flex items-center gap-4 border-t border-white/10 pt-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-brand-500 font-black text-brand-950">XC</span>
                <div><strong className="block">{review.name}</strong><span className="text-xs text-blue-100/50">{review.role}</span></div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={90}>
            <aside className="h-full rounded-[30px] bg-white p-7 text-brand-950 shadow-2xl shadow-black/15 md:p-9">
              <Icon name="quote" className="h-10 w-10 text-emerald-500" />
              <h3 className="mt-8 text-2xl font-black tracking-[-0.04em]">Built for responsible business procurement</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">Consistent specifications, structured quotations and coordinated delivery help teams procure with confidence.</p>
              <ul className="mt-7 grid gap-3 text-sm text-slate-600">
                {['Consistent business configurations', 'Bulk order coordination', 'Clear delivery planning'].map((item) => <li key={item} className="flex gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 text-emerald-500" />{item}</li>)}
              </ul>
              <a href="#quote" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-brand-600">Discuss your requirement <Icon name="arrow" className="h-4 w-4" /></a>
            </aside>
          </Reveal>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" onClick={previous} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10" aria-label="Previous review"><Icon name="arrow" className="h-4 w-4 rotate-180" /></button>
          <div className="flex gap-2">{reviews.map((_, index) => <button key={index} type="button" onClick={() => setActive(index)} className={`h-2 rounded-full transition-all ${index === active ? 'w-8 bg-cyan-300' : 'w-2 bg-white/25'}`} aria-label={`Show review ${index + 1}`} />)}</div>
          <button type="button" onClick={next} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10" aria-label="Next review"><Icon name="arrow" className="h-4 w-4" /></button>
        </div>
        <p className="mt-4 text-center text-[10px] text-blue-100/30">Replace sample testimonials with verified customer feedback before publishing.</p>
      </div>
    </section>
  )
}
