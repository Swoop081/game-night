/* Android TV app only: the TV's WebView has no Web Speech API, so bridge to the native recogniser.
   Does nothing in a normal browser. */
(function(){
  const TV=/GameNightTV/.test(navigator.userAgent);
  // the TV's WebView can expose a speech API that never delivers anything, so inside the TV app always use the native recogniser
  if(!window.GNAndroid||(!TV&&(window.SpeechRecognition||window.webkitSpeechRecognition)))return;
  let ok=false;try{ok=GNAndroid.available()}catch(e){}
  if(!ok)return;
  let cur=null,fresh=true,accept=true,emptyIdle=0,rearmT=null,lastPid=0,ignorePid=0;
  const listenNow=()=>{if(!cur||!cur.active||document.hidden)return;fresh=true;accept=true;label("🎤 Listening…");try{GNAndroid.listen(cur.lang||"en-AU")}catch(e){}};
  // hands-free: after each listen ends, start the next one (with a back-off if nothing is being heard), so nobody has to press Speak
  const rearm=ms=>{clearTimeout(rearmT);rearmT=setTimeout(listenNow,ms)};
  window.__gnSR={
    started(){cur&&cur.onstart&&cur.onstart()},
    session(){fresh=true;accept=true},          // a new listening session began: its words get a new result slot
    dbg(t){try{if(!localStorage.getItem('gn.dbg'))return}catch(e){return}let d=document.getElementById('gnDbg');if(!d){d=document.createElement('div');d.id='gnDbg';d.style.cssText='position:fixed;left:8px;bottom:4px;z-index:99999;font:11px monospace;color:#9fd;opacity:.7;pointer-events:none';document.body.appendChild(d)}d.textContent=t},
    phone(o){lastPid=Math.max(lastPid,o.id||0);if((o.id||0)<=ignorePid||!cur||!cur.active)return;accept=true;fresh=true;this.result(o.t,true);fresh=true},
    result(texts,fin){
      this.dbg((fin?'final: ':'heard: ')+texts[0]+(accept?'':' (muted)'));
      if(!accept||!cur||!cur.active)return;
      const alt=texts.map(t=>({transcript:t,confidence:.9}));alt.isFinal=fin;
      if(fresh||!cur.results.length){cur.results.push(alt);fresh=false}else cur.results[cur.results.length-1]=alt;
      if(fin){fresh=true;emptyIdle=0}
      cur.onresult&&cur.onresult({resultIndex:cur.results.length-1,results:cur.results});
    },
    error(code){const r=cur;if(!r||!r.active)return;if(code)r.onerror&&r.onerror({error:code});r.active=false;r.onend&&r.onend()}
  };
  // TV remotes only open their mic when an app asks for it, so listening is push-to-talk: press Speak (or the remote's mic key)
  const label=t=>document.querySelectorAll("#talkBtn").forEach(b=>b.textContent=t);
  window.__gnTalk=function(){if(!cur||!cur.active)return;fresh=true;accept=true;label("🎤 Listening…");GNAndroid.listen(cur.lang||"en-AU")};
  // a question was answered: stop listening and ignore anything still arriving from that session
  window.__gnMute=function(){ignorePid=lastPid;accept=false;fresh=true;try{GNAndroid.stop()}catch(e){}label('🎤 Speak');rearm(450)};
  window.__gnSR.idle=function(){label("🎤 Speak");emptyIdle++;rearm(Math.min(3000,300*emptyIdle))};
  function SR(){this.lang="en-AU";this.active=false}
  SR.prototype.start=function(){if(this.active)return;cur=this;this.active=true;this.results=[];fresh=true;this.onstart&&this.onstart();rearm(350)};
  SR.prototype.stop=SR.prototype.abort=function(){clearTimeout(rearmT);if(!this.active)return;this.active=false;GNAndroid.stop();label('🎤 Speak')};
  ["SpeechRecognition","webkitSpeechRecognition"].forEach(k=>{try{Object.defineProperty(window,k,{value:SR,configurable:true,writable:true})}catch(e){try{window[k]=SR}catch(e2){}}});
})();
