// // -- api/fetchUserRemove.js
import { renderFetchError } from '../render/renderFetchError.js';

async function fetchUserRemove(fridgeId,userId) {

    try {
        const res = await fetch(`/api/fridges/${fridgeId}/users/${userId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
    
        if (!res.ok) throw new Error('ユーザーの削除に失敗しました');

        console.log("[完了]ユーザー削除");
        
      } catch (err) {
        renderFetchError(err);
      }
}

export { fetchUserRemove }