import { profile } from "@/data/profile";
import { Heart } from "lucide-react";

export function Volunteering() {
  return (
    <section className="navy-section py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
          <div className="md:col-span-8">
            <div className="label-eyebrow">05 — Volunteering</div>
            <h2 className="display-serif mt-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              The work that<br /><span className="italic-accent">never paid</span> in money.
            </h2>
          </div>
          <div className="md:col-span-4 flex items-end">
            <p className="text-cream/70">
              Six chapters of student-led service — from teaching at Prayaas to organising TEDxIIITA.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/15 border border-cream/15">
          {profile.volunteering.map((v, i) => (
            <div key={v.role + v.org} className="bg-navy p-8 flex flex-col">
              <div className="flex justify-between items-start mb-5">
                <div className="label-eyebrow text-cream/55">0{i + 1}</div>
                <Heart className="text-cream/50" size={18} />
              </div>
              <h3 className="font-serif text-2xl leading-tight">{v.role}</h3>
              <div className="text-cream/75 mt-1">{v.org}</div>
              {v.note && <p className="text-cream/65 mt-4 text-sm leading-relaxed">{v.note}</p>}
              <div className="hairline border-cream/20 mt-auto pt-5 mb-3" />
              <div className="flex justify-between items-center">
                <div className="label-eyebrow text-cream/55">{v.period || "—"}</div>
                <div className="label-eyebrow text-gold">{v.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
