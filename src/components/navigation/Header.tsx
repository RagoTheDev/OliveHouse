import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { navItems, bookingPath } from "@/data/navigation";
import { useScrolled } from "@/hooks/useScrolled";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";
import { scrollToHash } from "@/lib/scroll";

/** Routes whose hero is dark, so the header starts in light (ivory) mode. */
const DARK_HERO_ROUTES = new Set(["/"]);

export function Header() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const reduce = useReducedMotion();
  const onDarkHero = DARK_HERO_ROUTES.has(pathname) && !scrolled;

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.hash) return pathname === "/" && hash === `#${item.hash}`;
    return pathname === item.to && !hash;
  };

  return (
    <>
      <motion.header
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,box-shadow,color] duration-700 ease-[var(--ease-out-expo)] ${
          scrolled
            ? "bg-ivory/85 text-charcoal shadow-[0_1px_0_0_rgba(37,39,34,0.08)] backdrop-blur-md"
            : onDarkHero
              ? "bg-transparent text-ivory"
              : "bg-transparent text-charcoal"
        }`}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between">
          <Wordmark light={onDarkHero} />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={(e) => {
                  if (item.hash && pathname === "/") {
                    e.preventDefault();
                    scrollToHash(item.hash, true);
                  }
                }}
                aria-current={isActive(item) ? "page" : undefined}
                className="link-underline font-sans text-[0.78rem] font-medium uppercase tracking-[0.18em] opacity-90 hover:opacity-100"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              to={bookingPath}
              size="sm"
              variant={onDarkHero ? "ivory" : "primary"}
              className="max-xs:hidden"
              magnetic={false}
            >
              Book Your Stay
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-current/30 lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
