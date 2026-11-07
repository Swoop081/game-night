/* =================== THE 100 (or less) ===================
   As many players as you like, all on phones. One question, two answers (a red square and a blue square).
   Everyone locks in an answer on their phone, then the TV slides every player's photo onto the square they picked.
   Wrong answer = you're out. Right answer = on to the next question. Every 5 questions the difficulty steps up.
   Last player standing wins. (If every remaining player is wrong, nobody is out.) */
(function(){
const QS=window.CR_QS||[];
const CFG={secs:15};
try{const j=JSON.parse(localStorage.getItem("gn.cr")||"null");if(j)Object.assign(CFG,j)}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.cr",JSON.stringify(CFG))}catch(e){}};
const FONT='"Oxanium","Big Shoulders Display",Impact,sans-serif';
const CA="#e5173f",CB="#1e6bff";
const css=`
#cr,#crSetup{background:radial-gradient(120% 90% at 50% 0%,#1a2a6e 0%,#0a1038 55%,#04061c 100%);position:absolute;overflow:hidden;--stage-2:#101a52;--stage-3:#18246e;--line:#2c3d9e;--gold:#ffd400;--gold-deep:#d4af00;--muted:#aab6ff}
#cr>*,#crSetup>*{position:relative;z-index:2}
#cr{padding:0;gap:0}
#cr .floorbar{padding:1.2vmin 2vmin;gap:2vmin;flex:none}
#cr .brand{font-family:${FONT};letter-spacing:.2em;font-size:clamp(.8rem,2vmin,1.2rem)}
#cr .btn,#crSetup .btn{border-radius:0;border:0;box-shadow:none;font-family:${FONT};letter-spacing:.14em;text-transform:uppercase}
#cr .btn.ghost,#crSetup .btn.ghost{background:rgba(0,0,0,.4)}
#cr .btn.gold,#crSetup .btn.gold{background:#ffd400;color:#0a1038}
#crSetup .topbar h2{color:#ffd400}
#crStage{flex:1;min-height:0;display:flex;flex-direction:column;align-items:stretch;gap:1.4vmin;padding:1.4vmin 2.4vmin 1.8vmin}
.crhud{display:flex;align-items:center;justify-content:space-between;gap:2vmin;font-family:${FONT};letter-spacing:.2em;text-transform:uppercase;font-weight:800;color:#ffd400;font-size:clamp(.8rem,2.2vmin,1.3rem)}
.crhud b{color:#fff;font-size:1.3em}
.crq{font-family:${FONT};font-weight:900;color:#fff;text-align:center;text-transform:uppercase;font-size:clamp(1.3rem,5.2vmin,3.4rem);line-height:1.08;flex:none}
.crclock{font-family:${FONT};font-weight:800;font-size:clamp(1.8rem,7vmin,4rem);line-height:1;color:#ffd400;font-variant-numeric:tabular-nums;min-width:2.2ch;text-align:center}
.crclock.low{color:#fff;background:#e5173f;padding:0 .2em}
.crzones{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:2vmin}
.crzone{position:relative;display:flex;flex-direction:column;align-items:center;gap:1vmin;padding:1.4vmin;background:color-mix(in srgb,var(--zc) 55%,#04061c);border-top:1.2vmin solid var(--zc);min-height:0;overflow:hidden;transition:opacity .6s,filter .6s,background .4s}
.crzone .lab{font-family:${FONT};font-weight:900;text-transform:uppercase;color:#fff;text-align:center;font-size:clamp(1.2rem,4.4vmin,3rem);line-height:1.05;flex:none}
.crzone .tag{font-family:${FONT};font-weight:900;letter-spacing:.2em;font-size:clamp(.8rem,2.4vmin,1.5rem);flex:none;min-height:1.2em}
.crzone .toks{flex:1;min-height:0;display:flex;flex-wrap:wrap;gap:.6vmin;align-content:flex-start;justify-content:center;overflow:hidden;width:100%}
.crzone.win{background:#0e8a3e;border-top-color:#3dff7a;box-shadow:0 0 6vmin #3dff7a}
.crzone.win .tag{color:#fff}
.crzone.lose{opacity:.4;filter:grayscale(1)}
.crzone.lose .tag{color:#fff}
.crpool{flex:none;max-height:26%;display:flex;flex-wrap:wrap;gap:.6vmin;justify-content:center;align-content:flex-start;overflow:hidden;min-height:calc(var(--ts) + .6vmin)}
.crt{width:var(--ts);height:var(--ts);flex:none;border:max(2px,.35vmin) solid var(--pc);background:#fff;overflow:hidden;position:relative;transition:opacity .3s}
.crt img{width:100%;height:100%;object-fit:cover;display:block}
.crt .ini{display:flex;align-items:center;justify-content:center;width:100%;height:100%;font:800 calc(var(--ts)*.5) system-ui;color:#0a1038}
.crt.dim{opacity:.3}
.crmsg{font-family:${FONT};font-weight:900;text-transform:uppercase;text-align:center;color:#fff;font-size:clamp(1.1rem,3.6vmin,2.4rem);min-height:1.2em;flex:none}
.crend{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2vmin;flex:1;text-align:center}
.crend .big{font-family:${FONT};font-weight:900;color:#ffd400;text-transform:uppercase;font-size:clamp(2rem,8vmin,5.5rem);line-height:1.05}
.crend .row{justify-content:center}
.crwin{display:flex;gap:2vmin;flex-wrap:wrap;justify-content:center}
.crwin .w{display:flex;flex-direction:column;align-items:center;gap:1vmin;font-family:${FONT};font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:#fff;font-size:clamp(1rem,3vmin,1.8rem)}
.crwin .w .crt{--ts:clamp(70px,22vmin,220px)}
.crwin.many .w .crt{--ts:clamp(40px,9vmin,90px)}
#playCR{background:linear-gradient(160deg,#1a2a6e,#04061c)!important;border-color:#ffd400!important}
#playCR .crart{display:flex;align-items:center;justify-content:center;height:100%}
#crSetup .rules li{margin:.3em 0}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

const hub=document.querySelector(".games");
if(!hub||!QS.length)return;
const tile=document.createElement("button");tile.className="game live";tile.id="playCR";
tile.innerHTML=`<span class="art"><span class="crart"><svg viewBox="0 0 200 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="20" width="85" height="85" fill="${CA}"/><rect x="105" y="20" width="85" height="85" fill="${CB}"/>${[[28,38],[52,38],[28,62],[52,62],[40,84],[122,38],[146,38],[170,38],[134,62],[158,62]].map(([x,y])=>`<rect x="${x}" y="${y}" width="16" height="16" fill="#fff" fill-opacity=".92"/>`).join("")}</svg></span><span class="pill">Play</span></span><h2>The 100</h2><p>Unlimited players. 50/50 questions. Get it wrong and you're out.</p>`;
hub.insertBefore(tile,hub.children[1]||null);
const hn=hub.children.length;hub.classList.remove("five","six","seven");if(hn>=7)hub.classList.add("seven");

const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="crSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="cr";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>THE 100</small></span><span class="spacer"></span><span class="count" id="crCount"></span><button class="btn ghost" id="crQuit">Quit</button></div><div id="crStage"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("crQuit").onclick=()=>confirmSheet("Quit this game?","Everyone will be back in the lobby.","Quit",()=>{closeOverlay();endGame();show("hub")});
const esc2=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));

