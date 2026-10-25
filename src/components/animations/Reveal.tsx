import { useLayoutEffect, useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  /** Seconds to delay after the trigger fires. */
  delay?: number;
  /** Distance in px the element rises from. */
  y?: number;
  /** ScrollTrigger start, e.g. "top 85%". */
  start?: string;
  /** Stagger direct children instead of animating the wrapper. */
  stagger?: number;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Scroll-triggered fade/rise reveal. Elements render visible without JS and
 * are only hidden once GSAP takes over, so there is never a flash of missing
 * content and nothing is invisible if an animation fails.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  children,
  delay = 0,
  y = 28,
  start = "top 86%",
  stagger,
  className,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = stagger ? Array.from(el.children) : el;
    if (prefersReducedMotion()) {
      gsap.set(targets, { autoAlpha: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          delay,
          stagger: stagger ?? 0,
          ease: "expo.out",
          clearProps: "transform",
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, start, stagger]);

  return (
    <Tag ref={ref} data-reveal={stagger ? undefined : ""} className={className} {...rest}>
      {children}
    </Tag>
  );
}
