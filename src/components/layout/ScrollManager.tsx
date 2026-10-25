import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHash, scrollToTop } from "@/lib/scroll";

/**
 * Restores scroll to top on route change and handles hash targets, waiting a
 * moment so the new page has rendered (and the page transition has started).
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const t = window.setTimeout(() => scrollToHash(hash, false), 60);
      return () => window.clearTimeout(t);
    }
    scrollToTop();
  }, [pathname, hash]);

  return null;
}
