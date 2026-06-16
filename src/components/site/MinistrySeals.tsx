import justiceLogo from "@/assets/ministries/ministry-of-justice.png";
import commerceLogo from "@/assets/ministries/ministry-of-industry-commerce.png";

const Seal = ({ src, title, subtitle }: { src: string; title: string; subtitle: string }) => (
  <div className="flex items-center gap-4">
    <div className="relative h-20 w-20 rounded-full bg-background/95 flex items-center justify-center shrink-0 ring-1 ring-background/20 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]">
      <img src={src} alt={title} loading="lazy" className="h-16 w-16 object-contain" />
    </div>
    <div className="min-w-0">
      <div className="text-[10px] uppercase tracking-[0.25em] text-background/60 font-semibold">
        {subtitle}
      </div>
      <div className="text-sm font-semibold text-background leading-snug">{title}</div>
    </div>
  </div>
);

const MinistrySeals = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <Seal
      src={justiceLogo}
      title="Ministry of Justice of Afghanistan"
      subtitle="Officially Licensed"
    />
    <Seal
      src={commerceLogo}
      title="Ministry of Industry and Commerce of Afghanistan"
      subtitle="Officially Licensed"
    />
  </div>
);

export default MinistrySeals;
