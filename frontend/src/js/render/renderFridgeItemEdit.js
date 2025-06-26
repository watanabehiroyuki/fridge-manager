// -- handlers/renderFridgeItemEdit.js

// 編集フォームをレンダリングする関数
function renderFridgeItemEdit(editForm,editBtn) {
    const inputs = editForm.querySelectorAll('input,select');
    inputs.forEach(input => {
        input.classList.remove('is-disabled');
    });
    editBtn.textContent = '更新';
    editBtn.dataset.switch = 'update';
};

export { renderFridgeItemEdit };