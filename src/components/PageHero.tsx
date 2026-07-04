import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-surface-2">
      <div className="container-page py-16 md:py-20">
        {eyebrow && (
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-[22ch] text-balance text-4xl font-semibold text-foreground md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-[58ch] text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
