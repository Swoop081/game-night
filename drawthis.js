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
.dtperfect{font-family:${FONT};font-weight:900;text-transform:uppercase;font-size:clamp(3rem,15vmin,10rem);line-height:1;color:#ffd400;text-shadow:0 0 3vmin #ff7a00;animation:dtpop 1.2s ease-in-out infinite alternate}
@keyframes dtpop{from{transform:scale(1) rotate(-1.5deg)}to{transform:scale(1.07) rotate(1.5deg)}}
.dtstars{display:flex;gap:3vmin;justify-content:center}
.dtstar{display:flex;flex-direction:column;align-items:center;gap:1vmin;background:var(--pc);padding:2vmin 4vmin;font-family:${FONT};text-transform:uppercase;letter-spacing:.12em;box-shadow:0 0 6vmin var(--pc);animation:dtglow 1.6s ease-in-out infinite}
.dtstar b{font-size:clamp(1.4rem,5vmin,3rem);color:#fff}.dtstar small{font-size:clamp(.8rem,2.2vmin,1.3rem);color:rgba(255,255,255,.85);letter-spacing:.2em}
.dtstar .av{--s:clamp(70px,16vmin,140px);border-radius:0;padding:0;background:#fff;box-shadow:none}.dtstar .av img,.dtstar .av .ini{border-radius:0}
.dtphoto{font-size:clamp(1rem,3vmin,1.8rem);max-width:90%;color:#fff}
.dtres.sm div{padding:1vmin}.dtres.sm div em{font-size:clamp(1.8rem,8vmin,4.5rem)}
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
const css2=`
#dt,#dtSetup{background:radial-gradient(120% 80% at 50% 110%,#3b0a52 0%,#14052b 55%,#07010f 100%);position:absolute;overflow:hidden}
#dt>*,#dtSetup>*{position:relative;z-index:2}
#dt>.dtfx,#dtSetup>.dtfx{position:absolute;inset:0;z-index:1;pointer-events:none;overflow:hidden}
.dtfx .web{position:absolute;width:30vmin;height:30vmin;opacity:.55}
.dtfx .web.tl{top:0;left:0}.dtfx .web.tr{top:0;right:0;transform:scaleX(-1)}.dtfx .web.bl{bottom:0;left:0;transform:scaleY(-1)}.dtfx .web.br{bottom:0;right:0;transform:scale(-1,-1)}
.dtfx .fog{position:absolute;left:-20%;width:140%;height:34%;background:radial-gradient(50% 50% at 50% 50%,rgba(200,170,255,.16),transparent 70%);animation:dtfog 26s linear infinite}
.dtfx .fog.f2{bottom:6%;animation-duration:38s;animation-direction:reverse;opacity:.8}.dtfx .fog.f1{bottom:-6%}
@keyframes dtfog{from{transform:translateX(-12%)}50%{transform:translateX(12%)}to{transform:translateX(-12%)}}
.dtfx .ghost{position:absolute;width:11vmin;opacity:0;filter:drop-shadow(0 0 2vmin rgba(255,255,255,.5));animation:dtghost 22s linear infinite}
.dtfx .ghost.g2{width:8vmin;animation-duration:30s;animation-delay:7s;top:62%}
.dtfx .ghost.g3{width:14vmin;animation-duration:40s;animation-delay:15s;top:22%}
.dtfx .ghost.g1{top:42%}
@keyframes dtghost{0%{transform:translate(-20vmin,0);opacity:0}8%{opacity:.5}50%{transform:translate(50vw,-6vmin)}92%{opacity:.5}100%{transform:translate(110vw,3vmin);opacity:0}}
.dtfx .bat{position:absolute;width:7vmin;left:-10vmin;fill:#05010a;animation:dtbat 14s linear infinite}
.dtfx .bat.b2{animation-delay:5s;top:30%;width:5vmin;animation-duration:11s}.dtfx .bat.b3{animation-delay:9s;top:70%;width:6vmin;animation-duration:17s}.dtfx .bat.b1{top:12%}
@keyframes dtbat{0%{transform:translate(0,0) scaleY(1)}10%{transform:translate(15vw,-4vmin) scaleY(.5)}20%{transform:translate(30vw,3vmin) scaleY(1)}30%{transform:translate(45vw,-5vmin) scaleY(.5)}40%{transform:translate(60vw,4vmin) scaleY(1)}50%{transform:translate(75vw,-3vmin) scaleY(.5)}60%{transform:translate(90vw,3vmin) scaleY(1)}100%{transform:translate(125vw,0) scaleY(1)}}
.dtfx .spider{position:absolute;top:0;left:12%;width:5vmin;animation:dtspider 9s ease-in-out infinite}
.dtfx .spider.s2{left:80%;animation-duration:13s;animation-delay:4s;width:4vmin}
.dtfx .spider i{position:absolute;left:50%;bottom:100%;width:2px;height:60vh;background:rgba(255,255,255,.35);transform:translateX(-50%)}
@keyframes dtspider{0%,100%{transform:translateY(-4vh)}50%{transform:translateY(18vh)}}
.dtfx .flash{position:absolute;inset:0;background:#c9b6ff;opacity:0;animation:dtflash 19s linear infinite}
@keyframes dtflash{0%,93%,100%{opacity:0}94%{opacity:.22}95%{opacity:0}96%{opacity:.14}97.5%{opacity:0}}
.dtfx .moon{position:absolute;top:9%;right:11%;width:12vmin;height:12vmin;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff6d1,#e9c76a 70%);box-shadow:0 0 6vmin 1vmin rgba(255,220,120,.35);opacity:.75}

#dt,#dtSetup{--stage-2:#1b0a33;--stage-3:#2e1157;--line:#4b1f86;--gold:#ff7a00;--gold-deep:#d95f00;--muted:#c9a8ff}
#dt.photo>.floorbar,#dt.photo>#dtScore{display:none}
#dt.photo #dtStage{gap:4vmin}
.dtghostbtn{position:absolute;bottom:2vmin;left:50%;transform:translateX(-50%);opacity:.02;font-size:.6rem!important;padding:.3em 1em!important}
.dtghostbtn:focus{opacity:.02}
.dtchip{background:#2e1157;border-left:1.1vmin solid var(--pc)}
.dtchip.on{background:#ff7a00;color:#14052b}
.dtchip.on b,.dtchip.on span{color:#14052b}
.dtvs span{background:#2e1157;border-left:1.1vmin solid var(--pc);color:#fff}
.dtvotes span{background:#2e1157}.dtvotes span.ok{background:#ff7a00;color:#14052b}
.dtres div{background:#2e1157}.dtres div.win{background:#ff7a00}
.dtrank .r{background:#2e1157}.dtrank .r.win{background:#ff7a00}
.dtstar{background:#2e1157;border:.8vmin solid #ff7a00;box-shadow:0 0 6vmin #ff7a00}
#dtSetup .topbar h2{color:#ff7a00}
#playDT{background:linear-gradient(160deg,#4b1f86,#14052b)!important;border-color:#ff7a00!important}
.dtvs{display:flex;align-items:center;gap:2vmin;justify-content:center;flex-wrap:wrap}
.dtvs span{display:flex;align-items:center;gap:1.4vmin;background:var(--pc);padding:1vmin 2.4vmin 1vmin 1vmin;font-family:${FONT};font-weight:800;letter-spacing:.12em;text-transform:uppercase;font-size:clamp(1rem,3.4vmin,2.2rem);color:#fff}
.dtvs span .av{--s:clamp(34px,7vmin,60px);border-radius:0;padding:0;background:#fff;box-shadow:none}
.dtvs i{font-family:${FONT};font-style:normal;font-weight:900;color:#ff7a00;font-size:clamp(1.2rem,4vmin,2.6rem)}
.dtword{animation:dtglow 3s ease-in-out infinite}
@keyframes dtglow{0%,100%{box-shadow:0 0 0 0 rgba(255,122,0,0)}50%{box-shadow:0 0 5vmin 0 rgba(255,122,0,.55)}}
.game.live .dtart{width:64px;height:58px;background:none;border:0;transform:none;box-shadow:none;position:relative}
.game.live .dtart .dtsvg{position:absolute;inset:-14% -10% -6%;width:120%;height:120%;filter:drop-shadow(0 6px 10px rgba(0,0,0,.35))}
.game.live .dtart::before,.game.live .dtart::after{display:none!important}

.game.live .dtart::after{content:"";position:absolute;inset:14px 8px 8px;background:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 36'><path d='M6 2l8 12H-2zM42 2l8 12H34zM8 24q16 14 32 0q-16 4-32 0z' fill='%2314052b'/></svg>") center/contain no-repeat;transform:none;border:0}
`;
const st=document.createElement("style");st.textContent=css+css2;document.head.appendChild(st);
const WEB='<svg class="web" viewBox="0 0 100 100" fill="none" stroke="#fff" stroke-width=".7" stroke-linecap="round"><path d="M0 0L100 0M0 0L88 40M0 0L66 66M0 0L40 88M0 0L0 100"/><path d="M18 0Q14 14 0 18M38 0Q30 30 0 38M58 0Q46 46 0 58M80 0Q60 60 0 80"/></svg>';
const GHOST='<svg class="ghost" viewBox="0 0 64 80"><path d="M32 4C15 4 6 17 6 34v38l9-8 8 8 9-8 9 8 8-8 9 8V34C58 17 49 4 32 4z" fill="#fff" fill-opacity=".85"/><ellipse cx="23" cy="32" rx="5" ry="7" fill="#14052b"/><ellipse cx="41" cy="32" rx="5" ry="7" fill="#14052b"/><ellipse cx="32" cy="48" rx="5" ry="6" fill="#14052b"/></svg>';
const BAT='<svg class="bat" viewBox="0 0 64 32"><path d="M32 8c-3 0-4 4-6 4-4-5-12-8-24-6 6 3 7 8 6 14 5-5 10-4 14 2 3-4 5-5 10-5s7 1 10 5c4-6 9-7 14-2-1-6 0-11 6-14-12-2-20 1-24 6-2 0-3-4-6-4z"/></svg>';
const SPIDER='<div class="spider"><i></i><svg viewBox="0 0 40 40" width="100%"><g stroke="#e9e1ff" stroke-width="2" fill="none" stroke-linecap="round"><path d="M14 20l-10-8M14 22l-12 2M14 24l-10 10M26 20l10-8M26 22l12 2M26 24l10 10"/></g><circle cx="20" cy="26" r="8" fill="#e9e1ff"/><circle cx="20" cy="16" r="5" fill="#e9e1ff"/><circle cx="18" cy="15" r="1.4" fill="#ff2d2d"/><circle cx="22" cy="15" r="1.4" fill="#ff2d2d"/></svg></div>';
const fxHTML='<div class="dtfx"><div class="moon"></div><div class="fog f1"></div><div class="fog f2"></div>'+["tl","tr","bl","br"].map(c=>WEB.replace('class="web"','class="web '+c+'"')).join("")+GHOST.replace('class="ghost"','class="ghost g1"')+GHOST.replace('class="ghost"','class="ghost g2"')+GHOST.replace('class="ghost"','class="ghost g3"')+BAT.replace('class="bat"','class="bat b1"')+BAT.replace('class="bat"','class="bat b2"')+BAT.replace('class="bat"','class="bat b3"')+SPIDER+SPIDER.replace('class="spider"','class="spider s2"')+'<div class="flash"></div></div>';

/* hub tile + screens */
const hub=document.querySelector(".games");
const tile=document.createElement("button");tile.className="game live";tile.id="playDT";
tile.innerHTML=`<span class="art"><span class="dtart"><svg class="dtsvg" viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg"><rect x="54" y="2" width="14" height="20" rx="3" fill="#2f8f3a"/><ellipse cx="36" cy="62" rx="32" ry="40" fill="#e86a00"/><ellipse cx="84" cy="62" rx="32" ry="40" fill="#e86a00"/><ellipse cx="60" cy="62" rx="34" ry="42" fill="#ff7a00"/><path d="M22 40l24 6-18 20z" fill="#14052b"/><path d="M98 40l-24 6 18 20z" fill="#14052b"/><path d="M60 58l-7 12h14z" fill="#14052b"/><path d="M26 78q34 30 68 0l-8-4-6 8-8-8-8 8-8-8-6 8-8-8z" fill="#14052b"/></svg></span><span class="pill">Play</span></span><h2>Draw This</h2><p>Same word, whiteboards, spooky fun. Vote for the best drawing.</p>`;
hub.insertBefore(tile,hub.firstChild);
const n=hub.children.length;hub.classList.remove("five","six","seven");if(n>=7)hub.classList.add("seven");
const app=$("app");
const secS=document.createElement("section");secS.className="screen";secS.id="dtSetup";secS.hidden=true;
const sec=document.createElement("section");sec.className="screen";sec.id="dt";sec.hidden=true;
app.insertBefore(secS,$("overlay"));app.insertBefore(sec,$("overlay"));
sec.innerHTML=`<div class="floorbar"><span class="brand">GAME NIGHT<small>DRAW THIS</small></span><span class="spacer"></span><span class="count" id="dtRound"></span><button class="btn ghost" id="dtQuit">Quit</button></div><div id="dtScore"></div><div id="dtStage"></div>`;
sec.insertAdjacentHTML("afterbegin",fxHTML);
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
      <li>Every <b>4th round</b> is a <b>head to head</b>: with 4 players, two pairs each get a different secret word on their phones, then each pair judges the other. Every vote is a point.</li>
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
  secS.insertAdjacentHTML("afterbegin",fxHTML);
  $("dtBack").onclick=()=>show("hub");
  $("dtStart").onclick=()=>{ac();startGame()};
  show("dtSetup");
}

/* state */
const DT={players:[],round:0,word:"",phase:"idle",mode:"all",duels:[],pairings:[],duelN:0,left:0,timer:null,votes:{},used:new Set(),gain:{},voteT:null,cpuT:[]};
const stage=html=>{$("dt").classList.toggle("photo",DT.phase==="perfect");$("dtStage").innerHTML=html};
const esc2=s=>String(s).replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const byPid=pid=>DT.players.find(p=>p.pid===pid);
const isDuel=()=>DT.mode==="duel";
const drawsIn=pid=>DT.duels.findIndex(d=>d.duo.includes(pid));      // which duel this player draws in (-1 = none)
const judgesIn=pid=>DT.duels.findIndex(d=>!d.duo.includes(pid));    // which duel this player judges
const voters=()=>isDuel()?DT.players.filter(p=>judgesIn(p.pid)>=0):DT.players;
const targets=pid=>isDuel()?(judgesIn(pid)>=0?DT.duels[judgesIn(pid)].duo:[]):DT.players.map(p=>p.pid).filter(x=>x!==pid);
const duoPlayers=d=>d.duo.map(byPid).filter(Boolean);
const vsHTML=d=>`<div class="dtvs">${duoPlayers(d).map(p=>`<span style="--pc:${p.color}">${avatarHTML(p,"sm")}${esc2(p.name)}</span>`).join("<i>VS</i>")}</div>`;
function score(){
  $("dtScore").innerHTML=DT.players.map(p=>{
    const on=(DT.phase==="vote"&&DT.votes[p.pid]!=null)||(isDuel()&&drawsIn(p.pid)>=0&&(DT.phase==="ready"||DT.phase==="draw"));
    return `<div class="dtchip${on?" on":""}" style="--pc:${p.color}">${avatarHTML(p,"sm")}<b>${esc(p.name)}</b><span>${p.pts}</span></div>`}).join("");
}
function endGame(){clearInterval(DT.timer);clearTimeout(DT.voteT);DT.cpuT.forEach(clearTimeout);DT.cpuT=[];DT.phase="idle"}
function pickWord(){
  const pool=CFG.packs.flatMap(k=>PACKS[k]);
  let fresh=pool.filter(w=>!DT.used.has(w));if(!fresh.length){DT.used=new Set();fresh=pool}
  const w=fresh[Math.floor(Math.random()*fresh.length)];DT.used.add(w);return w;
}
/* 4 players: two duos with a different word each (they judge each other). 3 players: one duo, the third judges. */
function makeDuels(){
  const P=DT.players.map(p=>p.pid);
  if(P.length>=4){
    if(!DT.pairings.length)DT.pairings=shuffle([[[0,3],[1,2]],[[0,1],[2,3]],[[0,2],[1,3]]]);
    const pr=DT.pairings[DT.duelN++%DT.pairings.length];
    return pr.map(d=>({duo:d.map(i=>P[i]),word:pickWord()}));
  }
  const ps=[[0,1],[0,2],[1,2]];
  const d=ps[DT.duelN++%3];
  return [{duo:d.map(i=>P[i]),word:pickWord()}];
}
function startGame(){
  const L=window.LINK&&LINK.pull?LINK.pull(2,4,{cpu:true}):null;
  if(!L||L.length<2){
    openOverlay(`<span class="eyebrow">Draw This</span><h2>Need 2 players</h2><p class="score">Scan the join code with your phones${L&&L.length===1?" (one is in, one more to go)":""}. A CPU player counts as a player.</p><div class="row"><button class="btn" id="dtAddCpu">Add CPU player</button><button class="btn gold" id="dtOk">OK</button></div>`);
    $("dtAddCpu").onclick=()=>{window.LINK&&LINK.addCpu&&LINK.addCpu();closeOverlay()};$("dtOk").onclick=closeOverlay;return;
  }
  ensureSlots();save();saveCfg();
  DT.players=L.map((p,i)=>({name:p.name,color:S.colors[i],pts:0,slot:i,pid:p.pid,cpu:!!p.cpu}));
  DT.round=0;DT.used=new Set();DT.phase="idle";DT.pairings=[];DT.duelN=0;DT.mode="all";DT.duels=[];
  show("dt");score();stage("");
  introContestants(DT.players,"Draw This",()=>nextRound());
}
function nextRound(){
  DT.round++;
  if(DT.round>CFG.rounds)return results();
  DT.mode=(DT.players.length>=3&&DT.round%4===0)?"duel":"all";
  DT.duels=isDuel()?makeDuels():[];
  DT.word=isDuel()?"":pickWord();DT.votes={};DT.gain={};DT.phase="ready";
  $("dtRound").textContent=`Round ${DT.round} of ${CFG.rounds}`;
  renderReady();
}
function renderReady(){
  score();
  stage(isDuel()
   ?`<div class="dtk">Head to head</div>${DT.duels.map(vsHTML).join("")}<div class="dtword s">Check your phone</div><p class="dtp">${DT.duels.length>1?"Each pair gets a different secret word on their phones. Then the other pair votes.":"The two players get a secret word on their phones. The other player watches, then votes."}</p>
      <div class="row"><button class="btn" id="dtNew">New words</button><button class="btn gold" id="dtGo">Start</button></div>`
   :`<div class="dtk">Everyone draw</div><div class="dtword${DT.word.length>16?" s":""}">${esc2(DT.word)}</div><p class="dtp">${CFG.secs} seconds · grab your marker</p>
      <div class="row"><button class="btn" id="dtNew">New word</button><button class="btn gold" id="dtGo">Start</button></div>`);
  $("dtNew").onclick=()=>{if(isDuel())DT.duels.forEach(d=>d.word=pickWord());else DT.word=pickWord();renderReady()};
  $("dtGo").onclick=startDraw;
  setTimeout(()=>{const b=$("dtGo");b&&b.focus({preventScroll:true})},40);
}
function startDraw(){
  if(DT.phase!=="ready")return;
  DT.phase="draw";DT.left=CFG.secs;SFX.go&&SFX.go();score();
  stage(isDuel()
   ?`<div class="dtk">Head to head · draw!</div>${DT.duels.map(vsHTML).join("")}<div class="dtword s">Check your phone</div><div class="dtclock" id="dtClock">${CFG.secs}</div><div class="dtbar"><i id="dtBar"></i></div><div class="row"><button class="btn ghost" id="dtDone">Everyone's done</button></div>`
   :`<div class="dtk">Draw!</div><div class="dtword s">${esc2(DT.word)}</div><div class="dtclock" id="dtClock">${CFG.secs}</div><div class="dtbar"><i id="dtBar"></i></div>
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
const connected=p=>{if(p.cpu)return true;try{const x=LINK.phones.get(p.pid);return !!(x&&x.conn&&x.conn.open&&Date.now()-(x.rx||0)<15000)}catch(e){return false}};
function startVote(){
  if(DT.phase!=="draw")return;
  clearInterval(DT.timer);DT.phase="vote";DT.votes={};score();
  paintVote();
  DT.cpuT.forEach(clearTimeout);DT.cpuT=[];
  voters().filter(p=>p.cpu).forEach(p=>{DT.cpuT.push(setTimeout(()=>{const t=targets(p.pid);if(t.length)castVote(p.pid,t[Math.floor(Math.random()*t.length)])},2000+Math.random()*4000))});
  clearTimeout(DT.voteT);DT.voteT=setTimeout(finishVote,35000);
  setTimeout(()=>{const b=$("dtSkipVote");b&&b.focus({preventScroll:true})},40);
}
function paintVote(){
  stage(`<div class="dtk">${isDuel()?"Head to head · vote on your phone":"Time's up · hold up your boards"}</div>
    ${isDuel()?DT.duels.map(d=>`<div class="dtword s">${esc2(d.word)}</div>${vsHTML(d)}`).join(""):`<div class="dtword s">${esc2(DT.word)}</div>`}
    <p class="dtp">${isDuel()?"Judge the other pair's drawings. Each vote is a point.":"Vote on your phone for the best drawing. Not your own! Each vote is a point."}</p>
    <div class="dtvotes">${voters().map(p=>`<span class="${DT.votes[p.pid]!=null?"ok":""}" style="${DT.votes[p.pid]!=null?"":"opacity:.8"}">${esc2(p.name)} ${DT.votes[p.pid]!=null?"✓":"…"}</span>`).join("")}</div>
    <div class="row"><button class="btn ghost" id="dtSkipVote">Skip voting</button></div>`);
  $("dtSkipVote").onclick=finishVote;
  score();
}
function castVote(pid,forPid){
  if(DT.phase!=="vote"||pid===forPid||DT.votes[pid]!=null)return false;
  if(!voters().some(p=>p.pid===pid)||!targets(pid).includes(forPid))return false;
  DT.votes[pid]=forPid;SFX.beep&&SFX.beep();paintVote();
  if(voters().filter(connected).every(p=>DT.votes[p.pid]!=null))setTimeout(finishVote,700);
  return true;
}
function finishVote(){
  if(DT.phase!=="vote")return;
  clearTimeout(DT.voteT);DT.cpuT.forEach(clearTimeout);DT.cpuT=[];DT.phase="result";
  DT.gain={};DT.players.forEach(p=>DT.gain[p.pid]=0);
  Object.values(DT.votes).forEach(f=>{if(DT.gain[f]!=null)DT.gain[f]++});      // every vote is a point
  DT.players.forEach(p=>p.pts+=DT.gain[p.pid]);score();
  const pool=p=>isDuel()?DT.players.filter(q=>!DT.duels[Math.max(0,drawsIn(p.pid))].duo.includes(q.pid)).length:DT.players.length-1;
  DT.perfect=DT.players.filter(p=>{const n=pool(p);return (!isDuel()||drawsIn(p.pid)>=0)&&n>=2&&DT.gain[p.pid]===n});
  if(DT.perfect.length)return renderPerfect();
  renderResult();
}
function wordOf(p){return isDuel()?DT.duels[Math.max(0,drawsIn(p.pid))].word:DT.word}
function renderPerfect(){
  DT.phase="perfect";score();
  SFX.win&&SFX.win();setTimeout(()=>SFX.win&&SFX.win(),700);
  const P=DT.perfect;
  stage(`<div class="dtperfect">Perfect score!</div>
    <div class="dtstars">${P.map(p=>`<div class="dtstar" style="--pc:${p.color}">${avatarHTML(p,"lg")}<b>${esc2(p.name)}</b><small>${esc2(wordOf(p))}</small></div>`).join("")}</div>
    <button class="btn gold dtghostbtn" id="dtPhoto" aria-label="Continue">Continue</button>`);
  confetti(P.map(p=>p.color).concat(["#ff7a00","#ffd400","#fffdf6"]));
  $("dtPhoto").onclick=()=>{stopConfetti();renderResult()};
  setTimeout(()=>{const b=$("dtPhoto");b&&b.focus({preventScroll:true})},60);
}
function renderResult(){
  DT.phase="result";score();
  SFX.win&&SFX.win();
  const card=(p,top)=>`<div class="${top>0&&DT.gain[p.pid]===top?"win":""}">${esc2(p.name)}<em>+${DT.gain[p.pid]}</em></div>`;
  let body,title;
  if(isDuel()){
    body=DT.duels.map(d=>{const ps=duoPlayers(d),top=Math.max(...ps.map(p=>DT.gain[p.pid]));return `<div class="dtword s">${esc2(d.word)}</div><div class="dtres sm">${ps.map(p=>card(p,top)).join("")}</div>`}).join("");
    title="Head to head · results";
  }else{
    const top=Math.max(...DT.players.map(p=>DT.gain[p.pid])),tie=DT.players.filter(p=>DT.gain[p.pid]===top).length;
    body=`<div class="dtword s">${esc2(DT.word)}</div><div class="dtres">${DT.players.map(p=>card(p,top)).join("")}</div>`;
    title=top===0?"No votes this round":tie>1?"A tie for best drawing":"Best drawing";
  }
  stage(`<div class="dtk">${title}</div>${body}<div class="row"><button class="btn gold" id="dtNext">${DT.round>=CFG.rounds?"See results":"Next round"}</button></div>`);
  $("dtNext").onclick=nextRound;
  setTimeout(()=>{const b=$("dtNext");b&&b.focus({preventScroll:true})},60);
}
function results(){
  DT.phase="final";DT.mode="all";DT.duels=[];$("dtRound").textContent="";
  const order=DT.players.slice().sort((a,b)=>b.pts-a.pts),top=order[0].pts,winners=order.filter(p=>p.pts===top);
  window.LB&&LB.record("dt",DT.players.map(p=>({name:p.name,color:p.color,score:p.pts,win:p.pts===top})));
  SFX.win&&SFX.win();
  stage(`<div class="dtk">Draw This · final</div><div class="dtword s">${winners.length>1?"It's a draw!":esc2(winners[0].name)+" wins!"}</div>
    <div class="dtrank">${order.map(p=>`<div class="r${p.pts===top?" win":""}">${avatarHTML(p,"")}<b>${esc2(p.name)}</b><em>${p.pts}</em></div>`).join("")}</div>
    <div class="row"><button class="btn" id="dtMenu">Game Night menu</button><button class="btn gold" id="dtAgain">Play again</button></div>`);
  confetti(winners.map(w=>w.color).concat(["#ff7a00","#fffdf6"]));
  $("dtMenu").onclick=()=>{stopConfetti();endGame();show("hub")};
  $("dtAgain").onclick=()=>{stopConfetti();DT.players.forEach(p=>p.pts=0);DT.round=0;DT.used=new Set();DT.pairings=[];DT.duelN=0;score();nextRound()};
  setTimeout(()=>{const b=$("dtAgain");b&&b.focus({preventScroll:true})},60);
}

/* what the phones see */
function sceneFor(p){
  const sc=DT.players.map(q=>({n:q.name,s:q.pts,c:q.color,on:0,pid:q.pid,av:(()=>{try{return avatarSrc(q.slot)}catch(e){return ""}})()}));
  const base={th:"dt",scores:sc,btns:[],sn:DT.round*10+({ready:1,draw:2,vote:3,perfect:6,result:4,final:5}[DT.phase]||0),me:1};
  const rl=(isDuel()?"Head to head · ":"")+(DT.round?`Round ${Math.min(DT.round,CFG.rounds)} of ${CFG.rounds}`:"");
  const mine=drawsIn(p.pid),myDuel=mine>=0?DT.duels[mine]:null;
  const partner=myDuel?(byPid(myDuel.duo.find(x=>x!==p.pid))||{}).name:"";
  const names=DT.duels.map(d=>duoPlayers(d).map(q=>q.name).join(" vs ")).join("  ·  ");
  if(DT.phase==="ready"){
    if(isDuel())return {...base,head:{e:rl,t:myDuel?"You're up!":"Head to head",s:myDuel?"Secret word. You and "+partner+" draw the same thing":names},big:myDuel?myDuel.word:"",btns:[{t:"Start",cls:"gold",a:"start"}]};
    return {...base,head:{e:rl,t:"Get your marker ready",s:"Everyone draws the same thing"},big:DT.word,btns:[{t:"Start",cls:"gold",a:"start"}]};
  }
  if(DT.phase==="draw"){
    if(isDuel())return {...base,head:{e:rl,t:myDuel?"Draw it!":"Watch the duel",s:myDuel?"Keep it secret":names},big:myDuel?myDuel.word:"",clock:String(Math.ceil(DT.left))};
    return {...base,head:{e:rl,t:"Draw it!",s:"On your whiteboard"},big:DT.word,clock:String(Math.ceil(DT.left))};
  }
  if(DT.phase==="vote"){
    const voted=DT.votes[p.pid];
    const j=isDuel()?judgesIn(p.pid):-1;
    if(isDuel()&&j<0)return {...base,head:{e:rl,t:"Voting",s:"Watch the TV"},big:""};
    const word=isDuel()?DT.duels[j].word:DT.word;
    return {...base,head:{e:rl,t:voted!=null?"Vote locked in":isDuel()?"Which drawing is best?":"Who drew it best?",s:voted!=null?"Waiting for the others":isDuel()?"Judge the other pair's "+word.toLowerCase():"Tap a player. Not yourself!"},big:word,
      btns:targets(p.pid).map(x=>{const q=byPid(x);return {t:q.name,a:"vote",v:x,d:voted!=null?1:0,on:voted===x?1:0,c:q.color}})};
  }
  if(DT.phase==="perfect"){
    const P=DT.perfect||[],won=P.some(q=>q.pid===p.pid);
    return {...base,head:{e:rl,t:won?"PERFECT SCORE!":"Perfect score!",s:won?"You got every vote! Take your whiteboard to the TV and stand next to it for a photo with your masterpiece":P.map(q=>q.name).join(" and ")+(P.length>1?" got":" got")+" every vote. Get your phone camera ready!"},big:won?wordOf(byPid(p.pid)):"",btns:[{t:won?"Got the photo":"Continue",cls:"gold",a:"photo"}]};
  }
  if(DT.phase==="result"){
    const list=isDuel()?DT.duels.flatMap(duoPlayers):DT.players;
    return {...base,head:{e:rl,t:"Round result",s:list.map(q=>q.name+" +"+(DT.gain[q.pid]||0)).join("  ·  ")},big:isDuel()?"":DT.word,btns:[{t:DT.round>=CFG.rounds?"See results":"Next round",cls:"gold",a:"next"}]};
  }
  if(DT.phase==="final"){const o=DT.players.slice().sort((a,b)=>b.pts-a.pts);return {...base,head:{e:"Final",t:o[0].name+" wins!",s:o.map(q=>q.name+" "+q.pts).join("  ·  ")}}}
  return {...base,head:{e:"Draw This",t:"Get ready",s:""}};
}
function act(p,m){
  if(m.a==="start"&&DT.phase==="ready")startDraw();
  else if(m.a==="next"&&DT.phase==="result")nextRound();
  else if(m.a==="photo"&&DT.phase==="perfect"){stopConfetti();renderResult()}
  else if(m.a==="vote")castVote(p.pid,m.i);
}
function active(){return !$("dt").hidden}
window.__DT={DT,CFG,sceneFor,act,castVote,PACKS,active,nextRound};
})();
