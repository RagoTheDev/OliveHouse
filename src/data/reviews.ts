import type { Review } from "@/types";

/**
 * Guest reviews. Only reviews with `published: true` are rendered.
 *
 * The review below was left publicly on the Airbnb listing. Flip
 * `published` to true once you are comfortable reproducing it here (and have
 * the guest's permission if you want to keep their name). Until then the
 * site shows the editorial "atmosphere" section instead of testimonials.
 */
export const reviews: Review[] = [
  {
    quote:
      "She communicated with us promptly, offered help and solutions whenever we needed it. Her place is beautiful. It looks exactly like the pictures, it is squeaky clean, cozy, and is worth every penny. We will definitely be coming back.",
    author: "Renee",
    origin: "Kisumu, Kenya",
    source: "Airbnb",
    date: "2026-10",
    published: false,
  },
];

export const publishedReviews = reviews.filter((r) => r.published);
