// fetchFridgeItemsSummaryy(api/fetchFridgeSummary.js)

import { renderFridgeItemSummary } from '../render/renderFridgeItemSummary.js';
import { handleFridgeItemEditClick } from '../handlers/handleFridgeItemEditClick.js';
import { handleFridgeItemRemoveClick } from '../handlers/handleFridgeItemRemoveClick.js';
import { handleFridgeItemRemoveSumClick } from '../handlers/handleFridgeItemRemoveSumClick.js';

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
    const res = await fetch(`/api/fridges/${fridgeId}/items`, {
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

  } catch (err) {
    console.log(err.message); 
  }
};

fetchFridgeItemSummary();

export { fetchFridgeItemSummary };