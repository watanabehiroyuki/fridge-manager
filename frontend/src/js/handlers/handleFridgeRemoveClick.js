// -- handlers/handleFridgeRemoveClick.js

import { handleFridgeRemovePack } from './handleFridgeRemovePack.js';

// 新規追加ボタンをクリックしたときの処理
async function handleFridgeRemoveClick() {
  const fridges = document.querySelectorAll('.m-fridges__item');
  if (fridges.length) {
    fridges.forEach(fridge => {
      const removeBtn = fridge.querySelector('button.m-fridges__remove-btn');
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('クリック成功');
        handleFridgeRemovePack(removeBtn);
      })
    })
  }
};
  
export { handleFridgeRemoveClick }

