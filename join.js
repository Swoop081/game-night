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
    const im=new Image();im.onload=()=>{const c=document.createElement("canvas");c.width=c.height=384;const x=c.getContext("2d");const s=Math.min(im.width,im.height);x.drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,384,384);av={type:"photo",src:c.toDataURL("image/jpeg",.86)};paintAv();URL.revokeObjectURL(im.src)};
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
  let peer=null,conn=null,mode="wait",uid=0,rec=null,micOK=false,warmed=false,joined=false,retry=null;

  /* ----- microphone: runs only while the TV says it's this player's turn ----- */
  const words=t=>String(t||"").trim().toLowerCase().replace(/[^a-z0-9' ]+/g," ").split(/\s+/).filter(Boolean);
  let voiceActive=false,round=-1,cur={uid:0,words:[]},base={uid:-1,words:[]};
  const setRound=n=>{if(n===round)return;round=n;base={uid:cur.uid,words:cur.words.slice()};plog("round",n)};
  const runMic=()=>{
    if(!SRc||!voiceActive||!micOK||rec)return;
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
      if(!alts.length||mode!=="mic")return;
      $("heard").textContent=alts[0];
      if(conn&&conn.open)conn.send({k:"sp",n:round,f:res.isFinal?1:0,alts});
    };
    r.onerror=e=>{plog("rec onerror",e.error);if(e.error==="not-allowed"||e.error==="service-not-allowed"){micOK=false;$("st").textContent="Voice blocked ("+e.error+"). Open this page in Safari (not the Camera or another app's browser), allow the microphone, and turn on Settings > General > Keyboard > Enable Dictation. Then reload."}};
    r.onend=()=>{plog("rec end");rec=null;if(voiceActive&&micOK)setTimeout(runMic,120)};
    try{r.start()}catch(e){rec=null;setTimeout(runMic,400)}
  };
  const setMode=(m,sub)=>{
    if(m==="mic"&&mode!=="mic")base={uid:cur.uid,words:cur.words.slice()};
    mode=m;document.body.classList.toggle("live",m==="mic");
    $("big").textContent=m==="mic"?"🎤":"⏳";
    $("st").textContent=sub||"";if(m!=="mic")$("heard").textContent="";
  };

  /* ----- the duel question mirrored from the TV ----- */
  const fmt=t=>t<10000?(t/1000).toFixed(1):String(Math.ceil(t/1000));
  const duel=m=>{
    const D=$("duel");if(!D||!$("pass"))return;
    document.body.classList.toggle("induel",!m.off);
    if(m.off){D.classList.add("hide");$("play").classList.remove("hide");document.body.style.overflow="";return}
    D.classList.remove("hide");$("play").classList.add("hide");document.body.style.overflow="hidden";
    [["a",$("pa")],["b",$("pb")]].forEach(([k,el])=>{
      const o=m[k];el.style.setProperty("--c",o.c);el.classList.toggle("on",m.active===k);
      el.querySelector("b").textContent=o.n+(o.pid&&o.pid===pid?" · you":"");el.querySelector("i").textContent=fmt(o.t);
      const im=el.querySelector("img");if(o.av&&im.getAttribute("src")!==o.av)im.src=o.av;
    });
    $("cat").textContent=m.cat;$("hint").textContent=m.hint||"";
    if(m.q){$("q").className=m.q.c;$("q").innerHTML=m.q.h;$("heard").textContent="";
      if(m.map){const mp=$("map");mp.style.gridTemplateColumns="repeat("+m.map.c+",16px)";mp.innerHTML=m.map.o.map((c,i)=>'<i style="background:'+(c||"transparent")+'" class="'+((m.map.hot[0].includes(i)||m.map.hot[1].includes(i))?"hot":"")+'"></i>').join("")}}
    const rv=$("rv");rv.className=m.rv?(m.rv.c.indexOf("ok")>-1?"ok":"pass"):"";rv.textContent=m.rv?m.rv.t:"";
    $("pass").disabled=!(mode==="mic"&&m.state==="run");
    $("dst").textContent=mode==="mic"?"Your turn · say the answer out loud":($("st").textContent||"");
    $("dheard").textContent=mode==="mic"?$("heard").textContent:"";
  };
  if($("pass"))$("pass").onclick=()=>{if(conn&&conn.open)conn.send({k:"btn",id:"pass"})};


  /* ----- companion screen: mirrors the TV game and sends taps back ----- */
  const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  let sn=-1,numv="",lastBtn="",picU="",lastScr=null;
  const tapBtn=i=>{if(conn&&conn.open&&lastScr)conn.send({k:"tap",i,sn:lastScr.sn})};
  const scr=m=>{
    const C=$("cmp");if(!C)return;
    if(m.off){lastScr=null;C.classList.add("hide");document.body.classList.remove("incmp");if(!$("duel")||$("duel").classList.contains("hide"))$("play").classList.remove("hide");document.body.style.overflow="";return}
    lastScr=m;
    C.className="th-"+m.th;document.body.classList.add("incmp");document.body.style.overflow="hidden";
    $("play").classList.add("hide");$("duel")&&$("duel").classList.add("hide");
    $("cmScores").innerHTML=(m.scores||[]).map(s=>'<div class="cs'+(s.on?" on":"")+'" style="--c:'+esc(s.c||"#555")+'">'+(s.av?'<img alt="" src="'+esc(s.av)+'">':"")+'<div><b>'+esc(s.n)+(s.pid&&s.pid===pid?" · you":"")+'</b><i>'+esc(s.s)+'</i></div></div>').join("");
    $("cmE").textContent=m.head.e||"";$("cmT").textContent=m.head.t||"";$("cmS").textContent=m.head.s||"";
    // main area per game
    let main="";
    if(m.big)main+='<div class="cmword">'+esc(m.big)+'</div>';
    if(m.cards&&m.cards.length)main='<div class="cmcards">'+m.cards.map(c=>c.b!==undefined?'<div class="pk back">'+esc(c.b)+'</div>':'<div class="pk '+(c.r||"")+'">'+esc(c.n)+'</div>').join("")+'</div>';
    if(m.clock)main+='<div class="cmbig">'+esc(m.clock)+(m.count?' <small style="font-size:1rem;opacity:.7">'+esc(m.count)+'</small>':"")+'</div>';
    if(m.found&&m.found.length)main+='<div class="cmchips">'+m.found.map(f=>'<span>'+esc(f)+'</span>').join("")+'</div>';
    if(m.pts)main+='<div class="cmbig" style="font-size:1.6rem">'+esc(m.pts)+'</div>';
    if(m.prizes&&m.prizes.length&&!(m.btns||[]).some(b=>b.nm))main+='<div class="cmprizes">'+m.prizes.map(p=>'<div class="cmprize">'+(p.im?'<img alt="" referrerpolicy="no-referrer" src="'+esc(p.im)+'">':'<span class="em">'+esc(p.em)+'</span>')+esc(p.nm)+(p.pr?'<em>'+esc(p.pr)+'</em>':"")+'</div>').join("")+'</div>';
    const mm=$("cmMain");
    if(m.pic){
      let im=mm.querySelector("img.cpic");
      if(!im||picU!==m.pic.u){mm.innerHTML="";im=document.createElement("img");im.className="cpic";im.alt="";im.src=m.pic.u;picU=m.pic.u;mm.style.cssText="flex:1;min-height:0;width:100%;display:flex;flex-direction:column;align-items:center;gap:6px";mm.appendChild(im);const ex=document.createElement("div");ex.id="cmEx";mm.appendChild(ex)}
      const r=m.pic.t>=1?0:26*Math.pow(1-m.pic.t,1.5);im.style.filter=r<.5?"none":"blur("+r.toFixed(1)+"px)";$("cmEx").innerHTML=main;
    }else{picU="";mm.style.cssText="";if(mm.dataset.h!==main)mm.dataset.h=main,mm.innerHTML=main}
    $("cmFb").textContent=m.fb||"";
    // buttons (only rebuilt when they change)
    const bs=JSON.stringify([m.sn,m.me,(m.btns||[]).map(b=>[b.t,b.d,b.on,b.cls])]);
    if(bs!==lastBtn){
      lastBtn=bs;const B=$("cmBtns"),list=m.btns||[];
      const prz=list.some(b=>b.nm);
      B.className=list.some(b=>b.a==="vote")?"grid big":list.length===2&&!prz&&list[0].cls&&/hi|lo/.test(list[0].cls)?"two big":(prz||list.length>3?"grid":"");
      B.innerHTML="";
      list.forEach((b,i)=>{const e=document.createElement("button");e.className="cb "+(b.cls||"")+(b.nm?" prz":"")+(b.on?" sel":"");
        if(b.nm)e.innerHTML=(b.im?'<img alt="" referrerpolicy="no-referrer" src="'+esc(b.im)+'">':'<span class="em">'+esc(b.em)+'</span>')+esc(b.nm)+(b.pr?'<em>'+esc(b.pr)+'</em>':"");
        else e.textContent=b.t;
        if(b.c)e.style.cssText="background:"+b.c+";color:#fff";e.disabled=!m.me||!!b.d;e.onclick=()=>{if(b.a){if(conn&&conn.open)conn.send({k:"act",a:b.a,i:b.v})}else tapBtn(i)};B.appendChild(e)});
    }
    // type-in box
    const F=$("cmForm");const showIn=!!m.inp&&!!m.me;F.classList.toggle("hide",!showIn);
    if(showIn&&F.dataset.p!==(m.inp.ph||"")){F.dataset.p=m.inp.ph||"";$("cmIn").placeholder=m.inp.ph||""}
    // number pad
    const N=$("cmNum");const showNum=!!m.num;N.classList.toggle("hide",!showNum);
    if(m.sn!==sn){sn=m.sn;numv="";}
    if(showNum){
      $("cmDisp").textContent="$"+(numv||"0");
      const kp=$("cmKp");kp.classList.toggle("hide",!m.me);
      if(!kp.firstChild){[1,2,3,"⌫",4,5,6,".",7,8,9,0].forEach(k=>{const b=document.createElement("button");b.textContent=k;b.dataset.k=k;kp.appendChild(b)});
        [["Lock in","go"],["Clear","c"]].forEach(([t,k])=>{const b=document.createElement("button");b.textContent=t;b.dataset.k=k;if(k==="go")b.className="go";kp.appendChild(b)});
        kp.onclick=e=>{const b=e.target.closest("button");if(!b)return;const k=b.dataset.k;
          if(k==="go"){if(numv&&conn&&conn.open)conn.send({k:"num",v:numv});return}
          if(k==="c")numv="";else if(k==="⌫")numv=numv.slice(0,-1);else if(k==="."){if(lastScr&&lastScr.num&&lastScr.num.dollars)return;if(!numv.includes("."))numv=(numv||"0")+"."}
          else{if(numv.includes(".")&&numv.split(".")[1].length>=2)return;if(numv.replace(".","").length>=7)return;numv=(numv==="0"?"":numv)+k}
          $("cmDisp").textContent="$"+(numv||"0")}}
    }
    paintMic();
  };
  const paintMic=()=>{
    const C=$("cmp");if(!C||C.classList.contains("hide")||!lastScr)return;
    const el=$("cmMic"),live=mode==="mic";
    el.className=live?"live":"";
    const h=$("heard").textContent;
    el.textContent=lastScr.th==="dt"?"":live?(h?"🎤 "+h:"🎤 Your turn: say it out loud"):(lastScr.me?"Your turn":(lastScr.view?"Watch the TV":"Watch the TV · "+($("st").textContent||""))).replace(/ · $/,"");
  };
  setInterval(paintMic,300);
  if($("cmForm"))$("cmForm").onsubmit=e=>{e.preventDefault();const v=$("cmIn").value.trim();$("cmIn").value="";if(v&&conn&&conn.open)conn.send({k:"txt",v});$("cmIn").focus({preventScroll:true})};

  /* ----- connection (keeps retrying if the TV or wifi blips) ----- */
  const ICE=[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun.cloudflare.com:3478"},{urls:["turn:openrelay.metered.ca:80","turn:openrelay.metered.ca:443"],username:"openrelayproject",credential:"openrelayproject"}];
  const cfg=()=>{const o={debug:0,config:{iceServers:ICE}};if(q.get("peerhost")){o.host=q.get("peerhost");o.port=+(q.get("peerport")||9000);o.secure=false;o.path="/"}return o};
  const target=()=>"gnight-"+$("code").value.trim().toUpperCase();
  const dial=()=>{
    try{conn&&conn.close()}catch(e){}
    conn=peer.connect(target(),{reliable:true});
    const c=conn;
    c.on("open",()=>{c.send({k:"join",pid,name:$("name").value.trim()||"Player",av});joined=true;$("who").textContent=$("name").value.trim()||"Player";net("linked")});
    c.on("data",m=>{lastRx=Date.now();if(m&&m.k==="hb")return;if(m&&m.k==="round")return setRound(m.n);if(m&&m.n!==undefined&&m.k==="ui")setRound(m.n);if(m&&m.k==="ui"){voiceActive=!!m.v;if(voiceActive&&!warmed){warmed=true;try{navigator.mediaDevices.getUserMedia({audio:true}).then(s=>{s.getTracks().forEach(t=>t.stop())}).catch(()=>{})}catch(e){}}if(voiceActive)runMic();else if(rec){try{rec.abort()}catch(e){}}}if(m&&m.k==="log")return showLog(m.text+"\n\n--- phone side ---\n"+PL.join("\n"));if(m&&m.k==="scr")return scr(m);if(m&&m.k==="duel"){const C=$("cmp");if(C&&!C.classList.contains("hide")){C.classList.add("hide");document.body.classList.remove("incmp")}return duel(m)}if(m&&m.k==="ui")setMode(m.mode,m.sub);else if(m&&m.k==="hello"){$("st").textContent="You're in! Watch the TV."}});
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
  /* staying connected: heartbeat both ways, and rejoin straight away after the phone was in the camera or another app */
  let lastRx=Date.now();
  setInterval(()=>{if(conn&&conn.open&&joined)try{conn.send({k:"hb"})}catch(e){}},3000);
  setInterval(()=>{if(joined&&!document.hidden&&Date.now()-lastRx>10000){plog("stale link, reconnecting");lastRx=Date.now();net("reconnecting");connect()}},2500);
  const wake=()=>{try{navigator.wakeLock&&navigator.wakeLock.request("screen").catch(()=>{})}catch(e){}};
  const back=()=>{if(document.hidden||!joined)return;wake();lastRx=Date.now()-6000;if(!conn||!conn.open){net("reconnecting");connect()}else try{conn.send({k:"hb"})}catch(e){connect()}};
  document.addEventListener("visibilitychange",back);addEventListener("pageshow",back);addEventListener("online",()=>{if(joined){net("reconnecting");connect()}});
  const net=t=>{const n=$("net");if(n)n.textContent=t;plog("net",t)};
  $("go").onclick=()=>{
    const code=$("code").value.trim().toUpperCase(),name=$("name").value.trim();
    if(code.length!==4){$("code").focus();return}
    if(!name){$("name").focus();return}
    ls("gn.pname",name);try{ls("gn.pav",JSON.stringify(av))}catch(e){}$("myav").src=avSrc(av);$("myav").classList.remove("hide");ls("gn.joinCode",code);
    $("join").classList.add("hide");$("play").classList.remove("hide");
    $("st").textContent="Connecting…";
    // the mic is only requested later, when a voice game actually needs it (Draw This never asks)
    if(SRc){micOK=true}
    try{navigator.wakeLock&&navigator.wakeLock.request("screen").catch(()=>{})}catch(e){}
    if(!SRc)$("st").textContent="This browser can't do voice – use Safari (iPhone) or Chrome (Android).";
    connect();
  };
  document.addEventListener("visibilitychange",()=>{if(!document.hidden&&joined&&(!conn||!conn.open))connect()});
})();
