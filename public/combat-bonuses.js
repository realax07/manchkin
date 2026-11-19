import {hasMirror} from './curses.js';
export function addCombatBonus(g,amount,{actor=g.turn,target=g.turn,kind='ability',tag=null,fire=false,cardUid=null}={}){g.boost=(g.boost||0)+amount;g.bonusEntries??=[];g.bonusEntries.push({amount,actor,target,kind,tag,fire,...(cardUid===null?{}:{cardUid})});return amount}
export function appliedCombatBonus(g,entry,{levelsOnly=false}={}){
 const {amount,kind,fire,target}=entry;
 if(kind==='monster')return 0;
 if(amount<=0)return amount;
 if(levelsOnly||fire&&(g.monsters||[g.monster]).some(m=>m?.immuneFire)||kind==='item'&&hasMirror(g.players[target]))return 0;
 return fire&&kind==='item'&&(g.monsters||[]).some(m=>m.doubleFire)?2*amount:amount;
}
export function combatBoost(g,{levelsOnly=false}={}){
 const entries=g.bonusEntries||[];
 const untracked=(g.boost||0)-entries.reduce((total,entry)=>total+entry.amount,0);
 return (levelsOnly?Math.min(untracked,0):untracked)+entries.reduce((total,entry)=>total+appliedCombatBonus(g,entry,{levelsOnly}),0);
}
export function dropIllusion(g){g.boost-=(g.illusionBonus||0);g.illusionBonus=0;g.bonusEntries=(g.bonusEntries||[]).filter(e=>e.tag!=='illusion')}

export function monsterSideBoost(g){return -(g.bonusEntries||[]).filter(e=>e.kind==='monster'&&!(e.fire&&(g.monsters||[g.monster]).some(m=>m?.immuneFire))).reduce((n,e)=>n+e.amount,0)}
