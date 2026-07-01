import { useState } from "react";
import { Mail, Phone, MessageSquarePlus } from "lucide-react";
import { useAdmin } from "../../admin/store";
import type { Inquiry, InquiryStatus } from "../../data/admin/seed";
import { cn } from "../../lib/utils";
import { Card, PageHeader, StatusBadge, Drawer, Field, fieldClass, formatDateTime } from "../../components/admin/ui";

const STATUSES: (InquiryStatus | "All")[] = ["All", "New", "In Progress", "Closed"];

export default function Inquiries() {
  const { inquiries, setInquiryStatus, addInquiryNote, showToast } = useAdmin();
  const [filter, setFilter] = useState<InquiryStatus | "All">("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const filtered = inquiries
    .filter((i) => filter === "All" || i.status === filter)
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  const active = inquiries.find((i) => i.id === openId) ?? null;

  const counts = {
    All: inquiries.length,
    New: inquiries.filter((i) => i.status === "New").length,
    "In Progress": inquiries.filter((i) => i.status === "In Progress").length,
    Closed: inquiries.filter((i) => i.status === "Closed").length,
  };

  return (
    <div>
      <PageHeader title="Inquiries" subtitle="Contact form submissions and website leads." />

      <div className="mb-5 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
              filter === s
                ? "bg-navy text-white"
                : "bg-white text-navy ring-1 ring-inset ring-outline-variant/60 hover:bg-surface-container"
            )}
          >
            {s}
            <span
              className={cn(
                "rounded-full px-1.5 text-xs",
                filter === s ? "bg-white/20" : "bg-surface-high text-muted"
              )}
            >
              {counts[s]}
            </span>
          </button>
        ))}
      </div>

      <Card>
        <ul className="divide-y divide-outline-variant/30">
          {filtered.map((i) => (
            <li key={i.id}>
              <button
                onClick={() => {
                  setOpenId(i.id);
                  setNote("");
                }}
                className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-surface-container/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-tint text-sm font-bold text-navy">
                  {i.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-ink">{i.name}</p>
                    <span className="rounded bg-surface-high px-1.5 py-0.5 text-[11px] font-semibold text-muted">
                      {i.service}
                    </span>
                  </div>
                  <p className="truncate text-sm text-muted">{i.subject}</p>
                </div>
                <div className="hidden shrink-0 text-right text-xs text-muted sm:block">
                  {formatDateTime(i.createdAt)}
                </div>
                <StatusBadge status={i.status} />
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-5 py-12 text-center text-muted">No inquiries in this view.</li>
          )}
        </ul>
      </Card>

      <Drawer
        open={!!active}
        onClose={() => setOpenId(null)}
        title="Inquiry details"
        footer={
          active && (
            <div className="flex gap-2">
              {(["New", "In Progress", "Closed"] as InquiryStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInquiryStatus(active.id, s);
                    showToast(`Marked as ${s}`);
                  }}
                  className={cn(
                    "flex-1 rounded-md px-2 py-2.5 text-xs font-bold transition-colors",
                    active.status === s
                      ? "bg-navy text-white"
                      : "bg-surface-container text-navy hover:bg-surface-high"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          )
        }
      >
        {active && <InquiryDetail inquiry={active} note={note} setNote={setNote} onAddNote={(n) => { addInquiryNote(active.id, n); showToast("Note added"); }} />}
      </Drawer>
    </div>
  );
}

function InquiryDetail({
  inquiry,
  note,
  setNote,
  onAddNote,
}: {
  inquiry: Inquiry;
  note: string;
  setNote: (v: string) => void;
  onAddNote: (n: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-base font-bold text-white">
          {inquiry.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
        </span>
        <div>
          <p className="font-display text-lg font-bold text-navy">{inquiry.name}</p>
          <StatusBadge status={inquiry.status} />
        </div>
      </div>

      <div className="space-y-2 rounded-lg bg-surface-container/50 p-4 text-sm">
        <a href={`mailto:${inquiry.email}`} className="flex items-center gap-2 text-navy hover:text-primary">
          <Mail className="h-4 w-4 text-muted" /> {inquiry.email}
        </a>
        <a href={`tel:${inquiry.phone}`} className="flex items-center gap-2 text-navy hover:text-primary">
          <Phone className="h-4 w-4 text-muted" /> {inquiry.phone}
        </a>
        <p className="flex items-center gap-2 text-muted">
          <span className="rounded bg-white px-1.5 py-0.5 text-[11px] font-semibold text-navy">{inquiry.service}</span>
          {formatDateTime(inquiry.createdAt)}
        </p>
      </div>

      <div>
        <p className="mb-1.5 text-sm font-semibold text-navy">{inquiry.subject}</p>
        <p className="rounded-lg border border-outline-variant/50 bg-white p-4 text-sm leading-relaxed text-ink">
          {inquiry.message}
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-navy">Internal notes</p>
        {inquiry.notes.length > 0 ? (
          <ul className="mb-3 space-y-2">
            {inquiry.notes.map((n, idx) => (
              <li key={idx} className="rounded-md bg-primary-50 px-3 py-2 text-sm text-ink">
                {n}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-3 text-sm text-muted">No notes yet.</p>
        )}
        <Field label="Add a note">
          <textarea
            className={cn(fieldClass, "min-h-[72px] py-2.5")}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Log a call, next step, or quote sent…"
          />
        </Field>
        <button
          disabled={!note.trim()}
          onClick={() => {
            onAddNote(note.trim());
            setNote("");
          }}
          className="mt-2 inline-flex min-h-[40px] items-center gap-2 rounded-md bg-navy px-4 text-sm font-bold text-white transition hover:bg-navy-dark disabled:opacity-50"
        >
          <MessageSquarePlus className="h-4 w-4" /> Add note
        </button>
      </div>
    </div>
  );
}
