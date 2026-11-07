/* =================== WORDLE RACE ===================
   Everyone races to solve the same 5-letter word on their own phone (6 guesses). The TV shows every player's board as
   coloured boxes only, so you can see who's close but never the letters. Faster and fewer guesses score more.
   2 to 10 players. */
(function(){
const CFG={rounds:3,secs:90};
try{const j=JSON.parse(localStorage.getItem("gn.wr")||"null");if(j)Object.assign(CFG,j)}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.wr",JSON.stringify(CFG))}catch(e){}};
const FONT='"Oxanium","Big Shoulders Display",Impact,sans-serif';
const css=`
#wr,#wrSetup{background:radial-gradient(120% 90% at 50% 0%,#14603a 0%,#0a3322 55%,#03140c 100%);position:absolute;overflow:hidden;--stage-2:#0e4a2b;--stage-3:#146a3c;--line:#2fb870;--gold:#ffd23f;--gold-deep:#d9a900;--muted:#b6f5cf}
#wr>*,#wrSetup>*{position:relative;z-index:2}
#wr{padding:0;gap:0}
#wr .floorbar{padding:1.2vmin 2vmin;gap:2vmin;flex:none}
#wr .brand{font-family:${FONT};letter-spacing:.2em;font-size:clamp(.8rem,2vmin,1.2rem)}
#wr .btn,#wrSetup .btn{border-radius:0;border:0;box-shadow:none;font-family:${FONT};letter-spacing:.14em;text-transform:uppercase}
#wr .btn.ghost,#wrSetup .btn.ghost{background:rgba(0,0,0,.4)}
#wr .btn.gold,#wrSetup .btn.gold{background:#ffd23f;color:#0a3322}
#wrSetup .topbar h2{color:#7dff9b}
#wrStage{flex:1;min-height:0;display:flex;flex-direction:column;align-items:stretch;gap:1.2vmin;padding:1.2vmin 2.4vmin 1.6vmin}
.wrhud{display:flex;align-items:center;justify-content:space-between;gap:2vmin;font-family:${FONT};letter-spacing:.2em;text-transform:uppercase;font-weight:800;color:#7dff9b;font-size:clamp(.8rem,2.2vmin,1.3rem)}
.wrclock{font-family:${FONT};font-weight:800;font-size:clamp(1.8rem,7vmin,4rem);line-height:1;color:#ffd23f;font-variant-numeric:tabular-nums;min-width:2.2ch;text-align:center}
.wrclock.low{color:#fff;background:#e5173f;padding:0 .2em}
.wrboards{flex:1;min-height:0;display:grid;gap:1.4vmin;align-items:center;justify-items:center}
.wrb{display:flex;flex-direction:column;align-items:center;gap:.6vmin;min-height:0;min-width:0}
.wrb .nm{display:flex;align-items:center;gap:.8vmin;font-family:${FONT};font-weight:900;text-transform:uppercase;color:#fff;font-size:clamp(.7rem,2vmin,1.2rem);white-space:nowrap}
.wrb .nm .pt{color:#ffd23f}
.wrb.done .nm{color:#7dff9b}.wrb.fail .nm{color:#ff8d8d}
.wrg{display:grid;grid-template-columns:repeat(5,var(--t));gap:calc(var(--t)*.14)}
.wrg i{width:var(--t);height:var(--t);background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font:900 calc(var(--t)*.7)/1 system-ui;color:#fff;font-style:normal;text-transform:uppercase}
.wrg i.s0{background:#3a4047;border-color:#3a4047}.wrg i.s1{background:#c9a21a;border-color:#c9a21a}.wrg i.s2{background:#2f9e4f;border-color:#2f9e4f}
.wrmain{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2vmin;text-align:center}
.wrbig{font-family:${FONT};font-weight:900;color:#ffd23f;text-transform:uppercase;font-size:clamp(2rem,8vmin,5.5rem);line-height:1.05;text-align:center}
.wrword{font-family:${FONT};font-weight:900;color:#fff;text-transform:uppercase;font-size:clamp(3rem,14vmin,9rem);letter-spacing:.2em;line-height:1}
.wrsub{font-family:${FONT};font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#d7ffe6;font-size:clamp(1rem,3.2vmin,2rem)}
.wrrank{display:flex;flex-direction:column;gap:.8vmin;width:min(640px,92%)}
.wrrank .r{display:flex;align-items:center;gap:1.4vmin;background:rgba(0,0,0,.35);padding:.8vmin 1.6vmin;border-left:.8vmin solid var(--pc);font-family:${FONT};font-weight:800;color:#fff;font-size:clamp(.9rem,3vmin,1.8rem);text-transform:uppercase}
.wrrank .r b{flex:1;text-align:left}.wrrank .r em{font-style:normal;color:#ffd23f}.wrrank .r small{opacity:.8;font-size:.7em}
.wrrank .r.win{background:#ffd23f;color:#0a3322}.wrrank .r.win em{color:#0a3322}
#playWR{background:linear-gradient(160deg,#14603a,#03140c)!important;border-color:#7dff9b!important}
#playWR .wrart{display:grid;grid-template-columns:repeat(5,14px);gap:3px;justify-content:center;align-content:center;height:100%}
#playWR .wrart i{width:14px;height:14px;background:#3a4047}#playWR .wrart i.g{background:#2f9e4f}#playWR .wrart i.y{background:#c9a21a}
#wrSetup .rules li{margin:.3em 0}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const hub=document.querySelector(".games");if(!hub)return;
const tile=document.createElement("button");tile.className="game live";tile.id="playWR";
tile.innerHTML=`<span class="art"><span class="wrart">${"gyxxx yxgxx xxgyg ggggg".replace(/ /g,"").split("").map(c=>`<i class="${c}"></i>`).join("")}</span><span class="pill">Play</span></span><h2>Wordle Race</h2><p>Solve the same word, fastest wins.</p>`;
hub.insertBefore(tile,hub.children[1]||null);
const hn=hub.children.length;hub.classList.remove("five","six","seven");if(hn>=7)hub.classList.add("seven");
const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="wrSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="wr";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>WORDLE RACE</small></span><span class="spacer"></span><span class="count" id="wrCount"></span><button class="btn ghost" id="wrQuit">Quit</button></div><div id="wrStage"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("wrQuit").onclick=()=>confirmSheet("Quit this game?","Everyone will be back in the lobby.","Quit",()=>{closeOverlay();endGame();show("hub")});
const E=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
function openSetup(){
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="wrBack">← Back</button><h2>Wordle Race</h2><button class="btn gold" id="wrStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li>Everyone gets <b>the same secret 5-letter word</b> and <b>6 guesses</b> on their own phone.</li>
      <li><b>Green</b> = right letter, right spot. <b>Yellow</b> = right letter, wrong spot. <b>Grey</b> = not in the word.</li>
      <li>The TV shows everyone's boxes but never the letters.</li>
      <li>Solve it for 100 points, plus 20 for every unused guess, plus a bonus for being first (50), second (30) or third (10).</li></ul></div>
    <div class="field"><span class="eyebrow">Words</span><div class="seg" id="wrRoundsSeg"></div></div>
    <div class="field"><span class="eyebrow">Seconds per word</span><div class="seg" id="wrSecsSeg"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="wrSoundSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players</span><div id="wrPlayers" class="hlsetup"><div class="note">Join with your phones. You need at least 2 players.</div></div></div></div>`;
  seg($("wrRoundsSeg"),[3,5,8],()=>CFG.rounds,v=>{CFG.rounds=v;saveCfg()},v=>String(v));
  seg($("wrSecsSeg"),[60,90,120,180],()=>CFG.secs,v=>{CFG.secs=v;saveCfg()},v=>v+"s");
  seg($("wrSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  $("wrBack").onclick=()=>show("hub");$("wrStart").onclick=()=>{ac();startGame()};
  show("wrSetup");
}
const WR={players:[],n:0,word:"",phase:"idle",left:0,timer:null,T:[],used:new Set(),order:0,winners:[]};
const byPid=pid=>WR.players.find(p=>p.pid===pid);
const clearT=()=>{clearInterval(WR.timer);WR.T.forEach(clearTimeout);WR.T=[]};
const later=(fn,ms)=>{WR.T.push(setTimeout(fn,ms))};
function endGame(){clearT();WR.phase="idle"}
const av=p=>{try{return avatarSrc(p.slot)}catch(e){return ""}};
function startGame(){
  const L=window.LINK&&LINK.pull?LINK.pull(2,10,{cpu:true}):null;
  if(!L||L.length<2){
    openOverlay(`<span class="eyebrow">Wordle Race</span><h2>Need 2 players</h2><p class="score">Scan the join code with your phones${L&&L.length?` (${L.length} in so far)`:""}. CPU players count.</p><div class="row"><button class="btn" id="wrAddCpu">Add a CPU player</button><button class="btn gold" id="wrOk">OK</button></div>`);
    $("wrAddCpu").onclick=()=>{window.LINK&&LINK.addCpu&&LINK.addCpu();closeOverlay()};$("wrOk").onclick=closeOverlay;return;
  }
  begin(L.slice(0,10).map((p,i)=>({name:p.name,color:DISTINCT[i%DISTINCT.length],slot:i,pid:p.pid,cpu:!!p.cpu})));
}
function begin(list){
  save();show("wr");
  WR.players=list.map(p=>({...p,pts:0,rows:[],done:false,ok:false,gain:0,kb:{}}));
  WR.n=0;WR.used=new Set();WR.phase="intro";WR.winners=[];$("wrCount").textContent="";
  $("wrStage").innerHTML=`<div class="wrmain"><div class="wrbig">Wordle Race</div><div class="wrsub">${WR.players.length} players. Same word, 6 guesses, go!</div></div>`;
  SFX.go&&SFX.go();later(nextRound,2400);
}
function feedback(guess,word){
  const r=[0,0,0,0,0],left={};
  for(let i=0;i<5;i++){if(guess[i]===word[i])r[i]=2;else left[word[i]]=(left[word[i]]||0)+1}
  for(let i=0;i<5;i++){if(r[i]!==2&&left[guess[i]]>0){r[i]=1;left[guess[i]]--}}
  return r.join("");
}
function nextRound(){
  clearT();WR.n++;if(WR.n>CFG.rounds)return finish();
  let fresh=WR_ANS.filter(w=>!WR.used.has(w));if(!fresh.length){WR.used=new Set();fresh=WR_ANS}
  WR.word=fresh[Math.floor(Math.random()*fresh.length)];WR.used.add(WR.word);
  WR.players.forEach(p=>{p.rows=[];p.done=false;p.ok=false;p.gain=0;p.kb={};p.fb=""});
  WR.phase="play";WR.left=CFG.secs;WR.order=0;
  $("wrCount").textContent=`Word ${WR.n} of ${CFG.rounds}`;
  paintBoards();
  WR.timer=setInterval(()=>{WR.left--;const c=$("wrClock");if(c){c.textContent=WR.left;c.classList.toggle("low",WR.left<=10)}
    if(WR.left<=10&&WR.left>0)SFX.beep&&SFX.beep();if(WR.left<=0)endRound()},1000);
  WR.players.filter(p=>p.cpu).forEach(p=>{
    const k=Math.random()<.85?3+Math.floor(Math.random()*4):99;let t=4000+Math.random()*6000;
    for(let g=0;g<Math.min(k,6);g++){const last=g+1===k;later(()=>{
      const w=last?WR.word:WR_ANS[Math.floor(Math.random()*WR_ANS.length)];submit(p.pid,w)},t);t+=5000+Math.random()*9000}
  });
  SFX.go&&SFX.go();
}
function paintBoards(){
  const n=WR.players.length,cols=n<=2?2:n<=4?n:n<=6?3:5,rows=Math.ceil(n/cols);
  $("wrStage").innerHTML=`<div class="wrhud"><span>Guess on your phone</span><span class="wrclock" id="wrClock">${WR.left}</span><span>6 guesses each</span></div>
  <div class="wrboards" id="wrBoards" style="grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr)"></div>`;
  const bo=$("wrBoards");const H=bo.getBoundingClientRect().height||400,W=bo.getBoundingClientRect().width||1100;
  const t=Math.max(10,Math.min(W/cols/5.6,(H/rows-26)/6.9,60));bo.style.setProperty("--t",t+"px");
  bo.innerHTML=WR.players.map(p=>`<div class="wrb" id="wrB${p.slot}"></div>`).join("");
  WR.players.forEach(drawBoard);
}
function drawBoard(p,reveal){
  const el=$("wrB"+p.slot);if(!el)return;
  el.className="wrb"+(p.done?(p.ok?" done":" fail"):"");
  let g="";for(let r=0;r<6;r++){const row=p.rows[r];for(let c=0;c<5;c++)g+=`<i class="${row?"s"+row.s[c]:""}">${reveal&&row?E(row.w[c]):""}</i>`}
  el.innerHTML=`<div class="nm" style="color:${p.done&&p.ok?"#7dff9b":""}">${E(p.name)}${p.done&&p.ok?` <span class="pt">+${p.gain}</span>`:""}</div><div class="wrg">${g}</div>`;
}
function submit(pid,raw){
  const p=byPid(pid);if(!p||WR.phase!=="play"||p.done)return;
  const w=String(raw||"").trim().toLowerCase();
  if(!/^[a-z]{5}$/.test(w)){p.fb="Type a 5 letter word";return}
  if(!WR_OK.has(w)&&!p.cpu){p.fb=w.toUpperCase()+" isn't in the word list";return}
  p.fb="";const s=feedback(w,WR.word);p.rows.push({w,s});
  for(let i=0;i<5;i++){const l=w[i],v=+s[i];if(p.kb[l]==null||v>p.kb[l])p.kb[l]=v}
  SFX.tick&&SFX.tick();
  if(w===WR.word){
    p.done=true;p.ok=true;WR.order++;
    p.gain=100+(6-p.rows.length)*20+({1:50,2:30,3:10}[WR.order]||0);p.pts+=p.gain;SFX.ok&&SFX.ok();
  }else if(p.rows.length>=6){p.done=true;p.ok=false}
  drawBoard(p);
  if(WR.players.every(x=>x.done)){clearInterval(WR.timer);later(endRound,1200)}
}
function endRound(){
  if(WR.phase!=="play")return;clearT();WR.phase="reveal";
  const o=WR.players.slice().sort((a,b)=>b.gain-a.gain||b.pts-a.pts);
  $("wrStage").innerHTML=`<div class="wrmain"><div class="wrsub">The word was</div><div class="wrword">${E(WR.word)}</div>
  <div class="wrrank">${o.slice(0,6).map(p=>`<div class="r" style="--pc:${p.color}"><b>${E(p.name)}</b><small>${p.ok?"solved in "+p.rows.length:"not solved"}</small><em>${p.gain?"+"+p.gain:"0"}</em></div>`).join("")}</div></div>`;
  WR.players.some(p=>p.ok)?SFX.win&&SFX.win():SFX.pass&&SFX.pass();
  later(nextRound,6500);
}
function finish(){
  clearT();WR.phase="final";
  const o=WR.players.slice().sort((a,b)=>b.pts-a.pts),top=o[0].pts,win=o.filter(p=>p.pts===top);WR.winners=win;
  try{window.LB&&LB.record("wr",WR.players.map(p=>({name:p.name,color:p.color,score:p.pts,win:p.pts===top})))}catch(e){}
  $("wrCount").textContent="";
  $("wrStage").innerHTML=`<div class="wrmain"><div class="wrsub">Final scores</div><div class="wrbig">${win.length>1?"It's a draw!":E(win[0].name)+" wins!"}</div>
  <div class="wrrank">${o.map(p=>`<div class="r${p.pts===top?" win":""}" style="--pc:${p.color}"><b>${E(p.name)}</b><em>${p.pts}</em></div>`).join("")}</div>
  <div class="row"><button class="btn" id="wrMenu">Game Night menu</button><button class="btn gold" id="wrAgain">Play again</button></div></div>`;
  $("wrMenu").onclick=()=>{endGame();show("hub")};
  $("wrAgain").onclick=()=>begin(WR.players.map(p=>({name:p.name,color:p.color,slot:p.slot,pid:p.pid,cpu:p.cpu})));
  SFX.win&&SFX.win();
}
function sceneFor(p){
  const me=byPid(p.pid);
  const sc=WR.players.map(q=>({n:q.name,s:q.pts,c:q.color,on:0,pid:q.pid,av:av(q)}));
  const base={th:"wr",scores:sc,btns:[],sn:WR.n*10+({play:1,reveal:2,final:3}[WR.phase]||0),me:1};
  const e=WR.n?`Word ${WR.n} of ${CFG.rounds}`:"Wordle Race";
  if(!me)return {...base,head:{e:"Wordle Race",t:"Watch the TV",s:"You'll be in the next game"}};
  if(WR.phase==="final")return {...base,head:{e:"Game over",t:WR.winners.includes(me)?"YOU WIN!":WR.winners.map(x=>x.name).join(" & ")+" wins!",s:"You scored "+me.pts}};
  if(WR.phase==="play"){
    const rows=me.rows.map(r=>({w:r.w,s:r.s}));
    if(me.done)return {...base,rows,kb:me.kb,clock:String(WR.left),head:{e,t:me.ok?"Solved! +"+me.gain:"Out of guesses",s:me.ok?"In "+me.rows.length+" guess"+(me.rows.length===1?"":"es"):"Waiting for the others"}};
    return {...base,rows,kb:me.kb,clock:String(WR.left),fb:me.fb||"",head:{e,t:"Guess the word",s:"Guess "+(me.rows.length+1)+" of 6"},inp:{ph:"5 letter word"}};
  }
  if(WR.phase==="reveal")return {...base,rows:me.rows.map(r=>({w:r.w,s:r.s})),head:{e,t:me.ok?"+"+me.gain+" points":"No points",s:"The word was "+WR.word.toUpperCase()}};
  return {...base,head:{e:"Wordle Race",t:"Get ready",s:"Watch the TV"}};
}
const active=()=>!$("wr").hidden;
window.__WR={WR,CFG,sceneFor,act:()=>{},active,text:(p,v)=>submit(p.pid,v),begin,feedback};
})();
