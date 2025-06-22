// // -- api/fetchUserRemove.js

async function fetchUserRemove(fridgeId,userId) {

    try {
        const res = await fetch(`/api/fridges/${fridgeId}/users/${userId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
    
        if (!res.ok) throw new Error('ユーザーの削除に失敗しました');

        console.log("[完了]ユーザー削除");
        
      } catch (err) {
        console.log(err.message);
      }
}

export { fetchUserRemove }