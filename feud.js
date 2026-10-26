/* =================== FAMILY FEUD ===================
   Two families. Face-off for control, play or pass, three strikes and the other family can steal.
   Round points are multiplied in later rounds. First family to the target score wins, then Fast Money. */
(function(){
const IS_TV=/GameNightTV/.test(navigator.userAgent);

const QS=(window.FF_RAW||[]).map(line=>{
  const [q,list]=line.split("|");
  const answers=(list||"").split(";").map(s=>{
    const k=s.lastIndexOf(":"),pts=parseInt(s.slice(k+1),10);
    const alts=s.slice(0,k).split("~").map(x=>x.trim()).filter(Boolean);
    return {name:alts[0],alts,pts};
  }).filter(a=>a.name&&a.pts>0).sort((a,b)=>b.pts-a.pts);
  return {q,answers};
}).filter(x=>x.q&&x.answers.length>=4);

const CFG={members:2,target:300,fm:true,t0:"Team 1",t1:"Team 2"};
try{const j=JSON.parse(localStorage.getItem("gn.ff")||"null");if(j)Object.assign(CFG,j)}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.ff",JSON.stringify(CFG))}catch(e){}};

const css=`
.ffscore{display:flex;align-items:stretch;justify-content:center;gap:10px;width:100%}
.ffteam{flex:1;min-width:0;display:flex;align-items:center;gap:10px;padding:6px 12px;border-radius:16px;background:var(--stage-2);border:2px solid var(--line);transition:border-color .2s,box-shadow .2s}
.ffteam.on{border-color:var(--pc);box-shadow:0 0 22px -6px var(--pc)}
.ffteam .avs{display:flex;flex:none}.ffteam .avs .av{--s:26px;padding:2px;margin-left:-8px}.ffteam .avs .av:first-child{margin-left:0}
.ffteam b{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--pc)}
.ffteam em{font-style:normal;font-family:var(--f-clock);font-size:clamp(1.6rem,4.6vmin,2.8rem);color:var(--gold);line-height:1}
.ffpot{flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;min-width:5.5em;line-height:1.05}
.ffpot small{font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);font-weight:800}
.ffpot b{font-family:var(--f-clock);font-size:clamp(1.4rem,4vmin,2.4rem);color:#fff}
.ffstage{position:relative;flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.6vh,14px);padding:4px 0;text-align:center}
.ffq{font-family:var(--f-display);font-weight:900;font-size:clamp(1.3rem,4vmin,2.4rem);line-height:1.05;max-width:960px}
.ffboard{display:grid;grid-auto-flow:column;grid-template-rows:repeat(var(--rows,4),minmax(0,1fr));grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(6px,1.1vmin,10px);width:min(1100px,100%)}
.portrait .ffboard{grid-auto-flow:row;grid-template-rows:none;grid-template-columns:minmax(0,1fr)}
.ffslot{display:flex;align-items:center;gap:10px;padding:.3em .7em;border-radius:12px;background:linear-gradient(180deg,#2a2a8f,#16165a);border:2px solid #4b4bd0;min-height:clamp(38px,7vh,66px);font-weight:900;font-size:clamp(.9rem,2.5vmin,1.5rem);text-transform:uppercase;letter-spacing:.02em}
.portrait .ffslot{min-height:clamp(32px,5.2vh,54px);font-size:clamp(.85rem,2.5vh,1.2rem)}
.ffslot i{flex:none;width:1.7em;height:1.7em;border-radius:50%;display:grid;place-items:center;font-style:normal;background:#0b0b3a;border:2px solid #6a6aff;color:#fff;font-family:var(--f-clock);font-size:.8em}
.ffslot .a{flex:1;min-width:0;text-align:left;visibility:hidden;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ffslot .p{flex:none;visibility:hidden;font-family:var(--f-clock);color:var(--gold);background:#0b0b3a;padding:.1em .5em;border-radius:8px}
.ffslot.shown{background:linear-gradient(180deg,#4b4bd0,#2a2a8f);border-color:#9a9aff;animation:ffflip .5s ease-out}
.ffslot.shown .a,.ffslot.shown .p{visibility:visible}
.ffslot.late{opacity:.7}
@keyframes ffflip{0%{transform:rotateX(90deg)}100%{transform:none}}
.ffstrikes{display:flex;gap:10px;justify-content:center}
.ffstrikes span{font-size:1.1rem;font-weight:900;width:1.5em;height:1.5em;display:grid;place-items:center;border-radius:8px;border:2px solid var(--line);color:transparent}
.ffstrikes span.on{border-color:var(--hot);color:var(--hot);background:rgba(255,80,80,.12)}
.ffx{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none;z-index:5;font-family:var(--f-display);font-weight:900;font-size:clamp(6rem,30vmin,16rem);color:#ff3b3b;text-shadow:0 0 40px rgba(255,0,0,.7),0 6px 0 #5a0000;letter-spacing:.08em;animation:ffx .95s ease-out forwards}
.ffx[hidden]{display:none}
@keyframes ffx{0%{opacity:0;transform:scale(.4)}15%{opacity:1;transform:scale(1.1)}80%{opacity:1}100%{opacity:0;transform:scale(1)}}
.ffstage>*,.ffctl>*{flex:none}
.ffctl{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;min-height:3em}
.ffwho{display:flex;align-items:center;gap:8px;justify-content:center;font-weight:800}
.ffwho .av{--s:30px;padding:2px}
.ffinput{display:flex;gap:8px;width:min(640px,100%)}
.ffinput input{flex:1;min-width:0;font-size:1.1rem;padding:.7em 1em;border-radius:12px;background:var(--stage-3);border:2px solid var(--line);color:var(--ink)}
.ffmiss{display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;font-weight:700;color:var(--muted)}
.ffmiss .btn{padding:.4em 1em;font-size:.9rem}
.ffmiss .strike{background:var(--hot);color:#fff;border-color:var(--hot)}
.ffbuzz{display:flex;gap:14px;width:min(900px,100%);justify-content:center}
.ffbuzz .btn{flex:1;min-width:0;padding:.7em .6em;font-size:clamp(1rem,2.6vmin,1.5rem);border:3px solid var(--pc);background:var(--stage-2);color:#fff;display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:center;gap:4px 10px}
.ffbuzz .btn .av{--s:44px}
.ffbuzz .btn small{flex-basis:100%}
.ffbuzz .btn small{opacity:.7;font-weight:600;font-size:.7em}
.ffpick{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.ffpick button{display:flex;align-items:center;gap:8px;padding:.4em 1em .4em .4em;border-radius:999px;background:var(--stage-3);border:2px solid var(--line);font-weight:800}
.ffpick button[aria-pressed="true"]{border-color:var(--gold);background:rgba(255,201,74,.15)}
.ffpick .av{--s:34px;padding:2px}
.ffbig{font-family:var(--f-display);font-weight:900;font-size:clamp(2.6rem,10vmin,5rem);color:var(--gold);line-height:1}
.ffclock{font-family:var(--f-clock);font-size:clamp(2.4rem,9vmin,4.4rem);color:var(--gold);line-height:1}
.ffclock.low{color:var(--hot)}
.fmtable{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr);gap:6px;width:min(900px,100%);text-align:left;font-weight:700}
.fmtable>div{padding:.4em .7em;border-radius:10px;background:var(--stage-2);min-height:2.2em;display:flex;justify-content:space-between;gap:8px;align-items:center;overflow:hidden}
.fmtable .h{background:none;color:var(--muted);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase}
.fmtable .q{font-size:.85rem;color:var(--muted)}
.fmtable b{font-family:var(--f-clock);color:var(--gold)}
.fmtable .v{visibility:hidden}.fmtable .v.on{visibility:visible;animation:ffflip .4s ease-out}
.ffsetupteams{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.portrait .ffsetupteams{grid-template-columns:1fr}
.ffmini{display:grid;grid-template-columns:repeat(2,26px);gap:3px}
.ffmini i{width:26px;height:16px;border-radius:4px;background:linear-gradient(180deg,#4b4bd0,#2a2a8f);border:1px solid #9a9aff}
.games.five{grid-template-columns:repeat(5,minmax(0,1fr));width:min(1280px,100%)}
.portrait .games.five{grid-template-columns:repeat(2,minmax(0,1fr));max-height:none;flex:none;grid-auto-rows:auto}
.portrait #ff{gap:6px;padding-top:max(8px,calc(var(--sa-t) + var(--blur-gap)));padding-bottom:max(8px,var(--sa-b))}
.portrait #ff .floorbar{gap:8px}.portrait #ff .brand{font-size:1.05rem}.portrait #ff .brand small{display:none}
.portrait #ff .floorbar .btn{padding:.45em 1em;font-size:.85rem}
.portrait .ffteam{padding:4px 8px;gap:6px}.portrait .ffteam .avs{display:none}.portrait .ffteam b{font-size:.85rem}
.portrait .ffpot{min-width:3.6em}
.portrait .ffq{font-size:1.25rem}
.portrait .ffstage{gap:clamp(6px,1.2vh,12px)}
.game.live .ffmini{margin:0}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* ---------- hub tile + screens ---------- */
const hub=document.querySelector(".games");
const tile=document.createElement("button");tile.className="game live";tile.id="playFF";
tile.innerHTML=`<span class="art"><span class="ffmini"><i></i><i></i><i></i><i></i></span><span class="pill">Play</span></span><h2>Family Feud</h2><p>Survey says… Two families, one board.</p>`;
hub.appendChild(tile);
if(hub.children.length>4)hub.classList.add("five");
const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="ffSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="ff";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>FAMILY FEUD</small></span><span class="spacer"></span><span class="count" id="ffRound"></span><button class="btn ghost" id="ffQuit">Quit</button></div>
<div class="ffscore" id="ffScore"></div><div class="ffstage" id="ffStage"></div><div class="mic" id="ffMic"></div><div class="ffx" id="ffX" hidden></div>`;
tile.onclick=()=>{ac();openSetup()};
$("ffQuit").onclick=()=>confirmSheet("Quit this game?","The scores will be lost.","Quit",()=>{closeOverlay();endGame();show("hub")});

/* ---------- setup ---------- */
function openSetup(){
  const m=CFG.members;S.count=m*2;ensureSlots();
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="ffBack">← Back</button><h2>Family Feud</h2><button class="btn gold" id="ffStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">Players per family</span><div class="stepper"><button id="ffMinus" aria-label="Fewer players">−</button><output id="ffCount">${m}</output><button id="ffPlus" aria-label="More players">+</button></div></div>
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li><b>Face-off:</b> one from each family buzzes in. The best answer wins <b>control</b>.</li>
      <li>The family in control chooses to <b>play or pass</b>, then takes turns giving answers.</li>
      <li><b>Three strikes</b> and the other family can <b>steal</b> the pot with one answer.</li>
      <li>Rounds 1 to 3 score normally. Round 4 is <b>double</b>, round 5 on is <b>triple</b>.</li>
      <li>First family to the target wins, then plays <b>Fast Money</b> for ${200} points.</li></ul>
      <p class="note">Survey scores are my own estimates for fun, not real surveys.</p></div>
    <div class="field"><span class="eyebrow">Target score</span><div class="seg" id="ffTargetSeg"></div></div>
    <div class="field"><span class="eyebrow">Fast Money</span><div class="seg" id="ffFmSeg"></div></div>
    <div class="field"><span class="eyebrow">Voice answers</span><div class="seg" id="ffVoiceSeg"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="ffSoundSeg"></div></div>
    <div class="field" id="ffScreenField"><span class="eyebrow">Screen</span><div class="seg" id="ffScreenSeg"></div></div>
  </div><div class="panel"><div class="ffsetupteams" id="ffTeams"></div></div></div>`;
  seg($("ffTargetSeg"),[200,300,400],()=>CFG.target,v=>{CFG.target=v;saveCfg()},v=>String(v));
  seg($("ffFmSeg"),[true,false],()=>CFG.fm,v=>{CFG.fm=v;saveCfg()},onOff);
  seg($("ffVoiceSeg"),[true,false],()=>S.prefs.voice,v=>S.prefs.voice=v,onOff);
  seg($("ffSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  screenSeg($("ffScreenSeg"));if(IS_TV)$("ffScreenField").style.display="none";
  $("ffBack").onclick=()=>show("hub");
  $("ffStart").onclick=()=>{ac();startGame()};
  $("ffMinus").onclick=()=>{CFG.members=Math.max(1,CFG.members-1);saveCfg();openSetup()};
  $("ffPlus").onclick=()=>{CFG.members=Math.min(5,CFG.members+1);saveCfg();openSetup()};
  $("ffMinus").disabled=CFG.members<=1;$("ffPlus").disabled=CFG.members>=5;
  renderTeams();show("ffSetup");
}
function renderTeams(){
  const w=$("ffTeams");w.innerHTML="";const m=CFG.members;
  for(let t=0;t<2;t++){
    const box=document.createElement("div");
    box.innerHTML=`<span class="eyebrow">Family ${t+1}</span><input id="ffT${t}" maxlength="16" class="teamname" placeholder="Family ${t+1}" value="${esc(CFG["t"+t]||"")}" aria-label="Family ${t+1} name" style="width:100%;margin:6px 0 8px;padding:.6em .8em;border-radius:10px;background:var(--stage-3);border:1px solid var(--line);color:var(--ink);font-weight:800"><div class="hlsetup"></div>`;
    box.querySelector("input").oninput=e=>{CFG["t"+t]=e.target.value;saveCfg()};
    const rows=box.querySelector(".hlsetup");
    for(let k=0;k<m;k++){
      const i=t*m+k;
      const row=document.createElement("div");row.className="prow";
      row.innerHTML=`<button class="swatchbtn" id="pk${i}" aria-label="Player ${k+1} look">${avatarHTML({name:S.names[i]||"P",color:S.colors[t*m],slot:i})}</button><input id="ffn${i}" maxlength="14" placeholder="Player ${k+1}" value="${esc(S.names[i]||"")}" aria-label="Family ${t+1} player ${k+1} name"><span class="note">${k===0?"Captain · sets the family colour":"Player "+(k+1)}</span>`;
      row.querySelector("input").oninput=e=>{S.names[i]=e.target.value;save()};
      row.querySelector(".swatchbtn").onclick=()=>{S.count=m*2;pickColour(i,renderTeams)};
      rows.appendChild(row);
    }
    w.appendChild(box);
  }
}

/* ---------- state ---------- */
const FF={teams:[],round:0,mult:1,q:null,pot:0,strikes:0,revealed:new Set(),stage:"",control:0,play:0,turn:0,faceP:[],fo:{},listen:null,used:new Set(),timer:null,fm:null,fmHit:null};
const stage=html=>{$("ffStage").innerHTML=html;$("ffStage").scrollTop=0};
const ctl=html=>{const c=$("ffCtl");if(!c)return;c.innerHTML=html;setTimeout(()=>{const b=c.querySelector("#ffIn")||c.querySelector(".btn.gold,.btn");b&&b.focus({preventScroll:true})},40)};
const say=(msg,cls)=>{const m=$("ffMiss");if(m){m.className="ffmiss";m.textContent=msg}};
function endGame(){clearInterval(FF.timer);FF.listen=null;FF.stage="";voiceStop();stopConfetti()}
const teamName=t=>(CFG["t"+t]||"").trim()||`Family ${t+1}`;

function score(active){
  const mk=(t)=>{const T=FF.teams[t];return `<div class="ffteam${active===t?" on":""}" style="--pc:${T.color}"><span class="avs">${T.members.map(p=>avatarHTML(p,"sm")).join("")}</span><b>${esc(T.name)}</b><em>${T.score}</em></div>`};
  $("ffScore").innerHTML=mk(0)+`<div class="ffpot"><small>Pot</small><b>${FF.pot*FF.mult}</b><small>${FF.mult>1?"×"+FF.mult:""}</small></div>`+mk(1);
}

/* ---------- matching ---------- */
function judgeIn(text,answers,isRevealed){
  const h=norm(text);if(!h)return {idx:null};
  const raw=[];
  answers.forEach((it,idx)=>{
    let best=null;
    for(const alt of it.alts){
      if(!heardMatches(text,alt))continue;
      const a=norm(alt)||alt.toLowerCase();
      const sc=h===a?3:(" "+h+" ").includes(" "+a+" ")?2:1;
      if(a.length<3&&sc<3)continue;
      if(!best||sc>best.sc||(sc===best.sc&&a.length>best.a.length))best={idx,sc,a,pts:it.pts};
    }
    if(best)raw.push(best);
  });
  const c=raw.filter(x=>!raw.some(y=>y!==x&&y.sc>=2&&y.a.length>x.a.length&&(" "+y.a+" ").includes(" "+x.a+" ")));
  if(!c.length)return {idx:null};
  c.sort((a,b)=>b.sc-a.sc||b.pts-a.pts);
  return {idx:c[0].idx,dup:isRevealed(c[0].idx)};
}
const judge=text=>judgeIn(text,FF.q.answers,i=>FF.revealed.has(i));
function onVoice(texts,final){
  if(!final||!FF.listen)return;
  const t=texts[0];if(t&&t.trim())FF.listen(t);
}

/* ---------- game flow ---------- */
function startGame(){
  const m=CFG.members;S.count=m*2;ensureSlots();save();saveCfg();
  let c0=S.colors[0],c1=S.colors[m];
  if(c0===c1){const alt=(window.COLORS||COLORS).map(x=>x[0]).find(c=>c!==c0);c1=alt||c1}
  FF.teams=[0,1].map(t=>{
    const color=t?c1:c0;
    return {name:teamName(t),color,score:0,members:Array.from({length:m},(_,k)=>{const i=t*m+k;return {name:(S.names[i]||"").trim()||`Player ${k+1}`,color,slot:i}})};
  });
  FF.round=0;FF.used=new Set();FF.pot=0;
  show("ff");score();stage("");
  introContestants(FF.teams[0].members.concat(FF.teams[1].members),"Family Feud",()=>{voiceStart(onVoice,$("ffMic"));if(!S.prefs.voice)$("ffMic").innerHTML="";nextRound()});
}
function pickQ(){
  let pool=QS.filter(x=>!FF.used.has(x.q));if(pool.length<6){FF.used=new Set();pool=QS.slice()}
  const q=pool[Math.floor(Math.random()*pool.length)];FF.used.add(q.q);return q;
}
function nextRound(){
  FF.round++;FF.mult=FF.round<=3?1:FF.round===4?2:3;
  FF.q=pickQ();FF.pot=0;FF.strikes=0;FF.revealed=new Set();FF.fo={};FF.listen=null;
  $("ffRound").textContent=`Round ${FF.round}${FF.mult>1?" · ×"+FF.mult:""}`;
  const n=FF.q.answers.length;
  stage(`<div class="ffq" id="ffQ">${esc(FF.q.q)}</div>
    <div class="ffboard" id="ffBoard" style="--rows:${Math.ceil(n/2)}">${FF.q.answers.map((a,i)=>`<div class="ffslot" id="ffs${i}"><i>${i+1}</i><span class="a">${esc(a.name)}</span><span class="p">${a.pts}</span></div>`).join("")}</div>
    <div class="ffstrikes" id="ffStrikes"><span>✗</span><span>✗</span><span>✗</span></div>
    <div class="ffctl" id="ffCtl"></div>`);
  score();faceoff();
}
function reveal(i,late){
  const el=$("ffs"+i);if(!el)return;
  el.classList.add("shown");if(late)el.classList.add("late");
  FF.revealed.add(i);if(!late){FF.pot+=FF.q.answers[i].pts;SFX.ok()}
  score(FF.stage==="play"?FF.play:undefined);
}

/* face-off */
function faceoff(){
  FF.stage="buzz";FF.listen=null;
  const k=FF.round-1;
  FF.faceP=FF.teams.map(T=>T.members[k%T.members.length]);
  score();
  ctl(`<div class="ffwho">Face-off! First to buzz answers.</div>
    <div class="ffbuzz">${[0,1].map(t=>`<button class="btn" data-t="${t}" style="--pc:${FF.teams[t].color}">${avatarHTML(FF.faceP[t],"")}<span>🔔 ${esc(FF.faceP[t].name)}</span><small>${esc(FF.teams[t].name)} · key ${t+1}</small></button>`).join("")}</div>`);
  $("ffCtl").querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>buzzed(+b.dataset.t));
}
document.addEventListener("keydown",e=>{
  if($("ff").hidden||!$("overlay").hidden||FF.stage!=="buzz")return;
  if(e.key==="1"||e.key==="2"){buzzed(+e.key-1);e.preventDefault()}
});
function buzzed(t){
  if(FF.stage!=="buzz")return;
  SFX.beep();FF.stage="faceoff";FF.fo={first:t,firstIdx:null};score(t);foAsk(t,false);
}
function foAsk(t,second){
  score(t);
  askUI({who:FF.faceP[t],title:second?`${FF.teams[t].name}, your turn`:"Face-off answer",onText:text=>foHandle(t,text,second),skipLabel:"No answer",onSkip:()=>foResult(t,null,second)});
}
function foHandle(t,text,second){
  const r=judge(text);
  if(r.dup)return say("That one is already up.");
  if(r.idx==null)return miss(text,"No answer",()=>foResult(t,null,second));
  reveal(r.idx);foResult(t,r.idx,second);
}
function foResult(t,idx,second){
  if(!second){
    FF.fo.firstIdx=idx;
    if(idx===0)return setControl(t);
    return foAsk(1-t,true);
  }
  const first=FF.fo.first,fi=FF.fo.firstIdx;
  if(fi==null&&idx==null){SFX.buzz();ctl(`<div class="ffwho">Nobody got one! Buzz in again.</div><button class="btn gold" id="ffAgain">Buzz again</button>`);$("ffAgain").onclick=faceoff;return}
  if(fi==null)return setControl(t);
  if(idx==null)return setControl(first);
  setControl(idx<fi?t:first);
}
function setControl(t){
  FF.control=t;FF.stage="choose";FF.listen=null;score(t);SFX.boost&&SFX.boost();
  ctl(`<div class="ffwho" style="color:${FF.teams[t].color}">${esc(FF.teams[t].name)} has control!</div>
    <div class="row"><button class="btn gold" id="ffPlay">Play</button><button class="btn" id="ffPass">Pass to ${esc(FF.teams[1-t].name)}</button></div>`);
  $("ffPlay").onclick=()=>startPlay(t);$("ffPass").onclick=()=>startPlay(1-t);
}

/* ask UI: one answer box, with strike-or-retry when it isn't on the board */
function askUI({who,title,onText,skipLabel,onSkip}){
  FF.listen=text=>{const i=$("ffIn");if(i)i.value="";onText(text)};
  ctl(`<div class="ffwho">${avatarHTML(who,"sm")} <span style="color:${who.color}">${esc(who.name)}</span> · ${esc(title)}</div>
    <form class="ffinput" id="ffForm" autocomplete="off"><input id="ffIn" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send" placeholder="Say it or type it" aria-label="Answer"><button class="btn gold" type="submit">Answer</button></form>
    <div class="ffmiss" id="ffMiss"></div>
    ${skipLabel?`<button class="btn ghost" id="ffSkip" type="button">${skipLabel}</button>`:""}`);
  $("ffForm").onsubmit=e=>{e.preventDefault();const v=$("ffIn").value.trim();$("ffIn").value="";if(v)onText(v)};
  if($("ffSkip"))$("ffSkip").onclick=onSkip;
  if(!IS_TV)setTimeout(()=>{const i=$("ffIn");i&&i.focus({preventScroll:true})},60);
}
function miss(text,label,onNo){
  const m=$("ffMiss");if(!m)return;
  m.className="ffmiss";m.innerHTML=`<span>Not on the board: “${esc(text)}”</span><button class="btn strike" type="button" id="ffNo">${esc(label)} ✗</button><button class="btn" type="button" id="ffRetry">Try again</button>`;
  $("ffNo").onclick=onNo;$("ffRetry").onclick=()=>{m.innerHTML="";const i=$("ffIn");i&&i.focus({preventScroll:true})};
}

/* playing the board */
function startPlay(t){
  FF.play=t;FF.stage="play";FF.strikes=0;FF.turn=FF.round;score(t);playAsk();
}
function playAsk(){
  const T=FF.teams[FF.play],who=T.members[FF.turn%T.members.length];
  askUI({who,title:"Give me an answer",onText:playHandle,skipLabel:"✗ Strike",onSkip:strike});
}
function playHandle(text){
  const r=judge(text);
  if(r.dup)return say("That one is already up.");
  if(r.idx==null)return miss(text,"Strike",strike);
  reveal(r.idx);FF.turn++;
  if(FF.revealed.size>=FF.q.answers.length)return endRound(FF.play);
  playAsk();
}
function strike(){
  FF.strikes++;FF.turn++;SFX.buzz();
  const x=$("ffX");x.textContent="✗".repeat(FF.strikes);x.hidden=true;void x.offsetWidth;x.hidden=false;setTimeout(()=>{x.hidden=true},1000);
  [...$("ffStrikes").children].forEach((s,i)=>s.classList.toggle("on",i<FF.strikes));
  if(FF.strikes>=3)return steal();
  playAsk();
}
function steal(){
  const o=1-FF.play,T=FF.teams[o];FF.stage="steal";score(o);
  const who=T.members[FF.round%T.members.length];
  askUI({who,title:`Steal! One answer, ${T.name}`,onText:stealHandle,skipLabel:"No answer",onSkip:()=>endRound(FF.play)});
}
function stealHandle(text){
  const o=1-FF.play,r=judge(text);
  if(r.dup)return say("That one is already up.");
  if(r.idx==null)return miss(text,"No answer",()=>endRound(FF.play));
  reveal(r.idx);endRound(o);
}
function endRound(winner){
  FF.stage="end";FF.listen=null;
  const gain=FF.pot*FF.mult;FF.teams[winner].score+=gain;
  ctl("");
  const rest=FF.q.answers.map((a,i)=>i).filter(i=>!FF.revealed.has(i));
  const finish=()=>{
    score(winner);SFX.win();
    const done=FF.teams[winner].score>=CFG.target;
    ctl(`<div class="ffwho" style="color:${FF.teams[winner].color}">${esc(FF.teams[winner].name)} takes the pot: +${gain}${FF.mult>1?" (×"+FF.mult+")":""}</div>
      <button class="btn gold" id="ffNext">${done?"Continue":"Next round"}</button>`);
    $("ffNext").onclick=()=>done?gameOver(winner):nextRound();
  };
  const step=()=>{if(!rest.length)return setTimeout(finish,500);const i=rest.shift();FF.revealed.add(i);const el=$("ffs"+i);if(el){el.classList.add("shown","late")}SFX.tick();setTimeout(step,380)};
  score(winner);setTimeout(step,400);
}

/* ---------- finish + Fast Money ---------- */
function gameOver(w){
  FF.stage="over";FF.pot=0;const T=FF.teams[w];
  if(!CFG.fm){return final(w,null)}
  $("ffRound").textContent="";
  stage(`<div class="ffq">${esc(T.name)} wins the game!</div><div class="ffbig">Fast Money</div>
    <p style="margin:0;color:var(--muted)">Two players. Five questions. Get 200 points between you.</p>
    <div id="ffCtl" class="ffctl"></div>`);
  const sel=new Set(T.members.length<=2?T.members.map((_,i)=>i):[]);
  const draw=()=>{
    ctl(`<div class="ffwho">${T.members.length>2?"Pick two players":"Players ready?"}</div>
      <div class="ffpick">${T.members.map((p,i)=>`<button data-i="${i}" aria-pressed="${sel.has(i)}">${avatarHTML(p,"")}${esc(p.name)}</button>`).join("")}</div>
      <div class="row"><button class="btn" id="ffSkipFm">Skip Fast Money</button><button class="btn gold" id="ffGoFm" ${sel.size===2?"":"disabled"}>Play Fast Money</button></div>`);
    $("ffCtl").querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;if(sel.has(i))sel.delete(i);else if(sel.size<2)sel.add(i);draw()});
    $("ffSkipFm").onclick=()=>final(w,null);
    $("ffGoFm").onclick=()=>fmStart(w,[...sel].map(i=>T.members[i]));
  };
  score(w);draw();
}
function fmQuestions(){
  const out=[];let pool=QS.filter(x=>!FF.used.has(x.q));if(pool.length<5)pool=QS.slice();
  pool=pool.slice().sort(()=>Math.random()-.5);
  for(const q of pool){if(out.length>=5)break;out.push(q);FF.used.add(q.q)}
  return out;
}
function fmStart(w,ps){
  FF.fm={team:w,ps,qs:fmQuestions(),res:[[],[]]};
  fmIntro(0);
}
function fmIntro(p){
  FF.listen=null;const P=FF.fm.ps[p];
  stage(`<div class="ffq">Fast Money</div><div class="ffwho">${avatarHTML(P,"sm")} <span style="color:${P.color}">${esc(P.name)}</span>, you're up</div>
    <p style="margin:0;color:var(--muted)">${p===0?`Send ${esc(FF.fm.ps[1].name)} out of the room so they can't hear. `:`Your partner's answers don't count again. `}${p===0?20:25} seconds. Five questions. Be quick!</p>
    <div id="ffCtl" class="ffctl"><button class="btn gold" id="ffFmGo">Start the clock</button></div>`);
  $("ffFmGo").onclick=()=>fmPlay(p);
  setTimeout(()=>{const b=$("ffFmGo");b&&b.focus({preventScroll:true})},40);
}
function fmPlay(p){
  const F=FF.fm,P=F.ps[p],total=p===0?20:25;let idx=0,left=total;
  const taken=p===1?F.res[0].map(r=>r.idx):[];
  const draw=()=>{
    stage(`<div class="ffwho">${avatarHTML(P,"sm")} <span style="color:${P.color}">${esc(P.name)}</span> · Question ${idx+1} of 5</div>
      <div class="ffclock" id="ffClock">${Math.ceil(left)}</div>
      <div class="ffq">${esc(F.qs[idx].q)}</div>
      <div id="ffCtl" class="ffctl"><form class="ffinput" id="ffForm" autocomplete="off"><input id="ffIn" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send" placeholder="Say it or type it" aria-label="Answer"><button class="btn gold" type="submit">Answer</button></form>
        <div class="ffmiss" id="ffMiss"></div><button class="btn ghost" id="ffPassQ" type="button">Pass</button></div>`);
    $("ffForm").onsubmit=e=>{e.preventDefault();const v=$("ffIn").value.trim();$("ffIn").value="";if(v)record(v)};
    $("ffPassQ").onclick=()=>record("",true);
    FF.listen=t=>record(t);
    if(!IS_TV)setTimeout(()=>{const i=$("ffIn");i&&i.focus({preventScroll:true})},40);
  };
  const record=(text,pass)=>{
    if(idx>=5)return;
    let r={text:pass?"(pass)":text,idx:null,pts:0};
    if(!pass){
      const j=judgeIn(text,F.qs[idx].answers,()=>false);
      if(j.idx!=null){
        if(p===1&&F.res[0][idx]&&F.res[0][idx].idx===j.idx)return say("Your partner said that one. Try another!");
        r={text,idx:j.idx,pts:F.qs[idx].answers[j.idx].pts};
      }
    }
    F.res[p][idx]=r;SFX.tick();idx++;
    if(idx>=5)return endTurn();
    draw();
  };
  const endTurn=()=>{clearInterval(FF.timer);FF.listen=null;for(let k=0;k<5;k++)if(!F.res[p][k])F.res[p][k]={text:"(no answer)",idx:null,pts:0};SFX.buzz();if(p===0)fmIntro(1);else fmReveal()};
  draw();SFX.go();clearInterval(FF.timer);
  FF.timer=setInterval(()=>{
    if(!$("overlay").hidden)return;
    left=Math.max(0,left-.1);const c=$("ffClock");if(c){c.textContent=Math.ceil(left);c.classList.toggle("low",left<=5)}
    if(left<=0){clearInterval(FF.timer);for(let k=idx;k<5;k++)F.res[p][k]={text:"(no answer)",idx:null,pts:0};idx=5;endTurn()}
  },100);
}
function fmReveal(){
  const F=FF.fm;FF.listen=null;
  const t0=F.res[0].reduce((s,r)=>s+r.pts,0),t1=F.res[1].reduce((s,r)=>s+r.pts,0),total=t0+t1;
  stage(`<div class="ffq">Fast Money</div>
    <div class="fmtable"><div class="h">Question</div><div class="h">${esc(F.ps[0].name)}</div><div class="h">${esc(F.ps[1].name)}</div>
    ${F.qs.map((q,k)=>`<div class="q">${esc(q.q)}</div><div class="v" id="fmv0${k}">${esc(F.res[0][k].text)} <b>${F.res[0][k].pts}</b></div><div class="v" id="fmv1${k}">${esc(F.res[1][k].text)} <b>${F.res[1][k].pts}</b></div>`).join("")}</div>
    <div class="ffbig" id="fmTotal" style="visibility:hidden">${total}</div><div id="ffCtl" class="ffctl"></div>`);
  let step=0;const seq=[];for(let k=0;k<5;k++){seq.push("fmv0"+k);seq.push("fmv1"+k)}
  const go=()=>{
    if(step<seq.length){const e=$(seq[step++]);e&&e.classList.add("on");SFX.tick();return setTimeout(go,550)}
    $("fmTotal").style.visibility="visible";
    const win=total>=200;win?SFX.win():SFX.buzz();
    if(win)confetti([FF.teams[F.team].color,"#ffc94a","#fffdf6"]);
    ctl(`<div class="ffwho" style="color:${win?"var(--gold)":"var(--muted)"}">${win?"You did it! 200 points!":`${total} points. So close to 200!`}</div><button class="btn gold" id="ffFin">Finish</button>`);
    $("ffFin").onclick=()=>{stopConfetti();final(F.team,total)};
  };
  setTimeout(go,500);
}
function final(w,fmTotal){
  FF.listen=null;voiceStop();$("ffRound").textContent="";
  const T=FF.teams;
  stage(`<div class="ffq">${esc(T[w].name)} wins Family Feud!</div>
    <div class="ntrank" style="display:flex;flex-direction:column;gap:8px;width:min(520px,100%)">${[w,1-w].map(t=>`<div class="r${t===w?" win":""}" style="display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:14px;background:var(--stage-2);border:2px solid ${t===w?"var(--gold)":"var(--line)"};font-weight:800"><span class="avs" style="display:flex">${T[t].members.map(p=>avatarHTML(p,"sm")).join("")}</span><b style="flex:1;text-align:left;color:${T[t].color}">${esc(T[t].name)}</b><em style="font-style:normal;font-family:var(--f-clock);font-size:1.8rem;color:var(--gold)">${T[t].score}</em></div>`).join("")}</div>
    ${fmTotal!=null?`<p style="margin:0;color:var(--muted)">Fast Money: ${fmTotal} points${fmTotal>=200?" · Jackpot!":""}</p>`:""}
    <div id="ffCtl" class="ffctl"><div class="row"><button class="btn" id="ffMenu">Game Night menu</button><button class="btn gold" id="ffAgainG">Play again</button></div></div>`);
  confetti([T[w].color,"#ffc94a","#fffdf6"]);SFX.win();
  $("ffMenu").onclick=()=>{stopConfetti();endGame();show("hub")};
  $("ffAgainG").onclick=()=>{stopConfetti();startGame()};
  setTimeout(()=>{const b=$("ffAgainG");b&&b.focus({preventScroll:true})},60);
}

window.__FF={QS,FF,CFG,judgeIn};
})();
