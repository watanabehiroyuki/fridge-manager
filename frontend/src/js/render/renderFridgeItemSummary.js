// // -- render/renderFridgeItemsSummary.js

import { createfridgeItemForm } from '../template/createFridgeItemForm.js';
import { renderFridgeItemSortCategory } from './renderFridgeItemSort.js';
import { renderFridgeItemSortLimit } from './renderFridgeItemSort.js';

// ---- 冷蔵庫の中身一覧 表示
function renderFridgeItemSummary(fridgeItems) {
  const list = document.getElementById('fridgeItemsList');
  list.innerHTML = ''; // 初期化

  if (!fridgeItems.length) return;

  // 一覧レンダリング
  fridgeItems.forEach(fridgeItem => {

    const form = createfridgeItemForm();
    form.id = 'fridgeitem-' + fridgeItem.id;
    document.getElementById('fridgeItemsAdd').after(form);
    // 編集ボタンを追加
    const switchBtn = form.querySelector('button');
    switchBtn.textContent = '編集'; 
    switchBtn.dataset.switch = 'edit'; // 編集ボタンのデータ属性を設定
    switchBtn.classList.add('m-fridge-detail-table__edit-btn');
    // 一括削除用チェックボックスにvalue設定
    const checkRemove = form.querySelector('[name="fridgeItemCheck"]');
    checkRemove.value = fridgeItem.id;
    // 入力項目を無効化
    const formItems = form.querySelectorAll('input:not([type="checkbox"]), select');
    formItems.forEach(item => {
      item.classList.add('m-fridge-detail-table__row-item');
      item.disabled = true;
    });
    
    // 食材名
    const nameInput = form.querySelector('[name="fridgeItemName"]');
    nameInput.value = fridgeItem.name;
    
    // 食材のカテゴリー
    const categorySelect = form.querySelector('[name="fridgeItemCategory"]');
    categorySelect.value = fridgeItem.category;

    // 食材の消費期限
    const dateInput = form.querySelector('[name="fridgeItemExpirationDate"]');
    dateInput.value = fridgeItem.expirationDate ? fridgeItem.expirationDate : '';

    // 食材の数量
    const quantityInput = form.querySelector('[name="fridgeItemQuantity"]');
    quantityInput.value = fridgeItem.quantity ? fridgeItem.quantity : 1;

    list.appendChild(form);
  });

  renderFridgeItemSortCategory();
  renderFridgeItemSortLimit();
}

export { renderFridgeItemSummary };