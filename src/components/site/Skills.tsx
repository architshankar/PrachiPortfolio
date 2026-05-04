import { profile } from "@/data/profile";

export function Skills() {
  const loop = [...profile.skills, ...profile.skills];
  return (
    <section className="bg-cream py-28 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mb-12">
        <div className="label-eyebrow">06 — Skills</div>
        <h2 className="display-serif text-navy mt-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
          The toolkit, <span className="italic-accent">briefly.</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="marquee flex whitespace-nowrap gap-12 w-max">
          {loop.map((s, i) => (
            <span key={i} className="font-serif text-navy text-5xl md:text-6xl flex items-center gap-12">
              {i % 2 === 1 ? <em className="italic">{s}</em> : s}
              <span className="text-gold">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mt-12 flex flex-wrap gap-3">
        {profile.skills.map((s) => (
          <span key={s} className="border border-navy/30 text-navy px-4 py-2 font-mono text-xs uppercase tracking-[0.15em]">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
