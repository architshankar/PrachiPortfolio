## Prachi Shankar — Personal Site & Blog Portal

A navy + cream editorial portfolio matching the reference screenshots, plus a private `/admin` route where Prachi can publish blog posts (Original or Linked) using a rich-text editor.

---

### Design direction

- **Palette**: Deep navy `#0F1B3D` and cream `#F4EFE6`, with a muted gold accent `#C9A84C` for CTAs and highlights.
- **Typography**: Serif display (Playfair / Cormorant style) for headlines with italic accents on key words; clean sans-serif (Inter) for body; small uppercase mono labels for section numbering ("01 — ABOUT").
- **Tone**: Editorial, calm, generous whitespace, alternating cream and navy bands between sections.

---

### Public site (`/`) — single scroll page

A long-form scroll matching the reference, with a sticky top nav (logo "P · PRACHI SHANKAR" left; About / Journey / Books / Blog / Contact + gold "SAY HELLO" pill right).

1. **Hero** — name, "MBA · SIBM Pune / Analyst · Accenture", portrait area, "Good but Never Good Enough — Releasing Soon" callout, oversized serif "Prachi" type as a graphic element.
2. **01 — About** — "The girl who almost *made it.*" with the pull-quote bio and three supporting paragraphs. Stat row: 9.03 B.Tech GPA · 2 books co-authored · 2,339 followers · 500+ connections.
3. **02 — Education** — Four cards in a 2×2 grid on navy: SIBM Pune (MBA), IIIT Allahabad (B.Tech, GPA 9.03), Notre Dame Academy (95%), Cathedral Sr Sec (10 CGPA). Below: Certifications row (LinkedIn courses).
4. **03 — Experience** — "Roles, *rooms* and reasons." Numbered list of all five roles (Accenture, SIBM Research, SIBM Aspirant Relations, Siemens, Internshala) with dates and locations.
5. **04 — Books & Honors** — Featured navy card for "Good but Never Good Enough" (book mock with "A Memoir / P. Shankar"). Below: published works (Surreal Moments, Under the Moonlit Sky) and debate awards.
6. **05 — Volunteering** — 3-column grid of six roles (IEEE WIE, IEEE CSIS, Tesla, Prayaas, Sarasva, Rangtarangini) with categories.
7. **06 — Skills** — "The toolkit, *briefly.*" Marquee of skill names + chip tags below.
8. **07 — Journal** — Latest 3 blog posts (pulled live from DB), with All / Original / Linked filter tabs. Each card: cover image, category · date · read time, title, excerpt, "Read essay" or "Read on LinkedIn" link. "View all" links to `/blog`.
9. **08 — Contact** — Navy band: "Let's build something *honest.*" with contact form (name, email, message), email + location, social links (LinkedIn, Instagram, Medium).
10. **Footer** — "Prachi." wordmark, "SIBM PUNE · IIIT ALLAHABAD · AUTHOR", copyright, back-to-top.

### Blog routes

- **`/blog`** — Full archive of posts with All / Original / Linked filters and search. Same card style as the journal section.
- **`/blog/:slug`** — Individual post page. For Original posts: full rendered rich-text content with cover image. For Linked posts: short intro + prominent "Read on LinkedIn/Medium" button that opens the external URL.

### Admin (`/admin`)

- **Login screen** — Single password field. Correct password sets a session flag; wrong password shows error.
- **Dashboard** — List of all posts with edit / delete / toggle-published actions, plus "+ New Post" button.
- **Editor** — Form fields:
  - Title, slug (auto-generated, editable)
  - Type: Original or Linked (radio)
  - Category tag (Personal, Books, Career, etc.)
  - Cover image upload
  - Excerpt (short summary for cards)
  - **If Original**: rich-text body (TipTap editor — bold, italic, headings, lists, links, inline images, blockquotes)
  - **If Linked**: external URL field (LinkedIn/Medium link)
  - Read time (auto-calculated for Original, manual for Linked)
  - Published toggle
- **Logout** button clears the session.

---

### Technical notes

- **Backend**: Lovable Cloud (Supabase) for database + image storage.
- **Tables**:
  - `posts` (id, title, slug, type, category, cover_image_url, excerpt, body_html, external_url, read_time, published, created_at) — public read for `published = true`, no public write.
  - `admin_password` is stored as an environment secret (`ADMIN_PASSWORD`); verified via an Edge Function that returns a signed session token. Password never ships to the client.
- **Storage bucket**: `blog-images` (public read) for cover images and inline editor uploads.
- **Auth model**: Lightweight session — Edge Function validates password and returns a token stored in `localStorage`; admin routes check token validity via the function before allowing writes. All write operations to `posts` go through Edge Functions that re-verify the token (so RLS stays locked down to service-role writes only).
- **Editor**: TipTap (React rich-text) with extensions for headings, lists, links, images, blockquote.
- **Routing**: React Router — `/`, `/blog`, `/blog/:slug`, `/admin`, `/admin/login`, `/admin/new`, `/admin/edit/:id`.
- **Design system**: Colors and serif/sans font tokens added to `index.css` and `tailwind.config.ts`.

---

### Setup the user will need to do

After implementation, you'll set the `ADMIN_PASSWORD` secret in Lovable Cloud settings — that's the password you'll use to log into `/admin`. I'll prompt you for it when the time comes.