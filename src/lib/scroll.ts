import type Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/motion";

/** Shared Lenis instance so other modules (menu, anchors) can control it. */
export const lenisRef: { current: Lenis | null } = { current: null };

const HEADER_OFFSET = -8;

export function scrollToTarget(target: string | HTMLElement | number, offset = 0) {
  const lenis = lenisRef.current;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
    el?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }
}

export function scrollToHash(hash: string, smooth = true) {
  const id = hash.replace(/^#/, "");
  const el = document.getElementById(id);
  if (!el) return;
  if (!smooth) {
    const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET;
    lenisRef.current?.scrollTo(top, { immediate: true });
    window.scrollTo({ top, behavior: "auto" });
    return;
  }
  scrollToTarget(el, HEADER_OFFSET);
  if (history.replaceState) history.replaceState(null, "", `#${id}`);
}

export function scrollToTop(immediate = true) {
  lenisRef.current?.scrollTo(0, { immediate });
  window.scrollTo({ top: 0, behavior: "auto" });
}
