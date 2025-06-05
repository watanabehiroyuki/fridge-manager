// -- render/renderFridgeSummary.js

import { createFridgeBox } from '../template/createFridgeBox.js';

// 冷蔵庫一覧をレンダリング
function renderFridgeSummary(fridges) {
  const list = document.getElementById('fridgeList');
  list.innerHTML = ''; // 初期化

  if (!fridges.length) return;

  // DOM生成
  fridges.forEach(fridge => {
    const li = createFridgeBox();
    li.setAttribute('id', 'fridge-' + fridge.id);

    // 削除チェック欄
    const removeCheck = li.querySelector('.m-fridges__check');
    removeCheck.value = fridge.id;
    
    // 冷蔵庫名
    const nameBox = li.querySelector('.m-fridges__name');
    nameBox.textContent = fridge.name; 

    // 冷蔵庫の中身
    const contentsBox = li.querySelector('.m-fridges__contents');
    if (Array.isArray(fridge.items) && fridge.items.length > 0) {
      fridge.items.slice(0, 3).forEach(item => {
        const content = document.createElement('li');
        content.textContent = item.name; 
        content.classList.add('m-fridges__content');
        contentsBox.appendChild(content);
        
      });
    }

    // 共有ユーザー
    const usersBox = li.querySelector('.m-fridges__users-list');
    if (Array.isArray(fridge.users) && fridge.users.length > 0) {
      fridge.users.forEach(user => {
        const userBox = document.createElement('p');
        const userName = document.createElement('span');
        userName.textContent = user.username; 
        userName.classList.add('m-fridges__users-name');
        userBox.appendChild(userName);
        const userRemove = document.createElement('button');
        userRemove.type = 'button';
        userRemove.textContent = '×'; 
        userRemove.value = user.id;
        userRemove.dataset.user = 'remove';
        userRemove.classList.add('m-fridges__users-remove');
        userBox.appendChild(userRemove);
        usersBox.appendChild(userBox);
      });
    }
    const moreLink = li.querySelector('.m-fridges__users-more');
    moreLink.href = `/usersRegister.html?fridgeId=${fridge.id}`;

    // 冷蔵庫詳細画面へのリンク
    const link = li.querySelector('.m-fridges__more-link');
    link.href = `/fridgeDetail.html?fridgeId=${fridge.id}`;

    // 削除ボタン
    const removeBtn = li.querySelector('.m-fridges__remove-btn');
    removeBtn.value = fridge.id;

    list.appendChild(li);
    
  });
}

export { renderFridgeSummary }
