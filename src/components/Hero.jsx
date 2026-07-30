import Icon from './Icon'
import Reveal from './Reveal'

const proofItems = [
  'Business-grade refurbished laptops',
  'Rigorous 67-parameter Quality Check ',
  'QC Certificates and audit logs ',
  'Nationwide Warranty & Service Support You Can Rely On  ',
  'PAN India delivery ',
]

const stats = [
  ['70%', 'Potential procurement savings'],
  ['10 point', 'Structured device preparation'],
  ['4 categories', 'Laptops, desktops, mobiles and tablets'],
]

const devices = [
  ['Professional Laptop', 'Core i5 · 16GB · 512GB', 'Ready', '92%'],
  ['Essential Laptop', 'Core i3 · 8GB · 256GB', 'Testing', '68%'],
]

export default function Hero() {
  return (
    <section id="top" className="hero-section hero-light blue-grid relative overflow-hidden">
      <div className="absolute -left-24 bottom-12 h-64 w-64 rounded-full border border-brand-100 bg-white/40 shadow-[0_0_0_50px_rgba(37,70,150,.025)]" />
      <div className="absolute right-[6%] top-10 h-64 w-64 rounded-full bg-cyan-100/40 blur-sm" />
      <div className="absolute right-[19%] top-0 h-[520px] w-px rotate-[18deg] bg-gradient-to-b from-transparent via-brand-100 to-transparent" />

      <div className="hero-layout container-site relative grid items-center">
        <Reveal>
          <div className="hero-copy max-w-[610px]">
            <div className="hero-eyebrow mb-5 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.19em] text-brand-600">
              <span className="h-0.5 w-8 rounded-full bg-current" />
              Business-ready refurbished technology
            </div>

            <h1 className="hero-heading text-balance font-black tracking-[-0.065em] text-brand-950">
              Certified Refurbished Laptops for Businesses 
            </h1>

            <p className="hero-description mt-7 max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Equip your workforce with professionally tested business laptops while reducing IT procurement costs by up to 70%. 
            </p>

            <p className="hero-description mt-7 max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Every device is quality checked, supported by a device-level QC certificate and covered by warranty, giving procurement and IT teams greater confidence before deployment. </p>

            

            <div className="hero-proof-grid mt-8 grid gap-3 sm:grid-cols-2">
              {proofItems.map((item) => (
                <div key={item} className="hero-proof-item flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="hero-action inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-brand-600 px-7 text-sm font-bold text-white shadow-xl shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700">
                Get Bulk Quote <Icon name="arrow" className="h-4 w-4" />
              </a>
              <a href="#solutions" className="hero-action inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-7 text-sm font-bold text-brand-950 backdrop-blur transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-white">
                Explore Business Devices <Icon name="arrow" className="h-4 w-4" />
              </a>
            </div>

          </div>
        </Reveal>

        <Reveal delay={120} className="hero-visual relative lg:pl-4">
          <AnimatedLaptop />
        </Reveal>
      </div>
    </section>
  )
}

function AnimatedLaptop() {
  return (
    <div className="hero-laptop-stage relative mx-auto max-w-[690px] py-8 sm:px-5">
      <div className="hero-laptop-orbit hero-laptop-orbit-one" />
      <div className="hero-laptop-orbit hero-laptop-orbit-two" />
      <div className="absolute inset-x-[10%] bottom-5 h-24 rounded-[50%] bg-brand-950/15 blur-3xl" />

      <div className="hero-laptop-float relative z-10">
        <div className="hero-laptop-shell">
          <div className="hero-laptop-camera" />
          <div className="hero-laptop-display">
            <div className="hero-console-topbar">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-300" />
                <span className="h-2 w-2 rounded-full bg-amber-300" />
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
              </div>
              <span className="font-extrabold text-slate-500">XtraCover Business Console</span>
              <span className="hero-live-dot"><i /> Live</span>
            </div>

            <div className="hero-console-layout">
              <aside className="hero-console-sidebar" aria-hidden="true">
                <span className="is-active"><Icon name="monitor" className="h-4 w-4" /></span>
                <span><Icon name="laptop" className="h-4 w-4" /></span>
                <span><Icon name="shield" className="h-4 w-4" /></span>
                <span><Icon name="truck" className="h-4 w-4" /></span>
              </aside>

              <div className="min-w-0 p-3 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-[.15em] text-brand-500 sm:text-[9px]">Deployment overview</p>
                    <h3 className="mt-1 text-sm font-black text-brand-950 sm:text-lg">Business devices in motion</h3>
                  </div>
                  <span className="hero-quality-pill"><Icon name="check" className="h-3 w-3" /> Quality verified</span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
                  <MetricCard value="128" label="Devices" index={1} />
                  <MetricCard value="91%" label="QC pass" index={2} />
                  <MetricCard value="24h" label="Dispatch" index={3} />
                </div>

                <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-[1.25fr_.75fr]">
                  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
                    <div className="flex items-center justify-between">
                      <strong className="text-[8px] text-brand-950 sm:text-[10px]">Order preparation</strong>
                      <span className="text-[7px] font-bold text-emerald-600 sm:text-[9px]">On track</span>
                    </div>
                    <div className="mt-3 grid gap-2.5">
                      {devices.map(([name, spec, status, progress], index) => (
                        <div key={name} className="hero-device-item" style={{ '--device-delay': `${0.65 + index * 0.22}s` }}>
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600 sm:h-9 sm:w-9">
                            <Icon name="laptop" className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex justify-between gap-2">
                              <strong className="truncate text-[7px] text-brand-950 sm:text-[9px]">{name}</strong>
                              <small className="text-[6px] font-bold text-brand-500 sm:text-[8px]">{status}</small>
                            </div>
                            <p className="truncate text-[6px] text-slate-400 sm:text-[7px]">{spec}</p>
                            <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">
                              <span className="hero-device-progress" style={{ '--progress': progress, '--progress-delay': `${index * 0.35}s` }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="hero-activity-card rounded-xl bg-gradient-to-br from-brand-700 to-brand-950 p-3 text-white shadow-lg shadow-brand-950/15 sm:p-4">
                    <span className="text-[7px] font-bold uppercase tracking-[.12em] text-blue-200 sm:text-[8px]">Active categories</span>
                    <div className="mt-3 flex h-[62px] items-end gap-1.5 sm:h-[78px]">
                      {[45, 72, 54, 90, 66, 82, 58].map((height, index) => (
                        <span key={height + index} className="hero-chart-bar" style={{ '--bar-height': `${height}%`, '--bar-grow-delay': `${0.9 + index * 0.09}s`, '--bar-wave-delay': `${1.9 + index * 0.12}s` }} />
                      ))}
                    </div>
                    <div className="mt-2 flex justify-between text-[6px] text-blue-200 sm:text-[7px]"><span>Laptops</span><span>Scale</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-laptop-base"><span /></div>
      </div>

      <div className="float-slow hero-floating-badge absolute right-0 top-0 z-20 sm:-right-2">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon name="arrow" /></span>
        <div><strong>Up to 70%</strong><small>procurement savings</small></div>
      </div>

      <div className="float-slower hero-floating-badge absolute -bottom-1 left-0 z-20 sm:-left-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Icon name="shield" /></span>
        <div><strong>Warranty included</strong><small>Clear support path</small></div>
      </div>
    </div>
  )
}

function MetricCard({ value, label, index }) {
  return (
    <div className="hero-metric-card rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm sm:p-3" style={{ '--metric-delay': `${0.25 + index * 0.12}s` }}>
      <strong className="block text-sm font-black text-brand-950 sm:text-lg">{value}</strong>
      <span className="mt-0.5 block text-[6px] text-slate-400 sm:text-[8px]">{label}</span>
    </div>
  )
}
