/* flexippo.com: the page editor. Only the owner of a page downloads this file (visitors never do).
   - Change things right on your page: tap ✎ or ＋ next to the thing, or "Edit my page" for everything.
   - One small step at a time, in plain words. Type a username and the link is made for you.
   - Changes show on the page at once and save by themselves a moment later. No Save button to forget.
   - New pages get a short quick start: photo, bio, theme, socials, collection, share. */
(() => {
"use strict";
if (window.FlexEdit) return;

/* ---------- looks (only owners download these) ---------- */
const CSS = `
html.fe-lock{overflow:hidden}
.fe{position:fixed;inset:0;z-index:210;display:flex;align-items:flex-end;justify-content:center}
.fe[hidden]{display:none}
.fe-dim{position:absolute;inset:0;background:rgba(5,3,16,.58);animation:feFade .2s ease-out}
.fe-panel{position:relative;display:flex;flex-direction:column;width:100%;max-width:560px;max-height:92vh;max-height:92dvh;border-radius:24px 24px 0 0;background:var(--bg);color:var(--ink);border:1px solid var(--line);border-bottom:0;box-shadow:0 -18px 50px var(--shadow);font-family:var(--f-body);animation:feUp .26s cubic-bezier(.2,.9,.25,1)}
@media (min-width:640px){.fe{align-items:center;padding:24px}.fe-panel{border-radius:24px;border-bottom:1px solid var(--line);max-height:min(88vh,820px)}}
@keyframes feUp{from{transform:translateY(40px);opacity:.3}}
@keyframes feFade{from{opacity:0}}
.lite .fe-panel,.lite .fe-dim{animation:none}
.fe-grab{flex:none;width:44px;height:5px;border-radius:9px;background:var(--line);margin:8px auto 0}
.fe-head{flex:none;display:flex;align-items:center;gap:8px;padding:8px 12px 8px 14px}
.fe-head h3{flex:1;min-width:0;margin:0;font-family:var(--f-display);font-weight:400;font-size:21px;line-height:1.15;overflow-wrap:anywhere}
.fe-ic{flex:none;width:42px;height:42px;border-radius:50%;border:1px solid var(--line);background:var(--panel2);color:var(--ink);font-size:20px;line-height:1;display:grid;place-items:center;cursor:pointer;padding:0}
.fe-ic[hidden]{display:none}
.fe-status{flex:none;border:0;background:none;padding:4px 2px;font:700 12.5px var(--f-body);color:var(--mute);white-space:nowrap}
.fe-status:empty{display:none}
.fe-status.ok{color:#20b673}
.fe-status.bad{color:#ff4d6d;text-decoration:underline;cursor:pointer}
.fe-step{flex:none;margin:0;padding:0 16px 6px;font-family:var(--f-hud);font-size:12px;letter-spacing:.14em;color:var(--pink)}
.fe-prog{flex:none;height:5px;margin:0 16px 6px;border-radius:9px;background:var(--line);overflow:hidden}
.fe-prog i{display:block;height:100%;background:linear-gradient(90deg,var(--pink),var(--violet));transition:width .3s}
.fe-step[hidden],.fe-prog[hidden]{display:none}
.fe-body{flex:1;min-height:0;overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:6px 16px 20px;display:flex;flex-direction:column;gap:14px}
.fe-body > *{flex-shrink:0}
.fe-foot{flex:none;display:flex;gap:10px;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));border-top:1px solid var(--line);background:var(--bg);border-radius:0 0 24px 24px}
.fe-foot:empty{display:none}
.fe-foot .fe-btn{flex:1}
.fe-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:50px;padding:10px 18px;border-radius:16px;border:0;background:linear-gradient(135deg,var(--pink),var(--violet));color:#fff;font:800 16px/1.2 var(--f-body);cursor:pointer;text-align:center;text-decoration:none}
.fe-btn small{font-weight:400;opacity:.85}
.fe-btn.ghost{background:var(--panel2);color:var(--ink);border:1px solid var(--line)}
.fe-btn.danger{background:transparent;color:#ff4d6d;border:1.5px solid rgba(255,77,109,.5)}
.fe-btn.danger.armed{background:#ff4d6d;color:#fff}
.fe-btn.small{min-height:44px;padding:8px 14px;font-size:14.5px;border-radius:13px}
.fe-btn[disabled]{opacity:.45;cursor:default}
.fe-p{margin:0;font-size:14.5px;line-height:1.5;color:var(--mute)}
.fe-lab{display:block;font-weight:800;font-size:15px;margin:0 0 7px}
.fe-lab small{font-weight:400;color:var(--mute)}
.fe-in{display:block;width:100%;min-height:50px;padding:12px 14px;border-radius:14px;border:1.5px solid var(--line);background:var(--panel2);color:var(--ink);font:16px/1.3 var(--f-body);-webkit-appearance:none;appearance:none}
textarea.fe-in{min-height:84px;resize:vertical}
select.fe-in{background-image:linear-gradient(45deg,transparent 50%,var(--mute) 50%),linear-gradient(135deg,var(--mute) 50%,transparent 50%);background-position:calc(100% - 20px) 50%,calc(100% - 14px) 50%;background-size:6px 6px;background-repeat:no-repeat;padding-right:36px}
.fe-in:focus{outline:none;border-color:var(--pink)}
.fe-in.bad,.fe-pre.bad{border-color:#ff4d6d}
.fe-pre{display:flex;align-items:stretch;border-radius:14px;border:1.5px solid var(--line);background:var(--panel2);overflow:hidden}
.fe-pre:focus-within{border-color:var(--pink)}
.fe-pre > span{display:flex;align-items:center;padding:0 2px 0 14px;color:var(--mute);font-size:16px;white-space:nowrap}
.fe-pre .fe-in{border:0;background:transparent;min-width:0;padding-left:4px}
.fe-msg{margin:7px 2px 0;font-size:13.5px;line-height:1.45;color:var(--mute);overflow-wrap:anywhere}
.fe-msg.ok{color:#20b673}
.fe-msg.bad{color:#ff4d6d}
.fe-msg a{color:inherit;font-weight:800}
.fe-sec{display:flex;flex-direction:column;gap:11px;padding:14px;border-radius:18px;background:var(--panel);border:1px solid var(--line)}
.fe-sec h4{margin:0;font-size:16px}
.fe-two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.fe-rows{display:flex;flex-direction:column;gap:8px}
.fe-row{display:flex;align-items:center;gap:12px;width:100%;min-height:64px;padding:10px 12px;border-radius:18px;border:1px solid var(--line);background:var(--panel);color:var(--ink);text-align:left;font:inherit;cursor:pointer}
.fe-row > i{flex:none;width:44px;height:44px;border-radius:14px;display:grid;place-items:center;font-style:normal;font-size:22px;background:var(--panel2)}
.fe-row > span{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.fe-row b{font-size:16px}
.fe-row small{font-size:13px;color:var(--mute);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fe-row::after{content:"›";flex:none;font-size:26px;line-height:1;color:var(--mute)}
.fe-row.todo > i{background:linear-gradient(135deg,var(--pink),var(--violet))}
.fe-row.todo small{color:var(--pink);font-weight:700}
.fe-cover{position:relative;display:grid;place-items:center;width:100%;aspect-ratio:4/3;max-height:340px;border-radius:18px;overflow:hidden;background:var(--panel2);border:2px dashed var(--line);color:var(--mute);font:700 15px var(--f-body);cursor:pointer;padding:0}
.fe-cover.has{border-style:solid}
.fe-cover img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fe-cover.sq{aspect-ratio:1/1;max-height:300px}
.fe-avrow{display:flex;align-items:center;gap:14px}
.fe-av{flex:none;width:92px;height:92px;border-radius:50%;object-fit:cover;background:var(--panel2);border:2px solid var(--line)}
.fe-btns{display:flex;flex-wrap:wrap;gap:8px}
.fe-btns > .fe-btn{flex:1 1 130px}
.fe-chips{display:flex;flex-wrap:wrap;gap:8px}
.fe-chip{min-height:40px;padding:7px 13px;border-radius:999px;border:1px solid var(--line);background:var(--panel);color:var(--ink);font:700 14px var(--f-body);cursor:pointer}
.fe-chip[aria-pressed=true]{background:var(--pink);border-color:var(--pink);color:#fff}
.fe-list{display:flex;flex-direction:column;gap:8px}
.fe-li{display:flex;align-items:center;gap:8px;padding:7px;border-radius:16px;border:1px solid var(--line);background:var(--panel)}
.fe-li .soc-ic,.fe-head-ic .soc-ic{width:42px;height:42px;border-radius:13px;flex:none}
.fe-li .soc-ic svg,.fe-head-ic .soc-ic svg{width:21px;height:21px}
.fe-li-t{flex:1;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:1px;border:0;background:none;padding:2px 4px;color:var(--ink);text-align:left;font:inherit;cursor:pointer}
.fe-li-t b{font-size:15px}
.fe-li-t small{max-width:100%;font-size:13px;color:var(--mute);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fe-li .fe-in{min-height:46px;padding:10px 12px}
.fe-mini{flex:none;width:40px;height:40px;border-radius:12px;border:1px solid var(--line);background:var(--panel2);color:var(--ink);font-size:16px;cursor:pointer;display:grid;place-items:center;padding:0}
.fe-mini[disabled]{opacity:.3;cursor:default}
.fe-head-ic{display:flex;align-items:center;gap:12px}
.fe-head-ic b{display:block;font-size:17px}
.fe-head-ic small{color:var(--mute);font-size:13px}
.fe-plat{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
@media (min-width:480px){.fe-plat{grid-template-columns:repeat(5,minmax(0,1fr))}}
.fe-pl{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 3px 9px;border-radius:16px;border:1px solid var(--line);background:var(--panel);color:var(--ink);font:700 12px var(--f-body);cursor:pointer;min-width:0}
.fe-pl .soc-ic{width:44px;height:44px;border-radius:14px}
.fe-pl .soc-ic svg{width:22px;height:22px}
.fe-pl span:last-child{max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.fe-pl.on::after{content:"✓";position:absolute;top:5px;right:6px;width:19px;height:19px;border-radius:50%;background:#20b673;color:#fff;font-size:11px;line-height:19px;text-align:center}
.fe-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.fe-th{position:relative;display:block;aspect-ratio:1/1;border-radius:14px;overflow:hidden;border:1px solid var(--line);background:var(--panel2);padding:0;cursor:pointer;color:var(--ink);font:inherit}
.fe-th img{width:100%;height:100%;object-fit:cover;display:block}
.fe-th em{position:absolute;left:4px;right:4px;top:5px;font:400 12px/1.05 Anton,Impact,sans-serif;text-transform:uppercase;color:#fff;text-shadow:1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000;text-align:center}
.fe-th.uc{display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 38%,#6a4a00 0,#2e1f00 55%,#120b00 100%);color:#ffd36a}
.fe-th.uc b{font-family:var(--f-display);font-weight:400;font-size:20px}
.fe-th.uc small{font-family:var(--f-hud);font-size:11px;letter-spacing:.14em}
.fe-th.add{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;border:2px dashed var(--pink);background:var(--panel);font-weight:800;font-size:13px}
.fe-th.add b{font-size:32px;line-height:1;color:var(--pink)}
.fe-th.up::after{content:"Uploading…";position:absolute;inset:auto 0 0;padding:5px 0;background:rgba(0,0,0,.62);color:#fff;font:700 11px var(--f-body)}
.fe-slots{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.fe-slots.four{grid-template-columns:repeat(4,minmax(0,1fr))}
.fe-slot{position:relative;display:grid;place-items:center;width:100%;aspect-ratio:1/1;border-radius:13px;overflow:hidden;border:2px dashed var(--line);background:var(--panel2);color:var(--mute);font:800 22px var(--f-body);cursor:pointer;padding:0}
.fe-slots.four .fe-slot{aspect-ratio:3/4}
.fe-slot img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.fe-slot.has{border-style:solid}
.fe-slot-x{position:absolute;top:4px;right:4px;z-index:2;width:28px;height:28px;border-radius:50%;border:0;background:rgba(0,0,0,.65);color:#fff;font-size:13px;cursor:pointer;padding:0}
.fe-skins{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.fe-skin{display:flex;flex-direction:column;gap:8px;padding:8px 8px 10px;border-radius:18px;border:2px solid var(--line);background:var(--panel);color:var(--ink);font:800 13.5px/1.2 var(--f-body);cursor:pointer;text-align:center}
.fe-skin i{display:block;aspect-ratio:3/4;border-radius:12px}
.fe-skin[aria-pressed=true]{border-color:var(--pink);box-shadow:0 0 0 3px rgba(255,46,136,.28)}
.fe-big{text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;padding:8px 0}
.fe-big .em{font-size:54px;line-height:1}
.fe-big h4{margin:0;font-family:var(--f-display);font-weight:400;font-size:clamp(19px,6vw,26px);overflow-wrap:anywhere}
.fe-load{color:var(--mute);text-align:center;padding:24px 0;margin:0}
.fe-story{align-self:center;display:grid;place-items:center;width:min(64%,250px);aspect-ratio:9/16;border-radius:16px;overflow:hidden;background:var(--panel2);box-shadow:0 14px 34px var(--shadow);color:var(--mute);font-size:14px;text-align:center}
.fe-story img{width:100%;height:100%;display:block;object-fit:cover}
.fe-acts{display:flex;flex-direction:column;gap:6px}
.fe-act{display:flex;align-items:flex-start;gap:10px;width:100%;padding:10px;border-radius:14px;border:1px solid transparent;background:none;color:var(--ink);text-align:left;font:inherit;cursor:pointer}
.fe-act.new{background:rgba(255,46,136,.09);border-color:rgba(255,46,136,.3)}
.fe-act .cm-av{flex:none;width:38px;height:38px;border-radius:50%;object-fit:cover;display:grid;place-items:center;color:#fff;font-weight:900;background:linear-gradient(135deg,var(--a1,#ff2e88),var(--a2,#8b5cff))}
.fe-act p{flex:1;min-width:0;margin:0;font-size:14.5px;line-height:1.4;overflow-wrap:anywhere}
.fe-act small{display:block;color:var(--mute);font-size:12.5px;margin-top:2px}
.fe-act .fe-act-th{flex:none;width:44px;height:44px;border-radius:10px;object-fit:cover}
/* the owner's box under the name on their own page */
.ob-stats{display:flex;flex-wrap:wrap;gap:8px}
.ob-st{display:inline-flex;align-items:center;gap:6px;min-height:38px;padding:6px 12px;border-radius:999px;background:var(--panel);border:1px solid var(--line);font:700 14px var(--f-body);color:var(--ink)}
.ob-st i{font-style:normal}
.ob-st em{font-style:normal;color:#20b673;font-size:12.5px}
.ob-act{cursor:pointer;border-color:var(--pink)}
.ob-dot{min-width:21px;height:21px;padding:0 6px;border-radius:999px;background:var(--pink);color:#fff;font-size:12px;line-height:21px;text-align:center}
.ob-todo{display:flex;flex-direction:column;gap:10px;padding:14px;border-radius:18px;background:var(--panel);border:1px solid var(--line)}
.lite .ob-todo,.lite .ob-st{background:var(--solid)}
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

/* ---------- the page's content while editing ---------- */
// Every change goes straight onto the page (so the owner sees it behind the editor) and is saved a moment later.
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
}
const edit = fn => { const D = cur(); fn(D); commit(D); };
const P = D => (D.profile = D.profile && typeof D.profile === "object" ? D.profile : {});

/* ---------- saving ---------- */
const Save = (() => {
  let t = 0, ups = 0, state = "", why = "", retryT = 0;
  function paint() {
    const txt = ups ? "Uploading photo…" : state === "saving" ? "Saving…" : state === "ok" ? "Saved ✓" : state === "bad" ? why : "";
    Sheet.status(txt, ups || state === "saving" ? "" : state);
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
      why = loggedOut ? "Logged out · tap to log in" : "Not saved · tap to retry";
      clearTimeout(retryT); if (!loggedOut) retryT = setTimeout(() => { if (state === "bad") now(); }, 8000);
    }
    paint();
  }
  addEventListener("online", () => { if (state === "bad") now(); });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden" && (t || rafT)) now(); });
  Cloud.on(w => { if (w === "auth" && state === "bad" && Custom.owner) now(); });
  return {
    soon, now, paint,
    up(n) { ups = Math.max(0, ups + n); paint(); },
    retry() { if (state !== "bad") return; if (/log in/.test(why)) Accounts.openAuth("login", "Log in again to save your changes."); else now(); },
    get pending() { return !!t || !!rafT; }, get busy() { return !!t || !!rafT || ups > 0 || state === "saving"; }
  };
})();

/* ---------- photos ---------- */
const Files = (() => {
  const known = new Set();                         // photo files this page has used, so replaced ones can be deleted
  const remember = u => { const p = Cloud.pathOf(u); if (p) known.add(p); };
  function init() { Object.values((Custom.saved || {}).media || {}).forEach(remember); }
  function tidy() {
    if (Save.busy) return;
    const used = new Set();
    [(Custom.saved || {}).media || {}, Custom.media || {}].forEach(m => Object.values(m).forEach(u => { const p = Cloud.pathOf(u); if (p) used.add(p); }));
    const gone = [...known].filter(p => !used.has(p));
    if (!gone.length) return;
    gone.forEach(p => known.delete(p));
    Cloud.removeFiles(gone);
  }
  // open the phone's gallery
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

/* ---------- the editor panel ---------- */
// One panel that slides up from the bottom. Screens stack inside it: ‹ (or the phone's back button) goes one back.
const Sheet = (() => {
  let root = null, body, foot, title, backB, statusB, prog, stepEl, stack = [], hist = false, lastFocus = null;
  function build() {
    root = node(`<div class="fe" hidden><div class="fe-dim"></div><section class="fe-panel" role="dialog" aria-modal="true" aria-labelledby="feT"><div class="fe-grab" aria-hidden="true"></div><header class="fe-head"><button class="fe-ic" type="button" data-fe-back aria-label="Back">‹</button><h3 id="feT"></h3><button class="fe-status" type="button" aria-live="polite"></button><button class="fe-ic" type="button" data-fe-x aria-label="Close">✕</button></header><p class="fe-step" hidden></p><div class="fe-prog" hidden><i></i></div><div class="fe-body"></div><footer class="fe-foot"></footer></section></div>`);
    document.body.appendChild(root);
    body = $(".fe-body", root); foot = $(".fe-foot", root); title = $("#feT", root); backB = $("[data-fe-back]", root); statusB = $(".fe-status", root); prog = $(".fe-prog", root); stepEl = $(".fe-step", root);
    root.addEventListener("click", e => {
      if (e.target.classList.contains("fe-dim") || e.target.closest("[data-fe-x]")) { Snd.fx("tick"); close(); }
      else if (e.target.closest("[data-fe-back]")) { Snd.fx("tick"); back(); }
    });
    statusB.addEventListener("click", () => Save.retry());
    addEventListener("keydown", e => { if (e.key === "Escape" && root && !root.hidden && $("#authModal").hidden) { e.stopPropagation(); back(); } }, true);
    // the phone's back button: one screen back, and the editor closes from the first screen
    addEventListener("popstate", () => {
      if (!root || root.hidden || !hist) return;
      hist = false;
      if (stack.length > 1 || (stack[0] && stack[0].backTo)) { back(); if (!root.hidden) { history.pushState({ fe: 1 }, ""); hist = true; } }
      else close(true);
    });
  }
  function render() {
    const s = stack[stack.length - 1]; if (!s) return;
    title.textContent = s.title; backB.hidden = stack.length < 2 && !s.backTo;
    const w = s.wizard; stepEl.hidden = prog.hidden = !w;
    if (w) { stepEl.textContent = "STEP " + w[0] + " OF " + w[1]; $("i", prog).style.width = Math.round(w[0] / w[1] * 100) + "%"; }
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
      if (!hist) { try { history.pushState({ fe: 1 }, ""); hist = true; } catch (e) {} }
    }
    stack.push(s); render(); body.scrollTop = 0;
  }
  function swap(s) { const old = stack.pop(); if (old && old.leave) old.leave(); stack.push(s); render(); body.scrollTop = 0; }
  function redraw() { if (root && !root.hidden) { const y = body.scrollTop; render(); body.scrollTop = y; } }
  function back() {
    const s = stack[stack.length - 1];
    if (stack.length < 2 && s && s.backTo) return swap(s.backTo());
    const old = stack.pop(); if (old && old.leave) old.leave();
    if (!stack.length) return close();
    render();
  }
  function close(fromHistory) {
    if (!root || root.hidden) return;
    while (stack.length) { const s = stack.pop(); if (s.leave) try { s.leave(); } catch (e) {} }
    root.hidden = true; document.documentElement.classList.remove("fe-lock");
    if (hist && !fromHistory) { hist = false; try { history.back(); } catch (e) {} }
    if (Save.pending) Save.now();                    // closing = save straight away
    if (lastFocus && lastFocus.focus) try { lastFocus.focus({ preventScroll: true }); } catch (e) {}
    OwnerBox.paint();
  }
  function status(t, cls) { if (statusB) { statusB.textContent = t || ""; statusB.className = "fe-status" + (cls ? " " + cls : ""); } }
  return { open, swap, back, close, redraw, status, get isOpen() { return !!root && !root.hidden; }, get top() { return stack[stack.length - 1]; } };
})();

/* ======================= SCREENS ======================= */
const scr = {};
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const PICKS = ["🎮 Gamer", "🎌 Anime fan", "🎧 Music lover", "📸 Photography", "⚽ Football", "🏏 Cricket", "📚 Student", "🎨 Artist", "💻 Coder", "✈️ Travel", "🍜 Foodie", "💪 Gym rat"];
const pad2 = n => String(n).padStart(2, "0");
const niceDay = md => { const [m, d] = String(md).split("-").map(Number); return d + " " + (MONTHS[m - 1] || ""); };
const move = (a, i, d) => { const j = i + d; if (i < 0 || j < 0 || j >= a.length) return; const x = a[i]; a[i] = a[j]; a[j] = x; };
const arm = (btn, text) => { if (btn.dataset.armed === "1") return true; btn.dataset.armed = "1"; btn.classList.add("armed"); btn.textContent = text; Snd.fx("tick"); return false; };
const curSkin = () => document.documentElement.dataset.skin || "night";
function setSkin(k) { if (!SKINS.some(s => s[0] === k)) return; skinTouched = false; applySkin(k, true, true); edit(D => { P(D).skin = k; }); }

/* ---------- the list of everything ---------- */
scr.menu = () => ({
  title: "Edit your page",
  draw(b, f) {
    const D = cur(), M = curM(), p = P(D), lines = (p.titles || []).filter(t => String(t).trim());
    const nSoc = D.socials.length + D.links.length, nCol = D.collection.length;
    const rows = [
      ["photo", "📷", "Photos", M.cover ? "Your main photo and profile picture" : "Add your photo", !M.cover],
      ["bio", "✏️", "Name & bio", (p.name || CONFIG.name) + " · " + (lines.length ? lines.length + " bio " + plural(lines.length, "line") : "no bio yet"), !lines.length],
      ["theme", "🎨", "Theme", (SKINS.find(s => s[0] === curSkin()) || SKINS[0])[1]],
      ["socials", "🔗", "Socials & links", nSoc ? nSoc + " added" : "None yet", !nSoc],
      ["collection", "🖼️", "Collection", nCol ? nCol + " of " + colMax() + " spots used" : "Empty", !nCol],
      ["birthday", "🎂", "Birthday countdown", BDAY_RE.test(p.birthday || "") ? niceDay(p.birthday) : "Off"],
      ["more", "⚙️", "More", "Big name, small line, moving strip"]
    ];
    b.innerHTML = `<p class="fe-p">Tap what you want to change. Everything saves by itself.</p>
      <div class="fe-rows">${rows.map(r => `<button class="fe-row${r[4] ? " todo" : ""}" type="button" data-go="${r[0]}"><i aria-hidden="true">${r[1]}</i><span><b>${r[2]}</b><small>${esc(r[3])}</small></span></button>`).join("")}</div>`;
    b.addEventListener("click", e => { const g = e.target.closest("[data-go]"); if (g) { Snd.fx("tick"); Sheet.open(scr[g.dataset.go]()); } });
    f.innerHTML = `<button class="fe-btn ghost" type="button" data-fe-x>See my page</button><button class="fe-btn" type="button" data-share>Share my page</button>`;
    f.addEventListener("click", e => { if (e.target.closest("[data-share]")) { Snd.fx("tick"); Sheet.open(scr.share()); } });
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
async function avatarFromCover() {
  const src = curM().cover; if (!src) return;
  const im = await new Promise(res => { const i = new Image(); if (!/^blob:|^data:/.test(src)) i.crossOrigin = "anonymous"; i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
  if (!im) { toast("Couldn't use that photo here. Choose one from your phone instead."); return; }
  const c = document.createElement("canvas"); c.width = im.naturalWidth; c.height = im.naturalHeight; c.getContext("2d").drawImage(im, 0, 0);
  let sq = null; try { sq = await Files.square(c, 400); } catch (e) {}
  if (!sq) { toast("Couldn't use that photo here. Choose one from your phone instead."); return; }
  if (await Files.put("avatar", sq, { max: 400, bytes: 120000 })) Snd.fx("pop");
}
scr.photo = wiz => ({
  title: wiz ? "Add your photo" : "Photos", wizard: wiz,
  draw(b) {
    const M = curM(), cover = M.cover, av = M.avatar;
    b.innerHTML = `<div class="fe-sec"><h4>Main photo</h4><p class="fe-p">It shows big at the top of your page. A photo of you looks best.</p>
        <button class="fe-cover${cover ? " has" : ""}" type="button" data-pick="cover" aria-label="${cover ? "Change" : "Choose"} your main photo">${cover ? `<img src="${esc(cover)}" alt="">` : "📷 Tap to choose a photo"}</button>
        <div class="fe-btns"><button class="fe-btn small" type="button" data-pick="cover">${cover ? "Change photo" : "Choose a photo"}</button>${cover ? `<button class="fe-btn small ghost" type="button" data-del="cover">Remove</button>` : ""}</div></div>
      ${wiz ? (cover && av ? `<p class="fe-msg ok">✓ Looks great. Your round profile picture was made from it too (change it anytime).</p>` : "")
      : `<div class="fe-sec"><h4>Profile picture</h4><p class="fe-p">The small round photo in chats, comments and next to your usernames.</p>
        <div class="fe-avrow"><img class="fe-av" src="${esc(av || FLEX_AVATAR)}" alt=""><div class="fe-btns" style="flex:1"><button class="fe-btn small" type="button" data-pick="avatar">${av ? "Change" : "Choose"}</button>${cover ? `<button class="fe-btn small ghost" type="button" data-fromcover>Use main photo</button>` : ""}${av ? `<button class="fe-btn small ghost" type="button" data-del="avatar">Remove</button>` : ""}</div></div></div>`}`;
    b.addEventListener("click", async e => {
      const pk = e.target.closest("[data-pick]"), dl = e.target.closest("[data-del]");
      if (pk) { const files = await Files.pick(false); if (files[0]) await setPhoto(pk.dataset.pick, files[0]); }
      else if (dl) { Snd.fx("unpop"); Files.drop(dl.dataset.del); Sheet.redraw(); }
      else if (e.target.closest("[data-fromcover]")) avatarFromCover();
    });
  }
});

/* ---------- name & bio ---------- */
scr.bio = wiz => ({
  title: wiz ? "Your name & bio" : "Name & bio", wizard: wiz,
  draw(b) {
    const D = cur(), p = P(D), lines = (Array.isArray(p.titles) ? p.titles : []).slice(0, 6), have = lines.map(t => String(t).trim());
    b.innerHTML = `<div><label class="fe-lab" for="feName">Your name</label><input class="fe-in" id="feName" maxlength="24" value="${esc(p.name || CONFIG.name || "")}" placeholder="e.g. Riya" autocomplete="nickname"><p class="fe-msg">Shows big at the top of your page.</p></div>
      <div><span class="fe-lab">Bio</span><p class="fe-p">A few short lines about you. They type out one by one under your name.</p></div>
      ${lines.length ? `<div class="fe-list">${lines.map((t, i) => `<div class="fe-li"><input class="fe-in" data-line="${i}" maxlength="40" value="${esc(t)}" placeholder="e.g. Anime fan from Pune" aria-label="Bio line ${i + 1}"><button class="fe-mini" type="button" data-rm="${i}" aria-label="Remove this line">✕</button></div>`).join("")}</div>` : ""}
      ${lines.length < 6 ? `<button class="fe-btn small ghost" type="button" data-addline>＋ Write a line</button>` : ""}
      <div><span class="fe-lab">Or tap to add</span><div class="fe-chips">${PICKS.map(x => `<button class="fe-chip" type="button" data-pickline="${esc(x)}" aria-pressed="${have.includes(x)}">${esc(x)}</button>`).join("")}</div></div>`;
    $("#feName", b).addEventListener("input", e => edit(D => { P(D).name = e.target.value.slice(0, 24); }));
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

/* ---------- theme ---------- */
scr.theme = wiz => ({
  title: wiz ? "Pick your theme" : "Theme", wizard: wiz,
  draw(b) {
    const now = curSkin();
    b.innerHTML = `<p class="fe-p">Everyone who opens your page sees it in this theme. Tap one to try it.</p>
      <div class="fe-skins">${SKINS.map(([k, n, g]) => `<button class="fe-skin" type="button" data-skin="${k}" aria-pressed="${k === now}"><i style="background:${g}" aria-hidden="true"></i>${n}</button>`).join("")}</div>`;
    b.addEventListener("click", e => { const s = e.target.closest("[data-skin]"); if (s) { setSkin(s.dataset.skin); Sheet.redraw(); } });
  }
});

/* ---------- birthday ---------- */
scr.birthday = () => ({
  title: "Birthday countdown",
  draw(b) {
    const D = cur(), p = P(D), on = BDAY_RE.test(p.birthday || ""), parts = on ? p.birthday.split("-") : ["", ""];
    b.innerHTML = `<p class="fe-p">Shows a countdown to your birthday on your page. On the day, it says it's your birthday 🎉</p>
      <div class="fe-two"><div><label class="fe-lab" for="feBm">Month</label><select class="fe-in" id="feBm"><option value="">Pick</option>${MONTHS.map((m, i) => `<option value="${pad2(i + 1)}"${parts[0] === pad2(i + 1) ? " selected" : ""}>${m}</option>`).join("")}</select></div>
      <div><label class="fe-lab" for="feBd">Day</label><select class="fe-in" id="feBd"><option value="">Pick</option>${Array.from({ length: 31 }, (_, i) => `<option value="${pad2(i + 1)}"${parts[1] === pad2(i + 1) ? " selected" : ""}>${i + 1}</option>`).join("")}</select></div></div>
      <p class="fe-msg${on ? " ok" : ""}">${on ? "✓ The countdown is on your page" : "Pick the month and the day."}</p>
      ${on ? `<button class="fe-btn small ghost" type="button" data-off>Turn the countdown off</button>` : ""}`;
    const upd = () => { const m = $("#feBm", b).value, d = $("#feBd", b).value; if (m && d && BDAY_RE.test(m + "-" + d)) { edit(D => { P(D).birthday = m + "-" + d; }); Snd.fx("pop"); Sheet.redraw(); } };
    $("#feBm", b).addEventListener("change", upd); $("#feBd", b).addEventListener("change", upd);
    b.addEventListener("click", e => { if (e.target.closest("[data-off]")) { edit(D => { P(D).birthday = ""; }); Snd.fx("unpop"); Sheet.redraw(); } });
  }
});

/* ---------- more ---------- */
scr.more = () => ({
  title: "More",
  draw(b) {
    const D = cur(), p = P(D), name = p.name || CONFIG.name || "";
    const tick = (Array.isArray(p.ticker) && p.ticker.length ? p.ticker : CONFIG.ticker || []).slice(0, 8);
    b.innerHTML = `<div><label class="fe-lab" for="feHero">Big name at the top <small>(up to 14 letters)</small></label><input class="fe-in" id="feHero" data-p="heroName" maxlength="14" value="${esc(p.heroName || "")}" placeholder="${esc(String(name).toUpperCase().slice(0, 14))}"><p class="fe-msg">Leave it empty to use your name.</p></div>
      <div><label class="fe-lab" for="feKana">Small line under the name</label><input class="fe-in" id="feKana" data-p="kana" maxlength="30" value="${esc(p.kana || "")}" placeholder="@${esc(me().username || "")}"><p class="fe-msg">Leave it empty to show your @username.</p></div>
      <div><span class="fe-lab">Moving strip</span><p class="fe-p">The words that slide across the page under your name (up to 8).</p></div>
      <div class="fe-list">${tick.map((t, i) => `<div class="fe-li"><input class="fe-in" data-tick="${i}" maxlength="30" value="${esc(t)}" aria-label="Words ${i + 1}"><button class="fe-mini" type="button" data-rmt="${i}" aria-label="Remove">✕</button></div>`).join("")}</div>
      ${tick.length < 8 ? `<button class="fe-btn small ghost" type="button" data-addt>＋ Add words</button>` : ""}`;
    const tickNow = () => $$("[data-tick]", b).map(x => x.value.trim().slice(0, 30));
    b.addEventListener("input", e => {
      const k = e.target.dataset.p;
      if (k) edit(D => { P(D)[k] = e.target.value.trim().slice(0, k === "heroName" ? 14 : 30); });
      else if (e.target.dataset.tick !== undefined) { const t = tickNow(); edit(D => { P(D).ticker = t; }); }
    });
    b.addEventListener("click", e => {
      const rm = e.target.closest("[data-rmt]");
      if (rm) { const t = tickNow().filter((_, j) => j !== +rm.dataset.rmt); edit(D => { P(D).ticker = t; }); Snd.fx("unpop"); Sheet.redraw(); }
      else if (e.target.closest("[data-addt]")) { const t = tickNow().concat(""); edit(D => { P(D).ticker = t; }); Sheet.redraw(); setTimeout(() => { const ins = $$(".fe-body [data-tick]"); if (ins.length) ins[ins.length - 1].focus(); }, 40); }
    });
  }
});

/* ---------- socials & links ---------- */
const ASK = {   // what to ask for each app: [question, example, tip]
  instagram: ["Your Instagram username", "yourname", "Or paste your profile link."],
  snapchat: ["Your Snapchat username", "yourname", "Or paste your add-me link."],
  youtube: ["Your channel's @handle", "yourchannel", "Or paste your channel link."],
  whatsapp: ["Your WhatsApp number, with country code", "91 98765 43210", "People tap it to message you. Your number shows on your page."],
  x: ["Your X username", "yourname", "Or paste your profile link."],
  tiktok: ["Your TikTok username", "yourname", "Or paste your profile link."],
  discord: ["Your server's invite link", "discord.gg/abc123", "In Discord: tap your server's name › Invite › Copy link."],
  spotify: ["Link to your playlist, song or profile", "open.spotify.com/playlist/…", "In Spotify: ⋯ › Share › Copy link."],
  telegram: ["Your Telegram username", "yourname", "Or paste your t.me link."],
  twitch: ["Your Twitch username", "yourname", "Or paste your channel link."],
  github: ["Your GitHub username", "yourname", "Or paste your profile link."],
  linkedin: ["Your LinkedIn profile link", "linkedin.com/in/yourname", "In LinkedIn: your profile › ⋯ › Share › Copy link."],
  facebook: ["Your Facebook username or link", "your.name", "Or paste your profile link."],
  threads: ["Your Threads username", "yourname", "Usually the same as your Instagram one."],
  pinterest: ["Your Pinterest username", "yourname", "Or paste your profile link."],
  reddit: ["Your Reddit username", "yourname", "Without the u/ at the start."],
  steam: ["Your Steam profile link", "steamcommunity.com/id/yourname", "In Steam: open your profile and copy its link."],
  email: ["Your email", "you@gmail.com", "It shows on your page so people can email you."]
};
const WRONG = {
  whatsapp: "Type the number with the country code, like 91 98765 43210.", discord: "Paste an invite link that looks like discord.gg/abc123.",
  spotify: "Paste a Spotify link (it starts with open.spotify.com).", email: "That email doesn't look right.",
  linkedin: "Paste your profile link: linkedin.com/in/yourname", steam: "Paste your profile link: steamcommunity.com/id/yourname"
};
const shownValue = (k, v) => (!v ? "" : k === "spotify" ? SOCIAL.spotify.url(v) : k === "steam" ? (v.startsWith("id/") ? v.slice(3) : SOCIAL.steam.url(v)) : v);
scr.socials = wiz => ({
  title: wiz ? "Add your socials" : "Socials & links", wizard: wiz,
  draw(b) {
    const D = cur(), S = D.socials, L = D.links, max = CONFIG.linkLimit || 8;
    b.innerHTML = `<p class="fe-p">${S.length ? "Tap one to change it. ↑ ↓ change the order on your page." : "Tap an app, then type your username. The link is made for you."}</p>
      ${S.length ? `<div class="fe-list">${S.map((s, i) => `<div class="fe-li">${socIc(s.k)}<button class="fe-li-t" type="button" data-plat="${s.k}"><b>${esc(SOCIAL[s.k].label)}</b><small>${esc(socialShow(s.k, s.v))}</small></button><button class="fe-mini" type="button" data-mv="${i},-1"${i ? "" : " disabled"} aria-label="Move up">↑</button><button class="fe-mini" type="button" data-mv="${i},1"${i < S.length - 1 ? "" : " disabled"} aria-label="Move down">↓</button></div>`).join("")}</div>` : ""}
      <span class="fe-lab">${S.length ? "Add another app" : "Pick an app"}</span>
      <div class="fe-plat">${ORDER.map(k => `<button class="fe-pl${S.some(s => s.k === k) ? " on" : ""}" type="button" data-plat="${k}">${socIc(k)}<span>${esc(SOCIAL[k].label)}</span></button>`).join("")}</div>
      ${wiz ? "" : `<div class="fe-sec"><h4>Other links</h4><p class="fe-p">A YouTube video, your shop, a game profile: anything with a link.</p>
        ${L.length ? `<div class="fe-list">${L.map((l, i) => { const k = linkKind(l.u); return `<div class="fe-li"><span class="soc-ic" style="background:${k.brand}${k.dark ? ";color:#111" : ""}" aria-hidden="true">${icon(k.icon)}</span><button class="fe-li-t" type="button" data-link="${i}"><b>${esc(l.t || k.host)}</b><small>${esc(k.host)}</small></button><button class="fe-mini" type="button" data-lmv="${i},-1"${i ? "" : " disabled"} aria-label="Move up">↑</button><button class="fe-mini" type="button" data-lmv="${i},1"${i < L.length - 1 ? "" : " disabled"} aria-label="Move down">↓</button></div>`; }).join("")}</div>` : ""}
        <button class="fe-btn small ghost" type="button" data-link="-1"${L.length >= max ? " disabled" : ""}>＋ Add a link</button></div>`}`;
    b.addEventListener("click", e => {
      const pl = e.target.closest("[data-plat]"), mv = e.target.closest("[data-mv]"), lk = e.target.closest("[data-link]"), lmv = e.target.closest("[data-lmv]");
      if (pl) { Snd.fx("tick"); Sheet.open(scr.social(pl.dataset.plat)); }
      else if (lk && !lk.disabled) { Snd.fx("tick"); Sheet.open(scr.link(+lk.dataset.link)); }
      else if (mv && !mv.disabled) { const [i, d] = mv.dataset.mv.split(",").map(Number); edit(D => move(D.socials, i, d)); Snd.fx("tick"); Sheet.redraw(); }
      else if (lmv && !lmv.disabled) { const [i, d] = lmv.dataset.lmv.split(",").map(Number); edit(D => move(D.links, i, d)); Snd.fx("tick"); Sheet.redraw(); }
    });
  }
});
// extras for the big cards (all optional): photos on the Instagram card, Snapchat stories, a Spotify cover...
function slotHtml(key, M, label) {
  const u = M[key];
  return `<div style="position:relative"><button class="fe-slot${u ? " has" : ""}" type="button" data-slot="${key}" aria-label="${u ? "Change" : "Add"} ${esc(label)}">${u ? `<img src="${esc(u)}" alt="">` : "＋"}</button>${u ? `<button class="fe-slot-x" type="button" data-unslot="${key}" aria-label="Remove ${esc(label)}">✕</button>` : ""}</div>`;
}
function fancyHtml(k, D) {
  const M = curM(), sec = (h, p, inner) => `<div class="fe-sec"><h4>${h}</h4><p class="fe-p">${p}</p>${inner}</div>`;
  const inp = (path, val, ph, max, mode) => `<input class="fe-in" data-f="${path}" maxlength="${max}" value="${esc(val === undefined || val === null ? "" : val)}" placeholder="${esc(ph)}"${mode ? ` inputmode="${mode}"` : ""}>`;
  if (k === "instagram") {
    const posts = ((D.instagram || {}).posts) || [];
    return sec("Photos on the card <small>(optional)</small>", "Show up to 3 of your posts on your Instagram card.",
      `<div class="fe-slots">${[0, 1, 2].map(i => slotHtml("ig" + i, M, "photo " + (i + 1))).join("")}</div>` +
      [0, 1, 2].filter(i => M["ig" + i]).map(i => `<div><label class="fe-lab">Caption for photo ${i + 1} <small>(optional)</small></label>${inp("instagram.posts." + i + ".cap", (posts[i] || {}).cap, "e.g. golden hour 🌅", 60)}</div>`).join(""));
  }
  if (k === "snapchat") {
    const C = D.snapchat || {}, st = C.stories || [];
    return sec("Make the card fancy <small>(optional)</small>", "Your Snapscore, your best streak and up to 4 stories people can tap to watch.",
      `<div class="fe-two"><div><label class="fe-lab">Snapscore</label>${inp("snapchat.score", C.score, "e.g. 25000", 12, "numeric")}</div><div><label class="fe-lab">Streak (days)</label>${inp("snapchat.streak", C.streak, "e.g. 120", 6, "numeric")}</div></div>
      <div class="fe-slots four">${[0, 1, 2, 3].map(i => slotHtml("sc" + i, M, "story " + (i + 1))).join("")}</div>` +
      [0, 1, 2, 3].filter(i => M["sc" + i]).map(i => `<div><label class="fe-lab">Story ${i + 1} caption <small>(optional)</small></label>${inp("snapchat.stories." + i + ".cap", (st[i] || {}).cap, "e.g. new roommate 🐱", 60)}</div>`).join(""));
  }
  if (k === "x") return sec("A picture on the card <small>(optional)</small>", "A screenshot of your profile or a post you like.", `<div class="fe-slots">${slotHtml("x0", M, "picture")}</div>`);
  if (k === "spotify") {
    const C = D.spotify || {};
    return sec("Make the card fancy <small>(optional)</small>", "A name and a cover picture for your playlist or song.",
      `<div><label class="fe-lab">Name</label>${inp("spotify.playlist", C.playlist, "e.g. Late night drives", 50)}</div><div><label class="fe-lab">By <small>(optional)</small></label>${inp("spotify.artist", C.artist, "e.g. Playlist by Riya", 50)}</div><div class="fe-slots">${slotHtml("spCover", M, "cover")}</div>`);
  }
  if (k === "discord") return sec("Say what it's about <small>(optional)</small>", "A short line about your server.", `<textarea class="fe-in" data-f="discord.blurb" maxlength="140" placeholder="e.g. Late-night gaming and anime talk. Pull up.">${esc((D.discord || {}).blurb || "")}</textarea>`);
  return "";
}
function setPath(o, path, v) {
  const ks = path.split("."); let x = o;
  for (let i = 0; i < ks.length - 1; i++) { const k = ks[i], nk = ks[i + 1]; if (!x[k] || typeof x[k] !== "object") x[k] = /^\d+$/.test(nk) ? [] : {}; x = x[k]; }
  x[ks[ks.length - 1]] = v;
}
function bindFancy(b) {
  b.addEventListener("input", e => { const path = e.target.dataset.f; if (path) edit(D => setPath(D, path, e.target.value.slice(0, 140))); });
  b.addEventListener("click", async e => {
    const sl = e.target.closest("[data-slot]"), un = e.target.closest("[data-unslot]");
    if (un) { Files.drop(un.dataset.unslot); Snd.fx("unpop"); Sheet.redraw(); return; }
    if (sl) { const files = await Files.pick(false); if (files[0]) { const k = sl.dataset.slot; if (await Files.put(k, files[0], { max: /^sc/.test(k) ? 900 : 720, bytes: 190000 })) Snd.fx("pop"); } }
  });
}
scr.social = k => {
  const d = SOCIAL[k]; if (!d) return scr.socials();
  return {
    title: d.label, focus: true,
    draw(b, f) {
      const D = cur(), has = D.socials.find(s => s.k === k), A = ASK[k] || ["Your username", "yourname", ""];
      const pre = d.at || k === "youtube" ? "@" : k === "whatsapp" ? "+" : "";
      b.innerHTML = `<div class="fe-head-ic">${socIc(k)}<div><b>${esc(d.label)}</b><small>${has ? "On your page" : "Not on your page yet"}</small></div></div>
        <div><label class="fe-lab" for="feV">${esc(A[0])}</label><div class="fe-pre" id="fePre">${pre ? `<span aria-hidden="true">${pre}</span>` : ""}<input class="fe-in" id="feV" value="${esc(shownValue(k, has && has.v))}" placeholder="${esc(A[1])}" autocapitalize="none" autocorrect="off" spellcheck="false" autocomplete="off" enterkeyhint="done"${k === "whatsapp" ? ' inputmode="tel"' : k === "email" ? ' type="email" inputmode="email"' : ""}></div>
        <p class="fe-msg" id="feVm">${esc(A[2])}</p></div>
        ${has ? fancyHtml(k, D) : ""}`;
      f.innerHTML = has ? `<button class="fe-btn danger" type="button" data-rm>Remove</button><button class="fe-btn" type="button" data-fe-back>Done</button>` : `<button class="fe-btn" type="button" data-ok>Add to my page</button>`;
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
        Snd.fx("pop"); toast(d.label + " added to your page ✓"); Sheet.back();
      };
      inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); if (has) inp.blur(); else add(); } });
      f.addEventListener("click", e => {
        if (e.target.closest("[data-ok]")) return add();
        const rm = e.target.closest("[data-rm]");
        if (rm && arm(rm, "Tap again to remove")) { edit(D => { D.socials = D.socials.filter(x => x.k !== k); }); Snd.fx("unpop"); toast(d.label + " removed"); Sheet.back(); }
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
  title: i >= 0 ? "Change link" : "Add a link", focus: true,
  draw(b, f) {
    const D = cur(), l = i >= 0 ? D.links[i] : null;
    if (i >= 0 && !l) { setTimeout(() => Sheet.back()); return; }
    b.innerHTML = `<div><label class="fe-lab" for="feLu">Link</label><input class="fe-in" id="feLu" maxlength="300" value="${esc(l ? l.u : "")}" placeholder="e.g. youtube.com/watch?v=…" autocapitalize="none" autocorrect="off" spellcheck="false" autocomplete="off" inputmode="url"><p class="fe-msg" id="feLm">Paste any link. The https:// is added for you.</p></div>
      <div><label class="fe-lab" for="feLt">Button text <small>(optional)</small></label><input class="fe-in" id="feLt" maxlength="40" value="${esc(l ? l.t : "")}" placeholder="e.g. My new video"><p class="fe-msg">Empty = the website's name.</p></div>`;
    f.innerHTML = l ? `<button class="fe-btn danger" type="button" data-rm>Remove</button><button class="fe-btn" type="button" data-ok>Done</button>` : `<button class="fe-btn" type="button" data-ok>Add to my page</button>`;
    const u = $("#feLu", b), t = $("#feLt", b), m = $("#feLm", b);
    const check = final => {
      if (!u.value.trim()) { m.className = "fe-msg"; m.textContent = "Paste any link. The https:// is added for you."; return ""; }
      const v = normUrl(u.value);
      if (v) { m.className = "fe-msg ok"; m.textContent = "✓ " + v.replace(/^https?:\/\/(www\.)?/, ""); return v; }
      m.className = "fe-msg" + (final ? " bad" : ""); m.textContent = final ? "That doesn't look like a link. It should look like youtube.com/…" : "";
      return "";
    };
    u.addEventListener("input", () => check(false));
    if (l) check(false);
    f.addEventListener("click", e => {
      if (e.target.closest("[data-ok]")) {
        const v = check(true); if (!v) { u.focus(); return; }
        edit(D => { const it = { t: t.value.trim().slice(0, 40), u: v.slice(0, 300) }; if (i >= 0 && D.links[i]) D.links[i] = it; else if (D.links.length < (CONFIG.linkLimit || 8)) D.links.push(it); });
        Snd.fx("pop"); Sheet.back(); return;
      }
      const rm = e.target.closest("[data-rm]");
      if (rm && arm(rm, "Tap again to remove")) { edit(D => { D.links.splice(i, 1); }); Snd.fx("unpop"); Sheet.back(); }
    });
  }
});

