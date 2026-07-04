import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";


export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Activities — Cultural, Literary, Sports & Arts | Holy Faith School" },
      { name: "description", content: "Cultural events, literary activities, sports and creative arts at Holy Faith School, Champawat — building confident, well-rounded students." },
      { property: "og:title", content: "Activities at Holy Faith School" },
      { property: "og:description", content: "Cultural, literary, sports and arts programmes that bring our classrooms to life." },
    ],
  }),
  component: ActivitiesPage,
});

const cultural_events = [
  "Annual Day Celebrations — grand performances including dance, drama and music",
  "Festival Celebrations — special assemblies and activities for national and cultural festivals",
  "Talent Shows — a platform for students to display unique skills and talents",
  "Inter-House Competitions — friendly contests that promote teamwork and healthy competition",
  "Art & Craft Exhibitions — displays of students' creativity and imagination",
];

const literary_events = [
  "Project Making — research-based and creative projects that enhance understanding and presentation",
  "Creative Writing — story writing, poetry, article writing and imaginative compositions",
  "Public Speaking — speeches, debates, declamations and storytelling sessions",
  "Innovative Idea Planning — designing new concepts, models or solutions to real-life problems",
  "Quiz & Language Games — fun competitions that build vocabulary and quick thinking",
  "Group Discussions — interactive sessions that promote confidence, listening and teamwork",
];

const pillars = [
  { title: "Games & Sports", body: "Football, kabaddi, athletics, yoga and inter-house tournaments." },
  { title: "Arts & Creativity", body: "Drawing, painting, craft and music — explored both in class and at exhibitions." },
  { title: "Cultural Events", body: "Annual Day, festival celebrations and traditional performances." },
  { title: "Literary Activities", body: "Debates, quizzes, creative writing and project work." },
];

function ActivitiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Beyond the classroom"
        title="Activities that bring out the best in every child."
        subtitle="Cultural events, literary programmes, sports and creative arts are an integral part of school life at Holy Faith — helping students develop confidence, creativity and teamwork."
      />

      <section className="container-page py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="font-serif text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-2 py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="flex aspect-[4/3] w-full items-center justify-center border-b border-dashed border-border bg-surface-2 text-center">
                <div className="px-6 text-muted-foreground">
                  <p className="font-serif text-lg text-foreground">Cultural event photo</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em]">Coming soon</p>
                </div>
              </div>
            </figure>
          </div>
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Cultural events</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">Celebrating talent, tradition and togetherness.</h2>
            <p className="mt-4 max-w-[60ch] text-muted-foreground">
              Throughout the academic year, students actively participate in a
              variety of vibrant cultural programmes that celebrate diversity,
              traditions and artistic expression.
            </p>
            <ul className="mt-6 space-y-3">
              {cultural_events.map((e) => (
                <li key={e} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                  <span className="mt-1 inline-block size-1.5 shrink-0 rounded-full bg-primary" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Literary activities</p>
        <h2 className="mt-3 max-w-[28ch] font-serif text-3xl font-semibold md:text-4xl">Creativity, critical thinking and confident expression.</h2>
        <p className="mt-4 max-w-[60ch] text-muted-foreground">
          Our literary programme is designed to develop creativity, critical
          thinking, communication skills and innovative ideas — helping
          students think beyond textbooks.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {literary_events.map((e) => (
            <div key={e} className="rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-foreground/90">
              {e}
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
