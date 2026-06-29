import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

type ChipTone = "brand" | "navy" | "neutral" | "outline";

const tones: Record<ChipTone, string> = {
  brand: "bg-primary-soft/40 text-primary-deep",
  navy: "bg-navy-tint text-navy",
  neutral: "bg-surface-high text-muted",
  outline: "border border-outline-variant text-muted",
};

export default function Chip({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-sm font-medium uppercase",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
