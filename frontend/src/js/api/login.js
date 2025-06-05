// -- api/login.js
const form = document.getElementById('loginForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify({ email, password }),
         credentials: 'include'
      });


      if (!res.ok) throw new Error('ログインに失敗しました。ユーザー名またはパスワードが違います。');

      // ログイン成功 → マイページへ
      window.location.href = '/fridges.html';
      
    } catch (err) {
      const el = document.getElementById('loginFalse');
      if (el) {
        el.classList.add('is-active');
        el.textContent = err.message;
      }
    }
  });
}
