// -- handlers/handleFridgeRemovePack.js

import { fetchFridgeRemove } from '../api/fetchFridgeRemove.js';
import { fetchFridgeSummary } from '../api/fetchFridgeSummary.js';

// 新規追加ボタンをクリックしたときの処理
async function handleFridgeRemovePack(removeBtn) {

  const itemId = removeBtn.value;

  // ログ出力（確認用）
  console.log('ユーザーが入力した冷蔵庫データを取得:', JSON.stringify({ itemId }));

  await fetchFridgeRemove(itemId);
  await fetchFridgeSummary();

};
  
export { handleFridgeRemovePack }