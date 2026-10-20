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
  // Collection: up to 9 slots on the free plan (a Premium plan can raise this later).
  // "uc" is the PUBG UC card: add icon/logo image paths when you have them.
  collectionLimit: 9,
  collection: [
    { id: "uc", type: "uc", amount: "10,000", unit: "UC", game: "PUBG MOBILE", icon: "", logo: "" },
    { id: "nvidia", img: "assets/col/nvidia.jpg", alt: "NVIDIA 😏", meme: "Those who know" },
    { id: "axolotls", img: "assets/col/axolotls.jpg", alt: "Axolotls in an aquarium" },
    { id: "tuxedo-cat", img: "assets/col/tuxedo-cat.jpg", alt: "Black and white cat" },
    { id: "tin-robots", img: "assets/col/tin-robots.jpg", alt: "Tin toy robots" },
    { id: "guitar", img: "assets/col/guitar.jpg", alt: "Acoustic guitar" },
    { id: "doll-shelf", img: "assets/col/doll-shelf.jpg", alt: "Shelf of vintage dolls" },
    { id: "figurine", img: "assets/col/figurine.jpg", alt: "Ceramic figurine" },
    { id: "mixtape-cd", img: "assets/col/mixtape-cd.jpg", alt: "CD" }
  ],
  // example comment pinned on a photo on the demo page (photo id: commenter)
  pins: { "figurine": "midnight.gamer", "tuxedo-cat": "aura.farmer" }
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
const OPT = {"assets/cover-main.jpg":[1440,1800,[800,1100,1440]],"assets/story-palms.jpg":[898,1350,[240,898]],"assets/post-beach-crew.jpg":[612,408,[320,612]],"assets/post-hike-crew.jpg":[720,540,[320,720]],"assets/post-lake.jpg":[1200,830,[320,720]],"assets/x-profile.jpg":[1000,746,[700,1000]],"assets/og-kai.jpg":[1200,630,[640]],"assets/flexippo-avatar.png":[320,320,[320]],"assets/col/axolotls.jpg":[640,640,[320,640]],"assets/col/doll-shelf.jpg":[640,640,[320,640]],"assets/col/figurine.jpg":[640,640,[320,640]],"assets/col/ginger-cat.jpg":[640,640,[320,640]],"assets/col/guitar.jpg":[640,640,[320,640]],"assets/col/mecha-robot.jpg":[640,640,[320,640]],"assets/col/mixtape-cd.jpg":[640,640,[320,640]],"assets/col/nvidia.jpg":[640,640,[320,640]],"assets/col/tin-robots.jpg":[640,640,[320,640]],"assets/col/tuxedo-cat.jpg":[640,640,[320,640]]};
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
  Object.assign(CONFIG, { name: PAGE_U, heroName: PAGE_U.toUpperCase().slice(0, 14), kana: "@" + PAGE_U, avatar: FLEX_AVATAR, birthday: "",
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
    saveMyPage,
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
    const s1 = $("#pSfx"), s2 = $("#sfxSwitch");
    if (s1) s1.setAttribute("aria-pressed", String(sfxOn));
    if (s2) s2.setAttribute("aria-pressed", String(sfxOn));
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
(() => {
  const fab = document.getElementById("fabGet"), pitch = document.getElementById("pitch"), box = document.getElementById("get-yours");
  if (PAGE_U) { fab.hidden = true; pitch.hidden = true; return; }
  if (!("IntersectionObserver" in window)) return;
  const seen = new Set(), io = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)); fab.classList.toggle("away", seen.size > 0); });
  [pitch, box].forEach(el => el && io.observe(el));
})();

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
function renderName() {
  const HN = CONFIG.heroName || CONFIG.name; const h = $("#name");
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
        <div class="soc-h">${brandIcon({ ...base, brand: v.accent })}<div class="soc-id"><b class="vh">${esc(base.label)}</b><span class="hdl">${pfpHtml()}<em>${esc(v.title)}</em>${VERIFIED}</span></div><button class="ed-chip owner-only" type="button" data-edit="spotify" aria-label="Customize Spotify">✎</button></div>
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
function renderSocials() {
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
    const editable = ["instagram", "spotify", "x", "snapchat"].includes(base.id);
    return `<article class="soc ${base.width || ""}" data-soc="${base.id}" style="--brand:${base.brand}">
      <div class="soc-h">${brandIcon(base)}<div class="soc-id"><b class="vh">${esc(base.label)}</b><span class="hdl">${pfpHtml()}<em>${esc(s.handle)}</em>${VERIFIED}</span></div>${editable ? `<button class="ed-chip owner-only" type="button" data-edit="${base.id}" aria-label="Customize ${esc(base.label)}">✎</button>` : ""}<a class="btn" href="${esc(ctaUrl)}" target="_blank" rel="noopener" style="--brand:${base.id === "x" ? "#333" : (base.brand.startsWith("linear") ? "#d62976" : base.brand)}${base.id === "snapchat" ? ";color:#111" : ""}">${esc(base.cta)}</a></div>
      ${body}</article>`;
  }).join("") + duoCard(V, DUO);
  renderLinks();
  Snd.syncUI();
}
// one listener for everything inside the social cards (instead of one per button)
function setupSocialClicks() {
  $("#socGrid").addEventListener("click", e => {
    const np = e.target.closest("[data-np]"); if (np) { Snd.fx("tick"); Snd.toggle(); return; }
    const ed = e.target.closest("[data-edit]"); if (ed) { Snd.fx("tick"); Editor.open(ed.dataset.edit); return; }
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
function linksNow() { const S = Custom.settings || {}; return cleanLinks(Array.isArray(S.links) ? S.links : CONFIG.links); }
function renderLinks() {
  const list = linksNow(), box = $("#linkList");
  box.hidden = !list.length;
  box.innerHTML = list.map(l => {
    const k = linkKind(l.u);
    return `<a class="lnk" href="${esc(l.u)}" target="_blank" rel="noopener"><span class="soc-ic" style="background:${k.brand}${k.dark ? ";color:#111" : ""}" aria-hidden="true">${icon(k.icon)}</span><span class="lnk-t">${esc(l.t || k.host)}<small>${esc(k.host)}</small></span><i aria-hidden="true">↗</i></a>`;
  }).join("");
  $("#editLinks").textContent = list.length ? "✎ Edit links" : "＋ Add more links";
}

/* ======================= SNAPCHAT STORIES ======================= */
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
    const v = socialView().snapchat; if (!v) return;
    list = v.stories.filter(st => st.img); i = Math.min(Math.max(0, k), list.length - 1); lastFocus = document.activeElement;
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
// so it shows for everyone, on every device. Opened from the computer, edits save in this browser.
const Custom = (() => {
  let owner = false, cloud = false, target = null, isHome = false, missing = "", failed = false, loaded = false, lastError = null;
  let settings = LS.get("custom", {}) || {}, media = LS.get("customMedia", {}) || {};
  const subs = [];
  const emit = () => subs.forEach(f => { try { f(); } catch (e) { console.error(e); } });
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
      if (target) { settings = cleanSettings(target.settings); media = cleanMedia(target.media); }
      else if (PAGE_U && !failed) missing = u;
      syncOwner();
      Cloud.on(why => { if (why === "auth" || why === "me" || why === "init") { const was = owner; syncOwner(); if (was !== owner) apply(); } });
      return apply();
    }
    owner = location.protocol === "file:";   // opened from the computer: you're the owner, edits stay in this browser
    apply();
  }
  function apply() {
    loaded = true;
    document.body.classList.toggle("is-owner", owner);
    document.body.classList.toggle("on-page", !!target && !isHome);
    emit();
    document.body.classList.remove("loading-page");
    document.documentElement.classList.remove("upage");
  }
  async function save(next, pend) {
    if (cloud) {
      if (!owner || !target) { lastError = new Error("not_owner"); return "error"; }
      try {
        const nm = String(((next || {}).profile || {}).name || "").trim();
        const row = await Cloud.saveMyPage(next, media, pend, nm || target.display_name || target.username);
        target = { ...target, ...row }; settings = cleanSettings(row.settings); media = cleanMedia(row.media); lastError = null;
        emit(); return "cloud";
      } catch (e) { lastError = e; return "error"; }
    }
    settings = next; const m = { ...media }; for (const k in pend) { if (pend[k]) m[k] = pend[k]; else delete m[k]; } media = m;
    let ok = true;
    try { localStorage.setItem("nv_custom", JSON.stringify(settings)); localStorage.setItem("nv_customMedia", JSON.stringify(media)); } catch (e) { ok = false; }
    emit();
    return ok ? "local" : "full";
  }
  return {
    init, save, on(f) { subs.push(f); },
    get settings() { return settings; }, get media() { return media; }, get owner() { return owner; },
    get cloud() { return cloud; }, get target() { return target; }, get isHome() { return isHome; }, get missing() { return missing; }, get failed() { return failed; }, get loaded() { return loaded; }, get lastError() { return lastError; },
    // the example page with made-up numbers = the main page without a real profile behind it
    get demo() { return !cloud || !target; }
  };
})();

/* ======================= PROFILE BASICS (name, photos, birthday, theme, contact) ======================= */
// Each page starts from the defaults in CONFIG; the owner's saved choices go on top.
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
function applyBasics() {
  const S = Custom.settings || {}, M = Custom.media || {}, T = Custom.target;
  const P = S.profile && typeof S.profile === "object" ? S.profile : {};
  const userPage = !!T && !Custom.isHome;
  const name = clip(P.name, 24) || (userPage ? T.display_name || T.username : BASE.name);
  CONFIG.name = name;
  CONFIG.heroName = clip(P.heroName, 14) || (userPage ? name.toUpperCase().slice(0, 14) : PAGE_U ? CONFIG.heroName : BASE.heroName);
  CONFIG.kana = typeof P.kana === "string" ? clip(P.kana, 30) : userPage ? "@" + T.username : PAGE_U ? CONFIG.kana : BASE.kana;
  CONFIG.titles = cleanList(P.titles, 6, 40) || BASE.titles;
  CONFIG.birthday = typeof P.birthday === "string" ? P.birthday.trim() : userPage ? "" : BASE.birthday;
  CONFIG.avatar = M.avatar || (userPage || PAGE_U ? FLEX_AVATAR : BASE.avatar);
  CONFIG.cover = M.cover || BASE.cover;
  CONFIG.ticker = cleanList(P.ticker, 8, 30) || (userPage ? [CONFIG.heroName, "WELCOME TO MY PAGE", "限界突破", "FLEXIPPO.COM"] : PAGE_U ? CONFIG.ticker : BASE.ticker);
  const C = S.contact && typeof S.contact === "object" ? S.contact : {};
  CONFIG.contact = BASE.contact.map(c => contactFor(c, C[c.id], userPage || !!PAGE_U));
  const D = S.discord && typeof S.discord === "object" ? S.discord : {};
  const d = CONFIG.socials.find(s => s.id === "discord"), bd = BASE.socials.find(s => s.id === "discord");
  if (d && bd) { d.handle = clip(D.handle, 40) || bd.handle; d.url = safeUrl(D.url, bd.url); d.blurb = typeof D.blurb === "string" ? clip(D.blurb, 140) : bd.blurb; }
  CONFIG.siteUrl = userPage ? Cloud.shareLink(T.username) : BASE.siteUrl;
  if (!skinTouched && ["night", "sakura", "fire"].includes(P.skin) && document.documentElement.dataset.skin !== P.skin) applySkin(P.skin, false, true);
  document.title = userPage ? name + " · flexippo" : BASE_TITLE;
  renderName(); renderTicker(); renderContact(); renderShare(); tickCountdown();
}
function renderTicker() {
  const isJp = t => /[぀-ヿ㐀-鿿＀-￯]/.test(t);   // Japanese letters
  const one = "<span>" + CONFIG.ticker.concat(CONFIG.ticker).map(t => (isJp(t) ? `<b class="jp">${esc(t)}</b>` : esc(t)) + " ✦").join("</span><span>") + "</span>";
  const html = one + one, tr = $("#tickerTrack");
  if (tr.innerHTML !== html) tr.innerHTML = html;
}
function renderContact() {
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

const Editor = (() => {
  let pend = {}, tab = "profile", colWork = [], linkWork = [];
  const newId = () => "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const mediaOf = k => (Object.prototype.hasOwnProperty.call(pend, k) ? pend[k] : (Custom.media || {})[k]) || "";
  function colRow(it, i, n) {
    const isText = it.type === "uc";
    const hasIcon = !!(mediaOf("col_" + it.id + "_icon") || it.icon), hasLogo = !!(mediaOf("col_" + it.id + "_logo") || it.logo);
    const thumb = isText ? `<div class="col-uc">${esc(it.amount || "")}<small>${esc(it.unit || "")}</small></div>` : `<img class="col-thumb" src="${esc(mediaOf("col_" + it.id) || bestSrc(it.img || ""))}" alt="">`;
    const fields = isText
      ? `<input data-k="amount" maxlength="16" value="${esc(it.amount || "")}" placeholder="Big text, e.g. 10,000" aria-label="Big text">
         <input data-k="unit" maxlength="16" value="${esc(it.unit || "")}" placeholder="Second line, e.g. UC" aria-label="Second line">
         <input data-k="game" maxlength="30" value="${esc(it.game || "")}" placeholder="Small label, e.g. PUBG MOBILE" aria-label="Small label">`
      : `<input data-k="meme" maxlength="40" value="${esc(it.meme || "")}" placeholder="Top text (optional), e.g. THOSE WHO KNOW" aria-label="Top text">
         <input data-k="alt" maxlength="80" value="${esc(it.alt || "")}" placeholder="What's in the photo (helps Google + screen readers)" aria-label="Description">`;
    const acts = `<button class="chip" type="button" data-act="top" ${i === 0 ? "disabled" : ""}>⤒ Top</button><button class="chip" type="button" data-act="up" ${i === 0 ? "disabled" : ""} aria-label="Move up">↑</button><button class="chip" type="button" data-act="down" ${i === n - 1 ? "disabled" : ""} aria-label="Move down">↓</button>` +
      (isText ? `<label class="chip">${hasIcon ? "Icon ✓" : "+ Icon"}<input type="file" accept="image/*" data-colfile="icon" hidden></label><label class="chip">${hasLogo ? "Logo ✓" : "+ Logo"}<input type="file" accept="image/*" data-colfile="logo" hidden></label>`
              : `<label class="chip">Change photo<input type="file" accept="image/*" data-colfile="img" hidden></label>`) +
      `<button class="chip col-del" type="button" data-act="del">Remove</button>`;
    return `<div class="col-row" data-i="${i}">${thumb}<div class="col-f">${fields}</div><div class="col-a">${acts}</div></div>`;
  }
  function renderCol() {
    const pane = $('#edBody [data-pane="collection"]'); if (!pane) return;
    const full = colWork.length >= colMax();
    pane.innerHTML = `<div class="col-add"><label class="btn${full ? " is-off" : ""}">+ Add photos<input type="file" accept="image/*" multiple data-colfile="add" hidden${full ? " disabled" : ""}></label><button class="chip" type="button" data-act="addtext"${full ? " disabled" : ""}>+ Text card</button><span class="col-count">${colWork.length} / ${colMax()} SLOTS</span></div>
      ${colWork.length >= colMax() ? `<p class="col-full">🔒 All ${colMax()} slots are used. Remove one to add another. <b>More slots are coming with Premium.</b></p>` : `<p class="hint">You have ${colMax()} slots. New photos go to the end; tap ⤒ Top to move one first.</p>`}
      <div class="col-list">${colWork.map((it, i) => colRow(it, i, colWork.length)).join("")}</div>
      <button class="chip" type="button" data-act="restore" style="align-self:flex-start">Restore default collection</button>`;
  }
  function bindCol() {
    const pane = $('#edBody [data-pane="collection"]');
    pane.addEventListener("input", e => { const k = e.target.dataset.k; if (!k) return; const row = e.target.closest(".col-row"); if (row) colWork[+row.dataset.i][k] = e.target.value; });
    pane.addEventListener("click", e => {
      const b = e.target.closest("button[data-act]"); if (!b) return;
      const act = b.dataset.act, row = b.closest(".col-row"), i = row ? +row.dataset.i : -1;
      if (act === "top" && i > 0) colWork.unshift(colWork.splice(i, 1)[0]);
      else if (act === "up" && i > 0) [colWork[i - 1], colWork[i]] = [colWork[i], colWork[i - 1]];
      else if (act === "down" && i >= 0 && i < colWork.length - 1) [colWork[i + 1], colWork[i]] = [colWork[i], colWork[i + 1]];
      else if (act === "del") { const it = colWork[i]; ["", "_icon", "_logo"].forEach(sfx => { const k = "col_" + it.id + sfx; if ((Custom.media || {})[k] || pend[k]) pend[k] = null; }); colWork.splice(i, 1); }
      else if (act === "addtext") { if (colWork.length >= colMax()) return; colWork.unshift({ id: newId(), type: "uc", amount: "999", unit: "WINS", game: "" }); }
      else if (act === "restore") { Object.keys(Custom.media || {}).concat(Object.keys(pend)).filter(k => k.startsWith("col_")).forEach(k => pend[k] = null); colWork = JSON.parse(JSON.stringify(BASE.collection.slice(0, colMax()))); }
      else return;
      Snd.fx(act === "del" ? "unpop" : "tick"); renderCol();
    });
    pane.addEventListener("change", async e => {
      const t = e.target, kind = t.dataset.colfile; if (!kind) return;
      const files = [...(t.files || [])]; if (!files.length) return;
      if (kind === "add") {
        const room = colMax() - colWork.length;
        if (room <= 0) { $("#edNote").textContent = `All ${colMax()} slots are used. Remove one first.`; return; }
        $("#edNote").textContent = "Adding photos…";
        let added = 0;
        for (const f of files.slice(0, room)) { try { const d = await shrinkImage(f, 640, 160000); const id = newId(); pend["col_" + id] = d; colWork.push({ id, alt: "", meme: "" }); added++; } catch (err) {} }
        $("#edNote").textContent = added ? `Added ${added} photo${added > 1 ? "s" : ""}${files.length > room ? ` (only ${room} slot${room > 1 ? "s" : ""} left)` : ""}. Press Save to keep them.` : "Those files aren't images we can use. Try JPG or PNG.";
        Snd.fx("pop"); renderCol(); return;
      }
      const row = t.closest(".col-row"); const it = colWork[+row.dataset.i];
      try { const d = await shrinkImage(files[0], kind === "img" ? 640 : 360, 160000); pend["col_" + it.id + (kind === "img" ? "" : "_" + kind)] = d; Snd.fx("pop"); renderCol(); }
      catch (err) { $("#edNote").textContent = "That file isn't an image we can use. Try a JPG or PNG."; }
    });
  }
  /* ---- links tab ---- */
  function renderLinksPane() {
    const pane = $('#edBody [data-pane="links"]'); if (!pane) return;
    const max = CONFIG.linkLimit || 8, full = linkWork.length >= max;
    pane.innerHTML = `<p class="hint">Extra buttons under your socials: YouTube, a game profile, your shop, anything. Up to ${max}.</p>
      <div class="col-list">${linkWork.map((l, i) => { const k = linkKind(l.u);
        return `<div class="col-row lk" data-i="${i}"><span class="soc-ic" style="background:${k.brand}${k.dark ? ";color:#111" : ""}" aria-hidden="true">${icon(k.icon)}</span><div class="col-f"><input data-k="t" maxlength="40" value="${esc(l.t)}" placeholder="Button text, e.g. My YouTube" aria-label="Button text"><input data-k="u" type="url" maxlength="300" value="${esc(l.u)}" placeholder="https://..." aria-label="Link"></div><div class="col-a"><button class="chip" type="button" data-act="up" ${i === 0 ? "disabled" : ""} aria-label="Move up">↑</button><button class="chip" type="button" data-act="down" ${i === linkWork.length - 1 ? "disabled" : ""} aria-label="Move down">↓</button><button class="chip col-del" type="button" data-act="del">Remove</button></div></div>`; }).join("")}</div>
      <button class="btn" type="button" data-act="add"${full ? " disabled" : ""} style="align-self:flex-start">+ Add a link</button>`;
  }
  function bindLinks() {
    const pane = $('#edBody [data-pane="links"]');
    pane.addEventListener("input", e => {
      const k = e.target.dataset.k, row = e.target.closest(".col-row"); if (!k || !row) return;
      linkWork[+row.dataset.i][k] = e.target.value;
      if (k === "u") { const kk = linkKind(e.target.value.trim()), ic = $(".soc-ic", row); ic.style.background = kk.brand; ic.style.color = kk.dark ? "#111" : ""; ic.innerHTML = icon(kk.icon); }
    });
    pane.addEventListener("click", e => {
      const b = e.target.closest("button[data-act]"); if (!b) return;
      const act = b.dataset.act, row = b.closest(".col-row"), i = row ? +row.dataset.i : -1;
      if (act === "add") { if (linkWork.length >= (CONFIG.linkLimit || 8)) return; linkWork.push({ t: "", u: "https://" }); }
      else if (act === "del" && i >= 0) linkWork.splice(i, 1);
      else if (act === "up" && i > 0) [linkWork[i - 1], linkWork[i]] = [linkWork[i], linkWork[i - 1]];
      else if (act === "down" && i >= 0 && i < linkWork.length - 1) [linkWork[i + 1], linkWork[i]] = [linkWork[i], linkWork[i + 1]];
      else return;
      Snd.fx(act === "del" ? "unpop" : "tick"); renderLinksPane();
      if (act === "add") { const ins = $$('#edBody [data-pane="links"] input[data-k="t"]'); if (ins.length) ins[ins.length - 1].focus(); }
    });
  }
  const el = () => $("#editor");
  function imgField(key, label, current) {
    return `<div class="fld"><span class="lab">${label}</span><div class="imgpick"><img data-prev="${key}" src="${esc(current)}" alt=""><div class="row"><label class="chip pick">Upload<input type="file" accept="image/*" data-file="${key}" hidden></label><button class="chip" type="button" data-reset="${key}">Reset</button></div></div></div>`;
  }
  const txt = (id, label, val, max = 80, type = "text", ph = "") => `<div class="fld"><label for="${id}">${label}</label><input id="${id}" type="${type}" maxlength="${max}" value="${esc(val || "")}" placeholder="${esc(ph)}"></div>`;
  function build() {
    const V = socialView(), sp = V.spotify, ig = V.instagram, x = V.x, sc = V.snapchat;
    const rawTracks = (Object.assign({}, CONFIG.spotify, (Custom.settings || {}).spotify || {}).tracks || []).join("\n");
    const S0 = Custom.settings || {}, P = S0.profile || {}, D = S0.discord || {}, Cs = S0.contact || {};
    const dc = CONFIG.socials.find(s => s.id === "discord") || {};
    const cv = id => { const c = CONFIG.contact.find(x => x.id === id) || {}; return Cs[id] !== undefined ? String(Cs[id]) : String(c.value || "").replace(/^\+/, ""); };
    const skinNow = ["night", "sakura", "fire"].includes(P.skin) ? P.skin : (document.documentElement.dataset.skin || "night");
    $("#edBody").innerHTML = `
      <section data-pane="profile">
        ${txt("e-p-name", "YOUR NAME", P.name !== undefined ? P.name : CONFIG.name, 24, "text", "e.g. Rahul")}
        ${txt("e-p-hero", "BIG NAME AT THE TOP (UP TO 14 LETTERS)", P.heroName !== undefined ? P.heroName : CONFIG.heroName, 14, "text", "e.g. RAHUL")}
        ${txt("e-p-kana", "SMALL LINE UNDER THE NAME", P.kana !== undefined ? P.kana : CONFIG.kana, 30, "text", "e.g. ラフル or @rahul")}
        <div class="fld"><label for="e-p-titles">TYPING LINES (ONE PER LINE, UP TO 6)</label><textarea id="e-p-titles" maxlength="300">${esc(CONFIG.titles.join("\n"))}</textarea></div>
        ${imgField("avatar", "PROFILE PICTURE", CONFIG.avatar)}
        ${imgField("cover", "BIG TOP PHOTO", bestSrc(CONFIG.cover))}
        ${txt("e-p-bday", "BIRTHDAY AS MONTH-DAY, LIKE 11-20 (EMPTY HIDES THE COUNTDOWN)", P.birthday !== undefined ? P.birthday : CONFIG.birthday, 5, "text", "11-20")}
        <div class="fld"><label for="e-p-skin">THEME</label><select id="e-p-skin">${[["night", "Neon Tokyo Night"], ["sakura", "Sakura Day"], ["fire", "Shonen Fire"]].map(([k, l]) => `<option value="${k}"${k === skinNow ? " selected" : ""}>${l}</option>`).join("")}</select></div>
        <div class="fld"><label for="e-p-ticker">MOVING STRIP WORDS (ONE PER LINE, UP TO 8)</label><textarea id="e-p-ticker" maxlength="300">${esc(CONFIG.ticker.join("\n"))}</textarea></div>
      </section>
      <section data-pane="links"></section>
      <section data-pane="spotify">
        ${txt("e-sp-title", "CARD TITLE", sp.title, 30, "text", "On repeat")}
        ${txt("e-sp-sub", "ONE-LINE MOOD", sp.subtitle, 70, "text", "What I'm playing this week")}
        ${txt("e-sp-pl", "PLAYLIST OR SONG NAME", sp.playlist, 50)}
        ${txt("e-sp-ar", "ARTIST / BY", sp.artist, 50)}
        ${txt("e-sp-url", "SPOTIFY LINK", sp.url, 300, "url", "https://open.spotify.com/...")}
        ${imgField("spCover", "COVER IMAGE", sp.cover)}
        <div class="fld"><label for="e-sp-acc">ACCENT COLOR</label><input id="e-sp-acc" type="color" value="${esc(sp.accent)}"></div>
        <div class="fld"><label for="e-sp-tr">TRACKS (ONE PER LINE: SONG — ARTIST, MAX 6)</label><textarea id="e-sp-tr" maxlength="600">${esc(rawTracks)}</textarea></div>
      </section>
      <section data-pane="instagram">
        ${txt("e-ig-h", "INSTAGRAM USERNAME", ig.handle, 40, "text", "@yourname")}
        ${txt("e-ig-u", "PROFILE LINK", ig.url, 300, "url", "https://instagram.com/yourname")}
        ${ig.posts.map((p, i) => `<div class="ed-post"><b>Post ${i + 1}</b>${imgField("ig" + i, "IMAGE", bestSrc(p.img))}${txt("e-ig-c" + i, "CAPTION", p.cap, 60)}${txt("e-ig-l" + i, "POST LINK (OPTIONAL)", p.link, 300, "url", "https://instagram.com/p/...")}</div>`).join("")}
      </section>
      <section data-pane="x">
        ${txt("e-x-h", "X USERNAME", x.handle, 40, "text", "@yourname")}
        ${txt("e-x-u", "PROFILE LINK", x.url, 300, "url", "https://x.com/yourname")}
        <div class="fld"><label for="e-x-t">POST TEXT</label><textarea id="e-x-t" maxlength="280">${esc(x.text)}</textarea></div>
        ${txt("e-x-w", "TIME LABEL", x.when, 12, "text", "2h")}
        ${imgField("x0", "POST IMAGE", bestSrc(x.img))}
        ${txt("e-x-l", "POST LINK (OPTIONAL)", x.link, 300, "url", "https://x.com/.../status/...")}
      </section>
      <section data-pane="snapchat">
        ${txt("e-sc-h", "SNAPCHAT USERNAME", sc.handle, 40, "text", "@yourname")}
        ${txt("e-sc-u", "ADD-ME LINK", sc.url, 300, "url", "https://www.snapchat.com/add/yourname")}
        ${txt("e-sc-s", "SNAPSCORE", String(sc.score), 12, "text", "128402")}
        ${txt("e-sc-k", "STREAK (DAYS)", String(sc.streak), 6, "text", "365")}
        ${sc.stories.map((st, i) => `<div class="ed-post"><b>Story ${i + 1}</b>${imgField("sc" + i, "IMAGE (TALL PHOTOS LOOK BEST)", bestSrc(st.img))}${txt("e-sc-c" + i, "CAPTION", st.cap, 60)}${txt("e-sc-w" + i, "TIME LABEL", st.when, 12, "text", "2h")}</div>`).join("")}
      </section>
      <section data-pane="discord">
        ${txt("e-d-h", "SERVER OR USERNAME", D.handle !== undefined ? D.handle : dc.handle, 40, "text", "Neon Dojo server")}
        ${txt("e-d-u", "INVITE LINK", D.url !== undefined ? D.url : dc.url, 300, "url", "https://discord.gg/...")}
        <div class="fld"><label for="e-d-b">SHORT DESCRIPTION</label><textarea id="e-d-b" maxlength="140">${esc(D.blurb !== undefined ? D.blurb : dc.blurb || "")}</textarea></div>
      </section>
      <section data-pane="contact">
        <p class="hint">Fill in the ones you want people to use. Empty ones show as "Coming soon".</p>
        ${txt("e-c-instagram", "INSTAGRAM USERNAME", cv("instagram"), 30, "text", "yourname")}
        ${txt("e-c-x", "X USERNAME", cv("x"), 15, "text", "yourname")}
        ${txt("e-c-gmail", "EMAIL", cv("gmail"), 80, "text", "you@gmail.com")}
        ${txt("e-c-snapchat", "SNAPCHAT USERNAME", cv("snapchat"), 30, "text", "yourname")}
        ${txt("e-c-whatsapp", "WHATSAPP NUMBER WITH COUNTRY CODE", cv("whatsapp"), 20, "text", "919876543210")}
        ${txt("e-c-discord", "DISCORD INVITE LINK", cv("discord"), 120, "url", "https://discord.gg/...")}
      </section>
      <section data-pane="collection"></section>`;
    colWork = JSON.parse(JSON.stringify(collectionList()));
    linkWork = JSON.parse(JSON.stringify(linksNow()));
    renderCol(); bindCol(); renderLinksPane(); bindLinks();
    $$("#edBody [data-file]").forEach(inp => inp.addEventListener("change", async () => {
      const f = inp.files && inp.files[0]; if (!f) return;
      try { const k = inp.dataset.file; const d = await shrinkImage(f, k === "spCover" ? 480 : k === "avatar" ? 400 : k === "cover" ? 1600 : 720, k === "cover" ? 450000 : 220000); pend[inp.dataset.file] = d; $(`[data-prev="${inp.dataset.file}"]`).src = d; Snd.fx("pop"); }
      catch (e) { $("#edNote").textContent = "That file isn't an image we can use. Try a JPG or PNG."; }
    }));
    $$("#edBody [data-reset]").forEach(b => b.addEventListener("click", () => {
      const k = b.dataset.reset; pend[k] = null;
      const def = k === "avatar" ? (Custom.target && !Custom.isHome ? FLEX_AVATAR : BASE.avatar) : k === "cover" ? BASE.cover : k === "spCover" ? CONFIG.spotify.cover : k === "x0" ? CONFIG.socials.find(s => s.id === "x").post.img : k.startsWith("sc") ? CONFIG.socials.find(s => s.id === "snapchat").stories[+k.slice(2)].img : CONFIG.socials.find(s => s.id === "instagram").posts[+k.slice(2)].img;
      $(`[data-prev="${k}"]`).src = bestSrc(def); Snd.fx("tick");
    }));
    show(tab);
  }
  function show(t) { tab = t; $$("#edBody [data-pane]").forEach(p => p.hidden = p.dataset.pane !== t); $$("#edTabs [data-tab]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.tab === t))); }
  function open(t) { pend = {}; tab = t || "profile"; build(); $("#edNote").textContent = Custom.cloud ? "Saved to your account. Log in on any phone or laptop and it's there." : "Changes save in this browser."; el().hidden = false; document.body.classList.add("locked-ed"); setTimeout(() => { const f = $(`#edBody [data-pane="${tab}"] input`); f && f.focus(); }, 30); }
  function close() { el().hidden = true; document.body.classList.remove("locked-ed"); }
  async function save() {
    const v = id => ($("#" + id) || {}).value || "";
    const lines = (id, max, len) => v(id).split("\n").map(t => t.trim().slice(0, len)).filter(Boolean).slice(0, max);
    const prev = Custom.settings || {};
    const badLink = linkWork.find(l => (l.u.trim() && l.u.trim() !== "https://" && !/^https?:\/\/[^\s<>"']+\.[^\s<>"']+/i.test(l.u.trim())) || (l.t.trim() && !/^https?:\/\/[^\s<>"']+\.[^\s<>"']+/i.test(l.u.trim())));
    if (badLink) { show("links"); $("#edNote").textContent = "Each link needs a full address that starts with https:// (for example https://youtube.com/@you)."; return; }
    const next = {
      ...prev,
      profile: { name: v("e-p-name").trim().slice(0, 24), heroName: v("e-p-hero").trim().slice(0, 14), kana: v("e-p-kana").trim().slice(0, 30), titles: lines("e-p-titles", 6, 40), birthday: v("e-p-bday").trim(), skin: v("e-p-skin") || "night", ticker: lines("e-p-ticker", 8, 30) },
      links: cleanLinks(linkWork),
      discord: { handle: v("e-d-h").trim().slice(0, 40), url: v("e-d-u").trim(), blurb: v("e-d-b").trim().slice(0, 140) },
      contact: Object.fromEntries(["instagram", "x", "gmail", "snapchat", "whatsapp", "discord"].map(id => [id, v("e-c-" + id).trim().replace(/^@/, "")])),
      spotify: { title: v("e-sp-title").trim(), subtitle: v("e-sp-sub").trim(), playlist: v("e-sp-pl").trim(), artist: v("e-sp-ar").trim(), url: v("e-sp-url").trim(), accent: v("e-sp-acc"), tracks: v("e-sp-tr").split("\n").map(t => t.trim()).filter(Boolean).slice(0, 6) },
      instagram: { handle: v("e-ig-h").trim(), url: v("e-ig-u").trim(), posts: [0, 1, 2].map(i => ({ cap: v("e-ig-c" + i).trim(), link: v("e-ig-l" + i).trim() })) },
      x: { handle: v("e-x-h").trim(), url: v("e-x-u").trim(), text: v("e-x-t").trim(), when: v("e-x-w").trim(), link: v("e-x-l").trim() },
      snapchat: { handle: v("e-sc-h").trim(), url: v("e-sc-u").trim(), score: v("e-sc-s").trim(), streak: v("e-sc-k").trim(), stories: [0, 1, 2, 3].map(i => ({ cap: v("e-sc-c" + i).trim(), when: v("e-sc-w" + i).trim() })) },
      collection: colWork.slice(0, colMax()).map(it => {
        const o = { id: String(it.id).slice(0, 40) };
        if (it.type === "uc") Object.assign(o, { type: "uc", amount: String(it.amount || "").slice(0, 16), unit: String(it.unit || "").slice(0, 16), game: String(it.game || "").slice(0, 30), icon: /^assets\//.test(it.icon || "") ? it.icon : "", logo: /^assets\//.test(it.logo || "") ? it.logo : "" });
        else Object.assign(o, { img: /^assets\//.test(it.img || "") ? it.img : "", alt: String(it.alt || "").slice(0, 80), meme: String(it.meme || "").slice(0, 40) });
        return o;
      })
    };
    const bad = [["e-sp-url", "Spotify link"], ["e-ig-u", "Instagram link"], ["e-x-u", "X link"], ["e-x-l", "X post link"], ["e-ig-l0", "Post 1 link"], ["e-ig-l1", "Post 2 link"], ["e-ig-l2", "Post 3 link"], ["e-sc-u", "Snapchat link"]].find(([id]) => v(id).trim() && !/^https?:\/\//i.test(v(id).trim()));
    if (bad) { $("#edNote").textContent = bad[1] + " needs to start with https://"; return; }
    if (v("e-d-u").trim() && !/^https:\/\//i.test(v("e-d-u").trim())) { show("discord"); $("#edNote").textContent = "Discord link needs to start with https://"; return; }
    if (next.profile.birthday && !BDAY_RE.test(next.profile.birthday)) { show("profile"); $("#edNote").textContent = "Birthday should look like 11-20 (month-day), or leave it empty."; return; }
    const cBad = { instagram: "Instagram username can only use letters, numbers, dots and _", x: "X username can only use letters, numbers and _ (15 max)", gmail: "That email doesn't look right", snapchat: "Snapchat username doesn't look right", whatsapp: "WhatsApp number: country code + number, digits only (like 919876543210)", discord: "Discord invite should look like https://discord.gg/yourcode" };
    const cWrong = Object.keys(cBad).find(id => next.contact[id] && !CONTACT_LINK[id](next.contact[id]));
    if (cWrong) { show("contact"); $("#edNote").textContent = cBad[cWrong]; return; }
    $("#edSave").disabled = true; $("#edNote").textContent = Object.values(pend).some(Boolean) && Custom.cloud ? "Saving… uploading your photos" : "Saving…";
    const r = await Custom.save(next, pend);
    $("#edSave").disabled = false;
    if (r === "error") { $("#edNote").textContent = Custom.cloud ? (Cloud.user ? "Couldn't save. " + friendlyError(Custom.lastError) : "Log in again to save your changes.") : "Couldn't save. Only the page owner can make changes."; return; }
    if (r === "full") { $("#edNote").textContent = "This browser is out of space for photos. Remove a few, or use the online version of your page."; return; }
    Snd.fx("chime"); close(); toast(r === "cloud" ? "Saved ✓ Your page is updated for everyone" : "Saved in this browser");
  }
  function init() {
    $("#edClose").addEventListener("click", () => { Snd.fx("tick"); close(); });
    $("#edCancel").addEventListener("click", () => { Snd.fx("tick"); close(); });
    $("#edSave").addEventListener("click", save);
    $$("#edTabs [data-tab]").forEach(b => b.addEventListener("click", () => { Snd.fx("tick"); show(b.dataset.tab); }));
    el().addEventListener("click", e => { if (e.target === el()) close(); });
    addEventListener("keydown", e => { if (e.key === "Escape" && !el().hidden) close(); });
  }
  return { open, close, init };
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
const colMax = () => Math.max(1, CONFIG.collectionLimit || 9);
function collectionList() { const S = Custom.settings || {}; return (Array.isArray(S.collection) ? S.collection : CONFIG.collection).slice(0, colMax()); }
function collectionView() {
  const M = Custom.media || {};
  return collectionList().map(it => ({ ...it, img: M["col_" + it.id] || it.img || "", icon: M["col_" + it.id + "_icon"] || it.icon || "", logo: M["col_" + it.id + "_logo"] || it.logo || "" }))
    .filter(it => it.type === "uc" || it.img);
}
function renderVault() {
  const items = collectionView();
  $("#vaultDemo").hidden = !Custom.demo;
  $("#grid").innerHTML = items.map(it => {
    const media = it.type === "uc"
      ? `<div class="uc">${it.icon ? `<img class="uc-ic" src="${esc(it.icon)}" alt="UC">` : ""}<div class="uc-amt">${esc(it.amount)}</div><div class="uc-unit">${esc(it.unit)}</div>${it.logo ? `<img class="uc-logo" src="${esc(it.logo)}" alt="${esc(it.game)}">` : `<div class="uc-game">${esc(it.game)}</div>`}</div>`
      : `<img ${imgSrc(it.img, "(max-width: 639px) 31vw, 370px")} alt="${esc(it.alt || "")}" loading="lazy" decoding="async">${it.meme ? `<span class="meme">${esc(it.meme)}</span>` : ""}`;
    const label = it.type === "uc" ? `${it.amount} ${it.unit}` : (it.alt || it.id);
    const pt = pinnedText(it);
    const pin = pt ? `<button class="pin-cm" type="button" aria-label="Pinned comment: ${esc(pt)}. Open comments"><p>${esc(pt)}</p></button>` : "";
    return `<article class="card" data-id="${esc(it.id)}"><div class="ci${it.type === "uc" ? " is-uc" : ""}">${media}${pin}</div>
      <div class="react" role="group" aria-label="Likes and comments for ${esc(label)}"><button class="rx rx-like" type="button" data-rx="like" aria-pressed="false" aria-label="Like">${HEART}<em>0</em></button><button class="rx rx-cm" type="button" aria-label="Open comments">${BUBBLE}<em>${compact(commentCount(it))}</em></button></div></article>`;
  }).join("");
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
    const pinned = pinsNow()[it.id], list = demoComments(it), gone = removedFor(it).length;
    $("#cmTip").innerHTML = `<span>Tip: hold a comment or tap ⋯ to pin or remove it.</span>${gone ? `<button type="button" id="cmRestore">Restore ${gone} removed</button>` : ""}`;
    const sorted = list.slice().sort((x, y) => (y.who === pinned) - (x.who === pinned));   // pinned comment goes first
    $("#cmList").innerHTML = sorted.length ? sorted.map(c => { const isP = c.who === pinned, on = liked.has(it.id + "|" + c.who);
      return `<li class="${isP ? "is-pinned" : ""}" data-key="${esc(c.who)}">${avatarOf(c.who)}<div class="cm-t"><b>${esc(c.who)}</b>${esc(c.text)}<small>${c.ago} · ${compact(c.likes + (on ? 1 : 0))} likes${isP ? `<span class="cm-pinned">📌 Pinned</span>` : ""}</small></div><button class="cm-h" type="button" aria-pressed="${on}" aria-label="Like comment">${HEART}</button><button class="cm-more" type="button" aria-label="Options for comment by ${esc(c.who)}">⋯</button></li>`; }).join("")
      : `<li class="cm-empty">No comments to show.</li>`;
    $("#cmCompose").hidden = true; $("#cmFoot").hidden = false;
  }
  function paintReal(loading) {
    const it = curItem(); if (!it) return; head(it);
    const pinned = String(pinsNow()[it.id] || "");
    $("#cmTip").innerHTML = `<span>Tip: hold a comment or tap ⋯ to pin it on the photo or delete it.</span>`;
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
    if (realMode()) loadReal(); else if (!Custom.demo) { head(curItem()); $("#cmTip").innerHTML = ""; $("#cmList").innerHTML = `<li class="cm-empty">Comments are coming soon on this page.</li>`; $("#cmCompose").hidden = true; $("#cmFoot").hidden = false; }
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
    Snd.fx("unpop"); saveCm({ cmHidden: all, pins }, "Comment removed. You can restore it at the top.");
  }
  async function deleteReal(c) {
    try {
      await Live.deleteComment(c.id, current); real = real.filter(x => x.id !== c.id); Snd.fx("unpop"); paintReal(false); paintReactions();
      if (String(pinsNow()[current]) === String(c.id)) { const pins = { ...pinsNow() }; delete pins[current]; saveCm({ pins }); } else renderVault();
      toast("Comment deleted");
    } catch (e) { toast(friendlyError(e)); }
  }
  function restoreAll() { const all = { ...(cmSettings().cmHidden || {}) }; delete all[current]; Snd.fx("pop"); saveCm({ cmHidden: all }, "Removed comments are back"); }
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
    $("#cmTip").addEventListener("click", e => { if (e.target.id === "cmRestore") restoreAll(); });
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
    as.hidden = !real;
    if (real) as.innerHTML = me ? `${avatarOf(me.username, me.avatar_url)}<span>Signing as <b>${esc(me.display_name || me.username)}</b> (@${esc(me.username)})</span>` : `<span>You need a free account to sign, so nobody can pretend to be you.</span>`;
    if (!target) $("#gbSend").textContent = real && !me ? "Log in to sign ✍️" : "Sign guestbook ✍️";
    $("#gbSub").textContent = real ? `Say something to ${ownerName()}. Everyone can see it.` : "Say something. Keep it clean, the filter is watching.";
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
    $("#gbMsg").placeholder = "Say something about this photo…"; $("#gbSend").textContent = "Send reply ↩";
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
    $("#gbMsg").placeholder = "Reply to " + name + "…"; $("#gbSend").textContent = "Send reply ↩";
    focusForm();
  }
  function cancel() { target = null; $("#gbReplying").hidden = true; $("#gbReplyThumb").hidden = true; $("#gbReplyThumb").style.display = ""; $("#gbMsg").placeholder = "Your setup is insane bro 🔥"; paintForm(); }
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
function renderShare() {
  const url = siteLink(); $("#linkInput").value = url;
  try { const h = new URL(url).hostname; $("#ogDomain").textContent = h; $$(".og-d").forEach(e => e.textContent = h); } catch (e) {}
  const ON = CONFIG.heroName || CONFIG.name, title = ON.charAt(0) + ON.slice(1).toLowerCase() + "'s Neon Vault";
  $("#ogTitle").textContent = title; $$(".og-t").forEach(e => e.textContent = title);
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
  $$(".skin").forEach(b => b.addEventListener("click", () => { skinTouched = true; applySkin(b.dataset.skin, true); }));
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
  Editor.init(); Stories.init(); Comments.init(); GetSite.init();
  Custom.on(applyBasics); Custom.on(renderSocials); Custom.on(renderVault); Custom.on(Guestbook.refresh); Custom.on(onPage); Custom.on(() => { if (realPage()) Live.loadPinned(); });
  Live.on(why => {
    if (why === "state" || why === "pinned") renderVault(); else paintReactions();
    if (why === "state") Guestbook.refresh();
    paintViews();
  });
  Cloud.on(() => { if (Live.live) Live.loadMine(); Guestbook.paintForm(); if (realPage() && lastGb.length) renderGuestbook(lastGb); });
  OnceFx.prep();
  Custom.init();
  ["#editSocials", "#editSocials2"].forEach(id => $(id).addEventListener("click", () => { Snd.fx("tick"); Editor.open("spotify"); }));
  $("#editCollection").addEventListener("click", () => { Snd.fx("tick"); Editor.open("collection"); });
  $("#editLinks").addEventListener("click", () => { Snd.fx("tick"); Editor.open("links"); });
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
  const RESERVED = new Set(["admin", "administrator", "flexippo", "support", "help", "root", "system", "moderator", "mod", "official", "staff", "null", "undefined", "api", "www", "login", "signup", "assets", "index", "supabase"]);
  let pendingChat = null, pendingEdit = false, pendingThen = null;

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

  /* ---------- login / sign up / username pop-up ---------- */
  const modal = $id("authModal");
  let authMode = "login", lastFocus = null;
  function say(id, t, ok) { const m = $id(id); if (m) { m.textContent = t || ""; m.className = "auth-msg" + (ok ? " ok" : ""); } }
  function showView(v) {
    $$("#authModal .auth-view").forEach(x => { x.hidden = x.dataset.view !== v; });
    modal.hidden = false;
    setTimeout(() => { const f = $(`#authModal [data-view="${v}"] input:not([readonly])`); if (f) try { f.focus({ preventScroll: true }); } catch (e) {} }, 60);
  }
  function openModal(v) { if (modal.hidden) lastFocus = document.activeElement; showView(v); }
  function closeModal() {
    modal.hidden = true; ["authMsg", "forgotMsg", "newPassMsg", "setupMsg"].forEach(id => say(id, ""));
    if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
  }
  function setMode(m) {
    authMode = m;
    $id("tabLogin").classList.toggle("on", m === "login"); $id("tabSignup").classList.toggle("on", m === "signup");
    $id("tabLogin").setAttribute("aria-selected", String(m === "login")); $id("tabSignup").setAttribute("aria-selected", String(m === "signup"));
    $id("authGo").textContent = m === "login" ? "Log in" : "Create account";
    $id("authPass").autocomplete = m === "login" ? "current-password" : "new-password";
    $id("authForgot").hidden = m !== "login"; say("authMsg", "");
  }
  function openAuth(mode, why) {
    Cloud.ensure().catch(() => {});      // start downloading the login part now, so it's ready when they press the button
    setMode(mode || "login");
    $id("authTitle").textContent = mode === "signup" ? "Make your own page" : "Welcome back";
    $id("authSub").textContent = why || (mode === "signup" ? "It's free. Get your own link, change anything on it, and chat with friends." : "Log in to edit your page and chat with friends.");
    openModal("auth");
  }
  function prefillSetup(name) {
    const u = $id("setupUser");
    if (!u.value) {
      const fromEmail = Cloud.user && Cloud.user.email ? Cloud.user.email.split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20) : "";
      u.value = name || (Custom.missing && !Custom.failed ? Custom.missing : "") || (fromEmail.length >= 3 ? fromEmail : "");
    }
    checkName();
  }
  function openSetup(name) { prefillSetup(name); openModal("setup"); }
  // something needs an account (like, comment, guestbook): ask, then carry on where they were
  function ask(why, then) {
    pendingThen = then || null;
    if (Cloud.user && !Cloud.me) { openSetup(); return; }
    openAuth("signup", why);
  }

  $id("authClose").addEventListener("click", () => { pendingThen = null; closeModal(); });
  modal.addEventListener("click", e => { if (e.target === modal) { pendingThen = null; closeModal(); } });
  addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) { e.stopPropagation(); pendingThen = null; closeModal(); } }, true);
  $id("tabLogin").addEventListener("click", () => setMode("login"));
  $id("tabSignup").addEventListener("click", () => setMode("signup"));
  $id("authForgot").addEventListener("click", () => { $id("forgotEmail").value = $id("authEmail").value.trim(); showView("forgot"); });
  $id("forgotBack").addEventListener("click", () => showView("auth"));

  $id("authForm").addEventListener("submit", async e => {
    e.preventDefault();
    const email = $id("authEmail").value.trim(), password = $id("authPass").value, btn = $id("authGo");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say("authMsg", "Please type a real email.");
    if (password.length < 6) return say("authMsg", "Password needs at least 6 characters.");
    btn.disabled = true; say("authMsg", "One moment…", true);
    try {
      if (!(await ensureOrSay("authMsg"))) return;
      if (authMode === "signup") {
        const { data, error } = await Cloud.sb.auth.signUp({ email, password, options: { emailRedirectTo: BASE.siteUrl } });
        if (error) throw error;
        if (!data || !data.session) { say("authMsg", "Account created! Check your email and tap the confirm link, then log in here.", true); return; }
      } else {
        const { error } = await Cloud.sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      $id("authPass").value = "";
      afterLogin(await Cloud.refresh());
    } catch (err) { say("authMsg", friendlyError(err)); }
    finally { btn.disabled = false; }
  });
  function afterLogin(me) {
    if (!me) {
      if (Cloud.notSetUp) { closeModal(); toast("Accounts are still being set up. Try again soon."); return; }
      openSetup(); return;
    }
    closeModal(); toast("Hey @" + me.username + " 👋");
    if (pendingChat) { const p = pendingChat; pendingChat = null; Chat.openWith(p); return; }
    if (pendingThen) { const f = pendingThen; pendingThen = null; try { f(); } catch (e) {} return; }   // stay here and finish what they started
    const onMine = Custom.target && Custom.target.id === me.id;
    if (pendingEdit && onMine) { pendingEdit = false; Editor.open("profile"); return; }
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
      if (!Cloud.me) openSetup();
    } catch (err) { say("newPassMsg", friendlyError(err)); }
    finally { btn.disabled = false; }
  });

  // username: letters, numbers, _ only; live "available?" check
  let checkT = 0, checkSeq = 0;
  function hint(t, cls) { const h = $id("setupHint"); h.textContent = t; h.className = "u-hint" + (cls ? " " + cls : ""); }
  function checkName() {
    const el = $id("setupUser"), v = el.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
    if (v !== el.value) el.value = v;
    clearTimeout(checkT); const seq = ++checkSeq;
    if (!v) return hint("3 to 20 letters, numbers or _");
    if (v.length < 3) return hint("At least 3 characters", "bad");
    if (RESERVED.has(v)) return hint("That one is reserved. Try another.", "bad");
    hint("Checking…");
    checkT = setTimeout(async () => {
      try { const free = await Cloud.usernameFree(v); if (seq === checkSeq) hint(free ? "✓ Available: flexippo.com/" + v : "✕ Taken. Try another.", free ? "ok" : "bad"); }
      catch (e) { if (seq === checkSeq) hint("Couldn't check right now"); }
    }, 350);
  }
  $id("setupUser").addEventListener("input", checkName);
  $id("setupForm").addEventListener("submit", async e => {
    e.preventDefault();
    const u = $id("setupUser").value.trim().toLowerCase(), nm = $id("setupName").value.trim().slice(0, 24) || u, btn = $id("setupGo");
    if (!USER_RE.test(u)) return say("setupMsg", "Your username needs 3 to 20 letters, numbers or _.");
    if (RESERVED.has(u)) return say("setupMsg", "That username is reserved. Try another.");
    if (!(await ensureOrSay("setupMsg"))) return;
    if (!Cloud.user) { showView("auth"); return say("authMsg", "Please log in again."); }
    btn.disabled = true; say("setupMsg", "Creating your page…", true);
    try {
      const me = await Cloud.createMe(u, nm);
      closeModal(); toast("Your page is ready: flexippo.com/" + me.username + " 🎉");
      if (pendingChat) { const p = pendingChat; pendingChat = null; Chat.openWith(p); }
      else if (pendingThen) { const f = pendingThen; pendingThen = null; try { f(); } catch (err) {} }
      else go(me.username, "#edit");
    } catch (err) {
      const m = String(err && err.message || "");
      say("setupMsg", err && err.code === "23505" ? (m.includes("username") ? "That username is taken. Try another." : "You already have a page. Refresh this page.")
        : err && err.code === "23514" ? "That username isn't allowed. Try another." : friendlyError(err));
    } finally { btn.disabled = false; }
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
    if (Custom.owner) { closeModal(); Editor.open("profile"); } else go(Cloud.me.username, "#edit");
  });
  $id("accChats").addEventListener("click", () => { closeModal(); Chat.open(); });
  $id("accHome").addEventListener("click", () => go(""));
  $id("accOut").addEventListener("click", async () => {
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
    else if (T && Custom.owner) h = `<button class="pa-b" type="button" data-act="edit">✎ Edit my page</button><button class="pa-b ghost" type="button" data-act="share">🔗 Share my link</button>`;
    else if (T && !Custom.isHome) h = `<button class="pa-b" type="button" data-act="msg">💬 Message ${esc(nameOf(T))}</button><button class="pa-b ghost" type="button" data-act="sharep">🔗 Share</button>`;
    box.innerHTML = h;
  }
  $id("pageActs").addEventListener("click", e => {
    const b = e.target.closest("button[data-act]"); if (!b) return;
    Snd.fx("tick");
    const a = b.dataset.act, T = Custom.target;
    if (a === "edit") Editor.open("profile");
    else if (a === "share" && T) shareLink(Cloud.shareLink(T.username), "Check out my page 👀");
    else if (a === "sharep" && T) shareLink(Cloud.shareLink(T.username), "Check out " + nameOf(T) + "'s page 👀");
    else if (a === "msg" && T) Chat.openWith(person(T));
    else if (a === "mine") { const me = Cloud.me || Cloud.cachedMe; if (me) go(me.username); }
    else if (a === "claim") { if (Cloud.user) openSetup(Custom.missing); else { $id("setupUser").value = Custom.missing; openAuth("signup", "Sign up to claim flexippo.com/" + Custom.missing); } }
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
    addEventListener("keydown", e => { if (e.key === "Escape" && isOpen && modal.hidden && $("#editor").hidden) { if (!$id("chatMenu").hidden) hideMenu(); else close(); } });
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && Cloud.me) poll(); });
    Cloud.on(onAuth);
    return { open, close, openWith, onAuth };
  })();

  /* ---------- start ---------- */
  const waitCustom = () => new Promise(r => { if (Custom.loaded) r(); else Custom.on(r); });
  async function afterCloud() {
    await waitCustom();
    paintBtn(); paintActs(); Chat.onAuth();
    if (AUTH_HASH_ERROR) toast(/expired|invalid/i.test(AUTH_HASH_ERROR) ? "That email link has expired. Ask for a new one." : AUTH_HASH_ERROR);
    if (AUTH_RECOVERY && Cloud.user) openModal("newpass");
    else if (AUTH_IN_URL && Cloud.user && !Cloud.me && !Cloud.notSetUp) openSetup();   // just confirmed their email: pick a username next
    Cloud.on(why => { if (why === "recovery") openModal("newpass"); });
    if (Custom.missing && !Custom.failed) toast("There's no page called @" + Custom.missing + " yet");
    if (location.hash === "#edit") {
      try { history.replaceState(history.state, "", location.pathname + location.search); } catch (e) {}
      if (Custom.owner) setTimeout(() => Editor.open("profile"), 450);
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
