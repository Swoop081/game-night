/* =================== NAME TEN ===================
   A category appears ("Name 10 AFL clubs"), the player has a clock to name as many as they can (up to 10).
   Answers come by voice or by typing, so it works on the TV and on a single phone passed around. */
(function(){
const GROUPS=["Aussie","General","Sport","Entertainment","Food & drink","Geography"];
const GROUP_ICON={"Aussie":"🇦🇺","General":"💡","Sport":"🏅","Entertainment":"🎬","Food & drink":"🍕","Geography":"🌏"};
const IS_TV=/GameNightTV/.test(navigator.userAgent);

const PROMPTS=(window.NT_RAW||[]).map(line=>{
  const [title,group,list]=line.split("|");
  return {title,group,items:(list||"").split(";").map(s=>{const alts=s.split("~").map(x=>x.trim()).filter(Boolean);return {name:alts[0],alts}}).filter(i=>i.name)};
}).filter(p=>p.title&&p.items.length>=10);

const CFG={count:2,rounds:2,secs:60,groups:GROUPS.slice()};
try{const j=JSON.parse(localStorage.getItem("gn.nt")||"null");if(j){Object.assign(CFG,j);if(!Array.isArray(CFG.groups)||!CFG.groups.length)CFG.groups=GROUPS.slice()}}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.nt",JSON.stringify(CFG))}catch(e){}};

const css=`
.ntstage{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.8vh,16px);padding:4px 0;text-align:center}
.ntstage>:first-child{margin-top:auto}.ntstage>:last-child{margin-bottom:auto}
.nthead .eyebrow{display:flex;align-items:center;gap:8px;justify-content:center}
.nthead .av{--s:28px;padding:2px}
.nthead h2{font-family:var(--f-display);font-weight:900;font-size:clamp(1.7rem,5.6vmin,3.4rem);margin:.15em 0;line-height:1.02}
.nthead p{margin:.2em 0 0;color:var(--muted)}
.ntclockrow{display:flex;align-items:center;gap:14px;width:min(1100px,100%)}
.ntclock{font-family:var(--f-clock);font-size:clamp(2.2rem,8vmin,4rem);color:var(--gold);min-width:2.2ch;text-align:left;font-variant-numeric:tabular-nums;line-height:1}
.ntclock.low{color:var(--hot)}
.ntbar{flex:1;height:12px;border-radius:99px;background:var(--stage-3);overflow:hidden}
.ntbar i{display:block;height:100%;width:100%;background:linear-gradient(90deg,var(--gold),#ff8a3d);transition:width .1s linear}
.ntcount{font-family:var(--f-clock);font-size:clamp(1.3rem,4vmin,2.2rem);white-space:nowrap}
.ntslots{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:clamp(6px,1.2vmin,12px);width:min(1100px,100%)}
.portrait .ntslots{grid-template-columns:repeat(2,minmax(0,1fr))}
.ntslot{display:flex;align-items:center;gap:8px;text-align:left;padding:.45em .65em;border-radius:12px;background:var(--stage-2);border:2px dashed var(--line);min-height:clamp(44px,9.5vh,88px);font-weight:800;font-size:clamp(.82rem,2.3vmin,1.25rem);line-height:1.12;overflow:hidden}
.ntslot i{flex:none;width:1.9em;height:1.9em;border-radius:50%;display:grid;place-items:center;background:var(--stage-3);color:var(--muted);font-style:normal;font-family:var(--f-clock);font-size:.85em}
.ntslot span{min-width:0;overflow-wrap:anywhere}
.ntslot.hit{border:2px solid var(--pc,var(--gold));background:linear-gradient(160deg,var(--stage-3),var(--stage-2));animation:popin .35s cubic-bezier(.2,1.4,.4,1)}
.ntslot.hit i{background:var(--pc,var(--gold));color:#1a1636}
.ntslot.custom span::after{content:" ✱";color:var(--gold)}
.ntinput{display:flex;gap:8px;width:min(640px,100%)}
.ntinput input{flex:1;min-width:0;font-size:1.1rem;padding:.7em 1em;border-radius:12px;background:var(--stage-3);border:2px solid var(--line);color:var(--ink)}
.ntfb{min-height:1.7em;font-weight:800;display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap}
.ntfb.ok{color:#3de0a4}.ntfb.bad{color:var(--hot)}
.ntfb .btn{padding:.35em 1em;font-size:.85rem}
.ntchips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:960px}
.ntchip{padding:.3em .8em;border-radius:99px;font-weight:700;font-size:.9rem;background:var(--stage-3);color:var(--muted)}
.ntchip.ok{background:rgba(61,224,164,.18);color:#3de0a4}
.ntbig{font-family:var(--f-display);font-weight:900;font-size:clamp(3rem,12vmin,6rem);color:var(--gold);line-height:1}
.ntgroups{display:flex;flex-wrap:wrap;gap:8px}
.ntgroups button{padding:.5em 1em;border-radius:999px;background:var(--stage-3);border:1px solid var(--line);font-weight:800}
.ntgroups button[aria-pressed="true"]{background:var(--gold);color:#2a1700;border-color:var(--gold)}
.ntrank{display:flex;flex-direction:column;gap:8px;width:min(560px,100%)}
.ntrank .r{display:flex;align-items:center;gap:12px;padding:8px 14px;border-radius:14px;background:var(--stage-2);border:2px solid var(--line);font-weight:800;text-align:left}
.ntrank .r.win{border-color:var(--gold);box-shadow:0 0 24px -6px var(--gold)}
.ntrank .r b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ntrank .r em{font-style:normal;font-family:var(--f-clock);font-size:1.6rem;color:var(--gold)}
.ntrank .av{--s:40px;padding:2px}
.portrait #nt{gap:6px;padding-top:max(8px,calc(var(--sa-t) + var(--blur-gap)));padding-bottom:max(8px,var(--sa-b))}
.portrait #nt .floorbar{gap:8px}.portrait #nt .brand{font-size:1.05rem}.portrait #nt .brand small{display:none}
.portrait #nt .floorbar .btn{padding:.45em 1em;font-size:.85rem}
.portrait #ntstageScore{gap:5px;flex-wrap:nowrap;overflow:hidden}
.portrait .ntslot{min-height:clamp(40px,7vh,64px);font-size:.82rem;padding:.35em .5em}
.portrait .ntstage{gap:clamp(6px,1.3vh,12px)}
.portrait .nthead h2{font-size:1.6rem}
.portrait .ntchip{font-size:.8rem}
#ntMic{min-height:1.4em}
.game.live .tenbadge{color:var(--gold);border-color:var(--gold)}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* ---------- hub tile + screens ---------- */
const hub=document.querySelector(".games");
const soon=[...hub.children].find(c=>c.textContent.includes("Name Ten"));
const tile=document.createElement("button");tile.className="game live";tile.id="playNT";
tile.innerHTML=`<span class="art"><span class="tenbadge">10</span><span class="pill">Play</span></span><h2>Name Ten</h2><p>Ten answers, one category, one clock.</p>`;
if(soon)hub.replaceChild(tile,soon);else hub.appendChild(tile);
const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="ntSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="nt";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>NAME TEN</small></span><span class="spacer"></span><span class="count" id="ntRound"></span><button class="btn ghost" id="ntQuit">Quit</button></div>
<div class="cdscore" id="ntstageScore"></div><div class="ntstage" id="ntStage"></div><div class="mic" id="ntMic"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("ntQuit").onclick=()=>confirmSheet("Quit this game?","The scores will be lost.","Quit",()=>{closeOverlay();endGame();show("hub")});

/* ---------- setup ---------- */
function openSetup(){
  S.count=CFG.count;ensureSlots();
  const avail=PROMPTS.filter(p=>CFG.groups.includes(p.group)).length;
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="ntBack">← Back</button><h2>Name Ten</h2><button class="btn gold" id="ntStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">Players</span><div class="stepper"><button id="ntMinus" aria-label="Fewer players">−</button><output id="ntCount">${CFG.count}</output><button id="ntPlus" aria-label="More players">+</button></div></div>
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li>Each turn gets a new category, like <b>“Name 10 AFL clubs”</b>.</li>
      <li>Name as many as you can before the <b>clock</b> runs out. Say them or <b>type</b> them.</li>
      <li>One point for each answer. All ten is a <b>+3 bonus</b>.</li>
      <li>Most points after the last round wins. On one phone, just pass it along.</li></ul></div>
    <div class="field"><span class="eyebrow">Rounds</span><div class="seg" id="ntRoundsSeg"></div></div>
    <div class="field"><span class="eyebrow">Seconds per turn</span><div class="seg" id="ntSecsSeg"></div></div>
    <div class="field"><span class="eyebrow">Categories <span class="note" id="ntAvail">${avail} to play</span></span><div class="ntgroups" id="ntGroups"></div></div>
    <div class="field"><span class="eyebrow">Voice answers</span><div class="seg" id="ntVoiceSeg"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="ntSoundSeg"></div></div>
    <div class="field" id="ntScreenField"><span class="eyebrow">Screen</span><div class="seg" id="ntScreenSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players and colours</span><div class="hlsetup" id="ntPlayers"></div></div></div>`;
  seg($("ntRoundsSeg"),[1,2,3,5],()=>CFG.rounds,v=>{CFG.rounds=v;saveCfg()},v=>String(v));
  seg($("ntSecsSeg"),[45,60,90],()=>CFG.secs,v=>{CFG.secs=v;saveCfg()},v=>v+"s");
  seg($("ntVoiceSeg"),[true,false],()=>S.prefs.voice,v=>S.prefs.voice=v,onOff);
  seg($("ntSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  screenSeg($("ntScreenSeg"));if(IS_TV)$("ntScreenField").style.display="none";
  const g=$("ntGroups");
  GROUPS.forEach(name=>{const b=document.createElement("button");b.textContent=`${GROUP_ICON[name]} ${name}`;b.setAttribute("aria-pressed",CFG.groups.includes(name));
    b.onclick=()=>{const on=CFG.groups.includes(name);if(on&&CFG.groups.length===1)return;CFG.groups=on?CFG.groups.filter(x=>x!==name):CFG.groups.concat(name);saveCfg();
      b.setAttribute("aria-pressed",!on);$("ntAvail").textContent=PROMPTS.filter(p=>CFG.groups.includes(p.group)).length+" to play"};
    g.appendChild(b)});
  $("ntBack").onclick=()=>show("hub");
  $("ntStart").onclick=()=>{ac();startGame()};
  $("ntMinus").onclick=()=>{CFG.count=Math.max(1,CFG.count-1);saveCfg();openSetup()};
  $("ntPlus").onclick=()=>{CFG.count=Math.min(8,CFG.count+1);saveCfg();openSetup()};
  $("ntMinus").disabled=CFG.count<=1;$("ntPlus").disabled=CFG.count>=8;
  renderPlayers();show("ntSetup");
}
function renderPlayers(){
  const w=$("ntPlayers");w.innerHTML="";
  for(let i=0;i<CFG.count;i++){
    const row=document.createElement("div");row.className="prow";
    row.innerHTML=`<button class="swatchbtn" id="pk${i}" aria-label="Player ${i+1} look">${avatarHTML({name:S.names[i]||"P",color:S.colors[i],slot:i})}</button><input id="ntn${i}" maxlength="14" placeholder="Player ${i+1}" value="${esc(S.names[i]||"")}" aria-label="Player ${i+1} name"><span class="note">Player ${i+1}</span>`;
    row.querySelector("input").oninput=e=>{S.names[i]=e.target.value;save()};
    row.querySelector(".swatchbtn").onclick=()=>{S.count=CFG.count;pickColour(i,renderPlayers)};
    w.appendChild(row);
  }
}

/* ---------- state ---------- */
const NT={players:[],turn:0,total:0,prompt:null,items:[],found:[],live:false,left:0,timer:null,used:new Set(),lastMiss:""};
const stage=html=>{$("ntStage").innerHTML=html;$("ntStage").scrollTop=0};
const norm2=s=>String(s||"").trim();
function score(active){
  $("ntstageScore").innerHTML=NT.players.map((p,i)=>`<div class="cdchip${active===i?" on":""}" style="--pc:${p.color}">${avatarHTML(p,"sm")}<b>${esc(p.name)}</b><span>${p.pts}</span></div>`).join("");
}
function endGame(){clearInterval(NT.timer);NT.live=false;voiceStop();stopConfetti()}

function pickPrompt(){
  let pool=PROMPTS.filter(p=>CFG.groups.includes(p.group));
  let fresh=pool.filter(p=>!NT.used.has(p.title));
  if(!fresh.length){pool.forEach(p=>NT.used.delete(p.title));fresh=pool}
  const p=fresh[Math.floor(Math.random()*fresh.length)];NT.used.add(p.title);return p;
}

/* ---------- matching ---------- */
// Which answers does this text name? Exact beats "contains" beats fuzzy; "Melbourne" must not also count North Melbourne.
function look(text){
  const h=norm(text);if(!h)return {hit:[],dup:false,amb:false};
  const raw=[];
  NT.items.forEach((it,idx)=>{
    let best=null;
    for(const alt of it.alts){
      if(!heardMatches(text,alt))continue;
      const a=norm(alt)||alt.toLowerCase();
      const sc=h===a?3:(" "+h+" ").includes(" "+a+" ")?2:1;
      if(a.length<3&&sc<3)continue;
      if(!best||sc>best.sc||(sc===best.sc&&a.length>best.a.length))best={idx,sc,a};
    }
    if(best)raw.push(best);
  });
  let c=raw.filter(x=>!raw.some(y=>y!==x&&y.sc>=2&&y.a.length>x.a.length&&(" "+y.a+" ").includes(" "+x.a+" ")));
  if(!c.length)return {hit:[],dup:false,amb:false};
  const top=Math.max(...c.map(x=>x.sc));
  if(top>=2)c=c.filter(x=>x.sc>=2);
  else if(c.length>1)return {hit:[],dup:false,amb:true};
  const isFound=x=>NT.found.some(f=>f.idx===x.idx);
  const hit=c.filter(x=>!isFound(x)).map(x=>x.idx);
  return {hit,dup:!hit.length&&c.some(isFound),amb:false};
}
function addFound(entry){
  const k=NT.found.length;if(k>=10)return false;
  NT.found.push(entry);SFX.ok();
  const slot=$("ntSlots")&&$("ntSlots").children[k];
  if(slot){const p=NT.players[NT.turn%NT.players.length];slot.className="ntslot hit"+(entry.custom?" custom":"");slot.style.setProperty("--pc",p.color);slot.querySelector("span").textContent=entry.name;slot.querySelector("i").textContent="✓"}
  const f=$("ntFound");if(f)f.textContent=NT.found.length;
  if(NT.found.length>=10)setTimeout(()=>finishTurn("perfect"),450);
  return true;
}
function take(text,typed){
  if(!NT.live)return;
  const r=look(text);
  if(r.hit.length){
    let names=[];
    for(const idx of r.hit){if(NT.found.length>=10)break;if(addFound({idx,name:NT.items[idx].name}))names.push(NT.items[idx].name)}
    if(typed)feedback("ok","✓ "+names.join(", "));
    return;
  }
  if(!typed)return;
  if(r.dup)feedback("bad","Already said");
  else if(r.amb)feedback("bad","Be more specific");
  else{SFX.pass();NT.lastMiss=norm2(text);feedback("bad","Not on my list",true)}
}
function feedback(kind,msg,offerCount){
  const el=$("ntFb");if(!el)return;
  el.className="ntfb "+kind;el.textContent=msg;
  if(offerCount){
    const b=document.createElement("button");b.className="btn";b.type="button";b.textContent="Count it anyway";
    b.onclick=()=>{const t=NT.lastMiss;if(!t||!NT.live)return;const nm=t.replace(/\b\w/g,c=>c.toUpperCase());addFound({idx:null,name:nm,custom:true});el.className="ntfb ok";el.textContent="✓ "+nm;$("ntIn")&&$("ntIn").focus({preventScroll:true})};
    el.appendChild(b);
  }
}
function onVoice(texts,final){
  if(!NT.live)return;
  for(const t of (final?texts:[texts[0]]))take(t,false);
}

/* ---------- game flow ---------- */
function startGame(){
  S.count=CFG.count;ensureSlots();save();saveCfg();
  NT.players=[];for(let i=0;i<CFG.count;i++)NT.players.push({name:(S.names[i]||"").trim()||`Player ${i+1}`,color:S.colors[i],pts:0,slot:i,got:[]});
  NT.turn=-1;NT.total=CFG.count*CFG.rounds;NT.used=new Set();
  show("nt");score();stage("");
  introContestants(NT.players,"Name Ten",()=>{voiceStart(onVoice,$("ntMic"));if(!S.prefs.voice)$("ntMic").innerHTML="";nextTurn()});
}
function nextTurn(){
  NT.turn++;
  if(NT.turn>=NT.total)return results();
  const pi=NT.turn%NT.players.length,p=NT.players[pi],round=Math.floor(NT.turn/NT.players.length)+1;
  NT.prompt=pickPrompt();NT.items=NT.prompt.items;NT.found=[];NT.live=false;
  $("ntRound").textContent=CFG.rounds>1?`Round ${round} of ${CFG.rounds}`:"";
  score(pi);
  stage(`<div class="nthead"><span class="eyebrow">${avatarHTML(p,"sm")} <span style="color:${p.color}">${esc(p.name)}</span>, you're up${NT.players.length>1?" · pass the phone":""}</span>
      <h2>${esc(NT.prompt.title)}</h2><p>${GROUP_ICON[NT.prompt.group]||""} ${esc(NT.prompt.group)} · ${CFG.secs} seconds · say it or type it</p></div>
    <button class="btn gold" id="ntGo">Start the clock</button>`);
  $("ntGo").onclick=()=>playTurn(pi);
  setTimeout(()=>{const b=$("ntGo");b&&b.focus({preventScroll:true})},40);
}
function playTurn(pi){
  const p=NT.players[pi];
  stage(`<div class="nthead"><span class="eyebrow">${avatarHTML(p,"sm")} <span style="color:${p.color}">${esc(p.name)}</span></span><h2>${esc(NT.prompt.title)}</h2></div>
    <div class="ntclockrow"><div class="ntclock" id="ntClock">${CFG.secs}</div><div class="ntbar"><i id="ntBar"></i></div><div class="ntcount"><b id="ntFound">0</b>/10</div></div>
    <div class="ntslots" id="ntSlots">${Array.from({length:10},(_,k)=>`<div class="ntslot"><i>${k+1}</i><span></span></div>`).join("")}</div>
    <form class="ntinput" id="ntForm" autocomplete="off"><input id="ntIn" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send" placeholder="Type an answer" aria-label="Type an answer"><button class="btn gold" type="submit">Add</button></form>
    <div class="ntfb" id="ntFb"></div>
    <button class="btn ghost" id="ntDone" type="button">I'm done</button>`);
  $("ntForm").onsubmit=e=>{e.preventDefault();const v=$("ntIn").value;$("ntIn").value="";if(v.trim())take(v,true);$("ntIn").focus({preventScroll:true})};
  $("ntDone").onclick=()=>finishTurn("done");
  NT.live=true;NT.left=CFG.secs;SFX.go();
  clearInterval(NT.timer);let lastInt=CFG.secs;
  NT.timer=setInterval(()=>{
    if(!$("overlay").hidden)return;
    NT.left=Math.max(0,NT.left-.1);
    const c=$("ntClock"),b=$("ntBar");if(!c){clearInterval(NT.timer);return}
    const n=Math.ceil(NT.left);c.textContent=n;b.style.width=(NT.left/CFG.secs*100)+"%";
    if(n<=10)c.classList.add("low");
    if(n!==lastInt){lastInt=n;if(n<=5&&n>0)SFX.low()}
    if(NT.left<=0)finishTurn("time");
  },100);
  setTimeout(()=>{const t=$("talkBtn");(IS_TV&&t?t:$("ntIn"))&&(IS_TV&&t?t:$("ntIn")).focus({preventScroll:true})},60);
}
function finishTurn(why){
  if(!NT.live)return;
  NT.live=false;clearInterval(NT.timer);
  const pi=NT.turn%NT.players.length,p=NT.players[pi];
  const n=NT.found.length,perfect=n>=10,pts=n+(perfect?3:0);
  p.pts+=pts;score(pi);
  why==="time"?SFX.buzz():(perfect?SFX.win():SFX.ok());
  const foundIdx=new Set(NT.found.map(f=>f.idx));
  const missed=shuffle(NT.items.map((it,i)=>i).filter(i=>!foundIdx.has(i))).slice(0,12).map(i=>NT.items[i].name);
  const last=NT.turn+1>=NT.total;
  stage(`<div class="nthead"><span class="eyebrow">${avatarHTML(p,"sm")} <span style="color:${p.color}">${esc(p.name)}</span> · ${esc(NT.prompt.title)}</span>
      <h2>${perfect?"Perfect ten!":why==="time"?"Time's up!":"Done!"}</h2></div>
    <div class="ntbig">+${pts}</div>
    <p style="margin:0;color:var(--muted)">${n} answer${n===1?"":"s"}${perfect?" and a 3 point bonus":""}</p>
    <div class="ntchips">${NT.found.map(f=>`<span class="ntchip ok">✓ ${esc(f.name)}</span>`).join("")}</div>
    ${missed.length?`<span class="eyebrow">Others that counted</span><div class="ntchips">${missed.map(m=>`<span class="ntchip">${esc(m)}</span>`).join("")}</div>`:""}
    <button class="btn gold" id="ntNext">${last?"See results":"Next player"}</button>`);
  if(perfect)confetti([p.color,"#ffc94a","#fffdf6"]);
  $("ntNext").onclick=()=>{stopConfetti();nextTurn()};
  setTimeout(()=>{const b=$("ntNext");b&&b.focus({preventScroll:true})},60);
}
function results(){
  NT.live=false;
  const order=NT.players.map((p,i)=>({p,i})).sort((a,b)=>b.p.pts-a.p.pts);
  const top=order[0].p.pts,winners=order.filter(x=>x.p.pts===top);
  score();$("ntRound").textContent="";SFX.win();
  const solo=NT.players.length===1;
  stage(`<div class="nthead"><span class="eyebrow">Name Ten · final</span><h2>${solo?`${esc(winners[0].p.name)} scored ${top}`:winners.length>1?"It's a draw!":`${esc(winners[0].p.name)} wins!`}</h2></div>
    <div class="ntrank">${order.map(x=>`<div class="r${x.p.pts===top&&!solo?" win":""}">${avatarHTML(x.p,"")}<b style="color:${x.p.color}">${esc(x.p.name)}</b><em>${x.p.pts}</em></div>`).join("")}</div>
    <div class="row"><button class="btn" id="ntMenu">Game Night menu</button><button class="btn gold" id="ntAgain">Play again</button></div>`);
  confetti(winners.map(w=>w.p.color).concat(["#ffc94a","#fffdf6"]));
  $("ntMenu").onclick=()=>{stopConfetti();endGame();show("hub")};
  $("ntAgain").onclick=()=>{stopConfetti();NT.players.forEach(p=>p.pts=0);NT.turn=-1;NT.used=new Set();score();nextTurn()};
  setTimeout(()=>{const b=$("ntAgain");b&&b.focus({preventScroll:true})},60);
}

window.__NT={PROMPTS,NT,look,take,CFG};
})();
