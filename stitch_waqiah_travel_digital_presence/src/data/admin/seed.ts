// ---------------------------------------------------------------------------
// Admin demo seed data.
//
// This is mock content used to make the pitch admin panel feel alive. It is
// NOT wired to any backend — the AdminStore loads these records into
// sessionStorage on first visit so a live click-through (add/edit/status
// changes) persists across refreshes, then resets on a new browser session.
// ---------------------------------------------------------------------------

export type InquiryStatus = "New" | "In Progress" | "Closed";
export type InquiryService = "Flights" | "Packages" | "Hajj & Umrah" | "Visa" | "General";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: InquiryService;
  subject: string;
  message: string;
  status: InquiryStatus;
  createdAt: string; // ISO
  notes: string[];
};

export type VisaStatus = "Received" | "Processing" | "Approved" | "Rejected";

export type VisaApplication = {
  id: string;
  applicant: string;
  email: string;
  country: string;
  flag: string;
  visaType: string;
  nationality: string;
  passportNo: string;
  travelDate: string; // ISO date
  submittedAt: string; // ISO
  status: VisaStatus;
};

export type BookingStatus = "Pending" | "Confirmed" | "Cancelled";
export type BookingType = "Flight" | "Package";

export type Booking = {
  id: string;
  ref: string;
  customer: string;
  type: BookingType;
  item: string;
  pax: number;
  amount: number;
  status: BookingStatus;
  date: string; // ISO
};

export type ChatMessage = { role: "user" | "bot"; text: string; time: string };

export type ChatThread = {
  id: string;
  visitor: string;
  startedAt: string; // ISO
  topic: string;
  messages: ChatMessage[];
  converted: boolean;
};

export type AdminRole = "Owner" | "Admin" | "Agent";
export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  lastActive: string; // ISO
};

export type CMSContent = {
  heroTitle: string;
  heroSubtitle: string;
  aboutHeadline: string;
  aboutBody: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  hours: string;
};

export type AdminSettings = {
  businessName: string;
  timezone: string;
  currency: string;
  notifyNewInquiry: boolean;
  notifyNewBooking: boolean;
  autoReplyEnabled: boolean;
  maintenanceMode: boolean;
};

const daysAgo = (n: number, h = 9, m = 30) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};
const daysAhead = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

export const SEED_INQUIRIES: Inquiry[] = [
  {
    id: "inq-1024",
    name: "Yusuf Rahman",
    email: "yusuf.rahman@gmail.com",
    phone: "+1 917 555 0142",
    service: "Hajj & Umrah",
    subject: "Ramadan Umrah for family of 4",
    message:
      "As-salamu alaykum. We are a family of four (2 adults, 2 children) hoping to travel for the last 10 nights of Ramadan. Could you share Haram-facing options and pricing?",
    status: "New",
    createdAt: daysAgo(0, 8, 15),
    notes: [],
  },
  {
    id: "inq-1023",
    name: "Fatima Al-Sayed",
    email: "fatima.alsayed@outlook.com",
    phone: "+1 646 555 0199",
    service: "Visa",
    subject: "Saudi visit visa timeline",
    message:
      "I need a Saudi visit visa for my parents visiting from Egypt. How long does processing take and what documents are required?",
    status: "In Progress",
    createdAt: daysAgo(1, 14, 5),
    notes: ["Called back — collecting passport scans.", "Awaiting parents' passport copies."],
  },
  {
    id: "inq-1022",
    name: "David Okonkwo",
    email: "d.okonkwo@company.com",
    phone: "+1 718 555 0110",
    service: "Flights",
    subject: "JFK → Lagos business class",
    message:
      "Looking for business class fares JFK to Lagos in December for 2 passengers. Flexible dates around the 18th–22nd.",
    status: "New",
    createdAt: daysAgo(1, 10, 40),
    notes: [],
  },
  {
    id: "inq-1021",
    name: "Aisha Begum",
    email: "aisha.begum@gmail.com",
    phone: "+1 347 555 0077",
    service: "Packages",
    subject: "Istanbul + Umrah combo honeymoon",
    message:
      "My husband and I want the Istanbul + Umrah combo package for our honeymoon in October. Can departure be flexible?",
    status: "In Progress",
    createdAt: daysAgo(3, 16, 20),
    notes: ["Sent October availability + upgrade options."],
  },
  {
    id: "inq-1020",
    name: "Mohammed Iqbal",
    email: "m.iqbal@yahoo.com",
    phone: "+1 929 555 0163",
    service: "Hajj & Umrah",
    subject: "Hajj 2025 group availability",
    message: "Do you still have spots for the scholar-led Hajj 2025 group? Traveling solo.",
    status: "Closed",
    createdAt: daysAgo(6, 11, 0),
    notes: ["Booked — confirmation WQ-30188 issued.", "Deposit received."],
  },
  {
    id: "inq-1019",
    name: "Sarah Thompson",
    email: "sarah.t@gmail.com",
    phone: "+1 212 555 0188",
    service: "Packages",
    subject: "Maldives anniversary trip",
    message: "Interested in the Maldives overwater villa escape for our 10th anniversary in November.",
    status: "Closed",
    createdAt: daysAgo(8, 9, 45),
    notes: ["Confirmed booking WQ-30176."],
  },
  {
    id: "inq-1018",
    name: "Omar Farooq",
    email: "omar.farooq@gmail.com",
    phone: "+1 718 555 0201",
    service: "General",
    subject: "Office hours this weekend",
    message: "Are you open this Saturday? Would like to visit the Woodside office to discuss a package.",
    status: "New",
    createdAt: daysAgo(0, 12, 10),
    notes: [],
  },
];

