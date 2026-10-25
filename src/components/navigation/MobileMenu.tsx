import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";
import { navItems, bookingPath } from "@/data/navigation";
import { useBodyLock } from "@/hooks/useBodyLock";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { property } from "@/data/property";
import { config } from "@/lib/config";
import { scrollToHash } from "@/lib/scroll";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  useBodyLock(open);

  // Keyboard: Escape closes, focus trapped inside the panel.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const focusables = panel.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-olive-900 text-ivory"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: reduce ? 0.2 : 0.8, ease }}
        >
          <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Wordmark light />
            <button
              ref={closeBtn}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-ivory/30 transition-colors hover:bg-ivory hover:text-olive-900"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center overflow-y-auto py-8">
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  className="border-b hairline-light"
                  initial={reduce ? false : { y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.06, ease }}
                >
                  <Link
                    to={item.to}
                    onClick={(e) => {
                      if (item.hash && pathname === "/") {
                        e.preventDefault();
                        onClose();
                        // Wait for the scroll lock to lift before scrolling.
                        const hash = item.hash;
                        window.setTimeout(() => scrollToHash(hash, true), 150);
                      } else {
                        onClose();
                      }
                    }}
                    className="group flex items-center justify-between py-4 font-serif text-[clamp(2.1rem,8vw,3.25rem)] leading-none tracking-tight"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      className="size-6 opacity-0 transition-all duration-500 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-8 flex flex-col gap-5"
              initial={reduce ? false : { y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.6, ease }}
            >
              <Button to={bookingPath} variant="ivory" size="lg" arrow="right" onClick={onClose} className="w-full sm:w-auto">
                Book Your Stay
              </Button>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem] uppercase tracking-[0.18em] text-sand">
                <span>
                  {property.locality}, {property.city}
                </span>
                <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                  Airbnb
                </a>
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
