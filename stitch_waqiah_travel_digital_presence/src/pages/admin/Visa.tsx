import { useState } from "react";
import { Mail, CalendarDays, BookUser } from "lucide-react";
import { useAdmin } from "../../admin/store";
import type { VisaApplication, VisaStatus } from "../../data/admin/seed";
import { cn } from "../../lib/utils";
import { Card, PageHeader, StatCard, StatusBadge, Drawer, formatDate } from "../../components/admin/ui";
import { StickyNote, Clock, CheckCircle2, XCircle } from "lucide-react";

const FLOW: VisaStatus[] = ["Received", "Processing", "Approved", "Rejected"];

export default function Visa() {
  const { visaApps, setVisaStatus, showToast } = useAdmin();
  const [filter, setFilter] = useState<VisaStatus | "All">("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = visaApps
    .filter((v) => filter === "All" || v.status === filter)
    .sort((a, b) => +new Date(b.submittedAt) - +new Date(a.submittedAt));
  const active = visaApps.find((v) => v.id === openId) ?? null;

  const count = (s: VisaStatus) => visaApps.filter((v) => v.status === s).length;

  return (
    <div>
      <PageHeader title="Visa Applications" subtitle="Track applicant documents and consulate processing status." />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Received" value={String(count("Received"))} deltaTone="neutral" icon={<StickyNote className="h-4 w-4" />} />
        <StatCard label="Processing" value={String(count("Processing"))} deltaTone="neutral" icon={<Clock className="h-4 w-4" />} />
        <StatCard label="Approved" value={String(count("Approved"))} deltaTone="neutral" icon={<CheckCircle2 className="h-4 w-4" />} />
        <StatCard label="Rejected" value={String(count("Rejected"))} deltaTone="neutral" icon={<XCircle className="h-4 w-4" />} />
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {(["All", ...FLOW] as (VisaStatus | "All")[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
              filter === s
                ? "bg-navy text-white"
                : "bg-white text-navy ring-1 ring-inset ring-outline-variant/60 hover:bg-surface-container"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-outline-variant/40 text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-semibold">Applicant</th>
                <th className="px-5 py-3 font-semibold">Destination</th>
                <th className="px-5 py-3 font-semibold">Visa type</th>
                <th className="px-5 py-3 font-semibold">Travel date</th>
                <th className="px-5 py-3 font-semibold">Submitted</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filtered.map((v) => (
                <tr
                  key={v.id}
                  onClick={() => setOpenId(v.id)}
                  className="cursor-pointer hover:bg-surface-container/40"
                >
                  <td className="px-5 py-3">
                    <p className="font-semibold text-ink">{v.applicant}</p>
                    <p className="text-xs text-muted">{v.nationality} · {v.passportNo}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-2 text-ink">
                      <span className="text-lg leading-none">{v.flag}</span> {v.country}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted">{v.visaType}</td>
                  <td className="px-5 py-3 text-muted">{formatDate(v.travelDate)}</td>
                  <td className="px-5 py-3 text-muted">{formatDate(v.submittedAt)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={v.status} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-muted">
                    No applications in this view.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Drawer
        open={!!active}
        onClose={() => setOpenId(null)}
        title="Visa application"
        footer={
          active && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">Update status</p>
              <div className="grid grid-cols-2 gap-2">
                {FLOW.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setVisaStatus(active.id, s);
                      showToast(`Status → ${s}`);
                    }}
                    className={cn(
                      "rounded-md px-2 py-2.5 text-xs font-bold transition-colors",
                      active.status === s ? "bg-navy text-white" : "bg-surface-container text-navy hover:bg-surface-high"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )
        }
      >
        {active && <VisaDetail app={active} />}
      </Drawer>
    </div>
  );
}

function VisaDetail({ app }: { app: VisaApplication }) {
  const rows: [string, string][] = [
    ["Nationality", app.nationality],
    ["Passport no.", app.passportNo],
    ["Visa type", app.visaType],
    ["Travel date", formatDate(app.travelDate)],
    ["Submitted", formatDate(app.submittedAt)],
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-4xl leading-none">{app.flag}</span>
        <div>
          <p className="font-display text-lg font-bold text-navy">{app.applicant}</p>
          <p className="text-sm text-muted">{app.country}</p>
        </div>
        <span className="ml-auto">
          <StatusBadge status={app.status} />
        </span>
      </div>

      <a
        href={`mailto:${app.email}`}
        className="flex items-center gap-2 rounded-lg bg-surface-container/50 px-4 py-3 text-sm text-navy hover:text-primary"
      >
        <Mail className="h-4 w-4 text-muted" /> {app.email}
      </a>

      <dl className="divide-y divide-outline-variant/40 rounded-lg border border-outline-variant/50">
        {rows.map(([k, val]) => (
          <div key={k} className="flex items-center justify-between px-4 py-3 text-sm">
            <dt className="text-muted">{k}</dt>
            <dd className="font-semibold text-ink">{val}</dd>
          </div>
        ))}
      </dl>

      <div className="flex items-center gap-3 rounded-lg border border-dashed border-outline-variant px-4 py-3 text-sm text-muted">
        <BookUser className="h-5 w-5 text-navy" />
        Passport scan &amp; photo on file
      </div>
      <div className="flex items-center gap-2 text-xs text-muted">
        <CalendarDays className="h-4 w-4" /> Consulate SLA tracked automatically once submitted.
      </div>
    </div>
  );
}
