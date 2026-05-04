import { profile } from "@/data/profile";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section id="journey" className="navy-section py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-8">
            <div className="label-eyebrow">02 — Education</div>
            <h2 className="display-serif mt-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Built on <span className="italic-accent">books</span><br />and questions.
            </h2>
          </div>
          <div className="md:col-span-4 flex md:justify-end items-end">
            <p className="text-cream/75 max-w-xs">
              From Cathedral and Notre Dame to IIIT Allahabad and now SIBM Pune — a path stitched together by curiosity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-cream/15 border border-cream/15">
          {profile.education.map((e, i) => (
            <div key={e.school} className="bg-navy p-8 md:p-10 flex flex-col hover:bg-cream/5 transition-colors duration-300 cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div className="label-eyebrow text-cream/55">0{i + 1}</div>
                <GraduationCap className="text-cream/50" size={20} />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl leading-tight">{e.school}</h3>
              <div className="label-eyebrow mt-2 text-cream/55">{e.sub}</div>
              <div className="hairline my-6 border-cream/20" />
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="font-sans">{e.degree}</div>
                  {e.period && <div className="label-eyebrow mt-1 text-cream/55">{e.period}</div>}
                </div>
                <div className="font-serif italic text-gold text-xl text-right">{e.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <div className="label-eyebrow text-cream/55 mb-5">Certifications</div>
          <div className="grid md:grid-cols-2 gap-4">
            {profile.certifications.map((c) => (
              <div key={c.title} className="border border-cream/20 px-5 py-4 flex items-center gap-4 hover:bg-cream/5 transition-colors duration-300 cursor-pointer">
                <span className="text-gold">✦</span>
                <div>
                  <div>{c.title}</div>
                  <div className="label-eyebrow text-cream/55 mt-1">{c.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
