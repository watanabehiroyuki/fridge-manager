// -- handlers/handleFridgeItemRemovePack.js

import { fetchFridgeItemRemove } from '../api/fetchFridgeItemRemove.js';
import { fetchFridgeItemSummary } from '../api/fetchFridgeItemSummary.js';

// フォームの入力値を取得してAPIに送信する関数
async function handleFridgeItemRemovePack(removeForm) {
    const formId = removeForm.id.replace('fridgeitem-', '');
    await fetchFridgeItemRemove(formId);
    fetchFridgeItemSummary();
  };

  export { handleFridgeItemRemovePack };