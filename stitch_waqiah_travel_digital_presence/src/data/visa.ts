export type VisaService = {
  id: string;
  country: string;
  flag: string;
  type: string;
  processing: string;
  validity: string;
  price: number;
  popular?: boolean;
};

export const VISA_SERVICES: VisaService[] = [
  {
    id: "ksa-umrah",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    type: "Umrah Visa",
    processing: "3–5 business days",
    validity: "90 days",
    price: 180,
    popular: true,
  },
  {
    id: "ksa-visit",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    type: "Tourist / Visit Visa",
    processing: "2–4 business days",
    validity: "1 year (multi-entry)",
    price: 160,
  },
  {
    id: "uae",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    type: "Tourist Visa",
    processing: "3–4 business days",
    validity: "60 days",
    price: 140,
    popular: true,
  },
  {
    id: "turkey",
    country: "Türkiye",
    flag: "🇹🇷",
    type: "e-Visa",
    processing: "1–2 business days",
    validity: "180 days",
    price: 90,
  },
  {
    id: "schengen",
    country: "Schengen Area",
    flag: "🇪🇺",
    type: "Tourist Visa",
    processing: "10–15 business days",
    validity: "90 days",
    price: 220,
  },
  {
    id: "uk",
    country: "United Kingdom",
    flag: "🇬🇧",
    type: "Standard Visitor",
    processing: "15–20 business days",
    validity: "6 months",
    price: 240,
  },
];

export const VISA_STEPS = [
  {
    title: "Free Eligibility Review",
    body: "Share your destination and travel dates. Our visa team confirms requirements and the documents you'll need.",
  },
  {
    title: "Document Preparation",
    body: "We review every form and supporting document, flag issues early, and prepare a compliant application.",
  },
  {
    title: "Submission & Tracking",
    body: "We submit to the consulate or portal and keep you updated at every stage until a decision is reached.",
  },
  {
    title: "Approval & Travel",
    body: "Receive your approved visa, pre-departure briefing, and travel-ready itinerary with peace of mind.",
  },
];
