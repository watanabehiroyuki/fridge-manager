// -- handlers/handleFridgeItemAddClick.js

import { renderFridgeItemAdd } from '../render/renderFridgeItemAdd.js';

// 新規追加ボタンをクリックしたときの処理
function handleFridgeItemAddClick() {
    const triger = document.getElementById('fridgeItemsAddTriger');
    if (triger) {
      triger.addEventListener('click', (e) => {
        e.preventDefault();
        renderFridgeItemAdd();
      });
    } 
  };
handleFridgeItemAddClick();