/* ---------- collection ---------- */
function thumbHtml(it, M) {
  if (it.type === "uc") return `<button class="fe-th uc" type="button" data-item="${esc(it.id)}"><b>${esc(it.amount || "")}</b><small>${esc(it.unit || "")}</small></button>`;
  const u = M["col_" + it.id] || (it.img ? bestSrc(it.img) : "");
  return `<button class="fe-th${/^blob:/.test(u) ? " up" : ""}" type="button" data-item="${esc(it.id)}" aria-label="Change this photo">${u ? `<img src="${esc(u)}" alt="">` : ""}${it.meme ? `<em>${esc(it.meme)}</em>` : ""}</button>`;
}
async function addPhotos() {
  const room = colMax() - cur().collection.length;
  if (room <= 0) { toast("All " + colMax() + " spots are used. Delete one to add another."); return; }
  const files = await Files.pick(true); if (!files.length) return;
  const use = files.slice(0, room);
  if (files.length > room) toast("Only " + room + " " + plural(room, "spot") + " left, so " + room + " " + plural(room, "photo") + " added.");
  const staged = [];
  for (const file of use) {                         // they all show at once…
    const id = newId(), o = { max: 720, bytes: 170000, change: D => { D.collection.push({ id, alt: "", meme: "" }); }, undo: D => { D.collection = D.collection.filter(x => x.id !== id); } };
    const p = await Files.stage("col_" + id, file, o); if (p) staged.push([id, p, o]);
  }
  if (!staged.length) return;
  Snd.fx("pop"); Sheet.redraw();
  for (const [id, p, o] of staged) await Files.send("col_" + id, p, o);   // …then upload one by one (easier on slow internet)
}
scr.collection = wiz => ({
  title: wiz ? "Show off your stuff" : "Collection", wizard: wiz,
  draw(b) {
    const D = cur(), M = curM(), items = D.collection.slice(0, colMax()), room = colMax() - items.length;
    b.innerHTML = `<p class="fe-p">${wiz || !items.length ? "Your setup, shoes, cards, figures, pets: anything you're proud of. Friends can like and comment on each one." : "Tap one to add text on it, move it or delete it."}</p>
      <div class="fe-grid">${items.map(it => thumbHtml(it, M)).join("")}${room > 0 ? `<button class="fe-th add" type="button" data-addp><b aria-hidden="true">＋</b>Add photos</button>` : ""}</div>
      <p class="fe-msg">${items.length} of ${colMax()} spots used.${room <= 0 ? " Delete one to add another." : " You can pick several photos at once."}</p>
      ${wiz ? "" : `<button class="fe-btn small ghost" type="button" data-addt${room > 0 ? "" : " disabled"}>＋ Add a text card <small>like "10,000 UC"</small></button>`}`;
    b.addEventListener("click", e => {
      if (e.target.closest("[data-addp]")) { Snd.fx("tick"); addPhotos(); return; }
      const at = e.target.closest("[data-addt]");
      if (at && !at.disabled) { const id = newId(); edit(D => { D.collection.push({ id, type: "uc", amount: "10,000", unit: "UC", game: "MY GAME" }); }); Snd.fx("pop"); Sheet.open(scr.item(id)); return; }
      const t = e.target.closest("[data-item]"); if (t) { Snd.fx("tick"); Sheet.open(scr.item(t.dataset.item)); }
    });
  }
});
const ITEM_MAX = { amount: 16, unit: 16, game: 30, meme: 40, alt: 80 };
scr.item = id => ({
  title: "Change this one",
  draw(b, f) {
    const D = cur(), M = curM(), i = D.collection.findIndex(x => x.id === id);
    if (i < 0) { setTimeout(() => Sheet.back()); return; }
    const it = D.collection[i], n = D.collection.length, src = M["col_" + id] || (it.img ? bestSrc(it.img) : "");
    const field = (k, label, ph, tip) => `<div><label class="fe-lab" for="fe-${k}">${label}</label><input class="fe-in" id="fe-${k}" data-f="${k}" maxlength="${ITEM_MAX[k]}" value="${esc(it[k] || "")}" placeholder="${esc(ph)}">${tip ? `<p class="fe-msg">${tip}</p>` : ""}</div>`;
    const pos = `<div class="fe-btns"><button class="fe-btn small ghost" type="button" data-mv="-1"${i ? "" : " disabled"}>← Earlier</button><button class="fe-btn small ghost" type="button" data-mv="1"${i < n - 1 ? "" : " disabled"}>Later →</button><button class="fe-btn small ghost" type="button" data-first${i ? "" : " disabled"}>Make it first</button></div>`;
    b.innerHTML = it.type === "uc"
      ? `<div class="fe-th uc" style="aspect-ratio:16/9;cursor:default"><b>${esc(it.amount || "")}</b><small>${esc(it.unit || "")}</small></div>${field("amount", "Big text", "e.g. 10,000")}${field("unit", "Second line", "e.g. UC")}${field("game", "Small label", "e.g. PUBG MOBILE")}${pos}`
      : `<button class="fe-cover sq has" type="button" data-replace aria-label="Replace photo">${src ? `<img src="${esc(src)}" alt="">` : ""}</button>
        <div class="fe-btns"><button class="fe-btn small ghost" type="button" data-replace>Replace photo</button></div>
        ${field("meme", 'Big text on the photo <small>(optional)</small>', "e.g. THOSE WHO KNOW", "")}${field("alt", 'What\'s in the photo <small>(optional)</small>', "e.g. My new keyboard", "Shows with the comments, and helps people who can't see the photo.")}${pos}`;
    f.innerHTML = `<button class="fe-btn danger" type="button" data-del>Delete</button><button class="fe-btn" type="button" data-fe-back>Done</button>`;
    b.addEventListener("input", e => { const k = e.target.dataset.f; if (!k) return; const v = e.target.value.slice(0, ITEM_MAX[k] || 80); edit(D => { const x = D.collection.find(y => y.id === id); if (x) x[k] = v; }); });
    b.addEventListener("click", async e => {
      if (e.target.closest("[data-replace]")) { const files = await Files.pick(false); if (files[0] && await Files.put("col_" + id, files[0], { max: 720, bytes: 170000 })) Snd.fx("pop"); return; }
      const mv = e.target.closest("[data-mv]");
      if (mv && !mv.disabled) { edit(D => move(D.collection, D.collection.findIndex(x => x.id === id), +mv.dataset.mv)); Snd.fx("tick"); Sheet.redraw(); return; }
      const fi = e.target.closest("[data-first]");
      if (fi && !fi.disabled) { edit(D => { const j = D.collection.findIndex(x => x.id === id); if (j > 0) D.collection.unshift(D.collection.splice(j, 1)[0]); }); Snd.fx("tick"); Sheet.redraw(); }
    });
    f.addEventListener("click", e => {
      const del = e.target.closest("[data-del]");
      if (!del || !arm(del, "Tap again to delete")) return;
      const D2 = cur(), M2 = curM(); D2.collection = D2.collection.filter(x => x.id !== id); ["", "_icon", "_logo"].forEach(s => { delete M2["col_" + id + s]; });
      commit(D2, M2); Snd.fx("unpop"); toast("Deleted"); Sheet.back();
    });
  }
});

