// -- handlers/handleFridgeItemRemovePack.js

import { fetchFridgeItemRemove } from '../api/fetchFridgeItemRemove.js';

// フォームの入力値を取得してAPIに送信する関数
function handleFridgeItemRemovePack(removeForm) {
    const formId = removeForm.id.replace('fridgeitem-', '');
    fetchFridgeItemRemove(formId);
  };

  export { handleFridgeItemRemovePack };