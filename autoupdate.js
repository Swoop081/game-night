/* Keeps the app current: checks version.txt (never cached) and reloads at a quiet moment when a newer build is published.
   Needed because the TV browser caches files for ~10 minutes. */
(function(){
  const BUILD=21;
  const quiet=()=>{const on=id=>{const e=document.getElementById(id);return e&&!e.hidden};return on("hub")||on("setup")};
  const check=()=>{
    fetch("version.txt?t="+Date.now(),{cache:"no-store"}).then(r=>r.text()).then(t=>{
      const v=parseInt(t,10);
      if(v>BUILD&&quiet()){location.replace(location.pathname+"?r="+Date.now()+location.hash)}
    }).catch(()=>{});
  };
  setTimeout(check,4000);setInterval(check,25000);
})();
