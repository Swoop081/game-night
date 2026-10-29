/* Phones as controllers (host side, runs on the TV).
   Phones open join.html?c=CODE, enter a name, and connect straight to this page over WebRTC (PeerJS, free public signalling).
   Step 1: each player's phone is their microphone — only the player whose turn it is gets a live mic. */
(function(){
  const q=new URLSearchParams(location.search);
  const TV=/GameNightTV/.test(navigator.userAgent);
  if(!TV&&!q.get("host"))return;
  const ICE=[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun.cloudflare.com:3478"},{urls:["turn:openrelay.metered.ca:80","turn:openrelay.metered.ca:443"],username:"openrelayproject",credential:"openrelayproject"}];
  const cfg=()=>{const o={debug:0,config:{iceServers:ICE}};if(q.get("peerhost")){o.host=q.get("peerhost");o.port=+(q.get("peerport")||9000);o.secure=false;o.path="/"}return o};
  const ALPHA="ABCDEFGHJKMNPQRSTUVWXYZ";
  const rnd=()=>Array.from({length:4},()=>ALPHA[Math.floor(Math.random()*ALPHA.length)]).join("");
  let code="";try{code=localStorage.getItem("gn.joinCode")||""}catch(e){}
  if(!/^[A-Z]{4}$/.test(code))code=rnd();
  let orderSeq=0;
  const LINK=window.LINK={code,phones:new Map(),ready:false};   // phones: pid -> {pid,name,conn,live,lastUid,muteUid,mode}
  const css=(el,s)=>{el.style.cssText=s;return el};
  const base=location.origin+location.pathname.replace(/[^\/]*$/,"");
  const joinUrl=()=>base+"join.html?c="+LINK.code+(q.get("peerhost")?"&peerhost="+q.get("peerhost")+"&peerport="+(q.get("peerport")||9000):"");

  /* ---------- pairing chip + dialog ---------- */
  const chip=css(document.createElement("div"),"position:fixed;left:10px;bottom:8px;z-index:9000;background:rgba(20,12,60,.85);border:1px solid rgba(255,255,255,.25);color:#fff;font:600 12px system-ui,sans-serif;padding:6px 12px;border-radius:999px;cursor:pointer;max-width:70vw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis");
  chip.tabIndex=0;
  const dlg=css(document.createElement("div"),"position:fixed;inset:0;z-index:99998;background:rgba(10,6,40,.95);color:#fff;font-family:system-ui,sans-serif;display:none;flex-direction:column;align-items:center;justify-content:center;gap:12px;text-align:center;padding:20px");
  const paintChip=()=>{const n=[...LINK.phones.values()].filter(p=>p.conn&&p.conn.open);
    chip.textContent=n.length?"📱 "+n.map(p=>p.name).join(", "):(LINK.ready?"📱 Join with phones · code "+LINK.code+" · press a colour button":"📱 Phones: connecting…");
    chip.style.borderColor=n.length?"#5dffa0":"rgba(255,255,255,.25)"};
  const paintDlg=()=>{
    const n=[...LINK.phones.values()].filter(p=>p.conn&&p.conn.open);
    dlg.innerHTML='<div style="font-size:2rem;font-weight:800">Join with your phone</div><img alt="" width="210" height="210" style="background:#fff;padding:10px;border-radius:12px"><div>Scan the code, or open <b style="color:#ffd84a">'+base.replace(/^https?:\/\//,"")+'join.html</b> and enter <b style="color:#ffd84a;font-size:1.4rem;letter-spacing:.2em">'+LINK.code+'</b></div><div style="opacity:.9;font-size:1.1rem">'+(n.length?"Joined: "+n.map(p=>p.name).join(" · "):"Nobody has joined yet")+'</div><div style="opacity:.6">Press Back to close</div>';
    dlg.querySelector("img").src="https://api.qrserver.com/v1/create-qr-code/?size=210x210&data="+encodeURIComponent(joinUrl());
  };
  const toggle=()=>{if(dlg.style.display==="flex")dlg.style.display="none";else{paintDlg();dlg.style.display="flex"}};
  const mount=()=>{document.body.appendChild(chip);document.body.appendChild(dlg);paintChip()};
  if(document.body)mount();else addEventListener("DOMContentLoaded",mount);
  LINK.toggle=toggle;
  // remote-friendly: a focusable button on the hub, plus colour / menu keys anywhere
  const hubBtn=document.createElement("button");hubBtn.className="btn";hubBtn.id="phonesBtn";hubBtn.textContent="📱 Phones";
  hubBtn.style.cssText="position:absolute;top:12px;left:16px;z-index:5;font-size:.85rem;padding:8px 16px";hubBtn.onclick=toggle;
  const hubEl=()=>document.getElementById("hub");
  const mountHub=()=>{const h=hubEl();if(h&&!hubBtn.parentNode)h.appendChild(hubBtn)};
  mountHub();addEventListener("DOMContentLoaded",mountHub);setTimeout(mountHub,500);
  document.addEventListener("keydown",e=>{if([403,404,405,406,183,184,185,186,82,93].includes(e.keyCode)||e.key==="ContextMenu"||e.key==="p"&&e.altKey){e.preventDefault();toggle()}},true);
  const ob=window.__gnBack;
  window.__gnBack=function(){if(dlg.style.display==="flex"){dlg.style.display="none";return true}return ob?ob.apply(this,arguments):false};
  chip.onclick=toggle;chip.onkeydown=e=>{if(e.key==="Enter")toggle()};
  document.addEventListener("keydown",e=>{if(dlg.style.display==="flex"&&(e.key==="Escape"||e.key==="Backspace"||e.keyCode===4)){dlg.style.display="none";e.preventDefault();e.stopPropagation()}},true);

  /* ---------- sending ---------- */
  const send=(p,o)=>{try{p.conn&&p.conn.open&&p.conn.send(o)}catch(e){}};
  LINK.broadcast=o=>LINK.phones.forEach(p=>send(p,o));
  LINK.send=send;

  /* ---------- whose turn is it? (names of the players whose phones should have a live mic, or null = everyone) ---------- */
  const activeNames=()=>{
    try{const d=S.duel;if(d&&d.state==="run"){const p=S.players[d[d.active]];return p?(p.pid?{pid:p.pid,name:p.name}:[p.name]):null}}catch(e){}
    try{if(typeof HL!=="undefined"&&HL&&!HL.over&&HL.players&&HL.players[HL.turn])return [HL.players[HL.turn].name]}catch(e){}
    return null;
  };
  const norm1=s=>String(s||"").trim().toLowerCase();
  const initials=s=>norm1(s).split(/\s+/).map(w=>w[0]).join("");
  const sameName=(a,b)=>{const x=norm1(a),y=norm1(b);if(!x||!y)return false;if(x===y)return true;if(initials(a)===y||initials(b)===x)return true;if(x.length>=2&&y.length>=2&&(x.startsWith(y)||y.startsWith(x)))return true;return x.split(/\s+/)[0]===y.split(/\s+/)[0]};
  const voiceOn=()=>{try{return !!(V&&V.on&&V.handler)}catch(e){return false}};
  const whoLive=()=>{
    const all=[...LINK.phones.values()].filter(p=>p.conn&&p.conn.open);
    if(!voiceOn())return {live:[],all};
    const act=activeNames();
    if(!act)return {live:all,all};
    const byPid=act.pid?all.filter(p=>p.pid===act.pid):[];
    const m=byPid.length?byPid:all.filter(p=>[].concat(act.pid?[act.name]:act).some(a=>sameName(a,p.name)));
    return {live:m.length?m:all,all,act:act.pid?act.name:act[0],matched:m.length>0};
  };
  const tick=()=>{
    const {live,all,act,matched}=whoLive();
    all.forEach(p=>{
      const on=live.includes(p);
      const mode=on?"mic":"wait";
      const sub=on?(act&&matched?"Your turn — say your answer":"Say your answer"):(voiceOn()?(act?act+" is answering":"Waiting…"):"Watch the TV");
      const key=mode+"|"+sub;
      if(p.key!==key){p.key=key;send(p,{k:"ui",mode,sub})}
      p.live=on;
    });
  };
  setInterval(tick,400);

  /* ---------- mirror the duel question to every phone ---------- */
  let lastQ="",duelOn=false;
  const mirror=()=>{
    let d=null;try{d=S.duel}catch(e){}
    if(!d||!d.q){if(duelOn){duelOn=false;LINK.broadcast({k:"duel",off:1})}return}
    duelOn=true;
    const pa=S.players[d.a],pb=S.players[d.b],cat=CATS[d.cat],rv=document.getElementById("reveal"),qe=document.getElementById("q");
    const qk=qe.className+"|"+qe.innerHTML;
    const m={k:"duel",cat:cat.icon+" "+cat.name,hint:cat.hint,state:d.state,active:d.active,
      a:{n:pa.name,t:Math.max(0,d.t.a),T:d.T.a,c:pa.color},b:{n:pb.name,t:Math.max(0,d.t.b),T:d.T.b,c:pb.color},
      rv:rv&&rv.classList.contains("show")?{c:rv.className,t:rv.textContent}:null};
    if(qk!==lastQ){lastQ=qk;m.q={c:qe.className,h:qe.innerHTML}}
    LINK.broadcast(m);
  };
  setInterval(mirror,250);
  LINK.onMessage=(p,m)=>{if(m.k==="btn"&&m.id==="pass"&&p.live){try{if(S.duel&&S.duel.state==="run")hostPass()}catch(e){}}};
  const resend=()=>{lastQ=""};

  /* ---------- speech from phones feeds the same pipeline as the TV's own mic ---------- */
  const wordsOf=t=>norm1(t).replace(/[^a-z0-9' ]+/g," ").split(/\s+/).filter(Boolean);
  const onSpeech=(p,m)=>{
    const uid=m.uid||0;p.lastUid=Math.max(p.lastUid||0,uid);
    let texts=(m.alts||[]).slice(0,2).map(t=>String(t).trim()).filter(Boolean);if(!texts.length)return;
    p.lastText=texts[0];
    if(!p.live||!voiceOn())return;
    // same utterance as an answer we already took: iOS keeps adding to one running transcript, so only look at the new words
    if(uid<=(p.muteUid||0)){
      const st=p.stale||[];
      texts=texts.map(t=>{const w=wordsOf(t);for(let i=0;i<st.length;i++)if(w[i]!==st[i])return "";return w.slice(st.length).join(" ")}).filter(Boolean);
      if(!texts.length)return;
    }
    // unfinished guesses must hold steady for a moment before they count (stops flickery mis-hears from scoring)
    if(!m.f){const k=norm1(texts[0]),now=Date.now();if(!(p.prevK===k&&now-(p.prevT||0)<1500)){p.prevK=k;p.prevT=now;try{micUI("on",texts[0])}catch(e){}return}}
    try{micUI("on",texts[0])}catch(e){}
    try{V.handler(texts,!!m.f)}catch(e){console.error(e)}
  };
  // an answer was accepted: ignore whatever the phones are still saying from that moment
  const vm=window.voiceMark;
  if(typeof vm==="function")window.voiceMark=function(){LINK.phones.forEach(p=>{p.muteUid=p.lastUid||0;p.stale=wordsOf(p.lastText||"");p.prevK=""});return vm.apply(this,arguments)};

  /* ---------- lobby: phones are the players, in the order they joined ---------- */
  const lobby=()=>[...LINK.phones.values()].filter(p=>p.conn&&(p.conn.open||Date.now()-(p.closedAt||0)<60000)).sort((a,b)=>a.order-b.order);
  LINK.lobby=lobby;
  let sig="";
  const syncLobby=()=>{
    const el=document.getElementById("setup");if(!el||el.hidden)return;
    const L=lobby();
    const k=JSON.stringify(L.map(p=>[p.pid,p.name,p.av?(p.av.src?p.av.src.length:p.av.style+p.av.seed):0]));
    if(k===sig)return;sig=k;if(!L.length)return;
    S.pids=S.pids||[];S.avatars=S.avatars||[];
    S.count=Math.min(20,Math.max(2,L.length));
    L.slice(0,20).forEach((p,i)=>{S.names[i]=p.name;S.pids[i]=p.pid;if(p.av)S.avatars[i]=p.av});
    for(let i=L.length;i<S.count;i++)S.pids[i]=null;
    renderSetup();
  };
  setInterval(syncLobby,700);
  const rs=window.renderSetup;
  if(typeof rs==="function")window.renderSetup=function(){
    const r=rs.apply(this,arguments);
    try{
      const n=Math.min(20,lobby().length);
      document.querySelectorAll("#players .prow").forEach((row,i)=>{
        if(i<n){const inp=row.querySelector("input");if(inp){inp.readOnly=true;inp.title="Name comes from the player's phone"}
          if(!row.querySelector(".phb")){const b=document.createElement("span");b.className="phb";b.textContent="📱";b.style.cssText="font-size:1.1rem;opacity:.85";row.appendChild(b)}}
      });
      const mi=document.getElementById("minus"),pl=document.getElementById("plus");
      if(n>=2){mi&&(mi.disabled=true);pl&&(pl.disabled=true)}
    }catch(e){}
    return r;
  };
  // players know which phone is theirs
  const sg=window.startGame;
  if(typeof sg==="function")window.startGame=function(){const r=sg.apply(this,arguments);try{(S.players||[]).forEach((p,i)=>{p.pid=(S.pids&&S.pids[i])||null})}catch(e){}return r};
  // a join button on the setup screen
  const setupBtn=document.createElement("button");setupBtn.className="btn";setupBtn.textContent="📱 Join with phones";setupBtn.onclick=()=>toggle();
  setupBtn.style.cssText="margin-left:auto;margin-right:12px";
  const mountSetup=()=>{const tb=document.querySelector("#setup .topbar");if(tb&&!setupBtn.parentNode){const start=document.getElementById("startGame");tb.insertBefore(setupBtn,start||null)}};
  setTimeout(mountSetup,300);

  /* ---------- connections ---------- */
  const onConn=conn=>{
    conn.on("data",m=>{
      if(!m||typeof m!=="object")return;
      let p=LINK.phones.get(conn.peer);
      if(m.k==="join"){
        const old=[...LINK.phones.values()].find(x=>x.pid===m.pid);
        p=old||{pid:m.pid,lastUid:0,muteUid:0,order:++orderSeq};
        p.av=m.av||p.av;p.closedAt=0;
        if(old&&old.conn&&old.conn!==conn)try{old.conn.close()}catch(e){}
        p.conn=conn;p.name=String(m.name||"Player").slice(0,16);p.key="";LINK.phones.set(m.pid,p);conn.__pid=m.pid;
        send(p,{k:"hello",name:p.name});resend();paintChip();if(dlg.style.display==="flex")paintDlg();tick();return;
      }
      p=LINK.phones.get(conn.__pid);if(!p)return;
      if(m.k==="sp")onSpeech(p,m);
      else if(typeof LINK.onMessage==="function")LINK.onMessage(p,m);
    });
    conn.on("close",()=>{const q=LINK.phones.get(conn.__pid);if(q&&q.conn===conn)q.closedAt=Date.now();paintChip();if(dlg.style.display==="flex")paintDlg()});
    conn.on("error",()=>{});
  };
  const start=()=>{
    if(!window.Peer)return;
    const peer=new Peer("gnight-"+LINK.code,cfg());
    peer.on("open",()=>{LINK.ready=true;try{localStorage.setItem("gn.joinCode",LINK.code)}catch(e){}paintChip()});
    peer.on("connection",onConn);
    peer.on("error",e=>{
      if(e&&e.type==="unavailable-id"){LINK.code=rnd();try{peer.destroy()}catch(_){}setTimeout(start,300)}
      else if(e&&(e.type==="network"||e.type==="server-error"||e.type==="socket-error"||e.type==="socket-closed")){LINK.ready=false;paintChip();setTimeout(()=>{try{if(peer.destroyed){start()}else if(peer.disconnected){peer.reconnect()}}catch(_){}},4000)}
    });
    peer.on("disconnected",()=>{LINK.ready=false;paintChip();setTimeout(()=>{try{peer.reconnect()}catch(e){}},1500)});
    peer.on("close",()=>{setTimeout(start,1500)});
    LINK.peer=peer;
  };
  const s=document.createElement("script");s.src="peerjs.min.js";s.onload=start;document.head.appendChild(s);
})();
