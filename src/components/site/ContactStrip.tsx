import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Phone, label: "Call us", value: "+93 786 06 01 01" },
  { icon: Mail, label: "Email", value: "info@afghannotary.com" },
  { icon: MapPin, label: "Visit", value: "Street No. 8, Sherpur, Kabul, Afghanistan" },
];

const ContactStrip = () => (
  <section id="contact" className="bg-background border-y border-border">
    <div className="container-editorial py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="flex items-start gap-4"
        >
          <div className="h-10 w-10 shrink-0 bg-primary text-primary-foreground flex items-center justify-center">
            <it.icon className="h-4 w-4" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{it.label}</div>
            <div className="text-secondary font-semibold mt-1">{it.value}</div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ContactStrip;
