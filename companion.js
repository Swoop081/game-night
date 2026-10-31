/* Phone companion for the other games (host side, runs on the TV after link.js).
   - the setup screens show the phone lobby (QR + joined players) and start with those players
   - the TV mirrors each game's current screen to the phones as a simple "scene": headline, scores, big buttons,
     a type-in box or a number pad. A phone's tap is replayed on the TV, so every game button works from a phone.
   - only the player whose turn it is gets live buttons / the mic. */
(function(){
  const L=window.LINK;if(!L)return;
  const $=id=>document.getElementById(id);
  const log=L.log||(()=>{});
  const txt=el=>el?String(el.textContent||"").replace(/\s+/g," ").trim():"";
  const vis=el=>!!el&&el.isConnected&&!el.closest("[hidden]");
  const GAME_IDS=["hl","nt","pb","cd","dt","floor","ff","tp","wf"];
  const WIRED={hl:1,nt:1,pb:1,cd:1};
  const gameNow=()=>{for(const id of GAME_IDS){const e=$(id);if(e&&!e.hidden)return id}return null};
  const players=g=>{try{if(g==="hl")return HL.players;if(g==="nt")return __NT.NT.players;if(g==="pb")return __PB.PB.players;if(g==="cd")return __CD.CD.players}catch(e){}return null};
  const avs=p=>{try{return avatarSrc(p.slot!=null?p.slot:p.id)}catch(e){return ""}};
  const open=()=>[...L.phones.values()].filter(p=>p.conn&&p.conn.open);

  /* ---------- lobby: take the joined phones as the players ---------- */
  L.pull=(min,max,opts)=>{
    const o=opts||{};
    let l=L.lobby();if(!o.cpu)l=l.filter(p=>!p.cpu);
    if(!l.length)return null;
    l=l.slice(0,max);
    S.pids=S.pids||[];S.avatars=S.avatars||[];
    l.forEach((p,i)=>{S.names[i]=p.name;S.pids[i]=p.pid;if(p.av)S.avatars[i]=p.av});
    for(let i=l.length;i<Math.max(min,l.length);i++)S.pids[i]=null;
    log("pull",l.map(p=>p.name));
    return l;
  };

  /* ---------- who is up? ---------- */
  const chipOn=g=>{const sc=$(g==="nt"?"ntstageScore":g==="pb"?"pbScore":"cdScore");if(!sc)return -1;return [...sc.children].findIndex(c=>c.classList.contains("on"))};
  const nameIdx=(g,P)=>{
    const st=$(g==="nt"?"ntStage":g==="pb"?"pbStage":"cdStage");if(!st||!P)return -1;
    const e=txt(st.querySelector(".cdhead .eyebrow, .nthead .eyebrow, .pbhead .eyebrow, .entry .who")).toLowerCase();
    if(!e)return -1;return P.findIndex(p=>p.name&&e.includes(String(p.name).toLowerCase()));
  };
  const actorOf=g=>{
    const P=players(g);if(!P)return null;
    let i=-1;
    if(g==="hl")i=(HL.over||HL.busy)?-1:HL.turn;
    else{i=chipOn(g);if(i<0)i=nameIdx(g,P)}
    if(g==="cd"&&$("enWho")){const k=nameIdx(g,P);if(k>=0)i=k}
    return i>=0&&P[i]?{i,p:P[i]}:null;
  };
  // the voice bus asks who should have a live mic
  L.activeFor=()=>{
    const g=gameNow();if(!g||!WIRED[g])return undefined;
    const a=actorOf(g);if(!a)return null;
    return {pid:a.p.pid||("name:"+a.p.name),name:a.p.name};
  };
  const mayAct=(g,ph)=>{
    if(!WIRED[g])return false;
    if(!$("overlay").hidden)return true;
    const a=actorOf(g);if(!a)return true;
    const pid=a.p.pid;if(!pid)return true;
    if(String(pid).startsWith("cpu-"))return g!=="hl";
    return pid===ph.pid;
  };

  /* ---------- reading the TV screen ---------- */
  const btnList=(root,skip)=>{
    const out=[];
    root.querySelectorAll("button").forEach(b=>{
      if(!vis(b)||b.closest(".floorbar")||b.closest(".keypad")||b.getAttribute("type")==="submit"||(skip&&skip(b)))return;
      const nm=txt(b.querySelector(".nm")),ph=txt(b.querySelector(".pr")).replace(/\u00a0/g,"");
      const im=b.querySelector("img");
      const t=txt(b)||b.getAttribute("aria-label")||"";
      out.push({el:b,t:nm?nm:t,nm,rt:txt(b.querySelector(".rt")),pr:ph,im:im?im.src:"",em:txt(b.querySelector(".em")),
        cls:(b.className||"").match(/\b(gold|ghost|okb|passb|hi|lo)\b/g)?.join(" ")||"",d:b.disabled?1:0,on:(b.classList.contains("sel")||b.getAttribute("aria-pressed")==="true")?1:0});
    });
    return out;
  };
  const chips=(id,P)=>{
    const sc=$(id);if(!sc)return [];
    return [...sc.children].map((c,i)=>({n:txt(c.querySelector("b")),s:txt(c.querySelector("span")),c:c.style.getPropertyValue("--pc")||(P&&P[i]&&P[i].color)||"",on:c.classList.contains("on")?1:0,pid:(P&&P[i]&&P[i].pid)||"",av:P&&P[i]?avs(P[i]):""}));
  };
  const noAv=el=>{if(!el)return "";const k=el.cloneNode(true);k.querySelectorAll(".av").forEach(x=>x.remove());return txt(k)};
  const headOf=root=>({e:noAv(root.querySelector(".eyebrow")),t:txt(root.querySelector("h2")),s:txt(root.querySelector("p"))});
  let btnEls=[];
  const scene=g=>{
    // a sheet on top of the game (results, quit?) takes over
    if(!$("overlay").hidden){
      const o=$("sheet");const bl=btnList(o);btnEls=bl.map(b=>b.el);
      return {th:g,head:{e:txt(o.querySelector(".eyebrow")),t:txt(o.querySelector("h2")),s:txt(o.querySelector(".score, p"))},btns:bl.map(({el,...r})=>r),scores:[]};
    }
    const P=players(g);
    if(g==="hl"){
      const bl=[["▲ HIGHER","hi",$("hlHigher")],["▼ LOWER","lo",$("hlLower")]].map(([t,cls,el])=>({el,t,cls,d:el.disabled?1:0}));
      btnEls=bl.map(b=>b.el);
      return {th:g,head:{e:txt($("hlTurnLbl")),t:txt($("hlPrompt")),s:txt($("hlRes"))},
        cards:[...document.querySelectorAll("#hlCards .pcard")].map(c=>c.classList.contains("back")?{b:txt(c)}:{n:txt(c.querySelector(".n")),r:/\bright\b/.test(c.className)?"ok":/\bwrong\b/.test(c.className)?"bad":/\bsame\b/.test(c.className)?"same":""}),
        scores:P.map((p,i)=>({n:p.name,s:p.score,c:p.color,on:HL.turn===i&&!HL.over?1:0,pid:p.pid||"",av:avs(p)})),
        btns:bl.map(({el,...r})=>r)};
    }
    if(g==="nt"){
      const st=$("ntStage"),bl=btnList(st);btnEls=bl.map(b=>b.el);
      const inp=$("ntIn");
      return {th:g,head:headOf(st),scores:chips("ntstageScore",P),btns:bl.map(({el,...r})=>r),
        clock:txt($("ntClock")),count:inp?txt($("ntFound"))+"/10":"",found:[...st.querySelectorAll(".ntslot.hit span")].map(txt),fb:txt($("ntFb")).replace("Count it anyway","").trim(),
        inp:inp&&vis(inp)?{ph:"Type an answer"}:null};
    }
    if(g==="pb"){
      const st=$("pbStage"),bl=btnList(st);btnEls=bl.map(b=>b.el);
      const inp=$("pbIn");let pic=null;
      /* the picture is on the TV only: phones just get the answer box and Pass (loading photos on phones lagged) */
      const showInp=inp&&vis(inp);
      return {th:g,head:headOf(st),scores:chips("pbScore",P),btns:bl.map(({el,...r})=>r),pic,pts:txt($("pbPts")),fb:txt($("pbFb")),big:showInp?"Look at the TV":"",inp:showInp?{ph:"What is it?"}:null};
    }
    if(g==="cd"){
      const st=$("cdStage"),bl=btnList(st);btnEls=bl.map(b=>b.el);
      let num=null;try{const I=__CD.CD.input;if(I&&$("enDisp"))num={disp:txt($("enDisp")),who:txt($("enWho")),dollars:I.dollarsOnly?1:0}}catch(e){}
      const prizes=[...st.querySelectorAll("div.prize")].slice(0,4).map(d=>{const im=d.querySelector("img");return {nm:txt(d.querySelector(".nm")),rt:txt(d.querySelector(".rt")),pr:txt(d.querySelector(".pr")).replace(/\u00a0/g,""),im:im?im.src:"",em:txt(d.querySelector(".em"))}});
      return {th:g,head:headOf(st),scores:chips("cdScore",P),btns:bl.map(({el,...r})=>r),num,prizes,fb:txt(st.querySelector(".cdmsg"))};
    }
    // games that are not wired for phones yet: just watch
    const root=$(g);
    return {th:g,head:headOf(root),scores:[],btns:[],view:1};
  };

  /* ---------- send to phones ---------- */
  let wasOn=false,sig="",serial=0,lastBtnSig="";
  const tickScene=()=>{
    const g=gameNow();
    if(!g){if(wasOn){wasOn=false;open().forEach(p=>{p.scr="";L.send(p,{k:"scr",off:1})})}return}
    wasOn=true;
    if(g==="floor"&&window.__FLP){open().forEach(p=>{const m={k:"scr",...__FLP.sceneFor(p)};const s=JSON.stringify(m);if(p.scr===s)return;p.scr=s;L.send(p,m)});return}
    if(g==="dt"&&window.__DT){open().forEach(p=>{const m={k:"scr",...__DT.sceneFor(p)};const s=JSON.stringify(m);if(p.scr===s)return;p.scr=s;L.send(p,m)});return}
    let sc;try{sc=scene(g)}catch(e){log("scene error",String(e));return}
    const bs=g+"|"+sc.btns.map(b=>b.t).join("~")+"|"+JSON.stringify(sc.head);
    if(bs!==lastBtnSig){lastBtnSig=bs;serial++;try{if(typeof voiceMark==="function"&&L.voiceOn())voiceMark()}catch(e){}}
    sc.sn=serial;
    open().forEach(p=>{
      const me=mayAct(g,p)?1:0;
      const m={k:"scr",...sc,me,me2:p.pid};
      const s=JSON.stringify(m);if(p.scr===s)return;p.scr=s;L.send(p,m);
    });
  };
  /* avatars are big: send each photo to a phone once, and refer to it by a short id in every scene */
  const osend=L.send;
  const hsh=s=>{let h=5381;for(let i=0;i<s.length;i+=7)h=((h<<5)+h+s.charCodeAt(i))|0;return "av"+(h>>>0).toString(36)+s.length};
  L.send=(p,m)=>{
    try{if(m&&m.k==="scr"&&m.scores&&m.scores.some(s=>s.av&&s.av.length>300)){
      p.avSent=p.avSent||{};
      m={...m,scores:m.scores.map(s=>{if(!s.av||s.av.length<=300)return s;const id=hsh(s.av);if(!p.avSent[id]){p.avSent[id]=1;osend(p,{k:"avs",id,src:s.av})}return {...s,av:id}})};
    }}catch(e){}
    osend(p,m);
  };
  setInterval(tickScene,300);
  setInterval(()=>{document.body.classList.toggle("hasph",open().length>0)},500);

  /* ---------- taps from phones ---------- */
  const om=L.onMessage;
  L.onMessage=(p,m)=>{
    const g=gameNow();
    if(m.k==="act"&&window.__FLP&&__FLP.active()){__FLP.act(p,m);return}
    if(m.k==="act"&&window.__DT&&__DT.active()){try{__DT.act(p,m)}catch(e){log("act error",String(e))}return}
    if(m.k==="tap"||m.k==="txt"||m.k==="num"){
      if(!g||!mayAct(g,p)){log("input ignored",{k:m.k,from:p.name});return}
      try{
        if(m.k==="tap"){const sc=scene(g);const el=btnEls[m.i];if(el&&vis(el)&&!el.disabled&&m.sn===serial){log("tap",{from:p.name,t:txt(el).slice(0,30)});el.click()}else log("tap stale",{i:m.i,sn:m.sn,serial})}
        else if(m.k==="txt"){const inp=$(g==="nt"?"ntIn":"pbIn");if(inp&&vis(inp)){inp.value=String(m.v||"").slice(0,60);const f=inp.closest("form");if(f)f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event("submit",{cancelable:true}));log("txt",{from:p.name,v:inp.value})}}
        else if(m.k==="num"){const I=__CD.CD.input;if(I){I.val=String(m.v).replace(/[^0-9.]/g,"").slice(0,9);I.show&&I.show();__CD.key("go");log("num",{from:p.name,v:m.v})}}
      }catch(e){log("input error",String(e))}
      return;
    }
    om&&om(p,m);
  };

  /* ---------- phone panel on each game's setup screen ---------- */
  const SETUPS={hlSetup:"hlPlayers",ntSetup:"ntPlayers",pbSetup:"pbPlayers",cdSetup:"cdPlayers",dtSetup:"dtPlayers"};
  const base=location.origin+location.pathname.replace(/[^\/]*$/,"");
  const joinUrl=()=>base+"join.html?c="+L.code+(new URLSearchParams(location.search).get("peerhost")?"&peerhost="+new URLSearchParams(location.search).get("peerhost")+"&peerport="+(new URLSearchParams(location.search).get("peerport")||9000):"");
  const paintPanel=(id,pl)=>{
    const sec=$(id);if(!sec||sec.hidden)return;
    let el=sec.querySelector(".phpanel");
    if(!el){
      const grid=sec.querySelector(".setup-grid")||sec;
      el=document.createElement("div");el.className="phpanel panel";
      grid.insertBefore(el,grid.firstChild);
    }
    const nonCpu=L.lobby().filter(p=>p.cpu||id==="hlSetup"||true);
    const lob=L.lobby();
    const human=lob.filter(p=>!p.cpu);
    const key=JSON.stringify(lob.map(p=>[p.pid,p.name]))+L.code;
    if(el.dataset.k!==key){
      el.dataset.k=key;
      const img=lob.length?"":`<img alt="" width="140" height="140" style="background:#fff;padding:6px" src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(joinUrl())}">`;
      el.innerHTML=`<span class="eyebrow">Players join on their phones</span>
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">${img}<div style="flex:1;min-width:200px">
        ${lob.length?lob.map(p=>`<div style="padding:4px 0;font-weight:800">${p.cpu?"🤖":"📱"} ${String(p.name).replace(/</g,"&lt;")}</div>`).join(""):`<div>Scan the code, or open <b>${base.replace(/^https?:\/\//,"")}join.html</b> and enter <b style="letter-spacing:.2em;color:var(--gold)">${L.code}</b></div>`}
        </div></div>
        <div class="row" style="margin-top:8px"><button class="btn" data-a="join">📱 Show join code</button>${id==="hlSetup"||id==="dtSetup"?'<button class="btn" data-a="cpu">🤖 Add CPU player</button><button class="btn ghost" data-a="nocpu">Remove CPU</button>':""}</div>
        <div class="note" style="margin-top:6px">${lob.length?"These players are used when you press Start.":"No phones yet. You can still play on this screen."}</div>`;
      el.querySelectorAll("button").forEach(b=>b.onclick=()=>{const a=b.dataset.a;if(a==="join")L.toggle();else if(a==="cpu")L.addCpu();else L.removeCpu()});
    }
    // with phones in, the manual player list is not needed
    const has=lob.length>0;
    const f=sec.querySelector(".stepper");const fld=f&&f.closest(".field");if(fld)fld.style.display=has?"none":"";
    const pw=$(pl);const pp=pw&&pw.closest(".panel");if(pp&&pp!==el)pp.style.display=has?"none":"";
  };
  setInterval(()=>{Object.keys(SETUPS).forEach(id=>{try{paintPanel(id,SETUPS[id])}catch(e){log("panel error",String(e))}})},700);

  /* ---------- CPU player for Higher or Lower (so you can test with one phone) ---------- */
  let cpuAt=0,cpuFor=null;
  setInterval(()=>{
    try{
      if(gameNow()!=="hl"||HL.over||HL.busy||!$("overlay").hidden){cpuFor=null;return}
      const p=HL.players[HL.turn];if(!p||!p.pid||!String(p.pid).startsWith("cpu-")){cpuFor=null;return}
      const key=HL.drawn+"|"+HL.turn;
      if(cpuFor!==key){cpuFor=key;cpuAt=Date.now()+1300+Math.random()*1700;return}
      if(Date.now()<cpuAt)return;
      cpuFor=null;
      const cur=HL.cur;const dir=cur<=5?"higher":"lower";   // sensible, but not perfect
      hlCall(Math.random()<.8?dir:(dir==="higher"?"lower":"higher"));
    }catch(e){}
  },250);
})();
