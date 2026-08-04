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

          <p className="pt-2 text-slate-600">
            Buying brand-new devices for every role can lock significant
            capital into hardware that may exceed actual employee requirements.
          </p>

          <p className="pb-3 text-slate-600">
            With Certified Refurbished devices, procure at a lower acquisition
            cost, while maintaining visibility into device quality and access
            to structured warranty support.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aboutCards.map((card, index) => {
            const CardIcon = card.icon;

            return (
              <Reveal key={card.title} delay={index * 65}>
                <article className="group h-full min-h-[270px] rounded-2xl border border-blue-100/60 bg-white p-6 shadow-[0_14px_38px_rgba(15,35,92,.055)] transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-blue-950/5">
                  <div className="flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-sky-100">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-[0_10px_30px_rgba(37,99,235,.15)] transition duration-300 group-hover:scale-110">
                      <CardIcon
                        size={34}
                        strokeWidth={1.8}
                        aria-hidden="true"
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
            );
          })}
        </div>
      </div>
    </section>
  );
}