// -- handlers/handleUserLoginClick.js

import { handleUserLoginPack } from './handleUserLoginPack.js';

function handleUserLoginClick() {
  const form = document.getElementById('userLoginForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserLoginPack(form);
    })
  }
};
  
handleUserLoginClick();