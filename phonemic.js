/* Phone microphone for the TV app.
   TV: shows a pairing chip (code + QR) and listens on a free public relay (ntfy.sh).
   Phone: open the link / scan the QR, tap Start, and speak; each finished phrase is sent to the TV as if it were heard there. */
(function(){
  const RELAY="https://ntfy.sh/";
  const q=new URLSearchParams(location.search),pair=(q.get("mic")||"").replace(/\W/g,"");
  const topic=c=>"gnmic-7k2-"+c;
  const css=(el,s)=>{el.style.cssText=s;return el};

  /* ---------- phone side ---------- */
  if(pair){
    const SRc=window.SpeechRecognition||window.webkitSpeechRecognition;
    const box=css(document.createElement("div"),"position:fixed;inset:0;z-index:999999;background:linear-gradient(160deg,#1b1250,#3a1d8f);color:#fff;font-family:system-ui,sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:24px;text-align:center");
    box.innerHTML='<div style="font-size:.8rem;letter-spacing:.2em;opacity:.7">GAME NIGHT</div><div style="font-size:1.6rem;font-weight:800">Phone mic</div><div id="pmSt" style="opacity:.85">Tap start, then say your answers out loud.</div><button id="pmGo" style="font-size:1.3rem;font-weight:800;padding:18px 34px;border-radius:999px;border:0;background:#ffd84a;color:#2a1a00">🎤 Start</button><div id="pmHeard" style="min-height:3.2em;font-size:1.5rem;font-weight:700;max-width:90vw"></div><div id="pmSent" style="font-size:.8rem;opacity:.6"></div>';
    document.body.appendChild(box);
    const st=box.querySelector("#pmSt"),heard=box.querySelector("#pmHeard"),sent=box.querySelector("#pmSent"),go=box.querySelector("#pmGo");
    let id=0,on=false,rec=null,n=0;
    const post=o=>fetch(RELAY+topic(pair),{method:"POST",body:JSON.stringify(o)}).then(()=>{sent.textContent="sent "+(++n)+" to TV"}).catch(()=>{sent.textContent="couldn't reach the TV relay – check your internet"});
    if(!SRc){st.textContent="This browser can't do voice. Open this link in Safari (iPhone) or Chrome (Android).";go.style.display="none";return}
    const run=()=>{
      if(!on)return;
      rec=new SRc();rec.lang="en-AU";rec.interimResults=true;rec.continuous=false;rec.maxAlternatives=3;
      rec.onstart=()=>{id++;st.textContent="Listening… speak your answer"};
      rec.onresult=e=>{
        const r=e.results[e.results.length-1];heard.textContent=r[0].transcript;
        if(r.isFinal){const alts=[];for(let i=0;i<r.length;i++)alts.push(r[i].transcript);post({id,t:alts,f:1})}
      };
      rec.onerror=e=>{if(e.error==="not-allowed"||e.error==="service-not-allowed"){on=false;st.textContent="Microphone blocked – allow it in your browser settings, then tap Start.";go.textContent="🎤 Start"}};
      rec.onend=()=>{if(on)setTimeout(run,150)};
      try{rec.start()}catch(e){setTimeout(run,500)}
    };
    go.onclick=()=>{
      if(on){on=false;try{rec.stop()}catch(e){}go.textContent="🎤 Start";st.textContent="Stopped";return}
      on=true;go.textContent="■ Stop";run();post({hello:1});
      try{navigator.wakeLock&&navigator.wakeLock.request("screen")}catch(e){}
    };
    return;
  }

  /* ---------- TV side ---------- */
  if(!/GameNightTV/.test(navigator.userAgent))return;
  let code="";try{code=localStorage.getItem("gn.micCode")||""}catch(e){}
  if(!code){code=String(Math.floor(100000+Math.random()*900000));try{localStorage.setItem("gn.micCode",code)}catch(e){}}
  const url=location.origin+location.pathname.replace(/[^\/]*$/,"")+"?mic="+code;
  const chip=css(document.createElement("div"),"position:fixed;left:10px;bottom:8px;z-index:9000;background:rgba(20,12,60,.82);border:1px solid rgba(255,255,255,.25);color:#fff;font:600 12px system-ui,sans-serif;padding:6px 12px;border-radius:999px;cursor:pointer");
  const setChip=on=>{chip.textContent=on?"📱 Phone mic linked":"📱 Phone mic · code "+code;chip.style.borderColor=on?"#5dffa0":"rgba(255,255,255,.25)"};
  setChip(false);chip.tabIndex=0;document.body.appendChild(chip);
  const dlg=css(document.createElement("div"),"position:fixed;inset:0;z-index:99998;background:rgba(10,6,40,.94);color:#fff;font-family:system-ui,sans-serif;display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center");
  dlg.innerHTML='<div style="font-size:2rem;font-weight:800">Use your phone as the microphone</div><img alt="QR" width="220" height="220" style="background:#fff;padding:10px;border-radius:12px"><div>Scan this with your phone, or open:</div><div style="font-size:1.1rem;font-weight:700;color:#ffd84a;word-break:break-all;max-width:80vw">'+url+'</div><div style="opacity:.8">Tap Start on the phone, then say answers out loud.<br>Press Back to close.</div>';
  dlg.querySelector("img").src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data="+encodeURIComponent(url);
  document.body.appendChild(dlg);
  const toggle=()=>{dlg.style.display=dlg.style.display==="flex"?"none":"flex"};
  chip.onclick=toggle;
  chip.onkeydown=e=>{if(e.key==="Enter")toggle()};
  document.addEventListener("keydown",e=>{if(dlg.style.display==="flex"&&(e.key==="Escape"||e.key==="Backspace"||e.keyCode===4)){dlg.style.display="none";e.preventDefault();e.stopPropagation()}},true);
  let es=null,dead=0;
  const connect=()=>{
    try{es&&es.close()}catch(e){}
    es=new EventSource(RELAY+topic(code)+"/sse");
    es.onmessage=ev=>{
      let m;try{m=JSON.parse(ev.data)}catch(e){return}
      if(m.event!=="message")return;
      let o;try{o=JSON.parse(m.message)}catch(e){return}
      setChip(true);
      if(o.t&&window.__gnSR&&window.__gnSR.phone)window.__gnSR.phone(o);
    };
    es.onerror=()=>{try{es.close()}catch(e){}setTimeout(connect,Math.min(30000,2000*(++dead)))};
    es.onopen=()=>{dead=0};
  };
  connect();
})();
