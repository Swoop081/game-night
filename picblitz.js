/* =================== PICTURE BLITZ ===================
   A photo starts blurred and comes into focus as the clock runs. Name it early for more points. */
(function(){
const IS_TV=/GameNightTV/.test(navigator.userAgent);
const SETS=[["animals","🐾","Animals"],["bugs","🐞","Bugs & Insects"],["fruitveg","🍎","Fruit & Veg"],["food","🍕","Food & Drink"],["transport","🚗","Transport"],["objects","🔑","Everyday Objects"],["instruments","🎸","Instruments"],["sports","⚽","Sports"],["landmarks","🗼","Landmarks"],["wonders","🏞️","Natural Wonders"],["actors","🎬","Famous Actors"],["musicians","🎤","Musicians"],["sportstars","🏅","Sports Stars"],["icons","🌟","Icons & Leaders"]].filter(x=>CATS[x[0]]);
const GENERIC=["animals","bugs","fruitveg","food","transport","objects","instruments","sports","landmarks","wonders"];
/* very specific answers that a general guess ("spider", "beetle") would miss */
const SKIP=new Set(["Crab spider","Stag beetle","Dung beetle","Louse","Weevil","Aphid","Silverfish"]);
const CFG={count:2,rounds:3,secs:20,sets:GENERIC.filter(x=>SETS.some(s=>s[0]===x)),v:2};
try{const j=JSON.parse(localStorage.getItem("gn.pb")||"null");if(j){Object.assign(CFG,j);if(j.v!==2)CFG.sets=GENERIC.filter(x=>SETS.some(s=>s[0]===x));CFG.v=2;CFG.sets=(CFG.sets||[]).filter(x=>SETS.some(s=>s[0]===x));if(!CFG.sets.length)CFG.sets=GENERIC.filter(x=>SETS.some(s=>s[0]===x))}}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.pb",JSON.stringify(CFG))}catch(e){}};

const css=`
.pbstage{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.6vh,14px);padding:4px 0;text-align:center}
.pbstage>:first-child{margin-top:auto}.pbstage.play>:first-child{margin-top:0}.pbstage>:last-child{margin-bottom:auto}
.pbhead .eyebrow{display:flex;align-items:center;gap:8px;justify-content:center}
.pbhead .av{--s:28px;padding:2px}
.pbhead h2{font-family:var(--f-display);font-weight:900;font-size:clamp(1.7rem,5.6vmin,3.4rem);margin:.15em 0;line-height:1.05}
.pbhead p{margin:.2em 0 0;color:var(--muted)}
.pbframe{flex:1 1 auto;min-height:120px;width:min(900px,100%);display:grid;place-items:center;border-radius:18px;background:var(--stage-2);border:2px solid var(--line);overflow:hidden;padding:6px}
.pbframe canvas{max-width:100%;max-height:100%;border-radius:10px;display:block}
.pbrow{display:flex;align-items:center;gap:14px;width:min(900px,100%)}
.pbpts{font-family:var(--f-clock);font-size:clamp(1.6rem,5vmin,2.6rem);color:var(--gold);min-width:3.2ch;white-space:nowrap}
.pbbar{flex:1;height:12px;border-radius:99px;background:var(--stage-3);overflow:hidden}
.pbbar i{display:block;height:100%;width:100%;background:linear-gradient(90deg,var(--gold),#ff8a3d)}
.pbinput{display:flex;gap:8px;width:min(640px,100%)}
.pbinput input{flex:1;min-width:0;font-size:1.1rem;padding:.7em 1em;border-radius:12px;background:var(--stage-3);border:2px solid var(--line);color:var(--ink)}
.pbfb{min-height:1.5em;font-weight:800;color:var(--hot)}
.pbgot{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.pbgot span{padding:.35em .9em;border-radius:999px;background:var(--stage-2);border:2px solid var(--pc);font-weight:800;opacity:.7}
.pbgot span.ok{background:var(--pc);color:#fff;opacity:1}
.pbans{font-family:var(--f-display);font-weight:900;font-size:clamp(1.6rem,5vmin,3rem);color:var(--gold);margin:0}
.pbbig{font-family:var(--f-display);font-weight:900;font-size:clamp(2.4rem,9vmin,5rem);color:var(--gold);line-height:1}
.pbgroups{display:flex;flex-wrap:wrap;gap:8px}
.pbgroups button{padding:.5em 1em;border-radius:999px;background:var(--stage-3);border:1px solid var(--line);font-weight:800}
.pbgroups button[aria-pressed="true"]{background:var(--gold);color:#2a1700;border-color:var(--gold)}
.pbscore{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.pbchip{display:flex;align-items:center;gap:8px;padding:6px 14px 6px 8px;border-radius:999px;background:var(--stage-2);border:2px solid var(--line)}
.pbchip.on{border-color:var(--pc,var(--gold));box-shadow:0 0 18px -6px var(--pc,var(--gold))}
.pbchip .av{--s:28px;padding:2px}.pbchip b{font-weight:800}.pbchip span{font-family:var(--f-clock);color:var(--gold)}
.portrait #pb{gap:6px;padding-top:max(8px,calc(var(--sa-t) + var(--blur-gap)));padding-bottom:max(8px,var(--sa-b))}
.portrait #pb .floorbar{gap:8px}.portrait #pb .brand{font-size:1.05rem}.portrait #pb .brand small{display:none}
.portrait #pb .floorbar .btn{padding:.45em 1em;font-size:.85rem}
.portrait .pbhead h2{font-size:1.5rem}
.portrait .pbscore{gap:5px;flex-wrap:nowrap;overflow:hidden}
.portrait .pbchip{padding:4px 8px 4px 5px;gap:5px}.portrait .pbchip b{font-size:.78rem;max-width:5.5em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.portrait .pbchip .av{--s:22px}
.portrait .pbinput input{padding:.55em .9em}
#pbMic{min-height:1.4em}
.game.live .pbart{width:64px;height:64px;border-radius:12px;background:conic-gradient(#ff5fb0 25%,#3b9dff 0 50%,#ffd23f 0 75%,#3ddc84 0);background-size:16px 16px;image-rendering:pixelated;border:3px solid #fffdf6;background:
 linear-gradient(90deg,#ff5fb0 0 25%,#3b9dff 0 50%,#ffd23f 0 75%,#3ddc84 0) 0 0/100% 25%,#222}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

const hub=document.querySelector(".games");
const tile=document.createElement("button");tile.className="game live";tile.id="playPB";
tile.innerHTML=`<span class="art"><span class="pbart"></span><span class="pill">Play</span></span><h2>Picture Blitz</h2><p>Name it before the picture fills in.</p>`;
const soon=[...hub.children].find(c=>c.classList.contains("soon")&&c.textContent.includes("Picture Blitz"));
if(soon)hub.replaceChild(tile,soon);else hub.appendChild(tile);
// 7+ tiles: keep the grid tidy (landscape 4 columns)
const n=hub.children.length;
hub.classList.remove("five","six");
if(n>=7){hub.classList.add("seven")}else if(n>=6)hub.classList.add("six");else if(n>4)hub.classList.add("five");
if(!document.getElementById("pbHubCss")){const s=document.createElement("style");s.id="pbHubCss";s.textContent=`.games.seven{grid-template-columns:repeat(4,minmax(0,1fr));width:min(1200px,100%)}.portrait .games.seven{grid-template-columns:repeat(2,minmax(0,1fr));max-height:none;flex:none;grid-auto-rows:auto}`;document.head.appendChild(s)}
const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="pbSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="pb";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>PICTURE BLITZ</small></span><span class="spacer"></span><span class="count" id="pbRound"></span><button class="btn ghost" id="pbQuit">Quit</button></div>
<div class="pbscore" id="pbScore"></div><div class="pbstage" id="pbStage"></div><div class="mic" id="pbMic"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("pbQuit").onclick=()=>confirmSheet("Quit this game?","The scores will be lost.","Quit",()=>{closeOverlay();endGame();show("hub")});

function openSetup(){
  S.count=CFG.count;ensureSlots();
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="pbBack">← Back</button><h2>Picture Blitz</h2><button class="btn gold" id="pbStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">Players</span><div class="stepper"><button id="pbMinus" aria-label="Fewer players">−</button><output>${CFG.count}</output><button id="pbPlus" aria-label="More players">+</button></div></div>
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li>A photo starts <b>blurred</b> and comes into focus as the clock runs.</li>
      <li>Name the general thing ("spider", "guitar"), not the exact type. The sooner you do, the more points: <b>5 down to 1</b>.</li>
      <li>Wrong guesses are free, but the picture keeps sharpening.</li>
      <li>With phones joined, <b>everyone types on their own phone at the same time</b>. Without phones, pass the phone along.</li><li>Most points at the end wins.</li></ul></div>
    <div class="field"><span class="eyebrow">Rounds</span><div class="seg" id="pbRoundsSeg"></div></div>
    <div class="field"><span class="eyebrow">Seconds per picture</span><div class="seg" id="pbSecsSeg"></div></div>
    <div class="field"><span class="eyebrow">Pictures</span><div class="pbgroups" id="pbSets"></div></div>
    <div class="field"><span class="eyebrow">Voice answers</span><div class="seg" id="pbVoiceSeg"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="pbSoundSeg"></div></div>
    <div class="field" id="pbScreenField"><span class="eyebrow">Screen</span><div class="seg" id="pbScreenSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players and colours</span><div class="hlsetup" id="pbPlayers"></div></div></div>`;
  seg($("pbRoundsSeg"),[1,3,5,8],()=>CFG.rounds,v=>{CFG.rounds=v;saveCfg()},v=>String(v));
  seg($("pbSecsSeg"),[15,20,30],()=>CFG.secs,v=>{CFG.secs=v;saveCfg()},v=>v+"s");
  seg($("pbVoiceSeg"),[true,false],()=>S.prefs.voice,v=>S.prefs.voice=v,onOff);
  seg($("pbSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  screenSeg($("pbScreenSeg"));if(IS_TV)$("pbScreenField").style.display="none";
  SETS.forEach(([id,ic,nm])=>{const b=document.createElement("button");b.textContent=`${ic} ${nm}`;b.setAttribute("aria-pressed",CFG.sets.includes(id));
    b.onclick=()=>{const on=CFG.sets.includes(id);if(on&&CFG.sets.length===1)return;CFG.sets=on?CFG.sets.filter(x=>x!==id):CFG.sets.concat(id);saveCfg();b.setAttribute("aria-pressed",!on)};
    $("pbSets").appendChild(b)});
  $("pbBack").onclick=()=>show("hub");
  $("pbStart").onclick=()=>{ac();startGame()};
  $("pbMinus").onclick=()=>{CFG.count=Math.max(1,CFG.count-1);saveCfg();openSetup()};
  $("pbPlus").onclick=()=>{CFG.count=Math.min(8,CFG.count+1);saveCfg();openSetup()};
  $("pbMinus").disabled=CFG.count<=1;$("pbPlus").disabled=CFG.count>=8;
  renderPlayers();show("pbSetup");
}
function renderPlayers(){
  const w=$("pbPlayers");w.innerHTML="";
  for(let i=0;i<CFG.count;i++){
    const row=document.createElement("div");row.className="prow";
    row.innerHTML=`<button class="swatchbtn" id="pk${i}" aria-label="Player ${i+1} look">${avatarHTML({name:S.names[i]||"P",color:S.colors[i],slot:i})}</button><input id="pbn${i}" maxlength="14" placeholder="Player ${i+1}" value="${esc(S.names[i]||"")}" aria-label="Player ${i+1} name"><span class="note">Player ${i+1}</span>`;
    row.querySelector("input").oninput=e=>{S.names[i]=e.target.value;save()};
    row.querySelector(".swatchbtn").onclick=()=>{S.count=CFG.count;pickColour(i,renderPlayers)};
    w.appendChild(row);
  }
}

const PB={sim:false,phase:"",got:{},fb:{},players:[],turn:0,total:0,item:null,live:false,left:0,timer:null,used:new Set(),img:null,pool:[]};
const stage=(html,cls)=>{$("pbStage").className="pbstage"+(cls?" "+cls:"");$("pbStage").innerHTML=html;$("pbStage").scrollTop=0};
function score(active){$("pbScore").innerHTML=PB.players.map((p,i)=>`<div class="pbchip${active===i?" on":""}" style="--pc:${p.color}">${avatarHTML(p,"sm")}<b>${esc(p.name)}</b><span>${p.pts}</span></div>`).join("")}
function endGame(){clearInterval(PB.timer);PB.live=false;voiceStop();stopConfetti()}
const cur=()=>PB.players[PB.turn%PB.players.length];

/* draw the picture at a given clarity 0..1: a blur that eases off until the photo is sharp */
function draw(cv,img,t){
  const ctx=cv.getContext("2d");
  if(!cv.dataset.drawn){ctx.imageSmoothingEnabled=true;ctx.drawImage(img,0,0,cv.width,cv.height);cv.dataset.drawn="1"}
  if(t>=1){cv.style.filter="none";return}
  const r=Math.max(cv.width,cv.height)*.075*Math.pow(1-t,1.5);
  cv.style.filter=r<.4?"none":`blur(${r.toFixed(1)}px)`;
}
function loadImg(src){return new Promise((res,rej)=>{const im=new Image();im.crossOrigin="anonymous";im.onload=()=>res(im);im.onerror=()=>rej();im.src=src;setTimeout(()=>rej(),9000)})}
const pts=()=>Math.max(1,Math.ceil(PB.left/CFG.secs*5));

function correct(text){
  const h=norm(text);if(!h)return false;
  for(const alt of PB.item.alts){
    const a=norm(alt)||alt.toLowerCase();
    if(h===a)return true;
    if(a.length<3)continue;
    if(heardMatches(text,alt))return true;
  }
  return false;
}
function take(text,typed){
  if(!PB.live)return;
  if(correct(text)){finish(true,"correct");return}
  if(typed){SFX.pass();const f=$("pbFb");if(f)f.textContent="Not quite, keep going"}
}
function onVoice(texts,final){
  if(!PB.live||PB.sim)return;
  for(const t of (final?texts:[texts[0]]))if(correct(t)){finish(true,"correct");return}
}

async function startGame(){
  const LL=window.LINK&&LINK.pull&&LINK.pull(1,8);if(LL)CFG.count=LL.length;
  S.count=CFG.count;ensureSlots();save();saveCfg();
  PB.sim=!!(LL&&LL.length>=2);PB.phase="";
  show("pb");PB.players=[];
  for(let i=0;i<CFG.count;i++)PB.players.push({name:(S.names[i]||"").trim()||`Player ${i+1}`,color:S.colors[i],pts:0,slot:i,pid:(LL&&S.pids&&S.pids[i])||null});
  score();stage(`<div class="pbhead"><h2>Loading pictures…</h2></div>`);
  const ok=await Promise.all(CFG.sets.map(id=>loadPhotos(id)));
  PB.pool=[];CFG.sets.forEach(id=>{if(CATS[id].items&&CATS[id].kind==="photo")CATS[id].items.forEach(it=>{if(it.img&&!SKIP.has(it.a))PB.pool.push(it)})});
  if(PB.pool.length<6){
    stage(`<div class="pbhead"><h2>Pictures didn't load</h2><p>Picture Blitz needs the internet to fetch photos. Check the connection and try again.</p></div><button class="btn gold" id="pbBack2">Back</button>`);
    $("pbBack2").onclick=()=>show("pbSetup");return;
  }
  PB.turn=-1;PB.total=CFG.count*CFG.rounds;PB.used=new Set();
  introContestants(PB.players,"Picture Blitz",()=>{if(!PB.sim){voiceStart(onVoice,$("pbMic"));if(!S.prefs.voice)$("pbMic").innerHTML=""}nextTurn()});
}
function pick(){
  let fresh=PB.pool.filter(i=>!PB.used.has(i.p));
  if(!fresh.length){PB.used=new Set();fresh=PB.pool}
  const it=fresh[Math.floor(Math.random()*fresh.length)];PB.used.add(it.p);return it;
}
async function nextTurn(){
  PB.turn++;if(PB.turn>=PB.total)return results();
  const pi=PB.turn%PB.players.length,p=PB.players[pi],round=Math.floor(PB.turn/PB.players.length)+1;
  $("pbRound").textContent=PB.sim?`Picture ${PB.turn+1} of ${PB.total}`:CFG.rounds>1?`Round ${round} of ${CFG.rounds}`:"";score(PB.sim?undefined:pi);PB.live=false;
  // find a picture that actually loads
  let img=null,tries=0;
  while(!img&&tries++<4){PB.item=pick();try{img=await loadImg(PB.item.img)}catch(e){PB.pool=PB.pool.filter(x=>x!==PB.item)}}
  if(!img){stage(`<div class="pbhead"><h2>Couldn't load a picture</h2><p>Check the internet connection.</p></div><button class="btn gold" id="pbRetry">Try again</button>`);$("pbRetry").onclick=()=>{PB.turn--;nextTurn()};return}
  PB.img=img;
  if(PB.sim){PB.phase="ready";PB.got={};PB.fb={};
    stage(`<div class="pbhead"><span class="eyebrow">Picture ${PB.turn+1} of ${PB.total}</span><h2>Get ready!</h2><p>Everyone guesses at once on their phone · ${CFG.secs} seconds · up to 5 points</p></div>`);
    setTimeout(()=>{if(PB.phase==="ready")playSim()},2800);return}
  stage(`<div class="pbhead"><span class="eyebrow">${avatarHTML(p,"sm")} <span style="color:${p.color}">${esc(p.name)}</span>, you're up${PB.players.length>1?" · pass the phone":""}</span><h2>Ready?</h2><p>${CFG.secs} seconds · up to 5 points · say it or type it</p></div><button class="btn gold" id="pbGo">Show the picture</button>`);
  $("pbGo").onclick=()=>play(pi);
  setTimeout(()=>{const b=$("pbGo");b&&b.focus({preventScroll:true})},40);
}
function play(pi){
  const p=PB.players[pi],img=PB.img;
  stage(`<div class="pbrow"><div class="pbpts" id="pbPts">5 pts</div><div class="pbbar"><i id="pbBar"></i></div></div>
    <div class="pbframe" id="pbFrame"><canvas id="pbCv"></canvas></div>
    <form class="pbinput" id="pbForm" autocomplete="off"><input id="pbIn" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send" placeholder="What is it?" aria-label="Type your answer"><button class="btn gold" type="submit">Guess</button></form>
    <div class="pbfb" id="pbFb"></div>
    <button class="btn ghost" id="pbPass" type="button">Pass</button>`,"play");
  const cv=$("pbCv"),fr=$("pbFrame");
  // size the canvas to the frame, keeping the photo's shape
  const fit=()=>{const r=fr.getBoundingClientRect(),maxW=Math.max(60,r.width-16),maxH=Math.max(60,r.height-16);const k=Math.min(maxW/img.naturalWidth,maxH/img.naturalHeight);
    cv.width=Math.max(60,Math.round(img.naturalWidth*k));cv.height=Math.max(60,Math.round(img.naturalHeight*k));cv.style.width=cv.width+"px";cv.style.height=cv.height+"px"};
  fit();PB.fit=fit;draw(cv,img,0);
  $("pbForm").onsubmit=e=>{e.preventDefault();const v=$("pbIn").value;$("pbIn").value="";if(v.trim())take(v,true);const i=$("pbIn");i&&i.focus({preventScroll:true})};
  $("pbPass").onclick=()=>finish(false,"pass");
  PB.live=true;PB.left=CFG.secs;SFX.go();clearInterval(PB.timer);
  PB.timer=setInterval(()=>{
    if(!$("overlay").hidden)return;
    PB.left=Math.max(0,PB.left-.1);
    const c=$("pbCv");if(!c){clearInterval(PB.timer);return}
    const t=1-PB.left/CFG.secs;draw(c,img,Math.min(1,t/.8));
    $("pbBar").style.width=(PB.left/CFG.secs*100)+"%";$("pbPts").textContent=pts()+" pt"+(pts()===1?"":"s");
    if(PB.left<=0)finish(false,"time");
  },100);
  setTimeout(()=>{const t=$("talkBtn");const el=IS_TV&&t?t:$("pbIn");el&&el.focus({preventScroll:true})},60);
}
function finish(right,why){
  if(!PB.live)return;
  PB.live=false;clearInterval(PB.timer);
  const pi=PB.turn%PB.players.length,p=PB.players[pi];
  const got=right?pts():0;p.pts+=got;score(pi);
  right?(got>=4?SFX.win():SFX.ok()):(why==="time"?SFX.buzz():SFX.pass());
  const last=PB.turn+1>=PB.total;
  stage(`<div class="pbhead"><span class="eyebrow">${avatarHTML(p,"sm")} <span style="color:${p.color}">${esc(p.name)}</span></span><h2>${right?"Correct!":why==="time"?"Time's up!":"Not this time"}</h2></div>
    <div class="pbframe" id="pbFrame"><canvas id="pbCv"></canvas></div>
    <p class="pbans">${esc(PB.item.a)}</p>
    <div class="pbbig">${right?"+"+got:"+0"}</div>
    <div class="row">${right?"":`<button class="btn" id="pbRight" type="button">We got it right</button>`}<button class="btn gold" id="pbNext" type="button">${last?"See results":PB.players.length>1?"Next player":"Next picture"}</button></div>`);
  const cv=$("pbCv"),fr=$("pbFrame"),img=PB.img;
  const r=fr.getBoundingClientRect(),k=Math.min(Math.max(60,r.width-16)/img.naturalWidth,Math.max(60,r.height-16)/img.naturalHeight);
  cv.width=Math.max(60,Math.round(img.naturalWidth*k));cv.height=Math.max(60,Math.round(img.naturalHeight*k));cv.style.width=cv.width+"px";cv.style.height=cv.height+"px";draw(cv,img,1);
  if(right&&got>=4)confetti([p.color,"#ffc94a","#fffdf6"]);
  $("pbNext").onclick=()=>{stopConfetti();nextTurn()};
  const rb=$("pbRight");if(rb)rb.onclick=()=>{p.pts+=3;score(pi);SFX.ok();rb.remove();$("pbStage").querySelector(".pbbig").textContent="+3"};
  setTimeout(()=>{const b=$("pbNext");b&&b.focus({preventScroll:true})},60);
}

/* ---------- everyone at once, on their own phones ---------- */
const byPid=pid=>PB.players.find(p=>p.pid===pid);
const gotHTML=()=>`<div class="pbgot">${PB.players.map(p=>{const g=PB.got[p.pid];return `<span class="${g?"ok":""}" style="--pc:${p.color}">${esc(p.name)} ${g?"✓ +"+g:"…"}</span>`}).join("")}</div>`;
function playSim(){
  const img=PB.img;PB.phase="play";
  stage(`<div class="pbrow"><div class="pbpts" id="pbPts">5 pts</div><div class="pbbar"><i id="pbBar"></i></div></div>
    <div class="pbframe" id="pbFrame"><canvas id="pbCv"></canvas></div>
    <div id="pbGotBox">${gotHTML()}</div>
    <div class="pbfb">Type your guess on your phone</div>`,"play");
  const cv=$("pbCv"),fr=$("pbFrame");
  const fit=()=>{const r=fr.getBoundingClientRect(),maxW=Math.max(60,r.width-16),maxH=Math.max(60,r.height-16);const k=Math.min(maxW/img.naturalWidth,maxH/img.naturalHeight);
    cv.width=Math.max(60,Math.round(img.naturalWidth*k));cv.height=Math.max(60,Math.round(img.naturalHeight*k));cv.style.width=cv.width+"px";cv.style.height=cv.height+"px"};
  fit();PB.fit=fit;draw(cv,img,0);
  PB.live=true;PB.left=CFG.secs;SFX.go();clearInterval(PB.timer);
  PB.timer=setInterval(()=>{
    if(!$("overlay").hidden)return;
    PB.left=Math.max(0,PB.left-.1);
    const c=$("pbCv");if(!c){clearInterval(PB.timer);return}
    const t=1-PB.left/CFG.secs;draw(c,img,Math.min(1,t/.8));
    $("pbBar").style.width=(PB.left/CFG.secs*100)+"%";$("pbPts").textContent=pts()+" pt"+(pts()===1?"":"s");
    if(PB.left<=0)finishSim("time");
  },100);
}
function simText(p,v){
  if(!PB.sim||!PB.live||PB.phase!=="play")return;
  const me=byPid(p.pid);if(!me||PB.got[me.pid])return;
  if(!String(v||"").trim())return;
  if(correct(v)){
    const g=pts();PB.got[me.pid]=g;me.pts+=g;score();SFX.ok();
    const b=$("pbGotBox");if(b)b.innerHTML=gotHTML();
    if(PB.players.every(q=>PB.got[q.pid]))setTimeout(()=>finishSim("all"),700);
  }else{PB.fb[me.pid]="Not quite, keep going";SFX.pass()}
}
function finishSim(why){
  if(!PB.live)return;PB.live=false;PB.phase="result";clearInterval(PB.timer);
  const n=PB.players.filter(q=>PB.got[q.pid]).length,last=PB.turn+1>=PB.total;
  why==="time"?(n?SFX.ok():SFX.buzz()):SFX.win();
  stage(`<div class="pbhead"><h2>${why==="all"?"Everyone got it!":why==="time"?"Time's up!":"Done"}</h2></div>
    <div class="pbframe" id="pbFrame"><canvas id="pbCv"></canvas></div>
    <p class="pbans">${esc(PB.item.a)}</p>
    ${gotHTML()}
    <div class="row"><button class="btn gold" id="pbNext" type="button">${last?"See results":"Next picture"}</button></div>`);
  const cv=$("pbCv"),fr=$("pbFrame"),img=PB.img;
  const r=fr.getBoundingClientRect(),k=Math.min(Math.max(60,r.width-16)/img.naturalWidth,Math.max(60,r.height-16)/img.naturalHeight);
  cv.width=Math.max(60,Math.round(img.naturalWidth*k));cv.height=Math.max(60,Math.round(img.naturalHeight*k));cv.style.width=cv.width+"px";cv.style.height=cv.height+"px";draw(cv,img,1);
  $("pbNext").onclick=()=>{stopConfetti();nextTurn()};
  setTimeout(()=>{const b=$("pbNext");b&&b.focus({preventScroll:true})},60);
}
function sceneFor(p){
  const sc=PB.players.map(q=>({n:q.name,s:q.pts,c:q.color,on:0,pid:q.pid,av:(()=>{try{return avatarSrc(q.slot)}catch(e){return ""}})()}));
  const me=byPid(p.pid),e=`Picture ${Math.min(PB.turn+1,PB.total)} of ${PB.total}`;
  const base={th:"pb",scores:sc,btns:[],sn:PB.turn*10+({ready:1,play:2,result:3,final:4}[PB.phase]||0),me:1};
  if(!me)return {...base,head:{e:"Picture Blitz",t:"Watch the TV",s:"You'll be in the next game"}};
  if(PB.phase==="ready")return {...base,head:{e,t:"Get ready!",s:"Everyone guesses at once"}};
  if(PB.phase==="play"){
    const g=PB.got[me.pid];
    if(g)return {...base,head:{e,t:"Got it! +"+g,s:"Waiting for the others"},clock:String(Math.ceil(PB.left))};
    return {...base,head:{e,t:"What is it?",s:pts()+" pt"+(pts()===1?"":"s")+" and falling. Look at the TV"},clock:String(Math.ceil(PB.left)),fb:PB.fb[me.pid]||"",inp:{ph:"What is it?"}};
  }
  if(PB.phase==="result"){const g=PB.got[me.pid];return {...base,head:{e,t:"It was "+PB.item.a,s:g?"You scored +"+g:"No points this time"},btns:[{t:PB.turn+1>=PB.total?"See results":"Next picture",cls:"gold",a:"next"}]}}
  if(PB.phase==="final"){const o=PB.players.slice().sort((a,b)=>b.pts-a.pts);return {...base,head:{e:"Final",t:o[0].name+" wins!",s:o.map(q=>q.name+" "+q.pts).join("  ·  ")}}}
  return {...base,head:{e:"Picture Blitz",t:"Watch the TV",s:""}};
}
function simAct(p,m){if(PB.sim&&PB.phase==="result"&&m.a==="next"){const b=$("pbNext");b&&b.click()}}
const simActive=()=>PB.sim&&!!$("pb")&&!$("pb").hidden;

function results(){
  PB.live=false;PB.phase="final";score();$("pbRound").textContent="";SFX.win();
  { const o=PB.players.slice().sort((a,b)=>b.pts-a.pts),tp=o[0].pts; window.LB&&LB.record("pb",PB.players.map(p=>({name:p.name,color:p.color,score:p.pts,win:p.pts===tp&&PB.players.length>1}))); }
  const order=PB.players.slice().sort((a,b)=>b.pts-a.pts),top=order[0].pts,winners=order.filter(p=>p.pts===top),solo=PB.players.length===1;
  stage(`<div class="pbhead"><span class="eyebrow">Picture Blitz · final</span><h2>${solo?`${esc(order[0].name)} scored ${top}`:winners.length>1?"It's a draw!":`${esc(winners[0].name)} wins!`}</h2></div>
    <div class="ntrank">${order.map(p=>`<div class="r${p.pts===top&&!solo?" win":""}">${avatarHTML(p,"")}<b style="color:${p.color}">${esc(p.name)}</b><em>${p.pts}</em></div>`).join("")}</div>
    <div class="row"><button class="btn" id="pbMenu">Game Night menu</button><button class="btn gold" id="pbAgain">Play again</button></div>`);
  confetti(winners.map(w=>w.color).concat(["#ffc94a","#fffdf6"]));
  $("pbMenu").onclick=()=>{stopConfetti();endGame();show("hub")};
  $("pbAgain").onclick=()=>{stopConfetti();PB.phase="";PB.players.forEach(p=>p.pts=0);PB.turn=-1;PB.used=new Set();score();nextTurn()};
  setTimeout(()=>{const b=$("pbAgain");b&&b.focus({preventScroll:true})},60);
}
window.__PB={PB,CFG,take,correct,sceneFor,act:simAct,text:simText,active:simActive};
})();