function openSetup(){
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="crBack">← Back</button><h2>The 100</h2><button class="btn gold" id="crStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li>Everyone joins on their phone. <b>As many players as you like.</b></li>
      <li>Each question has <b>two answers</b>, a red square and a blue square. Pick one on your phone and lock it in.</li>
      <li>Once everyone has locked in, the TV moves <b>your photo onto the square you picked</b>.</li>
      <li><b>Get it wrong and you're out.</b> Get it right and you're on to the next question.</li>
      <li>Every <b>5 questions</b> it gets harder. Last one standing wins. If everyone left gets it wrong, nobody is out.</li></ul></div>
    <div class="field"><span class="eyebrow">Seconds to answer</span><div class="seg" id="crSecsSeg"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="crSoundSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players</span><div id="crPlayers" class="hlsetup"><div class="note">Join with your phones. You need at least 2 players (CPU players count).</div></div></div></div>`;
  seg($("crSecsSeg"),[10,15,20,30],()=>CFG.secs,v=>{CFG.secs=v;saveCfg()},v=>v+"s");
  seg($("crSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  $("crBack").onclick=()=>show("hub");
  $("crStart").onclick=()=>{ac();startGame()};
  show("crSetup");
}

/* ---------- state ---------- */
const CR={players:[],n:0,q:null,opts:[],correct:0,phase:"idle",left:0,timer:null,T:[],used:new Set(),level:1,msg:"",winners:[]};
const byPid=pid=>CR.players.find(p=>p.pid===pid);
const alive=()=>CR.players.filter(p=>p.alive);
const clearT=()=>{clearInterval(CR.timer);CR.T.forEach(clearTimeout);CR.T=[]};
const later=(fn,ms)=>{CR.T.push(setTimeout(fn,ms))};
const lvlOf=n=>Math.min(8,Math.ceil(n/5));
const MAXQ=40;
function endGame(){clearT();CR.phase="idle"}
const tsFor=n=>n<=8?"11vmin":n<=20?"7.6vmin":n<=40?"5.8vmin":n<=70?"4.7vmin":"3.9vmin";
function tok(p){
  const d=document.createElement("div");d.className="crt dim";d.dataset.pid=p.pid;d.style.setProperty("--pc",p.color);
  const im=document.createElement("img");im.alt="";try{im.src=avatarSrc(p.slot)}catch(e){}
  im.onerror=()=>{const s=document.createElement("span");s.className="ini";s.textContent=(p.name||"?").charAt(0).toUpperCase();im.replaceWith(s)};
  d.appendChild(im);return d;
}
const T={};   // pid -> token element
function pickQ(){
  const lvl=lvlOf(CR.n);
  let pool=QS.map((q,i)=>[q,i]).filter(([q,i])=>q[0]===lvl&&!CR.used.has(i));
  if(!pool.length)pool=QS.map((q,i)=>[q,i]).filter(([q])=>q[0]===lvl);
  const [q,i]=pool[Math.floor(Math.random()*pool.length)];CR.used.add(i);return q;
}
function startGame(){
  const L=window.LINK&&LINK.pull?LINK.pull(2,100,{cpu:true}):null;
  if(!L||L.length<2){
    openOverlay(`<span class="eyebrow">The 100</span><h2>Need 2 players</h2><p class="score">Scan the join code with your phones${L&&L.length?` (${L.length} in so far)`:""}. CPU players count as players.</p><div class="row"><button class="btn" id="crAddCpu">Add a CPU player</button><button class="btn gold" id="crOk">OK</button></div>`);
    $("crAddCpu").onclick=()=>{window.LINK&&LINK.addCpu&&LINK.addCpu();closeOverlay()};$("crOk").onclick=closeOverlay;return;
  }
  begin(L.map((p,i)=>({name:p.name,color:DISTINCT[i%DISTINCT.length],slot:i,pid:p.pid,cpu:!!p.cpu})));
}
function begin(list){
  save();
  CR.players=list.map(p=>({...p,alive:true,pick:null,out:0}));
  CR.n=0;CR.used=new Set();CR.winners=[];CR.phase="idle";
  Object.keys(T).forEach(k=>delete T[k]);
  show("cr");
  $("crStage").innerHTML=`<div class="crend"><div class="big">The 100</div><div class="crmsg">${CR.players.length} player${CR.players.length===1?"":"s"}. Get ready!</div></div>`;
  SFX.go&&SFX.go();
  later(nextQ,2800);
}
function nextQ(){
  clearT();CR.n++;
  const live=alive();
  if(live.length<=1||CR.n>MAXQ)return finish();
  CR.q=pickQ();CR.level=lvlOf(CR.n);
  const flip=Math.random()<.5;CR.opts=flip?[CR.q[3],CR.q[2]]:[CR.q[2],CR.q[3]];CR.correct=flip?1:0;
  live.forEach(p=>p.pick=null);CR.phase="ask";CR.left=CFG.secs;CR.msg="";
  renderQ();
  CR.timer=setInterval(()=>{CR.left--;const c=$("crClock");if(c){c.textContent=CR.left;c.classList.toggle("low",CR.left<=5)}
    if(CR.left<=5&&CR.left>0)SFX.beep&&SFX.beep();
    if(CR.left<=0){clearInterval(CR.timer);sortPhase()}},1000);
  live.filter(p=>p.cpu).forEach(p=>later(()=>lock(p.pid,Math.random()<Math.max(.5,.95-.07*(CR.level-1))?CR.correct:1-CR.correct),1500+Math.random()*(CFG.secs*600)));
  SFX.go&&SFX.go();
}
function counts(){const l=alive();return l.length}
function renderQ(){
  const live=alive();
  $("crCount").textContent=`${live.length} player${live.length===1?"":"s"} left`;
  $("crStage").innerHTML=`<div class="crhud"><span>Question <b>${CR.n}</b></span><span class="crclock" id="crClock">${CR.left}</span><span>Level <b>${CR.level}</b></span></div>
  <div class="crq">${esc2(CR.q[1])}</div>
  <div class="crzones"><div class="crzone" id="crZ0" style="--zc:${CA}"><div class="lab">${esc2(CR.opts[0])}</div><div class="tag" id="crT0"></div><div class="toks" id="crK0"></div></div>
  <div class="crzone" id="crZ1" style="--zc:${CB}"><div class="lab">${esc2(CR.opts[1])}</div><div class="tag" id="crT1"></div><div class="toks" id="crK1"></div></div></div>
  <div class="crmsg" id="crMsg"></div>
  <div class="crpool" id="crPool"></div>`;
  const stg=$("crStage");stg.style.setProperty("--ts",tsFor(live.length));
  const pool=$("crPool");live.forEach(p=>{if(!T[p.pid])T[p.pid]=tok(p);T[p.pid].classList.add("dim");T[p.pid].style.opacity="";T[p.pid].style.transform="";pool.appendChild(T[p.pid])});
}
function lock(pid,idx){
  const p=byPid(pid);if(!p||!p.alive||CR.phase!=="ask"||p.pick!=null)return;
  p.pick=idx;const t=T[pid];if(t)t.classList.remove("dim");
  SFX.tick&&SFX.tick();
  if(alive().every(x=>x.pick!=null)){clearInterval(CR.timer);later(sortPhase,900)}
}
/* move a token to a new parent with a smooth slide (FLIP) */
function flip(moves){
  const first=new Map();moves.forEach(([el])=>first.set(el,el.getBoundingClientRect()));
  moves.forEach(([el,parent])=>parent.appendChild(el));
  moves.forEach(([el],i)=>{const a=first.get(el),b=el.getBoundingClientRect();const dx=a.left-b.left,dy=a.top-b.top;
    if(!dx&&!dy)return;el.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:"none"}],{duration:900,delay:Math.min(700,i*12),easing:"cubic-bezier(.3,.9,.3,1)",fill:"backwards"})});
}
function sortPhase(){
  if(CR.phase!=="ask")return;
  clearT();CR.phase="sort";
  const ck=$("crClock");if(ck){ck.textContent="·";ck.classList.remove("low")}
  const live=alive();
  const mv=live.filter(p=>p.pick!=null).map(p=>[T[p.pick!=null&&p.pid],$("crK"+p.pick)]);
  live.forEach(p=>{if(T[p.pid])T[p.pid].classList.remove("dim")});
  const msg=$("crMsg");if(msg)msg.textContent="Locked in!";
  flip(mv);
  SFX.boost&&SFX.boost();
  later(()=>{if(msg)msg.textContent="Moment of truth..."},1400);
  later(reveal,3600);
}
function reveal(){
  CR.phase="reveal";
  const live=alive();
  const right=live.filter(p=>p.pick===CR.correct),wrong=live.filter(p=>p.pick!==CR.correct);
  const everyoneWrong=right.length===0;
  $("crZ"+CR.correct).classList.add("win");$("crT"+CR.correct).textContent="✓ CORRECT";
  $("crZ"+(1-CR.correct)).classList.add("lose");$("crT"+(1-CR.correct)).textContent="✗ WRONG";
  SFX.ok&&SFX.ok();
  const msg=$("crMsg");
  if(everyoneWrong){if(msg)msg.textContent="Everyone got it wrong! Nobody is out";SFX.buzz&&SFX.buzz()}
  else{
    later(()=>{
      wrong.forEach(p=>{p.alive=false;p.out=CR.n-1;const t=T[p.pid];if(t){t.animate([{transform:"none",opacity:1},{transform:"translateY(5vmin) rotate(35deg) scale(.2)",opacity:0}],{duration:1000,fill:"forwards"})}});
      if(msg)msg.textContent=wrong.length?`${wrong.length} ${wrong.length===1?"player is":"players are"} out`:"Everyone got it right!";
      SFX.pass&&wrong.length&&SFX.pass();
      $("crCount").textContent=`${right.length} player${right.length===1?"":"s"} left`;
    },1300);
  }
  later(()=>{CR.phase="result";const l=alive();
    if(msg)msg.textContent=l.length===1?"We have a winner!":`${l.length} players left`;
    wrong.forEach(p=>{const t=T[p.pid];if(t&&t.parentNode)t.remove()});
    later(nextQ,2600)},4200);
}
function finish(){
  clearT();CR.phase="final";
  const live=alive();CR.winners=live;
  const surv=Math.max(0,CR.n-1);
  try{window.LB&&LB.record("cr",CR.players.map(p=>({name:p.name,color:p.color,score:p.alive?surv:p.out,win:p.alive})))}catch(e){}
  const many=live.length>6;
  $("crCount").textContent="";
  $("crStage").innerHTML=`<div class="crend"><div class="crmsg" style="color:#ffd400">${live.length===1?"Last one standing":"Survivors"}</div>
  <div class="big">${live.length===1?esc2(live[0].name)+" wins!":live.length+" players survived!"}</div>
  <div class="crwin${many?" many":""}">${live.slice(0,40).map(p=>`<div class="w"><div class="crt" style="--pc:${p.color}"><img alt="" src="${esc(avatarSrc(p.slot))}"></div>${many?"":esc(p.name)}</div>`).join("")}</div>
  <div class="crmsg">${CR.n>MAXQ?"They answered all "+MAXQ+" questions":"Survived "+surv+" question"+(surv===1?"":"s")}</div>
  <div class="row"><button class="btn" id="crMenu">Game Night menu</button><button class="btn gold" id="crAgain">Play again</button></div></div>`;
  $("crMenu").onclick=()=>{endGame();show("hub")};
  $("crAgain").onclick=()=>{startGame()};
  SFX.win&&SFX.win();
}

