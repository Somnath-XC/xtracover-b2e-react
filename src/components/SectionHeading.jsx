export default function SectionHeading({ eyebrow, title, text, center = false, light = false }) {
  return (
    <div className={center ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}>
      <div className={`mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${center ? 'justify-center' : ''} ${light ? 'text-blue-200' : 'text-brand-600'}`}>
        <span className="h-0.5 w-8 rounded-full bg-current" />
        {eyebrow}
        {center && <span className="h-0.5 w-8 rounded-full bg-current" />}
      </div>
      <h2 className={`section-title text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.04em] md:text-5xl ${light ? 'text-white' : 'text-brand-950'}`}>
        {title}
      </h2>
      {text && <p className={`mt-5 text-base leading-7 md:text-lg ${light ? 'text-blue-100/80' : 'text-slate-600'}`}>{text}</p>}
    </div>
  )
}
