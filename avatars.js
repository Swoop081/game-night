/* =================== CONTESTANT AVATARS ===================
   Each player slot has a look: a photo (camera or library) or a cartoon character, plus their colour.
   Stored on this device only (localStorage, via save()). */
(function(){
const css=`
.av{--s:44px;position:relative;display:inline-grid;place-items:center;width:var(--s);height:var(--s);border-radius:50%;flex:none;
  background:var(--pc,#444);padding:3px;box-shadow:0 0 0 2px rgba(0,0,0,.35),0 6px 18px -6px var(--pc,#000)}
.av img{width:100%;height:100%;border-radius:50%;object-fit:cover;background:#f4f1ff;display:block}
.av .ini{width:100%;height:100%;border-radius:50%;display:grid;place-items:center;background:#f4f1ff;color:#1a1636;font-family:var(--f-display);font-weight:900;font-size:calc(var(--s) * .45)}
.av.sm{--s:30px;padding:2px}.av.md{--s:56px}.av.lg{--s:88px;padding:4px}.av.xl{--s:130px;padding:5px}
.av.cell{--s:var(--cs,40px);padding:2px;margin-bottom:.15em}
.swatchbtn{padding:0;border:0;background:none;box-shadow:none;width:auto;height:auto}
.swatchbtn .av{--s:46px}
.side .av,.hlp .av{--s:clamp(70px,16vmin,140px);padding:5px}
.portrait .side .av,.portrait .hlp .av{--s:52px;padding:3px}
.vs .p .av{--s:clamp(64px,14vmin,100px)}
.looksheet{max-width:min(820px,100%)}
.looktabs{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.avgrid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;width:100%}
.portrait .avgrid{grid-template-columns:repeat(4,minmax(0,1fr))}
.avgrid button{aspect-ratio:1;border-radius:50%;padding:3px;border:3px solid transparent;background:var(--stage-3)}
.avgrid button img{width:100%;height:100%;border-radius:50%;background:#f4f1ff;object-fit:cover}
.avgrid button[aria-pressed="true"]{border-color:var(--gold)}
.lookprev{display:flex;align-items:center;gap:16px;justify-content:center}
.intro{display:flex;flex-wrap:wrap;gap:clamp(10px,3vmin,26px);justify-content:center;max-width:100%}
.intro .c{display:flex;flex-direction:column;align-items:center;gap:8px;opacity:0;transform:translateY(30px) scale(.8);animation:popin .5s cubic-bezier(.2,1.4,.4,1) forwards;animation-delay:calc(var(--i) * 0.28s)}
.intro .c b{font-family:var(--f-display);font-weight:900;font-size:clamp(1.1rem,3.4vmin,1.8rem);max-width:9em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.intro.many .av{--s:clamp(48px,9vmin,72px)}
@keyframes popin{to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.intro .c{opacity:1;transform:none;animation:none}}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

const STYLES=[["avataaars","People"],["lorelei","Sketch"],["bottts","Robots"],["big-ears-neutral","Faces"]];
S.avatars=S.avatars||[];
try{const j=JSON.parse(localStorage.getItem("gn.avatars")||"null");if(Array.isArray(j))S.avatars=j}catch(e){}
function saveAv(){try{localStorage.setItem("gn.avatars",JSON.stringify(S.avatars))}catch(e){}}
const cartoon=(style,seed)=>`https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}&radius=50`;
window.avatarSrc=function(slot){
  const a=S.avatars[slot];
  if(a&&a.type==="photo"&&a.src)return a.src;
  if(a&&a.type==="cartoon")return cartoon(a.style,a.seed);
  return cartoon("avataaars","gamenight"+slot);
};
// player objects carry .slot (or .id for Takeover) plus .name/.color
window.avatarHTML=function(p,size,slotOverride){
  const slot=slotOverride!=null?slotOverride:(p.slot!=null?p.slot:p.id);
  const name=(p.name||"?").trim();
  return `<span class="av ${size||""}" style="--pc:${p.color}"><img alt="" src="${esc(avatarSrc(slot))}" data-ini="${esc(name.charAt(0).toUpperCase())}"></span>`;
};
document.addEventListener("error",e=>{const t=e.target;if(t&&t.tagName==="IMG"&&t.parentElement&&t.parentElement.classList.contains("av")){const d=document.createElement("span");d.className="ini";d.textContent=t.dataset.ini||"?";t.replaceWith(d)}},true);

/* ---- the look picker (avatar + colour), replaces the old colour-only picker ---- */
let seeds=[];
const newSeeds=()=>{seeds=Array.from({length:12},()=>Math.random().toString(36).slice(2,8))};newSeeds();
let styleIdx=0;
window.pickColour=function(i,after){
  const name=(S.names[i]||"").trim()||`Player ${i+1}`;
  const done=()=>{saveAv();save();closeOverlay();(after||renderSetup)();setTimeout(()=>$("pk"+i)&&$("pk"+i).focus(),40)};
  const owner=c=>{const j=S.colors.slice(0,S.count).indexOf(c);return j>=0&&j!==i?((S.names[j]||"").trim()||`P${j+1}`):""};
  const draw=()=>{
    const cur=S.avatars[i]||{};const me={name,color:S.colors[i],slot:i};
    openOverlay(`<span class="eyebrow">Contestant look</span>
      <div class="lookprev">${avatarHTML(me,"xl")}<h2>${esc(name)}</h2></div>
      <div class="row"><label class="btn gold" for="avCam">📷 Take a photo</label><label class="btn" for="avLib">🖼️ Choose a photo</label></div>
      <input id="avCam" type="file" accept="image/*" capture="user" hidden><input id="avLib" type="file" accept="image/*" hidden>
      <span class="eyebrow">Or pick a character</span>
      <div class="looktabs">${STYLES.map(([s,l],k)=>`<button class="btn${k===styleIdx?" gold":""}" data-st="${k}">${l}</button>`).join("")}<button class="btn" id="avMore">🔀 More</button></div>
      <div class="avgrid">${seeds.map(sd=>{const st=STYLES[styleIdx][0];const on=cur.type==="cartoon"&&cur.style===st&&cur.seed===sd;return `<button data-seed="${sd}" aria-pressed="${on}" aria-label="Character"><img alt="" src="${cartoon(st,sd)}"></button>`}).join("")}</div>
      <span class="eyebrow">Colour</span>
      <div class="palette">${COLORS.map(([c,l])=>`<button data-c="${c}" style="background:${c}" aria-pressed="${S.colors[i]===c}" aria-label="${l}${owner(c)?", taken by "+esc(owner(c)):""}"><span>${owner(c)?esc(owner(c)):l}</span></button>`).join("")}</div>
      <button class="btn gold" id="lookDone">Done</button>`,"#lookDone");
    $("sheet").classList.add("looksheet");
    $("sheet").querySelectorAll("[data-st]").forEach(b=>b.onclick=()=>{styleIdx=+b.dataset.st;draw()});
    $("avMore").onclick=()=>{newSeeds();draw()};
    $("sheet").querySelectorAll("[data-seed]").forEach(b=>b.onclick=()=>{S.avatars[i]={type:"cartoon",style:STYLES[styleIdx][0],seed:b.dataset.seed};saveAv();draw()});
    $("sheet").querySelectorAll(".palette button").forEach(b=>b.onclick=()=>{const c=b.dataset.c,j=S.colors.slice(0,S.count).indexOf(c);if(j>=0&&j!==i)S.colors[j]=S.colors[i];S.colors[i]=c;save();draw()});
    ["avCam","avLib"].forEach(id=>$(id).onchange=e=>{const f=e.target.files&&e.target.files[0];if(f)photo(f,src=>{S.avatars[i]={type:"photo",src};saveAv();draw()})});
    $("lookDone").onclick=done;
  };
  draw();
};
// shrink a photo to a 256px square so it stores small
function photo(file,cb){
  const fr=new FileReader();
  fr.onload=()=>{const im=new Image();im.onload=()=>{
    const s=Math.min(im.width,im.height),c=document.createElement("canvas");c.width=c.height=256;
    c.getContext("2d").drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,256,256);
    cb(c.toDataURL("image/jpeg",.82));
  };im.src=fr.result};
  fr.readAsDataURL(file);
}

/* ---- "Meet the contestants" line-up shown when a game starts ---- */
window.introContestants=function(players,title,cb){
  SFX.boost&&SFX.boost();
  openOverlay(`<span class="eyebrow">${esc(title)}</span><h2>Meet the contestants</h2>
    <div class="intro${players.length>8?" many":""}">${players.map((p,k)=>`<div class="c" style="--i:${k}">${avatarHTML(p,players.length>8?"":"lg")}<b style="color:${p.color}">${esc(p.name)}</b></div>`).join("")}</div>
    <button class="btn gold" id="introGo">Let's play!</button>`,"#introGo");
  $("introGo").onclick=()=>{closeOverlay();cb&&cb()};
};
})();
