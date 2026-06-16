import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { ArrowLeft } from "lucide-react";
import { versionedImage } from "@/lib/versionedImage";

type Row = {
  title: string; excerpt: string | null; content: string | null;
  cover_image: string | null; category: string | null; author: string | null;
  published_at: string | null; created_at: string; updated_at?: string | null;
};

const InsightDetailPage = () => {
  const { slug } = useParams();
  const [row, setRow] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const { data } = await supabase.from("insights").select("*").eq("slug", slug!).eq("published", true).maybeSingle();
      setRow(data as Row | null);
      setLoading(false);
      if (data) document.title = `${(data as any).title} — BA Afghan Notary Public`;
    })();
  }, [slug]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <article className="container-editorial pt-32 pb-20">
        <Link to="/insights" className="inline-flex items-center gap-2 text-sm text-secondary/60 hover:text-primary mb-8"><ArrowLeft className="w-4 h-4" /> Back to insights</Link>
        {loading ? (
          <div className="text-secondary/50">Loading…</div>
        ) : !row ? (
          <div>
            <h1 className="display-serif text-4xl text-secondary mb-3">Article not found</h1>
            <p className="text-secondary/60">The article you are looking for does not exist or is not yet published.</p>
          </div>
        ) : (
          <>
            {row.category && <div className="text-xs uppercase tracking-[0.25em] text-primary mb-4">{row.category}</div>}
            <h1 className="display-serif text-4xl md:text-6xl text-secondary leading-tight max-w-4xl">{row.title}</h1>
            <div className="mt-4 text-sm text-secondary/60">
              {row.author && <span>{row.author}</span>}
              {row.author && (row.published_at || row.created_at) && <span> · </span>}
              <span>{new Date(row.published_at || row.created_at).toLocaleDateString()}</span>
            </div>
            {row.cover_image && (
              <img src={versionedImage(row.cover_image, row.updated_at) ?? row.cover_image} alt={row.title} className="mt-10 w-full max-h-[520px] object-cover rounded-xl" />
            )}
            {row.excerpt && <p className="mt-10 text-xl text-secondary/80 leading-relaxed max-w-3xl">{row.excerpt}</p>}
            {row.content && (
              <div className="prose prose-lg max-w-3xl mt-10" dangerouslySetInnerHTML={{ __html: row.content }} />
            )}
          </>
        )}
      </article>
      <Footer />
    </main>
  );
};

export default InsightDetailPage;
