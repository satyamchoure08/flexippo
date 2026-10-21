# flexippo.com

Personal "flex" pages: socials, a collection, music and a guestbook in one link.

- `flexippo.com` is the **example page**. Its likes and comments are made up and the page says so (the "DEMO" notes).
- `flexippo.com/name` is a person's **own page**. It only shows what that person added, and its likes, comments, guestbook and page views are real (saved in Supabase).

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page. |
| `assets/style.css` | All the page styles. |
| `assets/app.js` | Everything the page does. The `CONFIG` block at the top holds the example page's content (name, socials, collection, song, example comments). |
| `assets/edit.js` | The page editor. Only the owner of a page downloads it (visitors never do). |
| `404.html` | Turns short links (`flexippo.com/name`) into that person's page. |
| `name.html` files (one per user) | Made automatically by `tools/previews.mjs`: the link preview of each person's page (see below). Don't edit them by hand. |
| `tools/previews.mjs` | Makes those preview files from the public profile data. `tools/previews.json` lists the files it made (it never touches any other file). |
| `.github/workflows/previews.yml` | Runs `tools/previews.mjs` on GitHub every 10 minutes and publishes the result. |
| `assets/og-flexippo.jpg` | The chat preview picture of flexippo.com itself. |
| `assets/og-default.jpg` | The preview picture for pages that haven't made their own yet. |
| `manifest.webmanifest` | Lets people add the site to their home screen. |
| `assets/opt/` | Smaller WebP copies of the built-in photos, for phones. The originals next to them are untouched and still used as the source. |
| `assets/fonts/` | The five fonts, trimmed to the letters the site uses (licenses in `LICENSES.txt`). |
| `assets/vendor/supabase.js` | Supabase's official JavaScript library v2.118.0, built from its source code. Only downloaded when someone logs in, likes, comments or opens a personal page. |
| `assets/vendor/qrcodegen.js` | Makes the QR code (only downloaded when the share box comes into view, or for the story picture). |
| `assets/theme-soft.mp3` | The song, made about 10 dB quieter than `theme.mp3`. Nothing plays until someone taps play, and it stops when they leave the page. |
| `supabase/*.sql` | Database changes. Run each one once in Supabase (Dashboard → SQL Editor). |

## Making your own page (how the editor works)

- **Sign up** is one screen: pick your link (`flexippo.com/yourname`, checked while you type), email, password. If Supabase asks people to confirm their email, a "Check your email" screen shows (with *Send it again*), and the link in the email makes the page with the name they picked.
- **Edit mode**: right after sign-up (and with **Edit my page**) the page itself becomes the editor. Everything that can change has a dashed outline, ✎ or ＋. Tap it and a small panel opens for just that thing; the page changes behind it as you type.
- The bar at the bottom: the 3 themes, **Saved ✓** (changes save by themselves a moment later) and **Done**. ⋯ has the extras: birthday countdown, big name, small line, moving strip.
- Socials: tap an app and type the username (or paste a profile link). The link is made from it. Photos are made smaller on the phone, then uploaded.
- Outside edit mode the owner sees the page the way visitors do, plus their views, likes, comments and guestbook notes, an **Activity** list, a **Finish your page** checklist, and **Share** (copy/send the link, a story picture, the QR code).

## Link previews in chats

When someone sends `flexippo.com/name` in WhatsApp, Instagram, iMessage, Telegram, Discord…, the chat shows that person's own picture, name and bio.

1. When the owner finishes editing, their phone draws a 1200 × 630 picture of their page (their photo, name, bio and theme) and saves it in Supabase storage with the page (`profiles.media.og`, text in `profiles.settings.og`).
2. Chat apps don't run the website's code, so every 10 minutes the **Link previews** job on GitHub (`.github/workflows/previews.yml`) writes a small `name.html` for each person with those tags and publishes the site. A person who opens the link is sent straight on to the page.
3. In **Share** (and in "How it looks in chats" on their page) the owner sees exactly that preview, and whether chat apps already get the newest one ("✓ This is what friends see" or "Updating… a few minutes"). Links sent from there carry the preview's version (`?p=…`), so apps that saw an older preview fetch the new one.

If previews stop updating: open the repository's **Actions** tab on GitHub → **Link previews**. GitHub pauses scheduled jobs after 60 days without any change in the repository; the button there turns it back on, and **Run workflow** runs it right away.

A page's content is saved in `profiles.settings` (format `v: 2`: `profile`, `socials`, `links`, `collection` and optional extras for the big Instagram, Snapchat, X, Spotify and Discord cards) and its photos in `profiles.media`. Pages saved with the older editor still work: the parts they carried over from the example page (other people's photos, @flexippo, a made-up Snapscore) are left out when they're shown.

## Rules this site follows

1. **Nothing is loaded from other websites** (no CDNs, no Google Fonts, no hot-linked images). Everything the page needs lives in this repo. The only outside connection is the Supabase database.
2. **Built for cheap phones**: no full-screen effects, no endless animations that repaint big areas, glass blur only on small things (and off on slow phones: `html.lite`), photos sized for the screen, music, login code and the editor only downloaded when needed.
3. **The example page is honest**: made-up numbers only appear on `flexippo.com` and are labelled "DEMO". Personal pages only ever show real numbers and the owner's own content.

## Database (Supabase project `knmjxdnzttyacdtktbdl`)

Link previews need no database change (they're saved in `profiles.settings` and `profiles.media`, in the owner's own photo folder).

Already there: `profiles`, chat (`messages`, `blocks` + functions), photo storage bucket `media`.

`supabase/2026-10-20_likes_comments_guestbook_views.sql` adds `likes`, `comments`, `guestbook`, `page_stats` and the functions `page_summary` and `add_view`. Until it has been run, personal pages keep working the old way (likes saved on each visitor's phone only, no comments, no numbers or Activity for owners).
