// -- handlers/handleFridgeItemRemoveSumClick.js

import { handleFridgeItemRemoveSumPack } from '../handlers/handleFridgeItemRemoveSumPack.js';

// 冷蔵庫アイテムの削除ボタンをクリックしたときの処理
function handleFridgeItemRemoveSumClick() {
  const removeSum = document.getElementById('fridgeItemsRemoveSum');
  if (removeSum) {
    removeSum.addEventListener('click', (e) => {
      e.preventDefault();
      handleFridgeItemRemoveSumPack();
    });
  }
  }

export { handleFridgeItemRemoveSumClick };
  