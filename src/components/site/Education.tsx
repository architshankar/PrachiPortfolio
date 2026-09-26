import { profile } from "@/data/profile";
import { GraduationCap } from "lucide-react";

export function Education() {
  return (
    <section id="journey" className="navy-section py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-8">
            <div className="label-eyebrow">03 · Education</div>
            <h2 className="display-serif mt-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Built on <span className="italic-accent">books</span><br />and questions.
            </h2>
          </div>
          <div className="md:col-span-4 flex md:justify-end items-end">
            <p className="text-cream/75 max-w-xs">
              From Cathedral and Notre Dame to IIIT Allahabad and now SIBM Pune: a path stitched together by curiosity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-cream/15 border border-cream/15">
          {profile.education.map((e, i) => (
            <div key={e.school} className="bg-navy p-8 md:p-10 flex flex-col">
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
      </div>
    </section>
  );
}
