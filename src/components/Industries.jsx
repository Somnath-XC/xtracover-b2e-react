import { industries } from '../data/content'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Industries() {
  return (
    <section id="industries" className="section-space bg-[#f5f9ff]">
      <div className="container-site">
        <Reveal><SectionHeading center eyebrow="Industries we serve" title="Business devices for different operating environments" /></Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
           {industries.map((industry, index) => (
            <a href="#quote">
            <Reveal key={industry.title} delay={(index % 3) * 60}>
              <article className="industry-card group relative overflow-hidden rounded-2xl border border-blue-100/60 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-blue-950/5">
                
                <div className="relative">
                  <img className='w-full' src={industry.image} alt={industry.title} />
                </div>

                <div className="p-6">
                  <h3 className="mt-1 text-lg font-black text-brand-950">
                    {industry.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {industry.description}
                  </p>
                </div>

                {/* <span className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan-50" /> */}
              </article>
            </Reveal>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
