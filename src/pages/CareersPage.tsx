import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, Briefcase, Sparkles, Users, Globe2, GraduationCap } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { team as staticTeam, teamCategories, openPositions as staticPositions, type TeamCategory, type TeamMember } from "@/data/team";
import { supabase } from "@/integrations/supabase/client";
import { versionedImage } from "@/lib/versionedImage";

const ease = [0.22, 1, 0.36, 1] as const;

const CareersPage = () => {
  const [filter, setFilter] = useState<TeamCategory | "all">("all");
  const [hovered, setHovered] = useState<string | null>(null);
  const [team, setTeam] = useState<TeamMember[]>(staticTeam);
  const [openPositions, setOpenPositions] = useState(staticPositions);
  const [usingDbTeam, setUsingDbTeam] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Careers & Our Team — BA Afghan Notary Public";
    (async () => {
      const [{ data: dbTeam }, { data: dbJobs }] = await Promise.all([
        supabase.from("team_members").select("*").eq("active", true).order("display_order"),
        supabase.from("jobs").select("title, location, job_type").eq("status", "open").order("created_at", { ascending: false }),
      ]);
      if (dbTeam && dbTeam.length > 0) {
        setUsingDbTeam(true);
        setTeam(
          dbTeam.map((m: any): TeamMember => ({
            slug: m.slug,
            name: m.name,
            role: m.position ?? "",
            unit: m.position ?? "",
            category: "leadership",
            image: versionedImage(m.photo, m.updated_at),
            initials: (m.name || "").split(" ").map((p: string) => p[0]).slice(0, 2).join("").toUpperCase(),
            short: m.short_intro ?? "",
            intro: m.short_intro ?? "",
            bio: m.bio ? [m.bio] : [],
            expertise: [],
          }))
        );
      }
      if (dbJobs && dbJobs.length > 0) {
        setOpenPositions(dbJobs.map((j: any) => ({ title: j.title, location: j.location ?? "—", type: j.job_type ?? "Full-time" })));
      }
    })();
  }, []);

  const filtered = useMemo(
    () => (usingDbTeam || filter === "all" ? team : team.filter((m) => m.category === filter)),
    [filter, team, usingDbTeam]
  );

  const featured = hovered ? team.find((m) => m.slug === hovered) : team[0];


  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
        <div className="absolute -top-20 -right-20 w-[480px] h-[480px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-secondary/10 rounded-full blur-3xl" />

        <div className="container-editorial relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="text-xs uppercase tracking-[0.28em] text-primary font-medium mb-6"
              >
                Careers & Our Team
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.1 }}
                className="display-serif text-5xl md:text-6xl lg:text-7xl text-secondary leading-[1.05] tracking-tight"
              >
                Our People.<br />
                <span className="text-primary italic">Our Strength.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.25 }}
                className="mt-8 text-lg md:text-xl text-secondary/70 leading-relaxed max-w-xl"
              >
                A team of professionals committed to accuracy, compliance, and excellence in legal documentation — standing behind every document we deliver.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.4 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <a
                  href="#team"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all"
                >
                  Meet the Team <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#positions"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-secondary/20 text-secondary rounded-md text-sm font-medium hover:border-primary hover:text-primary transition-all"
                >
                  Open Positions
                </a>
              </motion.div>
            </div>

            {/* Featured portrait */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featured?.slug ?? "none"}
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease }}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary shadow-2xl"
                >
                  {featured?.image ? (
                    <img src={featured.image} alt={featured.name} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-secondary to-secondary/80">
                      <span className="display-serif text-7xl text-primary/80">{featured?.initials}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="text-xs uppercase tracking-[0.22em] text-primary font-medium mb-2">{featured?.unit}</div>
                    <div className="display-serif text-3xl text-background leading-tight">{featured?.name}</div>
                    <div className="mt-1 text-sm text-background/80">{featured?.role}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM GRID */}
      <section id="team" className="py-20 md:py-28 bg-background">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-primary font-medium mb-4">Leadership & Experts</div>
              <h2 className="display-serif text-4xl md:text-5xl text-secondary leading-tight max-w-2xl">
                The professionals behind every certified document.
              </h2>
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {teamCategories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setFilter(c.key)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.18em] rounded-full border transition-all ${
                    filter === c.key
                      ? "bg-secondary text-background border-secondary"
                      : "border-secondary/20 text-secondary/70 hover:border-primary hover:text-primary"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filtered.map((m, i) => (
                <motion.div
                  key={m.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.55, ease, delay: i * 0.07 }}
                  onMouseEnter={() => setHovered(m.slug)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <Link
                    to={`/team/${m.slug}`}
                    className="group block bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 hover:shadow-[0_24px_60px_-30px_hsl(193_98%_46%/0.35)] transition-all duration-500"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                      {m.image ? (
                        <img
                          src={m.image}
                          alt={m.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                        />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-secondary to-secondary/80">
                          <span className="display-serif text-6xl text-primary/80">{m.initials}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] uppercase tracking-[0.22em] text-background/90 bg-secondary/60 backdrop-blur px-2.5 py-1 rounded">
                          {m.unit}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-background/90 grid place-items-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all">
                        <ArrowUpRight className="w-4 h-4 text-secondary" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="display-serif text-2xl text-background leading-tight">{m.name}</div>
                        <div className="mt-1 text-xs text-background/80 line-clamp-2">{m.role}</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-secondary/75 leading-relaxed line-clamp-3">{m.short}</p>
                      <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-medium">
                        View Profile <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="text-xs uppercase tracking-[0.28em] text-primary font-medium mb-4">Why Work With Us</div>
              <h2 className="display-serif text-4xl md:text-5xl text-secondary leading-tight">
                Build a career rooted in <span className="italic text-primary">precision</span> and purpose.
              </h2>
              <p className="mt-6 text-secondary/70 leading-relaxed">
                We bring together legal expertise, linguistic excellence, and modern technology to support clients across borders. Our culture rewards rigour, integrity, and continuous learning.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: Sparkles, title: "Professional Environment", text: "Structured workflows, clear standards, and a culture that values craft and accountability." },
                { icon: GraduationCap, title: "Growth Opportunities", text: "Continuous learning across legal, linguistic, and technology disciplines." },
                { icon: Globe2, title: "International Exposure", text: "Work on cross-border, multi-jurisdictional documentation with global clients." },
                { icon: Users, title: "Multidisciplinary Teams", text: "Collaborate with attorneys, linguists, engineers, and quality specialists." },
              ].map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                  className="p-7 rounded-2xl bg-card border border-border/60 hover:border-primary/40 hover:shadow-lg transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 grid place-items-center mb-5">
                    <b.icon className="w-5 h-5 text-primary" strokeWidth={1.6} />
                  </div>
                  <div className="display-serif text-xl text-secondary mb-2">{b.title}</div>
                  <p className="text-sm text-secondary/70 leading-relaxed">{b.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section id="positions" className="py-20 md:py-28">
        <div className="container-editorial">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase tracking-[0.28em] text-primary font-medium mb-4">Open Positions</div>
            <h2 className="display-serif text-4xl md:text-5xl text-secondary leading-tight">
              Join a team committed to <span className="italic">global standards</span>.
            </h2>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {openPositions.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-7 hover:px-4 transition-all"
              >
                <div>
                  <div className="display-serif text-2xl text-secondary group-hover:text-primary transition-colors">{p.title}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-secondary/65">
                    <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" strokeWidth={1.5} /> {p.location}</span>
                    <span className="inline-flex items-center gap-1.5"><Briefcase className="w-4 h-4" strokeWidth={1.5} /> {p.type}</span>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-secondary/20 rounded-md text-sm font-medium text-secondary hover:bg-secondary hover:text-background transition-all"
                >
                  Apply <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-secondary text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.18),transparent_60%)]" />
        <div className="container-editorial relative text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="display-serif text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl mx-auto"
          >
            Join a team committed to <span className="italic text-primary">precision</span>, professionalism, and international standards.
          </motion.h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all">
              Get in Touch <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a href="#team" className="inline-flex items-center gap-2 px-7 py-3.5 border border-background/30 text-background rounded-md text-sm font-medium hover:border-primary hover:text-primary transition-all">
              Meet the Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CareersPage;
