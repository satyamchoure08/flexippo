/* flexippo.com: the page editor. Only the owner of a page downloads this file (visitors never do).
   - "Edit my page" turns on edit mode: the page itself shows what can be changed (✎ and ＋), so you
     tap the thing you want to change, right where it is. A bar at the bottom has the themes, "Saved ✓" and Done.
   - Each change shows on the page at once and saves by itself a moment later. No Save button to forget.
   - It also makes the picture people see when the link is sent in a chat (the link preview). */
(() => {
"use strict";
if (window.FlexEdit) return;

/* ---------- looks (only owners download these) ---------- */
const CSS = `
html.fe-lock{overflow:hidden}
.fe{position:fixed;inset:0;z-index:210;display:flex;align-items:flex-end;justify-content:center}
.fe[hidden]{display:none}
.fe-dim{position:absolute;inset:0;background:rgba(5,3,16,.4);animation:feFade .2s ease-out}
.fe-panel{position:relative;display:flex;flex-direction:column;width:100%;max-width:560px;max-height:80vh;max-height:80dvh;border-radius:24px 24px 0 0;background:var(--bg);color:var(--ink);border:1px solid var(--line);border-bottom:0;box-shadow:0 -18px 50px var(--shadow);font-family:var(--f-body);animation:feUp .24s cubic-bezier(.2,.9,.25,1)}
@media (min-width:900px){.fe{align-items:stretch;justify-content:flex-end}.fe-dim{background:rgba(5,3,16,.22)}.fe-panel{max-width:430px;max-height:none;border-radius:0;border:0;border-left:1px solid var(--line);box-shadow:-18px 0 50px var(--shadow);animation-name:feSide}}
@keyframes feUp{from{transform:translateY(40px);opacity:.3}}
@keyframes feSide{from{transform:translateX(40px);opacity:.3}}
@keyframes feFade{from{opacity:0}}
.lite .fe-panel,.lite .fe-dim,.lite .et{animation:none}
.fe-head{flex:none;display:flex;align-items:center;gap:8px;padding:12px 12px 8px 14px}
.fe-head h3{flex:1;min-width:0;margin:0;font-family:var(--f-display);font-weight:400;font-size:20px;line-height:1.15;overflow-wrap:anywhere}
.fe-ic{flex:none;width:42px;height:42px;border-radius:50%;border:1px solid var(--line);background:var(--panel2);color:var(--ink);font-size:20px;line-height:1;display:grid;place-items:center;cursor:pointer;padding:0}
.fe-ic[hidden]{display:none}
.fe-status{flex:none;border:0;background:none;padding:4px 2px;font:700 12.5px var(--f-body);color:var(--mute);white-space:nowrap}
.fe-status:empty{display:none}
.fe-status.ok{color:#20b673}
.fe-status.bad{color:#ff4d6d;text-decoration:underline;cursor:pointer}
.fe-body{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:4px 16px 18px;display:flex;flex-direction:column;gap:14px}
.fe-body > *{flex-shrink:0}
.fe-foot{flex:none;display:flex;gap:10px;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--line);background:var(--bg)}
.fe-foot:empty{display:none}
.fe-foot .fe-btn{flex:1}
.fe-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:50px;padding:10px 18px;border-radius:16px;border:0;background:linear-gradient(135deg,var(--pink),var(--violet));color:#fff;font:800 16px/1.2 var(--f-body);cursor:pointer;text-align:center;text-decoration:none}
.fe-btn.ghost{background:var(--panel2);color:var(--ink);border:1px solid var(--line)}
.fe-btn.danger{background:transparent;color:#ff4d6d;border:1.5px solid rgba(255,77,109,.5)}
.fe-btn.danger.armed{background:#ff4d6d;color:#fff}
.fe-btn.small{min-height:44px;padding:8px 14px;font-size:14.5px;border-radius:13px}
.fe-btn[disabled]{opacity:.45;cursor:default}
.fe-p{margin:0;font-size:14.5px;line-height:1.5;color:var(--mute)}
.fe-lab{display:block;font-weight:800;font-size:15px;margin:0 0 7px}
.fe-in{display:block;width:100%;min-height:50px;padding:12px 14px;border-radius:14px;border:1.5px solid var(--line);background:var(--panel2);color:var(--ink);font:16px/1.3 var(--f-body);-webkit-appearance:none;appearance:none}
.fe-in.big{min-height:58px;font-size:20px;font-weight:700}
textarea.fe-in{min-height:84px;resize:vertical}
select.fe-in{background-image:linear-gradient(45deg,transparent 50%,var(--mute) 50%),linear-gradient(135deg,var(--mute) 50%,transparent 50%);background-position:calc(100% - 20px) 50%,calc(100% - 14px) 50%;background-size:6px 6px;background-repeat:no-repeat;padding-right:36px}
.fe-in:focus{outline:none;border-color:var(--pink)}
.fe-pre.bad{border-color:#ff4d6d}
.fe-pre{display:flex;align-items:stretch;border-radius:14px;border:1.5px solid var(--line);background:var(--panel2);overflow:hidden}
.fe-pre:focus-within{border-color:var(--pink)}
.fe-pre > span{display:flex;align-items:center;padding:0 2px 0 14px;color:var(--mute);font-size:17px;white-space:nowrap}
.fe-pre .fe-in{border:0;background:transparent;min-width:0;padding-left:4px}
.fe-msg{margin:7px 2px 0;font-size:13.5px;line-height:1.45;color:var(--mute);overflow-wrap:anywhere}
.fe-msg:empty{display:none}
.fe-msg.ok{color:#20b673}
.fe-msg.bad{color:#ff4d6d}
.fe-msg a{color:inherit;font-weight:800}
.fe-sec{display:flex;flex-direction:column;gap:10px;padding:14px;border-radius:18px;background:var(--panel);border:1px solid var(--line)}
.fe-sec h4{margin:0;font-size:15.5px}
.fe-two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.fe-cover{position:relative;display:grid;place-items:center;width:100%;aspect-ratio:4/3;max-height:300px;border-radius:18px;overflow:hidden;background:var(--panel2);border:2px dashed color-mix(in srgb,var(--pink) 60%,var(--line));color:var(--ink);font:800 16px var(--f-body);cursor:pointer;padding:0}
.fe-cover.has{border-style:solid;border-color:var(--line)}
.fe-cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fe-cover.sq{aspect-ratio:1/1;max-height:none;width:min(100%,240px);align-self:center}
.fe-cover-l{position:relative;z-index:1;display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;background:rgba(0,0,0,.6);color:#fff;font:800 15px var(--f-body)}
.fe-cover:not(.has) .fe-cover-l{background:linear-gradient(135deg,var(--pink),var(--violet))}
.fe-avrow{display:flex;align-items:center;gap:14px}
.fe-av{flex:none;width:64px;height:64px;border-radius:50%;object-fit:cover;background:var(--panel2);border:2px solid var(--line)}
.fe-btns{display:flex;flex-wrap:wrap;gap:8px}
.fe-btns > .fe-btn{flex:1 1 120px}
.fe-chips{display:flex;flex-wrap:wrap;gap:8px}
.fe-chip{min-height:40px;padding:7px 13px;border-radius:999px;border:1px solid var(--line);background:var(--panel);color:var(--ink);font:700 14px var(--f-body);cursor:pointer}
.fe-chip[aria-pressed=true]{background:var(--pink);border-color:var(--pink);color:#fff}
.fe-list{display:flex;flex-direction:column;gap:8px}
.fe-li{display:flex;align-items:center;gap:8px}
.fe-li .fe-in{min-height:48px;padding:10px 12px}
.fe-mini{flex:none;width:44px;height:44px;border-radius:12px;border:1px solid var(--line);background:var(--panel2);color:var(--ink);font-size:17px;cursor:pointer;display:grid;place-items:center;padding:0}
.fe-mini[disabled]{opacity:.3;cursor:default}
.fe-head-ic{display:flex;align-items:center;gap:12px}
.fe-head-ic .soc-ic{width:46px;height:46px;border-radius:14px;flex:none}
.fe-head-ic .soc-ic svg{width:23px;height:23px}
.fe-head-ic .fe-lab{margin:0}
.fe-plat{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
@media (min-width:480px){.fe-plat{grid-template-columns:repeat(5,minmax(0,1fr))}}
@media (min-width:900px){.fe-plat{grid-template-columns:repeat(4,minmax(0,1fr))}}
.fe-pl{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 3px 9px;border-radius:16px;border:1px solid var(--line);background:var(--panel);color:var(--ink);font:700 12px var(--f-body);cursor:pointer;min-width:0}
.fe-pl .soc-ic{width:46px;height:46px;border-radius:14px}
.fe-pl .soc-ic svg{width:23px;height:23px}
.fe-pl span:last-child{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fe-pl.on::after{content:"✓";position:absolute;top:5px;right:6px;width:19px;height:19px;border-radius:50%;background:#20b673;color:#fff;font-size:11px;line-height:19px;text-align:center}
.fe-more{border-radius:16px;border:1px solid var(--line);background:var(--panel)}
.fe-more > summary{list-style:none;display:flex;align-items:center;gap:10px;min-height:52px;padding:8px 14px;font-weight:800;font-size:15px;cursor:pointer}
.fe-more > summary::-webkit-details-marker{display:none}
.fe-more > summary::after{content:"＋";margin-left:auto;color:var(--pink);font-size:18px}
.fe-more[open] > summary::after{content:"−"}
.fe-more > div{display:flex;flex-direction:column;gap:12px;padding:2px 14px 14px}
.fe-slots{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.fe-slots.four{grid-template-columns:repeat(4,minmax(0,1fr))}
.fe-slot{position:relative;display:grid;place-items:center;width:100%;aspect-ratio:1/1;border-radius:13px;overflow:hidden;border:2px dashed var(--line);background:var(--panel2);color:var(--pink);font:800 24px var(--f-body);cursor:pointer;padding:0}
.fe-slots.four .fe-slot{aspect-ratio:3/4}
.fe-slot img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fe-slot.has{border-style:solid}
.fe-slot-x{position:absolute;top:4px;right:4px;z-index:2;width:30px;height:30px;border-radius:50%;border:0;background:rgba(0,0,0,.65);color:#fff;font-size:13px;cursor:pointer;padding:0}
.fe-th{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:18px;overflow:hidden;background:radial-gradient(circle at 50% 38%,#6a4a00 0,#2e1f00 55%,#120b00 100%);color:#ffd36a;aspect-ratio:16/9}
.fe-th b{font-family:var(--f-display);font-weight:400;font-size:28px}
.fe-th small{font-family:var(--f-hud);font-size:12px;letter-spacing:.14em}
.fe-big{text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;padding:8px 0}
.fe-big .em{font-size:50px;line-height:1}
.fe-big h4{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(19px,6vw,25px);overflow-wrap:anywhere}
.fe-load{color:var(--mute);text-align:center;padding:24px 0;margin:0}
.fe-link{display:flex;flex-direction:column;align-items:center;gap:4px;padding:16px 12px;border-radius:18px;background:var(--panel);border:1px solid var(--line);text-align:center}
.fe-link b{font-family:var(--f-display);font-weight:400;font-size:clamp(19px,6.4vw,26px);line-height:1.15;overflow-wrap:anywhere}
.fe-pv .wa{border-radius:16px}
.fe-pv .wa-body{padding:12px}
.fe-pv .wa-in{max-width:300px}
.fe-story{align-self:center;display:grid;place-items:center;width:min(60%,240px);aspect-ratio:9/16;border-radius:16px;overflow:hidden;background:var(--panel2);box-shadow:0 14px 34px var(--shadow);color:var(--mute);font-size:14px;text-align:center}
.fe-story img{width:100%;height:100%;display:block;object-fit:cover}
.fe-acts{display:flex;flex-direction:column;gap:6px}
.fe-act{display:flex;align-items:flex-start;gap:10px;width:100%;padding:10px;border-radius:14px;border:1px solid transparent;background:none;color:var(--ink);text-align:left;font:inherit;cursor:pointer}
.fe-act.new{background:rgba(255,46,136,.09);border-color:rgba(255,46,136,.3)}
.fe-act .cm-av{flex:none;width:38px;height:38px;border-radius:50%;object-fit:cover;display:grid;place-items:center;color:#fff;font-weight:900;background:linear-gradient(135deg,var(--a1,#ff2e88),var(--a2,#8b5cff))}
.fe-act p{flex:1;min-width:0;margin:0;font-size:14.5px;line-height:1.4;overflow-wrap:anywhere}
.fe-act small{display:block;color:var(--mute);font-size:12.5px;margin-top:2px}
.fe-act .fe-act-th{flex:none;width:44px;height:44px;border-radius:10px;object-fit:cover}
/* edit mode: the bar at the bottom */
.et{position:fixed;left:50%;bottom:calc(10px + env(safe-area-inset-bottom,0px));z-index:200;display:flex;align-items:center;gap:8px;width:calc(100% - 20px);max-width:540px;padding:8px;border-radius:22px;background:var(--solid);border:1px solid var(--line);box-shadow:0 14px 40px var(--shadow);font-family:var(--f-body);transform:translateX(-50%);animation:etUp .3s cubic-bezier(.2,.9,.25,1)}
.et[hidden]{display:none}
@keyframes etUp{from{transform:translate(-50%,30px);opacity:0}}
.et-skins{flex:none;display:flex;gap:6px}
.et-skin{width:36px;height:36px;border-radius:50%;border:2px solid var(--line);padding:0;cursor:pointer}
.et-skin[aria-pressed=true]{border-color:var(--bg);box-shadow:0 0 0 2.5px var(--pink)}
.et-status{flex:1;min-width:0;border:0;background:none;padding:0 2px;font:700 13px var(--f-body);color:var(--mute);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center}
.et-status.ok{color:#20b673}
.et-status.bad{color:#ff4d6d;text-decoration:underline;cursor:pointer}
.et-more{flex:none;width:46px;height:46px;border-radius:15px;border:1px solid var(--line);background:var(--panel2);color:var(--ink);font-size:20px;line-height:1;cursor:pointer;padding:0}
.et-done{flex:none;min-height:46px;padding:0 20px;border-radius:15px;border:0;background:linear-gradient(135deg,var(--pink),var(--violet));color:#fff;font:800 16px var(--f-body);cursor:pointer}
.et-done[disabled]{opacity:.65;cursor:wait}
/* edit mode: what can be tapped */
body.editing .name-wrap,body.editing .typed,body.editing .kana,body.editing .count,body.editing #socGrid .soc:not(.soc-add),body.editing #linkList .lnk,body.editing #grid .card:not(.add-card) .ci{outline:2px dashed color-mix(in srgb,var(--pink) 55%,transparent);outline-offset:5px;cursor:pointer}
body.editing #grid .card:not(.add-card) .ci{outline-offset:2px}
body.editing .kana{opacity:.6}
body.editing .ticker{cursor:pointer}
body.editing .react{opacity:.45;pointer-events:none}
body.editing #guestbook,body.editing #share,body.editing #get-yours,body.editing #contact,body.editing #app > footer,body.editing .player,body.editing .chat-fab,body.editing .totop,body.editing #pageActs,body.editing #ownBox,body.editing #pitch{display:none!important}
body.editing #app{padding-bottom:110px}
/* the owner's box under the name on their own page */
.ob-stats{display:flex;flex-wrap:wrap;gap:8px}
.ob-st{display:inline-flex;align-items:center;gap:6px;min-height:38px;padding:6px 12px;border-radius:999px;background:var(--panel);border:1px solid var(--line);font:700 14px var(--f-body);color:var(--ink)}
.ob-st i{font-style:normal}
.ob-st em{font-style:normal;color:#20b673;font-size:12.5px}
.ob-act{cursor:pointer;border-color:var(--pink)}
.ob-dot{min-width:21px;height:21px;padding:0 6px;border-radius:999px;background:var(--pink);color:#fff;font-size:12px;line-height:21px;text-align:center}
.ob-todo{display:flex;flex-direction:column;gap:10px;padding:14px;border-radius:18px;background:var(--panel);border:1px solid var(--line)}
.lite .ob-todo,.lite .ob-st,.lite .et{background:var(--solid)}
.ob-todo-h{display:flex;align-items:baseline;justify-content:space-between;gap:10px}
.ob-todo-h b{font-size:16px}
.ob-todo-h small{color:var(--mute);font-weight:700;font-size:13px}
.ob-bar{height:8px;border-radius:9px;background:var(--line);overflow:hidden}
.ob-bar i{display:block;height:100%;border-radius:9px;background:linear-gradient(90deg,var(--pink),var(--violet))}
.ob-next{display:flex;flex-wrap:wrap;gap:8px}
.ob-next button{min-height:40px;padding:8px 13px;border-radius:999px;border:1.5px dashed var(--pink);background:transparent;color:var(--ink);font:800 14px var(--f-body);cursor:pointer}
.ob-next button:first-child{border-style:solid;background:linear-gradient(135deg,var(--pink),var(--violet));border-color:transparent;color:#fff}
body.is-owner .views{display:none!important}
`;
const styleTag = document.createElement("style"); styleTag.textContent = CSS; document.head.appendChild(styleTag);

/* ---------- small helpers ---------- */
const clone = o => JSON.parse(JSON.stringify(o === undefined ? null : o));
const node = html => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const newId = () => "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const SKINS = [["night", "Neon Tokyo Night", "linear-gradient(135deg,#07051a,#3b1a8a 60%,#ff2e88)"], ["sakura", "Sakura Day", "linear-gradient(135deg,#fff0f6,#ffc2da 60%,#ff3d86)"], ["fire", "Shonen Fire", "linear-gradient(135deg,#0e0403,#7a1406 60%,#ffc21a)"]];
const ORDER = ["instagram", "snapchat", "youtube", "whatsapp", "x", "tiktok", "discord", "spotify", "telegram", "twitch", "github", "linkedin", "facebook", "threads", "pinterest", "reddit", "steam", "email"];
const socIc = k => { const d = SOCIAL[k]; return `<span class="soc-ic" style="background:${d.brand}${d.dark ? ";color:#111" : ""}" aria-hidden="true">${icon(d.icon)}</span>`; };
const me = () => Custom.target || {};
const pageLink = () => Cloud.shareLink(me().username || "");
const linkText = () => pageLink().replace(/^https?:\/\//, "");
const markShared = () => { LS.set("shared@" + me().id, 1); OwnerBox.paint(); };
const arm = (btn, text) => { if (btn.dataset.armed === "1") return true; btn.dataset.armed = "1"; btn.classList.add("armed"); btn.textContent = text; Snd.fx("tick"); return false; };
const curSkin = () => document.documentElement.dataset.skin || "night";
// bring the part of the page being changed into view (on phones the panel covers the bottom half)
function peek(el) {
  if (!el || !el.getBoundingClientRect) return;
  const r = el.getBoundingClientRect(), want = innerWidth >= 900 ? Math.max(80, (innerHeight - r.height) / 2) : Math.max(64, innerHeight * 0.1);
  if (Math.abs(r.top - want) > 40) scrollTo({ top: Math.max(0, scrollY + r.top - want), behavior: reduce ? "auto" : "smooth" });
}

/* ---------- the page's content while editing ---------- */
// Every change goes straight onto the page (the owner sees it right away) and is saved a moment later.
let rafT = 0, nextD = null, nextM = null;
const cur = () => clone(nextD || pageData());                 // the newest content, ready to change
const curM = () => ({ ...(nextM || Custom.media || {}) });
function flush() {
  if (!rafT) return;
  cancelAnimationFrame(rafT); rafT = 0;
  const d = nextD, m = nextM; nextD = nextM = null;
  if (d) Custom.setLocal(d, m || Custom.media);
}
function commit(D, M) {
  D.v = 2; nextD = D; if (M) nextM = M;
  if (!rafT) rafT = requestAnimationFrame(() => { rafT = 0; const d = nextD, m = nextM; nextD = nextM = null; if (d) Custom.setLocal(d, m || Custom.media); OwnerBox.paint(); });
  Save.soon();
  Og.soon(3000);                                   // the link preview follows (it waits until editing is done)
}
const edit = fn => { const D = cur(); fn(D); commit(D); };
const P = D => (D.profile = D.profile && typeof D.profile === "object" ? D.profile : {});

/* ---------- saving ---------- */
const Save = (() => {
  let t = 0, ups = 0, state = "", why = "", retryT = 0;
  function paint() {
    const txt = ups ? "Uploading…" : state === "saving" ? "Saving…" : state === "ok" ? "Saved ✓" : state === "bad" ? why : "";
    const cls = ups || state === "saving" ? "" : state;
    Sheet.status(txt, cls); Mode.status(txt, cls);
  }
  function soon(ms) { clearTimeout(t); state = "saving"; paint(); t = setTimeout(now, ms || 900); }
  async function now() {
    clearTimeout(t); t = 0; flush();
    state = "saving"; paint();
    const r = await Custom.persist();
    if (t) return;                                   // newer changes are already waiting: they save next
    if (r === "cloud") { state = "ok"; Files.tidy(); }
    else {
      state = "bad";
      const loggedOut = !Cloud.user || /log in/i.test(friendlyError(Custom.lastError));
      why = loggedOut ? "Logged out · log in" : "Not saved · retry";
      clearTimeout(retryT); if (!loggedOut) retryT = setTimeout(() => { if (state === "bad") now(); }, 8000);
      if (!Mode.on && !Sheet.isOpen) toast("Couldn't save your changes. " + friendlyError(Custom.lastError));
    }
    paint();
  }
  const busy = () => !!t || !!rafT || ups > 0 || state === "saving";
  // wait until everything is saved (or it's clearly not going to work right now)
  function settle(ms) {
    if (t) now();
    return new Promise(res => { const t0 = Date.now(); (function w() { if (!busy() || state === "bad" || Date.now() - t0 > ms) return res(); setTimeout(w, 120); })(); });
  }
  addEventListener("online", () => { if (state === "bad") now(); });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && (t || rafT)) now(); });
  Cloud.on(w => { if (w === "auth" && state === "bad" && Custom.owner) now(); });
  return {
    soon, now, paint, settle,
    up(n) { ups = Math.max(0, ups + n); paint(); },
    retry() { if (state !== "bad") return; if (/log in/.test(why)) Accounts.openAuth("login", "Log in again to save your changes."); else now(); },
    get pending() { return !!t || !!rafT; }, get busy() { return busy(); }, get failed() { return state === "bad"; }
  };
})();

/* ---------- photos ---------- */
const Files = (() => {
  const known = new Set();                         // photo files this page has used, so replaced ones can be deleted
  const remember = u => { const p = Cloud.pathOf(u); if (p) known.add(p); };
  function init() { Object.values((Custom.saved || {}).media || {}).forEach(remember); }
  function tidy() {
    if (Save.busy) return;
    const used = new Set(), add = u => { const p = Cloud.pathOf(u); if (p) used.add(p); };
    [(Custom.saved || {}).media || {}, Custom.media || {}].forEach(m => Object.values(m).forEach(add));
    // the link-preview pictures chat apps may still be showing stay until the new one is live (see Og)
    [(((Custom.saved || {}).settings || {}).og || {}).prev, ((Custom.settings || {}).og || {}).prev].forEach(l => (Array.isArray(l) ? l : []).forEach(add));
    const gone = [...known].filter(p => !used.has(p));
    if (!gone.length) return;
    gone.forEach(p => known.delete(p));
    Cloud.removeFiles(gone);
  }
  // open the phone's gallery (must be called straight from a tap)
  function pick(multiple) {
    return new Promise(res => {
      $$("input.fe-file").forEach(x => x.remove());
      const i = document.createElement("input"); i.type = "file"; i.accept = "image/*"; i.className = "fe-file"; if (multiple) i.multiple = true;
      i.style.cssText = "position:fixed;left:-200px;top:0;width:1px;height:1px;opacity:0";
      i.addEventListener("change", () => { res([...(i.files || [])]); i.remove(); });
      document.body.appendChild(i); i.click();
    });
  }
  // made smaller on the phone first: quicker on slow internet, lighter for everyone who opens the page
  function shrink(file, max, maxBytes) {
    return new Promise((res, rej) => {
      if (!file || (file.type && !/^image\//.test(file.type))) return rej(new Error("type"));
      const src = URL.createObjectURL(file), im = new Image();
      im.onload = () => {
        const k = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight)), c = document.createElement("canvas");
        c.width = Math.max(1, Math.round(im.naturalWidth * k)); c.height = Math.max(1, Math.round(im.naturalHeight * k));
        const g = c.getContext("2d"); g.fillStyle = "#000"; g.fillRect(0, 0, c.width, c.height); g.drawImage(im, 0, 0, c.width, c.height);
        URL.revokeObjectURL(src);
        let q = 0.86;
        const go = () => c.toBlob(b => {
          if (!b) return rej(new Error("load"));
          if (b.size > maxBytes && q > 0.36) { q -= 0.12; return go(); }
          res({ blob: b, url: URL.createObjectURL(b), canvas: c });
        }, "image/jpeg", q);
        go();
      };
      im.onerror = () => { URL.revokeObjectURL(src); rej(new Error("load")); };
      im.src = src;
    });
  }
  // a square from a bigger photo (for the round profile picture): the middle, a little towards the top where faces are
  function square(canvas, size) {
    return new Promise(res => {
      const w = canvas.width, h = canvas.height, s = Math.min(w, h), c = document.createElement("canvas"); c.width = c.height = Math.min(size, s);
      c.getContext("2d").drawImage(canvas, (w - s) / 2, h > w ? (h - s) * 0.22 : 0, s, s, 0, 0, c.width, c.height);
      c.toBlob(b => res(b), "image/jpeg", 0.86);
    });
  }
  // 1) show the photo on the page at once, 2) upload it, 3) the page saves itself with the uploaded photo
  async function stage(key, file, o) {
    let p; try { p = await shrink(file, o.max, o.bytes); } catch (e) { toast("That file isn't a photo we can use. Try a JPG or PNG."); return null; }
    const D = cur(), M = curM(), was = M[key]; p.before = was && !/^blob:/.test(was) ? was : (Custom.saved.media || {})[key];
    M[key] = p.url; if (o.change) o.change(D); commit(D, M);
    return p;
  }
  async function send(key, p, o) {
    Save.up(1);
    try {
      const url = await Cloud.uploadPhoto(key, p.url); remember(url);
      const M = curM(); if (M[key] === p.url) { M[key] = url; commit(cur(), M); }
      return true;
    } catch (e) {
      const D = cur(), M = curM();
      if (M[key] === p.url) { if (p.before) M[key] = p.before; else delete M[key]; if (o.undo) o.undo(D); commit(D, M); }
      toast("Couldn't upload a photo. " + friendlyError(e)); return false;
    } finally { Save.up(-1); Sheet.redraw(); }
  }
  async function put(key, file, o) { const p = await stage(key, file, o); if (!p) return null; Sheet.redraw(); await send(key, p, o); return p; }
  function drop(key) { const M = curM(); delete M[key]; commit(cur(), M); }
  return { init, tidy, pick, shrink, square, stage, send, put, drop };
})();

/* ---------- the phone's back button ---------- */
// One step back: closes the open panel, or leaves edit mode.
const Nav = (() => {
  let pushed = false;
  function push() { if (pushed) return; try { history.pushState({ fe: 1 }, ""); pushed = true; } catch (e) {} }
  function pop() { if (!pushed) return; pushed = false; try { history.back(); } catch (e) {} }
  addEventListener("popstate", () => {
    if (!pushed) return;
    pushed = false;
    if (Sheet.isOpen) Sheet.back(true);
    else if (Mode.on) { Mode.exit(true); return; }
    if (Sheet.isOpen || Mode.on) push();
  });
  return { push, pop };
})();

/* ---------- the panel ---------- */
// Slides up from the bottom on phones (from the side on computers). Screens stack inside it: ‹ goes one back.
const Sheet = (() => {
  let root = null, body, foot, title, backB, statusB, stack = [], lastFocus = null;
  function build() {
    root = node(`<div class="fe" hidden><div class="fe-dim"></div><section class="fe-panel" role="dialog" aria-modal="true" aria-labelledby="feT"><header class="fe-head"><button class="fe-ic" type="button" data-fe-back aria-label="Back">‹</button><h3 id="feT"></h3><button class="fe-status" type="button" aria-live="polite"></button><button class="fe-ic" type="button" data-fe-x aria-label="Close">✕</button></header><div class="fe-body"></div><footer class="fe-foot"></footer></section></div>`);
    document.body.appendChild(root);
    body = $(".fe-body", root); foot = $(".fe-foot", root); title = $("#feT", root); backB = $("[data-fe-back]", root); statusB = $(".fe-status", root);
    root.addEventListener("click", e => {
      if (e.target.classList.contains("fe-dim") || e.target.closest("[data-fe-x]")) { Snd.fx("tick"); close(); }
      else if (e.target.closest("[data-fe-back]")) { Snd.fx("tick"); back(); }
    });
    statusB.addEventListener("click", () => Save.retry());
    addEventListener("keydown", e => { if (e.key === "Escape" && root && !root.hidden && $("#authModal").hidden) { e.stopPropagation(); back(); } }, true);
  }
  function render() {
    const s = stack[stack.length - 1]; if (!s) return;
    title.textContent = s.title; backB.hidden = stack.length < 2;
    // fresh boxes each time, so old buttons don't keep old click handlers
    const nb = body.cloneNode(false), nf = foot.cloneNode(false); body.replaceWith(nb); foot.replaceWith(nf); body = nb; foot = nf;
    s.draw(body, foot);
    Save.paint();
    if (s.focus && fine) { const f = $("input:not([type=hidden]),textarea", body); if (f) setTimeout(() => { try { f.focus({ preventScroll: true }); } catch (e) {} }, 80); }
  }
  function open(s) {
    if (!root) build();
    if (root.hidden) {
      lastFocus = document.activeElement; root.hidden = false; document.documentElement.classList.add("fe-lock");
      Nav.push();
    }
    stack.push(s); render(); body.scrollTop = 0;
  }
  function swap(s) { const old = stack.pop(); if (old && old.leave) old.leave(); stack.push(s); render(); body.scrollTop = 0; }
  function redraw() { if (root && !root.hidden) { const y = body.scrollTop; render(); body.scrollTop = y; } }
  function back(fromHistory) {
    const old = stack.pop(); if (old && old.leave) old.leave();
    if (!stack.length) return close(fromHistory);
    render();
  }
  function close(fromHistory) {
    if (!root || root.hidden) return;
    while (stack.length) { const s = stack.pop(); if (s.leave) try { s.leave(); } catch (e) {} }
    root.hidden = true; document.documentElement.classList.remove("fe-lock");
    if (!fromHistory && !Mode.on) Nav.pop();          // in edit mode the back button still has to leave edit mode
    if (Save.pending) Save.now();                    // closing = save straight away
    if (lastFocus && lastFocus.focus && lastFocus.isConnected) try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
    OwnerBox.paint();
  }
  function status(t, cls) { if (statusB) { statusB.textContent = t || ""; statusB.className = "fe-status" + (cls ? " " + cls : ""); } }
  return { open, swap, back, close, redraw, status, get isOpen() { return !!root && !root.hidden; }, get top() { return stack[stack.length - 1]; } };
})();

/* ======================= EDIT MODE ======================= */
// The page itself is the editor: everything that can change shows a dashed outline, ✎ or ＋.
// A tap on it opens a small panel for just that thing. The bar at the bottom: themes, "Saved ✓", ⋯ (more) and Done.
const Mode = (() => {
  let on = false, bar = null, statusEl = null, stTxt = "", stCls = "";
  const TAPS = [   // [what was tapped, what to open]
    ["[data-open]", el => el.dataset.open],
    [".name-wrap", () => "name"],
    [".typed", () => "bio"],
    [".kana", () => "more:kana"],
    [".count", () => "more:birthday"],
    [".ticker", () => "more:ticker"],
    ["#socGrid .soc[data-soc]", el => "social:" + el.dataset.soc],
    ["#linkList .lnk", el => "link:" + [...el.parentNode.children].indexOf(el)],
    ["#grid .card[data-id]", el => "item:" + el.dataset.id]
  ];
  function build() {
    bar = node(`<div class="et" role="toolbar" aria-label="Editing your page" hidden>
      <div class="et-skins" role="group" aria-label="Theme">${SKINS.map(([k, n, g]) => `<button class="et-skin" type="button" data-skin="${k}" aria-label="Theme: ${n}" aria-pressed="false" style="background:${g}"></button>`).join("")}</div>
      <button class="et-status" type="button" aria-live="polite"></button>
      <button class="et-more" type="button" aria-label="More settings">⋯</button>
      <button class="et-done" type="button">Done</button></div>`);
    document.body.appendChild(bar);
    statusEl = $(".et-status", bar);
    bar.addEventListener("click", e => {
      const s = e.target.closest(".et-skin");   // (not [data-skin]: the page itself has one)
      if (s) { setSkin(s.dataset.skin); return; }
      if (e.target.closest(".et-done")) { Snd.fx("tick"); done(); return; }
      if (e.target.closest(".et-more")) { Snd.fx("tick"); Sheet.open(scr.more()); return; }
      if (e.target.closest(".et-status")) Save.retry();
    });
    // while editing, a tap on the page opens the editor for what was tapped (instead of opening links, liking...)
    const catcher = e => {
      if (!on || Sheet.isOpen || !e.target.closest) return;
      const app = $("#app"), t = e.target;
      if (!app || !app.contains(t) || t.closest("#authBtn, .brand")) return;
      for (const [sel, fn] of TAPS) {
        const el = t.closest(sel);
        if (el && app.contains(el)) {
          e.preventDefault(); e.stopPropagation();
          if (e.type === "click") { Snd.fx("tick"); go(fn(el), true); }
          return;
        }
      }
    };
    addEventListener("click", catcher, true);
    addEventListener("dblclick", catcher, true);
  }
  function paintBar() {
    if (!bar) return;
    const k = curSkin();
    $$(".et-skin", bar).forEach(b => b.setAttribute("aria-pressed", String(b.dataset.skin === k)));
    statusEl.textContent = stTxt || "Saved ✓"; statusEl.className = "et-status" + (stCls ? " " + stCls : "");
  }
  function status(t, cls) { stTxt = t || ""; stCls = cls || ""; if (on) paintBar(); }
  function enter() {
    if (on) return;
    on = true; if (!bar) build();
    document.body.classList.add("editing"); bar.hidden = false; paintBar();
    Nav.push();
    const n = LS.get("editHint", 0); if (n < 3) { LS.set("editHint", n + 1); toast("Tap anything on your page to change it ✎"); }
  }
  function exit(fromHistory) {
    if (!on) return;
    on = false; Sheet.close(true);
    document.body.classList.remove("editing"); bar.hidden = true;
    if (!fromHistory) Nav.pop();
    if (Save.pending) Save.now();
    OwnerBox.paint(); Og.soon(1200);
  }
  async function done() {
    const b = $(".et-done", bar);
    if (Save.busy) { b.disabled = true; b.textContent = "Saving…"; await Save.settle(15000); b.disabled = false; b.textContent = "Done"; }
    if (Save.failed) { toast("Not saved yet. Check your internet and tap Done again."); return; }
    exit(); toast("Saved ✓");
    const k = "fresh@" + me().id;
    if (LS.get(k, 0)) { LS.del(k); setTimeout(() => go("share"), 600); }    // their very first time: show how to share it
  }
  // what = photo | name | bio | socials | social:instagram | link:0 | link-add | item:<id> | collection-add | more | share | activity | story | start | edit
  // sync = we're still inside the tap (phones only open the photo gallery straight from a tap)
  function go(what, sync) {
    const parts = String(what || "edit").split(":"), name = parts[0], arg = parts.slice(1).join(":");
    if (name === "share" || name === "activity" || name === "story") { Sheet.open(scr[name]()); return; }
    enter();
    if (name === "start") { LS.set("fresh@" + me().id, 1); toast("Your page is live 🎉 Tap anything to change it"); return; }
    if (name === "photo") { peek($(".name-wrap")); if (!curM().cover && sync) pickPhoto("cover"); else Sheet.open(scr.photo()); }
    else if (name === "collection-add") { peek($("#vault")); if (sync) addPhotosNow(); else Sheet.open(scr.addPhotos()); }
    else if (name === "socials") { peek($("#links")); Sheet.open(scr.socials()); }
    else if (name === "social" && SOCIAL[arg]) { peek($(`#socGrid [data-soc="${arg}"]`) || $("#links")); Sheet.open(scr.social(arg)); }
    else if (name === "link-add") { peek($("#links")); Sheet.open(scr.link(-1)); }
    else if (name === "link") { peek($$("#linkList .lnk")[+arg]); Sheet.open(scr.link(+arg)); }
    else if (name === "item") { peek($$("#grid .card").find(c => c.dataset.id === arg)); Sheet.open(scr.item(arg)); }
    else if (name === "name" || name === "bio") { peek($(".name-wrap")); Sheet.open(scr[name]()); }
    else if (name === "more") Sheet.open(scr.more(arg));
  }
  addEventListener("keydown", e => { if (e.key === "Escape" && on && !Sheet.isOpen && $("#authModal").hidden) { e.preventDefault(); done(); } });
  return { go, enter, exit, status, paintBar, get on() { return on; } };
})();
function setSkin(k) { if (!SKINS.some(s => s[0] === k)) return; skinTouched = false; applySkin(k, true, true); edit(D => { P(D).skin = k; }); Mode.paintBar(); }

/* ======================= THE PANELS ======================= */
const scr = {};
const DONE = `<button class="fe-btn" type="button" data-fe-x>Done</button>`;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const PICKS = ["🎮 Gamer", "🎌 Anime fan", "🎧 Music lover", "📸 Photography", "⚽ Football", "🏏 Cricket", "📚 Student", "🎨 Artist", "💻 Coder", "✈️ Travel", "🍜 Foodie", "💪 Gym rat"];
const pad2 = n => String(n).padStart(2, "0");
const move = (a, i, d) => { const j = i + d; if (i < 0 || j < 0 || j >= a.length) return; const x = a[i]; a[i] = a[j]; a[j] = x; };

/* ---------- name ---------- */
scr.name = () => ({
  title: "Your name", focus: true,
  draw(b, f) {
    const p = P(cur());
    b.innerHTML = `<input class="fe-in big" id="feName" maxlength="24" value="${esc(p.name || CONFIG.name || "")}" placeholder="e.g. Riya" autocomplete="nickname" enterkeyhint="done" aria-label="Your name">
      ${p.heroName ? `<div><label class="fe-lab" for="feHero">Big name at the top</label><input class="fe-in" id="feHero" maxlength="14" value="${esc(p.heroName)}" enterkeyhint="done"></div>` : ""}`;
    f.innerHTML = DONE;
    const n = $("#feName", b), h = $("#feHero", b);
    n.addEventListener("input", () => edit(D => { P(D).name = n.value.slice(0, 24); }));
    if (h) h.addEventListener("input", () => edit(D => { P(D).heroName = h.value.trim().slice(0, 14); }));
    b.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); Sheet.close(); } });
  }
});

