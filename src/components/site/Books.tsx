
import { profile } from "@/data/profile";
import { ReviewsCarousel } from "@/components/site/ReviewsCarousel";

export function Books() {
  // Hardcoded fallback link using your exact Amazon URL
  const amazonLink = profile.upcomingBook.amazonUrl || "https://amzn.in/d/0gWK3Zv2";

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
              Available Now · Solo Debut
            </span>
            
            <h3 className="display-serif mt-8" style={{ fontSize: "clamp(2.5rem, 4.5vw, 4rem)" }}>
              {profile.upcomingBook.title}
            </h3>
            
            <p className="mt-6 text-cream/80 leading-relaxed max-w-md">
              {profile.upcomingBook.blurb}
            </p>
            
            <div className="label-eyebrow text-gold mt-8">{profile.upcomingBook.status}</div>

            {/* Buy Now Button */}
            <div className="mt-8">
              <a
                href={amazonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold text-navy font-mono text-sm uppercase tracking-wider font-semibold px-6 py-3 border border-transparent hover:bg-transparent hover:text-gold hover:border-gold transition-all duration-300"
              >
                Buy on Amazon →
              </a>
            </div>
          </div>
          
          {/* Image container wrapped with Amazon link */}
          <div className="relative max-w-sm lg:max-w-md mx-auto w-full flex justify-center items-center">
            <a 
              href={amazonLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full group cursor-pointer"
              aria-label={`Buy ${profile.upcomingBook.title} on Amazon`}
            >
              <img
                src="/images/coverBook.png"
                alt={profile.upcomingBook.title}
                className="w-full h-auto object-contain shadow-2xl transition-transform duration-500 group-hover:scale-[1.04] rotate-[-3deg] group-hover:rotate-[-1deg]"
              />
            </a>
          </div>
        </div>

        <div className="mt-14">
          <div className="label-eyebrow">Also Featured In</div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {profile.contributorBooks.map((b) => (
              <div key={b.title} className="bg-cream p-6 flex gap-5 items-start">
                <img
                  src={b.cover}
                  alt={b.title}
                  className="w-20 h-auto shadow-md flex-shrink-0"
                />
                <div>
                  <div className="font-serif text-lg text-navy">{b.title}</div>
                  <div className="text-navy/70 text-sm mt-1">
                    {b.role} · {b.type}
                  </div>
                  <div className="label-eyebrow mt-2">
                    {b.publisher} · {b.date}
                  </div>
                  {b.amazonUrl && (
                    <a
                      href={b.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block label-eyebrow text-gold mt-3 hover:text-navy transition-colors"
                    >
                      View on Amazon →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <ReviewsCarousel />

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