/* Setup screens must fit one TV screen: two columns in landscape + automatic shrink-to-fit so Start is never clipped. */
(function(){
  const IDS=["setup","hlSetup","cdSetup","ntSetup","ffSetup","tpSetup","pbSetup","wfSetup","dtSetup"];
  const sel=IDS.map(i=>"#"+i).join(",");
  const L=s=>IDS.map(i=>".landscape #"+i+" "+s).join(",");
  const css=`
${IDS.map(i=>".landscape #"+i).join(",")}{overflow:hidden!important}
${L(".setup-grid")}{grid-template-columns:minmax(0,1.5fr) minmax(0,1fr)!important;align-items:start}
${L(".setup-grid>.panel:last-child")}{order:0!important}
${L(".setup-grid>.panel:first-child")}{display:flex!important;flex-direction:column}
${L(".setup-grid>.panel:first-child .seg button")}{padding:.35em .7em}
${L(".rules")}{font-size:clamp(.62rem,1.6vh,.8rem)!important;line-height:1.3!important}
`;
  const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
  function fit(s){
    const g=s.querySelector(".setup-grid");if(!g)return;
    if(!document.documentElement.classList.contains("landscape")&&!document.body.classList.contains("landscape")&&!document.querySelector(".landscape")){g.style.zoom="";return}
    g.style.zoom="1";let z=1;
    for(let i=0;i<6&&s.scrollHeight>s.clientHeight+1;i++){
      z=Math.max(.4,z*(s.clientHeight/s.scrollHeight)*.98);g.style.zoom=z.toFixed(3);
    }
    s.scrollTop=0;
  }
  let last="";
  setInterval(()=>{
    document.querySelectorAll(sel).forEach(s=>{
      if(s.hidden||!s.isConnected||s.closest("[hidden]"))return;
      const sig=s.id+"|"+s.scrollHeight+"|"+s.clientHeight+"|"+(s.querySelector(".setup-grid")||{}).style?.zoom;
      const key=s.id+innerWidth+"x"+innerHeight+s.querySelectorAll("*").length+(s.textContent.length);
      if(s.__k!==key||s.scrollHeight>s.clientHeight+1){s.__k=key;fit(s)}
    });
  },400);
})();