/* ---------- bio ---------- */
scr.bio = () => ({
  title: "Bio",
  draw(b, f) {
    const p = P(cur()), lines = (Array.isArray(p.titles) ? p.titles : []).slice(0, 6), have = lines.map(t => String(t).trim());
    b.innerHTML = `${lines.length ? `<div class="fe-list">${lines.map((t, i) => `<div class="fe-li"><input class="fe-in" data-line="${i}" maxlength="40" value="${esc(t)}" placeholder="Something about you" aria-label="Bio line ${i + 1}"><button class="fe-mini" type="button" data-rm="${i}" aria-label="Remove this line">✕</button></div>`).join("")}</div>` : ""}
      ${lines.length < 6 ? `<button class="fe-btn small ghost" type="button" data-addline>＋ Write a line</button>` : ""}
      <p class="fe-p">Or tap to add:</p>
      <div class="fe-chips">${PICKS.map(x => `<button class="fe-chip" type="button" data-pickline="${esc(x)}" aria-pressed="${have.includes(x)}">${esc(x)}</button>`).join("")}</div>`;
    f.innerHTML = DONE;
    b.addEventListener("input", e => {
      const i = e.target.dataset.line; if (i === undefined) return;
      edit(D => { const q = P(D); q.titles = (Array.isArray(q.titles) ? q.titles : []).slice(); q.titles[+i] = e.target.value.slice(0, 40); });
    });
    b.addEventListener("click", e => {
      const rm = e.target.closest("[data-rm]"), add = e.target.closest("[data-addline]"), pick = e.target.closest("[data-pickline]");
      if (rm) { edit(D => { const q = P(D); q.titles = (q.titles || []).filter((_, j) => j !== +rm.dataset.rm); }); Snd.fx("unpop"); Sheet.redraw(); }
      else if (add) {
        edit(D => { const q = P(D); q.titles = (q.titles || []).filter(t => String(t).trim()).concat(""); });
        Sheet.redraw(); setTimeout(() => { const ins = $$(".fe-body [data-line]"); if (ins.length) ins[ins.length - 1].focus(); }, 40);
      } else if (pick) {
        const v = pick.dataset.pickline;
        edit(D => { const q = P(D), t = (q.titles || []).map(x => String(x).trim()).filter(Boolean); q.titles = t.includes(v) ? t.filter(x => x !== v) : t.length < 6 ? t.concat(v) : t; });
        Snd.fx("pop"); Sheet.redraw();
      }
    });
  }
});

