// -- api/usersSearch.js
const form = document.getElementById('usersSearchForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    try {
      const res = await fetch(`/api/users/search?email=${encodeURIComponent(email)}`);

      if (!res.ok) throw new Error('ユーザーが見つかりません');

      const user = await res.json();

      const shareBox = document.createElement('div');
      shareBox.classList.add('m-users-register__share');
      const shareAdress = document.createElement('p');
      shareAdress.textContent = user.email;
      const shareBtn = document.createElement('button');
      shareBtn.id = 'usersShareBtn';
      shareBtn.textContent = '追加';
      shareBox.appendChild(shareAdress);
      shareBox.appendChild(shareBtn);

      await form.after(shareBox);

      console.log("⭐️1:", shareBtn);

      shareBtn.addEventListener('click', async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const fridgeId = urlParams.get('fridgeId');
        console.log("⭐️2:", fridgeId);

        try {
          const res = await fetch(`/api/fridges/${fridgeId}/share`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user.email }),
            credentials: 'include'
          });

          if (!res.ok) throw new Error('ユーザーの追加に失敗しました');

          const data = await res.json();
          console.log("⭐️3:", data);

        } catch (err) {
          cconsole.error(err);
        }
      });
      
    } catch (err) {
      const el = document.getElementById('usersSearchFalse');
      if (el) {
        el.textContent = err.message;
      }
    }
  });
}
