import { useLocation } from "react-router-dom";
import { config } from "@/lib/config";
import { property } from "@/data/property";

interface SeoProps {
  title?: string;
  description: string;
  /** Path for canonical; defaults to current route. */
  path?: string;
}

const DEFAULT_DESC =
  "Olive House is a peaceful two-bedroom holiday home in Kigamboni, Dar es Salaam, five minutes' walk from the beach. Wi-Fi, workspace, kitchen, free parking, pet-friendly.";

/** React 19 hoists these tags into <head>. */
export function Seo({ title, description = DEFAULT_DESC, path }: SeoProps) {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} · ${property.name}` : `${property.name} — Holiday home in Kigamboni, Dar es Salaam`;
  const url = `${config.siteUrl}${path ?? pathname}`;
  const image = `${config.siteUrl}/images/og-image.jpg`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