/* ---------- photos ---------- */
async function setPhoto(key, file) {
  if (key !== "cover") { const p = await Files.put(key, file, { max: 400, bytes: 120000 }); if (p) Snd.fx("pop"); return; }
  const autoAvatar = !curM().avatar;
  const p = await Files.stage("cover", file, { max: 1600, bytes: 460000 }); if (!p) return;
  Snd.fx("pop"); Sheet.redraw();
  let sq = null; if (autoAvatar) { try { sq = await Files.square(p.canvas, 400); } catch (e) {} }
  const ok = await Files.send("cover", p, {});
  if (ok && sq && !curM().avatar) await Files.put("avatar", sq, { max: 400, bytes: 120000 });   // their round profile picture, made from it
}
const pickPhoto = key => Files.pick(false).then(fs => { if (fs[0]) setPhoto(key, fs[0]); });
async function avatarFromCover() {
  const src = curM().cover; if (!src) return;
  const im = await new Promise(res => { const i = new Image(), remote = /^https:/.test(src); if (remote) i.crossOrigin = "anonymous"; i.onload = () => res(i); i.onerror = () => res(null); i.src = remote ? src + (src.includes("?") ? "&" : "?") + "draw=1" : src; });
  let sq = null;
  if (im) { try { const c = document.createElement("canvas"); c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext("2d").drawImage(im, 0, 0); sq = await Files.square(c, 400); } catch (e) {} }
  if (!sq) { toast("Couldn't use that photo here. Choose one from your phone instead."); return; }
  if (await Files.put("avatar", sq, { max: 400, bytes: 120000 })) Snd.fx("pop");
}
scr.photo = () => ({
  title: "Photos",
  draw(b, f) {
    const M = curM(), cover = M.cover, av = M.avatar;
    b.innerHTML = `<button class="fe-cover${cover ? " has" : ""}" type="button" data-pick="cover" aria-label="${cover ? "Change" : "Choose"} your main photo">${cover ? `<img src="${esc(cover)}" alt="">` : ""}<span class="fe-cover-l">📷 ${cover ? "Change photo" : "Choose a photo"}</span></button>
      <div class="fe-avrow"><img class="fe-av" src="${esc(av || FLEX_AVATAR)}" alt=""><div style="flex:1;min-width:0"><b>Profile picture</b><div class="fe-btns" style="margin-top:8px"><button class="fe-btn small ghost" type="button" data-pick="avatar">${av ? "Change" : "Choose"}</button>${cover ? `<button class="fe-btn small ghost" type="button" data-fromcover>Use main photo</button>` : ""}</div></div></div>
      ${cover ? `<button class="fe-btn small danger" type="button" data-del="cover">Remove main photo</button>` : ""}`;
    f.innerHTML = DONE;
    b.addEventListener("click", e => {
      const pk = e.target.closest("[data-pick]"), dl = e.target.closest("[data-del]");
      if (pk) pickPhoto(pk.dataset.pick);
      else if (dl && arm(dl, "Tap again to remove")) { Snd.fx("unpop"); Files.drop(dl.dataset.del); Sheet.redraw(); }
      else if (e.target.closest("[data-fromcover]")) avatarFromCover();
    });
  }
});

