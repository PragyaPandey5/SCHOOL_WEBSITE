import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/academics")({
  head: () => ({
    meta: [
      { title: "Academics — Holy Faith School, Champawat" },
      { name: "description", content: "Academics at Holy Faith School: a structured K–8 curriculum balancing core subjects, languages, science, arts and life skills." },
      { property: "og:title", content: "Academics — Holy Faith School" },
      { property: "og:description", content: "Our K–8 curriculum, classroom approach and learning philosophy." },
    ],
  }),
  component: AcademicsPage,
});

const stages = [
  {
    name: "Pre-Primary",
    grades: "Nursery · LKG · UKG",
    body: "A warm, play-based foundation that introduces letters, numbers, rhymes, motor skills and early social learning.",
  },
  {
    name: "Primary",
    grades: "Classes I – V",
    body: "Core literacy and numeracy, environmental studies, language fluency (English & Hindi), and the beginnings of art, music and physical education.",
  },
  {
    name: "Upper Primary",
    grades: "Classes VI – VIII",
    body: "Structured study of Mathematics, Science, Social Studies, English, Hindi, Sanskrit and Computer Basics — with regular projects, lab work and assessments.",
  },
];

const subjects = ["English", "Hindi", "Mathematics", "Science", "Social Studies", "Sanskrit", "Computer", "Art & Craft", "Physical Education", "General Knowledge", "Moral Science", "Music"];

function AcademicsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="Academics"
        title="A structured K–8 journey from first letters to confident learners."
        subtitle="Our curriculum balances strong fundamentals with curiosity, creativity and character — so that every child leaves Class VIII well-prepared for the years ahead."
      />

      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {stages.map((s) => (
            <div key={s.name} className="rounded-2xl border border-border bg-surface p-7 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">{s.grades}</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold">{s.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-2 py-20">
        <div className="container-page grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Subjects</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">
              Subjects we teach.
            </h2>
            <p className="mt-4 max-w-[48ch] text-muted-foreground">
              From the early years onward, our students engage with a broad
              spectrum of subjects designed for balanced intellectual,
              physical and creative development.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {subjects.map((s) => (
              <li
                key={s}
                className="rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="rounded-2xl border border-border bg-surface p-10 shadow-sm">
          <h2 className="font-serif text-3xl font-semibold">Our Approach</h2>
          <div className="mt-6 grid gap-8 text-muted-foreground md:grid-cols-2">
            <p>
              We believe children learn best when they feel safe, respected
              and curious. Our classrooms emphasise small-group attention,
              regular practice, and frequent encouragement.
            </p>
            <p>
              Continuous assessment — through classwork, projects, oral
              questions and term examinations — helps us understand each
              child's progress and support them where needed.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
