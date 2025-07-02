// -- api/fetchFridgeItemUpDate.js)

import { fetchFridgeItemSummary } from './fetchFridgeItemSummary.js';
import { renderFetchError } from '../render/renderFetchError.js';

// APIリクエストを送信して冷蔵庫アイテムを更新する関数
async function fetchFridgeItemUpDate(itemId, name, category, expirationDate, quantity) {
    // URLからfridgeIdを取得
    const urlParams = new URLSearchParams(window.location.search);
    const fridgeId = urlParams.get('fridgeId');
    try {
      const res = await fetch(`/api/fridges/${fridgeId}/items/${itemId}`, {
        method: 'PUT',
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
        throw new Error('msg');
      }
  
      // 確認用ログ
      console.log('食材の更新成功');
      
      fetchFridgeItemSummary();
  
    } catch (err) {
      renderFetchError(err);
    }
  };

  export { fetchFridgeItemUpDate };
  