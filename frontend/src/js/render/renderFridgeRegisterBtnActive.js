// -- render/renderFridgeRegisterBtnActive.js

function renderFridgeRegisterBtnActive(registerForm,registerBtn){
  const input = registerForm.querySelector('input[name="fridgeName"]');
  input.addEventListener('input', (e) => {
    registerBtn.classList.remove('is-disabled');
  })
}

export { renderFridgeRegisterBtnActive };