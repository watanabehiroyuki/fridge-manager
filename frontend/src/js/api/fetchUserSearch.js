// -- api/fetchUserSearch.js

import { renderUserSearch } from '../render/renderUserSearch.js'
import { renderFetchError } from '../render/renderFetchError.js';

async function fetchUserSearch(email) {
  console.log(email);
  try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/search?email=${encodeURIComponent(email)}`, {
        credentials: 'include'
      });

      if (!res.ok) throw new Error('ユーザーが見つかりません');

      const user = await res.json();
      const userEmail = user.email;
      renderUserSearch(userEmail);
      
    } catch (err) {
      renderFetchError(err);
    }
};

export { fetchUserSearch };