/* Real photos for the picture categories, free from Wikipedia / Wikimedia Commons.
   Categories listed in SPEC switch to photo mode (the photo is found from the answer, or from the clue where the photo IS the clue).
   If photos can't be loaded (offline, or too few found) the category quietly falls back to its original emoji/text version. */
(function(){
  const SMALL=new Set(["of","and","the","de","la","in","on","a","an","to","for","vs"]);
  const sc=s=>String(s).charAt(0).toUpperCase()+String(s).slice(1);
  const tc=s=>String(s).replace(/[A-Za-z][A-Za-z'’]*/g,(w,i)=>(i>0&&SMALL.has(w.toLowerCase()))?w.toLowerCase():w[0].toUpperCase()+w.slice(1));
  const uniq=a=>[...new Set(a.filter(Boolean))];
  const base=s=>uniq([sc(s),tc(s)]);
  const THE={"united states":1,"united kingdom":1,"netherlands":1,"philippines":1,"united arab emirates":1,"czechia":1,"bahamas":1,"gambia":1};
  const flagC=n=>{const k=String(n).toLowerCase().trim();const nm=tc(n);const list=[];
    if(k==="czechia")list.push("Flag of the Czech Republic","Flag of Czechia");
    else if(THE[k])list.push("Flag of the "+nm);
    list.push("Flag of "+nm);return uniq(list)};
  const OV={ // answer -> exact Wikipedia titles where the plain word is the wrong page
    animals:{turkey:["Turkey (bird)"],seal:["Pinniped"],bat:["Bat"],ram:["Sheep"],bull:["Cattle"]},
    objects:{key:["Key (lock)"],phone:["Telephone"],"mobile phone":["Mobile phone"],mouse:["Computer mouse"],glasses:["Glasses"],lock:["Lock (security device)"]},
    weather:{sun:["Sun"],moon:["Moon"],cloud:["Cloud"]},
    countries:{washington:["Washington, D.C."]},
    people:{santa:["Santa Claus"],"santa claus":["Santa Claus"]}
  };
  const bySpec={
    animals:it=>OV.animals[it.a]||base(it.a),
    food:it=>base(it.a),
    flags:it=>flagC(it.a),
    capitals:it=>flagC(it.p),
    countries:it=>OV.countries[String(it.p).toLowerCase()]||base(it.p),
    sports:it=>base(it.a),
    transport:it=>base(it.a),
    people:it=>OV.people[it.a]||base(it.a),
    weather:it=>OV.weather[it.a]||base(it.a),
    objects:it=>OV.objects[it.a]||base(it.a),
    halloween:it=>base(it.a),
    grocery:it=>base(it.a),
    bunnings:it=>base(it.a),
    plants:it=>base(it.a),
    landmarks:it=>base(it.p),
    pokemon:it=>base(it.a),
    videogames:it=>base(it.a)
  };
  const CONTAIN={flags:1,capitals:1};
  Object.keys(bySpec).forEach(id=>{
    const cat=CATS[id];if(!cat||cat.kind==="photo")return;
    cat.orig={kind:cat.kind,items:cat.items};
    cat.items=cat.items.map(it=>{const pc=bySpec[id](it);return {...it,p:pc[0],pc,o:it.p}});
    cat.kind="photo";if(CONTAIN[id])cat.fit="contain";
  });

  // one loader for every photo category: tries each candidate title, keeps what has a picture
  window.loadPhotos=function(id){
    const cat=CATS[id];if(cat.kind!=="photo")return Promise.resolve(true);
    if(cat.ready)return cat.ready;
    const all=cat.all||(cat.all=cat.items.slice());
    const titles=uniq(all.flatMap(it=>it.pc||[it.p]));
    const chunks=[];for(let i=0;i<titles.length;i+=45)chunks.push(titles.slice(i,i+45));
    const ctl=new AbortController();const to=setTimeout(()=>ctl.abort(),9000);
    const giveUp=()=>{clearTimeout(to);if(cat.orig){cat.kind=cat.orig.kind;cat.items=cat.orig.items;cat.fit=null;cat.ready=Promise.resolve(true);return true}cat.ready=null;return false};
    cat.ready=Promise.all(chunks.map(ch=>fetch("https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=thumbnail&pithumbsize=900&redirects=1&titles="+encodeURIComponent(ch.join("|")),{signal:ctl.signal}).then(r=>r.json())))
     .then(res=>{
       const img={};
       res.forEach(j=>{const q=j.query||{};const map={};(q.normalized||[]).forEach(n=>map[n.from]=n.to);(q.redirects||[]).forEach(n=>map[n.from]=n.to);
         Object.values(q.pages||{}).forEach(pg=>{if(pg.thumbnail&&!/\.svg\.png$/i.test("")){img[pg.title]=pg.thumbnail.source}});
         Object.keys(map).forEach(f=>{let t=map[f];if(map[t])t=map[t];if(img[t])img[f]=img[t]})});
       all.forEach(it=>{it.img=null;for(const t of (it.pc||[it.p])){const v=img[t]||img[t.replace(/_/g," ")];if(v){it.img=v;break}}});
       const ok=all.filter(it=>it.img);
       if(ok.length<8)return giveUp();
       cat.items=ok;
       ok.slice(0,12).forEach(it=>{const im=new Image();im.src=it.img});
       clearTimeout(to);return true;
     }).catch(()=>giveUp());
    return cat.ready;
  };

  // flags etc. look better whole, not cropped
  const rq=window.renderQ;
  if(typeof rq==="function")window.renderQ=function(){const r=rq.apply(this,arguments);try{const d=S.duel,q=document.getElementById("q");if(d&&CATS[d.cat].fit==="contain"&&q.classList.contains("photo"))q.classList.add("contain")}catch(e){}return r};
})();
