// Link previews for everyone's page.
// When someone sends flexippo.com/name in WhatsApp, Instagram, iMessage, Telegram, Discord..., the chat app reads a few
// tags from that address (it doesn't run the website's code) and shows a picture, a title and a line of text.
// This script writes one small file per user (name.html) with THAT person's tags. A person opening the link is sent
// straight on to their page. Run by .github/workflows/previews.yml every 10 minutes; it only reads public profile data.
//
//   node tools/previews.mjs [folder]      (default: the website folder this file is in)
//
// The picture itself is made by the owner's browser while they edit (assets/fx-edit.js) and saved in Supabase storage.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(process.argv[2] || path.join(HERE, ".."));
const SITE = "https://flexippo.com";
const PROJECT = "https://knmjxdnzttyacdtktbdl.supabase.co";
const API = process.env.FLEXIPPO_SUPABASE_URL || PROJECT;            // tests point this at a local copy
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubWp4ZG56dHR5YWNkdGt0YmRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMjg5MTcsImV4cCI6MjEwNjkwNDkxN30.rEWcpL0OFyNhLAFLUuTWpx47uPquP40vcQz3GEqNvgE";   // the public (anon) key, same as in assets/fx.js
const MEDIA = PROJECT + "/storage/v1/object/public/media/";
const DEFAULT_IMG = SITE + "/assets/og-default.jpg";
const MANIFEST = path.join(ROOT, "tools", "previews.json");          // the files this script made (it never touches any other file)
const USER_RE = /^[a-z0-9_]{3,20}$/;
const EXAMPLE_TITLES = JSON.stringify(["S-Rank Otaku", "Builds websites at 3AM", "Main character energy", "Collector of shiny things"]);
const LABELS = { instagram: "Instagram", snapchat: "Snapchat", youtube: "YouTube", whatsapp: "WhatsApp", x: "X", tiktok: "TikTok", discord: "Discord", spotify: "Spotify", telegram: "Telegram", twitch: "Twitch",
  github: "GitHub", linkedin: "LinkedIn", facebook: "Facebook", threads: "Threads", pinterest: "Pinterest", reddit: "Reddit", steam: "Steam", email: "Email" };

const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clean = (s, n) => String(s === undefined || s === null ? "" : s).replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, n);
function hash(s) { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }

async function profiles() {
  const cols = "id,username,display_name,v:settings->v,og:settings->og,profile:settings->profile,socials:settings->socials,tiles:settings->tiles,ogimg:media->>og,avatar:media->>avatar";
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const r = await fetch(`${API}/rest/v1/profiles?select=${cols}&order=username.asc&limit=1000&offset=${from}`, { headers: { apikey: KEY, Authorization: "Bearer " + KEY, Accept: "application/json" } });
    if (!r.ok) throw new Error("Couldn't read profiles: HTTP " + r.status + " " + (await r.text()).slice(0, 300));
    const page = await r.json();
    rows.push(...page);
    if (page.length < 1000) return rows;
  }
}