/* ---------- more (the ⋯ in the bar) ---------- */
scr.more = focusOn => ({
  title: "More",
  draw(b, f) {
    const p = P(cur()), name = p.name || CONFIG.name || "", on = BDAY_RE.test(p.birthday || ""), parts = on ? p.birthday.split("-") : ["", ""];
    const tick = (Array.isArray(p.ticker) && p.ticker.length ? p.ticker : CONFIG.ticker || []).slice(0, 8);
    b.innerHTML = `<section class="fe-sec" data-sec="birthday"><h4>🎂 Birthday countdown</h4>
        <div class="fe-two"><select class="fe-in" id="feBm" aria-label="Birthday month"><option value="">Month</option>${MONTHS.map((m, i) => `<option value="${pad2(i + 1)}"${parts[0] === pad2(i + 1) ? " selected" : ""}>${m}</option>`).join("")}</select>
        <select class="fe-in" id="feBd" aria-label="Birthday day"><option value="">Day</option>${Array.from({ length: 31 }, (_, i) => `<option value="${pad2(i + 1)}"${parts[1] === pad2(i + 1) ? " selected" : ""}>${i + 1}</option>`).join("")}</select></div>
        ${on ? `<button class="fe-btn small ghost" type="button" data-off>Turn off</button>` : ""}</section>
      <section class="fe-sec" data-sec="hero"><h4>Big name at the top</h4><input class="fe-in" data-p="heroName" maxlength="14" value="${esc(p.heroName || "")}" placeholder="${esc(String(name).toUpperCase().slice(0, 14))}" aria-label="Big name at the top"></section>
      <section class="fe-sec" data-sec="kana"><h4>Small line under it</h4><input class="fe-in" data-p="kana" maxlength="30" value="${esc(p.kana || "")}" placeholder="@${esc(me().username || "")}" aria-label="Small line under the name"></section>
      <section class="fe-sec" data-sec="ticker"><h4>Moving strip</h4><div class="fe-list">${tick.map((t, i) => `<div class="fe-li"><input class="fe-in" data-tick="${i}" maxlength="30" value="${esc(t)}" aria-label="Words ${i + 1}"><button class="fe-mini" type="button" data-rmt="${i}" aria-label="Remove">✕</button></div>`).join("")}</div>
        ${tick.length < 8 ? `<button class="fe-btn small ghost" type="button" data-addt>＋ Add words</button>` : ""}</section>`;
    f.innerHTML = DONE;
    const upd = () => { const m = $("#feBm", b).value, d = $("#feBd", b).value; if (m && d && BDAY_RE.test(m + "-" + d)) { edit(D => { P(D).birthday = m + "-" + d; }); Snd.fx("pop"); Sheet.redraw(); } };
    $("#feBm", b).addEventListener("change", upd); $("#feBd", b).addEventListener("change", upd);
    const tickNow = () => $$("[data-tick]", b).map(x => x.value.trim().slice(0, 30));
    b.addEventListener("input", e => {
      const k = e.target.dataset.p;
      if (k) edit(D => { P(D)[k] = e.target.value.trim().slice(0, k === "heroName" ? 14 : 30); });
      else if (e.target.dataset.tick !== undefined) { const t = tickNow(); edit(D => { P(D).ticker = t; }); }
    });
    b.addEventListener("click", e => {
      const rm = e.target.closest("[data-rmt]");
      if (e.target.closest("[data-off]")) { edit(D => { P(D).birthday = ""; }); Snd.fx("unpop"); Sheet.redraw(); }
      else if (rm) { const t = tickNow().filter((_, j) => j !== +rm.dataset.rmt); edit(D => { P(D).ticker = t; }); Snd.fx("unpop"); Sheet.redraw(); }
      else if (e.target.closest("[data-addt]")) { const t = tickNow().concat(""); edit(D => { P(D).ticker = t; }); Sheet.redraw(); setTimeout(() => { const ins = $$(".fe-body [data-tick]"); if (ins.length) ins[ins.length - 1].focus(); }, 40); }
    });
    if (focusOn) setTimeout(() => {
      const sec = $(`[data-sec="${focusOn}"]`, b); if (!sec) return;
      sec.scrollIntoView({ block: "start" });
      const i = $("input, select", sec); if (i && fine) try { i.focus({ preventScroll: true }); } catch (e) {}
    }, 60);
  }
});

