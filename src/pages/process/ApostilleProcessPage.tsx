import ProcessLayout from "@/components/site/process/ProcessLayout";
import { ApostilleHero } from "@/components/site/process/HeroAnimations";
import { FileSearch, Stamp, Send, Award, PackageCheck, FileText, GraduationCap, Briefcase, Plane, Scale, Globe2 } from "lucide-react";
import { motion } from "framer-motion";

const ApostilleProcessPage = () => (
  <ProcessLayout
    eyebrow="Hague Apostille"
    title="Hague Apostille Process"
    subtitle="Official international certification for seamless document recognition across borders."
    description="Our apostille service ensures that your documents are authenticated in accordance with the Hague Convention, enabling their acceptance in participating countries worldwide."
    hero={<ApostilleHero />}
    overviewTitle="A structured certification workflow"
    overviewText="The apostille process follows a defined sequence to ensure your document is fully validated and internationally recognized."
    steps={[
      { icon: <FileSearch className="h-5 w-5" />, title: "Document Preparation", text: "We review your documents to ensure they meet the requirements for apostille certification." },
      { icon: <Stamp className="h-5 w-5" />, title: "Notarization (If Required)", text: "Certain documents must first be notarized before they are eligible for apostille certification." },
      { icon: <Send className="h-5 w-5" />, title: "Submission to Authority", text: "The document is submitted to the designated authority responsible for issuing apostilles." },
      { icon: <Award className="h-5 w-5" />, title: "Apostille Issuance", text: "The apostille certificate is issued, confirming the authenticity of the document." },
      { icon: <PackageCheck className="h-5 w-5" />, title: "Final Delivery", text: "The certified document is delivered securely, ready for international use." },
    ]}
    documents={[
      { icon: <FileText className="h-5 w-5" />, label: "Birth certificates" },
      { icon: <FileText className="h-5 w-5" />, label: "Educational documents" },
      { icon: <FileText className="h-5 w-5" />, label: "Legal agreements" },
      { icon: <FileText className="h-5 w-5" />, label: "Business documents" },
    ]}
    trust={{
      title: "Certified with confidence",
      text: "Our process adheres to international standards, ensuring your documents are accepted without complications across Hague Convention member states.",
    }}
    processingTime="Processing time depends on document type and authority requirements. We ensure efficient handling at every stage."
    useCases={[
      { icon: <GraduationCap className="h-5 w-5" />, title: "Studying abroad", text: "Diplomas and transcripts certified for foreign academic institutions." },
      { icon: <Plane className="h-5 w-5" />, title: "Immigration", text: "Personal documents prepared for visa and residency applications." },
      { icon: <Briefcase className="h-5 w-5" />, title: "International business", text: "Corporate documents authenticated for cross-border transactions." },
      { icon: <Scale className="h-5 w-5" />, title: "Legal proceedings", text: "Court records and powers of attorney certified for foreign use." },
    ]}
    faqs={[
      { q: "What is the Hague Convention?", a: "The Hague Convention of 1961 simplifies the legalization of documents between member countries through a single certification — the Apostille." },
      { q: "Which countries accept an apostille?", a: "All member states of the Hague Apostille Convention accept apostilled documents without requiring further embassy legalization." },
      { q: "Is notarization required before apostille?", a: "Many private documents must first be notarized before an apostille can be issued. We assess each document and advise accordingly." },
      { q: "How long does an apostille take?", a: "Most apostilles are issued within several business days, depending on the issuing authority's workload." },
    ]}
    ctaTitle="Certify your documents for global use"
    ctaText="We ensure a seamless apostille process with full compliance and reliability."
    ctaButton="Start Apostille Request"
    extraSections={
      <section className="py-20 md:py-28 bg-background">
        <div className="container-editorial max-w-5xl">
          <div className="text-center mb-10">
            <span className="eyebrow text-primary">Global recognition</span>
            <h2 className="display-serif text-secondary text-3xl md:text-5xl mt-3">Recognized in Hague Convention countries</h2>
            <p className="mt-5 text-secondary/70 max-w-2xl mx-auto">Our apostille certification is accepted across 120+ member states, enabling seamless international use of your documents.</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[2/1] bg-muted rounded-2xl border border-border p-8 flex items-center justify-center overflow-hidden"
          >
            <Globe2 className="absolute inset-0 m-auto h-64 w-64 text-primary/10" strokeWidth={0.6} />
            <div className="relative grid grid-cols-3 md:grid-cols-6 gap-3 text-xs text-secondary/70 font-medium">
              {["USA", "UK", "Germany", "France", "Spain", "Italy", "Japan", "Australia", "Canada", "India", "Turkey", "Brazil"].map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-3 py-1.5 bg-card border border-border rounded-full text-center"
                >{c}</motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    }
  />
);

export default ApostilleProcessPage;
