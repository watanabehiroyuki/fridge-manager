// -- handlers/handleFridgeItemUpDateClick.js

import { handleFridgeItemUpDatePack } from '../handlers/handleFridgeItemUpDatePack.js';

// 冷蔵庫アイテムの更新ボタンをクリックしたときの処理
function handleFridgeItemUpdateClick(form) {
    const updateBtn = form.querySelector('button[data-switch="update"]');
    if (updateBtn) {
      updateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleFridgeItemUpDatePack(form);
      });
    }
  };
  
export { handleFridgeItemUpdateClick };