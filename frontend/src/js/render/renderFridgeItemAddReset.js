// -- render/renderFridgeItemAddReset.js

import { fetchFridgeItemSummary } from '../api/fetchFridgeItemSummary.js';

async function renderFridgeItemAddReset(form) {
  console.log('登録フォーム', form);
  form.reset();
  form.remove();

  await fetchFridgeItemSummary();
};

export { renderFridgeItemAddReset };
  