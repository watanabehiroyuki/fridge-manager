// -- handlers/renderFridgeItemEdit.js

// 編集フォームをレンダリングする関数
function renderFridgeItemEdit(editForm,editBtn) {
    const inputs = editForm.querySelectorAll('input,select');
    inputs.forEach(input => input.disabled = false);
    editBtn.textContent = '更新';
    editBtn.dataset.switch = 'update';
};

export { renderFridgeItemEdit };