// -- handlers/handleFridgeItemEditClick.js
import { renderFridgeItemEdit } from '../render/renderFridgeItemEdit.js';
import { handleFridgeItemUpdateClick } from '../handlers/handleFridgeItemUpDateClick.js';

// 編集ボタンをクリックしたときの処理
function handleFridgeItemEditClick() {
    const forms = document.querySelectorAll('.m-fridge-detail-form');
    if (forms.length > 0) {
      forms.forEach(form => {
        const editBtn = form.querySelector('button[data-switch="edit"]');
        editBtn.addEventListener('click', (e) => {
          e.preventDefault();
          renderFridgeItemEdit(form,editBtn);
          handleFridgeItemUpdateClick(form); 
        });
      })
    }
  };

export { handleFridgeItemEditClick };