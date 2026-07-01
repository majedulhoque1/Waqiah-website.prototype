import { Link } from "react-router-dom";
import { DollarSign, Inbox, Package as PackageIcon, StickyNote, ArrowUpRight, TrendingUp } from "lucide-react";
import { useAdmin } from "../../admin/store";
import { formatUSD } from "../../lib/utils";
import { Card, PageHeader, StatCard, StatusBadge, formatDateTime } from "../../components/admin/ui";

// Static 6-month trend for the demo chart (bookings volume).
const TREND = [
  { m: "Jan", v: 18 },
  { m: "Feb", v: 24 },
  { m: "Mar", v: 41 },
  { m: "Apr", v: 33 },
  { m: "May", v: 52 },
  { m: "Jun", v: 47 },
];

export default function Dashboard() {
  const { inquiries, packages, visaApps, bookings } = useAdmin();

  const confirmedRevenue = bookings
    .filter((b) => b.status === "Confirmed")
    .reduce((sum, b) => sum + b.amount, 0);
  const newInquiries = inquiries.filter((i) => i.status === "New").length;
  const pendingVisa = visaApps.filter((v) => v.status === "Received" || v.status === "Processing").length;
  const maxV = Math.max(...TREND.map((t) => t.v));

  const recentInquiries = [...inquiries]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 5);
  const recentBookings = [...bookings]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of Waqiah Travel activity — bookings, inquiries, and visa pipeline."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Confirmed revenue"
          value={formatUSD(confirmedRevenue)}
          delta="+12.4% vs last month"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          label="New inquiries"
          value={String(newInquiries)}
          delta={`${inquiries.length} total open & closed`}
          deltaTone="neutral"
          icon={<Inbox className="h-4 w-4" />}
        />
        <StatCard
          label="Active packages"
          value={String(packages.length)}
          delta={`${packages.filter((p) => p.featured).length} featured`}
          deltaTone="neutral"
          icon={<PackageIcon className="h-4 w-4" />}
        />
        <StatCard
          label="Pending visas"
          value={String(pendingVisa)}
          delta={`${visaApps.length} applications total`}
          deltaTone="neutral"
          icon={<StickyNote className="h-4 w-4" />}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Trend chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-outline-variant/40 px-5 py-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-display font-bold text-navy">Bookings — last 6 months</h3>
            </div>
            <span className="text-xs font-semibold text-success">▲ 47 this month</span>
          </div>
          <div className="flex h-56 items-end justify-between gap-3 px-5 py-6">
            {TREND.map((t) => (
              <div key={t.m} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-end justify-center" style={{ height: "160px" }}>
                  <div
                    className="w-full max-w-[42px] rounded-t-md bg-gradient-to-t from-primary/70 to-primary transition-all hover:from-primary hover:to-primary-dark"
                    style={{ height: `${(t.v / maxV) * 100}%` }}
                    title={`${t.v} bookings`}
                  />
                </div>
                <span className="text-xs font-medium text-muted">{t.m}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent inquiries */}
        <Card>
          <div className="flex items-center justify-between border-b border-outline-variant/40 px-5 py-4">
            <h3 className="font-display font-bold text-navy">Recent inquiries</h3>
            <Link to="/admin/inquiries" className="text-xs font-semibold text-primary hover:text-primary-dark">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-outline-variant/40">
            {recentInquiries.map((i) => (
              <li key={i.id} className="flex items-center gap-3 px-5 py-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy-tint text-sm font-bold text-navy">
                  {i.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{i.name}</p>
                  <p className="truncate text-xs text-muted">{i.subject}</p>
                </div>
                <StatusBadge status={i.status} />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Recent bookings */}
      <Card className="mt-6">
        <div className="flex items-center justify-between border-b border-outline-variant/40 px-5 py-4">
          <h3 className="font-display font-bold text-navy">Recent bookings</h3>
          <Link
            to="/admin/flights"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark"
          >
            Manage <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-outline-variant/40 text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-semibold">Ref</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Item</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 text-right font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {recentBookings.map((b) => (
                <tr key={b.id} className="hover:bg-surface-container/40">
                  <td className="px-5 py-3 font-mono text-xs font-semibold text-navy">{b.ref}</td>
                  <td className="px-5 py-3 font-medium text-ink">{b.customer}</td>
                  <td className="px-5 py-3 text-muted">{b.item}</td>
                  <td className="px-5 py-3 text-muted">{formatDateTime(b.date)}</td>
                  <td className="px-5 py-3 text-right font-semibold text-navy">{formatUSD(b.amount)}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
