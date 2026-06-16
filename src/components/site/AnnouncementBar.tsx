import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FULL = "Afghan Notary Public is pleased to announce the launch of its Translation Management Unit (TMU).";
const LINK_TEXT = "Learn more at tmu-afghannotary.com";

const AnnouncementBar = () => {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(FULL.slice(0, i));
      if (i >= FULL.length) {
        clearInterval(id);
        setTimeout(() => setDone(true), 250);
      }
    }, 28);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-9 bg-secondary text-secondary-foreground border-b border-white/10">
      <div className="container-editorial h-full flex items-center justify-center text-xs md:text-[13px] tracking-wide">
        <p className="truncate">
          <span>{typed}</span>
          {!done && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="inline-block w-[2px] h-3 bg-primary align-middle ml-0.5" />}
          {done && (
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              href="https://tmu-afghannotary.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-primary underline-offset-4 hover:underline font-medium"
            >
              {LINK_TEXT} →
            </motion.a>
          )}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
