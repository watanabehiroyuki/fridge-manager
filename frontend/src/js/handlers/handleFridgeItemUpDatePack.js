// -- handlers/handleFridgeItemUpDatePack.js

import { fetchFridgeItemUpDate } from '../api/fetchFridgeItemUpDate.js';

// フォームの入力値を取得してAPIに送信する関数
function handleFridgeItemUpDatePack(updateForm) {
    // フォームの入力値を取得
    const name = updateForm.querySelector('[name="fridgeItemName"]').value;
    const category = updateForm.querySelector('[name="fridgeItemCategory"]').value;
    const expirationDate = updateForm.querySelector('[name="fridgeItemExpirationDate"]').value;
    const quantity = updateForm.querySelector('[name="fridgeItemQuantity"]').value;
    const formId = updateForm.id.replace('fridgeitem-', '');
  
    // ログ出力（確認用）
    console.log('⭐️ 送信データ:', JSON.stringify({ name, category, expirationDate, quantity }));
  
    fetchFridgeItemUpDate(formId, name, category, expirationDate, quantity);
  };
  
  export { handleFridgeItemUpDatePack };