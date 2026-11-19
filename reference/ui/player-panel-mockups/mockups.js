const panel = document.querySelector('#personal-panel');
const hand = document.querySelector('.inventory .hand');
const handTitle = document.querySelector('#hand-title');
const players = [...document.querySelectorAll('.players .player')];
const cards = [...hand.children].map(card => card.outerHTML);
const dialog = document.querySelector('#inventory-dialog');
const dialogContent = dialog.querySelector('.inventory-body');
const originalEquipment = dialogContent.innerHTML;
const inventoryTabs = [...dialog.querySelectorAll('[data-section]')];
const variantButtons = [...document.querySelectorAll('[data-variant]')];
const scenarioButtons = [...document.querySelectorAll('[data-scenario]')];

const people = {
 ruta: {
  name:'Рута', sex:'Женский', level:4, power:11, gear:6, bonus:1,
  classes:['Воин','Вор'], races:['Эльф','Дварф'],
  cards, doors:2, treasures:3,
  curses:[{symbol:'☠', name:'Курица на голове', detail:'−1 к броскам кубика'}],
  buffs:[{symbol:'+1', name:'Усиление класса', detail:'+1 к личной силе'}]
 },
 luta: {
  name:'Лутослава', sex:'Женский', level:1, power:1, gear:0, bonus:0,
  classes:[], races:['Человек'],
  cards:[cards[2],cards[4]], doors:0, treasures:2, curses:[], buffs:[]
 }
};
const empty = '<p class="empty-effects muted">Нет действующих</p>';
const inventoryButton = '<button type="button" class="outline inventory-trigger" id="open-personal-inventory" aria-haspopup="dialog"><span aria-hidden="true">▥</span> Инвентарь</button>';
let variant = ['a','b','c'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'a';
let scenario = 'own';
let displayedPlayer = '';

function effects(items, type, expandable = false) {
 if (!items.length) return empty;
 return '<ul>'+items.map(item=>`
  <li class="personal-effect ${type}"><span aria-hidden="true">${item.symbol}</span>
   ${expandable ? `<details class="effect-detail"><summary>${item.name}</summary><p>${item.detail}</p></details>` :
     `<div><b>${item.name}</b><small>${item.detail}</small></div>`}
  </li>`).join('')+'</ul>';
}

const cardName = data => `<div class="personal-name"><h3>${data.name}</h3><small>${data.sex}</small></div>`;
const identitySummary = data => `<dl class="personal-identities">
 <div><dt>Класс</dt><dd>${data.classes.join(' · ') || 'Без класса'}</dd></div>
 <div><dt>Раса</dt><dd>${data.races.join(' · ')}</dd></div>
</dl>`;
const grouped = (title, items, type, expandable) => `<section class="personal-group"><h4>${title}</h4>${effects(items,type,expandable)}</section>`;
const folded = (title, items, type) => `<details class="personal-fold"><summary>${title}<b>${items.length}</b></summary>${effects(items,type)}</details>`;
const layouts = {
 a: data => `${cardName(data)}${identitySummary(data)}
  <dl class="personal-stats"><div><dt>Уровень</dt><dd>${data.level}</dd></div><div><dt>Сила</dt><dd>${data.power}</dd></div></dl>
  ${grouped('Проклятия',data.curses,'curse')}${grouped('Усиления',data.buffs,'buff')}`,
 b: data => `<div class="personal-inline"><h3>${data.name}</h3></div>${identitySummary(data)}
  <dl class="personal-summary"><div><dt>Пол</dt><dd>${data.sex}</dd></div><div><dt>Уровень</dt><dd>${data.level}</dd></div><div><dt>Сила</dt><dd>${data.power}</dd></div></dl>
  ${folded('Проклятия',data.curses,'curse')}${folded('Усиления',data.buffs,'buff')}`,
 c: data => `<div class="power-total"><span>Личная сила</span><strong>${data.power}</strong></div>
  ${cardName(data)}${identitySummary(data)}
  <dl class="power-breakdown">
   <div><dt>Уровень</dt><dd>${data.level}</dd></div>
   <div><dt>Снаряжение</dt><dd>+${data.gear}</dd></div>
   <div><dt>Усиления</dt><dd>+${data.bonus}</dd></div>
  </dl>
  ${grouped('Проклятия',data.curses,'curse',true)}${grouped('Действующие усиления',data.buffs,'buff',true)}`
};

function fillExpandedSlots(kind, card, illustration, modifier, modifierIllustration) {
 const section = dialogContent.querySelector('.identity-section.' + kind);
 const firstSlot = section.querySelector('.identity-slots .gear-slot');
 const secondSlot = firstSlot.nextElementSibling;
 const modifierSlot = section.querySelector('.modifier-slot .gear-slot');
 section.querySelector('h4 span').textContent = '2 / 2';

 function fill(slot, name, illustrationFile, caption) {
  const art = firstSlot.querySelector('.card-illustration').cloneNode(true);
  art.setAttribute('aria-label', `Иллюстрация: ${name}`);
  art.querySelector('img').src = '../../../public/assets/illustrations/' + illustrationFile;
  art.querySelector('img').alt = '';
  slot.querySelector('svg').replaceWith(art);
  slot.classList.remove('empty','locked');
  slot.classList.add('occupied');
  slot.querySelector('strong').textContent = name;
  slot.querySelector('small').textContent = caption;
  slot.querySelector('.slot-state').textContent = '✓';
  slot.setAttribute('aria-label', name);
 }

 fill(secondSlot, card, illustration, 'В игре');
 fill(modifierSlot, modifier, modifierIllustration, 'До 2 разных');
}

function showInventory(data) {
 dialog.querySelector('.inventory-dialog-heading p').textContent = `${data.name} · уровень ${data.level}`;
 dialogContent.innerHTML = data === people.ruta ? originalEquipment :
   '<section id="inv-character" role="tabpanel"><p>Слоты снаряжения свободны. Раса — человек. Класс не выбран.</p></section><section id="inv-actions" role="tabpanel"><p>Нет активных способностей и проклятий.</p></section>';
 if (data === people.ruta) {
  fillExpandedSlots('class','Вор','thief-v1.jpg','Суперманчкин','super-munchkin-v1.jpg');
  fillExpandedSlots('race','Дварф','dwarf-v1.jpg','Полукровка','half-breed-v1.jpg');
 }
 dialogContent.querySelectorAll('button').forEach(button=>{button.disabled=true});
 selectInventoryTab('inv-character');
 dialog.showModal();
}
function selectInventoryTab(id) {
 inventoryTabs.forEach(tab=>tab.setAttribute('aria-selected', String(tab.dataset.section===id)));
 dialogContent.querySelectorAll(':scope > section').forEach(section=>{section.hidden=section.id!==id});
 dialogContent.scrollTop=0;
}

function paint(force = false) {
 const data = scenario === 'shared' ? people.luta : people.ruta;
 if (force || displayedPlayer!==data.name) {
  panel.innerHTML = layouts[variant](data)+inventoryButton;
  panel.querySelector('button').onclick = () => showInventory(data);
 }
 if(displayedPlayer!==data.name) {
  const count = data.cards.length;
  handTitle.innerHTML = `Рука: ${data.name} <span>${count} ${count===5?'карт':'карты'} · ${data.doors} ${data.doors===2?'двери':'дверей'} · ${data.treasures} сокровищ${data.treasures===2?'а':''}</span>`;
  hand.innerHTML = data.cards.join('');
  hand.querySelectorAll('button').forEach(button=>{button.disabled=true;button.classList.add('mock-inactive')});
 }
 displayedPlayer=data.name;
 const acting = scenario === 'bot' ? 1 : scenario === 'shared' ? 2 : 0;
 players.forEach((player,index) => {player.classList.toggle('current',index===acting)});
 players[0].querySelectorAll('.player-stat b')[1].textContent=people.ruta.power;
 players[0].querySelector('.player-name small').textContent=acting===0?'ИСКАТЕЛЬ · Ж · ХОДИТ':'ИСКАТЕЛЬ · Ж';
 const actor = players[acting].querySelector('.player-name strong').textContent;
 document.querySelector('.table-situation small').textContent = actor;
 document.querySelector('.table-situation strong').textContent = scenario === 'bot' ? 'Бот обдумывает ход' : 'Время открыть дверь';
 document.querySelector('.table-last-event p').textContent = `${actor} начинает ход.`;
 document.querySelector('.last-mock-event').textContent = `${actor} начинает ход.`;
 const action=document.querySelector('.board .actions button');
 action.disabled=scenario==='bot';
 variantButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.variant===variant)));
 scenarioButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.scenario===scenario)));
}

document.querySelector('.logs .log p').classList.add('last-mock-event');
document.querySelectorAll('#app button, #app [role="button"]').forEach(node=>{
 if(node.tagName==='BUTTON'){node.disabled=true;node.classList.add('mock-inactive')}
 else node.removeAttribute('tabindex');
});
inventoryTabs.forEach(tab=>{tab.onclick=()=>selectInventoryTab(tab.dataset.section)});
dialog.querySelector('#inventory-close').onclick=()=>dialog.close();
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
variantButtons.forEach(button=>{
 button.onclick=()=>{variant=button.dataset.variant;history.replaceState(null,'','#'+variant);paint(true)};
});
scenarioButtons.forEach(button=>{
 button.onclick=()=>{scenario=button.dataset.scenario;paint()};
});
paint(true);
