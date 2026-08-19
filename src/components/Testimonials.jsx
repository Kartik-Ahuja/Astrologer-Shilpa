import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSel = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSel);
    onSel();
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section id="testimonials" data-testid="testimonials-section" className="relative py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="section-label justify-center"><span>Testimonials</span></div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] text-ink mt-5">
            Voices of <span className="gold-text italic">trust</span> &amp; transformation.
          </h2>
          <div className="gold-divider w-24 mx-auto my-6" />
        </div>

        <div className="relative mt-14">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 px-3">
                  <div data-testid={`testimonial-${i}`} className="relative bg-beige-50/60 border border-beige-100 rounded-2xl p-8 h-full hover:border-gold/40 transition">
                    <Quote className="absolute top-5 right-5 w-14 h-14 text-gold/15" strokeWidth={1} />
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.stars }).map((_, k) => (
                        <Star key={k} className="w-4 h-4 fill-gold text-gold" strokeWidth={0} />
                      ))}
                    </div>
                    <p className="mt-5 text-lg font-serif text-ink leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                    <div className="mt-6 pt-5 border-t border-beige-100 text-sm text-ink-muted">— {t.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 mt-10">
            <button
              onClick={scrollPrev}
              aria-label="Previous"
              data-testid="testimonials-prev"
              className="w-11 h-11 rounded-full border border-gold/40 hover:bg-gold hover:text-white text-ink transition flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === selected ? "w-8 bg-gold" : "w-2 bg-beige-200"}`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              aria-label="Next"
              data-testid="testimonials-next"
              className="w-11 h-11 rounded-full border border-gold/40 hover:bg-gold hover:text-white text-ink transition flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
