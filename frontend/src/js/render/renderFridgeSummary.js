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
    const removeCheck = li.querySelector('input[name="fridgeRemoveCheck"]');
    removeCheck.value = fridge.id;
    
    // 冷蔵庫名
    const nameBox = li.querySelector('.m-fridge__name');
    nameBox.textContent = fridge.name; 

    // 冷蔵庫の中身
    const contentsBox = li.querySelector('.m-fridge__contents');
    if (Array.isArray(fridge.items) && fridge.items.length > 0) {
      fridge.items.slice(0, 5).forEach(item => {
        const content = document.createElement('li');
        const icon = document.createElement('span');
        content.textContent = item.name; 
        content.prepend(icon);
        if (item.category === "野菜・果物"){
          content.classList.add('m-fridge__content--vege');
        } else if(item.category === "肉・魚"){
          content.classList.add('m-fridge__content--meatfish');
        } else if(item.category === "乳製品・大豆製品"){
          content.classList.add('m-fridge__content--dairysoy');
        } else if(item.category === "調味料・ソース"){
          content.classList.add('m-fridge__content--source');
        } else if(item.category === "飲み物・デザート"){
          content.classList.add('m-fridge__content--dessert');
        } else if(item.category === "常備食・乾物系"){
          content.classList.add('m-fridge__content--stock');
        } else if(item.category === "主食"){
          content.classList.add('m-fridge__content--staple');
        } else if(item.category === "手作り・作り置き"){
          content.classList.add('m-fridge__content--handmade');
        } else if(item.category === "その他"){
          content.classList.add('m-fridge__content--other');
        }

        contentsBox.appendChild(content);
        
      });
    }

    // 共有ユーザー
    const usersBox = li.querySelector('.m-fridge__users-list');
    if (Array.isArray(fridge.users) && fridge.users.length > 0) {
      fridge.users.forEach(user => {
        const userBox = document.createElement('p');
        userBox.classList.add('m-user-tag');
        const userName = document.createElement('span');
        userName.textContent = user.username; 
        userName.classList.add('m-user-tag__username');
        userBox.appendChild(userName);
        const userRemove = document.createElement('button');
        userRemove.type = 'button';
        userRemove.textContent = '×'; 
        userRemove.value = user.id;
        userRemove.dataset.user = 'remove';
        userRemove.classList.add('m-user-tag__remove-btn');
        userBox.appendChild(userRemove);
        const userMoreLink = usersBox.querySelector('.m-fridge__users-more');
        usersBox.insertBefore(userBox, userMoreLink);
      });
    }
    const moreLink = li.querySelector('.m-fridge__users-more');
    moreLink.href = `/userShare.html?fridgeId=${fridge.id}&fridgeName=${fridge.name}`;

    // 冷蔵庫詳細画面へのリンク
    const link = li.querySelector('.m-fridge__more-link');
    link.href = `/fridgedetail?fridgeId=${fridge.id}&fridgeName=${fridge.name}`;

    // 削除ボタン
    const removeBtn = li.querySelector('.m-fridge__remove-btn');
    removeBtn.value = fridge.id;

    list.appendChild(li);
    
  });
}

export { renderFridgeSummary }
