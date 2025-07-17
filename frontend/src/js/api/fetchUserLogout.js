// // -- api/fetchUserLogout.js

import { renderUserLogout } from '../render/renderUserLogout.js';
import { renderFetchError } from '../render/renderFetchError.js';

async function fetchUserLogout() {

    try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
          method: 'POST',
          credentials: 'include'
        });
    
        if (!res.ok) throw new Error('ログアウトに失敗しました');

        console.log("ログアウト API通信成功");
        renderUserLogout();
        
      } catch (err) {
        renderFetchError(err);
      }
}

export { fetchUserLogout }