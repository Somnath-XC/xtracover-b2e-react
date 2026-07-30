import Icon from './Icon'
import Reveal from './Reveal'

export default function PreFormStrip() {
  return (
    <section className="bg-[#f3f7ff] py-14">
      <div className="container-site">
        <Reveal>
          <div className="flex flex-col justify-between gap-7 rounded-[26px] border border-blue-100 bg-white p-7 shadow-[0_18px_50px_rgba(15,35,92,.07)] md:p-9 lg:flex-row lg:items-center">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand-600">Upcoming deployment</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-.04em] text-brand-950">Need Devices for an Upcoming Deployment?</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Share your quantity, specifications and delivery timeline to receive availability-based recommendations and bulk pricing. For urgent requirements, speak directly with our corporate device team.</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a href="#quote" className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-brand-700">Request Bulk Pricing <Icon name="arrow" className="h-4 w-4" /></a>
              <a href="#quote" className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-200 px-6 text-sm font-bold text-brand-700 transition hover:-translate-y-0.5 hover:border-brand-300">Talk to an Expert</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
