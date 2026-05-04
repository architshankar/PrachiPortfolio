import { supabase } from "./supabase";

export type PostType = "original" | "linked";

export interface Post {
  id: string;
  title: string;
  slug: string;
  type: PostType;
  category: string;
  coverImage?: string; 
  excerpt: string;
  bodyHtml?: string;       
  externalUrl?: string;    
  readTime: number;        
  published: boolean;
  createdAt: number;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function mapPost(row: any): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    type: row.type,
    category: row.category,
    coverImage: row.cover_image ?? undefined,
    excerpt: row.excerpt,
    bodyHtml: row.content ?? undefined,
    externalUrl: row.external_url ?? undefined,
    readTime: row.read_time,
    published: row.published,
    createdAt: Number(row.created_at),
  };
}

export async function getAllPosts(publishedOnly = true): Promise<Post[]> {
  let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
  
  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
  return data.map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single();
  if (error || !data) {
    if (error?.code !== 'PGRST116') {
      console.error(`Error fetching post with slug ${slug}:`, error);
    }
    return undefined;
  }
  return mapPost(data);
}

export async function savePost(post: Post): Promise<Post | null> {
  const row = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    type: post.type,
    category: post.category,
    cover_image: post.coverImage,
    excerpt: post.excerpt,
    content: post.bodyHtml,
    external_url: post.externalUrl,
    read_time: post.readTime,
    published: post.published,
    created_at: post.createdAt,
  };

  const { data, error } = await supabase.from("posts").upsert(row).select().single();
  if (error) {
    console.error("Error saving post:", error);
    return null;
  }
  return mapPost(data);
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    console.error("Error deleting post:", error);
    return false;
  }
  return true;
}

export async function togglePublish(id: string, published: boolean): Promise<boolean> {
  const { error } = await supabase.from("posts").update({ published }).eq("id", id);
  if (error) {
    console.error("Error toggling publish state:", error);
    return false;
  }
  return true;
}