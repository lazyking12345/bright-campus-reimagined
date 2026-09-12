import { Link } from "@tanstack/react-router";
import { ChevronDown, MapPin, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const primaryLinks = [
  { to: "/about" as const, label: "About" },
  { to: "/academics" as const, label: "Academics" },
  { to: "/admissions" as const, label: "Admissions" },
  { to: "/athletics" as const, label: "Athletics" },
  { to: "/contact" as const, label: "Contact" },
];

const audienceLinks = {
  "Prospective families": ["Explore curricula", "Admissions process", "Book a campus tour", "Fees & enquiries"],
  "Current families": ["Parent portal", "Term calendar", "Lunch menus", "Newsletters"],
  "Students & staff": ["My Gaudium", "Learning resources", "Staff intranet", "Careers"],
};

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-dvh bg-background text-foreground antialiased">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="page-shell grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:flex lg:justify-between">
          <Link to="/" className="flex min-w-0 items-baseline gap-2" aria-label="The Gaudium home">
            <span className="font-display truncate text-2xl font-semibold">The Gaudium</span>
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">Hyderabad</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {primaryLinks.map((link) => <Link key={link.to} to={link.to} className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground" activeProps={{ className: "text-primary" }}>{link.label}</Link>)}
            <div className="relative">
              <Button variant="ghost" className="text-foreground/70" aria-expanded={menuOpen} aria-controls="audience-menu" onClick={() => setMenuOpen((value) => !value)}>For you <ChevronDown aria-hidden="true" /></Button>
              {menuOpen && <div id="audience-menu" className="absolute right-0 top-12 w-[680px] rounded-md border bg-popover p-6 shadow-xl">
                <div className="grid grid-cols-3 gap-6">
                  {Object.entries(audienceLinks).map(([audience, links]) => <div key={audience}><p className="font-display text-lg font-semibold">{audience}</p><ul className="mt-3 space-y-2">{links.map((item) => <li key={item}><Link to={item.includes("Admissions") ? "/admissions" : item.includes("campus") ? "/contact" : "/"} onClick={() => setMenuOpen(false)} className="text-sm text-muted-foreground hover:text-primary">{item}</Link></li>)}</ul></div>)}
                </div>
              </div>}
            </div>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild variant="outline" className="hidden sm:inline-flex"><Link to="/contact"><MapPin aria-hidden="true" />Tour</Link></Button>
            <Button asChild><Link to="/admissions">Apply now</Link></Button>
            <Sheet>
              <SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation"><Menu aria-hidden="true" /></Button></SheetTrigger>
              <SheetContent className="bg-background">
                <SheetHeader><SheetTitle className="font-display text-2xl">The Gaudium</SheetTitle><SheetDescription>Choose where you would like to go.</SheetDescription></SheetHeader>
                <nav className="mt-8 flex flex-col" aria-label="Mobile navigation">{primaryLinks.map((link) => <Link key={link.to} to={link.to} className="border-b py-4 text-lg font-semibold">{link.label}</Link>)}</nav>
                <div className="mt-8"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Audience shortcuts</p>{Object.keys(audienceLinks).map((label) => <p key={label} className="mt-3 text-sm text-muted-foreground">{label}</p>)}</div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-brand-ink text-brand-paper">
        <div className="page-shell grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5"><p className="font-display text-3xl font-semibold">The Gaudium</p><p className="mt-4 max-w-md text-sm leading-relaxed text-brand-paper/70">Happy minds and value-creating education across academics, arts, sport and life skills.</p><Button asChild className="mt-6"><Link to="/admissions">Apply for 2026–27</Link></Button></div>
          <div className="md:col-span-3"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-paper/60">Visit</p><p className="mt-4 text-sm leading-6 text-brand-paper/80">Survey No 25/A, Velimela Village<br />RC Puram Mandal, Hyderabad 502300</p></div>
          <div className="md:col-span-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-paper/60">Connect</p><a className="mt-4 block text-sm text-brand-paper/80 hover:text-brand-paper" href="mailto:admissions@thegaudium.com">admissions@thegaudium.com</a><a className="mt-2 block text-sm text-brand-paper/80 hover:text-brand-paper" href="tel:+917337000100">+91 73370 00100</a></div>
        </div>
        <div className="border-t border-brand-paper/15"><div className="page-shell flex flex-wrap justify-between gap-3 py-5 text-xs text-brand-paper/60"><span>© 2026 The Gaudium</span><span>IB · Cambridge · CBSE — Nursery to Grade 12</span></div></div>
      </footer>
    </div>
  );
}