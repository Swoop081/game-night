/* =================== CAPTION THIS ===================
   A photo appears on the TV. Everyone writes a funny caption on their phone, then everyone votes for their favourite
   (not their own). 100 points per vote, and the winning caption gets a 200 point bonus. 3 to 10 players. */
(function(){
const CFG={rounds:5,write:45,vote:25,sets:["animals","bugs","fruitveg","objects","food","transport","landmarks","wonders","sports"]};
try{const j=JSON.parse(localStorage.getItem("gn.ct")||"null");if(j)Object.assign(CFG,j);CFG.sets=(CFG.sets||[]).filter(x=>window.CATS&&CATS[x]);if(!CFG.sets.length)CFG.sets=["animals","objects","food"]}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.ct",JSON.stringify(CFG))}catch(e){}};
const FONT='"Oxanium","Big Shoulders Display",Impact,sans-serif';
const STOCK=["When the WiFi drops mid-argument","Me explaining my plan to my boss","Nobody:   Absolutely nobody:   Me:","Monday has entered the chat","This is my 'I can't hear you' face","Just five more minutes","When someone says 'we need to talk'","How I look when I say I'm fine","Me after one coffee","POV: the group chat when I'm not replying","I understood that reference","Tell me you've been there without telling me","Sir, this is a Wendy's","Local legend spotted","Plot twist: it was Dave all along","My last two brain cells","Loading... please wait","The sequel nobody asked for","Not today, Satan","Calm down, it's just Tuesday"];
const css=`
#ct,#ctSetup{background:radial-gradient(120% 90% at 50% 0%,#0f6e7a 0%,#083a47 55%,#021820 100%);position:absolute;overflow:hidden;--stage-2:#0d5463;--stage-3:#117284;--line:#2fb8cc;--gold:#ffe14a;--gold-deep:#d9b800;--muted:#a8eef7}
#ct>*,#ctSetup>*{position:relative;z-index:2}
#ct{padding:0;gap:0}
#ct .floorbar{padding:1.2vmin 2vmin;gap:2vmin;flex:none}
#ct .brand{font-family:${FONT};letter-spacing:.2em;font-size:clamp(.8rem,2vmin,1.2rem)}
#ct .btn,#ctSetup .btn{border-radius:0;border:0;box-shadow:none;font-family:${FONT};letter-spacing:.14em;text-transform:uppercase}
#ct .btn.ghost,#ctSetup .btn.ghost{background:rgba(0,0,0,.4)}
#ct .btn.gold,#ctSetup .btn.gold{background:#ffe14a;color:#083a47}
#ctSetup .topbar h2{color:#ffe14a}
#ctStage{flex:1;min-height:0;display:flex;flex-direction:column;align-items:stretch;gap:1.4vmin;padding:1.4vmin 2.4vmin 1.8vmin}
.cthud{display:flex;align-items:center;justify-content:space-between;gap:2vmin;font-family:${FONT};letter-spacing:.2em;text-transform:uppercase;font-weight:800;color:#ffe14a;font-size:clamp(.8rem,2.2vmin,1.3rem)}
.ctclock{font-family:${FONT};font-weight:800;font-size:clamp(1.8rem,7vmin,4rem);line-height:1;color:#ffe14a;font-variant-numeric:tabular-nums;min-width:2.2ch;text-align:center}
.ctclock.low{color:#fff;background:#e5173f;padding:0 .2em}
.ctbody{flex:1;min-height:0;display:flex;gap:2vmin}
.ctphoto{flex:1 1 55%;min-width:0;min-height:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.35);padding:1vmin}
.ctphoto img{max-width:100%;max-height:100%;object-fit:contain;display:block}
.ctlist{flex:1 1 45%;min-width:0;min-height:0;display:flex;flex-direction:column;gap:1vmin;overflow:hidden;justify-content:center}
.ctcap{position:relative;background:#fff;color:#083a47;font-family:${FONT};font-weight:900;font-size:clamp(.9rem,3vmin,2rem);line-height:1.1;padding:1.1vmin 1.6vmin;border-left:1vmin solid #ffe14a;overflow-wrap:anywhere}
.ctcap i{font-style:normal;color:#0f6e7a;margin-right:.8vmin}
.ctcap .by{display:block;font-size:.55em;letter-spacing:.14em;text-transform:uppercase;color:#0f6e7a;margin-top:.4vmin}
.ctcap .vs{position:absolute;right:1vmin;top:50%;transform:translateY(-50%);font-size:1.3em;color:#0f6e7a}
.ctcap.win{background:#ffe14a;border-left-color:#fff;transform:scale(1.03)}
.ctcap.pop{animation:ctpop .5s both}
@keyframes ctpop{from{transform:translateX(3vmin);opacity:0}to{opacity:1}}
.ctwho{flex:none;display:flex;flex-wrap:wrap;gap:.8vmin;justify-content:center;max-height:22%;overflow:hidden}
.ctp{display:flex;align-items:center;gap:.8vmin;padding:.4vmin 1.2vmin .4vmin .4vmin;background:rgba(0,0,0,.35);border-left:.6vmin solid var(--pc);font-family:${FONT};font-weight:800;color:#fff;font-size:clamp(.7rem,2.1vmin,1.3rem)}
.ctp img,.ctp .ini{width:3.8vmin;height:3.8vmin;object-fit:cover;background:#fff;display:block}
.ctp .ini{display:flex;align-items:center;justify-content:center;color:#083a47;font-weight:900}
.ctp.wait{opacity:.4}.ctp.done{background:#1a7a3a}.ctp .pt{color:#ffe14a}
.ctmsg{font-family:${FONT};font-weight:900;text-transform:uppercase;text-align:center;color:#fff;font-size:clamp(1rem,3.2vmin,2.2rem);min-height:1.2em;flex:none}
.ctend{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2vmin;flex:1;text-align:center}
.ctend .big{font-family:${FONT};font-weight:900;color:#ffe14a;text-transform:uppercase;font-size:clamp(2rem,8vmin,5.5rem);line-height:1.05}
.ctrank{display:flex;flex-direction:column;gap:.8vmin;width:min(640px,92%)}
.ctrank .r{display:flex;align-items:center;gap:1.4vmin;background:rgba(0,0,0,.35);padding:.8vmin 1.6vmin;border-left:.8vmin solid var(--pc);font-family:${FONT};font-weight:800;color:#fff;font-size:clamp(.9rem,3vmin,1.8rem);text-transform:uppercase}
.ctrank .r b{flex:1;text-align:left}.ctrank .r em{font-style:normal;color:#ffe14a}
.ctrank .r.win{background:#ffe14a;color:#083a47}.ctrank .r.win em{color:#083a47}
.portrait .ctbody{flex-direction:column}
#playCT{background:linear-gradient(160deg,#0f6e7a,#021820)!important;border-color:#ffe14a!important}
#playCT .ctart{display:flex;align-items:center;justify-content:center;height:100%;font:900 2.4rem/1 system-ui;color:#ffe14a}
#ctSetup .rules li{margin:.3em 0}
#ctSetup .pbgroups{display:flex;flex-wrap:wrap;gap:8px}
#ctSetup .pbgroups button{padding:.5em 1em;border-radius:999px;background:var(--stage-3);border:1px solid var(--line);font-weight:800}
#ctSetup .pbgroups button[aria-pressed="true"]{background:#ffe14a;color:#083a47;border-color:#ffe14a}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

const hub=document.querySelector(".games");
if(!hub)return;
const tile=document.createElement("button");tile.className="game live";tile.id="playCT";
tile.innerHTML=`<span class="art"><span class="ctart">"LOL"</span><span class="pill">Play</span></span><h2>Caption This</h2><p>Write the funniest caption. Everyone votes.</p>`;
hub.insertBefore(tile,hub.children[1]||null);
const hn=hub.children.length;hub.classList.remove("five","six","seven");if(hn>=7)hub.classList.add("seven");

const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="ctSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="ct";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>CAPTION THIS</small></span><span class="spacer"></span><span class="count" id="ctCount"></span><button class="btn ghost" id="ctQuit">Quit</button></div><div id="ctStage"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("ctQuit").onclick=()=>confirmSheet("Quit this game?","Everyone will be back in the lobby.","Quit",()=>{closeOverlay();endGame();show("hub")});
const esc2=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const SETNAMES={animals:"Animals",bugs:"Bugs",fruitveg:"Fruit & Veg",objects:"Objects",food:"Food",transport:"Transport",landmarks:"Landmarks",wonders:"Nature",sports:"Sports"};

function openSetup(){
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="ctBack">← Back</button><h2>Caption This</h2><button class="btn gold" id="ctStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li>A photo appears on the TV. <b>Write the funniest caption on your phone.</b></li>
      <li>Then all the captions show up <b>without names</b>. Vote for your favourite on your phone. You can't vote for your own.</li>
      <li><b>100 points per vote</b>, and the winning caption gets a <b>200 point bonus</b>.</li>
      <li>3 to 10 players. Keep it fun and friendly!</li></ul></div>
    <div class="field"><span class="eyebrow">Rounds</span><div class="seg" id="ctRoundsSeg"></div></div>
    <div class="field"><span class="eyebrow">Seconds to write</span><div class="seg" id="ctWriteSeg"></div></div>
    <div class="field"><span class="eyebrow">Photos</span><div class="pbgroups" id="ctSets"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="ctSoundSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players</span><div id="ctPlayers" class="hlsetup"><div class="note">Join with your phones. You need at least 3 players (CPU players count).</div></div></div></div>`;
  seg($("ctRoundsSeg"),[3,5,8],()=>CFG.rounds,v=>{CFG.rounds=v;saveCfg()},v=>String(v));
  seg($("ctWriteSeg"),[30,45,60],()=>CFG.write,v=>{CFG.write=v;saveCfg()},v=>v+"s");
  seg($("ctSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  Object.keys(SETNAMES).filter(id=>CATS[id]).forEach(id=>{const b=document.createElement("button");b.textContent=SETNAMES[id];b.setAttribute("aria-pressed",CFG.sets.includes(id));
    b.onclick=()=>{const on=CFG.sets.includes(id);if(on&&CFG.sets.length===1)return;CFG.sets=on?CFG.sets.filter(x=>x!==id):CFG.sets.concat(id);saveCfg();b.setAttribute("aria-pressed",!on)};$("ctSets").appendChild(b)});
  $("ctBack").onclick=()=>show("hub");
  $("ctStart").onclick=()=>{ac();startGame()};
  show("ctSetup");
}

/* ---------- state ---------- */
const CT={players:[],n:0,item:null,caps:[],phase:"idle",left:0,timer:null,T:[],pool:[],used:new Set(),winners:[]};
const byPid=pid=>CT.players.find(p=>p.pid===pid);
const clearT=()=>{clearInterval(CT.timer);CT.T.forEach(clearTimeout);CT.T=[]};
const later=(fn,ms)=>{CT.T.push(setTimeout(fn,ms))};
function endGame(){clearT();CT.phase="idle"}
const chip=p=>{let a="";try{a=avatarSrc(p.slot)}catch(e){}return `<div class="ctp wait" id="ctP${p.slot}" style="--pc:${p.color}"><img alt="" src="${esc(a)}" onerror="this.outerHTML='<span class=ini>${esc((p.name||"?").charAt(0).toUpperCase())}</span>'"><span>${esc2(p.name)}</span><span class="pt"></span></div>`};

async function startGame(){
  const L=window.LINK&&LINK.pull?LINK.pull(3,10,{cpu:true}):null;
  if(!L||L.length<3){
    openOverlay(`<span class="eyebrow">Caption This</span><h2>Need 3 players</h2><p class="score">Scan the join code with your phones${L&&L.length?` (${L.length} in so far)`:""}. CPU players count as players.</p><div class="row"><button class="btn" id="ctAddCpu">Add a CPU player</button><button class="btn gold" id="ctOk">OK</button></div>`);
    $("ctAddCpu").onclick=()=>{window.LINK&&LINK.addCpu&&LINK.addCpu();closeOverlay()};$("ctOk").onclick=closeOverlay;return;
  }
  const list=L.slice(0,10).map((p,i)=>({name:p.name,color:DISTINCT[i%DISTINCT.length],slot:i,pid:p.pid,cpu:!!p.cpu}));
  show("ct");$("ctCount").textContent="";
  $("ctStage").innerHTML=`<div class="ctend"><div class="big">Loading photos…</div></div>`;
  await Promise.all(CFG.sets.map(id=>window.loadPhotos?loadPhotos(id):0));
  CT.pool=[];CFG.sets.forEach(id=>{const c=CATS[id];if(c&&c.kind==="photo")c.items.forEach(it=>{if(it.img)CT.pool.push(it)})});
  if(CT.pool.length<4){
    $("ctStage").innerHTML=`<div class="ctend"><div class="big">Pictures didn't load</div><div class="ctmsg">Caption This needs the internet to fetch photos.</div><div class="row"><button class="btn gold" id="ctBack2">Back</button></div></div>`;
    $("ctBack2").onclick=()=>show("ctSetup");return;
  }
  begin(list);
}
function begin(list){
  save();
  CT.players=list.map(p=>({...p,pts:0,cap:null,vote:null,gain:0}));
  CT.n=0;CT.used=new Set();CT.winners=[];CT.phase="idle";
  $("ctStage").innerHTML=`<div class="ctend"><div class="big">Caption This</div><div class="ctmsg">${CT.players.length} players. Get your funniest caption ready!</div></div>`;
  SFX.go&&SFX.go();
  later(nextRound,2200);
}
function pickItem(){
  let fresh=CT.pool.filter(i=>!CT.used.has(i.img));if(!fresh.length){CT.used=new Set();fresh=CT.pool}
  const it=fresh[Math.floor(Math.random()*fresh.length)];CT.used.add(it.img);return it;
}
function loadImg(src){return new Promise((res,rej)=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>rej();im.src=src;setTimeout(()=>rej(),9000)})}
async function nextRound(){
  clearT();CT.n++;
  if(CT.n>CFG.rounds)return finish();
  let it=null,tries=0;
  while(!it&&tries++<5){const c=pickItem();try{await loadImg(c.img);it=c}catch(e){CT.pool=CT.pool.filter(x=>x!==c)}}
  if(!it)return finish();
  CT.item=it;CT.caps=[];CT.phase="write";CT.left=CFG.write;
  CT.players.forEach(p=>{p.cap=null;p.vote=null;p.gain=0});
  $("ctCount").textContent=`Round ${CT.n} of ${CFG.rounds}`;
  $("ctStage").innerHTML=`<div class="cthud"><span>Write a caption</span><span class="ctclock" id="ctClock">${CT.left}</span><span>On your phone</span></div>
  <div class="ctbody"><div class="ctphoto"><img alt="" referrerpolicy="no-referrer" src="${esc(it.img)}"></div></div>
  <div class="ctmsg" id="ctMsg">What's going on here?</div>
  <div class="ctwho" id="ctWho">${CT.players.map(chip).join("")}</div>`;
  CT.timer=setInterval(()=>{CT.left--;const c=$("ctClock");if(c){c.textContent=CT.left;c.classList.toggle("low",CT.left<=8)}
    if(CT.left<=8&&CT.left>0)SFX.beep&&SFX.beep();
    if(CT.left<=0){clearInterval(CT.timer);startVote()}},1000);
  const stock=STOCK.slice().sort(()=>Math.random()-.5);
  CT.players.filter(p=>p.cpu).forEach((p,i)=>later(()=>submit(p.pid,stock[i%stock.length]),2500+Math.random()*CFG.write*450));
  SFX.go&&SFX.go();
}
function submit(pid,text){
  const p=byPid(pid);if(!p||CT.phase!=="write"||p.cap)return;
  text=String(text||"").replace(/\s+/g," ").trim().slice(0,80);if(!text)return;
  p.cap=text;const el=$("ctP"+p.slot);if(el){el.classList.remove("wait");el.classList.add("done")}
  SFX.tick&&SFX.tick();
  if(CT.players.every(x=>x.cap)){clearInterval(CT.timer);later(startVote,700)}
}
function startVote(){
  if(CT.phase!=="write")return;clearT();
  const have=CT.players.filter(p=>p.cap);
  if(have.length<2){
    CT.phase="result";
    $("ctStage").querySelector(".ctmsg").textContent="Not enough captions this round!";
    later(nextRound,3000);return;
  }
  CT.caps=have.slice().sort(()=>Math.random()-.5).map((p,i)=>({pid:p.pid,text:p.cap,i,votes:0}));
  CT.phase="vote";CT.left=CFG.vote;
  $("ctStage").innerHTML=`<div class="cthud"><span>Vote for the funniest</span><span class="ctclock" id="ctClock">${CT.left}</span><span>Not your own!</span></div>
  <div class="ctbody"><div class="ctphoto"><img alt="" referrerpolicy="no-referrer" src="${esc(CT.item.img)}"></div>
  <div class="ctlist" id="ctList">${CT.caps.map(c=>`<div class="ctcap pop" style="animation-delay:${c.i*.12}s"><i>${String.fromCharCode(65+c.i)}</i>${esc2(c.text)}</div>`).join("")}</div></div>
  <div class="ctmsg" id="ctMsg">Pick your favourite on your phone</div>
  <div class="ctwho" id="ctWho">${CT.players.map(chip).join("")}</div>`;
  SFX.go&&SFX.go();
  CT.timer=setInterval(()=>{CT.left--;const c=$("ctClock");if(c){c.textContent=CT.left;c.classList.toggle("low",CT.left<=5)}
    if(CT.left<=0){clearInterval(CT.timer);reveal()}},1000);
  CT.players.filter(p=>p.cpu).forEach(p=>later(()=>castVote(p.pid,pickFor(p)),1500+Math.random()*CFG.vote*500));
}
const optsFor=p=>CT.caps.filter(c=>c.pid!==p.pid);
function pickFor(p){const o=optsFor(p);return o.length?o[Math.floor(Math.random()*o.length)].i:-1}
function castVote(pid,i){
  const p=byPid(pid);if(!p||CT.phase!=="vote"||p.vote!=null)return;
  const c=CT.caps[+i];if(!c||c.pid===pid)return;
  p.vote=c.i;const el=$("ctP"+p.slot);if(el){el.classList.remove("wait");el.classList.add("done")}
  SFX.tick&&SFX.tick();
  if(CT.players.every(x=>x.vote!=null)){clearInterval(CT.timer);later(reveal,600)}
}
function reveal(){
  if(CT.phase!=="vote")return;clearT();CT.phase="reveal";
  CT.players.forEach(p=>{if(p.vote!=null)CT.caps[p.vote].votes++});
  const top=Math.max(...CT.caps.map(c=>c.votes));
  CT.caps.forEach(c=>{const a=byPid(c.pid);c.win=top>0&&c.votes===top;a.gain=c.votes*100+(c.win?200:0);a.pts+=a.gain});
  const ck=$("ctClock");if(ck){ck.textContent="·";ck.classList.remove("low")}
  const els=[...$("ctList").children];
  CT.caps.forEach((c,k)=>later(()=>{const a=byPid(c.pid),el=els[k];if(!el)return;
    el.classList.remove("pop");el.classList.toggle("win",c.win);
    el.innerHTML=`<i>${String.fromCharCode(65+c.i)}</i>${esc2(c.text)}<span class="by">${esc2(a.name)} · ${c.votes} vote${c.votes===1?"":"s"} · +${a.gain}</span>`;
    SFX.ok&&SFX.ok();},700+k*900));
  const t=700+CT.caps.length*900;
  later(()=>{const w=CT.caps.filter(c=>c.win);const m=$("ctMsg");if(m)m.textContent=w.length?(w.length>1?"A tie for the funniest!":esc2(byPid(w[0].pid).name)+" wrote the funniest!"):"No votes cast!";SFX.win&&w.length&&SFX.win()},t);
  later(()=>{CT.phase="result"},t+100);
  later(nextRound,t+4200);
}
function finish(){
  clearT();CT.phase="final";
  const o=CT.players.slice().sort((a,b)=>b.pts-a.pts),top=o[0].pts,win=o.filter(p=>p.pts===top);CT.winners=win;
  try{window.LB&&LB.record("ct",CT.players.map(p=>({name:p.name,color:p.color,score:p.pts,win:p.pts===top})))}catch(e){}
  $("ctCount").textContent="";
  $("ctStage").innerHTML=`<div class="ctend"><div class="ctmsg" style="color:#ffe14a">Final scores</div><div class="big">${win.length>1?"It's a draw!":esc2(win[0].name)+" wins!"}</div>
  <div class="ctrank">${o.map(p=>`<div class="r${p.pts===top?" win":""}" style="--pc:${p.color}"><b>${esc2(p.name)}</b><em>${p.pts}</em></div>`).join("")}</div>
  <div class="row"><button class="btn" id="ctMenu">Game Night menu</button><button class="btn gold" id="ctAgain">Play again</button></div></div>`;
  $("ctMenu").onclick=()=>{endGame();show("hub")};
  $("ctAgain").onclick=()=>begin(CT.players.map(p=>({name:p.name,color:p.color,slot:p.slot,pid:p.pid,cpu:p.cpu})));
  SFX.win&&SFX.win();
}

