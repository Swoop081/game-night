/* The Floor on phones: spin the Randomizer, pick which touching square to challenge, start the duel and move on, all from the phone. */
(function(){
  const L=window.LINK;if(!L)return;
  const $=id=>document.getElementById(id);
  const vis=el=>!!el&&el.isConnected&&!el.closest("[hidden]");
  const pidOf=id=>(S.pids&&S.pids[id])||null;
  const idOfPid=pid=>{const i=(S.pids||[]).indexOf(pid);return i>=0?i:-1};
  const mine=(p,id)=>{const pid=pidOf(id);return !pid||String(pid).startsWith("cpu-")||pid===p.pid};   // no phone behind that player: anyone may act
  const sqCount=q=>cellsOf(q.id).length;
  const ovButtons=()=>[...$("sheet").querySelectorAll("button")].filter(b=>vis(b)&&!b.classList.contains("boostbtn"));
  const ovOpen=()=>{const o=$("overlay");return !!o&&!o.hidden};
  function scores(){
    return S.players.filter(q=>q.alive).map(q=>({n:q.name,s:sqCount(q),c:q.color,on:S.phase==="choose"&&S.challenger===q.id?1:0,pid:q.pid||pidOf(q.id)||"",av:(()=>{try{return avatarSrc(q.id)}catch(e){return ""}})()}));
  }
  function sceneFor(p){
    const base={th:"cd",scores:S.players?scores():[],btns:[],me:1,sn:0};
    base.sn=(S.phase||"")+(S.challenger==null?"":S.challenger)+"|"+(ovOpen()?"o"+ovButtons().map(b=>b.textContent).join("~"):"")+"|"+(S.defender==null?"":S.defender)+(S.target==null?"":S.target);
    const head=(t,s,e)=>({e:e||"The Floor",t,s:s||""});
    if(ovOpen()){
      const sh=$("sheet"),h=sh.querySelector("h2"),ey=sh.querySelector(".eyebrow");
      const bs=ovButtons();
      const duelGo=!!$("duelGo");
      const ok=duelGo?mine(p,S.challenger):true;
      return {...base,head:head(h?h.textContent.trim():"",ey?ey.textContent.trim():""),
        btns:ok?bs.map((b,i)=>({t:b.textContent.replace(/\s+/g," ").trim(),cls:/gold/.test(b.className)?"gold":"",a:"ov",v:i})):[]};
    }
    if(S.phase==="idle")return {...base,head:head("Spin the Randomizer","Anyone can tap it"),btns:[{t:"Randomizer",cls:"gold",a:"spin"}].concat(R().tapPick&&!S.multi?S.players.filter(q=>q.alive).map(q=>({t:q.name+" challenges",a:"chal",v:q.id,c:q.color})):[])};
    if(S.phase==="picking")return {...base,head:head("Randomizer…","Who's up?")};
    if(S.phase==="choose"){
      const ch=S.players[S.challenger];
      if(!ch)return {...base,head:head("Get ready")};
      if(!mine(p,S.challenger))return {...base,head:head(ch.name+" is choosing","Picking a square to challenge")};
      let btns;
      if(S.multi)btns=[...targetCells(S.challenger)].map(i=>{const o=S.players[S.grid.owner[i]];return {t:CATS[S.grid.cat[i]].name+" · "+o.name,a:"sq",v:i,c:o.color}});
      else btns=neighbours(S.challenger).map(id=>{const o=S.players[id];return {t:o.name+" · "+CATS[o.cat].name,a:"sq",v:id,c:o.color}});
      return {...base,head:head("Your turn, "+ch.name,S.multi&&S.origin!=null?"You landed on "+CATS[S.grid.cat[S.origin]].name+". Pick a square touching it":"Pick a square touching yours to challenge"),btns};
    }
    return {...base,head:head("The Floor","Watch the TV")};
  }
  function act(p,m){
    try{
      if(ovOpen()&&m.a==="ov"){
        const bs=ovButtons(),b=bs[m.i];if(!b)return;
        if($("duelGo")&&!mine(p,S.challenger))return;
        b.click();return;
      }
      if(m.a==="spin"&&S.phase==="idle"&&$("spin"))$("spin").click();
      else if(m.a==="chal"&&S.phase==="idle"&&R().tapPick)cellClick(m.i);
      else if(m.a==="sq"&&S.phase==="choose"&&mine(p,S.challenger)){
        if(S.multi){if(targetCells(S.challenger).has(m.i))cellClick(S.grid.owner[m.i],m.i)}
        else if(neighbours(S.challenger).includes(m.i))cellClick(m.i);
      }
    }catch(e){L.log&&L.log("floor act error",String(e))}
  }
  window.__FLP={sceneFor,act,active:()=>{const f=$("floor");return !!f&&!f.hidden}};
})();
