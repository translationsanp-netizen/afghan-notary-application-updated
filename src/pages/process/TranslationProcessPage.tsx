import ProcessLayout from "@/components/site/process/ProcessLayout";
import { TranslationHero } from "@/components/site/process/HeroAnimations";
import { Upload, Languages, Type, CheckCheck, BadgeCheck, FileText, GraduationCap, Briefcase, Plane, Scale } from "lucide-react";
import { motion } from "framer-motion";

const languages = ["English", "Dari", "Pashto", "Arabic", "French", "German", "Turkish", "Urdu"];
const docTypes = ["Legal contracts", "Academic certificates", "Identification documents", "Business documents"];

const TranslationProcessPage = () => (
  <ProcessLayout
    eyebrow="Translation"
    title="Translation Process"
    subtitle="Accurate, certified, and professionally verified translations for legal and official use."
    description="Our translation process ensures that every document is not only linguistically accurate, but also aligned with legal and formal standards required for official recognition."
    hero={<TranslationHero />}
    overviewTitle="A multi-step translation workflow"
    overviewText="Each document passes through multiple layers of linguistic and legal verification to ensure precision and reliability."
    steps={[
      { icon: <Upload className="h-5 w-5" />, title: "Document Submission", text: "Clients submit their documents in the original language through secure digital or physical channels." },
      { icon: <Languages className="h-5 w-5" />, title: "Language & Content Analysis", text: "Our experts analyze the document to understand context, terminology, and legal relevance." },
      { icon: <Type className="h-5 w-5" />, title: "Professional Translation", text: "The document is translated by qualified professionals with expertise in legal and official terminology." },
      { icon: <CheckCheck className="h-5 w-5" />, title: "Quality Review", text: "A second-level review ensures accuracy, consistency, and completeness." },
      { icon: <BadgeCheck className="h-5 w-5" />, title: "Certification", text: "The translated document is certified for official use, ensuring acceptance by institutions and authorities." },
    ]}
    documents={docTypes.map((d) => ({ icon: <FileText className="h-5 w-5" />, label: d }))}
    trust={{
      title: "Precision you can rely on",
      text: "Our translation process combines linguistic expertise with legal understanding to ensure that every document maintains its original meaning and validity.",
    }}
    processingTime="Turnaround time depends on document complexity and language requirements. We ensure timely delivery without compromising quality."
    useCases={[
      { icon: <GraduationCap className="h-5 w-5" />, title: "Students abroad", text: "Translated transcripts and academic documents for foreign admissions." },
      { icon: <Plane className="h-5 w-5" />, title: "Immigration applicants", text: "Personal records translated for visa and residency applications." },
      { icon: <Briefcase className="h-5 w-5" />, title: "International business", text: "Contracts and corporate filings translated for cross-border use." },
      { icon: <Scale className="h-5 w-5" />, title: "Legal proceedings", text: "Court documents translated with legal precision and certified accuracy." },
    ]}
    faqs={[
      { q: "Are your translations certified?", a: "Yes. All official translations are certified, stamped, and accepted by ministries, embassies, and international institutions." },
      { q: "Which languages do you support?", a: "We support English, Dari, Pashto, Arabic, and additional international languages on request." },
      { q: "How accurate are the translations?", a: "Translations are completed by qualified linguists with legal subject-matter expertise, then reviewed by a second specialist for accuracy and consistency." },
      { q: "Can you translate technical or legal terminology?", a: "Yes. Our team specializes in legal, academic, technical, and business terminology to preserve meaning and intent." },
    ]}
    ctaTitle="Translate your documents with confidence"
    ctaText="Our team ensures accurate, reliable, and certified translations for your needs."
    ctaButton="Start Translation Request"
    extraSections={
      <section className="py-20 bg-background">
        <div className="container-editorial max-w-5xl text-center">
          <span className="eyebrow text-primary">Coverage</span>
          <h2 className="display-serif text-secondary text-3xl md:text-5xl mt-3">Languages we support</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {languages.map((l, i) => (
              <motion.span
                key={l}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.08, y: -3 }}
                className="px-5 py-2.5 bg-muted border border-border rounded-full text-secondary font-medium text-sm hover:border-primary hover:text-primary transition-colors cursor-default"
              >{l}</motion.span>
            ))}
          </div>
        </div>
      </section>
    }
  />
);

export default TranslationProcessPage;