/* ---------- socials & links ---------- */
const ASK = {   // what to ask for each app: [question, example, tip]
  instagram: ["Your Instagram username", "yourname", "Or paste your profile link."],
  snapchat: ["Your Snapchat username", "yourname", "Or paste your add-me link."],
  youtube: ["Your channel's @handle", "yourchannel", "Or paste your channel link."],
  whatsapp: ["Your WhatsApp number", "91 98765 43210", "With the country code. It shows on your page."],
  x: ["Your X username", "yourname", "Or paste your profile link."],
  tiktok: ["Your TikTok username", "yourname", "Or paste your profile link."],
  discord: ["Your server's invite link", "discord.gg/abc123", "In Discord: your server › Invite › Copy link."],
  spotify: ["Link to your playlist, song or profile", "open.spotify.com/playlist/…", "In Spotify: ⋯ › Share › Copy link."],
  telegram: ["Your Telegram username", "yourname", "Or paste your t.me link."],
  twitch: ["Your Twitch username", "yourname", "Or paste your channel link."],
  github: ["Your GitHub username", "yourname", "Or paste your profile link."],
  linkedin: ["Your LinkedIn profile link", "linkedin.com/in/yourname", "In LinkedIn: your profile › ⋯ › Share › Copy link."],
  facebook: ["Your Facebook username", "your.name", "Or paste your profile link."],
  threads: ["Your Threads username", "yourname", "Usually the same as your Instagram one."],
  pinterest: ["Your Pinterest username", "yourname", "Or paste your profile link."],
  reddit: ["Your Reddit username", "yourname", "Without the u/ at the start."],
  steam: ["Your Steam profile link", "steamcommunity.com/id/yourname", "Open your profile in Steam and copy its link."],
  email: ["Your email", "you@gmail.com", "It shows on your page so people can email you."]
};
const WRONG = {
  whatsapp: "Type the number with the country code, like 91 98765 43210.", discord: "Paste an invite link that looks like discord.gg/abc123.",
  spotify: "Paste a Spotify link (it starts with open.spotify.com).", email: "That email doesn't look right.",
  linkedin: "Paste your profile link: linkedin.com/in/yourname", steam: "Paste your profile link: steamcommunity.com/id/yourname"
};
const shownValue = (k, v) => (!v ? "" : k === "spotify" ? SOCIAL.spotify.url(v) : k === "steam" ? (v.startsWith("id/") ? v.slice(3) : SOCIAL.steam.url(v)) : v);
scr.socials = () => ({
  title: "Add a social",
  draw(b) {
    const S = cur().socials;
    b.innerHTML = `<div class="fe-plat">${ORDER.map(k => `<button class="fe-pl${S.some(s => s.k === k) ? " on" : ""}" type="button" data-plat="${k}">${socIc(k)}<span>${esc(SOCIAL[k].label)}</span></button>`).join("")}
      <button class="fe-pl" type="button" data-other><span class="soc-ic" style="background:linear-gradient(135deg,var(--pink),var(--violet))" aria-hidden="true">${icon("link")}</span><span>Other link</span></button></div>`;
    b.addEventListener("click", e => {
      const pl = e.target.closest("[data-plat]");
      if (pl) { Snd.fx("tick"); Sheet.open(scr.social(pl.dataset.plat)); }
      else if (e.target.closest("[data-other]")) { Snd.fx("tick"); Sheet.open(scr.link(-1)); }
    });
  }
});
// extras for the big cards (all optional): photos on the Instagram card, Snapchat stories, a Spotify cover...
function slotHtml(key, M, label) {
  const u = M[key];
  return `<div style="position:relative"><button class="fe-slot${u ? " has" : ""}" type="button" data-slot="${key}" aria-label="${u ? "Change" : "Add"} ${esc(label)}">${u ? `<img src="${esc(u)}" alt="">` : "＋"}</button>${u ? `<button class="fe-slot-x" type="button" data-unslot="${key}" aria-label="Remove ${esc(label)}">✕</button>` : ""}</div>`;
}
function fancyHtml(k, D) {
  const M = curM(), box = (sum, inner) => `<details class="fe-more"><summary>${sum}</summary><div>${inner}</div></details>`;
  const inp = (path, val, ph, max, mode, label) => `<input class="fe-in" data-f="${path}" maxlength="${max}" value="${esc(val === undefined || val === null ? "" : val)}" placeholder="${esc(ph)}" aria-label="${esc(label)}"${mode ? ` inputmode="${mode}"` : ""}>`;
  if (k === "instagram") {
    const posts = ((D.instagram || {}).posts) || [];
    return box("📸 Photos on this card", `<div class="fe-slots">${[0, 1, 2].map(i => slotHtml("ig" + i, M, "photo " + (i + 1))).join("")}</div>` +
      [0, 1, 2].filter(i => M["ig" + i]).map(i => inp("instagram.posts." + i + ".cap", (posts[i] || {}).cap, "Caption for photo " + (i + 1), 60, "", "Caption for photo " + (i + 1))).join(""));
  }
  if (k === "snapchat") {
    const C = D.snapchat || {}, st = C.stories || [];
    return box("👻 Snapscore, streak & stories", `<div class="fe-two"><div><label class="fe-lab">Snapscore</label>${inp("snapchat.score", C.score, "e.g. 25000", 12, "numeric", "Snapscore")}</div><div><label class="fe-lab">Streak (days)</label>${inp("snapchat.streak", C.streak, "e.g. 120", 6, "numeric", "Streak")}</div></div>
      <div class="fe-slots four">${[0, 1, 2, 3].map(i => slotHtml("sc" + i, M, "story " + (i + 1))).join("")}</div>` +
      [0, 1, 2, 3].filter(i => M["sc" + i]).map(i => inp("snapchat.stories." + i + ".cap", (st[i] || {}).cap, "Caption for story " + (i + 1), 60, "", "Caption for story " + (i + 1))).join(""));
  }
  if (k === "x") return box("🖼️ A picture on this card", `<div class="fe-slots">${slotHtml("x0", M, "picture")}</div>`);
  if (k === "spotify") {
    const C = D.spotify || {};
    return box("🎵 Name & cover", `${inp("spotify.playlist", C.playlist, "Name, e.g. Late night drives", 50, "", "Name")}${inp("spotify.artist", C.artist, "By, e.g. Playlist by Riya", 50, "", "By")}<div class="fe-slots">${slotHtml("spCover", M, "cover")}</div>`);
  }
  if (k === "discord") return box("💬 What your server is about", `<textarea class="fe-in" data-f="discord.blurb" maxlength="140" placeholder="e.g. Late-night gaming and anime talk." aria-label="What your server is about">${esc((D.discord || {}).blurb || "")}</textarea>`);
  return "";
}
function setPath(o, path, v) {
  const ks = path.split("."); let x = o;
  for (let i = 0; i < ks.length - 1; i++) { const k = ks[i], nk = ks[i + 1]; if (!x[k] || typeof x[k] !== "object") x[k] = /^\d+$/.test(nk) ? [] : {}; x = x[k]; }
  x[ks[ks.length - 1]] = v;
}
function bindFancy(b) {
  b.addEventListener("input", e => { const path = e.target.dataset.f; if (path) edit(D => setPath(D, path, e.target.value.slice(0, 140))); });
  b.addEventListener("click", e => {
    const sl = e.target.closest("[data-slot]"), un = e.target.closest("[data-unslot]");
    if (un) { Files.drop(un.dataset.unslot); Snd.fx("unpop"); Sheet.redraw(); return; }
    if (sl) { const k = sl.dataset.slot; Files.pick(false).then(async fs => { if (fs[0] && await Files.put(k, fs[0], { max: /^sc/.test(k) ? 900 : 720, bytes: 190000 })) Snd.fx("pop"); }); }
  });
}
scr.social = k => {
  const d = SOCIAL[k]; let extrasOpen = false;   // the extras stay open when the panel redraws (after a photo is added)
  return {
    title: d.label, focus: true,
    draw(b, f) {
      const D = cur(), i = D.socials.findIndex(s => s.k === k), has = D.socials[i], A = ASK[k] || ["Your username", "yourname", ""];
      const pre = d.at || k === "youtube" ? "@" : k === "whatsapp" ? "+" : "";
      b.innerHTML = `<div class="fe-head-ic">${socIc(k)}<label class="fe-lab" for="feV">${esc(A[0])}</label></div>
        <div><div class="fe-pre" id="fePre">${pre ? `<span aria-hidden="true">${pre}</span>` : ""}<input class="fe-in" id="feV" value="${esc(shownValue(k, has && has.v))}" placeholder="${esc(A[1])}" autocapitalize="none" autocorrect="off" spellcheck="false" autocomplete="off" enterkeyhint="done"${k === "whatsapp" ? ' inputmode="tel"' : k === "email" ? ' type="email" inputmode="email"' : ""}></div>
        <p class="fe-msg" id="feVm">${esc(A[2])}</p></div>
        ${has ? fancyHtml(k, D) : ""}
        ${has && D.socials.length > 1 ? `<div class="fe-btns"><button class="fe-btn small ghost" type="button" data-mv="-1"${i ? "" : " disabled"}>↑ Move up</button><button class="fe-btn small ghost" type="button" data-mv="1"${i < D.socials.length - 1 ? "" : " disabled"}>↓ Move down</button></div>` : ""}`;
      const dt = $("details", b); if (dt) { dt.open = extrasOpen; dt.addEventListener("toggle", () => { extrasOpen = dt.open; }); }
      f.innerHTML = has ? `<button class="fe-btn danger" type="button" data-rm>Remove</button>${DONE}` : `<button class="fe-btn" type="button" data-ok>Add to my page</button>`;
      const inp = $("#feV", b), msg = $("#feVm", b), box = $("#fePre", b);
      const check = final => {
        const raw = inp.value.trim(), v = parseSocial(k, raw);
        box.classList.toggle("bad", !!raw && !v && final);
        if (!raw) { msg.className = "fe-msg"; msg.textContent = A[2]; return ""; }
        if (v) { const u = d.url(v); msg.className = "fe-msg ok"; msg.innerHTML = `✓ Opens <a href="${esc(u)}" target="_blank" rel="noopener">${esc(u.replace(/^mailto:|^https?:\/\/(www\.)?/, ""))}</a>`; return v; }
        msg.className = "fe-msg" + (final ? " bad" : ""); msg.textContent = final ? (WRONG[k] || `That doesn't look like a ${d.label} username. Check it, or paste your profile link.`) : A[2];
        return "";
      };
      if (has) check(false);
      inp.addEventListener("input", () => { const v = check(false); if (has && v) edit(D => { const s = D.socials.find(x => x.k === k); if (s) s.v = v; }); });
      inp.addEventListener("blur", () => { if (inp.value.trim()) check(true); });
      const add = () => {
        const v = check(true); if (!v) { inp.focus(); return; }
        edit(D => { if (!D.socials.some(x => x.k === k)) D.socials.push({ k, v }); });
        Snd.fx("pop"); toast(d.label + " added ✓"); Sheet.close();
        setTimeout(() => peek($(`#socGrid [data-soc="${k}"]`)), 120);
      };
      inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); if (has) Sheet.close(); else add(); } });
      b.addEventListener("click", e => {
        const mv = e.target.closest("[data-mv]");
        if (mv && !mv.disabled) { edit(D => move(D.socials, D.socials.findIndex(x => x.k === k), +mv.dataset.mv)); Snd.fx("tick"); Sheet.redraw(); setTimeout(() => peek($(`#socGrid [data-soc="${k}"]`)), 60); }
      });
      f.addEventListener("click", e => {
        if (e.target.closest("[data-ok]")) return add();
        const rm = e.target.closest("[data-rm]");
        if (rm && arm(rm, "Tap again to remove")) { edit(D => { D.socials = D.socials.filter(x => x.k !== k); }); Snd.fx("unpop"); toast(d.label + " removed"); Sheet.close(); }
      });
      if (has) bindFancy(b);
    }
  };
};
function normUrl(s) {
  s = String(s || "").trim(); if (!s || /^(javascript|data|vbscript|file):/i.test(s)) return "";
  if (!/^https?:\/\//i.test(s)) s = "https://" + s.replace(/^\/+/, "");
  try { const u = new URL(s); return /\.[a-z]{2,}$/i.test(u.hostname) ? u.href : ""; } catch (e) { return ""; }
}
scr.link = i => ({
  title: i >= 0 ? "Link" : "Add a link", focus: true,
  draw(b, f) {
    const D = cur(), l = i >= 0 ? D.links[i] : null;
    if (i >= 0 && !l) { setTimeout(() => Sheet.close()); return; }
    if (!l && D.links.length >= (CONFIG.linkLimit || 8)) { b.innerHTML = `<p class="fe-p">You have ${D.links.length} links, the most a page can have. Remove one to add another.</p>`; f.innerHTML = DONE; return; }
    b.innerHTML = `<div><label class="fe-lab" for="feLu">Link</label><input class="fe-in" id="feLu" maxlength="300" value="${esc(l ? l.u : "")}" placeholder="e.g. youtube.com/watch?v=…" autocapitalize="none" autocorrect="off" spellcheck="false" autocomplete="off" inputmode="url"><p class="fe-msg" id="feLm"></p></div>
      <div><label class="fe-lab" for="feLt">Button text</label><input class="fe-in" id="feLt" maxlength="40" value="${esc(l ? l.t : "")}" placeholder="e.g. My new video"></div>`;
    f.innerHTML = l ? `<button class="fe-btn danger" type="button" data-rm>Remove</button><button class="fe-btn" type="button" data-ok>Done</button>` : `<button class="fe-btn" type="button" data-ok>Add to my page</button>`;
    const u = $("#feLu", b), t = $("#feLt", b), m = $("#feLm", b);
    const check = final => {
      if (!u.value.trim()) { m.className = "fe-msg"; m.textContent = ""; return ""; }
      const v = normUrl(u.value);
      if (v) { m.className = "fe-msg ok"; m.textContent = "✓ " + v.replace(/^https?:\/\/(www\.)?/, ""); return v; }
      m.className = "fe-msg" + (final ? " bad" : ""); m.textContent = final ? "That doesn't look like a link. It should look like youtube.com/…" : "";
      return "";
    };
    u.addEventListener("input", () => check(false));
    if (l) check(false);
    const ok = () => {
      const v = check(true); if (!v) { u.focus(); return; }
      edit(D => { const it = { t: t.value.trim().slice(0, 40), u: v.slice(0, 300) }; if (i >= 0 && D.links[i]) D.links[i] = it; else if (D.links.length < (CONFIG.linkLimit || 8)) D.links.push(it); });
      Snd.fx("pop"); if (!l) toast("Link added ✓"); Sheet.close();
      setTimeout(() => peek($("#linkList")), 120);
    };
    b.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); ok(); } });
    f.addEventListener("click", e => {
      if (e.target.closest("[data-ok]")) return ok();
      const rm = e.target.closest("[data-rm]");
      if (rm && arm(rm, "Tap again to remove")) { edit(D => { D.links.splice(i, 1); }); Snd.fx("unpop"); Sheet.close(); }
    });
  }
});

