import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Bus,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  MapPin,
  Newspaper,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import campusImage from "@/assets/gaudium-campus-aerial.jpg";
import studentsImage from "@/assets/gaudium-students-quad.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Gaudium School, Hyderabad — Happy Minds, Bright Futures" },
      {
        name: "description",
        content:
          "The Gaudium in Hyderabad offers IB, Cambridge and CBSE pathways from Nursery to Grade 12 on a 27-acre green campus. Admissions open for 2026–27.",
      },
      { property: "og:title", content: "The Gaudium School, Hyderabad — Happy Minds, Bright Futures" },
      {
        property: "og:description",
        content:
          "Value-creating education across IB, Cambridge and CBSE. Explore admissions, academics, athletics and book a campus tour.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const stats = [
  { value: 27, suffix: "", label: "Acres of green campus" },
  { value: 12, prefix: "1:", suffix: "", label: "Teacher–student ratio" },
  { value: 270, suffix: "+", label: "Faculty development hours yearly" },
  { value: 3, suffix: "", label: "Global curricula — IB, Cambridge, CBSE" },
];

const noticeFilters = ["All", "Announcements", "Events", "Admissions"] as const;

const notices = [
  {
    category: "Admissions",
    date: "Sep 2026",
    title: "Applications open for 2026–27",
    text: "Nursery to Grade 12 across IB, Cambridge and CBSE. Book a counselling call with our admissions team.",
  },
  {
    category: "Events",
    date: "Oct 03, 2026",
    title: "Open morning: Kollur campus",
    text: "Tour learning spaces, arts studios and sports facilities, and meet our educators in person.",
  },
  {
    category: "Announcements",
    date: "Sep 22, 2026",
    title: "Inter-school athletics meet results",
    text: "Our senior athletics squad brought home 14 medals, including gold in the 4×100m relay.",
  },
  {
    category: "Events",
    date: "Oct 17, 2026",
    title: "Diwali celebration & parent evening",
    text: "Families are invited for performances, student showcases and a festive dinner on the quad.",
  },
  {
    category: "Announcements",
    date: "Sep 12, 2026",
    title: "New IB Diploma subject choices",
    text: "Economics, Film and Computer Science join the Grade 11 subject basket this year.",
  },
];

const quickLinks = [
  { icon: GraduationCap, label: "Parent Portal", text: "Grades, attendance and teacher updates.", to: "/contact" as const },
  { icon: CalendarDays, label: "Term Calendar", text: "Key dates for the 2026–27 school year.", to: "/contact" as const },
  { icon: UtensilsCrossed, label: "Lunch Menus", text: "Nutritionist-planned weekly menus.", to: "/contact" as const },
  { icon: Bus, label: "Transport", text: "GPS-tracked bus routes across Hyderabad.", to: "/contact" as const },
  { icon: ClipboardList, label: "Admissions", text: "Apply for Nursery to Grade 12.", to: "/admissions" as const },
  { icon: MapPin, label: "Visit Us", text: "Find the campus and book a tour.", to: "/contact" as const },
];

const testimonials = [
  {
    quote:
      "The Gaudium didn't just teach my daughter — it gave her confidence. She walks into every room curious and unafraid to ask questions.",
    name: "Priya R.",
    role: "Parent, Grade 7",
  },
  {
    quote:
      "Teachers here know every child by name and by strength. My son found his love for science in the IB labs.",
    name: "Arvind K.",
    role: "Parent, Grade 10",
  },
  {
    quote:
      "I came in shy in Grade 6. By Grade 9 I was captaining the football team and speaking at MUN conferences.",
    name: "Ananya S.",
    role: "Student, Grade 11",
  },
];

function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);
  return value;
}

function Stat({ value, prefix = "", suffix = "", label, start }: { value: number; prefix?: string; suffix?: string; label: string; start: boolean }) {
  const count = useCountUp(value, start);
  return (
    <div className="rounded-lg border bg-card p-6">
      <p className="font-display text-4xl font-semibold text-primary sm:text-5xl">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{label}</p>
    </div>
  );
}

