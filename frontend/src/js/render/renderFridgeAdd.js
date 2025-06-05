// -- render/renderFridgeItemAdd.js
import { createFridgeAddForm } from '../template/createFridgeAddForm.js';
import { handleFridgeRegisterClick } from '../handlers/handleFridgeRegisterClick.js';

// 新規追加フォームをレンダリングする関数
function renderFridgeAdd() {
  const form = createFridgeAddForm();
  const container = document.getElementById('fridgeAddContainer');
  container.appendChild(form);
  handleFridgeRegisterClick(form);
};

export { renderFridgeAdd };
