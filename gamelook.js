/* Distinct TV-show looks for the other games: flat colour blocks, no outlines or rounded cards, small caps type.
   Higher or Lower = green card table, Price Is Right = blue/yellow/red set, Name Ten = teal answer board, Picture Blitz = black studio. */
(function(){
  const F='"Oxanium","Big Shoulders Display",Impact,sans-serif';
  const css=`
/* ---------- shared ---------- */
body #hl,body #nt,body #pb,body #cd{padding:0;gap:0;background-image:none}
body #hl .floorbar,body #nt .floorbar,body #pb .floorbar,body #cd .floorbar{padding:1.2vmin 2vmin;gap:2vmin;flex:none}
body #hl .brand,body #nt .brand,body #pb .brand,body #cd .brand{font-family:${F};letter-spacing:.2em;font-size:clamp(.8rem,2vmin,1.2rem)}
body #hl .brand small,body #nt .brand small,body #pb .brand small,body #cd .brand small{letter-spacing:.3em}
body #hl .btn,body #nt .btn,body #pb .btn,body #cd .btn{border-radius:0;border:0;box-shadow:none;font-family:${F};letter-spacing:.14em;text-transform:uppercase}
body #hl .btn.ghost,body #nt .btn.ghost,body #pb .btn.ghost,body #cd .btn.ghost{background:rgba(0,0,0,.35)}
body #hl .av,body #nt .av,body #pb .av,body #cd .av{border-radius:0;padding:0;box-shadow:none;background:#fff}
body #hl .av img,body #hl .av .ini,body #nt .av img,body #nt .av .ini,body #pb .av img,body #pb .av .ini,body #cd .av img,body #cd .av .ini{border-radius:0}
body #hl .eyebrow,body #nt .eyebrow,body #pb .eyebrow,body #cd .eyebrow{font-family:${F};letter-spacing:.22em;font-weight:800}
body #hl .mic,body #nt .mic,body #pb .mic,body #cd .mic{font-size:.8rem;opacity:.8}

body #hl .btn.gold{background:#ffd400;color:#14301e}body #nt .btn.gold{background:#c6ff3d;color:#033b40}body #pb .btn.gold{background:#19e3ff;color:#000}body #cd .btn.gold{background:#ffd400;color:#0d2fb0}
body #hl :focus-visible,body #nt :focus-visible,body #pb :focus-visible,body #cd :focus-visible{outline:.5vmin solid #fff;outline-offset:-.5vmin}
body #nt input:focus,body #pb input:focus{outline:.5vmin solid #fff;outline-offset:-.5vmin;box-shadow:none}
/* ---------- Higher or Lower: green felt, white cards, pink/yellow bars ---------- */
body #hl{background:#0a5c34}
body #hl .hlgrid{gap:0;grid-template-columns:minmax(0,1fr) minmax(0,2.4fr) minmax(0,1fr)}
body #hl .hlp{border:0;border-radius:0;box-shadow:none;background:color-mix(in srgb,var(--pc) 35%,#05341e);gap:2vmin;justify-content:flex-start;padding-top:8vmin}
body #hl .hlp.active{background:var(--pc);box-shadow:none}
body #hl .hlp.idle{opacity:1}
body #hl .hlp .who{font-family:${F};font-size:clamp(.9rem,2.4vmin,1.5rem);letter-spacing:.2em;text-transform:uppercase;color:#fff}
body #hl .hlp .pts{font-family:${F};color:#fff}
body #hl .hlp .role{color:rgba(255,255,255,.7)}
body #hl .hlp .av{--s:clamp(70px,16vmin,140px)}
body #hl .table{background:#0a5c34;gap:0}
body #hl .table .info{background:#ffd400;color:#14301e;padding:1.6vmin 2vmin;text-align:center}
body #hl .table .info .eyebrow{color:#14301e}
body #hl .table .info h3{font-family:${F};font-size:clamp(1.2rem,4vmin,2.4rem);letter-spacing:.06em;margin:.1em 0 0;color:#14301e;text-transform:uppercase}
body #hl .cards{background:#0a5c34}
body #hl .pcard{border-radius:0}
body #hl .pcard.face{background:#fff;box-shadow:none}
body #hl .pcard.back{background:repeating-linear-gradient(45deg,#d4145a 0 14px,#a30e45 14px 28px);border:0;box-shadow:none}
body #hl .pcard.back b{border-radius:0;background:#fff;color:#d4145a}
body #hl .pcard.right{box-shadow:0 0 0 1.4vmin #16c784}body #hl .pcard.wrong{box-shadow:0 0 0 1.4vmin #e5173f}body #hl .pcard.same{box-shadow:0 0 0 1.4vmin #ffd400}
body #hl .hlres{font-family:${F};letter-spacing:.1em;text-transform:uppercase;background:#06391f;padding:.8vmin 0;min-height:1.6em}
body.hasph #hl .hlbtns{display:none}
body #hl .hlbtns .btn{font-size:clamp(1rem,3vmin,1.8rem);padding:1.2vmin 5vmin}
body #hl .btn.hi{background:#16c784;color:#022}body #hl .btn.lo{background:#e5173f;color:#fff}
body #hl .tracker{background:#06391f;padding:1vmin 2vmin;gap:.5vmin}
body #hl .tracker div{border-radius:0;background:transparent}

/* ---------- The Price Is Right: royal blue set, yellow banners, red numbers ---------- */
body #cd{background:#0d2fb0}
body #cd .cdscore{background:#091f7a;padding:.8vmin 1vmin;gap:.6vmin;flex:none}
body #cd .cdchip{border:0;border-radius:0;box-shadow:none;background:color-mix(in srgb,var(--pc) 35%,#091f7a);padding:.5vmin 1.4vmin .5vmin .5vmin}
body #cd .cdchip.on{background:var(--pc)}
body #cd .cdchip span{color:#fff;font-family:${F}}
body #cd .cdstage{padding:1.4vmin 2vmin}
body #cd .cdhead{background:#ffd400;color:#0d2fb0;padding:1.2vmin 3vmin;width:100%}
body #cd .cdhead .eyebrow,body #cd .cdhead p,body #cd .cdhead h2{color:#0d2fb0}
body #cd .cdhead h2{font-family:${F};text-transform:uppercase;letter-spacing:.04em}
body #cd .prize{border-radius:0;box-shadow:none;background:#fff;border:0;color:#0d2fb0}
body #cd .prize .rt{border-radius:0;background:#e5173f;color:#fff}
body #cd .prize .pr{color:#e5173f;font-family:${F}}
body #cd .prize .pr.hid{border-radius:0;background:repeating-linear-gradient(90deg,#c8d0f0 0 10px,#b3bde8 10px 20px)}
body #cd button.prize:focus-visible,body #cd button.prize.sel{outline:.8vmin solid #ffd400;outline-offset:-.8vmin}
body #cd .entry{background:#091f7a;padding:1.4vmin;border-radius:0;border:0}
body #cd .entry .disp{font-family:${F};color:#ffd400;background:#000;border-radius:0}
body #cd .keypad button{border-radius:0;border:0;background:#fff;color:#0d2fb0;font-family:${F}}
body #cd .keypad button.go{background:#e5173f;color:#fff}
body #cd .bid{border-radius:0;border:0;background:#091f7a}
body #cd .cdmsg{font-family:${F};letter-spacing:.06em}
body #cd .digits button,body #cd .cdrow button,body #cd button.btn{border-radius:0}

/* ---------- Name Ten: dark teal board with ten flat answer tiles ---------- */
body #nt{background:#033b40}
body #nt .cdscore{background:#02272b;padding:.8vmin 1vmin;gap:.6vmin;flex:none}
body #nt .cdchip{border:0;border-radius:0;box-shadow:none;background:color-mix(in srgb,var(--pc) 35%,#02272b);padding:.5vmin 1.4vmin .5vmin .5vmin}
body #nt .cdchip.on{background:var(--pc)}
body #nt .cdchip span{color:#fff;font-family:${F}}
body #nt .ntstage{padding:1.4vmin 2vmin}
body #nt .nthead h2{font-family:${F};text-transform:uppercase;letter-spacing:.04em;color:#c6ff3d;background:#02272b;padding:.8vmin 3vmin;margin:0;width:100%}
body #nt .nthead .eyebrow{color:#c6ff3d}
body #nt .ntclock{font-family:${F};color:#c6ff3d}
body #nt .ntclock.low{color:#fff;background:#e5173f;padding:0 .2em}
body #nt .ntbar{border-radius:0;height:1.6vmin;background:#02272b}
body #nt .ntbar i{background:#c6ff3d}
body #nt .ntcount{font-family:${F};color:#fff}
body #nt .ntslots{gap:.6vmin;width:100%}
body #nt .ntslot{border:0;border-radius:0;background:#02272b;color:rgba(255,255,255,.5);min-height:clamp(44px,11vh,96px)}
body #nt .ntslot i{border-radius:0;background:#033b40;color:#c6ff3d}
body #nt .ntslot.hit{background:var(--pc,#c6ff3d);color:#fff;animation:popin .3s ease-out}
body #nt .ntslot.hit i{background:#fff;color:#033b40}
body #nt .ntinput input{border:0;border-radius:0;background:#02272b;color:#fff}
body #nt .ntchip{border-radius:0}body #nt .ntchip.ok{background:#c6ff3d;color:#033b40}
body #nt .ntbig{font-family:${F};color:#c6ff3d}
body #nt .ntrank .r{border:0;border-radius:0;background:#02272b}body #nt .ntrank .r.win{background:#c6ff3d;color:#033b40;box-shadow:none}
body #nt .ntrank .r.win em,body #nt .ntrank .r.win b{color:#033b40!important}

/* ---------- Picture Blitz: black studio, full-width photo, pink and cyan bars ---------- */
body #pb{background:#0b0b12}
body #pb .pbscore{background:#000;padding:.8vmin 1vmin;gap:.6vmin;flex:none}
body #pb .pbchip{border:0;border-radius:0;box-shadow:none;background:color-mix(in srgb,var(--pc) 35%,#000);padding:.5vmin 1.4vmin .5vmin .5vmin}
body #pb .pbchip.on{background:var(--pc)}
body #pb .pbchip span{color:#fff;font-family:${F}}
body #pb .pbstage{padding:0;gap:0;justify-content:flex-start}
body #pb .pbstage>:first-child{margin-top:0}
body #pb .pbhead h2{font-family:${F};text-transform:uppercase;letter-spacing:.06em;color:#fff;background:#ff2d95;padding:1vmin 3vmin;margin:0;width:100%}
body #pb .pbhead .eyebrow{color:#ff2d95;padding-top:1vmin}
body #pb .pbhead p{color:rgba(255,255,255,.75)}
body #pb .pbframe{border:0;border-radius:0;background:#000;width:100%;padding:0}
body #pb .pbframe canvas{border-radius:0}
body #pb .pbrow{width:100%;padding:0;gap:0;background:#000}
body #pb .pbpts{font-family:${F};color:#fff;background:#ff2d95;padding:.4vmin 2vmin;min-width:0}
body #pb .pbbar{border-radius:0;height:2.4vmin;background:#1a1a26}
body #pb .pbbar i{background:#19e3ff}
body #pb .pbans{font-family:${F};color:#19e3ff;text-transform:uppercase;letter-spacing:.06em}
body #pb .pbbig{font-family:${F};color:#ff2d95}
body #pb .pbinput input{border:0;border-radius:0;background:#1a1a26;color:#fff}
body #pb .pbgroups button{border-radius:0}
body #pb .ntrank .r{border:0;border-radius:0;background:#1a1a26}body #pb .ntrank .r.win{background:#ff2d95;color:#fff;box-shadow:none}
body #pb .ntrank .r.win em,body #pb .ntrank .r.win b{color:#fff!important}
`;
  const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
})();
