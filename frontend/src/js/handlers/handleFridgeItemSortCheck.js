// -- handlers/handleFridgeItemSortCheck.js

import { renderFridgeItemSortCategory } from '../render/renderFridgeItemSort.js';
import { renderFridgeItemSortLimit } from '../render/renderFridgeItemSort.js';

function handleFridgeItemSortCategoryCheck() {
  const sortCategory = document.getElementById('fridgeItemsSortCategory');
  if (!sortCategory) return;

  const sortCategoryOptions = sortCategory.querySelectorAll('.m-fridge-detail-sort__item');
  if (!sortCategoryOptions) return;

  sortCategoryOptions.forEach((option) => {
    const input = option.querySelector('input[type="checkbox"]');
    input.addEventListener('change', (e) => {
      renderFridgeItemSortCategory();
    })
  })
}
handleFridgeItemSortCategoryCheck();

function handleFridgeItemSortLimitCheck() {
  const sortLimit = document.getElementById('fridgeItemsSortLimit');
  if (!sortLimit) return;

  const sortLimitOptions = sortLimit.querySelectorAll('.m-fridge-detail-sort__item');
  if (!sortLimitOptions) return;

  sortLimitOptions.forEach((option) => {
    const input = option.querySelector('input[type="radio"]');
    input.addEventListener('change', (e) => {
      renderFridgeItemSortLimit();
    })
  })
}
handleFridgeItemSortLimitCheck();