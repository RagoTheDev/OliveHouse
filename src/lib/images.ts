import { images, type ImageKey } from "@/data/images.generated";

export function getImage(key: ImageKey) {
  return images[key];
}

export function srcSet(key: ImageKey): string {
  return images[key].variants.map((v) => `${v.src} ${v.width}w`).join(", ");
}

/** Largest available variant, used as the plain `src` fallback. */
export function largestSrc(key: ImageKey): string {
  const v = images[key].variants;
  return v[v.length - 1].src;
}

export function variantAtLeast(key: ImageKey, width: number): string {
  const v = images[key].variants;
  return (v.find((x) => x.width >= width) ?? v[v.length - 1]).src;
}

export function aspectRatio(key: ImageKey): number {
  const { width, height } = images[key];
  return width / height;
}
