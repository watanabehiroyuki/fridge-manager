// -- api/fetchFridgeRegister.js


import { renderFridgeFormReset } from '../render/renderFridgeFormReset.js';

// 新規追加ボタンをクリックしたときの処理
async function fetchFridgeRegister(name,form) {
    try {
      const res = await fetch('/api/fridges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify({ name }),
         credentials: 'include'
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const msg =
          errorData?.error ??
          (res.status === 400 && '入力エラー') ??
          '登録に失敗しました';
        throw new Error(msg);
      }

      console.log('冷蔵庫 新規登録成功');
      await renderFridgeFormReset(form);
      
    } catch (err) {
      console.log(err);
    }

};

export { fetchFridgeRegister }

