/* flexippo.com core: the home page, everyone's public pages, and accounts.
   The editor (fx-edit.js) is only downloaded when someone opens their own page. */
(() => {
"use strict";

const SITE = "https://flexippo.com";
// The publishable (anon) key is meant to be public. The database rules decide who can read or change what.
const SUPA = { url: "https://knmjxdnzttyacdtktbdl.supabase.co", key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubWp4ZG56dHR5YWNkdGt0YmRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMjg5MTcsImV4cCI6MjEwNjkwNDkxN30.rEWcpL0OFyNhLAFLUuTWpx47uPquP40vcQz3GEqNvgE" };
const SB_LIB = "/assets/vendor/supabase.js?v=2.118.0";
const SB_KEY = "sb-knmjxdnzttyacdtktbdl-auth-token";          // where Supabase keeps the login on this phone
const MEDIA = SUPA.url + "/storage/v1/object/public/media/";
const COLS = "id,username,display_name,avatar_url,settings,media,updated_at";
const USER_RE = /^[a-z0-9_]{3,20}$/;
const RESERVED = new Set(["admin", "administrator", "flexippo", "support", "help", "root", "system", "moderator", "mod", "official", "staff", "null", "undefined", "api", "www", "login", "signup", "assets", "index", "supabase",
  "404", "tools", "previews", "readme", "cname", "manifest", "favicon", "robots", "sitemap", "edit", "settings", "home", "about", "privacy", "terms", "app", "new", "explore"]);
const THEMES = ["paper", "ink", "lime", "violet", "blush"];
const THEME_BG = { paper: "#f3f1fa", ink: "#17102e", lime: "#c6ff3d", violet: "#6a2cff", blush: "#ffe4ef" };
const NOTE_COLORS = ["lime", "violet", "ink", "pink", "sky", "white"];
const SIZES = ["s", "w", "t", "l"];
const MAX_TILES = 60;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s === undefined || s === null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clip = (s, n, lines) => { let t = String(s === undefined || s === null ? "" : s).replace(/\r/g, ""); t = lines ? t.replace(/[^\S\n]+/g, " ").replace(/\n{3,}/g, "\n\n") : t.replace(/\s+/g, " "); return t.trim().slice(0, n); };
const uid = () => Math.random().toString(36).slice(2, 7) + Date.now().toString(36).slice(-4);
const LS = {
  get(k, d) { try { const v = localStorage.getItem("fx:" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("fx:" + k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem("fx:" + k); } catch (e) {} }
};
const motionOK = !matchMedia("(prefers-reduced-motion: reduce)").matches;
const loadScript = src => new Promise((ok, no) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = () => no(new Error("Failed to fetch " + src)); document.head.appendChild(s); });
const loadCss = href => new Promise(ok => { if ($(`link[href="${href}"]`)) return ok(); const l = document.createElement("link"); l.rel = "stylesheet"; l.href = href; l.onload = ok; l.onerror = ok; document.head.appendChild(l); });

/* ======================= icons ======================= */
function icon(name, cls) {
  const d = (window.FXI || {})[name]; if (!d) return "";
  return `<svg class="${cls || "i"}" viewBox="${d[0]}" aria-hidden="true" focusable="false" ${d[2] ? 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' : 'fill="currentColor"'}>${d[1]}</svg>`;
}

/* ======================= apps: a pasted link becomes the right kind of tile ======================= */
const IG = "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)";
const seg = (u, i) => decodeURIComponent((u.pathname.split("/").filter(Boolean)[i] || "")).replace(/^@/, "");
const P = {
  instagram:   { n: "Instagram", bg: IG, cta: "Follow", host: /(^|\.)instagram\.com$|^instagr\.am$/, h: u => seg(u, 0), at: 1, mk: h => `https://www.instagram.com/${h}/`, re: /^[A-Za-z0-9_.]{1,30}$/, pre: "instagram.com/", ask: "Your Instagram username" },
  snapchat:    { n: "Snapchat", bg: "#fffc00", fg: "#17102e", cta: "Add me", host: /(^|\.)snapchat\.com$/, h: u => (seg(u, 0) === "add" ? seg(u, 1) : seg(u, 0)), at: 1, mk: h => `https://www.snapchat.com/add/${h}`, re: /^[A-Za-z0-9_.-]{2,30}$/, pre: "snapchat.com/add/", ask: "Your Snapchat username" },
  youtube:     { n: "YouTube", bg: "#ff0033", cta: "Subscribe", host: /(^|\.)youtube\.com$|^youtu\.be$/, h: u => { const a = u.pathname.split("/")[1] || ""; return a.startsWith("@") ? a : (u.hostname.endsWith("youtu.be") || a === "watch" || a === "shorts") ? "Video" : "Channel"; }, mk: h => `https://www.youtube.com/@${h}`, re: /^[A-Za-z0-9_.-]{3,30}$/, pre: "youtube.com/@", ask: "Your YouTube handle" },
  whatsapp:    { n: "WhatsApp", bg: "#25d366", cta: "Message", host: /(^|\.)wa\.me$|(^|\.)whatsapp\.com$/, h: u => { const d = seg(u, 0).replace(/\D/g, "") || (u.searchParams.get("phone") || "").replace(/\D/g, ""); return d ? "+" + d : "Chat"; }, mk: h => `https://wa.me/${h}`, re: /^\d{8,15}$/, pre: "+", ask: "Your number with country code", digits: 1 },
  x:           { n: "X", bg: "#000", cta: "Follow", host: /(^|\.)(x|twitter)\.com$/, h: u => seg(u, 0), at: 1, mk: h => `https://x.com/${h}`, re: /^[A-Za-z0-9_]{1,15}$/, pre: "x.com/", ask: "Your X username" },
  tiktok:      { n: "TikTok", bg: "#000", cta: "Follow", host: /(^|\.)tiktok\.com$/, h: u => seg(u, 0), at: 1, mk: h => `https://www.tiktok.com/@${h}`, re: /^[A-Za-z0-9_.]{2,24}$/, pre: "tiktok.com/@", ask: "Your TikTok username" },
  discord:     { n: "Discord", bg: "#5865f2", cta: "Join", host: /(^|\.)discord\.(gg|com)$/, h: u => (u.hostname.endsWith("discord.gg") ? "discord.gg/" + seg(u, 0) : "Server"), mk: h => `https://discord.gg/${h}`, re: /^[A-Za-z0-9-]{2,32}$/, pre: "discord.gg/", ask: "Your server invite code", copy: "Your Discord username" },
  spotify:     { n: "Spotify", bg: "#1ed760", fg: "#17102e", cta: "Listen", host: /(^|\.)spotify\.(com|link)$/, h: u => ({ playlist: "Playlist", artist: "Artist", album: "Album", track: "Song", user: "Profile", show: "Podcast", episode: "Podcast" }[seg(u, 0).replace(/^intl-\w+$/, "") || seg(u, 1)] || "Listen on Spotify"), link: 1, ask: "Your Spotify link" },
  telegram:    { n: "Telegram", bg: "#229ed9", cta: "Message", host: /^t\.me$|(^|\.)telegram\.me$/, h: u => seg(u, 0), at: 1, mk: h => `https://t.me/${h}`, re: /^[A-Za-z0-9_]{5,32}$/, pre: "t.me/", ask: "Your Telegram username" },
  threads:     { n: "Threads", bg: "#000", cta: "Follow", host: /(^|\.)threads\.(net|com)$/, h: u => seg(u, 0), at: 1, mk: h => `https://www.threads.net/@${h}`, re: /^[A-Za-z0-9_.]{1,30}$/, pre: "threads.net/@", ask: "Your Threads username" },
  linkedin:    { n: "LinkedIn", bg: "#0a66c2", cta: "Connect", host: /(^|\.)linkedin\.com$/, h: u => (seg(u, 0) === "in" ? seg(u, 1) : "Profile"), mk: h => `https://www.linkedin.com/in/${h}`, re: /^[A-Za-z0-9-]{3,100}$/, pre: "linkedin.com/in/", ask: "Your LinkedIn name (from your profile link)" },
  twitch:      { n: "Twitch", bg: "#9146ff", cta: "Watch", host: /(^|\.)twitch\.tv$/, h: u => seg(u, 0), at: 1, mk: h => `https://www.twitch.tv/${h}`, re: /^[A-Za-z0-9_]{3,25}$/, pre: "twitch.tv/", ask: "Your Twitch username" },
  github:      { n: "GitHub", bg: "#24292f", cta: "Follow", host: /^github\.com$/, h: u => seg(u, 0), at: 1, mk: h => `https://github.com/${h}`, re: /^[A-Za-z0-9-]{1,39}$/, pre: "github.com/", ask: "Your GitHub username" },
  facebook:    { n: "Facebook", bg: "#1877f2", cta: "Follow", host: /(^|\.)(facebook|fb)\.com$/, h: u => (seg(u, 0) === "profile.php" ? "Profile" : seg(u, 0)), mk: h => `https://www.facebook.com/${h}`, re: /^[A-Za-z0-9.]{5,50}$/, pre: "facebook.com/", ask: "Your Facebook username" },
  pinterest:   { n: "Pinterest", bg: "#e60023", cta: "Follow", host: /(^|\.)pinterest\.[a-z.]+$|^pin\.it$/, h: u => (u.hostname === "pin.it" ? "Pinterest" : seg(u, 0)), at: 1, mk: h => `https://www.pinterest.com/${h}/`, re: /^[A-Za-z0-9_]{3,30}$/, pre: "pinterest.com/", ask: "Your Pinterest username" },
  reddit:      { n: "Reddit", bg: "#ff4500", cta: "Follow", host: /(^|\.)reddit\.com$/, h: u => { const a = seg(u, 0); return (a === "user" || a === "u") ? "u/" + seg(u, 1) : a === "r" ? "r/" + seg(u, 1) : "Reddit"; }, mk: h => `https://www.reddit.com/user/${h}`, re: /^[A-Za-z0-9_-]{3,20}$/, pre: "reddit.com/user/", ask: "Your Reddit username" },
  steam:       { n: "Steam", bg: "#1b2838", cta: "Add me", host: /(^|\.)steamcommunity\.com$/, h: u => seg(u, 1) || "Profile" },
  soundcloud:  { n: "SoundCloud", bg: "#ff5500", cta: "Listen", host: /(^|\.)soundcloud\.com$/, h: u => seg(u, 0), at: 1 },
  applemusic:  { n: "Apple Music", i: "applemusic", bg: "#fa243c", cta: "Listen", host: /^music\.apple\.com$/, h: () => "Listen on Apple Music" },
  behance:     { n: "Behance", bg: "#1769ff", cta: "Follow", host: /(^|\.)behance\.net$/, h: u => seg(u, 0), at: 1 },
  dribbble:    { n: "Dribbble", bg: "#ea4c89", cta: "Follow", host: /(^|\.)dribbble\.com$/, h: u => seg(u, 0), at: 1 },
  medium:      { n: "Medium", bg: "#000", cta: "Read", host: /(^|\.)medium\.com$/, h: u => seg(u, 0) || "Blog", at: 1 },
  substack:    { n: "Substack", bg: "#ff6719", cta: "Subscribe", host: /(^|\.)substack\.com$/, h: u => u.hostname.split(".")[0] },
  patreon:     { n: "Patreon", bg: "#000", cta: "Join", host: /(^|\.)patreon\.com$/, h: u => seg(u, 0), at: 1 },
  kofi:        { n: "Ko-fi", bg: "#ff5e5b", cta: "Support", host: /(^|\.)ko-fi\.com$/, h: u => seg(u, 0), at: 1 },
  letterboxd:  { n: "Letterboxd", bg: "#202830", cta: "Follow", host: /(^|\.)letterboxd\.com$|^boxd\.it$/, h: u => seg(u, 0), at: 1 },
  goodreads:   { n: "Goodreads", bg: "#372213", cta: "Follow", host: /(^|\.)goodreads\.com$/, h: () => "Bookshelf" },
  strava:      { n: "Strava", bg: "#fc4c02", cta: "Follow", host: /(^|\.)strava\.(com|app\.link)$/, h: () => "Athlete" },
  roblox:      { n: "Roblox", bg: "#000", cta: "Add me", host: /(^|\.)roblox\.com$/, h: () => "Profile" },
  etsy:        { n: "Etsy", bg: "#f16521", cta: "Shop", host: /(^|\.)etsy\.com$/, h: u => (seg(u, 0) === "shop" ? seg(u, 1) : "Shop") },
  bluesky:     { n: "Bluesky", bg: "#1185fe", cta: "Follow", host: /^bsky\.app$/, h: u => seg(u, 1), at: 1 },
  myanimelist: { n: "MyAnimeList", bg: "#2e51a2", cta: "Follow", host: /(^|\.)myanimelist\.net$/, h: u => (seg(u, 0) === "profile" ? seg(u, 1) : "Anime list") },
  anilist:     { n: "AniList", bg: "#02a9ff", cta: "Follow", host: /^anilist\.co$/, h: u => (seg(u, 0) === "user" ? seg(u, 1) : "Anime list") },
  maps:        { n: "Location", bg: "#34a853", cta: "Open", host: /^maps\.app\.goo\.gl$|(^|\.)google\.[a-z.]+$|^goo\.gl$/, path: /^\/maps|^\/[A-Za-z0-9]+$/, h: () => "Open in Maps" },
  email:       { n: "Email", i: "mail", bg: "#17102e", cta: "Email me", ask: "Your email address", mail: 1 }
};
const QUICK = ["instagram", "snapchat", "youtube", "whatsapp", "spotify", "x", "tiktok", "discord", "threads", "telegram", "linkedin", "email"];

function toUrl(raw) {
  let s = String(raw || "").trim();
  if (!s) return "";
  if (/^mailto:/i.test(s)) s = s.slice(7);
  if (/^[^\s@/]+@[^\s@/]+\.[a-z]{2,}$/i.test(s)) return "mailto:" + s;
  if (!/^https?:\/\//i.test(s)) { if (/^[\w-]+(\.[\w-]+)+(:\d+)?([/?#]\S*)?$/.test(s)) s = "https://" + s; else return ""; }
  try { const u = new URL(s); if (!/^https?:$/.test(u.protocol) || !u.hostname.includes(".")) return ""; return safeUrl(u.href); } catch (e) { return ""; }
}
function safeUrl(s) {
  s = String(s || "").trim();
  return s.length <= 500 && /^(https?:\/\/[^\s"'<>\\]+|mailto:[^\s@"'<>\\/]+@[^\s@"'<>\\/]+)$/i.test(s) ? s : "";
}
function detect(href) {
  if (/^mailto:/i.test(href)) return { k: "email", h: href.slice(7) };
  let u; try { u = new URL(href); } catch (e) { return { k: "", h: "" }; }
  const host = u.hostname.toLowerCase().replace(/^(www|m|mobile)\./, "");
  for (const k in P) {
    const p = P[k];
    if (!p.host || !p.host.test(host) || (p.path && !p.path.test(u.pathname))) continue;
    let h = ""; try { h = p.h ? p.h(u) : ""; } catch (e) {}
    h = clip(h, 60);
    return { k, h: h ? (p.at && !/\s|\//.test(h) && !/^@/.test(h) ? "@" + h : h) : p.n, host };
  }
  return { k: "", h: (host + u.pathname.replace(/\/$/, "")).slice(0, 60), host };
}

/* ======================= a page: cleaning what comes from the database ======================= */
function cleanTile(t) {
  if (!t || typeof t !== "object") return null;
  const id = String(t.id || "").replace(/[^\w-]/g, "").slice(0, 24) || uid();
  const s = SIZES.includes(t.s) ? t.s : "s";
  if (t.t === "link") {
    const u = safeUrl(t.u), cp = clip(t.cp, 40);
    if (!u && !cp) return null;
    return { id, t: "link", s, u: u || "", k: P[t.k] ? t.k : "", l: clip(t.l, 40), cp: u ? "" : cp };
  }
  if (t.t === "photo") return { id, t: "photo", s, cap: clip(t.cap, 60), u: safeUrl(t.u) };
  if (t.t === "note") { const x = clip(t.x, 160, true); return x ? { id, t: "note", s, x, c: NOTE_COLORS.includes(t.c) ? t.c : "lime" } : null; }
  if (t.t === "head") { const x = clip(t.x, 50); return x ? { id, t: "head", s: "w", x } : null; }
  return null;
}
function cleanMedia(m, ownerId) {   // only photos from this person's own storage folder can show up on their page
  const out = {}, mine = MEDIA + ownerId + "/";
  if (m && typeof m === "object") for (const k in m) { const v = m[k]; if (typeof v === "string" && v.startsWith(mine) && /^[\w\-./%]+$/.test(v.slice(MEDIA.length)) && /^[\w-]{1,40}$/.test(k)) out[k] = v; }
  return out;
}
const niceName = u => u.replace(/_+/g, " ").trim().replace(/\b[a-z]/g, c => c.toUpperCase()) || u;

// Pages saved with the old flexippo editor (settings v2 / v1) are turned into tiles when they're shown.
const OLD_URL = { instagram: v => `https://www.instagram.com/${v}/`, snapchat: v => `https://www.snapchat.com/add/${v}`, youtube: v => "https://www.youtube.com/" + (v.includes("/") ? v : "@" + v),
  whatsapp: v => "https://wa.me/" + v, x: v => "https://x.com/" + v, tiktok: v => "https://www.tiktok.com/@" + v, discord: v => "https://discord.gg/" + v,
  spotify: v => (v.startsWith("https:") ? v : "https://open.spotify.com/" + v), telegram: v => "https://t.me/" + v, twitch: v => "https://www.twitch.tv/" + v, github: v => "https://github.com/" + v,
  linkedin: v => "https://www.linkedin.com/in/" + v, facebook: v => "https://www.facebook.com/" + v, threads: v => "https://www.threads.net/@" + v, pinterest: v => `https://www.pinterest.com/${v}/`,
  reddit: v => "https://www.reddit.com/user/" + v, steam: v => `https://steamcommunity.com/${v}/`, email: v => "mailto:" + v };
const EXAMPLE_TITLES = JSON.stringify(["S-Rank Otaku", "Builds websites at 3AM", "Main character energy", "Collector of shiny things"]);
// the very first editor (no "v") kept each app in its own box: instagram.handle, contact.whatsapp, spotify.url...
function v1Links(s) {
  const out = [], seen = new Set(), o = x => (x && typeof x === "object" ? x : {});
  const add = (k, raw) => {
    if (seen.has(k) || !P[k]) return;
    let v = String(raw === undefined || raw === null ? "" : raw).trim(), u = "";
    if (!v || /^@?flexippo$/i.test(v)) return;                                   // the example page's own accounts
    if (k === "email") { u = toUrl(v.replace(/^mailto:/i, "")); if (!u.startsWith("mailto:")) u = ""; }
    else if (/^https?:\/\//i.test(v) || v.includes("/")) {
      const x = toUrl(v);
      try { if (x && detect(x).k === k && new URL(x).pathname.replace(/\/+$/, "")) u = x; } catch (e) {}   // a bare "instagram.com/" is the example's
    } else if (P[k].mk && k !== "discord") {
      v = v.replace(/^@/, ""); if (P[k].digits) v = v.replace(/\D/g, "");
      if (P[k].re.test(v)) u = P[k].mk(v);
    }
    if (u) { seen.add(k); out.push({ k, u, v }); }
  };
  const ig = o(s.instagram), sc = o(s.snapchat), xx = o(s.x), sp = o(s.spotify), dc = o(s.discord), C = o(s.contact);
  add("instagram", ig.handle); add("instagram", ig.url); add("snapchat", sc.handle); add("snapchat", sc.url); add("x", xx.handle); add("x", xx.url);
  add("spotify", sp.url); add("discord", dc.url);
  add("instagram", C.instagram); add("snapchat", C.snapchat); add("x", C.x); add("whatsapp", C.whatsapp); add("discord", C.discord); add("email", C.gmail);
  return out;
}
function fromOld(row, s, media) {
  const prof = s.profile && typeof s.profile === "object" ? s.profile : {};
  let titles = Array.isArray(prof.titles) ? prof.titles.map(x => clip(x, 40)).filter(Boolean) : [];
  if (JSON.stringify(titles) === EXAMPLE_TITLES) titles = [];
  const tiles = [], m2 = {}, ownPage = /^satyam/.test(row.username);
  if (media.avatar) m2.avatar = media.avatar;
  const apps = s.v === 2
    ? (Array.isArray(s.socials) ? s.socials : []).map(x => (x && OLD_URL[x.k] && typeof x.v === "string" && x.v.trim() ? { k: x.k, v: x.v.trim(), u: OLD_URL[x.k](x.v.trim()) } : null)).filter(Boolean)
    : v1Links(s);
  apps.forEach(x => {
    if (!ownPage && /^@?(flexippo|satyamchoure08)$/i.test(x.v)) return;      // copied from the old example page
    const u = safeUrl(x.u); if (u) tiles.push({ id: "o" + tiles.length, t: "link", s: tiles.length ? "s" : "w", u, k: x.k, l: "", cp: "" });
  });
  (Array.isArray(s.links) ? s.links : []).forEach(x => { const u = x && safeUrl(x.u); if (u) tiles.push({ id: "o" + tiles.length, t: "link", s: "w", u, k: "", l: clip(x.t, 40), cp: "" }); });
  const caps = { cover: "" };
  (Array.isArray(s.collection) ? s.collection : []).forEach(it => { if (it && it.id) caps["col_" + it.id] = it.alt || it.meme || it.title || ""; });
  ((s.instagram && s.instagram.posts) || []).forEach((p, i) => { caps["ig" + i] = (p && p.cap) || ""; });
  ((s.snapchat && s.snapchat.stories) || []).forEach((p, i) => { caps["sc" + i] = (p && p.cap) || ""; });
  let photos = 0;
  // the owner's own uploaded photos (cover, collection, posts, stories) become photo tiles; small game icons/logos don't
  const keys = Object.keys(media).filter(k => /^(cover$|col_|ig\d|sc\d|x\d)/.test(k) && !/_(icon|logo)$/.test(k)).sort((a, b) => (b === "cover") - (a === "cover"));
  keys.forEach(k => {
    const id = ("m" + k).replace(/[^\w-]/g, "").slice(0, 24);
    m2["p_" + id] = media[k];
    tiles.push({ id, t: "photo", s: photos++ ? "s" : "l", cap: clip(caps[k], 60), u: "" });
  });
  return { name: clip(prof.name, 40) || clip(row.display_name, 40) || row.username, bio: titles.join(" · "), theme: "paper", tiles: tiles.slice(0, MAX_TILES), media: m2, og: null, fresh: true };
}
function pageFrom(row) {
  const s = row.settings && typeof row.settings === "object" && !Array.isArray(row.settings) ? row.settings : {};
  const media = cleanMedia(row.media, row.id);
  if (s.v !== 3) return fromOld(row, s, media);
  const prof = s.profile && typeof s.profile === "object" ? s.profile : {};
  const seen = new Set(), tiles = [];
  (Array.isArray(s.tiles) ? s.tiles : []).forEach(t => { const c = cleanTile(t); if (c && !seen.has(c.id)) { seen.add(c.id); tiles.push(c); } });
  return { name: clip(prof.name, 40) || clip(row.display_name, 40) || row.username, bio: clip(prof.bio, 160, true), theme: THEMES.includes(s.theme) ? s.theme : "paper",
    tiles: tiles.slice(0, MAX_TILES), media, og: s.og && typeof s.og === "object" ? s.og : null, fresh: false };
}

/* ======================= drawing a page ======================= */
function avatarHtml(pg, o) {
  const src = (o.local && o.local.avatar) || pg.media.avatar;
  return src ? `<img class="av" src="${esc(src)}" alt="" width="96" height="96" decoding="async">` : `<div class="av av-mono" aria-hidden="true">${esc((pg.name || "?").trim().charAt(0).toUpperCase() || "?")}</div>`;
}
function tileHtml(t, pg, o) {
  const still = o.edit || o.example;                       // editor + examples: tiles don't open links
  const data = `data-id="${esc(t.id)}"` + (o.edit ? ' tabindex="0" role="button"' : "");
  if (t.t === "link") {
    const d = t.u ? detect(t.u) : { k: t.k, h: "" }, k = P[d.k] ? d.k : (P[t.k] && t.cp ? t.k : ""), p = P[k];
    const label = t.l || (p ? p.n : d.host || "Link");
    const sub = t.cp ? (p && p.at === 1 ? "@" : "") + t.cp : (d.h || "");
    const style = p ? ` style="--b:${p.bg};--bf:${p.fg || "#fff"}"` : "";
    const ic = icon(p ? (p.i || k) : t.u.startsWith("mailto:") ? "mail" : "globe");
    const cta = t.s !== "s" ? `<span class="cta">${esc(t.cp ? "Copy" : p ? p.cta : "Open")}</span>` : `<span class="go">${icon(t.cp ? "copy" : "arrow")}</span>`;
    const inner = `<span class="ico">${ic}</span>${cta}<span class="tx"><b>${esc(label)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</span>`;
    if (still) return `<div class="tile tl-link s-${t.s}" ${data}${style}>${inner}</div>`;
    if (t.cp) return `<button type="button" class="tile tl-link s-${t.s}" data-copy="${esc(t.cp)}"${style} aria-label="${esc(label + ": " + sub + ". Tap to copy")}">${inner}</button>`;
    return `<a class="tile tl-link s-${t.s}" href="${esc(t.u)}" target="_blank" rel="noopener nofollow ugc"${style} aria-label="${esc(label + (sub ? ": " + sub : ""))}">${inner}</a>`;
  }
  if (t.t === "photo") {
    const src = (o.local && o.local[t.id]) || pg.media["p_" + t.id];
    if (!src) return o.edit ? `<div class="tile tl-photo tl-empty s-${t.s}" ${data}>${icon("image")}<span>Tap to add a photo</span></div>` : "";
    const inner = `<img src="${esc(src)}" alt="${esc(t.cap || "Photo")}" loading="lazy" decoding="async">${t.cap ? `<span class="cap">${esc(t.cap)}</span>` : ""}${t.u ? `<span class="pl">${icon("arrow")}</span>` : ""}${o.busy && o.busy[t.id] ? `<span class="busy">${icon("loader")}</span>` : ""}`;
    if (!still && t.u) return `<a class="tile tl-photo s-${t.s}" href="${esc(t.u)}" target="_blank" rel="noopener nofollow ugc">${inner}</a>`;
    return `<div class="tile tl-photo s-${t.s}" ${data}>${inner}</div>`;
  }
  if (t.t === "note") return `<div class="tile tl-note s-${t.s} c-${t.c}${t.x.length <= 48 ? " big" : ""}" ${data}><p>${esc(t.x)}</p></div>`;
  return "";
}
function tilesHtml(pg, o) {
  // a heading starts a new group of tiles
  const secs = [{ head: null, items: [] }];
  pg.tiles.forEach(t => { if (t.t === "head") secs.push({ head: t, items: [] }); else secs[secs.length - 1].items.push(t); });
  return secs.map((s, i) => {
    const items = s.items.map(t => tileHtml(t, pg, o)).join(""), add = i === secs.length - 1 && o.addTile ? o.addTile : "";
    const head = s.head ? `<h2 class="sec" data-id="${esc(s.head.id)}"${o.edit ? ' tabindex="0" role="button"' : ""}>${esc(s.head.x)}</h2>` : "";
    return head + (items || add ? `<div class="gw"><div class="grid">${items}${add}</div></div>` : "");
  }).join("");
}
function pageHtml(pg, o = {}) {
  return `<div class="pg" data-theme="${esc(pg.theme)}"><div class="pg-in">
    <header class="pf">${o.header || `${avatarHtml(pg, o)}<h1 class="nm">${esc(pg.name)}</h1>${pg.bio ? `<p class="bio">${esc(pg.bio)}</p>` : ""}`}</header>
    <div class="tiles">${tilesHtml(pg, o)}</div>
  </div></div>`;
}

/* ======================= small UI pieces: toast, pop-up panels ======================= */
let toastEl = null, toastT = 0;
function toast(msg, action, ms) {
  if (!toastEl) { toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); toastEl.setAttribute("aria-live", "polite"); document.body.appendChild(toastEl); }
  toastEl.innerHTML = `<span>${esc(msg)}</span>${action ? `<button type="button">${esc(action.label)}</button>` : ""}`;
  if (action) toastEl.querySelector("button").onclick = () => { hideToast(); action.run(); };
  toastEl.classList.add("in"); clearTimeout(toastT);
  toastT = setTimeout(hideToast, ms || (action ? 5200 : 2600));
}
function hideToast() { if (toastEl) toastEl.classList.remove("in"); }
function sheet({ title, html, onMount, onClose, cls }) {
  const back = document.createElement("div"); back.className = "sh-back";
  back.innerHTML = `<div class="sh ${cls || ""}" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="sh-h"><h2>${esc(title)}</h2><button class="sh-x" type="button" aria-label="Close">${icon("x_")}</button></div><div class="sh-b">${html}</div></div>`;
  const prev = document.activeElement;
  $$(".sh-back").forEach(b => b.__close && b.__close(true));
  document.body.appendChild(back); document.body.classList.add("sh-open");
  const el = back.firstElementChild;
  const onKey = e => { if (e.key === "Escape") { e.stopPropagation(); close(); } };
  function close(quiet) {
    if (!back.isConnected) return;
    back.remove(); removeEventListener("keydown", onKey, true);
    if (!$(".sh-back")) document.body.classList.remove("sh-open");
    if (onClose) onClose(quiet);
    if (!quiet && prev && prev.focus && prev.isConnected) prev.focus({ preventScroll: true });
  }
  back.__close = close;
  addEventListener("keydown", onKey, true);
  back.addEventListener("click", e => { if (e.target === back) close(); });
  el.querySelector(".sh-x").addEventListener("click", () => close());
  requestAnimationFrame(() => back.classList.add("in"));
  if (onMount) onMount(el, close);
  const f = el.querySelector("[data-focus]"); if (f) setTimeout(() => f.focus(), 30);
  return { el, close };
}
function say(el, text, ok) { if (!el) return; el.textContent = text || ""; el.classList.toggle("ok", !!ok); }

/* ======================= database (public reads need no login library) ======================= */
async function rest(path, opt = {}) {
  const h = { apikey: SUPA.key, Authorization: "Bearer " + (opt.token || SUPA.key), Accept: "application/json" };
  if (opt.body !== undefined) h["Content-Type"] = "application/json";
  const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), opt.timeout || 12000);
  try {
    const r = await fetch(SUPA.url + "/rest/v1/" + path, { method: opt.method || "GET", headers: h, body: opt.body === undefined ? undefined : JSON.stringify(opt.body), signal: ctl.signal });
    const txt = await r.text(); let j = null; try { j = txt ? JSON.parse(txt) : null; } catch (e) {}
    if (!r.ok) { const e = new Error((j && (j.message || j.msg)) || "HTTP " + r.status); e.code = j && j.code; e.status = r.status; throw e; }
    return j;
  } finally { clearTimeout(tm); }
}
const getProfile = async u => ((await rest(`profiles?select=${COLS}&username=eq.${encodeURIComponent(u)}&limit=1`)) || [])[0] || null;
const usernameFree = async u => !((await rest(`profiles?select=id&username=eq.${encodeURIComponent(u)}&limit=1`)) || []).length;
function savedSession() {     // the login saved on this phone (read without downloading the login library)
  try { const s = JSON.parse(localStorage.getItem(SB_KEY) || "null"); const user = s && (s.user || (s.currentSession && s.currentSession.user)); return user && user.id ? { id: user.id } : null; } catch (e) { return null; }
}
function friendlyError(e) {
  const m = String((e && (e.message || e.error_description || e.msg)) || e || "");
  if (/failed to fetch|networkerror|load failed|network request failed|aborted/i.test(m)) return "No connection. Check your internet and try again.";
  if (/invalid login credentials/i.test(m)) return "Wrong email or password.";
  if (/email not confirmed/i.test(m)) return "Confirm your email first: tap the link we sent you.";
  if (/already registered|already been registered|user already exists/i.test(m)) return "That email already has an account. Log in instead.";
  if (/password should be|weak password|password is too/i.test(m)) return "Use a longer password (at least 6 characters).";
  if (/rate limit|too many requests|for security purposes/i.test(m)) return "Too many tries. Wait a minute and try again.";
  if (/unable to validate email|invalid email|email address .*invalid/i.test(m)) return "That email doesn't look right.";
  if (/signups? (are )?not allowed|signup is disabled/i.test(m)) return "New sign-ups are turned off right now.";
  if (/payload too large|exceeded the maximum|entity too large|too large/i.test(m)) return "That photo is too big. Pick a smaller one.";
  if (/mime type|invalid_mime/i.test(m)) return "That file type isn't supported. Use a JPG or PNG photo.";
  if (/not_logged_in|jwt expired|invalid jwt|refresh token/i.test(m)) return "You were logged out. Log in again.";
  if (e && e.code === "23505") return "That name was just taken. Pick another.";
  return m || "Something went wrong. Try again.";
}

/* ======================= accounts (Supabase login library, downloaded only when needed) ======================= */
const Cloud = (() => {
  let sb = null, user = null, me = null, loading = null;
  const subs = [];
  const emit = why => subs.forEach(f => { try { f(why); } catch (e) { console.error(e); } });
  async function loadMe() {
    me = null;
    if (sb && user) { const { data, error } = await sb.from("profiles").select("id,username,display_name").eq("id", user.id).maybeSingle(); if (error) throw error; me = data || null; }
    if (me) LS.set("me", { id: me.id, username: me.username }); else LS.del("me");
    return me;
  }
  function ensure() {
    if (loading) return loading;
    loading = (async () => {
      try { if (!(window.supabase && window.supabase.createClient)) await loadScript(SB_LIB); sb = window.supabase.createClient(SUPA.url, SUPA.key); }
      catch (e) { loading = null; throw e; }
      try { const { data } = await sb.auth.getSession(); user = data && data.session ? data.session.user : null; } catch (e) { user = null; }
      try { await loadMe(); } catch (e) {}
      sb.auth.onAuthStateChange((ev, session) => {
        const was = user && user.id; user = session ? session.user : null;
        setTimeout(async () => {                 // Supabase asks not to call it from inside this callback
          if (ev === "PASSWORD_RECOVERY") emit("recovery");
          if ((user && user.id) !== was) { try { await loadMe(); } catch (e) {} emit("auth"); }
        }, 0);
      });
      return sb;
    })();
    return loading;
  }
  return {
    ensure, on: f => subs.push(f),
    get sb() { return sb; }, get user() { return user; }, get me() { return me; },
    async refresh() { await ensure(); try { const { data } = await sb.auth.getSession(); user = data && data.session ? data.session.user : null; } catch (e) { user = null; } try { await loadMe(); } catch (e) {} return me; },
    async createMe(username) {
      await ensure();
      const { data, error } = await sb.from("profiles").insert({ id: user.id, username, display_name: niceName(username) }).select("id,username,display_name").single();
      if (error) throw error;
      me = data; LS.set("me", { id: me.id, username: me.username }); LS.del("pendingUser"); return me;
    },
    async signOut() { await ensure(); try { await sb.auth.signOut(); } catch (e) {} user = null; me = null; LS.del("me"); }
  };
})();
const goPage = (u, hash) => { location.href = "/?u=" + encodeURIComponent(u) + (hash || ""); };

/* ======================= sign up / log in panel ======================= */
const Auth = (() => {
  let checkFor = "";
  function wantedUser() {
    const m = Cloud.user && Cloud.user.user_metadata, u = String((m && m.username) || LS.get("pendingUser", "") || "").toLowerCase();
    return USER_RE.test(u) && !RESERVED.has(u) ? u : "";
  }
  async function ready(msgEl) {
    try { await Cloud.ensure(); return true; } catch (e) { say(msgEl, "Couldn't connect. Check your internet and try again."); return false; }
  }
  function nameField(id, val, noFocus) {
    return `<label class="fld"><span>Your link</span><div class="pre"><b>flexippo.com/</b><input id="${id}" value="${esc(val || "")}" autocomplete="username" autocapitalize="none" spellcheck="false" maxlength="20" inputmode="text" placeholder="yourname"${noFocus ? "" : " data-focus"}></div></label><p class="hint" id="${id}Hint">3 to 20 letters, numbers or _</p>`;
  }
  function watchName(el, input, hintEl) {
    let seq = 0, tm = 0;
    const check = () => {
      const v = input.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
      if (v !== input.value) input.value = v;
      const s = ++seq; clearTimeout(tm); hintEl.classList.remove("ok");
      if (!v) return say(hintEl, "3 to 20 letters, numbers or _");
      if (v.length < 3) return say(hintEl, "At least 3 characters");
      if (RESERVED.has(v)) return say(hintEl, "Taken. Try another.");
      say(hintEl, "Checking…");
      tm = setTimeout(async () => { try { const free = await usernameFree(v); if (s === seq) say(hintEl, free ? `flexippo.com/${v} is free` : "Taken. Try another.", free); } catch (e) { if (s === seq) say(hintEl, ""); } }, 350);
    };
    input.addEventListener("input", check); check();
  }
  function open(mode, opts = {}) {
    if (mode === "signup") return signup(opts.username || "");
    if (mode === "login") return login(opts.email || "");
  }
  function signup(username) {
    sheet({ title: "Make your page", html: `<form id="fSign" novalidate>${nameField("aUser", username, !!username)}
      <label class="fld"><span>Email</span><input class="inp" id="aEmail" type="email" autocomplete="email" inputmode="email" required${username ? " data-focus" : ""}></label>
      <label class="fld"><span>Password</span><div class="pwd"><input class="inp" id="aPass" type="password" autocomplete="new-password" minlength="6" required><button type="button" data-show>Show</button></div></label>
      <p class="msg" id="aMsg" role="alert"></p>
      <button class="btn btn-ink btn-wide" id="aGo">Make my page</button>
      <p class="hint" style="margin:14px 0 0;text-align:center">Already have one? <button type="button" class="linkbtn" data-login>Log in</button></p></form>`,
      onMount(el, close) {
        const u = $("#aUser", el), msg = $("#aMsg", el);
        watchName(el, u, $("#aUserHint", el));
        pwdToggle(el);
        $("[data-login]", el).onclick = () => { close(true); login($("#aEmail", el).value.trim()); };
        $("#fSign", el).addEventListener("submit", async e => {
          e.preventDefault();
          const name = u.value.trim().toLowerCase(), email = $("#aEmail", el).value.trim(), password = $("#aPass", el).value, btn = $("#aGo", el);
          if (!USER_RE.test(name) || RESERVED.has(name)) { u.focus(); return say(msg, "Pick your link: 3 to 20 letters, numbers or _."); }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { $("#aEmail", el).focus(); return say(msg, "Type your email address."); }
          if (password.length < 6) { $("#aPass", el).focus(); return say(msg, "Your password needs at least 6 characters."); }
          btn.disabled = true; say(msg, "Making your page…", true);
          try {
            if (!(await ready(msg))) return;
            let free = true; try { free = await usernameFree(name); } catch (err) {}
            if (!free) return say(msg, "That link was just taken. Try another.");
            const { data, error } = await Cloud.sb.auth.signUp({ email, password, options: { emailRedirectTo: SITE, data: { username: name } } });
            if (error) throw error;
            if (data && data.user && Array.isArray(data.user.identities) && !data.user.identities.length) { close(true); login(email, "That email already has an account. Log in here."); return; }
            LS.set("pendingUser", name);
            if (!data || !data.session) { close(true); checkEmail(email, name); return; }
            await Cloud.refresh();
            await Cloud.createMe(name);
            goPage(name, "#new");
          } catch (err) { say(msg, friendlyError(err)); }
          finally { btn.disabled = false; }
        });
      } });
  }
  function login(email, note) {
    sheet({ title: "Log in", html: `<form id="fLog" novalidate>
      <label class="fld"><span>Email</span><input class="inp" id="lEmail" type="email" autocomplete="email" inputmode="email" value="${esc(email || "")}" required data-focus></label>
      <label class="fld"><span>Password</span><div class="pwd"><input class="inp" id="lPass" type="password" autocomplete="current-password" required><button type="button" data-show>Show</button></div></label>
      <p class="msg" id="lMsg" role="alert"></p>
      <button class="btn btn-ink btn-wide" id="lGo">Log in</button>
      <p class="hint" style="margin:14px 0 0;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap"><button type="button" class="linkbtn" data-forgot>Forgot password?</button><span>New here? <button type="button" class="linkbtn" data-sign>Make a page</button></span></p></form>`,
      onMount(el, close) {
        const msg = $("#lMsg", el);
        if (note) say(msg, note, true);
        pwdToggle(el);
        $("[data-sign]", el).onclick = () => { close(true); signup(""); };
        $("[data-forgot]", el).onclick = () => { close(true); forgot($("#lEmail", el).value.trim()); };
        $("#fLog", el).addEventListener("submit", async e => {
          e.preventDefault();
          const em = $("#lEmail", el).value.trim(), pw = $("#lPass", el).value, btn = $("#lGo", el);
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return say(msg, "Type your email address.");
          if (!pw) return say(msg, "Type your password.");
          btn.disabled = true; say(msg, "One moment…", true);
          try {
            if (!(await ready(msg))) return;
            const { error } = await Cloud.sb.auth.signInWithPassword({ email: em, password: pw });
            if (error) { if (/email not confirmed/i.test(error.message || "")) { close(true); checkEmail(em, ""); return; } throw error; }
            const me = await Cloud.refresh();
            close(true); afterLogin(me);
          } catch (err) { say(msg, friendlyError(err)); }
          finally { btn.disabled = false; }
        });
      } });
  }
  function forgot(email) {
    sheet({ title: "Reset your password", html: `<form id="fFor" novalidate><p class="hint">We'll email you a link to set a new password.</p>
      <label class="fld"><span>Email</span><input class="inp" id="fEmail" type="email" autocomplete="email" value="${esc(email || "")}" data-focus></label>
      <p class="msg" id="fMsg" role="alert"></p><button class="btn btn-ink btn-wide" id="fGo">Send the link</button></form>`,
      onMount(el) {
        const msg = $("#fMsg", el);
        $("#fFor", el).addEventListener("submit", async e => {
          e.preventDefault();
          const em = $("#fEmail", el).value.trim(), btn = $("#fGo", el);
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return say(msg, "Type your email address.");
          btn.disabled = true; say(msg, "Sending…", true);
          try {
            if (!(await ready(msg))) return;
            const { error } = await Cloud.sb.auth.resetPasswordForEmail(em, { redirectTo: SITE });
            if (error) throw error;
            say(msg, "If that email has an account, the link is on its way. Check spam too.", true);
          } catch (err) { say(msg, friendlyError(err)); }
          finally { btn.disabled = false; }
        });
      } });
  }
  function checkEmail(email, name) {
    checkFor = email;
    sheet({ title: "Check your email", html: `<p class="hint" style="font-size:16px;color:var(--ink)">We sent a link to <b>${esc(email)}</b>. Tap it to ${name ? `finish making <b>flexippo.com/${esc(name)}</b>` : "log in"}.</p>
      <p class="hint">Can't find it? Look in spam.</p><p class="msg" id="cMsg" role="status"></p>
      <div class="sh-foot"><button class="btn btn-line" id="cAgain">Send it again</button><button class="btn btn-ink" id="cOk">OK</button></div>`,
      onMount(el, close) {
        $("#cOk", el).onclick = () => close();
        $("#cAgain", el).onclick = async () => {
          const b = $("#cAgain", el), msg = $("#cMsg", el); b.disabled = true; say(msg, "Sending…", true);
          try { if (!(await ready(msg))) return; const { error } = await Cloud.sb.auth.resend({ type: "signup", email: checkFor, options: { emailRedirectTo: SITE } }); if (error) throw error; say(msg, "Sent. Look in spam too.", true); }
          catch (err) { say(msg, friendlyError(err)); } finally { b.disabled = false; }
        };
      } });
  }
  function newPassword() {
    sheet({ title: "Set a new password", html: `<form id="fNew" novalidate><label class="fld"><span>New password</span><div class="pwd"><input class="inp" id="nPass" type="password" autocomplete="new-password" minlength="6" data-focus><button type="button" data-show>Show</button></div></label>
      <p class="msg" id="nMsg" role="alert"></p><button class="btn btn-ink btn-wide" id="nGo">Save password</button></form>`,
      onMount(el, close) {
        pwdToggle(el);
        const msg = $("#nMsg", el);
        $("#fNew", el).addEventListener("submit", async e => {
          e.preventDefault();
          const pw = $("#nPass", el).value, btn = $("#nGo", el);
          if (pw.length < 6) return say(msg, "Your password needs at least 6 characters.");
          btn.disabled = true; say(msg, "Saving…", true);
          try {
            if (!(await ready(msg))) return;
            const { error } = await Cloud.sb.auth.updateUser({ password: pw }); if (error) throw error;
            close(true); toast("Password saved");
            afterLogin(await Cloud.refresh(), true);
          } catch (err) { say(msg, friendlyError(err)); }
          finally { btn.disabled = false; }
        });
      } });
  }
  function pickName(note) {    // an account without a page yet (or the name they wanted got taken)
    sheet({ title: "Pick your link", html: `<form id="fPick" novalidate>${nameField("pUser", wantedUser())}<p class="msg" id="pMsg" role="alert"></p><button class="btn btn-ink btn-wide" id="pGo">Make my page</button></form>`,
      onMount(el, close) {
        const u = $("#pUser", el), msg = $("#pMsg", el);
        if (note) say(msg, note);
        watchName(el, u, $("#pUserHint", el));
        $("#fPick", el).addEventListener("submit", async e => {
          e.preventDefault();
          const name = u.value.trim().toLowerCase(), btn = $("#pGo", el);
          if (!USER_RE.test(name) || RESERVED.has(name)) return say(msg, "Pick your link: 3 to 20 letters, numbers or _.");
          btn.disabled = true; say(msg, "Making your page…", true);
          try { await Cloud.createMe(name); close(true); goPage(name, "#new"); }
          catch (err) { say(msg, friendlyError(err)); }
          finally { btn.disabled = false; }
        });
      } });
  }
  async function makeWanted() {
    const want = wantedUser();
    if (!want) return pickName();
    try { await Cloud.createMe(want); goPage(want, "#new"); }
    catch (err) { pickName(err && err.code === "23505" ? `flexippo.com/${want} was taken. Pick another.` : friendlyError(err)); }
  }
  function afterLogin(me, stay) {
    if (!me) return makeWanted();
    if (State.row && State.row.id === me.id) { if (!stay) toast("Welcome back"); startEditor(); return; }
    if (!stay || !State.row) goPage(me.username);
  }
  function pwdToggle(el) {
    $$("[data-show]", el).forEach(b => b.addEventListener("click", () => { const i = b.previousElementSibling; const show = i.type === "password"; i.type = show ? "text" : "password"; b.textContent = show ? "Hide" : "Show"; }));
  }
  return { open, newPassword, makeWanted, afterLogin, watchName, nameField, pickName };
})();

/* ======================= a person's page ======================= */
const State = { row: null, pg: null, editing: false };
const app = () => $("#app");
function setTheme(theme) { const m = $('meta[name="theme-color"]'); if (m) m.content = THEME_BG[theme] || THEME_BG.paper; document.body.style.background = THEME_BG[theme] || ""; }
function wireVisitor(root) {
  root.addEventListener("click", e => {
    const c = e.target.closest("[data-copy]"); if (!c) return;
    const t = c.dataset.copy;
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast("Copied " + t), () => toast(t));
  });
}
function renderVisitor() {
  const pg = State.pg;
  app().innerHTML = pageHtml(pg, {}) + `<a class="made" href="/">${'<img src="/assets/favicon-192.png" alt="" width="28" height="28">'}Make your own page</a>`;
  setTheme(pg.theme);
}
async function addView(id) {
  const k = "fx:v:" + id;
  try { if (sessionStorage.getItem(k)) return; sessionStorage.setItem(k, "1"); } catch (e) {}
  try { await rest("rpc/add_view", { method: "POST", body: { p_page: id } }); } catch (e) {}
}
async function startEditor() {
  if (State.editing) return;
  State.editing = true;
  try {
    await Promise.all([Cloud.ensure(), loadCss("/assets/fx-edit.css?v=" + VER), window.FXEdit ? 0 : loadScript("/assets/fx-edit.js?v=" + VER)]);
    if (!Cloud.user || Cloud.user.id !== State.row.id) {
      State.editing = false; renderVisitor();
      if (!Cloud.user) toast("Log in to edit your page", { label: "Log in", run: () => Auth.open("login") }, 8000);
      return;
    }
    window.FXEdit.start(API);
  } catch (e) {
    State.editing = false;
    toast("Couldn't open the editor. Check your connection and reload.");
  }
}
function showMissing(u) {
  document.title = "flexippo.com/" + u;
  const taken = RESERVED.has(u);
  app().innerHTML = `<div class="miss">${taken ? `<h1>This page doesn't exist</h1><p>Check the link and try again.</p><a class="btn btn-ink" href="/">Go to flexippo</a>`
    : `<h1><span class="claim-url">flexippo.com/</span><span class="claim-tile">${esc(u)}</span><span class="miss-free">is free</span></h1><p>Nobody has this name yet. It can be yours in a minute.</p><div class="miss-btns"><button class="btn btn-ink" id="mClaim">Claim it</button><a class="btn btn-line" href="/">See how it works</a></div>`}</div>`;
  const b = $("#mClaim"); if (b) b.onclick = () => Auth.open("signup", { username: u });
}
async function showPage(u) {
  document.body.classList.add("on-page");
  $("#home").hidden = true; app().hidden = false;
  app().innerHTML = `<div class="pg pg-load"><div class="pg-in"><header class="pf"><div class="av"></div><div class="nm"></div><div class="bio"></div></header><div class="gw"><div class="grid"><div class="tile s-w"></div><div class="tile"></div><div class="tile"></div></div></div></div></div>`;
  let row;
  try { row = await getProfile(u); }
  catch (e) {
    app().innerHTML = `<div class="miss"><h1>Couldn't load this page</h1><p>${esc(friendlyError(e))}</p><button class="btn btn-ink" onclick="location.reload()">Try again</button></div>`;
    return;
  }
  if (!row) return showMissing(u);
  State.row = row; State.pg = pageFrom(row);
  document.title = `${State.pg.name} (@${row.username}) · flexippo`;
  const ses = savedSession();
  if (ses && ses.id === row.id) { renderVisitor(); $(".made") && $(".made").remove(); startEditor(); return; }
  renderVisitor();
  addView(row.id);
}

/* ======================= the home page ======================= */
const EX = {
  kabir: { name: "Kabir Mehta", bio: "Guitar covers, beach weekends, chai over coffee. Pune.", theme: "paper", media: { avatar: "/assets/img/kabir.webp", p_g: "/assets/img/guitar.webp", p_b: "/assets/img/beach.webp" },
    tiles: [{ id: "g", t: "photo", s: "s", cap: "Sunday covers" }, { id: "i", t: "link", s: "s", u: "https://www.instagram.com/kabir.plays/" }, { id: "sp", t: "link", s: "w", u: "https://open.spotify.com/playlist/x", l: "On repeat this week" },
      { id: "n", t: "note", s: "s", x: "Open for gigs in Pune", c: "lime" }, { id: "y", t: "link", s: "s", u: "https://www.youtube.com/@kabirplays" }, { id: "b", t: "photo", s: "w", cap: "Goa with the crew" }, { id: "sn", t: "link", s: "s", u: "https://www.snapchat.com/add/kabir.plays" }] },
  aarav: { name: "Aarav", bio: "Shooting trips, editing reels, collecting sunsets.", theme: "ink", media: { avatar: "/assets/img/aarav.webp", p_h: "/assets/img/hike.webp", p_l: "/assets/img/lake.webp" },
    tiles: [{ id: "i", t: "link", s: "s", u: "https://www.instagram.com/aarav.frames/" }, { id: "t", t: "link", s: "s", u: "https://www.tiktok.com/@aarav.frames" }, { id: "h", t: "photo", s: "w", cap: "Trek season" },
      { id: "n", t: "note", s: "s", x: "New edit drops every Friday", c: "violet" }, { id: "d", t: "link", s: "s", cp: "aarav.frames", k: "discord" }, { id: "l", t: "photo", s: "w", cap: "Lake day" }] },
  mochi: { name: "Mochi", bio: "Professional napper. Owner of one human.", theme: "lime", media: { avatar: "/assets/img/mochi.webp", p_c: "/assets/img/cat.webp", p_p: "/assets/img/chocolate.webp" },
    tiles: [{ id: "c", t: "photo", s: "t", cap: "Sunday mood" }, { id: "i", t: "link", s: "s", u: "https://www.instagram.com/mochi.naps/" }, { id: "n", t: "note", s: "s", x: "Accepts treats", c: "pink" },
      { id: "tk", t: "link", s: "w", u: "https://www.tiktok.com/@mochi.naps" }, { id: "p", t: "photo", s: "s", cap: "Guarding this. Not sharing." }, { id: "y", t: "link", s: "s", u: "https://www.youtube.com/@mochinaps" }] }
};
function example(key) { const e = EX[key]; return { ...e, tiles: e.tiles.map(cleanTile).filter(Boolean), fresh: false, og: null }; }

function claimForm(form) {
  const input = $("input", form), tile = $(".claim-tile", form), mirror = $(".claim-mirror", form), status = $(".claim-status", form);
  const ph = ["yourname", "kabir", "mochi", "riya_draws", "aarav"];
  let seq = 0, tm = 0, phI = 0, phT = 0, last = "";
  const fit = () => {
    mirror.textContent = input.value || input.placeholder || " ";
    tile.style.fontSize = "";
    // the room for the text = the form's width minus the tile's own padding and its violet shadow
    const room = () => { const cs = getComputedStyle(tile), fs = parseFloat(cs.fontSize); return form.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - fs * 0.09 - 10; };
    let w = mirror.offsetWidth;
    for (let i = 0; i < 3 && w > room(); i++) {
      const fs = parseFloat(getComputedStyle(tile).fontSize);
      tile.style.fontSize = Math.max(26, fs * room() / w * 0.97) + "px";
      w = mirror.offsetWidth;
    }
    input.style.width = Math.ceil(w + 4) + "px";
  };
  const setStatus = (t, cls) => { status.textContent = t; status.className = "claim-status" + (cls ? " " + cls : ""); };
  const check = () => {
    const v = input.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
    if (v !== input.value) input.value = v;
    fit();
    if (v === last) return; last = v;
    const s = ++seq; clearTimeout(tm);
    if (!v) return setStatus("");
    if (v.length < 3) return setStatus("At least 3 characters");
    if (RESERVED.has(v)) return setStatus("Taken. Try another.", "bad");
    setStatus("Checking…");
    tm = setTimeout(async () => {
      try { const free = await usernameFree(v); if (s === seq) setStatus(free ? `flexippo.com/${v} is free` : "Taken. Try another.", free ? "ok" : "bad"); }
      catch (e) { if (s === seq) setStatus(""); }
    }, 320);
  };
  // the placeholder cycles through example names until someone starts typing
  const cycle = () => {
    clearTimeout(phT);
    if (!motionOK || input.value || document.activeElement === input) return;
    phT = setTimeout(() => { phI = (phI + 1) % ph.length; input.placeholder = ph[phI]; fit(); cycle(); }, phI === 0 ? 2600 : 1500);
  };
  input.addEventListener("input", check);
  input.addEventListener("focus", () => { clearTimeout(phT); if (!input.value) { input.placeholder = "yourname"; phI = 0; fit(); } });
  input.addEventListener("blur", cycle);
  addEventListener("resize", fit);
  form.addEventListener("submit", e => {
    e.preventDefault();
    const v = input.value.trim().toLowerCase();
    if (!USER_RE.test(v)) { input.focus(); return setStatus(v ? "Use 3 to 20 letters, numbers or _" : "Type the name you want first", "bad"); }
    if (RESERVED.has(v)) return setStatus("Taken. Try another.", "bad");
    if (status.classList.contains("bad")) { input.focus(); return; }
    const mine = LS.get("me", null);
    if (mine && savedSession()) { toast("You already have a page"); goPage(mine.username); return; }
    Auth.open("signup", { username: v });
  });
  fit(); cycle();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
}
function showHome() {
  const home = $("#home");
  $$(".claim-form", home).forEach(claimForm);
  const frame = $("#demoFrame"), pick = $("#demoPick");
  const show = key => {
    const pg = example(key);
    frame.innerHTML = pageHtml(pg, { example: true });
    frame.style.setProperty("--fade", THEME_BG[pg.theme]);
    $$("button", pick).forEach(b => b.setAttribute("aria-pressed", b.dataset.ex === key ? "true" : "false"));
  };
  pick.addEventListener("click", e => { const b = e.target.closest("[data-ex]"); if (b) show(b.dataset.ex); });
  show("kabir");
  // the tiles in "Everything goes in a tile" use the real tile styles
  const ic = $("#ftIcons"); if (ic) ic.innerHTML = ["instagram", "snapchat", "youtube", "spotify", "whatsapp", "discord", "tiktok"].map(k => `<span style="--b:${P[k].bg};--bf:${P[k].fg || "#fff"}">${icon(k)}</span>`).join("");
  $$("[data-icon]", home).forEach(el => { el.innerHTML = icon(el.dataset.icon); });
  $$("[data-login]").forEach(b => b.addEventListener("click", () => { const me = LS.get("me", null); if (me && savedSession()) goPage(me.username); else Auth.open("login"); }));
  const me = LS.get("me", null);
  if (me && savedSession()) $$("[data-login]").forEach(b => { b.textContent = "My page"; });
}

/* ======================= start ======================= */
const VER = "3.0.0";
const API = { SITE, SUPA, MEDIA, USER_RE, RESERVED, THEMES, THEME_BG, NOTE_COLORS, SIZES, MAX_TILES, P, QUICK, $, $$, esc, clip, uid, LS, icon, toUrl, safeUrl, detect, cleanTile, pageFrom, pageHtml, tilesHtml, tileHtml, avatarHtml,
  toast, sheet, say, rest, Cloud, Auth, State, friendlyError, setTheme, renderVisitor, loadScript, goPage, wireVisitor, motionOK };
window.FX = API;

function pageFromUrl() {
  try {
    const q = String(new URLSearchParams(location.search).get("u") || "").trim().replace(/^@/, "").toLowerCase();
    if (USER_RE.test(q)) return q;
    const p = decodeURIComponent(location.pathname).replace(/^\/+|\/+$/g, "").replace(/^@/, "").toLowerCase();
    return USER_RE.test(p) && p !== "index" ? p : "";
  } catch (e) { return ""; }
}
const AUTH_IN_URL = /(^#|&)(access_token|error_description|error_code)=/.test(location.hash) || /[?&](token_hash|error_description)=/.test(location.search);
const AUTH_ERROR = (() => { try { const m = /error_description=([^&]+)/.exec(location.hash + "&" + location.search); return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : ""; } catch (e) { return ""; } })();
const U = pageFromUrl();

Cloud.on(why => {
  if (why === "recovery") Auth.newPassword();
});
wireVisitor(document);

if (U) {
  // show the short link in the address bar (people copy flexippo.com/name)
  if (!AUTH_IN_URL) { try { if (location.pathname !== "/" + U) history.replaceState(null, "", "/" + U + location.hash); } catch (e) {} }
  showPage(U);
} else {
  showHome();
}

// coming back from an email link (confirm account / reset password)
if (AUTH_IN_URL) {
  const recovery = /type=recovery/.test(location.hash);
  Cloud.ensure().then(async () => {
    try { history.replaceState(null, "", U ? "/" + U : "/"); } catch (e) {}
    if (AUTH_ERROR) { toast(/expired|invalid/i.test(AUTH_ERROR) ? "That link has expired. Log in or ask for a new one." : AUTH_ERROR, null, 6000); Auth.open("login"); return; }
    if (recovery) return;           // the "Set a new password" panel opens by itself
    const me = await Cloud.refresh();
    if (Cloud.user) Auth.afterLogin(me);
  }).catch(() => toast("Couldn't connect. Check your internet and reload."));
}
})();