/* ---------- sharing ---------- */
function shareRows(b) {
  b.insertAdjacentHTML("beforeend", `<div class="fe-rows">
    <button class="fe-row" type="button" data-s="copy"><i aria-hidden="true">📋</i><span><b>Copy my link</b><small>Then paste it in your Instagram bio</small></span></button>
    <button class="fe-row" type="button" data-s="send"><i aria-hidden="true">📤</i><span><b>Send to friends</b><small>WhatsApp, Instagram, anywhere</small></span></button>
    <button class="fe-row" type="button" data-s="story"><i aria-hidden="true">📸</i><span><b>Story picture</b><small>A picture of your page for your story</small></span></button>
    <button class="fe-row" type="button" data-s="qr"><i aria-hidden="true">🔳</i><span><b>Save QR code</b><small>People scan it to open your page</small></span></button></div>`);
  b.addEventListener("click", async e => {
    const s = e.target.closest("[data-s]"); if (!s) return;
    Snd.fx("tick");
    const k = s.dataset.s;
    if (k === "copy") { const ok = await copyText(pageLink()); toast(ok ? "Link copied ✓ Paste it in your bio" : "Your link: " + pageLink()); if (ok) markShared(); }
    else if (k === "send") { if (await shareLink(pageLink(), "Check out my page 👀")) markShared(); }
    else if (k === "story") Sheet.open(scr.story());
    else if (k === "qr") { $("#qrSave").click(); markShared(); }
  });
}
scr.share = () => ({
  title: "Share your page",
  draw(b) {
    b.innerHTML = `<div class="fe-big"><span class="em" aria-hidden="true">🔗</span><h4>${esc(linkText())}</h4><p class="fe-p">Put it in your bio and on your story. Friends can like your stuff, comment, sign your guestbook and message you.</p></div>`;
    shareRows(b);
  }
});

