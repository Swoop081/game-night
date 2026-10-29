/* =================== THE FLOOR: look and show moments ===================
   Neon-blue stage, glowing LED tiles, a lit perspective floor, VS splashes and score bars. */
(function(){
const FONT='"Oxanium","Big Shoulders Display",Impact,sans-serif';
const css=`
#floor,#duel{--skf:${FONT};background:radial-gradient(110% 75% at 50% -5%,#1a3a9c 0%,#0a1240 48%,#03051a 100%)}
#floor::before,#duel::before{content:"";position:absolute;left:-40%;right:-40%;bottom:-8%;height:58%;pointer-events:none;z-index:0;
  background:linear-gradient(rgba(90,170,255,.30) 1.5px,transparent 1.5px) 0 0/100% 64px,linear-gradient(90deg,rgba(90,170,255,.30) 1.5px,transparent 1.5px) 0 0/64px 100%;
  transform:perspective(520px) rotateX(64deg);transform-origin:50% 100%;animation:fgrid 5s linear infinite;
  -webkit-mask-image:linear-gradient(to top,#000 10%,transparent 90%);mask-image:linear-gradient(to top,#000 10%,transparent 90%)}
@keyframes fgrid{to{background-position:0 64px,64px 0}}
#floor::after,#duel::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:0;background:radial-gradient(60% 40% at 50% 0%,rgba(140,190,255,.28),transparent 70%)}
#floor>*,#duel>*{position:relative;z-index:1}
#floor .brand,#duel .brand,#floor .who,#duel .who,#duel .cathead h3,#duel .role{font-family:${FONT}}
#floor .brand{letter-spacing:.12em;text-shadow:0 0 18px rgba(90,170,255,.7)}
.floorwrap{perspective:1600px}
.board{transform:rotateX(7deg);transform-origin:50% 100%;background:#030616;border:2px solid #3b82f6;
  box-shadow:0 0 0 1px #0a1240,0 0 70px -6px rgba(59,130,246,.75),0 40px 90px -30px rgba(59,130,246,.55),inset 0 0 50px rgba(59,130,246,.18)}
.cell{background:linear-gradient(180deg,rgba(255,255,255,.30),rgba(255,255,255,0) 38%,rgba(0,0,0,.28)),var(--c);font-family:${FONT}}
.cell .nm{font-weight:800;letter-spacing:.04em;text-transform:uppercase}
.cell.flipin{animation:cflip .75s cubic-bezier(.2,.9,.3,1) both;z-index:4}
@keyframes cflip{0%{transform:rotateY(100deg) scale(.6);filter:brightness(2.6)}60%{filter:brightness(1.7)}100%{transform:none;filter:none}}
.cell.hl{filter:brightness(1.55) saturate(1.2);box-shadow:0 0 40px 6px var(--c);transform:scale(1.04)}
.cell.me{box-shadow:0 0 36px 4px #fff}
#floor .status p{text-shadow:0 2px 12px rgba(0,0,0,.6)}
#duel .side{background:linear-gradient(180deg,rgba(20,34,90,.85),rgba(6,10,36,.92));border-color:rgba(90,150,255,.35)}
#duel .side.active{box-shadow:0 0 0 1px var(--pc),0 0 80px -8px var(--pc),inset 0 0 40px -18px var(--pc)}
#duel .side.active .clock{text-shadow:0 0 28px var(--pc)}
#duel .side .who{text-transform:uppercase;letter-spacing:.04em}
#duel .card{border:2px solid #3b82f6;background:radial-gradient(100% 80% at 50% 15%,#233a9a,#0a1038);box-shadow:0 0 50px -10px rgba(59,130,246,.8),inset 0 0 50px rgba(59,130,246,.18)}
#duel .cathead h3{text-transform:uppercase;letter-spacing:.1em;text-shadow:0 0 18px rgba(90,170,255,.6)}
.big321{animation:cslam .8s ease-out both}
@keyframes cslam{0%{transform:scale(2.6);opacity:0}40%{opacity:1}100%{transform:scale(1)}}
.sheet .skpod{margin:.2em 0}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
if(!document.querySelector('link[href*="Oxanium"]')){const l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Oxanium:wght@600;800&display=swap";document.head.appendChild(l)}

const wrap=(name,fn)=>{const orig=window[name];if(typeof orig!=="function")return;window[name]=function(...a){return fn(orig,...a)}};
const squares=p=>cellsOf(p.id).length;
const rowsAlive=()=>{const al=S.players.filter(p=>p.alive);return al.map(p=>({name:p.name,color:p.color,id:p.id,score:squares(p),label:squares(p)+" sq"})).sort((a,b)=>b.score-a.score).slice(0,8)};

// VS splash before every duel and final round
let vsBusy=false;
wrap("startDuel",(orig,cfg)=>{
  if(vsBusy)return;vsBusy=true;
  const a=S.players[cfg.a],b=S.players[cfg.b],cat=CATS[cfg.cat];
  return SK.vs(a,b,{roleA:cfg.roles[0],roleB:cfg.roles[1],cat:`${cat.icon} ${cat.name}`}).then(()=>{vsBusy=false;return orig(cfg)});
});
// board: flip tiles that changed hands
let prev=null;
wrap("renderFloor",(orig,...a)=>{
  const r=orig(...a);
  try{
    const {rows,cols,owner}=S.grid,pt=S.prefs.screen==="portrait",vr=pt?cols:rows,vc=pt?rows:cols;
    if(prev&&prev.length===owner.length){
      [...$("board").children].forEach((el,v)=>{const vrI=Math.floor(v/vc),vcI=v%vc,rr=pt?vcI:vrI,cc=pt?vrI:vcI,i=rr*cols+cc;
        if(owner[i]>=0&&prev[i]!==owner[i]&&prev[i]>=0)el.classList.add("flipin")});
    }
    prev=owner.slice();
  }catch(e){}
  return r;
});
// the clock hits zero or the category runs out
wrap("endDuel",(orig,wk,why)=>{SK.flash("#ff4d79");SK.shake($("card"));SK.sting("hit");return orig(wk,why)});
// someone takes a player's squares: add a score board to the result sheet
wrap("duelOver",(orig,wk,W,L,d)=>{
  const r=orig(wk,W,L,d);
  try{
    SK.flash(W.color);SK.sting("win");
    const sh=$("sheet"),h=sh&&sh.querySelector("h2");
    if(!$("overlay").hidden&&h&&!sh.querySelector(".skpod")&&S.players.filter(p=>p.alive).length>1)h.insertAdjacentHTML("afterend",SK.podium(rowsAlive()));
  }catch(e){}
  return r;
});
wrap("finalRoundOver",(orig,W,L)=>{SK.flash(W.color);SK.sting("win");return orig(W,L)});
wrap("champion",(orig,W)=>{
  return SK.bumper("Champion",{sub:W.name+" owns the floor",color:W.color,bg:"#1d3fa8",avatar:W,ms:2600,sting:"win"}).then(()=>orig(W));
});
// 3-2-1 numbers slam in each time they change
const sheet=document.getElementById("sheet");
if(sheet)new MutationObserver(()=>{const c=document.getElementById("c321");if(c){c.style.animation="none";void c.offsetWidth;c.style.animation=""}}).observe(sheet,{subtree:true,characterData:true,childList:true});
// bumper when the game begins
wrap("startGame",(orig)=>{prev=null;return orig()});
})();
(function(){const s=document.createElement("style");s.textContent=".portrait #floor .brand small,.portrait #duel .brand small{display:none}.portrait #floor .floorbar{flex-wrap:nowrap}";document.head.appendChild(s)})();
