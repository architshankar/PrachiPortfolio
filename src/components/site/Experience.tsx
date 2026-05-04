import { profile } from "@/data/profile";
import { ArrowUpRight } from "lucide-react";

export function Experience() {
  return (
    <section className="bg-cream py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-8">
            <div className="label-eyebrow">03 — Experience</div>
            <h2 className="display-serif text-navy mt-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Roles, <span className="italic-accent">rooms</span><br />and reasons.
            </h2>
          </div>
          <div className="md:col-span-4 flex items-end">
            <p className="text-navy/70">
              A non-linear career — hardware to consulting, with stops at literary societies and parliamentary debates.
            </p>
          </div>
        </div>

        <div className="hairline" />
        {profile.experience.map((x, i) => (
          <div key={x.role} className="grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-border md:items-center">
            <div className="hidden md:block md:col-span-1 label-eyebrow">0{i + 1}</div>
            <div className="md:col-span-5">
              <div className="md:hidden label-eyebrow mb-2">0{i + 1}</div>
              <h3 className="font-serif text-2xl md:text-3xl text-navy leading-tight">{x.role}</h3>
              <div className="text-navy/70 mt-1">{x.org}</div>
            </div>
            <div className="md:col-span-3 label-eyebrow">{x.period}</div>
            <div className="md:col-span-2 label-eyebrow">{x.location}</div>
            <div className="hidden md:flex md:col-span-1 justify-end">
              <ArrowUpRight className="text-navy/40" size={20} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
