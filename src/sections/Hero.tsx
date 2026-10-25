import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { property } from "@/data/property";
import { bookingPath } from "@/data/navigation";
import { Picture } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/animations/SplitWords";
import { scrollToHash } from "@/lib/scroll";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const f = frame.current;
    const i = img.current;
    if (!f || !i) return;
    if (prefersReducedMotion()) {
      gsap.set([f, i], { clearProps: "all" });
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
      tl.fromTo(f, { clipPath: "inset(12% 6% 12% 6% round 2px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.7 }, 0.1)
        .fromTo(i, { scale: 1.22 }, { scale: 1, duration: 2.2, ease: "expo.out" }, 0);
      // Gentle parallax on scroll.
      gsap.to(i, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: { trigger: f, start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-olive-950 text-ivory" aria-label="Welcome">
      <div ref={frame} className="absolute inset-0 overflow-hidden">
        <div ref={img} className="h-full w-full will-change-transform">
          <Picture
            image="hero-exterior"
            priority
            sizes="100vw"
            className="h-full w-full"
            imgClassName="min-h-full object-[30%_60%] md:object-[42%_60%]"
            style={{ aspectRatio: "auto" }}
          />
        </div>
        {/* Contrast only where the type sits */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(31,36,25,0.82)_0%,rgba(31,36,25,0.35)_38%,rgba(31,36,25,0)_65%)]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,rgba(31,36,25,0.45),transparent)]" />
      </div>

      <div className="container-x relative flex h-full flex-col justify-end pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[var(--header-h)] md:pb-12">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <motion.p
              className="eyebrow mb-5 text-sand"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease }}
            >
              {property.type} · {property.locality}, {property.city}
            </motion.p>
            <h1 className="display-xl font-serif">
              <SplitWords text={property.tagline} italic={[1]} immediate delay={1.1} stagger={0.08} />
            </h1>
            <motion.p
              className="lede mt-6 max-w-md text-ivory/85 md:mt-8"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.7, ease }}
            >
              {property.subtitle}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-3 xs:flex-row xs:flex-wrap"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 1.9, ease }}
            >
              <Button to={bookingPath} variant="ivory" size="lg" arrow="right">
                Book Your Stay
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                onClick={() => scrollToHash("house")}
                aria-label="Discover the house — scroll to the rooms"
              >
                Discover the House
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="hidden md:col-span-4 md:flex md:flex-col md:items-end md:gap-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.1 }}
          >
            <dl className="flex gap-10 text-right">
              {[
                [String(property.bedrooms), "bedrooms"],
                [String(property.maxGuests), "guests"],
                ["5 min", "to the beach"],
              ].map(([v, l]) => (
                <div key={l} className="whitespace-nowrap">
                  <dt className="eyebrow text-sand/90">{l}</dt>
                  <dd className="mt-1 font-serif text-3xl leading-none">{v}</dd>
                </div>
              ))}
            </dl>
            <button
              type="button"
              onClick={() => scrollToHash("intro")}
              className="group inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-sand/90 hover:text-ivory"
              aria-label="Scroll down"
            >
              Scroll
              <span className="relative block h-12 w-px overflow-hidden bg-sand/30" aria-hidden="true">
                <span className={`absolute inset-x-0 top-0 h-1/2 bg-ivory ${reduce ? "" : "animate-[scrollhint_2.2s_ease-in-out_infinite]"}`} />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
