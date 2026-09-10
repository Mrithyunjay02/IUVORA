// Shared constants - services, nav, process steps, etc.

export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services/web-development" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES = [
  {
    slug: "web-development",
    title: "Web Development",
    tagline: "Crafting fast, scalable digital experiences.",
    description:
      "From marketing sites to complex web apps - we design and build with performance and conversion at the core.",
    icon: "⬡",
    capabilities: [
      "Custom website design & development",
      "E-commerce (Shopify, WooCommerce, custom)",
      "Web application development",
      "CMS integration (Next.js, Contentful, Sanity)",
      "Performance optimization & Core Web Vitals",
      "API design & third-party integrations",
      "Accessibility (WCAG 2.1 AA)",
    ],
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel"],
  },
  {
    slug: "app-development",
    title: "App Development",
    tagline: "Native-quality apps. Cross-platform reach.",
    description:
      "iOS and Android applications built for speed and usability - from MVP to full-scale product.",
    icon: "◈",
    capabilities: [
      "iOS & Android development",
      "React Native cross-platform apps",
      "UI/UX design for mobile",
      "Backend & API development",
      "App Store submission & optimization",
      "Push notifications & real-time features",
      "Analytics integration",
    ],
    tools: ["React Native", "Expo", "Swift", "Kotlin", "Firebase", "Supabase", "Redux"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Full-funnel growth. Measurable results.",
    description:
      "A–Z digital marketing: strategy, execution, and reporting across every channel that matters.",
    icon: "◎",
    capabilities: [
      "Search Engine Optimization (technical + content)",
      "Paid advertising (Google, Meta, LinkedIn)",
      "Social media strategy & management",
      "Content marketing & copywriting",
      "Brand identity & visual design",
      "Email marketing & automation",
      "Analytics setup & monthly reporting",
    ],
    tools: ["Google Ads", "Meta Ads", "SEMrush", "Ahrefs", "HubSpot", "Mailchimp", "GA4"],
  },
  {
    slug: "it-services",
    title: "IT Services",
    tagline: "Reliable infrastructure. Zero downtime.",
    description:
      "Managed IT support and cloud infrastructure so your team can focus on building, not firefighting.",
    icon: "⬢",
    capabilities: [
      "Cloud infrastructure setup (AWS, GCP, Azure)",
      "DevOps & CI/CD pipeline setup",
      "Managed IT support & helpdesk",
      "Cybersecurity audits & monitoring",
      "Network design & configuration",
      "Data backup & disaster recovery",
      "Software license & vendor management",
    ],
    tools: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Datadog"],
  },
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start with deep-dive conversations about your goals, users, and constraints. No templates, no assumptions.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Wireframes, prototypes, and design systems - validated with real users before a line of code is written.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Agile sprints with weekly demos. You see real progress, not status updates.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Staged rollouts, QA testing, performance audits, and a smooth handoff - or we stay on as your team.",
  },
  {
    number: "05",
    title: "Grow",
    description:
      "Post-launch support, iterative improvements, and growth marketing to keep the momentum going.",
  },
];

export const WHY_IUVORA = [
  {
    title: "End-to-end ownership",
    description:
      "One team handles design, build, and marketing. No handoff gaps, no finger-pointing.",
  },
  {
    title: "Transparent by default",
    description:
      "Weekly reports, live dashboards, and direct Slack access - you always know what's happening.",
  },
  {
    title: "No cookie-cutter solutions",
    description:
      "Every engagement starts from your specific context. We don't resell the same playbook twice.",
  },
  {
    title: "Speed without shortcuts",
    description:
      "We move fast - but we don't skip accessibility, performance, or security to do it.",
  },
];
