import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { type Post, getPostBySlug } from "@/lib/posts";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import DOMPurify from "dompurify";

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (slug) {
        const data = await getPostBySlug(slug);
        setPost(data);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-navy/60">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-cream">
        <Nav variant="cream" />
        <main className="pt-40 pb-28 text-center">
          <h1 className="display-serif text-navy text-5xl">Essay not found</h1>
          <Link to="/blog" className="label-eyebrow mt-6 inline-block hover:text-gold">← Back to journal</Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (post.type === "linked") {
    return (
      <div className="min-h-screen bg-cream">
        <Nav variant="cream" />
        <main className="pt-32 pb-28">
          <div className="mx-auto max-w-3xl px-6 md:px-10">
            <Link to="/blog" className="label-eyebrow flex items-center gap-2 hover:text-gold mb-10">
              <ArrowLeft size={14} /> Back to journal
            </Link>
            <div className="label-eyebrow">{post.category} · {formatDate(post.createdAt)} · Linked</div>
            <h1 className="display-serif text-navy mt-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              {post.title}
            </h1>
            <p className="font-serif italic text-navy/80 text-2xl mt-8 leading-snug">{post.excerpt}</p>
            <div className="mt-12 p-10 bg-navy text-cream text-center">
              <div className="label-eyebrow text-cream/55 mb-4">Read the full piece on</div>
              <a href={post.externalUrl} target="_blank" rel="noreferrer" className="gold-pill">
                {new URL(post.externalUrl!).hostname.replace("www.", "")} <ArrowUpRight size={14} className="ml-2" />
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Nav variant="cream" />
      <main className="pt-32 pb-28">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Link to="/blog" className="label-eyebrow flex items-center gap-2 hover:text-gold mb-10">
            <ArrowLeft size={14} /> Back to journal
          </Link>
          <div className="label-eyebrow">{post.category} · {formatDate(post.createdAt)} · {post.readTime} min read</div>
          <h1 className="display-serif text-navy mt-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            {post.title}
          </h1>
          <p className="font-serif italic text-navy/80 text-2xl mt-8 leading-snug">{post.excerpt}</p>

          {post.coverImage && (
            <div className="mt-10 aspect-[16/9] overflow-hidden">
              <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover" />
            </div>
          )}

          <div className="hairline my-10" />
          <div
            className="editor-content text-navy"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.bodyHtml || "") }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
