// -- handlers/handleFridgeItemRegisterClick.js

import { handleFridgeItemRegisterPack } from '../handlers/handleFridgeItemRegisterPack.js';

// 新規追加フォームの登録ボタンをクリックしたときの処理
function handleFridgeItemRegisterClick(form) {
    const addBtn = form.querySelector('button[data-switch="add"]');
    if (form && addBtn) {
      addBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // ログ出力（確認用）
        console.log("fridgeItemsAddForm内のaddBtnをクリック");

        handleFridgeItemRegisterPack(form);
      });
    }
  };

  export { handleFridgeItemRegisterClick };