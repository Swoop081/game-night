/* =================== WEAKEST LINK ===================
   Build a chain of right answers, say BANK to lock the money in, wrong answer breaks the chain.
   Timed round, then everybody votes out the weakest link. Last two play head to head, winner takes the pot. */
(function(){
const CFG={start:120,fin:5};
try{const j=JSON.parse(localStorage.getItem("gn.wl")||"null");if(j)Object.assign(CFG,j)}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.wl",JSON.stringify(CFG))}catch(e){}};
const LADDER=[20,50,100,200,300,450,600,800,1000];
const FONT='"Oxanium","Big Shoulders Display",Impact,sans-serif';
const $$=id=>document.getElementById(id);
const E=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const money=n=>"$"+Number(n||0).toLocaleString("en-AU");
const css=`
#wl,#wlSetup{background:radial-gradient(110% 90% at 50% 0%,#2a2f4a 0%,#12142a 55%,#05050f 100%);position:absolute;overflow:hidden;--stage-2:#1b1e38;--stage-3:#272b4d;--line:#3d4377;--gold:#ffd23f;--gold-deep:#d9a900;--muted:#a9afd8}
#wl>*,#wlSetup>*{position:relative;z-index:2}
#wl{padding:0;gap:0}
#wl .floorbar{padding:1.2vmin 2vmin;gap:2vmin;flex:none}
#wl .brand{font-family:${FONT};letter-spacing:.2em;font-size:clamp(.8rem,2vmin,1.2rem)}
#wl .btn,#wlSetup .btn{border-radius:0;border:0;box-shadow:none;font-family:${FONT};letter-spacing:.14em;text-transform:uppercase}
#wl .btn.ghost,#wlSetup .btn.ghost{background:rgba(0,0,0,.4)}
#wl .btn.gold,#wlSetup .btn.gold{background:#e5173f;color:#fff}
#wlSetup .topbar h2{color:#e5173f}
#wlStage{flex:1;min-height:0;display:flex;flex-direction:column;align-items:stretch;gap:1.2vmin;padding:1.2vmin 2.4vmin 1.6vmin}
.wlhud{flex:none;display:flex;align-items:center;justify-content:space-between;gap:2vmin;font-family:${FONT};letter-spacing:.2em;text-transform:uppercase;font-weight:800;color:#c8cdf0;font-size:clamp(.8rem,2.2vmin,1.3rem)}
.wlclock{font-family:${FONT};font-weight:800;font-size:clamp(1.8rem,7vmin,4rem);line-height:1;color:#fff;font-variant-numeric:tabular-nums;min-width:3.4ch;text-align:center}
.wlclock.low{background:#e5173f;padding:0 .2em}
.wlpot b{color:#ffd23f}
.wlmain{flex:1;min-height:0;display:grid;grid-template-columns:minmax(120px,17%) 1fr minmax(120px,17%);gap:2vmin}
.wlladder{display:flex;flex-direction:column-reverse;gap:.6vmin;justify-content:center}
.wlstep{flex:1;max-height:9vmin;display:flex;align-items:center;justify-content:center;font-family:${FONT};font-weight:900;font-size:clamp(.9rem,3.2vmin,2rem);color:#7f86b8;background:rgba(255,255,255,.07);border-left:.8vmin solid transparent}
.wlstep.on{color:#fff;background:#2a8a4a;border-left-color:#7dff9b}
.wlstep.top{border-left-color:#ffd23f;color:#ffd23f}.wlstep.top.on{color:#fff}
.wlcenter{min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.6vmin;text-align:center}
.wlwho{display:flex;align-items:center;gap:1.4vmin;font-family:${FONT};font-weight:900;text-transform:uppercase;color:#fff;font-size:clamp(1rem,3.4vmin,2.2rem);letter-spacing:.08em}
.wlwho img,.wlwho .ini,.wlpc img,.wlpc .ini,.wlrow img,.wlrow .ini{width:6vmin;height:6vmin;object-fit:cover;background:#fff;color:#05050f;display:flex;align-items:center;justify-content:center;font-weight:900;flex:none}
.wlq{font-family:${FONT};font-weight:900;color:#fff;line-height:1.1;font-size:clamp(1.4rem,5.4vmin,3.6rem);padding:0 1vmin;text-wrap:balance}
.wlmsg{min-height:1.4em;font-family:${FONT};font-weight:900;text-transform:uppercase;font-size:clamp(1.1rem,3.6vmin,2.4rem);color:#fff}
.wlmsg.ok{color:#7dff9b}.wlmsg.bad{color:#ff7a90}
.wlbankbox{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1vmin;background:rgba(0,0,0,.4);border-top:1vmin solid #ffd23f;font-family:${FONT};font-weight:900;text-transform:uppercase;color:#c8cdf0;text-align:center;letter-spacing:.14em;font-size:clamp(.7rem,2vmin,1.2rem)}
.wlbankbox b{font-size:clamp(1.6rem,6vmin,3.6rem);color:#ffd23f;letter-spacing:0;line-height:1}
.wlbankbox small{font-size:.9em;color:#fff}
.wlplayers{flex:none;display:flex;gap:.9vmin;justify-content:center;flex-wrap:wrap}
.wlpc{display:flex;align-items:center;gap:.9vmin;padding:.5vmin 1.2vmin .5vmin .5vmin;background:rgba(0,0,0,.45);border-bottom:.5vmin solid var(--pc);font-family:${FONT};font-weight:800;text-transform:uppercase;color:#fff;font-size:clamp(.7rem,2vmin,1.2rem)}
.wlpc img,.wlpc .ini{width:4.6vmin;height:4.6vmin}
.wlpc.on{background:#e5173f}
.wlpc.out{opacity:.3;filter:grayscale(1)}
.wlpc .st{color:#c8cdf0;font-size:.8em;white-space:nowrap}
.wlpc .st i{font-style:normal;color:#7dff9b}.wlpc .st u{text-decoration:none;color:#ff7a90}
.wlpc .vt{color:#7dff9b}
.wlmid{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.6vmin;text-align:center}
.wlbig{font-family:${FONT};font-weight:900;color:#fff;text-transform:uppercase;font-size:clamp(2rem,8vmin,5.5rem);line-height:1.05}
.wlbig.red{color:#ff3b5c}
.wlsub{font-family:${FONT};font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#c8cdf0;font-size:clamp(1rem,3vmin,2rem)}
.wllist{display:flex;flex-direction:column;gap:.8vmin;width:min(900px,96%)}
.wlrow{display:flex;align-items:center;gap:1.4vmin;background:rgba(0,0,0,.4);border-left:1vmin solid var(--pc);padding:.5vmin 1.4vmin .5vmin .7vmin;font-family:${FONT};font-weight:900;color:#fff;text-transform:uppercase;font-size:clamp(.85rem,3vmin,1.8rem);animation:wlpop .4s both}
@keyframes wlpop{from{transform:translateY(2vmin);opacity:0}to{transform:none;opacity:1}}
.wlrow b{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wlrow .n{min-width:3.4em;text-align:right;color:#c8cdf0;font-size:.8em}
.wlrow .n i{font-style:normal;color:#7dff9b}.wlrow .n u{text-decoration:none;color:#ff7a90}
.wlrow .tag{font-size:.6em;padding:.2em .7em;background:#2a8a4a;letter-spacing:.14em}
.wlrow .tag.weak{background:#e5173f}
.wlrow.win{background:#e5173f}
.wlrow .vv{color:#ffd23f}
.wlfin{display:flex;gap:4vmin;align-items:center;justify-content:center}
.wlfin .side{display:flex;flex-direction:column;align-items:center;gap:1vmin;padding:1.6vmin 3vmin;background:rgba(0,0,0,.4);border-bottom:.8vmin solid var(--pc);font-family:${FONT};font-weight:900;text-transform:uppercase;color:#fff;font-size:clamp(1rem,3.2vmin,2rem)}
.wlfin .side.on{background:#e5173f}
.wlfin .side img,.wlfin .side .ini{width:9vmin;height:9vmin;object-fit:cover;background:#fff;color:#05050f;display:flex;align-items:center;justify-content:center;font-weight:900}
.wlfin .dots{display:flex;gap:.8vmin}
.wlfin .dots i{width:2.4vmin;height:2.4vmin;border-radius:50%;background:rgba(255,255,255,.2)}
.wlfin .dots i.y{background:#7dff9b}.wlfin .dots i.n{background:#ff3b5c}
.wlfin .sc{font-size:2.4em;line-height:1}
#playWL{background:linear-gradient(160deg,#2a2f4a,#05050f)!important;border-color:#e5173f!important}
#playWL .wlart{display:flex;flex-direction:column;gap:3px;padding:8px 14px;width:100%}
#playWL .wlart i{display:block;height:7px;background:#7dff9b;opacity:.9}
#playWL .wlart i:nth-child(n+7){background:#e5173f}
#wlSetup .rules li{margin:.3em 0}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const hub=document.querySelector(".games");if(!hub)return;
const tile=document.createElement("button");tile.className="game live";tile.id="playWL";
tile.innerHTML=`<span class="art"><span class="wlart"><i style="width:30%"></i><i style="width:38%"></i><i style="width:46%"></i><i style="width:54%"></i><i style="width:62%"></i><i style="width:70%"></i><i style="width:80%"></i><i style="width:90%"></i></span><span class="pill">Play</span></span><h2>Weakest Link</h2><p>Chain it, bank it, vote out the weakest.</p>`;
hub.insertBefore(tile,hub.children[1]||null);
const hn=hub.children.length;hub.classList.remove("five","six","seven");if(hn>=7)hub.classList.add("seven");
const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="wlSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="wl";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>WEAKEST LINK</small></span><span class="spacer"></span><span class="count" id="wlCount"></span><button class="btn ghost" id="wlQuit">Quit</button></div><div id="wlStage"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("wlQuit").onclick=()=>confirmSheet("Quit this game?","Everyone will be back in the lobby.","Quit",()=>{closeOverlay();endGame();show("hub")});

function openSetup(){
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="wlBack">← Back</button><h2>Weakest Link</h2><button class="btn gold" id="wlStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li>Players answer in turn on their phones. Every right answer <b>adds to the chain</b>: $20, $50, $100, $200, $300, $450, $600, $800, $1,000.</li>
      <li>On your turn you can tap <b>BANK</b> to lock the chain's money into the round bank. A <b>wrong answer or pass breaks the chain</b> and loses whatever wasn't banked.</li>
      <li>When the round clock runs out, the bank goes into the pot. The clock gets 10 seconds shorter every round.</li>
      <li>Then everyone <b>votes on their phone</b> for the weakest link. The most votes is out. Ties are decided by the strongest link.</li>
      <li>When two players are left it is a <b>head to head</b> of ${CFG.fin} questions each. The winner takes the whole pot. 3 to 8 players.</li></ul></div>
    <div class="field"><span class="eyebrow">First round time</span><div class="seg" id="wlTimeSeg"></div></div>
    <div class="field"><span class="eyebrow">Final questions each</span><div class="seg" id="wlFinSeg"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="wlSoundSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players</span><div id="wlPlayers" class="hlsetup"><div class="note">Join with your phones. You need at least 3 players (CPU players count).</div></div></div></div>`;
  seg($("wlTimeSeg"),[90,120,180],()=>CFG.start,v=>{CFG.start=v;saveCfg()},v=>fmt(v));
  seg($("wlFinSeg"),[3,5,7],()=>CFG.fin,v=>{CFG.fin=v;saveCfg()},v=>String(v));
  seg($("wlSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  $("wlBack").onclick=()=>show("hub");$("wlStart").onclick=()=>{ac();startGame()};
  show("wlSetup");
}
const fmt=s=>{s=Math.max(0,Math.ceil(s));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")};

/* ---------- questions ---------- */
let POOL=null;
function buildPool(){
  if(POOL)return POOL;
  const out=[];
  (window.TP_RAW||[]).forEach(l=>{const [cat,q,a]=String(l).split("|");const alts=(a||"").split("~").map(s=>s.trim()).filter(Boolean);if(q&&alts.length)out.push({q,alts,g:"tp:"+q.split(" ").slice(0,3).join(" ").toLowerCase()})});
  const bad=/which of|following|these|which one|true or|false|not\b|all of the|both|\bor\b.*\?$/i;
  (window.CR_QS||[]).forEach(r=>{
    const q=r[1],a=r[2];if(!q||!a||bad.test(q))return;
    if(String(a).split(/\s+/).length>4)return;
    out.push({q,alts:[a],g:q.split(" ").slice(0,3).join(" ").toLowerCase()});
  });
  const groups={};out.forEach(x=>{(groups[x.g]=groups[x.g]||[]).push(x)});
  POOL={groups,keys:Object.keys(groups),n:out.length};return POOL;
}
let SEEN=null;
const seenLoad=()=>{if(SEEN)return SEEN;try{SEEN=new Set(JSON.parse(localStorage.getItem("gn.wl.seen")||"[]"))}catch(e){SEEN=new Set()}return SEEN};
const seenSave=()=>{try{localStorage.setItem("gn.wl.seen",JSON.stringify([...SEEN].slice(-4000)))}catch(e){}};
function pickQ(){
  const P=buildPool(),seen=seenLoad();
  for(let tries=0;tries<40;tries++){
    const k=P.keys[Math.floor(Math.random()*P.keys.length)],g=P.groups[k].filter(x=>!seen.has(x.q));
    if(!g.length)continue;
    const q=g[Math.floor(Math.random()*g.length)];seen.add(q.q);seenSave();return q;
  }
  seen.clear();return pickQ();
}
const nm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/&/g," and ").replace(/[^a-z0-9 ]/g," ").replace(/\b(the|a|an)\b/g," ").replace(/\s+/g," ").trim();
const lev=(a,b)=>{const d=[];for(let i=0;i<=a.length;i++)d[i]=[i];for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length]};
function isRight(text,q){
  const h=nm(text);if(!h)return false;
  for(const alt of q.alts){
    const a=nm(alt);if(!a)continue;
    if(h===a)return true;
    if(/^\d+$/.test(a))continue;
    if(a.length>=4&&(" "+h+" ").includes(" "+a+" ")&&h.length<=a.length+14)return true;
    const tol=a.length>=9?2:a.length>=5?1:0;
    if(tol&&lev(h,a)<=tol)return true;
  }
  return false;
}

/* ---------- state ---------- */
const WL={players:[],ph:"idle",round:0,time:0,bank:0,pot:0,chain:0,order:[],idx:0,cur:null,q:null,sn:0,T:[],tm:null,qt:null,snap:null,fb:null,
  votes:{},tie:[],elim:[],fin:null,starter:null,winner:null,last:null,note:""};
const clearT=()=>{WL.T.forEach(clearTimeout);WL.T=[];clearInterval(WL.tm);clearTimeout(WL.qt);WL.tm=null};
const later=(fn,ms)=>{WL.T.push(setTimeout(fn,ms))};
const phase=p=>{WL.ph=p;WL.sn++};
function endGame(){clearT();WL.ph="idle"}
const av=p=>{try{return avatarSrc(p.slot)}catch(e){return ""}};
const avEl=p=>`<img alt="" src="${esc(av(p))}" onerror="this.outerHTML='<span class=ini>${esc((p.name||"?").charAt(0).toUpperCase())}</span>'">`;
const alive=()=>WL.players.filter(p=>!p.out);
const chainVal=n=>n>0?LADDER[Math.min(n,LADDER.length)-1]:0;
const stage=h=>{$("wlStage").innerHTML=h};
const sfx=n=>{try{SFX[n]&&SFX[n]()}catch(e){}};

function startGame(){
  const L=window.LINK&&LINK.pull?LINK.pull(3,8,{cpu:true}):null;
  if(!L||L.length<3){
    openOverlay(`<span class="eyebrow">Weakest Link</span><h2>Need 3 players</h2><p class="score">Scan the join code with your phones${L&&L.length?` (${L.length} in so far)`:""}. CPU players count. Up to 8 players.</p><div class="row"><button class="btn" id="wlAddCpu">Add a CPU player</button><button class="btn gold" id="wlOk">OK</button></div>`);
    $("wlAddCpu").onclick=()=>{window.LINK&&LINK.addCpu&&LINK.addCpu();closeOverlay()};$("wlOk").onclick=closeOverlay;return;
  }
  begin(L.slice(0,8).map((p,i)=>({name:p.name,color:DISTINCT[i%DISTINCT.length],slot:i,pid:p.pid,cpu:!!p.cpu})));
}
function begin(list){
  save();show("wl");clearT();
  WL.players=list.map(p=>({...p,out:false,tc:0,tw:0,bankedAmt:0,c:0,w:0,vote:null}));
  WL.round=0;WL.pot=0;WL.elim=[];WL.winner=null;WL.starter=null;WL.fin=null;
  phase("intro");startRound();
}
const byPid=pid=>WL.players.find(p=>p.pid===pid);

/* ---------- rounds ---------- */
function roundTime(){return Math.max(40,CFG.start-10*(WL.round-1))}
function startRound(){
  clearT();WL.round++;WL.time=roundTime();WL.bank=0;WL.chain=0;WL.q=null;WL.cur=null;
  WL.players.forEach(p=>{p.c=0;p.w=0;p.rb=0;p.vote=null});
  const al=alive();
  let s=al.indexOf(WL.starter);if(s<0)s=0;
  WL.order=al.slice(s).concat(al.slice(0,s));WL.idx=0;
  $("wlCount").textContent=`Round ${WL.round}`;
  phase("intro");
  stage(`<div class="wlmid"><div class="wlsub">Round ${WL.round}</div><div class="wlbig">${fmt(WL.time)}</div><div class="wlsub">on the clock · ${al.length} players left</div><div class="wlsub" style="color:#ffd23f">Pot so far ${money(WL.pot)}</div>
    <div class="wlsub">${E(WL.order[0].name)} goes first</div></div>${playersHTML()}`);
  sfx("go");
  later(()=>{WL.last=Date.now();WL.tm=setInterval(tick,100);nextQ()},3800);
}
function tick(){
  if(WL.ph!=="ask"&&WL.ph!=="fb")return;
  if(!$("overlay").hidden){WL.last=Date.now();return}
  const now=Date.now();WL.time-=(now-WL.last)/1000;WL.last=now;
  const c=$$("wlClock");
  if(WL.time<=0){WL.time=0;if(c)c.textContent=fmt(0);return endRound("Time's up!")}
  if(c){c.textContent=fmt(WL.time);c.classList.toggle("low",WL.time<=10)}
}
function hudHTML(){return `<div class="wlhud"><span>Round ${WL.round}</span><span class="wlclock${WL.time<=10?" low":""}" id="wlClock">${fmt(WL.time)}</span><span class="wlpot">Pot <b>${money(WL.pot)}</b></span></div>`}
function playersHTML(){
  return `<div class="wlplayers">${WL.players.map(p=>`<div class="wlpc${p===WL.cur&&WL.ph==="ask"?" on":""}${p.out?" out":""}" style="--pc:${p.color}">${avEl(p)}<span>${E(p.name)}</span><span class="st"><i>${p.c}</i> / <u>${p.w}</u></span></div>`).join("")}</div>`;
}
function ladderHTML(){
  return `<div class="wlladder">${LADDER.map((v,i)=>`<div class="wlstep${WL.chain>i?" on":""}${i===LADDER.length-1?" top":""}">${money(v)}</div>`).join("")}</div>`;
}
function renderAsk(){
  const p=WL.cur;
  stage(`${hudHTML()}<div class="wlmain">${ladderHTML()}
    <div class="wlcenter"><div class="wlwho">${avEl(p)}<span>${E(p.name)}</span></div><div class="wlq">${E(WL.q.q)}</div><div class="wlmsg" id="wlMsg">${p.cpu?"":"Answer on your phone"}</div><div class="row" id="wlBtns"></div></div>
    <div class="wlbankbox"><span>Round bank</span><b id="wlBank">${money(WL.bank)}</b><span>Chain</span><b style="font-size:clamp(1.2rem,4.4vmin,2.6rem)" id="wlChainV">${money(chainVal(WL.chain))}</b></div></div>${playersHTML()}`);
}
function nextQ(){
  if(WL.ph==="end"||WL.ph==="idle")return;
  if(WL.time<=0)return endRound("Time's up!");
  WL.cur=WL.order[WL.idx%WL.order.length];WL.q=pickQ();WL.fb=null;phase("ask");
  renderAsk();
  clearTimeout(WL.qt);WL.qt=setTimeout(()=>{if(WL.ph==="ask")answer(WL.cur,"")},25000);
  const p=WL.cur;
  if(p.cpu)cpuTurn(p);
}
function cpuTurn(p){
  const need=WL.chain>=5?.8:WL.chain>=3?.4:0;
  later(()=>{if(WL.ph!=="ask"||WL.cur!==p)return;if(WL.chain>0&&Math.random()<need)bank(p)},1100+Math.random()*900);
  later(()=>{if(WL.ph!=="ask"||WL.cur!==p)return;answer(p,Math.random()<.66?WL.q.alts[0]:"hmm")},2200+Math.random()*2600);
}
function bank(p){
  if(WL.ph!=="ask"||WL.cur!==p||WL.chain<1)return;
  const v=chainVal(WL.chain);WL.bank+=v;p.rb=(p.rb||0)+v;p.bankedAmt+=v;WL.chain=0;WL.sn++;sfx("win");
  const b=$$("wlBank");if(b)b.textContent=money(WL.bank);
  const cv=$$("wlChainV");if(cv)cv.textContent=money(0);
  const lad=document.querySelector(".wlladder");if(lad)lad.outerHTML=ladderHTML();
  const m=$$("wlMsg");if(m){m.className="wlmsg ok";m.textContent=p.name+" banks "+money(v)+"!"}
}
function answer(p,text){
  if(WL.ph!=="ask"||WL.cur!==p)return;
  clearTimeout(WL.qt);
  const ok=isRight(text,WL.q);
  WL.snap={chain:WL.chain,bank:WL.bank,c:p.c,w:p.w,tc:p.tc,tw:p.tw,rb:p.rb,ba:p.bankedAmt};
  phase("fb");WL.fb={ok,p};
  let msg="";
  if(ok){
    p.c++;p.tc++;WL.chain++;sfx("ok");msg="Correct!";
    if(WL.chain>=LADDER.length){WL.bank+=LADDER[LADDER.length-1];p.rb=(p.rb||0)+1000;p.bankedAmt+=1000;WL.chain=0;msg="Correct! Max chain banked!"}
  }else{
    p.w++;p.tw++;WL.chain=0;sfx(text?"buzz":"pass");msg="Wrong! The answer was "+WL.q.alts[0];
  }
  WL.idx++;
  const m=$$("wlMsg"),b=$$("wlBank"),cv=$$("wlChainV");
  if(m){m.className="wlmsg "+(ok?"ok":"bad");m.textContent=msg}
  if(b)b.textContent=money(WL.bank);if(cv)cv.textContent=money(chainVal(WL.chain));
  const lad=document.querySelector(".wlladder");if(lad)lad.outerHTML=ladderHTML();
  const pl=document.querySelector(".wlplayers");if(pl)pl.outerHTML=playersHTML();
  const bt=$$("wlBtns");
  if(!ok&&bt&&!p.cpu){bt.innerHTML=`<button class="btn" id="wlRight">Mark it correct</button>`;$$("wlRight").onclick=()=>override(p)}
  later(()=>{if(WL.ph==="fb")nextQ()},ok?900:2600);
}
function override(p){
  if(WL.ph!=="fb"||!WL.fb||WL.fb.ok||WL.fb.p!==p||!WL.snap)return;
  const s=WL.snap;WL.chain=s.chain;WL.bank=s.bank;p.c=s.c;p.w=s.w;p.tc=s.tc;p.tw=s.tw;p.rb=s.rb;p.bankedAmt=s.ba;
  WL.idx--;WL.T.forEach(clearTimeout);WL.T=[];
  WL.ph="ask";WL.cur=p;WL.fb=null;
  // replay as a right answer
  WL.ph="ask";answer(p,WL.q.alts[0]);
}
function endRound(why){
  if(WL.ph==="stats"||WL.ph==="vote")return;
  clearT();phase("stats");
  WL.pot+=WL.bank;
  const al=alive();
  const strong=al.slice().sort((a,b)=>b.c-a.c||a.w-b.w||(b.rb||0)-(a.rb||0))[0];
  const weak=al.slice().sort((a,b)=>b.w-a.w||a.c-b.c||(a.rb||0)-(b.rb||0))[0];
  WL.strong=strong;WL.weak=weak;WL.starter=strong;
  sfx("buzz");
  stage(`<div class="wlmid"><div class="wlbig">${E(why||"Round over")}</div><div class="wlsub">Banked this round ${money(WL.bank)} · Pot <span style="color:#ffd23f">${money(WL.pot)}</span></div>
    <div class="wllist">${al.slice().sort((a,b)=>b.c-a.c||a.w-b.w).map(p=>`<div class="wlrow" style="--pc:${p.color}">${avEl(p)}<b>${E(p.name)}</b>${p===strong?`<span class="tag">Strongest link</span>`:""}${p===weak?`<span class="tag weak">Weakest link</span>`:""}<span class="n"><i>${p.c}</i> right <u>${p.w}</u> wrong</span><span class="n">${money(p.rb||0)}</span></div>`).join("")}</div></div>`);
  later(startVote,9000);
}
/* ---------- voting ---------- */
function startVote(){
  clearT();phase("vote");WL.votes={};WL.tie=[];WL.left=25;
  alive().forEach(p=>p.vote=null);
  paintVote();
  WL.tm=setInterval(()=>{WL.left--;const c=$$("wlVoteClock");if(c)c.textContent=WL.left;if(WL.left<=0)finishVote()},1000);
  alive().filter(p=>p.cpu).forEach(p=>later(()=>castVote(p,cpuPick(p)),1800+Math.random()*5000));
}
function cpuPick(p){
  const o=alive().filter(x=>x!==p).map(x=>({x,s:x.w*3-x.c*2+Math.random()*2.5}));
  o.sort((a,b)=>b.s-a.s);return o[0].x;
}
function paintVote(){
  const al=alive();
  stage(`<div class="wlmid"><div class="wlsub">Round ${WL.round} · vote on your phone</div><div class="wlbig red">Who is the weakest link?</div><div class="wlclock" id="wlVoteClock">${WL.left}</div></div>
    <div class="wlplayers">${al.map(p=>`<div class="wlpc" style="--pc:${p.color}">${avEl(p)}<span>${E(p.name)}</span><span class="st vt">${p.vote?"✓ voted":"…"}</span></div>`).join("")}</div>`);
}
function castVote(p,target){
  if(WL.ph!=="vote"||p.out||!target||target.out||target===p)return;
  p.vote=target;WL.sn++;sfx("tick");paintVote();
  if(alive().every(x=>x.vote)){clearInterval(WL.tm);later(finishVote,700)}
}
function finishVote(){
  if(WL.ph!=="vote")return;clearT();phase("reveal");
  alive().forEach(p=>{if(!p.vote)p.vote=cpuPick(p)});
  const al=alive();let i=0;const rows=[];
  const show1=()=>{
    if(i>=al.length)return tally();
    const v=al[i++];rows.push(`<div class="wlrow" style="--pc:${v.color}">${avEl(v)}<b>${E(v.name)}</b><span class="n">votes</span><span class="vv">${E(v.vote.name)}</span></div>`);
    stage(`<div class="wlmid"><div class="wlsub">The votes</div><div class="wllist">${rows.join("")}</div></div>`);sfx("tick");later(show1,1500);
  };
  show1();
}
function tally(){
  const al=alive(),cnt=new Map(al.map(p=>[p,0]));al.forEach(v=>cnt.set(v.vote,(cnt.get(v.vote)||0)+1));
  const max=Math.max(...cnt.values()),top=[...cnt.keys()].filter(k=>cnt.get(k)===max);
  const html=[...cnt.entries()].sort((a,b)=>b[1]-a[1]).map(([p,n])=>`<div class="wlrow${n===max?" win":""}" style="--pc:${p.color}">${avEl(p)}<b>${E(p.name)}</b><span class="vv">${n} vote${n===1?"":"s"}</span></div>`).join("");
  stage(`<div class="wlmid"><div class="wlsub">Votes counted</div><div class="wllist">${html}</div></div>`);
  if(top.length===1)return later(()=>eliminate(top[0]),3000);
  later(()=>tieBreak(top),3000);
}
function tieBreak(top){
  const strong=WL.strong&&!WL.strong.out?WL.strong:alive()[0];
  const cands=top.filter(p=>p!==strong);
  if(!cands.length||top.length===alive().length&&false)return eliminate(top[0]);
  if(top.includes(strong)&&cands.length===1)return eliminate(cands[0]);
  if(top.includes(strong)){ // strongest link is tied: the weakest stats among the others goes
    return eliminate(cands.slice().sort((a,b)=>b.w-a.w||a.c-b.c)[0]);
  }
  phase("tie");WL.tie=cands;WL.tiePick=strong;WL.left=15;
  stage(`<div class="wlmid"><div class="wlsub">It's a tie</div><div class="wlbig red">${E(strong.name)}, strongest link,<br>you decide</div><div class="wlsub">${top.map(p=>E(p.name)).join(" or ")}</div><div class="wlclock" id="wlVoteClock">${WL.left}</div></div>`);
  WL.tm=setInterval(()=>{WL.left--;const c=$$("wlVoteClock");if(c)c.textContent=WL.left;if(WL.left<=0)tiePick(cands.slice().sort((a,b)=>b.w-a.w||a.c-b.c)[0])},1000);
  if(strong.cpu)later(()=>tiePick(cands.slice().sort((a,b)=>b.w-a.w||a.c-b.c)[0]),2500);
}
function tiePick(p){
  if(WL.ph!=="tie"||!p)return;clearT();eliminate(p);
}
function eliminate(p){
  clearT();phase("elim");p.out=true;WL.elim.push(p);
  stage(`<div class="wlmid">${avEl(p).replace("<img","<img style='width:22vmin;height:22vmin'")}<div class="wlbig red">${E(p.name)}</div><div class="wlbig" style="font-size:clamp(1.4rem,5.4vmin,3.4rem)">You are the weakest link.<br>Goodbye.</div></div>`);
  sfx("buzz");
  later(()=>{
    const al=alive();
    if(al.length<=2)return startFinal(al);
    startRound();
  },4500);
}
/* ---------- final ---------- */
function startFinal(al){
  clearT();
  const a=al.includes(WL.starter)?WL.starter:al[0],b=al.find(x=>x!==a);
  WL.fin={a,b,seq:[],n:0,sa:0,sb:0,hist:{a:[],b:[]},sudden:false};
  $("wlCount").textContent="Head to head";
  phase("finintro");
  stage(`<div class="wlmid"><div class="wlsub">Head to head</div><div class="wlbig">${E(a.name)} vs ${E(b.name)}</div><div class="wlsub">${CFG.fin} questions each · winner takes ${money(WL.pot)}</div><div class="wlsub">${E(a.name)} goes first</div></div>`);
  sfx("go");later(finQ,4200);
}
function finHTML(msg){
  const f=WL.fin,cur=WL.cur;
  const side=(p,k)=>`<div class="side${cur===p&&WL.ph==="finask"?" on":""}" style="--pc:${p.color}">${avEl(p)}<span>${E(p.name)}</span><span class="sc">${k==="a"?f.sa:f.sb}</span><div class="dots">${f.hist[k].map(x=>`<i class="${x?"y":"n"}"></i>`).join("")}</div></div>`;
  return `<div class="wlhud"><span>Head to head</span><span class="wlclock" id="wlClock">${WL.left!=null&&WL.ph==="finask"?WL.left:""}</span><span class="wlpot">Pot <b>${money(WL.pot)}</b></span></div>
  <div class="wlmid"><div class="wlfin">${side(f.a,"a")}${side(f.b,"b")}</div>${f.q?`<div class="wlq">${E(f.q.q)}</div>`:""}<div class="wlmsg ${f.ok==null?"":f.ok?"ok":"bad"}" id="wlMsg">${msg||""}</div></div>`;
}
function finQ(){
  const f=WL.fin;if(!f||WL.ph==="end"||WL.ph==="idle")return;
  const turnsDone=f.n;const p=turnsDone%2===0?f.a:f.b;
  f.q=pickQ();f.ok=null;WL.cur=p;WL.q=f.q;WL.left=25;phase("finask");
  stage(finHTML(p.cpu?"":"Answer on your phone"));
  WL.tm=setInterval(()=>{WL.left--;const c=$$("wlClock");if(c)c.textContent=WL.left;if(WL.left<=0)finAnswer(p,"")},1000);
  if(p.cpu)later(()=>finAnswer(p,Math.random()<.68?f.q.alts[0]:"hmm"),2400+Math.random()*3200);
}
function finAnswer(p,text){
  const f=WL.fin;if(WL.ph!=="finask"||WL.cur!==p)return;clearT();
  const ok=isRight(text,f.q);f.ok=ok;phase("finfb");
  const k=p===f.a?"a":"b";f.hist[k].push(ok);if(ok){if(k==="a")f.sa++;else f.sb++}f.n++;
  sfx(ok?"ok":"buzz");
  stage(finHTML(ok?"Correct!":"Wrong! The answer was "+f.q.alts[0]));
  later(()=>{
    const done=f.n%2===0&&f.n>=CFG.fin*2;
    if(done&&f.sa!==f.sb)return finish(f.sa>f.sb?f.a:f.b);
    finQ();
  },ok?1600:2600);
}
function finish(w){
  clearT();phase("end");WL.winner=w;
  const f=WL.fin,loser=w===f.a?f.b:f.a;
  const order=[w,loser].concat(WL.elim.slice().reverse());
  window.LB&&LB.record("wl",WL.players.map(p=>({name:p.name,color:p.color,score:p===w?WL.pot:0,win:p===w})));
  stage(`<div class="wlmid"><div class="wlsub">Weakest Link</div><div class="wlbig">${E(w.name)} wins ${money(WL.pot)}</div>
    <div class="wllist">${order.map((p,i)=>`<div class="wlrow${p===w?" win":""}" style="--pc:${p.color}">${avEl(p)}<b>${E(p.name)}</b><span class="n">${i===0?"Winner":i===1?"Runner up":"Out"}</span><span class="n"><i>${p.tc}</i> right <u>${p.tw}</u> wrong</span></div>`).join("")}</div>
    <div class="row"><button class="btn" id="wlMenu">Game Night menu</button><button class="btn gold" id="wlAgain">Play again</button></div></div>`);
  confetti&&confetti([w.color,"#e5173f","#fffdf6"]);sfx("win");
  $("wlMenu").onclick=()=>{stopConfetti();endGame();show("hub")};
  $("wlAgain").onclick=()=>{stopConfetti();begin(WL.players.map(p=>({name:p.name,color:p.color,slot:p.slot,pid:p.pid,cpu:p.cpu})))};
}

/* ---------- phone companion ---------- */
const active=()=>{const e=$("wl");return !!e&&!e.hidden&&WL.players.length>0};
function sceneFor(ph){
  const sc=WL.players.map(q=>({n:q.name,s:q.out?"OUT":money(q.bankedAmt),c:q.color,on:q===WL.cur&&(WL.ph==="ask"||WL.ph==="finask")?1:0,pid:q.pid,av:av(q)}));
  const me=byPid(ph.pid);
  const base={th:"wl",scores:sc,btns:[],sn:WL.sn,me:0};
  if(!me)return {...base,head:{e:"Weakest Link",t:"Watch the TV",s:"You'll be in the next game"}};
  const e="Round "+WL.round;
  const P=WL.ph;
  if(me.out&&P!=="end")return {...base,head:{e:"Weakest Link",t:"You are out",s:"Watch the TV. Pot "+money(WL.pot)}};
  if(P==="end")return {...base,head:{e:"Game over",t:WL.winner===me?"YOU WIN "+money(WL.pot)+"!":WL.winner.name+" wins",s:""}};
  if(P==="ask"||P==="fb"){
    const mine=WL.cur===me;
    const stat=`Chain ${money(chainVal(WL.chain))} · Bank ${money(WL.bank)}`;
    if(!mine)return {...base,head:{e,t:WL.cur.name+(P==="ask"?" is answering":""),s:stat},clock:fmt(WL.time)};
    if(P==="fb")return {...base,head:{e,t:WL.fb&&WL.fb.ok?"Correct!":"Wrong!",s:stat},clock:fmt(WL.time)};
    return {...base,me:1,head:{e,t:WL.q.q,s:stat},clock:fmt(WL.time),inp:{ph:"Type your answer"},
      btns:[{t:"BANK "+money(chainVal(WL.chain)),a:"bank",v:0,d:WL.chain?0:1,cls:"gold"},{t:"Pass",a:"pass",v:0,cls:"ghost"}]};
  }
  if(P==="vote"){
    const others=alive().filter(x=>x!==me);
    return {...base,me:1,head:{e,t:"Who is the weakest link?",s:me.vote?"You voted for "+me.vote.name+". You can change it.":"Vote someone out"},clock:String(WL.left),
      btns:others.map(x=>({t:x.name,a:"vote",v:WL.players.indexOf(x),on:me.vote===x?1:0,c:x.color}))};
  }
  if(P==="tie"){
    if(WL.tiePick===me)return {...base,me:1,head:{e:"Tie!",t:"You are the strongest link",s:"Choose who goes"},clock:String(WL.left),btns:WL.tie.map(x=>({t:x.name,a:"tb",v:WL.players.indexOf(x),c:x.color}))};
    return {...base,head:{e:"It's a tie",t:WL.tiePick.name+" decides",s:"Watch the TV"}};
  }
  if(P==="finask"||P==="finfb"){
    const f=WL.fin,inF=me===f.a||me===f.b,mine=WL.cur===me;
    if(P==="finask"&&mine)return {...base,me:1,head:{e:"Head to head",t:f.q.q,s:f.a.name+" "+f.sa+" - "+f.sb+" "+f.b.name},clock:String(WL.left),inp:{ph:"Type your answer"},btns:[{t:"Pass",a:"pass",v:0,cls:"ghost"}]};
    return {...base,head:{e:"Head to head",t:P==="finfb"?(f.ok?"Correct!":"Wrong!"):WL.cur.name+" is answering",s:f.a.name+" "+f.sa+" - "+f.sb+" "+f.b.name}};
  }
  if(P==="stats")return {...base,head:{e,t:"Round over",s:"Look at the TV. Banked "+money(WL.bank)}};
  if(P==="reveal"||P==="elim")return {...base,head:{e,t:"The votes are in",s:"Watch the TV"}};
  return {...base,head:{e:"Weakest Link",t:"Get ready",s:"Watch the TV"}};
}
function act(p,m){
  const me=byPid(p.pid);if(!me)return;
  if(m.a==="bank"){bank(me);return}
  if(m.a==="pass"){if(WL.ph==="ask"&&WL.cur===me)answer(me,"");else if(WL.ph==="finask"&&WL.cur===me)finAnswer(me,"");return}
  if(m.a==="vote"){castVote(me,WL.players[+m.i]);return}
  if(m.a==="tb"){if(WL.ph==="tie"&&WL.tiePick===me){const t=WL.players[+m.i];if(WL.tie.includes(t))tiePick(t)}}
}
function text(p,v){
  const me=byPid(p.pid);if(!me)return;const s=String(v||"").slice(0,60);if(!s.trim())return;
  if(WL.ph==="ask"&&WL.cur===me)answer(me,s);
  else if(WL.ph==="finask"&&WL.cur===me)finAnswer(me,s);
}
window.__WL={WL,CFG,sceneFor,act,text,active,isRight,pickQ,buildPool};
})();
