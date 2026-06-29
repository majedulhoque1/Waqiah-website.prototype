export const SITE = {
  name: "Waqiah Travel",
  legalName: "Waqiah Travel & Tour Inc.",
  tagline: "Your trusted New York partner for flights, tours, and Hajj & Umrah.",
  description:
    "From international flights and holiday packages to expertly guided Hajj and Umrah, Waqiah Travel & Tour handles every detail of your journey — with care, competitive pricing, and assured peace of mind.",
  founders: "Enaam & Aishaa Ahmed",
  address: {
    line1: "45-19 48th Avenue",
    line2: "Woodside, NY 11377",
  },
  phones: ["718 361 0110", "646 520 9507"],
  // NOTE: placeholder email — confirm the agency's real address before launch.
  email: "info@waqiahtravel.com",
  hours: "Mon–Sat · 9:00 AM – 7:00 PM (EST)",
  rating: { score: "4.6", source: "Google" },
} as const;

export type NavLink = { label: string; to: string };

// Travel-first ordering — full-service agency, with pilgrimage as a flagship category.
export const NAV_LINKS: NavLink[] = [
  { label: "Flights", to: "/flights" },
  { label: "Packages", to: "/packages" },
  { label: "Visa", to: "/visa" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_LINKS = {
  explore: [
    { label: "Flights", to: "/flights" },
    { label: "Tours & Packages", to: "/packages" },
    { label: "Hajj & Umrah", to: "/packages" },
    { label: "Visa Services", to: "/visa" },
    { label: "Plan with AI", to: "/plan-with-ai" },
  ],
  legal: [
    { label: "Privacy Policy", to: "/contact" },
    { label: "Terms of Service", to: "/contact" },
    { label: "Travel Insurance", to: "/contact" },
    { label: "Contact", to: "/contact" },
  ],
} as const;

export type Partner = { name: string };

export const AIRLINE_PARTNERS: Partner[] = [
  { name: "Emirates" },
  { name: "Qatar Airways" },
  { name: "Turkish Airlines" },
  { name: "Biman Bangladesh" },
  { name: "Saudia" },
  { name: "Etihad" },
];
