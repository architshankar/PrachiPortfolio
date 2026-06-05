// import { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { slugify, estimateReadTime, type Post, getPostBySlug, savePost, getAllPosts, deletePost, togglePublish } from "@/lib/posts";
// import { adminAuth } from "@/lib/adminAuth";
// import { RichEditor } from "@/components/admin/RichEditor";
// import { ArrowLeft, Save, Trash2, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { z } from "zod";

// const baseSchema = z.object({
//   title: z.string().trim().min(1, "Title required").max(200),
//   slug: z.string().trim().min(1, "Slug required").max(100),
//   category: z.string().trim().min(1, "Category required").max(50),
//   excerpt: z.string().trim().min(1, "Excerpt required").max(500),
// });

// const emptyPost = (): Post => ({
//   id: crypto.randomUUID(),
//   title: "",
//   slug: "",
//   type: "original",
//   category: "Personal",
//   excerpt: "",
//   bodyHtml: "",
//   externalUrl: "",
//   readTime: 1,
//   published: false,
//   createdAt: Date.now(),
// });

// export default function AdminEditor() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [post, setPost] = useState<Post>(emptyPost());
//   const [slugTouched, setSlugTouched] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     adminAuth.checkSession().then((isAuthed) => {
//       if (!isAuthed) {
//         navigate("/admin/login");
//         return;
//       }
      
//       async function load() {
//         if (id) {
//           // Find existing post by ID
//           const all = await getAllPosts(false);
//         const existing = all.find(p => p.id === id);
//         if (existing) {
//           setPost(existing);
//           setSlugTouched(true);
//         }
//       }
//       }
//       load();
//     });
//   }, [id, navigate]);

//   const update = (patch: Partial<Post>) => setPost((p) => ({ ...p, ...patch }));

//   const onTitle = (title: string) => {
//     update({ title, ...(slugTouched ? {} : { slug: slugify(title) }) });
//   };

//   const onCover = (file: File) => {
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Image must be under 5MB");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = () => update({ coverImage: reader.result as string });
//     reader.readAsDataURL(file);
//   };

//   const save = async () => {
//     const parsed = baseSchema.safeParse(post);
//     if (!parsed.success) {
//       toast.error(parsed.error.errors[0].message);
//       return;
//     }
//     if (post.type === "linked") {
//       try { new URL(post.externalUrl || ""); }
//       catch { toast.error("Valid external URL required for Linked posts"); return; }
//     } else if (!post.bodyHtml || post.bodyHtml.replace(/<[^>]+>/g, "").trim().length < 10) {
//       toast.error("Write some content for your essay");
//       return;
//     }

//     const finalPost: Post = {
//       ...post,
//       slug: slugify(post.slug),
//       readTime: post.type === "original" ? estimateReadTime(post.bodyHtml || "") : post.readTime || 3,
//     };
    
//     setIsSaving(true);
//     const saved = await savePost(finalPost);
//     setIsSaving(false);

//     if (saved) {
//       // Set the returned post in case its id/dates were updated
//       setPost(saved);
//       toast.success("Saved");
//       navigate("/admin");
//     } else {
//       toast.error("Failed to save post");
//     }
//   };

//   const handleDelete = async () => {
//     if (!id) return;
//     if (confirm("Are you sure you want to delete this post?")) {
//       await deletePost(id);
//       toast.success("Deleted post");
//       navigate("/admin");
//     }
//   };

//   const handleTogglePublish = async (checked: boolean) => {
//     update({ published: checked });
//     // If we have an ID (it's an existing post already in DB), toggle it immediately in DB too.
//     if (id) {
//        await togglePublish(id, checked);
//        toast.success(checked ? "Published" : "Unpublished");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-cream">
//       <header className="bg-navy text-cream sticky top-0 z-40">
//         <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-20 flex items-center justify-between">
//           <Link to="/admin" className="label-eyebrow flex items-center gap-2 hover:text-gold">
//             <ArrowLeft size={14} /> Back
//           </Link>
//           <div className="flex items-center gap-4">
//             <label className="label-eyebrow flex items-center gap-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={post.published}
//                 onChange={(e) => handleTogglePublish(e.target.checked)}
//                 className="accent-gold"
//                 disabled={isSaving}
//               />
//               Published
//             </label>
//             <button onClick={save} className="gold-pill flex items-center" disabled={isSaving}>
//               {isSaving ? (
//                 <>
//                   <Loader2 size={14} className="mr-2 animate-spin" /> Saving...
//                 </>
//               ) : (
//                 <>
//                   <Save size={14} className="mr-2" /> Save
//                 </>
//               )}
//             </button>
//             {id && (
//               <button 
//                 onClick={handleDelete} 
//                 className="p-2 hover:bg-destructive/10 text-destructive rounded ml-2" 
//                 title="Delete Post"
//                 disabled={isSaving}
//               >
//                 <Trash2 size={16} />
//               </button>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Overlay to prevent editing while saving */}
//       {isSaving && (
//         <div className="fixed inset-0 z-50 bg-cream/50 backdrop-blur-sm flex items-center justify-center pointer-events-auto">
//           <div className="bg-navy text-cream px-6 py-4 rounded-lg flex flex-col items-center shadow-xl">
//             <Loader2 size={32} className="animate-spin mb-3 text-gold" />
//             <div className="font-serif text-lg">Saving your essay...</div>
//           </div>
//         </div>
//       )}

