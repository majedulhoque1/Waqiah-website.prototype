import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("section-pad", className)}>
      <div className="container-px">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-label-sm font-semibold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[1.75rem] font-bold leading-tight sm:text-headline-lg">{title}</h2>
      {body && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{body}</p>}
    </div>
  );
}
