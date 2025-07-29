// -- render/renderUserShare.js

import { createModal } from '../template/createModal.js';

function renderShareFridge() {
    
    // ここがユーザー追加画面じゃなければ何もしない
    const path = window.location.pathname.toLowerCase();
    if (!(path.includes('usershare'))) {
        console.log('not userShare page, skipping fetch');
        return;
    }

    const nameBox = document.getElementById('txtShareFridgeName');
    if (!nameBox) return;

    // URLからfridgeNameを取得
    const urlParams = new URLSearchParams(window.location.search);
    const fridgeName = urlParams.get('fridgeName');
    
    nameBox.textContent = fridgeName;
}
renderShareFridge();

function renderUserShare(shareBox,email) {
    const modal = createModal();
    shareBox.after(modal);
    const txtBox = modal.querySelector('p[data-txt="result"]');
    txtBox.textContent = `${email} に共有しました`;
    shareBox.remove();
};

export { renderUserShare };