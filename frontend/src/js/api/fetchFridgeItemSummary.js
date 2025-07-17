// api/fetchFridgeItemSummary.js

import { renderFridgeItemSummary } from '../render/renderFridgeItemSummary.js';
import { handleFridgeItemEditClick } from '../handlers/handleFridgeItemEditClick.js';
import { handleFridgeItemRemoveClick } from '../handlers/handleFridgeItemRemoveClick.js';
import { handleFridgeItemRemoveSumClick } from '../handlers/handleFridgeItemRemoveSumClick.js';
import { renderFetchError } from '../render/renderFetchError.js';

async function fetchFridgeItemSummary() {
  if (window.location.pathname !== '/fridgeDetail.html') {
    // ここが詳細画面じゃなければ何もしない
    console.log('fridgeItemShow.js: this is not /fridgeDetail.html, skipping fetch.');
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const fridgeId = urlParams.get('fridgeId');

  if (!fridgeId) {
    console.error('fridgeIdが指定されていません。');
    return;
  }
  
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/fridges/${fridgeId}/items`, {
      credentials: 'include',
    });
  
    if (!res.ok) {
      throw new Error(`取得失敗: ステータス ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    renderFridgeItemSummary(data);
    handleFridgeItemEditClick();
    handleFridgeItemRemoveClick();
    handleFridgeItemRemoveSumClick();

    console.log('[描画] fetchFridgeItemSummary 完了');

  } catch (err) {
    renderFetchError(err);
  }
};

fetchFridgeItemSummary();

export { fetchFridgeItemSummary };