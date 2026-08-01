import Reveal from './Reveal'
import Icon from './Icon'
import DeviceCard from './DeviceCard'

const secondaryDevices = [
  {
    type: 'desktop',
    icon: 'monitor',
    title: 'Desktops',
    description: 'Reliable desktops for fixed workstations and high-productivity teams.',
    accent: 'blue',
  },
  {
    type: 'mobile',
    icon: 'phone',
    title: 'Mobiles',
    description: 'Secure, high-quality devices for teams on the move.',
    accent: 'cyan',
  },
  {
    type: 'tablet',
    icon: 'tablet',
    title: 'Tablets',
    description: 'Versatile tablets for field operations, training and collaboration.',
    accent: 'violet',
  },
]

export default function Solutions() {
  return (
    <section id="solutions" className="relative overflow-hidden border-y border-slate-100 bg-[#fbfdff] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full border border-brand-100/80" />
        <div className="absolute -left-10 top-36 h-72 w-72 rounded-full border border-brand-100/60" />
        <div className="absolute right-3 top-24 h-36 w-36 bg-[radial-gradient(rgba(37,70,150,.18)_1px,transparent_1px)] bg-[size:13px_13px] opacity-50" />
        <div className="absolute -right-28 top-28 h-80 w-80 rounded-full border border-brand-100/70" />
        <div className="absolute -right-12 top-40 h-80 w-80 rounded-full border border-brand-100/50" />
      </div>

      <div className="container-site relative">
        <Reveal>
          <header>
            <div>
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[.2em] text-brand-600 sm:text-xs">
                <span className="h-px w-9 bg-brand-500" />
                Technology for Every Business Requirement
              </div>
              <h2 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.06] tracking-[-.04em] text-brand-950 sm:text-5xl lg:text-[52px]">
                Start with laptops.<br/> Scale across device categories.
              </h2>
            </div>
          </header>
        </Reveal>

        <Reveal className="mt-12 sm:mt-14">
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            <DeviceCard type="laptop" featured />
            {secondaryDevices.map((device) => (
              <DeviceCard key={device.type} {...device} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
