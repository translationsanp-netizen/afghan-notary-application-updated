import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import ScrollStory from "@/components/site/ScrollStory";
import TrustBar from "@/components/site/TrustBar";
import Partners from "@/components/site/Partners";
import WhyDifferent from "@/components/site/WhyDifferent";
import TmuIntroSection from "@/components/site/TmuIntroSection";
import Services from "@/components/site/Services";
import TrustResults from "@/components/site/TrustResults";
import FeaturedService from "@/components/site/FeaturedService";
import Process from "@/components/site/Process";
import WhoWeHelp from "@/components/site/WhoWeHelp";
import Testimonials from "@/components/site/Testimonials";
import Stats from "@/components/site/Stats";
import FAQ from "@/components/site/FAQ";
import Insights from "@/components/site/Insights";
import CTA from "@/components/site/CTA";
import ContactStrip from "@/components/site/ContactStrip";
import Footer from "@/components/site/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <h1 className="sr-only">BA Afghan Notary Public — Legal Certification, Reimagined for a Global World</h1>
      <Hero />
      <TrustBar />
      <ScrollStory />
      <Partners />
      <WhyDifferent />
      <TmuIntroSection />
      <Services />
      <TrustResults />
      <FeaturedService />
      <Process />
      <WhoWeHelp />
      <Testimonials />
      <Stats />
      <FAQ />
      <Insights />
      <CTA />
      <ContactStrip />
      <Footer />
    </main>
  );
};

export default Index;