//       <main className="mx-auto max-w-4xl px-6 md:px-10 py-12 space-y-8">
//         <div>
//           <label className="label-eyebrow block mb-2">Title</label>
//           <input
//             value={post.title}
//             onChange={(e) => onTitle(e.target.value)}
//             placeholder="An honest title…"
//             maxLength={200}
//             className="w-full bg-transparent border-b border-navy/20 focus:border-navy outline-none py-3 font-serif text-4xl text-navy placeholder:text-navy/30"
//           />
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="label-eyebrow block mb-2">Slug</label>
//             <input
//               value={post.slug}
//               onChange={(e) => { setSlugTouched(true); update({ slug: e.target.value }); }}
//               maxLength={100}
//               className="w-full border border-navy/20 px-3 py-2 font-mono text-sm bg-cream"
//             />
//           </div>
//           <div>
//             <label className="label-eyebrow block mb-2">Category</label>
//             <input
//               value={post.category}
//               onChange={(e) => update({ category: e.target.value })}
//               maxLength={50}
//               placeholder="Personal · Books · Career"
//               className="w-full border border-navy/20 px-3 py-2 bg-cream"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="label-eyebrow block mb-3">Type</label>
//           <div className="flex gap-3">
//             {(["original", "linked"] as const).map((t) => (
//               <button
//                 key={t}
//                 onClick={() => update({ type: t })}
//                 className={`px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] border ${
//                   post.type === t ? "bg-navy text-cream border-navy" : "border-navy/30 text-navy"
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="label-eyebrow block mb-2">Cover Image</label>
//           <div className="flex items-center gap-4">
//             {post.coverImage && (
//               <img src={post.coverImage} alt="" className="h-20 w-32 object-cover border border-navy/20" />
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => e.target.files?.[0] && onCover(e.target.files[0])}
//               className="block text-sm"
//             />
//             {post.coverImage && (
//               <button onClick={() => update({ coverImage: undefined })} className="text-destructive text-sm">
//                 Remove
//               </button>
//             )}
//           </div>
//         </div>

//         <div>
//           <label className="label-eyebrow block mb-2">Excerpt</label>
//           <textarea
//             value={post.excerpt}
//             onChange={(e) => update({ excerpt: e.target.value })}
//             rows={3}
//             maxLength={500}
//             placeholder="A short summary that appears on cards…"
//             className="w-full border border-navy/20 p-3 bg-cream font-serif italic resize-none"
//           />
//           <div className="label-eyebrow text-right mt-1">{post.excerpt.length}/500</div>
//         </div>

//         {post.type === "linked" ? (
//           <div className="grid md:grid-cols-3 gap-6">
//             <div className="md:col-span-2">
//               <label className="label-eyebrow block mb-2">External URL</label>
//               <input
//                 value={post.externalUrl || ""}
//                 onChange={(e) => update({ externalUrl: e.target.value })}
//                 placeholder="https://linkedin.com/posts/…"
//                 maxLength={500}
//                 className="w-full border border-navy/20 px-3 py-2 bg-cream font-mono text-sm"
//               />
//             </div>
//             <div>
//               <label className="label-eyebrow block mb-2">Read time (min)</label>
//               <input
//                 type="number"
//                 min={1}
//                 max={60}
//                 value={post.readTime}
//                 onChange={(e) => update({ readTime: Math.max(1, parseInt(e.target.value) || 1) })}
//                 className="w-full border border-navy/20 px-3 py-2 bg-cream"
//               />
//             </div>
//           </div>
//         ) : (
//           <div>
//             <label className="label-eyebrow block mb-2">Body</label>
//             <RichEditor value={post.bodyHtml || ""} onChange={(html) => update({ bodyHtml: html })} />
//             <div className="label-eyebrow mt-2">
//               ~{estimateReadTime(post.bodyHtml || "")} min read (auto-calculated)
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }



































import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { slugify, estimateReadTime, type Post, getAllPosts, savePost, deletePost, togglePublish } from "@/lib/posts";
import { adminAuth } from "@/lib/adminAuth";
import { RichEditor } from "@/components/admin/RichEditor";
import { ArrowLeft, Save, Trash2, Loader2, Upload, X, Check } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from "react-image-crop";

