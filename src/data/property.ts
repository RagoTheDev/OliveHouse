import {
  Wifi,
  Laptop,
  CookingPot,
  CarFront,
  Waves,
  PawPrint,
  KeyRound,
} from "lucide-react";
import type { Amenity, NearbyPlace, Room } from "@/types";

/**
 * Verified property information. Source: the official Airbnb listing
 * (https://www.airbnb.com/rooms/1759153791039194505). Do not add facts
 * here that have not been confirmed by the owner.
 */
export const property = {
  name: "Olive House",
  tagline: "A slower way to stay.",
  subtitle: "Your peaceful coastal escape in Kigamboni, Dar es Salaam.",
  type: "Entire home",
  locality: "Kigamboni",
  city: "Dar es Salaam",
  region: "Dar es Salaam",
  country: "Tanzania",
  countryCode: "TZ",
  bedrooms: 2,
  beds: 2,
  bedDetail: "one queen and one double",
  bathrooms: 2,
  maxGuests: 3,
  checkIn: "2:00 PM – 10:00 PM",
  checkOut: "before 11:00 AM",
  hostFirstName: "Monica",
  description: [
    "Olive House is a peaceful home in Kigamboni, on the quieter shore of Dar es Salaam. It is a comfortable place to slow down, work quietly, unwind, or enjoy time with a few friends.",
    "The house has a warm, homely feel: timber wardrobes, terracotta brick, soft green textiles, and a veranda full of plants. The beach is a five-minute walk away, and the ferry to the city centre is about five minutes by car or tuk-tuk.",
  ],
  airbnbListingId: "1759153791039194505",
} as const;

export const rooms: Room[] = [
  {
    id: "living-room",
    index: "01",
    name: "The living room",
    tagline: "Where the afternoons go.",
    description:
      "A deep terracotta sofa, a live-edge timber table and a coffered ceiling with a slow ceiling fan. Light arrives through the tall window; the macramé curtain leads through to the kitchen.",
    photos: ["living-room", "living-room-detail"],
    facts: ["Sofa seating", "Ceiling fan", "Dedicated workspace"],
  },
  {
    id: "bedroom-one",
    index: "02",
    name: "Bedroom one",
    tagline: "Queen bed, sage linen, en-suite.",
    description:
      "Textured ochre walls, warm sconces and a hand-knotted macramé above the bed. The queen bed is dressed in soft green, and the en-suite bathroom opens directly off the room.",
    photos: ["bedroom-one", "bedroom-one-detail"],
    facts: ["Queen bed", "En-suite bathroom", "Wardrobe"],
  },
  {
    id: "bedroom-two",
    index: "03",
    name: "Bedroom two",
    tagline: "A quieter second room.",
    description:
      "A double bed in gingham, a solid timber wardrobe and its own bathroom. Simple, calm and comfortable for a friend, a colleague or a third guest.",
    photos: ["bedroom-two", "bedroom-two-detail"],
    facts: ["Double bed", "Private bathroom", "Wardrobe"],
  },
  {
    id: "kitchen",
    index: "04",
    name: "The kitchen",
    tagline: "Cook as if you lived here.",
    description:
      "Honey-toned timber cabinets, a fridge, microwave and kettle, pots and pans, and a window over the sink that looks out to the garden greenery. Coffee is stocked.",
    photos: ["kitchen"],
    facts: ["Full kitchen", "Fridge & microwave", "Coffee & kettle"],
  },
  {
    id: "bathroom",
    index: "05",
    name: "The bathrooms",
    tagline: "Two, each with hot water.",
    description:
      "Both bedrooms have their own bathroom with a hot shower, bidet and Zanzibar-made bath essentials. Towels, soap and linens are provided.",
    photos: ["bathroom", "bathroom-shower", "bathroom-vanity", "detail-shower-gel"],
    facts: ["Hot water", "Shower gel & towels", "Bidet"],
  },
];

/** The seven headline amenities verified on the listing. */
export const amenities: Amenity[] = [
  {
    id: "wifi",
    label: "Wi-Fi",
    description: "Reliable connection throughout the house for calls, streaming and remote work.",
    icon: Wifi,
  },
  {
    id: "workspace",
    label: "Dedicated workspace",
    description: "A proper place to sit and work, so a long stay never feels like working from a bed.",
    icon: Laptop,
  },
  {
    id: "kitchen",
    label: "Full kitchen",
    description: "Fridge, microwave, kettle, cooking basics, dishes and cutlery. Coffee stocked.",
    icon: CookingPot,
  },
  {
    id: "parking",
    label: "Free parking",
    description: "Free parking on the premises, with a private entrance from the street.",
    icon: CarFront,
  },
  {
    id: "beach",
    label: "Beach access",
    description: "The Kigamboni shoreline is about five minutes away on foot.",
    icon: Waves,
  },
  {
    id: "pets",
    label: "Pet-friendly",
    description: "Furry companions are welcome. Assistance animals are always allowed.",
    icon: PawPrint,
  },
  {
    id: "self-checkin",
    label: "Self check-in",
    description: "Building staff are available around the clock to let you in. Check-in 2–10 PM.",
    icon: KeyRound,
  },
];

/** Everything else confirmed on the listing, grouped for the "also in the house" list. */
export const extraAmenities: { group: string; items: string[] }[] = [
  {
    group: "Comfort",
    items: ["Ceiling fans", "Hot water", "Bath essentials & towels", "Bed linens & extra pillows", "Hangers & clothing storage", "Iron"],
  },
  {
    group: "Practical",
    items: ["Washer in unit", "Luggage drop-off", "Long-term stays welcome", "Single-level, no stairs", "Private entrance"],
  },
  {
    group: "Safety",
    items: ["Smoke alarm", "Carbon monoxide alarm", "Fire extinguisher", "Exterior security camera at the entrance"],
  },
];

/** Honest notes so guests arrive with the right expectations. */
export const goodToKnow: string[] = [
  "The house is cooled by ceiling fans; there is no air conditioning.",
  "There is no television. Bring a book, or the Wi-Fi is quick.",
  "No smoking inside the house.",
];

export const nearby: NearbyPlace[] = [
  { name: "The beach", value: "5", unit: "min", mode: "on foot" },
  { name: "Kigamboni ferry", value: "5", unit: "min", mode: "by car or tuk-tuk" },
  { name: "Julius Nyerere Bridge", value: "5", unit: "km", mode: "by road" },
  { name: "Benjamin Mkapa Stadium", value: "7", unit: "km", mode: "by road" },
];

/**
 * General Kigamboni area used for the map until a precise pin is provided
 * through VITE_MAP_LAT / VITE_MAP_LNG. Deliberately approximate.
 */
export const approximateArea = {
  zoom: 13,
  label: "Kigamboni, Dar es Salaam",
};
