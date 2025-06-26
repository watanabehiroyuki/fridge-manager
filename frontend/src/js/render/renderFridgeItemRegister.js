// -- render/renderFridgeItemRegister.js

// 冷蔵庫アイテムの登録フォームを表示する関数
function renderFridgeItemRegister(registerForm,editBtn){
    const inputs = registerForm.querySelectorAll('input,select')
    inputs.forEach(input => {
      input.classList.add('is-disabled');
    });
    editBtn.textContent = '編集';
    editBtn.dataset.switch = 'edit';
  }

export { renderFridgeItemRegister };