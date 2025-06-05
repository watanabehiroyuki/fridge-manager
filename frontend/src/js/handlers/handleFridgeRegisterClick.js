// -- handlers/handleFridgeRegisterClick.js

import { handleFridgeRegisterPack } from './handleFridgeRegisterPack.js';

// 新規追加ボタンをクリックしたときの処理
function handleFridgeRegisterClick(registerForm) {
  const registerBtn = registerForm.querySelector('.m-fridges-add-form__submit');
  registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleFridgeRegisterPack(registerForm);
  })
};
  
export { handleFridgeRegisterClick }