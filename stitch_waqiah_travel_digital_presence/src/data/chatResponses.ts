export type QuickReply = {
  label: string;
  topicId?: string;
  link?: string;
  menu?: boolean;
};

export type ChatTopic = {
  id: string;
  keywords: string[];
  response: string;
  quickReplies: QuickReply[];
};

export const WELCOME_QUICK_REPLIES: QuickReply[] = [
  { label: "✈️ Flight prices", topicId: "flights" },
  { label: "🕋 Hajj & Umrah packages", topicId: "hajj" },
  { label: "📋 Visa services", topicId: "visa" },
  { label: "📞 Talk to an agent", topicId: "contact" },
];

export const CHAT_TOPICS: ChatTopic[] = [
  {
    id: "flights",
    keywords: ["flight", "fly", "airline", "ticket", "air", "plane"],
    response:
      "✈️ We work with top airlines — Emirates, Qatar Airways, Turkish Airlines, Biman Bangladesh, Saudia, and Etihad — to secure competitive fares worldwide.\n\nTell us your destination and travel dates and we'll find the best options for you.",
    quickReplies: [
      { label: "🔍 Search flights", link: "/flights" },
      { label: "📞 Call for pricing", topicId: "contact" },
      { label: "🏠 Main menu", menu: true },
    ],
  },
  {
    id: "hajj",
    keywords: [
      "hajj",
      "umrah",
      "makkah",
      "medina",
      "pilgrimage",
      "sacred",
      "haram",
      "kaaba",
      "mecca",
    ],
    response:
      "🕋 We offer all-inclusive Hajj & Umrah packages from New York — scholar-led groups, Haram-facing hotels, and full visa processing included. Prices vary by season and hotel grade.",
    quickReplies: [
      { label: "📦 View packages", link: "/packages" },
      { label: "📞 Call for a quote", topicId: "contact" },
      { label: "🏠 Main menu", menu: true },
    ],
  },
  {
    id: "visa",
    keywords: ["visa", "passport", "document", "apply", "application", "immigration"],
    response:
      "📋 We provide end-to-end visa processing — from Saudi Arabia to popular holiday destinations. Our team handles all paperwork so your application is compliant and stress-free.",
    quickReplies: [
      { label: "📋 Visa services", link: "/visa" },
      { label: "📞 Speak to us", topicId: "contact" },
      { label: "🏠 Main menu", menu: true },
    ],
  },
  {
    id: "packages",
    keywords: ["package", "tour", "holiday", "trip", "vacation", "deal", "bundle", "travel"],
    response:
      "🌍 We arrange fully curated tour packages — from worldwide holidays and city breaks to all-inclusive pilgrimage journeys. Every detail handled, from flights to hotels.",
    quickReplies: [
      { label: "📦 Browse packages", link: "/packages" },
      { label: "📞 Get a custom quote", topicId: "contact" },
      { label: "🏠 Main menu", menu: true },
    ],
  },
  {
    id: "hotels",
    keywords: ["hotel", "stay", "accommodation", "room", "resort", "lodging"],
    response:
      "🏨 We hand-pick hotels and resorts at the right price — from budget-friendly stays to premium Haram-facing properties in Makkah and Madinah.",
    quickReplies: [
      { label: "📦 View packages", link: "/packages" },
      { label: "📞 Ask about hotels", topicId: "contact" },
      { label: "🏠 Main menu", menu: true },
    ],
  },
  {
    id: "pricing",
    keywords: ["price", "cost", "cheap", "rate", "how much", "affordable", "budget", "fee"],
    response:
      "💰 Prices vary by destination, season, and package tier. We leverage our airline and hotel partnerships to get you the most competitive rates — without hidden fees.",
    quickReplies: [
      { label: "📞 Get a quote", topicId: "contact" },
      { label: "📦 View packages", link: "/packages" },
      { label: "🏠 Main menu", menu: true },
    ],
  },
  {
    id: "contact",
    keywords: ["contact", "call", "speak", "agent", "help", "human", "talk", "phone", "email", "reach"],
    response:
      "📞 Our team is available Mon–Sat, 9am–7pm EST:\n\n☎️ 718 361 0110\n☎️ 646 520 9507\n✉️ waqiahtravels@gmail.com\n\nOr visit us at 45-19 48th Ave, Woodside, NY.",
    quickReplies: [
      { label: "📧 Send a message", link: "/contact" },
      { label: "🏠 Main menu", menu: true },
    ],
  },
];

export const FALLBACK: { response: string; quickReplies: QuickReply[] } = {
  response:
    "I'm not sure about that — but our team will know! 😊\n\n☎️ 718 361 0110\n✉️ waqiahtravels@gmail.com\nMon–Sat · 9am–7pm EST",
  quickReplies: [
    { label: "📧 Contact us", link: "/contact" },
    { label: "🏠 Main menu", menu: true },
  ],
};

export function findTopic(input: string): ChatTopic | undefined {
  const lower = input.toLowerCase();
  return CHAT_TOPICS.find((t) => t.keywords.some((kw) => lower.includes(kw)));
}
