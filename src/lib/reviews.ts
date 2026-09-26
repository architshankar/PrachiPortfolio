import { supabase } from "./supabase";

export const REVIEW_SOURCES = ["Amazon", "Goodreads", "Flipkart", "Instagram", "LinkedIn", "Other"];

export interface ReaderReview {
  id: string;
  name: string;
  credential?: string;
  quote: string;
  source: string;
  sourceUrl?: string;
  rating?: number;
  published: boolean;
  createdAt: number;
}

function mapReview(row: any): ReaderReview {
  return {
    id: row.id,
    name: row.name,
    credential: row.credential ?? undefined,
    quote: row.quote,
    source: row.source,
    sourceUrl: row.source_url ?? undefined,
    rating: row.rating ?? undefined,
    published: row.published,
    createdAt: Number(row.created_at),
  };
}

export async function getAllReviews(publishedOnly = true): Promise<ReaderReview[]> {
  let query = supabase.from("reviews").select("*").order("created_at", { ascending: false });

  if (publishedOnly) {
    query = query.eq("published", true);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
  return data.map(mapReview);
}

export async function saveReview(review: ReaderReview): Promise<ReaderReview | null> {
  const row = {
    id: review.id,
    name: review.name,
    credential: review.credential || null,
    quote: review.quote,
    source: review.source,
    source_url: review.sourceUrl || null,
    rating: review.rating ?? null,
    published: review.published,
    created_at: review.createdAt,
  };

  const { data, error } = await supabase.from("reviews").upsert(row).select().single();
  if (error) {
    console.error("Error saving review:", error);
    return null;
  }
  return mapReview(data);
}

export async function deleteReview(id: string): Promise<boolean> {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) {
    console.error("Error deleting review:", error);
    return false;
  }
  return true;
}

export async function toggleReviewPublish(id: string, published: boolean): Promise<boolean> {
  const { error } = await supabase.from("reviews").update({ published }).eq("id", id);
  if (error) {
    console.error("Error toggling review visibility:", error);
    return false;
  }
  return true;
}
