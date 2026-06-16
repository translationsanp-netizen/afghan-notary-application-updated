import PageShell from "@/components/site/PageShell";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const EMAILS = [
  "info@afghannotary.com",
  "translations@afghannotary.com",
  "vendor.managment@afghannotary.com",
];

const MAP_LAT = 34.539554;
const MAP_LNG = 69.173845;
const MAP_LINK = "https://maps.app.goo.gl/P59ePsSHR8nSVTP98";
// OpenStreetMap embed avoids API keys
const MAP_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${MAP_LNG - 0.005}%2C${MAP_LAT - 0.003}%2C${MAP_LNG + 0.005}%2C${MAP_LAT + 0.003}&layer=mapnik&marker=${MAP_LAT}%2C${MAP_LNG}`;

const ContactPage = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success(t("contactPage.success"));
      setForm({ name: "", email: "", message: "" });
      setSubmitting(false);
    }, 700);
  };

  return (
    <PageShell
      eyebrow={t("contactPage.eyebrow")}
      title={t("contactPage.title")}
      intro={t("contactPage.intro")}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
              <MapPin className="h-4 w-4" />
            </span>
            <div>
              <p className="eyebrow text-secondary/60">{t("contactPage.address_label")}</p>
              <p className="text-secondary mt-1">Street No. 8, Sherpur,<br />Kabul, Afghanistan</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
              <Phone className="h-4 w-4" />
            </span>
            <div>
              <p className="eyebrow text-secondary/60">{t("contactPage.phone_label")}</p>
              <a href="tel:+93786060101" className="text-secondary mt-1 inline-block hover:text-primary transition-colors">
                +93 786 06 01 01
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
              <Mail className="h-4 w-4" />
            </span>
            <div>
              <p className="eyebrow text-secondary/60">{t("contactPage.email_label")}</p>
              <ul className="mt-1 space-y-1">
                {EMAILS.map((em) => (
                  <li key={em}>
                    <a
                      href={`mailto:${em}`}
                      className="text-secondary hover:text-primary transition-colors text-sm"
                    >
                      {em}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-2 glass-card p-8 md:p-10 rounded-xl space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="eyebrow text-secondary/60 block mb-2">{t("contactPage.form.name")}</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-secondary focus:border-primary outline-none transition-colors"
              />
            </div>
            <div>
              <label className="eyebrow text-secondary/60 block mb-2">{t("contactPage.form.email")}</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-secondary focus:border-primary outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="eyebrow text-secondary/60 block mb-2">{t("contactPage.form.message")}</label>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-secondary focus:border-primary outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold rounded-md hover:bg-primary/90 transition-all hover:scale-[1.02] disabled:opacity-60"
          >
            {submitting ? t("contactPage.form.sending") : t("contactPage.form.submit")} <span aria-hidden>→</span>
          </button>
        </form>
      </div>

      {/* Map */}
      <section className="mt-20">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-4">
          <div>
            <p className="eyebrow text-secondary/60">Find Us</p>
            <h3 className="display-serif text-secondary text-2xl md:text-3xl mt-2">
              Visit our office in Kabul.
            </h3>
          </div>
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-secondary/20 text-secondary text-sm rounded-md hover:border-primary hover:text-primary transition-all"
          >
            Open in Google Maps <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border shadow-sm">
          <iframe
            title="Office location map"
            src={MAP_EMBED}
            loading="lazy"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
          />
        </div>
        <p className="mt-3 text-xs text-secondary/55 font-mono">
          Coordinates: {MAP_LAT}, {MAP_LNG}
        </p>
      </section>
    </PageShell>
  );
};

export default ContactPage;
