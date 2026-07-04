import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { NoticeBoard } from "@/components/NoticeBoard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Holy Faith School, Champawat — Admissions Open 2026–27" },
      { name: "description", content: "Quality education from Nursery to Class VIII in Madli, Champawat, Uttarakhand. Admissions open for the 2026–27 session." },
      { property: "og:title", content: "Holy Faith School, Champawat — Admissions Open 2026–27" },
      { property: "og:description", content: "Quality K–8 education in Champawat, Uttarakhand. Apply now for the 2026–27 session." },
    ],
  }),
  component: HomePage,
});

const highlights = [
  { k: "2018", v: "Established" },
  { k: "Nursery–VIII", v: "Classes Offered" },
  { k: "Qualified", v: "Dedicated Faculty" },
  { k: "Safe", v: "Hill-Town Campus" },
];

const reasons = [
  { title: "Qualified Faculty", body: "A dedicated team of teachers committed to every child's growth and learning journey." },
  { title: "Academic Excellence", body: "A balanced curriculum that strengthens fundamentals from the early years onward." },
  { title: "Safe & Disciplined", body: "A nurturing campus with CCTV-monitored premises and trained support staff." },
  { title: "Moral Values", body: "Strong emphasis on character building, ethics and respectful conduct." },
  { title: "Holistic Growth", body: "Sports, arts, literary and cultural activities woven into school life." },
  { title: "Modern Facilities", body: "Well-maintained classrooms, science lab, library and playground." },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-border/70 bg-[linear-gradient(135deg,_rgba(255,255,255,1)_0%,_rgba(248,244,232,0.95)_100%)]">
        <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              Admissions Open · Session 2026–27
            </span>
            <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-tight text-foreground md:text-6xl">
              Nurturing young minds in the heart of <span className="text-primary">Champawat</span>.
            </h1>
            <p className="mt-6 max-w-[58ch] text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Holy Faith School invites applications for Nursery to Class VIII. Since 2018, we have been committed to quality education in a disciplined, warm and joyful environment — right here in the hills of Uttarakhand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/admissions#enquiry"
                className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_-12px_rgba(146,64,14,0.75)] transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Apply for Admission
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-border bg-white/80 px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-surface-2"
              >
                Discover the school
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border/70 pt-6 md:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.v} className="rounded-2xl border border-border/60 bg-white/70 p-3 shadow-sm">
                  <dt className="font-serif text-2xl font-semibold text-primary">{h.k}</dt>
                  <dd className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{h.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="animate-fade-up lg:justify-self-end">
            <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 p-3 shadow-[0_24px_90px_-32px_rgba(15,23,42,0.45)] backdrop-blur">
              <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1.5rem] border border-border/70 bg-[radial-gradient(circle_at_top_left,_rgba(157,90,44,0.18),_transparent_35%),linear-gradient(160deg,_rgba(255,255,255,1)_0%,_rgba(244,240,228,1)_100%)] text-center">
                <div className="px-6 text-muted-foreground">
                  <div className="mx-auto mb-3 grid size-16 place-items-center rounded-full bg-primary/10 font-serif text-2xl font-semibold text-primary">HF</div>
                  <p className="font-serif text-xl text-foreground">Campus photo</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em]">Showcasing learning spaces</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About + Manager */}
      <section className="container-page grid gap-8 py-20 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">About the school</p>
          <h2 className="mt-3 max-w-[22ch] text-balance text-3xl font-semibold md:text-4xl">
            A school built on faith, founded in the hills of Champawat.
          </h2>
          <div className="mt-6 space-y-5 text-pretty leading-relaxed text-muted-foreground">
            <p>
              Holy Faith School was established in 2018 by Mrs. Jyoti Pandey
              with the vision of providing quality education and shaping
              responsible citizens. We began with just 20 students and 5
              teachers in a modest building.
            </p>
            <p>
              Today, we stand as a growing centre of learning — with modern
              classrooms, a science laboratory, a library, a spacious
              playground and a deeply committed team of educators dedicated
              to the children of Madli and the surrounding villages.
            </p>
          </div>
          <Link to="/about" className="mt-8 inline-flex text-sm font-semibold text-primary hover:underline">
            Read our full story →
          </Link>
        </div>

        <aside className="rounded-[1.75rem] border border-border/70 bg-[linear-gradient(135deg,_rgba(255,255,255,1)_0%,_rgba(248,244,232,0.9)_100%)] p-6 shadow-[0_18px_48px_-24px_rgba(15,23,42,0.45)] md:col-span-5">
          <div className="flex items-center gap-4">
            <div className="grid size-16 shrink-0 place-items-center rounded-full bg-primary/10 font-serif text-lg font-semibold text-primary ring-2 ring-primary/20">
              JP
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-foreground">Mrs. Jyoti Pandey</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary">
                Founder & Head Mistress
              </p>
            </div>
          </div>
          <blockquote className="mt-6 border-l-2 border-primary/40 pl-4 font-serif text-lg italic leading-relaxed text-foreground/90">
            “Welcome to Holy Faith School. It’s a great pleasure as the head
            master of this wonderful school, to introduce you to all it has
            to offer.”
          </blockquote>
        </aside>
      </section>

      <section className="container-page py-8 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <NoticeBoard />
          <div className="rounded-[1.5rem] border border-border/70 bg-gradient-to-br from-primary/10 to-background p-6 shadow-[0_18px_50px_-26px_rgba(15,23,42,0.34)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">School promise</p>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-foreground">A secure, inspiring environment that helps every child learn with confidence.</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Our academic culture is built on discipline, care and joyful learning — preparing students for a bright future.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/infrastructure" className="rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-semibold text-foreground hover:bg-white">View facilities</Link>
              <Link to="/contact" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Visit the campus</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-surface-2 py-20">
        <div className="container-page">
          <div className="mb-12 max-w-[44ch]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Why choose us</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              A balanced foundation for every child.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title} className="bg-surface p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_-22px_rgba(15,23,42,0.4)]">
                <h3 className="font-serif text-xl font-semibold text-foreground">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA strip */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-page flex flex-col items-start gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[48ch]">
            <h2 className="font-serif text-2xl font-semibold md:text-3xl">
              Admissions for 2026–27 are now open.
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Submit the online enquiry form or visit the school office in Madli, Champawat.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admissions"
              className="rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
            >
              Start enquiry
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
            >
              Contact office
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
