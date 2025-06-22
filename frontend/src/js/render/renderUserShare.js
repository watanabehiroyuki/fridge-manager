// -- render/renderUserShare.js

function renderUserShare(shareBox,email) {
    console.log(email , 'に共有しました');
    shareBox.remove();
};

export { renderUserShare };