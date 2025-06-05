// -- handlers/handleFridgeRemovePack.js

import { fetchFridgeRemove } from '../api/fetchFridgeRemove.js';
import { fetchFridgeSummary } from '../api/fetchFridgeSummary.js';

// 新規追加ボタンをクリックしたときの処理
function handleFridgeRemoveSumPack() {
  const checkedBoxes = document.querySelectorAll('input[name="fridgeRemoveCheck"]:checked');

    const ids = Array.from(checkedBoxes).map(item => item.value);

    if (ids.length === 0) return;

    Promise.all(ids.map(id => fetchFridgeRemove(id)))
    .then(() => {
      fetchFridgeSummary();
      console.log("一括削除成功");
    })
    .catch(err => {
      console.error('一部削除に失敗しました:', err);
    });
};
  
export { handleFridgeRemoveSumPack }