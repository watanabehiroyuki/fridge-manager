// -- api/fetchFridgeItemRemove.js

import { renderFetchError } from '../render/renderFetchError.js';

// 冷蔵庫アイテムを削除するAPIリクエスト
async function fetchFridgeItemRemove(itemId) {

    // URLからfridgeIdを取得
    const urlParams = new URLSearchParams(window.location.search);
    const fridgeId = urlParams.get('fridgeId');
  
    try {
      const res = await fetch(`/api/fridges/${fridgeId}/items/${itemId}`, {
        method: 'DELETE',
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
      console.log('食品の削除成功');
  
    } catch (err) {
      renderFetchError(err);
    }
  };

  export { fetchFridgeItemRemove };