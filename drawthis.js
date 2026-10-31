/* =================== DRAW THIS ===================
   Up to 4 players on phones, each with a whiteboard and marker. The TV shows one big word and a timer; everyone draws it on paper.
   Then each player votes on their phone for the best drawing (not their own). Each vote is a point. */
(function(){
const PACKS={
 halloween:["Pumpkin","Ghost","Witch hat","Broomstick","Bat","Spider web","Skeleton","Zombie","Vampire","Werewolf","Black cat","Haunted house","Cauldron","Mummy","Frankenstein's monster","Jack-o'-lantern","Graveyard","Tombstone","Candy corn","Trick or treat bag","Scarecrow","Skull","Spooky tree","Full moon","Crystal ball","Potion bottle","Coffin","Grim Reaper","Pirate ghost","Creepy clown","Vampire teeth","Eyeball","Brain","Cobweb","Lollipop","Haunted castle","Headless horseman","Monster under the bed","Bloody handprint","Wizard","Devil horns","Magic wand","Bat wings","Witch on a broom","Zombie hand","Spider","Candle","Lantern","Haunted mirror","Ghost train","Mad scientist","Tiny ghost","Smiling pumpkin","Dracula's castle"],
 animals:["Elephant","Giraffe","Kangaroo","Koala","Penguin","Octopus","Crocodile","Shark","Snail","Butterfly","Dinosaur","Unicorn","Dragon","Peacock","Flamingo","Hedgehog","Turtle","Snake","Platypus","Wombat","Emu","Camel","Gorilla","Seahorse","Jellyfish","Crab","Frog","Duck","Chicken","Pig","Cow","Horse","Rabbit","Mouse","Lion","Whale","Dolphin","Spider monkey","Parrot","Bee","Kookaburra","Echidna","Tasmanian devil","Sloth","Llama","Hippo","Rhino","Squirrel","Bear","Fox"],
 food:["Pizza","Hamburger","Ice cream cone","Banana","Watermelon slice","Pineapple","Sausage sizzle","Meat pie","Pavlova","Lamington","Birthday cake","Cupcake","Donut","Hot dog","Taco","Sushi","Spaghetti","Fried egg","Toast","Cheese","Carrot","Broccoli","Corn on the cob","Popcorn","Chocolate bar","Cookie","Pretzel","Cherry","Strawberry","Avocado","Mushroom","Lollipop","Vegemite jar","Pancakes","Apple","Pear","Lemon","Chips","French fries","Sandwich","Soup bowl","Teapot","Coffee cup","Milkshake","Bottle of sauce"],
 things:["Umbrella","Bicycle","Rocket","Lighthouse","Windmill","Guitar","Piano","Camera","Telescope","Hot air balloon","Treasure chest","Key","Clock","Light bulb","Scissors","Toothbrush","Backpack","Sunglasses","Crown","Sword","Shield","Anchor","Sailboat","Submarine","Train","Helicopter","Skateboard","Surfboard","Tent","Campfire","Snowman","Robot","Spaceship","Rainbow","Volcano","Tornado","Lightning bolt","Boomerang","Telephone","Television","Laptop","Headphones","Trophy","Magnet","Ladder","Wheelbarrow","Barbecue","Bunnings snag","Thong (flip flop)","Cricket bat"],
 actions:["Brushing teeth","Riding a bike","Skydiving","Taking a selfie","Swimming","Dancing","Sleeping","Fishing","Playing guitar","Surfing","Skiing","Running a marathon","Blowing out candles","Walking the dog","Mowing the lawn","Building a sandcastle","Painting a picture","Flying a kite","Doing a handstand","Eating spaghetti","Climbing a mountain","Throwing a boomerang","Playing cricket","Juggling","Sneezing","Karaoke singer","Pirate captain","Superhero landing","Ninja","Astronaut on the moon","Cowboy","Mermaid","Wizard casting a spell","Chef cooking","Dentist visit","Bad hair day","Traffic jam","Lost in a maze","Winning the lottery","Birthday party"],
 places:["Sydney Opera House","Uluru","Eiffel Tower","Pyramids","Great Wall of China","Statue of Liberty","Big Ben","Leaning Tower of Pisa","Beach","Desert island","Igloo","Castle","Farm","Zoo","Circus","Pirate ship","Space station","Haunted school","Camping trip","Rainforest","Waterfall","Bridge","Skyscraper","Cinema","Fairground","Roller coaster","Campsite","Treehouse","Backyard cricket","Melbourne tram"],
 silly:["Dog wearing sunglasses","Cat in a spacesuit","Fish riding a bike","Pizza with legs","Dancing banana","Robot chef","Shark in a bathtub","Chicken crossing the road","Snail on a skateboard","Giraffe in a tunnel","Penguin on a surfboard","Elephant on a tightrope","Octopus playing drums","Crocodile in a tutu","Cow jumping over the moon","Dinosaur in a bubble bath","Ghost eating spaghetti","Zombie doing yoga","Witch driving a car","Vampire at the beach","Skeleton on a bike","Pumpkin with a moustache","Alien shopping","Dragon with a cold","Unicorn at the gym","Snowman in summer","Sausage wearing a hat","Monster brushing its teeth","Banana in pyjamas","Kangaroo on a trampoline"]
};
const PACK_NAMES={halloween:"Halloween",animals:"Animals",food:"Food",things:"Things",actions:"Actions",places:"Places",silly:"Silly mashups"};
const IS_TV=/GameNightTV/.test(navigator.userAgent);
const CFG={rounds:10,secs:60,packs:Object.keys(PACKS)};
try{const j=JSON.parse(localStorage.getItem("gn.dt")||"null");if(j){Object.assign(CFG,j);CFG.packs=(CFG.packs||[]).filter(x=>PACKS[x]);if(!CFG.packs.length)CFG.packs=Object.keys(PACKS)}}catch(e){}
const saveCfg=()=>{try{localStorage.setItem("gn.dt",JSON.stringify(CFG))}catch(e){}};
const FONT='"Oxanium","Big Shoulders Display",Impact,sans-serif';
const css=`
#dt{padding:0;gap:0;background:#14052b}
#dt .floorbar{padding:1.2vmin 2vmin;gap:2vmin;flex:none}
#dt .brand{font-family:${FONT};letter-spacing:.2em;font-size:clamp(.8rem,2vmin,1.2rem)}
#dt .btn{border-radius:0;border:0;box-shadow:none;font-family:${FONT};letter-spacing:.14em;text-transform:uppercase}
#dt .btn.ghost{background:rgba(0,0,0,.35)}
#dt .btn.gold{background:#ff7a00;color:#14052b}
#dtScore{display:flex;gap:.6vmin;background:#0a0218;padding:.8vmin 1vmin;flex:none;justify-content:center}
.dtchip{display:flex;align-items:center;gap:1.2vmin;padding:.6vmin 2vmin .6vmin .6vmin;background:color-mix(in srgb,var(--pc) 30%,#0a0218);flex:1;max-width:25%;min-width:0}
.dtchip.on{background:var(--pc)}
.dtchip .av{--s:clamp(34px,7vmin,60px);border-radius:0;padding:0;background:#fff;box-shadow:none;flex:none}
.dtchip .av img,.dtchip .av .ini{border-radius:0}
.dtchip b{font-family:${FONT};letter-spacing:.14em;text-transform:uppercase;font-size:clamp(.7rem,1.8vmin,1.1rem);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0}
.dtchip span{font-family:${FONT};font-size:clamp(1.6rem,5vmin,3rem);font-weight:800;line-height:1}
.dtchip small{display:block;font-size:.6rem;letter-spacing:.14em;opacity:.8;text-transform:uppercase}
#dtStage{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2vmin;padding:2vmin;text-align:center}
.dtk{font-family:${FONT};letter-spacing:.3em;text-transform:uppercase;font-weight:800;color:#ff7a00;font-size:clamp(.8rem,2.2vmin,1.3rem)}
.dtword{font-family:${FONT};font-weight:900;text-transform:uppercase;color:#fff;background:#ff7a00;color:#14052b;padding:2vmin 5vmin;font-size:clamp(2.6rem,12vmin,8rem);line-height:1.02;max-width:94%;word-break:break-word}
.dtword.s{font-size:clamp(2rem,8.5vmin,6rem)}
.dtclock{font-family:${FONT};font-weight:800;font-size:clamp(5rem,32vmin,20rem);line-height:1;color:#fff;font-variant-numeric:tabular-nums}
.dtclock.low{color:#fff;background:#e5173f;padding:0 .15em}
.dtbar{width:min(90%,1100px);height:2.4vmin;background:#2a1050}.dtbar i{display:block;height:100%;background:#ff7a00;width:100%}
.dtp{margin:0;font-size:clamp(.9rem,2.4vmin,1.4rem);color:rgba(255,255,255,.8)}
.dtvotes{display:flex;gap:.8vmin;justify-content:center;flex-wrap:wrap}
.dtvotes span{display:flex;align-items:center;gap:1vmin;background:#2a1050;padding:1vmin 2vmin;font-family:${FONT};font-weight:800;letter-spacing:.1em;text-transform:uppercase;font-size:clamp(.8rem,2.4vmin,1.4rem)}
.dtvotes span.ok{background:#16c784;color:#022}
.dtres{display:flex;gap:.8vmin;justify-content:center;width:100%}
.dtres div{flex:1;max-width:25%;background:#2a1050;padding:2vmin 1vmin;font-family:${FONT};text-transform:uppercase;letter-spacing:.1em;font-weight:800;font-size:clamp(.8rem,2.2vmin,1.3rem)}
.dtres div.win{background:#ff7a00;color:#14052b}
.dtres div em{display:block;font-style:normal;font-size:clamp(2.4rem,12vmin,7rem);line-height:1}
.dtrank{display:flex;flex-direction:column;gap:.8vmin;width:min(700px,92%)}
.dtrank .r{display:flex;align-items:center;gap:2vmin;background:#2a1050;padding:1vmin 2vmin;font-family:${FONT};font-weight:800;letter-spacing:.1em;text-transform:uppercase;font-size:clamp(1rem,3vmin,1.8rem);text-align:left}
.dtrank .r.win{background:#ff7a00;color:#14052b}.dtrank .r b{flex:1}.dtrank .r em{font-style:normal;font-size:1.4em}
.dtrank .av{--s:clamp(36px,7vmin,56px);border-radius:0;padding:0;background:#fff;box-shadow:none}
#dtSetup .dtpk{display:flex;flex-wrap:wrap;gap:8px}
#dtSetup .dtpk button{padding:.5em 1em;background:var(--stage-3);border:1px solid var(--line);font-weight:800;border-radius:0}
#dtSetup .dtpk button[aria-pressed="true"]{background:#ff7a00;color:#14052b;border-color:#ff7a00}
.game.live .dtart{width:64px;height:64px;background:#fff;border:3px solid #ff7a00;position:relative;transform:rotate(-6deg)}
.game.live .dtart::after{content:"";position:absolute;left:10px;top:30px;width:40px;height:4px;background:#ff7a00;box-shadow:0 12px 0 #ff7a00,8px -12px 0 #ff7a00;transform:rotate(-12deg)}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* hub tile + screens */
const hub=document.querySelector(".games");
const tile=document.createElement("button");tile.className="game live";tile.id="playDT";
tile.innerHTML=`<span class="art"><span class="dtart"></span><span class="pill">Play</span></span><h2>Draw This</h2><p>Same word, four whiteboards, vote for the best.</p>`;
hub.insertBefore(tile,hub.children[2]||null);
const n=hub.children.length;hub.classList.remove("five","six","seven");if(n>=7)hub.classList.add("seven");
const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="dtSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="dt";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>DRAW THIS</small></span><span class="spacer"></span><span class="count" id="dtRound"></span><button class="btn ghost" id="dtQuit">Quit</button></div><div id="dtScore"></div><div id="dtStage"></div>`;
tile.onclick=()=>{ac();openSetup()};
$("dtQuit").onclick=()=>confirmSheet("Quit this game?","The scores will be lost.","Quit",()=>{closeOverlay();endGame();show("hub")});

function total(){return CFG.packs.reduce((a,k)=>a+PACKS[k].length,0)}
function openSetup(){
  secS.innerHTML=`<div class="topbar"><button class="btn ghost" id="dtBack">← Back</button><h2>Draw This</h2><button class="btn gold" id="dtStart">Start game</button></div>
  <div class="setup-grid"><div class="panel">
    <div class="field"><span class="eyebrow">How to play</span><ul class="rules">
      <li>Everyone draws the <b>same word</b> on their whiteboard before the timer ends.</li>
      <li>Then <b>vote on your phone</b> for the best drawing. You can't vote for yourself.</li>
      <li>Every vote is a <b>point</b>. Most points after the last round wins.</li>
      <li>Players join with their phones, up to 4.</li></ul></div>
    <div class="field"><span class="eyebrow">Rounds</span><div class="seg" id="dtRoundsSeg"></div></div>
    <div class="field"><span class="eyebrow">Seconds to draw</span><div class="seg" id="dtSecsSeg"></div></div>
    <div class="field"><span class="eyebrow">Word packs <span class="note" id="dtAvail">${total()} words</span></span><div class="dtpk" id="dtPacks"></div></div>
    <div class="field"><span class="eyebrow">Sound</span><div class="seg" id="dtSoundSeg"></div></div>
  </div><div class="panel"><span class="eyebrow">Players</span><div id="dtPlayers" class="hlsetup"><div class="note">Join with your phones. You need at least 2 players (a CPU player counts).</div></div></div></div>`;
  seg($("dtRoundsSeg"),[5,10,20,40,60],()=>CFG.rounds,v=>{CFG.rounds=v;saveCfg()},v=>String(v));
  seg($("dtSecsSeg"),[30,60,90],()=>CFG.secs,v=>{CFG.secs=v;saveCfg()},v=>v+"s");
  seg($("dtSoundSeg"),[true,false],()=>S.prefs.sound,v=>S.prefs.sound=v,onOff);
  Object.keys(PACKS).forEach(k=>{const b=document.createElement("button");b.textContent=PACK_NAMES[k]+" · "+PACKS[k].length;b.setAttribute("aria-pressed",CFG.packs.includes(k));
    b.onclick=()=>{const on=CFG.packs.includes(k);if(on&&CFG.packs.length===1)return;CFG.packs=on?CFG.packs.filter(x=>x!==k):CFG.packs.concat(k);saveCfg();b.setAttribute("aria-pressed",!on);$("dtAvail").textContent=total()+" words"};
    $("dtPacks").appendChild(b)});
  $("dtBack").onclick=()=>show("hub");
  $("dtStart").onclick=()=>{ac();startGame()};
  show("dtSetup");
}

/* state */
const DT={players:[],round:0,word:"",phase:"idle",left:0,timer:null,votes:{},used:new Set(),gain:{},voteT:null,cpuT:[]};
const stage=html=>{$("dtStage").innerHTML=html};
const cur=()=>DT.players;
const esc2=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
function score(){
  $("dtScore").innerHTML=DT.players.map(p=>`<div class="dtchip${DT.phase==="vote"&&DT.votes[p.pid]!=null?" on":""}" style="--pc:${p.color}">${avatarHTML(p,"sm")}<b>${esc(p.name)}</b><span>${p.pts}</span></div>`).join("");
}
function endGame(){clearInterval(DT.timer);clearTimeout(DT.voteT);DT.cpuT.forEach(clearTimeout);DT.cpuT=[];DT.phase="idle"}
function pickWord(){
  const pool=CFG.packs.flatMap(k=>PACKS[k]);
  let fresh=pool.filter(w=>!DT.used.has(w));if(!fresh.length){DT.used=new Set();fresh=pool}
  const w=fresh[Math.floor(Math.random()*fresh.length)];DT.used.add(w);return w;
}
function startGame(){
  const L=window.LINK&&LINK.pull?LINK.pull(2,4,{cpu:true}):null;
  if(!L||L.length<2){
    openOverlay(`<span class="eyebrow">Draw This</span><h2>Need 2 players</h2><p class="score">Scan the join code with your phones${L&&L.length===1?" (one is in, one more to go)":""}. A CPU player counts as a player.</p><div class="row"><button class="btn" id="dtAddCpu">Add CPU player</button><button class="btn gold" id="dtOk">OK</button></div>`);
    $("dtAddCpu").onclick=()=>{window.LINK&&LINK.addCpu&&LINK.addCpu();closeOverlay()};$("dtOk").onclick=closeOverlay;return;
  }
  ensureSlots();save();saveCfg();
  DT.players=L.map((p,i)=>({name:p.name,color:S.colors[i],pts:0,slot:i,pid:p.pid,cpu:!!p.cpu}));
  DT.round=0;DT.used=new Set();DT.phase="idle";
  show("dt");score();stage("");
  introContestants(DT.players,"Draw This",()=>nextRound());
}
function nextRound(){
  DT.round++;
  if(DT.round>CFG.rounds)return results();
  DT.word=pickWord();DT.votes={};DT.gain={};DT.phase="ready";
  $("dtRound").textContent=`Round ${DT.round} of ${CFG.rounds}`;score();
  const w=DT.word;
  stage(`<div class="dtk">Everyone draw</div><div class="dtword${w.length>16?" s":""}">${esc2(w)}</div><p class="dtp">${CFG.secs} seconds · grab your marker</p>
    <div class="row"><button class="btn" id="dtNew">New word</button><button class="btn gold" id="dtGo">Start</button></div>`);
  $("dtNew").onclick=()=>{DT.word=pickWord();nextRoundWord()};
  $("dtGo").onclick=startDraw;
  setTimeout(()=>{const b=$("dtGo");b&&b.focus({preventScroll:true})},40);
}
function nextRoundWord(){DT.round--;nextRound()}
function startDraw(){
  if(DT.phase!=="ready")return;
  DT.phase="draw";DT.left=CFG.secs;SFX.go&&SFX.go();score();
  const w=DT.word;
  stage(`<div class="dtk">Draw!</div><div class="dtword s">${esc2(w)}</div><div class="dtclock" id="dtClock">${CFG.secs}</div><div class="dtbar"><i id="dtBar"></i></div>
    <div class="row"><button class="btn ghost" id="dtDone">Everyone's done</button></div>`);
  $("dtDone").onclick=startVote;
  clearInterval(DT.timer);let last=CFG.secs;
  DT.timer=setInterval(()=>{
    if(!$("overlay").hidden)return;
    DT.left=Math.max(0,DT.left-.1);const c=$("dtClock"),b=$("dtBar");if(!c){clearInterval(DT.timer);return}
    const s=Math.ceil(DT.left);c.textContent=s;b.style.width=(DT.left/CFG.secs*100)+"%";if(s<=10)c.classList.add("low");
    if(s!==last){last=s;if(s<=5&&s>0)SFX.low&&SFX.low()}
    if(DT.left<=0){SFX.buzz&&SFX.buzz();startVote()}
  },100);
}
const connected=p=>{if(p.cpu)return true;try{const x=LINK.phones.get(p.pid);return !!(x&&x.conn&&x.conn.open)}catch(e){return false}};
function startVote(){
  if(DT.phase!=="draw")return;
  clearInterval(DT.timer);DT.phase="vote";DT.votes={};score();
  paintVote();
  DT.cpuT.forEach(clearTimeout);DT.cpuT=[];
  DT.players.filter(p=>p.cpu).forEach(p=>{DT.cpuT.push(setTimeout(()=>castVote(p.pid,pickOther(p.pid)),2000+Math.random()*4000))});
  clearTimeout(DT.voteT);DT.voteT=setTimeout(finishVote,35000);
  setTimeout(()=>{const b=$("dtSkipVote");b&&b.focus({preventScroll:true})},40);
}
function pickOther(pid){const o=DT.players.filter(p=>p.pid!==pid);return o[Math.floor(Math.random()*o.length)].pid}
function paintVote(){
  const need=DT.players.filter(connected);
  stage(`<div class="dtk">Time's up · hold up your boards</div><div class="dtword s">${esc2(DT.word)}</div><p class="dtp">Vote on your phone for the best drawing. Not your own!</p>
    <div class="dtvotes">${DT.players.map(p=>`<span class="${DT.votes[p.pid]!=null?"ok":""}" style="${DT.votes[p.pid]!=null?"":"opacity:.8"}">${esc2(p.name)} ${DT.votes[p.pid]!=null?"✓":"…"}</span>`).join("")}</div>
    <div class="row"><button class="btn ghost" id="dtSkipVote">Skip voting</button></div>`);
  $("dtSkipVote").onclick=finishVote;
  score();
}
function castVote(pid,forPid){
  if(DT.phase!=="vote"||pid===forPid||DT.votes[pid]!=null)return false;
  if(!DT.players.some(p=>p.pid===pid)||!DT.players.some(p=>p.pid===forPid))return false;
  DT.votes[pid]=forPid;SFX.beep&&SFX.beep();paintVote();
  const need=DT.players.filter(connected);
  if(need.every(p=>DT.votes[p.pid]!=null))setTimeout(finishVote,700);
  return true;
}
function finishVote(){
  if(DT.phase!=="vote")return;
  clearTimeout(DT.voteT);DT.cpuT.forEach(clearTimeout);DT.cpuT=[];DT.phase="result";
  DT.gain={};DT.players.forEach(p=>DT.gain[p.pid]=0);
  Object.values(DT.votes).forEach(f=>{if(DT.gain[f]!=null)DT.gain[f]++});
  DT.players.forEach(p=>p.pts+=DT.gain[p.pid]);score();
  const top=Math.max(...DT.players.map(p=>DT.gain[p.pid]));
  const tie=DT.players.filter(p=>DT.gain[p.pid]===top).length;
  SFX.win&&SFX.win();
  stage(`<div class="dtk">${top===0?"No votes this round":tie>1?"A tie for best drawing":"Best drawing"}</div><div class="dtword s">${esc2(DT.word)}</div>
    <div class="dtres">${DT.players.map(p=>`<div class="${top>0&&DT.gain[p.pid]===top?"win":""}">${esc2(p.name)}<em>+${DT.gain[p.pid]}</em></div>`).join("")}</div>
    <div class="row"><button class="btn gold" id="dtNext">${DT.round>=CFG.rounds?"See results":"Next round"}</button></div>`);
  $("dtNext").onclick=nextRound;
  setTimeout(()=>{const b=$("dtNext");b&&b.focus({preventScroll:true})},60);
}
function results(){
  DT.phase="final";$("dtRound").textContent="";
  const order=DT.players.slice().sort((a,b)=>b.pts-a.pts),top=order[0].pts,winners=order.filter(p=>p.pts===top);
  window.LB&&LB.record("dt",DT.players.map(p=>({name:p.name,color:p.color,score:p.pts,win:p.pts===top})));
  SFX.win&&SFX.win();
  stage(`<div class="dtk">Draw This · final</div><div class="dtword s">${winners.length>1?"It's a draw!":esc2(winners[0].name)+" wins!"}</div>
    <div class="dtrank">${order.map(p=>`<div class="r${p.pts===top?" win":""}">${avatarHTML(p,"")}<b>${esc2(p.name)}</b><em>${p.pts}</em></div>`).join("")}</div>
    <div class="row"><button class="btn" id="dtMenu">Game Night menu</button><button class="btn gold" id="dtAgain">Play again</button></div>`);
  confetti(winners.map(w=>w.color).concat(["#ff7a00","#fffdf6"]));
  $("dtMenu").onclick=()=>{stopConfetti();endGame();show("hub")};
  $("dtAgain").onclick=()=>{stopConfetti();DT.players.forEach(p=>p.pts=0);DT.round=0;DT.used=new Set();score();nextRound()};
  setTimeout(()=>{const b=$("dtAgain");b&&b.focus({preventScroll:true})},60);
}

/* what the phones see */
function sceneFor(p){
  const sc=DT.players.map(q=>({n:q.name,s:q.pts,c:q.color,on:0,pid:q.pid,av:(()=>{try{return avatarSrc(q.slot)}catch(e){return ""}})()}));
  const base={th:"dt",scores:sc,btns:[],sn:DT.round*10+({ready:1,draw:2,vote:3,result:4,final:5}[DT.phase]||0),me:1};
  const rl=DT.round?`Round ${Math.min(DT.round,CFG.rounds)} of ${CFG.rounds}`:"";
  const meIn=DT.players.some(q=>q.pid===p.pid);
  if(DT.phase==="ready")return {...base,head:{e:rl,t:"Get your marker ready",s:"Everyone draws the same thing"},big:DT.word,btns:[{t:"Start",cls:"gold",a:"start"}]};
  if(DT.phase==="draw")return {...base,head:{e:rl,t:"Draw it!",s:"On your whiteboard"},big:DT.word,clock:String(Math.ceil(DT.left))};
  if(DT.phase==="vote"){
    const mine=DT.votes[p.pid];
    if(!meIn)return {...base,head:{e:rl,t:"Voting",s:"Watch the TV"},big:DT.word};
    const others=DT.players.filter(q=>q.pid!==p.pid);
    return {...base,head:{e:rl,t:mine!=null?"Vote locked in":"Who drew it best?",s:mine!=null?"Waiting for the others":"Tap a player. Not yourself!"},big:DT.word,
      btns:others.map(q=>({t:q.name,a:"vote",v:q.pid,d:mine!=null?1:0,on:mine===q.pid?1:0,c:q.color}))};
  }
  if(DT.phase==="result")return {...base,head:{e:rl,t:"Round result",s:DT.players.map(q=>q.name+" +"+(DT.gain[q.pid]||0)).join("  ·  ")},big:DT.word,btns:[{t:DT.round>=CFG.rounds?"See results":"Next round",cls:"gold",a:"next"}]};
  if(DT.phase==="final"){const o=DT.players.slice().sort((a,b)=>b.pts-a.pts);return {...base,head:{e:"Final",t:o[0].name+" wins!",s:o.map(q=>q.name+" "+q.pts).join("  ·  ")}}}
  return {...base,head:{e:"Draw This",t:"Get ready",s:""}};
}
function act(p,m){
  if(m.a==="start"&&DT.phase==="ready")startDraw();
  else if(m.a==="next"&&DT.phase==="result")nextRound();
  else if(m.a==="vote")castVote(p.pid,m.i);
}
function active(){return !$("dt").hidden}
window.__DT={DT,CFG,sceneFor,act,castVote,PACKS,active};
})();
