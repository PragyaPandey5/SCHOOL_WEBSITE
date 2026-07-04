import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-12 py-16 md:grid-cols-3">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full bg-primary font-serif text-sm font-bold text-primary-foreground">
              HF
            </div>
            <span className="font-serif text-xl font-semibold text-primary">Holy Faith School</span>
          </div>
          <p className="max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
            Nurturing young minds in the serene hills of Champawat since 2018.
            Quality K–8 education in a disciplined, joyful environment.
          </p>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/academics" className="hover:text-primary">Academics</Link></li>
            
            <li><Link to="/infrastructure" className="hover:text-primary">Infrastructure</Link></li>
            <li><Link to="/activities" className="hover:text-primary">Activities</Link></li>
            <li><Link to="/admissions" className="hover:text-primary">Admissions 2026–27</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-foreground/60">Address</span>
              Madli, Champawat, Uttarakhand
            </li>
            <li>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-foreground/60">Phone</span>
              <a href="tel:+918534017345" className="hover:text-primary">+91 85340 17345</a>
            </li>
            <li>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-foreground/60">Email</span>
              <a href="mailto:schoolholyfaith686@gmail.com" className="break-all hover:text-primary">
                schoolholyfaith686@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Holy Faith School, Champawat. All rights reserved.</p>
          <p>
            Founded by Mrs. Jyoti Pandey · Established 2018 ·{" "}
            <Link to="/auth" className="hover:text-primary">Staff Login</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
