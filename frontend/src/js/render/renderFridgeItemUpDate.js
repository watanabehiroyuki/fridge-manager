// -- render/renderFridgeItemUpDate.js)

// 編集フォームをレンダリングする関数
function renderFridgeItemUpDate(updateForm,updateBtn) {
    const inputs = updateForm.querySelectorAll('input,select');
    inputs.forEach(input => {
      input.classList.add('is-disabled');
    });
    updateBtn.textContent = '編集';
    updateBtn.dataset.switch = 'edit';
  }

  export { renderFridgeItemUpDate };