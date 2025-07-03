// -- render/renderFridgeAdd.js
import { createFridgeAddForm } from '../template/createFridgeAddForm.js';
import { handleFridgeRegisterClick } from '../handlers/handleFridgeRegisterClick.js';

// 新規追加フォームをレンダリングする関数
function renderFridgeAdd() {
  const form = createFridgeAddForm();
  const submitbtn = form.querySelector('button');
  submitbtn.classList.add('is-disabled');
  const container = document.getElementById('fridgeAddContainer');
  container.appendChild(form);
  handleFridgeRegisterClick(form);
};

export { renderFridgeAdd };
