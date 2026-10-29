/* Phone side of Game Night: joins the TV's game and acts as the player's controller / microphone. */
(function(){
  const $=id=>document.getElementById(id),q=new URLSearchParams(location.search);
  const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k)||"";localStorage.setItem(k,v)}catch(e){return ""}};
  let pid=ls("gn.pid");if(!pid){pid=Math.random().toString(36).slice(2,10);ls("gn.pid",pid)}
  $("code").value=(q.get("c")||ls("gn.joinCode")||"").toUpperCase();
  $("name").value=ls("gn.pname");
  const SRc=window.SpeechRecognition||window.webkitSpeechRecognition;
  let peer=null,conn=null,mode="wait",uid=0,rec=null,micOK=false,joined=false,retry=null;

  /* ----- microphone: runs only while the TV says it's this player's turn ----- */
  const runMic=()=>{
    if(!SRc||mode!=="mic"||!micOK||rec)return;
    const r=new SRc();rec=r;r.lang="en-AU";r.interimResults=true;r.continuous=false;r.maxAlternatives=3;
    let mine=0;
    r.onstart=()=>{mine=++uid};
    r.onresult=e=>{
      const res=e.results[e.results.length-1],alts=[];for(let i=0;i<res.length;i++)alts.push(res[i].transcript);
      $("heard").textContent=alts[0];
      if(conn&&conn.open)conn.send({k:"sp",uid:mine,alts,f:res.isFinal?1:0});
    };
    r.onerror=e=>{if(e.error==="not-allowed"||e.error==="service-not-allowed"){micOK=false;$("st").textContent="Microphone is blocked. Allow it in your browser settings and reload."}};
    r.onend=()=>{rec=null;if(mode==="mic"&&micOK)setTimeout(runMic,120)};
    try{r.start()}catch(e){rec=null;setTimeout(runMic,400)}
  };
  const setMode=(m,sub)=>{
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
    if(m.q){$("q").className=m.q.c;$("q").innerHTML=m.q.h}
    const rv=$("rv");rv.className=m.rv?(m.rv.c.indexOf("ok")>-1?"ok":"pass"):"";rv.textContent=m.rv?m.rv.t:"";
    $("pass").disabled=!(mode==="mic"&&m.state==="run");
    $("dst").textContent=mode==="mic"?"🎤 Your turn — say the answer":($("st").textContent||"");
    $("dheard").textContent=mode==="mic"?$("heard").textContent:"";
  };
  if($("pass"))$("pass").onclick=()=>{if(conn&&conn.open)conn.send({k:"btn",id:"pass"})};

  /* ----- connection (keeps retrying if the TV or wifi blips) ----- */
  const cfg=()=>{const o={debug:0};if(q.get("peerhost")){o.host=q.get("peerhost");o.port=+(q.get("peerport")||9000);o.secure=false;o.path="/"}return o};
  const connect=()=>{
    clearTimeout(retry);
    try{peer&&peer.destroy()}catch(e){}
    peer=new Peer(undefined,cfg());
    peer.on("open",()=>{
      conn=peer.connect("gnight-"+$("code").value.trim().toUpperCase(),{reliable:true});
      conn.on("open",()=>{conn.send({k:"join",pid,name:$("name").value.trim()||"Player"});joined=true;$("who").textContent=$("name").value.trim()||"Player"});
      conn.on("data",m=>{if(m&&m.k==="duel")return duel(m);if(m&&m.k==="ui")setMode(m.mode,m.sub);else if(m&&m.k==="hello"){$("st").textContent="You're in! Watch the TV."}});
      conn.on("close",()=>{setMode("wait","Reconnecting…");retry=setTimeout(connect,2000)});
      conn.on("error",()=>{});
    });
    peer.on("error",e=>{
      if(e&&e.type==="peer-unavailable"){$("st").textContent=joined?"Reconnecting…":"Can't find that TV code. Check the code on the TV screen.";if(!joined){$("join").classList.remove("hide");$("play").classList.add("hide")}}
      retry=setTimeout(connect,3000);
    });
  };
  $("go").onclick=()=>{
    const code=$("code").value.trim().toUpperCase(),name=$("name").value.trim();
    if(code.length!==4){$("code").focus();return}
    if(!name){$("name").focus();return}
    ls("gn.pname",name);ls("gn.joinCode",code);
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
