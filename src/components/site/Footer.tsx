import { useTranslation } from "react-i18next";
import { Linkedin, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/anp-logo.png";
import MinistrySeals from "./MinistrySeals";

const Footer = () => {
  const { t } = useTranslation();
  const cols = t("footer.columns", { returnObjects: true }) as Record<string, { title: string; links: string[] }>;

  return (
    <footer className="bg-secondary text-secondary-foreground pt-20 pb-10">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <img src={logo} alt="BA Afghan Notary Public" className="h-10 w-auto brightness-0 invert" />
            <p className="mt-6 text-sm text-background/70 leading-relaxed max-w-sm">
              {t("footer.tagline")}
            </p>
            <div className="mt-8 space-y-3 text-sm text-background/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                <span>Street No. 8, Sherpur, Kabul, Afghanistan</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" strokeWidth={1.5} />
                <a href="tel:+93786060101" className="hover:text-primary transition-colors">
                  +93 786 06 01 01
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                <div className="flex flex-col">
                  <a href="mailto:info@afghannotary.com" className="hover:text-primary transition-colors">info@afghannotary.com</a>
                  <a href="mailto:translations@afghannotary.com" className="hover:text-primary transition-colors">translations@afghannotary.com</a>
                  <a href="mailto:vendor.managment@afghannotary.com" className="hover:text-primary transition-colors">vendor.managment@afghannotary.com</a>
                </div>
              </div>
            </div>
          </div>

          {Object.entries(cols).map(([key, col]) => (
            <div key={key} className="md:col-span-2">
              <div className="text-xs uppercase tracking-[0.22em] text-primary font-medium mb-5">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-background/80 hover:text-primary transition-colors story-link">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1 flex md:flex-col gap-4 md:items-end md:justify-start">
            {[Linkedin, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-background/20 text-background/80 hover:text-primary hover:border-primary hover:scale-110 transition-all duration-300"
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Ministry registration block */}
        <div className="mt-16 pt-10 border-t border-background/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <div className="text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-2">
                Ministry Registered
              </div>
              <p className="text-sm text-background/70 leading-relaxed">
                Officially licensed by the Ministry of Justice and Ministry of Industry and Commerce of Afghanistan.
              </p>
            </div>
            <div className="md:col-span-8">
              <MinistrySeals />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/60">
          <div>© {new Date().getFullYear()} BA Afghan Notary Public. {t("footer.rights")}</div>
          <div className="display-serif italic text-background/70">Integrity. Precision. Global Reach.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
