import Icon from './Icon';
import Reveal from './Reveal';
import heroLaptop from "../assets/hero-laptop.png";

const proofItems = [
  '67-Point Quality Check',
  'QC Certificates and audit logs ',
  'Warranty-Backed Devices',
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
              Business-ready refurbished gadgets
            </div>

            <h1 className="hero-heading text-balance font-black tracking-[-0.065em] text-brand-950">
              Certified Refurbished Laptops for Businesses 
            </h1>

            <p className="hero-description max-w-xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
              Equip your workforce with professionally tested business laptops while reducing IT procurement costs by up to 70%. 
            </p>

            <div className="hero-proof-grid grid pb-4 pt-2 gap-3 sm:grid-cols-2">
              {proofItems.map((item) => (
                <div key={item} className="hero-proof-item flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="hero-actions flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="hero-action inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-brand-600 px-7 text-sm font-bold text-white shadow-xl shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700">
                Get Quote <Icon name="arrow" className="h-4 w-4" />
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
      <div><img src={heroLaptop} className="w-full" alt="laptop" /></div>

      <div className="hero-laptop-orbit hero-laptop-orbit-one" />
      <div className="hero-laptop-orbit hero-laptop-orbit-two" />
      <div className="absolute inset-x-[10%] bottom-5 h-24 rounded-[50%] bg-brand-950/15 blur-3xl" />
      <div className="float-slow hero-floating-badge absolute right-0 top-0 z-20 sm:-right-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Icon name="check" /></span>
        <div className="text-sm font-semibold">Quality Check</div>
      </div>

      <div className="float-slower hero-floating-badge absolute -bottom-1 left-0 z-20 sm:-left-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-600"><Icon name="shield" /></span>
        <div className="text-sm font-semibold">Warranty included</div>
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
