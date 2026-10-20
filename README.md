# flexippo.com

Personal "flex" pages: socials, a collection, music and a guestbook in one link.

- `flexippo.com` is the **example page**. Its likes and comments are made up and the page says so (the "DEMO" notes).
- `flexippo.com/name` is a person's **own page**. Likes, comments, guestbook and page views there are real (saved in Supabase).

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page and all its styles. |
| `assets/app.js` | Everything the page does. The `CONFIG` block at the top holds the example page's content (name, socials, collection, song, example comments). |
| `404.html` | Turns short links (`flexippo.com/name`) into that person's page. |
| `manifest.webmanifest` | Lets people add the site to their home screen. |
| `assets/opt/` | Smaller WebP copies of the built-in photos, for phones. The originals next to them are untouched and still used as the source. |
| `assets/fonts/` | The five fonts, trimmed to the letters the site uses (licenses in `LICENSES.txt`). |
| `assets/vendor/supabase.js` | Supabase's official JavaScript library v2.118.0, built from its source code. Only downloaded when someone logs in, likes, comments or opens a personal page. |
| `assets/vendor/qrcodegen.js` | Makes the QR code (only downloaded when the share box comes into view). |
| `assets/theme-soft.mp3` | The song, made about 10 dB quieter than `theme.mp3`. Nothing plays until someone taps play, and it stops when they leave the page. |
| `supabase/*.sql` | Database changes. Run each one once in Supabase (Dashboard → SQL Editor). |

## Rules this site follows

1. **Nothing is loaded from other websites** (no CDNs, no Google Fonts, no hot-linked images). Everything the page needs lives in this repo. The only outside connection is the Supabase database.
2. **Built for cheap phones**: no full-screen effects, no endless animations that repaint big areas, glass blur only on small things (and off on slow phones: `html.lite`), photos sized for the screen, music and login code only downloaded when needed.
3. **The example page is honest**: made-up numbers only appear on `flexippo.com` and are labelled "DEMO". Personal pages only ever show real numbers.

## Database (Supabase project `knmjxdnzttyacdtktbdl`)

Already there: `profiles`, chat (`messages`, `blocks` + functions), photo storage bucket `media`.

`supabase/2026-10-20_likes_comments_guestbook_views.sql` adds `likes`, `comments`, `guestbook`, `page_stats` and the functions `page_summary` and `add_view`. Until it has been run, personal pages keep working the old way (likes saved on each visitor's phone only, no comments).
