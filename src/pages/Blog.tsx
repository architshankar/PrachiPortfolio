import { useEffect, useMemo, useState } from "react";
import { type Post, getAllPosts } from "@/lib/posts";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PostCard } from "@/components/blog/PostCard";
import { FilterTabs } from "@/components/blog/FilterTabs";
import { Search } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<"all" | "original" | "linked">("all");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAllPosts(true);
      setPosts(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    let arr = filter === "all" ? posts : posts.filter((p) => p.type === filter);
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter((p) => p.title.toLowerCase().includes(s) || p.excerpt.toLowerCase().includes(s));
    }
    return arr;
  }, [posts, filter, q]);

  return (
    <div className="min-h-screen bg-cream">
      <SEO 
        title="Journal | Prachi Shankar" 
        description="Essays, thoughts, and writings by Prachi Shankar." 
      />
      <Nav />
      <main className="pt-32 pb-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="label-eyebrow">All essays — Journal</div>
          <h1 className="display-serif text-navy mt-4 mb-12" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
            Things I've been<br /><span className="italic-accent">writing.</span>
          </h1>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div className="relative w-full md:max-w-sm">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                maxLength={100}
                placeholder="Search essays…"
                className="w-full pl-11 pr-4 py-3 border border-navy/20 bg-transparent font-serif italic placeholder:text-navy/40 focus:border-navy outline-none"
              />
            </div>
            <FilterTabs value={filter} onChange={setFilter} />
          </div>

          {loading ? (
            <div className="flex justify-center p-16 text-navy/60">Loading essays...</div>
          ) : filtered.length === 0 ? (
            <div className="border border-dashed border-navy/20 p-16 text-center text-navy/60">
              No essays match.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {filtered.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
