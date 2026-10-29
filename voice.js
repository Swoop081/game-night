/* Voice bus for the TV app: answers are spoken into the players' phones.
   One path only (phone -> TV). Each question is a "round"; a phone only ever sends words spoken after the round began,
   and the TV only accepts words stamped with the current round, so old words can never answer a new question. */
(function(){
  const LINK=window.LINK;if(!LINK||typeof V==="undefined")return;
  const log=(a,b)=>LINK.log&&LINK.log(a,b);
  const nextRound=why=>{LINK.round=(LINK.round||0)+1;LINK.broadcast({k:"round",n:LINK.round});log("round",{n:LINK.round,why})};

  // ---- the same function names every game already calls ----
  window.voiceStart=function(handler,el){
    V.handler=handler||window.voiceCheck;V.el=el||document.getElementById("mic");
    if(!S.prefs.voice){V.on=false;micUI("off");return}
    V.on=true;nextRound("voiceStart");micUI("on");
  };
  window.voiceStop=function(){V.on=false;V.handler=null;log("voiceStop")};
  window.voiceMark=function(){nextRound("answer taken");if(V.on)micUI("on")};
  window.micUI=function(state,text){
    const m=V.el||document.getElementById("mic");if(!m)return;
    const esc2=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
    m.className="mic"+(state==="on"?" on":"");
    if(state==="off"){m.innerHTML=S.prefs.voice?"":"";return}
    const n=LINK.lobby?LINK.lobby().filter(p=>p.conn&&p.conn.open).length:0;
    const msg=text?"<q>"+esc2(text)+"</q>":(n?"📱 Answer out loud into your phone":"📱 No phones joined — press the Phones button to answer by voice");
    m.innerHTML='<span class="d"></span>'+msg;
  };

  // ---- phone speech in ----
  LINK.speech=function(p,m){
    const texts=(m.alts||[]).slice(0,2).map(t=>String(t).trim()).filter(Boolean);
    log("speech",{from:p.name,n:m.n,round:LINK.round,f:m.f,t:texts[0],live:p.live});
    if(!texts.length)return;
    if(!V.on||!V.handler){log("  drop","voice off");return}
    if(!p.live){log("  drop","not their turn");return}
    if(m.n!==LINK.round){log("  drop","old round");return}
    try{micUI("on",texts[0])}catch(e){}
    log("  -> handler",texts);
    try{V.handler(texts,!!m.f)}catch(e){log("handler error",String(e))}
  };
})();
