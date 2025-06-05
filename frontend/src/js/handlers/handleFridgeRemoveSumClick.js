// -- handlers/handleFridgeRemoveSumClick.js

import { handleFridgeRemoveSumPack } from './handleFridgeRemoveSumPack.js';

// 新規追加ボタンをクリックしたときの処理

let isRemoveSumClickInitialized = false;

function handleFridgeRemoveSumClick() {

  if (isRemoveSumClickInitialized) return;
  isRemoveSumClickInitialized = true;

  console.log('[登録] handleRemoveSumClick 実行されました');

  const removeSumBtn = document.getElementById('fridgeRemoveSumBtn');
  if (removeSumBtn) {
    removeSumBtn.addEventListener('click', (e) => {
      console.log('[実行] 一括削除ボタンがクリックされました');
      e.preventDefault();
      handleFridgeRemoveSumPack();
    })

    console.log('[登録完了] 一括削除イベントを登録しました');

  }

};
  
export { handleFridgeRemoveSumClick }

