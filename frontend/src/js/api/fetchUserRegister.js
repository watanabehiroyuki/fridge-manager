// // -- api/fetchUserRegister.js

import { renderUserRegister } from '../render/renderUserRegister.js';
import { renderFetchError } from '../render/renderFetchError.js';

async function fetchUserRegister(username, email, password, confirmPassword) {

    try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password, confirmPassword })
        });
    
        if (!res.ok) throw new Error('ユーザーの登録に失敗しました');

        console.log("[完了]ユーザー新規登録");
        renderUserRegister();
        
      } catch (err) {
        renderFetchError(err);
      }
}

export { fetchUserRegister }