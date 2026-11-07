/* =================== TRIVIAL PURSUIT ===================
   Roll for a category, answer the question (say it or type it), win a coloured wedge.
   Right answer = wedge (if new) and roll again. Wrong = pass. First to the target number of wedges wins. */
(function(){
const IS_TV=/GameNightTV/.test(navigator.userAgent);
const CATS=[
  {id:"geo",name:"Geography",icon:"🌏",color:"#3b9dff"},
  {id:"ent",name:"Entertainment",icon:"🎬",color:"#ff5fb0"},
  {id:"his",name:"History",icon:"🏛️",color:"#ffd23f"},
  {id:"art",name:"Arts & Literature",icon:"📚",color:"#b9772c"},
  {id:"sci",name:"Science & Nature",icon:"🔬",color:"#3ddc84"},
  {id:"spo",name:"Sports & Leisure",icon:"🏅",color:"#ff8a3d"}];
const CAT=Object.fromEntries(CATS.map(c=>[c.id,c]));
const QS=(window.TP_RAW||[]).map(l=>{const [cat,q,a]=l.split("|");const alts=(a||"").split("~").map(s=>s.trim()).filter(Boolean);return {cat,q,alts,a:alts[0]}}).filter(x=>CAT[x.cat]&&x.q&&x.a);

const CFG={count:2,wedges:6,secs:30};
try{const j=JSON.parse(localStorage.getItem("gn.tp")||"null");if(j)Object.assign(CFG,j)}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.tp",JSON.stringify(CFG))}catch(e){}};

const css=`
.tpstage{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.8vh,16px);padding:4px 0;text-align:center}
.tpstage>:first-child{margin-top:auto}.tpstage.play>:first-child{margin-top:0}.tpstage>:last-child{margin-bottom:auto}
.tphead .eyebrow{display:flex;align-items:center;gap:8px;justify-content:center}
.tphead .av{--s:28px;padding:2px}
.tphead h2{font-family:var(--f-display);font-weight:900;font-size:clamp(1.7rem,5.6vmin,3.4rem);margin:.15em 0;line-height:1.05}
.tphead p{margin:.2em 0 0;color:var(--muted)}
.tpcat{display:inline-flex;align-items:center;gap:.5em;padding:.35em 1em;border-radius:999px;font-weight:900;color:#1a1636;background:var(--cc);letter-spacing:.04em;text-transform:uppercase;font-size:clamp(.8rem,2.2vmin,1.15rem)}
.tpq{font-family:var(--f-display);font-weight:800;font-size:clamp(1.4rem,4.6vmin,2.8rem);line-height:1.15;max-width:min(1000px,100%);margin:0;text-wrap:balance}
.tpclockrow{display:flex;align-items:center;gap:14px;width:min(900px,100%)}
.tpclock{font-family:var(--f-clock);font-size:clamp(2rem,7vmin,3.6rem);color:var(--gold);min-width:2.2ch;text-align:left;font-variant-numeric:tabular-nums;line-height:1}
.tpclock.low{color:var(--hot)}
.tpbar{flex:1;height:12px;border-radius:99px;background:var(--stage-3);overflow:hidden}
.tpbar i{display:block;height:100%;width:100%;background:var(--cc,var(--gold));transition:width .1s linear}
.tpinput{display:flex;gap:8px;width:min(640px,100%)}
.tpinput input{flex:1;min-width:0;font-size:1.1rem;padding:.7em 1em;border-radius:12px;background:var(--stage-3);border:2px solid var(--line);color:var(--ink)}
.tpfb{min-height:1.6em;font-weight:800;color:var(--hot)}
.tpfb.ok{color:#3de0a4}
.tpans{font-family:var(--f-display);font-weight:900;font-size:clamp(1.6rem,5.4vmin,3.2rem);color:var(--gold);margin:0}
.tpbtns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.tpwheel{display:flex;gap:clamp(6px,1.4vmin,14px);flex-wrap:wrap;justify-content:center}
.tpwheel i{width:clamp(44px,9vmin,84px);height:clamp(44px,9vmin,84px);border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:clamp(1.3rem,4.2vmin,2.4rem);background:var(--cc);opacity:.35;transition:transform .15s,opacity .15s}
.tpwheel i.on{opacity:1;transform:scale(1.25);box-shadow:0 0 28px -4px var(--cc)}
.tppie{display:block}
.tpscore{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.tpchip{display:flex;align-items:center;gap:8px;padding:6px 14px 6px 8px;border-radius:999px;background:var(--stage-2);border:2px solid var(--line)}
.tpchip.on{border-color:var(--pc,var(--gold));box-shadow:0 0 18px -6px var(--pc,var(--gold))}
.tpchip .av{--s:28px;padding:2px}
.tpchip b{font-weight:800}
.tpkeys{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;max-width:720px}
.tpkeys span{display:inline-flex;align-items:center;gap:5px;font-size:.8rem;color:var(--muted);font-weight:700}
.tpkeys em{width:12px;height:12px;border-radius:50%;background:var(--cc);display:inline-block}
.tpwinpie{display:flex;gap:16px;flex-wrap:wrap;justify-content:center;align-items:center}
.tpmini{display:grid;grid-template-columns:repeat(3,14px);gap:3px}
.tpmini i{width:14px;height:14px;border-radius:50%}
.portrait #tp{gap:6px;padding-top:max(8px,calc(var(--sa-t) + var(--blur-gap)));padding-bottom:max(8px,var(--sa-b))}
.portrait #tp .floorbar{gap:8px}.portrait #tp .brand{font-size:1.05rem}.portrait #tp .brand small{display:none}
.portrait #tp .floorbar .btn{padding:.45em 1em;font-size:.85rem}
.portrait .tphead h2{font-size:1.5rem}.portrait .tpq{font-size:1.3rem}
.portrait .tpstage{gap:clamp(6px,1.3vh,12px)}
.portrait .tpinput input{padding:.55em .9em}
.portrait .tpscore{gap:5px;flex-wrap:nowrap;overflow:hidden}
.portrait .tpchip{padding:4px 8px 4px 5px;gap:5px}.portrait .tpchip b{font-size:.78rem;max-width:5.5em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.portrait .tpchip .av{--s:22px}
#tpMic{min-height:1.4em}
.game.live .tppieart{width:64px;height:64px;border-radius:50%;background:conic-gradient(#3b9dff 0 60deg,#ff5fb0 60deg 120deg,#ffd23f 120deg 180deg,#b9772c 180deg 240deg,#3ddc84 240deg 300deg,#ff8a3d 300deg 360deg);border:4px solid #fffdf6;box-shadow:0 0 0 3px #1a1636 inset}
.games.six{grid-template-columns:repeat(3,minmax(0,1fr));width:min(1100px,100%)}
.portrait .games.six{grid-template-columns:repeat(2,minmax(0,1fr));max-height:none;flex:none;grid-auto-rows:auto}

.tptrack{display:grid;grid-template-columns:repeat(13,1fr);gap:clamp(2px,.6vmin,6px);width:min(1100px,100%);align-items:end;padding-top:14px}
.tpsq{position:relative;aspect-ratio:1;border-radius:22%;background:var(--cc);display:grid;place-items:center;font-style:normal;color:#1a1636;font-weight:900;opacity:.55;font-size:clamp(.7rem,2.6vmin,1.6rem)}
.tpsq i{font-style:normal}
.tpsq.tW{opacity:1;box-shadow:0 0 0 3px #fffdf6 inset,0 0 14px -2px var(--cc)}
.tpsq.tR{opacity:.9;background:#4a4768;color:#fffdf6}
.tpsq.me{opacity:1;outline:3px solid var(--pc);outline-offset:2px;transform:scale(1.18);z-index:2}
.tpsq.cand{opacity:1;outline:3px dashed #fffdf6;outline-offset:2px;transform:scale(1.12);z-index:2}
.tpmk{position:absolute;top:-1.5em;left:0;right:0;text-align:center;color:#fffdf6;font-size:.9em}
.tptok{position:absolute;bottom:-9px;left:50%;width:14px;height:14px;margin-left:-7px;border-radius:50%;border:2px solid #fffdf6}
.tpdots{position:absolute;top:2px;right:2px;display:flex;gap:2px}.tpdots u{width:8px;height:8px;border-radius:50%;border:1px solid #fffdf6}
.tpleg{display:flex;gap:16px;flex-wrap:wrap;justify-content:center;color:var(--muted);font-size:.8rem;font-weight:700}
.tpdie{width:clamp(70px,16vmin,130px);height:clamp(70px,16vmin,130px);border-radius:22%;background:#fffdf6;color:#1a1636;display:grid;place-items:center;font-family:var(--f-display);font-weight:900;font-size:clamp(2.6rem,9vmin,5rem);box-shadow:0 8px 0 #bdb7a3}
.tpdie.done{background:var(--gold)}
.tpmv{min-width:12em}
.portrait .tptrack{padding-top:12px}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* ---------- hub tile + screens ---------- */
const hub=document.querySelector(".games");
const tile=document.createElement("button");tile.className="game live";tile.id="playTP";
tile.innerHTML=`<span class="art"><span class="tppieart"></span><span class="pill">Play</span></span><h2>Trivial Pursuit</h2><p>Roll the die, land on a wedge square, win it.</p>`;
const soonPB=[...hub.children].find(c=>c.classList.contains("soon")&&c.textContent.includes("Picture Blitz"));
if(soonPB)hub.replaceChild(tile,soonPB);else hub.appendChild(tile);
hub.classList.remove("five");
if(hub.children.length>=6)hub.classList.add("six");else if(hub.children.length>4)hub.classList.add("five");
const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="tpSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="tp";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>TRIVIAL PURSUIT</small></span><span class="spacer"></span><span class="count" id="tpInfo"></span><button class="btn ghost" id="tpQuit">Quit</button></div>
<div class="tpscore" id="tpScore"></div><div class="tpstage" id="tpStage"></div><div class="mic" id="tpMic"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("tpQuit").onclick=()=>confirmSheet("Quit this game?","The scores will be lost.","Quit",()=>{closeOverlay();endGame();show("hub")});

/* ---------- setup ---------- */
function openSetup(){
  S.count=CFG.count;ensureSlots();
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="tpBack">← Back</button><h2>Trivial Pursuit</h2><button class="btn gold" id="tpStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">Players</span><div class="stepper"><button id="tpMinus" aria-label="Fewer players">−</button><output id="tpCount">${CFG.count}</output><button id="tpPlus" aria-label="More players">+</button></div></div>
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li>Each turn, <b>roll the die</b> and move that many squares forward <i>or</i> back around the track.</li>
      <li>You answer a question in the category of the square you land on. <b>Wedge squares (★)</b> are the only ones that win a wedge.</li>
      <li>Right answer: <b>roll again once</b>. Wrong answer, or after your bonus roll: the next player's turn. Everyone plays in order.</li>
      <li>↻ squares: roll again for free. First to the target number of wedges wins.</li></ul></div>
    <div class="field"><span class="eyebrow">Wedges to win</span><div class="seg" id="tpWedgeSeg"></div></div>
    <div class="field"><span class="eyebrow">Seconds per question</span><div class="seg" id="tpSecsSeg"></div></div>
    <div class="field"><span class="eyebrow">Voice answers</span><div class="seg" id="tpVoiceSeg"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="tpSoundSeg"></div></div>
    <div class="field" id="tpScreenField"><span class="eyebrow">Screen</span><div class="seg" id="tpScreenSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players and colours</span><div class="hlsetup" id="tpPlayers"></div></div></div>`;
  seg($("tpWedgeSeg"),[3,4,6],()=>CFG.wedges,v=>{CFG.wedges=v;saveCfg()},v=>v+" wedges");
  seg($("tpSecsSeg"),[20,30,45],()=>CFG.secs,v=>{CFG.secs=v;saveCfg()},v=>v+"s");
  seg($("tpVoiceSeg"),[true,false],()=>S.prefs.voice,v=>S.prefs.voice=v,onOff);
  seg($("tpSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  screenSeg($("tpScreenSeg"));if(IS_TV)$("tpScreenField").style.display="none";
  $("tpBack").onclick=()=>show("hub");
  $("tpStart").onclick=()=>{ac();startGame()};
  $("tpMinus").onclick=()=>{CFG.count=Math.max(1,CFG.count-1);saveCfg();openSetup()};
  $("tpPlus").onclick=()=>{CFG.count=Math.min(8,CFG.count+1);saveCfg();openSetup()};
  $("tpMinus").disabled=CFG.count<=1;$("tpPlus").disabled=CFG.count>=8;
  renderPlayers();show("tpSetup");
}
function renderPlayers(){
  const w=$("tpPlayers");w.innerHTML="";
  for(let i=0;i<CFG.count;i++){
    const row=document.createElement("div");row.className="prow";
    row.innerHTML=`<button class="swatchbtn" id="pk${i}" aria-label="Player ${i+1} look">${avatarHTML({name:S.names[i]||"P",color:S.colors[i],slot:i})}</button><input id="tpn${i}" maxlength="14" placeholder="Player ${i+1}" value="${esc(S.names[i]||"")}" aria-label="Player ${i+1} name"><span class="note">Player ${i+1}</span>`;
    row.querySelector("input").oninput=e=>{S.names[i]=e.target.value;save()};
    row.querySelector(".swatchbtn").onclick=()=>{S.count=CFG.count;pickColour(i,renderPlayers)};
    w.appendChild(row);
  }
}

/* ---------- state ---------- */
const TP={players:[],turn:0,q:null,cat:null,live:false,left:0,timer:null,used:new Set(),rolling:false,streak:0,extra:0,sn:0,ph:"idle"};
const stage=(html,cls)=>{$("tpStage").className="tpstage"+(cls?" "+cls:"");$("tpStage").innerHTML=html;$("tpStage").scrollTop=0};
function pie(p,size){
  const r=size/2,c=r;let s="";
  CATS.forEach((cat,i)=>{
    const a0=(i*60-90)*Math.PI/180,a1=((i+1)*60-90)*Math.PI/180;
    const d=`M${c},${c}L${c+r*Math.cos(a0)},${c+r*Math.sin(a0)}A${r},${r} 0 0 1 ${c+r*Math.cos(a1)},${c+r*Math.sin(a1)}Z`;
    s+=`<path d="${d}" fill="${p.wedges.has(cat.id)?cat.color:"rgba(255,255,255,.1)"}" stroke="#1a1636" stroke-width="1.5"/>`;
  });
  return `<svg class="tppie" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${s}<circle cx="${c}" cy="${c}" r="${r*.2}" fill="#1a1636"/></svg>`;
}
function score(active){
  $("tpScore").innerHTML=TP.players.map((p,i)=>`<div class="tpchip${active===i?" on":""}" style="--pc:${p.color}">${avatarHTML(p,"sm")}<b>${esc(p.name)}</b>${pie(p,30)}</div>`).join("");
}
function endGame(){clearInterval(TP.timer);TP.live=false;voiceStop();stopConfetti()}
const cur=()=>TP.players[TP.turn%TP.players.length];
function pickQ(cat){
  let pool=QS.filter(q=>q.cat===cat);
  let fresh=pool.filter(q=>!TP.used.has(q.q));
  if(!fresh.length){pool.forEach(q=>TP.used.delete(q.q));fresh=pool}
  const q=fresh[Math.floor(Math.random()*fresh.length)];TP.used.add(q.q);return q;
}

/* ---------- answer checking ---------- */
function correct(text){
  const h=norm(text);if(!h)return false;
  for(const alt of TP.q.alts){
    const a=norm(alt)||alt.toLowerCase();
    if(h===a)return true;
    if(a.length<3||/^\d+$/.test(a))continue;
    if(heardMatches(text,alt))return true;
  }
  return false;
}
function take(text,typed){
  if(!TP.live)return;
  if(correct(text)){finish(true,"correct");return}
  if(typed){SFX.pass();const f=$("tpFb");if(f){f.className="tpfb";f.textContent="Not quite, try again"}}
}
function onVoice(texts,final){
  if(!TP.live)return;
  for(const t of (final?texts:[texts[0]]))if(correct(t)){finish(true,"correct");return}
}

/* ---------- flow ---------- */
function startGame(){
  const LL=window.LINK&&LINK.pull&&LINK.pull(1,8);if(LL)CFG.count=LL.length;
  S.count=CFG.count;ensureSlots();save();saveCfg();TP.phones=!!LL;
  TP.players=[];for(let i=0;i<CFG.count;i++)TP.players.push({name:(S.names[i]||"").trim()||`Player ${i+1}`,color:S.colors[i],slot:i,wedges:new Set(),pos:(i*5+2)%30,pid:(LL&&S.pids&&S.pids[i])||null});
  TP.turn=0;TP.used=new Set();TP.extra=0;
  show("tp");score();stage("");
  introContestants(TP.players,"Trivial Pursuit",()=>{voiceStart(onVoice,$("tpMic"));if(!S.prefs.voice)$("tpMic").innerHTML="";rollScreen()});
}
/* ---------- the track: a ring of squares instead of a board ---------- */
const N=30;
const sqAt=i=>{i=((i%N)+N)%N;
  if(i%5===0)return {i,t:"W",cat:CATS[(i/5)%6]};
  if(i%10===7)return {i,t:"R",cat:null};
  return {i,t:"Q",cat:CATS[i%6]};};
const sqName=s=>s.t==="R"?"Roll again":s.t==="W"?s.cat.name+" wedge square":s.cat.name;
function track(p,cand){
  let h="";
  for(let o=-6;o<=6;o++){
    const s=sqAt(p.pos+o),here=TP.players.filter(q=>q!==p&&q.pos%N===s.i);
    const c=(cand||[]).find(x=>x.o===o);
    h+=`<div class="tpsq t${s.t}${o===0?" me":""}${c?" cand":""}" style="--cc:${s.cat?s.cat.color:"#6c6a85"};--pc:${p.color}">
      <span class="tpmk">${c?c.lab:""}</span><i>${s.t==="W"?"★":s.t==="R"?"↻":""}</i>
      <span class="tpdots">${here.map(q=>`<u style="background:${q.color}"></u>`).join("")}</span>${o===0?`<span class="tptok" style="background:${p.color}"></span>`:""}</div>`;
  }
  return `<div class="tptrack">${h}</div><div class="tpleg"><span>★ wedge square: win the wedge</span><span>↻ roll again</span><span>colour = category</span></div>`;
}
const pieSz=()=>Math.min(150,Math.max(90,Math.round(Math.min(innerWidth,innerHeight)*.2)));
const eyeb=(p,t)=>`<span class="eyebrow">${avatarHTML(p,"sm")} <span style="color:${p.color}">${esc(p.name)}</span>${t?", "+t:""}</span>`;
const phase=(ph)=>{TP.ph=ph;TP.sn++};
function rollScreen(){
  const p=cur();TP.live=false;score(TP.turn%TP.players.length);phase("roll");
  $("tpInfo").textContent=`${CFG.wedges} wedges to win`;
  stage(`<div class="tphead">${eyeb(p,TP.extra?"bonus roll":"your turn")}<h2>Roll the die</h2></div>
    ${track(p)}
    ${pie(p,pieSz())}
    <button class="btn gold" id="tpRoll">Roll</button>`);
  $("tpRoll").onclick=doRoll;
  setTimeout(()=>{const b=$("tpRoll");b&&b.focus({preventScroll:true})},40);
}
function doRoll(){
  if(TP.ph!=="roll"||TP.rolling)return;TP.rolling=true;
  const p=cur();
  const d=1+Math.floor(Math.random()*6);
  TP.die=d;phase("rolling");
  stage(`<div class="tphead">${eyeb(p)}<h2>Rolling…</h2></div><div class="tpdie" id="tpDie">?</div>${track(p)}`);
  let k=0;const el=$("tpDie");
  const tick=()=>{
    const e=$("tpDie");if(!e)return;
    if(k>=12){e.textContent=d;e.classList.add("done");SFX.win&&SFX.win();TP.rolling=false;setTimeout(()=>moveScreen(),900);return}
    e.textContent=1+Math.floor(Math.random()*6);SFX.tick();k++;setTimeout(tick,60+k*14);
  };tick();
}
function moveScreen(){
  const p=cur(),d=TP.die;phase("move");
  const opts=[{o:d,lab:"▶"},{o:-d,lab:"◀"}].map(x=>({...x,s:sqAt(p.pos+x.o)}));
  TP.opts=opts;
  const lab=x=>(x.o>0?"Forward ":"Back ")+d+": "+sqName(x.s);
  stage(`<div class="tphead">${eyeb(p)}<h2>You rolled a ${d}</h2><p>Pick which way to move</p></div>
    <div class="tpdie done">${d}</div>
    ${track(p,opts)}
    <div class="tpbtns">${opts.map((x,i)=>`<button class="btn gold tpmv" data-i="${i}" style="${x.s.cat?"background:"+x.s.cat.color+";color:#1a1636":""}">${lab(x)}</button>`).join("")}</div>`);
  [...document.querySelectorAll(".tpmv")].forEach(b=>b.onclick=()=>doMove(+b.dataset.i));
  TP.moveLabels=opts.map(lab);
}
function doMove(i){
  if(TP.ph!=="move")return;const x=TP.opts[i];if(!x)return;
  const p=cur();p.pos=((p.pos+x.o)%N+N)%N;phase("land");SFX.go&&SFX.go();
  const s=sqAt(p.pos);TP.sq=s;
  if(s.t==="R"){
    stage(`<div class="tphead">${eyeb(p)}<h2>Roll again!</h2></div>${track(p)}`);
    setTimeout(()=>{if(TP.ph==="land")rollScreen()},1400);return;
  }
  stage(`<div class="tphead">${eyeb(p)}<h2>${s.t==="W"?"Wedge square":"You landed on"}</h2><span class="tpcat" style="--cc:${s.cat.color}">${s.cat.name}</span></div>${track(p)}`);
  setTimeout(()=>{if(TP.ph==="land")question(s.cat)},1300);
}
function question(cat){
  const p=cur();TP.cat=cat;TP.q=pickQ(cat.id);TP.live=false;phase("q");
  const w=TP.sq&&TP.sq.t==="W",has=p.wedges.has(cat.id);
  TP.note=w?(has?"You already own this wedge, just a normal question":"WEDGE QUESTION: answer to win the "+cat.name+" wedge"):"Normal question: no wedge here, but a right answer earns a bonus roll";
  stage(`<div class="tphead">${eyeb(p)}
      <span class="tpcat" style="--cc:${cat.color}">${w?"★ ":""}${cat.name}</span><p>${TP.note} · ${CFG.secs} seconds</p></div>
    <p class="tpq">${esc(TP.q.q)}</p>
    <button class="btn gold" id="tpGo">Start the clock</button>`);
  $("tpGo").onclick=doGo;
  setTimeout(()=>{const b=$("tpGo");b&&b.focus({preventScroll:true})},40);
}
function doGo(){if(TP.ph==="q")play()}
function play(){
  const p=cur(),cat=TP.cat;phase("play");
  stage(`<div class="tphead"><span class="tpcat" style="--cc:${cat.color}">${TP.sq&&TP.sq.t==="W"?"★ ":""}${cat.name}</span></div>
    <p class="tpq">${esc(TP.q.q)}</p>
    <div class="tpclockrow" style="--cc:${cat.color}"><div class="tpclock" id="tpClock">${CFG.secs}</div><div class="tpbar"><i id="tpBar"></i></div></div>
    <form class="tpinput" id="tpForm" autocomplete="off"><input id="tpIn" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send" placeholder="Type your answer" aria-label="Type your answer"><button class="btn gold" type="submit">Answer</button></form>
    <div class="tpfb" id="tpFb"></div>
    <button class="btn ghost" id="tpPass" type="button">Pass</button>`,"play");
  $("tpForm").onsubmit=e=>{e.preventDefault();const v=$("tpIn").value;$("tpIn").value="";if(v.trim())take(v,true);const i=$("tpIn");i&&i.focus({preventScroll:true})};
  $("tpPass").onclick=()=>finish(false,"pass");
  TP.live=true;TP.left=CFG.secs;SFX.go();clearInterval(TP.timer);let last=CFG.secs;
  TP.timer=setInterval(()=>{
    if(!$("overlay").hidden)return;
    TP.left=Math.max(0,TP.left-.1);
    const c=$("tpClock"),b=$("tpBar");if(!c){clearInterval(TP.timer);return}
    const n=Math.ceil(TP.left);c.textContent=n;b.style.width=(TP.left/CFG.secs*100)+"%";
    if(n<=8)c.classList.add("low");
    if(n!==last){last=n;if(n<=5&&n>0)SFX.low()}
    if(TP.left<=0)finish(false,"time");
  },100);
  setTimeout(()=>{const t=$("talkBtn");const el=IS_TV&&t?t:$("tpIn");el&&el.focus({preventScroll:true})},60);
}
function finish(right,why){
  if(!TP.live)return;
  TP.live=false;clearInterval(TP.timer);
  const p=cur(),cat=TP.cat,pi=TP.turn%TP.players.length,wsq=TP.sq&&TP.sq.t==="W";
  let gained=false;
  if(right){SFX.win();gained=wsq&&!p.wedges.has(cat.id);if(gained)p.wedges.add(cat.id)}
  else why==="time"?SFX.buzz():SFX.pass();
  score(pi);phase("result");TP.ok=right;TP.gained=gained;TP.why=why;
  const won=right&&p.wedges.size>=CFG.wedges;
  TP.bonus=right&&!won&&TP.extra<1;
  TP.nextLab=won?"See results":TP.bonus?"Roll again":TP.players.length>1?"Next player":"Roll again";
  stage(`<div class="tphead"><span class="tpcat" style="--cc:${cat.color}">${wsq?"★ ":""}${cat.name}</span>
      <h2>${right?(gained?"Wedge won!":"Correct!"):why==="time"?"Time's up!":"Not this time"}</h2>${right&&!gained&&wsq?`<p>You already had this wedge</p>`:right&&!wsq?`<p>No wedge on a normal square</p>`:""}</div>
    <p class="tpq" style="font-size:clamp(1rem,2.6vmin,1.4rem);color:var(--muted)">${esc(TP.q.q)}</p>
    <p class="tpans">${esc(TP.q.a)}</p>
    ${right&&gained?pie(p,pieSz()):""}
    <div class="tpbtns">
      ${right?"":`<button class="btn" id="tpRight" type="button">We got it right</button>`}
      <button class="btn gold" id="tpNext" type="button">${TP.nextLab}</button>
    </div>`);
  if(won){confetti([cat.color,"#ffc94a","#fffdf6"])}
  $("tpNext").onclick=doNext;
  const r=$("tpRight");
  if(r)r.onclick=()=>{ // judge override for a spoken answer the mic missed
    SFX.win();TP.ok=true;if(wsq&&!p.wedges.has(cat.id)){p.wedges.add(cat.id);TP.gained=true}score(pi);
    TP.bonus=p.wedges.size<CFG.wedges&&TP.extra<1;doNext()};
  setTimeout(()=>{const b=$("tpNext");b&&b.focus({preventScroll:true})},60);
}
function doNext(){
  if(TP.ph!=="result")return;
  stopConfetti();const p=cur();
  if(TP.ok&&p.wedges.size>=CFG.wedges)return results(p);
  if(TP.ok&&TP.bonus){TP.extra=1}else{TP.extra=0;TP.turn++}
  rollScreen();
}
/* ---------- phone companion ---------- */
const active=()=>{const e=$("tp");return !!e&&!e.hidden&&TP.players.length>0};
function sceneFor(ph){
  const P=TP.players,cu=P.length?cur():null,me=P.find(q=>q.pid&&q.pid===ph.pid);
  const sc=P.map(q=>({n:q.name,s:q.wedges.size,c:q.color,on:q===cu?1:0,pid:q.pid,av:avatarSrcSafe(q)}));
  const base={th:"tp",scores:sc,btns:[],sn:TP.sn,me:0};
  if(!me)return {...base,head:{e:"Trivial Pursuit",t:"Watch the TV",s:"You'll be in the next game"}};
  const mine=me===cu,wc=me.wedges.size+" of "+CFG.wedges+" wedges";
  if(!mine){
    const pn=cu.name;
    if(TP.ph==="play")return {...base,head:{e:"Trivial Pursuit",t:pn+" is answering",s:"Shout it out if you know it. "+wc},clock:String(Math.ceil(TP.left))};
    return {...base,head:{e:"Trivial Pursuit",t:pn+"'s turn",s:"Your turn is coming. "+wc}};
  }
  const b={...base,me:1};
  switch(TP.ph){
    case "roll":return {...b,head:{e:wc,t:TP.extra?"Bonus roll":"Your turn",s:"Roll the die to move"},btns:[{t:"Roll the die",a:"roll",v:0}]};
    case "rolling":return {...b,head:{e:wc,t:"Rolling…",s:""}};
    case "move":return {...b,head:{e:wc,t:"You rolled a "+TP.die,s:"Pick which way to move"},btns:TP.opts.map((x,i)=>({t:TP.moveLabels[i],a:"move",v:i,c:x.s.cat?x.s.cat.color:null}))};
    case "land":return {...b,head:{e:wc,t:TP.sq&&TP.sq.t==="R"?"Roll again!":"Landed on "+sqName(TP.sq),s:"Watch the TV"}};
    case "q":return {...b,head:{e:TP.cat.name,t:TP.q.q,s:TP.note},btns:[{t:"Start the clock",a:"go",v:0}]};
    case "play":return {...b,head:{e:TP.cat.name+(TP.sq&&TP.sq.t==="W"?" · wedge question":""),t:TP.q.q,s:""},clock:String(Math.ceil(TP.left)),inp:{ph:"Type your answer"},btns:[{t:"Pass",a:"pass",v:0}],fb:txt0("tpFb")};
    case "result":return {...b,head:{e:TP.cat.name,t:TP.ok?(TP.gained?"Wedge won!":"Correct!"):(TP.why==="time"?"Time's up!":"Not this time"),s:"Answer: "+TP.q.a},btns:[{t:TP.nextLab,a:"next",v:0}]};
  }
  return {...b,head:{e:"Trivial Pursuit",t:"Get ready",s:"Watch the TV"}};
}
function avatarSrcSafe(q){try{return avatarSrc(q.slot!=null?q.slot:0)}catch(e){return ""}}
function txt0(id){const e=$(id);return e?(e.textContent||"").trim():""}
function act(p,m){
  const cu=TP.players.length&&cur();if(!cu||!cu.pid||cu.pid!==p.pid)return;
  if(m.a==="roll")doRoll();else if(m.a==="move")doMove(+m.i);else if(m.a==="go")doGo();
  else if(m.a==="pass"){if(TP.ph==="play")finish(false,"pass")}else if(m.a==="next")doNext();
}
function text(p,v){
  const cu=TP.players.length&&cur();if(!cu||!cu.pid||cu.pid!==p.pid||TP.ph!=="play")return;
  const s=String(v||"").slice(0,60);if(s.trim())take(s,true);
}
function results(winner){
  window.LB&&LB.record("tp",TP.players.map(p=>({name:p.name,color:p.color,score:p.wedges.size,win:p===winner})));
  TP.live=false;score();$("tpInfo").textContent="";SFX.win();
  const order=TP.players.slice().sort((a,b)=>b.wedges.size-a.wedges.size);
  stage(`<div class="tphead"><span class="eyebrow">Trivial Pursuit · final</span><h2>${TP.players.length===1?"You filled the pie!":esc(winner.name)+" wins!"}</h2></div>
    <div class="tpwinpie">${pie(winner,Math.min(200,Math.max(120,Math.round(Math.min(innerWidth,innerHeight)*.28))))}</div>
    <div class="ntrank">${order.map(p=>`<div class="r${p===winner&&TP.players.length>1?" win":""}">${avatarHTML(p,"")}<b style="color:${p.color}">${esc(p.name)}</b><em>${p.wedges.size}</em></div>`).join("")}</div>
    <div class="row"><button class="btn" id="tpMenu">Game Night menu</button><button class="btn gold" id="tpAgain">Play again</button></div>`);
  confetti([winner.color,"#ffc94a","#fffdf6"]);
  $("tpMenu").onclick=()=>{stopConfetti();endGame();show("hub")};
  $("tpAgain").onclick=()=>{stopConfetti();TP.players.forEach(p=>p.wedges=new Set());TP.turn=0;TP.extra=0;TP.used=new Set();rollScreen()};
  setTimeout(()=>{const b=$("tpAgain");b&&b.focus({preventScroll:true})},60);
}
window.__TP={QS,TP,CFG,take,correct,sceneFor,act,text,active};
})();