/* ---------- what phones see ---------- */
function sceneFor(p){
  const me=byPid(p.pid);
  const sc=CT.players.map(q=>({n:q.name,s:q.pts,c:q.color,on:0,pid:q.pid,av:(()=>{try{return avatarSrc(q.slot)}catch(e){return ""}})()}));
  const base={th:"ct",scores:sc,btns:[],sn:CT.n*10+({write:1,vote:2,reveal:3,result:4,final:5}[CT.phase]||0),me:1};
  const e=CT.n?`Round ${CT.n} of ${CFG.rounds}`:"Caption This";
  if(!me)return {...base,head:{e:"Caption This",t:"Watch the TV",s:"You'll be in the next game"}};
  if(CT.phase==="final"){const w=CT.winners.includes(me);return {...base,head:{e:"Game over",t:w?"YOU WIN!":CT.winners.map(x=>x.name).join(" & ")+" wins!",s:"You scored "+me.pts}}}
  if(CT.phase==="write"){
    if(me.cap)return {...base,head:{e,t:"Caption locked in",s:"Waiting for the others"},clock:String(CT.left)};
    return {...base,head:{e,t:"Caption this!",s:"Look at the photo on the TV and write something funny"},clock:String(CT.left),inp:{ph:"Type your caption here",big:1}};
  }
  if(CT.phase==="vote"){
    const voted=me.vote!=null;
    return {...base,head:{e,t:voted?"Vote locked in":"Vote for the funniest",s:voted?"Waiting for the others":"You can't vote for your own"},clock:String(CT.left),
      btns:CT.caps.filter(c=>c.pid!==me.pid).map(c=>({t:String.fromCharCode(65+c.i)+".  "+c.text,a:"vote",v:c.i,d:voted?1:0,on:me.vote===c.i?1:0}))};
  }
  if(CT.phase==="reveal"||CT.phase==="result")return {...base,head:{e,t:me.gain?"+"+me.gain+" points":"No points this time",s:me.cap?"Your caption: "+me.cap:"Watch the TV"}};
  return {...base,head:{e:"Caption This",t:"Get ready",s:"Watch the TV"}};
}
function act(p,m){if(m.a==="vote")castVote(p.pid,m.i)}
const active=()=>!$("ct").hidden;
window.__CT={CT,CFG,sceneFor,act,active,text:(p,v)=>submit(p.pid,v),begin,submit,castVote};
})();
