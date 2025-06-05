// -- api/register.js
const form = document.getElementById('registerForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;


    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify({ username, email, password, confirmPassword })
      });


      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const msg =
          errorData?.error ??
          (res.status === 400 && '入力エラー') ??
          (res.status === 409 && 'IDが重複しています') ??
          '登録に失敗しました';
        throw new Error(msg);
      }


      document.getElementById('registerSuccess').classList.add('is-active');
      document.getElementById('registerDefault').classList.add('is-hidden');
      
    } catch (err) {
      const el = document.getElementById('registerFalse');
      if (el) {
        el.classList.add('is-active');
        el.textContent = err.message;
      }
    }
  });
}
