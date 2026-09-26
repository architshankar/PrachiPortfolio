import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  type ReaderReview,
  REVIEW_SOURCES,
  getAllReviews,
  saveReview,
  deleteReview,
  toggleReviewPublish,
} from "@/lib/reviews";
import { adminAuth } from "@/lib/adminAuth";
import { ArrowLeft, Edit, Eye, EyeOff, ExternalLink, Loader2, LogOut, Save, Star, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Reviewer name required").max(120),
  quote: z.string().trim().min(1, "Review text required").max(5000),
  source: z.string().trim().min(1, "Source required").max(50),
});

const emptyReview = (): ReaderReview => ({
  id: crypto.randomUUID(),
  name: "",
  credential: "",
  quote: "",
  source: "Amazon",
  sourceUrl: "",
  rating: 5,
  published: true,
  createdAt: Date.now(),
});

const inputClass = "w-full border border-navy/20 px-3 py-2 bg-cream text-navy outline-none focus:border-navy";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<ReaderReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ReaderReview>(emptyReview());
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const loadReviews = async () => {
    setLoading(true);
    setReviews(await getAllReviews(false));
    setLoading(false);
  };

  useEffect(() => {
    adminAuth.checkSession().then((isAuthed) => {
      if (!isAuthed) {
        navigate("/admin/login");
        return;
      }
      loadReviews();
    });
  }, [navigate]);

  const update = (patch: Partial<ReaderReview>) => setForm((r) => ({ ...r, ...patch }));

  const resetForm = () => {
    setForm(emptyReview());
    setEditing(false);
  };

  const onSave = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    if (form.sourceUrl) {
      try { new URL(form.sourceUrl); }
      catch { toast.error("Link must be a full URL starting with https://"); return; }
    }

    setIsSaving(true);
    const saved = await saveReview({ ...form, name: form.name.trim(), quote: form.quote.trim() });
    setIsSaving(false);

    if (saved) {
      toast.success(editing ? "Review updated" : "Review added");
      resetForm();
      loadReviews();
    } else {
      toast.error("Failed to save review");
    }
  };

  const onEdit = (r: ReaderReview) => {
    setForm({ ...r, credential: r.credential ?? "", sourceUrl: r.sourceUrl ?? "" });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (r: ReaderReview) => {
    if (window.confirm(`Delete the review by "${r.name}"? This can't be undone.`)) {
      if (await deleteReview(r.id)) {
        toast.success("Deleted");
        if (form.id === r.id) resetForm();
        loadReviews();
      } else {
        toast.error("Failed to delete review");
      }
    }
  };

  const onToggle = async (r: ReaderReview) => {
    if (await toggleReviewPublish(r.id, !r.published)) {
      toast.success(r.published ? "Hidden from site" : "Shown on site");
      loadReviews();
    } else {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-navy text-cream">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="label-eyebrow flex items-center gap-2 hover:text-gold">
              <ArrowLeft size={14} /> Essays
            </Link>
            <span className="font-serif text-2xl">Admin</span>
          </div>
          <button
            onClick={async () => { await adminAuth.logout(); navigate("/admin/login"); }}
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
              Your <span className="italic-accent">reviews.</span>
            </h1>
          </div>
          <Link to="/reviews" className="label-eyebrow flex items-center gap-2 hover:text-gold">
            View page <ExternalLink size={14} />
          </Link>
        </div>

        <div className="border border-navy/15 p-6 md:p-8 mb-12 space-y-6">
          <div className="flex items-center justify-between">
            <div className="font-serif text-2xl text-navy">{editing ? "Edit review" : "Add a review"}</div>
            {editing && (
              <button onClick={resetForm} className="label-eyebrow flex items-center gap-1 hover:text-gold">
                <X size={14} /> Cancel edit
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label-eyebrow block mb-2">Reviewer name</label>
              <input
                value={form.name}
                onChange={(e) => update({ name: e.target.value })}
                maxLength={120}
                placeholder="e.g. Ananya S."
                className={inputClass}
              />
            </div>
            <div>
              <label className="label-eyebrow block mb-2">Title / credential (optional)</label>
              <input
                value={form.credential}
                onChange={(e) => update({ credential: e.target.value })}
                maxLength={200}
                placeholder="e.g. Verified Purchase"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="label-eyebrow block mb-2">Review text</label>
            <textarea
              value={form.quote}
              onChange={(e) => update({ quote: e.target.value })}
              rows={5}
              maxLength={5000}
              placeholder="Paste the review here…"
              className={`${inputClass} p-3 font-serif italic resize-y`}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="label-eyebrow block mb-2">Source</label>
              <input
                value={form.source}
                onChange={(e) => update({ source: e.target.value })}
                list="review-sources"
                maxLength={50}
                className={inputClass}
              />
              <datalist id="review-sources">
                {REVIEW_SOURCES.map((s) => <option key={s} value={s} />)}
              </datalist>
            </div>
            <div className="md:col-span-2">
              <label className="label-eyebrow block mb-2">Link to original post</label>
              <input
                value={form.sourceUrl}
                onChange={(e) => update({ sourceUrl: e.target.value })}
                maxLength={1000}
                placeholder="https://www.amazon.in/…"
                className={`${inputClass} font-mono text-sm`}
              />
            </div>
            <div>
              <label className="label-eyebrow block mb-2">Rating</label>
              <div className="flex items-center gap-1 h-[42px]">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => update({ rating: form.rating === n ? undefined : n })}
                    className="text-gold"
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  >
                    <Star size={20} fill={form.rating && n <= form.rating ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="label-eyebrow flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => update({ published: e.target.checked })}
                className="accent-gold"
              />
              Show on site
            </label>
            <button onClick={onSave} className="navy-pill flex items-center" disabled={isSaving}>
              {isSaving ? (
                <><Loader2 size={14} className="mr-2 animate-spin" /> Saving...</>
              ) : (
                <><Save size={14} className="mr-2" /> {editing ? "Update review" : "Add review"}</>
              )}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center text-navy/60">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="border border-dashed border-navy/30 p-16 text-center text-navy/60">
            No reviews yet. Add your first one above.
          </div>
        ) : (
          <div className="border border-navy/15">
            {reviews.map((r) => (
              <div key={r.id} className="grid grid-cols-12 gap-4 items-center p-5 border-b border-navy/10 last:border-b-0">
                <div className="col-span-12 md:col-span-7">
                  <div className="font-serif text-xl text-navy">{r.name}</div>
                  <div className="label-eyebrow mt-1">
                    {r.source}{r.rating ? ` · ${r.rating}★` : ""} · {new Date(r.createdAt).toLocaleDateString()}
                  </div>
                  <p className="text-navy/70 text-sm mt-2 line-clamp-2">{r.quote}</p>
                </div>
                <div className="col-span-4 md:col-span-2">
                  <span className={`label-eyebrow ${r.published ? "text-gold" : "text-navy/40"}`}>
                    {r.published ? "Shown" : "Hidden"}
                  </span>
                </div>
                <div className="col-span-8 md:col-span-3 flex justify-end gap-2">
                  {r.sourceUrl && (
                    <a
                      href={r.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-navy/10 rounded text-navy"
                      title="Open original post"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <button
                    onClick={() => onToggle(r)}
                    className="p-2 hover:bg-navy/10 rounded text-navy"
                    title={r.published ? "Hide" : "Show"}
                  >
                    {r.published ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => onEdit(r)} className="p-2 hover:bg-navy/10 rounded text-navy" title="Edit">
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(r)}
                    className="p-2 hover:bg-destructive/10 rounded text-destructive"
                    title="Delete"
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
