// -- handlers/handleUserRemoveClick.js

import { handleUserRemovePack } from './handleUserRemovePack.js';

// ユーザーラベルの×アイコンを押した時の処理
async function handleUserRemoveClick() {
  const fridges = document.querySelectorAll('.m-fridge__box');
  if (fridges.length) {
    fridges.forEach(fridge => {
      const userRemoves = fridge.querySelectorAll('button[data-user="remove"]');
      if (userRemoves.length) {
        userRemoves.forEach(userRemove => {
          userRemove.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('[完了]ユーザー削除クリック');
            handleUserRemovePack(fridge, userRemove);
          })
        })
      }
    })
  }
};
  
export { handleUserRemoveClick }

