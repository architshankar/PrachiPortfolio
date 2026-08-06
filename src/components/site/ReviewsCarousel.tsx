import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "@/data/reviews";

const CLAMP_CLASS = "line-clamp-6";

export function ReviewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [overflowing, setOverflowing] = useState<Set<number>>(new Set());
  const quoteRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Collapse any expanded review whenever the visible slide changes.
  useEffect(() => {
    setExpandedIndex(null);
  }, [selectedIndex]);

  useEffect(() => {
    const checkOverflow = () => {
      const next = new Set<number>();
      quoteRefs.current.forEach((el, i) => {
        if (el && el.scrollHeight > el.clientHeight + 1) next.add(i);
      });
      setOverflowing(next);
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div className="mt-14">
      <div className="label-eyebrow">Praise for the Book</div>

      <div className="mt-6 relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex items-stretch">
            {reviews.map((r, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <div key={r.name} className="min-w-0 shrink-0 grow-0 basis-full px-1">
                  <div className="bg-navy text-cream p-8 md:p-14 h-full">
                    <div className="font-serif text-2xl md:text-3xl text-cream">{r.name}</div>
                    <div className="label-eyebrow mt-2 text-gold">{r.credential}</div>

                    <div className="hairline mt-6 mb-6 border-cream/20" />

                    <p
                      ref={(el) => (quoteRefs.current[i] = el)}
                      className={`display-serif italic-accent text-xl md:text-2xl leading-snug text-cream/95 ${
                        isExpanded ? "" : CLAMP_CLASS
                      }`}
                    >
                      {r.quote}
                    </p>

                    {(isExpanded || overflowing.has(i)) && (
                      <button
                        onClick={() => setExpandedIndex(isExpanded ? null : i)}
                        className="label-eyebrow mt-5 text-gold hover:text-cream transition-colors"
                      >
                        {isExpanded ? "Show Less ↑" : "Read Full Review ↓"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-2">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                aria-label={`Go to review ${i + 1}`}
                onClick={() => scrollTo(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === selectedIndex ? "bg-gold" : "bg-border"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              aria-label="Previous review"
              onClick={scrollPrev}
              className="h-10 w-10 flex items-center justify-center rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-cream transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next review"
              onClick={scrollNext}
              className="h-10 w-10 flex items-center justify-center rounded-full border border-navy/20 text-navy hover:bg-navy hover:text-cream transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
