import { useState } from "react";
import { Save, Shield, UserCog } from "lucide-react";
import { useAdmin } from "../../admin/store";
import type { AdminSettings } from "../../data/admin/seed";
import { Card, PageHeader, Field, fieldClass, Toggle, StatusBadge, formatDateTime } from "../../components/admin/ui";

export default function Settings() {
  const { settings, saveSettings, users, showToast } = useAdmin();
  const [form, setForm] = useState<AdminSettings>(settings);
  const set = <K extends keyof AdminSettings>(k: K, v: AdminSettings[K]) => setForm((f) => ({ ...f, [k]: v }));
  const dirty = JSON.stringify(form) !== JSON.stringify(settings);

  const roleTone: Record<string, "success" | "progress" | "neutral"> = {
    Owner: "success",
    Admin: "progress",
    Agent: "neutral",
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Business profile, notifications, and admin access."
        action={
          <button
            disabled={!dirty}
            onClick={() => {
              saveSettings(form);
              showToast("Settings saved");
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-white shadow-soft transition hover:bg-primary-dark disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> Save
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Business profile */}
        <Card className="p-6">
          <h3 className="mb-4 font-display font-bold text-navy">Business profile</h3>
          <div className="space-y-4">
            <Field label="Business name">
              <input className={fieldClass} value={form.businessName} onChange={(e) => set("businessName", e.target.value)} />
            </Field>
            <Field label="Timezone">
              <select className={fieldClass} value={form.timezone} onChange={(e) => set("timezone", e.target.value)}>
                <option>America/New_York (EST)</option>
                <option>America/Chicago (CST)</option>
                <option>America/Los_Angeles (PST)</option>
                <option>Asia/Riyadh (AST)</option>
              </select>
            </Field>
            <Field label="Currency">
              <select className={fieldClass} value={form.currency} onChange={(e) => set("currency", e.target.value)}>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>SAR (﷼)</option>
              </select>
            </Field>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <h3 className="mb-4 font-display font-bold text-navy">Notifications</h3>
          <div className="divide-y divide-outline-variant/40">
            <ToggleRow
              title="New inquiry alerts"
              desc="Email the team when a website inquiry arrives."
              checked={form.notifyNewInquiry}
              onChange={(v) => set("notifyNewInquiry", v)}
            />
            <ToggleRow
              title="New booking alerts"
              desc="Notify on every new booking or deposit."
              checked={form.notifyNewBooking}
              onChange={(v) => set("notifyNewBooking", v)}
            />
            <ToggleRow
              title="Chatbot auto-reply"
              desc="Let the website assistant answer common questions 24/7."
              checked={form.autoReplyEnabled}
              onChange={(v) => set("autoReplyEnabled", v)}
            />
            <ToggleRow
              title="Maintenance mode"
              desc="Temporarily show a maintenance notice on the public site."
              checked={form.maintenanceMode}
              onChange={(v) => set("maintenanceMode", v)}
            />
          </div>
        </Card>

        {/* Admin users */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-outline-variant/40 px-6 py-4">
            <div className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-primary" />
              <h3 className="font-display font-bold text-navy">Admin users</h3>
            </div>
            <button
              onClick={() => showToast("Invite flow — demo only", "info")}
              className="rounded-md border border-outline-variant/70 bg-white px-3 py-2 text-sm font-bold text-navy transition hover:bg-surface-container"
            >
              Invite user
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="border-b border-outline-variant/40 text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-6 py-3 font-semibold">Name</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Role</th>
                  <th className="px-6 py-3 font-semibold">Last active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-surface-container/40">
                    <td className="px-6 py-3">
                      <span className="inline-flex items-center gap-2 font-semibold text-ink">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-navy-tint text-xs font-bold text-navy">
                          {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </span>
                        {u.name}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-muted">{u.email}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={u.role} tone={roleTone[u.role]} />
                    </td>
                    <td className="px-6 py-3 text-muted">{formatDateTime(u.lastActive)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-lg border border-outline-variant/50 bg-surface-container/40 px-5 py-4 text-sm text-muted">
        <Shield className="h-5 w-5 shrink-0 text-navy" />
        This is a demo console. Authentication, roles, and data persistence are wired to a real backend
        (Supabase) in the production build.
      </div>
    </div>
  );
}

function ToggleRow({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="text-xs text-muted">{desc}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}
