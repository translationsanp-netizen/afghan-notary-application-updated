import ProcessLayout from "@/components/site/process/ProcessLayout";
import { DraftingHero } from "@/components/site/process/HeroAnimations";
import { MessageSquare, PenLine, Highlighter, MessagesSquare, FileCheck, FileText, Scale, Briefcase, Building2, Users } from "lucide-react";

const LegalDraftingProcessPage = () => (
  <ProcessLayout
    eyebrow="Legal Drafting"
    title="Legal Drafting Process"
    subtitle="Professionally structured legal documents tailored to your specific needs."
    description="Our drafting services transform your requirements into precise, legally sound documents, ensuring clarity, compliance, and effectiveness."
    hero={<DraftingHero />}
    overviewTitle="A systematic approach to document creation"
    overviewText="Our drafting process follows a structured workflow to ensure accuracy, completeness, and legal integrity."
    steps={[
      { icon: <MessageSquare className="h-5 w-5" />, title: "Requirement Consultation", text: "We begin by understanding your specific requirements, objectives, and legal context to ensure the document aligns with your needs." },
      { icon: <PenLine className="h-5 w-5" />, title: "Initial Draft Preparation", text: "Our professionals prepare a structured draft based on your inputs and applicable legal standards." },
      { icon: <Highlighter className="h-5 w-5" />, title: "Review & Refinement", text: "The draft is carefully reviewed and refined to improve clarity, accuracy, and completeness." },
      { icon: <MessagesSquare className="h-5 w-5" />, title: "Client Feedback", text: "We incorporate your feedback to ensure the document fully meets your expectations." },
      { icon: <FileCheck className="h-5 w-5" />, title: "Finalization", text: "The final document is completed, structured, and ready for official use or further processing." },
    ]}
    documents={[
      { icon: <FileText className="h-5 w-5" />, label: "Legal agreements" },
      { icon: <FileText className="h-5 w-5" />, label: "Contracts" },
      { icon: <FileText className="h-5 w-5" />, label: "Affidavits & declarations" },
      { icon: <FileText className="h-5 w-5" />, label: "Business documents" },
    ]}
    trust={{
      title: "Clarity and precision in every document",
      text: "Our drafting process ensures that every document is clear, structured, and aligned with legal standards, reducing ambiguity and risk.",
    }}
    processingTime="Drafting timelines vary depending on document complexity. We ensure timely delivery while maintaining accuracy and quality."
    useCases={[
      { icon: <Users className="h-5 w-5" />, title: "Individuals", text: "Personal legal statements, affidavits, and declarations." },
      { icon: <Briefcase className="h-5 w-5" />, title: "Businesses", text: "Commercial contracts, NDAs, and service agreements." },
      { icon: <Building2 className="h-5 w-5" />, title: "Organizations", text: "Formalized agreements, MOUs, and governance documents." },
      { icon: <Scale className="h-5 w-5" />, title: "Legal needs", text: "Documents drafted for legal proceedings and compliance." },
    ]}
    faqs={[
      { q: "What types of documents can you draft?", a: "Contracts, agreements, affidavits, declarations, MOUs, NDAs, and a wide range of business and personal legal documents." },
      { q: "Can I request revisions?", a: "Yes. Revisions are an integral part of our process — we incorporate your feedback until the document meets your expectations." },
      { q: "Are the documents legally valid?", a: "Drafted documents are structured to be legally enforceable when properly executed and, where required, notarized or legalized." },
      { q: "Do you handle bilingual drafting?", a: "Yes. We can prepare documents in multiple languages and ensure consistency across versions." },
    ]}
    ctaTitle="Create your legal document with confidence"
    ctaText="Our team ensures professionally structured and reliable drafting services."
    ctaButton="Start Drafting Request"
  />
);

export default LegalDraftingProcessPage;
