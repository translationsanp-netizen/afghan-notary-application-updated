import ProcessLayout from "@/components/site/process/ProcessLayout";
import { LegalizationHero } from "@/components/site/process/HeroAnimations";
import { FileSearch, Stamp, Building2, Flag, Send, FileText, IdCard, FileBadge, GraduationCap, Briefcase, Plane, Scale } from "lucide-react";

const LegalizationProcessPage = () => (
  <ProcessLayout
    eyebrow="Legalization"
    title="Legalization Process"
    subtitle="Ensuring your documents are recognized across international jurisdictions."
    description="Our legalization process is designed to validate your documents for official use abroad, ensuring compliance with the requirements of foreign governments, embassies, and institutions."
    hero={<LegalizationHero />}
    overviewTitle="A multi-level verification process"
    overviewText="Legalization involves several stages of authentication, each ensuring that your document is accepted internationally."
    steps={[
      { icon: <FileSearch className="h-5 w-5" />, title: "Document Assessment", text: "We begin by carefully reviewing your document to determine eligibility for legalization and identify the required certification pathway." },
      { icon: <Stamp className="h-5 w-5" />, title: "Initial Certification", text: "The document is certified locally to confirm authenticity before proceeding to higher authorities." },
      { icon: <Building2 className="h-5 w-5" />, title: "Ministry Authentication", text: "The document is submitted to the relevant ministry for official authentication, verifying its legal standing." },
      { icon: <Flag className="h-5 w-5" />, title: "Embassy Legalization", text: "The embassy or consulate of the destination country validates the document, confirming its acceptance abroad." },
      { icon: <Send className="h-5 w-5" />, title: "Final Delivery", text: "The fully legalized document is securely delivered, ready for official use internationally." },
    ]}
    documents={[
      { icon: <FileText className="h-5 w-5" />, label: "Original documents" },
      { icon: <IdCard className="h-5 w-5" />, label: "Passport / ID" },
      { icon: <FileBadge className="h-5 w-5" />, label: "Supporting certificates" },
      { icon: <Flag className="h-5 w-5" />, label: "Destination country info" },
    ]}
    trust={{
      title: "Recognized across borders",
      text: "Our legalization process ensures that your documents meet the standards required by international authorities, enabling smooth acceptance in foreign jurisdictions.",
    }}
    processingTime="Processing time may vary depending on the destination country and required authorities. We ensure efficient handling while maintaining strict compliance."
    useCases={[
      { icon: <GraduationCap className="h-5 w-5" />, title: "Students applying abroad", text: "Academic credentials prepared for foreign universities and institutions." },
      { icon: <Briefcase className="h-5 w-5" />, title: "International business", text: "Corporate documents validated for cross-border transactions." },
      { icon: <Plane className="h-5 w-5" />, title: "Employment & visa", text: "Personal records authenticated for work permits and visa applications." },
      { icon: <Scale className="h-5 w-5" />, title: "Legal & immigration", text: "Court documents and legal records prepared for foreign jurisdictions." },
    ]}
    faqs={[
      { q: "What's the difference between notarization and legalization?", a: "Notarization authenticates a document locally; legalization adds further layers of authentication so it is recognized in another country's legal system." },
      { q: "How long does legalization take?", a: "Timelines depend on the ministries and embassy involved. Most cases complete within several business days; some embassies may take longer." },
      { q: "Is embassy legalization required for all countries?", a: "No — countries party to the Hague Convention require an Apostille instead. We advise on the correct path based on your destination." },
      { q: "Do you handle the entire process?", a: "Yes. We manage every step from initial certification through ministry and embassy stages, returning the fully legalized document." },
    ]}
    ctaTitle="Prepare your documents for international use"
    ctaText="Our team ensures a seamless legalization process from start to finish."
    ctaButton="Start Legalization Process"
  />
);

export default LegalizationProcessPage;
