// -- api/fetchFridgeSummary.js

import { renderFridgeSummary } from '../render/renderFridgeSummary.js';
import { handleFridgeRemoveClick } from '../handlers/handleFridgeRemoveClick.js';
import { handleFridgeRemoveSumClick } from '../handlers/handleFridgeRemoveSumClick.js';
import { handleUserRemoveClick } from '../handlers/handleUserRemoveClick.js';
import { renderFetchError } from '../render/renderFetchError.js';

// 冷蔵庫一覧を取得
async function fetchFridgeSummary() {

  console.log('[描画] fetchFridgeSummary 実行');

    // ここが一覧画面じゃなければ何もしない
    const path = window.location.pathname.toLowerCase();
  if (!(path.includes('fridges'))) {
    console.log('not fridge detail page, skipping fetch');
    return;
  }
  
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fridges/with-details`, {
      credentials: 'include',
    });
  
    if (!res.ok) {
      throw new Error(`取得失敗: ステータス ${res.status}`);
    }

    const data = await res.json();

    // 確認用ログ
    console.log("冷蔵庫一覧：", data);

    renderFridgeSummary(data);
    handleFridgeRemoveClick();
    handleFridgeRemoveSumClick();
    handleUserRemoveClick();

    console.log('[描画] fetchFridgeSummary 完了');
    
  } catch (err) {
    renderFetchError(err);
  }
};
fetchFridgeSummary();

export { fetchFridgeSummary }