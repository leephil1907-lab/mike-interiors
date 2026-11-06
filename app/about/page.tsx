import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { getContent, lines } from "@/lib/content";
import { pageOg } from "@/lib/social";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About Mike Interiors",
  description:
    "Mike Interiors is an interior finishing and styling studio in Abraka, Delta State, working across painting, wall panels, POP ceilings, wardrobes and full interior styling.",
  alternates: { canonical: "/about" },
  ...pageOg({
    title: "About Mike Interiors",
    description:
      "An interior finishing and styling studio in Abraka, Delta State — painting, wall panels, POP ceilings, wardrobes and full interior styling.",
    path: "/about"
  })
};

const PROCESS = [
  { n: "01", t: "Listen", d: "We start with your space, your needs, your taste and what matters most to you." },
  { n: "02", t: "Plan", d: "We agree finishes, details and a practical direction — including budget and timing." },
  { n: "03", t: "Build", d: "Work is carried out with care, with each detail checked as the room comes together." },
  { n: "04", t: "Finish", d: "We style and review the finished space together, so it feels complete before handover." }
];

export default async function About() {
  const c = await getContent();
  const headingLines = lines(c["about.heading"]);

  return (
    <>
      <PageIntro
        eyebrow="Our story"
        title={<>Good design<br />for good moments.</>}
        intro={c["about.intro"]}
      />

      <section className="section-pad">
        <div className="container about-editorial">
          <Reveal>
            <div className="about-image-frame">
              <Image
                src="/images/projects/thumb/living-ring-chandelier.webp"
                alt="Mike Interiors living room with a ring chandelier, POP ceiling and marble-look TV wall"
                fill
                sizes="(max-width:800px) 100vw, 55vw"
                className="image-cover"
              />
            </div>
          </Reveal>
          <Reveal>
            <div className="eyebrow">Our philosophy</div>
            <h2 className="serif section-heading">
              {headingLines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className="body-copy">{c["about.body_1"]}</p>
            <p className="body-copy" style={{ marginTop: 18 }}>{c["about.body_2"]}</p>
            <Link href="/contact" className="btn-line" style={{ marginTop: 26 }}>
              Discuss your project <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-pad about-process" id="process">
        <div className="container">
          <span className="eyebrow">How we work</span>
          <h2 className="serif section-heading" style={{ maxWidth: 640 }}>
            A clear process, from first conversation to finished room.
          </h2>
          <p className="body-copy" style={{ maxWidth: 560, marginTop: 16 }}>
            Most projects begin with a consultation and move through planning and installation to the final
            styling details.
          </p>
          <div className="service-grid" style={{ marginTop: 40 }}>
            {PROCESS.map((step) => (
              <article className="service" key={step.n}>
                <span className="service-no">{step.n}</span>
                <h3>{step.t}</h3>
                <p>{step.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow">Where we work</span>
          <h2 className="serif section-heading" style={{ margin: "16px auto 0", maxWidth: 700 }}>
            Based in Abraka, working across Delta State.
          </h2>
          <p className="body-copy" style={{ maxWidth: 560, margin: "18px auto 0" }}>
            We take on projects in Abraka and neighbouring towns, including Warri, Ughelli and Asaba. If you are
            further afield, get in touch — we are happy to discuss what is possible.
          </p>
          <Link href="/contact" className="btn-dark" style={{ marginTop: 30 }}>
            Discuss your project <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
