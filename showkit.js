/* =================== SHOW KIT ===================
   Shared game-show presentation: spotlight bumpers, VS splashes, flashes, shakes and avatar score bars.
   Pure CSS + a little JS, no libraries. Each game opts in. */
(function(){
const css=`
#skLayer{position:absolute;inset:0;z-index:60;pointer-events:none}
.skb{position:absolute;inset:0;display:grid;place-items:center;overflow:hidden;pointer-events:auto;cursor:pointer;background:radial-gradient(90% 70% at 50% 45%,var(--skc2,#1d3fa8) 0%,#050818 75%);animation:skin .25s ease-out both}
.skb.out{animation:skout .4s ease-in forwards}
@keyframes skin{from{opacity:0}to{opacity:1}}
@keyframes skout{to{opacity:0;transform:scale(1.06)}}
.skb::before{content:"";position:absolute;left:50%;top:50%;width:260vmax;height:260vmax;margin:-130vmax 0 0 -130vmax;background:conic-gradient(from 0deg,transparent 0 8deg,rgba(255,255,255,.13) 10deg,transparent 14deg 48deg,rgba(255,255,255,.1) 50deg,transparent 54deg 98deg,rgba(255,255,255,.13) 100deg,transparent 104deg 168deg,rgba(255,255,255,.1) 170deg,transparent 174deg 228deg,rgba(255,255,255,.13) 230deg,transparent 234deg 300deg,rgba(255,255,255,.1) 302deg,transparent 306deg);animation:skspin 9s linear infinite}
@keyframes skspin{to{transform:rotate(360deg)}}
.skb .inner{position:relative;text-align:center;padding:0 5vw;display:flex;flex-direction:column;gap:1.2vmin;align-items:center}
.skb .tt{font-family:var(--skf,var(--f-display));font-weight:900;font-size:clamp(2.6rem,12vmin,9rem);line-height:.95;letter-spacing:.02em;color:#fff;text-transform:uppercase;text-shadow:0 0 40px var(--skc,#ffc94a),0 6px 0 rgba(0,0,0,.35);display:flex;flex-wrap:wrap;justify-content:center;gap:0 .06em;perspective:800px}
.skb .tt span{display:inline-block;animation:skpop .55s cubic-bezier(.2,1.5,.4,1) both;animation-delay:calc(var(--i)*.035s + .1s)}
.skb .tt .sp{width:.35em}
@keyframes skpop{from{opacity:0;transform:translateY(60px) rotateX(-80deg) scale(.5)}to{opacity:1;transform:none}}
.skb .sub{font-family:var(--f-body);font-weight:800;letter-spacing:.3em;text-transform:uppercase;color:var(--skc,#ffc94a);font-size:clamp(.8rem,2.6vmin,1.5rem);animation:skfade .5s .5s both}
.skb .av{margin-bottom:1vmin;animation:skpop .6s cubic-bezier(.2,1.5,.4,1) both}
@keyframes skfade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.skb .bar{position:absolute;left:0;right:0;height:1.4vmin;background:linear-gradient(90deg,transparent,var(--skc,#ffc94a),transparent);animation:skbar .6s ease-out both}
.skb .bar.t{top:18%}.skb .bar.b{bottom:18%;animation-delay:.1s}
@keyframes skbar{from{transform:scaleX(0)}to{transform:none}}
.skflash{position:absolute;inset:0;z-index:70;pointer-events:none;background:var(--skfc,#fff);animation:skflash .45s ease-out forwards}
@keyframes skflash{0%{opacity:.85}100%{opacity:0}}
.skshake{animation:skshake .5s}
@keyframes skshake{10%,50%,90%{transform:translateX(-8px)}30%,70%{transform:translateX(8px)}}
/* VS splash */
.skvs{position:absolute;inset:0;display:grid;grid-template-rows:1fr auto 1fr;background:#050818;overflow:hidden;pointer-events:auto;cursor:pointer;animation:skin .2s both}
.skvs.out{animation:skout .35s ease-in forwards}
.skvs .half{position:relative;display:flex;align-items:center;justify-content:center;gap:3vmin;padding:2vmin 6vw;background:linear-gradient(100deg,var(--pc),color-mix(in srgb,var(--pc) 35%,#050818))}
.skvs .half.a{grid-row:1;transform:translateX(-120%);animation:skslidea .5s .1s cubic-bezier(.2,.9,.3,1) forwards;clip-path:polygon(0 0,100% 0,100% 82%,0 100%)}
.skvs .half.b{grid-row:3;flex-direction:row-reverse;transform:translateX(120%);animation:skslidea .5s .25s cubic-bezier(.2,.9,.3,1) forwards;clip-path:polygon(0 18%,100% 0,100% 100%,0 100%);background:linear-gradient(260deg,var(--pc),color-mix(in srgb,var(--pc) 35%,#050818))}
@keyframes skslidea{to{transform:none}}
.skvs .half .av{--s:clamp(70px,22vmin,200px);padding:5px}
.skvs .half .who{display:flex;flex-direction:column;gap:.4vmin;min-width:0;text-align:left}
.skvs .half.b .who{text-align:right}
.skvs .half b{font-family:var(--skf,var(--f-display));font-weight:900;font-size:clamp(1.8rem,9vmin,6rem);line-height:.95;text-transform:uppercase;color:#fff;text-shadow:0 4px 0 rgba(0,0,0,.3);max-width:60vw;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.skvs .half small{font-weight:800;letter-spacing:.25em;text-transform:uppercase;color:rgba(255,255,255,.85);font-size:clamp(.65rem,2vmin,1.1rem)}
.skvs .mid{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;padding:1.2vmin 0;gap:.6vmin}
.skvs .vsx{font-family:var(--f-display);font-weight:900;font-size:clamp(2.6rem,14vmin,9rem);line-height:.8;color:#fff;text-shadow:0 0 30px #ffc94a,0 0 60px #ffc94a;animation:skslam .5s .55s cubic-bezier(.2,1.6,.4,1) both}
@keyframes skslam{from{opacity:0;transform:scale(4)}to{opacity:1;transform:none}}
.skvs .cat{font-family:var(--skf,var(--f-display));font-weight:900;font-size:clamp(1rem,4vmin,2.4rem);letter-spacing:.12em;text-transform:uppercase;color:#ffc94a;animation:skfade .4s .9s both;text-align:center}
.portrait .skvs .half{padding:1vmin 4vw;gap:2vmin}
/* score bars */
.skpod{display:flex;flex-direction:column;gap:clamp(5px,1.2vh,10px);width:100%}
.skrow{display:grid;grid-template-columns:auto minmax(0,9ch) minmax(0,1fr) auto;gap:clamp(6px,1.4vw,14px);align-items:center;padding:clamp(4px,.9vh,8px) clamp(8px,1.4vw,14px);border-radius:14px;background:var(--stage-3);border-left:6px solid var(--pc);animation:skrow .5s cubic-bezier(.2,1.2,.4,1) both;animation-delay:var(--d,0s)}
@keyframes skrow{from{opacity:0;transform:translateX(-40px)}to{opacity:1;transform:none}}
.skrow .av{--s:clamp(30px,6vh,52px);padding:2px}
.skrow .sknm{font-weight:900;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:clamp(.85rem,2.2vh,1.15rem)}
.skrow .skbar{height:clamp(10px,2.2vh,18px);border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden}
.skrow .skbar i{display:block;height:100%;width:var(--w,0%);border-radius:99px;background:linear-gradient(90deg,var(--pc),#fff8);animation:skgrow .9s calc(var(--d,0s) + .25s) cubic-bezier(.2,.9,.3,1) both}
@keyframes skgrow{from{width:0}}
.skrow .skscore{font-family:var(--f-clock);font-weight:700;color:var(--gold);font-size:clamp(1.1rem,3vh,1.7rem);min-width:2ch;text-align:right;animation:skfade .4s calc(var(--d,0s) + .7s) both}
.skrow.lead{box-shadow:0 0 28px -8px var(--pc);background:linear-gradient(90deg,color-mix(in srgb,var(--pc) 25%,var(--stage-3)),var(--stage-3))}
.skrow.out{opacity:.45;filter:grayscale(.8)}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const layer=document.createElement("div");layer.id="skLayer";
const mount=()=>{const a=document.getElementById("app");(a||document.body).appendChild(layer)};
mount();

const e=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function sting(kind){
  try{ac()}catch(_){}
  const t=(f,d,ty,v,w)=>{try{tone(f,d,ty,v,w)}catch(_){}};
  if(kind==="start"){[392,523,659,784].forEach((f,i)=>t(f,.16,"triangle",.2,i*.09));t(1046,.5,"triangle",.18,.4)}
  else if(kind==="vs"){t(110,.5,"sawtooth",.22,0);t(82,.7,"sawtooth",.2,.45);t(1318,.4,"triangle",.14,.5)}
  else if(kind==="win"){[523,659,784,1046,1318].forEach((f,i)=>t(f,.2,"triangle",.2,i*.08));t(1568,.7,"sine",.18,.45)}
  else if(kind==="out"){[392,330,262,196].forEach((f,i)=>t(f,.22,"sawtooth",.16,i*.12))}
  else if(kind==="hit"){t(160,.18,"square",.2,0);t(1200,.3,"triangle",.12,.02)}
}
function letters(txt){return String(txt).split("").map((c,i)=>c===" "?`<span class="sp" style="--i:${i}"></span>`:`<span style="--i:${i}">${e(c)}</span>`).join("")}
let busy=null;
function clear(el,ms){return new Promise(res=>{setTimeout(()=>{el.classList.add("out");setTimeout(()=>{el.remove();res()},380)},ms)})}
/* A full-screen title card: SK.bumper("Round 2",{sub:"Get ready",color:"#ffc94a",bg:"#1d3fa8",ms:1800,avatar:player}) */
function bumper(title,o={}){
  o=Object.assign({ms:1900,color:"#ffc94a",bg:"#1d3fa8"},o);
  const el=document.createElement("div");el.className="skb";el.style.setProperty("--skc",o.color);el.style.setProperty("--skc2",o.bg);if(o.font)el.style.setProperty("--skf",o.font);
  el.innerHTML=`<span class="bar t"></span><span class="bar b"></span><div class="inner">${o.avatar?avatarHTML(o.avatar,"xl"):""}<div class="tt">${letters(title)}</div>${o.sub?`<div class="sub">${e(o.sub)}</div>`:""}</div>`;
  layer.appendChild(el);sting(o.sting||"start");
  return new Promise(res=>{let done=false;const fin=()=>{if(done)return;done=true;el.classList.add("out");setTimeout(()=>{el.remove();res()},380)};el.onclick=fin;setTimeout(fin,o.ms)});
}
/* Head to head: two coloured bands slide in, VS slams down. */
function vs(a,b,o={}){
  o=Object.assign({ms:2600},o);
  const el=document.createElement("div");el.className="skvs";if(o.font)el.style.setProperty("--skf",o.font);
  const half=(p,k,role)=>`<div class="half ${k}" style="--pc:${p.color}">${avatarHTML(p,"xl")}<div class="who"><small>${e(role||"")}</small><b>${e(p.name)}</b></div></div>`;
  el.innerHTML=`${half(a,"a",o.roleA)}<div class="mid"><div class="vsx">VS</div>${o.cat?`<div class="cat">${e(o.cat)}</div>`:""}</div>${half(b,"b",o.roleB)}`;
  layer.appendChild(el);sting("vs");setTimeout(()=>flash("rgba(255,255,255,.55)"),620);
  return new Promise(res=>{let done=false;const fin=()=>{if(done)return;done=true;el.classList.add("out");setTimeout(()=>{el.remove();res()},340)};el.onclick=fin;setTimeout(fin,o.ms)});
}
function flash(color){const f=document.createElement("div");f.className="skflash";if(color)f.style.setProperty("--skfc",color);layer.appendChild(f);setTimeout(()=>f.remove(),500)}
function shake(el){if(!el)return;el.classList.remove("skshake");void el.offsetWidth;el.classList.add("skshake");setTimeout(()=>el.classList.remove("skshake"),520)}
/* Avatar score bars. rows: [{name,color,id|slot,score,label,out}] */
function podium(rows,o={}){
  const sorted=rows.slice().sort((a,b)=>(a.out?1:0)-(b.out?1:0)||b.score-a.score);
  const max=Math.max(1,o.max||Math.max(...sorted.map(r=>r.score||0)));
  return `<div class="skpod">${sorted.map((r,i)=>`<div class="skrow${i===0&&!r.out?" lead":""}${r.out?" out":""}" style="--pc:${r.color};--d:${(i*.09).toFixed(2)}s;--w:${Math.max(r.score?4:0,Math.round((r.score||0)/max*100))}%">${avatarHTML(r,"md")}<span class="sknm">${e(r.name)}</span><span class="skbar"><i></i></span><b class="skscore">${r.out?"OUT":e(r.label!=null?r.label:r.score)}</b></div>`).join("")}</div>`;
}
window.SK={bumper,vs,flash,shake,podium,sting};
})();
(function(){const h=document.getElementById("hub");if(!h)return;const v=document.createElement("div");v.textContent="build 29 Oct · voice v5";v.style.cssText="position:absolute;right:14px;bottom:8px;font-size:.62rem;letter-spacing:.12em;color:rgba(162,157,208,.45);pointer-events:none";h.appendChild(v)})();
