/* flexippo.com editor. Only downloaded when someone opens their own page.
   The page itself is the editor: tap your name, bio or photo to change it, tap a tile to resize, move, edit or delete it.
   Everything saves by itself a moment after each change. */
(() => {
"use strict";
let FX, $, $$, esc, icon, toast, sheet, say;

const S = {
  row: null, pg: null, user: null,
  local: {},          // photos still uploading: tile id (or "avatar") -> a temporary picture on this phone
  busy: {},           // tile id -> true while its photo uploads
  uploads: 0,
  sel: "",            // the selected tile
  preview: false,
  dirty: false, saving: false, again: false, timer: 0, retry: 0, failCount: 0,
  ogTimer: 0, ogBusy: false,
  views: null
};

/* ======================= start ======================= */
function start(api) {
  FX = api; ({ $, $$, esc, icon, toast, sheet, say } = FX);
  S.row = FX.State.row; S.user = FX.Cloud.user;
  S.pg = JSON.parse(JSON.stringify(FX.State.pg));
  FX.setTheme(S.pg.theme);
  render();
  wire();
  loadViews();
  if (/#new\b/.test(location.hash)) {
    history.replaceState(null, "", location.pathname);
    toast("Your page is live. Add your first links.", null, 4200);
  }
  if (S.pg.fresh && S.pg.tiles.length) toast("Your page moved to the new flexippo. Everything you had is still here.", null, 5200);
  addEventListener("beforeunload", e => { if (S.dirty || S.saving || S.uploads) { e.preventDefault(); e.returnValue = ""; } });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && S.dirty) save(); });
}

/* ======================= drawing ======================= */
function render() {
  const app = $("#app");
  if (S.preview) {
    app.innerHTML = FX.pageHtml(S.pg, { local: S.local }) + `<button class="btn btn-lime back-edit" type="button" data-act="back">${icon("pencil")}Back to editing</button>`;
    FX.setTheme(S.pg.theme);
    return;
  }
  const pg = S.pg;
  app.innerHTML = `<div class="pg ed" data-theme="${esc(pg.theme)}"><div class="pg-in">
    <header class="pf">
      <button class="av-btn" type="button" data-act="avatar" aria-label="Change your photo">${FX.avatarHtml(pg, { local: S.local })}<span class="av-cam">${icon("camera")}</span></button>
      <input class="nm nm-in" id="edName" value="${esc(pg.name)}" placeholder="Your name" maxlength="40" aria-label="Your name" autocomplete="off">
      <textarea class="bio bio-in" id="edBio" placeholder="Add a short bio" maxlength="160" rows="1" aria-label="Your bio">${esc(pg.bio)}</textarea>
      <div class="own"><button type="button" class="chip" data-act="share">${icon("link")}flexippo.com/${esc(S.row.username)}</button><span class="chip chip-v" id="edViews" hidden></span></div>
    </header>
    <div class="tiles" id="edTiles"></div>
  </div></div>
  <div class="dock" id="dock" role="toolbar" aria-label="Edit your page"></div>
  <span class="savechip" id="saveChip" role="status" aria-live="polite"></span>
  <input type="file" id="edFile" accept="image/*" hidden multiple>`;
  renderTiles(); renderDock(); showViews(); autosize($("#edBio"));
  FX.setTheme(pg.theme);
}
function renderTiles() {
  const box = $("#edTiles"); if (!box) return;
  const add = `<button class="tile add-tile s-s" type="button" data-act="add">${icon("plus")}<span>Add</span></button>`;
  const quick = S.pg.tiles.length ? "" : `<div class="qs"><b>Add your first links</b><p>Tap an app and type your username.</p><div class="qs-apps">${["instagram", "snapchat", "youtube", "whatsapp", "spotify", "x"].map(k => appBtn(k)).join("")}</div></div>`;
  box.innerHTML = quick + FX.tilesHtml(S.pg, { edit: true, local: S.local, busy: S.busy, addTile: add });
  if (S.sel) { const el = box.querySelector(`[data-id="${CSS.escape(S.sel)}"]`); if (el) el.classList.add("sel"); else S.sel = ""; }
}
function appBtn(k) {
  const p = FX.P[k];
  return `<button type="button" class="app" data-app="${k}"><span class="ico" style="--b:${p.bg};--bf:${p.fg || "#fff"}">${icon(p.i || k)}</span><span>${esc(p.n)}</span></button>`;
}
function tileOf(id) { return S.pg.tiles.find(t => t.id === id) || null; }
function renderDock() {
  const d = $("#dock"); if (!d) return;
  const t = S.sel && tileOf(S.sel);
  if (t) {
    const idx = S.pg.tiles.indexOf(t), last = S.pg.tiles.length - 1;
    const sizes = t.t === "head" ? "" : `<div class="dk-sizes" role="group" aria-label="Tile size">${[["s", "Small"], ["w", "Wide"], ["t", "Tall"], ["l", "Big"]].map(([s, n]) => `<button type="button" data-size="${s}" aria-label="${n}" aria-pressed="${t.s === s}"><span class="shp shp-${s}"></span></button>`).join("")}</div><span class="dk-sep"></span>`;
    d.className = "dock dock-tile";
    d.innerHTML = `${sizes}<button type="button" data-act="left" aria-label="Move earlier"${idx === 0 ? " disabled" : ""}>${icon("left")}</button><button type="button" data-act="right" aria-label="Move later"${idx === last ? " disabled" : ""}>${icon("right")}</button>
      <button type="button" data-act="edit" aria-label="Edit">${icon("pencil")}</button><button type="button" data-act="delete" aria-label="Delete">${icon("trash")}</button><span class="dk-sep"></span><button type="button" class="dk-done" data-act="deselect">Done</button>`;
    return;
  }
  d.className = "dock";
  d.innerHTML = `<button type="button" class="dk-add" data-act="add">${icon("plus")}<span>Add</span></button>
    <button type="button" data-act="theme">${icon("palette")}<span>Theme</span></button>
    <button type="button" data-act="share">${icon("share")}<span>Share</span></button>
    <button type="button" data-act="preview">${icon("eye")}<span>Preview</span></button>
    <button type="button" data-act="more">${icon("more")}<span>More</span></button>`;
}
function select(id) {
  S.sel = id || "";
  $$("#edTiles .sel").forEach(e => e.classList.remove("sel"));
  if (S.sel) { const el = $(`#edTiles [data-id="${CSS.escape(S.sel)}"]`); if (el) el.classList.add("sel"); }
  renderDock();
}
function autosize(ta) { if (!ta) return; ta.style.height = "auto"; ta.style.height = ta.scrollHeight + "px"; }

