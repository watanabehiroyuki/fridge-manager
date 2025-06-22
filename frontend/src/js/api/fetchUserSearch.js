// -- api/fetchUserSearch.js

import { renderUserSearch } from '../render/renderUserSearch.js'

async function fetchUserSearch(email) {
  console.log(email);
  try {
      const res = await fetch(`/api/users/search?email=${encodeURIComponent(email)}`, {
        credentials: 'include'
      });

      if (!res.ok) throw new Error('ユーザーが見つかりません');

      const user = await res.json();
      const userEmail = user.email;
      renderUserSearch(userEmail);
      
    } catch (err) {
      console.error(err);
    }
};

export { fetchUserSearch };