import { useEffect, useState } from "react";

const notices = [
  { title: "Admissions open for 2026–27", detail: "Applications are being accepted for Nursery to Class VIII." },
  { title: "Parent orientation session", detail: "A special orientation will be held this month for new families." },
  { title: "Sports day preparation", detail: "Students should come prepared for the upcoming annual sports event." },
];

export function NoticeBoard() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % notices.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="rounded-[1.5rem] border border-border/70 bg-white/80 p-5 shadow-[0_14px_40px_-20px_rgba(15,23,42,0.24)] backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Latest updates</p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">News & events</h3>
        </div>
        <div className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-semibold text-muted-foreground">
          Live
        </div>
      </div>

      <div className="mt-4 rounded-[1.25rem] border border-border/70 bg-surface-2 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full bg-primary/10 p-2 text-sm">📢</div>
          <div>
            <p className="text-sm font-semibold text-foreground">{notices[active].title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{notices[active].detail}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {notices.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActive(index)}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition ${index === active ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
