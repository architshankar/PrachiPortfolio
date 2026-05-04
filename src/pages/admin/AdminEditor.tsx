import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { slugify, estimateReadTime, type Post, getPostBySlug, savePost, getAllPosts, deletePost, togglePublish } from "@/lib/posts";
import { adminAuth } from "@/lib/adminAuth";
import { RichEditor } from "@/components/admin/RichEditor";
import { ArrowLeft, Save, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const baseSchema = z.object({
  title: z.string().trim().min(1, "Title required").max(200),
  slug: z.string().trim().min(1, "Slug required").max(100),
  category: z.string().trim().min(1, "Category required").max(50),
  excerpt: z.string().trim().min(1, "Excerpt required").max(500),
});

const emptyPost = (): Post => ({
  id: crypto.randomUUID(),
  title: "",
  slug: "",
  type: "original",
  category: "Personal",
  excerpt: "",
  bodyHtml: "",
  externalUrl: "",
  readTime: 1,
  published: false,
  createdAt: Date.now(),
});

export default function AdminEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>(emptyPost());
  const [slugTouched, setSlugTouched] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    adminAuth.checkSession().then((isAuthed) => {
      if (!isAuthed) {
        navigate("/admin/login");
        return;
      }
      
      async function load() {
        if (id) {
          // Find existing post by ID
          const all = await getAllPosts(false);
        const existing = all.find(p => p.id === id);
        if (existing) {
          setPost(existing);
          setSlugTouched(true);
        }
      }
      }
      load();
    });
  }, [id, navigate]);

  const update = (patch: Partial<Post>) => setPost((p) => ({ ...p, ...patch }));

  const onTitle = (title: string) => {
    update({ title, ...(slugTouched ? {} : { slug: slugify(title) }) });
  };

  const onCover = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update({ coverImage: reader.result as string });
    reader.readAsDataURL(file);
  };

  const save = async () => {
    const parsed = baseSchema.safeParse(post);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    if (post.type === "linked") {
      try { new URL(post.externalUrl || ""); }
      catch { toast.error("Valid external URL required for Linked posts"); return; }
    } else if (!post.bodyHtml || post.bodyHtml.replace(/<[^>]+>/g, "").trim().length < 10) {
      toast.error("Write some content for your essay");
      return;
    }

    const finalPost: Post = {
      ...post,
      slug: slugify(post.slug),
      readTime: post.type === "original" ? estimateReadTime(post.bodyHtml || "") : post.readTime || 3,
    };
    
    setIsSaving(true);
    const saved = await savePost(finalPost);
    setIsSaving(false);

    if (saved) {
      // Set the returned post in case its id/dates were updated
      setPost(saved);
      toast.success("Saved");
      navigate("/admin");
    } else {
      toast.error("Failed to save post");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
      toast.success("Deleted post");
      navigate("/admin");
    }
  };

  const handleTogglePublish = async (checked: boolean) => {
    update({ published: checked });
    // If we have an ID (it's an existing post already in DB), toggle it immediately in DB too.
    if (id) {
       await togglePublish(id, checked);
       toast.success(checked ? "Published" : "Unpublished");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-navy text-cream sticky top-0 z-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-20 flex items-center justify-between">
          <Link to="/admin" className="label-eyebrow flex items-center gap-2 hover:text-gold">
            <ArrowLeft size={14} /> Back
          </Link>
          <div className="flex items-center gap-4">
            <label className="label-eyebrow flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={post.published}
                onChange={(e) => handleTogglePublish(e.target.checked)}
                className="accent-gold"
                disabled={isSaving}
              />
              Published
            </label>
            <button onClick={save} className="gold-pill flex items-center" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 size={14} className="mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save size={14} className="mr-2" /> Save
                </>
              )}
            </button>
            {id && (
              <button 
                onClick={handleDelete} 
                className="p-2 hover:bg-destructive/10 text-destructive rounded ml-2" 
                title="Delete Post"
                disabled={isSaving}
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Overlay to prevent editing while saving */}
      {isSaving && (
        <div className="fixed inset-0 z-50 bg-cream/50 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
          <div className="bg-navy text-cream px-6 py-4 rounded-lg flex flex-col items-center shadow-xl">
            <Loader2 size={32} className="animate-spin mb-3 text-gold" />
            <div className="font-serif text-lg">Saving your essay...</div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-4xl px-6 md:px-10 py-12 space-y-8">
        <div>
          <label className="label-eyebrow block mb-2">Title</label>
          <input
            value={post.title}
            onChange={(e) => onTitle(e.target.value)}
            placeholder="An honest title…"
            maxLength={200}
            className="w-full bg-transparent border-b border-navy/20 focus:border-navy outline-none py-3 font-serif text-4xl text-navy placeholder:text-navy/30"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label-eyebrow block mb-2">Slug</label>
            <input
              value={post.slug}
              onChange={(e) => { setSlugTouched(true); update({ slug: e.target.value }); }}
              maxLength={100}
              className="w-full border border-navy/20 px-3 py-2 font-mono text-sm bg-cream"
            />
          </div>
          <div>
            <label className="label-eyebrow block mb-2">Category</label>
            <input
              value={post.category}
              onChange={(e) => update({ category: e.target.value })}
              maxLength={50}
              placeholder="Personal · Books · Career"
              className="w-full border border-navy/20 px-3 py-2 bg-cream"
            />
          </div>
        </div>

        <div>
          <label className="label-eyebrow block mb-3">Type</label>
          <div className="flex gap-3">
            {(["original", "linked"] as const).map((t) => (
              <button
                key={t}
                onClick={() => update({ type: t })}
                className={`px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] border ${
                  post.type === t ? "bg-navy text-cream border-navy" : "border-navy/30 text-navy"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label-eyebrow block mb-2">Cover Image</label>
          <div className="flex items-center gap-4">
            {post.coverImage && (
              <img src={post.coverImage} alt="" className="h-20 w-32 object-cover border border-navy/20" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && onCover(e.target.files[0])}
              className="block text-sm"
            />
            {post.coverImage && (
              <button onClick={() => update({ coverImage: undefined })} className="text-destructive text-sm">
                Remove
              </button>
            )}
          </div>
        </div>

        <div>
          <label className="label-eyebrow block mb-2">Excerpt</label>
          <textarea
            value={post.excerpt}
            onChange={(e) => update({ excerpt: e.target.value })}
            rows={3}
            maxLength={500}
            placeholder="A short summary that appears on cards…"
            className="w-full border border-navy/20 p-3 bg-cream font-serif italic resize-none"
          />
          <div className="label-eyebrow text-right mt-1">{post.excerpt.length}/500</div>
        </div>

        {post.type === "linked" ? (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="label-eyebrow block mb-2">External URL</label>
              <input
                value={post.externalUrl || ""}
                onChange={(e) => update({ externalUrl: e.target.value })}
                placeholder="https://linkedin.com/posts/…"
                maxLength={500}
                className="w-full border border-navy/20 px-3 py-2 bg-cream font-mono text-sm"
              />
            </div>
            <div>
              <label className="label-eyebrow block mb-2">Read time (min)</label>
              <input
                type="number"
                min={1}
                max={60}
                value={post.readTime}
                onChange={(e) => update({ readTime: Math.max(1, parseInt(e.target.value) || 1) })}
                className="w-full border border-navy/20 px-3 py-2 bg-cream"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="label-eyebrow block mb-2">Body</label>
            <RichEditor value={post.bodyHtml || ""} onChange={(html) => update({ bodyHtml: html })} />
            <div className="label-eyebrow mt-2">
              ~{estimateReadTime(post.bodyHtml || "")} min read (auto-calculated)
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
