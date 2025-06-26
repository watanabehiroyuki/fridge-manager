// -- handlers/handleUserLogoutClick.js

import { fetchUserLogout } from '../api/fetchUserLogout.js';

function handleUserLogoutClick() {
  const btn = document.getElementById('logoutBtn');
  console.log(btn);
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log("ログアウトボタンクリック");
      fetchUserLogout();
    })
  }
};

export { handleUserLogoutClick }

