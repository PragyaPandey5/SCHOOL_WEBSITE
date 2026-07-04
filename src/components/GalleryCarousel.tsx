import { useState } from "react";

const slides = [
  { title: "Classroom learning spaces", caption: "Bright, organized classrooms designed for focused learning.", image: "/images/campus.svg" },
  { title: "Science lab", caption: "Hands-on practice that makes concepts come alive.", image: "/images/campus.svg" },
  { title: "Playground", caption: "Open areas for sports, group play and healthy movement.", image: "/images/campus.svg" },
];

export function GalleryCarousel() {
  const [active, setActive] = useState(0);

  return (
    <div className="rounded-[1.75rem] border border-white/70 bg-white/80 p-3 shadow-[0_20px_60px_-26px_rgba(15,23,42,0.35)] backdrop-blur">
      <div className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-surface-2">
        <div className="relative aspect-[4/3] w-full">
          <img
            src={slides[active].image}
            alt={slides[active].title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300">Gallery</p>
            <h3 className="mt-2 font-serif text-2xl font-semibold">{slides[active].title}</h3>
            <p className="mt-2 max-w-[46ch] text-sm text-white/85">{slides[active].caption}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition ${index === active ? "w-8 bg-primary" : "w-2.5 bg-border"}`}
              aria-label={`Show ${slide.title}`}
            />
          ))}
        </div>
        <div className="text-sm text-muted-foreground">{active + 1}/{slides.length}</div>
      </div>
    </div>
  );
}