export const SEED_VISA_APPS: VisaApplication[] = [
  {
    id: "vsa-5012",
    applicant: "Fatima Al-Sayed",
    email: "fatima.alsayed@outlook.com",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    visaType: "Tourist / Visit Visa",
    nationality: "Egyptian",
    passportNo: "A1234567",
    travelDate: daysAhead(45),
    submittedAt: daysAgo(1, 14, 30),
    status: "Processing",
  },
  {
    id: "vsa-5011",
    applicant: "Yusuf Rahman",
    email: "yusuf.rahman@gmail.com",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    visaType: "Umrah Visa",
    nationality: "American",
    passportNo: "B7654321",
    travelDate: daysAhead(30),
    submittedAt: daysAgo(2, 9, 15),
    status: "Received",
  },
  {
    id: "vsa-5010",
    applicant: "Aisha Begum",
    email: "aisha.begum@gmail.com",
    country: "Türkiye",
    flag: "🇹🇷",
    visaType: "e-Visa",
    nationality: "British",
    passportNo: "C1122334",
    travelDate: daysAhead(60),
    submittedAt: daysAgo(4, 13, 0),
    status: "Approved",
  },
  {
    id: "vsa-5009",
    applicant: "Reza Karimi",
    email: "reza.karimi@gmail.com",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    visaType: "Tourist Visa",
    nationality: "Canadian",
    passportNo: "D5566778",
    travelDate: daysAhead(20),
    submittedAt: daysAgo(5, 10, 45),
    status: "Processing",
  },
  {
    id: "vsa-5008",
    applicant: "Nadia Hussain",
    email: "nadia.h@outlook.com",
    country: "Schengen Area",
    flag: "🇪🇺",
    visaType: "Tourist Visa",
    nationality: "American",
    passportNo: "E9988776",
    travelDate: daysAhead(80),
    submittedAt: daysAgo(9, 15, 20),
    status: "Rejected",
  },
  {
    id: "vsa-5007",
    applicant: "Bilal Ahmed",
    email: "bilal.ahmed@gmail.com",
    country: "United Kingdom",
    flag: "🇬🇧",
    visaType: "Standard Visitor",
    nationality: "Bangladeshi",
    passportNo: "F4433221",
    travelDate: daysAhead(95),
    submittedAt: daysAgo(3, 11, 30),
    status: "Received",
  },
];

export const SEED_BOOKINGS: Booking[] = [
  {
    id: "bk-1",
    ref: "WQ-30188",
    customer: "Mohammed Iqbal",
    type: "Package",
    item: "Guided Hajj Package 2025",
    pax: 1,
    amount: 11250,
    status: "Confirmed",
    date: daysAgo(6, 11, 30),
  },
  {
    id: "bk-2",
    ref: "WQ-30187",
    customer: "Aisha Begum",
    type: "Package",
    item: "Istanbul + Umrah Combo",
    pax: 2,
    amount: 10960,
    status: "Pending",
    date: daysAgo(2, 16, 45),
  },
  {
    id: "bk-3",
    ref: "WQ-30186",
    customer: "David Okonkwo",
    type: "Flight",
    item: "EK 204 · JFK → Lagos (Business)",
    pax: 2,
    amount: 8420,
    status: "Pending",
    date: daysAgo(1, 10, 55),
  },
  {
    id: "bk-4",
    ref: "WQ-30176",
    customer: "Sarah Thompson",
    type: "Package",
    item: "Maldives Overwater Escape",
    pax: 2,
    amount: 6480,
    status: "Confirmed",
    date: daysAgo(8, 10, 0),
  },
  {
    id: "bk-5",
    ref: "WQ-30171",
    customer: "Yusuf Rahman",
    type: "Package",
    item: "Premium Umrah — Ramadan Special",
    pax: 4,
    amount: 19800,
    status: "Confirmed",
    date: daysAgo(12, 9, 20),
  },
  {
    id: "bk-6",
    ref: "WQ-30165",
    customer: "Reza Karimi",
    type: "Flight",
    item: "QR 702 · JFK → JED (Economy)",
    pax: 1,
    amount: 1095,
    status: "Cancelled",
    date: daysAgo(14, 13, 15),
  },
];

