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
    try{const d=S.duel;if(d&&d.state==="run"){const p=S.players[d[d.active]];return p?[p.name]:null}}catch(e){}
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
    const m=all.filter(p=>act.some(a=>sameName(a,p.name)));
    return {live:m.length?m:all,all,act:act[0],matched:m.length>0};
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
  const onSpeech=(p,m)=>{
    p.lastUid=Math.max(p.lastUid||0,m.uid||0);
    if(!p.live||(m.uid||0)<=(p.muteUid||0)||!voiceOn())return;
    const texts=(m.alts||[]).map(t=>String(t).trim()).filter(Boolean);if(!texts.length)return;
    try{micUI("on",texts[0])}catch(e){}
    try{V.handler(texts,!!m.f)}catch(e){console.error(e)}
  };
  // an answer was accepted: ignore whatever the phones are still saying from that moment
  const vm=window.voiceMark;
  if(typeof vm==="function")window.voiceMark=function(){LINK.phones.forEach(p=>{p.muteUid=p.lastUid||0});return vm.apply(this,arguments)};

  /* ---------- connections ---------- */
  const onConn=conn=>{
    conn.on("data",m=>{
      if(!m||typeof m!=="object")return;
      let p=LINK.phones.get(conn.peer);
      if(m.k==="join"){
        const old=[...LINK.phones.values()].find(x=>x.pid===m.pid);
        p=old||{pid:m.pid,lastUid:0,muteUid:0};
        if(old&&old.conn&&old.conn!==conn)try{old.conn.close()}catch(e){}
        p.conn=conn;p.name=String(m.name||"Player").slice(0,16);p.key="";LINK.phones.set(m.pid,p);conn.__pid=m.pid;
        send(p,{k:"hello",name:p.name});resend();paintChip();if(dlg.style.display==="flex")paintDlg();tick();return;
      }
      p=LINK.phones.get(conn.__pid);if(!p)return;
      if(m.k==="sp")onSpeech(p,m);
      else if(typeof LINK.onMessage==="function")LINK.onMessage(p,m);
    });
    conn.on("close",()=>{paintChip();if(dlg.style.display==="flex")paintDlg()});
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
