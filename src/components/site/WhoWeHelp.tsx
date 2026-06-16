import { motion } from "framer-motion";
import { GraduationCap, Building2, User, HeartHandshake } from "lucide-react";

const groups = [
  { icon: GraduationCap, t: "Students", d: "Studying abroad? We certify diplomas, transcripts and identity documents." },
  { icon: Building2, t: "Businesses", d: "Expanding internationally with verified contracts, powers and incorporation papers." },
  { icon: User, t: "Individuals", d: "Marriage, inheritance, immigration — handled with discretion and care." },
  { icon: HeartHandshake, t: "NGOs & Orgs", d: "Operational documents prepared for cross-border missions and partnerships." },
];

const WhoWeHelp = () => (
  <section className="bg-muted py-28 md:py-40">
    <div className="container-editorial">
      <div className="mb-16 md:mb-20 max-w-3xl">
        <p className="eyebrow mb-4">03 — Who we help</p>
        <h2 className="display-serif text-secondary text-4xl md:text-6xl text-balance">
          Every document. Every story. Every border.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {groups.map((g, i) => (
          <motion.div
            key={g.t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group bg-background p-8 border border-border hover:border-primary transition-all duration-500 hover:-translate-y-1"
          >
            <g.icon className="h-8 w-8 text-primary mb-8" strokeWidth={1.25} />
            <h3 className="display-serif text-2xl text-secondary mb-3">{g.t}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{g.d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoWeHelp;
