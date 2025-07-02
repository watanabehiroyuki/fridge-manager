// -- api/fetchUserShare.js

import { renderUserShare } from '../render/renderUserShare.js'
import { renderFetchError } from '../render/renderFetchError.js';

async function fetchUserShare(shareBox,email) {

// URLからfridgeIdを取得
  const urlParams = new URLSearchParams(window.location.search);
  const fridgeId = urlParams.get('fridgeId');

  try {
      const res = await fetch(`/api/fridges/${fridgeId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
        credentials: 'include'
      });

      if (!res.ok) throw new Error(msg);

      renderUserShare(shareBox,email);
      
    } catch (err) {
      renderFetchError(err);
    }
};

export { fetchUserShare };