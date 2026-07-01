import { useState } from "react";
import { Save, RotateCcw, Eye } from "lucide-react";
import { useAdmin } from "../../admin/store";
import type { CMSContent } from "../../data/admin/seed";
import { cn } from "../../lib/utils";
import { Card, PageHeader, Field, fieldClass } from "../../components/admin/ui";

export default function CMS() {
  const { cms, saveCMS, showToast } = useAdmin();
  const [form, setForm] = useState<CMSContent>(cms);
  const set = <K extends keyof CMSContent>(k: K, v: CMSContent[K]) => setForm((f) => ({ ...f, [k]: v }));
  const dirty = JSON.stringify(form) !== JSON.stringify(cms);

  return (
    <div>
      <PageHeader
        title="Website Content"
        subtitle="Edit the copy and contact details shown across the public site."
        action={
          <div className="flex gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-outline-variant/70 bg-white px-4 text-sm font-bold text-navy transition hover:bg-surface-container"
            >
              <Eye className="h-4 w-4" /> View site
            </a>
            <button
              disabled={!dirty}
              onClick={() => {
                saveCMS(form);
                showToast("Website content saved");
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-white shadow-soft transition hover:bg-primary-dark disabled:opacity-50"
            >
              <Save className="h-4 w-4" /> Save changes
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-bold text-navy">Homepage hero</h3>
            <span className="rounded bg-surface-high px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
              Home
            </span>
          </div>
          <div className="space-y-4">
            <Field label="Hero title">
              <input className={fieldClass} value={form.heroTitle} onChange={(e) => set("heroTitle", e.target.value)} />
            </Field>
            <Field label="Hero subtitle">
              <textarea
                className={cn(fieldClass, "min-h-[88px] py-2.5")}
                value={form.heroSubtitle}
                onChange={(e) => set("heroSubtitle", e.target.value)}
              />
            </Field>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-bold text-navy">About section</h3>
            <span className="rounded bg-surface-high px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
              About
            </span>
          </div>
          <div className="space-y-4">
            <Field label="Headline">
              <input className={fieldClass} value={form.aboutHeadline} onChange={(e) => set("aboutHeadline", e.target.value)} />
            </Field>
            <Field label="Body">
              <textarea
                className={cn(fieldClass, "min-h-[88px] py-2.5")}
                value={form.aboutBody}
                onChange={(e) => set("aboutBody", e.target.value)}
              />
            </Field>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display font-bold text-navy">Contact details</h3>
            <span className="rounded bg-surface-high px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
              Footer &amp; Contact
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Primary phone">
              <input className={fieldClass} value={form.phone1} onChange={(e) => set("phone1", e.target.value)} />
            </Field>
            <Field label="Secondary phone">
              <input className={fieldClass} value={form.phone2} onChange={(e) => set("phone2", e.target.value)} />
            </Field>
            <Field label="Email">
              <input className={fieldClass} value={form.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label="Business hours">
              <input className={fieldClass} value={form.hours} onChange={(e) => set("hours", e.target.value)} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Address">
                <input className={fieldClass} value={form.address} onChange={(e) => set("address", e.target.value)} />
              </Field>
            </div>
          </div>
        </Card>
      </div>

      {dirty && (
        <div className="mt-6 flex items-center justify-between rounded-lg border border-warning/30 bg-warning/10 px-5 py-3 text-sm">
          <span className="font-medium text-ink">You have unsaved changes.</span>
          <button
            onClick={() => setForm(cms)}
            className="inline-flex items-center gap-1.5 font-bold text-navy hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" /> Discard
          </button>
        </div>
      )}
    </div>
  );
}
