import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { versionedImage } from "@/lib/versionedImage";
import giz from "@/assets/partners/giz.png";
import usaid from "@/assets/partners/usaid.png";
import unhcr from "@/assets/partners/unhcr.webp";
import undp from "@/assets/partners/undp.png";
import mtn from "@/assets/partners/mtn.png";
import iom from "@/assets/partners/iom.png";
import afghanWireless from "@/assets/partners/afghan-wireless.png";
import bayatFoundation from "@/assets/partners/bayat-foundation.png";
import bayatPower from "@/assets/partners/bayat-power.png";

const fallbackPartners = [
  { src: giz, alt: "GIZ" },
  { src: usaid, alt: "USAID" },
  { src: unhcr, alt: "UNHCR" },
  { src: undp, alt: "UNDP" },
  { src: iom, alt: "IOM" },
  { src: mtn, alt: "MTN" },
  { src: afghanWireless, alt: "Afghan Wireless" },
  { src: bayatFoundation, alt: "Bayat Foundation" },
  { src: bayatPower, alt: "Bayat Power" },
];

const Partners = () => {
  const [partners, setPartners] = useState(fallbackPartners);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("partners")
        .select("name, logo, updated_at")
        .eq("active", true)
        .order("display_order");
      if (data && data.length > 0) {
        setPartners(data.map((p: any) => ({ src: versionedImage(p.logo, p.updated_at)!, alt: p.name })));
      }
    })();
  }, []);

  const loop = [...partners, ...partners];
  return (
    <section className="bg-background py-20 md:py-28 border-b border-border">
      <div className="container-editorial mb-10">
        <p className="eyebrow mb-4">Trusted by</p>
        <h2 className="display-serif text-secondary text-3xl md:text-5xl max-w-3xl">
          Professionals & organizations across the globe.
        </h2>
      </div>

      <div className="marquee-mask overflow-hidden">
        <motion.div
          className="flex items-center gap-16 md:gap-24 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((p, i) => (
            <div
              key={i}
              className="shrink-0 h-16 md:h-20 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="max-h-full w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
