// -- valid/password.js

// パスワード
function ValidPassword() {
  const passwordInputs = document.querySelectorAll('.js-valid-password');
  if (passwordInputs.length) {
    passwordInputs.forEach(passwordInput => {
      passwordInput.addEventListener('change', () => {

        // 初期化
        const nextElem = passwordInput.nextElementSibling;
        if (nextElem && nextElem.classList.contains('is-validError')) {
          nextElem.remove();
        }

        const passwordValue = passwordInput.value;
        if (passwordValue) {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
          if (!regex.test(passwordValue)) {
            const errorMessageBox = document.createElement('p');
            errorMessageBox.classList.add('is-validError');
            passwordInput.after(errorMessageBox);
            errorMessageBox.textContent = '大文字、小文字、ローマ字を使って8文字以上で入力して下さい';
          }
        }

      });
    })
  }
};
ValidPassword();

// 確認用パスワード
function ValidPasswordConfirm() {
  const passwordInputs = document.querySelectorAll('.js-valid-password');
  if (passwordInputs.length) {
    passwordInputs.forEach(passwordInput => {

      let passwordConfirmInput = null;
      const group = passwordInput.closest('.m-form__group');
      const nextGroup = group.nextElementSibling;
      if (nextGroup && nextGroup.classList.contains('m-form__group')) {
        passwordConfirmInput = nextGroup.querySelector('.js-valid-password-confirm');
      }

      if(passwordConfirmInput) {
        passwordConfirmInput.addEventListener('change', () => {
          // 初期化
          const nextElem = passwordConfirmInput.nextElementSibling;
          if (nextElem && nextElem.classList.contains('is-validError')) {
            nextElem.remove();
          }
  
          const passwordValue = passwordInput.value;
          const passwordConfirmValue = passwordConfirmInput.value;
          if (passwordValue && passwordConfirmValue && passwordConfirmValue !== passwordValue) {
            const errorMessageBox = document.createElement('p');
            errorMessageBox.classList.add('is-validError');
            passwordConfirmInput.after(errorMessageBox);
            errorMessageBox.textContent = 'パスワードが一致していません';
          }
        })
      }
    })
  }
};
ValidPasswordConfirm();