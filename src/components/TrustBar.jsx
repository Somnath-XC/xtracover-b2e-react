const segments = ['Startups', 'Enterprises', 'IT Companies', 'Education', 'NGOs', 'Government']

export default function TrustBar() {
  return (
    <section className="overflow-hidden border-y border-slate-100 bg-white py-5">
      <div className="marquee-track flex items-center gap-12 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">
        <span className="whitespace-nowrap text-brand-700">Built for Business Procurement</span>
        {[...segments, ...segments].map((item, index) => <span key={`${item}-${index}`} className="whitespace-nowrap">{item}</span>)}
      </div>
    </section>
  )
}
