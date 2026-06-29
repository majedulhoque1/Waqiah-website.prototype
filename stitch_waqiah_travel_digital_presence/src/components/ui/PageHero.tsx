import type { ReactNode } from "react";
import Chip from "./Chip";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-outline-variant/50 bg-navy pb-16 pt-28 lg:pb-20 lg:pt-36">
      <div className="absolute -right-24 top-0 h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
      <div className="container-px relative">
        <div className="max-w-3xl animate-fade-up">
          <Chip tone="brand" className="bg-white/10 text-white">
            {eyebrow}
          </Chip>
          <h1 className="mt-5 text-[2.2rem] font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{subtitle}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
