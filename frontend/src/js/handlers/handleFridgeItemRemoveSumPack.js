// -- handlers/handleFridgeItemRemoveSumPack.js

import { fetchFridgeItemRemove } from '../api/fetchFridgeItemRemove.js';
import { fetchFridgeItemSummary } from '../api/fetchFridgeItemSummary.js';

// フォームの入力値を取得してAPIに送信する関数
function handleFridgeItemRemoveSumPack() {
  const checkedBoxes = document.querySelectorAll('input[name="fridgeItemCheck"]:checked');
  const ids = Array.from(checkedBoxes).map(id => id.value);

  if (ids.length === 0) return;

    Promise.all(ids.map(id => fetchFridgeItemRemove(id)))
    .then(() => {
      fetchFridgeItemSummary();
    })
    .catch(err => {
      console.error('一部削除に失敗しました:', err);
    });
  };

  export { handleFridgeItemRemoveSumPack };