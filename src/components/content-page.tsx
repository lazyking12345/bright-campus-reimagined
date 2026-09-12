import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import campusImage from "@/assets/gaudium-campus-aerial.jpg";
import studentsImage from "@/assets/gaudium-students-quad.jpg";

type ContentPageProps = {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: Array<{ title: string; text: string }>;
  image?: "campus" | "students";
  action?: { label: string; to: "/admissions" | "/contact" };
};

export function ContentPage({ eyebrow, title, introduction, sections, image = "campus", action }: ContentPageProps) {
  const source = image === "campus" ? campusImage : studentsImage;
  return <>
    <section className="page-shell grid gap-10 py-12 lg:grid-cols-12 lg:items-end lg:py-18">
      <div className="lg:col-span-5 reveal"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p><h1 className="mt-5 font-display text-5xl font-semibold leading-[1.04] sm:text-6xl">{title}</h1><p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">{introduction}</p>{action && <Button asChild size="lg" className="mt-8"><Link to={action.to}>{action.label}<ArrowRight aria-hidden="true" /></Link></Button>}</div>
      <div className="lg:col-span-7"><img src={source} width={image === "campus" ? 1536 : 1280} height={image === "campus" ? 1024 : 1280} alt={image === "campus" ? "Aerial view of The Gaudium's green campus" : "Students learning together on campus"} className="aspect-[16/10] w-full rounded-lg object-cover" /></div>
    </section>
    <section className="bg-brand-ink text-brand-paper"><div className="page-shell grid gap-px py-14 sm:grid-cols-2 lg:grid-cols-3">{sections.map((section) => <article key={section.title} className="border-brand-paper/15 p-6 sm:border-l"><CheckCircle2 className="text-brand-gold" aria-hidden="true" /><h2 className="mt-5 font-display text-2xl font-semibold">{section.title}</h2><p className="mt-3 text-sm leading-6 text-brand-paper/70">{section.text}</p></article>)}</div></section>
    <section className="page-shell py-14 text-center"><p className="font-display text-3xl font-semibold">Experience The Gaudium in person.</p><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Meet our educators, explore the campus, and find the right pathway for your child.</p><Button asChild variant="tour" size="lg" className="mt-6"><Link to="/contact">Book a campus tour</Link></Button></section>
  </>;
}