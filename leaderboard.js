/* =================== LEADERBOARD ===================
   Tracks wins, games played and best scores per game mode, by player name, on this device. */
(function(){
const KEY="gn.lb";
const MODES=[
  ["floor-tv","🟦","The Floor · TV Game","wins"],["floor-custom","🟦","The Floor · Custom","wins"],
  ["hl","🃏","Higher or Lower","pts"],["cd","💵","The Price Is Right","$"],
  ["nt","🔟","Name Ten","pts"],["ff","👨‍👩‍👧","Family Feud","pts"],
  ["tp","🥧","Trivial Pursuit","wedges"],["pb","🖼️","Picture Blitz","pts"],["wf","🎡","Wheel of Fortune","$"],["dt","✏️","Draw This","pts"]];
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch(e){return {}}};
const store=d=>{try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}};
const keyOf=n=>String(n||"").trim().toLowerCase();
const fmt=(mode,v)=>v==null?"–":(mode==="cd"||mode==="wf")?"$"+Number(v).toLocaleString("en-AU"):String(v);

/* results: [{name,color,score,win}] ; score may be null */
function record(mode,results){
  try{
    const d=load(),m=d[mode]||(d[mode]={players:{},top:[]});
    const at=Date.now();
    results.forEach(r=>{
      const k=keyOf(r.name);if(!k)return;
      const p=m.players[k]||(m.players[k]={name:r.name,wins:0,played:0,best:null});
      p.name=r.name;p.color=r.color||p.color;p.played++;if(r.win)p.wins++;
      if(r.score!=null){if(p.best==null||r.score>p.best){p.best=r.score;p.bestAt=at}
        m.top.push({name:r.name,color:r.color,score:r.score,at,win:!!r.win})}
    });
    m.top.sort((a,b)=>b.score-a.score);m.top=m.top.slice(0,25);
    store(d);
  }catch(e){}
}

const css=`
#lb{gap:clamp(8px,1.6vh,14px);overflow:hidden}
.portrait #lb .topbar{flex-wrap:nowrap;gap:8px}.portrait #lb .topbar h2{font-size:1.15rem;white-space:nowrap;text-align:center}.portrait #lb .topbar .btn{padding:.5em .9em;font-size:.85rem;white-space:nowrap}
.portrait #lb{padding-top:max(8px,calc(var(--sa-t) + var(--blur-gap)))}
.lbtabs{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:2px 2px 6px;flex:none}
.lbtabs::-webkit-scrollbar{display:none}
.lbtabs button{flex:none;white-space:nowrap;border-radius:999px;padding:.5em 1em;background:var(--stage-3);border:1px solid var(--line);font-weight:800;font-size:clamp(.78rem,2vh,.95rem)}
.lbtabs button[aria-pressed="true"]{background:var(--gold);color:#2a1700;border-color:transparent}
.lbgrid{flex:1 1 auto;min-height:0;display:grid;grid-template-columns:minmax(0,3fr) minmax(0,2fr);gap:clamp(8px,1.6vh,14px)}
.portrait .lbgrid{grid-template-columns:1fr;grid-auto-rows:minmax(0,auto);overflow:auto}
.lbpanel{background:var(--stage-2);border:1px solid var(--line);border-radius:14px;padding:clamp(8px,1.6vh,14px) clamp(10px,1.6vw,16px);display:flex;flex-direction:column;gap:8px;min-height:0;min-width:0}
.lbpanel>.list{overflow:auto;display:flex;flex-direction:column;gap:6px;min-height:0;flex:1}
.lbrow{display:grid;grid-template-columns:2ch minmax(0,1fr) auto auto auto;gap:10px;align-items:center;padding:6px 10px;border-radius:12px;background:var(--stage-3);border-left:5px solid var(--pc,var(--gold))}
.lbrow.head{background:none;border:0;padding:0 10px;color:var(--muted);font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;font-weight:800}
.lbrow .rk{font-family:var(--f-clock);color:var(--gold)}
.lbrow .nm{font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lbrow .n{font-family:var(--f-clock);font-variant-numeric:tabular-nums;min-width:3.2ch;text-align:right}
.lbrow .n.w{color:var(--gold)}
.lbrow.t{grid-template-columns:2ch minmax(0,1fr) auto}
.lbempty{margin:auto;text-align:center;color:var(--muted);max-width:30ch}
.game.live .lbart{font-size:2.6rem;line-height:1}
`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* hub tile */
const hub=document.querySelector(".games");
const tile=document.createElement("button");tile.className="game live";tile.id="playLB";
tile.innerHTML=`<span class="art"><span class="lbart">🏆</span><span class="pill">View</span></span><h2>Leaderboard</h2><p>Most wins and highest scores for every game.</p>`;
hub.appendChild(tile);
hub.classList.remove("five","six");hub.classList.add("seven");

