import aboutImg from "@/assets/mega/about.jpg";
import servicesImg from "@/assets/mega/services.jpg";
import processImg from "@/assets/mega/process.jpg";
import insightsImg from "@/assets/mega/insights.jpg";
import careersImg from "@/assets/mega/careers.jpg";

export type MegaColumn = {
  title: string;
  links: { label: string; to: string; sub?: string }[];
  highlight?: boolean;
  intro?: string;
};

export type MegaPanel = {
  label: string;
  to: string;
  hasMega?: boolean;
  feature?: {
    eyebrow: string;
    title: string;
    text: string;
    cta: { label: string; to: string };
    image?: string;
  };
  columns?: MegaColumn[];
};

export const megaNav: MegaPanel[] = [
  { label: "Home", to: "/" },
  {
    label: "About",
    to: "/about",
    hasMega: true,
    feature: {
      eyebrow: "About Afghan Notary Public",
      title: "A trusted institution delivering certified legal services with authority.",
      text: "Decades of experience serving clients, governments and international organizations.",
      cta: { label: "Learn About ANP", to: "/about" },
      image: aboutImg,
    },
    columns: [
      {
        title: "Organization",
        links: [
          { label: "About Us", to: "/about" },
          { label: "Mission & Vision", to: "/about#mission" },
          { label: "Leadership", to: "/careers" },
        ],
      },
      {
        title: "Institutional",
        links: [
          { label: "Legal Authority", to: "/about#authority" },
          { label: "Accreditation", to: "/about#accreditation" },
          { label: "Compliance Standards", to: "/about#compliance" },
        ],
      },
      {
        title: "TMU Integration",
        highlight: true,
        intro: "The institutional language arm of ANP.",
        links: [
          { label: "About TMU", to: "/tmu" },
          { label: "Institutional Role", to: "/tmu#role" },
          { label: "Governance", to: "/tmu#governance" },
        ],
      },
    ],
  },
  {
    label: "Services",
    to: "/services",
    hasMega: true,
    feature: {
      eyebrow: "Institutional Legal Services",
      title: "Structured Legal Systems for a Global Environment.",
      text: "Certified, compliant and internationally recognized documentation services.",
      cta: { label: "Explore Services", to: "/services" },
      image: servicesImg,
    },
    columns: [
      {
        title: "Core Services",
        links: [
          { label: "Notarization", to: "/notarization" },
          { label: "Legalization", to: "/legalization" },
          { label: "Translation (TMU)", to: "/translation" },
          { label: "Legal Drafting", to: "/legal-drafting" },
          { label: "Hague Apostille", to: "/apostille" },
        ],
      },
      {
        title: "Extended Services",
        links: [
          { label: "Certified Translation", to: "/translation" },
          { label: "Document Attestation", to: "/legalization" },
          { label: "Embassy Legalization", to: "/legalization" },
          { label: "Multilingual Documentation", to: "/translation" },
        ],
      },
      {
        title: "Translation Management Unit",
        highlight: true,
        intro: "Centralized platform for institutional translation operations.",
        links: [
          { label: "TMU Overview", to: "/tmu" },
          { label: "TMU Portal", to: "/tmu#portal" },
          { label: "AI Workflow", to: "/tmu#workflow" },
          { label: "Linguist Network", to: "/tmu#network" },
        ],
      },
    ],
  },
  {
    label: "Process",
    to: "/process",
    hasMega: true,
    feature: {
      eyebrow: "Structured Legal Workflows",
      title: "Clear, step-by-step processes ensuring compliance and reliability.",
      text: "Every engagement follows a transparent, multi-stage operational pipeline.",
      cta: { label: "How It Works", to: "/process" },
      image: processImg,
    },
    columns: [
      {
        title: "Service Processes",
        links: [
          { label: "Notarization Process", to: "/process/notarization" },
          { label: "Legalization Process", to: "/process/legalization" },
          { label: "Translation Process", to: "/process/translation" },
          { label: "Drafting Process", to: "/process/legal-drafting" },
          { label: "Apostille Process", to: "/process/apostille" },
        ],
      },
      {
        title: "System Workflow",
        links: [
          { label: "Document Intake", to: "/process#intake" },
          { label: "Identity Verification", to: "/process#verification" },
          { label: "Multi-stage Review", to: "/process#review" },
          { label: "Certification & Delivery", to: "/process#delivery" },
        ],
      },
      {
        title: "Understanding Process",
        links: [
          { label: "How It Works", to: "/process" },
          { label: "Compliance Standards", to: "/process#compliance" },
          { label: "Processing Time", to: "/process#timing" },
        ],
      },
    ],
  },
  {
    label: "Insights",
    to: "/insights",
    hasMega: true,
    feature: {
      eyebrow: "Knowledge & Resources",
      title: "Insights, updates and guidance on legal and translation matters.",
      text: "Articles, case studies and announcements from our editorial team.",
      cta: { label: "Browse Insights", to: "/insights" },
      image: insightsImg,
    },
    columns: [
      {
        title: "Content",
        links: [
          { label: "Articles", to: "/insights" },
          { label: "Legal Guides", to: "/insights#guides" },
          { label: "Documentation", to: "/insights#docs" },
        ],
      },
      {
        title: "Topics",
        links: [
          { label: "Notarization", to: "/insights?topic=notarization" },
          { label: "Translation", to: "/insights?topic=translation" },
          { label: "Legalization", to: "/insights?topic=legalization" },
          { label: "Apostille", to: "/insights?topic=apostille" },
        ],
      },
      {
        title: "Featured",
        links: [
          { label: "Case Studies", to: "/insights#cases" },
          { label: "Announcements", to: "/insights#news" },
          { label: "Updates", to: "/insights#updates" },
        ],
      },
    ],
  },
  {
    label: "Careers",
    to: "/careers",
    hasMega: true,
    feature: {
      eyebrow: "Join the Team",
      title: "Build your career at a trusted legal institution.",
      text: "Opportunities for legal professionals, linguists and operations talent.",
      cta: { label: "View Openings", to: "/careers" },
      image: careersImg,
    },
    columns: [
      {
        title: "Opportunities",
        links: [
          { label: "Open Positions", to: "/careers#open" },
          { label: "Linguist Network (TMU)", to: "/tmu#network" },
          { label: "Internships", to: "/careers#intern" },
        ],
      },
      {
        title: "Our Team",
        links: [
          { label: "Leadership", to: "/careers" },
          { label: "Meet the Team", to: "/careers#team" },
        ],
      },
    ],
  },
  { label: "Contact", to: "/contact" },
];
