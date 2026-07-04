import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { GalleryCarousel } from "@/components/GalleryCarousel";

export const Route = createFileRoute("/infrastructure")({
  head: () => ({
    meta: [
      { title: "Infrastructure & Facilities — Holy Faith School, Champawat" },
      { name: "description", content: "Science lab, playground, safe transport, clean drinking water, modern sanitation and full CCTV surveillance at Holy Faith School, Champawat." },
      { property: "og:title", content: "Infrastructure & Facilities — Holy Faith School" },
      { property: "og:description", content: "A safe, well-equipped, student-friendly campus in the hills of Champawat." },
    ],
  }),
  component: InfrastructurePage,
});

const facilities = [
  { icon: "⚗️", title: "Well-Equipped Science Laboratory", body: "Practical learning and experimental work under expert supervision. Hands-on experience strengthens conceptual understanding and analytical skills." },
  { icon: "⚽", title: "Sports & Playground", body: "A spacious playground that supports various outdoor sports and physical activities. We promote fitness, discipline and teamwork alongside academics." },
  { icon: "🚌", title: "Safe & Reliable Transport", body: "Organised and secure transport covering major areas of the city. Student safety and punctuality remain our highest priorities." },
  { icon: "💧", title: "Safe Drinking Water", body: "Clean, purified drinking water is available across the campus to maintain hygiene and student well-being." },
  { icon: "🚻", title: "Hygienic Sanitation", body: "Separate, well-maintained washrooms for boys and girls ensure privacy, hygiene and comfort throughout the school day." },
  { icon: "📷", title: "Campus Safety & CCTV", body: "The entire campus is monitored through CCTV surveillance to ensure a secure and disciplined environment for learning." },
];

function InfrastructurePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Infrastructure & facilities"
        title="A safe, well-equipped campus built around the student."
        subtitle="At Holy Faith School, Champawat, we are committed to providing a safe, well-equipped and student-friendly campus that supports academic excellence and overall development."
      />

      <section className="container-page py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => (
            <div key={f.title} className="rounded-[1.5rem] border border-border/70 bg-white/80 p-7 shadow-[0_16px_46px_-24px_rgba(15,23,42,0.25)] backdrop-blur transition hover:-translate-y-1">
              <div className="grid size-12 place-items-center rounded-xl bg-primary/10 text-2xl">{f.icon}</div>
              <h3 className="mt-5 font-serif text-xl font-semibold">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-6 pb-20 lg:grid-cols-[1.1fr_0.9fr]">
        <GalleryCarousel />
        <div className="rounded-[1.75rem] border border-border/70 bg-gradient-to-br from-slate-950 to-slate-800 p-8 text-white shadow-[0_24px_80px_-30px_rgba(15,23,42,0.8)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300">Why families love it</p>
          <h3 className="mt-3 font-serif text-2xl font-semibold">A campus that blends academic rigor with warmth and safety.</h3>
          <p className="mt-4 text-sm leading-relaxed text-white/70">From science learning spaces to safe outdoor areas, every corner of the campus supports growth, focus and confidence.</p>
          <div className="mt-8 space-y-3 text-sm text-white/80">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3">Safe transport and monitored campus access</div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3">Modern facilities for academics, sports and arts</div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-3">Well-kept spaces for joyful, student-centered learning</div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