/* ---------- collection ---------- */
function addPhotosNow() {
  const room = colMax() - cur().collection.length;
  if (room <= 0) { toast("All " + colMax() + " spots are used. Delete one to add another."); return; }
  Files.pick(true).then(files => { if (files.length) addPhotos(files, room); });
}
async function addPhotos(files, room) {
  const use = files.slice(0, room);
  if (files.length > room) toast("Only " + room + " " + plural(room, "spot") + " left, so " + room + " " + plural(room, "photo") + " added.");
  const staged = [];
  for (const file of use) {                         // they all show at once…
    const id = newId(), o = { max: 720, bytes: 170000, change: D => { D.collection.push({ id, alt: "", meme: "" }); }, undo: D => { D.collection = D.collection.filter(x => x.id !== id); } };
    const p = await Files.stage("col_" + id, file, o); if (p) staged.push([id, p, o]);
  }
  if (!staged.length) return;
  Snd.fx("pop"); setTimeout(() => peek($("#vault")), 60);
  for (const [id, p, o] of staged) await Files.send("col_" + id, p, o);   // …then upload one by one (easier on slow internet)
}
scr.addPhotos = () => ({
  title: "Add photos",
  draw(b) {
    b.innerHTML = `<button class="fe-cover" type="button" data-addp><span class="fe-cover-l">📸 Choose photos</span></button>`;
    b.addEventListener("click", e => { if (e.target.closest("[data-addp]")) { Sheet.close(); addPhotosNow(); } });
  }
});
const ITEM_MAX = { amount: 16, unit: 16, game: 30, meme: 40, alt: 80 };
scr.item = id => ({
  title: "Photo",
  draw(b, f) {
    const D = cur(), M = curM(), i = D.collection.findIndex(x => x.id === id);
    if (i < 0) { setTimeout(() => Sheet.close()); return; }
    const it = D.collection[i], n = D.collection.length;
    const moves = n > 1 ? `<div class="fe-btns"><button class="fe-btn small ghost" type="button" data-mv="-1"${i ? "" : " disabled"}>← Move</button><button class="fe-btn small ghost" type="button" data-mv="1"${i < n - 1 ? "" : " disabled"}>Move →</button></div>` : "";
    const field = (k, label, ph) => `<div><label class="fe-lab" for="fe-${k}">${label}</label><input class="fe-in" id="fe-${k}" data-f="${k}" maxlength="${ITEM_MAX[k]}" value="${esc(it[k] || "")}" placeholder="${esc(ph)}"></div>`;
    if (it.type === "uc") {
      b.innerHTML = `<div class="fe-th"><b>${esc(it.amount || "")}</b><small>${esc(it.unit || "")}</small></div>${moves}${field("amount", "Big text", "e.g. 10,000")}${field("unit", "Second line", "e.g. UC")}${field("game", "Small label", "e.g. PUBG MOBILE")}`;
    } else {
      const src = M["col_" + id] || (it.img ? bestSrc(it.img) : "");
      b.innerHTML = `<button class="fe-cover sq has" type="button" data-replace aria-label="Replace photo">${src ? `<img src="${esc(src)}" alt="">` : ""}<span class="fe-cover-l">📷 Replace</span></button>${moves}
        ${field("meme", "Text on the photo", "e.g. THOSE WHO KNOW")}${field("alt", "Caption", "e.g. My new keyboard")}`;
    }
    f.innerHTML = `<button class="fe-btn danger" type="button" data-del>Delete</button>${DONE}`;
    b.addEventListener("input", e => { const k = e.target.dataset.f; if (!k) return; const v = e.target.value.slice(0, ITEM_MAX[k] || 80); edit(D => { const x = D.collection.find(y => y.id === id); if (x) x[k] = v; }); });
    b.addEventListener("click", e => {
      if (e.target.closest("[data-replace]")) { Files.pick(false).then(async fs => { if (fs[0] && await Files.put("col_" + id, fs[0], { max: 720, bytes: 170000 })) Snd.fx("pop"); }); return; }
      const mv = e.target.closest("[data-mv]");
      if (mv && !mv.disabled) { edit(D => move(D.collection, D.collection.findIndex(x => x.id === id), +mv.dataset.mv)); Snd.fx("tick"); Sheet.redraw(); setTimeout(() => peek($$("#grid .card").find(c => c.dataset.id === id)), 60); }
    });
    f.addEventListener("click", e => {
      const del = e.target.closest("[data-del]");
      if (!del || !arm(del, "Tap again to delete")) return;
      const D2 = cur(), M2 = curM(); D2.collection = D2.collection.filter(x => x.id !== id); ["", "_icon", "_logo"].forEach(s => { delete M2["col_" + id + s]; });
      commit(D2, M2); Snd.fx("unpop"); toast("Deleted"); Sheet.close();
    });
  }
});

/* ======================= THE LINK PREVIEW (what chats show when the link is sent) ======================= */
// WhatsApp, Instagram, iMessage, Telegram, Discord... show a picture, a title and a line of text for a link.
// This makes that picture for the owner's page (their theme, photo, name and bio) and saves it with the page.
// A small job on GitHub (tools/previews.mjs) copies it into flexippo.com/name for the chat apps every few minutes.
const Og = (() => {
  const GEN = 1, W = 1200, H = 630;                  // GEN: raise it to remake everyone's picture after a design change
  const PAL = {
    night: { bg: "#07051a", bg2: "#1a0d40", ink: "#f6f1ff", pink: "#ff2e88", violet: "#8b5cff", accent: "#22e4ff", chip: "rgba(255,255,255,0.08)", line: "rgba(255,255,255,0.18)", grid: "rgba(255,255,255,0.045)", dark: 1 },
    sakura: { bg: "#fff0f6", bg2: "#ffd6e7", ink: "#2b0e2c", pink: "#ff3d86", violet: "#9b5cff", accent: "#7c3aed", chip: "rgba(255,255,255,0.82)", line: "rgba(90,20,70,0.16)", grid: "rgba(90,20,70,0.06)", dark: 0 },
    fire: { bg: "#0e0403", bg2: "#2b0905", ink: "#fff4e8", pink: "#ff4b1f", violet: "#ff7a1a", accent: "#ffc21a", chip: "rgba(255,255,255,0.08)", line: "rgba(255,200,150,0.2)", grid: "rgba(255,255,255,0.04)", dark: 1 }
  };
  const JP = /[぀-ヿ㐀-鿿＀-￯]/;
  let busy = false, T = 0, localUrl = "", live, checking = null, lastCheck = 0;
  const nameOf = D => clip(P(D).name, 24) || me().display_name || me().username || "";
  // the title and the line under it (tools/previews.mjs uses the same rules for pages that never made a picture)
  function texts(D) {
    const p = P(D), u = me().username || "", name = nameOf(D);
    const lines = (Array.isArray(p.titles) ? p.titles : []).map(x => String(x || "").trim()).filter(Boolean);
    const socs = (D.socials || []).map(s => SOCIAL[s.k] && SOCIAL[s.k].label).filter(Boolean);
    return {
      t: (same(name, u) ? name : name + " (@" + u + ")").slice(0, 70),
      d: (lines.length ? lines.slice(0, 3).join(" · ") : socs.length ? socs.slice(0, 4).join(" · ") : "flexippo.com/" + u).slice(0, 160)
    };
  }
  function key(D, M) { const p = P(D); return JSON.stringify([GEN, me().username, nameOf(D), clip(p.heroName, 14), clip(p.kana, 30), (p.titles || []).slice(0, 3), M.cover || "", M.avatar || "", p.skin || "", texts(D)]); }
  const uploading = M => Object.values(M || {}).some(u => /^blob:/.test(String(u)));
  function stale() { const D = pageData(), M = Custom.media || {}; return !M.og || !D.og || D.og.k !== key(D, M); }

  /* ---- drawing it (1200 × 630, like the main page's picture) ---- */
  // photos from storage are fetched again for drawing (a copy the page already showed can't be drawn on some phones)
  const forCanvas = src => (/^https:/.test(src) ? src + (src.includes("?") ? "&" : "?") + "draw=1" : src);
  const loadImg = src => new Promise(res => {
    if (!src) return res(null);
    const im = new Image(); if (!/^(blob:|data:|assets\/)/.test(src)) im.crossOrigin = "anonymous";
    im.onload = () => res(im); im.onerror = () => res(null); im.src = forCanvas(src);
  });
  const hexA = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
  function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  function fill(g, im, x, y, w, h, top) { const r = Math.max(w / im.naturalWidth, h / im.naturalHeight), sw = w / r, sh = h / r; g.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh) * top, sw, sh, x, y, w, h); }
  function fit(g, text, font, max, size, min) { let s = size; for (;;) { g.font = font.replace("%", s); if (g.measureText(text).width <= max || s <= min) return s; s -= 2; } }
  function ell(g, text, max) { if (g.measureText(text).width <= max) return text; let t = text; while (t.length > 1 && g.measureText(t + "…").width > max) t = t.slice(0, -1); return t.trimEnd() + "…"; }
  const spacing = (g, px) => { if ("letterSpacing" in g) g.letterSpacing = px + "px"; };
  async function draw(D, M) {
    const p = P(D), pal = PAL[p.skin] || PAL[curSkin()] || PAL.night, u = me().username || "";
    try { await Promise.all(['800 100px "Inter"', '600 26px "Inter"', '400 30px "Share Tech Mono"', '400 90px "Dela Gothic One"'].map(f => document.fonts.load(f))); } catch (e) {}
    const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d");
    // background and a faint grid
    let gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, pal.bg2); gr.addColorStop(0.55, pal.bg); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.fillStyle = pal.grid; for (let x = 40; x < W; x += 40) g.fillRect(x, 0, 1, H); for (let y = 40; y < H; y += 40) g.fillRect(0, y, W, 1);
    // their photo on the right, fading into the background
    const PX = 540, photo = await loadImg(M.cover || M.avatar), av = await loadImg(M.avatar), first = (nameOf(D).trim().charAt(0) || "?").toUpperCase();
    if (photo) fill(g, photo, PX, 0, W - PX, H, 0.22);
    else {
      gr = g.createLinearGradient(PX, 0, W, H); gr.addColorStop(0, pal.pink); gr.addColorStop(1, pal.violet); g.fillStyle = gr; g.fillRect(PX, 0, W - PX, H);
      g.fillStyle = "rgba(255,255,255,0.22)"; g.font = '400 400px "Dela Gothic One", sans-serif'; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(first, PX + (W - PX) / 2 + 60, H / 2 + 20);
      g.textAlign = "left"; g.textBaseline = "alphabetic";
    }
    gr = g.createLinearGradient(PX, 0, PX + 320, 0); gr.addColorStop(0, pal.bg); gr.addColorStop(1, hexA(pal.bg, 0)); g.fillStyle = gr; g.fillRect(PX - 1, 0, 321, H);
    const X = 64, MAXW = 500, kana = clip(p.kana, 30);
    // a big faint Japanese word behind, like the main picture
    if (kana && JP.test(kana)) { g.save(); g.globalAlpha = pal.dark ? 0.08 : 0.09; g.fillStyle = pal.ink; fit(g, kana, '400 %px "Dela Gothic One", sans-serif', 700, 140, 60); g.fillText(kana, 44, 150); g.restore(); }
    // @username with the round profile picture
    g.font = '400 30px "Share Tech Mono", monospace';
    const ut = ell(g, "@" + u, 380), uw = g.measureText(ut).width, PY = 70, PH = 76;
    g.fillStyle = pal.chip; rr(g, X, PY, uw + 116, PH, PH / 2); g.fill(); g.strokeStyle = pal.line; g.lineWidth = 2; g.stroke();
    g.save(); g.beginPath(); g.arc(X + 38, PY + 38, 27, 0, Math.PI * 2); g.clip();
    if (av) fill(g, av, X + 11, PY + 11, 54, 54, 0.3);
    else { gr = g.createLinearGradient(X + 11, PY + 11, X + 65, PY + 65); gr.addColorStop(0, pal.pink); gr.addColorStop(1, pal.violet); g.fillStyle = gr; g.fillRect(X + 11, PY + 11, 54, 54); g.fillStyle = "#fff"; g.font = '800 28px "Inter", sans-serif'; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(first, X + 38, PY + 39); g.textAlign = "left"; }
    g.restore();
    g.strokeStyle = pal.pink; g.lineWidth = 3; g.beginPath(); g.arc(X + 38, PY + 38, 29.5, 0, Math.PI * 2); g.stroke();
    g.font = '400 30px "Share Tech Mono", monospace'; g.fillStyle = pal.ink; g.textBaseline = "middle"; g.fillText(ut, X + 84, PY + PH / 2 + 2); g.textBaseline = "alphabetic";
    // the big name, glowing
    const big = clip(p.heroName, 14) || nameOf(D).toUpperCase().slice(0, 14);
    const ns = fit(g, big, '800 %px "Inter", system-ui, sans-serif', MAXW, 140, 54);
    let y = PY + PH + 26 + Math.round(ns * 0.74);
    g.font = "800 " + ns + 'px "Inter", system-ui, sans-serif'; spacing(g, -2);
    g.save(); g.shadowColor = hexA(pal.pink, pal.dark ? 0.8 : 0.45); g.shadowBlur = 38; g.fillStyle = pal.ink; g.fillText(big, X - 3, y); g.restore();
    g.fillStyle = pal.ink; g.fillText(big, X - 3, y); spacing(g, 0);
    // the small line under it (only if they wrote their own)
    if (kana) {
      y += 54; g.fillStyle = pal.accent; spacing(g, JP.test(kana) ? 14 : 4);
      g.font = JP.test(kana) ? '400 34px "Dela Gothic One", sans-serif' : '400 32px "Share Tech Mono", monospace';
      g.fillText(ell(g, kana, MAXW), X, y); spacing(g, 0);
    }
    // bio lines as little pills
    const lines = (Array.isArray(p.titles) ? p.titles : []).map(x => String(x || "").trim()).filter(Boolean).slice(0, 3);
    if (lines.length) {
      const CH = 54; let cx = X, cy = y + 34, row = 1;
      g.font = '600 26px "Inter", system-ui, sans-serif'; g.textBaseline = "middle";
      lines.forEach((t, i) => {
        const txt = ell(g, t, MAXW - 46), w = g.measureText(txt).width + 46;
        if (cx > X && cx + w > X + MAXW) { cx = X; cy += CH + 12; row++; }
        if (row > 2) return;
        if (i === 0) { const cg = g.createLinearGradient(cx, 0, cx + w, 0); cg.addColorStop(0, pal.pink); cg.addColorStop(1, pal.violet); g.fillStyle = cg; rr(g, cx, cy, w, CH, CH / 2); g.fill(); g.fillStyle = "#fff"; }
        else { g.fillStyle = pal.chip; rr(g, cx, cy, w, CH, CH / 2); g.fill(); g.strokeStyle = pal.line; g.lineWidth = 2; g.stroke(); g.fillStyle = pal.ink; }
        g.fillText(txt, cx + 23, cy + CH / 2 + 1);
        cx += w + 12;
      });
      g.textBaseline = "alphabetic";
    }
    // their link, bottom right
    g.font = '800 26px "Inter", system-ui, sans-serif';
    const lt = linkText() + "  →", LH = 60, lw = Math.min(g.measureText(lt).width + 56, W - PX), lx = W - 44 - lw, ly = H - 44 - LH;
    g.fillStyle = pal.dark ? "#ffffff" : "#17102e"; rr(g, lx, ly, lw, LH, LH / 2); g.fill();
    g.fillStyle = pal.dark ? "#17102e" : "#ffffff"; g.textBaseline = "middle"; g.fillText(ell(g, lt, lw - 56), lx + 28, ly + LH / 2 + 1); g.textBaseline = "alphabetic";
    // a JPEG small enough for WhatsApp (it skips pictures over about 300 KB)
    const toBlob = q => new Promise(res => { try { c.toBlob(res, "image/jpeg", q); } catch (e) { res(null); } });
    let q = 0.86, blob = await toBlob(q);
    while (blob && blob.size > 280000 && q > 0.5) { q -= 0.08; blob = await toBlob(q); }
    if (!blob) throw new Error("blob");
    return blob;
  }

  /* ---- making it and saving it with the page ---- */
  function soon(ms) { clearTimeout(T); T = setTimeout(run, ms || 2500); }
  async function run() {
    clearTimeout(T); T = 0;
    if (busy || !Custom.owner || Custom.demo || !Custom.target || !stale()) return;
    if (Save.busy || uploading(Custom.media) || Mode.on) { soon(); paint(); return; }   // after photos finish uploading, and after editing
    busy = true; paint();
    const D = pageData(), M = { ...(Custom.media || {}) }, k = key(D, M), tx = texts(D);
    try {
      const blob = await draw(D, M);
      if (localUrl) URL.revokeObjectURL(localUrl);
      localUrl = URL.createObjectURL(blob); paint();
      const url = await Cloud.uploadPhoto("og", localUrl);
      const D2 = cur(), M2 = curM(), old = M2.og;
      // the old picture stays until the new one is live (chat apps may still show it), then it's deleted
      const prev = (D2.og && Array.isArray(D2.og.prev) ? D2.og.prev : []).concat(old && old !== url ? [old] : []);
      const extra = prev.slice(0, -3); if (extra.length) Cloud.removeFiles(extra.map(Cloud.pathOf).filter(Boolean));
      M2.og = url; D2.og = { v: seedOf(tx.t + "|" + tx.d + "|" + url).toString(36), k, t: tx.t, d: tx.d, prev: prev.slice(-3) };
      commit(D2, M2); Save.now();
      soon(4000);                                    // something changed meanwhile? then once more
    } catch (e) { soon(60000); }
    busy = false; paint();
  }
  // is the preview chat apps get already the newest one? (reads flexippo.com/name the way a chat app does)
  function refresh(force) {
    if (checking) return checking;
    if (!force && Date.now() - lastCheck < 20000) return Promise.resolve();
    const u = me().username; if (!u) return Promise.resolve();
    lastCheck = Date.now();
    checking = (async () => {
      let v;
      try {
        const r = await fetch("/" + encodeURIComponent(u) + ".html?c=" + Date.now(), { cache: "no-store" });
        v = r.ok ? (/<meta name="flexippo:v" content="([^"]*)"/.exec(await r.text()) || [])[1] || "" : null;
      } catch (e) { v = undefined; }
      live = v;
      const og = pageData().og;
      if (v && og && v === og.v && Array.isArray(og.prev) && og.prev.length) {   // the new one is live: the old pictures can go
        const gone = og.prev.map(Cloud.pathOf).filter(Boolean);
        edit(D => { if (D.og) D.og.prev = []; });
        if (gone.length) Cloud.removeFiles(gone);
      }
      paint();
    })().finally(() => { checking = null; });
    return checking;
  }
  function view() {
    const D = pageData(), M = Custom.media || {}, og = D.og || {}, tx = texts(D), fresh = !stale();
    return { img: busy && localUrl ? localUrl : M.og || localUrl || "", t: fresh && og.t ? og.t : tx.t, d: fresh && og.d ? og.d : tx.d, host: "flexippo.com", url: linkText() };
  }
  function state() {
    if (busy || stale()) return ["", "Making your preview…"];
    const og = pageData().og || {};
    if (live === undefined) return ["", ""];
    if (live && live === og.v) return ["ok", "✓ This is what friends see when you send your link."];
    return ["", live === null ? "⏳ Ready in a few minutes. Until then chats show just the link." : "⏳ Updating… friends see this in a few minutes."];
  }
  function paint() {
    if (!Custom.owner || Custom.demo) return;
    const v = view(), [cls, txt] = state();
    chatPreview(v);
    const st = $("#pvState"); if (st) { st.hidden = !txt; st.textContent = txt; st.className = "pv-state" + (cls ? " " + cls : ""); }
    const sh = $(".fe-body [data-pv]");
    if (sh) { chatPreview(v, sh); const m = $("[data-pv-state]", sh); if (m) { m.textContent = txt; m.className = "fe-msg" + (cls ? " " + cls : ""); } }
  }
  return {
    soon, run, refresh, paint,
    get waiting() { return busy || stale() || (live !== undefined && live !== ((pageData().og || {}).v)); },
    // links sent from here carry the live preview's version, so chat apps that saw an older one fetch it again
    sendLink() { const og = pageData().og || {}; return pageLink() + (live && live === og.v ? "?p=" + live : ""); }
  };
})();

