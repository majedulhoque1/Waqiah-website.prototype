export type PackageType = "Hajj" | "Umrah" | "International";

export type TravelPackage = {
  id: string;
  type: PackageType;
  title: string;
  duration: string;
  nights: number;
  price: number;
  rating: number;
  hotel: string;
  distance: string;
  image: string;
  highlights: string[];
  featured?: boolean;
};

// Unsplash source imagery (sacred sites & global landmarks) — swapped for
// licensed assets in the content phase.
export const PACKAGES: TravelPackage[] = [
  {
    id: "umrah-premium",
    type: "Umrah",
    title: "Premium Umrah — Ramadan Special",
    duration: "14 Days",
    nights: 13,
    price: 4950,
    rating: 4.9,
    hotel: "Swissôtel Al Maqam & Anwar Al Madinah Mövenpick",
    distance: "Haram-facing · 0 min walk",
    image:
      "/img/kaaba.jpg",
    highlights: ["5-star Haram-view hotels", "Private guided ziyarat", "Direct Emirates flights", "All ground transfers"],
    featured: true,
  },
  {
    id: "hajj-2025",
    type: "Hajj",
    title: "Guided Hajj Package 2025",
    duration: "21 Days",
    nights: 20,
    price: 11250,
    rating: 5.0,
    hotel: "Makkah Clock Royal Tower & Madinah Hilton",
    distance: "Haram-facing · 0 min walk",
    image:
      "/img/hajj.jpg",
    highlights: ["Scholar-accompanied group", "Mina & Arafat VIP camps", "Full-board dining", "24/7 on-ground support"],
    featured: true,
  },
  {
    id: "umrah-economy",
    type: "Umrah",
    title: "Value Umrah Journey",
    duration: "10 Days",
    nights: 9,
    price: 2890,
    rating: 4.7,
    hotel: "Dar Al Eiman Royal & Al Madinah Concorde",
    distance: "350 m to Haram",
    image:
      "/img/about.jpg",
    highlights: ["4-star comfort hotels", "Group ziyarat tour", "Visa processing included", "Airport meet & greet"],
  },
  {
    id: "umrah-family",
    type: "Umrah",
    title: "Family Umrah Comfort",
    duration: "12 Days",
    nights: 11,
    price: 3760,
    rating: 4.8,
    hotel: "Pullman ZamZam Makkah & Madinah Mövenpick",
    distance: "Haram-facing · 0 min walk",
    image:
      "/hero-makkah.png",
    highlights: ["Connecting family rooms", "Child-friendly itinerary", "Flexible departure dates", "Dedicated coordinator"],
  },
  {
    id: "istanbul-umrah",
    type: "International",
    title: "Istanbul + Umrah Combo",
    duration: "16 Days",
    nights: 15,
    price: 5480,
    rating: 4.8,
    hotel: "Istanbul Old City & Makkah Haram hotels",
    distance: "City-centre stays",
    image:
      "/img/istanbul.jpg",
    highlights: ["3 nights in Istanbul", "Hagia Sophia & Bosphorus tour", "Turkish Airlines flights", "Seamless transfers"],
  },
  {
    id: "dubai-getaway",
    type: "International",
    title: "Dubai Discovery Getaway",
    duration: "7 Days",
    nights: 6,
    price: 1980,
    rating: 4.6,
    hotel: "Downtown Dubai 5-star resort",
    distance: "Burj Khalifa district",
    image:
      "/img/dubai.jpg",
    highlights: ["Desert safari experience", "Burj Khalifa entry", "City & dhow cruise tour", "Emirates direct flights"],
  },
  {
    id: "maldives-escape",
    type: "International",
    title: "Maldives Overwater Escape",
    duration: "6 Days",
    nights: 5,
    price: 3240,
    rating: 4.9,
    hotel: "Overwater villa resort, North Malé Atoll",
    distance: "Private island · seaplane transfer",
    image:
      "/img/maldives.jpg",
    highlights: ["Overwater villa", "Snorkeling & reef tours", "Half-board dining", "Seaplane transfers"],
    featured: true,
  },
  {
    id: "turkiye-tour",
    type: "International",
    title: "Türkiye Heritage Tour",
    duration: "9 Days",
    nights: 8,
    price: 2450,
    rating: 4.7,
    hotel: "Istanbul · Cappadocia · Antalya hotels",
    distance: "Multi-city guided tour",
    image:
      "/img/cappadocia.jpg",
    highlights: ["Hagia Sophia & Bosphorus", "Cappadocia balloon ride", "Antalya coast", "Turkish Airlines flights"],
  },
];

export const PACKAGE_FILTERS: Array<PackageType | "All"> = ["All", "Hajj", "Umrah", "International"];
