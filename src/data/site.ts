/**
 * Single source of truth for every piece of content on the site.
 * Edit here — never inside a component.
 */

// ─────────────────────────────────────────────────────────────
// TODO(kartik): still to fill in — the LinkedIn URL and `url` (deploy domain)
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Kartik Mahajan",
  shortName: "Kartik",
  role: "AI/ML Engineer",
  tagline: "I build intelligent systems that hold up in production.",
  bio: "Third-year B.Tech student specialising in Artificial Intelligence at Bennett University, currently a Data Science Intern at Blitz AI. I work across deep learning, applied computer vision and the full stack around them.",

  // Used for canonical URLs, sitemap and OG tags.
  url: "https://kartikmahajan.dev", // REPLACE_ME with the domain you deploy to
  email: "kartikmahaja85@gmail.com",
  location: "Greater Noida, Uttar Pradesh",
  resume: "/resume.pdf",

  socials: {
    github: "https://github.com/kartik-mahajan-ai",
    linkedin: "https://linkedin.com/in/REPLACE_ME",
  },
} as const;

export type Section = {
  id: string;
  label: string;
  index: string;
  /** Large heading shown at the top of the section. */
  lead: string;
};

/** Drives the nav, the section order and every section heading. */
export const sections: Section[] = [
  { id: "approach", label: "Approach", index: "01", lead: "" },
  { id: "about", label: "About", index: "02", lead: "Building with intent, not just with tools." },
  { id: "experience", label: "Experience", index: "03", lead: "Currently at Blitz AI." },
  { id: "skills", label: "Skills", index: "04", lead: "The stack I reach for." },
  { id: "projects", label: "Projects", index: "05", lead: "Selected work." },
  {
    id: "certifications",
    label: "Certifications",
    index: "06",
    lead: "Coursework beyond the degree.",
  },
  { id: "contact", label: "Contact", index: "07", lead: "Let's build something." },
];

/* ───────────────────────────────────────────────────────────
   Approach — the statement between the hero and About.
   `headline` is set in the sans face, `emphasis` in serif italic.
   ─────────────────────────────────────────────────────────── */

export const manifesto = {
  kicker: "Why work with me",
  headline: "Anyone can train a model.",
  /** One entry per rendered line. */
  emphasis: ["The hard part is earning", "the trust to deploy it."],
  principles: [
    {
      n: "01",
      title: "Explainable by default",
      body: "A prediction you can't interrogate is a guess with better branding. Grad-CAM overlays, calibrated probabilities, confidence a person can actually read.",
    },
    {
      n: "02",
      title: "Built to be used",
      body: "A notebook isn't a product. Every model I ship gets the interface, the auth and the dashboard that let someone act on what it says.",
    },
    {
      n: "03",
      title: "Honest about limits",
      body: "Knowing where a model breaks is worth more than another point of accuracy. I'd rather surface uncertainty than quietly round it away.",
    },
  ],
};

/** Lookup helper so a component never hardcodes its own heading. */
export const sectionOf = (id: string): Section =>
  sections.find((s) => s.id === id) ?? { id, label: id, index: "", lead: "" };

/** `value` is parsed for the count-up animation; non-numeric parts are kept. */
export const stats = [
  { value: "9.0", label: "CGPA / 10" },
  { value: "100+", label: "DSA problems solved" },
  { value: "3", label: "AI/ML systems shipped" },
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "AI / ML",
    items: [
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "Keras",
      "Scikit-Learn",
      "Computer Vision",
      "NLP",
    ],
  },
  {
    title: "Web & Backend",
    items: ["React", "Node.js", "Flask", "HTML5", "CSS3", "REST APIs"],
  },
  {
    title: "Databases & Tools",
    items: ["MongoDB", "MySQL", "Git", "GitHub", "VS Code", "Jupyter", "Google Colab"],
  },
  {
    title: "Core CS",
    items: ["Data Structures", "Algorithms", "OOP", "DBMS", "Operating Systems", "Networks"],
  },
];

/* ───────────────────────────────────────────────────────────
   Experience
   `logo` is a path under /public. Leave it out and the card
   falls back to a monogram built from the first letter.
   ─────────────────────────────────────────────────────────── */

export type Role = {
  company: string;
  title: string;
  period: string;
  location?: string;
  summary: string;
  points: string[];
  logo?: string;
  url?: string;
  current?: boolean;
};

