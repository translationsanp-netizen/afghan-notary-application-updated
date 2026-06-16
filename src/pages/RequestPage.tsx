import PageShell from "@/components/site/PageShell";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "sonner";

const RequestPage = () => {
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "translation", details: "" });

  const services = t("requestPage.services", { returnObjects: true }) as { value: string; label: string }[];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // TODO: wire to backend in Phase 3
    setTimeout(() => {
      toast.success(t("requestPage.success"));
      setForm({ name: "", email: "", phone: "", service: "translation", details: "" });
      setSubmitting(false);
    }, 700);
  };

  return (
    <PageShell
      eyebrow={t("requestPage.eyebrow")}
      title={t("requestPage.title")}
      intro={t("requestPage.intro")}
    >
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto glass-card p-8 md:p-12 rounded-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="eyebrow text-secondary/60 block mb-2">{t("requestPage.form.name")}</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-secondary focus:border-primary outline-none transition-colors"
            />
          </div>
          <div>
            <label className="eyebrow text-secondary/60 block mb-2">{t("requestPage.form.email")}</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-secondary focus:border-primary outline-none transition-colors"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="eyebrow text-secondary/60 block mb-2">{t("requestPage.form.phone")}</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-secondary focus:border-primary outline-none transition-colors"
            />
          </div>
          <div>
            <label className="eyebrow text-secondary/60 block mb-2">{t("requestPage.form.service")}</label>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full bg-background border border-border rounded-md px-4 py-3 text-secondary focus:border-primary outline-none transition-colors"
            >
              {services.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="eyebrow text-secondary/60 block mb-2">{t("requestPage.form.details")}</label>
          <textarea
            required
            rows={6}
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            className="w-full bg-background border border-border rounded-md px-4 py-3 text-secondary focus:border-primary outline-none transition-colors resize-none"
          />
        </div>
        <p className="text-xs text-secondary/60">{t("requestPage.form.upload_note")}</p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold rounded-md hover:bg-primary/90 transition-all hover:scale-[1.02] disabled:opacity-60"
        >
          {submitting ? t("requestPage.form.sending") : t("requestPage.form.submit")} <span aria-hidden>→</span>
        </button>
      </form>
    </PageShell>
  );
};

export default RequestPage;
