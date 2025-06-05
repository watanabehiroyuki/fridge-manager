// -- handlers/handleUserRemovePack.js

import { fetchUserRemove } from '../api/fetchUserRemove.js';
import { fetchFridgeSummary } from '../api/fetchFridgeSummary.js';

// 新規追加ボタンをクリックしたときの処理
async function handleUserRemovePack(fridge, removeBtn) {

  const userId = removeBtn.value;
  const fridgeId = fridge.id.replace("fridge-", "");

    // ログ出力（確認用）
    console.log('[完了]ユーザーID削除準備:', JSON.stringify({ userId }));
    console.log(fridgeId);

    await fetchUserRemove(fridgeId, userId);
    await fetchFridgeSummary();
};
  
export { handleUserRemovePack }

