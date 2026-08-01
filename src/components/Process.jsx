import Icon from './Icon'
import Reveal from './Reveal'

const steps = [
  ['Share Your  Requirement', 'Provide the required quantity, configuration, use case, budget and delivery locations.'],
  ['Receive Recommendations', 'The business team identifies suitable models and configurations based on your requirements and available inventory.'],
  ['Review the Proposal', 'Receive device specifications, pricing, warranty details and estimated delivery timelines.'],
  ['Delivery & Post-Purchase', 'Devices are prepared and delivered to the agreed locations, with post-purchase support available under the applicable terms.'],
]

export default function Process() {
  return (
    <section className="section-space bg-white">
      <div className="container-site">
        <Reveal>
          <div className="process-panel relative overflow-hidden rounded-[34px] p-7 text-white shadow-2xl shadow-blue-950/20 md:p-12 lg:p-14">
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10 shadow-[0_0_0_55px_rgba(255,255,255,.025)]" />
            <div className="relative">
              <div className="flex items-center gap-3 text-[10px] font-extrabold uppercase tracking-[0.19em] text-cyan-200">
                <span className="h-0.5 w-8 bg-current" />
                Built for procurement teams
              </div>

              <h2 className="mt-6 text-balance text-4xl font-black leading-[1.02] tracking-[-0.05em] md:text-5xl">
                Procurement Process
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-blue-100/70">
                Move from requirement planning to device deployment with ease.
              </p>
            </div>

            <div className="relative mt-10 grid overflow-hidden rounded-2xl border border-white/10 bg-brand-950/40 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map(([title, text], index) => (
                <div key={title} className="border-b border-white/10 p-6 sm:border-r sm:odd:border-r lg:border-b-0">
                  <span className="text-[10px] font-black text-cyan-200">0{index + 1}</span>
                  <strong className="mt-7 block text-base">{title}</strong>
                  <p className="mt-2 text-xs leading-5 text-blue-100/60">{text}</p>
                </div>
              ))}
            </div>
            <a href="#quote" className="inline-flex mt-6 min-h-[50px] shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700">
                Request Quote <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
