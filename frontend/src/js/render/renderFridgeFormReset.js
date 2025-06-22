// -- render/renderFridgeFormReset.js
import { fetchFridgeSummary } from '../api/fetchFridgeSummary.js';

// 新規追加フォームをレンダリングする関数
async function renderFridgeFormReset(form) {
  form.reset();
  form.remove();

  await fetchFridgeSummary();
};

export { renderFridgeFormReset };
  