import { useState, type ImgHTMLAttributes } from "react";
import type { ImageKey } from "@/data/images.generated";
import { getImage, largestSrc, srcSet } from "@/lib/images";
import { photoByKey } from "@/data/gallery";

interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "alt"> {
  image: ImageKey;
  /** Responsive sizes hint, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes?: string;
  priority?: boolean;
  alt?: string;
  /** Object-position for art-directed crops. */
  position?: string;
  className?: string;
  imgClassName?: string;
}

/**
 * Responsive, lazy, layout-stable image backed by the generated manifest.
 * Shows a tiny blurred placeholder until the real image has decoded.
 */
export function Picture({
  image,
  sizes = "100vw",
  priority = false,
  alt,
  position,
  className = "",
  imgClassName = "",
  ...rest
}: PictureProps) {
  const asset = getImage(image);
  const meta = photoByKey[image];
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-sand-light ${className}`}
      style={{ aspectRatio: rest.style?.aspectRatio ? undefined : `${asset.width} / ${asset.height}` }}
    >
      <img
        aria-hidden="true"
        src={asset.placeholder}
        alt=""
        className={`absolute inset-0 h-full w-full scale-110 object-cover blur-xl transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"} ${imgClassName}`}
        style={position ? { objectPosition: position } : undefined}
      />
      <img
        src={largestSrc(image)}
        srcSet={srcSet(image)}
        sizes={sizes}
        width={asset.width}
        height={asset.height}
        alt={alt ?? meta?.alt ?? ""}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        className={`relative h-full w-full object-cover ${imgClassName}`}
        style={position ? { objectPosition: position } : undefined}
        {...rest}
      />
    </div>
  );
}