/* ---------- a picture of the page for Instagram / WhatsApp stories ---------- */
const Story = (() => {
  const W = 1080, H = 1920;
  const load = (src, remote) => new Promise(res => {
    if (!src) return res(null);
    const local = /^(blob:|data:|assets\/)/.test(src);
    if (!local && !remote) return res(null);
    const im = new Image(); if (!local) im.crossOrigin = "anonymous";
    im.onload = () => res(im); im.onerror = () => res(null); im.src = src;
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
      b.innerHTML = `<p class="fe-p">Post it on your Instagram or WhatsApp story. On Instagram, add a link sticker with <b>${esc(linkText())}</b> so people can tap it.</p><div class="fe-story" id="feStory">Making your picture…</div>`;
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
      if (!list.length) {
        b.innerHTML = `<div class="fe-big"><span class="em" aria-hidden="true">🔔</span><h4>Nothing yet</h4><p class="fe-p">When people like your photos, comment or sign your guestbook, you'll see it here. Share your page to get it going.</p></div><button class="fe-btn" type="button" data-sh>Share my page</button>`;
      } else b.innerHTML = `<div class="fe-acts">${list.map(r => actRow(r, seenAt)).join("")}</div>`;
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

/* ---------- under the name, only for the owner: numbers + "finish your page" ---------- */
const OwnerBox = (() => {
  let last = "";
  function steps() {
    const D = pageData(), M = Custom.media || {};
    return [
      ["photo", "📷 Add your photo", !!M.cover],
      ["bio", "✏️ Write a bio", ((D.profile || {}).titles || []).some(t => String(t).trim())],
      ["socials", "🔗 Add your socials", D.socials.length + D.links.length > 0],
      ["collection-add", "🖼️ Add to your collection", collectionView().length > 0],
      ["share", "📤 Share your page", !!LS.get("shared@" + me().id, 0)]
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
      html = stats() + (left.length ? `<div class="ob-todo"><div class="ob-todo-h"><b>Finish your page</b><small>${done} of ${st.length} done</small></div><div class="ob-bar"><i style="width:${Math.round(done / st.length * 100)}%"></i></div><div class="ob-next">${left.map(s => `<button type="button" data-open="${s[0]}">${s[1]}</button>`).join("")}</div></div>` : "");
    }
    if (html !== last) { last = html; box.innerHTML = html; }
  }
  return { paint };
})();

/* ---------- quick start for a brand-new page ---------- */
const STEPS = ["photo", "bio", "theme", "socials", "collection"];
function step(i) {
  const s = scr[STEPS[i]]([i + 1, STEPS.length]), draw = s.draw;
  if (i > 0) s.backTo = () => step(i - 1);
  s.draw = (b, f) => {
    draw(b, f);
    f.innerHTML = `<button class="fe-btn ghost" type="button" data-skip>Skip</button><button class="fe-btn" type="button" data-next>${i < STEPS.length - 1 ? "Next →" : "Finish"}</button>`;
    f.addEventListener("click", e => { if (e.target.closest("[data-skip],[data-next]")) { Snd.fx("tick"); Sheet.swap(i < STEPS.length - 1 ? step(i + 1) : scr.done()); } });
  };
  return s;
}
scr.start = () => ({
  title: "Your page is live 🎉",
  draw(b, f) {
    b.innerHTML = `<div class="fe-big"><span class="em" aria-hidden="true">🎉</span><h4>${esc(linkText())}</h4><p class="fe-p">That's your link. Now let's make the page yours: your photo, a bio, a theme, your socials and your collection. About a minute, and you can change anything later.</p></div>`;
    f.innerHTML = `<button class="fe-btn ghost" type="button" data-fe-x>Later</button><button class="fe-btn" type="button" data-go>Let's go →</button>`;
    f.addEventListener("click", e => { if (e.target.closest("[data-go]")) { Snd.fx("tick"); Sheet.swap(step(0)); } });
  }
});
scr.done = () => ({
  title: "Your page is ready 🔥",
  backTo: () => step(STEPS.length - 1),
  draw(b, f) {
    b.innerHTML = `<div class="fe-big"><span class="em" aria-hidden="true">🔥</span><h4>${esc(linkText())}</h4><p class="fe-p">Share it so friends can see it, like your stuff and sign your guestbook. Every like and comment shows up under your name.</p></div>`;
    shareRows(b);
    f.innerHTML = `<button class="fe-btn" type="button" data-fe-x>See my page</button>`;
  }
});

/* ---------- how the page talks to the editor ---------- */
let attached = false;
function attach() {
  if (!Custom.owner || Custom.demo) { OwnerBox.paint(); return; }
  if (!attached) {
    attached = true; Files.init();
    Custom.on(() => { if (!Custom.owner && Sheet.isOpen) Sheet.close(); OwnerBox.paint(); });
    Live.on(() => OwnerBox.paint());
    const refresh = () => Activity.load().then(() => OwnerBox.paint(), () => {});
    idle(refresh);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && Custom.owner) refresh(); });
  }
  OwnerBox.paint();
}
function open(what) {
  if (!Custom.owner || Custom.demo) { toast("Log in to change your page."); return; }
  attach();
  const parts = String(what || "menu").split(":"), name = parts[0], arg = parts.slice(1).join(":");
  if (name === "collection-add") { Sheet.open(scr.collection()); addPhotos(); return; }
  if (name === "link-add") { Sheet.open(scr.link(-1)); return; }
  if (name === "social" || name === "item") { Sheet.open(scr[name](arg)); return; }
  Sheet.open((scr[name] || scr.menu)());
}
window.FlexEdit = { open, attach, setSkin(k) { if (!Custom.owner || Custom.demo) return; attach(); setSkin(k); } };
})();
