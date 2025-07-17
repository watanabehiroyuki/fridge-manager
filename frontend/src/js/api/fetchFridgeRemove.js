// -- api/fetchFridgeRemove.js
import { renderFetchError } from '../render/renderFetchError.js';

// 新規追加ボタンをクリックしたときの処理
async function fetchFridgeRemove(fridgeId) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fridges/${fridgeId}`, {
        method: 'DELETE',
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

      console.log('冷蔵庫 削除成功');
      
    } catch (err) {
      renderFetchError(err);
    }

};

export { fetchFridgeRemove }

