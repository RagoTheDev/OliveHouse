import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "The House", to: "/#house", hash: "house" },
  { label: "Gallery", to: "/gallery" },
  { label: "Amenities", to: "/#amenities", hash: "amenities" },
  { label: "Location", to: "/#location", hash: "location" },
];

export const bookingPath = "/book";

/** Informational pages linked from the footer and cross-linked between pages. */
export const stayPages: NavItem[] = [
  { label: "Accommodation in Kigamboni", to: "/accommodation-kigamboni" },
  { label: "Holiday home in Kigamboni", to: "/holiday-home-kigamboni" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
  { label: "Book your stay", to: "/book" },
];
