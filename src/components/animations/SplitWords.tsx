import { useLayoutEffect, useMemo, useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

interface SplitWordsProps {
  /** Plain text, or an array of lines. Use <em> via `italic` words index list. */
  text: string;
  /** Words (0-based index) rendered in italic serif accent. */
  italic?: number[];
  as?: ElementType;
  className?: string;
  /** Trigger on mount instead of on scroll. */
  immediate?: boolean;
  delay?: number;
  stagger?: number;
  start?: string;
  children?: ReactNode;
}

/**
 * Splits text into words wrapped in overflow-hidden spans and slides them up.
 * Keeps the text as a single accessible string via aria-label.
 */
export function SplitWords({
  text,
  italic = [],
  as: Tag = "span",
  className,
  immediate = false,
  delay = 0,
  stagger = 0.045,
  start = "top 85%",
}: SplitWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".split-word");
    if (prefersReducedMotion()) {
      gsap.set(targets, { y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(targets, {
        y: 0,
        duration: 1.3,
        delay,
        stagger,
        ease: "expo.out",
        ...(immediate ? {} : { scrollTrigger: { trigger: el, start, once: true } }),
      });
    }, el);
    return () => ctx.revert();
  }, [delay, stagger, immediate, start, words]);

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="split-line inline-block! align-top" aria-hidden="true">
          <span className={`split-word ${italic.includes(i) ? "italic font-light" : ""}`}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
