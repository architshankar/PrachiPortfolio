import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/SEO";
import { reviews as endorsements } from "@/data/reviews";
import { type ReaderReview, getAllReviews } from "@/lib/reviews";
import { profile } from "@/data/profile";

// Reviews longer than this start collapsed with a "Read more" toggle.
const COLLAPSE_AT = 420;
const ENDORSEMENT = "Recommendation";

interface DisplayReview {
  key: string;
  name: string;
  credential?: string;
  quote: string;
  source: string;
  sourceUrl?: string;
  rating?: number;
}

function ReviewCard({ review }: { review: DisplayReview }) {
  const { name, credential, quote, source, sourceUrl, rating } = review;
  const [expanded, setExpanded] = useState(false);
  const long = quote.length > COLLAPSE_AT;
  const shown = long && !expanded ? quote.slice(0, COLLAPSE_AT).trimEnd() + "…" : quote;
  const isEndorsement = source === ENDORSEMENT;

  return (
    <div className="break-inside-avoid mb-6 p-8 bg-cream-soft border border-navy/10 border-t-2 border-t-gold text-navy">
      <div className="flex items-center justify-between gap-4 mb-5">
        <span
          className={`inline-block font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1 ${
            isEndorsement ? "border border-navy/30 text-navy" : "bg-navy text-cream"
          }`}
        >
          {source}
        </span>
        {rating && (
          <span className="flex gap-0.5 text-gold" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={14} fill={i < rating ? "currentColor" : "none"} />
            ))}
          </span>
        )}
      </div>

      <p className="display-serif italic-accent text-lg md:text-xl leading-snug text-navy/90">{shown}</p>
      {long && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="label-eyebrow mt-4 text-gold hover:text-navy transition-colors"
        >
          {expanded ? "Show Less ↑" : "Read More ↓"}
        </button>
      )}

      <div className="hairline my-5" />
      <div className="font-serif text-xl text-navy">{name}</div>
      {credential && <div className="label-eyebrow mt-1">{credential}</div>}

      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label-eyebrow mt-4 inline-flex items-center gap-1 text-gold hover:text-navy transition-colors"
        >
          Read on {source} <ArrowUpRight size={12} />
        </a>
      )}
    </div>
  );
}

// Alternate endorsements and reader reviews so neither group clusters in one place.
function interleave<T>(a: T[], b: T[]): T[] {
  const out: T[] = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (i < a.length) out.push(a[i]);
    if (i < b.length) out.push(b[i]);
  }
  return out;
}

export default function Reviews() {
  const [readerReviews, setReaderReviews] = useState<ReaderReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getAllReviews(true).then((data) => {
      setReaderReviews(data);
      setLoading(false);
    });
  }, []);

  const all = useMemo<DisplayReview[]>(
    () =>
      interleave(
        endorsements.map((r) => ({ key: r.name, name: r.name, credential: r.credential, quote: r.quote, source: ENDORSEMENT })),
        readerReviews.map((r) => ({
          key: r.id,
          name: r.name,
          credential: r.credential,
          quote: r.quote,
          source: r.source,
          sourceUrl: r.sourceUrl,
          rating: r.rating,
        }))
      ),
    [readerReviews]
  );

  const sources = useMemo(() => ["All", ...Array.from(new Set(all.map((r) => r.source)))], [all]);
  const filtered = filter === "All" ? all : all.filter((r) => r.source === filter);

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Reviews | Good but Never Good Enough | Prachi Shankar"
        description="What readers, leaders and reviewers on Amazon and beyond are saying about Good but Never Good Enough by Prachi Shankar."
      />
      <Nav />
      <main className="pt-32 pb-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="label-eyebrow">Reviews · {profile.upcomingBook.title}</div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-4 mb-16">
            <h1 className="display-serif text-navy" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
              What readers<br />are <span className="italic-accent">saying.</span>
            </h1>
            <a
              href={profile.upcomingBook.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="navy-pill self-start md:self-auto"
            >
              Buy on Amazon <ArrowUpRight size={14} className="ml-1" />
            </a>
          </div>

          {sources.length > 2 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {sources.map((src) => (
                <button
                  key={src}
                  onClick={() => setFilter(src)}
                  className={`px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] border ${
                    filter === src ? "bg-navy text-cream border-navy" : "border-navy/30 text-navy"
                  }`}
                >
                  {src === ENDORSEMENT ? "Recommendations" : src}
                </button>
              ))}
            </div>
          )}

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {filtered.map((r) => (
              <ReviewCard key={r.key} review={r} />
            ))}
          </div>
          {loading && <div className="p-8 text-center text-navy/60">Loading more reviews...</div>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
