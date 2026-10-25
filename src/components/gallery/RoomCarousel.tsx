import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ImageKey } from "@/data/images.generated";
import { Picture } from "@/components/ui/Picture";
import { photoByKey } from "@/data/gallery";

interface RoomCarouselProps {
  images: ImageKey[];
  onOpen?: (key: ImageKey) => void;
  label: string;
}

export function RoomCarousel({ images, onOpen, label }: RoomCarouselProps) {
  const [ref, api] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: false, loop: false });
  const [index, setIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(images.length > 1);

  const sync = useCallback(() => {
    if (!api) return;
    setIndex(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("select", sync).on("reInit", sync);
    return () => {
      api.off("select", sync).off("reInit", sync);
    };
  }, [api, sync]);

  return (
    <div className="relative min-w-0" role="region" aria-roledescription="carousel" aria-label={label}>
      <div ref={ref} className="min-w-0 overflow-hidden" data-lenis-prevent-wheel>
        <ul className="-ml-4 flex touch-pan-y md:-ml-6">
          {images.map((key, i) => {
            const photo = photoByKey[key];
            return (
              <li
                key={key}
                className="min-w-0 shrink-0 basis-[78%] pl-4 xs:basis-[62%] md:basis-[46%] md:pl-6 lg:basis-[38%]"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${images.length}: ${photo.caption}`}
              >
                <button
                  type="button"
                  onClick={() => onOpen?.(key)}
                  className="img-zoom group block w-full text-left"
                  aria-label={`Open photo: ${photo.caption}`}
                >
                  <Picture image={key} sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 78vw" className="aspect-[4/5]! h-auto" />
                  <span className="mt-3 block text-[0.78rem] uppercase tracking-[0.16em] text-sand/90">{photo.caption}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="font-serif text-xl tabular-nums text-sand/90">
          <span className="text-ivory">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-2 opacity-50">/</span>
          {String(images.length).padStart(2, "0")}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            disabled={!canPrev}
            aria-label="Previous photo"
            className="inline-flex size-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory hover:text-olive-900 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ivory"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => api?.scrollNext()}
            disabled={!canNext}
            aria-label="Next photo"
            className="inline-flex size-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors hover:bg-ivory hover:text-olive-900 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ivory"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
