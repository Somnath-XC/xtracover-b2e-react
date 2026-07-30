import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const checks = [
  'Visual inspection for screen, casing and visible damage',
  'Internal hardware and core functional testing',
  'Battery health or power supply verification',
  'Display, keyboard, ports, camera, audio and sensors',
  'Storage, memory and performance testing',
  'Secure data wipe, reset, cleaning and final verification',
]

export default function Quality() {
  return (
    <section id="quality" className="section-space overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 text-white">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute inset-10 rounded-full bg-blue-400/20 blur-3xl" />
            <figure className="relative overflow-hidden rounded-[30px] bg-white shadow-2xl shadow-black/30">
              <img src="/assets/quality-check-process.svg" alt="Structured quality check process for refurbished business devices" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="flex items-center gap-3 bg-white p-5 text-slate-900">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600"><Icon name="check" /></span>
                <div><strong className="block text-brand-950">Quality verified</strong><small className="text-slate-500">Inspected, tested and prepared before dispatch.</small></div>
              </figcaption>
            </figure>
            <div className="float-slow absolute -right-3 top-8 rounded-2xl bg-blue-300 px-4 py-3 text-brand-950 shadow-xl"><strong className="block text-sm">Multi-level process</strong><small className="text-[10px] opacity-70">Category-specific testing</small></div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <SectionHeading light eyebrow="Multi-level testing" title="Every product passes a structured quality check" text="Every laptop, desktop, mobile and tablet is inspected, tested, securely reset and prepared before dispatch. Category-specific checks verify the functions that matter for each device type." />
          <ol className="mt-8 grid">
            {checks.map((check, index) => (
              <li key={check} className="grid grid-cols-[42px_1fr] items-center gap-3 border-b border-white/10 py-4 last:border-0"><span className="text-xs font-black text-blue-300">0{index + 1}</span><p className="text-sm text-blue-50/90">{check}</p></li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
