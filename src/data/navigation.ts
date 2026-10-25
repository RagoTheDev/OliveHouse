import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "The House", to: "/#house", hash: "house" },
  { label: "Gallery", to: "/gallery" },
  { label: "Amenities", to: "/#amenities", hash: "amenities" },
  { label: "Location", to: "/#location", hash: "location" },
];

export const bookingPath = "/book";
