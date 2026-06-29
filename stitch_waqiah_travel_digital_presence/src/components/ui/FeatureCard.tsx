import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

export default function FeatureCard({
  icon: Icon,
  title,
  body,
  highlighted = false,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl p-7 transition-all duration-300",
        highlighted
          ? "bg-navy text-white shadow-lift"
          : "border border-outline-variant/60 bg-surface-container hover:-translate-y-1 hover:shadow-soft"
      )}
    >
      <span
        className={cn(
          "mb-5 grid h-12 w-12 place-items-center rounded-md",
          highlighted ? "bg-white/15 text-white" : "bg-primary-soft/40 text-primary"
        )}
      >
        <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className={cn("text-title-md font-semibold", highlighted ? "text-white" : "text-navy")}>
        {title}
      </h3>
      <p className={cn("mt-2 text-[15px] leading-relaxed", highlighted ? "text-white/80" : "text-muted")}>
        {body}
      </p>
    </div>
  );
}
