import { aboutCards } from "../data/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="section-space bg-[#f5f9ff]">
      <div className="container-site">
        <div className="gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="Lower Costs. Reliable Performance. Complete Support."
              title="Reduce CapEX Without Compromising Performance"
            />
          </Reveal>

          <p className="pt-2 pb-2 text-slate-600">
            Not every employee needs a brand-new laptop with the latest specifications. For many business roles, a professionally refurbished device can deliver the required performance at a significantly lower acquisition cost.
          </p>

          <p className="pb-2 text-slate-600">
           XtraCover helps businesses align device specifications with actual workforce requirements, making it easier to avoid unnecessary spending and deploy more devices within the same procurement budget. This allows capital to remain available for other priorities such as hiring, software, infrastructure and business expansion.
          </p>
          <p className="pb-3 text-slate-600">
            With defined device standards and structured post-purchase coverage, enterprises can reduce the financial uncertainty often associated with secondary-market hardware. The result is a more practical and scalable approach to employee device procurement.
          </p>

        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
           {aboutCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 65}>
              <article className="group h-full min-h-[270px] rounded-2xl border border-blue-100/60 bg-white p-6 shadow-[0_14px_38px_rgba(15,35,92,0.055)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-blue-950/5">
                <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-sky-100">
                  <div className="w-full overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                <h3 className="mt-7 text-lg font-black tracking-[-0.03em] text-brand-950">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {card.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}