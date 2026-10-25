import { Link } from "react-router-dom";
import { AirbnbIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Mail } from "lucide-react";
import { navItems, bookingPath } from "@/data/navigation";
import { property } from "@/data/property";
import { config, hasEmail } from "@/lib/config";
import { whatsappContactUrl } from "@/lib/booking/channels";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  const year = new Date().getFullYear();
  const wa = whatsappContactUrl();

  return (
    <footer className="bg-olive-950 text-ivory">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <Wordmark light size="lg" />
          <p className="mt-5 max-w-sm font-serif text-xl leading-snug text-sand/90">
            A peaceful home in {property.locality}, {property.city}, {property.country}. Two bedrooms, five minutes from the beach.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow mb-5 text-sand/85">Explore</p>
          <ul className="flex flex-col gap-3 text-[0.95rem]">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="link-underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to={bookingPath} className="link-underline">
                Book Your Stay
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow mb-5 text-sand/85">Get in touch</p>
          <ul className="flex flex-col gap-3 text-[0.95rem]">
            <li>
              <a
                href={config.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2"
              >
                <AirbnbIcon className="size-4" /> Book on Airbnb
              </a>
            </li>
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2">
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
              </li>
            )}
            {hasEmail && (
              <li>
                <a href={`mailto:${config.contactEmail}`} className="link-underline inline-flex items-center gap-2">
                  <Mail aria-hidden="true" className="size-4" /> {config.contactEmail}
                </a>
              </li>
            )}
          </ul>
          <p className="mt-6 text-[0.8rem] leading-relaxed text-sand/85">
            Check-in {property.checkIn}. Check-out {property.checkOut}. Self check-in with building staff.
          </p>
        </div>
      </div>

      <div className="border-t hairline-light">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.72rem] uppercase tracking-[0.16em] text-sand/85 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {property.name}. {property.locality}, {property.city}.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="link-underline">
              Privacy
            </Link>
            <a href={config.airbnbUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
              Airbnb listing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
