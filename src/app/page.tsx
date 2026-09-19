import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { certifications, projects, roles, site } from "@/data/site";

/**
 * Structured data so search engines read this as a person, not a blob of text.
 */
function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: site.role,
    description: site.bio,
    address: { "@type": "PostalAddress", addressLocality: site.location },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Bennett University" },
    worksFor: roles.map((r) => ({ "@type": "Organization", name: r.company })),
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.title,
      recognizedBy: { "@type": "Organization", name: c.issuer },
    })),
    sameAs: [site.socials.github, site.socials.linkedin],
    knowsAbout: ["Machine Learning", "Deep Learning", "Computer Vision", "Full Stack Development"],
    subjectOf: projects.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />

      {/* Offsets the fixed rail on desktop and the fixed bar on mobile. */}
      <div className="pt-16 lg:pl-[276px] lg:pt-0">
        <main id="main" className="mx-auto w-full max-w-4xl px-6 sm:px-8 lg:px-12">
          <Hero />
          <Manifesto />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}