/* ---------- sharing ---------- */
const CHAT = `<div class="wa"><div class="wa-body"><div class="wa-in"><div class="wa-card"><img class="og-i" alt="" decoding="async" hidden><div><b class="og-t"></b><span class="og-s"></span><small class="og-d">flexippo.com</small></div></div><div class="wa-msg"><span class="og-u"></span><small>9:41 PM <i class="wa-tick">✓✓</i></small></div></div></div></div>`;
scr.share = () => {
  let poll = 0;
  return {
    title: "Share your page",
    leave() { clearInterval(poll); },
    draw(b) {
      b.innerHTML = `<div class="fe-link"><b>${esc(linkText())}</b></div>
        <div class="fe-btns"><button class="fe-btn" type="button" data-s="copy">📋 Copy link</button><button class="fe-btn" type="button" data-s="send">📤 Send</button></div>
        <div class="fe-sec fe-pv" data-pv><h4>How it looks in chats</h4>${CHAT}<p class="fe-msg" data-pv-state></p></div>
        <div class="fe-btns"><button class="fe-btn small ghost" type="button" data-s="story">📸 Story picture</button><button class="fe-btn small ghost" type="button" data-s="qr">🔳 QR code</button></div>`;
      Og.paint(); Og.run(); Og.refresh(true);
      clearInterval(poll); poll = setInterval(() => { if (Og.waiting) Og.refresh(true); }, 30000);
      b.addEventListener("click", async e => {
        const s = e.target.closest("[data-s]"); if (!s) return;
        Snd.fx("tick");
        const k = s.dataset.s;
        if (k === "copy") { const ok = await copyText(pageLink()); toast(ok ? "Link copied ✓" : "Your link: " + pageLink()); if (ok) markShared(); }
        else if (k === "send") { if (await shareLink(Og.sendLink(), "Check out my page 👀")) markShared(); }
        else if (k === "story") Sheet.open(scr.story());
        else if (k === "qr") { $("#qrSave").click(); markShared(); }
      });
    }
  };
};