/* ======================= events ======================= */
function wire() {
  const app = $("#app");
  app.addEventListener("click", e => {
    const a = e.target.closest("[data-act]");
    if (a && !a.disabled) return act(a.dataset.act, a);
    const sz = e.target.closest("[data-size]");
    if (sz) return resize(sz.dataset.size);
    const ap = e.target.closest("[data-app]");
    if (ap) return askApp(ap.dataset.app);
    const tile = e.target.closest("#edTiles [data-id]");
    if (tile) {
      const id = tile.dataset.id, t = tileOf(id);
      if (t && t.t === "photo" && !S.pg.media["p_" + id] && !S.local[id]) { select(id); return pickPhotos(id); }
      if (S.sel === id) return editTile(id);
      return select(id);
    }
    if (S.sel && !e.target.closest("#dock")) select("");
  });
  app.addEventListener("keydown", e => {
    const tile = e.target.closest && e.target.closest("#edTiles [data-id]");
    if (tile && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); tile.click(); }
    if (e.key === "Escape" && S.sel) select("");
  });
  app.addEventListener("input", e => {
    if (e.target.id === "edName") { S.pg.name = FX.clip(e.target.value, 40); changed(); }
    if (e.target.id === "edBio") { S.pg.bio = FX.clip(e.target.value, 160, true); autosize(e.target); changed(); }
  });
  app.addEventListener("keydown", e => { if (e.target.id === "edName" && e.key === "Enter") { e.preventDefault(); e.target.blur(); } });
  app.addEventListener("change", e => {
    if (e.target.id !== "edFile") return;
    const files = Array.from(e.target.files || []); const target = e.target.dataset.for || ""; e.target.value = "";
    if (files.length) gotPhotos(files, target);
  });
}
function act(name, el) {
  switch (name) {
    case "add": return addSheet();
    case "theme": return themeSheet();
    case "share": return shareSheet();
    case "preview": S.preview = true; S.sel = ""; render(); scrollTo(0, 0); return;
    case "back": S.preview = false; render(); return;
    case "more": return moreSheet();
    case "avatar": return pickPhotos("avatar");
    case "left": return move(-1);
    case "right": return move(1);
    case "edit": return editTile(S.sel);
    case "delete": return removeTile(S.sel);
    case "deselect": return select("");
  }
}

/* ======================= changing tiles ======================= */
function addTile(t, opts = {}) {
  if (S.pg.tiles.length >= FX.MAX_TILES) { toast(`A page can have up to ${FX.MAX_TILES} tiles.`); return null; }
  S.pg.tiles.push(t);
  if (S.sel) select("");
  renderTiles(); changed();
  if (!opts.quiet) {      // show where it went (the bar keeps "Add" so the next one is one tap away)
    const el = $(`#edTiles [data-id="${CSS.escape(t.id)}"]`);
    if (el) { el.classList.add("flash"); el.scrollIntoView({ block: "center", behavior: FX.motionOK ? "smooth" : "auto" }); setTimeout(() => el.classList.remove("flash"), 1600); }
  }
  return t;
}
// the first time something is added, say how to change it
function tip(text) {
  if (S.tip || FX.LS.get("tipTile", 0)) return text;
  S.tip = 1; FX.LS.set("tipTile", 1);
  return text + ". Tap it to change its size or move it.";
}
function resize(s) {
  const t = tileOf(S.sel); if (!t || t.t === "head" || t.s === s) return;
  t.s = s; renderTiles(); renderDock(); changed();
}
function move(dir) {
  const i = S.pg.tiles.findIndex(t => t.id === S.sel), j = i + dir;
  if (i < 0 || j < 0 || j >= S.pg.tiles.length) return;
  const a = S.pg.tiles; [a[i], a[j]] = [a[j], a[i]];
  renderTiles(); renderDock(); changed();
  const el = $(`#edTiles [data-id="${CSS.escape(S.sel)}"]`); if (el) el.scrollIntoView({ block: "nearest" });
}
function removeTile(id) {
  const i = S.pg.tiles.findIndex(t => t.id === id); if (i < 0) return;
  const t = S.pg.tiles[i], key = "p_" + id, photo = S.pg.media[key];
  S.pg.tiles.splice(i, 1); delete S.pg.media[key]; delete S.local[id];
  S.sel = ""; renderTiles(); renderDock(); changed();
  toast(t.t === "head" ? "Heading deleted" : "Tile deleted", { label: "Undo", run: () => {
    S.pg.tiles.splice(Math.min(i, S.pg.tiles.length), 0, t); if (photo) S.pg.media[key] = photo;
    renderTiles(); changed();
  } });
  if (photo) setTimeout(() => { if (!tileOf(id)) dropFiles([photo]); }, 9000);    // after the Undo has gone
}