function Home() {
  const [filter, setFilter] = useState<(typeof noticeFilters)[number]>("All");
  const [statsVisible, setStatsVisible] = useState(false);
  const [slide, setSlide] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = statsRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const visibleNotices = filter === "All" ? notices : notices.filter((n) => n.category === filter);
  const t = testimonials[slide] ?? testimonials[0]!;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={campusImage}
          alt="Aerial view of The Gaudium's 27-acre green campus in Hyderabad"
          className="absolute inset-0 h-full w-full object-cover"
          width={1536}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink/85 via-brand-ink/60 to-brand-ink/25" aria-hidden="true" />
        <div className="page-shell relative grid gap-10 py-24 sm:py-32 lg:grid-cols-12 lg:py-40">
          <div className="lg:col-span-7 reveal">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
              IB · Cambridge · CBSE — Nursery to Grade 12
            </p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.03] text-brand-paper sm:text-7xl">
              Happy minds. Bright futures.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-brand-paper/85">
              A value-creating education on a 27-acre green campus in Hyderabad — where academics,
              arts, sport and character grow together.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="tour">
                <Link to="/contact">
                  <MapPin aria-hidden="true" /> Tour the campus
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link to="/admissions">
                  Apply for 2026–27 <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="page-shell -mt-10 relative z-10 pb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} {...s} start={statsVisible} />
          ))}
        </div>
      </section>

      {/* Campus story */}
      <section className="page-shell grid gap-10 py-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <img
            src={studentsImage}
            alt="Students learning together on The Gaudium campus quad"
            className="aspect-[4/3] w-full rounded-lg object-cover"
            width={1280}
            height={1280}
            loading="lazy"
          />
        </div>
        <div className="lg:col-span-6 reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our story</p>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            One campus. Three world-class pathways.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            From the IB Continuum to Cambridge and CBSE, every learner finds a pathway that fits —
            guided by educators who invest 270+ hours a year in their own growth.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/academics">Explore academics</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/about" className="gap-2">
                About The Gaudium <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Notice board */}
      <section className="bg-brand-ink py-16 text-brand-paper">
        <div className="page-shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                <Newspaper className="size-4" aria-hidden="true" /> Notice board
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold">News & upcoming events</h2>
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter notices">
              {noticeFilters.map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "tour" : "outline"}
                  className={filter === f ? "" : "border-brand-paper/30 bg-transparent text-brand-paper hover:bg-brand-paper/10 hover:text-brand-paper"}
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                >
                  {f}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visibleNotices.map((n) => (
              <article key={n.title} className="rounded-lg border border-brand-paper/15 p-6 transition-colors hover:border-brand-gold/60">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">{n.category}</Badge>
                  <time className="text-xs text-brand-paper/60">{n.date}</time>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{n.title}</h3>
                <p className="mt-2 text-sm leading-6 text-brand-paper/70">{n.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="page-shell py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="size-4" aria-hidden="true" /> Quick links
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold">Everything, one tap away</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((q) => (
            <Link
              key={q.label}
              to={q.to}
              className="group rounded-lg border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none"
            >
              <q.icon className="size-6 text-primary" aria-hidden="true" />
              <p className="mt-4 font-display text-xl font-semibold">{q.label}</p>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{q.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="page-shell pb-20">
        <div className="rounded-xl bg-brand-soft p-8 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Voices of our community</p>
          <figure className="mt-6" aria-live="polite">
            <blockquote className="max-w-3xl font-display text-2xl font-medium leading-snug sm:text-3xl">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{t.name}</span> — {t.role}
            </figcaption>
          </figure>
          <div className="mt-8 flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous testimonial"
              onClick={() => setSlide((s) => (s - 1 + testimonials.length) % testimonials.length)}
            >
              <ChevronLeft aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next testimonial"
              onClick={() => setSlide((s) => (s + 1) % testimonials.length)}
            >
              <ChevronRight aria-hidden="true" />
            </Button>
            <div className="ml-2 flex gap-1.5">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === slide ? "w-6 bg-primary" : "w-1.5 bg-primary/30"}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
