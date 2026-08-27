# Pastor Timothy Daniel — Official Site

Next.js 16 (App Router) · React 19 · Tailwind v4 · Motion · React Three Fiber · Lenis

A dark, cinematic one-page site with a WebGL dust field behind the hero, scroll-driven
reveals throughout, a tabbed **The Work** section (Tim Drops Truth / Books), and a
**Watch** section that pulls videos live from YouTube.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
```

---

## 1. Edit the copy — `src/lib/content.ts`

Everything the site says lives in that one file. No component edits needed for:
bio, mission pillars, ministries, truth drops, book catalogue, podcast, contact,
social links, nav labels.

**Search the file for `TODO`** — those are the placeholders that still need real details:

| What | Where |
|---|---|
| Real domain + contact email | `site.url`, `site.email` |
| Social handles (IG / TikTok / YouTube / FB / Spotify) | `socials`, `truth.socials` |
| Book titles, blurbs, years, purchase links | `books` |
| Podcast links (Spotify / Apple / YouTube) | `podcast.links` |
| Real "Tim Drops Truth" post copy | `truth.drops` |

The drop copy currently in the file was written to Timothy's stated themes as a
placeholder — swap it for his actual posts.

### Marking a book as published

```ts
{
  title: "The Real Title",
  status: "available",                       // was "coming-soon"
  link: "https://…",                         // shows a "Get the book" button
  year: "2026",
  spine: "linear-gradient(150deg,#E0A75E,#B8813C 58%,#6B4A1E)",
}
```

---

## 2. Connect YouTube

The **Watch** section renders the channel's latest uploads automatically. Until it's
configured it shows a setup notice with a placeholder grid — nothing breaks.

1. [console.cloud.google.com](https://console.cloud.google.com) → create/select a project
2. **APIs & Services → Library** → enable **YouTube Data API v3**
3. **Credentials → Create credentials → API key** (restrict it to that API)
4. Get the channel ID at [youtube.com/account_advanced](https://www.youtube.com/account_advanced)
   while signed in as the channel
5. Put both in `.env.local` (and in Vercel → Project → Settings → Environment Variables):

```
YOUTUBE_API_KEY=AIza…
YOUTUBE_CHANNEL_ID=UC…
```

`YOUTUBE_CHANNEL_HANDLE=@timdropstruth` works as an alternative to the channel ID.

**How it works.** `src/lib/youtube.ts` resolves the channel's *uploads* playlist and reads
the newest items from it. Calls run on the server, so the API key never reaches the
browser. Responses are cached for 6 hours (quota is 10,000 units/day; this costs ~2 units
per refresh, so it is nowhere near the limit). Private and deleted uploads are filtered out.

There is also a JSON endpoint at `/api/youtube?limit=12` if the videos are ever needed elsewhere.

---

## 3. The contact form

Submitting opens the visitor's mail client with the message pre-filled — no mail service
required, so it works the moment the site is live. To send server-side instead, replace
`onSubmit` in `src/components/Contact.tsx` with a server action calling Resend/Formspree.
The markup stays the same.

---

## 4. Deploy to Vercel

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
Vercel auto-detects Next.js — no build config needed.

**After the first deploy:**
- Add `YOUTUBE_API_KEY` and `YOUTUBE_CHANNEL_ID` under Settings → Environment Variables, then redeploy
- Set the real domain in `site.url` (`src/lib/content.ts`) so OG tags and JSON-LD point at it

`vercel.json` pins the region to `sin1` (Singapore) — closest to Sri Lanka.

---

## Replacing the portrait

Drop a new file at `public/images/timothy.jpg`. It is used in the hero, the story section,
and the social share card. Portrait orientation, ideally 1600px+ on the long edge. If the
crop looks off, adjust the `object-[58%_22%]` values in `src/components/Hero.tsx` and
`src/components/About.tsx`.

---

## Structure

```
src/
  app/
    layout.tsx            fonts, metadata, JSON-LD
    page.tsx              section order
    globals.css           design tokens + type scale + texture
    api/youtube/route.ts  JSON endpoint
  lib/
    content.ts            ← all copy
    youtube.ts            YouTube Data API v3
  components/
    Hero  About  Mission  Work  Videos  Contact  Footer  Nav  Preloader
    TruthPanel  BooksPanel     ← the two tabs
    VideoGrid                  ← thumbnails + lightbox
    three/Scene.tsx            ← WebGL dust field
    ui/                        Reveal  Magnetic  Tilt  Cursor  Marquee  SmoothScroll
```

### Design tokens

Defined in `globals.css` under `@theme`, so they work as Tailwind classes
(`text-gold`, `bg-ink`, `border-line`, …):

`ink #07060A` · `surface #131118` · `line #2A2633` · `bone #EFEBE3` ·
`gold #E0A75E` · `ember #D8763C` · `steel #7F93AE`

Display type is Instrument Serif; UI type is Inter.

### Accessibility & performance

- Everything respects `prefers-reduced-motion` — the preloader, smooth scroll, and CSS
  animations all switch off
- The WebGL field drops its particle count on smaller viewports and is `pointer-events: none`
- The custom cursor and magnetic buttons only activate on `pointer: fine` devices
- Tabs are wired with `role="tablist"` / `aria-selected` / `aria-controls`; the lightbox
  traps Escape and restores scroll
