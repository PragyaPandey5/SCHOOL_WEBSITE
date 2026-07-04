import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Holy Faith School, Champawat" },
      { name: "description", content: "Founded in 2018 by Mrs. Jyoti Pandey, Holy Faith School has grown into a centre of excellence for K–8 education in Madli, Champawat." },
      { property: "og:title", content: "About Holy Faith School" },
      { property: "og:description", content: "Our story, vision and the people behind Holy Faith School." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <PageHero
        eyebrow="About us"
        title="A small school with a big vision for every child."
        subtitle="From 20 students in a modest building in 2018, to a thriving school community today — our story is the story of Champawat's children."
      />

      <section className="container-page grid gap-12 py-20 md:grid-cols-12">
        <div className="prose prose-neutral max-w-none space-y-6 leading-relaxed text-foreground md:col-span-7">
          <h2 className="font-serif text-3xl font-semibold">Our Story</h2>
          <p className="text-muted-foreground">
            Our school was established in 2018 by <strong className="text-foreground">Mrs. Jyoti Pandey</strong> with the vision of providing quality education and shaping responsible citizens. It began with only 20 students and 5 teachers in a modest building.
          </p>
          <p className="text-muted-foreground">
            Over the years, the school has grown steadily, adding modern classrooms, laboratories, a library, and sports facilities. Students have excelled in academics, sports and cultural activities, bringing pride to the institution.
          </p>
          <p className="text-muted-foreground">
            Today, our school stands as a centre of excellence, dedicated to nurturing young minds and preparing them for future challenges. We continue to strive toward innovation and holistic development for every student.
          </p>

          <h2 className="mt-12 font-serif text-3xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            To provide an education that strengthens academic ability, builds strong moral character, and nurtures curiosity, creativity and confidence — so that every Holy Faith student grows into a kind, capable and responsible citizen.
          </p>
        </div>

        <aside className="md:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <div className="flex aspect-square w-full items-center justify-center border-b border-dashed border-border bg-surface-2 text-center">
              <div className="px-6 text-muted-foreground">
                <div className="mx-auto mb-3 grid size-16 place-items-center rounded-full bg-primary/10 font-serif text-lg font-semibold text-primary">JP</div>
                <p className="font-serif text-base text-foreground">Manager's photo</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em]">Coming soon</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Manager's Desk
              </p>
              <h3 className="mt-2 font-serif text-xl font-semibold">Mrs. Jyoti Pandey</h3>
              <p className="text-sm text-muted-foreground">Founder & Head Mistress</p>
              <blockquote className="mt-4 border-l-2 border-primary/40 pl-4 font-serif italic leading-relaxed text-foreground/90">
                “Welcome to Holy Faith School. It’s a great pleasure as the
                head master of this wonderful school, to introduce you to all
                it has to offer.”
              </blockquote>
            </div>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}
