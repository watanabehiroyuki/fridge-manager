// // -- api/usersRegister.js
// const shareBtn = document.getElementById('usersShareBtn');

// if (shareBtn) {
//   shareBtn.addEventListener('click', async () => {
//     e.preventDefault();


//     try {
//       const res = await fetch('/api/fridges/{fridgeId}/share', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//          body: JSON.stringify({ username, email, password, confirmPassword })
//       });


//       if (!res.ok) throw new Error('ユーザーが見つかりません');

//       const user = await res.json();
//       console.log('ユーザー情報が見つかりました');

//       const shareBox = document.createElement('div');
//       shareBox.classList.add('m-users-register__share');
//       shareBox.insertAdjacentHTML('beforeend', `
//         <p>${user.email}</p><button id="usersShareBtn">共有</button>
//       `);
//       form.after(shareBox);
      
//     } catch (err) {
//       const el = document.getElementById('usersSearchFalse');
//       if (el) {
//         el.textContent = err.message;
//       }
//     }
//   });
// }