export const roles: Role[] = [
  {
    company: "Blitz AI",
    title: "Data Science Intern",
    period: "Aug 2025 — Present",
    location: "Remote",
    // Blitz AI builds AI Pre-check and Plan Review infrastructure for the
    // development services teams of local governments.
    summary:
      "Working on AI Pre-check and Plan Review infrastructure for local government development services — the systems that check submitted plan sets against jurisdiction codes.",
    // TODO(kartik): swap these for what you actually shipped — be specific,
    // and use numbers wherever you have them.
    points: [
      "Building and evaluating data science workflows across submittal completeness, sufficiency and compliance checks",
      "Working with document and drawing-set data to support automated code review",
    ],
    logo: "/images/blitz-ai.webp",
    current: true,
  },
];

export type Education = {
  degree: string;
  school: string;
  meta: string;
  period: string;
  points: string[];
  current?: boolean;
};

export const education: Education[] = [
  {
    degree: "B.Tech, Computer Science & Engineering (AI)",
    school: "Bennett University",
    meta: "Greater Noida, Uttar Pradesh · CGPA 9.0 / 10",
    period: "2024 — 2028",
    points: [
      "Specialisation: Machine Learning, Deep Learning, NLP, Computer Vision",
      "Core: Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks",
    ],
    current: true,
  },
];

/* ───────────────────────────────────────────────────────────
   Projects
   ─────────────────────────────────────────────────────────── */

export type Project = {
  title: string;
  blurb: string;
  year: string;
  description: string;
  tags: string[];
  highlights: string[];
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "MediVision",
    blurb: "AI healthcare assistant",
    year: "2025",
    description:
      "A DenseNet201 chest X-ray classifier separating COVID-19, pneumonia and normal cases, with pixel-level lung region localisation. Grad-CAM heatmaps make each prediction inspectable, and the whole thing ships as a full-stack platform rather than a notebook.",
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "TensorFlow",
      "DenseNet201",
      "OpenCV",
      "MongoDB",
    ],
    highlights: [
      "Grad-CAM heatmaps for explainable AI and clinical trust",
      "Pixel-level lung region localisation",
      "JWT auth, dashboard analytics and an AI symptom-guidance chatbot",
    ],
    // github: "https://github.com/…",
  },
  {
    title: "MediHome",
    blurb: "Intelligent disease diagnosis assistant",
    year: "2024",
    description:
      "An ensemble disease predictor combining Random Forest, Naive Bayes and Logistic Regression over severity-weighted symptom features, with safe probability calibration so the confidence it reports is the confidence it has.",
    tags: ["Python", "Flask", "Scikit-Learn", "HTML5", "CSS3", "JavaScript"],
    highlights: [
      "Ensemble of Random Forest, Naive Bayes and Logistic Regression",
      "Severity-weighted features with safe probability calibration",
      "Dynamic symptom autocompletion, urgency flags and live precautions",
    ],
  },
  {
    title: "SmartBank Suite",
    blurb: "Banking management system",
    year: "2024",
    description:
      "A full Java desktop banking application — account lifecycle, deposits, withdrawals and transfers backed by MySQL persistence, wrapped in a Swing/AWT interface with PIN-based authentication.",
    tags: ["Java", "Swing", "AWT", "MySQL", "JDBC"],
    highlights: [
      "Secure 5-digit PIN authentication flow",
      "Persistent account and transaction storage over JDBC",
      "Real-time deposits, withdrawals and transfers",
    ],
  },
];

/* ───────────────────────────────────────────────────────────
   Certifications
   ─────────────────────────────────────────────────────────── */

export type Certification = {
  title: string;
  issuer: string;
  url?: string;
};

export const certifications: Certification[] = [
  { title: "Machine Learning with Python", issuer: "IBM" },
  { title: "The Bits and Bytes of Computer Networking", issuer: "Google" },
  { title: "Operating Systems and You", issuer: "Google" },
  { title: "Data Structures and Algorithms", issuer: "Infosys" },
  { title: "Core Java", issuer: "Infosys" },
  { title: "Python Fundamentals", issuer: "Infosys" },
  { title: "Introduction to Microprocessors", issuer: "Arm" },
  { title: "Design Thinking", issuer: "University of Virginia" },
  { title: "Entrepreneurship I", issuer: "UIUC" },
];
