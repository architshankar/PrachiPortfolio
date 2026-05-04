import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/posts";

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase();
}

export function PostCard({ post, theme = "cream" }: { post: Post; theme?: "cream" | "navy" }) {
  const isLinked = post.type === "linked";
  const href = isLinked ? post.externalUrl! : `/blog/${post.slug}`;
  const target = isLinked ? "_blank" : undefined;

  return (
    <article className={`group flex flex-col ${theme === "navy" ? "bg-navy-deep border border-cream/15" : "bg-cream"}`}>
      <a href={href} target={target} rel={isLinked ? "noreferrer" : undefined} className="block">
        <div className={`aspect-[16/11] overflow-hidden ${theme === "navy" ? "bg-navy" : "bg-muted"}`}>
          {post.coverImage ? (
            <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
          ) : (
            <div className="h-full w-full grid place-items-center font-serif italic opacity-30">
              {post.category}
            </div>
          )}
        </div>
      </a>
      <div className="p-6 flex flex-col flex-1">
        <div className="label-eyebrow flex items-center gap-2">
          <span className={theme === "navy" ? "text-cream/55" : ""}>{post.category}</span>
          <span>·</span>
          <span>{formatDate(post.createdAt)}</span>
          <span className="ml-auto">{post.readTime} min read</span>
        </div>
        <h3 className={`font-serif text-2xl mt-4 leading-tight ${theme === "navy" ? "text-cream" : "text-navy"}`}>
          {post.title}
        </h3>
        <p className={`mt-3 text-sm leading-relaxed flex-1 ${theme === "navy" ? "text-cream/70" : "text-navy/70"}`}>
          {post.excerpt}
        </p>
        <div className="hairline my-5" />
        <div className="flex items-center justify-between">
          <a
            href={href}
            target={target}
            rel={isLinked ? "noreferrer" : undefined}
            className={`label-eyebrow flex items-center gap-2 hover:text-gold transition ${theme === "navy" ? "text-cream" : "text-navy"}`}
          >
            {isLinked ? "Read on " + new URL(post.externalUrl!).hostname.replace("www.", "") : "Read essay"}
            <ArrowUpRight size={14} />
          </a>
          <span className="label-eyebrow text-gold">{isLinked ? "Linked" : "Original"}</span>
        </div>
      </div>
    </article>
  );
}
