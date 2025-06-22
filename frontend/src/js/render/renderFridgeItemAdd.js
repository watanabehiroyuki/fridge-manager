// -- render/renderFridgeItemAdd.js
import { createfridgeItemForm } from '../template/createFridgeItemForm.js';

// 新規追加フォームをレンダリングする関数
function renderFridgeItemAdd() {
    const form = createfridgeItemForm();
    form.id = 'fridgeItemsAddForm';
    const addBtn = form.querySelector('button.m-fridge-detail__switch-btn');
    addBtn.textContent = '追加'; 
    addBtn.dataset.switch = 'add';
    const removeBtn = form.querySelector('button[data-switch="remove"]');
    removeBtn.style.display = 'none';
    const checkRemove = form.querySelector('[name="fridgeItemCheck"]');
    checkRemove.style.display = 'none';
    document.getElementById('fridgeItemsList').appendChild(form);
    console.log("fridgeItemsAddFormを追加");
  };

export { renderFridgeItemAdd };
  