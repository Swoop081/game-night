/* =================== BULLSHIT METER ===================
   3 to 8 players on phones. A very general "how many" question appears. Everyone types their honest answer on their
   phone, except one randomly chosen player (only they are told) who types a believable lie.
   Then everyone votes for who they think the liar is.
   - If every detective picks the liar: each detective scores 2.
   - Otherwise the liar scores 1 for every detective, even those who guessed right. */
(function(){
const QS=window.BM_QS||[];
const CFG={rounds:8,ask:45,vote:30};
try{const j=JSON.parse(localStorage.getItem("gn.bm")||"null");if(j)Object.assign(CFG,j)}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.bm",JSON.stringify(CFG))}catch(e){}};
const FONT='"Oxanium","Big Shoulders Display",Impact,sans-serif';
const css=`
#bm,#bmSetup{background:radial-gradient(120% 80% at 50% 110%,#143a22 0%,#07140c 55%,#030705 100%);position:absolute;overflow:hidden;--stage-2:#0d2217;--stage-3:#123222;--line:#1f6b3d;--gold:#3dff7a;--gold-deep:#1fb85a;--muted:#8fd4a8}
#bm::before,#bmSetup::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(61,255,122,.05) 0 1px,transparent 1px 6vmin),repeating-linear-gradient(90deg,rgba(61,255,122,.05) 0 1px,transparent 1px 6vmin)}
#bm>*,#bmSetup>*{position:relative;z-index:2}
#bm{padding:0;gap:0}
#bm .floorbar{padding:1.2vmin 2vmin;gap:2vmin;flex:none}
#bm .brand{font-family:${FONT};letter-spacing:.2em;font-size:clamp(.8rem,2vmin,1.2rem)}
#bm .btn,#bmSetup .btn{border-radius:0;border:0;box-shadow:none;font-family:${FONT};letter-spacing:.14em;text-transform:uppercase}
#bm .btn.ghost,#bmSetup .btn.ghost{background:rgba(0,0,0,.4)}
#bm .btn.gold,#bmSetup .btn.gold{background:#3dff7a;color:#04210f}
#bmSetup .topbar h2{color:#3dff7a}
#bmScore{display:flex;gap:.6vmin;background:#030705;padding:.8vmin 1vmin;flex:none;justify-content:center;flex-wrap:wrap}
.bmchip{display:flex;align-items:center;gap:1.2vmin;padding:.6vmin 2vmin .6vmin .6vmin;background:color-mix(in srgb,var(--pc) 30%,#030705);flex:1;min-width:0;max-width:25%}
.bmchip.on{background:var(--pc)}
.bmchip .av{--s:clamp(30px,6vmin,52px);border-radius:0;padding:0;background:#fff;box-shadow:none;flex:none}
.bmchip .av img,.bmchip .av .ini{border-radius:0}
.bmchip b{font-family:${FONT};letter-spacing:.12em;text-transform:uppercase;font-size:clamp(.65rem,1.6vmin,1rem);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0}
.bmchip span{font-family:${FONT};font-size:clamp(1.4rem,4.4vmin,2.6rem);font-weight:800;line-height:1}
#bmStage{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2vmin;padding:2vmin 3vmin;text-align:center}
.bmk{font-family:${FONT};letter-spacing:.3em;text-transform:uppercase;font-weight:800;color:#3dff7a;font-size:clamp(.8rem,2.2vmin,1.3rem)}
.bmq{font-family:${FONT};font-weight:900;color:#fff;font-size:clamp(1.8rem,7vmin,4.6rem);line-height:1.08;max-width:92%;text-transform:uppercase}
.bmclock{font-family:${FONT};font-weight:800;font-size:clamp(3rem,16vmin,9rem);line-height:1;color:#3dff7a;font-variant-numeric:tabular-nums}
.bmclock.low{color:#fff;background:#e5173f;padding:0 .2em}
.bmwho{display:flex;gap:1vmin;flex-wrap:wrap;justify-content:center}
.bmwho span{display:flex;align-items:center;gap:1vmin;padding:.6vmin 1.6vmin .6vmin .6vmin;background:rgba(255,255,255,.1);font-family:${FONT};letter-spacing:.1em;text-transform:uppercase;font-size:clamp(.7rem,1.8vmin,1.1rem);font-weight:800}
.bmwho span.ok{background:#3dff7a;color:#04210f}
.bmwho .av{--s:clamp(24px,4.4vmin,40px);border-radius:0;padding:0;background:#fff;box-shadow:none}
.bmwho .av img,.bmwho .av .ini{border-radius:0}
.bmcards{display:flex;gap:1.4vmin;flex-wrap:wrap;justify-content:center;width:100%}
.bmcard{background:color-mix(in srgb,var(--pc) 35%,#030705);border-top:1vmin solid var(--pc);min-width:clamp(120px,16vmin,260px);flex:1 1 0;max-width:24%;padding:.8vmin 1vmin;display:flex;flex-direction:column;align-items:center;gap:.5vmin;position:relative}
.bmcard .av{--s:clamp(34px,7vmin,64px);border-radius:0;padding:0;background:#fff;box-shadow:none}
.bmcard .av img,.bmcard .av .ini{border-radius:0}
.bmcard .nm{font-family:${FONT};letter-spacing:.14em;text-transform:uppercase;font-weight:800;font-size:clamp(.7rem,1.8vmin,1.1rem);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bmcard .an{font-family:${FONT};font-weight:900;font-size:clamp(1.3rem,4.6vmin,3rem);line-height:1;color:#fff;overflow-wrap:anywhere;max-width:100%}
.bmcard .vt{display:flex;gap:.5vmin;flex-wrap:wrap;justify-content:center;min-height:2.6vmin}
.bmcard .vt i{font-style:normal;font-size:clamp(.55rem,1.3vmin,.8rem);background:rgba(255,255,255,.18);padding:.2vmin .8vmin;letter-spacing:.08em;text-transform:uppercase;font-weight:800;opacity:0;transform:scale(.4);transition:opacity .25s,transform .35s cubic-bezier(.2,1.6,.4,1)}
.bmcard .vt i.on{opacity:1;transform:none}.bmcard .vt i.bluff.on{opacity:.45;text-decoration:line-through}
.bmcard.rev{background:#6b0a14!important;border-top-color:#ff2d2d!important}
.bmcard .stamp{text-align:center;font-family:${FONT};font-weight:900;font-size:clamp(1rem,3.4vmin,2.2rem);color:#ff2d2d;border:.5vmin solid #ff2d2d;background:rgba(0,0,0,.55);transform:rotate(-4deg) scale(3);opacity:0;letter-spacing:.1em;padding:.1em .6em;transition:opacity .2s,transform .35s cubic-bezier(.2,1.4,.4,1)}
.bmcard.rev .stamp{opacity:1;transform:rotate(-4deg) scale(1)}
.bmgwrap{flex:1;min-height:0;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1vmin}
.bmgauge{flex:1;min-height:0;width:100%;display:flex;justify-content:center}
.bmgauge svg{height:100%;width:auto;max-width:96%;display:block;overflow:visible}
.bmneedle{transform-origin:100px 100px;transform:rotate(0deg);transition:transform .8s cubic-bezier(.3,1.5,.5,1)}
.bmcount{font-family:${FONT};letter-spacing:.2em;text-transform:uppercase;font-weight:800;color:#8fd4a8;font-size:clamp(.8rem,2.2vmin,1.3rem);flex:none}
.bmsum{font-family:${FONT};font-weight:900;text-transform:uppercase;font-size:clamp(1rem,3.2vmin,2rem);opacity:0;transition:opacity .5s;line-height:1.15;max-width:90%;flex:none}
.bmsum.on{opacity:1}
.bmsum small{display:block;letter-spacing:.14em;font-size:.55em;color:#8fd4a8;margin-top:.4em}
.bmnext{opacity:0;pointer-events:none}.bmnext.on{opacity:1;pointer-events:auto}
.bmend .bmrow{display:flex;align-items:center;gap:2vmin;background:color-mix(in srgb,var(--pc) 35%,#030705);border-left:1.2vmin solid var(--pc);padding:1vmin 2vmin;width:min(70vmin,92%);font-family:${FONT};font-weight:800;text-transform:uppercase;letter-spacing:.1em;font-size:clamp(1rem,3vmin,1.8rem)}
.bmend .bmrow span{margin-left:auto;font-size:1.3em}
.bmend .bmrow.top{background:var(--pc)}
#playBM{background:linear-gradient(160deg,#143a22,#030705)!important;border-color:#3dff7a!important}
#playBM .bmart{display:flex;align-items:center;justify-content:center;height:100%}
#bmSetup .rules li{margin:.3em 0}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

const hub=document.querySelector(".games");
if(!hub||!QS.length)return;
const tile=document.createElement("button");tile.className="game live";tile.id="playBM";
tile.innerHTML=`<span class="art"><span class="bmart"><svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M20 100A80 80 0 0 1 80 23" fill="none" stroke="#3dff7a" stroke-width="16"/><path d="M80 23A80 80 0 0 1 120 23" fill="none" stroke="#ffd400" stroke-width="16"/><path d="M120 23A80 80 0 0 1 180 100" fill="none" stroke="#ff2d2d" stroke-width="16"/><g transform="rotate(48 100 100)"><rect x="97" y="30" width="6" height="72" fill="#fff"/></g><circle cx="100" cy="100" r="10" fill="#fff"/></svg></span><span class="pill">Play</span></span><h2>Bullshit Meter</h2><p>One of you is lying. Can you spot the liar?</p>`;
hub.insertBefore(tile,hub.children[1]||null);
const hn=hub.children.length;hub.classList.remove("five","six","seven");if(hn>=7)hub.classList.add("seven");

const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="bmSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="bm";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>BULLSHIT METER</small></span><span class="spacer"></span><span class="count" id="bmRound"></span><button class="btn ghost" id="bmQuit">Quit</button></div><div id="bmScore"></div><div id="bmStage"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("bmQuit").onclick=()=>confirmSheet("Quit this game?","The scores will be lost.","Quit",()=>{closeOverlay();endGame();show("hub")});

const esc2=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
function openSetup(){
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="bmBack">← Back</button><h2>Bullshit Meter</h2><button class="btn gold" id="bmStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li>A very general question appears, like <b>how many times a week do you go to the gym?</b></li>
      <li>Everyone types their <b>honest answer</b> on their phone. <b>One random player</b> is secretly told to type a <b>believable lie</b> instead.</li>
      <li>Everyone votes for who they think the liar is.</li>
      <li>If <b>everyone</b> picks the liar, each detective scores <b>2</b>. If it isn't unanimous, the liar scores <b>1 for every other player</b>, even the ones who guessed right.</li>
      <li>The liar is chosen at random every round, so it can be you again and again.</li></ul></div>
    <div class="field"><span class="eyebrow">Rounds</span><div class="seg" id="bmRoundsSeg"></div></div>
    <div class="field"><span class="eyebrow">Seconds to answer</span><div class="seg" id="bmAskSeg"></div></div>
    <div class="field"><span class="eyebrow">Seconds to vote</span><div class="seg" id="bmVoteSeg"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="bmSoundSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players</span><div id="bmPlayers" class="hlsetup"><div class="note">Join with your phones. You need at least 3 players (CPU players count).</div></div></div></div>`;
  seg($("bmRoundsSeg"),[5,8,12],()=>CFG.rounds,v=>{CFG.rounds=v;saveCfg()},v=>v);
  seg($("bmAskSeg"),[30,45,60],()=>CFG.ask,v=>{CFG.ask=v;saveCfg()},v=>v+"s");
  seg($("bmVoteSeg"),[20,30,45],()=>CFG.vote,v=>{CFG.vote=v;saveCfg()},v=>v+"s");
  seg($("bmSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  $("bmBack").onclick=()=>show("hub");
  $("bmStart").onclick=()=>{ac();startGame()};
  show("bmSetup");
}

/* ---------- state ---------- */
const BM={players:[],round:0,q:null,liar:-1,answers:{},votes:{},phase:"idle",left:0,timer:null,used:new Set(),gain:{},T:[],caught:false,wrong:0};
const byPid=pid=>BM.players.find(p=>p.pid===pid);
const liarP=()=>BM.players[BM.liar];
const stage=html=>{$("bmStage").innerHTML=html};
const clearT=()=>{clearInterval(BM.timer);BM.T.forEach(clearTimeout);BM.T=[]};
const later=(fn,ms)=>{BM.T.push(setTimeout(fn,ms))};
function score(){
  $("bmScore").innerHTML=BM.players.map(p=>{
    const on=(BM.phase==="ask"&&BM.answers[p.pid]!=null)||(BM.phase==="vote"&&BM.votes[p.pid]!=null);
    return `<div class="bmchip${on?" on":""}" style="--pc:${p.color}">${avatarHTML(p,"sm")}<b>${esc(p.name)}</b><span>${p.pts}</span></div>`}).join("");
  $("bmRound").textContent=BM.round?`Round ${Math.min(BM.round,CFG.rounds)} of ${CFG.rounds}`:"";
}
const tickers=()=>`<div class="bmwho">${BM.players.map(p=>{const d=BM.phase==="ask"?BM.answers[p.pid]!=null:BM.votes[p.pid]!=null;return `<span class="${d?"ok":""}">${avatarHTML(p,"sm")}${esc(p.name)}${d?" ✓":""}</span>`}).join("")}</div>`;
function endGame(){clearT();BM.phase="idle"}
function pickQ(){
  let fresh=QS.filter((_,i)=>!BM.used.has(i));if(!fresh.length){BM.used=new Set();fresh=QS.slice()}
  const q=fresh[Math.floor(Math.random()*fresh.length)];BM.used.add(QS.indexOf(q));return q;
}
function startGame(){
  const L=window.LINK&&LINK.pull?LINK.pull(3,8,{cpu:true}):null;
  if(!L||L.length<3){
    openOverlay(`<span class="eyebrow">Bullshit Meter</span><h2>Need 3 players</h2><p class="score">Scan the join code with your phones${L&&L.length?` (${L.length} in so far)`:""}. CPU players count as players.</p><div class="row"><button class="btn" id="bmAddCpu">Add a CPU player</button><button class="btn gold" id="bmOk">OK</button></div>`);
    $("bmAddCpu").onclick=()=>{window.LINK&&LINK.addCpu&&LINK.addCpu();closeOverlay()};$("bmOk").onclick=closeOverlay;return;
  }
  save();
  BM.players=L.map((p,i)=>({name:p.name,color:DISTINCT[i%DISTINCT.length],pts:0,slot:i,pid:p.pid,cpu:!!p.cpu}));
  BM.round=0;BM.used=new Set();BM.phase="idle";
  show("bm");score();stage("");
  introContestants(BM.players,"Bullshit Meter",()=>nextRound());
}
function nextRound(){
  clearT();BM.round++;
  if(BM.round>CFG.rounds)return results();
  BM.q=pickQ();BM.liar=Math.floor(Math.random()*BM.players.length);   // fully random, can repeat
  BM.answers={};BM.votes={};BM.gain={};BM.phase="ask";BM.left=CFG.ask;
  score();renderAsk();
  BM.timer=setInterval(()=>{BM.left--;const c=$("bmClock");if(c){c.textContent=BM.left;c.classList.toggle("low",BM.left<=10)}
    if(BM.left<=5&&BM.left>0)SFX.beep&&SFX.beep();
    if(BM.left<=0){clearInterval(BM.timer);BM.players.forEach(p=>{if(BM.answers[p.pid]==null)BM.answers[p.pid]="-"});startVote()}},1000);
  // CPU players answer after a moment
  BM.players.filter(p=>p.cpu).forEach(p=>later(()=>{
    const [,lo,hi]=BM.q,r=Math.max(1,hi-lo);
    let a=lo+Math.floor(Math.random()*(r+1));
    if(BM.players[BM.liar]===p){a=Math.random()<.5?hi+Math.ceil(r*(.3+Math.random())):Math.max(0,lo-Math.ceil(r*.3))}
    submit(p.pid,String(a))},1500+Math.random()*6000));
  SFX.go&&SFX.go();
}
function renderAsk(){
  stage(`<div class="bmk">Round ${BM.round} of ${CFG.rounds} · Check your phone</div><div class="bmq">${esc2(BM.q[0])}</div><div class="bmclock" id="bmClock">${BM.left}</div>${tickers()}
  <div class="row"><button class="btn ghost" id="bmSkip">Skip waiting</button></div>`);
  $("bmSkip").onclick=()=>{if(BM.phase!=="ask")return;clearInterval(BM.timer);BM.players.forEach(p=>{if(BM.answers[p.pid]==null)BM.answers[p.pid]="-"});startVote()};
}
function submit(pid,v){
  if(BM.phase!=="ask"||BM.answers[pid]!=null||!byPid(pid))return;
  v=String(v==null?"":v).replace(/[<>]/g,"").trim().slice(0,12);if(!v)return;
  BM.answers[pid]=v;score();
  if(BM.players.every(p=>BM.answers[p.pid]!=null)){clearInterval(BM.timer);later(startVote,700)}else{const w=document.querySelector("#bmStage .bmwho");if(w)w.outerHTML=tickers()}
  SFX.beep&&SFX.beep();
}
function startVote(){
  if(BM.phase!=="ask")return;
  clearT();BM.phase="vote";BM.left=CFG.vote;score();renderVote();
  BM.timer=setInterval(()=>{BM.left--;const c=$("bmClock");if(c){c.textContent=BM.left;c.classList.toggle("low",BM.left<=10)}
    if(BM.left<=5&&BM.left>0)SFX.beep&&SFX.beep();
    if(BM.left<=0){clearInterval(BM.timer);showMeter()}},1000);
  // CPU detectives vote after a moment (a bit better than chance)
  BM.players.filter(p=>p.cpu).forEach(p=>later(()=>{
    const others=BM.players.filter(x=>x!==p);const L=liarP();
    const pick=(L!==p&&Math.random()<.45)?L:others[Math.floor(Math.random()*others.length)];
    castVote(p.pid,pick.pid)},2000+Math.random()*6000));
}
function renderVote(){
  stage(`<div class="bmk">Who's lying? Vote on your phone</div><div class="bmq" style="font-size:clamp(1.2rem,4vmin,2.6rem)">${esc2(BM.q[0])}</div>
  <div class="bmcards">${BM.players.map(p=>`<div class="bmcard" style="--pc:${p.color}">${avatarHTML(p,"sm")}<div class="nm">${esc(p.name)}</div><div class="an">${esc2(BM.answers[p.pid]||"-")}</div></div>`).join("")}</div>
  <div class="bmclock" id="bmClock" style="font-size:clamp(2rem,9vmin,5rem)">${BM.left}</div>${tickers()}
  <div class="row"><button class="btn ghost" id="bmSkip">Skip waiting</button></div>`);
  $("bmSkip").onclick=()=>{if(BM.phase==="vote"){clearInterval(BM.timer);showMeter()}};
}
function castVote(pid,to){
  if(BM.phase!=="vote"||BM.votes[pid]!=null||pid===to||!byPid(pid)||!byPid(to))return;
  BM.votes[pid]=to;score();
  if(BM.players.every(p=>BM.votes[p.pid]!=null)){clearInterval(BM.timer);later(showMeter,700)}else{const w=document.querySelector("#bmStage .bmwho");if(w)w.outerHTML=tickers()}
  SFX.beep&&SFX.beep();
}
function showMeter(){
  if(BM.phase!=="vote")return;
  clearT();BM.phase="meter";
  const L=liarP();const det=BM.players.filter(p=>p!==L);
  const right=det.filter(p=>BM.votes[p.pid]===L.pid),wrong=det.length-right.length;
  BM.caught=wrong===0;BM.wrong=wrong;BM.gain={};
  if(BM.caught)det.forEach(p=>{BM.gain[p.pid]=2});else BM.gain[L.pid]=det.length;
  BM.players.forEach(p=>{p.pts+=BM.gain[p.pid]||0});
  const votersFor=pid=>BM.players.filter(p=>p!==byPid(pid)&&BM.votes[p.pid]===pid);
  stage(`<div class="bmk">Counting the votes...</div>
  <div class="bmcards">${BM.players.map(p=>`<div class="bmcard" id="bmC${p.pid}" style="--pc:${p.color}">${avatarHTML(p,"sm")}<div class="nm">${esc(p.name)}</div><div class="an">${esc2(BM.answers[p.pid]||"-")}</div>
    <div class="vt">${votersFor(p.pid).map(v=>`<i id="bmV${v.pid}" class="${v===L?"bluff":""}">${esc(v.name)}</i>`).join("")}</div>${p===L?`<div class="stamp">LIAR</div>`:""}</div>`).join("")}</div>
  <div class="bmgwrap"><div class="bmgauge"><svg viewBox="0 0 200 112"><path d="M10 100A90 90 0 0 1 77 13" fill="none" stroke="#3dff7a" stroke-width="14"/><path d="M77 13A90 90 0 0 1 123 13" fill="none" stroke="#ffd400" stroke-width="14"/><path d="M123 13A90 90 0 0 1 190 100" fill="none" stroke="#ff2d2d" stroke-width="14"/>
  <text x="8" y="111" fill="#8fd4a8" font-size="9" font-weight="800">CAUGHT</text><text x="192" y="111" fill="#ff7a7a" font-size="9" font-weight="800" text-anchor="end">FOOLED</text>
  <g class="bmneedle" id="bmNeedle"><rect x="98" y="22" width="4" height="80" fill="#fff"/></g><circle cx="100" cy="100" r="8" fill="#fff"/></svg></div>
  <div class="bmcount" id="bmCount">0 of ${det.length} votes counted</div></div>
  <div class="bmsum" id="bmSum">${BM.caught?`Everyone caught ${esc2(L.name)}!<small>Each detective scores 2</small>`:`${esc2(L.name)} got away with it!<small>${wrong} ${wrong===1?"player was":"players were"} fooled · ${esc2(L.name)} scores ${det.length}</small>`}</div>
  <div class="row"><button class="btn gold bmnext" id="bmNext">${BM.round>=CFG.rounds?"See results":"Next round"}</button></div>`);
  score();
  $("bmNext").onclick=()=>{if(BM.phase==="result")nextRound()};
  /* count the detectives' votes one at a time: the needle swings towards CAUGHT for a right guess and FOOLED for a wrong one */
  const order=det.slice().sort(()=>Math.random()-.5);let net=0,i=0;
  const STEP=1100,T0=1400;
  order.forEach((p,k)=>later(()=>{
    const ok=BM.votes[p.pid]===L.pid;net+=ok?-1:1;i++;
    const v=$("bmV"+p.pid);if(v)v.classList.add("on");
    const nd=$("bmNeedle");if(nd)nd.style.transform="rotate("+Math.round(net/det.length*78)+"deg)";
    const c=$("bmCount");if(c)c.textContent=i+" of "+det.length+" votes counted";
    ok?(SFX.ok&&SFX.ok()):(SFX.pass&&SFX.pass());
  },T0+k*STEP));
  const tEnd=T0+det.length*STEP;
  later(()=>{const v=$("bmV"+L.pid);const lv=document.querySelector(".bmcard .vt i.bluff");if(lv)lv.classList.add("on")},tEnd);
  later(()=>{const c=$("bmC"+L.pid);if(c)c.classList.add("rev");const k=document.querySelector("#bmStage .bmk");if(k)k.textContent="The liar is...";SFX.buzz&&SFX.buzz()},tEnd+800);
  later(()=>{const sm=$("bmSum");if(sm)sm.classList.add("on");BM.caught?(SFX.win&&SFX.win()):(SFX.go&&SFX.go())},tEnd+1900);
  later(()=>{BM.phase="result";const b=$("bmNext");if(b){b.classList.add("on");b.focus({preventScroll:true})}},tEnd+2600);
}
function results(){
  clearT();BM.phase="final";score();
  const o=BM.players.slice().sort((a,b)=>b.pts-a.pts),top=o[0].pts;
  try{window.LB&&LB.record("bm",BM.players.map(p=>({name:p.name,color:p.color,score:p.pts,win:p.pts===top})))}catch(e){}
  stage(`<div class="bmend" style="display:flex;flex-direction:column;align-items:center;gap:1.4vmin;width:100%"><div class="bmk">Game over</div><div class="bmq">${o.filter(p=>p.pts===top).map(p=>esc2(p.name)).join(" & ")} ${o.filter(p=>p.pts===top).length>1?"win":"wins"}!</div>
  ${o.map(p=>`<div class="bmrow${p.pts===top?" top":""}" style="--pc:${p.color}">${avatarHTML(p,"sm")}${esc(p.name)}<span>${p.pts}</span></div>`).join("")}
  <div class="row"><button class="btn" id="bmMenu">Game Night menu</button><button class="btn gold" id="bmAgain">Play again</button></div></div>`);
  $("bmMenu").onclick=()=>{endGame();show("hub")};
  $("bmAgain").onclick=()=>{startGame()};
  SFX.win&&SFX.win();
}

/* ---------- what phones see ---------- */
function sceneFor(p){
  const sc=BM.players.map(q=>({n:q.name,s:q.pts,c:q.color,on:0,pid:q.pid,av:(()=>{try{return avatarSrc(q.slot)}catch(e){return ""}})()}));
  const me=byPid(p.pid),isLiar=!!me&&liarP()===me&&BM.phase!=="final";
  const rl=BM.round?`Round ${Math.min(BM.round,CFG.rounds)} of ${CFG.rounds}`:"";
  const base={th:"bm",scores:sc,btns:[],sn:BM.round*10+({ask:1,vote:2,meter:3,result:4,final:5}[BM.phase]||0),me:1,liar:0};
  if(!me)return {...base,head:{e:"Bullshit Meter",t:"Watch the TV",s:"You'll be in the next game"}};
  if(BM.phase==="ask"){
    const done=BM.answers[p.pid]!=null;
    if(done)return {...base,liar:isLiar?1:0,head:{e:rl,t:"Locked in",s:isLiar?"Now act natural. Don't get caught.":"Waiting for the others"},big:BM.q[0],clock:String(BM.left)};
    return {...base,liar:isLiar?1:0,head:{e:isLiar?"SECRET · ONLY YOU CAN SEE THIS":rl,t:isLiar?"YOU'RE THE LIAR":"Type your honest answer",s:isLiar?"Type a believable lie. Don't get caught.":"One of you is lying. Be honest."},big:BM.q[0],clock:String(BM.left),inp:{ph:"Type a number",num:1}};
  }
  if(BM.phase==="vote"){
    const voted=BM.votes[p.pid];
    return {...base,liar:isLiar?1:0,head:{e:rl,t:isLiar?"Blend in":voted!=null?"Vote locked in":"Who's the liar?",s:isLiar?"Vote for someone else. Your vote won't count.":voted!=null?"Waiting for the others":"Tap who you think lied. Not yourself!"},clock:String(BM.left),
      btns:BM.players.filter(q=>q.pid!==p.pid).map(q=>({t:q.name+"\n"+(BM.answers[q.pid]||"-"),a:"vote",v:q.pid,d:voted!=null?1:0,on:voted===q.pid?1:0,c:q.color}))};
  }
  if(BM.phase==="meter")return {...base,liar:isLiar?1:0,head:{e:rl,t:"Counting the votes...",s:"Watch the TV"}};
  if(BM.phase==="result"){
    const L=liarP();
    return {...base,head:{e:rl,t:isLiar?(BM.caught?"You got caught":"You fooled them!"):(BM.votes[p.pid]===L.pid?"You caught the liar!":"You got fooled"),s:"The liar was "+L.name+"."+(BM.caught?" Everyone caught them.":" "+L.name+" scores "+(BM.players.length-1)+".")},big:"",
      btns:BM.phase==="result"?[{t:BM.round>=CFG.rounds?"See results":"Next round",cls:"gold",a:"next"}]:[]};
  }
  if(BM.phase==="final"){const o=BM.players.slice().sort((a,b)=>b.pts-a.pts);return {...base,head:{e:"Final",t:o[0].name+" wins!",s:o.map(q=>q.name+" "+q.pts).join("  ·  ")}}}
  return {...base,head:{e:"Bullshit Meter",t:"Get ready",s:""}};
}
function act(p,m){
  if(m.a==="vote")castVote(p.pid,m.i);
  else if(m.a==="next"&&BM.phase==="result")nextRound();
}
const active=()=>!$("bm").hidden;
window.__BM={BM,CFG,sceneFor,act,text:(p,v)=>submit(p.pid,v),active,submit,castVote};
})();
