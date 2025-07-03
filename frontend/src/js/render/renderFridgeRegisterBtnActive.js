// -- render/renderFridgeRegisterBtnActive.js

function renderFridgeRegisterBtnActive(registerForm,registerBtn){
  const input = registerForm.querySelector('input[name="fridgeName"]');
  input.addEventListener('change', (e) => {
    const value = input.value;
    if(value){
      registerBtn.classList.remove('is-disabled');
    } else {
      registerBtn.classList.add('is-disabled');
    }
  })
}

export { renderFridgeRegisterBtnActive };