// Import mandatory cropping styles safely
import "react-image-crop/dist/ReactCrop.css";

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

// Helper to center the aspect ratio crop on dynamic workspace loads
function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
}

export default function AdminEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>(emptyPost());
  const [slugTouched, setSlugTouched] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Cropper specific workflow states
  const [cropSource, setCropSource] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const ASPECT_RATIO = 16 / 11; // Matches your card container aspect geometry

  useEffect(() => {
    adminAuth.checkSession().then((isAuthed) => {
      if (!isAuthed) {
        navigate("/admin/login");
        return;
      }
      
      async function load() {
        if (id) {
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

  // Intercepting raw file upload to trigger the crop modal workflow
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCropSource(reader.result as string);
      setCrop(undefined); // Clear old tracking references
      setIsCropperOpen(true);
    };
    reader.readAsDataURL(file);
    // Reset selection target so the same image file can re-trigger onchange if closed
    e.target.value = "";
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, ASPECT_RATIO));
  };

  // Extract visual bounding segments into a clean 16:11 DataURL scheme
  const finalizeCrop = async () => {
    if (!imgRef.current || !completedCrop) return;

    const image = imgRef.current;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    update({ coverImage: base64Image || base64Image });
    setIsCropperOpen(false);
    toast.success("Cover layout locked successfully");
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

      {/* Elegant Cropping Workspace Overlay */}
      {isCropperOpen && cropSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-4 backdrop-blur-sm">
          <div className="bg-cream border border-navy/20 rounded-lg shadow-2xl max-w-2xl w-full p-6 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between mb-4 border-b border-navy/10 pb-3">
              <div>
                <h3 className="font-serif text-2xl text-navy">Crop Cover Photo</h3>
                <p className="font-mono text-xs text-navy/60 uppercase tracking-wider mt-1">Locked at 16:11 Aspect Ratio</p>
              </div>
              <button onClick={() => setIsCropperOpen(false)} className="text-navy/50 hover:text-navy">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto bg-navy/5 p-4 rounded border border-navy/10 flex items-center justify-center max-h-[55vh]">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={ASPECT_RATIO}
                keepSelection
              >
                <img
                  ref={imgRef}
                  alt="Crop Workspace"
                  src={cropSource}
                  onLoad={handleImageLoad}
                  className="max-w-full max-h-[50vh] object-contain"
                />
              </ReactCrop>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-3 border-t border-navy/10">
              <button
                type="button"
                onClick={() => setIsCropperOpen(false)}
                className="px-5 py-2.5 font-mono text-xs uppercase tracking-wider border border-navy/30 text-navy hover:bg-navy/5 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={finalizeCrop}
                className="flex items-center gap-2 px-5 py-2.5 font-mono text-xs uppercase tracking-wider bg-navy text-cream hover:bg-navy-deep transition"
              >
                <Check size={14} /> Lock Geometry
              </button>
            </div>
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
              className="w-full border border-navy/20 px-3 py-2 font-mono text-sm bg-cream text-navy outline-none focus:border-navy"
            />
          </div>
          <div>
            <label className="label-eyebrow block mb-2">Category</label>
            <input
              value={post.category}
              onChange={(e) => update({ category: e.target.value })}
              maxLength={50}
              placeholder="Personal · Books · Career"
              className="w-full border border-navy/20 px-3 py-2 bg-cream text-navy outline-none focus:border-navy"
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
          <div className="flex items-center gap-6">
            {post.coverImage ? (
              <div className="relative group rounded border border-navy/20 overflow-hidden h-24 w-40 bg-muted">
                <img src={post.coverImage} alt="Essay Banner Preview" className="h-full w-full object-cover" />
                <button 
                  onClick={() => update({ coverImage: undefined })}
                  className="absolute inset-0 bg-navy/60 flex items-center justify-center opacity-0 group-hover:opacity-100 text-cream text-xs font-mono tracking-wider transition duration-200"
                >
                  REMOVE
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-24 w-40 border border-dashed border-navy/30 bg-cream-soft hover:border-navy cursor-pointer rounded transition">
                <Upload size={18} className="text-navy/40 mb-1" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-navy/60">Upload Cover</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
            <div className="text-xs font-mono text-navy/50 max-w-xs leading-relaxed">
              {post.coverImage 
                ? "Perfect 16:11 alignment enabled. Preview shows active card configuration layout." 
                : "Uploading images automatically opens a geometry adjustment lens utility framework."
              }
            </div>
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
            className="w-full border border-navy/20 p-3 bg-cream text-navy outline-none focus:border-navy font-serif italic resize-none"
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
                className="w-full border border-navy/20 px-3 py-2 bg-cream font-mono text-sm text-navy outline-none focus:border-navy"
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
                className="w-full border border-navy/20 px-3 py-2 bg-cream text-navy outline-none focus:border-navy"
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