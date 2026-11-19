import {combatMonsters} from './combat.js';
import {appliedCombatBonus} from './combat-bonuses.js';
import {characterPower,itemBonus} from './card-effects.js';
import {signed,tableEffects} from './table-state.js';
import {has} from './traits.js';

const abilitySources={
 berserk:['Ярость воина','Warrior'],
 turn:['Изгнание нежити','Cleric','grantsTurn'],
 claws:['Когти друида','Druid'],
 backstab:['Подрезка','Thief','grantsBackstab'],
 illusion:['Иллюзия','Gnome']
};
const afflictionSources={
 naughty:'Santa',
 skunk:'Giant Skunk',
 squeak:'Psycho Squirrel'
};

// The visible hand belongs to a human seat, separately from the current action.
export function displayedActor(game,active){
 if(game.mode==='network')return active;
 const last=game.viewingPlayer;
 if(game.mode==='hotseat'&&game.players[last]&&!game.players[last].bot)return last;
 if(game.mode==='hotseat'&&!game.players[active]?.bot)return active;
 if(game.mode==='hotseat'){
  for(let offset=1;offset<game.players.length;offset++){
   const seat=(game.turn-offset+game.players.length)%game.players.length;
   if(!game.players[seat].bot)return seat;
  }
 }
 const human=game.players.findIndex(player=>!player.bot);
 return human===-1?active:human;
}

export function personalEffects(game,actor,catalog){
 const player=game.players[actor];
 const battle=game.phase==='combat'&&(game.turn===actor||game.helper===actor)?game:null;
 const monsters=battle?combatMonsters(game):[];
 const levelsOnly=monsters.some(monster=>monster.levelsOnly);
 const bonusesOnly=monsters.some(monster=>monster.bonusesOnly);
 const findCard=name=>catalog.find(card=>card.en===name);
 const curses=tableEffects(game).entries.filter(entry=>entry.actor===actor&&entry.side==='curse').map(entry=>({
  ...entry,
  card:entry.card||findCard(afflictionSources[entry.id.split('-')[0]])
 }));
 const buffs=[];
 if(!levelsOnly){
  for(const item of player.equipment){
   if(['class-aura','race-aura'].includes(item.slot)){
    const amount=itemBonus(player,item,battle);
    if(amount)buffs.push({card:item,amount,detail:'Учтено в силе снаряжения'});
   }
   if(item.itemEnhancers?.length){
    const delta=itemBonus(player,item,battle)-itemBonus(player,{...item,itemEnhancers:[]},battle);
    const total=item.itemEnhancers.reduce((sum,card)=>sum+(card.bonus||0),0);
    if(delta&&total)for(const card of item.itemEnhancers){
     if(card.bonus)buffs.push({card,amount:card.bonus*delta/total,detail:item.name});
    }
   }
  }
 }
 let personalBonus=0;
 if(battle) {
  for(const entry of game.bonusEntries||[]){
   const target=entry.kind==='ability'&&entry.tag!=='backstab'?entry.actor:entry.target;
   if(target!==actor)continue;
   const amount=appliedCombatBonus(game,entry,{levelsOnly});
   if(!amount)continue;
   const author=game.players[entry.actor];
   const ability=abilitySources[entry.tag];
   const card=(entry.cardUid!=null&&(game.combatCards||[]).find(played=>played.card.uid===entry.cardUid)?.card)||
    (ability&&author?.equipment.find(item=>item.en===ability[1]||ability[2]&&item[ability[2]]))||
    (ability&&findCard(ability[1]));
   buffs.push({card,amount,name:ability?.[0],detail:signed(amount)+' к силе в этом бою'});
   personalBonus+=amount;
  }
  if(!levelsOnly&&game.helper===actor&&has(player,'Ranger')){
   buffs.push({card:player.equipment.find(item=>item.en==='Ranger'),amount:2,detail:'+2 за помощь в бою'});
   personalBonus+=2;
  }
 }
 const doubles=levelsOnly?[]:(battle?.dopplegangers||[]).filter(entry=>entry.owner===actor);
 for(const double of doubles){
  const card=(game.combatCards||[]).find(played=>played.card.uid===double.uid)?.card;
  if(card)buffs.push({card,icon:'×2',detail:'Копирует силу в этом бою'});
 }
 let strength=(levelsOnly?player.level:characterPower(player,battle))+personalBonus;
 if(bonusesOnly)strength-=player.level;
 return {strength:strength*(1+doubles.length),curses,buffs};
}

