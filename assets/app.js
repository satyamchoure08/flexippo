/* flexippo.com: everything the page does.
   - flexippo.com (no name in the link) is the EXAMPLE page: sample likes and comments, clearly marked "DEMO".
   - flexippo.com/name is that person's own page: real likes, comments, guestbook and views (saved in Supabase).
   - Speed: no full-screen effects, nothing heavy runs in the background, music only after a tap,
     and the login library is only downloaded when it's actually needed. */
"use strict";

/* =====================================================================
   EDIT THIS PART: everything on the page comes from CONFIG.
   ===================================================================== */
const CONFIG = {
  name: "SATYAM",
  heroName: "YOUR NAME",                 // big name at the top of the page
  kana: "サティヤム",
  titles: ["S-Rank Otaku", "Builds websites at 3AM", "Main character energy", "Collector of shiny things"],
  avatar: "assets/avatar.webp",       // profile picture (used in the story viewer)
  cover: "assets/cover-main.jpg",         // big main photo at the top
  birthday: "",                      // MM-DD, e.g. "11-20" (empty hides the countdown)
  defaultSkin: "sakura",              // night | sakura | fire
  // "Get your own website" box at the bottom of the page (your Flexippo business)
  flexippo: {
    instagram: "flexippo",           // Instagram username that receives orders (no @)
    whatsapp: "",                    // optional: WhatsApp number with country code, digits only, e.g. "919876543210"
    vibes: ["🎌 Anime", "🎮 Gamer", "🦸 Superhero", "⚽ Football", "🌸 Aesthetic", "✨ Something else"]
  },
  // Example likes and comments, shown ONLY on the example page (flexippo.com) and marked "DEMO" there.
  // People's own pages always show their real likes and comments instead.
  hype: {
    likes: [1200000, 9800000],       // example like count range (1.2M to 9.8M)
    comments: [2400, 48000],         // example comment count range (2.4K to 48K)
    perItem: 12,                     // example comments shown under each photo
    people: ["aura.farmer", "npc.no.more", "ramen.at.3am", "lowkey.otaku", "sigma.scrolls", "drip.check.99", "midnight.gamer", "certified.weeb",
             "sakura.drift", "gpu.goblin", "rizz.reaper", "main.char.mode", "chai.and.anime", "sleep.is.404", "pixel.prince", "mid.but.vibing",
             "ghost.typing", "touch.grass.later", "speedrun.life", "bro.said.what"],
    lines: ["aura +1000 🔥", "bro is NOT an NPC 💀", "W collection fr", "where do you even get this 😭", "this is so clean bro",
            "main character behaviour", "my wallet is crying rn 😭", "ok this one goes hard", "lowkey jealous ngl", "10/10 no notes",
            "how is this even real", "saving this for my vision board ✨", "the aura on this one is unreal 😭", "bro unlocked a new rarity",
            "who gave you permission to go this hard", "certified W 🔥", "need this in my life fr", "this is giving main character",
            "rating: 11/10", "my FYP brought me here 💀", "screenshotting this rn", "the drip is illegal", "lowkey the best one here",
            "no thoughts just this 🤌", "how much for this 😭", "sending this to the gc", "bestie this is elite", "i was not ready for this",
            "built different fr", "not me zooming in for 5 mins"]
  },
  siteUrl: "https://flexippo.com",   // your site link: shown in the share box, link previews and QR code
  homeProfile: "",                   // optional: your flexippo username. Then this main page shows the page you edit online
  song: { src: "assets/theme-soft.mp3", title: "Anime Cyberpunk", artist: "HitsLab" },
  // Contact section: fill in "value" for any of these and it turns on by itself. Leave "" to keep it greyed out.
  contact: [
    { id: "x", label: "X", icon: "x", brand: "#111111", value: "Satyamchoure08", url: "https://x.com/Satyamchoure08" },
    { id: "instagram", label: "Instagram", icon: "instagram", brand: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)", value: "flexippo", url: "https://www.instagram.com/flexippo/" },
    { id: "gmail", label: "Gmail", icon: "", brand: "#ea4335", value: "", url: "" },        // put your email here, e.g. value: "you@gmail.com", url: "mailto:you@gmail.com"
    { id: "snapchat", label: "Snapchat", icon: "snapchat", brand: "#fffc00", value: "", url: "" },
    { id: "whatsapp", label: "WhatsApp", icon: "whatsapp", brand: "#25d366", value: "", url: "" },
    { id: "discord", label: "Discord", icon: "discord", brand: "#5865f2", value: "", url: "" }
  ],
  ticker: ["夜の東京", "S-RANK OTAKU", "限界突破", "WELCOME TO MY UNIVERSE", "サティヤム"],
  socials: [
    { id: "instagram", label: "Instagram", handle: "@flexippo", url: "https://www.instagram.com/", icon: "instagram", brand: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)", cta: "Follow", width: "",
      posts: [
        { img: "assets/post-beach-crew.jpg", cap: "golden hour with the gang 🌅" },
        { img: "assets/post-hike-crew.jpg", cap: "weekend with the crew 🏕️" },
        { img: "assets/post-lake.jpg", cap: "lake days 🌊" }
      ] },
    { id: "spotify", label: "Spotify", url: "https://open.spotify.com/", icon: "spotify", brand: "#1ed760", cta: "Listen" },          // sits in the bottom card, next to Discord
    { id: "snapchat", label: "Snapchat", handle: "@flexippo", url: "https://www.snapchat.com/", icon: "snapchat", brand: "#fffc00", cta: "Add me", width: "w3",
      score: 128402, streak: 365,     // Snapscore and 🔥 streak shown on the card
      stories: [                      // tap a story to watch it, like on Snapchat
        { img: "assets/col/ginger-cat.jpg", cap: "new roommate 🐱", when: "2h" },
        { img: "assets/col/mecha-robot.jpg", cap: "built different 🤖", when: "5h" },
        { img: "assets/story-palms.jpg", cap: "touching grass fr 🌴", when: "9h" },
        { img: "assets/col/guitar.jpg", cap: "3am jam 🎸", when: "14h" }
      ] },
    { id: "x", label: "X", handle: "@flexippo", url: "https://x.com/", icon: "x", brand: "#111111", cta: "Follow", width: "w3",
      post: { img: "assets/x-profile.jpg", text: "My X profile", when: "" } },   // screenshot of the X profile
    { id: "discord", label: "Discord", handle: "Neon Dojo server", url: "https://discord.com/", icon: "discord", brand: "#5865f2", cta: "Join server",              // sits in the bottom card, next to Spotify
      blurb: "Late-night gaming, anime talk and build logs. Pull up." }
  ],
  // Extra link buttons under the socials (YouTube, a shop, a game profile...). The owner adds them from ✎ Customize > Links.
  links: [],
  linkLimit: 8,
  // Spotify card. The owner can also change all of this from the page (✎ Customize).
  spotify: {
    title: "On repeat",
    subtitle: "What I'm playing this week",
    playlist: "Late Night Neon",
    artist: "Playlist by Satyam",
    cover: "assets/album.webp",
    url: "https://open.spotify.com/",
    accent: "#1ed760",
    tracks: ["Anime Cyberpunk — HitsLab"]
  },
  // Collection: up to 6 photos (keeps pages clean). The example page shows the kind of stuff people flex here.
  // A "uc" item ({ type: "uc", amount, unit, game, icon, logo }) is a text card for in-game currency.
  collectionLimit: 6,
  collection: [
    { id: "pc", img: "assets/col/gaming-pc.jpg", alt: "My RGB gaming PC build" },
    { id: "jordans", img: "assets/col/jordan-1.jpg", alt: "Air Jordan 1 'Chicago'" },
    { id: "ps5", img: "assets/col/ps5.jpg", alt: "PS5 + DualSense" },
    { id: "travis", img: "assets/col/travis-jordans.jpg", alt: "Travis Scott Jordan 1 Lows" },
    { id: "switch", img: "assets/col/switch.jpg", alt: "Nintendo Switch" },
    { id: "airpods", img: "assets/col/airpods-pro.jpg", alt: "AirPods Pro" }
  ],
  // example comment pinned on a photo on the demo page (photo id: commenter)
  pins: { "pc": "gpu.goblin", "jordans": "drip.check.99" }
};
const BASE = JSON.parse(JSON.stringify(CONFIG));   // the defaults above. Every person's page starts from these.

/* ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const mq = q => { try { return matchMedia(q).matches; } catch (e) { return false; } };
const reduce = mq("(prefers-reduced-motion: reduce)");
const fine = mq("(pointer: fine)");
const LITE = document.documentElement.classList.contains("lite");
const LS = {
  get(k, d) { try { const v = localStorage.getItem("nv_" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("nv_" + k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem("nv_" + k); } catch (e) {} }
};
let toastT;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 2600); }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function seeded(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
function seedOf(str) { let h = 2166136261; for (const c of String(str)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function seedOfText(t) { let h = 5381; for (const c of String(t)) h = (h * 33) ^ c.charCodeAt(0); return h >>> 0; }
const idle = fn => (window.requestIdleCallback ? requestIdleCallback(fn, { timeout: 2500 }) : setTimeout(fn, 900));
function compact(n) {
  n = Math.max(0, +n || 0);
  const f = (v, u) => (v >= 100 ? Math.floor(v) : Math.floor(v * 10) / 10).toString().replace(/\.0$/, "") + u;
  return n >= 1e6 ? f(n / 1e6, "M") : n >= 1e4 ? f(n / 1e3, "K") : n.toLocaleString();
}
const plural = (n, one, many) => (Math.round(+n) === 1 ? one : many || one + "s");
function loadScript(src) {
  return new Promise((res, rej) => { const s = document.createElement("script"); s.src = src; s.async = true; s.onload = res; s.onerror = () => { s.remove(); rej(new Error("Failed to fetch")); }; document.head.appendChild(s); });
}

/* ---------- smaller photos for phones ----------
   The site's own photos also exist as small WebP copies in assets/opt (made from the originals, which stay as they are).
   [original width, original height, [copy widths]] */
