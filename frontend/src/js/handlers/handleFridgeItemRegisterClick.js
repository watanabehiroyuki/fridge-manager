// -- handlers/handleFridgeItemRegisterClick.js

import { handleFridgeItemRegisterPack } from '../handlers/handleFridgeItemRegisterPack.js';

// 新規追加フォームの登録ボタンをクリックしたときの処理
function handleFridgeItemRegisterClick(form) {
    const addBtn = form.querySelector('button[data-switch="add"]');

    // 食材名とカテゴリーは必須項目
    const name = form.querySelector('[name="fridgeItemName"]');
    const category = form.querySelector('[name="fridgeItemCategory"]');
    [name, category].forEach(el => {
      el.addEventListener('change', (e) => {
        const nameValue = name.value;
        const categoryValue = category.value;
        if (nameValue && categoryValue) {
          addBtn.classList.remove('is-disabled');
        } else {
          addBtn.classList.add('is-disabled');
        }
      });
    });

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