/* Phone side of Game Night: joins the TV's game and acts as the player's controller / microphone. */
(function(){
  const $=id=>document.getElementById(id),q=new URLSearchParams(location.search);
  const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k)||"";localStorage.setItem(k,v)}catch(e){return ""}};
  let pid=ls("gn.pid");if(!pid){pid=Math.random().toString(36).slice(2,10);ls("gn.pid",pid)}
  $("code").value=(q.get("c")||ls("gn.joinCode")||"").toUpperCase();
  $("name").value=ls("gn.pname");
  /* ----- avatar maker ----- */
  const STYLES=[["avataaars","People"],["lorelei","Sketch"],["bottts","Robots"],["big-ears-neutral","Faces"]];
  const dice=(st,seed)=>"https://api.dicebear.com/9.x/"+st+"/svg?seed="+encodeURIComponent(seed)+"&radius=50";
  let av=null;try{av=JSON.parse(ls("gn.pav")||"null")}catch(e){}
  let style=(av&&av.style)||"avataaars",seeds=[];
  const newSeeds=()=>{seeds=Array.from({length:8},()=>Math.random().toString(36).slice(2,8))};newSeeds();
  if(!av)av={type:"cartoon",style,seed:seeds[0]};
  const avSrc=a=>a.type==="photo"?a.src:dice(a.style,a.seed);
  const paintAv=()=>{
    $("avimg").src=avSrc(av);
    $("avtabs").innerHTML="";STYLES.forEach(([s,l])=>{const b=document.createElement("button");b.className="mini"+(av.type==="cartoon"&&style===s?" on":"");b.textContent=l;b.onclick=()=>{style=s;av={type:"cartoon",style,seed:av.seed||seeds[0]};paintAv()};$("avtabs").appendChild(b)});
    $("avgrid").innerHTML="";seeds.forEach(sd=>{const b=document.createElement("button");b.className=av.type==="cartoon"&&av.seed===sd&&av.style===style?"on":"";b.innerHTML='<img alt="" src="'+dice(style,sd)+'">';b.onclick=()=>{av={type:"cartoon",style,seed:sd};paintAv()};$("avgrid").appendChild(b)});
  };
  $("avshuf").onclick=()=>{newSeeds();av={type:"cartoon",style,seed:seeds[0]};paintAv()};
  $("avcam").onclick=()=>$("avfile").click();
  $("avfile").onchange=e=>{
    const f=e.target.files&&e.target.files[0];if(!f)return;
    const im=new Image();im.onload=()=>{const c=document.createElement("canvas");c.width=c.height=128;const x=c.getContext("2d");const s=Math.min(im.width,im.height);x.drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,128,128);av={type:"photo",src:c.toDataURL("image/jpeg",.72)};paintAv();URL.revokeObjectURL(im.src)};
    im.src=URL.createObjectURL(f);
  };
  paintAv();
  setTimeout(()=>{const b=$("logb");if(b)b.onclick=()=>wantLog()},0);
  /* ----- log (for diagnosing problems) ----- */
  const T0=Date.now(),PL=[];
  const plog=(ev,d)=>{let x="";try{x=d===undefined?"":(typeof d==="string"?d:JSON.stringify(d))}catch(e){}const l=((Date.now()-T0)/1000).toFixed(2)+"s PHONE "+ev+" "+x;PL.push(l);if(PL.length>400)PL.shift();try{conn&&conn.open&&(ev==="rec onerror"||ev==="rec start"||ev==="rec end")&&conn.send({k:"plog",t:ev+" "+x})}catch(e){}};
  addEventListener("error",e=>plog("JSERROR",String(e.message)));
  const showLog=txt=>{
    const o=document.createElement("div");o.style.cssText="position:fixed;inset:0;z-index:9;background:#120c3c;display:flex;flex-direction:column;gap:10px;padding:14px";
    o.innerHTML='<b>Game Night log</b><textarea readonly style="flex:1;font:11px monospace;background:#000;color:#9fd;border-radius:8px;padding:8px"></textarea><div style="display:flex;gap:8px"><button class="mini on" id="lgCopy">Copy</button><button class="mini" id="lgClose">Close</button></div>';
    o.querySelector("textarea").value=txt;document.body.appendChild(o);
    o.querySelector("#lgClose").onclick=()=>o.remove();
    o.querySelector("#lgCopy").onclick=()=>{const t=o.querySelector("textarea");t.select();try{navigator.clipboard.writeText(t.value)}catch(e){document.execCommand("copy")}o.querySelector("#lgCopy").textContent="Copied ✓"};
  };
  let logBtn=null;
  const wantLog=()=>{if(conn&&conn.open)conn.send({k:"getlog"});else showLog("not connected\n"+PL.join("\n"))};
  const SRc=window.SpeechRecognition||window.webkitSpeechRecognition;
  let peer=null,conn=null,mode="wait",uid=0,rec=null,micOK=false,joined=false,retry=null;

  /* ----- microphone: runs only while the TV says it's this player's turn ----- */
  const words=t=>String(t||"").trim().toLowerCase().replace(/[^a-z0-9' ]+/g," ").split(/\s+/).filter(Boolean);
  let round=-1,cur={uid:0,words:[]},base={uid:-1,words:[]};
  const setRound=n=>{if(n===round)return;round=n;base={uid:cur.uid,words:cur.words.slice()};plog("round",n)};
  const runMic=()=>{
    if(!SRc||mode!=="mic"||!micOK||rec)return;
    const r=new SRc();rec=r;r.lang="en-AU";r.interimResults=true;r.continuous=true;r.maxAlternatives=3;
    let sess=0;
    r.onstart=()=>{sess=++uid;plog("rec start",{sess})};
    r.onresult=e=>{
      const res=e.results[e.results.length-1],raw=[];for(let i=0;i<res.length;i++)raw.push(res[i].transcript);
      const uidNow=sess*1000+(e.results.length-1);
      cur={uid:uidNow,words:words(raw[0])};
      // only the words spoken since the current question began
      const alts=raw.map(t=>{const w=words(t);if(uidNow<base.uid)return "";if(uidNow===base.uid)return w.slice(Math.min(base.words.length,w.length)).join(" ");return w.join(" ")}).filter(Boolean);
      plog("result",{uid:uidNow,f:res.isFinal?1:0,raw:raw[0],sent:alts[0]||null,round});
      if(!alts.length)return;
      $("heard").textContent=alts[0];
      if(conn&&conn.open)conn.send({k:"sp",n:round,f:res.isFinal?1:0,alts});
    };
    r.onerror=e=>{plog("rec onerror",e.error);if(e.error==="not-allowed"||e.error==="service-not-allowed"){micOK=false;$("st").textContent="Voice blocked ("+e.error+"). On iPhone: open this page in Safari, allow the microphone, and turn on Settings > General > Keyboard > Enable Dictation. Then reload."}};
    r.onend=()=>{plog("rec end");rec=null;if(mode==="mic"&&micOK)setTimeout(runMic,120)};
    try{r.start()}catch(e){rec=null;setTimeout(runMic,400)}
  };
  const setMode=(m,sub)=>{
    if(m==="mic"&&mode!=="mic")base={uid:cur.uid,words:cur.words.slice()};
    mode=m;document.body.classList.toggle("live",m==="mic");
    $("big").textContent=m==="mic"?"🎤":"⏳";
    $("st").textContent=sub||"";if(m!=="mic")$("heard").textContent="";
    if(m==="mic")runMic();else if(rec){try{rec.abort()}catch(e){}}
  };

  /* ----- the duel question mirrored from the TV ----- */
  const fmt=t=>t<10000?(t/1000).toFixed(1):String(Math.ceil(t/1000));
  const duel=m=>{
    const D=$("duel");if(!D||!$("pass"))return;
    if(m.off){D.classList.add("hide");$("play").classList.remove("hide");return}
    D.classList.remove("hide");$("play").classList.add("hide");
    [["a",$("pa")],["b",$("pb")]].forEach(([k,el])=>{
      const o=m[k];el.style.setProperty("--c",o.c);el.classList.toggle("on",m.active===k);
      el.querySelector("b").textContent=o.n;el.querySelector("i").textContent=fmt(o.t);el.querySelector("u").style.transform="scaleX("+Math.min(1,o.t/o.T)+")";
    });
    $("cat").textContent=m.cat;$("hint").textContent=m.hint||"";
    if(m.q){$("q").className=m.q.c;$("q").innerHTML=m.q.h;$("heard").textContent=""}
    const rv=$("rv");rv.className=m.rv?(m.rv.c.indexOf("ok")>-1?"ok":"pass"):"";rv.textContent=m.rv?m.rv.t:"";
    $("pass").disabled=!(mode==="mic"&&m.state==="run");
    $("dst").textContent=mode==="mic"?"🎤 Your turn — say the answer":($("st").textContent||"");
    $("dheard").textContent=mode==="mic"?$("heard").textContent:"";
  };
  if($("pass"))$("pass").onclick=()=>{if(conn&&conn.open)conn.send({k:"btn",id:"pass"})};

  /* ----- connection (keeps retrying if the TV or wifi blips) ----- */
  const ICE=[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun.cloudflare.com:3478"},{urls:["turn:openrelay.metered.ca:80","turn:openrelay.metered.ca:443"],username:"openrelayproject",credential:"openrelayproject"}];
  const cfg=()=>{const o={debug:0,config:{iceServers:ICE}};if(q.get("peerhost")){o.host=q.get("peerhost");o.port=+(q.get("peerport")||9000);o.secure=false;o.path="/"}return o};
  const target=()=>"gnight-"+$("code").value.trim().toUpperCase();
  const dial=()=>{
    try{conn&&conn.close()}catch(e){}
    conn=peer.connect(target(),{reliable:true});
    const c=conn;
    c.on("open",()=>{c.send({k:"join",pid,name:$("name").value.trim()||"Player",av});joined=true;$("who").textContent=$("name").value.trim()||"Player";net("linked")});
    c.on("data",m=>{if(m&&m.k==="round")return setRound(m.n);if(m&&m.n!==undefined&&m.k==="ui")setRound(m.n);if(m&&m.k==="log")return showLog(m.text+"\n\n--- phone side ---\n"+PL.join("\n"));if(m&&m.k==="duel")return duel(m);if(m&&m.k==="ui")setMode(m.mode,m.sub);else if(m&&m.k==="hello"){$("st").textContent="You're in! Watch the TV."}});
    c.on("close",()=>{if(c!==conn)return;net("link lost");setMode("wait","Reconnecting…");retry=setTimeout(connect,1500)});
    c.on("error",()=>{});
    // a connection that never opens is retried
    setTimeout(()=>{if(c===conn&&!c.open){net("retrying");connect()}},9000);
  };
  const connect=()=>{
    clearTimeout(retry);
    if(peer&&!peer.destroyed&&!peer.disconnected&&peer.open){dial();return}
    try{peer&&peer.destroy()}catch(e){}
    peer=new Peer(undefined,cfg());
    peer.on("open",dial);
    peer.on("disconnected",()=>{try{peer.reconnect()}catch(e){}});
    peer.on("error",e=>{
      if(e&&e.type==="peer-unavailable"){$("st").textContent=joined?"Reconnecting…":"Can't find that TV code. Check the code on the TV screen.";if(!joined){$("join").classList.remove("hide");$("play").classList.add("hide")}}
      net("error: "+(e&&e.type));retry=setTimeout(connect,2500);
    });
  };
  const net=t=>{const n=$("net");if(n)n.textContent=t;plog("net",t)};
  $("go").onclick=()=>{
    const code=$("code").value.trim().toUpperCase(),name=$("name").value.trim();
    if(code.length!==4){$("code").focus();return}
    if(!name){$("name").focus();return}
    ls("gn.pname",name);try{ls("gn.pav",JSON.stringify(av))}catch(e){}$("myav").src=avSrc(av);$("myav").classList.remove("hide");ls("gn.joinCode",code);
    $("join").classList.add("hide");$("play").classList.remove("hide");
    $("st").textContent="Connecting…";
    // ask for the mic now, while we have a tap, so it never interrupts a turn
    if(SRc){micOK=true}
    if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){navigator.mediaDevices.getUserMedia({audio:true}).then(s=>{s.getTracks().forEach(t=>t.stop())}).catch(()=>{})}
    try{navigator.wakeLock&&navigator.wakeLock.request("screen").catch(()=>{})}catch(e){}
    if(!SRc)$("st").textContent="This browser can't do voice – use Safari (iPhone) or Chrome (Android).";
    connect();
  };
  document.addEventListener("visibilitychange",()=>{if(!document.hidden&&joined&&(!conn||!conn.open))connect()});
})();