const OPT = {"assets/cover-main.jpg":[1440,1800,[800,1100,1440]],"assets/story-palms.jpg":[898,1350,[240,898]],"assets/post-beach-crew.jpg":[612,408,[320,612]],"assets/post-hike-crew.jpg":[720,540,[320,720]],"assets/post-lake.jpg":[1200,830,[320,720]],"assets/x-profile.jpg":[1000,746,[700,1000]],"assets/og-kai.jpg":[1200,630,[640]],"assets/flexippo-avatar.png":[320,320,[320]],"assets/col/ginger-cat.jpg":[640,640,[320,640]],"assets/col/guitar.jpg":[640,640,[320,640]],"assets/col/mecha-robot.jpg":[640,640,[320,640]]};
function optList(src) {
  const o = OPT[src]; if (!o) return null;
  const base = src.replace(/^assets\//, "assets/opt/").replace(/\.\w+$/, "");
  return o[2].map(w => [base + "-" + w + ".webp", w]);
}
// src + srcset for an <img>: small copy for small spots, the original for anything else
function imgSrc(src, sizes, big) {
  const l = optList(src);
  if (!l) return `src="${esc(src)}"`;
  const pick = big ? l[l.length - 1] : l[0];
  return `src="${esc(pick[0])}" srcset="${l.map(([p, w]) => esc(p) + " " + w + "w").join(", ")}" sizes="${esc(sizes)}"`;
}
function bestSrc(src) { const l = optList(src); return l ? l[l.length - 1][0] : src; }

/* ======================= ACCOUNTS + ONLINE PAGES (Supabase) ======================= */
// The publishable (anon) key is meant to be public. The database rules decide who can read or change what.
const SUPA = { url: "https://knmjxdnzttyacdtktbdl.supabase.co", key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubWp4ZG56dHR5YWNkdGt0YmRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzMjg5MTcsImV4cCI6MjEwNjkwNDkxN30.rEWcpL0OFyNhLAFLUuTWpx47uPquP40vcQz3GEqNvgE" };
const SB_LIB = "assets/vendor/supabase.js?v=2.118.0";
const SB_KEY = "sb-" + SUPA.url.replace(/^https:\/\//, "").split(".")[0] + "-auth-token";   // where the login is kept on this phone
const MEDIA_PREFIX = SUPA.url + "/storage/v1/object/public/media/";
const FLEX_AVATAR = "assets/flexippo-avatar.png";
const BASE_TITLE = document.title;
// email links (confirm account / reset password) come back with these in the address
const AUTH_IN_URL = /(^#|&)(access_token|error_description|error_code)=/.test(location.hash) || /[?&](code|token_hash|error_description)=/.test(location.search);
const AUTH_RECOVERY = /type=recovery/.test(location.hash);
const AUTH_HASH_ERROR = (() => { try { const m = /error_description=([^&]+)/.exec(location.hash); return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : ""; } catch (e) { return ""; } })();
// flexippo.com/name (or the older flexippo.com/?u=name) opens that person's page
const USER_RE = /^[a-z0-9_]{3,20}$/;
const PAGE_U = (() => {
  try {
    const q = String(new URLSearchParams(location.search).get("u") || "").trim().replace(/^@/, "").toLowerCase();
    if (USER_RE.test(q)) return q;
    const p = decodeURIComponent(location.pathname).replace(/^\/+|\/+$/g, "").replace(/^@/, "").toLowerCase();
    return USER_RE.test(p) && p !== "index" ? p : "";
  } catch (e) { return ""; }
})();
const prettyLink = u => BASE.siteUrl.replace(/\/+$/, "") + "/" + u;
// show the short link in the address bar too (so people copy flexippo.com/name)
if (PAGE_U && !AUTH_IN_URL) { try { if (location.pathname !== "/" + PAGE_U) history.replaceState(history.state, "", "/" + PAGE_U + location.hash); } catch (e) {} }
const pageKey = k => (PAGE_U ? k + "@" + PAGE_U : k);   // keeps each page's guestbook + likes apart on this device
if (PAGE_U) {   // until their page loads, show their username instead of the main page's name
  Object.assign(CONFIG, { name: PAGE_U, heroName: PAGE_U.toUpperCase().slice(0, 14), kana: "@" + PAGE_U, avatar: FLEX_AVATAR, birthday: "", cover: "", titles: [],
    ticker: [PAGE_U.toUpperCase(), "WELCOME TO MY PAGE", "限界突破", "FLEXIPPO.COM"], contact: BASE.contact.map(c => ({ ...c, value: "", url: "" })) });
}
function cleanSettings(s) {
  s = s && typeof s === "object" && !Array.isArray(s) ? JSON.parse(JSON.stringify(s)) : {};
  if (Array.isArray(s.collection)) s.collection = s.collection.filter(it => it && typeof it === "object").slice(0, 30).map(it => {
    ["img", "icon", "logo"].forEach(k => { if (it[k] && !/^assets\/[\w./-]+$/.test(String(it[k]))) it[k] = ""; });
    it.id = String(it.id || "").replace(/[^\w-]/g, "").slice(0, 40) || "c" + seedOfText(JSON.stringify(it)).toString(36);
    return it;
  });
  if (s.links !== undefined) s.links = cleanLinks(s.links);
  if (s.socials !== undefined) s.socials = cleanSocials(s.socials);
  return s;
}
function cleanMedia(m) {   // only our own photo storage (or the site's own images) may show up on a page
  const out = {};
  if (m && typeof m === "object") for (const k in m) { const v = m[k]; if (typeof v === "string" && (v.startsWith(MEDIA_PREFIX) || /^assets\/[\w./-]+$/.test(v))) out[k] = v; }
  return out;
}
function cleanLinks(v) {
  return (Array.isArray(v) ? v : []).filter(x => x && typeof x === "object").map(x => ({ t: String(x.t || "").trim().slice(0, 40), u: String(x.u || "").trim().slice(0, 300) }))
    .filter(x => /^https?:\/\/[^\s<>"']+\.[^\s<>"']+/i.test(x.u)).slice(0, CONFIG.linkLimit || 8);
}
/* ---------- socials on personal pages: the owner types a username, the link is made from it ---------- */
const IG_BRAND = "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)";
const SOCIAL = {
  instagram: { label: "Instagram", icon: "instagram", brand: IG_BRAND, cta: "Follow", at: 1, re: /^[A-Za-z0-9_.]{1,30}$/, url: v => "https://www.instagram.com/" + v + "/" },
  snapchat: { label: "Snapchat", icon: "snapchat", brand: "#fffc00", dark: 1, cta: "Add me", at: 1, re: /^[A-Za-z0-9_.-]{2,30}$/, url: v => "https://www.snapchat.com/add/" + v },
  youtube: { label: "YouTube", icon: "youtube", brand: "#ff0033", cta: "Subscribe", re: /^([A-Za-z0-9_.-]{3,30}|channel\/UC[A-Za-z0-9_-]{20,24}|c\/[A-Za-z0-9_.-]{1,60})$/, url: v => "https://www.youtube.com/" + (v.includes("/") ? v : "@" + v), show: v => (v.includes("/") ? "YouTube channel" : "@" + v) },
  whatsapp: { label: "WhatsApp", icon: "whatsapp", brand: "#25d366", cta: "Message", re: /^\d{8,15}$/, url: v => "https://wa.me/" + v, show: v => "+" + v },
  x: { label: "X", icon: "x", brand: "#111111", cta: "Follow", at: 1, re: /^[A-Za-z0-9_]{1,15}$/, url: v => "https://x.com/" + v },
  tiktok: { label: "TikTok", icon: "tiktok", brand: "#111111", cta: "Follow", at: 1, re: /^[A-Za-z0-9_.]{2,24}$/, url: v => "https://www.tiktok.com/@" + v },
  discord: { label: "Discord", icon: "discord", brand: "#5865f2", cta: "Join", re: /^[A-Za-z0-9-]{2,32}$/, url: v => "https://discord.gg/" + v, show: v => "discord.gg/" + v },
  spotify: { label: "Spotify", icon: "spotify", brand: "#1ed760", cta: "Listen", re: /^((artist|album|playlist|track|user|show|episode)\/[A-Za-z0-9._-]{1,64}|https:\/\/spotify\.link\/[A-Za-z0-9]{4,20})$/, url: v => (v.startsWith("https:") ? v : "https://open.spotify.com/" + v), show: v => (/^(artist|user)\//.test(v) ? "Spotify profile" : /^track\//.test(v) ? "A song" : /^album\//.test(v) ? "An album" : /^(show|episode)\//.test(v) ? "A podcast" : "My playlist") },
  telegram: { label: "Telegram", icon: "telegram", brand: "#229ed9", cta: "Message", at: 1, re: /^[A-Za-z0-9_]{5,32}$/, url: v => "https://t.me/" + v },
  twitch: { label: "Twitch", icon: "twitch", brand: "#9146ff", cta: "Watch", at: 1, re: /^[A-Za-z0-9_]{3,25}$/, url: v => "https://www.twitch.tv/" + v },
  github: { label: "GitHub", icon: "github", brand: "#24292f", cta: "Follow", at: 1, re: /^[A-Za-z0-9-]{1,39}$/, url: v => "https://github.com/" + v },
  linkedin: { label: "LinkedIn", icon: "linkedin", brand: "#0a66c2", cta: "Connect", re: /^[A-Za-z0-9-]{3,100}$/, url: v => "https://www.linkedin.com/in/" + v },
  facebook: { label: "Facebook", icon: "facebook", brand: "#1877f2", cta: "Follow", re: /^[A-Za-z0-9.]{5,50}$/, url: v => "https://www.facebook.com/" + v },
  threads: { label: "Threads", icon: "threads", brand: "#111111", cta: "Follow", at: 1, re: /^[A-Za-z0-9_.]{1,30}$/, url: v => "https://www.threads.net/@" + v },
  pinterest: { label: "Pinterest", icon: "pinterest", brand: "#e60023", cta: "Follow", at: 1, re: /^[A-Za-z0-9_]{3,30}$/, url: v => "https://www.pinterest.com/" + v + "/" },
  reddit: { label: "Reddit", icon: "reddit", brand: "#ff4500", cta: "Follow", re: /^[A-Za-z0-9_-]{3,20}$/, url: v => "https://www.reddit.com/user/" + v, show: v => "u/" + v },
  steam: { label: "Steam", icon: "steam", brand: "#1b2838", cta: "Add me", re: /^(id\/[A-Za-z0-9_-]{2,32}|profiles\/\d{17})$/, url: v => "https://steamcommunity.com/" + v + "/", show: v => v.replace(/^(id|profiles)\//, "") },
  email: { label: "Email", icon: "envelope", brand: "#ea4335", cta: "Email me", re: /^[^\s@<>"'/]{1,64}@[^\s@<>"'/]+\.[A-Za-z]{2,}$/, url: v => "mailto:" + v, show: v => v }
};
const socialShow = (k, v) => { const d = SOCIAL[k]; return d ? (d.show ? d.show(v) : (d.at ? "@" : "") + v) : v; };
function cleanSocials(v) {
  const seen = new Set();
  return (Array.isArray(v) ? v : []).filter(x => x && typeof x === "object" && SOCIAL[x.k] && typeof x.v === "string" && SOCIAL[x.k].re.test(x.v) && !seen.has(x.k) && seen.add(x.k))
    .slice(0, 20).map(x => ({ k: x.k, v: x.v }));
}

// plain reading from the database (public things, no login needed) without downloading the login library
async function rest(path, opt = {}) {
  const h = { apikey: SUPA.key, Authorization: "Bearer " + (opt.token || SUPA.key), Accept: "application/json" };
  if (opt.body !== undefined) h["Content-Type"] = "application/json";
  if (opt.prefer) h.Prefer = opt.prefer;
  const ctl = window.AbortController ? new AbortController() : null, t = ctl ? setTimeout(() => ctl.abort(), opt.timeout || 12000) : 0;
  try {
    const r = await fetch(SUPA.url + "/rest/v1/" + path, { method: opt.method || "GET", headers: h, body: opt.body === undefined ? undefined : JSON.stringify(opt.body), signal: ctl ? ctl.signal : undefined });
    const txt = await r.text(); let j = null; try { j = txt ? JSON.parse(txt) : null; } catch (e) {}
    if (!r.ok) { const e = new Error((j && (j.message || j.msg)) || "HTTP " + r.status); e.code = j && j.code; e.status = r.status; throw e; }
    return j;
  } finally { clearTimeout(t); }
}
// "this part of the database isn't set up yet" (the new SQL hasn't been run)
const isMissing = e => !!e && (e.code === "42P01" || e.code === "PGRST205" || e.code === "PGRST202" || e.code === "42883" || (e.status === 404 && !e.code) || /schema cache|does not exist|could not find the (table|function)/i.test(e.message || ""));
function savedLogin() { try { return !!localStorage.getItem(SB_KEY); } catch (e) { return false; } }

const Cloud = (() => {
  let sb = null, user = null, me = null, notSetUp = false, loading = null, ready = false;
  const subs = [];
  const emit = why => subs.forEach(f => { try { f(why); } catch (e) { console.error(e); } });
  const fail = e => { if (isMissing(e)) notSetUp = true; throw e; };
  const cacheMe = () => { if (me) LS.set("me", { id: me.id, username: me.username, display_name: me.display_name, avatar_url: me.avatar_url }); else LS.del("me"); };
  async function loadMe() {
    me = null;
    if (!sb || !user) { cacheMe(); return null; }
    const { data, error } = await sb.from("profiles").select("id,username,display_name,avatar_url").eq("id", user.id).maybeSingle();
    if (error) fail(error);
    me = data || null; cacheMe(); return me;
  }
  // downloads the login library the first time it's needed (most visitors never need it)
  function ensure() {
    if (loading) return loading;
    loading = (async () => {
      try {
        if (!(window.supabase && window.supabase.createClient)) await loadScript(SB_LIB);
        sb = window.supabase.createClient(SUPA.url, SUPA.key);
      } catch (e) { loading = null; throw e; }
      try { const { data } = await sb.auth.getSession(); user = data && data.session ? data.session.user : null; } catch (e) { user = null; }
      try { await loadMe(); } catch (e) {}
      ready = true; emit("init");
      sb.auth.onAuthStateChange((ev, session) => {
        const was = user ? user.id : null; user = session ? session.user : null; const now = user ? user.id : null;
        setTimeout(async () => {                   // Supabase asks us not to call it from inside this callback
          if (ev === "PASSWORD_RECOVERY") emit("recovery");
          if (now !== was) { try { await loadMe(); } catch (e) {} emit("auth"); }
        }, 0);
      });
      return sb;
    })();
    return loading;
  }
  const pathOf = url => (typeof url === "string" && url.startsWith(MEDIA_PREFIX) ? decodeURIComponent(url.slice(MEDIA_PREFIX.length).split("?")[0]) : "");
  async function upload(key, dataUrl) {
    const blob = await (await fetch(dataUrl)).blob();
    const type = /^image\/(png|webp|gif)$/.test(blob.type) ? blob.type : "image/jpeg";
    const ext = { "image/png": "png", "image/webp": "webp", "image/gif": "gif" }[type] || "jpg";
    const safe = String(key).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 60) || "photo";
    const path = `${user.id}/${safe}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}.${ext}`;
    const { error } = await sb.storage.from("media").upload(path, blob, { contentType: type, cacheControl: "31536000", upsert: false });
    if (error) throw error;
    return sb.storage.from("media").getPublicUrl(path).data.publicUrl;
  }
  const COLS = "id,username,display_name,avatar_url,settings,media,updated_at";
  async function saveMyPage(settings, oldMedia, pend, displayName) {
    await ensure();
    if (!sb || !user) throw new Error("not_logged_in");
    const media = { ...(oldMedia || {}) }, gone = [];
    await Promise.all(Object.keys(pend || {}).map(async k => {
      const v = pend[k], old = pathOf(media[k]);
      if (v && /^data:image\//.test(v)) media[k] = await upload(k, v);
      else if (v && String(v).startsWith(MEDIA_PREFIX)) media[k] = v;
      else delete media[k];
      if (old) gone.push(old);
    }));
    const patch = { settings, media, avatar_url: media.avatar && /^https:\/\//.test(media.avatar) ? media.avatar : null };
    if (typeof displayName === "string" && displayName.trim()) patch.display_name = displayName.trim().slice(0, 40);
    const { data, error } = await sb.from("profiles").update(patch).eq("id", user.id).select(COLS).single();
    if (error) fail(error);
    if (me) { me.display_name = data.display_name; me.avatar_url = data.avatar_url; cacheMe(); }
    const still = new Set(Object.values(data.media || {}).map(pathOf));
    const old = gone.filter(p => p.startsWith(user.id + "/") && !still.has(p));
    if (old.length) sb.storage.from("media").remove(old).then(() => {}, () => {});
    emit("me");
    return data;
  }
  // the new editor: photos upload the moment they're picked, the page itself saves a moment after each change
  async function uploadPhoto(key, dataUrl) {
    await ensure();
    if (!sb || !user) throw new Error("not_logged_in");
    return upload(key, dataUrl);
  }
  async function savePage(settings, media, displayName) {
    await ensure();
    if (!sb || !user) throw new Error("not_logged_in");
    const patch = { settings, media, avatar_url: media.avatar && /^https:\/\//.test(media.avatar) ? media.avatar : null };
    if (typeof displayName === "string" && displayName.trim()) patch.display_name = displayName.trim().slice(0, 40);
    const { data, error } = await sb.from("profiles").update(patch).eq("id", user.id).select(COLS).single();
    if (error) fail(error);
    if (me) { me.display_name = data.display_name; me.avatar_url = data.avatar_url; cacheMe(); }
    emit("me");
    return data;
  }
  async function removeFiles(paths) {
    const mine = (paths || []).filter(p => user && String(p).startsWith(user.id + "/"));
    if (!mine.length || !sb) return;
    try { await sb.storage.from("media").remove(mine); } catch (e) {}
  }
  async function rpc(fn, args) { await ensure(); const { data, error } = await sb.rpc(fn, args || {}); if (error) fail(error); return data; }
  async function refresh() {
    await ensure();
    try { const { data } = await sb.auth.getSession(); user = data && data.session ? data.session.user : null; } catch (e) { user = null; }
    try { await loadMe(); } catch (e) {}
    emit("auth"); return me;
  }
  return {
    ensure, refresh,
    get sb() { return sb; }, get user() { return user; }, get me() { return me; }, get notSetUp() { return notSetUp; }, get ready() { return ready; },
    get cachedMe() { return savedLogin() ? LS.get("me", null) : null; },
    on(f) { subs.push(f); },
    shareLink: u => prettyLink(u),
    async getProfile(username) {   // public: works without the login library
      const rows = await rest("profiles?select=" + COLS + "&username=eq." + encodeURIComponent(username) + "&limit=1");
      return (rows && rows[0]) || null;
    },
    async getPerson(id) {
      const rows = await rest("profiles?select=id,username,display_name,avatar_url&id=eq." + encodeURIComponent(id) + "&limit=1");
      return (rows && rows[0]) || null;
    },
    async usernameFree(u) {
      const rows = await rest("profiles?select=id&username=eq." + encodeURIComponent(u) + "&limit=1");
      return !(rows && rows.length);
    },
    async createMe(username, displayName) {
      await ensure();
      const { data, error } = await sb.from("profiles").insert({ id: user.id, username, display_name: displayName }).select("id,username,display_name,avatar_url").single();
      if (error) fail(error);
      me = data; notSetUp = false; cacheMe(); emit("me"); return data;
    },
    saveMyPage, uploadPhoto, savePage, removeFiles, pathOf,
    async iBlocked(other) {
      await ensure();
      const { data, error } = await sb.from("blocks").select("blocked_id").eq("blocked_id", other).maybeSingle();
      if (error) fail(error); return !!data;
    },
    conversations: () => rpc("my_conversations"),
    thread: (other, beforeId) => rpc("get_thread", { p_other: other, p_before_id: beforeId || null, p_limit: 50 }),
    send: (to, body) => rpc("send_message", { p_to: to, p_body: body }),
    markRead: other => rpc("mark_read", { p_other: other }),
    setBlock: (other, on) => rpc("set_block", { p_other: other, p_block: !!on }),
    search: q => rpc("search_profiles", { p_q: q })
  };
})();
// turn Supabase / network errors into plain words
function friendlyError(e) {
  const m = String((e && (e.message || e.error_description || e.msg)) || e || "");
  if (/failed to fetch|networkerror|load failed|network request failed|aborted/i.test(m)) return "No connection. Check your internet and try again.";
  if (/invalid login credentials/i.test(m)) return "Wrong email or password.";
  if (/email not confirmed/i.test(m)) return "Confirm your email first: tap the link we sent you.";
  if (/already registered|already been registered|user already exists/i.test(m)) return "That email already has an account. Try logging in.";
  if (/password should be|weak password|password is too/i.test(m)) return "Pick a longer password (at least 6 characters).";
  if (/rate limit|too many requests|for security purposes/i.test(m)) return "Too many tries. Wait a minute and try again.";
  if (/unable to validate email|invalid email|email address .*invalid/i.test(m)) return "That email doesn't look right.";
  if (/signups? (are )?not allowed|signup is disabled/i.test(m)) return "New sign-ups are turned off right now.";
  if (/payload too large|exceeded the maximum|entity too large|too large/i.test(m)) return "That photo is too big. Try a smaller one.";
  if (/mime type|invalid_mime/i.test(m)) return "That photo type isn't supported. Use JPG or PNG.";
  if (/bucket not found/i.test(m)) return "Photo storage isn't set up yet.";
  if (/slow_down/i.test(m)) return "Slow down a little. You can post again in a few seconds.";
  if (/not_logged_in|jwt expired|invalid jwt|refresh token/i.test(m)) return "You were logged out. Log in again.";
  if ((e && e.code === "23503") || /foreign key/i.test(m)) return "Pick a username first (tap Log in at the top).";
  if (Cloud.notSetUp) return "Accounts are still being set up. Try again in a bit.";
  return m || "Something went wrong. Try again.";
}

/* ======================= SOUND =======================
   Music: a normal audio player. Nothing downloads or plays until someone taps play.
   It pauses by itself when they switch apps / lock the phone, and the phone's own
   media controls (lock screen, notification) can pause it too.
   Sound effects: off unless the visitor turns them on. */
const Snd = (() => {
  const el = $("#music");
  const VOL = 0.7;
  let sfxOn = LS.get("sfx2", false), ctx = null, sfx = null, noiseBuf = null, fadeT = 0, playing = false, hinted = false;
  if (el) el.volume = VOL;
  function syncUI() {
    playing = !!(el && !el.paused && !el.ended);
    document.body.classList.toggle("music-on", playing);
    const pb = $("#pPlay");
    if (pb) {
      pb.innerHTML = playing ? '<svg viewBox="0 0 16 16"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>' : '<svg viewBox="0 0 16 16"><path d="M4 2.5v11a.8.8 0 0 0 1.2.7l9-5.5a.8.8 0 0 0 0-1.4l-9-5.5A.8.8 0 0 0 4 2.5z"/></svg>';
      pb.setAttribute("aria-label", playing ? "Pause music" : "Play music");
      $("#pDisc").setAttribute("aria-label", playing ? "Pause music" : "Play music");
    }
    $$("#pSfx,#sfxSwitch,#setSfx").forEach(b => b.setAttribute("aria-pressed", String(sfxOn)));
    const sm = $("#setMusic"); if (sm) sm.setAttribute("aria-pressed", String(playing));
    $$("[data-np]").forEach(b => b.textContent = playing ? "Pause" : "Play here");
    if ("mediaSession" in navigator) try { navigator.mediaSession.playbackState = playing ? "playing" : "paused"; } catch (e) {}
  }
  function fadeTo(v, ms) {
    clearInterval(fadeT); if (!el) return;
    const from = el.volume, t0 = performance.now();
    fadeT = setInterval(() => { const p = Math.min(1, (performance.now() - t0) / ms); try { el.volume = from + (v - from) * p; } catch (e) {} if (p >= 1) clearInterval(fadeT); }, 50);
  }
  function setupMediaSession() {
    if (!("mediaSession" in navigator) || !window.MediaMetadata) return;
    try {
      const art = new URL("assets/album.webp", location.href).href;
      navigator.mediaSession.metadata = new MediaMetadata({ title: CONFIG.song.title, artist: CONFIG.song.artist, album: "flexippo", artwork: [{ src: art, sizes: "300x300", type: "image/webp" }] });
      navigator.mediaSession.setActionHandler("play", play);
      navigator.mediaSession.setActionHandler("pause", pause);
      navigator.mediaSession.setActionHandler("stop", () => { pause(); try { el.currentTime = 0; } catch (e) {} });
    } catch (e) {}
  }
  function play() {
    if (!el) return;
    hint(false); LS.set("heard", 1);
    try { el.volume = 0; } catch (e) {}
    const p = el.play();
    setupMediaSession();
    if (p && p.then) p.then(() => fadeTo(VOL, 900), err => {
      try { el.volume = VOL; } catch (e) {} syncUI();
      if (!err || err.name !== "AbortError") toast("Couldn't start the music. Tap ▶ again.");   // AbortError = it was paused on purpose
    });
    else fadeTo(VOL, 900);
  }
  function pause() { if (el) el.pause(); clearInterval(fadeT); try { el.volume = VOL; } catch (e) {} }
  function toggle() { if (!el) return; el.paused ? play() : pause(); }
  function hint(on) {   // first visit: make the play button pulse a few times
    const b = $("#pPlay"); if (!b) return;
    if (on && !hinted && !LS.get("heard", 0) && !playing) { hinted = true; b.classList.add("nudge"); setTimeout(() => b.classList.remove("nudge"), 6000); }
    if (!on) b.classList.remove("nudge");
  }
  if (el) ["play", "playing", "pause", "ended", "emptied"].forEach(ev => el.addEventListener(ev, syncUI));
  // leaving the page (other app, other tab, locked screen) = music stops. No more killing the browser to make it stop.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") { if (el && !el.paused) el.pause(); if (ctx && ctx.state === "running") ctx.suspend().catch(() => {}); }
  });
  addEventListener("pagehide", () => { if (el) el.pause(); if (ctx) ctx.suspend().catch(() => {}); });

  // --- little sound effects (made on the fly, no files) ---
  function ensureCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    try { ctx = new AC(); } catch (e) { return null; }
    sfx = ctx.createGain(); sfx.gain.value = 0.45; sfx.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate / 2), ctx.sampleRate);
    const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return ctx;
  }
  function tone(type, f0, f1, dur, vol, delay = 0) {
    const t = ctx.currentTime + delay, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(f1, 1), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.012, dur / 4)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(sfx); o.start(t); o.stop(t + dur + 0.05);
  }
  function noise(dur, type, f0, f1, q, vol, delay = 0) {
    const t = ctx.currentTime + delay, s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; s.loop = true; f.type = type; f.Q.value = q;
    f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(Math.max(f1, 20), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(sfx); s.start(t); s.stop(t + dur + 0.05);
  }
  const FX = {
    boom() { tone("sine", 150, 36, 1.0, 0.95); tone("triangle", 90, 40, 0.5, 0.4); noise(0.6, "lowpass", 1200, 90, 0.7, 0.7); },
    tick() { tone("square", 1900, 1500, 0.035, 0.05); },
    hover() { tone("sine", 2600, 2900, 0.03, 0.018); },
    type() { tone("square", 700 + Math.random() * 500, 600, 0.02, 0.02); },
    flip() { noise(0.22, "bandpass", 800, 3600, 1.6, 0.4); tone("sine", 500, 900, 0.12, 0.05); },
    pop() { tone("sine", 480, 1300, 0.1, 0.25); tone("triangle", 1300, 1700, 0.06, 0.06, 0.03); },
    unpop() { tone("sine", 900, 380, 0.1, 0.15); },
    sparkle() { [1318, 1568, 2093, 2637, 3136].forEach((f, i) => tone("sine", f, f * 1.01, 0.4, 0.08, i * 0.055)); },
    chime() { [880, 1320, 1760, 2640].forEach((f, i) => tone("sine", f, f, 1.1, 0.14 / (i + 1), i * 0.07)); },
    whoosh() { noise(0.42, "bandpass", 300, 2600, 0.9, 0.18); },
    power() { tone("sawtooth", 140, 1500, 1.15, 0.09); tone("square", 70, 750, 1.15, 0.05); noise(1.1, "bandpass", 300, 5000, 0.8, 0.2); setTimeout(() => { fx("boom"); fx("sparkle"); }, 1100); }
  };
  function fx(n) {
    if (!sfxOn || document.visibilityState === "hidden" || !FX[n]) return;
    if (!ensureCtx()) return;
    if (ctx.state !== "running") ctx.resume().catch(() => {});
    try { FX[n](); } catch (e) {}
  }
  function setSfx(on) { sfxOn = !!on; LS.set("sfx2", sfxOn); if (sfxOn) { if (ensureCtx()) ctx.resume().catch(() => {}); } else if (ctx) ctx.suspend().catch(() => {}); syncUI(); }
  return { play, pause, toggle, setSfx, syncUI, fx, hint, get playing() { return playing; }, get sfxOn() { return sfxOn; } };
})();

/* ======================= SKINS ======================= */
function applySkin(s, announce, keep) {
  if (!["night", "sakura", "fire"].includes(s)) s = "night";
  document.documentElement.dataset.skin = s; if (!keep) LS.set("skin", s);
  $$(".skin").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.skin === s)));
  if (announce) { Snd.fx("whoosh"); toast({ night: "Neon Tokyo Night", sakura: "Sakura Day", fire: "Shonen Fire" }[s] + " activated"); }
}
function flash() { const f = $("#flash"); f.classList.remove("go"); void f.offsetWidth; f.classList.add("go"); }
function speed() { const s = $("#speed"); s.classList.remove("go"); void s.offsetWidth; s.classList.add("go"); }
function shake(el = $("#app")) { el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); }
if (PAGE_U) document.getElementById("pitch").hidden = true;   // personal pages: no flexippo pitch under the name

/* ---- effects that play once per visit (every refresh / new open) ---- */
const OnceFx = (() => {
  const can = !reduce && "IntersectionObserver" in window && !!Element.prototype.animate;
  function prep() { if (can) $("#socGrid").classList.add("pre"); }       // socials stay hidden until they get dealt
  // "Find me everywhere": the cards get dealt out of a deck, one by one, and flash in their brand colour as they land
  function deal() {
    const grid = $("#socGrid"), cards = $$(".soc", grid); grid.classList.remove("pre");
    if (!cards.length) return;
    const g = grid.getBoundingClientRect(), ox = g.left + g.width / 2, oy = g.top + Math.min(g.height, 360) / 2;
    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect(), dx = ox - (r.left + r.width / 2), dy = oy - (r.top + r.height / 2);
      const base = CONFIG.socials.find(x => x.id === c.dataset.soc) || {}, b = String(base.brand || c.dataset.glow || "");
      const glow = b.startsWith("#") ? b : "#d62976"; c.style.setProperty("--glow", glow);
      const tilt = (i % 2 ? 1 : -1) * (6 + i * 3), delay = 120 + i * 150;
      c.animate([
        { transform: `translate(${dx}px,${dy}px) rotate(${tilt}deg) scale(.55)`, opacity: 0 },
        { transform: `translate(${dx}px,${dy}px) rotate(${tilt}deg) scale(.6)`, opacity: 1, offset: .12 },
        { transform: "translate(0,0) rotate(0deg) scale(1.03)", opacity: 1, offset: .82 },
        { transform: "none", opacity: 1 }
      ], { duration: 720, delay, easing: "cubic-bezier(.2,.9,.25,1)", fill: "backwards" });
      setTimeout(() => Snd.fx("flip"), delay);
      setTimeout(() => { c.classList.remove("landed"); void c.offsetWidth; c.classList.add("landed"); }, delay + 600);
    });
  }
  function arm() {
    if (!can) { $("#socGrid").classList.remove("pre"); $$(".sec-title").forEach(t => t.classList.add("lit")); return; }
    const once = (els, opts, fn) => { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); fn(e.target); } }), opts); els.forEach(el => io.observe(el)); };
    once([$("#socGrid")], { threshold: 0.2 }, deal);
    once($$(".sec-title"), { threshold: 0.6 }, t => t.classList.add("lit"));
  }
  return { prep, arm };
})();

