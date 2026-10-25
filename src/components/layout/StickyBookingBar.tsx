import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useScrolled } from "@/hooks/useScrolled";
import { bookingPath } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { property } from "@/data/property";

/** Discreet mobile-only booking CTA that appears after the hero. */
export function StickyBookingBar() {
  const { pathname } = useLocation();
  const scrolled = useScrolled(typeof window !== "undefined" ? window.innerHeight * 0.75 : 600);
  const show = scrolled && pathname !== bookingPath;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t hairline bg-ivory/92 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md sm:hidden"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate font-serif text-lg leading-tight">{property.name}</p>
              <p className="truncate text-[0.7rem] uppercase tracking-[0.16em] text-olive-600">
                Up to {property.maxGuests} guests · {property.bedrooms} bedrooms
              </p>
            </div>
            <Button to={bookingPath} size="sm" magnetic={false} className="shrink-0">
              Book
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
