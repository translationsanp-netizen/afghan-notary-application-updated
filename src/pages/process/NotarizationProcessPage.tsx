import ProcessLayout from "@/components/site/process/ProcessLayout";
import { NotarizationHero } from "@/components/site/process/HeroAnimations";
import { Upload, ShieldCheck, Search, Stamp, Send, FileText, IdCard, FileBadge, GraduationCap, Briefcase, Plane, Scale } from "lucide-react";

const NotarizationProcessPage = () => (
  <ProcessLayout
    eyebrow="Notarization"
    title="Notarization Process"
    subtitle="Secure, verified, and legally recognized documentation — handled with precision."
    description="Our notarization process ensures that every document is authenticated in accordance with legal standards, providing full confidence for both local and international use."
    hero={<NotarizationHero />}
    overviewTitle="A structured approach to legal authentication"
    overviewText="We follow a clearly defined, multi-step process to ensure accuracy, compliance, and reliability at every stage of notarization."
    steps={[
      { icon: <Upload className="h-5 w-5" />, title: "Secure Document Submission", text: "Clients begin by submitting their documents through our secure channels. Both physical and digital submissions are accepted, ensuring flexibility and convenience." },
      { icon: <ShieldCheck className="h-5 w-5" />, title: "Identity Verification", text: "To maintain legal integrity, we conduct identity verification in accordance with regulatory requirements. This ensures that all parties involved are properly authenticated." },
      { icon: <Search className="h-5 w-5" />, title: "Document Examination", text: "Our notarial professionals carefully review the document to confirm completeness, accuracy, and compliance with applicable standards." },
      { icon: <Stamp className="h-5 w-5" />, title: "Notarial Certification", text: "Upon successful verification, the document is officially notarized with a signature and seal, confirming its authenticity and legal standing." },
      { icon: <Send className="h-5 w-5" />, title: "Secure Delivery", text: "Certified documents are delivered securely, either physically or digitally, depending on client requirements." },
    ]}
    documents={[
      { icon: <IdCard className="h-5 w-5" />, label: "National ID / Passport" },
      { icon: <FileText className="h-5 w-5" />, label: "Original document(s)" },
      { icon: <FileBadge className="h-5 w-5" />, label: "Supporting certificates" },
      { icon: <ShieldCheck className="h-5 w-5" />, label: "Authorization letters" },
    ]}
    trust={{
      title: "Legal validity you can trust",
      text: "Each notarized document is processed in accordance with recognized legal frameworks, ensuring acceptance across institutions and jurisdictions.",
    }}
    processingTime="We prioritize efficiency without compromising accuracy. Most notarization requests are processed within a short timeframe, depending on document complexity."
    useCases={[
      { icon: <GraduationCap className="h-5 w-5" />, title: "Students abroad", text: "Authenticate academic and personal documents for international study." },
      { icon: <Briefcase className="h-5 w-5" />, title: "Business documentation", text: "Notarize contracts, powers of attorney, and corporate filings." },
      { icon: <Scale className="h-5 w-5" />, title: "Legal affidavits", text: "Sworn statements and declarations prepared for official use." },
      { icon: <Plane className="h-5 w-5" />, title: "Identity verification", text: "Verified identification for visa, immigration, and embassy needs." },
    ]}
    faqs={[
      { q: "How long does notarization take?", a: "Standard notarization is typically completed within the same business day. Complex or multi-party documents may require additional review time." },
      { q: "Is physical presence required?", a: "Most notarial acts require the signatory's physical presence for identity verification, though we offer flexible scheduling and on-site service options." },
      { q: "Can notarized documents be used internationally?", a: "Yes — once notarized, documents can be further legalized or apostilled (depending on the destination country) for cross-border acceptance." },
      { q: "What forms of ID are accepted?", a: "Government-issued photo identification such as a passport or national ID card. Additional documents may be requested in specific cases." },
    ]}
    ctaTitle="Start your notarization process today"
    ctaText="Our team is ready to assist you with fast, secure, and professional service."
    ctaButton="Submit Your Documents"
  />
);

export default NotarizationProcessPage;