/* ---------- what phones see ---------- */
function sceneFor(p){
  const me=byPid(p.pid),sn=CR.n*10+({ask:1,sort:2,reveal:3,result:4,final:5}[CR.phase]||0)+(me&&me.alive?0:50);
  const base={th:"cr",scores:[],btns:[],sn,me:1};
  const lv=CR.n?`Question ${CR.n} · Level ${CR.level}`:"The 100";
  if(!me)return {...base,head:{e:"The 100",t:"Watch the TV",s:"You'll be in the next game"}};
  if(CR.phase==="final"){const won=me.alive;return {...base,head:{e:"Game over",t:won?"YOU SURVIVED!":(CR.winners.length===1?CR.winners[0].name+" wins!":"Game over"),s:won?(CR.winners.length===1?"Last one standing. Legend!":"You made it to the end."):"You lasted "+me.out+" question"+(me.out===1?"":"s")}}}
  if(!me.alive)return {...base,head:{e:lv,t:"You're out",s:"You lasted "+me.out+" question"+(me.out===1?"":"s")+". Watch the TV."}};
  if(CR.phase==="ask"){
    const locked=me.pick!=null;
    return {...base,head:{e:lv,t:locked?"Locked in":"Pick your answer",s:locked?"Waiting for everyone":"Red or blue. Tap to lock in."},big:CR.q[1],clock:String(CR.left),
      btns:CR.opts.map((o,i)=>({t:o,a:"vote",v:i,d:locked?1:0,on:me.pick===i?1:0,c:i===0?CA:CB}))};
  }
  if(CR.phase==="reveal"||CR.phase==="result"){
    const ok=me.pick===CR.correct;
    return {...base,head:{e:lv,t:me.pick==null?"Too slow":ok?"You're right!":"Wrong answer",s:me.pick==null?"No answer locked in":ok?"On to the next question":"The answer was "+CR.opts[CR.correct]}};
  }
  return {...base,head:{e:lv,t:"Watch the TV",s:"Photos are moving to your answers"}};
}
function act(p,m){if(m.a==="vote")lock(p.pid,m.i===1?1:0)}
const active=()=>!$("cr").hidden;
window.__CR={CR,CFG,sceneFor,act,active,begin,lock};
})();
