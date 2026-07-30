import Icon from '../ui/Icon'
import DeviceArtwork from './DeviceArtwork'


export default function DeviceCard({
  type,
  title,
  description,
  icon,
  accent = 'blue',
  featured = false,
}) {
  const accentClasses = {
    blue: 'from-brand-600 to-brand-500',
    cyan: 'from-cyan-500 to-sky-400',
    violet: 'from-violet-600 to-purple-500',
  }

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-[30px] border border-brand-200/80 bg-gradient-to-br from-[#f7faff] via-[#edf5ff] to-[#f8fbff] p-6 shadow-[0_24px_70px_rgba(15,48,112,.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_86px_rgba(15,48,112,.17)] sm:p-8 lg:min-h-[410px] lg:p-9">
        <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-brand-700 via-brand-500 to-blue-400" />
        <div className="absolute -right-20 bottom-12 h-64 w-64 rounded-full bg-brand-200/35 blur-2xl" />
        <div className="absolute right-[8%] top-[23%] h-56 w-56 rounded-full bg-white/65" />

        <div className="relative z-10 grid h-full items-center gap-8 lg:grid-cols-[.86fr_1.14fr]">
          <div className="flex h-full flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-white shadow-[0_10px_24px_rgba(37,70,150,.24)]">
              <Icon name="star" className="h-3.5 w-3.5 fill-current" />
              Primary category
            </span>

            <h3 className="mt-6 text-[27px] font-extrabold leading-[1.08] tracking-[-.035em] text-brand-950 sm:text-[26px]">
              Refurbished Laptops
            </h3>
            {/* <p className="mt-4 max-w-[340px] text-sm leading-6 text-slate-500">
              High-performance laptops built for productivity, reliability and business continuity.
            </p> */}

            <div className="my-5 h-px w-52 bg-slate-300/80" />

            <ul className="grid gap-3 text-xs font-medium text-slate-600 sm:text-[13px]">
              <li className="flex items-center gap-2.5"><Check />Enterprise-grade performance</li>
              <li className="flex items-center gap-2.5"><Check />Thoroughly tested &amp; certified</li>
              <li className="flex items-center gap-2.5"><Check />Cost savings with sustainability</li>
            </ul>

            <WarrantyBadge className="mt-auto pt-7" />
          </div>

          <div className="relative flex min-h-[280px] items-center justify-center lg:min-h-[340px]">
            <div className="absolute inset-x-[5%] bottom-[2%] h-20 rounded-[50%] bg-brand-900/10 blur-2xl" />
            <DeviceArtwork type="laptop" />
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group relative flex min-h-[410px] flex-col overflow-hidden rounded-[28px] border border-slate-200/90 bg-white p-5 shadow-[0_20px_55px_rgba(16,39,87,.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(16,39,87,.14)] sm:p-6">
      <div className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${accentClasses[accent]}`} />

      <span className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${accent === 'blue' ? 'from-brand-50 to-brand-100 text-brand-600' : accent === 'cyan' ? 'from-cyan-50 to-teal-100 text-teal-600' : 'from-violet-50 to-purple-100 text-violet-600'}`}>
        <Icon name={icon} className="h-6 w-6" />
      </span>

      <div className="flex h-[155px] items-center justify-center py-2">
        <DeviceArtwork type={type} />
      </div>

      <h3 className="text-[22px] font-extrabold leading-[1.05] tracking-[-.035em] text-brand-950">
        {title}
      </h3>
      <p className="mt-3 text-[13px] leading-5 text-slate-500">{description}</p>

      <WarrantyBadge className="mt-auto pt-1" compact />
    </article>
  )
}

function Check() {
  return (
    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-brand-600 text-[9px] font-black text-white">✓</span>
  )
}

function WarrantyBadge({ className = '', compact = false }) {
  return (
    <div className={className}>
      <div className={`inline-flex items-center gap-2 rounded-full bg-emerald-50 font-bold text-emerald-700 ${compact ? 'px-3 py-2 text-[10px]' : 'px-3.5 py-2 text-[11px]'}`}>
        <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-600 text-[9px] text-white">✓</span>
        World-class warranty included
      </div>
    </div>
  )
}
