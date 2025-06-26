// -- handlers/handleFridgeRegisterClick.js

import { handleFridgeRegisterPack } from './handleFridgeRegisterPack.js';
import { renderFridgeRegisterBtnActive } from '../render/renderFridgeRegisterBtnActive.js';

// 新規追加ボタンをクリックしたときの処理
function handleFridgeRegisterClick(registerForm) {
  const registerBtn = registerForm.querySelector('.m-fridge-add-form__submit');
  renderFridgeRegisterBtnActive(registerForm,registerBtn);
  registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleFridgeRegisterPack(registerForm);
  })
};
  
export { handleFridgeRegisterClick }