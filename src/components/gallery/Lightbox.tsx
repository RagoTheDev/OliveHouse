import { lazy, Suspense } from "react";
import type { Photo } from "@/types";
import { getImage } from "@/lib/images";

const YarlLightbox = lazy(() => import("./LightboxInner"));

interface LightboxProps {
  photos: Photo[];
  index: number;
  open: boolean;
  onClose: () => void;
}

/** Code-split wrapper; the lightbox library only loads when first opened. */
export function Lightbox({ photos, index, open, onClose }: LightboxProps) {
  if (!open) return null;
  const slides = photos.map((p) => {
    const asset = getImage(p.key);
    const largest = asset.variants[asset.variants.length - 1];
    return {
      src: largest.src,
      width: asset.width,
      height: asset.height,
      alt: p.alt,
      title: p.caption,
      srcSet: asset.variants.map((v) => ({ src: v.src, width: v.width, height: v.height })),
    };
  });
  return (
    <Suspense fallback={null}>
      <YarlLightbox slides={slides} index={index} open={open} onClose={onClose} />
    </Suspense>
  );
}