// what the chat apps should show for one person
function previewOf(p) {
  const u = String(p.username || "").toLowerCase();
  if (!USER_RE.test(u)) return null;
  const mine = x => typeof x === "string" && x.startsWith(MEDIA + p.id + "/") && /^[\w\-./%]+$/.test(x.slice(MEDIA.length));
  const og = p.og && typeof p.og === "object" ? p.og : null;
  if (og && mine(p.ogimg) && clean(og.t, 70)) {           // the picture the owner's browser made (the usual case)
    const t = clean(og.t, 70), d = clean(og.d, 160);
    return { u, t, d, img: p.ogimg, big: true, v: clean(og.v, 16).replace(/[^a-z0-9]/g, "") || hash(t + "|" + d + "|" + p.ogimg) };
  }
  // pages that haven't made one yet: their name and bio, with their profile picture (or the site's picture)
  const prof = p.profile && typeof p.profile === "object" ? p.profile : {};
  const name = clean(prof.name, 40) || clean(p.display_name, 40) || u;
  let titles = Array.isArray(prof.titles) ? prof.titles : [];
  if (JSON.stringify(titles) === EXAMPLE_TITLES) titles = [];          // older pages carried the example page's bio
  titles = titles.map(x => clean(x, 40)).filter(Boolean);
  const bio = p.v === 3 ? clean(prof.bio, 160) : "";                  // pages made with the new editor (settings v3)
  const apps = p.v === 3 ? (Array.isArray(p.tiles) ? p.tiles : []).map(x => x && x.t === "link" && LABELS[x.k]) : (p.v === 2 && Array.isArray(p.socials) ? p.socials : []).map(s => s && LABELS[s.k]);
  const socials = [...new Set(apps.filter(Boolean))];
  const t = (name.toLowerCase() === u ? name : `${name} (@${u})`).slice(0, 70);
  const d = (bio || (titles.length ? titles.slice(0, 3).join(" · ") : socials.length ? socials.slice(0, 4).join(" · ") : "flexippo.com/" + u)).slice(0, 160);
  const img = mine(p.avatar) ? p.avatar : DEFAULT_IMG;
  return { u, t, d, img, big: img === DEFAULT_IMG, v: hash(t + "|" + d + "|" + img) };
}

function page(x) {
  const go = "/?u=" + x.u;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(x.t)} · flexippo</title>
<meta name="description" content="${esc(x.d)}">
<meta property="og:type" content="profile">
<meta property="og:site_name" content="flexippo">
<meta property="og:title" content="${esc(x.t)}">
<meta property="og:description" content="${esc(x.d)}">
<meta property="og:image" content="${esc(x.img)}">
<meta property="og:image:secure_url" content="${esc(x.img)}">
<meta property="og:image:type" content="image/jpeg">
${x.big ? `<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n` : ""}<meta property="og:image:alt" content="${esc(x.t)} on flexippo">
<meta name="twitter:card" content="${x.big ? "summary_large_image" : "summary"}">
<meta name="twitter:title" content="${esc(x.t)}">
<meta name="twitter:description" content="${esc(x.d)}">
<meta name="twitter:image" content="${esc(x.img)}">
<meta name="theme-color" content="#f3f1fa">
<meta name="flexippo:v" content="${esc(x.v)}">
<link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon-192.png">
<script>location.replace("${go}" + location.hash)</script>
</head>
<body style="margin:0;background:#f3f1fa"><noscript><a href="${go}" style="color:#17102e">Open the page</a></noscript></body>
</html>
`;
}

async function main() {
  const rows = await profiles();
  const before = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")).users || [] : [];
  const made = new Set(before);
  if (!rows.length && made.size) throw new Error("No profiles came back, so nothing was changed (Supabase may be paused).");
  const now = new Set();
  let wrote = 0, removed = 0;
  for (const p of rows) {
    const x = previewOf(p); if (!x) continue;
    const file = path.join(ROOT, x.u + ".html");
    // never touch the site's own files or folders (index.html, 404.html, assets...)
    if (!made.has(x.u) && (fs.existsSync(file) || fs.existsSync(path.join(ROOT, x.u)))) continue;
    const html = page(x);
    if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== html) { fs.writeFileSync(file, html); wrote++; }
    now.add(x.u);
  }
  const gone = [...made].filter(u => !now.has(u));
  if (gone.length > 20 && gone.length > made.size / 2) throw new Error(`${gone.length} pages would be removed at once, so nothing was changed. Check Supabase.`);
  for (const u of gone) { const f = path.join(ROOT, u + ".html"); if (USER_RE.test(u) && fs.existsSync(f)) { fs.unlinkSync(f); removed++; } }
  const out = JSON.stringify({ about: "Made by tools/previews.mjs: the link-preview page (name.html) of each user. Don't edit by hand.", users: [...now].sort() }, null, 1) + "\n";
  fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
  if (!fs.existsSync(MANIFEST) || fs.readFileSync(MANIFEST, "utf8") !== out) fs.writeFileSync(MANIFEST, out);
  console.log(`${rows.length} profiles · ${now.size} preview pages · ${wrote} written · ${removed} removed`);
}
main().catch(e => { console.error(e.message || e); process.exit(1); });
