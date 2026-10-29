/* TV-show look for The Floor: flat colour blocks, no outlines or rounded cards, small caps type, no emojis. */
(function(){
  try{Object.values(CATS).forEach(c=>{c.icon=""})}catch(e){}
  const FONT='"Oxanium","Big Shoulders Display",Impact,sans-serif';
  const css=`
body #duel,body #floor{background:#0a1a7a}
body #duel::before,body #duel::after,body #floor::before,body #floor::after{display:none}
body #duel{padding:0;gap:0}
body #duel .topbar,body #duel .brandbar{display:none}
body #duel .duelgrid{gap:0;grid-template-columns:minmax(0,1fr) minmax(0,2.3fr) minmax(0,1fr);height:100%}
body #duel .side{border:0;border-radius:0;box-shadow:none;background:color-mix(in srgb,var(--pc) 30%,#06104a);opacity:1;gap:2.2vmin;padding:2vmin;justify-content:flex-start;padding-top:7vmin}
body #duel .side.active{background:var(--pc);box-shadow:none}
body #duel .side.idle{opacity:1}
body #duel .side.active .clock{text-shadow:none;color:#fff}
body #duel .side .who{font-size:clamp(.9rem,2.2vmin,1.4rem);letter-spacing:.18em;font-weight:800;color:#fff}
body #duel .side .role{font-size:clamp(.55rem,1.4vmin,.8rem);color:rgba(255,255,255,.75)}
body #duel .side .av{--s:clamp(70px,17vmin,150px);border-radius:0;padding:0;background:#fff;box-shadow:none}
body #duel .side .av img,body #duel .side .av .ini{border-radius:0}
body #duel .clock{font-family:${FONT};font-size:clamp(3.4rem,17vmin,10rem);font-weight:800;color:rgba(255,255,255,.9)}
body #duel .side.low .clock{color:#fff;background:#e5173f;padding:0 .12em}
body #duel .side .bar{width:100%;height:1.6vmin;border-radius:0;background:rgba(0,0,0,.35);margin-top:auto}
body #duel .side .bar i{background:#fff}
body #duel .center{gap:0;min-width:0;display:flex;flex-direction:column;min-height:0;background:#000}
body #duel .cathead{background:#fff;color:#0a1a7a;padding:1.4vmin 2vmin;display:flex;gap:1.6vmin;align-items:baseline;justify-content:center}
body #duel .cathead h3{font-family:${FONT};font-size:clamp(.9rem,2.4vmin,1.5rem);letter-spacing:.2em;text-shadow:none;color:#0a1a7a;margin:0}
body #duel .cathead .eyebrow{font-size:clamp(.55rem,1.5vmin,.8rem);letter-spacing:.2em;color:#4a55a8;order:2}
body #duel .card{border:0;border-radius:0;box-shadow:none;background:#000;flex:1}
body #duel .q.photo img{width:100%;height:100%;object-fit:cover}
body #duel .mic{background:#000;color:rgba(255,255,255,.6);font-size:.8rem;padding:.6vmin 0}
body #duel .reveal{font-family:${FONT};letter-spacing:.08em;text-transform:uppercase;border-radius:0}
body #duel .controls{display:none}
body #duel .minimap{background:#000;margin:1vmin auto;width:calc(var(--mc,4)*3vmin);gap:.5vmin;aspect-ratio:var(--mc,4)/var(--mr,3);display:grid;flex:none}
body #duel .minimap i{border-radius:0}
body #floor .board{border:0;box-shadow:none;border-radius:0;background:#000;transform:none}
body #floor button.cell{border-radius:0;background:var(--c);box-shadow:var(--edges)}
body #floor .cell .av{border-radius:0;--s:var(--cs,40px);box-shadow:none;background:#fff;padding:0}
body #floor .cell .av img,body #floor .cell .av .ini{border-radius:0}
body #sheet{border-radius:0;border:0;box-shadow:none;background:#04103f}
body .intro .av{border-radius:0;padding:0;box-shadow:none}
body .intro .av img,body .intro .av .ini{border-radius:0}
body #floor .cell .nm{font-size:clamp(.5rem,1.3vmin,.8rem);letter-spacing:.1em}
body #floor .floorwrap{perspective:none}
`;
  const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
})();
