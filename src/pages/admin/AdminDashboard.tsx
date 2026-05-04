import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { type Post, getAllPosts, deletePost, togglePublish } from "@/lib/posts";
import { adminAuth } from "@/lib/adminAuth";
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadPosts = async () => {
    setLoading(true);
    const data = await getAllPosts(false); // get all including drafts
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!adminAuth.isAuthed()) {
      navigate("/admin/login");
      return;
    }
    loadPosts();
  }, [navigate]);

  const onDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"? This can't be undone.`)) {
      const ok = await deletePost(id);
      if (ok) {
        toast.success("Deleted");
        loadPosts();
      } else {
        toast.error("Failed to delete post");
      }
    }
  };

  const handleToggle = async (id: string, published: boolean) => {
    const ok = await togglePublish(id, !published);
    if (ok) {
      toast.success(published ? "Unpublished" : "Published");
      loadPosts();
    } else {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-navy text-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="label-eyebrow flex items-center gap-2 hover:text-gold">
              <ArrowLeft size={14} /> Site
            </Link>
            <span className="font-serif text-2xl">Admin</span>
          </div>
          <button
            onClick={() => { adminAuth.logout(); navigate("/admin/login"); }}
            className="label-eyebrow flex items-center gap-2 hover:text-gold"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 md:px-10 py-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="label-eyebrow">Dashboard</div>
            <h1 className="display-serif text-navy mt-3" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              Your <span className="italic-accent">essays.</span>
            </h1>
          </div>
          <Link to="/admin/new" className="navy-pill">
            <Plus size={14} className="mr-1" /> New Post
          </Link>
        </div>

        {loading ? (
          <div className="p-16 text-center text-navy/60">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="border border-dashed border-navy/30 p-16 text-center text-navy/60">
            No posts yet. <Link to="/admin/new" className="underline">Write your first essay →</Link>
          </div>
        ) : (
          <div className="border border-navy/15">
            {posts.map((p) => (
              <div key={p.id} className="grid grid-cols-12 gap-4 items-center p-5 border-b border-navy/10 last:border-b-0">
                <div className="col-span-12 md:col-span-6">
                  <div className="font-serif text-xl text-navy">{p.title}</div>
                  <div className="label-eyebrow mt-1">
                    {p.category} · {p.type} · {new Date(p.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="col-span-4 md:col-span-2">
                  <span className={`label-eyebrow ${p.published ? "text-gold" : "text-navy/40"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="col-span-8 md:col-span-4 flex justify-end gap-2">
                  <button
                    onClick={() => handleToggle(p.id, p.published)}
                    className="p-2 hover:bg-navy/10 rounded text-navy"
                    title={p.published ? "Unpublish" : "Publish"}
                  >
                    {p.published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <Link to={`/admin/edit/${p.id}`} className="p-2 hover:bg-navy/10 rounded text-navy">
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => onDelete(p.id, p.title)}
                    className="p-2 hover:bg-destructive/10 rounded text-destructive"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