export function bindPlayerCardPreviews(root){
 let trigger,preview,owner,pinned=false,timer;
 const match=event=>event.target.closest('[data-preview-card]');
 function hide(){
  clearTimeout(timer);
  if(trigger)trigger.setAttribute('aria-expanded','false');
  preview?.remove();
  trigger=preview=null;
  pinned=false;
 }
 function place(){
  if(!trigger?.isConnected){hide();return;}
  const {right,left,top}=trigger.getBoundingClientRect();
  const {width,height}=preview.getBoundingClientRect();
  const maxX=document.documentElement.clientWidth-8;
  const x=right+width+12<=maxX?right+12:left-width-12;
  preview.style.left=Math.max(8,Math.min(x,maxX-width))+'px';
  preview.style.top=Math.max(8,Math.min(top,window.innerHeight-height-8))+'px';
 }
 function show(button,keep=false){
  if(trigger===button&&preview){pinned=keep||pinned;preview.classList.toggle('pinned',pinned);return;}
  hide();
  const template=button.nextElementSibling;
  if(template?.tagName!=='TEMPLATE')return;
  trigger=button;
  owner=button.closest('[data-personal-actor]').dataset.personalActor;
  pinned=keep;
  preview=document.createElement('div');
  preview.className='player-card-preview'+(keep?' pinned':'');
  preview.setAttribute('role','region');
  preview.setAttribute('aria-label',button.textContent.trim());
  preview.append(template.content.cloneNode(true));
  document.body.append(preview);
  button.setAttribute('aria-expanded','true');
  place();
  preview.querySelectorAll('img').forEach(img=>{img.loading='eager';img.addEventListener('load',()=>{if(preview)place()},{once:true})});
 }
 root.addEventListener('pointerover',event=>{
  const button=match(event);
  if(!button||event.pointerType==='touch'||pinned||button.contains(event.relatedTarget))return;
  clearTimeout(timer);
  timer=setTimeout(()=>{if(button.isConnected)show(button)},170);
 });
 root.addEventListener('pointerout',event=>{
  const button=match(event);
  if(!pinned&&button&&!button.contains(event.relatedTarget))hide();
 });
 root.addEventListener('focusin',event=>{
  const button=match(event);
  if(button&&button.matches(':focus-visible'))show(button);
 });
 root.addEventListener('focusout',event=>{if(!pinned&&match(event))hide()});
 root.addEventListener('click',event=>{
  const button=match(event);
  if(button){
   if(button===trigger&&pinned)hide();
   else show(button,true);
  }
 });
 document.addEventListener('pointerdown',event=>{
  if(preview&&!trigger.contains(event.target)&&!preview.contains(event.target))hide();
 });
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&preview){event.stopImmediatePropagation();hide()}
 },true);
 document.addEventListener('scroll',()=>{if(preview)place()},true);
 window.addEventListener('resize',()=>{if(preview)place()});
 function refresh(){
  if(!preview||trigger.isConnected)return;
  const panel=root.querySelector('[data-personal-actor]');
  const replacement=panel?.dataset.personalActor===owner&&[...panel.querySelectorAll('[data-preview-card]')].find(button=>
   button.dataset.previewCard===trigger.dataset.previewCard&&
   button.nextElementSibling.innerHTML===trigger.nextElementSibling.innerHTML);
  if(!replacement){hide();return;}
  trigger=replacement;
  trigger.setAttribute('aria-expanded','true');
  place();
 }
 return {hide,refresh};
}
