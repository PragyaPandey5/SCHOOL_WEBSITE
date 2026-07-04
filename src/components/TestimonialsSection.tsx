import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "The school feels calm, well-organized, and deeply caring. My daughter loves the teachers and the welcoming atmosphere.",
    name: "Mrs. Meera Rawat",
    role: "Parent of Grade IV student",
  },
  {
    quote:
      "The campus, discipline and academic support helped my son grow in confidence within just one year.",
    name: "Mr. Arvind Joshi",
    role: "Parent of Grade II student",
  },
  {
    quote:
      "From sports to academics, the school encourages every child to shine. We are proud to be part of this community.",
    name: "Ms. Poonam Bisht",
    role: "Parent of Nursery student",
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const goTo = (index: number) => setActive(index);

  return (
    <section className="bg-[radial-gradient(circle_at_top_left,_rgba(157,90,44,0.16),_transparent_45%),linear-gradient(135deg,_rgba(248,244,232,0.92)_0%,_rgba(255,255,255,1)_100%)] py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Parent voices</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Trusted by families who value care, excellence and consistency.
          </h2>
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-muted-foreground">
            From early learning to senior primary years, our community continues to grow through the confidence and support children feel every day at school.
          </p>
          <div className="mt-8 inline-flex rounded-full border border-border/70 bg-white/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm">
            4.9/5 parent satisfaction from recent feedback
          </div>
        </div>

        <div className="animate-fade-up rounded-[2rem] border border-white/70 bg-slate-950/95 p-7 text-white shadow-[0_24px_80px_-28px_rgba(15,23,42,0.9)] md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-amber-300">Success stories</p>
              <p className="mt-2 text-sm text-white/70">A quick glimpse into how families experience the school.</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => goTo((active - 1 + testimonials.length) % testimonials.length)}
                className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-lg transition hover:bg-white/20"
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => goTo((active + 1) % testimonials.length)}
                className="grid size-10 place-items-center rounded-full border border-white/20 bg-white/10 text-lg transition hover:bg-white/20"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <p className="text-xl leading-8 text-white/95">“{testimonials[active].quote}”</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-white">{testimonials[active].name}</p>
                <p className="mt-1 text-sm text-white/60">{testimonials[active].role}</p>
              </div>
              <div className="flex gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    className={`size-2.5 rounded-full transition ${index === active ? "bg-amber-300" : "bg-white/30"}`}
                    onClick={() => goTo(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
