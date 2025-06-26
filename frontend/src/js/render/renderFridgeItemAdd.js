// -- render/renderFridgeItemAdd.js
import { createfridgeItemForm } from '../template/createFridgeItemForm.js';
import { handleFridgeItemRegisterClick} from '../handlers/handleFridgeItemRegisterClick.js';

// 新規追加フォームをレンダリングする関数
function renderFridgeItemAdd() {
    const form = createfridgeItemForm();
    form.id = 'fridgeItemsAddForm';
    const addBtn = form.querySelector('button.m-fridge-detail-form__switch-btn');
    addBtn.textContent = '追加'; 
    addBtn.dataset.switch = 'add';
    const removeBtn = form.querySelector('button[data-switch="remove"]');
    removeBtn.style.opacity = '0';
    const checkRemove = form.querySelector('[name="fridgeItemCheck"]');
    checkRemove.style.opacity = '0';
    document.getElementById('fridgeItemsAddFormContainer').appendChild(form);
    console.log("fridgeItemsAddFormを追加");
    handleFridgeItemRegisterClick(form);
  };

export { renderFridgeItemAdd };
  