/* =================== THE PRICE IS RIGHT (Price Is Right, Australian format) ===================
   Round x3: players bid on an item (closest without going over wins it, exact = $100 bonus),
   the winner plays a pricing game. Then the two biggest winners play the Showcase Showdown
   (alternate bids, first within $100 wins). The winner puts the Showcase in price order in 40 seconds,
   with the car always locked in last. Uses real prices from CD_PRODUCTS (prices.js). */
(function(){
const css=`
#cd{gap:10px}
.cdscore{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.cdchip{display:flex;align-items:center;gap:8px;padding:6px 14px 6px 8px;border-radius:999px;background:var(--stage-2);border:2px solid var(--line);transition:border-color .2s,box-shadow .2s}
.cdchip .av{--s:28px;padding:2px}
.bid .av{--s:30px;padding:2px;margin-bottom:2px}
.entry .who{text-align:center}
.entry .who .av{vertical-align:middle;margin-right:6px}
.cdhead .eyebrow .av{--s:22px;padding:1px;vertical-align:middle;margin-right:4px}
.cdchip b{font-weight:800}
.cdchip span{font-family:var(--f-clock);color:var(--gold);font-variant-numeric:tabular-nums}
.cdchip.on{border-color:var(--pc);box-shadow:0 0 30px -6px var(--pc)}
.cdstage{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;align-items:center;gap:12px;padding:4px 0}
.cdhead{text-align:center}
.cdhead h2{margin:.1em 0 0;font-family:var(--f-display);font-weight:900;font-size:clamp(1.6rem,5vmin,3rem);line-height:1}
.cdhead p{margin:.4em 0 0;color:var(--muted)}
.cdrow{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;align-items:stretch;width:100%}
.prize{position:relative;background:linear-gradient(160deg,#fffdf6,#efe8d6);color:#1a1636;border-radius:18px;padding:14px 16px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;width:min(300px,100%);box-shadow:0 20px 40px -20px #000;border:0;font:inherit}
.prize .em{font-size:clamp(3rem,10vmin,5.5rem);line-height:1}
.prize .nm{font-weight:800;font-size:clamp(.95rem,2.4vmin,1.2rem);line-height:1.2}
.prize .rt{font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;font-weight:800;color:#6b5f2a;background:#ffe9a8;border-radius:999px;padding:.25em .7em}
.prize .pr{font-family:var(--f-clock);font-weight:700;font-size:clamp(1.4rem,4vmin,2.2rem);color:#14532d;min-height:1.2em}
.prize .pr.hid{color:transparent;background:repeating-linear-gradient(90deg,#d8cfb5 0 10px,#cfc5a8 10px 20px);border-radius:8px;min-width:6ch}
.prize.big{width:min(420px,100%)}
.prize.sm{width:min(180px,46%);padding:10px}
.prize.sm .em{font-size:clamp(2.2rem,7vmin,3.4rem)}
.prize.sm .nm{font-size:.85rem}
.prize.sel{box-shadow:0 0 0 5px var(--gold),0 20px 40px -20px #000}
.prize.good{box-shadow:0 0 0 5px var(--ok),0 20px 40px -20px #000}
.prize.bad{box-shadow:0 0 0 5px var(--hot),0 20px 40px -20px #000}
.prize.dim{opacity:.45}
button.prize{cursor:pointer}
.bids{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.bid{padding:8px 14px;border-radius:12px;background:var(--stage-2);border:2px solid var(--pc);display:flex;flex-direction:column;align-items:center;min-width:110px}
.bid small{color:var(--muted);font-weight:700}
.bid b{font-family:var(--f-clock);font-size:1.5rem}
.bid.win{background:var(--pc)}
.bid.win small{color:#fff}
.bid.over{opacity:.5;text-decoration:line-through}
.entry{display:flex;flex-direction:column;align-items:center;gap:10px;width:min(380px,100%)}
.entry .disp{font-family:var(--f-clock);font-size:clamp(2rem,7vmin,3.2rem);background:#06050f;border:2px solid var(--line);border-radius:14px;padding:.15em .5em;min-width:7ch;text-align:center;color:var(--gold);font-variant-numeric:tabular-nums}
.entry .who{font-weight:800}
.keypad{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%}
.keypad button{padding:12px 0;border-radius:12px;background:var(--stage-3);border:1px solid var(--line);font-family:var(--f-clock);font-size:1.4rem;font-weight:700}
.keypad .go{grid-column:span 2;background:linear-gradient(180deg,var(--gold),var(--gold-deep));color:#2a1700;font-family:var(--f-body);font-size:1.05rem;font-weight:800;border:0}
.landscape .cdsplit{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,380px);gap:24px;align-items:center;width:100%;max-width:1100px}
.portrait .cdsplit{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%}
.cdsplit>div:first-child{display:flex;flex-direction:column;align-items:center;gap:12px}
.cdmsg{font-weight:800;font-size:clamp(1.1rem,3vmin,1.6rem);text-align:center;min-height:1.4em}
.cdmsg.up{color:var(--ok)}.cdmsg.down{color:var(--hot)}.cdmsg.gold{color:var(--gold)}
.bigclock{font-family:var(--f-clock);font-size:clamp(2.6rem,9vmin,4.5rem);font-weight:700;color:var(--gold)}
.bigclock.low{color:var(--hot)}
.digits{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.digits button,.digits span{width:clamp(48px,9vmin,72px);aspect-ratio:3/4;border-radius:12px;background:#fffdf6;color:#1a1636;font-family:var(--f-display);font-weight:900;font-size:clamp(2rem,7vmin,3.4rem);display:grid;place-items:center;border:0}
.digits .fixed{background:#d8cfb5}
.digits .hit{background:var(--ok)}.digits .miss{background:var(--hot);color:#fff}
.digits .cur{box-shadow:0 0 0 4px var(--gold)}
.coins{display:flex;gap:6px;justify-content:center}
.coins i{width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff3b0,var(--gold) 45%,var(--gold-deep));box-shadow:0 2px 6px rgba(0,0,0,.5)}
.coins i.gone{background:var(--stage-3);box-shadow:none}
.slots{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;width:100%;max-width:1100px}
.portrait .slots{grid-template-columns:repeat(3,minmax(0,1fr))}
.slot{min-height:130px;border-radius:16px;border:2px dashed var(--line);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:8px;background:rgba(255,255,255,.02);text-align:center;font:inherit;color:inherit}
.slot .n{font-family:var(--f-clock);color:var(--muted);font-size:.8rem}
.slot .em{font-size:2.4rem;line-height:1}
.slot .nm{font-size:.78rem;font-weight:700;line-height:1.2}
.slot .pr{font-family:var(--f-clock);font-weight:700;color:var(--gold)}
.slot.full{border-style:solid;border-color:var(--gold);background:var(--stage-2)}
.slot.lock{border-style:solid;border-color:#5aa8ff}
.slot.good{border-color:var(--ok);background:rgba(59,232,169,.12)}
.slot.bad{border-color:var(--hot);background:rgba(255,77,121,.12)}
.qty{display:flex;gap:8px;justify-content:center}
.qty button{width:56px;height:56px;border-radius:50%;background:var(--stage-3);border:1px solid var(--line);font-family:var(--f-clock);font-size:1.4rem;font-weight:700}
.total{font-family:var(--f-clock);font-size:2.4rem;font-weight:700}
.prize .pimg{width:clamp(96px,24vmin,180px);height:clamp(96px,24vmin,180px);object-fit:contain;background:#fff;border-radius:12px}
.prize.sm .pimg{width:clamp(56px,14vmin,96px);height:clamp(56px,14vmin,96px)}
.slot .pimg{width:58px;height:58px;object-fit:contain;background:#fff;border-radius:8px}
/* ---- portrait phone: everything on one screen ---- */
.portrait #cd{gap:6px;padding-top:max(8px,var(--sa-t));padding-bottom:max(8px,var(--sa-b))}
.portrait #cd .floorbar{gap:8px}
.portrait #cd .brand{font-size:1.05rem}.portrait #cd .brand small{display:none}
.portrait #cd .count{font-size:.8rem}
.portrait #cd .floorbar .btn{padding:.45em 1em;font-size:.85rem}
.portrait .cdscore{gap:5px;flex-wrap:nowrap;overflow:hidden}
.portrait .cdchip{padding:3px 9px 3px 4px;gap:5px;font-size:.78rem;min-width:0;flex:1 1 0;justify-content:center}
.portrait .cdchip .av{--s:20px;padding:1px}
.portrait .bid .av{--s:22px}
.portrait .entry .who .av{--s:34px;padding:2px}
.portrait .cdhead .av.lg{--s:56px}
.portrait .cdchip b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.portrait .cdstage{gap:7px;padding:0}
.portrait .cdhead .eyebrow{font-size:.62rem}
.portrait .cdhead h2{font-size:1.45rem}
.portrait .cdhead p{font-size:.8rem;margin-top:.25em;line-height:1.3}
.portrait .cdsplit{gap:7px}
.portrait .cdsplit>div:first-child{gap:7px;width:100%}
.portrait .prize.big{display:grid;grid-template-columns:auto minmax(0,1fr);grid-auto-rows:auto;column-gap:12px;row-gap:3px;justify-items:start;align-items:center;text-align:left;padding:8px 12px;width:100%}
.portrait .prize.big>.pimg,.portrait .prize.big>.em{grid-row:1/4}
.portrait .prize.big .pimg{width:84px;height:84px}
.portrait .prize.big .em{font-size:3.3rem}
.portrait .prize .nm{font-size:.88rem}
.portrait .prize .rt{font-size:.58rem}
.portrait .prize .pr{font-size:1.25rem}
.portrait .prize.sm{width:calc(33.3% - 6px);padding:6px 4px;gap:3px;border-radius:12px}
.portrait .prize.sm .pimg{width:52px;height:52px}
.portrait .prize.sm .em{font-size:2rem}
.portrait .prize.sm .nm{font-size:.66rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.portrait .prize.sm .rt{display:none}
.portrait .prize.sm .pr{font-size:.9rem;min-height:1em}
.portrait .cdrow{gap:6px}
.portrait .cdrow .prize:not(.sm){width:calc(33.3% - 6px);padding:8px 5px;gap:4px;border-radius:12px}
.portrait .cdrow .prize:not(.sm) .pimg{width:64px;height:64px}
.portrait .cdrow .prize:not(.sm) .em{font-size:2.4rem}
.portrait .cdrow .prize:not(.sm) .nm{font-size:.7rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.portrait .cdrow .prize:not(.sm) .rt{font-size:.5rem;padding:.2em .5em}
.portrait .cdrow .prize:not(.sm) .pr{font-size:.95rem}
.portrait .bids{gap:5px}
.portrait .bid{min-width:0;padding:3px 9px;border-radius:10px}
.portrait .bid small{font-size:.68rem}.portrait .bid b{font-size:1.05rem}
.portrait .entry{gap:6px;width:100%}
.portrait .entry .who{font-size:.9rem}
.portrait .entry .disp{font-size:1.9rem;padding:.05em .5em}
.portrait .keypad{gap:6px}
.portrait .keypad button{padding:7px 0;font-size:1.15rem;border-radius:10px}
.portrait .keypad .go{font-size:.95rem}
.portrait .cdmsg{font-size:1rem;min-height:1.2em}
.portrait .bigclock{font-size:2.2rem;line-height:1}
.portrait .digits{gap:5px}
.portrait .digits button,.portrait .digits span{width:44px;font-size:1.8rem;border-radius:9px}
.portrait .coins i{width:22px;height:22px}
.portrait .total{font-size:1.8rem}
.portrait .qty button{width:46px;height:46px;font-size:1.15rem}
.portrait .slots{gap:6px}
.portrait .slot{min-height:0;padding:5px 3px;gap:2px;border-radius:12px}
.portrait .slot .pimg{width:40px;height:40px}
.portrait .slot .em{font-size:1.6rem}
.portrait .slot .nm{font-size:.6rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.portrait .slot .n{font-size:.62rem}
.portrait .slot .pr{font-size:.75rem}
.portrait #cdStage .btn{padding:.6em 1.4em}
.portrait #cdMic{font-size:.75rem;min-height:1.1em}
.game.live .tag{margin-left:6px;font-family:var(--f-display);font-weight:900;font-size:1.5rem;background:#fffdf6;color:#14532d;padding:.15em .5em;border-radius:8px;transform:rotate(6deg);box-shadow:0 4px 10px rgba(0,0,0,.5)}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

let P=window.CD_PRODUCTS.map((x,i)=>({...x,id:i}));
let CHECKED=window.CD_CHECKED,RETAILERS=["Aldi","IKEA","Apple","car makers"];
let catLoaded=null;
function loadCatalogue(){
  if(catLoaded)return catLoaded;
  catLoaded=fetch("data/products.json",{cache:"no-store"}).then(r=>r.ok?r.json():null).then(j=>{
    if(!j||!Array.isArray(j.products))return;
    const snap=j.products.filter(x=>x&&x.n&&x.r&&x.p>=0.5&&x.p<=20000&&x.img);
    if(snap.length<30)return;
    const have=new Set(snap.map(x=>x.r));
    const base=r=>r.replace(" Special Buys","");
    const keep=window.CD_PRODUCTS.filter(x=>x.car||x.r==="Apple"||!have.has(base(x.r)));
    const imgs=j.images||{};
    keep.forEach(x=>{if(x.img)return;const k=Object.keys(imgs).sort((a,b)=>b.length-a.length).find(k=>x.n.startsWith(k)||x.n.startsWith(k.trim()+" "));if(k)x.img=imgs[k]});
    const all=snap.map(x=>({n:x.n,r:x.r,p:x.p,e:x.e||"🎁",img:x.img})).concat(keep);
    P=all.map((x,i)=>({...x,id:i}));CHECKED=j.checked||CHECKED;
    RETAILERS=[...new Set(all.filter(x=>!x.car).map(x=>base(x.r)))].concat(["car makers"]);
  }).catch(()=>{});
  return catLoaded;
}
function retailerLine(){const r=RETAILERS.slice();const last=r.pop();return `${r.join(", ")} and ${last}`}
function pic(p,cls){return p.img?`<img class="pimg ${cls||""}" src="${esc(p.img)}" data-e="${p.e}" alt="" referrerpolicy="no-referrer">`:`<span class="em">${p.e}</span>`}
document.addEventListener("error",e=>{const t=e.target;if(t&&t.classList&&t.classList.contains("pimg")){const sp=document.createElement("span");sp.className="em";sp.textContent=t.dataset.e||"🎁";t.replaceWith(sp)}},true);
const fmt=p=>"$"+(Number.isInteger(p)?p.toLocaleString("en-AU"):p.toLocaleString("en-AU",{minimumFractionDigits:2,maximumFractionDigits:2}));
const rnd=a=>a[Math.floor(Math.random()*a.length)];
const CD={players:[],round:0,used:new Set(),games:[],start:0,input:null,timer:null,count:3};

/* ---------- product picking ---------- */
function pick(filter,n=1,gap=0){
  const pool=shuffle(P.filter(p=>!CD.used.has(p.id)&&filter(p)));const out=[];
  for(const p of pool){if(out.length>=n)break;if(gap&&out.some(o=>Math.abs(o.p-p.p)/Math.max(o.p,p.p)<gap))continue;out.push(p)}
  if(out.length<n){for(const p of shuffle(P.filter(filter))){if(out.length>=n)break;if(out.includes(p))continue;if(gap&&out.some(o=>Math.abs(o.p-p.p)/Math.max(o.p,p.p)<gap))continue;out.push(p)}}
  out.forEach(p=>CD.used.add(p.id));return n===1?out[0]:out;
}
const SUPER=new Set(["Woolworths","Coles","Aldi","IGA"]);
const grocery=p=>!p.car&&p.p<20&&SUPER.has(p.r);
const mid=p=>!p.car&&p.p>=20&&p.p<=900;
const big=p=>!p.car&&p.p>=100;

/* ---------- screen + hub ---------- */
const hub=document.querySelector(".games");
const blitz=[...hub.children].find(c=>c.textContent.includes("Picture Blitz"));
const tile=document.createElement("button");tile.className="game live";tile.id="playCD";
tile.innerHTML=`<span class="art"><span class="tag">$1</span><span class="pill">Play</span></span><h2>The Price Is Right</h2><p>Bid on real Aussie prices. Win the Showcase.</p>`;
if(blitz)hub.replaceChild(tile,blitz);else hub.appendChild(tile);
const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="cdSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="cd";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>THE PRICE IS RIGHT</small></span><span class="spacer"></span><span class="count" id="cdRound"></span><button class="btn ghost" id="cdQuit">Quit</button></div>
<div class="cdscore" id="cdScore"></div><div class="cdstage" id="cdStage"></div><div class="mic" id="cdMic"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("cdQuit").onclick=()=>confirmSheet("Quit this game?","Everyone's winnings will be lost.","Quit",()=>{closeOverlay();endGame();show("hub")});

function openSetup(){
  S.count=CD.count;ensureSlots();
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="cdBack">← Back</button><h2>The Price Is Right · Set up</h2><button class="btn gold" id="cdStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">Contestants</span><div class="stepper"><button id="cdMinus" aria-label="Fewer players">−</button><output id="cdCount">${CD.count}</output><button id="cdPlus" aria-label="More players">+</button></div></div>
    <div class="field"><span class="eyebrow">Aussie TV show rules</span><ul class="rules">
      <li><b>3 rounds.</b> Everyone bids on a prize. Closest <b>without going over</b> wins it. Bid the exact price for a <b>$100 bonus</b>.</li>
      <li>The winner plays a <b>pricing game</b> for more prizes.</li>
      <li>The two biggest winners play the <b>Showcase Showdown</b>: take turns bidding, first within <b>$100</b> wins.</li>
      <li>The <b>Showcase</b>: put the prizes in price order in <b>40 seconds</b>. The car is locked in last. Get them all in order to win everything.</li></ul>
      <p class="note" id="cdSrcNote">Real prices from ${esc(retailerLine())}, checked ${esc(CHECKED)}.</p></div>
    <div class="field"><span class="eyebrow">Voice bids</span><div class="seg" id="cdVoiceSeg"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="cdSoundSeg"></div></div>
    <div class="field"><span class="eyebrow">Screen</span><div class="seg" id="cdScreenSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Contestants and colours</span><div class="hlsetup" id="cdPlayers"></div></div></div>`;
  seg($("cdVoiceSeg"),[true,false],()=>S.prefs.voice,v=>S.prefs.voice=v,onOff);
  seg($("cdSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  screenSeg($("cdScreenSeg"));
  $("cdBack").onclick=()=>show("hub");
  $("cdStart").onclick=()=>{ac();startGame()};
  $("cdMinus").onclick=()=>{CD.count=Math.max(2,CD.count-1);openSetup()};
  $("cdPlus").onclick=()=>{CD.count=Math.min(4,CD.count+1);openSetup()};
  $("cdMinus").disabled=CD.count<=2;$("cdPlus").disabled=CD.count>=4;
  renderPlayers();show("cdSetup");
  loadCatalogue().then(()=>{const n=$("cdSrcNote");if(n)n.textContent=`Real prices and photos from ${retailerLine()}, checked ${CHECKED}.`});
}
function renderPlayers(){
  const w=$("cdPlayers");w.innerHTML="";
  for(let i=0;i<CD.count;i++){
    const row=document.createElement("div");row.className="prow";
    row.innerHTML=`<button class="swatchbtn" id="pk${i}" aria-label="Contestant ${i+1} look">${avatarHTML({name:S.names[i]||"P",color:S.colors[i],slot:i})}</button><input id="cdn${i}" maxlength="14" placeholder="Player ${i+1}" value="${esc(S.names[i]||"")}" aria-label="Contestant ${i+1} name"><span class="note">Contestant ${i+1}</span>`;
    row.querySelector("input").oninput=e=>{S.names[i]=e.target.value;save()};
    row.querySelector(".swatchbtn").onclick=()=>{S.count=CD.count;pickColour(i,renderPlayers)};
    w.appendChild(row);
  }
}

/* ---------- game flow ---------- */
const GAMES=["double","most","hilo","clock","squeeze","grocery","lucky"];
const GAME_NAMES={double:"Double Prices",most:"Most Expensive",hilo:"Hi-Lo",clock:"Clock Game",squeeze:"Squeeze Play",grocery:"Grocery Game",lucky:"Lucky $even"};
async function startGame(){
  await loadCatalogue();
  S.count=CD.count;ensureSlots();save();
  CD.players=[];for(let i=0;i<CD.count;i++)CD.players.push({name:(S.names[i]||"").trim()||`Player ${i+1}`,color:S.colors[i],win:0,prizes:[],slot:i});
  CD.round=0;CD.used=new Set();CD.games=shuffle(GAMES).slice(0,3);
  if(!CD.games.includes("lucky")&&Math.random()<.5)CD.games[2]="lucky";
  show("cd");score();$("cdStage").innerHTML="";
  introContestants(CD.players,"The Price Is Right",()=>{voiceStart(onVoice,$("cdMic"));if(!S.prefs.voice)$("cdMic").innerHTML="";nextRound()});
}
function endGame(){clearInterval(CD.timer);CD.input=null;voiceStop();stopConfetti()}
function score(active){
  $("cdScore").innerHTML=CD.players.map((p,i)=>`<div class="cdchip${active===i?" on":""}" style="--pc:${p.color}">${avatarHTML(p,"sm")}<b>${esc(p.name)}</b><span>${fmt(Math.round(p.win*100)/100)}</span></div>`).join("");
}
function stage(html){$("cdStage").innerHTML=html;$("cdStage").scrollTop=0;
  setTimeout(()=>{const f=$("cdStage").querySelector("[data-focus]")||$("cdStage").querySelector(".keypad .go,.btn.gold,button:not([disabled])");f&&f.focus({preventScroll:true})},40)}
function award(i,p,label){CD.players[i].win+=p.p;CD.players[i].prizes.push(label||p.n);score()}
function nextRound(){
  CD.round++;
  if(CD.round>3)return showdownIntro();
  $("cdRound").textContent=`Round ${CD.round} of 3`;
  bidRound(pick(mid));
}
function prizeCard(p,{cls="",show=false,btn=false,attrs=""}={}){
  const tag=btn?"button":"div";
  return `<${tag} class="prize ${cls}" ${attrs}>${pic(p)}<span class="nm">${esc(p.n)}</span><span class="rt">${esc(p.r)}</span><span class="pr${show?"":" hid"}">${show?fmt(p.p):"&nbsp;"}</span></${tag}>`;
}

/* ---------- number entry (keypad / keyboard / voice) ---------- */
function entryHTML(label){return `<div class="entry"><div class="who" id="enWho">${label||""}</div><div class="disp" id="enDisp">$0</div>
  <div class="keypad">${[1,2,3,"⌫",4,5,6,".",7,8,9,0].map(k=>`<button data-k="${k}">${k}</button>`).join("")}<button class="go" data-k="go" data-focus>Lock in</button><button data-k="c" style="grid-column:span 2">Clear</button></div></div>`}
function bindEntry(onSubmit,{dollarsOnly=false}={}){
  CD.input={val:"",submit:onSubmit,dollarsOnly};
  const show=()=>{$("enDisp").textContent="$"+(CD.input.val||"0")};
  CD.input.show=show;
  $("cdStage").querySelectorAll(".keypad button").forEach(b=>b.onclick=()=>key(String(b.dataset.k)));
  show();
}
function key(k){
  const I=CD.input;if(!I)return;
  if(k==="go"){const v=parseFloat(I.val);if(!v&&v!==0||I.val==="")return;I.submit(Math.round(v*100)/100);return}
  if(k==="⌫")I.val=I.val.slice(0,-1);
  else if(k==="c")I.val="";
  else if(k==="."){if(I.dollarsOnly||I.val.includes("."))return;I.val=(I.val||"0")+"."}
  else{if(I.val.includes(".")&&I.val.split(".")[1].length>=2)return;if(I.val.replace(".","").length>=7)return;I.val=(I.val==="0"?"":I.val)+k}
  I.show();
}
document.addEventListener("keydown",e=>{
  if($("cd").hidden||!$("overlay").hidden||!CD.input)return;
  if(/^[0-9]$/.test(e.key)){key(e.key);e.preventDefault()}
  else if(e.key==="."){key(".");e.preventDefault()}
  else if(e.key==="Backspace"){key("⌫");e.preventDefault()}
  else if(e.key==="Enter"&&document.activeElement&&!document.activeElement.closest(".keypad")){key("go");e.preventDefault()}
});
function spokenAmount(t){
  t=String(t).replace(/(\d),(?=\d{3})/g,"$1");const raw=t;
  const dec=raw.match(/\d+\.\d{1,2}/g);if(dec)return parseFloat(dec[dec.length-1]);
  const w=words(t);
  // "four dollars seventy nine" / "four seventy nine" handled through number words
  const nums=[];w.forEach((x,i)=>{if(/^\d+(\.\d+)?$/.test(x))nums.push({v:parseFloat(x),i})});
  const di=w.findIndex(x=>x==="dollar");
  if(di>0&&nums.length>=2){const a=nums.find(n=>n.i<di),b=nums.find(n=>n.i>di);if(a&&b&&b.v<100)return a.v+b.v/100}
  if(nums.length)return nums[nums.length-1].v;
  return null;
}
function onVoice(texts,isFinal){
  if(!CD.input)return;
  const v=spokenAmount(texts[0]);if(v==null)return;
  CD.input.val=String(CD.input.dollarsOnly?Math.round(v):v);CD.input.show();
  if(isFinal){voiceMark();key("go")}
}

/* ---------- bidding round ---------- */
function bidRound(p,rebidUnder){
  const n=CD.players.length,order=[];const s=(CD.round-1)%n;for(let k=0;k<n;k++)order.push((s+k)%n);
  const bids={};let idx=0;
  const draw=(msg,cls)=>{
    score(order[idx]);
    const pl=CD.players[order[idx]];
    stage(`<div class="cdhead"><span class="eyebrow">Round ${CD.round} · Up for bids</span><h2>Come on down!</h2><p>${rebidUnder?`Everyone went over. Bid again, under ${fmt(rebidUnder)}.`:"Closest to the price without going over wins it."}</p></div>
      <div class="cdsplit"><div>${prizeCard(p,{cls:"big"})}<div class="bids">${order.filter(i=>bids[i]!=null).map(i=>`<div class="bid" style="--pc:${CD.players[i].color}">${avatarHTML(CD.players[i],"sm")}<small>${esc(CD.players[i].name)}</small><b>${fmt(bids[i])}</b></div>`).join("")}</div><div class="cdmsg ${cls||""}">${msg||""}</div></div>
      ${entryHTML(`${avatarHTML(pl,"md")} <span style="color:${pl.color}">${esc(pl.name)}</span>, what's your bid?`)}</div>`);
    bindEntry(v=>{
      if(v<=0)return draw("Bids must be more than $0.","down");
      if(Object.values(bids).includes(v))return draw(`Someone already bid ${fmt(v)}. Pick a different amount.`,"down");
      bids[order[idx]]=v;SFX.beep();idx++;
      if(idx<n)draw();else reveal();
    });
  };
  const reveal=()=>{
    CD.input=null;
    const under=order.filter(i=>bids[i]<=p.p);
    if(!under.length){SFX.buzz();
      stage(`<div class="cdhead"><span class="eyebrow">Actual retail price</span><h2>${fmt(p.p)}</h2><p>Everyone went over!</p></div>${prizeCard(p,{cls:"big",show:true})}<button class="btn gold" id="cdRebid">Bid again</button>`);
      const low=Math.min(...Object.values(bids));
      $("cdRebid").onclick=()=>bidRound(p,low);return;
    }
    const w=under.reduce((a,b)=>bids[b]>bids[a]?b:a);
    const exact=bids[w]===p.p;
    award(w,p);if(exact)CD.players[w].win+=100;
    SFX.win();score(w);
    stage(`<div class="cdhead"><span class="eyebrow">Actual retail price</span><h2>${fmt(p.p)}</h2><p>${avatarHTML(CD.players[w],"md")}<br>${esc(CD.players[w].name)} wins the ${esc(p.n)}!${exact?" Bang on the price: <b style=\"color:var(--gold)\">$100 bonus</b>.":""}</p></div>
      ${prizeCard(p,{cls:"big good",show:true})}
      <div class="bids">${order.map(i=>`<div class="bid${i===w?" win":""}${bids[i]>p.p?" over":""}" style="--pc:${CD.players[i].color}">${avatarHTML(CD.players[i],"sm")}<small>${esc(CD.players[i].name)}</small><b>${fmt(bids[i])}</b></div>`).join("")}</div>
      <button class="btn gold" id="cdPlay">Play ${GAME_NAMES[CD.games[CD.round-1]]}</button>`);
    $("cdPlay").onclick=()=>playGame(CD.games[CD.round-1],w);
  };
  draw();
}

/* ---------- pricing games ---------- */
function gameDone(i,won,prizes,msg){
  CD.input=null;clearInterval(CD.timer);
  if(won){prizes.forEach(p=>award(i,p));SFX.win()}else SFX.buzz();
  score(i);
  const box=$("cdStage").querySelector(".cdgameend");
  const html=`<div class="cdmsg ${won?"up":"down"}">${msg}</div><button class="btn gold" id="cdNext">${CD.round<3?"Next round":"Showcase Showdown"}</button>`;
  if(box)box.innerHTML=html;else $("cdStage").insertAdjacentHTML("beforeend",html);
  $("cdNext").onclick=nextRound;setTimeout(()=>{const n=$("cdNext");n&&n.focus({preventScroll:true})},40);
}
function gameHead(g,i,sub){return `<div class="cdhead"><span class="eyebrow">${avatarHTML(CD.players[i],"sm")} ${esc(CD.players[i].name)} plays</span><h2>${GAME_NAMES[g]}</h2><p>${sub}</p></div>`}
function fakePrice(p){
  for(let k=0;k<20;k++){const r=Math.random()<.5?.55+Math.random()*.25:1.25+Math.random()*.45;let v=p*r;
    v=p<100?Math.round(v)-0.01:(Number.isInteger(p)?Math.round(v/10)*10-1:Math.round(v)-0.01);
    if(v>0&&Math.abs(v-p)>p*.1)return Math.round(v*100)/100}
  return Math.round(p*1.4)}
function playGame(g,i){
  score(i);
  ({double:gDouble,most:gMost,hilo:gHilo,clock:gClock,squeeze:gSqueeze,grocery:gGrocery,lucky:gLucky})[g](i);
}
function gDouble(i){
  const p=pick(x=>!x.car&&x.p>=60);const opts=shuffle([p.p,fakePrice(p.p)]);
  stage(`${gameHead("double",i,"Two prices. Pick the right one to win the prize.")}${prizeCard(p,{cls:"big"})}
    <div class="row">${opts.map(o=>`<button class="btn" data-v="${o}" style="font-family:var(--f-clock);font-size:1.6rem">${fmt(o)}</button>`).join("")}</div><div class="cdgameend"></div>`);
  $("cdStage").querySelectorAll("[data-v]").forEach(b=>b.onclick=()=>{
    const v=+b.dataset.v;$("cdStage").querySelectorAll("[data-v]").forEach(x=>{x.disabled=true;if(+x.dataset.v===p.p)x.classList.add("gold")});
    const pr=$("cdStage").querySelector(".prize .pr");pr.classList.remove("hid");pr.textContent=fmt(p.p);
    gameDone(i,v===p.p,[p],v===p.p?`Correct! ${esc(CD.players[i].name)} wins the ${esc(p.n)}.`:`Not this time. It was ${fmt(p.p)}.`);
  });
}
function gMost(i){
  const ps=pick(x=>!x.car&&x.p>=40,3,.12);const top=ps.reduce((a,b)=>b.p>a.p?b:a);
  stage(`${gameHead("most",i,"Pick the most expensive prize and it's yours.")}<div class="cdrow">${ps.map(p=>prizeCard(p,{btn:true,attrs:`data-id="${p.id}"`})).join("")}</div><div class="cdgameend"></div>`);
  $("cdStage").querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>{
    const id=+b.dataset.id;
    $("cdStage").querySelectorAll("[data-id]").forEach(x=>{x.disabled=true;const p=P[+x.dataset.id];const pr=x.querySelector(".pr");pr.classList.remove("hid");pr.textContent=fmt(p.p);x.classList.add(p===top?"good":(+x.dataset.id===id?"bad":"dim"))});
    gameDone(i,id===top.id,[top],id===top.id?`Right! The ${esc(top.n)} is the most expensive.`:`The ${esc(top.n)} was the most expensive.`);
  });
}
function gHilo(i){
  const items=pick(grocery,6,.08);const prize=pick(x=>mid(x)&&x.p>=40);
  const top3=items.slice().sort((a,b)=>b.p-a.p).slice(0,3).map(x=>x.id);
  const chosen=new Set();
  const draw=()=>{stage(`${gameHead("hilo",i,`Pick the 3 most expensive groceries to win the ${esc(prize.n)} (${fmt(prize.p)}).`)}
    <div class="cdrow">${items.map(p=>prizeCard(p,{cls:"sm"+(chosen.has(p.id)?" sel":""),btn:true,attrs:`data-id="${p.id}"`})).join("")}</div>
    <button class="btn gold" id="hiloGo" ${chosen.size===3?"":"disabled"}>Lock in ${chosen.size}/3</button><div class="cdgameend"></div>`);
    $("cdStage").querySelectorAll("[data-id]").forEach(b=>b.onclick=()=>{const id=+b.dataset.id;if(chosen.has(id))chosen.delete(id);else if(chosen.size<3)chosen.add(id);draw();setTimeout(()=>{const el=$("cdStage").querySelector(`[data-id="${id}"]`);el&&el.focus()},50)});
    $("hiloGo").onclick=()=>{
      $("cdStage").querySelectorAll("[data-id]").forEach(x=>{x.disabled=true;const p=P[+x.dataset.id];const pr=x.querySelector(".pr");pr.classList.remove("hid");pr.textContent=fmt(p.p);
        x.classList.remove("sel");x.classList.add(top3.includes(p.id)?"good":(chosen.has(p.id)?"bad":"dim"))});
      $("hiloGo").remove();
      const won=top3.every(id=>chosen.has(id));
      gameDone(i,won,[prize],won?`All three right! ${esc(CD.players[i].name)} wins the ${esc(prize.n)}.`:"Not quite. The green ones were the three most expensive.");
    };
  };draw();
}
function gClock(i){
  const p=pick(x=>!x.car&&x.p>=20&&x.p<1000);const target=Math.round(p.p);let left=30,msg="",cls="";
  const draw=()=>{stage(`${gameHead("clock",i,"Guess the price to the dollar in 30 seconds. We'll say higher or lower.")}
    <div class="cdsplit"><div>${prizeCard(p,{cls:"big"})}<div class="bigclock" id="clk">${left}</div><div class="cdmsg ${cls}" id="clkMsg">${msg}</div></div>${entryHTML("Your guess (whole dollars)")}</div><div class="cdgameend"></div>`);
    bindEntry(v=>{
      v=Math.round(v);
      if(v===target){clearInterval(CD.timer);const pr=$("cdStage").querySelector(".prize .pr");pr.classList.remove("hid");pr.textContent=fmt(p.p);
        $("cdStage").querySelector(".entry").remove();return gameDone(i,true,[p],`${fmt(v)}! Got it with ${left} seconds left.`)}
      msg=`${fmt(v)}? ${v<target?"Higher!":"Lower!"}`;cls=v<target?"up":"down";SFX.tick();
      CD.input.val="";CD.input.show();$("clkMsg").textContent=msg;$("clkMsg").className="cdmsg "+cls;
    },{dollarsOnly:true});
  };
  draw();
  CD.timer=setInterval(()=>{left--;const c=$("clk");if(c){c.textContent=left;c.classList.toggle("low",left<=10)}if(left<=5&&left>0)SFX.low();
    if(left<=0){clearInterval(CD.timer);const e=$("cdStage").querySelector(".entry");e&&e.remove();const pr=$("cdStage").querySelector(".prize .pr");pr.classList.remove("hid");pr.textContent=fmt(p.p);
      gameDone(i,false,[p],`Time's up! It was ${fmt(target)}.`)}},1000);
}
function gSqueeze(i){
  const p=pick(x=>!x.car&&x.p>=100);const price=Math.round(p.p);const ds=String(price).split("");
  const pos=1+Math.floor(Math.random()*(ds.length-1));let extra;do{extra=String(Math.floor(Math.random()*10))}while(extra===ds[pos-1]&&extra===ds[pos]);
  const shown=ds.slice(0,pos).concat([extra],ds.slice(pos));
  stage(`${gameHead("squeeze",i,`The price (to the dollar) has one extra digit squeezed in. Remove it to win the ${esc(p.n)}. The first and last digits stay.`)}
    ${prizeCard(p,{cls:"big"})}<div class="digits">${shown.map((d,k)=>k===0||k===shown.length-1?`<span class="fixed">${d}</span>`:`<button data-k="${k}">${d}</button>`).join("")}</div><div class="cdgameend"></div>`);
  $("cdStage").querySelectorAll(".digits button").forEach(b=>b.onclick=()=>{
    const k=+b.dataset.k;const res=+shown.filter((_,j)=>j!==k).join("");
    $("cdStage").querySelectorAll(".digits button").forEach(x=>x.disabled=true);b.classList.add(res===price?"hit":"miss");
    const pr=$("cdStage").querySelector(".prize .pr");pr.classList.remove("hid");pr.textContent=fmt(p.p);
    gameDone(i,res===price,[p],res===price?`${fmt(price)}. Spot on!`:`That makes ${fmt(res)}, but it was ${fmt(price)}.`);
  });
}
function gGrocery(i){
  const items=pick(x=>grocery(x)&&x.p>=1.5,5,.05);const prize=pick(x=>mid(x)&&x.p>=50);let total=0;const used=new Set();
  const draw=(sel,msg)=>{stage(`${gameHead("grocery",i,`Buy groceries until the total lands between $20 and $22 to win the ${esc(prize.n)} (${fmt(prize.p)}). Go over $22 and you lose.`)}
    <div class="total" id="gTot">${fmt(Math.round(total*100)/100)}</div>
    <div class="cdrow">${items.map(p=>prizeCard(p,{cls:"sm"+(sel===p.id?" sel":"")+(used.has(p.id)?" dim":""),show:used.has(p.id),btn:!used.has(p.id),attrs:`data-id="${p.id}"`})).join("")}</div>
    ${sel!=null?`<p class="note">How many ${esc(P[sel].n)}?</p><div class="qty">${[1,2,3,4,5].map(q=>`<button data-q="${q}">${q}</button>`).join("")}</div>`:`<div class="cdmsg">${msg||"Pick a grocery item."}</div>`}<div class="cdgameend"></div>`);
    $("cdStage").querySelectorAll("button[data-id]").forEach(b=>b.onclick=()=>draw(+b.dataset.id));
    $("cdStage").querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{
      const q=+b.dataset.q,p=P[sel];used.add(p.id);total=Math.round((total+p.p*q)*100)/100;SFX.tick();
      const line=`${q} × ${esc(p.n)} at ${fmt(p.p)} = ${fmt(Math.round(p.p*q*100)/100)}`;
      if(total>22){draw(null,line);$("cdStage").querySelectorAll("button[data-id]").forEach(x=>x.disabled=true);return gameDone(i,false,[prize],`${fmt(total)}. Over $22!`)}
      if(total>=20){draw(null,line);$("cdStage").querySelectorAll("button[data-id]").forEach(x=>x.disabled=true);return gameDone(i,true,[prize],`${fmt(total)}. In the zone! ${esc(CD.players[i].name)} wins the ${esc(prize.n)}.`)}
      if(used.size===items.length){draw(null,line);return gameDone(i,false,[prize],`Out of groceries at ${fmt(total)}. Short of $20.`)}
      draw(null,line);
    });
  };draw(null);
}
function gLucky(i){
  const car=pick(x=>x.car);const ds=String(Math.round(car.p)).split("");let bank=7,k=1;const guesses=[ds[0]];
  const draw=(msg)=>{stage(`${gameHead("lucky",i,`You have $7. Guess each digit of the car's price. Each guess costs the difference. Have money left at the end to win the car!`)}
    ${prizeCard(car,{cls:"big"})}<div class="coins">${Array.from({length:7},(_,j)=>`<i class="${j<bank?"":"gone"}"></i>`).join("")}</div>
    <div class="digits">${ds.map((d,j)=>j<k?`<span class="${j===0?"fixed":(guesses[j]===d?"hit":"miss")}">${d}</span>`:`<span class="${j===k?"cur":""}">?</span>`).join("")}</div>
    <div class="cdmsg" id="lkMsg">${msg||`Digit ${k+1}: pick 0 to 9`}</div>
    ${k<ds.length&&bank>0?`<div class="digits">${[0,1,2,3,4,5,6,7,8,9].map(n=>`<button data-n="${n}" style="width:clamp(40px,7vmin,56px)">${n}</button>`).join("")}</div>`:""}<div class="cdgameend"></div>`);
    CD.input={val:"",dollarsOnly:true,show(){},submit:v=>{if(v>=0&&v<=9)guess(Math.round(v))}};
    $("cdStage").querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>guess(+b.dataset.n));
  };
  const guess=n=>{
    const d=+ds[k];const cost=Math.abs(n-d);bank-=cost;guesses[k]=String(n);k++;
    const msg=cost?`You said ${n}, it's ${d}. That costs $${cost}.`:`${d}! Spot on, no cost.`;
    if(bank<=0){bank=Math.max(0,bank);k=ds.length;draw(msg);CD.input=null;const pr=$("cdStage").querySelector(".prize .pr");pr.classList.remove("hid");pr.textContent=fmt(car.p);return gameDone(i,false,[car],"Out of money. So close to a new car!")}
    if(k>=ds.length){draw(msg);CD.input=null;const pr=$("cdStage").querySelector(".prize .pr");pr.classList.remove("hid");pr.textContent=fmt(car.p);SFX.boost();return gameDone(i,true,[car],`$${bank} left. ${esc(CD.players[i].name)} WINS THE CAR!`)}
    cost?SFX.pass():SFX.ok();draw(msg);
  };
  draw();
}

/* ---------- Showcase Showdown ---------- */
function showdownIntro(){
  $("cdRound").textContent="Showcase Showdown";
  const ranked=CD.players.map((p,i)=>i).sort((a,b)=>CD.players[b].win-CD.players[a].win);
  const top=CD.players[ranked[0]].win,second=CD.players[ranked[1]].win;
  // ties for a showdown spot are settled with one bid on a current item, like the 2012 series
  const tiedFor2=ranked.filter(i=>CD.players[i].win===second);
  if(CD.players.length>2&&tiedFor2.length>1&&(ranked.slice(0,2).some(i=>tiedFor2.includes(i)))){
    const sure=ranked.filter(i=>CD.players[i].win>second);const need=2-sure.length;
    return tiebreak(tiedFor2,need,won=>showdown(sure.concat(won)));
  }
  showdown(ranked.slice(0,2));
}
function tiebreak(ids,need,done){
  const p=pick(mid);const bids={};let idx=0;
  const draw=(msg)=>{score(ids[idx]);const pl=CD.players[ids[idx]];
    stage(`<div class="cdhead"><span class="eyebrow">Tiebreak · one bid</span><h2>Who goes through?</h2><p>${ids.map(i=>esc(CD.players[i].name)).join(", ")} are tied. Closest without going over goes through.</p></div>
    <div class="cdsplit"><div>${prizeCard(p,{cls:"big"})}<div class="cdmsg down">${msg||""}</div></div>${entryHTML(`${avatarHTML(pl,"md")} <span style="color:${pl.color}">${esc(pl.name)}</span>, your bid`)}</div>`);
    bindEntry(v=>{if(Object.values(bids).includes(v))return draw("That bid's taken.");bids[ids[idx]]=v;idx++;if(idx<ids.length)draw();else finish()});
  };
  const finish=()=>{CD.input=null;
    const sorted=ids.slice().sort((a,b)=>{const oa=bids[a]>p.p,ob=bids[b]>p.p;if(oa!==ob)return oa?1:-1;return oa?bids[a]-bids[b]:bids[b]-bids[a]});
    const won=sorted.slice(0,need);
    stage(`<div class="cdhead"><span class="eyebrow">Actual retail price</span><h2>${fmt(p.p)}</h2><p>${won.map(i=>esc(CD.players[i].name)).join(" and ")} go${won.length>1?"":"es"} through.</p></div>${prizeCard(p,{cls:"big",show:true})}<button class="btn gold" id="tbGo">Showcase Showdown</button>`);
    $("tbGo").onclick=()=>done(won);
  };
  draw();
}
function showdown(two){
  two.sort((a,b)=>CD.players[b].win-CD.players[a].win);
  const p=pick(x=>!x.car&&x.p>=300);let turn=0;const hist=[];
  const draw=(msg,cls)=>{const i=two[turn];score(i);const pl=CD.players[i];
    stage(`<div class="cdhead"><span class="eyebrow">Showcase Showdown</span><h2>${esc(CD.players[two[0]].name)} vs ${esc(CD.players[two[1]].name)}</h2><p>Take turns bidding. First bid within $100 of the price goes to the Showcase.</p></div>
    <div class="cdsplit"><div>${prizeCard(p,{cls:"big"})}<div class="bids">${hist.slice(-6).map(h=>`<div class="bid" style="--pc:${CD.players[h.i].color}">${avatarHTML(CD.players[h.i],"sm")}<small>${esc(CD.players[h.i].name)} · ${h.hint}</small><b>${fmt(h.v)}</b></div>`).join("")}</div><div class="cdmsg ${cls||""}">${msg||""}</div></div>
    ${entryHTML(`${avatarHTML(pl,"md")} <span style="color:${pl.color}">${esc(pl.name)}</span>, your bid`)}</div>`);
    bindEntry(v=>{
      if(Math.abs(v-p.p)<=100){CD.input=null;SFX.win();
        stage(`<div class="cdhead">${avatarHTML(pl,"lg")}<br><span class="eyebrow">Actual retail price ${fmt(p.p)}</span><h2 style="color:${pl.color}">${esc(pl.name)} is going to the Showcase!</h2><p>${fmt(v)} is within $100.</p></div>${prizeCard(p,{cls:"big good",show:true})}<button class="btn gold" id="scGo">Play the Showcase</button>`);
        $("scGo").onclick=()=>showcase(i);return}
      const hint=v<p.p?"Higher":"Lower";hist.push({i,v,hint});SFX.tick();turn=1-turn;
      draw(`${fmt(v)}? ${hint}!`,v<p.p?"up":"down");
    });
  };
  draw();
}

/* ---------- Showcase ---------- */
function showcase(i){
  $("cdRound").textContent="The Showcase";score(i);
  const car=pick(x=>x.car);const items=pick(x=>!x.car&&x.p>=100&&x.p<car.p,5,.1);
  const slots=[null,null,null,null,null];let left=40,done=false;
  const draw=()=>{
    stage(`<div class="cdhead"><span class="eyebrow">${avatarHTML(CD.players[i],"sm")} ${esc(CD.players[i].name)}'s Showcase</span><h2>Put them in price order</h2><p>Cheapest first. The car is locked in last. Tap a prize to place it, tap a slot to take it back.</p></div>
    <div class="bigclock${left<=10?" low":""}" id="scClk">${left}</div>
    <div class="slots">${slots.map((id,k)=>`<button class="slot${id!=null?" full":""}" data-s="${k}"><span class="n">${k+1}</span>${id!=null?`${pic(P[id])}<span class="nm">${esc(P[id].n)}</span>`:"<span class=\"nm\">Empty</span>"}</button>`).join("")}
      <div class="slot lock"><span class="n">6 · locked</span>${pic(car)}<span class="nm">${esc(car.n)}</span></div></div>
    <div class="cdrow">${items.filter(p=>!slots.includes(p.id)).map(p=>prizeCard(p,{cls:"sm",btn:true,attrs:`data-id="${p.id}"`})).join("")}</div>
    ${slots.every(s=>s!=null)?`<button class="btn gold" id="scLock" data-focus>Lock it in</button>`:""}`);
    $("cdStage").querySelectorAll("button[data-id]").forEach(b=>b.onclick=()=>{const k=slots.indexOf(null);if(k<0)return;slots[k]=+b.dataset.id;SFX.tick();draw()});
    $("cdStage").querySelectorAll("button[data-s]").forEach(b=>b.onclick=()=>{const k=+b.dataset.s;if(slots[k]==null)return;slots[k]=null;draw()});
    if($("scLock"))$("scLock").onclick=lock;
  };
  const lock=()=>{if(done)return;done=true;clearInterval(CD.timer);
    // anything not placed is locked in automatically, in the order shown
    items.filter(p=>!slots.includes(p.id)).forEach(p=>{slots[slots.indexOf(null)]=p.id});
    reveal(0);
  };
  const order=()=>slots.map(id=>P[id]).concat([car]);
  const reveal=(k)=>{
    const seq=order();
    stage(`<div class="cdhead"><span class="eyebrow">${esc(CD.players[i].name)}'s Showcase</span><h2>The reveal</h2></div>
    <div class="slots">${seq.map((p,j)=>{const shown=j<k;let cls="slot full";if(shown)cls+=(j===0||seq[j-1].p<=p.p)?" good":" bad";
      return `<div class="${cls}"><span class="n">${j+1}</span>${pic(p)}<span class="nm">${esc(p.n)}</span><span class="pr">${shown?fmt(p.p):"?"}</span></div>`}).join("")}</div>
    <div class="cdmsg" id="scMsg"></div>`);
    if(k>0&&k<=seq.length&&k>1&&seq[k-1].p<seq[k-2].p){SFX.buzz();
      $("scMsg").className="cdmsg down";$("scMsg").textContent=`The ${seq[k-1].n} is cheaper than the ${seq[k-2].n}. The Showcase is lost.`;return finale(i,false,seq)}
    if(k>0)SFX.ok();
    if(k>=seq.length){const tot=seq.reduce((s,p)=>s+p.p,0);CD.players[i].win+=tot;seq.forEach(p=>CD.players[i].prizes.push(p.n));score(i);SFX.win();setTimeout(SFX.win,500);
      $("scMsg").className="cdmsg gold";$("scMsg").textContent=`ALL IN ORDER! ${CD.players[i].name} wins the whole Showcase, worth ${fmt(Math.round(tot*100)/100)}!`;
      confetti([CD.players[i].color,"#ffc94a","#fffdf6","#3be8a9"]);return finale(i,true,seq)}
    setTimeout(()=>reveal(k+1),k===0?600:1300);
  };
  draw();
  CD.timer=setInterval(()=>{left--;const c=$("scClk");if(c){c.textContent=left;c.classList.toggle("low",left<=10)}if(left<=5&&left>0)SFX.low();if(left<=0)lock()},1000);
}
function finale(i,won,seq){
  CD.input=null;
  const btn=document.createElement("button");btn.className="btn gold";btn.textContent="Final results";btn.onclick=results;
  $("cdStage").appendChild(btn);setTimeout(()=>btn.focus({preventScroll:true}),40);
}
function results(){
  voiceStop();stopConfetti();
  const ranked=CD.players.slice().sort((a,b)=>b.win-a.win);
  openOverlay(`${avatarHTML(ranked[0],"xl")}<span class="eyebrow">Tonight's winnings</span><h2 style="color:${ranked[0].color}">${esc(ranked[0].name)} wins!</h2>
    <div class="catpick">${ranked.map(p=>`<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:10px 16px;border-radius:14px;background:var(--stage-3);border-left:6px solid ${p.color}"><span style="display:flex;align-items:center;gap:10px">${avatarHTML(p,"sm")}<b>${esc(p.name)}</b></span><span style="font-family:var(--f-clock);color:var(--gold)">${fmt(Math.round(p.win*100)/100)}</span></div>`).join("")}</div>
    <p class="note">Prices from ${esc(retailerLine())}, checked ${esc(CHECKED)}.</p>
    <div class="row"><button class="btn" id="cdMenu">Game Night menu</button><button class="btn gold" id="cdAgain">Play again</button></div>`);
  $("cdMenu").onclick=()=>{closeOverlay();endGame();show("hub")};
  $("cdAgain").onclick=()=>{closeOverlay();endGame();startGame()};
}
window.__CD={CD,P,spokenAmount,fakePrice};
})();
