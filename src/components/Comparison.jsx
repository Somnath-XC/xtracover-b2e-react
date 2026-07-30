import Icon from './Icon'
import Reveal from './Reveal'

const comparisonRows = [
  {
    criterion: 'Quality & Inspection',
    used: 'Limited or unknown testing',
    certified: 'Structured, multi-point quality checks',
  },
  {
    criterion: 'Device Preparation',
    used: 'No standard preparation',
    certified: 'Professionally cleaned, reset and prepared',
  },
  {
    criterion: 'Transparency',
    used: 'Limited device information',
    certified: 'Clear specifications and condition grading',
  },
  {
    criterion: 'Warranty & After-Sales',
    used: 'No dependable after-sales support',
    certified: 'Dedicated warranty support included',
  },
  {
    criterion: 'Seller Reliability',
    used: 'Individual seller dependency',
    certified: 'Backed by a dedicated business support team',
  },
]

export default function Comparison() {
  return (
    <section id="comparison" className="section-space bg-white">
      <div className="container-site">
        <div>
          <Reveal>
            <div>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-brand-600 sm:text-xs">
                <span className="h-px w-9 bg-brand-500" />
                Know what your business is buying
              </div>
              <h2 className="mt-5 max-w-4xl text-balance text-4xl leading-[1.06] text-brand-950 sm:text-5xl lg:text-[54px]">
                <span className="block">Certified Refurbished</span>
                <span className="block">vs Used Devices</span>
              </h2>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <div className="hidden overflow-hidden rounded-[28px] border border-slate-200 shadow-[0_26px_70px_rgba(15,35,92,.08)] md:block">
            <div className="grid grid-cols-[.72fr_1fr_1fr] bg-brand-950 text-white">
              <div className="p-5 text-xs font-semibold uppercase tracking-[.12em] text-blue-200 sm:p-6">Comparison</div>
              <div className="border-l border-white/10 p-5 sm:p-6">
                <span className="text-sm font-semibold">Used Device</span>
                <span className="mt-1 block text-[10px] leading-4 text-blue-100/55">Sold in its existing condition</span>
              </div>
              <div className="border-l border-white/10 bg-brand-800/60 p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-300 text-brand-950">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-semibold">XtraCover Certified Refurbished</span>
                </div>
                <span className="mt-1 block pl-8 text-[10px] leading-4 text-blue-100/65">Prepared for business deployment</span>
              </div>
            </div>

            {comparisonRows.map((row, index) => (
              <div key={row.criterion} className={`grid grid-cols-[.72fr_1fr_1fr] ${index % 2 === 0 ? 'bg-white' : 'bg-[#f7faff]'}`}>
                <div className="p-5 text-sm font-semibold leading-6 text-brand-950 sm:p-6">{row.criterion}</div>
                <div className="flex items-start gap-3 border-l border-slate-200 p-5 text-sm leading-6 text-slate-500 sm:p-6">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-red-100 bg-red-50 text-red-600" aria-hidden="true">
                    <Icon name="close" className="h-3 w-3" />
                  </span>
                  {row.used}
                </div>
                <div className="flex items-start gap-3 border-l border-brand-100 bg-brand-50/35 p-5 text-sm font-semibold leading-6 text-brand-950 sm:p-6">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  {row.certified}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:hidden">
            {comparisonRows.map((row) => (
              <article key={row.criterion} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,35,92,.06)]">
                <h3 className="border-b border-slate-100 bg-slate-50 px-5 py-4 text-sm text-brand-950">{row.criterion}</h3>
                <div className="grid gap-0">
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-[.13em] text-slate-400">Used Device</span>
                    <p className="mt-2 flex items-start gap-3 text-sm leading-6 text-slate-500">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-red-100 bg-red-50 text-red-600" aria-hidden="true">
                    <Icon name="close" className="h-3 w-3" />
                  </span>
                      {row.used}
                    </p>
                  </div>
                  <div className="border-t border-brand-100 bg-brand-50/55 p-5">
                    <span className="text-[10px] font-bold uppercase tracking-[.13em] text-brand-600">XtraCover Certified Refurbished</span>
                    <p className="mt-2 flex items-start gap-3 text-sm font-semibold leading-6 text-brand-950">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                        <Icon name="check" className="h-3 w-3" />
                      </span>
                      {row.certified}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-9">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-brand-100 bg-gradient-to-r from-brand-50 to-white p-6 sm:flex-row sm:items-center sm:p-7">
            <div>
              <h3 className="text-xl text-brand-950">Choose verified devices, not uncertain condition</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Get clearer specifications, structured preparation and business support before your team receives the devices.</p>
            </div>
            <a href="#quote" className="inline-flex min-h-[50px] shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700">
              Speak with a Device Expert <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
