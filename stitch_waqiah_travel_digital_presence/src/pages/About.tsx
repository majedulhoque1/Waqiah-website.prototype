import { ShieldCheck, HeartHandshake, Globe2, Award, ArrowRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { Section, SectionHeading } from "../components/ui/Section";
import Button from "../components/ui/Button";
import { SITE } from "../data/site";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust & Protection",
    body: "As a licensed and bonded agency, every booking is backed by financial protection and full regulatory compliance.",
  },
  {
    icon: HeartHandshake,
    title: "Cultural Reverence",
    body: "We treat every Hajj and Umrah journey with the spiritual care and respect it deserves, guided by knowledgeable scholars.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    body: "Strong airline and hotel partnerships across the Middle East, Europe, and Asia mean better routes and better rates.",
  },
  {
    icon: Award,
    title: "Relentless Service",
    body: "From first enquiry to safe return, a dedicated coordinator is with you — on the ground and around the clock.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Waqiah"
        title="Trusted journeys, handled with care"
        subtitle="A full-service travel agency in Woodside, New York — arranging flights, tours, and visas worldwide, with a special expertise in Hajj & Umrah."
      />

      {/* Story */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl shadow-lift">
            <img
              src="/img/about.jpg"
              alt="Al-Masjid an-Nabawi in Madinah at night"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="A full-service agency, a personal touch"
            />
            <div className="mt-5 space-y-4 text-muted">
              <p>
                Waqiah Travel &amp; Tour was founded on a simple belief: travel should be exciting,
                not stressful. From our office in Woodside, Queens, we arrange international flights,
                holiday and multi-city tours, hotels, and visas for travelers across New York and
                beyond.
              </p>
              <p>
                We're also proud specialists in Hajj &amp; Umrah — combining deep religious
                understanding with modern travel expertise. We negotiate directly with airlines and
                hotels, prepare every visa with meticulous care, and stay reachable at every step.
              </p>
              <p>
                Led by <span className="font-semibold text-navy">{SITE.founders}</span>, the same
                commitment to <span className="font-semibold text-navy">assured peace of mind</span>{" "}
                guides every itinerary we craft — from a weekend getaway to the journey of a lifetime.
              </p>
            </div>
            <div className="mt-7">
              <Button to="/contact" size="md">
                Talk to our team
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <section className="bg-surface-container">
        <div className="container-px section-pad">
          <SectionHeading eyebrow="What we stand for" title="Our values" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-xl bg-white p-6 shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-md bg-primary-soft/40 text-primary">
                  <v.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licensed band */}
      <Section>
        <div className="relative overflow-hidden rounded-xl bg-navy px-6 py-14 sm:px-12">
          <div className="absolute -right-16 -top-10 h-56 w-56 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-label-sm font-semibold uppercase tracking-wider text-white">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Licensed &amp; Bonded
              </span>
              <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                Your investment is protected
              </h2>
              <p className="mt-3 text-white/80">
                We operate as a fully licensed and bonded travel agency in New York — guaranteeing the
                security of your bookings and your travel.
              </p>
            </div>
            <Button to="/contact" variant="white" size="lg" className="shrink-0">
              Start planning
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
