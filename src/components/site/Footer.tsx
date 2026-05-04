import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="navy-section py-14">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <div className="font-serif text-5xl">{profile.shortName}</div>
          <div className="label-eyebrow mt-3">SIBM Pune · IIIT Allahabad · Author</div>
        </div>
        <div className="text-right">
          <div className="label-eyebrow flex items-center justify-end gap-2">
            © 2026 <img src="/images/sign.svg" alt="Prachi Shankar" className="h-4 inline filter invert opacity-70" /> — All words are mine.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-3 font-mono text-xs uppercase tracking-[0.18em] hover:text-gold transition"
          >
            Back to top ↗
          </button>
        </div>
      </div>
    </footer>
  );
}
