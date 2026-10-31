# flexippo.com

One page for your socials, photos and links. Anyone can claim `flexippo.com/theirname`, add tiles, and put the link in their Instagram, Snapchat or TikTok bio.

- **Home page** (`flexippo.com`): type a name, see if it's free, claim it. Three example pages (Kabir, Aarav, Mochi) show what a page looks like.
- **A person's page** (`flexippo.com/name`): their photo, name, bio and a grid of tiles.
- **Editing**: the owner opens their own page and it *is* the editor. Changes save by themselves.

## What a page can have

| Tile | What it does |
| --- | --- |
| Link | Paste any link, or pick an app and type the username. 35 apps (Instagram, Snapchat, YouTube, WhatsApp, Spotify, X, TikTok, Discord, Threads, Telegram, LinkedIn…) get their own icon, colour and button ("Follow", "Listen", "Message"). |
| Discord username | Shows the username; tapping it copies it (Discord has no profile links). |
| Photo | Made smaller on the phone, then uploaded. Optional caption and optional link. |
| Note | Short text in one of 6 colours. |
| Heading | Starts a new group of tiles ("My music", "Shop"). |

Every tile has 4 sizes (small, wide, tall, big) and can be moved earlier or later. A page also has 5 themes (Paper, Ink, Lime, Violet, Blush), a view counter, a QR code and its own link preview picture.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The home page. Personal pages are drawn into `<main id="app">` by `fx.js`. |
| `assets/fx.css` | Styles for the home page, everyone's pages and the pop-up panels. |
| `assets/fx.js` | Everything visitors need: the home page, showing a page, sign up / log in, the list of apps. |
| `assets/fx-edit.js`, `assets/fx-edit.css` | The editor. Only downloaded when the owner opens their own page. |
| `assets/fx-icons.js` | The icons, inside the site (Simple Icons CC0, Lucide ISC, LinkedIn from Font Awesome Free CC BY 4.0). |
| `assets/img/` | Photos for the three example pages on the home page. They came with the previous version of the site (the chocolate photo is CC0 by Jan Helebrant, Wikimedia Commons). |
| `assets/fonts/` | Inter and TeX Gyre Adventor, trimmed. Licences in `LICENSES.txt`. |
| `assets/vendor/supabase.js` | Supabase's JavaScript library v2.118.0. Only downloaded when someone logs in, signs up or edits. |
| `assets/vendor/qrcodegen.js` | Draws the QR code in the Share panel. |
| `assets/og-flexippo.jpg` | The picture chat apps show for flexippo.com. |
| `assets/og-default.jpg` | The picture for pages that haven't made their own yet. |
| `assets/flexippo-avatar.png`, `assets/flexippo-pfp.png` | The logo as profile pictures (not used by the site itself). |
| `404.html` | Turns short links (`flexippo.com/name`) into that person's page. |
| `name.html` files | Made automatically by `tools/previews.mjs` (link previews, see below). Don't edit them. |
| `tools/previews.mjs`, `.github/workflows/previews.yml` | Make those files every 10 minutes on GitHub. |
| `supabase/*.sql` | Database changes. Run each one once in Supabase (Dashboard → SQL Editor). |

## Link previews in chats

When someone sends `flexippo.com/name` in WhatsApp, Instagram, iMessage, Telegram or Discord, the chat shows that person's picture, name and bio.

1. A moment after the owner edits their name, bio, photo or theme, their browser draws a 1200 × 630 picture and saves it in Supabase storage (`profiles.media.og`, text in `profiles.settings.og`).
2. Chat apps don't run the website's code, so every 10 minutes the **Link previews** job on GitHub writes a small `name.html` with those tags for each person. Someone who opens the link is sent straight on to the page.

If previews stop updating: GitHub → this repository → **Actions** → **Link previews**. GitHub pauses scheduled jobs after 60 days without any change in the repository; the button there turns it back on, and **Run workflow** runs it right away.

## Database (Supabase project `knmjxdnzttyacdtktbdl`)

No database change is needed for this version. It uses what's already there:

- `profiles`: `username`, `display_name`, `avatar_url`, `settings` (the page) and `media` (photo addresses).
- Storage bucket `media`: each person's photos in a folder named after their user id. A page only ever shows photos from its owner's folder.
- `page_stats` + function `add_view` (from `supabase/2026-10-20_likes_comments_guestbook_views.sql`) for the view counter. If that file was never run, pages still work; the owner just doesn't see a view count.

A page is saved in `profiles.settings` as:

```json
{ "v": 3, "profile": { "name": "…", "bio": "…" }, "theme": "paper",
  "tiles": [ { "id": "a1", "t": "link", "s": "w", "u": "https://www.instagram.com/…/", "k": "instagram" } ],
  "og": { "v": "…", "k": "…", "t": "…", "d": "…" } }
```

Tile types (`t`): `link` (`u` link, `k` app, `l` title, `cp` text to copy), `photo` (`cap` caption, `u` link; the photo is `media["p_" + id]`), `note` (`x` text, `c` colour), `head` (`x` text). Sizes (`s`): `s` small, `w` wide, `t` tall, `l` big.

Pages saved by the previous editor (`v: 2`) are shown as tiles automatically (their apps, links and uploaded photos). They're saved in the new format the first time the owner changes something.

The old chat, likes, comments and guestbook tables are still in the database but the site no longer uses them.

## Rules this site follows

1. **Nothing is loaded from other websites** (no CDNs, no Google Fonts, no hot-linked images). The only outside connection is the Supabase database.
2. **Built for cheap phones**: small files, no endless animations, photos made smaller before upload, the login library and editor only downloaded when needed.
3. **Example pages are labelled as examples** and only appear on the home page.