const app=$("app");
const sec=document.createElement("section");sec.className="screen";sec.id="lb";sec.hidden=true;
app.insertBefore(sec,$("overlay"));
let cur=MODES[0][0];
tile.onclick=()=>{ac();open()};
function open(){draw();show("lb")}
function draw(){
  const d=load();
  const used=MODES.filter(m=>d[m[0]]&&Object.keys(d[m[0]].players).length);
  if(!used.some(m=>m[0]===cur)&&used.length)cur=used[0][0];
  const info=MODES.find(m=>m[0]===cur),data=d[cur]||{players:{},top:[]};
  const rows=Object.values(data.players).sort((a,b)=>b.wins-a.wins||((b.best||0)-(a.best||0))||a.played-b.played);
  const unit=info[3];
  sec.innerHTML=`<div class="topbar"><button class="btn ghost" id="lbBack">← Back</button><h2>🏆 Leaderboard</h2><button class="btn ghost" id="lbClear"${rows.length?"":" disabled"}>Clear</button></div>
  <div class="lbtabs" id="lbTabs">${MODES.map(m=>`<button data-m="${m[0]}" aria-pressed="${m[0]===cur}">${m[1]} ${m[2]}</button>`).join("")}</div>
  <div class="lbgrid">
    <div class="lbpanel"><span class="eyebrow">Most wins</span>
      ${rows.length?`<div class="lbrow head"><span></span><span>Player</span><span style="text-align:right">Wins</span><span style="text-align:right">Played</span><span style="text-align:right">${cur.startsWith("floor")?"Win %":"Best"}</span></div>
      <div class="list">${rows.map((p,i)=>`<div class="lbrow" style="--pc:${p.color||"var(--gold)"}"><span class="rk">${i+1}</span><span class="nm">${esc(p.name)}</span><span class="n w">${p.wins}</span><span class="n">${p.played}</span><span class="n">${cur.startsWith("floor")?Math.round(p.wins/p.played*100)+"%":fmt(cur,p.best)}</span></div>`).join("")}</div>`
      :`<p class="lbempty">No games played here yet. Finish a game and the winners show up.</p>`}</div>
    <div class="lbpanel"><span class="eyebrow">Highest scores${unit==="wins"?"":" ("+(unit==="$"?"winnings":unit)+")"}</span>
      ${data.top.length?`<div class="list">${data.top.slice(0,10).map((t,i)=>`<div class="lbrow t" style="--pc:${t.color||"var(--gold)"}"><span class="rk">${i+1}</span><span class="nm">${esc(t.name)}</span><span class="n w">${fmt(cur,t.score)}</span></div>`).join("")}</div>`
      :`<p class="lbempty">${cur.startsWith("floor")?"The Floor is ranked by wins.":"Scores will appear here."}</p>`}</div>
  </div>`;
  $("lbBack").onclick=()=>show("hub");
  $("lbClear").onclick=()=>confirmSheet("Clear this board?","All wins and scores for "+info[2]+" will be erased.","Clear",()=>{const x=load();delete x[cur];store(x);closeOverlay();draw()});
  $("lbTabs").querySelectorAll("button").forEach(b=>b.onclick=()=>{cur=b.dataset.m;draw();const t=$("lbTabs").querySelector('[aria-pressed="true"]');t&&t.focus({preventScroll:true})});
  const t=$("lbTabs").querySelector('[aria-pressed="true"]');t&&t.scrollIntoView({inline:"center",block:"nearest"});
  setTimeout(()=>{t&&t.focus({preventScroll:true})},40);
}
window.LB={record,load};
})();