/* ======================= saving ======================= */
function changed() {
  S.dirty = true; showSave("");
  clearTimeout(S.timer); S.timer = setTimeout(save, 900);
  queueOg();
}
function showSave(text, bad) {
  const c = $("#saveChip"); if (!c) return;
  c.textContent = text; c.classList.toggle("bad", !!bad); c.classList.toggle("in", !!text);
  clearTimeout(c.__t); if (text === "Saved") c.__t = setTimeout(() => c.classList.remove("in"), 1600);
}
function payload() {
  const pg = S.pg, used = new Set(["avatar", "og"]);
  pg.tiles.forEach(t => { if (t.t === "photo") used.add("p_" + t.id); });
  const media = {}; Object.keys(pg.media).forEach(k => { if (used.has(k)) media[k] = pg.media[k]; });
  const tiles = pg.tiles.map(t => { const o = { id: t.id, t: t.t }; if (t.t !== "head") o.s = t.s; ["u", "k", "l", "cp", "cap", "x", "c"].forEach(k => { if (t[k]) o[k] = t[k]; }); return o; });
  const settings = { v: 3, profile: { name: pg.name, bio: pg.bio }, theme: pg.theme, tiles };
  if (pg.og) settings.og = pg.og;
  return { settings, media, avatar_url: media.avatar || null, display_name: (pg.name || S.row.username).slice(0, 40) };
}
async function save() {
  clearTimeout(S.timer);
  if (S.saving) { S.again = true; return; }
  if (S.uploads) { S.timer = setTimeout(save, 700); return; }     // wait for photos to finish uploading
  if (!S.dirty) return;
  S.saving = true; S.dirty = false; showSave("Saving…");
  try {
    const { error } = await FX.Cloud.sb.from("profiles").update(payload()).eq("id", S.row.id).select("id").single();
    if (error) throw error;
    S.failCount = 0; showSave("Saved");
  } catch (e) {
    S.dirty = true; S.failCount++;
    const m = FX.friendlyError(e);
    showSave(/logged out/.test(m) ? "Log in again to save" : "Not saved. Trying again…", true);
    if (S.failCount === 1 || /logged out/.test(m)) toast(m);
    if (/logged out/.test(m)) { FX.Auth.open("login"); }
    else S.timer = setTimeout(save, Math.min(30000, 3000 * S.failCount));
  } finally {
    S.saving = false;
    if (S.again) { S.again = false; if (S.dirty) save(); }
  }
}
function dropFiles(urls) {
  const mine = S.row.id + "/";
  const paths = urls.map(u => (typeof u === "string" && u.startsWith(FX.MEDIA) ? decodeURIComponent(u.slice(FX.MEDIA.length).split("?")[0]) : "")).filter(p => p.startsWith(mine));
  if (paths.length) FX.Cloud.sb.storage.from("media").remove(paths).then(() => {}, () => {});
}

/* ======================= photos ======================= */
function pickPhotos(target) {
  const f = $("#edFile"); if (!f) return;
  f.dataset.for = target || ""; f.multiple = !target; f.click();
}
async function gotPhotos(files, target) {
  files = files.filter(f => /^image\//.test(f.type) || /\.(jpe?g|png|webp|gif|heic|heif|avif)$/i.test(f.name)).slice(0, 8);
  if (!files.length) return toast("Pick a photo (JPG or PNG).");
  if (target === "avatar") return setAvatar(files[0]);
  if (target) return putPhoto(target, files[0]);
  let first = null;
  files.forEach((file, i) => {
    const t = addTile({ id: FX.uid(), t: "photo", s: i === 0 && !S.pg.tiles.some(x => x.t === "photo") ? "w" : "s", cap: "", u: "" }, { quiet: i > 0 });
    if (t) { if (!first) first = t; putPhoto(t.id, file); }
  });
}
async function putPhoto(id, file) {
  S.uploads++; S.busy[id] = true;
  try {
    const blob = await shrink(file, 1400);
    S.local[id] = URL.createObjectURL(blob); renderTiles();
    const old = S.pg.media["p_" + id];
    const url = await upload("p", blob);
    if (!tileOf(id)) { dropFiles([url]); return; }      // deleted while uploading
    S.pg.media["p_" + id] = url;
    if (old) dropFiles([old]);
    changed();
  } catch (e) {
    toast(e && e.message === "not_image" ? "That file couldn't be opened. Try a JPG or PNG photo." : FX.friendlyError(e));
    const t = tileOf(id); if (t && !S.pg.media["p_" + id]) { S.pg.tiles.splice(S.pg.tiles.indexOf(t), 1); if (S.sel === id) S.sel = ""; }
  } finally {
    S.uploads--; delete S.busy[id];
    setTimeout(() => { if (S.local[id] && S.pg.media["p_" + id]) { URL.revokeObjectURL(S.local[id]); delete S.local[id]; } renderTiles(); renderDock(); }, 1200);
    renderTiles(); renderDock();
  }
}
async function setAvatar(file) {
  S.uploads++;
  const av = $(".av-btn");
  if (av) av.classList.add("is-busy");
  try {
    const blob = await shrink(file, 640, true);
    S.local.avatar = URL.createObjectURL(blob); refreshAvatar();
    const old = S.pg.media.avatar, url = await upload("avatar", blob);
    S.pg.media.avatar = url; if (old) dropFiles([old]);
    changed();
  } catch (e) { delete S.local.avatar; refreshAvatar(); toast(e && e.message === "not_image" ? "That file couldn't be opened. Try a JPG or PNG photo." : FX.friendlyError(e)); }
  finally { S.uploads--; const a = $(".av-btn"); if (a) a.classList.remove("is-busy"); }
}
function refreshAvatar() { const b = $(".av-btn"); if (b) b.innerHTML = FX.avatarHtml(S.pg, { local: S.local }) + `<span class="av-cam">${icon("camera")}</span>`; }
function shrink(file, max, square) {
  return new Promise((ok, no) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (!sw || !sh) return no(new Error("not_image"));
      if (square) { const m = Math.min(sw, sh); sx = (sw - m) / 2; sy = (sh - m) / 2; sw = sh = m; }
      const k = Math.min(1, max / Math.max(sw, sh)), w = Math.max(1, Math.round(sw * k)), h = Math.max(1, Math.round(sh * k));
      const c = document.createElement("canvas"); c.width = w; c.height = h;
      const x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, w, h); x.imageSmoothingQuality = "high"; x.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      let q = 0.84;
      const out = () => c.toBlob(b => { if (!b) return no(new Error("not_image")); if (b.size > 520000 && q > 0.5) { q -= 0.1; return out(); } ok(b); }, "image/jpeg", q);
      out();
    };
    img.onerror = () => { URL.revokeObjectURL(url); no(new Error("not_image")); };
    img.src = url;
  });
}
async function upload(key, blob) {
  const sb = FX.Cloud.sb;
  const path = `${S.row.id}/${key}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}.jpg`;
  const { error } = await sb.storage.from("media").upload(path, blob, { contentType: "image/jpeg", cacheControl: "31536000", upsert: false });
  if (error) throw error;
  return sb.storage.from("media").getPublicUrl(path).data.publicUrl;
}

