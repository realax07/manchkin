export function inventoryViewState(root) {
 const dialog = root.querySelector('[data-inventory-dialog][open]');
 if (!dialog) return null;
 return {
  player: dialog.dataset.inventoryDialog,
  tab: dialog.querySelector('[aria-selected="true"]')?.dataset.inventoryTab,
  scroll: dialog.querySelector('.inventory-body').scrollTop
 };
}

export function bindInventoryDialog(root, {canOpen = () => true, restore = null, onOpen = () => {}} = {}) {
 const trigger = root.querySelector('[data-inventory-open]');
 const dialog = root.querySelector('[data-inventory-dialog]');
 if (!trigger || !dialog) return;
 const tabs = [...dialog.querySelectorAll('[data-inventory-tab]')];
 const panels = [...dialog.querySelectorAll('[data-inventory-panel]')];
 const body = dialog.querySelector('.inventory-body');

 // The network view prefixes IDs when copying the game markup.
 trigger.setAttribute('aria-controls', dialog.id);
 dialog.setAttribute('aria-labelledby', dialog.querySelector('h2').id);
 tabs.forEach((tab, index) => {
  tab.setAttribute('aria-controls', panels[index].id);
  panels[index].setAttribute('aria-labelledby', tab.id);
 });

 function selectTab(key) {
  tabs.forEach(tab => {
   const selected = tab.dataset.inventoryTab === key;
   tab.setAttribute('aria-selected', String(selected));
   tab.tabIndex = selected ? 0 : -1;
  });
  panels.forEach(panel => { panel.hidden = panel.dataset.inventoryPanel !== key; });
  body.scrollTop = 0;
 }

 function open(state) {
  if (dialog.open || !canOpen()) return;
  onOpen();
  selectTab(state?.tab || 'character');
  dialog.showModal();
  body.scrollTop = state?.scroll || 0;
 }

 trigger.onclick = () => open();
 dialog.querySelector('[data-inventory-close]').onclick = () => dialog.close();
 let pressedBackdrop = false;
 dialog.addEventListener('pointerdown', event => { pressedBackdrop = event.target === dialog; });
 dialog.addEventListener('click', event => {
  if (pressedBackdrop && event.target === dialog) dialog.close();
  pressedBackdrop = false;
 });
 dialog.addEventListener('close', () => {
  if (trigger.isConnected && document.activeElement === document.body) trigger.focus({preventScroll:true});
 });

 tabs.forEach((tab, index) => {
  tab.onclick = () => selectTab(tab.dataset.inventoryTab);
  tab.onkeydown = event => {
   const last = tabs.length - 1;
   let next = index;
   if (event.key === 'ArrowLeft') next = (index + last) % tabs.length;
   else if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
   else if (event.key === 'Home') next = 0;
   else if (event.key === 'End') next = last;
   else return;
   event.preventDefault();
   selectTab(tabs[next].dataset.inventoryTab);
   tabs[next].focus();
  };
 });

 if (restore && restore.player === dialog.dataset.inventoryDialog) open(restore);
}
