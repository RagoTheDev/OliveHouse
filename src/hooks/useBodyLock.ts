import { useEffect } from "react";
import { lenisRef } from "@/lib/scroll";

/** Locks page scrolling (and Lenis) while `locked` is true. */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    lenisRef.current?.stop();
    return () => {
      document.body.style.overflow = overflow;
      lenisRef.current?.start();
    };
  }, [locked]);
}
