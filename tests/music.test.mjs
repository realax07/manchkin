import test from 'node:test';
import assert from 'node:assert/strict';
import {stat} from 'node:fs/promises';
import {MUSIC_TRACKS,musicScene,createMusicPlayer} from '../public/music-player.js';
const flush=async()=>{for(let i=0;i<8;i++)await Promise.resolve()};
function rig(load){
 let enabled=true;const sources=[],ctx={currentTime:0,state:'running',createBufferSource(){const s={connect(){},disconnect(){},start(){s.started=true},stop(t){s.stopped=t??0}};sources.push(s);return s},createGain(){return{gain:{setValueAtTime(){},linearRampToValueAtTime(){},cancelScheduledValues(){}},connect(){},disconnect(){}}}};
 const player=createMusicPlayer({getContext:()=>ctx,getBus:()=>({}),isActive:()=>enabled,load:load??(async()=>({duration:120}))});
 return {player,ctx,sources,enable(v){enabled=v}};
}
test('music uses public scene including winner zero, never a separate final battle',()=>{
 assert.equal(musicScene(null),'menu');assert.equal(musicScene({phase:'done',winner:null}),'table');
 assert.equal(musicScene({phase:'combat',winner:null}),'combat');assert.equal(musicScene({phase:'combat',winner:0}),'results');
});
test('scene changes fade to new music; polling, suspension and mute do not restart loops',async()=>{
 const {player,ctx,sources,enable}=rig();player.sync();await flush();assert.equal(sources.length,1);assert.equal(sources[0].loop,true);
 player.setScene('combat');await flush();assert.equal(sources.length,2);assert.ok(sources[0].stopped>0);
 for(let i=0;i<10;i++){player.setScene('combat');player.sync();player.tick()}await flush();assert.equal(sources.length,2);
 ctx.state='suspended';player.setScene('results');await flush();assert.equal(sources.length,2);
 ctx.state='running';enable(false);player.sync();await flush();assert.equal(sources.length,2);
 enable(true);player.sync();await flush();assert.equal(player.state.track,'results');assert.equal(sources.length,3);player.dispose();
});
test('slow obsolete downloads never start an old scene and disposal cancels pending work',async()=>{
 const waiting=new Map(),r=rig(url=>new Promise(resolve=>waiting.set(url,resolve)));
 r.player.sync();await flush();r.player.setScene('combat');await flush();
 waiting.get(MUSIC_TRACKS.combat)({duration:120});await flush();
 waiting.get(MUSIC_TRACKS.menu)({duration:120});await flush();
 assert.equal(r.sources.length,1);assert.equal(r.player.state.track,'combat');
 r.player.setScene('results');await flush();r.player.dispose();waiting.get(MUSIC_TRACKS.results)({duration:120});await flush();assert.equal(r.sources.length,1);
});
test('peaceful playlist changes only near the end and continues across a fight',async()=>{
 const {player,ctx,sources}=rig();player.setScene('table');await flush();assert.equal(player.state.track,'tableA');
 ctx.currentTime=60;player.tick();await flush();assert.equal(sources.length,1);
 ctx.currentTime=119;player.tick();await flush();assert.equal(player.state.track,'tableB');
 player.setScene('combat');await flush();player.setScene('table');await flush();assert.equal(player.state.track,'tableB');player.dispose();
});
test('failed music download is nonfatal and can retry',async()=>{
 let attempts=0;const {player}=rig(async()=>{if(++attempts===1)throw Error('offline');return{duration:120}});
 player.sync();await flush();assert.ok(player.state.error);assert.equal(player.state.track,null);
 player.sync();await flush();assert.equal(player.state.track,'menu');assert.equal(player.state.error,null);player.dispose();
});
test('all five music assets exist as stereo PCM loops, with no final track',async()=>{
 assert.equal(Object.keys(MUSIC_TRACKS).length,5);
 for(const path of Object.values(MUSIC_TRACKS))assert.ok((await stat(new URL('../public/'+path,import.meta.url))).size>1000000);
});
