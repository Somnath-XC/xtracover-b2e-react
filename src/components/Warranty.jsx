import Icon from './Icon'
import Reveal from './Reveal'

const supportSteps = [
  {
    number: '01',
    title: 'Raise a Support Request',
    text: 'Share the device details, order information and reported issue with the support team.',
  },
  {
    number: '02',
    title: 'Initial Assessment',
    text: 'The reported issue is reviewed against the applicable warranty terms and device records.',
  },
  {
    number: '03',
    title: 'Quick Resolution',
    text: 'The support team communicates the next steps based on the issue, coverage and serviceability.',
  },
  {
    number: '04',
    title: 'Ticket Closure',
    text: 'The resolution and relevant service details are recorded for future reference.',
  },
]

export default function Warranty() {
  return (
    <section id="warranty" className="warranty-section section-space overflow-hidden">
      <div className="container-site relative z-10">
        <div>
          <Reveal>
            <div>
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] text-cyan-300 sm:text-xs">
                <span className="h-px w-9 bg-cyan-300" />
                Nationwide support infrastructure
              </div>
              <h2 className="mt-4 max-w-5xl text-balance text-4xl leading-[1.05] text-white sm:text-5xl lg:text-[52px]">
                <span className="block">Nationwide Warranty &amp; Service Support</span>
              </h2>
              <p className='pt-3'>Every enterprise refurbished laptop is backed by warranty support designed to minimize disruption after deployment.</p>
              <p className='pb-3'>From initial diagnosis to service coordination and final resolution, businesses get a clear and accountable support process for every covered device.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={90}>
          <div className="warranty-coverage-strip mt-7 grid gap-3 sm:grid-cols-2">
            <CoverageMetric
              icon="mapPin"
              value="376+"
              title="Authorized Walk-In Centres"
              text="Localized, hands-on support across every major region."
            />
            <CoverageMetric
              icon="truck"
              value="18,500+"
              title="PIN Codes Covered"
              text="Doorstep support across Metro, Tier-2 and Tier-3 cities."
            />
          </div>
        </Reveal>

        <Reveal delay={110}>
          <div className="warranty-process-panel relative mt-5 overflow-hidden rounded-[26px] p-5 sm:p-6 lg:p-7">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative flex flex-col gap-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-cyan-300">Support Process</p>
                  <h3 className="mt-2 max-w-2xl text-2xl leading-tight text-white sm:text-3xl lg:text-[34px]">
                    Warranty Support Process
                  </h3>
                </div>

                
              </div>

              <ol className="support-process-grid grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {supportSteps.map((step) => (
                  <li
                    key={step.number}
                    className="support-process-card group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[.045] p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-white/[.075]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-300 text-xs font-semibold text-[#071a3d] shadow-[0_12px_26px_rgba(110,231,183,.18)]">
                        {step.number}
                      </span>
                      
                    </div>
                    <h4 className="mt-4 text-[15px] leading-5 text-white">{step.title}</h4>
                    <p className="mt-2 text-xs leading-5 text-blue-100/65">{step.text}</p>
                  </li>
                ))}
              </ol>
              <a
                  href="#quote"
                  className="inline-flex min-h-[48px] w-fit items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-brand-800 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  Discuss Warranty Coverage <Icon name="arrow" className="h-4 w-4" />
                </a>
              
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CoverageMetric({ icon, value, title, text }) {
  return (
    <div className="coverage-metric-card rounded-2xl border border-white/10 bg-white/[.045] p-4 sm:p-5">
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <div>
          <strong className="block text-2xl leading-none text-white sm:text-[28px]">{value}</strong>
          <h3 className="mt-2 text-sm text-white">{title}</h3>
          <p className="mt-1.5 text-xs leading-5 text-blue-100/55">{text}</p>
        </div>
      </div>
    </div>
  )
}
