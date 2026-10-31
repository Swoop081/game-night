/* The Floor: category draft. Phones take turns (snake order) claiming categories so nobody gets the same one.
   Also keeps the setup screen showing what each phone has picked. */
(function(){
  const L=window.LINK;if(!L)return;
  const D=L.draft={on:false,seq:[],i:0,per:1,taken:{},t:null};
  const $=id=>document.getElementById(id);
  const humans=()=>L.lobby().filter(p=>!p.cpu&&p.conn&&p.conn.open);
  const byPid=pid=>L.phones.get(pid);
  const state=p=>{
    const cur=D.on?byPid(D.seq[D.i]):null,taken={};
    Object.keys(D.taken).forEach(c=>{const o=byPid(D.taken[c]);taken[c]=o?o.name:"?"});
    return {k:"draft",on:D.on,me:!!(cur&&cur.pid===p.pid),turn:cur?cur.name:"",per:D.per,mine:p.cats||[],taken,n:D.i,total:D.seq.length};
  };
  const broadcast=()=>{L.phones.forEach(p=>{try{p.conn&&p.conn.open&&p.conn.send(state(p))}catch(e){}});repaint()};
  const repaint=()=>{try{sync();const s=$("setup");if(s&&!s.hidden&&typeof renderSetup==="function")renderSetup()}catch(e){}};
  const arm=()=>{clearTimeout(D.t);D.t=setTimeout(auto,45000)};
  function auto(){
    if(!D.on)return;const p=byPid(D.seq[D.i]);if(!p)return;
    const free=shuffle(CAT_IDS.filter(c=>!D.taken[c]));if(free.length)pick(p,free[0]);
  }
  function pick(p,id){
    if(!D.on||!p||D.seq[D.i]!==p.pid||D.taken[id]||!CATS[id])return;
    D.taken[id]=p.pid;(p.cats=p.cats||[]).push(id);D.i++;
    if(D.i>=D.seq.length){D.on=false;clearTimeout(D.t)}else arm();
    broadcast();
  }
  D.start=()=>{
    const h=humans();if(h.length<2)return;
    D.per=(S.prefs.multi&&h.length===4)?4:1;
    const order=shuffle(h.map(p=>p.pid)),seq=[];
    for(let r=0;r<D.per;r++)(r%2?order.slice().reverse():order).forEach(x=>seq.push(x));
    h.forEach(p=>p.cats=[]);D.seq=seq;D.i=0;D.taken={};D.on=true;arm();broadcast();
  };
  D.cancel=()=>{D.on=false;clearTimeout(D.t);broadcast()};
  D.skip=()=>auto();
  const om=L.onMessage;L.onMessage=(p,m)=>{if(m&&m.k==="pick"){pick(p,m.id);return}om&&om(p,m)};
  setInterval(()=>{if(D.on)broadcast()},3000);
  /* phone picks -> setup screen */
  let lastSig="";
  function sync(){
    const h=humans(),picks=h.map(p=>p.cats||[]),sig=JSON.stringify([picks,!!S.prefs.multi,h.length]);
    if(sig===lastSig)return;lastSig=sig;
    if(S.prefs.multi&&h.length===4){S.mpicks=picks;S.mcats=buildMulti(picks);S.mcatsSig=JSON.stringify(picks)}
    else picks.forEach((c,i)=>{if(c[0])S.cats[i]=c[0]});
  }
  setInterval(()=>{try{const s=$("setup");if(s&&!s.hidden){const before=lastSig;sync();if(before!==lastSig&&typeof renderSetup==="function")renderSetup()}}catch(e){}},700);
  /* draft button + status on the setup screen */
  const rs=window.renderSetup;
  if(typeof rs==="function")window.renderSetup=function(){
    const r=rs.apply(this,arguments);
    try{
      const wrap=$("players"),panel=wrap&&wrap.closest(".panel");if(!panel)return r;
      let bar=panel.querySelector(".draftbar");if(!bar){bar=document.createElement("div");bar.className="draftbar";bar.style.cssText="display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:6px 2px";panel.insertBefore(bar,wrap)}
      const h=humans();
      if(h.length<2){bar.innerHTML="";return r}
      if(D.on){
        const cur=byPid(D.seq[D.i]);
        bar.innerHTML=`<b style="color:var(--gold)">Category draft: ${cur?cur.name:"…"} is picking (${D.i+1} of ${D.seq.length})</b><button class="btn ghost" data-a="skip">Skip turn</button><button class="btn ghost" data-a="cancel">Cancel</button>`;
      }else bar.innerHTML=`<button class="btn gold" data-a="start">Start category draft</button><span class="note" style="opacity:.8">Players take turns picking on their phones${S.prefs.multi&&h.length===4?" (4 each)":""}. Or skip it and everyone picks freely.</span>`;
      bar.querySelectorAll("button").forEach(b=>b.onclick=()=>{const a=b.dataset.a;a==="start"?D.start():a==="skip"?D.skip():D.cancel()});
    }catch(e){}
    return r;
  };
})();
