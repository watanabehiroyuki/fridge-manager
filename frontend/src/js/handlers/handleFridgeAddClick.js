// -- handlers/handleFridgeAddClick.js

import { renderFridgeAdd } from '../render/renderFridgeAdd.js';

// 新規追加ボタンをクリックしたときの処理
function handleFridgeAddClick() {
  const addTriger = document.getElementById('fridgeAddTriger');

  if (addTriger) {
    addTriger.addEventListener('click', (e) => {
      e.preventDefault();
      renderFridgeAdd();
    })
  }

};
handleFridgeAddClick();
