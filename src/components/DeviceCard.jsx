import Icon from './Icon'
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

  const iconClasses = {
    blue: 'from-brand-50 to-brand-100 text-brand-600',
    cyan: 'from-cyan-50 to-teal-100 text-teal-600',
    violet: 'from-violet-50 to-purple-100 text-violet-600',
  }

  return (
    <article
      className={`group relative flex h-full min-h-[390px] w-full flex-col overflow-hidden rounded-[28px] border p-5 transition duration-300 hover:-translate-y-1 sm:p-6 ${
        featured
          ? 'border-brand-200/80 bg-gradient-to-br from-[#f7faff] via-[#edf5ff] to-[#f8fbff] shadow-[0_20px_55px_rgba(15,48,112,.12)] hover:shadow-[0_28px_70px_rgba(15,48,112,.17)]'
          : 'border-slate-200/90 bg-white shadow-[0_20px_55px_rgba(16,39,87,.09)] hover:shadow-[0_28px_70px_rgba(16,39,87,.14)]'
      }`}
    >
      <div className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${accentClasses[accent] || accentClasses.blue}`} />

      <div className="flex min-h-12 items-start">
        {featured ? (
          <span className="inline-flex w-fit rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-4 py-2 text-[10px] font-bold uppercase tracking-[.12em] text-white shadow-[0_10px_24px_rgba(37,70,150,.24)]">
            Primary category
          </span>
        ) : (
          <span className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${iconClasses[accent] || iconClasses.blue}`}>
            <Icon name={icon} className="h-6 w-6" />
          </span>
        )}
      </div>

      <div className="flex h-[205px] shrink-0 items-center justify-center py-2">
        <DeviceArtwork type={type} />
      </div>

      <h3 className="min-h-[44px] text-[22px] font-semibold leading-[1.08] tracking-[-.03em] text-brand-950">
        {`Refurbished ${featured ? 'Laptops' : title}`}
      </h3>

      <WarrantyBadge className="mt-0.5" />
    </article>
  )
}


function WarrantyBadge({ className = '' }) {
  return (
    <div className={className}>
      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-700">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <Icon name="shield" className="h-3.5 w-3.5" />
        </span>
        Pan India Services
      </div>
    </div>
  )
}
