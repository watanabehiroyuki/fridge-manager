// // -- api/fetchUserLogin.js

import { renderUserLogin } from '../render/renderUserLogin.js';
import { renderFetchError } from '../render/renderFetchError.js';

async function fetchUserLogin(email, password) {

    try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
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
        renderFetchError(err);
      }
}

export { fetchUserLogin }