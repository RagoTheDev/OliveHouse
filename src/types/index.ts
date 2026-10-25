import type { LucideIcon } from "lucide-react";
import type { ImageKey } from "@/data/images.generated";

export interface Photo {
  key: ImageKey;
  alt: string;
  caption: string;
  /** Room or area this photo belongs to. */
  room: RoomId;
}

export type RoomId =
  | "exterior"
  | "living-room"
  | "bedroom-one"
  | "bedroom-two"
  | "kitchen"
  | "bathroom";

export interface Room {
  id: RoomId;
  index: string;
  name: string;
  tagline: string;
  description: string;
  photos: ImageKey[];
  facts: string[];
}

export interface Amenity {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface NearbyPlace {
  name: string;
  value: string;
  unit: string;
  mode: string;
}

export interface Review {
  quote: string;
  author: string;
  origin: string;
  source: string;
  date: string;
  /** Only published reviews are rendered. Keep false until you have permission. */
  published: boolean;
}

export interface NavItem {
  label: string;
  to: string;
  /** Hash target on the home page (e.g. "house"). */
  hash?: string;
}
