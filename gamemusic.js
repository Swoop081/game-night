/* Background music for Higher or Lower, The Price Is Right, Name Ten and Picture Blitz. All synthesised, no files. */
(function(){
  const mtof=n=>440*Math.pow(2,(n-69)/12);
  const STY={
    hl:{bpm:104,swing:.18,bass:"triangle",chord:"triangle",kick:[0,8],hat:2,mel:[72,74,76,79,81,84],melP:.35,vol:1,
        ch:[[48,[60,64,67,71]],[45,[57,61,64,67]],[50,[62,65,69,72]],[43,[59,62,65,67]]]},
    cd:{bpm:120,swing:0,bass:"triangle",chord:"square",kick:[0,4,8,12],hat:2,mel:[72,74,76,79,81,84],melP:.4,vol:.8,
        ch:[[48,[60,64,67]],[43,[59,62,67]],[45,[57,60,64]],[41,[57,60,65]]]},
    nt:{bpm:126,swing:0,bass:"square",chord:"sawtooth",kick:[0,8],hat:1,mel:[69,72,74,76,79,81],melP:.45,vol:.7,
        ch:[[45,[57,60,64]],[41,[57,60,65]],[48,[60,64,67]],[43,[59,62,67]]]},
    pb:{bpm:132,swing:0,bass:"sawtooth",chord:"sawtooth",kick:[0,4,8,12],hat:2,mel:[64,67,71,74,76,79],melP:.3,vol:.7,
        ch:[[40,[59,64,67]],[48,[60,64,67]],[43,[59,62,67]],[50,[62,66,69]]]}
  };
  let m=null,timer=null,sty=null,id=null,next=0,step=0,bar=0;
  const on=()=>S.prefs.sound&&typeof ac==="function"&&ac();
  function env(f,type,dur,vol,t,dest,f2){
    const c=ac(),o=c.createOscillator(),g=c.createGain();
    o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+dur);
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.connect(g);g.connect(dest||m);o.start(t);o.stop(t+dur+.05);
  }
  function hat(t,vol){
    const c=ac(),n=c.sampleRate*.05,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;
    const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type="highpass";f.frequency.value=7000;const g=c.createGain();
    g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+.05);s.connect(f);f.connect(g);g.connect(m);s.start(t);
  }
  function sched(){
    if(!m)return;const c=ac(),st=60/sty.bpm/4;
    while(next<c.currentTime+.25){
      const s=step%16,t=next+((s%2===1)?sty.swing*st:0),[root,notes]=sty.ch[bar%4];
      if(sty.kick.includes(s)){env(120,"sine",.18,.5,t,null,45)}
      if(s%sty.hat===sty.hat-1||sty.hat===1)hat(t,.07);
      if(s===0||s===8)env(mtof(root),sty.bass,.42,.32,t);
      else if(s===12||s===4&&sty.hat===1)env(mtof(root+(s===12?7:12)),sty.bass,.2,.22,t);
      if(s===4||s===10||s===14){notes.forEach(n=>env(mtof(n),sty.chord,.22,.045,t))}
      if(s%2===0&&Math.random()<sty.melP){const n=sty.mel[Math.floor(Math.random()*sty.mel.length)];env(mtof(n),"sine",.5,.07,t);env(mtof(n+12),"triangle",.3,.02,t)}
      next+=st;step++;if(step%16===0)bar++;
    }
  }
  function start(k){
    const c=on();if(!c||m)return;sty=STY[k];id=k;
    m=c.createGain();m.gain.value=0;m.connect(c.destination);m.gain.linearRampToValueAtTime(.55*sty.vol,c.currentTime+1.5);
    next=c.currentTime+.1;step=0;bar=0;timer=setInterval(sched,80);
  }
  function stop(){
    clearInterval(timer);timer=null;id=null;if(!m)return;const mm=m;m=null;
    try{mm.gain.setTargetAtTime(0,ac().currentTime,.2)}catch(e){}setTimeout(()=>{try{mm.disconnect()}catch(e){}},900);
  }
  /* follow whichever of the four games is on screen */
  setInterval(()=>{
    let g=null;for(const k of ["hl","cd","nt","pb"]){const e=document.getElementById(k);if(e&&!e.hidden){g=k;break}}
    if(g&&S.prefs.sound){if(id&&id!==g)stop();if(!id)start(g)}else if(id)stop();
  },600);
  /* Higher or Lower reveal: drum roll then a big ding or buzzer (runs on its own bus so it stays clear of the music) */
  function reveal(delta){
    const c=on();if(!c)return;const t=c.currentTime,g=c.createGain();g.gain.value=1;g.connect(c.destination);
    for(let i=0;i<10;i++)env(180+i*6,"triangle",.07,.1+i*.012,t+i*.045,g,120);
    const at=t+.5;
    if(delta>0){[784,988,1318].forEach((f,i)=>env(f,"triangle",.5,.2,at+i*.09,g));env(1568,"sine",.9,.14,at+.27,g)}
    else if(delta<0){env(110,"sawtooth",.7,.3,at,g);env(116,"square",.7,.2,at,g);env(80,"sawtooth",.7,.2,at+.05,g)}
    else{env(330,"triangle",.3,.18,at,g);env(294,"triangle",.4,.18,at+.15,g)}
  }
  window.GMUSIC={start,stop,reveal};
})();