/* ======================= HERO ======================= */
function renderName(quiet) {
  const HN = CONFIG.heroName || CONFIG.name; const h = $("#name");
  if (quiet) h.classList.add("calm");   // the owner is typing their name: no letters flying in on every key
  if (h.dataset.text !== HN || !h.children.length) {
    h.dataset.text = HN; h.style.setProperty("--len", Math.max(3, [...HN].length));
    h.innerHTML = [...HN].map((c, i) => `<span style="--i:${i}">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("");
  }
  $("#kana").textContent = CONFIG.kana; $("#footName").textContent = CONFIG.name;
  const ci = $("#coverImg");
  ci.onerror = () => { $("#cover").hidden = true; };
  if (!CONFIG.cover) { $("#cover").hidden = true; return; }
  $("#cover").hidden = false;
  if (ci.dataset.src !== CONFIG.cover) {
    ci.dataset.src = CONFIG.cover;
    const l = optList(CONFIG.cover);
    if (l) { ci.srcset = l.map(([p, w]) => p + " " + w + "w").join(", "); ci.src = l[Math.min(1, l.length - 1)][0]; }
    else { ci.removeAttribute("srcset"); ci.src = CONFIG.cover; }
    if (ci.complete && ci.naturalWidth) ci.classList.add("in");
  }
}
let typingStarted = false;
function startTyping() {
  if (typingStarted) return; typingStarted = true;
  const el = $("#typed"); let ti = 0, ci = 0, del = false, first = true, onScreen = true;
  if ("IntersectionObserver" in window) new IntersectionObserver(es => { onScreen = es[es.length - 1].isIntersecting; }).observe($("#top"));
  const loop = () => {
    if (document.visibilityState === "hidden" || !onScreen) return setTimeout(loop, 1000);   // nobody is looking: don't work
    const list = CONFIG.titles.length ? CONFIG.titles : [""], word = list[ti % list.length];
    if (!del) { ci++; el.innerHTML = "<b>&gt;</b> " + esc(word.slice(0, ci)); if (first) Snd.fx("type"); if (ci >= word.length) { del = true; first = false; return setTimeout(loop, 1800); } return setTimeout(loop, 55 + Math.random() * 40); }
    ci--; el.innerHTML = "<b>&gt;</b> " + esc(word.slice(0, ci)); if (ci <= 0) { del = false; ti = (ti + 1) % list.length; return setTimeout(loop, 300); } setTimeout(loop, 28);
  };
  setTimeout(loop, 700);
}
const BDAY_RE = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
function hasBirthday() { return BDAY_RE.test(CONFIG.birthday || ""); }
function nextBirthday() {
  const [m, d] = CONFIG.birthday.split("-").map(Number); const now = new Date();
  let t = new Date(now.getFullYear(), m - 1, d); const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (t < today) t = new Date(now.getFullYear() + 1, m - 1, d); return t;
}
function isBirthday() { if (!hasBirthday()) return false; const [m, d] = CONFIG.birthday.split("-").map(Number); const n = new Date(); return n.getMonth() === m - 1 && n.getDate() === d; }
let cdT = 0;
function tickCountdown() {
  clearTimeout(cdT);
  const box = $("#countBox"); box.hidden = !hasBirthday(); if (box.hidden) return;
  const t = nextBirthday(); $("#bdayDate").textContent = t.toLocaleDateString(undefined, { day: "numeric", month: "short" }).toUpperCase();
  if (isBirthday()) { $("#segs").innerHTML = '<div class="bday-now">🎉 IT\'S MY BIRTHDAY 🎉</div>'; return; }
  let s = Math.max(0, Math.floor((t - new Date()) / 1000));
  const d = Math.floor(s / 86400); s -= d * 86400; const h = Math.floor(s / 3600); s -= h * 3600; const m = Math.floor(s / 60); s -= m * 60;
  const p = n => String(n).padStart(2, "0");
  if (!$("#cd-d")) $("#segs").innerHTML = ["d", "h", "m", "s"].map(k => `<div class="seg"><strong id="cd-${k}">00</strong><span>${k}</span></div>`).join("");
  $("#cd-d").textContent = p(d); $("#cd-h").textContent = p(h); $("#cd-m").textContent = p(m); $("#cd-s").textContent = p(s);
  cdT = setTimeout(tickCountdown, 1000 - (Date.now() % 1000) + 5);   // only runs when there's a birthday to count down to
}
// easter egg: tap the big name 5 times
let taps = 0, tapT;
function onSecretTap() {
  const a = $("#name"); taps++; clearTimeout(tapT); tapT = setTimeout(() => { taps = 0; $("#taps").classList.remove("on"); }, 2200);
  a.classList.remove("bump"); void a.offsetWidth; a.classList.add("bump");
  if (taps < 5) { $("#taps").textContent = "×" + taps; $("#taps").classList.toggle("on", taps > 1); Snd.fx("pop"); return; }
  taps = 0; $("#taps").classList.remove("on"); limitBreak();
}
function limitBreak() {
  const egg = $("#egg"); egg.classList.remove("go"); void egg.offsetWidth; egg.classList.add("go");
  Snd.fx("power"); speed();
  document.body.classList.remove("powered"); void document.body.offsetWidth; document.body.classList.add("powered");
  setTimeout(() => { shake(); flash(); }, 1100);
  setTimeout(() => { egg.classList.remove("go"); document.body.classList.remove("powered"); const found = LS.get("egg", false); LS.set("egg", true); toast(found ? "Limit Break again. Respect." : "🔓 Secret found: Limit Break"); }, 2600);
}

/* ======================= SOCIALS ======================= */
function safeUrl(u, fallback) { u = String(u || "").trim(); return /^https?:\/\//i.test(u) ? u : (fallback || ""); }
function readableOn(hex) { const m = /^#?([0-9a-f]{6})$/i.exec(hex || ""); if (!m) return "#06210f"; const n = parseInt(m[1], 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? "#0b0b0b" : "#ffffff"; }
function parseTracks(list) { return (list || []).map(t => String(t).trim()).filter(Boolean).slice(0, 6).map(t => { const p = t.split(/\s+[—–-]\s+/); return { title: p[0], artist: p.slice(1).join(" - ") }; }); }
const VERIFIED = `<svg class="vf" viewBox="0 0 24 24" role="img" aria-label="Verified"><path d="M12.00 1.00 L14.41 3.02 L17.50 2.47 L18.58 5.42 L21.53 6.50 L20.98 9.59 L23.00 12.00 L20.98 14.41 L21.53 17.50 L18.58 18.58 L17.50 21.53 L14.41 20.98 L12.00 23.00 L9.59 20.98 L6.50 21.53 L5.42 18.58 L2.47 17.50 L3.02 14.41 L1.00 12.00 L3.02 9.59 L2.47 6.50 L5.42 5.42 L6.50 2.47 L9.59 3.02Z" fill="#1d9bf0" stroke="#1d9bf0" stroke-width="1.6" stroke-linejoin="round"/><path d="M7.6 12.4l3 3 5.8-6.4" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function pfpHtml() { const a = Custom.target && !Custom.isHome && Custom.media && Custom.media.avatar; return `<i class="pfp" aria-hidden="true"><img src="${esc(a || "assets/flexippo-pfp.png")}" alt="" width="24" height="24" loading="lazy" decoding="async" draggable="false"></i>`; }
const icon = name => `<svg aria-hidden="true"><use href="#i-${esc(name)}"/></svg>`;
function brandIcon(s) { return `<span class="soc-ic" style="background:${s.brand}" aria-hidden="true">${s.icon ? icon(s.icon) : ""}<span class="fb">${esc(s.label.charAt(0))}</span></span>`; }
// everything the owner can change, merged over CONFIG
function socialView() {
  const S = Custom.settings || {}, M = Custom.media || {};
  const ig = CONFIG.socials.find(s => s.id === "instagram"), xs = CONFIG.socials.find(s => s.id === "x"), sc = CONFIG.socials.find(s => s.id === "snapchat");
  const oi = S.instagram || {}, ox = S.x || {}, os = S.snapchat || {};
  const num = (v, d) => { const n = parseInt(String(v === undefined ? "" : v).replace(/[^\d]/g, ""), 10); return isFinite(n) ? n : d; };
  const sp = Object.assign({}, CONFIG.spotify, S.spotify || {});
  return {
    instagram: ig && { handle: oi.handle || ig.handle, url: safeUrl(oi.url, ig.url), posts: ig.posts.map((p, i) => { const op = (oi.posts || [])[i] || {}; const im = M["ig" + i]; return { img: im || p.img, cap: op.cap !== undefined ? op.cap : p.cap, link: safeUrl(op.link, ""), credit: im ? null : p }; }) },
    snapchat: sc && { handle: os.handle || sc.handle, url: safeUrl(os.url, sc.url), score: num(os.score, sc.score), streak: num(os.streak, sc.streak),
      stories: sc.stories.map((st, i) => { const o = (os.stories || [])[i] || {}; return { img: M["sc" + i] || st.img, cap: o.cap !== undefined ? o.cap : st.cap, when: o.when || st.when }; }) },
    x: xs && { handle: ox.handle || xs.handle, url: safeUrl(ox.url, xs.url), img: M.x0 || xs.post.img, text: ox.text !== undefined ? ox.text : xs.post.text, when: ox.when || xs.post.when, link: safeUrl(ox.link, "") },
    spotify: { ...sp, url: safeUrl(sp.url, CONFIG.spotify.url), cover: M.spCover || CONFIG.spotify.cover, accent: /^#[0-9a-f]{6}$/i.test(sp.accent || "") ? sp.accent : CONFIG.spotify.accent, tracks: parseTracks(sp.tracks) }
  };
}
// Spotify + Discord: one card at the bottom, side by side, half each
function duoCard(V, ids) {
  const halves = ids.map(id => CONFIG.socials.find(s => s.id === id)).filter(Boolean).map(base => {
    if (base.id === "spotify") {
      const v = V.spotify;
      return `<section class="duo-half" data-half="spotify" style="--brand:${v.accent};--sp:${v.accent};--sp-ink:${readableOn(v.accent)}">
        <div class="soc-h">${brandIcon({ ...base, brand: v.accent })}<div class="soc-id"><b class="vh">${esc(base.label)}</b><span class="hdl">${pfpHtml()}<em>${esc(v.title)}</em>${VERIFIED}</span></div></div>
        <div class="sp-mini"><img class="sp-cover" src="${esc(v.cover)}" alt="Playlist cover" loading="lazy" decoding="async"><div style="min-width:0"><b class="sp-n">${esc(v.playlist)}</b><span class="sp-a">${esc(v.artist)}</span><div class="bars"><i></i><i></i><i></i><i></i><i></i></div></div></div>
        <div class="duo-cta"><button class="btn" type="button" data-np style="--brand:var(--sp);color:var(--sp-ink)">Play here</button><a class="btn ghost" href="${esc(v.url)}" target="_blank" rel="noopener">${esc(base.cta)}</a></div>
      </section>`;
    }
    return `<section class="duo-half" data-half="${base.id}" style="--brand:${base.brand}">
        <div class="soc-h">${brandIcon(base)}<div class="soc-id"><b class="vh">${esc(base.label)}</b><span class="hdl">${pfpHtml()}<em>${esc(base.handle || "")}</em>${VERIFIED}</span></div></div>
        ${base.blurb ? `<p class="duo-blurb">${esc(base.blurb)}</p>` : ""}
        <div class="duo-cta"><a class="btn" href="${esc(base.url)}" target="_blank" rel="noopener">${esc(base.cta)}</a></div>
      </section>`;
  });
  if (!halves.length) return "";
  const sp = V.spotify ? V.spotify.accent : "#1ed760", dc = (CONFIG.socials.find(s => s.id === "discord") || {}).brand || "#5865f2";
  return `<article class="soc soc-duo${halves.length < 2 ? " solo" : ""}" data-soc="duo" data-glow="${esc(sp)}" style="--brand:linear-gradient(90deg,${sp} 0 50%,${dc} 50% 100%)">${halves.join("")}</article>`;
}
/* ---- personal pages: one card per account the owner added (only theirs, nothing from the example page) ---- */
function personalSocialCard(s, D, M) {
  const d = SOCIAL[s.k], url = d.url(s.v);
  let body = "";
  if (s.k === "instagram") {
    const posts = [0, 1, 2].map(j => ({ img: M["ig" + j], ...(((D.instagram || {}).posts || [])[j] || {}) })).filter(p => p.img);
    if (posts.length) body = `<div class="posts">${posts.map(p => `<a class="post" href="${esc(safeUrl(p.link, url))}" target="_blank" rel="noopener"><figure style="margin:0"><img src="${esc(p.img)}" alt="${esc(p.cap || "Instagram post")}" loading="lazy" decoding="async">${p.cap ? `<figcaption>${esc(p.cap)}</figcaption>` : ""}</figure></a>`).join("")}</div>`;
  }
  if (s.k === "snapchat") {
    const C = D.snapchat || {}, num = v => { const n = parseInt(String(v === undefined ? "" : v).replace(/[^\d]/g, ""), 10); return isFinite(n) && n > 0 ? n : 0; };
    const score = num(C.score), streak = num(C.streak), st = snapStories().list;
    if (score || streak) body += `<div class="snap-stats">${score ? `<span>👻 <b>${score.toLocaleString("en-IN")}</b> Snapscore</span>` : ""}${streak ? `<span>🔥 <b>${streak.toLocaleString("en-IN")}</b> day streak</span>` : ""}</div>`;
    if (st.length) body += `<div class="snap-row">${st.map((x, i) => `<button class="story${Stories.seen(i) ? " seen" : ""}" type="button" data-story="${i}" aria-label="Watch story: ${esc(x.cap || "story " + (i + 1))}"><img src="${esc(x.img)}" alt="" loading="lazy" decoding="async">${x.when ? `<i>${esc(x.when)}</i>` : ""}${x.cap ? `<span>${esc(x.cap)}</span>` : ""}</button>`).join("")}</div>`;
    if (body) body = `<div class="snap">${body}</div>`;
  }
  if (s.k === "x" && M.x0) body = `<a class="xshot" href="${esc(safeUrl((D.x || {}).link, url))}" target="_blank" rel="noopener"><img src="${esc(M.x0)}" alt="X profile" loading="lazy" decoding="async"></a>`;
  if (s.k === "spotify") {
    const P = D.spotify || {};
    if (M.spCover || P.playlist) body = `<div class="sp-mini">${M.spCover ? `<img class="sp-cover" src="${esc(M.spCover)}" alt="" loading="lazy" decoding="async">` : `<span class="sp-cover sp-ph" aria-hidden="true">${icon("spotify")}</span>`}<div style="min-width:0"><b class="sp-n">${esc(P.playlist || socialShow("spotify", s.v))}</b>${P.artist ? `<span class="sp-a">${esc(P.artist)}</span>` : ""}<div class="bars"><i></i><i></i><i></i><i></i><i></i></div></div></div>`;
  }
  if (s.k === "discord" && (D.discord || {}).blurb) body = `<p class="duo-blurb">${esc(D.discord.blurb)}</p>`;
  const btnStyle = `--brand:${s.k === "x" || s.k === "tiktok" || s.k === "threads" ? "#333" : d.brand.startsWith("linear") ? "#d62976" : d.brand}${d.dark ? ";color:#111" : ""}`;
  return `<article class="soc${body ? "" : " soc-mini"}" data-soc="${s.k}" style="--brand:${d.brand}">
    <div class="soc-h"><span class="soc-ic" style="background:${d.brand}${d.dark ? ";color:#111" : ""}" aria-hidden="true">${icon(d.icon)}</span><div class="soc-id"><b>${esc(d.label)}</b><span class="hdl">${pfpHtml()}<em>${esc(socialShow(s.k, s.v))}</em></span></div><button class="ed-chip edit-only" type="button" data-open="social:${s.k}" aria-label="Change ${esc(d.label)}">✎</button><a class="btn" href="${esc(url)}" target="_blank" rel="noopener" style="${btnStyle}">${esc(d.cta)}</a></div>${body}</article>`;
}
let socKey = "";
function renderPersonalSocials(why) {
  const D = pageData(), M = Custom.media || {}, list = D.socials;
  // while the owner types elsewhere (name, bio...), don't redraw this part for nothing
  const key = JSON.stringify([list, D.links, D.instagram, D.snapchat, D.x, D.spotify, D.discord, M.avatar, M.x0, M.spCover, [0, 1, 2].map(i => M["ig" + i]), [0, 1, 2, 3].map(i => M["sc" + i])]);
  if (why === "local" && key === socKey) return;
  socKey = key;
  const has = list.length > 0 || D.links.length > 0;
  $("#links").classList.toggle("is-empty", !has);
  // edit mode only: a "+" to add more, or a big empty box when there are none yet
  $("#socGrid").innerHTML = list.map(s => personalSocialCard(s, D, M)).join("") + (list.length
    ? `<button class="soc soc-add edit-only" type="button" data-open="socials"><b aria-hidden="true">＋</b>Add a social</button>`
    : `<button class="own-empty edit-only" type="button" data-open="socials"><span class="own-empty-ic" aria-hidden="true">${icon("instagram")}${icon("snapchat")}${icon("youtube")}</span><b>Add your socials</b><span class="own-empty-btn">＋ Add</span></button>`);
  renderLinks();
  Snd.syncUI();
}
function renderSocials(why) {
  if (!Custom.demo) return renderPersonalSocials(why);
  $("#links").classList.remove("is-empty");
  const V = socialView();
  const DUO = ["spotify", "discord"];   // these two share one card at the bottom, half each
  $("#socGrid").innerHTML = CONFIG.socials.filter(b => !DUO.includes(b.id)).map(base => {
    let s = { ...base }, body = "", ctaUrl = base.url;
    if (base.id === "instagram") {
      const v = V.instagram; s.handle = v.handle; ctaUrl = v.url;
      const credits = v.posts.map((p, i) => p.credit && p.credit.credit ? `Photo ${i + 1}: <a href="${esc(p.credit.creditUrl)}" target="_blank" rel="noopener">${esc(p.credit.credit)}</a>, <a href="${esc(p.credit.licenseUrl)}" target="_blank" rel="noopener">${esc(p.credit.license)}</a> (cropped)` : "").filter(Boolean);
      body = `<div class="posts">${v.posts.map(p => `<a class="post" href="${esc(p.link || v.url)}" target="_blank" rel="noopener"><figure style="margin:0"><img ${imgSrc(p.img, "(max-width: 819px) 31vw, 240px")} alt="${esc(p.cap || "Instagram post")}" loading="lazy" decoding="async">${p.cap ? `<figcaption>${esc(p.cap)}</figcaption>` : ""}</figure></a>`).join("")}</div>` + (credits.length ? `<p class="credit">${credits.join(" · ")}</p>` : "");
    }
    if (base.id === "x") {
      const v = V.x; s.handle = v.handle; ctaUrl = v.url;
      body = `<a class="xshot" href="${esc(v.link || v.url)}" target="_blank" rel="noopener"><img ${imgSrc(v.img, "(max-width: 819px) 92vw, 560px", true)} alt="X profile" loading="lazy" decoding="async"></a>`;
    }
    if (base.id === "snapchat") {
      const v = V.snapchat; s.handle = v.handle; ctaUrl = v.url;
      body = `<div class="snap"><div class="snap-stats"><span>👻 <b>${v.score.toLocaleString("en-IN")}</b> Snapscore</span><span>🔥 <b>${v.streak.toLocaleString("en-IN")}</b> day streak</span></div>` +
        `<div class="snap-row">${v.stories.map((st, i) => `<button class="story${Stories.seen(i) ? " seen" : ""}" type="button" data-story="${i}" aria-label="Watch story: ${esc(st.cap || "story " + (i + 1))}"><img ${imgSrc(st.img, "(min-width: 820px) 140px, 22vw")} alt="" loading="lazy" decoding="async"><i>${esc(st.when)}</i>${st.cap ? `<span>${esc(st.cap)}</span>` : ""}</button>`).join("")}</div></div>`;
    }
    return `<article class="soc ${base.width || ""}" data-soc="${base.id}" style="--brand:${base.brand}">
      <div class="soc-h">${brandIcon(base)}<div class="soc-id"><b class="vh">${esc(base.label)}</b><span class="hdl">${pfpHtml()}<em>${esc(s.handle)}</em>${VERIFIED}</span></div><a class="btn" href="${esc(ctaUrl)}" target="_blank" rel="noopener" style="--brand:${base.id === "x" ? "#333" : (base.brand.startsWith("linear") ? "#d62976" : base.brand)}${base.id === "snapchat" ? ";color:#111" : ""}">${esc(base.cta)}</a></div>
      ${body}</article>`;
  }).join("") + duoCard(V, DUO);
  renderLinks();
  Snd.syncUI();
}
// one listener for everything inside the social cards (instead of one per button)
function setupSocialClicks() {
  $("#socGrid").addEventListener("click", e => {
    const np = e.target.closest("[data-np]"); if (np) { Snd.fx("tick"); Snd.toggle(); return; }
    const st = e.target.closest("[data-story]"); if (st) { Snd.fx("tick"); Stories.open(+st.dataset.story); return; }
    if (e.target.closest("a")) Snd.fx("tick");
  });
}
/* ---- more links (YouTube, shop, game profile...) ---- */
const LINK_KINDS = [
  [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube", "#ff0033"], [/(^|\.)instagram\.com$/, "instagram", "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)"],
  [/(^|\.)(x\.com|twitter\.com)$/, "x", "#111111"], [/(^|\.)snapchat\.com$/, "snapchat", "#fffc00"], [/(^|\.)(discord\.gg|discord\.com)$/, "discord", "#5865f2"],
  [/(^|\.)spotify\.com$/, "spotify", "#1ed760"], [/(^|\.)(wa\.me|whatsapp\.com)$/, "whatsapp", "#25d366"], [/(^|\.)github\.com$/, "github", "#24292f"],
  [/(^|\.)linkedin\.com$/, "linkedin", "#0a66c2"], [/(^|\.)twitch\.tv$/, "twitch", "#9146ff"], [/(^|\.)(t\.me|telegram\.me|telegram\.org)$/, "telegram", "#229ed9"],
  [/(^|\.)threads\.(net|com)$/, "threads", "#111111"], [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, "facebook", "#1877f2"], [/(^|\.)pinterest\./, "pinterest", "#e60023"],
  [/(^|\.)reddit\.com$/, "reddit", "#ff4500"], [/(^|\.)(steamcommunity\.com|steampowered\.com)$/, "steam", "#1b2838"], [/(^|\.)tiktok\.com$/, "tiktok", "#111111"]
];
function linkKind(u) {
  let host = ""; try { host = new URL(u).hostname.toLowerCase().replace(/^www\./, ""); } catch (e) {}
  const k = LINK_KINDS.find(([re]) => re.test(host));
  return { icon: k ? k[1] : "link", brand: k ? k[2] : "linear-gradient(135deg,var(--pink),var(--violet))", host, dark: k && k[1] === "snapchat" };
}
function linksNow() { if (!Custom.demo) return pageData().links; const S = Custom.settings || {}; return cleanLinks(Array.isArray(S.links) ? S.links : CONFIG.links); }
function renderLinks() {
  const list = linksNow(), box = $("#linkList");
  box.hidden = !list.length;
  box.innerHTML = list.map(l => {
    const k = linkKind(l.u);
    return `<a class="lnk" href="${esc(l.u)}" target="_blank" rel="noopener"><span class="soc-ic" style="background:${k.brand}${k.dark ? ";color:#111" : ""}" aria-hidden="true">${icon(k.icon)}</span><span class="lnk-t">${esc(l.t || k.host)}<small>${esc(k.host)}</small></span><i aria-hidden="true">↗</i></a>`;
  }).join("");
}

/* ======================= SNAPCHAT STORIES ======================= */
// the stories to play: the example page's, or (on a personal page) only the ones its owner added
function snapStories() {
  if (Custom.demo) { const v = socialView().snapchat; return v ? { list: v.stories.filter(st => st.img), url: v.url } : { list: [], url: "" }; }
  const D = pageData(), M = Custom.media || {}, s = D.socials.find(x => x.k === "snapchat");
  const list = [0, 1, 2, 3].map(j => ({ img: M["sc" + j], ...((((D.snapchat || {}).stories) || [])[j] || {}) })).filter(x => x.img);
  return { list, url: s ? SOCIAL.snapchat.url(s.v) : "" };
}
// Tap right = next, tap left = back, hold = pause, Esc = close. Stories you've watched turn grey (this visit).
const Stories = (() => {
  const DUR = 4500; let list = [], i = 0, timer = 0, startAt = 0, left = DUR, lastFocus = null, holdT = 0, held = false;
  const watched = new Set();
  const el = () => $("#storyView");
  function show() {
    const st = list[i]; if (!st) return close();
    $("#svImg").src = bestSrc(st.img); $("#svCap").textContent = st.cap || ""; $("#svWhen").textContent = st.when || "";
    $("#svBars").innerHTML = list.map((_, k) => `<i class="${k < i ? "done" : k === i ? "now" : ""}"><b></b></i>`).join("");
    $("#svBars").style.setProperty("--dur", DUR + "ms");
    watched.add(i); const t = $(`#socGrid [data-story="${i}"]`); if (t) t.classList.add("seen");
    left = DUR; run();
    const nx = list[i + 1]; if (nx) { const im = new Image(); im.src = bestSrc(nx.img); }   // get the next one ready
  }
  function run() { clearTimeout(timer); startAt = performance.now(); timer = setTimeout(next, left); $("#svFrame").classList.remove("paused"); }
  function pause() { if (!timer) return; clearTimeout(timer); timer = 0; left = Math.max(0, left - (performance.now() - startAt)); $("#svFrame").classList.add("paused"); }
  function next() { Snd.fx("tick"); if (i < list.length - 1) { i++; show(); } else close(); }
  function prev() { Snd.fx("tick"); if (i > 0) i--; show(); }
  function open(k) {
    const v = snapStories(); if (!v.list.length) return;
    list = v.list; i = Math.min(Math.max(0, k), list.length - 1); lastFocus = document.activeElement;
    $("#svAv").src = (Custom.media && Custom.media.avatar) || CONFIG.avatar; $("#svName").textContent = ownerName(); $("#svAdd").href = v.url;
    el().hidden = false; document.documentElement.style.overflow = "hidden"; show();
    setTimeout(() => $("#svClose").focus(), 50);
  }
  function close() { clearTimeout(timer); timer = 0; el().hidden = true; document.documentElement.style.overflow = ""; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function init() {
    $("#svClose").addEventListener("click", close);
    $("#svNext").addEventListener("click", () => { if (!held) next(); });
    $("#svPrev").addEventListener("click", () => { if (!held) prev(); });
    el().addEventListener("click", e => { if (e.target === el()) close(); });
    addEventListener("keydown", e => { if (el().hidden) return; if (e.key === "Escape") close(); else if (e.key === "ArrowRight") next(); else if (e.key === "ArrowLeft") prev(); });
    document.addEventListener("visibilitychange", () => { if (!el().hidden && document.visibilityState === "hidden") pause(); });
    // hold anywhere on the story to pause it
    ["#svNext", "#svPrev"].forEach(id => {
      const b = $(id);
      b.addEventListener("pointerdown", () => { held = false; clearTimeout(holdT); holdT = setTimeout(() => { held = true; pause(); }, 220); });
      ["pointerup", "pointercancel", "pointerleave"].forEach(ev => b.addEventListener(ev, () => { clearTimeout(holdT); if (held) { run(); setTimeout(() => { held = false; }, 0); } }));
      b.addEventListener("contextmenu", e => e.preventDefault());
    });
  }
  return { open, close, init, seen: k => watched.has(k) };
})();

/* ======================= OWNER CUSTOMIZATION ======================= */
// On someone's page (flexippo.com/name) everything they change is saved to their account,
// so it shows for everyone, on every device. While they edit, the page changes on screen straight away
// and saves itself a moment later (no Save button to forget).
// A page that was never saved starts as a copy of the example page (its accounts, posts, stories and collection).
// The owner changes or removes any of it from ✎ Customize; once they save, only what they kept stays.
function starterPage() {
  const soc = id => BASE.socials.find(s => s.id === id) || {};
  const ig = soc("instagram"), sc = soc("snapchat"), xs = soc("x"), media = {};
  (ig.posts || []).slice(0, 3).forEach((p, i) => { media["ig" + i] = p.img; });
  (sc.stories || []).slice(0, 4).forEach((st, i) => { media["sc" + i] = st.img; });
  if (xs.post && xs.post.img) media.x0 = xs.post.img;
  const collection = BASE.collection.slice(0, colMax()).map(it => { media["col_" + it.id] = it.img; return { id: it.id, alt: it.alt || "", meme: it.meme || "" }; });
  const settings = {
    v: 2, profile: {}, links: [], collection,
    socials: [["instagram", ig], ["snapchat", sc], ["x", xs]].map(([k, s]) => ({ k, v: String(s.handle || "").replace(/^@/, "") })).filter(s => SOCIAL[s.k].re.test(s.v)),
    instagram: { posts: (ig.posts || []).slice(0, 3).map(p => ({ cap: p.cap || "" })) },
    snapchat: { score: sc.score || "", streak: sc.streak || "", stories: (sc.stories || []).slice(0, 4).map(st => ({ cap: st.cap || "", when: st.when || "" })) }
  };
  return { settings, media };
}
const Custom = (() => {
  let owner = false, cloud = false, target = null, isHome = false, missing = "", failed = false, loaded = false, lastError = null;
  let settings = {}, media = {}, saved = { settings: {}, media: {} };
  const subs = [];
  const emit = why => subs.forEach(f => { try { f(why); } catch (e) { console.error(e); } });   // why: load | local (being edited, not saved yet) | save
  const wanted = () => PAGE_U || String(CONFIG.homeProfile || "").trim().replace(/^@/, "").toLowerCase();
  const syncOwner = () => {
    const meId = Cloud.ready ? (Cloud.user && Cloud.user.id) : ((Cloud.cachedMe || {}).id);
    owner = !!(cloud && target && meId && meId === target.id && (!Cloud.ready || Cloud.user));
  };
  async function init() {
    const u = wanted();
    if (u) {
      cloud = true; isHome = !PAGE_U; settings = {}; media = {};
      if (PAGE_U) document.body.classList.add("loading-page");
      const slow = setTimeout(() => document.body.classList.remove("loading-page"), 6000);   // never hide the page for long
      try { target = await Cloud.getProfile(u); } catch (e) { target = null; lastError = e; failed = !!PAGE_U; }
      clearTimeout(slow);
      if (target) {
        settings = cleanSettings(target.settings); media = cleanMedia(target.media);
        if (!Object.keys(settings).length) { const st = starterPage(); settings = st.settings; media = { ...st.media, ...media }; }
        saved = { settings, media };
      }
      else if (PAGE_U && !failed) missing = u;
      syncOwner();
      Cloud.on(why => { if (why === "auth" || why === "me" || why === "init") { const was = owner; syncOwner(); if (was !== owner) apply(); } });
      return apply();
    }
    apply();
  }
  function apply() {
    loaded = true;
    document.body.classList.toggle("is-owner", owner);
    document.body.classList.toggle("on-page", !!target && !isHome);
    document.body.classList.toggle("personal", !!target);
    emit("load");
    document.body.classList.remove("loading-page");
    document.documentElement.classList.remove("upage");
  }
  // show a change on the page right away (not saved yet)
  function setLocal(s, m) { settings = s; if (m) media = m; emit("local"); }
  // save what's on screen now. Photos that are still uploading are left out until they're done.
  let chain = Promise.resolve("cloud"), queued = null;
  async function doPersist() {
    if (!cloud || !owner || !target) { lastError = new Error("not_owner"); return "error"; }
    const s = settings, m = cleanMedia(media), nm = String(((s || {}).profile || {}).name || "").trim();
    try {
      const row = await Cloud.savePage(s, m, nm || target.display_name || target.username);
      target = { ...target, ...row }; saved = { settings: cleanSettings(row.settings), media: cleanMedia(row.media) }; lastError = null;
      return "cloud";
    } catch (e) { lastError = e; return "error"; }
  }
  function persist() {
    if (queued) return queued;                 // one save is already waiting: it will take the newest changes with it
    queued = chain.then(() => { queued = null; return doPersist(); });
    chain = queued.catch(() => "error");
    return queued;
  }
  async function save(next) { settings = next; emit("save"); return persist(); }
  return {
    init, save, setLocal, persist, on(f) { subs.push(f); },
    get settings() { return settings; }, get media() { return media; }, get saved() { return saved; }, get owner() { return owner; },
    get cloud() { return cloud; }, get target() { return target; }, get isHome() { return isHome; }, get missing() { return missing; }, get failed() { return failed; }, get loaded() { return loaded; }, get lastError() { return lastError; },
    // the example page with made-up numbers = the main page without a real profile behind it
    get demo() { return !cloud || !target; }
  };
})();

/* ======================= WHAT'S ON A PERSONAL PAGE ======================= */
// A personal page only shows what its owner added. Nothing from the example page (its photos, @flexippo,
// a made-up Snapscore...) ever fills the gaps. Pages saved with the old editor did carry that example content
// along, so it's filtered out here: the owner's own photos and text stay, the leftovers go.
function parseSocial(k, raw) {
  const d = SOCIAL[k]; if (!d) return "";
  let s = String(raw || "").trim().replace(/^<|>$/g, "");
  if (!s) return "";
  if (k === "email") s = s.replace(/^mailto:/i, "");
  // a link (has https:// or a /path) is read for the username; anything else IS the username (riya.art is a username, not a website)
  let u = null;
  if (k !== "email" && (/^https?:\/\//i.test(s) || /^([a-z0-9-]+\.)+[a-z]{2,}\//i.test(s))) { try { u = new URL(/^https?:\/\//i.test(s) ? s : "https://" + s); } catch (e) { u = null; } }
  else if (k !== "email" && /^(www\.)?(instagram|snapchat|youtube|youtu|x|twitter|tiktok|whatsapp|wa|discord|discordapp|spotify|open\.spotify|t|telegram|twitch|github|linkedin|facebook|fb|threads|pinterest|reddit|steamcommunity)\.(com|be|me|gg|tv|net|link)$/i.test(s)) return "";   // just the website's name, no username
  let v = s.replace(/^@/, "");
  if (u) {
    const host = u.hostname.toLowerCase().replace(/^(www|m|mobile|web|in|uk|br|de|fr|es|it|nl|jp)\./, "");
    const p = u.pathname.split("/").filter(Boolean).map(x => { try { return decodeURIComponent(x); } catch (e) { return x; } });
    const at = x => String(x || "").replace(/^@/, "");
    const on = re => re.test(host);
    v = "";
    if (k === "instagram" && on(/^instagram\.com$/)) v = p[0] === "stories" ? at(p[1]) : ["p", "reel", "reels", "explore", "tv", "accounts"].includes(p[0]) ? "" : at(p[0]);
    else if (k === "threads" && on(/^threads\.(net|com)$/)) v = at(p[0]);
    else if (k === "snapchat" && on(/snapchat\.com$/)) v = p[0] === "add" ? p[1] : /^@/.test(p[0] || "") ? at(p[0]) : "";
    else if (k === "youtube" && on(/^youtube\.com$/)) v = /^@/.test(p[0] || "") ? at(p[0]) : p[0] === "channel" && p[1] ? "channel/" + p[1] : p[0] === "c" && p[1] ? "c/" + p[1] : "";
    else if (k === "x" && on(/^(x|twitter)\.com$/)) v = ["home", "i", "intent", "share", "search", "hashtag"].includes(p[0]) ? "" : at(p[0]);
    else if (k === "tiktok" && on(/tiktok\.com$/)) v = /^@/.test(p[0] || "") ? at(p[0]) : "";
    else if (k === "whatsapp" && on(/^(wa\.me|api\.whatsapp\.com|whatsapp\.com)$/)) v = String(u.searchParams.get("phone") || p[0] || "").replace(/\D/g, "");
    else if (k === "discord" && on(/^(discord\.gg|discord\.com|discordapp\.com)$/)) v = host === "discord.gg" ? p[0] : p[0] === "invite" ? p[1] : "";
    else if (k === "spotify" && on(/^(open\.spotify\.com|spotify\.link)$/)) {
      if (host === "spotify.link") v = p[0] ? "https://spotify.link/" + p[0] : "";
      else { const q = /^intl-/.test(p[0] || "") ? p.slice(1) : p; v = q[0] && q[1] ? q[0] + "/" + q[1] : ""; }
    }
    else if (k === "telegram" && on(/^(t\.me|telegram\.me)$/)) v = at(p[0]);
    else if (k === "twitch" && on(/twitch\.tv$/)) v = p[0];
    else if (k === "github" && on(/^github\.com$/)) v = p[0];
    else if (k === "linkedin" && on(/linkedin\.com$/)) v = p[0] === "in" ? p[1] : "";
    else if (k === "facebook" && on(/^(facebook\.com|fb\.com)$/)) v = p[0] === "profile.php" ? "" : p[0];
    else if (k === "pinterest" && on(/pinterest\./)) v = p[0];
    else if (k === "reddit" && on(/reddit\.com$/)) v = (p[0] === "user" || p[0] === "u") ? p[1] : "";
    else if (k === "steam" && on(/steamcommunity\.com$/)) v = (p[0] === "id" || p[0] === "profiles") && p[1] ? p[0] + "/" + p[1] : "";
  } else {
    if (k === "whatsapp") v = s.replace(/[\s()+-]/g, "");
    if (k === "steam" && v && !/^(id|profiles)\//.test(v)) v = /^\d{17}$/.test(v) ? "profiles/" + v : "id/" + v;
    if (k === "spotify") v = "";                      // Spotify needs a link (there's no username to make one from)
    if (k === "discord") v = v.replace(/^discord\.gg\//i, "");
  }
  v = String(v || "").trim();
  return d.re.test(v) ? v : "";
}
const same = (a, b) => String(a === undefined || a === null ? "" : a).trim().toLowerCase() === String(b === undefined || b === null ? "" : b).trim().toLowerCase();
let pdS = null, pdM = null, pdVal = null;
function pageData() {
  const S = Custom.settings || {}, M = Custom.media || {};
  if (S === pdS && M === pdM && pdVal) return pdVal;
  let out;
  if (S.v === 2) {
    out = { ...S, profile: S.profile && typeof S.profile === "object" ? S.profile : {}, socials: cleanSocials(S.socials), links: cleanLinks(S.links), collection: Array.isArray(S.collection) ? S.collection : [] };
  } else {
    // saved with the old editor (or never saved): keep what the owner really put in
    const P = { ...(S.profile && typeof S.profile === "object" ? S.profile : {}) };
    if (Array.isArray(P.titles) && JSON.stringify(P.titles) === JSON.stringify(BASE.titles)) delete P.titles;
    if (Array.isArray(P.ticker) && JSON.stringify(P.ticker) === JSON.stringify(BASE.ticker)) delete P.ticker;
    const socials = [], add = (k, raw) => { if (socials.some(x => x.k === k)) return; const v = parseSocial(k, raw); if (v) socials.push({ k, v }); };
    const ig = S.instagram || {}, sc = S.snapchat || {}, xx = S.x || {}, sp = S.spotify || {}, dc = S.discord || {}, C = S.contact || {};
    if (!same(ig.handle, "@flexippo")) add("instagram", ig.handle); if (!same(ig.url, "https://www.instagram.com/")) add("instagram", ig.url);
    if (!same(sc.handle, "@flexippo")) add("snapchat", sc.handle); if (!same(sc.url, "https://www.snapchat.com/")) add("snapchat", sc.url);
    if (!same(xx.handle, "@flexippo")) add("x", xx.handle); if (!same(xx.url, "https://x.com/")) add("x", xx.url);
    if (!same(sp.url, "https://open.spotify.com/")) add("spotify", sp.url);
    if (!same(dc.url, "https://discord.com/")) add("discord", dc.url);
    add("instagram", C.instagram); add("snapchat", C.snapchat); add("x", C.x); add("whatsapp", C.whatsapp); add("discord", C.discord); add("email", C.gmail);
    const bsc = (BASE.socials.find(s => s.id === "snapchat") || {}), bdc = (BASE.socials.find(s => s.id === "discord") || {});
    out = {
      v: 2, profile: P, socials, links: cleanLinks(S.links), pins: S.pins, cmHidden: S.cmHidden,
      instagram: { posts: [0, 1, 2].map(i => (M["ig" + i] ? (ig.posts || [])[i] || {} : {})) },
      snapchat: { score: same(sc.score, bsc.score) ? "" : sc.score, streak: same(sc.streak, bsc.streak) ? "" : sc.streak, stories: [0, 1, 2, 3].map(i => (M["sc" + i] ? (sc.stories || [])[i] || {} : {})) },
      x: { link: xx.link || "" },
      spotify: { title: same(sp.title, BASE.spotify.title) ? "" : sp.title, playlist: same(sp.playlist, BASE.spotify.playlist) ? "" : sp.playlist, artist: same(sp.artist, BASE.spotify.artist) ? "" : sp.artist, accent: same(sp.accent, BASE.spotify.accent) ? "" : sp.accent },
      discord: { blurb: same(dc.blurb, bdc.blurb) ? "" : dc.blurb },
      // the collection: only photos the owner uploaded and text cards they changed
      collection: (Array.isArray(S.collection) ? S.collection : []).filter(it => it && typeof it === "object" && (it.type === "uc"
        ? !(same(it.amount, "10,000") && same(it.unit, "UC") && same(it.game, "PUBG MOBILE")) || !!M["col_" + it.id + "_icon"] || !!M["col_" + it.id + "_logo"]
        : !!M["col_" + it.id]))
    };
  }
  pdS = S; pdM = M; pdVal = out;
  return out;
}

/* ======================= PROFILE BASICS (name, photos, birthday, theme, contact) ======================= */
// The example page uses the defaults in CONFIG. Personal pages use only what their owner added.
const clip = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");
function cleanList(v, max, len) {
  const a = (Array.isArray(v) ? v : typeof v === "string" ? v.split("\n") : []).map(x => clip(String(x || ""), len)).filter(Boolean).slice(0, max);
  return a.length ? a : null;
}
const CONTACT_LINK = {
  x: v => (/^[A-Za-z0-9_]{1,15}$/.test(v) ? "https://x.com/" + v : ""),
  instagram: v => (/^[A-Za-z0-9_.]{1,30}$/.test(v) ? "https://www.instagram.com/" + v + "/" : ""),
  gmail: v => (/^[^\s@<>"']+@[^\s@<>"']+\.[A-Za-z]{2,}$/.test(v) ? "mailto:" + v : ""),
  snapchat: v => (/^[A-Za-z0-9_.-]{2,30}$/.test(v) ? "https://www.snapchat.com/add/" + v : ""),
  whatsapp: v => { const d = v.replace(/\D/g, ""); return d.length >= 8 && d.length <= 15 ? "https://wa.me/" + d : ""; },
  discord: v => (/^https:\/\/(www\.)?(discord\.gg|discord\.com)\/\S+$/i.test(v) ? v : "")
};
function contactFor(base, val, userPage) {
  if (val === undefined || val === null) return userPage ? { ...base, value: "", url: "" } : { ...base };
  const v = String(val).trim().replace(/^@/, "").slice(0, 80);
  const url = v ? (CONTACT_LINK[base.id] || (() => ""))(v) : "";
  return { ...base, value: base.id === "whatsapp" && url ? "+" + v.replace(/\D/g, "") : v, url };
}
let skinTouched = false;
function applyBasics(why) {
  const T = Custom.target, own = !!T;                        // own = a real person's page (not the example page)
  const userPage = own && !Custom.isHome;
  if (own) {
    const D = pageData(), P = D.profile || {}, M = Custom.media || {};
    const name = clip(P.name, 24) || T.display_name || T.username;
    CONFIG.name = name;
    CONFIG.heroName = clip(P.heroName, 14) || name.toUpperCase().slice(0, 14);
    CONFIG.kana = typeof P.kana === "string" && P.kana.trim() ? clip(P.kana, 30) : "@" + T.username;
    CONFIG.titles = cleanList(P.titles, 6, 40) || [];
    CONFIG.birthday = typeof P.birthday === "string" ? P.birthday.trim() : "";
    CONFIG.avatar = M.avatar || FLEX_AVATAR;
    CONFIG.cover = M.cover || "";
    CONFIG.ticker = cleanList(P.ticker, 8, 30) || [CONFIG.heroName, "WELCOME TO MY PAGE", "限界突破", "FLEXIPPO.COM"];
    CONFIG.contact = BASE.contact.map(c => ({ ...c, value: "", url: "" }));
    if (!skinTouched && ["night", "sakura", "fire"].includes(P.skin) && document.documentElement.dataset.skin !== P.skin) applySkin(P.skin, false, true);
  } else if (PAGE_U) {
    CONFIG.titles = []; CONFIG.cover = "";              // page not found / not loaded: nothing from the example page
  }
  CONFIG.siteUrl = userPage ? Cloud.shareLink(T.username) : BASE.siteUrl;
  document.title = userPage ? CONFIG.name + " · flexippo" : BASE_TITLE;
  document.body.classList.toggle("no-bio", !CONFIG.titles.length);
  document.body.classList.toggle("no-cover", !CONFIG.cover);
  $("#coverBtnT").textContent = CONFIG.cover ? "Change photo" : "Add your photo";
  renderName(why === "local"); renderTicker(); renderContact(); renderShare(); tickCountdown();
}
function renderTicker() {
  const isJp = t => /[぀-ヿ㐀-鿿＀-￯]/.test(t);   // Japanese letters
  const one = "<span>" + CONFIG.ticker.concat(CONFIG.ticker).map(t => (isJp(t) ? `<b class="jp">${esc(t)}</b>` : esc(t)) + " ✦").join("</span><span>") + "</span>";
  const html = one + one, tr = $("#tickerTrack");
  if (tr.innerHTML !== html) tr.innerHTML = html;
}
function renderContact() {
  // personal pages show how to reach them in the socials list, so this box is only on the example page
  const sec = $("#contact"); sec.hidden = !Custom.demo || !!PAGE_U; if (sec.hidden) return;
  const mail = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';
  $("#ctGrid").innerHTML = CONFIG.contact.map(c => {
    const link = !!(c.value && c.url), plain = !!c.value && !c.url;
    const ic = `<span class="soc-ic" style="background:${c.brand};${c.id === "snapchat" ? "color:#111" : ""}" aria-hidden="true">${c.icon ? icon(c.icon) : mail}</span>`;
    const t = `<span class="cnt-t">${c.value ? esc(c.value) : "Coming soon"}</span>`;
    if (link) return `<a class="cnt" href="${esc(c.url)}" target="_blank" rel="noopener" aria-label="${esc(c.label)}: ${esc(c.value)}">${ic}${t}</a>`;
    if (plain) return `<div class="cnt" aria-label="${esc(c.label)}: ${esc(c.value)}">${ic}${t}</div>`;
    return `<div class="cnt off" aria-label="${esc(c.label)}: not added yet">${ic}${t}</div>`;
  }).join("");
}

// photos are made smaller on the phone before they're uploaded (quicker on slow internet, lighter for visitors)
function shrinkImage(file, max = 720, maxBytes = 220000) {
  return new Promise((res, rej) => {
    if (!file || !/^image\//.test(file.type)) return rej(new Error("type"));
    const url = URL.createObjectURL(file), im = new Image();
    im.onload = () => {
      const k = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight));
      const c = document.createElement("canvas"); c.width = Math.round(im.naturalWidth * k); c.height = Math.round(im.naturalHeight * k);
      const g = c.getContext("2d"); g.fillStyle = "#000"; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      let q = 0.86, d = c.toDataURL("image/jpeg", q);
      while (d.length > maxBytes && q > 0.3) { q -= 0.1; d = c.toDataURL("image/jpeg", q); }
      res(d);
    };
    im.onerror = () => { URL.revokeObjectURL(url); rej(new Error("load")); };
    im.src = url;
  });
}

/* ======================= OWNER TOOLS (downloaded only for the page's owner) ======================= */
// Visitors never download the editor. It loads when the owner opens their own page.
const OwnerTools = (() => {
  let p = null;
  const load = () => p || (p = loadScript("assets/edit.js?v=4").then(() => { if (!window.FlexEdit) throw new Error("Failed to fetch"); return window.FlexEdit; }, e => { p = null; throw e; }));
  function open(what) {
    // already downloaded: open right away, still inside the tap (phones only open the photo gallery straight from a tap)
    if (window.FlexEdit) { window.FlexEdit.open(what, true); return Promise.resolve(); }
    return load().then(E => E.open(what, false), () => toast("Couldn't open the editor. Check your internet and try again."));
  }
  // tap on anything marked data-open (owner buttons all over the page)
  document.addEventListener("click", e => {
    const b = e.target.closest && e.target.closest("[data-open]"); if (!b || !Custom.owner) return;
    e.preventDefault(); Snd.fx("tick"); open(b.dataset.open);
  });
  return { load, open };
})();

/* ======================= REAL NUMBERS ON PERSONAL PAGES (Supabase) =======================
   Likes, comments, guestbook and views for flexippo.com/name. Reading needs no login; liking, commenting
   and signing need a free account. If the database part isn't set up yet, the page quietly falls back
   to how it worked before (likes kept on the visitor's phone). */
const Live = (() => {
  let page = null, sum = null, state = "off", mine = new Set(), pinned = {};   // state: off | loading | on | missing | error
  const inflight = new Map(); let recent = [];   // likes being saved right now / just saved (so a slower "which did I like?" answer can't undo them)
  const subs = [];
  const emit = why => subs.forEach(f => { try { f(why); } catch (e) { console.error(e); } });
  const live = () => state === "on";
  const CA = "author:profiles!comments_user_fk(username,display_name,avatar_url)";
  const GA = "author:profiles!guestbook_user_fk(username,display_name,avatar_url)";
  const GCOLS = `id,body,created_at,user_id,reply_to,item_id,item_title,${GA}`;
  async function load(p) {
    page = p; state = "loading"; sum = null; emit("state");
    try { sum = await rest("rpc/page_summary", { method: "POST", body: { p_page: p.id } }) || {}; state = "on"; }
    catch (e) { state = isMissing(e) ? "missing" : "error"; }
    emit("state");
    if (live()) { loadPinned(); countView(); if (Cloud.ready) loadMine(); }
  }
  async function loadMine() {
    if (!live()) return;
    if (!Cloud.me) { if (mine.size) { mine = new Set(); emit("mine"); } return; }
    try {
      const t0 = Date.now();
      const { data, error } = await Cloud.sb.from("likes").select("item_id").eq("page_id", page.id).eq("user_id", Cloud.me.id);
      if (error) throw error;
      const s = new Set((data || []).map(r => r.item_id));
      recent.filter(r => r[0] >= t0).forEach(([, id, on]) => (on ? s.add(id) : s.delete(id)));
      inflight.forEach((on, id) => (on ? s.add(id) : s.delete(id)));
      recent = recent.filter(r => Date.now() - r[0] < 60000);
      mine = s; emit("mine");
    } catch (e) {}
  }
  function countView() {
    // one view per phone per day, and the owner opening their own page doesn't count
    const me = (Cloud.me || Cloud.cachedMe || {}).id; if (me && me === page.id) return;
    const k = "view@" + page.id, day = new Date().toISOString().slice(0, 10); if (LS.get(k, "") === day) return;
    LS.set(k, day);
    rest("rpc/add_view", { method: "POST", body: { p_page: page.id } }).then(n => { if (sum && typeof n === "number") { sum.views = n; emit("views"); } }, () => {});
  }
  async function loadPinned() {
    const ids = Object.values((Custom.settings || {}).pins || {}).map(Number).filter(n => Number.isInteger(n) && n > 0);
    if (!ids.length) { if (Object.keys(pinned).length) { pinned = {}; emit("pinned"); } return; }
    try { const rows = await rest("comments?select=id,item_id,body&id=in.(" + ids.join(",") + ")"); pinned = {}; (rows || []).forEach(r => { pinned[r.item_id] = r; }); emit("pinned"); } catch (e) {}
  }
  const likes = id => (sum && sum.likes ? +sum.likes[id] || 0 : 0);
  const comments = id => (sum && sum.comments ? +sum.comments[id] || 0 : 0);
  const bump = (k, id, d) => { sum[k] = { ...(sum[k] || {}), [id]: Math.max(0, (+((sum[k] || {})[id]) || 0) + d) }; };
  async function toggleLike(id) {
    if (inflight.has(id)) return mine.has(id);   // still saving the last tap
    const was = mine.has(id);
    was ? mine.delete(id) : mine.add(id); bump("likes", id, was ? -1 : 1); inflight.set(id, !was); emit("likes");
    try {
      const q = Cloud.sb.from("likes");
      const { error } = was ? await q.delete().eq("page_id", page.id).eq("item_id", id).eq("user_id", Cloud.me.id) : await q.insert({ page_id: page.id, item_id: id });
      if (error && error.code !== "23505") throw error;   // 23505 = already liked (from another phone): that's fine
    } catch (e) { inflight.delete(id); was ? mine.add(id) : mine.delete(id); bump("likes", id, was ? 1 : -1); emit("likes"); throw e; }
    inflight.delete(id); recent.push([Date.now(), id, !was]);
    return !was;
  }
  const listComments = itemId => rest(`comments?select=id,body,created_at,user_id,${CA}&page_id=eq.${page.id}&item_id=eq.${encodeURIComponent(itemId)}&order=created_at.desc&limit=100`).then(r => r || []);
  async function addComment(itemId, body) {
    const { data, error } = await Cloud.sb.from("comments").insert({ page_id: page.id, item_id: itemId, body }).select(`id,body,created_at,user_id,${CA}`).single();
    if (error) throw error;
    bump("comments", itemId, 1); emit("counts"); return data;
  }
  async function deleteComment(id, itemId) {
    const { data, error } = await Cloud.sb.from("comments").delete().eq("id", id).select("id");
    if (error) throw error;
    if (!data || !data.length) throw new Error("You can only delete your own comments.");
    bump("comments", itemId, -1); if (pinned[itemId] && pinned[itemId].id === id) { delete pinned[itemId]; emit("pinned"); } else emit("counts");
  }
  const listGuestbook = () => rest(`guestbook?select=${GCOLS}&page_id=eq.${page.id}&order=created_at.desc&limit=80`).then(r => r || []);
  async function sign(body, extra) {
    const { data, error } = await Cloud.sb.from("guestbook").insert({ page_id: page.id, body, ...(extra || {}) }).select(GCOLS).single();
    if (error) throw error; return data;
  }
  async function unsign(id) {
    const { data, error } = await Cloud.sb.from("guestbook").delete().eq("id", id).select("id");
    if (error) throw error;
    if (!data || !data.length) throw new Error("You can only delete your own messages.");
  }
  return {
    load, loadMine, loadPinned, on(f) { subs.push(f); },
    get state() { return state; }, get live() { return live(); }, get page() { return page; }, get views() { return sum ? +sum.views || 0 : 0; },
    totals() { const s = sum || {}, add = o => Object.values(o || {}).reduce((a, b) => a + (+b || 0), 0); return { views: +s.views || 0, likes: add(s.likes), comments: add(s.comments), guestbook: +s.guestbook || 0 }; },
    likes, comments, liked: id => mine.has(id), pinned: id => pinned[id] || null,
    toggleLike, listComments, addComment, deleteComment, listGuestbook, sign, unsign
  };
})();
// likes kept on this phone (the example page, or a personal page whose database part isn't ready)
const Local = (() => {
  let mine = LS.get(pageKey("mine"), {}) || {};
  return {
    liked: id => (mine[id] || []).includes("like"),
    toggle(id) { const on = !this.liked(id); mine = { ...mine, [id]: on ? ["like"] : [] }; LS.set(pageKey("mine"), mine); return on; }
  };
})();
const realPage = () => !Custom.demo && Live.live;
// someone who isn't logged in tried to do something that needs an account
async function needAccount(why, then) {
  if (!Cloud.ready) { try { await Cloud.ensure(); } catch (e) { toast(friendlyError(e)); return false; } }
  if (Cloud.me) return true;
  Accounts.ask(why, then);
  return false;
}

/* ======================= COLLECTION ======================= */
const HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.6-4.6-9.5-9.3C1.1 7.7 3.4 4 7 4c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.6 0 5.9 3.7 4.5 7.2-1.9 4.7-9.5 9.3-9.5 9.3z"/></svg>';
const BUBBLE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.7 16.9A9.2 9.2 0 1 0 17 20.6L21.5 21.5z"/></svg>';
// example numbers + comments for each item on the demo page (the same every visit)
const hypeCache = {};
function hypeFor(it) {
  if (hypeCache[it.id]) return hypeCache[it.id];
  const H = CONFIG.hype || {}, r = seeded((seedOf(it.id) % 2147483646) + 1); r(); r();
  const pick = ([lo, hi]) => Math.round(lo + r() * (hi - lo));
  const likes = it.likes || pick(H.likes || [1200000, 9800000]), comments = it.comments || pick(H.comments || [2400, 48000]);
  const people = (H.people || []).slice(), lines = (H.lines || []).slice(), list = [];
  const want = Math.min(H.perItem || 12, people.length, lines.length);
  const pin = (CONFIG.pins || {})[it.id];
  if (pin && people.includes(pin)) people.splice(people.indexOf(pin), 1);
  for (let i = 0; i < want; i++) {
    const who = i === 0 && pin ? pin : people.splice(Math.floor(r() * people.length), 1)[0], text = lines.splice(Math.floor(r() * lines.length), 1)[0];
    if (!who || !text) break;
    list.push({ who, text, ago: ["1d", "2d", "3d", "5d", "1w", "2w", "3w"][Math.floor(r() * 7)], likes: Math.round(800 + r() * 24000) });
  }
  list.sort((a, b) => b.likes - a.likes);
  return (hypeCache[it.id] = { likes, comments, list });
}
// owner choices for the example comments: pinned comment per photo + comments the owner removed
let cmOverride = null;                                   // used right after a change, until the save comes back
const cmSettings = () => cmOverride || Custom.settings || {};
function pinsNow() { const S = cmSettings(); return S.pins || (Custom.demo ? CONFIG.pins : null) || {}; }
function removedFor(it) { return (cmSettings().cmHidden || {})[it.id] || []; }
function demoComments(it) { const gone = removedFor(it); return hypeFor(it).list.filter(c => !gone.includes(c.who)); }
function commentCount(it) {
  if (Custom.demo) return Math.max(0, hypeFor(it).comments - removedFor(it).length);
  return realPage() ? Live.comments(it.id) : 0;
}
function likeCount(it) {
  if (Custom.demo) return hypeFor(it).likes + (Local.liked(it.id) ? 1 : 0);
  return realPage() ? Live.likes(it.id) : (Local.liked(it.id) ? 1 : 0);
}
const likedNow = it => (realPage() ? Live.liked(it.id) : Local.liked(it.id));
function pinnedText(it) {
  if (Custom.demo) { const who = pinsNow()[it.id]; const c = who ? demoComments(it).find(x => x.who === who) : null; return c ? c.text : ""; }
  if (!realPage()) return "";
  const p = Live.pinned(it.id); return p && String(pinsNow()[it.id]) === String(p.id) ? p.body : "";
}
function itemTitle(it) { return it.type === "uc" ? `${it.amount} ${it.unit}` : (it.meme || it.alt || "My collection"); }
function ownerName() { const n = String(CONFIG.name || ""); return n === n.toUpperCase() ? n.charAt(0) + n.slice(1).toLowerCase() : n; }
const AV_COLORS = [["#ff2e88", "#8b5cff"], ["#22e4ff", "#2b6bff"], ["#ffc83d", "#ff6a1a"], ["#2bff88", "#0aa9bf"], ["#ff7ab6", "#ff3d3d"], ["#9b5cff", "#22e4ff"]];
function avatarOf(who, url) {
  if (url && String(url).startsWith(MEDIA_PREFIX)) return `<img class="cm-av" src="${esc(url)}" alt="" loading="lazy" decoding="async">`;
  const [a1, a2] = AV_COLORS[seedOf(who) % AV_COLORS.length];
  return `<span class="cm-av" style="--a1:${a1};--a2:${a2}" aria-hidden="true">${esc(String(who).charAt(0).toUpperCase())}</span>`;
}
const colMax = () => Math.max(1, CONFIG.collectionLimit || 6);   // how many photos can be added
// pages that already had more photos (older limit) keep showing them
function collectionList() { return Custom.demo ? CONFIG.collection.slice(0, colMax()) : pageData().collection.slice(0, Math.max(colMax(), 12)); }
function collectionView() {
  const M = Custom.media || {};
  return collectionList().map(it => ({ ...it, img: M["col_" + it.id] || it.img || "", icon: M["col_" + it.id + "_icon"] || it.icon || "", logo: M["col_" + it.id + "_logo"] || it.logo || "" }))
    .filter(it => it.type === "uc" || it.img);
}
let vaultKey = "";
function renderVault(why) {
  const items = collectionView(), personal = !Custom.demo;
  const key = JSON.stringify([items, personal, Custom.owner, pinsNow()]);
  if (why === "local" && key === vaultKey) return;   // the owner is typing somewhere else: nothing to redraw here
  vaultKey = key;
  $("#vaultDemo").hidden = !Custom.demo;
  $("#vault").classList.toggle("is-empty", personal && !items.length);
  // edit mode only: a big empty box, or a "+" tile while there's room
  const ownerAdd = !personal ? "" : !items.length
    ? `<button class="own-empty edit-only" type="button" data-open="collection-add"><span class="own-empty-ic" aria-hidden="true">📸</span><b>Show off your stuff</b><span class="own-empty-btn">＋ Add photos</span></button>`
    : items.length < colMax() ? `<button class="card add-card edit-only" type="button" data-open="collection-add" aria-label="Add photos"><span class="ci"><b aria-hidden="true">＋</b><small>Add photos</small></span></button>` : "";
  $("#grid").innerHTML = items.map(it => {
    const media = it.type === "uc"
      ? `<div class="uc">${it.icon ? `<img class="uc-ic" src="${esc(it.icon)}" alt="UC">` : ""}<div class="uc-amt">${esc(it.amount)}</div><div class="uc-unit">${esc(it.unit)}</div>${it.logo ? `<img class="uc-logo" src="${esc(it.logo)}" alt="${esc(it.game)}">` : `<div class="uc-game">${esc(it.game)}</div>`}</div>`
      : `<img ${imgSrc(it.img, "(max-width: 639px) 31vw, 370px")} alt="${esc(it.alt || "")}" loading="lazy" decoding="async">${it.meme ? `<span class="meme">${esc(it.meme)}</span>` : ""}`;
    const label = it.type === "uc" ? `${it.amount} ${it.unit}` : (it.alt || it.id);
    const pt = pinnedText(it);
    const pin = pt ? `<button class="pin-cm" type="button" aria-label="Pinned comment: ${esc(pt)}. Open comments"><p>${esc(pt)}</p></button>` : "";
    const ed = personal ? `<button class="card-ed edit-only" type="button" data-open="item:${esc(it.id)}" aria-label="Change this photo">✎</button>` : "";
    return `<article class="card" data-id="${esc(it.id)}"><div class="ci${it.type === "uc" ? " is-uc" : ""}">${media}${pin}${ed}</div>
      <div class="react" role="group" aria-label="Likes and comments for ${esc(label)}"><button class="rx rx-like" type="button" data-rx="like" aria-pressed="false" aria-label="Like">${HEART}<em>0</em></button><button class="rx rx-cm" type="button" aria-label="Open comments">${BUBBLE}<em>${compact(commentCount(it))}</em></button></div></article>`;
  }).join("") + ownerAdd;
  if (fine && !reduce) $$(".card").forEach(card => {
    const ci = $(".ci", card);
    ci.addEventListener("pointerenter", () => { card.classList.add("tilting"); Snd.fx("hover"); });
    ci.addEventListener("pointermove", e => { const r = ci.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; ci.style.setProperty("--ry", ((px - .5) * 14).toFixed(1) + "deg"); ci.style.setProperty("--rx", ((.5 - py) * 12).toFixed(1) + "deg"); });
    ci.addEventListener("pointerleave", () => { card.classList.remove("tilting"); ci.style.setProperty("--rx", "0deg"); ci.style.setProperty("--ry", "0deg"); });
  });
  paintReactions();
}
function paintReactions() {
  const items = collectionView();
  $$(".card").forEach(card => {
    const it = items.find(x => x.id === card.dataset.id); if (!it) return;
    const b = $(".rx-like", card), on = likedNow(it);
    $("em", b).textContent = compact(likeCount(it));
    b.setAttribute("aria-pressed", String(on)); b.setAttribute("aria-label", on ? "Unlike" : "Like");
    $(".rx-cm em", card).textContent = compact(commentCount(it));
  });
}
function bigHeart(card) { const ci = $(".ci", card), h = document.createElement("div"); h.innerHTML = HEART; const svg = h.firstChild; svg.setAttribute("class", "bigheart"); ci.appendChild(svg); setTimeout(() => svg.remove(), 950); }
async function doLike(card, fromImage) {
  const it = collectionView().find(x => x.id === card.dataset.id); if (!it) return;
  if (!realPage()) {
    if (fromImage && Local.liked(it.id)) return bigHeart(card);
    const on = Local.toggle(it.id); Snd.fx(on ? "pop" : "unpop"); if (on && fromImage) bigHeart(card); paintReactions(); return;
  }
  if (fromImage) bigHeart(card);
  if (!(await needAccount(`Log in to like ${ownerName()}'s collection. It's free.`, () => doLike(card, false)))) return;
  if (fromImage && Live.liked(it.id)) return;
  try { const on = await Live.toggleLike(it.id); Snd.fx(on ? "pop" : "unpop"); }
  catch (e) { toast(friendlyError(e)); }
}
function setupVault() {
  const grid = $("#grid");
  grid.addEventListener("click", e => {
    const card = e.target.closest(".card"); if (!card) return;
    if (e.target.closest(".rx-like")) return doLike(card, false);
    if (e.target.closest(".rx-cm") || e.target.closest(".pin-cm")) { Snd.fx("tick"); Comments.open(card.dataset.id); }
  });
  grid.addEventListener("dblclick", e => { const card = e.target.closest(".card"); if (card && e.target.closest(".ci") && !e.target.closest(".pin-cm")) doLike(card, true); });
}

/* ======================= COMMENTS SHEET ======================= */
// Demo page: the example comments (marked DEMO). Personal pages: real comments people wrote.
const Comments = (() => {
  const el = () => $("#cmSheet"); let lastFocus = null, current = null, menuFor = null, real = [], loadSeq = 0, posting = false;
  const liked = new Set();                                 // example comments you liked (this visit)
  const curItem = () => collectionView().find(x => x.id === current);
  const isOwner = () => document.body.classList.contains("is-owner");
  const meId = () => (Cloud.me ? Cloud.me.id : null);
  const realMode = () => realPage();
  const nameOf = c => (c.author && (c.author.display_name || c.author.username)) || "someone";
  function head(it) {
    $("#cmCount").textContent = compact(commentCount(it));
    const thumb = it.type === "uc" ? `<span class="cm-uc">UC</span>` : `<img src="${esc(optList(it.img) ? optList(it.img)[0][0] : it.img)}" alt="">`;
    $("#cmPost").innerHTML = `${thumb}<p><b>${esc(ownerName())}</b> ${esc(itemTitle(it))}<small>${compact(likeCount(it))} ${plural(likeCount(it), "like")}</small></p>`;
    $("#cmDemo").hidden = !Custom.demo;
  }
  function paintDemo() {
    const it = curItem(); if (!it) return; head(it);
    const pinned = pinsNow()[it.id], list = demoComments(it);
    const sorted = list.slice().sort((x, y) => (y.who === pinned) - (x.who === pinned));   // pinned comment goes first
    $("#cmList").innerHTML = sorted.length ? sorted.map(c => { const isP = c.who === pinned, on = liked.has(it.id + "|" + c.who);
      return `<li class="${isP ? "is-pinned" : ""}" data-key="${esc(c.who)}">${avatarOf(c.who)}<div class="cm-t"><b>${esc(c.who)}</b>${esc(c.text)}<small>${c.ago} · ${compact(c.likes + (on ? 1 : 0))} likes${isP ? `<span class="cm-pinned">📌 Pinned</span>` : ""}</small></div><button class="cm-h" type="button" aria-pressed="${on}" aria-label="Like comment">${HEART}</button><button class="cm-more" type="button" aria-label="Options for comment by ${esc(c.who)}">⋯</button></li>`; }).join("")
      : `<li class="cm-empty">No comments to show.</li>`;
    $("#cmCompose").hidden = true; $("#cmFoot").hidden = false;
  }
  function paintReal(loading) {
    const it = curItem(); if (!it) return; head(it);
    const pinned = String(pinsNow()[it.id] || "");
    const sorted = real.slice().sort((x, y) => (String(y.id) === pinned) - (String(x.id) === pinned));
    $("#cmList").innerHTML = loading ? `<li class="cm-empty">Loading comments…</li>` : sorted.length ? sorted.map(c => {
      const isP = String(c.id) === pinned, u = c.author && c.author.username, nm = nameOf(c);
      return `<li class="${isP ? "is-pinned" : ""}" data-key="c${c.id}">${avatarOf(u || nm, c.author && c.author.avatar_url)}<div class="cm-t">${u ? `<a href="/?u=${esc(u)}"><b>${esc(nm)}</b></a>` : `<b>${esc(nm)}</b>`}${esc(clean(c.body))}<small>${esc(ago(Date.parse(c.created_at)))}${c.user_id === Custom.target.id ? " · ✓ creator" : ""}${isP ? `<span class="cm-pinned">📌 Pinned</span>` : ""}</small></div><button class="cm-more" type="button" aria-label="Options for comment by ${esc(nm)}">⋯</button></li>`;
    }).join("") : `<li class="cm-empty">No comments yet. Be the first 👀</li>`;
    $("#cmFoot").hidden = true; $("#cmCompose").hidden = false;
    const inp = $("#cmInput"), btn = $("#cmSend");
    if (Cloud.me) { inp.disabled = false; inp.placeholder = "Comment as @" + Cloud.me.username + "…"; btn.textContent = "Post"; btn.disabled = posting; }
    else { inp.disabled = true; inp.placeholder = "Log in to comment"; btn.textContent = "Log in"; btn.disabled = false; }
  }
  const paint = () => (realMode() ? paintReal(false) : paintDemo());
  async function loadReal() {
    const seq = ++loadSeq; real = []; paintReal(true);
    try { const rows = await Live.listComments(current); if (seq !== loadSeq) return; real = rows; paintReal(false); }
    catch (e) { if (seq === loadSeq) { $("#cmList").innerHTML = `<li class="cm-empty">${esc(friendlyError(e))}</li>`; } }
  }
  function open(id) {
    if (!collectionView().find(x => x.id === id)) return;
    current = id; lastFocus = document.activeElement; closeMenu(); $("#cmNote").textContent = "";
    el().hidden = false; document.documentElement.style.overflow = "hidden";
    if (realMode()) loadReal(); else if (!Custom.demo) { head(curItem()); $("#cmList").innerHTML = `<li class="cm-empty">Comments are coming soon on this page.</li>`; $("#cmCompose").hidden = true; $("#cmFoot").hidden = false; }
    else paintDemo();
    setTimeout(() => $("#cmClose").focus(), 50);
  }
  function close() { closeMenu(); el().hidden = true; document.documentElement.style.overflow = ""; current = null; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  // ---- owner choices (pins, removed example comments): saved with the page ----
  async function saveCm(patch, okMsg) {
    const next = { ...cmSettings(), ...patch };
    cmOverride = next; paint(); renderVault();
    const r = await Custom.save({ ...(Custom.settings || {}), pins: next.pins || {}, cmHidden: next.cmHidden || {} }, {});
    if (r === "error" || r === "full") { cmOverride = null; paint(); renderVault(); toast("Couldn't save that. Try again."); return; }
    if (realMode()) Live.loadPinned();
    if (okMsg) toast(okMsg);
  }
  function togglePin(key) {
    const pins = { ...pinsNow() }, val = key.startsWith("c") && realMode() ? Number(key.slice(1)) : key, was = String(pins[current]) === String(val);
    if (was) delete pins[current]; else pins[current] = val;
    Snd.fx(was ? "unpop" : "pop"); saveCm({ pins }, was ? "Comment unpinned" : "Pinned on the photo 📌");
  }
  function removeDemo(who) {
    const all = { ...(cmSettings().cmHidden || {}) }, list = (all[current] || []).filter(w => w !== who).concat(who); all[current] = list;
    const pins = { ...pinsNow() }; if (pins[current] === who) delete pins[current];
    Snd.fx("unpop"); saveCm({ cmHidden: all, pins }, "Comment removed");
  }
  async function deleteReal(c) {
    try {
      await Live.deleteComment(c.id, current); real = real.filter(x => x.id !== c.id); Snd.fx("unpop"); paintReal(false); paintReactions();
      if (String(pinsNow()[current]) === String(c.id)) { const pins = { ...pinsNow() }; delete pins[current]; saveCm({ pins }); } else renderVault();
      toast("Comment deleted");
    } catch (e) { toast(friendlyError(e)); }
  }
  function toggleLike(who) { const k = current + "|" + who, on = !liked.has(k); on ? liked.add(k) : liked.delete(k); Snd.fx(on ? "pop" : "unpop"); paint(); }
  function copyText(text) {
    const done = ok => toast(ok ? "Comment copied" : "Couldn't copy on this device");
    try { navigator.clipboard.writeText(text).then(() => done(true), () => done(false)); } catch (e) { done(false); }
  }
  const find = key => { const it = curItem(); if (!it) return null; if (key.startsWith("c") && realMode()) { const c = real.find(x => "c" + x.id === key); return c && { who: nameOf(c), text: clean(c.body), real: c }; } const c = demoComments(it).find(x => x.who === key); return c && { who: c.who, text: c.text }; };
  // ---- the hold / ⋯ menu ----
  function openMenu(key) {
    const c = find(key); if (!c) return;
    menuFor = key; const owner = isOwner(), pinned = realMode() ? String(pinsNow()[current]) === key.slice(1) : pinsNow()[current] === key;
    const mine = c.real && meId() && c.real.user_id === meId(), on = liked.has(current + "|" + key);
    const act = (k, ic, label, extra = "", cls = "") => `<button class="cm-act ${cls}" type="button" data-do="${k}"><i aria-hidden="true">${ic}</i>${label}${extra}</button>`;
    $("#cmMenuIn").innerHTML = `<div class="cm-menu-who">${avatarOf(c.real ? (c.real.author && c.real.author.username) || c.who : c.who, c.real && c.real.author && c.real.author.avatar_url)}<p><b>${esc(c.who)}</b>${esc(c.text)}</p></div>` +
      (owner ? act("pin", "📌", pinned ? "Unpin from photo" : "Pin to photo", pinned ? "" : `<small>shows on the photo</small>`) : "") +
      act("reply", "↩", "Reply in guestbook") +
      (c.real ? (c.real.author && c.real.author.username ? act("view", "👤", "View their page") : "") : act("like", on ? "💔" : "❤️", on ? "Unlike" : "Like")) +
      act("copy", "📋", "Copy text") +
      (c.real ? (owner || mine ? act("remove", "🗑", "Delete comment", "", "danger") : "") : (owner ? act("remove", "🗑", "Remove comment", `<small>you can restore it</small>`, "danger") : "")) +
      `<button class="cm-act cancel" type="button" data-do="cancel">Cancel</button>`;
    $("#cmMenu").hidden = false; Snd.fx("tick"); if (navigator.vibrate) try { navigator.vibrate(12); } catch (e) {}
    setTimeout(() => { const f = $("#cmMenuIn .cm-act"); if (f) f.focus(); }, 30);
  }
  function closeMenu() { const m = $("#cmMenu"); if (m) m.hidden = true; menuFor = null; }
  function doAction(k) {
    const key = menuFor, c = key && find(key); closeMenu(); if (!c) return;
    if (k === "pin") togglePin(key);
    else if (k === "remove") c.real ? deleteReal(c.real) : removeDemo(key);
    else if (k === "like") toggleLike(key);
    else if (k === "copy") copyText(`${c.who}: ${c.text}`);
    else if (k === "view") { if (c.real.author && c.real.author.username) location.href = "/?u=" + encodeURIComponent(c.real.author.username); }
    else if (k === "reply") { const id = current; close(); Guestbook.replyToItem(id, c.real ? (c.real.author && c.real.author.username) || c.who : c.who); }
  }
  async function post(e) {
    e.preventDefault();
    if (!realMode() || posting) return;
    if (!(await needAccount("Log in to comment. It's free.", () => { if (current) paintReal(false); }))) return;
    const inp = $("#cmInput"), text = inp.value.trim(); if (!text) { inp.focus(); return; }
    if (text.length > 300) { $("#cmNote").textContent = "That comment is too long (300 letters max)."; return; }
    posting = true; $("#cmSend").disabled = true; $("#cmNote").textContent = "";
    try {
      const row = await Live.addComment(current, clean(text).slice(0, 300));
      real.unshift(row); inp.value = ""; Snd.fx("pop"); paintReal(false); paintReactions(); $("#cmList").scrollTop = 0;
    } catch (err) { $("#cmNote").textContent = friendlyError(err); }
    finally { posting = false; $("#cmSend").disabled = false; }
  }
  function init() {
    $("#cmClose").addEventListener("click", close);
    el().addEventListener("click", e => { if (e.target === el()) close(); });
    addEventListener("keydown", e => { if (e.key !== "Escape" || el().hidden) return; if (!$("#cmMenu").hidden) closeMenu(); else close(); });
    $("#cmMenu").addEventListener("click", e => { if (e.target.id === "cmMenu") return closeMenu(); const b = e.target.closest("[data-do]"); if (!b) return; b.dataset.do === "cancel" ? closeMenu() : doAction(b.dataset.do); });
    $("#cmCompose").addEventListener("submit", post);
    $("#cmSend").addEventListener("click", e => { if (!Cloud.me) { e.preventDefault(); needAccount("Log in to comment. It's free.", () => { if (current) paintReal(false); }); } });
    const list = $("#cmList"); let timer = 0, sx = 0, sy = 0, held = null, fired = false;
    const cancelHold = () => { clearTimeout(timer); if (held) held.classList.remove("pressing"); held = null; };
    list.addEventListener("pointerdown", e => {
      const li = e.target.closest("li[data-key]"); if (!li || e.target.closest("button,a")) return;
      fired = false; sx = e.clientX; sy = e.clientY; held = li; li.classList.add("pressing");
      timer = setTimeout(() => { fired = true; const k = li.dataset.key; cancelHold(); openMenu(k); }, 450);
    });
    list.addEventListener("pointermove", e => { if (held && Math.hypot(e.clientX - sx, e.clientY - sy) > 8) cancelHold(); });
    ["pointerup", "pointercancel", "pointerleave"].forEach(ev => list.addEventListener(ev, cancelHold));
    list.addEventListener("contextmenu", e => { const li = e.target.closest("li[data-key]"); if (!li) return; e.preventDefault(); cancelHold(); if (!fired) openMenu(li.dataset.key); });
    list.addEventListener("click", e => {
      const li = e.target.closest("li[data-key]"); if (!li) return;
      if (e.target.closest(".cm-more")) return openMenu(li.dataset.key);
      if (e.target.closest(".cm-h")) return toggleLike(li.dataset.key);
    });
    $("#cmGb").addEventListener("click", () => { const id = current; close(); Guestbook.replyToItem(id); });
    // once the saved settings catch up with a change, stop using the temporary copy
    Custom.on(() => { if (!cmOverride) return; const S = Custom.settings || {}; if (JSON.stringify(S.pins || {}) === JSON.stringify(cmOverride.pins || {}) && JSON.stringify(S.cmHidden || {}) === JSON.stringify(cmOverride.cmHidden || {})) cmOverride = null; });
    Cloud.on(() => { if (current && !el().hidden && realMode()) paintReal(false); });
  }
  return { open, close, init, get current() { return current; } };
})();

/* ======================= GUESTBOOK =======================
   Demo page: messages stay on the visitor's own phone. Personal pages: real messages everyone can see
   (you need a free account to sign, so nobody can pretend to be someone else). */
const BAD_LONG = ["fuck", "shit", "bitch", "bastard", "cunt", "slut", "whore", "nigg", "faggot", "retard", "madarchod", "bhenchod", "behenchod", "chutiya", "chutiye", "gandu", "bhosdi", "randi", "harami", "lavde", "lauda", "loda", "kamina", "dick", "pussy", "asshole"];
const BAD_SHORT = ["mc", "bc", "bsdk", "lund", "fck", "fuk", "wtf"];
const BAD_RES = BAD_LONG.map(w => new RegExp(w.split("").join("[^a-z]?"), "gi")).concat(BAD_SHORT.map(w => new RegExp("\\b" + w + "\\b", "gi")));
function clean(s) {
  let out = String(s).replace(/https?:\/\/\S+|www\.\S+/gi, "[link removed]");
  BAD_RES.forEach((re, i) => { out = out.replace(re, m => (i < BAD_LONG.length ? "★".repeat(Math.min(m.length, 5)) : "★★★")); });
  return out;
}
function ago(ts) { const s = Math.max(1, Math.floor((Date.now() - ts) / 1000)); if (s < 60) return "just now"; const m = Math.floor(s / 60); if (m < 60) return m + "m ago"; const h = Math.floor(m / 60); if (h < 24) return h + "h ago"; const d = Math.floor(h / 24); return d < 30 ? d + "d ago" : new Date(ts).toLocaleDateString(); }
let seenGb = null, lastGb = [];
function renderGuestbook(list) {
  lastGb = list; const wall = $("#wall");
  if (!list.length) { wall.innerHTML = `<div class="empty"><b>No messages yet</b>Be the first to sign the guestbook.</div>`; seenGb = new Set(); return; }
  const key = m => m.id || m.at, fresh = seenGb ? list.filter(m => !seenGb.has(key(m))) : [];
  const ids = new Set(list.map(key));
  const roots = list.filter(m => !m.to || !ids.has(m.to));                       // newest first
  const kids = {}; list.filter(m => m.to && ids.has(m.to)).forEach(m => (kids[m.to] = kids[m.to] || []).push(m));
  const meId = Cloud.me ? Cloud.me.id : null, owner = document.body.classList.contains("is-owner");
  const bubble = (m, rootId, isReply) => {
    const b = document.createElement("div"); b.className = "bubble" + (isReply ? " reply" : "") + (fresh.includes(m) ? " new" : "");
    const who = clean(String(m.name || "Someone")).slice(0, 24);
    if (isReply || m.toName) { const r = document.createElement("span"); r.className = "rto"; r.append("↪ replied to "); const t = document.createElement("b"); t.textContent = clean(String(m.toName || "someone")).slice(0, 24); r.append(t); b.append(r); }
    if (m.item) {
      const it = collectionView().find(x => x.id === m.item), q = document.createElement("button");
      q.type = "button"; q.className = "gb-quote"; q.setAttribute("aria-label", "See the photo this replies to");
      q.innerHTML = `${Guestbook.thumbHtml(it)}<span><small>↪ replied to ${esc(ownerName())}'s photo</small><em>${esc(it ? itemTitle(it) : clean(String(m.itemTitle || "a photo that's no longer here")).slice(0, 60))}</em></span>`;
      q.addEventListener("click", () => Guestbook.showItem(m.item));
      b.append(q);
    }
    const n = document.createElement(m.user ? "a" : "b");
    if (m.user) { n.className = "who"; n.href = "/?u=" + encodeURIComponent(m.user); const bb = document.createElement("b"); bb.textContent = who; n.append(bb); } else n.textContent = who;
    b.append(n);
    if (m.owner) { const c = document.createElement("span"); c.className = "creator"; c.textContent = "✓ CREATOR"; b.append(c); }
    const p = document.createElement("p"); p.textContent = clean(String(m.msg || "")).slice(0, 140);
    const act = document.createElement("div"); act.className = "gb-act";
    const t = document.createElement("time"); t.textContent = ago(m.at || Date.now());
    const rb = document.createElement("button"); rb.type = "button"; rb.className = "gb-reply"; rb.textContent = "↩ REPLY"; rb.setAttribute("aria-label", "Reply to " + who);
    rb.addEventListener("click", () => Guestbook.replyTo(rootId, who));
    act.append(t, rb);
    if (m.real ? (owner || (meId && m.by === meId)) : true) {
      const db = document.createElement("button"); db.type = "button"; db.className = "gb-del" + (m.real ? "" : " owner-only"); db.textContent = "🗑 DELETE"; db.setAttribute("aria-label", "Delete message from " + who);
      db.addEventListener("click", () => Guestbook.remove(m, db, isReply)); act.append(db);
    }
    b.append(p, act);
    return b;
  };
  wall.innerHTML = "";
  roots.forEach((m, i) => {
    const th = document.createElement("div"); th.className = "thread" + (i % 2 ? " r" : "");
    const rootId = key(m); th.append(bubble(m, rootId, false));
    const rs = (kids[rootId] || []).slice().sort((a, b) => a.at - b.at);       // oldest reply first, like a chat
    if (rs.length) { const box = document.createElement("div"); box.className = "replies"; rs.forEach(r => box.append(bubble(r, rootId, true))); th.append(box); }
    wall.appendChild(th);
  });
  if (seenGb && fresh.length) Snd.fx("chime");
  seenGb = new Set(list.map(key));
}
const Guestbook = (() => {
  let target = null, localGb = LS.get(pageKey("gb"), []) || [], seq = 0;
  const realMode = () => realPage();
  // database rows -> the shape the wall draws
  function fromRows(rows) {
    const byId = {}; rows.forEach(r => { byId[r.id] = r; });
    const nm = r => (r && r.author && (r.author.display_name || r.author.username)) || "someone";
    return rows.map(r => ({ id: r.id, real: true, by: r.user_id, name: nm(r), user: r.author && r.author.username, msg: r.body, at: Date.parse(r.created_at) || Date.now(),
      to: r.reply_to || null, toName: r.reply_to ? nm(byId[r.reply_to]) : "", item: r.item_id || null, itemTitle: r.item_title || "", owner: !!(Custom.target && r.user_id === Custom.target.id) }));
  }
  async function refresh() {
    paintForm();
    if (!realMode()) { renderGuestbook(localGb.slice()); return; }
    const s = ++seq;
    if (!lastGb.length || !lastGb[0].real) $("#wall").innerHTML = `<div class="empty"><b>Loading…</b>Getting the messages.</div>`;
    try { const rows = await Live.listGuestbook(); if (s === seq) renderGuestbook(fromRows(rows)); }
    catch (e) { if (s === seq) $("#wall").innerHTML = `<div class="empty"><b>Couldn't load messages</b>${esc(friendlyError(e))}</div>`; }
  }
  function paintForm() {
    const real = realMode(), me = Cloud.me, as = $("#gbAs");
    $("#gbName").hidden = $("#gbNameLbl").hidden = real;
    as.hidden = !(real && me);
    if (real && me) as.innerHTML = `${avatarOf(me.username, me.avatar_url)}<span>Signing as <b>${esc(me.display_name || me.username)}</b> (@${esc(me.username)})</span>`;
    if (!target) $("#gbSend").textContent = real && !me ? "Log in to sign ✍️" : "Sign guestbook ✍️";
  }
  function thumbHtml(it) { return !it ? `<span class="q-gone" aria-hidden="true">📷</span>` : it.type === "uc" ? `<span class="q-uc" aria-hidden="true">UC</span>` : `<img src="${esc(optList(it.img) ? optList(it.img)[0][0] : it.img)}" alt="">`; }
  function focusForm() {
    $("#gbForm").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    setTimeout(() => $((!$("#gbName").hidden && !$("#gbName").value.trim() ? "#gbName" : "#gbMsg")).focus({ preventScroll: true }), reduce ? 0 : 450);
  }
  function replyToItem(id, mention) {
    const it = collectionView().find(x => x.id === id); if (!it) return;
    target = { item: id, title: itemTitle(it) }; Snd.fx("tick");
    const th = $("#gbReplyThumb"); th.innerHTML = thumbHtml(it); th.hidden = false; th.style.display = "contents";
    $("#gbReplyName").textContent = ownerName() + "'s photo"; $("#gbReplying").hidden = false;
    $("#gbSend").textContent = "Send reply ↩";
    if (mention) { const m = $("#gbMsg"); m.value = "@" + mention + " "; $("#gbCount").textContent = m.value.length + "/140"; }
    focusForm();
  }
  function showItem(id) {
    const card = $(`.card[data-id="${CSS.escape(id)}"]`); if (!card) { toast("That photo isn't in the collection anymore"); return; }
    Snd.fx("tick"); card.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    card.classList.remove("flash"); void card.offsetWidth; card.classList.add("flash");
  }
  function replyTo(id, name) {
    target = { id, name }; Snd.fx("tick"); $("#gbReplyThumb").hidden = true; $("#gbReplyThumb").style.display = "";
    $("#gbReplyName").textContent = name; $("#gbReplying").hidden = false;
    $("#gbSend").textContent = "Send reply ↩";
    focusForm();
  }
  function cancel() { target = null; $("#gbReplying").hidden = true; $("#gbReplyThumb").hidden = true; $("#gbReplyThumb").style.display = ""; paintForm(); }
  // delete a message (tap once, then tap "Sure?" to confirm). Deleting a message also removes its replies.
  function remove(m, btn, isReply) {
    if (btn.dataset.armed !== "1") {
      btn.dataset.armed = "1"; btn.classList.add("armed"); btn.textContent = "SURE? TAP AGAIN"; Snd.fx("tick");
      clearTimeout(btn._t); btn._t = setTimeout(() => { btn.dataset.armed = ""; btn.classList.remove("armed"); btn.textContent = "🗑 DELETE"; }, 3000);
      return;
    }
    const id = m.id || m.at, ids = [id];
    if (!isReply) lastGb.filter(x => x.to === id).forEach(x => ids.push(x.id || x.at));
    const bub = btn.closest(".bubble"); if (bub) bub.classList.add("gone");
    Snd.fx("unpop");
    setTimeout(async () => {
      if (m.real) {
        try { await Live.unsign(m.id); toast(ids.length > 1 ? `Message deleted, with ${ids.length - 1} repl${ids.length > 2 ? "ies" : "y"}` : "Message deleted"); }
        catch (e) { toast(friendlyError(e)); }
        return refresh();
      }
      const gone = new Set(ids); localGb = localGb.filter(x => !gone.has(x.id)); LS.set(pageKey("gb"), localGb);
      renderGuestbook(localGb.slice());
      toast(ids.length > 1 ? `Message deleted, with ${ids.length - 1} repl${ids.length > 2 ? "ies" : "y"}` : "Message deleted");
    }, 260);
  }
  async function submit(e) {
    e.preventDefault();
    const msg = $("#gbMsg"), text = msg.value.trim(), real = realMode();
    const name = real ? "" : $("#gbName").value.trim();
    if (real) { if (!(await needAccount(`Log in to sign ${ownerName()}'s guestbook. It's free.`, () => { paintForm(); $("#gbMsg").focus(); }))) return; }
    if ((!real && !name) || !text) { $("#gbNote").textContent = real ? "Write a message first." : "Add your name and a message first."; return; }
    const last = LS.get("gbLast", 0); if (Date.now() - last < 15000) { $("#gbNote").textContent = "Slow down. You can post again in a few seconds."; return; }
    $("#gbSend").disabled = true;
    const tgt = target;
    try {
      if (real) {
        const extra = {};
        if (tgt && tgt.item) { extra.item_id = tgt.item; extra.item_title = String(tgt.title || "").slice(0, 80); }
        else if (tgt && typeof tgt.id === "number") extra.reply_to = tgt.id;
        await Live.sign(clean(text).slice(0, 140), extra);
        $("#gbNote").textContent = (tgt ? "Reply sent! " : "Signed! ") + "Everyone can see it now.";
      } else {
        const entry = { id: "local-" + Date.now(), name: clean(name).slice(0, 24), msg: clean(text).slice(0, 140), at: Date.now() };
        if (tgt && tgt.item) { entry.item = tgt.item; entry.itemTitle = tgt.title; } else if (tgt) { entry.to = tgt.id; entry.toName = tgt.name; }
        if (document.body.classList.contains("is-owner")) entry.owner = true;
        localGb = [entry, ...localGb].slice(0, 80); LS.set(pageKey("gb"), localGb);
        $("#gbNote").textContent = (tgt ? "Reply sent to " + (tgt.item ? ownerName() + "'s photo" : tgt.name) + "! " : "Signed! ") + "Saved on this device.";
      }
      LS.set("gbLast", Date.now()); msg.value = ""; $("#gbCount").textContent = "0/140"; Snd.fx("chime");
      cancel(); refresh();
    } catch (err) { $("#gbNote").textContent = friendlyError(err); }
    finally { $("#gbSend").disabled = false; }
  }
  return { refresh, paintForm, replyTo, replyToItem, showItem, thumbHtml, cancel, remove, submit, get target() { return target; } };
})();
function setupGuestbook() {
  const msg = $("#gbMsg");
  msg.addEventListener("input", () => $("#gbCount").textContent = msg.value.length + "/140");
  $("#gbReplyX").addEventListener("click", () => { Guestbook.cancel(); Snd.fx("unpop"); msg.focus(); });
  $("#gbForm").addEventListener("submit", Guestbook.submit);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && realPage()) Guestbook.refresh(); });
}

/* ======================= SHARE ======================= */
function siteLink() { return CONFIG.siteUrl || location.href.split("#")[0]; }
const QR = (() => {
  let lib = null, wanted = false, drawnFor = "";
  function svg(url) {
    const q = lib.QrCode.encodeText(url, lib.QrCode.Ecc.MEDIUM), n = q.size, b = 2; let d = "";
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.getModule(x, y)) d += `M${x} ${y}h1v1h-1z`;
    return `<svg viewBox="${-b} ${-b} ${n + b * 2} ${n + b * 2}" shape-rendering="crispEdges" aria-hidden="true"><rect x="${-b}" y="${-b}" width="${n + b * 2}" height="${n + b * 2}" fill="#fff"/><path d="${d}" fill="#0b0420"/></svg>`;
  }
  async function load() { if (!lib) { await loadScript("assets/vendor/qrcodegen.js?v=1.8.0"); lib = window.qrcodegen; } return lib; }
  async function draw() {
    const url = siteLink(), box = $("#qr"); if (drawnFor === url && box.firstChild) return;
    try { await load(); box.innerHTML = svg(url); drawnFor = url; box.setAttribute("aria-label", "QR code for " + url.replace(/^https?:\/\//, "")); }
    catch (e) { box.textContent = "QR unavailable offline"; }
  }
  function want() { wanted = true; draw(); }
  // only make the QR when the share box is close to being on screen
  function watch() {
    if (!("IntersectionObserver" in window)) return want();
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); want(); } }, { rootMargin: "600px 0px" });
    io.observe($("#share"));
  }
  async function png() {
    await load();
    const url = siteLink(), q = lib.QrCode.encodeText(url, lib.QrCode.Ecc.MEDIUM), n = q.size, quiet = 4, s = Math.floor(900 / (n + quiet * 2));
    const W = s * (n + quiet * 2), H = W + 120, c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, W, H); g.fillStyle = "#0b0420";
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.getModule(x, y)) g.fillRect((x + quiet) * s, (y + quiet) * s, s, s);
    g.font = "800 44px Inter, system-ui, sans-serif"; g.textAlign = "center"; g.fillText(url.replace(/^https?:\/\//, ""), W / 2, W + 62);
    return new Promise(res => c.toBlob(res, "image/png"));
  }
  return { watch, refresh() { if (wanted) draw(); }, png, get ready() { return !!drawnFor; } };
})();
// "How it looks in chats": the preview people really get when the link is sent.
// The main page reads its own preview tags. On a personal page the owner's editor fills it in (visitors don't see this box).
const metaOf = p => { const m = document.querySelector(`meta[property="${p}"],meta[name="${p}"]`); return m ? m.getAttribute("content") || "" : ""; };
const hostOf = u => { try { return new URL(u).hostname; } catch (e) { return "flexippo.com"; } };
function chatPreview(v, root) {
  const box = root || $("#previewBox"); if (!box) return;
  $$(".og-i", box).forEach(i => { i.hidden = !v.img; if (v.img && i.getAttribute("src") !== v.img) i.src = v.img; });
  $$(".og-t", box).forEach(e => { e.textContent = v.t || ""; });
  $$(".og-s", box).forEach(e => { e.textContent = v.d || ""; e.hidden = !v.d; });
  $$(".og-d", box).forEach(e => { e.textContent = v.host || "flexippo.com"; });
  $$(".og-u", box).forEach(e => { e.textContent = v.url || ""; });
}
function renderShare() {
  const url = siteLink(); $("#linkInput").value = url;
  if (Custom.demo) {
    const site = BASE.siteUrl.replace(/\/+$/, "") + "/";
    chatPreview({ img: metaOf("og:image").replace(site, ""), t: metaOf("og:title"), d: metaOf("og:description"), host: hostOf(url), url: url.replace(/^https?:\/\//, "").replace(/\/$/, "") });
  }
  QR.refresh();
}
function copyText(t) {
  const legacy = () => { try { const x = document.createElement("textarea"); x.value = t; x.setAttribute("readonly", ""); x.style.cssText = "position:fixed;opacity:0;top:0;left:0"; document.body.appendChild(x); x.select(); const ok = document.execCommand("copy"); x.remove(); return ok; } catch (e) { return false; } };
  try { if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(t).then(() => true, legacy); } catch (e) {}
  return Promise.resolve(legacy());
}
async function shareLink(url, text) {
  url = url || siteLink();
  if (navigator.share) {
    try { await navigator.share({ title: document.title, text: text || "Check this out 👀", url }); return true; }
    catch (e) { if (e && e.name === "AbortError") return false; }
  }
  const ok = await copyText(url); toast(ok ? "Link copied: " + url.replace(/^https?:\/\//, "") : "Your link: " + url); return ok;
}
function setupShare() {
  renderShare(); QR.watch();
  $("#copyBtn").addEventListener("click", () => {
    Snd.fx("tick");
    copyText(siteLink()).then(ok => {
      if (ok) { $("#copyBtn").textContent = "Copied!"; toast("Link copied"); setTimeout(() => $("#copyBtn").textContent = "Copy", 1600); }
      else { const i = $("#linkInput"); i.focus(); i.select(); toast("Link selected, press copy"); }
    });
  });
  $("#shareBtn").addEventListener("click", () => { Snd.fx("tick"); shareLink(siteLink(), Custom.target && !Custom.isHome ? "Check out " + ownerName() + "'s page 👀" : "Check out this page 👀"); });
  $("#qrSave").addEventListener("click", async () => {
    Snd.fx("tick");
    try {
      const blob = await QR.png(); if (!blob) throw new Error("png");
      const name = "flexippo-" + (PAGE_U || "qr") + ".png";
      let file = null; try { file = new File([blob], name, { type: "image/png" }); } catch (e) {}
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: "My flexippo QR code" }); return; } catch (e) { if (e && e.name === "AbortError") return; } }
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast("QR code saved");
    } catch (e) { toast("Couldn't make the QR picture here"); }
  });
}

/* ======================= GET YOUR OWN WEBSITE (Flexippo) ======================= */
const GetSite = (() => {
  const W = CONFIG.flexippo || {}; let vibe = "", lastFocus = null;
  const el = () => $("#getSite");
  function message() {
    const name = $("#gsName").value.trim();
    const lines = ["Hey Flexippo! I want my own website 🔥"];
    if (vibe) lines.push("Vibe: " + vibe.replace(/^\S+\s/, ""));
    if (name) lines.push("Name on site: " + name);
    lines.push("Saw it on: " + ownerName() + "'s site");
    return lines.join("\n");
  }
  function update() {
    const m = message(); $("#gsMsg").textContent = m;
    const igUser = String(W.instagram || "").replace(/^@/, "").trim();
    $("#gsIgBtn").href = igUser ? "https://ig.me/m/" + encodeURIComponent(igUser) : "https://www.instagram.com/";
    const wa = String(W.whatsapp || "").replace(/\D/g, "");
    $("#gsWaBtn").hidden = !wa; if (wa) $("#gsWaBtn").href = "https://wa.me/" + wa + "?text=" + encodeURIComponent(m);
  }
  function open() {
    lastFocus = document.activeElement; Snd.fx("whoosh");
    el().hidden = false; document.documentElement.style.overflow = "hidden"; update();
    setTimeout(() => { const b = $("#gsVibes button"); if (b) b.focus(); }, 60);
  }
  function close() { el().hidden = true; document.documentElement.style.overflow = ""; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function init() {
    $("#gsVibes").innerHTML = (W.vibes || []).map(v => `<button type="button" aria-pressed="false">${esc(v)}</button>`).join("");
    $("#gsVibes").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return; Snd.fx("tick");
      const on = b.getAttribute("aria-pressed") !== "true";
      $$("#gsVibes button").forEach(x => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", String(on)); vibe = on ? b.textContent : ""; update();
    });
    $("#gsName").addEventListener("input", update);
    $("#goBtn").addEventListener("click", open);
    $("#gsClose").addEventListener("click", close);
    el().addEventListener("click", e => { if (e.target === el()) close(); });
    addEventListener("keydown", e => { if (e.key === "Escape" && !el().hidden) close(); });
    const sent = how => { const n = $("#gsNote"); n.classList.add("ok"); n.textContent = how; };
    $("#gsIgBtn").addEventListener("click", () => {
      update(); Snd.fx("tick");
      copyText(message()).then(ok => { sent(ok ? "Message copied ✓ Paste it in the Instagram chat and send." : "Copy the message above, then paste it in the Instagram chat."); if (ok) toast("Message copied, paste it in the chat"); });
    });
    let copyT;
    $("#gsCopy").addEventListener("click", () => {
      update(); Snd.fx("tick"); const b = $("#gsCopy");
      copyText(message()).then(ok => {
        clearTimeout(copyT);
        if (ok) { b.classList.add("done"); $("#gsCopyT").textContent = "Copied ✓"; toast("Message copied"); }
        else { const r = document.createRange(); r.selectNodeContents($("#gsMsg")); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); $("#gsCopyT").textContent = "Press copy"; }
        copyT = setTimeout(() => { b.classList.remove("done"); $("#gsCopyT").textContent = "Copy"; }, 1800);
      });
    });
    $("#gsWaBtn").addEventListener("click", () => { update(); Snd.fx("tick"); sent("Opening WhatsApp with your message ✓"); });
    update();
  }
  return { init, open, close };
})();

/* ======================= START ======================= */
function paintViews() {
  const box = $("#pageViews"), n = realPage() ? Live.views : 0;
  box.hidden = !(n > 0);
  if (n > 0) { $("#viewsN").textContent = n.toLocaleString("en-IN"); $("#viewsW").textContent = plural(n, "view"); box.setAttribute("aria-label", n.toLocaleString("en-IN") + " page " + plural(n, "view")); }
}
let liveFor = null;
function onPage() {
  const T = Custom.target;
  if (T && !Custom.isHome && liveFor !== T.id) { liveFor = T.id; Live.load(T); }
}
function boot() {
  // 1) the part you see first: name, theme, music button (quick)
  applySkin(LS.get("skin", CONFIG.defaultSkin), false, true);
  renderName(); tickCountdown(); Snd.syncUI();
  $("#pTitle").textContent = CONFIG.song.title; $("#pArtist").textContent = CONFIG.song.artist;
  $$(".skin").forEach(b => b.addEventListener("click", () => {
    if (Custom.owner && !Custom.demo) { OwnerTools.load().then(E => E.setSkin(b.dataset.skin), () => toast("Couldn't save the theme. Check your internet.")); return; }   // the owner: changes their page for everyone
    skinTouched = true; applySkin(b.dataset.skin, true);
  }));
  $("#sfxSwitch").addEventListener("click", () => { Snd.setSfx(!Snd.sfxOn); Snd.fx("tick"); toast(Snd.sfxOn ? "Sound effects on" : "Sound effects off"); });
  $("#pSfx").addEventListener("click", () => { Snd.setSfx(!Snd.sfxOn); Snd.fx("tick"); toast(Snd.sfxOn ? "Sound effects on" : "Sound effects off"); });
  $("#pPlay").addEventListener("click", () => { Snd.fx("tick"); Snd.toggle(); });
  $("#pDisc").addEventListener("click", () => { Snd.fx("tick"); Snd.toggle(); });
  $("#name").addEventListener("click", onSecretTap);
  $("#brand").addEventListener("click", e => { e.preventDefault(); Snd.fx("tick"); $("#get-yours").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); });
  startTyping();
  // 2) everything further down the page, right after the first paint (so the phone shows the top straight away)
  setTimeout(boot2, 0);
}
function boot2() {
  setupSocialClicks(); setupVault(); setupGuestbook(); setupShare();
  Stories.init(); Comments.init(); GetSite.init();
  Custom.on(applyBasics); Custom.on(renderSocials); Custom.on(renderVault); Custom.on(onPage);
  // while the owner is editing ("local"), only redraw: don't fetch the guestbook and pins again on every change
  Custom.on(why => { if (why === "local") Guestbook.paintForm(); else Guestbook.refresh(); });
  Custom.on(why => { if (why !== "local" && realPage()) Live.loadPinned(); });
  // the owner of this page: get the editor ready in the background (visitors never download it)
  Custom.on(why => { if (why !== "local" && Custom.owner) idle(() => OwnerTools.load().then(E => E.attach(), () => {})); });
  Live.on(why => {
    if (why === "state" || why === "pinned") renderVault(); else paintReactions();
    if (why === "state") Guestbook.refresh();
    paintViews();
  });
  Cloud.on(() => { if (Live.live) Live.loadMine(); Guestbook.paintForm(); if (realPage() && lastGb.length) renderGuestbook(lastGb); });
  OnceFx.prep();
  Custom.init();
  // go-to-top button: shows after you scroll down, ring fills with how far you've scrolled
  { const btn = $("#toTop"); let t = 0;
    const upd = () => { t = 0; const max = Math.max(1, document.documentElement.scrollHeight - innerHeight); btn.style.setProperty("--sp", Math.min(1, scrollY / max).toFixed(3)); btn.classList.toggle("show", scrollY > innerHeight * 0.8); };
    const kick = () => { if (!t) t = requestAnimationFrame(upd); };
    addEventListener("scroll", kick, { passive: true }); addEventListener("resize", kick); kick();
    btn.addEventListener("click", () => { Snd.fx("whoosh"); scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); setTimeout(() => { const b = $("#brand"); if (b) b.focus({ preventScroll: true }); }, reduce ? 0 : 700); }); }
  if (fine) document.addEventListener("pointerover", e => { const b = e.target.closest && e.target.closest("button, .btn, .post"); if (b && !b.contains(e.relatedTarget)) Snd.fx("hover"); });
  // computers only: the top photo follows the mouse a little and sinks as you scroll (phones skip this to stay smooth)
  if (fine && !LITE && !reduce) {
    const cw = $("#coverWrap"); let sy = 0, tx = 0, ty = 0, cx = 0, cy = 0, praf = 0;
    const pmove = () => { cx += (tx - cx) * 0.07; cy += (ty - cy) * 0.07; cw.style.transform = `translate3d(${cx.toFixed(2)}px,${(sy * 0.22 + cy).toFixed(2)}px,0)`; praf = (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) ? requestAnimationFrame(pmove) : 0; };
    const pkick = () => { if (!praf) praf = requestAnimationFrame(pmove); };
    addEventListener("scroll", () => { if (scrollY > 1000) return; sy = scrollY; pkick(); }, { passive: true });
    addEventListener("pointermove", e => { if (scrollY > 900 || e.pointerType !== "mouse") return; tx = (e.clientX / innerWidth - 0.5) * -22; ty = (e.clientY / innerHeight - 0.5) * -14; pkick(); }, { passive: true });
  }
  // section reveals
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return; const s = en.target; io.unobserve(s); s.classList.add("in"); Snd.fx("whoosh");
    }), { threshold: 0.18 });
    $$(".sec").forEach(s => io.observe(s));
  } else $$(".sec").forEach(s => s.classList.add("in"));
  OnceFx.arm();
  if (isBirthday()) Snd.fx("chime");
  setTimeout(() => Snd.hint(true), 3500);
}

/* ======================= ACCOUNTS, PERSONAL PAGES & CHAT ======================= */
// Log in / sign up, pick a username (= your page link), the account menu, the buttons under the name,
// and private chat between people. Everything is saved in Supabase (see the database rules there).
const Accounts = (() => {
  const $id = x => document.getElementById(x);
  // links that can't be anyone's page: the site's own files, and names people could mistake for official ones
  const RESERVED = new Set(["admin", "administrator", "flexippo", "support", "help", "root", "system", "moderator", "mod", "official", "staff", "null", "undefined", "api", "www", "login", "signup", "assets", "index", "supabase",
    "404", "tools", "previews", "readme", "cname", "manifest", "favicon", "robots", "sitemap", "edit", "settings", "home", "about", "privacy", "terms"]);
  let pendingChat = null, pendingEdit = false, pendingThen = null, checkFor = "";

  /* ---------- helpers ---------- */
  function go(u, hash) { location.href = "/" + (u ? "?u=" + encodeURIComponent(u) : "") + (hash || ""); }
  const person = p => ({ id: p.id || p.other_id, username: p.username || "", display_name: p.display_name || "", avatar_url: p.avatar_url || null });
  const nameOf = p => (p && (p.display_name || p.username)) || "someone";
  function avatarHtml(p, size, cls) {
    const url = p && typeof p.avatar_url === "string" && p.avatar_url.startsWith(MEDIA_PREFIX) ? p.avatar_url : "";
    const k = cls ? cls + " " : "";
    if (url) return `<img class="${k}av" src="${esc(url)}" alt="" width="${size}" height="${size}" style="width:${size}px;height:${size}px" loading="lazy" decoding="async">`;
    const nm = nameOf(p), [a1, a2] = AV_COLORS[seedOf((p && p.username) || nm) % AV_COLORS.length];
    return `<span class="${k}av av0" style="--a1:${a1};--a2:${a2};width:${size}px;height:${size}px;font-size:${Math.round(size * 0.44)}px" aria-hidden="true">${esc(nm.trim().charAt(0).toUpperCase() || "?")}</span>`;
  }
  const copyLink = u => copyText(Cloud.shareLink(u)).then(ok => toast(ok ? "Link copied: " + Cloud.shareLink(u).replace(/^https?:\/\//, "") : "Couldn't copy. Your link is " + Cloud.shareLink(u)));
  const ensureOrSay = async msgId => { try { await Cloud.ensure(); return true; } catch (e) { if (msgId) say(msgId, friendlyError(e)); else toast(friendlyError(e)); return false; } };

  /* ---------- log in / sign up (one screen: your link, email, password) ---------- */
  const modal = $id("authModal");
  let authMode = "login", lastFocus = null;
  function say(id, t, ok) { const m = $id(id); if (m) { m.textContent = t || ""; m.className = "auth-msg" + (ok ? " ok" : ""); } }
  function showView(v) {
    $$("#authModal .auth-view").forEach(x => { x.hidden = x.dataset.view !== v; });
    const h = $(`#authModal [data-view="${v}"] .auth-h[id]`); modal.setAttribute("aria-labelledby", h ? h.id : "authTitle");
    modal.hidden = false;
    setTimeout(() => { const f = $$(`#authModal [data-view="${v}"] input:not([readonly])`).find(x => x.offsetParent !== null); if (f) try { f.focus({ preventScroll: true }); } catch (e) {} }, 60);
  }
  function openModal(v) { if (modal.hidden) lastFocus = document.activeElement; showView(v); }
  function closeModal() {
    modal.hidden = true; ["authMsg", "forgotMsg", "newPassMsg", "setupMsg", "checkMsg"].forEach(id => say(id, ""));
    showPass(false);
    if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
  }
  function setMode(m) {
    authMode = m;
    $id("tabLogin").classList.toggle("on", m === "login"); $id("tabSignup").classList.toggle("on", m === "signup");
    $id("tabLogin").setAttribute("aria-selected", String(m === "login")); $id("tabSignup").setAttribute("aria-selected", String(m === "signup"));
    $id("authTitle").textContent = m === "signup" ? "Get your free page" : "Welcome back";
    $id("authUserRow").hidden = m !== "signup";
    $id("authGo").textContent = m === "login" ? "Log in" : "Create my page";
    $id("authPass").autocomplete = m === "login" ? "current-password" : "new-password";
    $id("authForgot").hidden = m !== "login"; say("authMsg", "");
    if (m === "signup") signName.check();
  }
  // why: one short line, only when they came from something (liking, commenting, chatting...)
  function openAuth(mode, why) {
    Cloud.ensure().catch(() => {});      // start downloading the login part now, so it's ready when they press the button
    setMode(mode || "login");
    const sub = $id("authSub"); sub.textContent = why || ""; sub.hidden = !why;
    openModal("auth");
  }
  function showPass(on) {
    const p = $id("authPass"), b = $id("authEye");
    p.type = on ? "text" : "password"; b.setAttribute("aria-pressed", String(on)); b.setAttribute("aria-label", on ? "Hide password" : "Show password");
  }
  $id("authEye").addEventListener("click", () => { showPass($id("authPass").type === "password"); $id("authPass").focus(); });

  // your link (username): letters, numbers and _ only, with a live "is it free?" check
  function nameCheck(inputId, hintId) {
    let T = 0, seq = 0;
    const hint = (t, cls) => { const h = $id(hintId); h.textContent = t; h.className = "u-hint" + (cls ? " " + cls : ""); };
    function check() {
      const el = $id(inputId), v = el.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
      if (v !== el.value) el.value = v;
      clearTimeout(T); const s = ++seq;
      if (!v) return hint("Letters, numbers or _");
      if (v.length < 3) return hint("At least 3 characters", "bad");
      if (RESERVED.has(v)) return hint("✕ Taken. Try another.", "bad");
      hint("Checking…");
      T = setTimeout(async () => {
        try { const free = await Cloud.usernameFree(v); if (s === seq) hint(free ? "✓ Available: flexippo.com/" + v : "✕ Taken. Try another.", free ? "ok" : "bad"); }
        catch (e) { if (s === seq) hint(""); }
      }, 350);
    }
    $id(inputId).addEventListener("input", check);
    return { check };
  }
  const signName = nameCheck("authUser", "authUserHint"), setupName = nameCheck("setupUser", "setupHint");
  const niceName = u => u.replace(/_+/g, " ").trim().replace(/\b[a-z]/g, c => c.toUpperCase()) || u;
  // the link they picked when signing up (kept with the account, so it works even if they confirm on another phone)
  function wantedUser() {
    const m = Cloud.user && Cloud.user.user_metadata, u = String((m && m.username) || LS.get("pendingUser", "") || "").toLowerCase();
    return USER_RE.test(u) && !RESERVED.has(u) ? u : "";
  }
  function prefillSetup(name) {
    const u = $id("setupUser");
    if (name || !u.value) {
      const fromEmail = Cloud.user && Cloud.user.email ? Cloud.user.email.split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20) : "";
      u.value = name || wantedUser() || (Custom.missing && !Custom.failed ? Custom.missing : "") || (fromEmail.length >= 3 ? fromEmail : "");
    }
    setupName.check();
  }
  function openSetup(name) { prefillSetup(name); openModal("setup"); }
  // something needs an account (like, comment, guestbook): ask, then carry on where they were
  function ask(why, then) {
    pendingThen = then || null;
    if (Cloud.user && !Cloud.me) { openSetup(); return; }
    openAuth("signup", why);
  }
  // the account exists: make their page (= their link) and take them to it
  async function makePage(u) {
    try {
      const me = await Cloud.createMe(u, niceName(u));
      LS.del("pendingUser"); closeModal(); toast("Your page is ready: flexippo.com/" + me.username + " 🎉");
      if (pendingChat) { const p = pendingChat; pendingChat = null; Chat.openWith(p); }
      else if (pendingThen) { const f = pendingThen; pendingThen = null; try { f(); } catch (err) {} }
      else go(me.username, "#start");
      return true;
    } catch (err) {
      const m = String(err && err.message || "");
      if (err && err.code === "23505" && !m.includes("username")) { await Cloud.refresh(); if (Cloud.me) { closeModal(); go(Cloud.me.username); return true; } }
      openSetup(u);
      say("setupMsg", err && err.code === "23505" ? "That link was just taken. Pick another." : err && err.code === "23514" ? "That link isn't allowed. Pick another." : friendlyError(err));
      return false;
    }
  }
  function showCheck(email, u) {
    checkFor = email;
    $id("checkEmail").textContent = email; $id("checkUser").textContent = u || ""; $id("checkKeep").hidden = !u;
    $id("checkBack").dataset.mode = u ? "signup" : "login";
    say("checkMsg", ""); openModal("check");
  }

  $id("authClose").addEventListener("click", () => { pendingThen = null; closeModal(); });
  modal.addEventListener("click", e => { if (e.target === modal) { pendingThen = null; closeModal(); } });
  addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) { e.stopPropagation(); pendingThen = null; closeModal(); } }, true);
  $id("tabLogin").addEventListener("click", () => setMode("login"));
  $id("tabSignup").addEventListener("click", () => setMode("signup"));
  $id("authForgot").addEventListener("click", () => { $id("forgotEmail").value = $id("authEmail").value.trim(); showView("forgot"); });
  $id("forgotBack").addEventListener("click", () => showView("auth"));
  $id("checkBack").addEventListener("click", () => { setMode($id("checkBack").dataset.mode || "signup"); showView("auth"); });
  $id("checkResend").addEventListener("click", async () => {
    const b = $id("checkResend"); if (!checkFor) return;
    b.disabled = true; say("checkMsg", "Sending…", true);
    try {
      if (!(await ensureOrSay("checkMsg"))) return;
      const { error } = await Cloud.sb.auth.resend({ type: "signup", email: checkFor, options: { emailRedirectTo: BASE.siteUrl } });
      if (error) throw error;
      say("checkMsg", "Sent ✓ Look in spam too.", true);
    } catch (err) { say("checkMsg", friendlyError(err)); }
    finally { b.disabled = false; }
  });

  $id("authForm").addEventListener("submit", async e => {
    e.preventDefault();
    const signup = authMode === "signup", u = $id("authUser").value.trim().toLowerCase();
    const email = $id("authEmail").value.trim(), password = $id("authPass").value, btn = $id("authGo");
    if (signup && !USER_RE.test(u)) { $id("authUser").focus(); return say("authMsg", "Pick your link: 3 to 20 letters, numbers or _."); }
    if (signup && RESERVED.has(u)) { $id("authUser").focus(); return say("authMsg", "That link is taken. Try another."); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { $id("authEmail").focus(); return say("authMsg", "Please type a real email."); }
    if (password.length < 6) { $id("authPass").focus(); return say("authMsg", "Password needs at least 6 characters."); }
    btn.disabled = true; say("authMsg", signup ? "Making your page…" : "One moment…", true);
    try {
      if (!(await ensureOrSay("authMsg"))) return;
      if (signup) {
        let free = true; try { free = await Cloud.usernameFree(u); } catch (err) {}
        if (!free) { signName.check(); return say("authMsg", "That link was just taken. Try another."); }
        const { data, error } = await Cloud.sb.auth.signUp({ email, password, options: { emailRedirectTo: BASE.siteUrl, data: { username: u } } });
        if (error) throw error;
        // this is how Supabase answers when the email already has an account (it doesn't say it directly, for privacy)
        if (data && data.user && Array.isArray(data.user.identities) && !data.user.identities.length) { setMode("login"); return say("authMsg", "That email already has an account. Log in here."); }
        LS.set("pendingUser", u); $id("authPass").value = "";
        if (!data || !data.session) { showCheck(email, u); return; }     // they need to tap the link in their email first
        await Cloud.refresh();
        await makePage(u);
        return;
      }
      const { error } = await Cloud.sb.auth.signInWithPassword({ email, password });
      if (error) { if (/email not confirmed/i.test(error.message || "")) { showCheck(email, ""); return; } throw error; }
      $id("authPass").value = "";
      afterLogin(await Cloud.refresh());
    } catch (err) { say("authMsg", friendlyError(err)); }
    finally { btn.disabled = false; }
  });
  function afterLogin(me) {
    if (!me) {
      if (Cloud.notSetUp) { closeModal(); toast("Accounts are still being set up. Try again soon."); return; }
      const u = wantedUser(); if (u) { makePage(u); return; }
      openSetup(); return;
    }
    closeModal(); toast("Hey @" + me.username + " 👋");
    if (pendingChat) { const p = pendingChat; pendingChat = null; Chat.openWith(p); return; }
    if (pendingThen) { const f = pendingThen; pendingThen = null; try { f(); } catch (e) {} return; }   // stay here and finish what they started
    const onMine = Custom.target && Custom.target.id === me.id;
    if (pendingEdit && onMine) { pendingEdit = false; OwnerTools.open("edit"); return; }
    if (!onMine) go(me.username, pendingEdit ? "#edit" : "");
  }

  $id("forgotForm").addEventListener("submit", async e => {
    e.preventDefault();
    const email = $id("forgotEmail").value.trim(), btn = $id("forgotGo");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say("forgotMsg", "Please type a real email.");
    btn.disabled = true; say("forgotMsg", "Sending…", true);
    try {
      if (!(await ensureOrSay("forgotMsg"))) return;
      const { error } = await Cloud.sb.auth.resetPasswordForEmail(email, { redirectTo: BASE.siteUrl });
      if (error) throw error;
      say("forgotMsg", "If that email has an account, a reset link is on its way. Check your inbox (and spam).", true);
    } catch (err) { say("forgotMsg", friendlyError(err)); }
    finally { btn.disabled = false; }
  });
  $id("newPassForm").addEventListener("submit", async e => {
    e.preventDefault();
    const pw = $id("newPass").value, btn = $id("newPassGo");
    if (pw.length < 6) return say("newPassMsg", "Password needs at least 6 characters.");
    btn.disabled = true; say("newPassMsg", "Saving…", true);
    try {
      if (!(await ensureOrSay("newPassMsg"))) return;
      const { error } = await Cloud.sb.auth.updateUser({ password: pw });
      if (error) throw error;
      $id("newPass").value = ""; closeModal(); toast("Password updated ✓");
      if (!Cloud.me) { const u = wantedUser(); if (u) makePage(u); else openSetup(); }
    } catch (err) { say("newPassMsg", friendlyError(err)); }
    finally { btn.disabled = false; }
  });

  // picking a link after logging in (accounts made before the one-screen sign-up, or if the link they wanted got taken)
  $id("setupForm").addEventListener("submit", async e => {
    e.preventDefault();
    const u = $id("setupUser").value.trim().toLowerCase(), btn = $id("setupGo");
    if (!USER_RE.test(u)) return say("setupMsg", "Your link needs 3 to 20 letters, numbers or _.");
    if (RESERVED.has(u)) return say("setupMsg", "That link is taken. Try another.");
    if (!(await ensureOrSay("setupMsg"))) return;
    if (!Cloud.user) { setMode("login"); showView("auth"); return say("authMsg", "Please log in again."); }
    btn.disabled = true; say("setupMsg", "Making your page…", true);
    try { await makePage(u); } finally { btn.disabled = false; }
  });

  /* ---------- account button (top right) + menu ---------- */
  function paintBtn() {
    const b = $id("authBtn"), u = Cloud.ready ? Cloud.user : null, me = Cloud.ready ? Cloud.me : Cloud.cachedMe;
    b.classList.toggle("out", !me);
    if (me) { b.innerHTML = avatarHtml(me, 32, "acc-av") + `<span>@${esc(me.username)}</span>`; b.setAttribute("aria-label", "Your account: @" + me.username); }
    else if (u) { b.innerHTML = "<span>Claim your page</span>"; b.setAttribute("aria-label", "Pick your username"); }
    else { b.textContent = "Log in"; b.setAttribute("aria-label", "Log in or sign up"); }
  }
  function openMenu() {
    const me = Cloud.me; if (!me) return;
    $id("accHead").innerHTML = avatarHtml(me, 54, "acc-av") + `<div><b>${esc(nameOf(me))}</b><small>@${esc(me.username)}</small></div>`;
    $id("accLink").value = Cloud.shareLink(me.username);
    $id("accMine").hidden = !!(Custom.target && Custom.target.id === me.id && !Custom.isHome);
    openModal("menu");
  }
  $id("authBtn").addEventListener("click", async () => {
    Snd.fx("tick");
    if (!Cloud.ready) {
      if (!savedLogin()) { openAuth("login"); return; }
      const b = $id("authBtn"); b.disabled = true;
      const ok = await ensureOrSay(); b.disabled = false; if (!ok) return;
    }
    if (!Cloud.user) openAuth("login"); else if (!Cloud.me) openSetup(); else openMenu();
  });
  $id("accCopy").addEventListener("click", () => { if (Cloud.me) copyLink(Cloud.me.username); });
  $id("accMine").addEventListener("click", () => { if (Cloud.me) go(Cloud.me.username); });
  $id("accEdit").addEventListener("click", () => {
    if (!Cloud.me) return;
    if (Custom.owner) { closeModal(); OwnerTools.open("edit"); } else go(Cloud.me.username, "#edit");
  });
  $id("accChats").addEventListener("click", () => { closeModal(); Chat.open(); });
  $id("accHome").addEventListener("click", () => go(""));
  $id("accOut").addEventListener("click", async () => {
    closeModal();
    try { await Cloud.sb.auth.signOut(); } catch (e) {}
    await Cloud.refresh(); toast("Logged out");
  });

  /* ---------- settings (⚙ next to the account button) ---------- */
  function openSettings() {
    const me = Cloud.ready ? Cloud.me : Cloud.cachedMe, inn = Cloud.ready ? !!Cloud.user : savedLogin();
    $id("setIn").hidden = !inn; $id("setGuest").hidden = inn; $id("setEdit").hidden = !me;
    $id("setSkinNote").textContent = Custom.owner && !Custom.demo ? "Changes the theme of your page for everyone who visits." : "Only changes how pages look for you.";
    $id("setLite").setAttribute("aria-pressed", String(document.documentElement.classList.contains("lite")));
    Snd.syncUI(); openModal("settings");
  }
  $id("setBtn").addEventListener("click", () => { Snd.fx("tick"); openSettings(); });
  $id("accSet").addEventListener("click", () => { Snd.fx("tick"); openSettings(); });
  $id("setMusic").addEventListener("click", () => { Snd.toggle(); });
  $id("setSfx").addEventListener("click", () => { Snd.setSfx(!Snd.sfxOn); Snd.fx("tick"); });
  $id("setLite").addEventListener("click", () => {
    const on = !document.documentElement.classList.contains("lite");
    document.documentElement.classList.toggle("lite", on); LS.set("lite", on);
    $id("setLite").setAttribute("aria-pressed", String(on)); Snd.fx("tick");
    toast(on ? "Lite mode on" : "Lite mode off");
  });
  $id("setLogin").addEventListener("click", () => openAuth("login"));
  $id("setSignup").addEventListener("click", () => openAuth("signup"));
  $id("setEdit").addEventListener("click", async () => {
    if (!(await ensureOrSay()) || !Cloud.me) return;
    if (Custom.owner) { closeModal(); OwnerTools.open("edit"); } else go(Cloud.me.username, "#edit");
  });
  $id("setPass").addEventListener("click", async () => { if (await ensureOrSay()) showView("newpass"); });
  $id("setOut").addEventListener("click", async () => {
    if (!(await ensureOrSay())) return;
    closeModal();
    try { await Cloud.sb.auth.signOut(); } catch (e) {}
    await Cloud.refresh(); toast("Logged out");
  });

  /* ---------- buttons under the big name ---------- */
  function paintActs() {
    const box = $id("pageActs"); if (!box) return;
    const T = Custom.target, me = Cloud.ready ? Cloud.me : Cloud.cachedMe;
    let h = "";
    if (Custom.failed) h = `<p class="pa-miss">Couldn't load <b>@${esc(PAGE_U)}</b>'s page. Check your internet and refresh.</p>`;
    else if (Custom.missing) h = `<p class="pa-miss">There's no page called <b>@${esc(Custom.missing)}</b> yet.</p>` + (me ? `<button class="pa-b ghost" type="button" data-act="mine">Go to my page</button>` : `<button class="pa-b" type="button" data-act="claim">✨ Claim @${esc(Custom.missing)}</button>`);
    else if (T && Custom.owner) h = `<button class="pa-b" type="button" data-open="edit">✎ Edit my page</button><button class="pa-b ghost" type="button" data-open="share">🔗 Share</button>`;
    else if (T && !Custom.isHome) h = `<button class="pa-b" type="button" data-act="msg">💬 Message ${esc(nameOf(T))}</button><button class="pa-b ghost" type="button" data-act="sharep">🔗 Share</button>`;
    box.innerHTML = h;
  }
  $id("pageActs").addEventListener("click", e => {
    const b = e.target.closest("button[data-act]"); if (!b) return;
    Snd.fx("tick");
    const a = b.dataset.act, T = Custom.target;
    if (a === "sharep" && T) shareLink(Cloud.shareLink(T.username), "Check out " + nameOf(T) + "'s page 👀");
    else if (a === "msg" && T) Chat.openWith(person(T));
    else if (a === "mine") { const me = Cloud.me || Cloud.cachedMe; if (me) go(me.username); }
    else if (a === "claim") { if (Cloud.user) openSetup(Custom.missing); else { $id("authUser").value = Custom.missing; openAuth("signup"); } }
  });

  /* ---------- chat ---------- */
  const Chat = (() => {
    const panel = $id("chat"), fab = $id("chatFab"), badge = $id("chatBadge");
    let isOpen = false, view = "list", peer = null, convos = null, msgs = [], hasMore = false, blockedByMe = false;
    let channel = null, live = false, pollT = 0, convT = 0, searchT = 0, searchSeq = 0, threadSeq = 0, readT = 0, unread = 0, sending = false, connectedFor = null;
    const meId = () => (Cloud.me ? Cloud.me.id : null);
    const phone = () => mq("(max-width: 600px)");
    const searching = () => $id("chatQ").value.trim().length >= 2;
    const clock = d => d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    function dayLabel(d) {
      const t = new Date(), y = new Date(Date.now() - 864e5);
      if (d.toDateString() === t.toDateString()) return "TODAY";
      if (d.toDateString() === y.toDateString()) return "YESTERDAY";
      return d.toLocaleDateString([], { day: "numeric", month: "short", year: d.getFullYear() === t.getFullYear() ? undefined : "numeric" }).toUpperCase();
    }
    function shortAgo(ts) {
      const d = new Date(ts), s = (Date.now() - d) / 1000;
      if (s < 60) return "now"; if (s < 3600) return Math.floor(s / 60) + "m"; if (s < 86400) return Math.floor(s / 3600) + "h";
      if (s < 6 * 86400) return d.toLocaleDateString([], { weekday: "short" });
      return d.toLocaleDateString([], { day: "numeric", month: "short" });
    }
    function showView(v) { view = v; $$("#chat .chat-view").forEach(x => { x.hidden = x.dataset.view !== v; }); hideMenu(); }
    function openPanel() {
      if (isOpen) return;
      isOpen = true; panel.hidden = false; fab.setAttribute("aria-expanded", "true");
      if (phone()) document.documentElement.classList.add("chat-lock");
    }
    async function open() {
      openPanel();
      if (!Cloud.ready) {
        $id("chatGate").innerHTML = `<span class="chat-gate-ic">💬</span><b>One moment…</b>`; showView("gate");
        try { await Cloud.ensure(); } catch (e) { paintGate(true); showView("gate"); return; }
        if (!isOpen) return;
      }
      if (!Cloud.user || !Cloud.me) { paintGate(); showView("gate"); return; }
      if (view === "thread" && peer) { showView("thread"); return; }
      showView("list"); renderList(); refreshConvos();
      if (fine) setTimeout(() => $id("chatQ").focus(), 60);
    }
    function close() {
      isOpen = false; panel.hidden = true; fab.setAttribute("aria-expanded", "false");
      document.documentElement.classList.remove("chat-lock"); hideMenu();
    }
    function note(t) { const n = $id("chatNote"); n.textContent = t || ""; n.hidden = !t; }
    function hideMenu() { $id("chatMenu").hidden = true; $id("chatMore").setAttribute("aria-expanded", "false"); }
    function setUnread(n) {
      unread = Math.max(0, n | 0); badge.hidden = !unread; badge.textContent = unread > 99 ? "99+" : String(unread);
      fab.setAttribute("aria-label", unread ? `Open chats (${unread} unread)` : "Open chats");
    }
    function paintGate(offline) {
      const g = $id("chatGate");
      if (offline) g.innerHTML = `<span class="chat-gate-ic">📡</span><b>Chat is offline</b><p>Check your internet and try again.</p>`;
      else if (!Cloud.user) g.innerHTML = `<span class="chat-gate-ic">💬</span><b>Chat with your friends</b><p>Make a free account to message anyone on flexippo. You also get your own page.</p><button class="pa-b" type="button" data-gate="signup">Sign up free</button><button class="auth-link" type="button" data-gate="login">I already have an account</button>`;
      else g.innerHTML = `<span class="chat-gate-ic">✨</span><b>One more step</b><p>Pick a username so your friends can find you.</p><button class="pa-b" type="button" data-gate="setup">Pick my username</button>`;
    }
    $id("chatGate").addEventListener("click", e => {
      const b = e.target.closest("[data-gate]"); if (!b) return;
      close();
      if (b.dataset.gate === "signup") openAuth("signup", "Sign up to start chatting. It's free.");
      else if (b.dataset.gate === "login") openAuth("login");
      else openSetup();
    });

    /* list + search */
    function linkBox() {
      if (!Cloud.me) return "";
      const l = Cloud.shareLink(Cloud.me.username);
      return `<div class="chat-linkbox"><input readonly value="${esc(l)}" aria-label="Your link"><button class="auth-mini" type="button" data-copy="1">Copy</button></div>`;
    }
    function rowHtml(p, sub, c) {
      const n = c ? c.unread : 0;
      return `<button class="chat-row${n ? " unread" : ""}" type="button" data-pid="${esc(p.id)}" data-user="${esc(p.username)}" data-name="${esc(p.display_name)}" data-av="${esc(p.avatar_url || "")}">` +
        `${avatarHtml(p, 46)}<span class="cr-main"><span class="cr-top"><b>${esc(nameOf(p))}</b>${c ? `<time>${esc(shortAgo(c.last_at))}</time>` : ""}</span>` +
        `<span class="cr-bot"><span class="cr-last">${sub}</span>${n ? `<i class="cr-n">${n > 99 ? "99+" : n}</i>` : ""}</span></span></button>`;
    }
    function renderList() {
      if (searching()) return;
      const box = $id("chatList");
      if (!convos) { box.innerHTML = '<p class="chat-empty">Loading chats…</p>'; return; }
      if (!convos.length) { box.innerHTML = `<div class="chat-empty"><b>No chats yet</b>Search a friend's username above, or send them your link so they can message you:</div>` + linkBox(); return; }
      box.innerHTML = convos.map(c => rowHtml(person(c), (c.last_from_me ? "You: " : "") + esc(c.last_body || "") + (c.i_blocked ? " · blocked" : ""), c)).join("");
    }
    async function refreshConvos() {
      if (!Cloud.me) return;
      try { convos = (await Cloud.conversations()) || []; } catch (e) { if (!convos) convos = []; return; }
      setUnread(convos.reduce((n, c) => n + (c.unread || 0), 0));
      if (isOpen && view === "list") renderList();
    }
    const refreshSoon = () => { clearTimeout(convT); convT = setTimeout(refreshConvos, 450); };
    $id("chatQ").addEventListener("input", () => {
      clearTimeout(searchT);
      const q = $id("chatQ").value.trim().replace(/^@/, "");
      if (q.length < 2) { renderList(); return; }
      const box = $id("chatList"), seq = ++searchSeq;
      box.innerHTML = '<p class="chat-sec">PEOPLE</p><p class="chat-empty">Searching…</p>';
      searchT = setTimeout(async () => {
        let rows;
        try { rows = (await Cloud.search(q)) || []; } catch (e) { if (seq === searchSeq) box.innerHTML = `<p class="chat-empty">${esc(friendlyError(e))}</p>`; return; }
        if (seq !== searchSeq) return;
        box.innerHTML = '<p class="chat-sec">PEOPLE</p>' + (rows.length ? rows.map(r => rowHtml(person(r), "@" + esc(r.username))).join("")
          : `<div class="chat-empty"><b>No one called “${esc(q)}” yet</b>Send your link to a friend so they can join and message you:</div>` + linkBox());
      }, 260);
    });
    $id("chatList").addEventListener("click", e => {
      if (e.target.closest("[data-copy]")) { if (Cloud.me) copyLink(Cloud.me.username); return; }
      const r = e.target.closest(".chat-row"); if (!r) return;
      Snd.fx("tick");
      openWith({ id: r.dataset.pid, username: r.dataset.user, display_name: r.dataset.name, avatar_url: r.dataset.av || null });
    });

    /* one conversation */
    function paintPeer() {
      $id("chatAvatar").innerHTML = avatarHtml(peer, 40);
      $id("chatName").textContent = nameOf(peer); $id("chatUser").textContent = peer.username ? "@" + peer.username : "";
      $id("chatWho").href = "/?u=" + encodeURIComponent(peer.username || "");
      $id("chatBlock").textContent = blockedByMe ? "Unblock" : "Block";
    }
    function paintComposer() {
      const inp = $id("chatInput");
      inp.disabled = blockedByMe; $id("chatGo").disabled = blockedByMe || sending;
      inp.placeholder = blockedByMe ? "You blocked this person" : "Message " + nameOf(peer) + "…";
      note(blockedByMe ? `You blocked ${nameOf(peer)}. Unblock them from the ⋯ menu to chat.` : "");
    }
    function renderMsgs(toEnd, placeholder) {
      const box = $id("chatMsgs"), me = meId();
      if (placeholder !== undefined) { box.innerHTML = `<p class="chat-empty">${esc(placeholder)}</p>`; return; }
      if (!msgs.length) { box.innerHTML = `<div class="chat-empty"><b>Say hi to ${esc(nameOf(peer))} 👋</b>Messages here are private between you two.</div>`; return; }
      const near = box.scrollHeight - box.scrollTop - box.clientHeight < 140;
      const lastMine = [...msgs].reverse().find(m => m.sender_id === me && !m.pending);
      let h = hasMore ? '<button class="chip chat-older" type="button" id="chatOlder">Load older messages</button>' : "", lastDay = "";
      for (const m of msgs) {
        const d = new Date(m.created_at), day = d.toDateString();
        if (day !== lastDay) { lastDay = day; h += `<p class="chat-day">${esc(dayLabel(d))}</p>`; }
        h += `<div class="bub ${m.sender_id === me ? "me" : "them"}${m.pending ? " pending" : ""}">${esc(m.body)}<time>${esc(m.pending ? "Sending…" : clock(d))}</time></div>`;
        if (m === lastMine && m.read_at) h += '<p class="chat-seen">Seen</p>';
      }
      box.innerHTML = h;
      if (toEnd || near) box.scrollTop = box.scrollHeight;
      const older = $id("chatOlder"); if (older) older.addEventListener("click", loadOlder);
    }
    function upsert(row) {
      if (!row || row.id == null) return;
      const i = msgs.findIndex(m => m.id === row.id);
      if (i >= 0) { msgs[i] = { ...msgs[i], ...row }; return; }
      if (row.sender_id === meId()) { const j = msgs.findIndex(m => m.pending && m.body === row.body); if (j >= 0) { msgs[j] = row; return; } }
      msgs.push(row);
      msgs.sort((a, b) => (typeof a.id === "number" ? a.id : Infinity) - (typeof b.id === "number" ? b.id : Infinity));
    }
    async function openWith(p) {
      p = person(p);
      try { await Cloud.ensure(); } catch (e) { toast("Chat isn't available right now."); return; }
      if (!Cloud.user) { pendingChat = p; openAuth("signup", `Sign up to message ${nameOf(p)}. It's free.`); return; }
      if (!Cloud.me) { pendingChat = p; openSetup(); return; }
      if (p.id === Cloud.me.id) { toast("That's you 🙂"); return; }
      openPanel();
      peer = p; msgs = []; hasMore = false; blockedByMe = false; note("");
      showView("thread"); paintPeer(); paintComposer(); renderMsgs(true, "Loading…");
      const seq = ++threadSeq;
      try {
        const [rows, blocked, fresh] = await Promise.all([Cloud.thread(p.id), Cloud.iBlocked(p.id).catch(() => false), Cloud.getPerson(p.id).catch(() => null)]);
        if (seq !== threadSeq) return;
        if (fresh) { peer = person(fresh); }
        msgs = (rows || []).slice().reverse(); hasMore = (rows || []).length >= 50; blockedByMe = blocked;
        paintPeer(); paintComposer(); renderMsgs(true);
        if (msgs.some(m => m.sender_id === p.id && !m.read_at)) markRead();
      } catch (e) { if (seq === threadSeq) renderMsgs(true, friendlyError(e)); }
      if (fine && !blockedByMe) setTimeout(() => $id("chatInput").focus(), 60);
    }
    async function loadOlder() {
      const first = msgs.find(m => typeof m.id === "number"); if (!peer || !first) return;
      const seq = threadSeq, box = $id("chatMsgs"), h0 = box.scrollHeight;
      try {
        const rows = (await Cloud.thread(peer.id, first.id)) || [];
        if (seq !== threadSeq) return;
        msgs = rows.slice().reverse().concat(msgs); hasMore = rows.length >= 50;
        renderMsgs(false); box.scrollTop = box.scrollHeight - h0;
      } catch (e) { toast(friendlyError(e)); }
    }
    function markRead() {
      clearTimeout(readT); const p = peer;
      readT = setTimeout(async () => { if (!p) return; try { await Cloud.markRead(p.id); } catch (e) {} refreshConvos(); }, 300);
    }
    function sendError(e) {
      const m = String((e && e.message) || "");
      if (m.includes("cannot_message")) return `You can't message ${nameOf(peer)}.`;
      if (m.includes("you_blocked_them")) { blockedByMe = true; paintPeer(); return `You blocked ${nameOf(peer)}. Unblock them from the ⋯ menu to chat.`; }
      if (m.includes("slow_down")) return "You're sending messages too fast. Wait a few seconds.";
      if (m.includes("too_long")) return "That message is too long (2000 characters max).";
      if (m.includes("no_profile")) return "Pick a username first.";
      if (m.includes("no_such_user")) return "This account doesn't exist anymore.";
      return "Couldn't send. " + friendlyError(e);
    }
    async function send() {
      const inp = $id("chatInput"), text = inp.value.trim();
      if (!text || !peer || sending) return;
      if (text.length > 2000) { note("That message is too long (2000 characters max)."); return; }
      if (blockedByMe) { paintComposer(); return; }
      const tmp = { id: "tmp-" + Date.now() + Math.random().toString(36).slice(2, 6), sender_id: meId(), recipient_id: peer.id, body: text, created_at: new Date().toISOString(), read_at: null, pending: true };
      msgs.push(tmp); inp.value = ""; grow(); note(""); renderMsgs(true);
      sending = true; $id("chatGo").disabled = true;
      const seq = threadSeq;
      try {
        const row = await Cloud.send(peer.id, text);
        if (seq === threadSeq) { msgs = msgs.filter(m => m !== tmp); upsert(row); renderMsgs(true); }
        Snd.fx("tick"); refreshSoon();
      } catch (e) {
        msgs = msgs.filter(m => m !== tmp);
        if (seq === threadSeq) { renderMsgs(true); if (!inp.value) { inp.value = text; grow(); } note(sendError(e)); paintComposerKeepNote(); }
      } finally { sending = false; if (!blockedByMe) $id("chatGo").disabled = false; }
    }
    function paintComposerKeepNote() { const n = $id("chatNote").textContent; paintComposer(); if (n && !blockedByMe) note(n); }
    function grow() { const t = $id("chatInput"); t.style.height = "auto"; t.style.height = Math.min(120, t.scrollHeight) + "px"; }

    /* live updates */
    function onNew(row) {
      if (!row || !Cloud.me) return;
      const me = Cloud.me.id, other = row.sender_id === me ? row.recipient_id : row.sender_id;
      if (isOpen && view === "thread" && peer && peer.id === other) {
        upsert(row); renderMsgs(false);
        if (row.sender_id === other && document.visibilityState === "visible") markRead();
      } else if (row.recipient_id === me) notify(row);
      refreshSoon();
    }
    function onUpdate(row) {
      if (!row) return;
      const i = msgs.findIndex(m => m.id === row.id);
      if (i >= 0) { msgs[i] = { ...msgs[i], ...row }; if (isOpen && view === "thread") renderMsgs(false); }
    }
    async function notify(row) {
      setUnread(unread + 1);
      let who = (convos || []).find(c => c.other_id === row.sender_id);
      if (!who) { try { who = await Cloud.getPerson(row.sender_id); } catch (e) {} }
      toast("💬 " + nameOf(who) + ": " + String(row.body || "").slice(0, 60)); Snd.fx("pop");
    }
    async function poll() {
      if (!Cloud.me || document.visibilityState !== "visible") return;
      refreshConvos();
      if (!(isOpen && view === "thread" && peer)) return;
      const seq = threadSeq, p = peer;
      try {
        const rows = (await Cloud.thread(p.id)) || [];
        if (seq !== threadSeq) return;
        let changed = false;
        rows.forEach(r => { const old = msgs.find(m => m.id === r.id); if (!old || old.read_at !== r.read_at) { upsert(r); changed = true; } });
        if (changed) { renderMsgs(false); if (rows.some(r => r.sender_id === p.id && !r.read_at)) markRead(); }
      } catch (e) {}
    }
    function startPoll() { clearInterval(pollT); pollT = setInterval(poll, live ? 30000 : 10000); }
    function connect() {
      disconnect();
      const uid = meId(); if (!Cloud.sb || !uid) return;
      try {
        channel = Cloud.sb.channel("inbox-" + uid)
          .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: "recipient_id=eq." + uid }, p => onNew(p.new))
          .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: "sender_id=eq." + uid }, p => onNew(p.new))
          .on("postgres_changes", { event: "UPDATE", schema: "public", table: "messages", filter: "sender_id=eq." + uid }, p => onUpdate(p.new))
          .subscribe(status => { const was = live; live = status === "SUBSCRIBED"; if (was !== live) startPoll(); });
      } catch (e) { live = false; }
      startPoll(); refreshConvos();
    }
    function disconnect() {
      if (channel) { try { Cloud.sb.removeChannel(channel); } catch (e) {} channel = null; }
      live = false; clearInterval(pollT);
    }
    function onAuth() {
      if (!Cloud.ready) return;
      const id = meId();
      if (id === connectedFor) return;
      connectedFor = id;
      if (!id) { disconnect(); convos = null; peer = null; msgs = []; threadSeq++; setUnread(0); if (isOpen) { paintGate(); showView("gate"); } return; }
      convos = null; connect(); if (isOpen) open();
    }

    /* buttons */
    fab.addEventListener("click", () => { Snd.fx("tick"); isOpen ? close() : open(); });
    $$("#chat [data-close]").forEach(b => b.addEventListener("click", close));
    $id("chatBack").addEventListener("click", () => { peer = null; threadSeq++; note(""); showView("list"); renderList(); refreshConvos(); });
    $id("chatMore").addEventListener("click", e => { e.stopPropagation(); const m = $id("chatMenu"); m.hidden = !m.hidden; $id("chatMore").setAttribute("aria-expanded", String(!m.hidden)); });
    panel.addEventListener("click", e => { if (!e.target.closest("#chatMenu, #chatMore")) hideMenu(); });
    $id("chatWho").addEventListener("click", e => { e.preventDefault(); if (peer && peer.username) go(peer.username); });
    $id("chatView").addEventListener("click", () => { if (peer && peer.username) go(peer.username); });
    $id("chatBlock").addEventListener("click", async () => {
      hideMenu(); if (!peer) return;
      const on = !blockedByMe;
      try { await Cloud.setBlock(peer.id, on); blockedByMe = on; paintPeer(); paintComposer(); toast(on ? "Blocked " + nameOf(peer) : "Unblocked " + nameOf(peer)); refreshSoon(); }
      catch (e) { toast(friendlyError(e)); }
    });
    $id("chatInput").addEventListener("input", grow);
    $id("chatInput").addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey && !e.isComposing && fine) { e.preventDefault(); send(); } });
    $id("chatForm").addEventListener("submit", e => { e.preventDefault(); send(); });
    addEventListener("keydown", e => { if (e.key === "Escape" && isOpen && modal.hidden && !document.documentElement.classList.contains("fe-lock")) { if (!$id("chatMenu").hidden) hideMenu(); else close(); } });
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && Cloud.me) poll(); });
    Cloud.on(onAuth);
    return { open, close, openWith, onAuth };
  })();

  // "Make mine, free" (the get-your-own box): sign up, or go to your page if you have one
  $id("goFree").addEventListener("click", async () => {
    Snd.fx("tick");
    const me = Cloud.ready ? Cloud.me : Cloud.cachedMe;
    if (me) { if (Custom.target && Custom.target.id === me.id) OwnerTools.open("edit"); else go(me.username, "#edit"); return; }
    if (Cloud.ready && Cloud.user && !Cloud.me) { openSetup(); return; }
    openAuth("signup");
  });

  /* ---------- start ---------- */
  const waitCustom = () => new Promise(r => { if (Custom.loaded) r(); else Custom.on(r); });
  async function afterCloud() {
    await waitCustom();
    paintBtn(); paintActs(); Chat.onAuth();
    if (AUTH_HASH_ERROR) toast(/expired|invalid/i.test(AUTH_HASH_ERROR) ? "That email link has expired. Ask for a new one." : AUTH_HASH_ERROR);
    if (AUTH_RECOVERY && Cloud.user) openModal("newpass");
    else if (AUTH_IN_URL && Cloud.user && !Cloud.me && !Cloud.notSetUp) { const u = wantedUser(); if (u) makePage(u); else openSetup(); }   // just confirmed their email: make their page
    Cloud.on(why => { if (why === "recovery") openModal("newpass"); });
    if (Custom.missing && !Custom.failed) toast("There's no page called @" + Custom.missing + " yet");
    if (location.hash === "#start" && Custom.owner) {   // just made their page: straight into editing it
      try { history.replaceState(history.state, "", location.pathname + location.search); } catch (e) {}
      setTimeout(() => OwnerTools.open("start"), 300);
    }
    if (location.hash === "#edit") {
      try { history.replaceState(history.state, "", location.pathname + location.search); } catch (e) {}
      if (Custom.owner) setTimeout(() => OwnerTools.open("edit"), 300);
      else if (!Cloud.user) { pendingEdit = true; openAuth("login", "Log in to edit your page."); }
      else if (!Cloud.me) openSetup();
      else if (!(Custom.target && Custom.target.id === Cloud.me.id)) go(Cloud.me.username, "#edit");
    }
  }
  function start() {
    paintBtn(); paintActs();
    Cloud.on(() => { paintBtn(); paintActs(); });
    Custom.on(() => { paintActs(); });
    const go1 = () => Cloud.ensure().then(afterCloud, e => { if (AUTH_IN_URL || location.hash === "#edit") toast(friendlyError(e)); });
    // personal pages, email links and "edit" links need the login part right away; logged-in people get it when the page is idle
    if (PAGE_U || AUTH_IN_URL || location.hash === "#edit" || CONFIG.homeProfile) go1();
    else if (savedLogin()) idle(go1);
  }
  return { start, ask, openAuth, openSetup, get chat() { return Chat; } };
})();

boot();
Accounts.start();