/* ======================= panels ======================= */
function addSheet() {
  select("");
  sheet({ title: "Add to your page", html: `<form id="adForm" novalidate><label class="fld"><span>Paste a link</span><div class="row"><input class="inp" id="adUrl" type="url" inputmode="url" placeholder="instagram.com/yourname" autocapitalize="none" spellcheck="false" data-focus><button class="btn btn-ink" id="adGo">Add</button></div></label><p class="msg" id="adMsg" role="alert"></p></form>
    <p class="sh-l">Or pick an app</p><div class="apps">${FX.QUICK.map(appBtn).join("")}</div>
    <div class="kinds"><button type="button" class="btn btn-line" data-kind="photo">${icon("image")}Photo</button><button type="button" class="btn btn-line" data-kind="note">${icon("note")}Note</button><button type="button" class="btn btn-line" data-kind="head">${icon("heading")}Heading</button></div>`,
    onMount(el, close) {
      const msg = $("#adMsg", el), inp = $("#adUrl", el);
      $("#adForm", el).addEventListener("submit", e => {
        e.preventDefault();
        const raw = inp.value.trim();
        if (!raw) { inp.focus(); return say(msg, "Paste a link first."); }
        const u = FX.toUrl(raw);
        if (!u) return say(msg, /^@?\w[\w.]*$/.test(raw) ? "That looks like a username. Pick the app below instead." : "That doesn't look like a link. Try something like instagram.com/yourname");
        const d = FX.detect(u);
        close(true);
        addTile({ id: FX.uid(), t: "link", s: "s", u, k: d.k, l: "", cp: "" });
        toast(tip(d.k ? FX.P[d.k].n + " added" : "Link added"), null, S.tip === 1 ? 4200 : 0); S.tip = 2;
      });
      el.addEventListener("click", e => {
        const ap = e.target.closest("[data-app]"); if (ap) { close(true); askApp(ap.dataset.app); return; }
        const k = e.target.closest("[data-kind]"); if (!k) return;
        close(true);
        if (k.dataset.kind === "photo") pickPhotos("");
        if (k.dataset.kind === "note") noteSheet(null);
        if (k.dataset.kind === "head") headSheet(null);
      });
    } });
}
// one app: ask for the username (or link), make the tile
function askApp(k, tile) {
  const p = FX.P[k]; if (!p) return;
  select(tile ? tile.id : "");
  const editing = !!tile;
  const discord = k === "discord";
  let val = "";
  if (tile) {
    if (tile.cp) val = tile.cp;
    else if (p.link || p.mail || !p.mk) val = tile.u.replace(/^mailto:/, "");
    else {   // show just the username when the link is the usual one for it, otherwise the whole link
      const h = (FX.detect(tile.u).h || "").replace(/^@|^\+|^discord\.gg\//, ""), same = a => a.replace(/\/+$/, "").toLowerCase();
      val = p.re.test(h) && same(p.mk(h)) === same(tile.u) ? h : tile.u;
    }
  }
  const field = p.link || !p.mk && !p.mail ? `<label class="fld"><span>${esc(p.ask || "Your " + p.n + " link")}</span><input class="inp" id="apV" type="url" inputmode="url" placeholder="Paste the link" value="${esc(val)}" autocapitalize="none" spellcheck="false" data-focus></label>`
    : p.mail ? `<label class="fld"><span>${esc(p.ask)}</span><input class="inp" id="apV" type="email" inputmode="email" autocomplete="email" value="${esc(val)}" data-focus></label>`
    : `<label class="fld"><span id="apLbl">${esc(discord && (!tile || tile.cp) ? p.copy : p.ask)}</span><div class="pre"><b id="apPre">${esc(discord && (!tile || tile.cp) ? "@" : p.pre)}</b><input id="apV" value="${esc(val)}" ${p.digits ? 'inputmode="tel" autocomplete="tel"' : 'autocapitalize="none" autocomplete="off"'} spellcheck="false" data-focus></div></label>`;
  const dToggle = discord ? `<div class="seg" role="group" aria-label="What to show"><button type="button" data-dmode="user" aria-pressed="${!tile || !!tile.cp}">My username</button><button type="button" data-dmode="invite" aria-pressed="${!!(tile && !tile.cp)}">Server invite</button></div>` : "";
  sheet({ title: p.n, html: `<form id="apForm" novalidate>${dToggle}${field}${editing ? `<label class="fld"><span>Title (optional)</span><input class="inp" id="apL" value="${esc(tile.l)}" placeholder="${esc(p.n)}" maxlength="40"></label>` : ""}<p class="msg" id="apMsg" role="alert"></p>
    <div class="sh-foot">${editing ? `<button type="button" class="btn btn-bad" data-del>${icon("trash")}Delete</button>` : ""}<button class="btn btn-ink">${editing ? "Save" : "Add"}</button></div></form>`,
    onMount(el, close) {
      const msg = $("#apMsg", el), inp = $("#apV", el);
      let dmode = discord && tile && !tile.cp ? "invite" : "user";
      el.addEventListener("click", e => {
        const b = e.target.closest("[data-dmode]"); if (!b) return;
        dmode = b.dataset.dmode; $$("[data-dmode]", el).forEach(x => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
        $("#apLbl", el).textContent = dmode === "user" ? p.copy : p.ask; $("#apPre", el).textContent = dmode === "user" ? "@" : p.pre; inp.focus();
      });
      const del = $("[data-del]", el); if (del) del.onclick = () => { close(true); removeTile(tile.id); };
      $("#apForm", el).addEventListener("submit", e => {
        e.preventDefault();
        let v = inp.value.trim(), u = "", cp = "";
        if (!v) { inp.focus(); return say(msg, "Fill this in first."); }
        if (p.mail) { u = FX.toUrl(v); if (!u || !u.startsWith("mailto:")) return say(msg, "That email doesn't look right."); }
        else if (discord && dmode === "user") { v = v.replace(/^@/, ""); if (!/^[a-z0-9_.]{2,32}$/i.test(v)) return say(msg, "Discord usernames use letters, numbers, _ and ."); cp = v.toLowerCase(); }
        else if (p.link || !p.mk) { u = FX.toUrl(v); if (!u) return say(msg, "Paste the full link (it starts with https://)."); if (FX.detect(u).k !== k) return say(msg, `That isn't a ${p.n} link.`); }
        else {
          const asLink = FX.toUrl(v);
          if (asLink && FX.detect(asLink).k === k) u = asLink;            // they pasted their profile link: that works too
          else if (/\/|^https?:|^www\./i.test(v)) return say(msg, `That isn't a ${p.n} link. Type just your username.`);
          else {                                                          // a username (dots are fine: neha.bakes)
            v = v.replace(/^@/, ""); if (p.digits) v = v.replace(/[\s()+-]/g, "");
            if (!p.re.test(v)) return say(msg, p.digits ? "Type your number with the country code, like 919876543210." : `That doesn't look like a ${p.n} username.`);
            u = p.mk(v);
          }
        }
        close(true);
        if (editing) { tile.u = u; tile.cp = cp; tile.k = k; const l = $("#apL", el); tile.l = l ? FX.clip(l.value, 40) : tile.l; renderTiles(); renderDock(); changed(); toast("Saved"); }
        else { addTile({ id: FX.uid(), t: "link", s: "s", u, k, l: "", cp }); toast(tip(p.n + " added"), null, S.tip === 1 ? 4200 : 0); S.tip = 2; }
      });
    } });
}
function linkSheet(t) {
  sheet({ title: "Edit link", html: `<form id="lkForm" novalidate><label class="fld"><span>Link</span><input class="inp" id="lkU" type="url" inputmode="url" value="${esc(t.u)}" autocapitalize="none" spellcheck="false" data-focus></label>
    <label class="fld"><span>Title (optional)</span><input class="inp" id="lkL" value="${esc(t.l)}" placeholder="${esc(FX.detect(t.u).host || "Link")}" maxlength="40"></label><p class="msg" id="lkMsg" role="alert"></p>
    <div class="sh-foot"><button type="button" class="btn btn-bad" data-del>${icon("trash")}Delete</button><button class="btn btn-ink">Save</button></div></form>`,
    onMount(el, close) {
      $("[data-del]", el).onclick = () => { close(true); removeTile(t.id); };
      $("#lkForm", el).addEventListener("submit", e => {
        e.preventDefault();
        const u = FX.toUrl($("#lkU", el).value); if (!u) return say($("#lkMsg", el), "That doesn't look like a link.");
        t.u = u; t.k = FX.detect(u).k; t.l = FX.clip($("#lkL", el).value, 40); t.cp = "";
        close(true); renderTiles(); renderDock(); changed();
      });
    } });
}
function photoSheet(t) {
  const src = S.local[t.id] || S.pg.media["p_" + t.id] || "";
  sheet({ title: "Edit photo", html: `<form id="phForm" novalidate>${src ? `<img class="ph-prev" src="${esc(src)}" alt="">` : ""}<button type="button" class="btn btn-line btn-wide" data-replace style="margin:0 0 16px">${icon("image")}Change photo</button>
    <label class="fld"><span>Caption (optional)</span><input class="inp" id="phCap" value="${esc(t.cap)}" maxlength="60" data-focus></label>
    <label class="fld"><span>Opens a link when tapped (optional)</span><input class="inp" id="phU" type="url" inputmode="url" value="${esc(t.u)}" placeholder="https://" autocapitalize="none" spellcheck="false"></label><p class="msg" id="phMsg" role="alert"></p>
    <div class="sh-foot"><button type="button" class="btn btn-bad" data-del>${icon("trash")}Delete</button><button class="btn btn-ink">Save</button></div></form>`,
    onMount(el, close) {
      $("[data-del]", el).onclick = () => { close(true); removeTile(t.id); };
      $("[data-replace]", el).onclick = () => { close(true); pickPhotos(t.id); };
      $("#phForm", el).addEventListener("submit", e => {
        e.preventDefault();
        const raw = $("#phU", el).value.trim(), u = raw ? FX.toUrl(raw) : "";
        if (raw && !u) return say($("#phMsg", el), "That link doesn't look right.");
        t.cap = FX.clip($("#phCap", el).value, 60); t.u = u;
        close(true); renderTiles(); renderDock(); changed();
      });
    } });
}
function noteSheet(t) {
  const c = t ? t.c : "lime";
  sheet({ title: t ? "Edit note" : "Add a note", html: `<form id="ntForm" novalidate><label class="fld"><span>Note</span><textarea class="inp" id="ntX" maxlength="160" rows="3" placeholder="Open for collabs, my birthday is 12 May, anything" data-focus>${esc(t ? t.x : "")}</textarea></label>
    <p class="sh-l">Colour</p><div class="sw" role="radiogroup" aria-label="Note colour">${FX.NOTE_COLORS.map(n => `<button type="button" role="radio" class="c-${n}" data-c="${n}" aria-checked="${n === c}" aria-label="${n}"></button>`).join("")}</div>
    <p class="msg" id="ntMsg" role="alert"></p><div class="sh-foot">${t ? `<button type="button" class="btn btn-bad" data-del>${icon("trash")}Delete</button>` : ""}<button class="btn btn-ink">${t ? "Save" : "Add"}</button></div></form>`,
    onMount(el, close) {
      let col = c;
      el.addEventListener("click", e => { const b = e.target.closest("[data-c]"); if (!b) return; col = b.dataset.c; $$("[data-c]", el).forEach(x => x.setAttribute("aria-checked", x === b ? "true" : "false")); });
      const del = $("[data-del]", el); if (del) del.onclick = () => { close(true); removeTile(t.id); };
      $("#ntForm", el).addEventListener("submit", e => {
        e.preventDefault();
        const x = FX.clip($("#ntX", el).value, 160, true); if (!x) return say($("#ntMsg", el), "Write something first.");
        close(true);
        if (t) { t.x = x; t.c = col; renderTiles(); renderDock(); changed(); }
        else addTile({ id: FX.uid(), t: "note", s: x.length > 48 ? "w" : "s", x, c: col });
      });
    } });
}
function headSheet(t) {
  sheet({ title: t ? "Edit heading" : "Add a heading", html: `<form id="hdForm" novalidate><p class="hint">A heading starts a new group of tiles, like "My music" or "Shop".</p><label class="fld"><span>Heading</span><input class="inp" id="hdX" maxlength="50" value="${esc(t ? t.x : "")}" data-focus></label><p class="msg" id="hdMsg" role="alert"></p>
    <div class="sh-foot">${t ? `<button type="button" class="btn btn-bad" data-del>${icon("trash")}Delete</button>` : ""}<button class="btn btn-ink">${t ? "Save" : "Add"}</button></div></form>`,
    onMount(el, close) {
      const del = $("[data-del]", el); if (del) del.onclick = () => { close(true); removeTile(t.id); };
      $("#hdForm", el).addEventListener("submit", e => {
        e.preventDefault();
        const x = FX.clip($("#hdX", el).value, 50); if (!x) return say($("#hdMsg", el), "Type a heading first.");
        close(true);
        if (t) { t.x = x; renderTiles(); renderDock(); changed(); } else addTile({ id: FX.uid(), t: "head", s: "w", x });
      });
    } });
}
function editTile(id) {
  const t = tileOf(id); if (!t) return;
  if (t.t === "photo") return photoSheet(t);
  if (t.t === "note") return noteSheet(t);
  if (t.t === "head") return headSheet(t);
  const k = t.cp ? t.k : FX.detect(t.u).k;
  if (k && FX.P[k]) return askApp(k, t);
  return linkSheet(t);
}
function themeSheet() {
  select("");
  const names = { paper: "Paper", ink: "Ink", lime: "Lime", violet: "Violet", blush: "Blush" };
  sheet({ title: "Theme", html: `<div class="themes" role="radiogroup" aria-label="Theme">${FX.THEMES.map(n => `<button type="button" role="radio" data-th="${n}" aria-checked="${S.pg.theme === n}"><span class="th-sw pg" data-theme="${n}"><i></i><i></i><i class="w"></i></span><span>${names[n]}</span></button>`).join("")}</div>
    <div class="sh-foot"><button type="button" class="btn btn-ink" data-ok>Done</button></div>`,
    onMount(el, close) {
      $("[data-ok]", el).onclick = () => close();
      el.addEventListener("click", e => {
        const b = e.target.closest("[data-th]"); if (!b) return;
        S.pg.theme = b.dataset.th; $$("[data-th]", el).forEach(x => x.setAttribute("aria-checked", x === b ? "true" : "false"));
        const p = $("#app .pg"); if (p) p.dataset.theme = S.pg.theme; FX.setTheme(S.pg.theme); changed();
      });
    } });
}
function link() { return FX.SITE + "/" + S.row.username; }
function shareSheet() {
  select("");
  const l = link(), og = S.pg.media.og;
  sheet({ title: "Share your page", html: `<div class="share-link"><b>flexippo.com/${esc(S.row.username)}</b></div>
    <div class="sh-foot" style="margin-top:12px"><button type="button" class="btn btn-ink" data-copy-link>${icon("copy")}Copy link</button>${navigator.share ? `<button type="button" class="btn btn-line" data-native>${icon("share")}Share</button>` : ""}</div>
    <p class="hint" style="margin-top:14px">Paste it into your Instagram, Snapchat or TikTok bio so people can find all your stuff.</p>
    <p class="sh-l">QR code</p><div class="qr"><canvas id="qrC" width="240" height="240" aria-label="QR code for your page"></canvas><button type="button" class="btn btn-line btn-sm" data-save-qr>${icon("download")}Save QR code</button></div>
    <p class="sh-l">How your link looks in chats</p>${og ? `<div class="ogp"><img src="${esc(og)}" alt="Link preview of your page"><span><b>${esc(S.pg.og && S.pg.og.t || S.pg.name)}</b><small>flexippo.com</small></span></div><p class="hint">Changes to your name, bio or photo show up in chats a few minutes later.</p>` : `<p class="hint">Your preview is made after you add your photo or name. It shows up in chats a few minutes later.</p>`}`,
    onMount(el) {
      $("[data-copy-link]", el).onclick = () => copy(l, "Link copied");
      const n = $("[data-native]", el); if (n) n.onclick = () => navigator.share({ title: S.pg.name + " on flexippo", url: l }).catch(() => {});
      drawQr($("#qrC", el), l);
      $("[data-save-qr]", el).onclick = () => { const c = $("#qrC", el); const a = document.createElement("a"); a.download = `flexippo-${S.row.username}-qr.png`; a.href = c.toDataURL("image/png"); a.click(); };
    } });
}
async function drawQr(canvas, text) {
  try {
    if (!window.qrcodegen) await FX.loadScript("/assets/vendor/qrcodegen.js");
    const qr = window.qrcodegen.QrCode.encodeText(text, window.qrcodegen.QrCode.Ecc.MEDIUM);
    const n = qr.size, b = 3, sc = Math.floor(canvas.width / (n + b * 2)), off = Math.floor((canvas.width - sc * (n + b * 2)) / 2);
    const x = canvas.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, canvas.width, canvas.height); x.fillStyle = "#17102e";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.getModule(c, r)) x.fillRect(off + (c + b) * sc, off + (r + b) * sc, sc, sc);
  } catch (e) { canvas.replaceWith(Object.assign(document.createElement("p"), { className: "hint", textContent: "The QR code couldn't load. Check your connection." })); }
}
function copy(text, done) {
  (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(() => toast(done), () => {
    const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select();
    try { document.execCommand("copy"); toast(done); } catch (e) { toast(text); } t.remove();
  });
}
function moreSheet() {
  select("");
  sheet({ title: "Account", html: `<p class="hint">Logged in as <b>${esc(S.user.email || "")}</b></p>
    <div class="list"><button type="button" class="btn btn-line btn-wide" data-copy-link>${icon("copy")}Copy my link</button>
    <button type="button" class="btn btn-line btn-wide" data-pass>${icon("lock")}Change password</button>
    <button type="button" class="btn btn-line btn-wide" data-out>${icon("logout")}Log out</button></div><p class="msg" id="mMsg" role="status"></p>`,
    onMount(el, close) {
      $("[data-copy-link]", el).onclick = () => copy(link(), "Link copied");
      $("[data-pass]", el).onclick = async () => {
        const m = $("#mMsg", el); say(m, "Sending…", true);
        try { const { error } = await FX.Cloud.sb.auth.resetPasswordForEmail(S.user.email, { redirectTo: FX.SITE }); if (error) throw error; say(m, "We emailed you a link to set a new password.", true); }
        catch (e) { say(m, FX.friendlyError(e)); }
      };
      $("[data-out]", el).onclick = async () => {
        if (S.dirty || S.uploads) { say($("#mMsg", el), "Saving your changes first…", true); await save(); }
        await FX.Cloud.signOut(); close(true); location.href = "/";
      };
    } });
}

/* ======================= page views ======================= */
async function loadViews() {
  try {
    const r = await FX.rest(`page_stats?select=views&page_id=eq.${encodeURIComponent(S.row.id)}`);
    S.views = r && r[0] ? Number(r[0].views) || 0 : 0;
  } catch (e) { S.views = null; }
  showViews();
}
function showViews() {
  const v = $("#edViews"); if (!v) return;
  if (S.views === null) { v.hidden = true; return; }
  v.hidden = false; v.innerHTML = `${icon("eye")}${S.views.toLocaleString("en-IN")} ${S.views === 1 ? "view" : "views"}`;
}

/* ======================= link preview picture (what chat apps show) ======================= */
function ogText() {
  const pg = S.pg, u = S.row.username;
  const name = (pg.name || u).slice(0, 40);
  const t = (name.toLowerCase() === u ? name : `${name} (@${u})`).slice(0, 70);
  const apps = []; pg.tiles.forEach(x => { if (x.t === "link") { const k = x.cp ? x.k : FX.detect(x.u).k; if (k && FX.P[k] && !apps.includes(FX.P[k].n)) apps.push(FX.P[k].n); } });
  const d = (pg.bio ? pg.bio.replace(/\s+/g, " ") : apps.length ? apps.slice(0, 4).join(", ") : "flexippo.com/" + u).slice(0, 160);
  return { t, d };
}
function ogKey() { const { t, d } = ogText(); return hash([t, d, S.pg.media.avatar || "", S.pg.theme, "v3"].join("|")); }
function hash(s) { let h = 2166136261; for (const c of String(s)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
function queueOg() { clearTimeout(S.ogTimer); S.ogTimer = setTimeout(makeOg, 4000); }
async function makeOg() {
  if (S.ogBusy) return queueOg();
  if (S.uploads || S.saving) return queueOg();
  const k = ogKey();
  if (S.pg.og && S.pg.og.k === k && S.pg.media.og) return;
  S.ogBusy = true;
  try {
    const { t, d } = ogText();
    const blob = await drawOg(t, d);
    const old = S.pg.media.og, url = await upload("og", blob);
    S.pg.media.og = url; S.pg.og = { v: hash(t + "|" + d + "|" + url), k, t, d };
    S.dirty = true; await save();
    if (old) dropFiles([old]);
  } catch (e) { /* the preview is a nice extra: the page itself is already saved */ }
  finally { S.ogBusy = false; }
}
async function drawOg(t, d) {
  const W = 1200, H = 630, c = document.createElement("canvas"); c.width = W; c.height = H;
  const x = c.getContext("2d"), th = S.pg.theme;
  const col = { paper: ["#f3f1fa", "#17102e", "#625b7c"], ink: ["#17102e", "#f5f2ff", "#a79fcb"], lime: ["#c6ff3d", "#17102e", "#3f4a1a"], violet: ["#6a2cff", "#ffffff", "#ddd0ff"], blush: ["#ffe4ef", "#17102e", "#7a5466"] }[th] || ["#f3f1fa", "#17102e", "#625b7c"];
  try { await Promise.all([document.fonts.load('700 80px "Adventor"'), document.fonts.load('400 34px "Inter"'), document.fonts.load('600 30px "Inter"')]); } catch (e) {}
  x.fillStyle = col[0]; x.fillRect(0, 0, W, H);
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); };
  // photo (or first letter)
  const AV = 300, ax = 90, ay = (H - AV) / 2 - 10;
  const src = S.local.avatar || S.pg.media.avatar;
  let drew = false;
  if (src) {
    try {
      const img = await new Promise((ok, no) => { const i = new Image(); i.crossOrigin = "anonymous"; i.onload = () => ok(i); i.onerror = no; i.src = src; });
      x.save(); rr(ax, ay, AV, AV, 90); x.clip(); const m = Math.min(img.naturalWidth, img.naturalHeight);
      x.drawImage(img, (img.naturalWidth - m) / 2, (img.naturalHeight - m) / 2, m, m, ax, ay, AV, AV); x.restore(); drew = true;
    } catch (e) {}
  }
  if (!drew) { x.fillStyle = "#c6ff3d"; rr(ax, ay, AV, AV, 90); x.fill(); x.fillStyle = "#17102e"; x.font = '700 150px "Adventor", sans-serif'; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText((S.pg.name || S.row.username).charAt(0).toUpperCase(), ax + AV / 2, ay + AV / 2 + 6); x.textAlign = "left"; }
  // name + bio
  const tx = ax + AV + 70, maxW = W - tx - 80;
  const lines = (text, font, max, n) => { x.font = font; const words = String(text).split(/\s+/); const out = []; let cur = ""; for (const w of words) { const tryL = cur ? cur + " " + w : w; if (x.measureText(tryL).width <= max) cur = tryL; else { if (cur) out.push(cur); cur = w; while (x.measureText(cur).width > max && cur.length > 1) cur = cur.slice(0, -1); } } if (cur) out.push(cur); if (out.length > n) { out.length = n; out[n - 1] = out[n - 1].replace(/\s*\S*$/, "") + "…"; } return out; };
  const nm = S.pg.name || S.row.username;
  let size = 84; x.font = `700 ${size}px "Adventor", sans-serif`; while (x.measureText(nm).width > maxW && size > 48) { size -= 4; x.font = `700 ${size}px "Adventor", sans-serif`; }
  const nl = lines(nm, `700 ${size}px "Adventor", sans-serif`, maxW, 2);
  const bl = S.pg.bio ? lines(S.pg.bio.replace(/\s+/g, " "), '400 34px "Inter", sans-serif', maxW, 3) : [];
  const blockH = nl.length * size * 1.04 + (bl.length ? 22 + bl.length * 46 : 0) + 96;
  let y = (H - blockH) / 2 + size * 0.85;
  x.fillStyle = col[1]; x.textBaseline = "alphabetic"; x.font = `700 ${size}px "Adventor", sans-serif`;
  nl.forEach(l => { x.fillText(l, tx, y); y += size * 1.04; });
  if (bl.length) { y += 22 - size * 1.04 + 46; x.fillStyle = col[2]; x.font = '400 34px "Inter", sans-serif'; bl.forEach(l => { x.fillText(l, tx, y); y += 46; }); y -= 46; }
  // the link, in a pill
  y += 48; x.font = '600 30px "Inter", sans-serif'; const lt = "flexippo.com/" + S.row.username, lw = x.measureText(lt).width + 48;
  x.fillStyle = th === "ink" || th === "violet" ? "#c6ff3d" : "#17102e"; rr(tx, y, lw, 60, 30); x.fill();
  x.fillStyle = th === "ink" || th === "violet" ? "#17102e" : "#ffffff"; x.fillText(lt, tx + 24, y + 40);
  // the flexippo logo, top right
  try { const logo = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = "/assets/favicon-192.png"; }); x.drawImage(logo, W - 108, 40, 64, 64); } catch (e) {}
  return new Promise((ok, no) => c.toBlob(b => (b ? ok(b) : no(new Error("og"))), "image/jpeg", 0.88));
}

window.FXEdit = { start, _state: S, _save: save, _makeOg: makeOg };
})();
