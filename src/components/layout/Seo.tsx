import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { config } from "@/lib/config";
import { property } from "@/data/property";

interface SeoProps {
  /** Short title, suffixed with the site name. */
  title?: string;
  /** Exact document title (no suffix). Takes precedence over `title`. */
  absoluteTitle?: string;
  description: string;
  /** Path for canonical; defaults to current route. */
  path?: string;
}

const DEFAULT_DESC =
  "Olive House is a comfortable two-bedroom holiday home in Dar es Salaam, in the quiet Kigamboni neighbourhood, a short walk from the beach.";

function setMeta(selector: string, attr: "content" | "href", value: string) {
  const el = document.head.querySelector<HTMLElement>(selector);
  if (el) el.setAttribute(attr, value);
}

/**
 * Updates the single set of SEO tags that index.html ships with homepage
 * values. Mutating in place (rather than hoisting new tags) keeps one tag per
 * kind, and non-JavaScript scrapers (WhatsApp, Facebook) still get the static
 * homepage fallback.
 */
export function Seo({ title, absoluteTitle, description = DEFAULT_DESC, path }: SeoProps) {
  const { pathname } = useLocation();
  const fullTitle =
    absoluteTitle ?? (title ? `${title} · ${property.name}` : "Olive House Dar es Salaam | Holiday Home in Kigamboni");
  const url = `${config.siteUrl}${path ?? pathname}`;
  const image = `${config.siteUrl}/images/og-image.jpg`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", image);
  }, [fullTitle, description, url, image]);

  return null;
}
