/* =================== ORDER THIS (fastest finger first) ===================
   Four things appear on the TV. Everyone taps them in the right order on their phone, as fast as they can.
   Right order = 5 points, plus a speed bonus: 10 for the fastest down to 1. Up to 10 players. */
(function(){
const POOLS=window.OT_POOLS||[];
const CFG={rounds:8,secs:20};
try{const j=JSON.parse(localStorage.getItem("gn.ot")||"null");if(j)Object.assign(CFG,j)}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.ot",JSON.stringify(CFG))}catch(e){}};
const FONT='"Oxanium","Big Shoulders Display",Impact,sans-serif';
const css=`
#ot,#otSetup{background:radial-gradient(120% 90% at 50% 0%,#5b1a8c 0%,#2a0a4d 55%,#0d031f 100%);position:absolute;overflow:hidden;--stage-2:#3a1266;--stage-3:#4b1a80;--line:#7a3cc4;--gold:#ffd23f;--gold-deep:#d9a900;--muted:#d7b8ff}
#ot>*,#otSetup>*{position:relative;z-index:2}
#ot{padding:0;gap:0}
#ot .floorbar{padding:1.2vmin 2vmin;gap:2vmin;flex:none}
#ot .brand{font-family:${FONT};letter-spacing:.2em;font-size:clamp(.8rem,2vmin,1.2rem)}
#ot .btn,#otSetup .btn{border-radius:0;border:0;box-shadow:none;font-family:${FONT};letter-spacing:.14em;text-transform:uppercase}
#ot .btn.ghost,#otSetup .btn.ghost{background:rgba(0,0,0,.4)}
#ot .btn.gold,#otSetup .btn.gold{background:#ffd23f;color:#2a0a4d}
#otSetup .topbar h2{color:#ffd23f}
#otStage{flex:1;min-height:0;display:flex;flex-direction:column;align-items:stretch;gap:1.4vmin;padding:1.4vmin 2.4vmin 1.8vmin}
.othud{display:flex;align-items:center;justify-content:space-between;gap:2vmin;font-family:${FONT};letter-spacing:.2em;text-transform:uppercase;font-weight:800;color:#ffd23f;font-size:clamp(.8rem,2.2vmin,1.3rem)}
.othud b{color:#fff;font-size:1.3em}
.otclock{font-family:${FONT};font-weight:800;font-size:clamp(1.8rem,7vmin,4rem);line-height:1;color:#ffd23f;font-variant-numeric:tabular-nums;min-width:2.2ch;text-align:center}
.otclock.low{color:#fff;background:#e5173f;padding:0 .2em}
.otq{font-family:${FONT};font-weight:900;color:#fff;text-align:center;text-transform:uppercase;line-height:1.05;flex:none}
.otq small{display:block;font-size:clamp(.8rem,2.2vmin,1.3rem);letter-spacing:.3em;color:#d7b8ff;margin-bottom:.4vmin}
.otq b{font-size:clamp(1.5rem,6.4vmin,4.2rem);color:#ffd23f}
.otcards{flex:1;min-height:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1.4vmin}
.otcard{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1vmin;padding:1.6vmin;background:linear-gradient(160deg,#6a2cb0,#3a1266);border-top:1.2vmin solid #ffd23f;text-align:center;min-height:0;overflow:hidden}
.otcard .nm{font-family:${FONT};font-weight:900;text-transform:uppercase;color:#fff;font-size:clamp(1rem,3.8vmin,2.6rem);line-height:1.08;overflow-wrap:anywhere}
.otcard .rk{font-family:${FONT};font-weight:900;color:#ffd23f;font-size:clamp(2rem,9vmin,6rem);line-height:1}
.otcard .vl{font-family:${FONT};font-weight:800;color:#d7b8ff;font-size:clamp(.9rem,2.8vmin,1.8rem);letter-spacing:.06em}
.otcard.pop{animation:otpop .5s both}
@keyframes otpop{from{transform:translateY(3vmin) scale(.9);opacity:0}to{transform:none;opacity:1}}
.otwho{flex:none;display:flex;flex-wrap:wrap;gap:.8vmin;justify-content:center;max-height:24%;overflow:hidden}
.otp{display:flex;align-items:center;gap:.8vmin;padding:.4vmin 1.2vmin .4vmin .4vmin;background:rgba(0,0,0,.35);border-left:.6vmin solid var(--pc);font-family:${FONT};font-weight:800;color:#fff;font-size:clamp(.7rem,2.1vmin,1.3rem);transition:opacity .3s,background .3s}
.otp img,.otp .ini{width:3.8vmin;height:3.8vmin;object-fit:cover;background:#fff;display:block}
.otp .ini{display:flex;align-items:center;justify-content:center;color:#2a0a4d;font-weight:900}
.otp.wait{opacity:.4}.otp.done{background:#1a7a3a}
.otp .pt{color:#ffd23f;margin-left:.6vmin}.otp.bad{background:#7a1426;opacity:.85}
.otmsg{font-family:${FONT};font-weight:900;text-transform:uppercase;text-align:center;color:#fff;font-size:clamp(1rem,3.2vmin,2.2rem);min-height:1.2em;flex:none}
.otend{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2vmin;flex:1;text-align:center}
.otend .big{font-family:${FONT};font-weight:900;color:#ffd23f;text-transform:uppercase;font-size:clamp(2rem,8vmin,5.5rem);line-height:1.05}
.otrank{display:flex;flex-direction:column;gap:.8vmin;width:min(640px,92%)}
.otrank .r{display:flex;align-items:center;gap:1.4vmin;background:rgba(0,0,0,.35);padding:.8vmin 1.6vmin;border-left:.8vmin solid var(--pc);font-family:${FONT};font-weight:800;color:#fff;font-size:clamp(.9rem,3vmin,1.8rem);text-transform:uppercase}
.otrank .r b{flex:1;text-align:left}.otrank .r em{font-style:normal;color:#ffd23f}
.otrank .r.win{background:#ffd23f;color:#2a0a4d}.otrank .r.win em{color:#2a0a4d}
.otboard{flex:none;display:flex;gap:.8vmin;justify-content:center;flex-wrap:wrap}
.otb{display:flex;align-items:center;gap:.8vmin;padding:.4vmin 1.2vmin .4vmin .4vmin;background:rgba(0,0,0,.45);border-bottom:.5vmin solid var(--pc);font-family:${FONT};font-weight:900;color:#fff;font-size:clamp(.75rem,2.3vmin,1.4rem);text-transform:uppercase;transition:transform .5s}
.otb .pos{color:#ffd23f;min-width:1.2em;text-align:center}
.otb img,.otb .ini{width:4.6vmin;height:4.6vmin;object-fit:cover;background:#fff;display:flex;align-items:center;justify-content:center;color:#2a0a4d;font-weight:900}
.otb .sc{color:#ffd23f;font-size:1.25em;min-width:1.6em;text-align:right;font-variant-numeric:tabular-nums}
.otb.up{background:#1a7a3a}
.otres{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.4vmin}
.otres h3{margin:0;font-family:${FONT};font-weight:900;color:#ffd23f;text-transform:uppercase;font-size:clamp(1.4rem,5.4vmin,3.4rem);letter-spacing:.06em}
.otres .ans{font-family:${FONT};font-weight:800;color:#e9d7ff;text-transform:uppercase;font-size:clamp(.8rem,2.4vmin,1.5rem);letter-spacing:.08em;text-align:center}
.otlist{display:grid;gap:.8vmin 1.6vmin;width:min(1100px,96%);grid-template-columns:1fr}
.otlist.two{grid-template-columns:1fr 1fr}
.otrow{display:flex;align-items:center;gap:1.6vmin;background:rgba(0,0,0,.4);border-left:1vmin solid var(--pc);padding:.6vmin 1.6vmin .6vmin .8vmin;font-family:${FONT};font-weight:900;color:#fff;text-transform:uppercase;font-size:var(--rs,3.2vmin);animation:otpop .45s both}
.otrow .pl{font-size:1.5em;color:#ffd23f;min-width:1.1em;text-align:center}
.otrow img,.otrow .ini{width:var(--av,8vmin);height:var(--av,8vmin);object-fit:cover;background:#fff;display:flex;align-items:center;justify-content:center;color:#2a0a4d;font-weight:900;flex:none}
.otrow b{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.otrow .tm{opacity:.85;font-size:.7em}.otrow .gn{color:#7dff9b;font-size:1.2em;min-width:2.4em;text-align:right}
.otrow.bad{background:rgba(122,20,38,.55)}.otrow.bad .gn{color:#ff9aa8}
.otrow.first{background:#ffd23f;color:#2a0a4d}.otrow.first .pl,.otrow.first .gn{color:#2a0a4d}
.otrow .tot{color:#ffd23f;min-width:2.6em;text-align:right;font-size:.9em}.otrow.first .tot{color:#2a0a4d}
#playOT{background:linear-gradient(160deg,#6a2cb0,#0d031f)!important;border-color:#ffd23f!important}
#playOT .otart{display:flex;align-items:center;justify-content:center;gap:6px;height:100%}
#playOT .otart i{font-style:normal;font:900 2rem/1 system-ui;color:#2a0a4d;background:#ffd23f;width:2.4rem;height:2.4rem;display:flex;align-items:center;justify-content:center}
#otSetup .rules li{margin:.3em 0}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

const hub=document.querySelector(".games");
if(!hub||!POOLS.length)return;
const tile=document.createElement("button");tile.className="game live";tile.id="playOT";
tile.innerHTML=`<span class="art"><span class="otart"><i>2</i><i>4</i><i>1</i><i>3</i></span><span class="pill">Play</span></span><h2>Order This</h2><p>Fastest finger first. Put four things in order.</p>`;
hub.insertBefore(tile,hub.children[1]||null);
const hn=hub.children.length;hub.classList.remove("five","six","seven");if(hn>=7)hub.classList.add("seven");

const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="otSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="ot";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>ORDER THIS</small></span><span class="spacer"></span><span class="count" id="otCount"></span><button class="btn ghost" id="otQuit">Quit</button></div><div id="otStage"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("otQuit").onclick=()=>confirmSheet("Quit this game?","Everyone will be back in the lobby.","Quit",()=>{closeOverlay();endGame();show("hub")});
const esc2=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));

function openSetup(){
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="otBack">← Back</button><h2>Order This</h2><button class="btn gold" id="otStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li>Four things and a question appear on the TV: <b>closest to furthest, lowest to highest, earliest to latest, A to Z</b> and more.</li>
      <li>Everyone taps the four in the right order <b>on their phone</b>. Tap again to start over before you lock in.</li>
      <li>The right order scores <b>5 points</b>. The fastest also gets a <b>bonus: 10 for first, 9 for second</b>, down to 1.</li>
      <li>Up to <b>10 players</b>. Most points after the last question wins.</li></ul></div>
    <div class="field"><span class="eyebrow">Questions</span><div class="seg" id="otRoundsSeg"></div></div>
    <div class="field"><span class="eyebrow">Seconds per question</span><div class="seg" id="otSecsSeg"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="otSoundSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players</span><div id="otPlayers" class="hlsetup"><div class="note">Join with your phones. You need at least 2 players (CPU players count).</div></div></div></div>`;
  seg($("otRoundsSeg"),[5,8,10,15],()=>CFG.rounds,v=>{CFG.rounds=v;saveCfg()},v=>String(v));
  seg($("otSecsSeg"),[15,20,30],()=>CFG.secs,v=>{CFG.secs=v;saveCfg()},v=>v+"s");
  seg($("otSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  $("otBack").onclick=()=>show("hub");
  $("otStart").onclick=()=>{ac();startGame()};
  show("otSetup");
}

/* ---------- state ---------- */
const OT={players:[],n:0,pool:null,dir:"asc",opts:[],order:[],phase:"idle",left:0,timer:null,T:[],used:[],t0:0,winners:[]};
const byPid=pid=>OT.players.find(p=>p.pid===pid);
const clearT=()=>{clearInterval(OT.timer);OT.T.forEach(clearTimeout);OT.T=[]};
const later=(fn,ms)=>{OT.T.push(setTimeout(fn,ms))};
function endGame(){clearT();OT.phase="idle"}
const fmtV=(pool,v)=>pool.alpha?"":pool.yr?String(v):(Math.abs(v)>=1000?v.toLocaleString("en-AU"):String(v))+(pool.unit||"");

/* build a question whose four items can't be confused with each other */
function build(){
  let pool;
  if(OT.used.length>=POOLS.length)OT.used=[];
  const free=POOLS.filter(p=>!OT.used.includes(p));pool=free[Math.floor(Math.random()*free.length)];OT.used.push(pool);
  const okSet=a=>{
    if(pool.alpha)return new Set(a.map(x=>x[0][0])).size===4;
    for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){const x=a[i][1],y=a[j][1];
      if(pool.abs!=null){if(Math.abs(x-y)<pool.abs)return false}else if(Math.abs(x-y)<pool.gap*Math.max(Math.abs(x),Math.abs(y),1e-9))return false}
    return true};
  let pick=null;
  for(let k=0;k<400&&!pick;k++){const a=pool.it.slice().sort(()=>Math.random()-.5).slice(0,4);if(okSet(a))pick=a}
  if(!pick)pick=pool.it.slice(0,4);
  const dir=Math.random()<.5?"asc":"desc";
  const sorted=pick.slice().sort((a,b)=>pool.alpha?a[0].localeCompare(b[0]):a[1]-b[1]);
  if(dir==="desc")sorted.reverse();
  OT.pool=pool;OT.dir=dir;OT.order=sorted;                       // OT.order = the answer, first to last
  OT.opts=pick.slice().sort(()=>Math.random()-.5);               // OT.opts = shuffled cards as shown
}
const idxOfName=nm=>OT.opts.findIndex(o=>o[0]===nm);
const answerIdx=()=>OT.order.map(o=>idxOfName(o[0]));

function startGame(){
  const L=window.LINK&&LINK.pull?LINK.pull(2,10,{cpu:true}):null;
  if(!L||L.length<2){
    openOverlay(`<span class="eyebrow">Order This</span><h2>Need 2 players</h2><p class="score">Scan the join code with your phones${L&&L.length?` (${L.length} in so far)`:""}. CPU players count as players. Up to 10 players.</p><div class="row"><button class="btn" id="otAddCpu">Add a CPU player</button><button class="btn gold" id="otOk">OK</button></div>`);
    $("otAddCpu").onclick=()=>{window.LINK&&LINK.addCpu&&LINK.addCpu();closeOverlay()};$("otOk").onclick=closeOverlay;return;
  }
  begin(L.slice(0,10).map((p,i)=>({name:p.name,color:DISTINCT[i%DISTINCT.length],slot:i,pid:p.pid,cpu:!!p.cpu})));
}
function begin(list){
  save();
  OT.players=list.map(p=>({...p,pts:0,seq:[],t:null,got:0,ok:false}));
  OT.n=0;OT.used=[];OT.winners=[];OT.phase="idle";
  show("ot");
  $("otStage").innerHTML=`<div class="otend"><div class="big">Order This</div><div class="otmsg">${OT.players.length} players. Fastest finger first!</div></div>`;
  $("otCount").textContent="";
  SFX.go&&SFX.go();
  later(nextQ,2200);
}
const chip=p=>{let a="";try{a=avatarSrc(p.slot)}catch(e){}return `<div class="otp wait" id="otP${p.slot}" style="--pc:${p.color}"><img alt="" src="${esc(a)}" onerror="this.outerHTML='<span class=ini>${esc((p.name||"?").charAt(0).toUpperCase())}</span>'"><span>${esc2(p.name)}</span><span class="pt"></span></div>`};
const avs=p=>{try{return avatarSrc(p.slot)}catch(e){return ""}};
const avEl=p=>`<img alt="" src="${esc(avs(p))}" onerror="this.outerHTML='<span class=ini>${esc((p.name||"?").charAt(0).toUpperCase())}</span>'">`;
function boardHTML(gain){
  const o=OT.players.slice().sort((a,b)=>b.pts-a.pts);
  return o.map((p,i)=>`<div class="otb${gain&&p.got?" up":""}" style="--pc:${p.color}"><span class="pos">${i+1}</span>${avEl(p)}<span>${esc2(p.name)}</span><span class="sc">${p.pts}</span></div>`).join("");
}
function showResults(){
  if(OT.phase!=="reveal")return;
  const n=OT.players.length;
  const ord=OT.players.slice().sort((a,b)=>(b.ok?1:0)-(a.ok?1:0)||(a.ok&&b.ok?a.t-b.t:(a.t!=null?0:1)-(b.t!=null?0:1)));
  const two=n>5,rs=n<=3?"4.4vmin":n<=5?"3.6vmin":n<=8?"3vmin":"2.7vmin",av=n<=3?"11vmin":n<=5?"9vmin":n<=8?"7vmin":"6vmin";
  $("otBoard").innerHTML=boardHTML(true);
  $("otStage").querySelector(".otcards,.otres").outerHTML=`<div class="otres"><h3>Round ${OT.n} results</h3><div class="ans">Correct order: ${OT.order.map(o=>esc2(o[0])).join("  →  ")}</div>
  <div class="otlist${two?" two":""}" style="--rs:${rs};--av:${av}">${ord.map((p,i)=>`<div class="otrow${p.ok&&i===0?" first":""}${p.ok?"":" bad"}" style="--pc:${p.color};animation-delay:${i*.12}s"><span class="pl">${p.ok?i+1:"–"}</span>${avEl(p)}<b>${esc2(p.name)}</b><span class="tm">${p.ok?(p.t/1000).toFixed(1)+"s":p.t!=null?"wrong order":"no answer"}</span><span class="gn">${p.got?"+"+p.got:"0"}</span><span class="tot">${p.pts}</span></div>`).join("")}</div></div>`;
  const msg=$("otMsg");if(msg)msg.textContent=OT.n>=CFG.rounds?"Final round done!":"Next question coming up";
  const who=$("otWho");if(who)who.remove();
  SFX.win&&ord.some(p=>p.ok)&&SFX.win();
}
function nextQ(){
  clearT();OT.n++;
  if(OT.n>CFG.rounds)return finish();
  build();OT.phase="ask";OT.left=CFG.secs;OT.t0=Date.now();
  OT.players.forEach(p=>{p.seq=[];p.t=null;p.got=0;p.ok=false});
  $("otCount").textContent=`Question ${OT.n} of ${CFG.rounds}`;
  $("otStage").innerHTML=`<div class="otboard" id="otBoard">${boardHTML(false)}</div><div class="othud"><span>${OT.players.length} players</span><span class="otclock" id="otClock">${OT.left}</span><span>Tap in order</span></div>
  <div class="otq"><small>${esc2(OT.pool.t)}</small><b>${esc2(OT.pool[OT.dir])}</b></div>
  <div class="otcards">${OT.opts.map(o=>`<div class="otcard"><div class="nm">${esc2(o[0])}</div></div>`).join("")}</div>
  <div class="otmsg" id="otMsg">Order them on your phone</div>
  <div class="otwho" id="otWho">${OT.players.map(chip).join("")}</div>`;
  OT.timer=setInterval(()=>{OT.left--;const c=$("otClock");if(c){c.textContent=OT.left;c.classList.toggle("low",OT.left<=5)}
    if(OT.left<=5&&OT.left>0)SFX.beep&&SFX.beep();
    if(OT.left<=0){clearInterval(OT.timer);reveal()}},1000);
  OT.players.filter(p=>p.cpu).forEach(p=>later(()=>{
    const good=Math.random()<.72,ans=answerIdx();
    p.seq=good?ans.slice():ans.slice().sort(()=>Math.random()-.5);lockIn(p)},1800+Math.random()*CFG.secs*500));
  SFX.go&&SFX.go();
}
function lockIn(p){
  if(OT.phase!=="ask"||p.t!=null||p.seq.length<4)return;
  p.t=Date.now()-OT.t0;p.ok=p.seq.join()===answerIdx().join();
  const el=$("otP"+p.slot);if(el){el.classList.remove("wait");el.classList.add("done")}
  SFX.tick&&SFX.tick();
  if(OT.players.every(x=>x.t!=null)){clearInterval(OT.timer);later(reveal,600)}
}
function pickCard(pid,i){
  const p=byPid(pid);if(!p||OT.phase!=="ask"||p.t!=null)return;
  i=+i;if(!(i>=0&&i<4)||p.seq.includes(i))return;
  p.seq.push(i);if(p.seq.length===4)lockIn(p);
}
function reset(pid){const p=byPid(pid);if(p&&OT.phase==="ask"&&p.t==null)p.seq=[]}
function reveal(){
  if(OT.phase!=="ask")return;
  clearT();OT.phase="reveal";
  const right=OT.players.filter(p=>p.t!=null&&p.ok).sort((a,b)=>a.t-b.t);
  right.forEach((p,i)=>{p.got=5+Math.max(1,10-i);p.pts+=p.got});
  const c=$("otClock");if(c){c.textContent="·";c.classList.remove("low")}
  $("otStage").querySelector(".otcards").innerHTML=OT.order.map((o,i)=>`<div class="otcard pop" style="animation-delay:${i*.35}s"><div class="rk">${i+1}</div><div class="nm">${esc2(o[0])}</div><div class="vl">${esc2(fmtV(OT.pool,o[1]))}</div></div>`).join("");
  SFX.ok&&SFX.ok();
  const msg=$("otMsg");if(msg)msg.textContent=right.length?`${esc2(right[0].name)} was fastest!`:"Nobody got it!";
  later(showResults,3600);
  later(()=>{OT.phase="result"},3700);
  later(nextQ,3600+8500+(OT.players.length>6?3000:0));
}
function finish(){
  clearT();OT.phase="final";
  const o=OT.players.slice().sort((a,b)=>b.pts-a.pts),top=o[0].pts,win=o.filter(p=>p.pts===top);OT.winners=win;
  try{window.LB&&LB.record("ot",OT.players.map(p=>({name:p.name,color:p.color,score:p.pts,win:p.pts===top})))}catch(e){}
  $("otCount").textContent="";
  $("otStage").innerHTML=`<div class="otend"><div class="otmsg" style="color:#ffd23f">Final scores</div><div class="big">${win.length>1?"It's a draw!":esc2(win[0].name)+" wins!"}</div>
  <div class="otrank">${o.map(p=>`<div class="r${p.pts===top?" win":""}" style="--pc:${p.color}"><b>${esc2(p.name)}</b><em>${p.pts}</em></div>`).join("")}</div>
  <div class="row"><button class="btn" id="otMenu">Game Night menu</button><button class="btn gold" id="otAgain">Play again</button></div></div>`;
  $("otMenu").onclick=()=>{endGame();show("hub")};
  $("otAgain").onclick=()=>{begin(OT.players.map(p=>({name:p.name,color:p.color,slot:p.slot,pid:p.pid,cpu:p.cpu})))};
  SFX.win&&SFX.win();
}

/* ---------- what phones see ---------- */
function sceneFor(p){
  const me=byPid(p.pid);
  const sc=OT.players.map(q=>({n:q.name,s:q.pts,c:q.color,on:0,pid:q.pid,av:(()=>{try{return avatarSrc(q.slot)}catch(e){return ""}})()}));
  const base={th:"ot",scores:sc,btns:[],sn:OT.n*10+({ask:1,reveal:2,result:3,final:4}[OT.phase]||0),me:1};
  const e=OT.n?`Question ${OT.n} of ${CFG.rounds}`:"Order This";
  if(!me)return {...base,head:{e:"Order This",t:"Watch the TV",s:"You'll be in the next game"}};
  if(OT.phase==="final"){const w=OT.winners.includes(me);return {...base,head:{e:"Game over",t:w?"YOU WIN!":OT.winners.map(x=>x.name).join(" & ")+" wins!",s:"You scored "+me.pts}}}
  if(OT.phase==="ask"){
    const locked=me.t!=null;
    if(locked)return {...base,head:{e,t:"Locked in",s:"Waiting for the others"},big:OT.pool[OT.dir],clock:String(OT.left)};
    return {...base,head:{e,t:OT.pool.t,s:"Tap them in this order"},big:OT.pool[OT.dir],clock:String(OT.left),
      btns:OT.opts.map((o,i)=>{const k=me.seq.indexOf(i);return {t:(k>=0?(k+1)+".  ":"")+o[0],a:"pick",v:i,d:k>=0?1:0,on:k>=0?1:0}}).concat(me.seq.length?[{t:"Start again",cls:"ghost",a:"reset"}]:[])};
  }
  if(OT.phase==="reveal"||OT.phase==="result"){
    return {...base,head:{e,t:me.t==null?"Too slow":me.ok?"Right! +"+me.got:"Wrong order",s:me.ok?"Place "+(OT.players.filter(x=>x.ok&&x.t<=me.t).length)+" of "+OT.players.length+" at "+(me.t/1000).toFixed(1)+"s":"Correct: "+OT.order.map(o=>o[0]).join(", ")}};
  }
  return {...base,head:{e:"Order This",t:"Get ready",s:"Watch the TV"}};
}
function act(p,m){if(m.a==="pick")pickCard(p.pid,m.i);else if(m.a==="reset")reset(p.pid)}
const active=()=>!$("ot").hidden;
window.__OT={OT,CFG,sceneFor,act,active,begin,pickCard,build};
})();
