// // -- api/fetchUserLogin.js

import { renderUserLogin } from '../render/renderUserLogin.js';

async function fetchUserLogin(email, password) {

    try {
        const res = await fetch(`/api/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include'
        });
    
        if (!res.ok) throw new Error('ログインに失敗しました');

        renderUserLogin();
        
      } catch (err) {
        console.log(err.message);
      }
}

export { fetchUserLogin }