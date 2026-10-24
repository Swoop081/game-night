/* Android TV app only: the TV's WebView has no Web Speech API, so bridge to the native recogniser.
   Does nothing in a normal browser. */
(function(){
  if(!window.GNAndroid||window.SpeechRecognition||window.webkitSpeechRecognition)return;
  let ok=false;try{ok=GNAndroid.available()}catch(e){}
  if(!ok)return;
  let cur=null,fresh=true;
  window.__gnSR={
    started(){cur&&cur.onstart&&cur.onstart()},
    session(){fresh=true},          // a new listening session began: its words get a new result slot
    result(texts,fin){
      if(!cur||!cur.active)return;
      const alt=texts.map(t=>({transcript:t,confidence:.9}));alt.isFinal=fin;
      if(fresh||!cur.results.length){cur.results.push(alt);fresh=false}else cur.results[cur.results.length-1]=alt;
      if(fin)fresh=true;
      cur.onresult&&cur.onresult({resultIndex:cur.results.length-1,results:cur.results});
    },
    error(code){const r=cur;if(!r||!r.active)return;if(code)r.onerror&&r.onerror({error:code});r.active=false;r.onend&&r.onend()}
  };
  function SR(){this.lang="en-AU";this.active=false}
  SR.prototype.start=function(){if(this.active)return;cur=this;this.active=true;this.results=[];fresh=true;GNAndroid.start(this.lang||"en-AU")};
  SR.prototype.stop=SR.prototype.abort=function(){if(!this.active)return;this.active=false;GNAndroid.stop()};
  window.SpeechRecognition=SR;
})();
