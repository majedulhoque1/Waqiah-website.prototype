import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { PACKAGES, type TravelPackage } from "../data/packages";
import { SAMPLE_FLIGHTS, type Flight } from "../data/flights";
import {
  SEED_INQUIRIES,
  SEED_VISA_APPS,
  SEED_BOOKINGS,
  SEED_CHAT_THREADS,
  SEED_ADMIN_USERS,
  SEED_CMS,
  SEED_SETTINGS,
  type Inquiry,
  type InquiryStatus,
  type VisaApplication,
  type VisaStatus,
  type Booking,
  type BookingStatus,
  type ChatThread,
  type AdminUser,
  type CMSContent,
  type AdminSettings,
} from "../data/admin/seed";

// ---------------------------------------------------------------------------
// AdminStore — the single source of truth for the demo admin panel.
//
// Everything lives in React state, mirrored to sessionStorage so a live
// pitch click-through (add a package, move an inquiry to Closed, etc.)
// survives page refreshes. A brand-new browser session starts clean from the
// seed data. This is deliberately backend-free; swap for Supabase later.
// ---------------------------------------------------------------------------

const STORAGE_KEY = "waqiah-admin-demo-v1";
const AUTH_KEY = "waqiah-admin-auth-v1";

type PersistedState = {
  packages: TravelPackage[];
  flights: Flight[];
  inquiries: Inquiry[];
  visaApps: VisaApplication[];
  bookings: Booking[];
  chatThreads: ChatThread[];
  users: AdminUser[];
  cms: CMSContent;
  settings: AdminSettings;
};

function seedState(): PersistedState {
  // Deep-clone the seed so mutations never touch the imported module data.
  return structuredClone({
    packages: PACKAGES,
    flights: SAMPLE_FLIGHTS,
    inquiries: SEED_INQUIRIES,
    visaApps: SEED_VISA_APPS,
    bookings: SEED_BOOKINGS,
    chatThreads: SEED_CHAT_THREADS,
    users: SEED_ADMIN_USERS,
    cms: SEED_CMS,
    settings: SEED_SETTINGS,
  });
}

function loadState(): PersistedState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return { ...seedState(), ...(JSON.parse(raw) as PersistedState) };
  } catch {
    /* fall through to fresh seed */
  }
  return seedState();
}

export type Toast = { id: number; message: string; tone: "success" | "info" | "danger" };

type AdminContextValue = PersistedState & {
  // auth
  isAuthed: boolean;
  signIn: () => void;
  signOut: () => void;
  // packages
  savePackage: (pkg: TravelPackage) => void;
  deletePackage: (id: string) => void;
  toggleFeatured: (id: string) => void;
  // flights
  saveFlight: (flight: Flight) => void;
  deleteFlight: (id: string) => void;
  // inquiries
  setInquiryStatus: (id: string, status: InquiryStatus) => void;
  addInquiryNote: (id: string, note: string) => void;
  // visa
  setVisaStatus: (id: string, status: VisaStatus) => void;
  // bookings
  setBookingStatus: (id: string, status: BookingStatus) => void;
  // chat
  convertChatToInquiry: (id: string) => void;
  // cms + settings
  saveCMS: (cms: CMSContent) => void;
  saveSettings: (settings: AdminSettings) => void;
  // demo utility
  resetDemo: () => void;
  // toasts
  toasts: Toast[];
  showToast: (message: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: number) => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(() => loadState());
  const [isAuthed, setIsAuthed] = useState<boolean>(
    () => sessionStorage.getItem(AUTH_KEY) === "1"
  );
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  // Persist on every change.
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const showToast = (message: string, tone: Toast["tone"] = "success") => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };
  const dismissToast = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));

  const patch = (p: Partial<PersistedState>) => setState((s) => ({ ...s, ...p }));

  const value: AdminContextValue = useMemo(() => {
    return {
      ...state,
      isAuthed,
      signIn: () => {
        sessionStorage.setItem(AUTH_KEY, "1");
        setIsAuthed(true);
      },
      signOut: () => {
        sessionStorage.removeItem(AUTH_KEY);
        setIsAuthed(false);
      },

      savePackage: (pkg) =>
        setState((s) => {
          const exists = s.packages.some((p) => p.id === pkg.id);
          const packages = exists
            ? s.packages.map((p) => (p.id === pkg.id ? pkg : p))
            : [pkg, ...s.packages];
          return { ...s, packages };
        }),
      deletePackage: (id) =>
        setState((s) => ({ ...s, packages: s.packages.filter((p) => p.id !== id) })),
      toggleFeatured: (id) =>
        setState((s) => ({
          ...s,
          packages: s.packages.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)),
        })),

      saveFlight: (flight) =>
        setState((s) => {
          const exists = s.flights.some((f) => f.id === flight.id);
          const flights = exists
            ? s.flights.map((f) => (f.id === flight.id ? flight : f))
            : [flight, ...s.flights];
          return { ...s, flights };
        }),
      deleteFlight: (id) =>
        setState((s) => ({ ...s, flights: s.flights.filter((f) => f.id !== id) })),

      setInquiryStatus: (id, status) =>
        setState((s) => ({
          ...s,
          inquiries: s.inquiries.map((i) => (i.id === id ? { ...i, status } : i)),
        })),
      addInquiryNote: (id, note) =>
        setState((s) => ({
          ...s,
          inquiries: s.inquiries.map((i) =>
            i.id === id ? { ...i, notes: [...i.notes, note] } : i
          ),
        })),

      setVisaStatus: (id, status) =>
        setState((s) => ({
          ...s,
          visaApps: s.visaApps.map((v) => (v.id === id ? { ...v, status } : v)),
        })),

      setBookingStatus: (id, status) =>
        setState((s) => ({
          ...s,
          bookings: s.bookings.map((b) => (b.id === id ? { ...b, status } : b)),
        })),

      convertChatToInquiry: (id) =>
        setState((s) => {
          const thread = s.chatThreads.find((c) => c.id === id);
          if (!thread || thread.converted) return s;
          const firstUser = thread.messages.find((m) => m.role === "user");
          const newInquiry: Inquiry = {
            id: `inq-${Math.floor(1000 + Math.random() * 9000)}`,
            name: thread.visitor,
            email: "chat-visitor@website.lead",
            phone: "—",
            service: "General",
            subject: `From chat · ${thread.topic}`,
            message: firstUser?.text ?? "Converted from website chat.",
            status: "New",
            createdAt: new Date().toISOString(),
            notes: ["Auto-created from AI chat transcript."],
          };
          return {
            ...s,
            inquiries: [newInquiry, ...s.inquiries],
            chatThreads: s.chatThreads.map((c) => (c.id === id ? { ...c, converted: true } : c)),
          };
        }),

      saveCMS: (cms) => patch({ cms }),
      saveSettings: (settings) => patch({ settings }),

      resetDemo: () => {
        sessionStorage.removeItem(STORAGE_KEY);
        setState(seedState());
      },

      toasts,
      showToast,
      dismissToast,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, isAuthed, toasts]);

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within <AdminProvider>");
  return ctx;
}
