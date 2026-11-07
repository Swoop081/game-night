/* =================== SPORT SHUFFLE ===================
   Every player picks a sport on their phone (AFL, NRL, NBA, NFL, NHL, MLB, EPL, WWE, UFC). Each round the questions come
   from one of the picked sports. Everyone sees the same question and answers on their phone (3 choices).
   Right answer = 100 points. If the question isn't from YOUR sport the points are doubled. Your multiplier also goes up 0.25
   for every correct answer you give, and it stays for the whole game. */
(function(){
const Q=window.SS_Q||{},SPORTS=window.SS_SPORTS||[],NAMES=window.SS_NAMES||{};
const CFG={rounds:5,per:2,secs:20};
try{const j=JSON.parse(localStorage.getItem("gn.ss")||"null");if(j)Object.assign(CFG,j)}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.ss",JSON.stringify(CFG))}catch(e){}};
const FONT='"Oxanium","Big Shoulders Display",Impact,sans-serif';
const css=`
#ss,#ssSetup{background:radial-gradient(120% 90% at 50% 0%,#0f5d8a 0%,#07304a 55%,#021320 100%);position:absolute;overflow:hidden;--stage-2:#0a3f5f;--stage-3:#0e5580;--line:#2c8fc4;--gold:#ffd23f;--gold-deep:#d9a900;--muted:#a9dcf5}
#ss>*,#ssSetup>*{position:relative;z-index:2}
#ss{padding:0;gap:0}
#ss .floorbar{padding:1.2vmin 2vmin;gap:2vmin;flex:none}
#ss .brand{font-family:${FONT};letter-spacing:.2em;font-size:clamp(.8rem,2vmin,1.2rem)}
#ss .btn,#ssSetup .btn{border-radius:0;border:0;box-shadow:none;font-family:${FONT};letter-spacing:.14em;text-transform:uppercase}
#ss .btn.ghost,#ssSetup .btn.ghost{background:rgba(0,0,0,.4)}
#ss .btn.gold,#ssSetup .btn.gold{background:#ffd23f;color:#07304a}
#ssSetup .topbar h2{color:#ffd23f}
#ssStage{flex:1;min-height:0;display:flex;flex-direction:column;align-items:stretch;gap:1.3vmin;padding:1.2vmin 2.4vmin 1.6vmin}
.ssboard{flex:none;display:flex;gap:.8vmin;justify-content:center;flex-wrap:wrap}
.ssb{display:flex;align-items:center;gap:.8vmin;padding:.4vmin 1.2vmin .4vmin .4vmin;background:rgba(0,0,0,.45);border-bottom:.5vmin solid var(--pc);font-family:${FONT};font-weight:900;color:#fff;font-size:clamp(.72rem,2.2vmin,1.35rem);text-transform:uppercase}
.ssb .pos{color:#ffd23f;min-width:1.1em;text-align:center}
.ssb img,.ssb .ini{width:4.4vmin;height:4.4vmin;object-fit:cover;background:#fff;display:flex;align-items:center;justify-content:center;color:#07304a;font-weight:900}
.ssb .sc{color:#ffd23f;font-size:1.2em;min-width:1.6em;text-align:right;font-variant-numeric:tabular-nums}
.ssb .mx{background:#ffd23f;color:#07304a;padding:0 .5vmin;font-size:.8em}
.ssb.ans{background:#1a7a3a}
.sshud{display:flex;align-items:center;justify-content:space-between;gap:2vmin;font-family:${FONT};letter-spacing:.2em;text-transform:uppercase;font-weight:800;color:#ffd23f;font-size:clamp(.8rem,2.2vmin,1.3rem)}
.ssclock{font-family:${FONT};font-weight:800;font-size:clamp(1.8rem,7vmin,4rem);line-height:1;color:#ffd23f;font-variant-numeric:tabular-nums;min-width:2.2ch;text-align:center}
.ssclock.low{color:#fff;background:#e5173f;padding:0 .2em}
.sstag{display:inline-block;padding:.3vmin 1.6vmin;color:#fff;background:var(--sc);font-family:${FONT};font-weight:900;letter-spacing:.2em}
.ssq{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;text-align:center;font-family:${FONT};font-weight:900;color:#fff;line-height:1.1;font-size:clamp(1.4rem,5.6vmin,3.6rem);padding:0 2vmin}
.ssopts{flex:none;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.4vmin}
.sso{display:flex;align-items:center;gap:1.4vmin;background:linear-gradient(160deg,#1b78b0,#0c4468);border-top:1vmin solid #ffd23f;padding:2vmin 1.6vmin;min-height:18vh;font-family:${FONT};font-weight:900;text-transform:uppercase;color:#fff;font-size:clamp(1rem,3.4vmin,2.2rem);line-height:1.1;overflow-wrap:anywhere}
.sso i{font-style:normal;color:#ffd23f;font-size:1.6em}
.sso.right{background:#1a9a4a;border-top-color:#fff}
.sso.dim{opacity:.35}
.ssmsg{font-family:${FONT};font-weight:900;text-transform:uppercase;text-align:center;color:#fff;font-size:clamp(1rem,3vmin,2rem);min-height:1.2em;flex:none}
.ssmid{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.6vmin;text-align:center}
.ssbig{font-family:${FONT};font-weight:900;color:#ffd23f;text-transform:uppercase;font-size:clamp(2rem,8vmin,5.5rem);line-height:1.05}
.sssub{font-family:${FONT};font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#d6f0ff;font-size:clamp(1rem,3vmin,2rem)}
.sspick{flex:1;min-height:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr));gap:1.2vmin}
.ssp{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.8vmin;background:var(--sc);color:#fff;font-family:${FONT};font-weight:900;font-size:clamp(1.6rem,7vmin,4.4rem);letter-spacing:.06em;overflow:hidden}
.ssp small{font-size:.26em;letter-spacing:.1em;text-transform:uppercase;opacity:.9}
.ssp .av{display:flex;gap:.6vmin;min-height:5.4vmin}
.ssp .av img,.ssp .av .ini{width:5vmin;height:5vmin;object-fit:cover;background:#fff;color:#07304a;display:flex;align-items:center;justify-content:center;font-size:2.6vmin}
.ssres{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.2vmin}
.ssres h3{margin:0;font-family:${FONT};font-weight:900;color:#ffd23f;text-transform:uppercase;font-size:clamp(1.3rem,5vmin,3.2rem)}
.sslist{display:grid;gap:.8vmin 1.6vmin;width:min(1150px,96%);grid-template-columns:1fr}
.sslist.two{grid-template-columns:1fr 1fr}
.ssrow{display:flex;align-items:center;gap:1.4vmin;background:rgba(0,0,0,.4);border-left:1vmin solid var(--pc);padding:.5vmin 1.4vmin .5vmin .7vmin;font-family:${FONT};font-weight:900;color:#fff;text-transform:uppercase;font-size:var(--rs,3vmin);animation:sspop .4s both}
@keyframes sspop{from{transform:translateY(2vmin);opacity:0}to{transform:none;opacity:1}}
.ssrow img,.ssrow .ini{width:var(--av,7vmin);height:var(--av,7vmin);object-fit:cover;background:#fff;display:flex;align-items:center;justify-content:center;color:#07304a;font-weight:900;flex:none}
.ssrow b{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ssrow .fx{opacity:.85;font-size:.62em;color:#d6f0ff}
.ssrow .gn{color:#7dff9b;font-size:1.2em;min-width:2.6em;text-align:right}
.ssrow.bad{background:rgba(122,20,38,.55)}.ssrow.bad .gn{color:#ff9aa8}
.ssrow .tot{color:#ffd23f;min-width:2.8em;text-align:right}
.ssrank{display:flex;flex-direction:column;gap:.8vmin;width:min(640px,92%)}
.ssrank .r{display:flex;align-items:center;gap:1.4vmin;background:rgba(0,0,0,.35);padding:.8vmin 1.6vmin;border-left:.8vmin solid var(--pc);font-family:${FONT};font-weight:800;color:#fff;font-size:clamp(.9rem,3vmin,1.8rem);text-transform:uppercase}
.ssrank .r b{flex:1;text-align:left}.ssrank .r em{font-style:normal;color:#ffd23f}.ssrank .r small{opacity:.8}
.ssrank .r.win{background:#ffd23f;color:#07304a}.ssrank .r.win em{color:#07304a}
#playSS{background:linear-gradient(160deg,#0f5d8a,#021320)!important;border-color:#ffd23f!important}
#playSS .ssart{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;padding:6px}
#playSS .ssart i{font:900 .62rem/1 system-ui;color:#fff;padding:5px 0;text-align:center;font-style:normal}
#ssSetup .rules li{margin:.3em 0}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const hub=document.querySelector(".games");if(!hub||!SPORTS.length)return;
const tile=document.createElement("button");tile.className="game live";tile.id="playSS";
tile.innerHTML=`<span class="art"><span class="ssart">${SPORTS.slice(0,9).map(s=>`<i style="background:${s[2]}">${s[1]}</i>`).join("")}</span><span class="pill">Play</span></span><h2>Sport Shuffle</h2><p>Pick your sport. Double points on everyone else's.</p>`;
hub.insertBefore(tile,hub.children[1]||null);
const hn=hub.children.length;hub.classList.remove("five","six","seven");if(hn>=7)hub.classList.add("seven");
const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="ssSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="ss";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>SPORT SHUFFLE</small></span><span class="spacer"></span><span class="count" id="ssCount"></span><button class="btn ghost" id="ssQuit">Quit</button></div><div id="ssStage"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("ssQuit").onclick=()=>confirmSheet("Quit this game?","Everyone will be back in the lobby.","Quit",()=>{closeOverlay();endGame();show("hub")});
const E=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const SP=Object.fromEntries(SPORTS.map(s=>[s[0],{id:s[0],lab:s[1],col:s[2]}]));
function openSetup(){
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="ssBack">← Back</button><h2>Sport Shuffle</h2><button class="btn gold" id="ssStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li>Everyone <b>picks a sport</b> on their phone: AFL, NRL, NBA, NFL, NHL, MLB, EPL, WWE or UFC.</li>
      <li>Each round the questions come from <b>one of the picked sports</b>. Everyone gets the same question with 3 answers.</li>
      <li>A right answer is worth <b>100 points</b>. If the question <b>isn't from your sport it's worth double</b>.</li>
      <li>Every right answer also adds <b>x0.25 to your multiplier</b> for the rest of the game, so late answers are worth a lot more.</li>
      <li>Most points after the last round wins. 2 to 10 players.</li></ul></div>
    <div class="field"><span class="eyebrow">Rounds</span><div class="seg" id="ssRoundsSeg"></div></div>
    <div class="field"><span class="eyebrow">Questions per round</span><div class="seg" id="ssPerSeg"></div></div>
    <div class="field"><span class="eyebrow">Seconds per question</span><div class="seg" id="ssSecsSeg"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="ssSoundSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players</span><div id="ssPlayers" class="hlsetup"><div class="note">Join with your phones. You need at least 2 players (CPU players count).</div></div></div></div>`;
  seg($("ssRoundsSeg"),[3,5,7],()=>CFG.rounds,v=>{CFG.rounds=v;saveCfg()},v=>String(v));
  seg($("ssPerSeg"),[1,2,3],()=>CFG.per,v=>{CFG.per=v;saveCfg()},v=>String(v));
  seg($("ssSecsSeg"),[15,20,30],()=>CFG.secs,v=>{CFG.secs=v;saveCfg()},v=>v+"s");
  seg($("ssSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  $("ssBack").onclick=()=>show("hub");$("ssStart").onclick=()=>{ac();startGame()};
  show("ssSetup");
}
const SS={players:[],phase:"idle",rn:0,qn:0,cats:[],cat:null,q:null,opts:[],correct:0,left:0,timer:null,T:[],winners:[],lastGain:{}};
const byPid=pid=>SS.players.find(p=>p.pid===pid);
const clearT=()=>{clearInterval(SS.timer);SS.T.forEach(clearTimeout);SS.T=[]};
const later=(fn,ms)=>{SS.T.push(setTimeout(fn,ms))};
function endGame(){clearT();SS.phase="idle"}
const av=p=>{try{return avatarSrc(p.slot)}catch(e){return ""}};
const avEl=p=>`<img alt="" src="${esc(av(p))}" onerror="this.outerHTML='<span class=ini>${esc((p.name||"?").charAt(0).toUpperCase())}</span>'">`;
const mult=p=>1+0.25*p.right;
const fx=n=>"x"+(Math.round(n*100)/100).toString().replace(/^(\d)$/,"$1.0").replace(/^(\d\.\d)$/,"$1");
let SEEN=null;
const seenLoad=()=>{if(SEEN)return SEEN;try{SEEN=new Set(JSON.parse(localStorage.getItem("gn.ss.seen")||"[]"))}catch(e){SEEN=new Set()}return SEEN};
const seenSave=()=>{try{localStorage.setItem("gn.ss.seen",JSON.stringify([...SEEN].slice(-3000)))}catch(e){}};
function startGame(){
  const L=window.LINK&&LINK.pull?LINK.pull(2,10,{cpu:true}):null;
  if(!L||L.length<2){
    openOverlay(`<span class="eyebrow">Sport Shuffle</span><h2>Need 2 players</h2><p class="score">Scan the join code with your phones${L&&L.length?` (${L.length} in so far)`:""}. CPU players count. Up to 10 players.</p><div class="row"><button class="btn" id="ssAddCpu">Add a CPU player</button><button class="btn gold" id="ssOk">OK</button></div>`);
    $("ssAddCpu").onclick=()=>{window.LINK&&LINK.addCpu&&LINK.addCpu();closeOverlay()};$("ssOk").onclick=closeOverlay;return;
  }
  begin(L.slice(0,10).map((p,i)=>({name:p.name,color:DISTINCT[i%DISTINCT.length],slot:i,pid:p.pid,cpu:!!p.cpu})));
}
function begin(list){
  save();show("ss");clearT();
  SS.players=list.map(p=>({...p,pts:0,right:0,pick:null,ans:null,gain:0,ok:false}));
  SS.rn=0;SS.qn=0;SS.winners=[];SS.phase="pick";SS.left=30;$("ssCount").textContent="";
  paintPick();
  SS.timer=setInterval(()=>{SS.left--;const c=$("ssClock");if(c)c.textContent=SS.left;if(SS.left<=0)finishPick()},1000);
  SS.players.filter(p=>p.cpu).forEach(p=>later(()=>choose(p.pid,SPORTS[Math.floor(Math.random()*SPORTS.length)][0]),1500+Math.random()*5000));
  SFX.go&&SFX.go();
}
function paintPick(){
  $("ssStage").innerHTML=`<div class="sshud"><span>Pick your sport on your phone</span><span class="ssclock" id="ssClock">${SS.left}</span><span>Everyone else's sports score double</span></div>
  <div class="sspick" id="ssPick">${SPORTS.map(s=>`<div class="ssp" style="--sc:${s[2]}"><span>${s[1]}</span><small>${esc(NAMES[s[0]]||"")}</small><div class="av" id="ssAv_${s[0]}"></div></div>`).join("")}</div>
  <div class="ssmsg" id="ssMsg">Waiting for everyone to pick</div>`;
  SPORTS.forEach(s=>paintAv(s[0]));
}
function paintAv(id){const el=$("ssAv_"+id);if(el)el.innerHTML=SS.players.filter(p=>p.pick===id).map(avEl).join("")}
function choose(pid,id){
  const p=byPid(pid);if(!p||SS.phase!=="pick"||!SP[id])return;
  const old=p.pick;p.pick=id;if(old)paintAv(old);paintAv(id);SFX.tick&&SFX.tick();
  if(SS.players.every(x=>x.pick)){clearInterval(SS.timer);const m=$("ssMsg");if(m)m.textContent="Everyone's picked. Here we go!";later(finishPick,1600)}
}
function finishPick(){
  if(SS.phase!=="pick")return;clearT();
  SS.players.forEach(p=>{if(!p.pick)p.pick=SPORTS[Math.floor(Math.random()*SPORTS.length)][0]});
  const picked=[...new Set(SS.players.map(p=>p.pick))].sort(()=>Math.random()-.5);
  SS.cats=[];for(let r=0;r<CFG.rounds;r++){let c=picked[r%picked.length];if(r>0&&picked.length>1&&c===SS.cats[r-1]){c=picked[(r+1)%picked.length]}SS.cats.push(c)}
  SS.phase="intro";nextRound();
}
function nextRound(){
  clearT();SS.rn++;SS.qn=0;
  if(SS.rn>CFG.rounds)return finish();
  const cat=SS.cats[SS.rn-1];SS.cat=cat;SS.phase="intro";
  $("ssCount").textContent=`Round ${SS.rn} of ${CFG.rounds}`;
  const owners=SS.players.filter(p=>p.pick===cat),others=SS.players.length-owners.length;
  $("ssStage").innerHTML=`<div class="ssboard">${boardHTML()}</div><div class="ssmid"><div class="sssub">Round ${SS.rn} of ${CFG.rounds}</div><div class="ssbig" style="color:#fff"><span class="sstag" style="--sc:${SP[cat].col}">${SP[cat].lab}</span></div><div class="ssbig">${E(NAMES[cat]||SP[cat].lab)}</div>
  <div class="sssub">${owners.map(p=>E(p.name)).join(", ")} ${owners.length===1?"picked this sport and scores":"picked this sport and score"} normal points</div>
  <div class="sssub" style="color:#7dff9b">${others?"Everyone else scores DOUBLE":"Everyone picked this sport"}</div></div>`;
  SFX.go&&SFX.go();later(nextQ,4200);
}
function boardHTML(){
  const o=SS.players.slice().sort((a,b)=>b.pts-a.pts);
  return o.map((p,i)=>`<div class="ssb" id="ssB${p.slot}" style="--pc:${p.color}"><span class="pos">${i+1}</span>${avEl(p)}<span>${E(p.name)}</span><span class="mx">${fx(mult(p))}</span><span class="sc">${p.pts}</span></div>`).join("");
}
function takeQ(cat){
  const seen=seenLoad(),all=Q[cat]||[];
  let pool=all.filter(q=>!seen.has(q[0]));
  if(!pool.length){all.forEach(q=>seen.delete(q[0]));pool=all.slice()}
  const q=pool[Math.floor(Math.random()*pool.length)];seen.add(q[0]);seenSave();return q;
}
function nextQ(){
  clearT();SS.qn++;
  if(SS.qn>CFG.per)return nextRound();
  const q=takeQ(SS.cat);SS.q=q;
  SS.opts=[0,1,2].sort(()=>Math.random()-.5).map(i=>q[1+i]);SS.correct=SS.opts.indexOf(q[1]);
  SS.players.forEach(p=>{p.ans=null;p.gain=0;p.ok=false});SS.phase="ask";SS.left=CFG.secs;
  $("ssStage").innerHTML=`<div class="ssboard" id="ssBoard">${boardHTML()}</div>
  <div class="sshud"><span><span class="sstag" style="--sc:${SP[SS.cat].col}">${SP[SS.cat].lab}</span>  Q${SS.qn} of ${CFG.per}</span><span class="ssclock" id="ssClock">${SS.left}</span><span>Answer on your phone</span></div>
  <div class="ssq">${E(q[0])}</div>
  <div class="ssopts">${SS.opts.map((o,i)=>`<div class="sso"><i>${"ABC"[i]}</i><span>${E(o)}</span></div>`).join("")}</div>
  <div class="ssmsg" id="ssMsg">Locked in: 0 of ${SS.players.length}</div>`;
  SS.timer=setInterval(()=>{SS.left--;const c=$("ssClock");if(c){c.textContent=SS.left;c.classList.toggle("low",SS.left<=5)}
    if(SS.left<=5&&SS.left>0)SFX.beep&&SFX.beep();if(SS.left<=0){clearInterval(SS.timer);reveal()}},1000);
  SS.players.filter(p=>p.cpu).forEach(p=>later(()=>answer(p.pid,Math.random()<.62?SS.correct:Math.floor(Math.random()*3)),1500+Math.random()*SS.left*600));
  SFX.go&&SFX.go();
}
function answer(pid,i){
  const p=byPid(pid);if(!p||SS.phase!=="ask"||p.ans!=null)return;
  i=+i;if(!(i>=0&&i<3))return;p.ans=i;SFX.tick&&SFX.tick();
  const n=SS.players.filter(x=>x.ans!=null).length,m=$("ssMsg");if(m)m.textContent=`Locked in: ${n} of ${SS.players.length}`;
  const b=$("ssB"+p.slot);if(b)b.classList.add("ans");
  if(n===SS.players.length){clearInterval(SS.timer);later(reveal,700)}
}
function reveal(){
  if(SS.phase!=="ask")return;clearT();SS.phase="reveal";
  SS.players.forEach(p=>{p.ok=p.ans===SS.correct;p.gain=0;p.mx=mult(p);p.dbl=p.pick!==SS.cat;
    if(p.ok){p.gain=Math.round(100*(p.dbl?2:1)*p.mx);p.pts+=p.gain;p.right++}});
  const ox=document.querySelectorAll(".sso");ox.forEach((e,i)=>e.classList.add(i===SS.correct?"right":"dim"));
  const c=$("ssClock");if(c){c.textContent="·";c.classList.remove("low")}
  const any=SS.players.some(p=>p.ok);any?SFX.ok&&SFX.ok():SFX.buzz&&SFX.buzz();
  later(showResults,2600);
}
function showResults(){
  if(SS.phase!=="reveal")return;SS.phase="result";
  const n=SS.players.length,two=n>5,rs=n<=3?"4vmin":n<=5?"3.4vmin":n<=8?"2.9vmin":"2.6vmin",avs=n<=3?"10vmin":n<=5?"8vmin":n<=8?"6.4vmin":"5.6vmin";
  const ord=SS.players.slice().sort((a,b)=>b.gain-a.gain||b.pts-a.pts);
  $("ssStage").innerHTML=`<div class="ssboard">${boardHTML()}</div><div class="ssres"><h3>${E(SS.q[1])}</h3>
  <div class="sslist${two?" two":""}" style="--rs:${rs};--av:${avs}">${ord.map((p,i)=>`<div class="ssrow${p.ok?"":" bad"}" style="--pc:${p.color};animation-delay:${i*.1}s">${avEl(p)}<b>${E(p.name)}</b><span class="fx">${p.ok?`100 ${p.dbl?"x2 ":""}${fx(p.mx)}`:p.ans==null?"no answer":"wrong"}</span><span class="gn">${p.ok?"+"+p.gain:"0"}</span><span class="tot">${p.pts}</span></div>`).join("")}</div>
  <div class="ssmsg">${SS.rn>=CFG.rounds&&SS.qn>=CFG.per?"That was the last question!":"Next question coming up"}</div></div>`;
  later(nextQ,7000+(n>6?2000:0));
}
function finish(){
  clearT();SS.phase="final";
  const o=SS.players.slice().sort((a,b)=>b.pts-a.pts),top=o[0].pts,win=o.filter(p=>p.pts===top);SS.winners=win;
  try{window.LB&&LB.record("ss",SS.players.map(p=>({name:p.name,color:p.color,score:p.pts,win:p.pts===top})))}catch(e){}
  $("ssCount").textContent="";
  $("ssStage").innerHTML=`<div class="ssmid"><div class="sssub">Final scores</div><div class="ssbig">${win.length>1?"It's a draw!":E(win[0].name)+" wins!"}</div>
  <div class="ssrank">${o.map(p=>`<div class="r${p.pts===top?" win":""}" style="--pc:${p.color}"><b>${E(p.name)}</b><small>${p.right} right, ${fx(mult(p))}</small><em>${p.pts}</em></div>`).join("")}</div>
  <div class="row"><button class="btn" id="ssMenu">Game Night menu</button><button class="btn gold" id="ssAgain">Play again</button></div></div>`;
  $("ssMenu").onclick=()=>{endGame();show("hub")};
  $("ssAgain").onclick=()=>begin(SS.players.map(p=>({name:p.name,color:p.color,slot:p.slot,pid:p.pid,cpu:p.cpu})));
  SFX.win&&SFX.win();
}
function sceneFor(p){
  const me=byPid(p.pid);
  const sc=SS.players.map(q=>({n:q.name,s:q.pts,c:q.color,on:0,pid:q.pid,av:av(q)}));
  const base={th:"ss",scores:sc,btns:[],sn:SS.rn*100+SS.qn*10+({pick:1,intro:2,ask:3,reveal:4,result:5,final:6}[SS.phase]||0),me:1};
  const e=SS.rn?`Round ${SS.rn} of ${CFG.rounds}`:"Sport Shuffle";
  if(!me)return {...base,head:{e:"Sport Shuffle",t:"Watch the TV",s:"You'll be in the next game"}};
  if(SS.phase==="final")return {...base,head:{e:"Game over",t:SS.winners.includes(me)?"YOU WIN!":SS.winners.map(x=>x.name).join(" & ")+" wins!",s:"You scored "+me.pts}};
  if(SS.phase==="pick")return {...base,head:{e:"Sport Shuffle",t:"Pick your sport",s:"Questions from your sport score normal points. Everyone else's score double"},clock:String(SS.left),btns:SPORTS.map(s=>({t:s[1],a:"pick",v:s[0],on:me.pick===s[0]?1:0,c:s[2]}))};
  if(SS.phase==="intro")return {...base,head:{e,t:SP[SS.cat].lab+" round",s:me.pick===SS.cat?"Your sport: normal points":"Not your sport: DOUBLE points"}};
  const dbl=me.pick!==SS.cat,m=fx(mult(me));
  if(SS.phase==="ask"){
    const done=me.ans!=null;
    return {...base,head:{e:e+" · "+SP[SS.cat].lab,t:SS.q[0],s:(dbl?"Double points":"Normal points")+" · your multiplier "+m},clock:String(SS.left),
      btns:SS.opts.map((o,i)=>({t:"ABC"[i]+".  "+o,a:"ans",v:i,d:done?1:0,on:me.ans===i?1:0}))};
  }
  if(SS.phase==="reveal"||SS.phase==="result")return {...base,head:{e,t:me.ans==null?"No answer":me.ok?"Correct! +"+me.gain:"Wrong",s:"Answer: "+SS.q[1]+(me.ok?"  ·  multiplier now "+fx(mult(me)):"")}};
  return {...base,head:{e:"Sport Shuffle",t:"Get ready",s:"Watch the TV"}};
}
function act(p,m){if(m.a==="pick")choose(p.pid,m.i);else if(m.a==="ans")answer(p.pid,m.i)}
const active=()=>!$("ss").hidden;
window.__SS={SS,CFG,sceneFor,act,active,begin,choose,answer};
})();