export const SEED_CHAT_THREADS: ChatThread[] = [
  {
    id: "ch-1",
    visitor: "Visitor · New York",
    startedAt: daysAgo(0, 9, 5),
    topic: "Hajj & Umrah packages",
    converted: false,
    messages: [
      { role: "bot", text: "As-salamu alaykum! 👋 How can Waqiah Travel help you today?", time: "09:05" },
      { role: "user", text: "Do you have umrah packages for Ramadan?", time: "09:05" },
      {
        role: "bot",
        text: "🕋 Yes! We offer all-inclusive Umrah packages from New York with Haram-facing hotels and full visa processing. Prices vary by season and hotel grade.",
        time: "09:06",
      },
      { role: "user", text: "What's the price for a family of 4?", time: "09:06" },
      {
        role: "bot",
        text: "Our Premium Umrah — Ramadan Special starts at $4,950/person. For a family of 4 I can connect you with an agent for a tailored quote.",
        time: "09:07",
      },
      { role: "user", text: "Yes please have someone call me", time: "09:07" },
    ],
  },
  {
    id: "ch-2",
    visitor: "Visitor · Woodside",
    startedAt: daysAgo(0, 13, 40),
    topic: "Flight pricing",
    converted: true,
    messages: [
      { role: "bot", text: "As-salamu alaykum! 👋 How can Waqiah Travel help you today?", time: "13:40" },
      { role: "user", text: "flights to jeddah in december", time: "13:40" },
      {
        role: "bot",
        text: "✈️ We work with Emirates, Qatar Airways, Saudia and more for competitive JFK → Jeddah fares. Would you like me to have an agent send December options?",
        time: "13:41",
      },
      { role: "user", text: "yes, 2 passengers business class", time: "13:41" },
      { role: "bot", text: "Great — I've logged your request. An agent will email you shortly. 📧", time: "13:42" },
    ],
  },
  {
    id: "ch-3",
    visitor: "Visitor · Queens",
    startedAt: daysAgo(1, 18, 12),
    topic: "Visa services",
    converted: false,
    messages: [
      { role: "bot", text: "As-salamu alaykum! 👋 How can Waqiah Travel help you today?", time: "18:12" },
      { role: "user", text: "how much is a turkey evisa", time: "18:12" },
      {
        role: "bot",
        text: "📋 Our Türkiye e-Visa service is $90 with 1–2 business day processing and 180 days validity. We handle all the paperwork for you.",
        time: "18:13",
      },
      { role: "user", text: "great thanks", time: "18:13" },
    ],
  },
  {
    id: "ch-4",
    visitor: "Visitor · Brooklyn",
    startedAt: daysAgo(2, 11, 25),
    topic: "Contact / agent",
    converted: true,
    messages: [
      { role: "bot", text: "As-salamu alaykum! 👋 How can Waqiah Travel help you today?", time: "11:25" },
      { role: "user", text: "I want to talk to a human", time: "11:25" },
      {
        role: "bot",
        text: "📞 Of course! Our team is available Mon–Sat, 9am–7pm EST at 718 361 0110. Shall I have someone reach out to you?",
        time: "11:26",
      },
      { role: "user", text: "yes call me tomorrow morning", time: "11:26" },
    ],
  },
];

export const SEED_ADMIN_USERS: AdminUser[] = [
  { id: "u-1", name: "Enaam Ahmed", email: "waqiahtravels@gmail.com", role: "Owner", lastActive: daysAgo(0, 8, 0) },
  { id: "u-2", name: "Aishaa Ahmed", email: "aishaa@waqiahtravels.com", role: "Admin", lastActive: daysAgo(0, 10, 30) },
  { id: "u-3", name: "Imran Chowdhury", email: "imran@waqiahtravels.com", role: "Agent", lastActive: daysAgo(1, 17, 10) },
];

export const SEED_CMS: CMSContent = {
  heroTitle: "Your journey, guided with care",
  heroSubtitle:
    "From international flights and holiday packages to expertly guided Hajj and Umrah — Waqiah Travel handles every detail.",
  aboutHeadline: "Your trusted New York travel partner",
  aboutBody:
    "Founded by Enaam & Aishaa Ahmed, Waqiah Travel & Tour has helped New York families travel with confidence — combining competitive pricing with genuine care for every pilgrim and traveler.",
  phone1: "718 361 0110",
  phone2: "646 520 9507",
  email: "waqiahtravels@gmail.com",
  address: "45-19 48th Avenue, Woodside, NY 11377",
  hours: "Mon–Sat · 9:00 AM – 7:00 PM (EST)",
};

export const SEED_SETTINGS: AdminSettings = {
  businessName: "Waqiah Travel & Tour Inc.",
  timezone: "America/New_York (EST)",
  currency: "USD ($)",
  notifyNewInquiry: true,
  notifyNewBooking: true,
  autoReplyEnabled: true,
  maintenanceMode: false,
};
