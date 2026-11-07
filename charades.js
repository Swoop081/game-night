/* =================== CHARADES ===================
   One player at a time gets a word or phrase on their phone and acts it out (no talking!).
   Everyone else types their guess on their phone. Faster guesses score more, and the actor scores for each guesser.
   3 to 10 players. CPU players guess but don't act. */
(function(){
const CFG={turns:1,secs:60,cats:["Animals","Actions","Movies","Jobs","Phrases","Everyday things"]};
try{const j=JSON.parse(localStorage.getItem("gn.ch")||"null");if(j)Object.assign(CFG,j);CFG.cats=(CFG.cats||[]).filter(c=>(window.CH_WORDS||{})[c]);if(!CFG.cats.length)CFG.cats=Object.keys(window.CH_WORDS||{})}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.ch",JSON.stringify(CFG))}catch(e){}};
const FONT='"Oxanium","Big Shoulders Display",Impact,sans-serif';
const css=`
#ch,#chSetup{background:radial-gradient(120% 90% at 50% 0%,#8a2a14 0%,#4a1308 55%,#1a0502 100%);position:absolute;overflow:hidden;--stage-2:#5e1c0d;--stage-3:#7a2612;--line:#d9552a;--gold:#ffc83d;--gold-deep:#d9a100;--muted:#ffc9b3}
#ch>*,#chSetup>*{position:relative;z-index:2}
#ch{padding:0;gap:0}
#ch .floorbar{padding:1.2vmin 2vmin;gap:2vmin;flex:none}
#ch .brand{font-family:${FONT};letter-spacing:.2em;font-size:clamp(.8rem,2vmin,1.2rem)}
#ch .btn,#chSetup .btn{border-radius:0;border:0;box-shadow:none;font-family:${FONT};letter-spacing:.14em;text-transform:uppercase}
#ch .btn.ghost,#chSetup .btn.ghost{background:rgba(0,0,0,.4)}
#ch .btn.gold,#chSetup .btn.gold{background:#ffc83d;color:#3a0f05}
#chSetup .topbar h2{color:#ffc83d}
#chStage{flex:1;min-height:0;display:flex;flex-direction:column;align-items:stretch;gap:1.4vmin;padding:1.4vmin 2.4vmin 1.8vmin}
.chhud{display:flex;align-items:center;justify-content:space-between;gap:2vmin;font-family:${FONT};letter-spacing:.2em;text-transform:uppercase;font-weight:800;color:#ffc83d;font-size:clamp(.8rem,2.2vmin,1.3rem)}
.chclock{font-family:${FONT};font-weight:800;font-size:clamp(2rem,9vmin,5rem);line-height:1;color:#ffc83d;font-variant-numeric:tabular-nums;min-width:2.2ch;text-align:center}
.chclock.low{color:#fff;background:#e5173f;padding:0 .2em}
.chmain{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2vmin;text-align:center}
.chactor{display:flex;align-items:center;gap:2vmin;font-family:${FONT};font-weight:900;text-transform:uppercase;color:#fff;font-size:clamp(1.6rem,7vmin,4.5rem);line-height:1}
.chactor img,.chactor .ini{width:11vmin;height:11vmin;object-fit:cover;background:#fff;display:flex;align-items:center;justify-content:center;color:#3a0f05;font-weight:900;border:.8vmin solid var(--pc)}
.chsub{font-family:${FONT};font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#ffe3d1;font-size:clamp(1rem,3.2vmin,2rem)}
.chcat{display:inline-block;background:#ffc83d;color:#3a0f05;font-family:${FONT};font-weight:900;letter-spacing:.18em;text-transform:uppercase;padding:.5vmin 2vmin;font-size:clamp(.9rem,2.6vmin,1.6rem)}
.chlen{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:2.4vmin 4vmin;max-width:94%}.chw{display:inline-flex;gap:.9vmin}.chw i{display:block;width:3.4vmin;height:.7vmin;background:#fff;margin-top:4vmin}.chwc{width:100%;font-size:2.2vmin;letter-spacing:.2em;color:#ffe3d1;font-weight:800;text-transform:uppercase}.chlen{font-family:${FONT};font-weight:900;letter-spacing:.35em;color:#fff;font-size:clamp(1.4rem,5vmin,3rem)}
.chword{font-family:${FONT};font-weight:900;text-transform:uppercase;color:#ffc83d;font-size:clamp(2.4rem,11vmin,7rem);line-height:1}
.chfeed{display:flex;flex-wrap:wrap;gap:.8vmin;justify-content:center;max-height:24%;overflow:hidden}
.chfeed span{background:rgba(0,0,0,.4);color:#ffe3d1;padding:.4vmin 1.2vmin;font-family:${FONT};font-weight:800;font-size:clamp(.8rem,2.2vmin,1.3rem);text-transform:uppercase}
.chwho{flex:none;display:flex;flex-wrap:wrap;gap:.8vmin;justify-content:center}
.chp{display:flex;align-items:center;gap:.8vmin;padding:.4vmin 1.2vmin .4vmin .4vmin;background:rgba(0,0,0,.35);border-left:.6vmin solid var(--pc);font-family:${FONT};font-weight:800;color:#fff;font-size:clamp(.7rem,2.1vmin,1.3rem)}
.chp img,.chp .ini{width:3.8vmin;height:3.8vmin;object-fit:cover;background:#fff;display:flex;align-items:center;justify-content:center;color:#3a0f05;font-weight:900}
.chp.done{background:#1a7a3a}.chp .pt{color:#ffc83d}
.chmsg{font-family:${FONT};font-weight:900;text-transform:uppercase;text-align:center;color:#fff;font-size:clamp(1rem,3.2vmin,2.2rem);min-height:1.2em;flex:none}
.chrank{display:flex;flex-direction:column;gap:.8vmin;width:min(640px,92%)}
.chrank .r{display:flex;align-items:center;gap:1.4vmin;background:rgba(0,0,0,.35);padding:.8vmin 1.6vmin;border-left:.8vmin solid var(--pc);font-family:${FONT};font-weight:800;color:#fff;font-size:clamp(.9rem,3vmin,1.8rem);text-transform:uppercase}
.chrank .r b{flex:1;text-align:left}.chrank .r em{font-style:normal;color:#ffc83d}
.chrank .r.win{background:#ffc83d;color:#3a0f05}.chrank .r.win em{color:#3a0f05}
.chbig{font-family:${FONT};font-weight:900;color:#ffc83d;text-transform:uppercase;font-size:clamp(2rem,8vmin,5.5rem);line-height:1.05;text-align:center}
#playCH{background:linear-gradient(160deg,#8a2a14,#1a0502)!important;border-color:#ffc83d!important}
#playCH .chart{display:flex;align-items:center;justify-content:center;height:100%;font:900 2.6rem/1 system-ui;color:#ffc83d}
#chSetup .rules li{margin:.3em 0}
#chSetup .pbgroups{display:flex;flex-wrap:wrap;gap:8px}
#chSetup .pbgroups button{padding:.5em 1em;border-radius:999px;background:var(--stage-3);border:1px solid var(--line);font-weight:800}
#chSetup .pbgroups button[aria-pressed="true"]{background:#ffc83d;color:#3a0f05;border-color:#ffc83d}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
const hub=document.querySelector(".games");if(!hub)return;
const tile=document.createElement("button");tile.className="game live";tile.id="playCH";
tile.innerHTML=`<span class="art"><span class="chart">ACT!</span><span class="pill">Play</span></span><h2>Charades</h2><p>Act it out. No talking!</p>`;
hub.insertBefore(tile,hub.children[1]||null);
const hn=hub.children.length;hub.classList.remove("five","six","seven");if(hn>=7)hub.classList.add("seven");
const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="chSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="ch";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>CHARADES</small></span><span class="spacer"></span><span class="count" id="chCount"></span><button class="btn ghost" id="chQuit">Quit</button></div><div id="chStage"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("chQuit").onclick=()=>confirmSheet("Quit this game?","Everyone will be back in the lobby.","Quit",()=>{closeOverlay();endGame();show("hub")});
const E=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));

function openSetup(){
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="chBack">← Back</button><h2>Charades</h2><button class="btn gold" id="chStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li>Each turn, one player's phone shows a <b>secret word or phrase</b>. They act it out. <b>No talking, no spelling, no pointing at things!</b></li>
      <li>Everyone else <b>types their guess on their phone</b>.</li>
      <li>The faster you guess, the more you score (up to 150). The actor scores 50 for every player who guesses it.</li>
      <li>The actor can skip a word if it's too hard. 3 to 10 players, CPU players guess but never act.</li></ul></div>
    <div class="field"><span class="eyebrow">Turns each</span><div class="seg" id="chTurnsSeg"></div></div>
    <div class="field"><span class="eyebrow">Seconds per turn</span><div class="seg" id="chSecsSeg"></div></div>
    <div class="field"><span class="eyebrow">Categories</span><div class="pbgroups" id="chCats"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="chSoundSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players</span><div id="chPlayers" class="hlsetup"><div class="note">Join with your phones. You need at least 3 players.</div></div></div></div>`;
  seg($("chTurnsSeg"),[1,2,3],()=>CFG.turns,v=>{CFG.turns=v;saveCfg()},v=>String(v));
  seg($("chSecsSeg"),[30,45,60,90],()=>CFG.secs,v=>{CFG.secs=v;saveCfg()},v=>v+"s");
  seg($("chSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  Object.keys(CH_WORDS).forEach(c=>{const b=document.createElement("button");b.textContent=c;b.setAttribute("aria-pressed",CFG.cats.includes(c));
    b.onclick=()=>{const on=CFG.cats.includes(c);if(on&&CFG.cats.length===1)return;CFG.cats=on?CFG.cats.filter(x=>x!==c):CFG.cats.concat(c);saveCfg();b.setAttribute("aria-pressed",!on)};$("chCats").appendChild(b)});
  $("chBack").onclick=()=>show("hub");$("chStart").onclick=()=>{ac();startGame()};
  show("chSetup");
}
const CH={players:[],queue:[],turn:0,total:0,actor:null,word:null,cat:"",alts:[],phase:"idle",left:0,timer:null,T:[],used:new Set(),got:{},feed:[],fb:{},skips:0,winners:[]};
const byPid=pid=>CH.players.find(p=>p.pid===pid);
const clearT=()=>{clearInterval(CH.timer);CH.T.forEach(clearTimeout);CH.T=[]};
const later=(fn,ms)=>{CH.T.push(setTimeout(fn,ms))};
function endGame(){clearT();CH.phase="idle"}
const av=p=>{try{return avatarSrc(p.slot)}catch(e){return ""}};
const chip=p=>`<div class="chp" id="chP${p.slot}" style="--pc:${p.color}"><img alt="" src="${esc(av(p))}" onerror="this.outerHTML='<span class=ini>${esc((p.name||"?").charAt(0).toUpperCase())}</span>'"><span>${E(p.name)}</span><span class="pt"></span></div>`;
function startGame(){
  const L=window.LINK&&LINK.pull?LINK.pull(3,10,{cpu:true}):null;
  if(!L||L.length<3||!L.some(p=>!p.cpu)){
    openOverlay(`<span class="eyebrow">Charades</span><h2>Need 3 players</h2><p class="score">Scan the join code with your phones${L&&L.length?` (${L.length} in so far)`:""}. At least one real player is needed to act.</p><div class="row"><button class="btn" id="chAddCpu">Add a CPU player</button><button class="btn gold" id="chOk">OK</button></div>`);
    $("chAddCpu").onclick=()=>{window.LINK&&LINK.addCpu&&LINK.addCpu();closeOverlay()};$("chOk").onclick=closeOverlay;return;
  }
  begin(L.slice(0,10).map((p,i)=>({name:p.name,color:DISTINCT[i%DISTINCT.length],slot:i,pid:p.pid,cpu:!!p.cpu})));
}
function begin(list){
  save();show("ch");
  CH.players=list.map(p=>({...p,pts:0,gain:0}));
  const actors=CH.players.filter(p=>!p.cpu);CH.queue=[];for(let t=0;t<CFG.turns;t++)actors.forEach(a=>CH.queue.push(a.pid));
  CH.total=CH.queue.length;CH.turn=0;CH.used=new Set();CH.phase="intro";CH.winners=[];
  $("chCount").textContent="";
  $("chStage").innerHTML=`<div class="chmain"><div class="chbig">Charades</div><div class="chsub">${CH.players.length} players. Act it out, no talking!</div></div>`;
  SFX.go&&SFX.go();later(nextTurn,2400);
}
const norm=s=>String(s||"").toLowerCase().replace(/&/g," and ").replace(/[^a-z0-9 ]/g," ").replace(/\b(the|a|an|to|your|you)\b/g," ").replace(/\s+/g," ").trim();
const lev=(a,b)=>{const d=[];for(let i=0;i<=a.length;i++){d[i]=[i];}for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length]};
const squash=s=>s.replace(/ /g,"");
function matches(guess,word){
  const g=norm(guess),w=norm(word);if(!g||!w)return false;if(g===w||squash(g)===squash(w))return true;
  const a=squash(g),b=squash(w);if(b.length>=5&&lev(a,b)<=(b.length>=9?2:1))return true;
  if(b.length>=5&&a.length>=b.length-1&&(a+"s"===b||b+"s"===a))return true;return false;
}
function pickWord(){
  const all=[];CFG.cats.forEach(c=>(CH_WORDS[c]||[]).forEach(w=>all.push([c,w])));
  let fresh=all.filter(x=>!CH.used.has(x[1]));if(!fresh.length){CH.used=new Set();fresh=all}
  const x=fresh[Math.floor(Math.random()*fresh.length)];CH.used.add(x[1]);return x;
}
function nextTurn(){
  clearT();CH.turn++;
  if(CH.turn>CH.total)return finish();
  CH.actor=byPid(CH.queue[CH.turn-1]);
  if(!CH.actor){return nextTurn()}
  const w=pickWord();CH.cat=w[0];CH.word=w[1];CH.skips=0;CH.got={};CH.feed=[];CH.fb={};
  CH.phase="ready";CH.left=CFG.secs;CH.ready=false;
  $("chCount").textContent=`Turn ${CH.turn} of ${CH.total}`;
  paintReady();
}
function paintReady(){
  const a=CH.actor;
  $("chStage").innerHTML=`<div class="chmain"><div class="chsub">Up next</div><div class="chactor" style="--pc:${a.color}"><img alt="" src="${esc(av(a))}" onerror="this.outerHTML='<span class=ini>${esc(a.name.charAt(0).toUpperCase())}</span>'">${E(a.name)}</div>
  <div class="chcat">${E(CH.cat)}</div><div class="chsub">${E(a.name)}, press Start on your phone to see your word</div><div class="chsub" style="opacity:.8">Everyone else: get ready to guess!</div></div>`;
  SFX.go&&SFX.go();
}
const dashes=w=>w.split(/\s+/).map(x=>`<span class="chw">${x.split("").map(()=>"<i></i>").join("")}</span>`).join("")+`<div class="chwc">${w.split(/\s+/).length} word${w.split(/\s+/).length===1?"":"s"}</div>`;
function startTurn(){
  if(CH.phase!=="ready")return;CH.phase="play";CH.ready=true;CH.t0=Date.now();
    $("chStage").innerHTML=`<div class="chhud"><span>Guess on your phone</span><span class="chclock" id="chClock">${CH.left}</span><span id="chAct">${E(CH.actor.name)} is acting</span></div>
  <div class="chmain"><div class="chcat">${E(CH.cat)}</div><div class="chlen" id="chLen">${dashes(CH.word)}</div><div class="chsub">${E(CH.actor.name)}: act it out. No talking!</div></div>
  <div class="chfeed" id="chFeed"></div><div class="chwho" id="chWho">${CH.players.filter(p=>p!==CH.actor).map(chip).join("")}</div>`;
  CH.timer=setInterval(tick,1000);
  CH.players.filter(p=>p.cpu).forEach(p=>{if(Math.random()<.55)later(()=>correct(p),(CFG.secs*(.35+Math.random()*.5))*1000)});
}
function tick(){
  CH.left--;const c=$("chClock");if(c){c.textContent=CH.left;c.classList.toggle("low",CH.left<=10)}
  if(CH.left<=10&&CH.left>0)SFX.beep&&SFX.beep();
  if(CH.left<=0)endTurn();
}
function correct(p){
  if(CH.phase!=="play"||p===CH.actor||CH.got[p.pid])return;
  const g=50+Math.round(100*CH.left/CFG.secs);CH.got[p.pid]=g;p.pts+=g;
  CH.actor.pts+=50;
  const el=$("chP"+p.slot);if(el){el.classList.add("done");el.querySelector(".pt").textContent="+"+g}
  SFX.ok&&SFX.ok();
  if(CH.players.filter(x=>x!==CH.actor).every(x=>CH.got[x.pid]))later(endTurn,900);
}
function guess(pid,v){
  const p=byPid(pid);if(!p||CH.phase!=="play"||p===CH.actor||CH.got[pid])return;
  v=String(v||"").trim().slice(0,60);if(!v)return;
  if(matches(v,CH.word)){CH.fb[pid]="";correct(p)}
  else{CH.fb[pid]="Not quite, keep guessing";SFX.pass&&SFX.pass();
    CH.feed.unshift(v);CH.feed=CH.feed.slice(0,8);const f=$("chFeed");if(f)f.innerHTML=CH.feed.map(x=>`<span>${E(x)}</span>`).join("")}
}
function skip(pid){
  if(CH.phase!=="play"||!CH.actor||CH.actor.pid!==pid||CH.skips>=2)return;
  CH.skips++;const w=pickWord();CH.cat=w[0];CH.word=w[1];CH.feed=[];
  const c=document.querySelector("#chStage .chcat");if(c)c.textContent=CH.cat;
  const l=$("chLen");if(l)l.innerHTML=dashes(CH.word);
  const f=$("chFeed");if(f)f.innerHTML="";
}
function endTurn(){
  if(CH.phase!=="play")return;clearT();CH.phase="reveal";
  const n=Object.keys(CH.got).length,a=CH.actor;
  $("chStage").innerHTML=`<div class="chmain"><div class="chsub">The answer was</div><div class="chword">${E(CH.word)}</div>
  <div class="chsub">${n?n+" player"+(n===1?"":"s")+" got it":"Nobody got it!"}</div>
  <div class="chrank">${CH.players.slice().sort((x,y)=>y.pts-x.pts).slice(0,5).map(p=>`<div class="r" style="--pc:${p.color}"><b>${E(p.name)}${p===a?" (actor)":""}</b><em>${p.pts}</em></div>`).join("")}</div></div>`;
  n?SFX.win&&SFX.win():SFX.pass&&SFX.pass();
  later(nextTurn,6000);
}
function finish(){
  clearT();CH.phase="final";
  const o=CH.players.slice().sort((a,b)=>b.pts-a.pts),top=o[0].pts,win=o.filter(p=>p.pts===top);CH.winners=win;
  try{window.LB&&LB.record("ch",CH.players.map(p=>({name:p.name,color:p.color,score:p.pts,win:p.pts===top})))}catch(e){}
  $("chCount").textContent="";
  $("chStage").innerHTML=`<div class="chmain"><div class="chsub">Final scores</div><div class="chbig">${win.length>1?"It's a draw!":E(win[0].name)+" wins!"}</div>
  <div class="chrank">${o.map(p=>`<div class="r${p.pts===top?" win":""}" style="--pc:${p.color}"><b>${E(p.name)}</b><em>${p.pts}</em></div>`).join("")}</div>
  <div class="row"><button class="btn" id="chMenu">Game Night menu</button><button class="btn gold" id="chAgain">Play again</button></div></div>`;
  $("chMenu").onclick=()=>{endGame();show("hub")};
  $("chAgain").onclick=()=>begin(CH.players.map(p=>({name:p.name,color:p.color,slot:p.slot,pid:p.pid,cpu:p.cpu})));
  SFX.win&&SFX.win();
}
function sceneFor(p){
  const me=byPid(p.pid);
  const sc=CH.players.map(q=>({n:q.name,s:q.pts,c:q.color,on:q===CH.actor&&CH.phase!=="final"?1:0,pid:q.pid,av:av(q)}));
  const base={th:"ch",scores:sc,btns:[],sn:CH.turn*10+({ready:1,play:2,reveal:3,final:4}[CH.phase]||0)+(CH.skips||0)*100,me:1};
  const e=CH.turn?`Turn ${CH.turn} of ${CH.total}`:"Charades";
  if(!me)return {...base,head:{e:"Charades",t:"Watch the TV",s:"You'll be in the next game"}};
  if(CH.phase==="final")return {...base,head:{e:"Game over",t:CH.winners.includes(me)?"YOU WIN!":CH.winners.map(x=>x.name).join(" & ")+" wins!",s:"You scored "+me.pts}};
  const act=CH.actor===me;
  if(CH.phase==="ready")return act?{...base,head:{e,t:"You're up!",s:"Category: "+CH.cat+". Everyone is watching, no talking!"},btns:[{t:"Show my word and start",a:"go",cls:"gold"}]}:{...base,head:{e,t:CH.actor.name+" is up",s:"Category: "+CH.cat+". Get ready to guess"}};
  if(CH.phase==="play"){
    if(act)return {...base,head:{e,t:"Act it out!",s:"Category: "+CH.cat+". No talking, no spelling"},clock:String(CH.left),big:CH.word,btns:CH.skips<2?[{t:"Skip this word ("+(2-CH.skips)+" left)",a:"skip",cls:"ghost"}]:[]};
    if(CH.got[me.pid])return {...base,head:{e,t:"You got it! +"+CH.got[me.pid],s:"Waiting for the others"},clock:String(CH.left)};
    return {...base,head:{e,t:"Guess the "+CH.cat.toLowerCase().replace(/s$/,""),s:CH.actor.name+" is acting"},clock:String(CH.left),fb:CH.fb[me.pid]||"",inp:{ph:"Type your guess"}};
  }
  if(CH.phase==="reveal")return {...base,head:{e,t:act?"Turn over":(CH.got[me.pid]?"+"+CH.got[me.pid]:"No points"),s:"It was: "+CH.word}};
  return {...base,head:{e:"Charades",t:"Get ready",s:"Watch the TV"}};
}
function act(p,m){if(m.a==="go"&&CH.actor&&CH.actor.pid===p.pid)startTurn();else if(m.a==="skip")skip(p.pid)}
const active=()=>!$("ch").hidden;
window.__CH={CH,CFG,sceneFor,act,active,text:(p,v)=>guess(p.pid,v),begin,matches,startTurn};
})();
