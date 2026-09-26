-- Reader reviews collected from Amazon, Goodreads, Instagram, etc.
-- Run this once in the Supabase dashboard: SQL Editor → New query → paste → Run.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  credential text,
  quote text not null,
  source text not null default 'Amazon',
  source_url text,
  rating smallint check (rating between 1 and 5),
  published boolean not null default true,
  created_at bigint not null default (extract(epoch from now()) * 1000)::bigint
);

alter table public.reviews enable row level security;

-- Anyone visiting the site can read published reviews.
create policy "Public can read published reviews"
  on public.reviews for select
  using (published = true);

-- The logged-in admin can read, add, edit and delete everything.
create policy "Admin can manage reviews"
  on public.reviews for all
  to authenticated
  using (true)
  with check (true);
