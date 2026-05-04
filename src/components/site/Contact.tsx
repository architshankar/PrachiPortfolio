import { useState } from "react";
import { profile } from "@/data/profile";
import { Mail, MapPin, Send, ArrowUpRight } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Message saved — Prachi will reach out soon.");
      setForm({ name: "", email: "", message: "" });
      setSubmitting(false);
    }, 600);
  };

  return (
    <section id="contact" className="navy-section py-28">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid md:grid-cols-2 gap-16">
        <div>
          <div className="label-eyebrow">08 — Contact</div>
          <h2 className="display-serif mt-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            Let's build<br />something<br /><span className="italic-accent">honest.</span>
          </h2>
          <p className="mt-8 text-cream/75 max-w-md leading-relaxed">
            For collaborations on writing, speaking, consulting, or simply a note that says hello — my inbox is always open.
          </p>
          <div className="mt-10 space-y-4">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 hover:text-gold transition">
              <Mail size={18} className="text-gold" />
              {profile.email}
            </a>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-gold" />
              {profile.city}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-px bg-cream/15 border border-cream/15 mt-10">
            {Object.entries(profile.socials).map(([k, v]) => (
              <a key={k} href={v.url} target="_blank" rel="noreferrer" className="bg-navy p-5 hover:bg-navy-deep transition">
                <div className="flex justify-between items-start">
                  <div className="label-eyebrow text-cream/55">{k}</div>
                  <ArrowUpRight size={14} className="text-cream/55" />
                </div>
                <div className="mt-2 text-sm">{v.handle}</div>
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={onSubmit} className="bg-navy-deep border border-cream/15 p-8 md:p-10">
          <div className="label-eyebrow text-cream/55 mb-6">Send a Note</div>

          {(["name", "email"] as const).map((f) => (
            <div key={f} className="mb-6">
              <label className="label-eyebrow text-cream/55 block mb-2">Your {f}</label>
              <input
                value={form[f]}
                onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                placeholder={f === "email" ? "hello@you.com" : "Maya Krishnan"}
                className="w-full bg-transparent border-b border-cream/20 focus:border-gold outline-none py-2 font-serif text-lg placeholder:text-cream/30"
                maxLength={f === "email" ? 255 : 100}
              />
            </div>
          ))}

          <div className="mb-8">
            <label className="label-eyebrow text-cream/55 block mb-2">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me what you're working on..."
              rows={4}
              maxLength={2000}
              className="w-full bg-transparent border-b border-cream/20 focus:border-gold outline-none py-2 font-serif text-lg placeholder:text-cream/30 resize-none"
            />
          </div>

          <button type="submit" disabled={submitting} className="gold-pill disabled:opacity-60">
            <Send size={14} className="mr-2" />
            {submitting ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
