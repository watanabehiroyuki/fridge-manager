// -- handlers/handleFridgeRegisterPack.js

import { fetchFridgeRegister } from '../api/fetchFridgeRegister.js';

// 新規追加ボタンをクリックしたときの処理
function handleFridgeRegisterPack(registerForm) {
  const name = registerForm.querySelector('[name="fridgeName"]').value;

  // ログ出力（確認用）
  console.log('ユーザーが入力した冷蔵庫データを取得:', JSON.stringify({ name }));
  console.log(typeof name, name);

  fetchFridgeRegister(name,registerForm);
};
  
export { handleFridgeRegisterPack }