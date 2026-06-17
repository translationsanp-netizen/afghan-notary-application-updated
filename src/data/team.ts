import noorul from "@/assets/team/noorul-huda.jpeg";
import sebghatullah from "@/assets/team/sebghatullah-arife.png";
export type TeamCategory = "leadership" | "legal" | "translation" | "technology";

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  unit: string;
  category: TeamCategory;
  image: string | null;
  initials: string;
  short: string;
  intro: string;
  bio: string[];
  expertise: string[];
}

export const team: TeamMember[] = [
  {
    slug: "barigul-alokozay",
    name: "Barigul Alokozay",
    role: "President & Chief Executive Officer",
    unit: "Executive Office",
    category: "leadership",
    image: barigul,
    initials: "BA",
    short:
      "President & CEO of Afghan Notary Public — a licensed attorney with over a decade of experience in legal practice, regulatory systems, and international documentation.",
    intro:
      "Providing strategic leadership and institutional direction across all legal, notarial, and international documentation services at Afghan Notary Public.",
    bio: [
      "A licensed attorney with over a decade of professional experience, Barigul Alokozay brings extensive expertise in legal practice, regulatory frameworks, and cross-border documentation systems. His career spans senior roles within the Ministry of Justice of Afghanistan, private legal practice, and organizational leadership, positioning him at the forefront of legal and institutional service delivery in the country.",
      "In addition to leading ANP, he is the Managing Attorney of Masnad Law Firm and Co-Founder & CEO of ARJ Social Organization, reflecting a strong commitment to both professional excellence and social impact. His legal background is grounded in an LLB from Kabul University, complemented by advanced language proficiency that enables effective engagement across national and international contexts.",
      "He has contributed to globally recognized initiatives, including the World Justice Project's Rule of Law Index and the World Bank's Doing Business reports, demonstrating his active role in shaping legal and business environments at both national and international levels.",
      "At ANP, he leads the development of integrated legal and language service systems, combining notarial authority with advanced translation infrastructure to deliver high-integrity, internationally compliant documentation solutions. Under his leadership, the organization has established a scalable operational model, supported by a global network of linguists and structured quality assurance frameworks.",
      "Barigul Alokozay's leadership is defined by strategic vision, legal precision, and institutional discipline, reinforcing ANP's position as a trusted partner for governments, international organizations, and private sector clients operating across jurisdictions.",
    ],
    expertise: [
      "Strategic Legal Leadership",
      "Cross-Border Documentation",
      "Regulatory Frameworks",
      "Institutional Governance",
      "International Compliance",
    ],
  },
  {
    slug: "mohammad-khalid-massoudi",
    name: "Mohammad Khalid Massoudi",
    role: "Senior Director, Legal Affairs & Strategic Advisory",
    unit: "Legal Affairs",
    category: "legal",
    image: null,
    initials: "MK",
    short:
      "Senior Director at Afghan Notary Public, bringing over a decade of experience in legal advisory, international development, and justice sector programs.",
    intro:
      "Providing senior-level oversight across legal operations, institutional partnerships, and complex advisory engagements at Afghan Notary Public.",
    bio: [
      "A seasoned legal professional with over a decade of experience, Mohammad Khalid Massoudi brings deep expertise in legal advisory, justice sector development, and regulatory frameworks. His professional background spans private legal practice, international development programs, and high-level consultancy roles, positioning him as a key figure in navigating complex legal and institutional environments.",
      "In parallel with his role at ANP, he serves as Attorney and Legal Advisor at Masnad Law Firm and has held advisory positions with Afghanistan Lawyers International. His experience includes consultancy roles with the United Nations Development Programme (UNDP) under the Afghanistan Access to Justice Project, where he contributed to both midterm and final evaluations of program outcomes. He has also worked with the Justice Sector Support Program (JSSP), a U.S. Department of State initiative, supporting justice sector reform and legal system strengthening.",
      "His early career includes experience within the Legislative Department of the Afghanistan National Assembly, providing him with strong institutional insight into legislative and governance processes.",
      "He is an active contributor to internationally recognized initiatives, including the World Justice Project's Rule of Law Index and the World Bank's Doing Business Report, reflecting sustained engagement in global legal benchmarking and policy environments.",
      "At ANP, he plays a central role in shaping legal strategy, ensuring compliance across multi-jurisdictional documentation, and strengthening the organization's alignment with international legal and operational standards. His leadership supports the delivery of high-integrity, legally sound, and globally compliant services to government entities, international organizations, and private sector clients.",
    ],
    expertise: [
      "Legal Strategy & Advisory",
      "Justice Sector Development",
      "International Development Programs",
      "Policy & Governance",
      "Multi-Jurisdictional Compliance",
    ],
  },
  {
    slug: "sebghatullah-arife",
    name: "Sebghatullah Arife",
    role: "Director, Translation Management Unit (TMU) & Language Technology Strategy",
    unit: "Translation Management Unit",
    category: "translation",
    image: sebghatullah,
    initials: "SA",
    short:
      "Director of TMU at Afghan Notary Public, leading advanced translation operations, AI-integrated workflows, and the development of the proprietary VeritasCAT platform.",
    intro:
      "Leading Afghan Notary Public's strategic direction in multilingual operations, language technology integration, and high-stakes translation services.",
    bio: [
      "A highly accomplished multilingual professional, Sebghatullah Arife brings advanced expertise in translation, interpretation, and linguistic systems across legal, technical, medical, governmental, and academic domains. With a proven track record in managing complex, high-volume language projects, he oversees the full lifecycle of translation operations — ensuring precision, consistency, and compliance with international standards.",
      "In his leadership role, he is responsible for designing and optimizing enterprise-level translation workflows, implementing rigorous quality assurance frameworks, and directing multidisciplinary teams of linguists and specialists. He plays a central role in integrating advanced technologies, including CAT tools, terminology management systems, and AI-assisted environments, enhancing both operational efficiency and linguistic accuracy.",
      "He is also the driving force behind the development and implementation of TMU VeritasCAT, ANP's proprietary translation platform, which enables structured, scalable, and secure translation processes tailored for high-risk and cross-border documentation. Under his leadership, TMU has evolved into a technologically advanced and globally connected unit, supported by a wide network of professional linguists.",
      "Beyond operational leadership, he contributes to the advancement of the translation field through research and publications focused on artificial intelligence, language systems, and the evolving role of translation in global communication. His work reflects a strong commitment to bridging linguistic, cultural, and institutional gaps through structured and innovative approaches.",
      "His professional approach is defined by strategic vision, technical depth, and uncompromising attention to quality, positioning ANP's Translation Management Unit as a high-performance, technology-driven language service operation aligned with international best practices.",
    ],
    expertise: [
      "Enterprise Translation Workflows",
      "Language Technology & AI",
      "Terminology Management",
      "Quality Assurance Systems",
      "VeritasCAT Platform Development",
    ],
  },
  {
    slug: "ezatullah-alokozay",
    name: "Ezatullah Alokozay",
    role: "Vice President & Technical Operations Lead",
    unit: "Technical Operations",
    category: "technology",
    image: ezatullah,
    initials: "EA",
    short:
      "Vice President at Afghan Notary Public, responsible for maintaining technical operations and resolving system-level issues to ensure smooth and reliable service delivery.",
    intro:
      "Supporting Afghan Notary Public's operational stability and technical functionality across all digital and system-based processes.",
    bio: [
      "A Software Engineer with a degree in Computer Science from Rana University, Ezatullah Alokozay is responsible for ensuring the smooth performance of ANP's technical environment, addressing system challenges, and maintaining the reliability of digital platforms used across legal and translation operations.",
      "He plays a critical role in identifying and resolving technical issues, supporting internal teams with system-related needs, and ensuring that operational workflows remain uninterrupted. His work contributes directly to maintaining efficiency, consistency, and secure handling of digital processes within the organization.",
      "Working closely with both technical and operational teams, he ensures that all platforms and tools function effectively in support of ANP's service delivery. His approach is defined by responsiveness, precision, and a strong focus on practical problem-solving within a structured organizational environment.",
      "Through his role, Ezatullah Alokozay supports ANP's ability to deliver reliable, uninterrupted, and professionally managed services, ensuring that technical challenges are addressed efficiently and without disruption.",
    ],
    expertise: [
      "Technical Operations",
      "System Reliability",
      "Digital Platform Management",
      "Software Engineering",
      "Process Continuity",
    ],
  },
  {
    slug: "noorul-huda",
    name: "Noorul Huda",
    role: "Senior Legal Consultant, International Documentation & Compliance",
    unit: "Legal Affairs",
    category: "legal",
    image: noorul,
    initials: "NH",
    short:
      "Senior Legal Consultant at Afghan Notary Public, specializing in legal documentation, notarization processes, and international compliance.",
    intro:
      "Contributing deep expertise in legal documentation, cross-border compliance, and structured advisory services at Afghan Notary Public.",
    bio: [
      "With a Bachelor's degree in Law and over five years of professional experience, Noorul Huda plays a critical role in managing high-value documentation workflows, including the coordination of certified legal translations, advanced document review and analysis, and the execution of notarization processes aligned with regulatory requirements.",
      "His work extends to overseeing complex legalization frameworks and advising on apostille-related procedures, ensuring that all documentation meets the standards required for international recognition and institutional acceptance.",
      "Operating at the intersection of legal precision and operational efficiency, Noorul Huda collaborates closely with multidisciplinary teams across legal drafting, compliance review, and administrative coordination. His approach is defined by rigorous attention to detail, disciplined process management, and strict adherence to confidentiality and data protection standards.",
      "Through his contribution, Noorul Huda reinforces ANP's position as a provider of globally aligned, high-integrity legal documentation services, supporting clients operating in complex, multi-jurisdictional environments.",
    ],
    expertise: [
      "Legal Documentation",
      "Notarization Processes",
      "International Compliance",
      "Apostille & Legalization",
      "Document Review & Analysis",
    ],
  },
];

export const teamCategories: { key: TeamCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "leadership", label: "Leadership" },
  { key: "legal", label: "Legal" },
  { key: "translation", label: "Translation" },
  { key: "technology", label: "Technology" },
];

export const openPositions = [
  {
    title: "Certified Legal Translator (English ↔ Dari/Pashto)",
    location: "Kabul, Afghanistan",
    type: "Full-time",
  },
  {
    title: "Junior Legal Consultant",
    location: "Kabul, Afghanistan",
    type: "Full-time",
  },
  {
    title: "Quality Assurance Specialist — Translation",
    location: "Remote / Hybrid",
    type: "Contract",
  },
];

export function getMemberBySlug(slug: string): TeamMember | undefined {
  return team.find((m) => m.slug === slug);
}
