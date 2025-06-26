// // -- api/fetchUserLogout.js

import { renderUserLogout } from '../render/renderUserLogout.js';

async function fetchUserLogout() {

    try {
        const res = await fetch(`/api/logout`, {
          method: 'POST',
          credentials: 'include'
        });
    
        if (!res.ok) throw new Error('ログアウトに失敗しました');

        console.log("ログアウト API通信成功");
        renderUserLogout();
        
      } catch (err) {
        console.log(err.message);
      }
}

export { fetchUserLogout }