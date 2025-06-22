// -- handlers/handleFridgeItemRemoveClick.js

import { handleFridgeItemRemovePack } from '../handlers/handleFridgeItemRemovePack.js';

// 冷蔵庫アイテムの削除ボタンをクリックしたときの処理
function handleFridgeItemRemoveClick() {
    const forms = document.querySelectorAll('.m-fridge-detail-form');
    if (forms.length > 0) {
      forms.forEach(form => {
        const removeBtn = form.querySelector('button[data-switch="remove"]');
        removeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          handleFridgeItemRemovePack(form);
        })
      })
    }
  }

export { handleFridgeItemRemoveClick };
  