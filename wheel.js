/* =================== WHEEL OF FORTUNE ===================
   Spin, call a consonant for cash, buy a vowel for $250, and solve the puzzle to bank your round money.
   Letters come from the on-screen keys (works with a TV remote) or by voice; solve by typing or saying it. */
(function(){
const IS_TV=/GameNightTV/.test(navigator.userAgent);
const VOWELS="AEIOU",ALL="ABCDEFGHIJKLMNOPQRSTUVWXYZ",VCOST=250;
const PUZ=(window.WF_RAW||[]).map(l=>{const i=l.indexOf("|");return {cat:l.slice(0,i),text:l.slice(i+1).toUpperCase()}}).filter(p=>p.text);
const SEGS=[300,500,"BANKRUPT",650,400,800,"LOSE A TURN",350,900,450,600,"BANKRUPT",550,700,250,1000,500,750,"LOSE A TURN",2500];
const SEGCOL=["#e0457b","#3b9dff","#111","#ffd23f","#3ddc84","#ff8a3d","#fffdf6","#a259ff","#ff5fb0","#2bc4c4","#ffb020","#111","#6c8cff","#e0457b","#3ddc84","#ffd23f","#ff8a3d","#3b9dff","#fffdf6","#f0c419"];
const CFG={count:3,rounds:3};
try{const j=JSON.parse(localStorage.getItem("gn.wf")||"null");if(j)Object.assign(CFG,j)}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.wf",JSON.stringify(CFG))}catch(e){}};
const $$=s=>document.querySelector(s);

const css=`
#wf{gap:6px;overflow:hidden}
.wfscore{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;flex:none}
.wfchip{display:flex;align-items:center;gap:8px;padding:5px 14px 5px 8px;border-radius:999px;background:var(--stage-2);border:2px solid var(--line)}
.wfchip.on{border-color:var(--pc,var(--gold));box-shadow:0 0 18px -6px var(--pc,var(--gold))}
.wfchip .av{--s:28px;padding:2px}.wfchip b{font-weight:800}
.wfchip .rc{font-family:var(--f-clock);color:var(--gold)}.wfchip .tt{font-family:var(--f-clock);color:var(--muted);font-size:.8em}
.wfmain{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:clamp(8px,1.6vw,22px);align-items:center}
.portrait .wfmain{grid-template-columns:1fr;grid-template-rows:auto auto;align-content:start;overflow-y:auto}
.wfleft{display:flex;flex-direction:column;gap:clamp(6px,1.4vh,12px);min-height:0;min-width:0;align-items:center;justify-content:center}
.wfcat{font-family:var(--f-display);font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);font-size:clamp(.9rem,2.6vh,1.4rem)}
.wfboard{background:#0b6b43;border:4px solid #d4a017;border-radius:16px;padding:clamp(8px,1.6vh,16px);display:flex;flex-direction:column;gap:var(--tg,6px);align-items:center;justify-content:center;width:100%;max-width:min(1100px,100%)}
.wfrow{display:flex;gap:var(--tg,6px);justify-content:center}
.wftile{width:var(--tw,44px);height:calc(var(--tw,44px)*1.25);border-radius:5px;background:#fffdf6;display:grid;place-items:center;font-family:var(--f-display);font-weight:900;font-size:calc(var(--tw,44px)*.72);color:#10213a;line-height:1}
.wftile.hid{background:#fffdf6;color:transparent}
.wftile.sp{background:transparent}
.wftile.pn{background:transparent;color:#fffdf6}
.wftile.flip{animation:wfflip .5s ease-out}
@keyframes wfflip{0%{transform:rotateX(90deg);background:#ffd23f}60%{background:#ffd23f}100%{transform:none}}
.wfmsg{min-height:1.5em;font-weight:800;text-align:center;font-size:clamp(.95rem,2.6vh,1.3rem)}
.wfmsg.bad{color:var(--hot)}.wfmsg.ok{color:#3de0a4}
.wfctl{display:flex;flex-direction:column;gap:8px;align-items:center;width:100%}
.wfbtns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.wfkeys{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:min(900px,100%)}
.wfkeys button{width:clamp(34px,5.4vw,56px);height:clamp(36px,6.4vh,52px);border-radius:10px;background:var(--stage-3);border:1px solid var(--line);font-family:var(--f-display);font-weight:900;font-size:clamp(1rem,2.8vh,1.4rem)}
.wfkeys button.v{border-color:#ff8a3d}
.wfkeys button[disabled]{opacity:.22}
.wfsolve{display:flex;gap:8px;width:min(640px,100%)}
.wfsolve input{flex:1;min-width:0;font-size:1.1rem;padding:.7em 1em;border-radius:12px;background:var(--stage-3);border:2px solid var(--line);color:var(--ink);text-transform:uppercase}
.wfwheelbox{position:relative;width:clamp(150px,min(36vw,56vh),430px);aspect-ratio:1}
.portrait .wfwheelbox{width:clamp(110px,21vh,210px);margin:0 auto}
.portrait .wfchip .tt{display:none}.portrait .wfkeys button{width:clamp(28px,8.6vw,40px);height:clamp(32px,5.2vh,42px)}
.wfdisc{width:100%;height:100%;transition:transform 4.2s cubic-bezier(.12,.62,.12,1)}
.wfdisc svg{width:100%;height:100%;display:block;filter:drop-shadow(0 8px 20px rgba(0,0,0,.5))}
.wfptr{position:absolute;left:50%;top:-3%;transform:translateX(-50%);width:9%;z-index:2;filter:drop-shadow(0 3px 4px rgba(0,0,0,.5))}
.wfbig{font-family:var(--f-display);font-weight:900;font-size:clamp(1.8rem,6vh,3.4rem);color:var(--gold);line-height:1}
.game.live .wfart{width:64px;height:64px;border-radius:50%;background:conic-gradient(#e0457b 0 18deg,#3b9dff 0 36deg,#111 0 54deg,#ffd23f 0 72deg,#3ddc84 0 90deg,#ff8a3d 0 108deg,#fffdf6 0 126deg,#a259ff 0 144deg,#ff5fb0 0 162deg,#2bc4c4 0 180deg,#ffb020 0 198deg,#111 0 216deg,#6c8cff 0 234deg,#e0457b 0 252deg,#3ddc84 0 270deg,#ffd23f 0 288deg,#ff8a3d 0 306deg,#3b9dff 0 324deg,#fffdf6 0 342deg,#f0c419 0);border:4px solid #fffdf6}
.portrait #wf{padding-top:max(8px,calc(var(--sa-t) + var(--blur-gap)));padding-bottom:max(8px,var(--sa-b))}
.portrait #wf .floorbar{gap:8px}.portrait #wf .brand{font-size:1.05rem}.portrait #wf .brand small{display:none}.portrait #wf .floorbar .btn{padding:.45em 1em;font-size:.85rem}
.portrait .wfscore{flex-wrap:nowrap;overflow:hidden;gap:5px}.portrait .wfchip{padding:4px 8px 4px 5px;gap:5px}.portrait .wfchip b{font-size:.78rem;max-width:4.6em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.portrait .wfchip .av{--s:22px}
#wfMic{min-height:1.2em}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

const hub=document.querySelector(".games");
const tile=document.createElement("button");tile.className="game live";tile.id="playWF";
tile.innerHTML=`<span class="art"><span class="wfart"></span><span class="pill">Play</span></span><h2>Wheel of Fortune</h2><p>Spin, solve the puzzle, bank the cash.</p>`;
hub.appendChild(tile);hub.classList.remove("five","six");hub.classList.add("seven");
const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="wfSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="wf";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>WHEEL OF FORTUNE</small></span><span class="spacer"></span><span class="count" id="wfRound"></span><button class="btn ghost" id="wfQuit">Quit</button></div>
<div class="wfscore" id="wfScore"></div><div class="wfmain" id="wfMain"></div><div class="mic" id="wfMic"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("wfQuit").onclick=()=>confirmSheet("Quit this game?","The scores will be lost.","Quit",()=>{closeOverlay();endGame();show("hub")});

function openSetup(){
  S.count=CFG.count;ensureSlots();
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="wfBack">← Back</button><h2>Wheel of Fortune</h2><button class="btn gold" id="wfStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">Players</span><div class="stepper"><button id="wfMinus" aria-label="Fewer players">−</button><output>${CFG.count}</output><button id="wfPlus" aria-label="More players">+</button></div></div>
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li><b>Spin</b> the wheel, then call a <b>consonant</b>. Each one in the puzzle wins the spun amount.</li>
      <li>Buy a <b>vowel</b> for <b>$${VCOST}</b>. Then spin again, buy, or <b>solve</b>.</li>
      <li><b>Bankrupt</b> wipes your round cash. A wrong letter or <b>Lose a turn</b> passes play on.</li>
      <li>Solve it to bank your round cash (at least $1,000). Most money after the last puzzle wins.</li></ul></div>
    <div class="field"><span class="eyebrow">Puzzles</span><div class="seg" id="wfRoundsSeg"></div></div>
    <div class="field"><span class="eyebrow">Voice answers</span><div class="seg" id="wfVoiceSeg"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="wfSoundSeg"></div></div>
    <div class="field" id="wfScreenField"><span class="eyebrow">Screen</span><div class="seg" id="wfScreenSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players and colours</span><div class="hlsetup" id="wfPlayers"></div></div></div>`;
  seg($("wfRoundsSeg"),[1,3,5],()=>CFG.rounds,v=>{CFG.rounds=v;saveCfg()},v=>String(v));
  seg($("wfVoiceSeg"),[true,false],()=>S.prefs.voice,v=>S.prefs.voice=v,onOff);
  seg($("wfSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  screenSeg($("wfScreenSeg"));if(IS_TV)$("wfScreenField").style.display="none";
  $("wfBack").onclick=()=>show("hub");$("wfStart").onclick=()=>{ac();startGame()};
  $("wfMinus").onclick=()=>{CFG.count=Math.max(1,CFG.count-1);saveCfg();openSetup()};
  $("wfPlus").onclick=()=>{CFG.count=Math.min(6,CFG.count+1);saveCfg();openSetup()};
  $("wfMinus").disabled=CFG.count<=1;$("wfPlus").disabled=CFG.count>=6;
  renderPlayers();show("wfSetup");
}
function renderPlayers(){
  const w=$("wfPlayers");w.innerHTML="";
  for(let i=0;i<CFG.count;i++){
    const row=document.createElement("div");row.className="prow";
    row.innerHTML=`<button class="swatchbtn" id="pk${i}" aria-label="Player ${i+1} look">${avatarHTML({name:S.names[i]||"P",color:S.colors[i],slot:i})}</button><input id="wfn${i}" maxlength="14" placeholder="Player ${i+1}" value="${esc(S.names[i]||"")}" aria-label="Player ${i+1} name"><span class="note">Player ${i+1}</span>`;
    row.querySelector("input").oninput=e=>{S.names[i]=e.target.value;save()};
    row.querySelector(".swatchbtn").onclick=()=>{S.count=CFG.count;pickColour(i,renderPlayers)};
    w.appendChild(row);
  }
}

/* ---------- wheel ---------- */
// text must read outward along each segment: rotate the whole label with its segment
function wheelHTML(){
  const n=SEGS.length,a=360/n,R=100;let s="";
  SEGS.forEach((v,i)=>{
    const a0=(i*a-90)*Math.PI/180,a1=((i+1)*a-90)*Math.PI/180;
    const bad=v==="BANKRUPT",lose=v==="LOSE A TURN",dark=SEGCOL[i]==="#111";
    const lab=bad?"BANKRUPT":lose?"LOSE TURN":"$"+v;
    s+=`<path d="M0,0L${R*Math.cos(a0)},${R*Math.sin(a0)}A${R},${R} 0 0 1 ${R*Math.cos(a1)},${R*Math.sin(a1)}Z" fill="${SEGCOL[i]}" stroke="#1a1636" stroke-width=".8"/>
    <g transform="rotate(${(i+.5)*a-90})"><text x="${R*.9}" y="0" transform="rotate(180 ${R*.9} 0)" font-size="${bad||lose?5.4:7.4}" font-weight="900" font-family="Arial Black,Arial,sans-serif" text-anchor="start" dominant-baseline="middle" fill="${dark?"#fff":"#1a1636"}">${lab}</text></g>`;
  });
  return `<svg viewBox="-104 -104 208 208"><circle r="103" fill="#d4a017"/>${s}<circle r="9" fill="#1a1636" stroke="#d4a017" stroke-width="2"/></svg>`;
}

/* ---------- state ---------- */
const W={players:[],turn:0,round:0,puz:null,rev:new Set(),called:new Set(),phase:"",val:0,rot:0,used:new Set(),busy:false};
const cur=()=>W.players[W.turn%W.players.length];
const letterCount=l=>W.puz.text.split("").filter(c=>c===l).length;
const puzLetters=()=>new Set(W.puz.text.split("").filter(c=>c>="A"&&c<="Z"));
function endGame(){W.phase="";W.busy=false;voiceStop();stopConfetti()}
const $m=()=>$("wfMsg");
function msg(t,k){const el=$m();if(el){el.className="wfmsg"+(k?" "+k:"");el.textContent=t}}

function score(){
  $("wfScore").innerHTML=W.players.map((p,i)=>`<div class="wfchip${i===W.turn%W.players.length?" on":""}" style="--pc:${p.color}">${avatarHTML(p,"sm")}<b>${esc(p.name)}</b><span class="rc">$${p.rc.toLocaleString("en-AU")}</span><span class="tt">bank $${p.total.toLocaleString("en-AU")}</span></div>`).join("");
}

/* board */
function layout(){
  const words=W.puz.text.split(" "),lines=[];let line="";
  const max=IS_TV||!document.body.classList.contains("portrait")?13:9;
  words.forEach(w=>{if(!line)line=w;else if((line+" "+w).length<=max)line+=" "+w;else{lines.push(line);line=w}});
  if(line)lines.push(line);return lines;
}
function boardHTML(reveal){
  const lines=layout();
  return `<div class="wfboard" id="wfBoard">${lines.map(l=>`<div class="wfrow">${l.split("").map(c=>{
    if(c===" ")return `<span class="wftile sp"></span>`;
    if(c<"A"||c>"Z")return `<span class="wftile pn">${esc(c)}</span>`;
    const on=reveal||W.rev.has(c);return `<span class="wftile ${on?"":"hid"}" data-l="${c}">${on?c:c}</span>`}).join("")}</div>`).join("")}</div>`;
}
function sizeBoard(){
  const b=$("wfBoard");if(!b)return;const lines=layout();const maxLen=Math.max(...lines.map(l=>l.length));
  const parent=b.parentElement.getBoundingClientRect();
  const gap=6,w=Math.max(200,parent.width-40),tw=Math.floor((w-(maxLen-1)*gap)/maxLen);
  const hAvail=Math.max(120,window.innerHeight*(document.body.classList.contains("portrait")?.3:.36));
  const th=Math.floor((hAvail-(lines.length-1)*gap)/lines.length/1.25);
  b.style.setProperty("--tw",Math.max(18,Math.min(tw,th,84))+"px");b.style.setProperty("--tg",gap+"px");
}
addEventListener("resize",()=>{if(!$("wf").hidden)sizeBoard()});

function mainHTML(ctl){
  return `<div class="wfleft"><span class="wfcat">${esc(W.puz.cat)}</span>${boardHTML(false)}<div class="wfmsg" id="wfMsg"></div><div class="wfctl" id="wfCtl">${ctl||""}</div></div>
  <div class="wfwheelbox"><svg class="wfptr" viewBox="0 0 20 24"><path d="M10 24L0 2Q10-4 20 2Z" fill="#fffdf6" stroke="#1a1636" stroke-width="1.5"/></svg><div class="wfdisc" id="wfDisc" style="transform:rotate(${W.rot}deg);transition:none">${wheelHTML()}</div></div>`;
}

/* ---------- flow ---------- */
function startGame(){
  S.count=CFG.count;ensureSlots();save();saveCfg();
  W.players=[];for(let i=0;i<CFG.count;i++)W.players.push({name:(S.names[i]||"").trim()||`Player ${i+1}`,color:S.colors[i],slot:i,rc:0,total:0});
  W.round=0;W.used=new Set();W.turn=-1;
  show("wf");score();$("wfMain").innerHTML="";
  introContestants(W.players,"Wheel of Fortune",()=>{voiceStart(onVoice,$("wfMic"));if(!S.prefs.voice)$("wfMic").innerHTML="";nextPuzzle()});
}
function pickPuzzle(){
  let f=PUZ.filter(p=>!W.used.has(p.text));if(!f.length){W.used=new Set();f=PUZ}
  const p=f[Math.floor(Math.random()*f.length)];W.used.add(p.text);return p;
}
function nextPuzzle(){
  W.round++;if(W.round>CFG.rounds)return results();
  W.puz=pickPuzzle();W.rev=new Set();W.called=new Set();W.players.forEach(p=>p.rc=0);W.rot=W.rot%360;
  W.turn=(W.round-1)%W.players.length;
  $("wfRound").textContent=CFG.rounds>1?`Puzzle ${W.round} of ${CFG.rounds}`:"";
  $("wfMain").innerHTML=mainHTML("");sizeBoard();turnStart(true);
}
function turnStart(first){
  const p=cur();score();W.phase="act";W.busy=false;
  const noCons=![...puzLetters()].some(l=>!VOWELS.includes(l)&&!W.called.has(l));
  const noVow=![...puzLetters()].some(l=>VOWELS.includes(l)&&!W.called.has(l));
  const canV=p.rc>=VCOST&&!noVow;
  $("wfCtl").innerHTML=`<div class="wfbtns"><button class="btn gold" id="wfSpin"${noCons?" disabled":""}>Spin the wheel</button><button class="btn" id="wfVowel"${canV?"":" disabled"}>Buy a vowel · $${VCOST}</button><button class="btn" id="wfSolveB">Solve</button></div>`;
  msg(`${p.name}${first?", you're up":""}: spin, buy a vowel, or solve`);
  $("wfSpin").onclick=spin;$("wfVowel").onclick=()=>keys("vowel");$("wfSolveB").onclick=solveOpen;
  setTimeout(()=>{const b=$("wfSpin")&&!$("wfSpin").disabled?$("wfSpin"):$("wfSolveB");b&&b.focus({preventScroll:true})},40);
}
function nextPlayer(why){
  W.turn++;W.phase="";W.busy=true;
  setTimeout(()=>{if($("wf").hidden)return;turnStart(false);if(why)msg(why+" "+cur().name+"'s turn.")},1300);
}
function spin(){
  if(W.phase!=="act"||W.busy)return;W.phase="spin";W.busy=true;
  const n=SEGS.length,a=360/n,idx=Math.floor(Math.random()*n),jit=(Math.random()-.5)*.7;
  const base=W.rot-(((W.rot%360)+360)%360);
  let fin=base+360*5+(((360-(idx+.5+jit)*a)%360)+360)%360;if(fin<=W.rot)fin+=360;
  $("wfCtl").innerHTML="";msg("Spinning…");
  const d=$("wfDisc");d.style.transition="none";d.style.transform=`rotate(${W.rot}deg)`;void d.offsetWidth;
  d.style.transition="transform 4.2s cubic-bezier(.12,.62,.12,1)";d.style.transform=`rotate(${fin}deg)`;W.rot=fin;
  let t=0,step=70;const tick=()=>{if(W.phase!=="spin")return;SFX.tick();t+=step;step*=1.12;if(t<4100)setTimeout(tick,step)};tick();
  setTimeout(()=>landed(SEGS[idx]),4400);
}
function landed(v){
  if(W.phase!=="spin")return;const p=cur();
  if(v==="BANKRUPT"){SFX.buzz();p.rc=0;score();msg(`${p.name} goes BANKRUPT!`,"bad");nextPlayer("");return}
  if(v==="LOSE A TURN"){SFX.pass();msg(`Lose a turn, ${p.name}!`,"bad");nextPlayer("");return}
  W.val=v;SFX.ok();keys("cons");
}
function keys(kind){
  const vow=kind==="vowel",p=cur();
  if(vow){if(p.rc<VCOST)return;}
  W.phase=vow?"vowel":"cons";
  const letters=ALL.split("").filter(l=>vow?VOWELS.includes(l):!VOWELS.includes(l));
  $("wfCtl").innerHTML=`<div class="wfkeys">${letters.map(l=>`<button data-l="${l}" class="${vow?"v":""}"${W.called.has(l)?" disabled":""}>${l}</button>`).join("")}</div>${vow?`<button class="btn ghost" id="wfCancelV">Back</button>`:""}`;
  msg(vow?`Pick a vowel for $${VCOST}`:`$${W.val.toLocaleString("en-AU")}: pick a consonant`);
  $("wfCtl").querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>callLetter(b.dataset.l));
  const cv=$("wfCancelV");if(cv)cv.onclick=()=>turnStart(false);
  setTimeout(()=>{const f=$("wfCtl").querySelector("[data-l]:not([disabled])");f&&f.focus({preventScroll:true})},40);
}
function callLetter(l){
  if(W.phase!=="cons"&&W.phase!=="vowel")return;
  if(W.called.has(l)||(W.phase==="vowel")!==VOWELS.includes(l))return;
  const p=cur(),vow=W.phase==="vowel";
  W.called.add(l);W.phase="reveal";W.busy=true;$("wfCtl").innerHTML="";
  if(vow)p.rc-=VCOST;
  const n=letterCount(l);
  if(!n){SFX.buzz();score();msg(`No ${l}.`,"bad");nextPlayer("");return}
  const gain=vow?0:W.val*n;p.rc+=gain;
  msg(`${n} × ${l}${vow?"":` = $${gain.toLocaleString("en-AU")}`}`,"ok");
  const tiles=[...$("wfBoard").querySelectorAll(`.wftile[data-l="${l}"]`)];
  tiles.forEach((t,i)=>setTimeout(()=>{t.classList.remove("hid");t.classList.add("flip");SFX.ok()},i*420));
  W.rev.add(l);score();
  setTimeout(()=>{
    if([...puzLetters()].every(x=>W.rev.has(x)))return solved(p,"The board is complete!");
    turnStart(false);msg(`${p.name}: spin, buy a vowel, or solve`);
  },n*420+700);
}
function solveOpen(){
  if(W.phase!=="act"&&W.phase!=="cons"&&W.phase!=="vowel")return;
  W.phase="solve";
  $("wfCtl").innerHTML=`<form class="wfsolve" id="wfForm" autocomplete="off"><input id="wfIn" type="text" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" enterkeyhint="send" placeholder="Type the puzzle" aria-label="Solve the puzzle"><button class="btn gold" type="submit">Solve</button></form><button class="btn ghost" id="wfCancelS" type="button">Back</button>`;
  msg(`${cur().name}: say or type the whole puzzle`);
  $("wfForm").onsubmit=e=>{e.preventDefault();trySolve($("wfIn").value)};
  $("wfCancelS").onclick=()=>turnStart(false);
  setTimeout(()=>{const i=$("wfIn");i&&i.focus({preventScroll:true})},40);
}
function same(text){
  const a=norm(text),b=norm(W.puz.text);if(!a)return false;if(a===b)return true;
  return lev(a,b)<=Math.floor(b.length*.07);
}
function trySolve(text){
  if(!["act","cons","vowel","solve"].includes(W.phase)||W.busy)return;
  if(!norm(text))return;
  if(same(text))return solved(cur(),"Solved!");
  SFX.buzz();W.phase="reveal";W.busy=true;$("wfCtl").innerHTML="";msg("Not quite!","bad");nextPlayer("");
}
function solved(p,why){
  W.phase="done";W.busy=false;SFX.win();
  const bonus=p.rc<1000?1000:p.rc;p.total+=bonus;
  W.rev=new Set(ALL.split(""));
  $("wfBoard").querySelectorAll(".wftile.hid").forEach(t=>{t.classList.remove("hid");t.classList.add("flip")});
  W.players.forEach(x=>{if(x!==p)x.rc=0});const old=p.rc;p.rc=0;score();
  confetti([p.color,"#ffc94a","#fffdf6"]);
  const last=W.round>=CFG.rounds;
  msg(`${why} ${p.name} banks $${bonus.toLocaleString("en-AU")}${old<1000?" (minimum round prize)":""}`,"ok");
  $("wfCtl").innerHTML=`<button class="btn gold" id="wfNext">${last?"See results":"Next puzzle"}</button>`;
  $("wfNext").onclick=()=>{stopConfetti();nextPuzzle()};
  setTimeout(()=>{const b=$("wfNext");b&&b.focus({preventScroll:true})},60);
}
function results(){
  W.phase="";score();$("wfRound").textContent="";SFX.win();
  const order=W.players.slice().sort((a,b)=>b.total-a.total),top=order[0].total,winners=order.filter(p=>p.total===top),solo=W.players.length===1;
  window.LB&&LB.record("wf",W.players.map(p=>({name:p.name,color:p.color,score:p.total,win:p.total===top&&!solo})));
  $("wfMain").innerHTML=`<div class="wfleft" style="grid-column:1/-1"><span class="wfcat">Wheel of Fortune · final</span>
    <div class="wfbig">${solo?`${esc(order[0].name)} won $${top.toLocaleString("en-AU")}`:winners.length>1?"It's a draw!":`${esc(winners[0].name)} wins $${top.toLocaleString("en-AU")}!`}</div>
    <div class="ntrank">${order.map(p=>`<div class="r${p.total===top&&!solo?" win":""}">${avatarHTML(p,"")}<b style="color:${p.color}">${esc(p.name)}</b><em>$${p.total.toLocaleString("en-AU")}</em></div>`).join("")}</div>
    <div class="wfbtns"><button class="btn" id="wfMenu">Game Night menu</button><button class="btn gold" id="wfAgain">Play again</button></div></div>`;
  confetti(winners.map(w=>w.color).concat(["#ffc94a","#fffdf6"]));
  $("wfMenu").onclick=()=>{stopConfetti();endGame();show("hub")};
  $("wfAgain").onclick=()=>{stopConfetti();W.players.forEach(p=>{p.total=0;p.rc=0});W.round=0;W.used=new Set();nextPuzzle()};
  setTimeout(()=>{const b=$("wfAgain");b&&b.focus({preventScroll:true})},60);
}

/* ---------- voice ---------- */
const SPOKEN={ay:"A",bee:"B",be:"B",see:"C",sea:"C",dee:"D",eff:"F",gee:"G",aitch:"H",eye:"I",jay:"J",kay:"K",ell:"L",el:"L",em:"M",en:"N",oh:"O",pee:"P",queue:"Q",cue:"Q",are:"R",ess:"S",tee:"T",tea:"T",you:"U",vee:"V",ex:"X",why:"Y",wye:"Y",zed:"Z",zee:"Z"};
function letterOf(text){
  let t=norm(text).replace(/^(the )?letter /,"").trim();
  if(/^[a-z]$/.test(t))return t.toUpperCase();
  if(SPOKEN[t])return SPOKEN[t];
  return null;
}
function onVoice(texts,final){
  if(!W.puz||W.busy&&W.phase!=="done")return;
  for(const t of (final?texts:[texts[0]])){
    if(["act","cons","vowel","solve"].includes(W.phase)&&same(t)){solved(cur(),"Solved!");return}
    if(W.phase==="act"&&/\bspin\b/.test(norm(t))){spin();return}
    if(W.phase==="cons"||W.phase==="vowel"){const l=letterOf(t);if(l){callLetter(l);return}}
  }
}
window.__WF={PUZ,W,CFG,callLetter,trySolve,spin};
})();
