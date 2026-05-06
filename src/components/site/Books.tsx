import { profile } from "@/data/profile";

export function Books() {
  return (
    <section id="books" className="bg-cream py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-14">
          <div className="label-eyebrow">04 — Books & Honors</div>
          <h2 className="display-serif text-navy mt-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            Words on <span className="italic-accent">paper.</span><br />
            Voice on <span className="italic-accent">stage.</span>
          </h2>
        </div>

        <div className="bg-navy text-cream p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-gold text-navy font-mono text-xs uppercase tracking-[0.18em] px-4 py-2">
              Upcoming · Solo Debut
            </span>
            <h3 className="display-serif mt-8" style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}>
              {profile.upcomingBook.title}
            </h3>
            <p className="mt-6 text-cream/80 leading-relaxed max-w-md">
              {profile.upcomingBook.blurb}
            </p>
            <div className="label-eyebrow text-gold mt-8">{profile.upcomingBook.status}</div>
          </div>
          <div className="relative max-w-sm lg:max-w-md mx-auto w-full flex justify-center items-center">
            
            <img
              src="/images/coverBook.png"
              alt={profile.upcomingBook.title}
              className="w-full h-auto object-contain shadow-2xl transition-transform duration-500 hover:scale-[1.02] rotate-[-3deg] hover:rotate-[-1deg]"
            />
            
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-px bg-border">
          {profile.honors.map((h) => (
            <div key={h.title} className="bg-cream p-6">
              <div className="font-serif text-xl text-navy">{h.title}</div>
              <div className="text-navy/70 mt-1">{h.sub}</div>
              {h.date && <div className="label-eyebrow mt-2">{h.date}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
