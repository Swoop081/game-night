/* TV remote niceties: text boxes need a double press of OK before the on-screen keyboard opens,
   so moving the focus past one with the D-pad no longer pops the keyboard up. */
(function(){
if(!/GameNightTV/.test(navigator.userAgent))return;
const TEXT=el=>el&&el.tagName==="INPUT"&&/^(text|search|tel|email|url|number|)$/i.test(el.type||"");
const arm=el=>{if(TEXT(el)&&!el.dataset.tvArmed){el.dataset.tvArmed="1";el.readOnly=true;el.setAttribute("inputmode","none")}};
const scan=root=>(root.querySelectorAll?root.querySelectorAll("input"):[]).forEach(arm);
scan(document);
new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.tagName==="INPUT")arm(n);else scan(n)}}))).observe(document.documentElement,{childList:true,subtree:true});
let toast;const hint=()=>{if(toast)return;toast=document.createElement("div");toast.className="tvtoast";toast.textContent="Press OK again to type";document.body.appendChild(toast);setTimeout(()=>{toast&&toast.remove();toast=null},1400)};
let lastEv=0,lastEl=null,lastT=0;
function press(el){
  const now=Date.now();
  if(now-lastEv<90)return;lastEv=now; // one press can arrive as both keydown and click
  if(el===lastEl&&now-lastT<900){
    lastEl=null;
    el.readOnly=false;el.setAttribute("inputmode","text");el.dataset.tvSkip="1";el.blur();el.focus();delete el.dataset.tvSkip;
    try{const n=el.value.length;el.setSelectionRange(n,n)}catch(e){}
    if(window.GNAndroid&&GNAndroid.showKeyboard)try{GNAndroid.showKeyboard()}catch(e){}
    return;
  }
  lastEl=el;lastT=now;hint();
}
document.addEventListener("click",e=>{const el=e.target;if(TEXT(el)&&el.readOnly){e.preventDefault();press(el)}},true);
document.addEventListener("keydown",e=>{const el=e.target;if(TEXT(el)&&el.readOnly&&(e.key==="Enter"||e.keyCode===23||e.keyCode===13)){e.preventDefault();press(el)}},true);
document.addEventListener("focusout",e=>{const el=e.target;if(TEXT(el)&&el.dataset.tvArmed&&!el.dataset.tvSkip){el.readOnly=true;el.setAttribute("inputmode","none")}},true);
})();
