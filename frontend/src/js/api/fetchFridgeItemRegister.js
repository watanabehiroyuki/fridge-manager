// -- api/fetchFridgeItemRegister.js

import { renderFridgeItemAddReset } from '../render/renderFridgeItemAddReset.js';
import { renderFetchError } from '../render/renderFetchError.js';

// APIへPOSTリクエストを送信して冷蔵庫アイテムを登録する関数
async function fetchFridgeItemRegister(name, category, expirationDate, quantity, registerForm) {

      // URLからfridgeIdを取得
      const urlParams = new URLSearchParams(window.location.search);
      const fridgeId = urlParams.get('fridgeId');
      console.log(fridgeId);

    try {
        const res = await fetch(`/api/fridges/${fridgeId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify({ name, category, expirationDate, quantity }),
         credentials: 'include'
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const msg =
          errorData?.error ??
          (res.status === 400 && '入力エラー') ??
          '登録に失敗しました';
        throw new Error(msg);
      }
  
      // ログ出力（確認用）
      console.log('食材の追加に成功');

      renderFridgeItemAddReset(registerForm);
      
    } catch (err) {
      renderFetchError(err);
    }
  };

  export { fetchFridgeItemRegister };