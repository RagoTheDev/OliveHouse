import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

interface ParallaxImageProps {
  children: ReactNode;
  /** Total travel in percent of the element height (split evenly). */
  amount?: number;
  /** Scale the image slightly so parallax never shows edges. */
  scale?: number;
  /** Clip-path reveal when the block scrolls into view. */
  reveal?: boolean;
  className?: string;
}

/**
 * Wraps an image in an overflow-hidden frame and moves it gently with scroll.
 * Optionally reveals the frame with a clip-path wipe.
 */
export function ParallaxImage({ children, amount = 12, scale = 1.14, reveal = true, className }: ParallaxImageProps) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const f = frame.current;
    const i = inner.current;
    if (!f || !i) return;
    if (prefersReducedMotion()) {
      gsap.set(f, { clipPath: "none" });
      return;
    }
    const ctx = gsap.context(() => {
      if (reveal) {
        gsap.fromTo(
          f,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.4,
            ease: "expo.inOut",
            scrollTrigger: { trigger: f, start: "top 85%", once: true },
          },
        );
      }
      gsap.fromTo(
        i,
        { yPercent: -amount / 2, scale },
        {
          yPercent: amount / 2,
          scale,
          ease: "none",
          scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, f);
    return () => ctx.revert();
  }, [amount, scale, reveal]);

  return (
    <div ref={frame} data-reveal-clip={reveal ? "" : undefined} className={`overflow-hidden ${className ?? ""}`}>
      <div ref={inner} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
