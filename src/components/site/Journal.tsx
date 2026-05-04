import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Post, getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { FilterTabs } from "@/components/blog/FilterTabs";
import { ArrowUpRight } from "lucide-react";

export function Journal() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<"all" | "original" | "linked">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAllPosts(true);
      setPosts(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = (filter === "all" ? posts : posts.filter((p) => p.type === filter)).slice(0, 3);

  return (
    <section className="bg-cream py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 items-end">
          <div className="md:col-span-8">
            <div className="label-eyebrow">05 — Journal</div>
            <h2 className="display-serif text-navy mt-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              Observations & <span className="italic-accent">reflections.</span>
            </h2>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <FilterTabs value={filter} onChange={setFilter} />
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center text-navy/60">Loading essays...</div>
        ) : filtered.length === 0 ? (
          <div className="border border-dashed border-navy/20 p-16 text-center text-navy/60">
            No essays yet — head to <Link to="/admin" className="underline">/admin</Link> to write the first one.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {filtered.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-end">
          <Link to="/blog" className="label-eyebrow text-navy flex items-center gap-2 hover:text-gold transition">
            View all essays <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
