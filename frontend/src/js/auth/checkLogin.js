// -- auth/checkLogin.js

// ---- ログインチェック
(async () => {
  const path = window.location.pathname;
  const ignorePaths = ['/login.html', '/register.html', '/'];

  // ログインチェック対象外ページなら終了
  if (ignorePaths.includes(path)) return;

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/check`, {
      credentials: 'include',
    });

    if (!res.ok) {
      window.location.href = '/login.html';
    }
  } catch (err) {
    console.error('ログイン確認失敗:', err);
    window.location.href = '/login.html';
  }
})();


// -- auth/checkLogin.js
const API_BASE = 'https://fridge-manager-backend.onrender.com'; // Render のURL

(async () => {
  const path = window.location.pathname;
  const ignorePaths = ['/login.html', '/register.html', '/'];

  if (ignorePaths.includes(path)) return;

  try {
    const res = await fetch(`${API_BASE}/api/auth/check`, {
      credentials: 'include',
    });

    if (!res.ok) {
      window.location.href = '/login.html';
    }
  } catch (err) {
    console.error('ログイン確認失敗:', err);
    window.location.href = '/login.html';
  }
})();