/* ---------- a picture of the page for Instagram / WhatsApp stories ---------- */
const Story = (() => {
  const W = 1080, H = 1920;
  const load = (src, remote) => new Promise(res => {
    if (!src) return res(null);
    const local = /^(blob:|data:|assets\/)/.test(src);
    if (!local && !remote) return res(null);
    const im = new Image(); if (!local) im.crossOrigin = "anonymous";
    im.onload = () => res(im); im.onerror = () => res(null); im.src = local ? src : src + (src.includes("?") ? "&" : "?") + "draw=1";
  });
  function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  function fill(g, im, x, y, w, h, top) { const r = Math.max(w / im.naturalWidth, h / im.naturalHeight), sw = w / r, sh = h / r; g.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh) * top, sw, sh, x, y, w, h); }
  function fit(g, text, font, max, size, min) { let s = size; for (;;) { g.font = font.replace("%", s); if (g.measureText(text).width <= max || s <= min) return s; s -= 4; } }
  async function qr(text) { if (!window.qrcodegen) await loadScript("assets/vendor/qrcodegen.js?v=1.8.0"); return window.qrcodegen.QrCode.encodeText(text, window.qrcodegen.QrCode.Ecc.MEDIUM); }
  async function draw(remote) {
    const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d");
    const cs = getComputedStyle(document.documentElement), v = (n, d) => cs.getPropertyValue(n).trim() || d;
    const bg = v("--bg", "#07051a"), bg2 = v("--bg2", "#140b33"), pink = v("--pink", "#ff2e88"), violet = v("--violet", "#8b5cff"), ink = v("--ink", "#f6f1ff");
    try { await Promise.all(['400 120px "Dela Gothic One"', '700 44px "Zen Kaku Gothic New"', '400 40px "Share Tech Mono"', '800 40px "Inter"'].map(f => document.fonts.load(f))); } catch (e) {}
    const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, bg2); gr.addColorStop(0.5, bg); gr.addColorStop(1, bg2); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    const glow = (x, y, r, col) => { const rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, col); rg.addColorStop(1, "rgba(0,0,0,0)"); g.globalAlpha = 0.42; g.fillStyle = rg; g.fillRect(x - r, y - r, r * 2, r * 2); g.globalAlpha = 1; };
    glow(930, 240, 640, pink); glow(110, 1560, 720, violet);
    // flexippo.com at the top
    g.fillStyle = "#c6ff3d"; rr(g, 90, 92, 72, 72, 18); g.fill();
    g.fillStyle = "#17102e"; g.font = '800 46px "Inter", system-ui, sans-serif'; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("F", 126, 130);
    g.textAlign = "left"; g.fillStyle = ink; g.font = '800 46px "Inter", system-ui, sans-serif'; g.fillText("flexippo.com", 186, 130);
    // the big photo with the name on it (shorter when there are collection photos to show under it)
    const items = collectionView().filter(it => it.type !== "uc" && it.img).slice(0, 3);
    const M = Custom.media || {}, X = 90, Y = 220, CW = 900, CH = items.length ? 860 : 1060;
    const photo = await load(M.cover, remote);
    g.save(); rr(g, X, Y, CW, CH, 56); g.clip();
    if (photo) fill(g, photo, X, Y, CW, CH, 0.25);
    else {
      const pg = g.createLinearGradient(X, Y, X + CW, Y + CH); pg.addColorStop(0, pink); pg.addColorStop(1, violet); g.fillStyle = pg; g.fillRect(X, Y, CW, CH);
      g.fillStyle = "rgba(255,255,255,.2)"; g.font = '400 560px "Dela Gothic One", sans-serif'; g.textAlign = "center"; g.fillText(String(CONFIG.name || "?").trim().charAt(0).toUpperCase(), X + CW / 2, Y + CH / 2 - 60); g.textAlign = "left";
    }
    const sh = g.createLinearGradient(0, Y + CH * 0.45, 0, Y + CH); sh.addColorStop(0, "rgba(0,0,0,0)"); sh.addColorStop(1, "rgba(0,0,0,.8)"); g.fillStyle = sh; g.fillRect(X, Y, CW, CH);
    g.restore();
    const name = String(CONFIG.heroName || CONFIG.name || "").toUpperCase();
    g.textBaseline = "alphabetic"; g.fillStyle = "#fff";
    const ns = fit(g, name, '400 %px "Dela Gothic One", sans-serif', CW - 100, 150, 56);
    g.font = "400 " + ns + 'px "Dela Gothic One", sans-serif'; g.shadowColor = "rgba(0,0,0,.5)"; g.shadowBlur = 24; g.fillText(name, X + 50, Y + CH - 118); g.shadowBlur = 0;
    g.font = '400 40px "Share Tech Mono", monospace'; g.fillStyle = "rgba(255,255,255,.88)"; g.fillText(String(CONFIG.kana || ""), X + 54, Y + CH - 56);
    // first bio line
    let y = Y + CH + 88;
    const bio = (CONFIG.titles || [])[0];
    if (bio) { g.fillStyle = ink; const bs = fit(g, "> " + bio, '700 %px "Zen Kaku Gothic New", sans-serif', W - 180, 48, 28); g.font = "700 " + bs + 'px "Zen Kaku Gothic New", sans-serif'; g.fillText("> " + bio, 90, y); y += 44; }
    else y = Y + CH + 44;
    // three photos from the collection
    if (items.length) {
      const ims = await Promise.all(items.map(it => load(/^assets\//.test(it.img) ? bestSrc(it.img) : it.img, remote)));
      const s = 272, gap = (W - 180 - s * 3) / 2;
      ims.forEach((im, i) => { const x = 90 + i * (s + gap); g.save(); rr(g, x, y, s, s, 34); g.clip(); if (im) fill(g, im, x, y, s, s, 0.5); else { g.fillStyle = "rgba(255,255,255,.12)"; g.fillRect(x, y, s, s); } g.restore(); });
    }
    // the link and a QR code at the bottom
    const by = H - 300;
    g.fillStyle = "#fff"; rr(g, 90, by, W - 180, 210, 44); g.fill();
    let code = null; try { code = await qr(pageLink()); } catch (e) {}
    if (code) { const n = code.size, cell = Math.floor(170 / n), qx = W - 110 - cell * n, qy = by + (210 - cell * n) / 2; g.fillStyle = "#0b0420"; for (let yy = 0; yy < n; yy++) for (let xx = 0; xx < n; xx++) if (code.getModule(xx, yy)) g.fillRect(qx + xx * cell, qy + yy * cell, cell, cell); }
    g.fillStyle = "#17102e"; g.font = '700 36px "Inter", system-ui, sans-serif'; g.fillText("See my page 👀", 130, by + 84);
    const ls = fit(g, linkText(), '800 %px "Inter", system-ui, sans-serif', W - 180 - 290, 54, 28); g.font = "800 " + ls + 'px "Inter", system-ui, sans-serif'; g.fillStyle = "#6a2cff"; g.fillText(linkText(), 130, by + 152);
    return new Promise((res, rej) => { try { c.toBlob(b => (b ? res(b) : rej(new Error("blob"))), "image/jpeg", 0.9); } catch (e) { rej(e); } });
  }
  // photos from the internet that can't be drawn are left out
  async function make() { try { return await draw(true); } catch (e) { return draw(false); } }
  function save(blob, name) {
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast("Picture saved ✓");
  }
  async function share(blob, name) {
    let file = null; try { file = new File([blob], name, { type: "image/jpeg" }); } catch (e) {}
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], text: pageLink() }); return true; } catch (e) { if (e && e.name === "AbortError") return false; }
    }
    save(blob, name); return true;
  }
  return { make, save, share };
})();
scr.story = () => {
  let blob = null, url = "";
  return {
    title: "Story picture",
    leave() { if (url) URL.revokeObjectURL(url); url = ""; },
    draw(b, f) {
      b.innerHTML = `<div class="fe-story" id="feStory">Making your picture…</div><p class="fe-p" style="text-align:center">On Instagram, add a link sticker with <b>${esc(linkText())}</b>.</p>`;
      f.innerHTML = `<button class="fe-btn ghost" type="button" data-save disabled>Save</button><button class="fe-btn" type="button" data-send disabled>Share</button>`;
      const box = $("#feStory", b);
      (blob ? Promise.resolve(blob) : Story.make()).then(bl => {
        blob = bl; if (!url) url = URL.createObjectURL(bl);
        box.innerHTML = `<img src="${url}" alt="Your story picture">`; $$("[data-save],[data-send]", f).forEach(x => { x.disabled = false; });
      }, () => { box.textContent = "Couldn't make the picture on this phone."; });
      f.addEventListener("click", async e => {
        if (!blob) return;
        const name = "flexippo-" + (me().username || "page") + ".jpg";
        if (e.target.closest("[data-send]")) { if (await Story.share(blob, name)) markShared(); }
        else if (e.target.closest("[data-save]")) { Story.save(blob, name); markShared(); }
      });
    }
  };
};

/* ---------- activity: who liked, commented and signed ---------- */
const Activity = (() => {
  let list = [], unseen = 0, loading = null;
  const key = () => "act@" + me().id;
  const A = "author:profiles!%s(username,display_name,avatar_url)";
  async function fetchAll() {
    const id = me().id;
    const get = (table, cols, fk) => rest(`${table}?select=${cols},${A.replace("%s", fk)}&page_id=eq.${id}&order=created_at.desc&limit=40`).catch(() => []);
    const [likes, comments, gb] = await Promise.all([
      get("likes", "item_id,created_at,user_id", "likes_user_fk"),
      get("comments", "id,item_id,body,created_at,user_id", "comments_user_fk"),
      get("guestbook", "id,body,item_id,created_at,user_id", "guestbook_user_fk")
    ]);
    const all = [].concat((likes || []).map(r => ({ ...r, t: "like" })), (comments || []).map(r => ({ ...r, t: "comment" })), (gb || []).map(r => ({ ...r, t: "gb" })))
      .filter(r => r.user_id !== id).map(r => ({ ...r, at: Date.parse(r.created_at) || 0 })).sort((a, b) => b.at - a.at).slice(0, 60);
    list = all; const seen = LS.get(key(), 0); unseen = all.filter(r => r.at > seen).length;
    return all;
  }
  function load() {
    if (!Live.live || !me().id) return Promise.resolve([]);
    if (!loading) loading = fetchAll().finally(() => { loading = null; });
    return loading;
  }
  function markSeen() { LS.set(key(), Date.now()); LS.set("seen@" + me().id, Live.totals()); unseen = 0; OwnerBox.paint(); }
  return { load, markSeen, get unseen() { return unseen; }, get seenAt() { return LS.get(key(), 0); } };
})();
function actRow(r, seenAt) {
  const a = r.author || {}, who = a.display_name || a.username || "Someone", it = r.item_id ? collectionView().find(x => x.id === r.item_id) : null;
  const title = it ? (it.type === "uc" ? (it.amount + " " + it.unit).trim() : String(it.meme || it.alt || "").trim()) : "";
  const th = it && it.type !== "uc" && it.img ? `<img class="fe-act-th" src="${esc(it.img)}" alt="">` : "";
  const what = r.t === "like" ? `liked ${title ? "“" + esc(title) + "”" : "your photo"}`
    : r.t === "comment" ? `commented on ${title ? "“" + esc(title) + "”" : "your photo"}: ${esc(clean(r.body || ""))}`
    : `signed your guestbook: ${esc(clean(r.body || ""))}`;
  return `<button class="fe-act${r.at > seenAt ? " new" : ""}" type="button" data-act="${r.t}" data-item="${esc(r.item_id || "")}">${avatarOf(a.username || who, a.avatar_url)}<p><b>${esc(who)}</b> ${what}<small>${esc(ago(r.at))}</small></p>${th}</button>`;
}
scr.activity = () => ({
  title: "Activity",
  draw(b) {
    b.innerHTML = `<p class="fe-load">Loading…</p>`;
    const seenAt = Activity.seenAt;
    Activity.load().then(list => {
      if (!b.isConnected) return;
      if (!list.length) b.innerHTML = `<div class="fe-big"><span class="em" aria-hidden="true">🔔</span><h4>Nothing yet</h4><p class="fe-p">Likes, comments and guestbook notes show up here.</p></div><button class="fe-btn" type="button" data-sh>Share my page</button>`;
      else b.innerHTML = `<div class="fe-acts">${list.map(r => actRow(r, seenAt)).join("")}</div>`;
      Activity.markSeen();
    }, () => { if (b.isConnected) b.innerHTML = `<p class="fe-load">Couldn't load. Check your internet.</p>`; });
    b.addEventListener("click", e => {
      if (e.target.closest("[data-sh]")) { Snd.fx("tick"); Sheet.swap(scr.share()); return; }
      const a = e.target.closest("[data-act]"); if (!a) return;
      Snd.fx("tick"); Sheet.close();
      const t = a.dataset.act, item = a.dataset.item;
      setTimeout(() => {
        if (t === "comment" && item && collectionView().some(x => x.id === item)) Comments.open(item);
        else if (t === "like" && item) Guestbook.showItem(item);
        else $("#guestbook").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }, 80);
    });
  }
});

/* ---------- under the name, only for the owner (not while editing): numbers + "finish your page" ---------- */
const OwnerBox = (() => {
  let last = "";
  function steps() {
    const D = pageData(), M = Custom.media || {};
    return [
      ["photo", "📷 Add your photo", !!M.cover],
      ["bio", "✏️ Write a bio", ((D.profile || {}).titles || []).some(t => String(t).trim())],
      ["socials", "🔗 Add your socials", D.socials.length + D.links.length > 0],
      ["collection-add", "🖼️ Add photos", collectionView().length > 0],
      ["share", "📤 Share it", !!LS.get("shared@" + me().id, 0)]
    ];
  }
  // views, likes, comments and guestbook notes on their page, with "+N" for what's new since they last looked
  function stats() {
    if (!Live.live) return "";
    const T = Live.totals(), seen = LS.get("seen@" + me().id, null), un = Activity.unseen;
    if (!T.views && !T.likes && !T.comments && !T.guestbook) return "";
    const chip = (ic, n, one, k) => `<span class="ob-st" aria-label="${n} ${plural(n, one)}"><i aria-hidden="true">${ic}</i>${compact(n)}${seen && n > (+seen[k] || 0) ? `<em>+${compact(n - (+seen[k] || 0))}</em>` : ""}</span>`;
    return `<div class="ob-stats">${chip("👀", T.views, "view", "views")}${chip("❤️", T.likes, "like", "likes")}${chip("💬", T.comments, "comment", "comments")}${chip("✍️", T.guestbook, "guestbook note", "guestbook")}<button class="ob-st ob-act" type="button" data-open="activity">🔔 ${un ? `<b class="ob-dot">${un > 99 ? "99+" : un}</b> new` : "Activity"}</button></div>`;
  }
  function paint() {
    const box = $("#ownBox"); if (!box) return;
    let html = "";
    if (Custom.owner && !Custom.demo) {
      const st = steps(), done = st.filter(s => s[2]).length, left = st.filter(s => !s[2]);
      html = stats() + (left.length ? `<div class="ob-todo"><div class="ob-todo-h"><b>Finish your page</b><small>${done}/${st.length}</small></div><div class="ob-bar"><i style="width:${Math.round(done / st.length * 100)}%"></i></div><div class="ob-next">${left.map(s => `<button type="button" data-open="${s[0]}">${s[1]}</button>`).join("")}</div></div>` : "");
    }
    if (html !== last) { last = html; box.innerHTML = html; }
  }
  return { paint };
})();

/* ---------- how the page talks to the editor ---------- */
let attached = false;
function attach() {
  if (!Custom.owner || Custom.demo) { OwnerBox.paint(); return; }
  if (!attached) {
    attached = true; Files.init();
    Custom.on(why => { if (!Custom.owner || Custom.demo) { Mode.exit(); Sheet.close(); } OwnerBox.paint(); if (why !== "local") Og.paint(); });
    Live.on(() => OwnerBox.paint());
    const act = () => Activity.load().then(() => OwnerBox.paint(), () => {});
    idle(act);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && Custom.owner) { act(); Og.refresh(); } });
    // the link preview: make it if it's missing or old, and check whether chat apps already get the newest one
    idle(() => { Og.paint(); Og.soon(1500); Og.refresh(true); });
    const box = $("#share");
    if (box && "IntersectionObserver" in window) new IntersectionObserver(es => { if (es.some(x => x.isIntersecting)) Og.refresh(); }, { rootMargin: "300px 0px" }).observe(box);
  }
  OwnerBox.paint();
}
function open(what, sync) {
  if (!Custom.owner || Custom.demo) { toast("Log in to change your page."); return; }
  attach();
  Mode.go(what, !!sync);
}
window.FlexEdit = { open, attach, setSkin(k) { if (!Custom.owner || Custom.demo) return; attach(); setSkin(k); } };
})();
