import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { getMemberBySlug, team, type TeamMember } from "@/data/team";
import { supabase } from "@/integrations/supabase/client";
import { versionedImage } from "@/lib/versionedImage";

const ease = [0.22, 1, 0.36, 1] as const;

const TeamMemberPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const staticMember = slug ? getMemberBySlug(slug) : undefined;
  const [member, setMember] = useState<TeamMember | undefined>(staticMember);
  const [bioHtml, setBioHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) return;
    (async () => {
      const { data } = await supabase.from("team_members").select("*").eq("slug", slug).maybeSingle();
      if (data) {
        const rawBio = data.bio ?? "";
        const isHtml = /<[a-z][\s\S]*>/i.test(rawBio);
        const m: TeamMember = {
          slug: data.slug,
          name: data.name,
          role: data.position ?? staticMember?.role ?? "",
          unit: data.position ?? staticMember?.unit ?? "",
          category: staticMember?.category ?? "leadership",
          image: versionedImage(data.photo, data.updated_at) ?? staticMember?.image ?? null,
          initials: (data.name || "").split(" ").map((p: string) => p[0]).slice(0, 2).join("").toUpperCase(),
          short: data.short_intro ?? staticMember?.short ?? "",
          intro: data.short_intro ?? staticMember?.intro ?? "",
          bio: isHtml ? [] : rawBio ? [rawBio] : staticMember?.bio ?? [],
          expertise: staticMember?.expertise ?? [],
        };
        setMember(m);
        setBioHtml(isHtml ? rawBio : null);
        document.title = `${m.name} — BA Afghan Notary Public`;
      } else if (staticMember) {
        setMember(staticMember);
        document.title = `${staticMember.name} — BA Afghan Notary Public`;
      }
      setLoading(false);
    })();
  }, [slug, staticMember]);

  if (loading && !member) return <div className="min-h-screen grid place-items-center"><div className="text-secondary/50">Loading…</div></div>;
  if (!member) return <Navigate to="/careers" replace />;

  const others = team.filter((m) => m.slug !== member.slug).slice(0, 3);


  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* HERO PROFILE */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background" />
        <div className="absolute top-20 right-0 w-[420px] h-[420px] bg-primary/10 rounded-full blur-3xl" />

        <div className="container-editorial relative">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-secondary/70 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Team
            </Link>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.1 }}
                className="text-xs uppercase tracking-[0.28em] text-primary font-medium mb-5"
              >
                {member.unit}
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.15 }}
                className="display-serif text-5xl md:text-6xl lg:text-7xl text-secondary leading-[1.05] tracking-tight"
              >
                {member.name}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.25 }}
                className="mt-5 text-lg md:text-xl text-primary"
              >
                {member.role}
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.35 }}
                className="mt-8 text-lg text-secondary/75 leading-relaxed max-w-2xl"
              >
                {member.intro}
              </motion.p>

              {/* Expertise chips */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.45 }}
                className="mt-10"
              >
                <div className="text-xs uppercase tracking-[0.22em] text-secondary/60 mb-4">Areas of Expertise</div>
                <div className="flex flex-wrap gap-2.5">
                  {member.expertise.map((e) => (
                    <span key={e} className="inline-flex items-center gap-2 px-3.5 py-2 bg-card border border-border rounded-full text-xs text-secondary/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" strokeWidth={2} /> {e}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-secondary shadow-2xl"
              >
                {member.image ? (
                  <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-secondary to-secondary/80">
                    <span className="display-serif text-8xl text-primary/80">{member.initials}</span>
                  </div>
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-background/10" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* BIOGRAPHY */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container-editorial max-w-5xl">
          <div className="text-xs uppercase tracking-[0.28em] text-primary font-medium mb-5">Biography</div>
          <h2 className="display-serif text-3xl md:text-4xl text-secondary leading-tight mb-12 max-w-3xl">
            A career defined by integrity, expertise, and global standards.
          </h2>
          {bioHtml ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease }}
              className="bio-rich-content text-secondary/80 leading-[1.85] text-[15.5px] md:columns-2 md:gap-12 [column-fill:_balance]"
              dangerouslySetInnerHTML={{ __html: bioHtml }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
              {member.bio.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease, delay: i * 0.06 }}
                  className="text-secondary/80 leading-[1.85] text-[15.5px]"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* OTHER MEMBERS */}
      <section className="py-20 md:py-24">
        <div className="container-editorial">
          <div className="flex items-end justify-between mb-10">
            <h3 className="display-serif text-3xl md:text-4xl text-secondary">Meet other team members</h3>
            <Link to="/careers" className="hidden md:inline-flex items-center gap-2 text-sm text-primary hover:underline">
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {others.map((m) => (
              <Link
                key={m.slug}
                to={`/team/${m.slug}`}
                className="group block bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  {m.image ? (
                    <img src={m.image} alt={m.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-secondary to-secondary/80">
                      <span className="display-serif text-6xl text-primary/80">{m.initials}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="display-serif text-xl text-background leading-tight">{m.name}</div>
                    <div className="mt-1 text-xs text-background/80 line-clamp-2">{m.role}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TeamMemberPage;
