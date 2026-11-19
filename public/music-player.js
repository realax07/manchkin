// Local, reviewed PCM loops. Decode only on demand; cache at most two tracks.
export const MUSIC_TRACKS=Object.freeze({
 menu:'assets/audio/music/music-menu.wav',
 tableA:'assets/audio/music/music-table-a.wav',
 tableB:'assets/audio/music/music-table-b.wav',
 combat:'assets/audio/music/music-combat.wav',
 results:'assets/audio/music/music-results.wav'
});
export function musicScene(state){
 if(!state)return 'menu';
 if(state.winner!=null)return 'results';
 return state.phase==='combat'?'combat':'table';
}
export function createMusicPlayer({getContext,getBus,isActive,load=async(url,ctx,signal)=>{
 const response=await fetch(url,{signal});if(!response.ok)throw Error(`Music HTTP ${response.status}`);
 return ctx.decodeAudioData(await response.arrayBuffer());
},onChange=()=>{}}){
 const cache=new Map(),voices=new Set(),abort=new AbortController();
 let scene='menu',table='tableA',current=null,pending=null,version=0,disposed=false,error=null;
 const desired=()=>scene==='table'?table:scene;
 function bufferFor(id,ctx){
  if(cache.has(id)){const value=cache.get(id);cache.delete(id);cache.set(id,value);return value}
  const promise=Promise.resolve().then(()=>load(MUSIC_TRACKS[id],ctx,abort.signal));cache.set(id,promise);
  while(cache.size>2)cache.delete(cache.keys().next().value);
  promise.catch(()=>{if(cache.get(id)===promise)cache.delete(id)});return promise;
 }
 function retire(voice,time){
  if(voice.retiring)return;voice.retiring=true;
  // Hold the actual envelope value even during a previous fade-in.
  const elapsed=time-voice.started,level=Math.max(0,Math.min(1,elapsed/voice.fade));
  voice.gain.gain.cancelScheduledValues(time);voice.gain.gain.setValueAtTime(level,time);
  voice.gain.gain.linearRampToValueAtTime(0,time+1.5);voice.source.stop(time+1.55);
 }
 function sync(){
  const ctx=getContext(),id=desired();
  if(disposed||!ctx||ctx.state!=='running'||!isActive()||current?.id===id||pending?.id===id)return;
  const stamp=version;pending={id,stamp};
  void bufferFor(id,ctx).then(buffer=>{
   if(disposed||stamp!==version||desired()!==id||ctx.state!=='running'||!isActive())return;
   const time=ctx.currentTime,source=ctx.createBufferSource(),gain=ctx.createGain();
   source.buffer=buffer;source.loop=true;source.loopStart=0;source.loopEnd=buffer.duration;
   gain.gain.setValueAtTime(0,time);gain.gain.linearRampToValueAtTime(1,time+1.5);
   source.connect(gain);gain.connect(getBus());
   const voice={id,source,gain,started:time,fade:1.5,duration:buffer.duration,retiring:false};
   source.onended=()=>{voices.delete(voice);source.disconnect();gain.disconnect()};
   source.start(time);for(const old of voices)retire(old,time);
   voices.add(voice);current=voice;error=null;onChange();
  }).catch(()=>{if(!disposed&&stamp===version){error='Музыка не загрузилась. Открой настройки звука, чтобы повторить.';onChange()}})
   .finally(()=>{if(pending?.stamp===stamp){pending=null;if(!disposed)onChange()}});
 }
 return {
  setScene(value){
   if(!['menu','table','combat','results'].includes(value)||value===scene)return;
   scene=value;version++;pending=null;error=null;sync();
  },
  sync,
  tick(){
   const ctx=getContext();if(disposed||!ctx||ctx.state!=='running'||!isActive())return;
   // Alternate peaceful themes at their natural ends, never on every turn/render.
   if(scene==='table'&&current?.id===table&&ctx.currentTime-current.started>=current.duration-1.5){
    table=table==='tableA'?'tableB':'tableA';version++;pending=null;sync();
   }
  },
  get state(){return {scene,track:current?.id??null,loading:!!pending,error}},
  dispose(){disposed=true;version++;abort.abort();for(const voice of voices){try{voice.source.stop()}catch{}voice.source.disconnect();voice.gain.disconnect()}voices.clear();cache.clear();current=null;pending=null}
 };
}
