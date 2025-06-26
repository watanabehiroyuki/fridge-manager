// -- handlers/handleFridgeItemRemoveSumClick.js

import { handleFridgeItemRemoveSumPack } from '../handlers/handleFridgeItemRemoveSumPack.js';

// 冷蔵庫アイテムの削除ボタンをクリックしたときの処理

let isItemRemoveSumClickInitialized = false;

function handleFridgeItemRemoveSumClick() {

  console.log('[登録] handleFridgeItemRemoveSumClick 実行されました');

  if (isItemRemoveSumClickInitialized) return;
  isItemRemoveSumClickInitialized = true;

  const removeSum = document.getElementById('fridgeItemsRemoveSum');
  if (removeSum) {
    removeSum.addEventListener('click', (e) => {
      console.log('[実行] 一括削除ボタンがクリックされました');
      e.preventDefault();
      handleFridgeItemRemoveSumPack();
    });
  }

  console.log('[登録完了] 一括削除イベントを登録しました');
}

export { handleFridgeItemRemoveSumClick };
  