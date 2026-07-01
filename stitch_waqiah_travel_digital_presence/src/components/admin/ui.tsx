import { useEffect, type ReactNode } from "react";
import { X, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { cn } from "../../lib/utils";
import { useAdmin } from "../../admin/store";

// ---------------------------------------------------------------------------
// Shared admin UI primitives. Kept in one file so the pages read cleanly and
// the visual language (from tailwind.config.js) stays consistent everywhere.
// ---------------------------------------------------------------------------

/** Relative-ish date label, e.g. "Today · 8:15 AM" or "Jun 24, 2:05 PM". */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const sameDay = d.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (sameDay) return `Today · ${time}`;
  if (d.toDateString() === yesterday.toDateString()) return `Yesterday · ${time}`;
  return `${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · ${time}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// --- Status badge -----------------------------------------------------------

type Tone = "new" | "progress" | "closed" | "success" | "warning" | "danger" | "neutral";

const toneStyles: Record<Tone, string> = {
  new: "bg-primary-50 text-primary-deep ring-primary-soft/60",
  progress: "bg-navy-tint text-navy-dark ring-navy-soft/60",
  closed: "bg-surface-high text-muted ring-outline-variant/60",
  success: "bg-success/10 text-success ring-success/25",
  warning: "bg-warning/10 text-warning ring-warning/25",
  danger: "bg-danger/10 text-danger ring-danger/25",
  neutral: "bg-surface-high text-ink ring-outline-variant/60",
};

const statusToTone: Record<string, Tone> = {
  New: "new",
  "In Progress": "progress",
  Closed: "closed",
  Received: "new",
  Processing: "progress",
  Approved: "success",
  Rejected: "danger",
  Pending: "warning",
  Confirmed: "success",
  Cancelled: "danger",
};

export function StatusBadge({ status, tone }: { status: string; tone?: Tone }) {
  const resolved = tone ?? statusToTone[status] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        toneStyles[resolved]
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

// --- Stat card --------------------------------------------------------------

export function StatCard({
  label,
  value,
  delta,
  deltaTone = "success",
  icon,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "success" | "danger" | "neutral";
  icon: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-outline-variant/50 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted">{label}</p>
        <span className="grid h-9 w-9 place-items-center rounded-md bg-navy-tint text-navy">{icon}</span>
      </div>
      <p className="mt-3 font-display text-2xl font-bold text-navy">{value}</p>
      {delta && (
        <p
          className={cn(
            "mt-1 text-xs font-semibold",
            deltaTone === "success" && "text-success",
            deltaTone === "danger" && "text-danger",
            deltaTone === "neutral" && "text-muted"
          )}
        >
          {delta}
        </p>
      )}
    </div>
  );
}

// --- Page header ------------------------------------------------------------

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// --- Card wrapper -----------------------------------------------------------

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-lg border border-outline-variant/50 bg-white shadow-soft", className)}>
      {children}
    </div>
  );
}

// --- Modal (centered) -------------------------------------------------------

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-ink/40 animate-fade-in" onClick={onClose} />
      <div
        className={cn(
          "relative w-full animate-scale-in rounded-xl bg-white shadow-lift",
          wide ? "max-w-2xl" : "max-w-lg"
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-outline-variant/50 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-navy">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-md text-muted hover:bg-surface-container hover:text-navy"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 border-t border-outline-variant/50 px-6 py-4">{footer}</div>
        )}
      </div>
    </div>
  );
}

// --- Drawer (right slide-over) ---------------------------------------------

export function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40 animate-fade-in" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-lift animate-fade-in">
        <div className="flex items-center justify-between border-b border-outline-variant/50 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-navy">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-md text-muted hover:bg-surface-container hover:text-navy"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && (
          <div className="border-t border-outline-variant/50 px-6 py-4">{footer}</div>
        )}
      </div>
    </div>
  );
}

// --- Form field helpers -----------------------------------------------------

export const fieldClass =
  "min-h-[44px] w-full rounded-md border border-outline-variant/70 bg-surface-container/40 px-3.5 text-[15px] " +
  "text-ink outline-none transition focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/15";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

// --- Toggle switch ----------------------------------------------------------

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-outline-variant"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

// --- Toast host -------------------------------------------------------------

const toastIcon = {
  success: <CheckCircle2 className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
  danger: <AlertTriangle className="h-5 w-5" />,
};

export function ToastHost() {
  const { toasts, dismissToast } = useAdmin();
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[60] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto flex items-center gap-3 rounded-lg bg-navy px-4 py-3 text-sm font-medium text-white shadow-lift animate-fade-up",
            t.tone === "danger" && "bg-danger",
            t.tone === "info" && "bg-navy-light"
          )}
        >
          <span className="text-white/90">{toastIcon[t.tone]}</span>
          {t.message}
          <button onClick={() => dismissToast(t.id)} aria-label="Dismiss" className="ml-1 opacity-70 hover:opacity-100">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
