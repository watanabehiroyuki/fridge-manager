// -- handlers/handleFridgeItemRegisterPack.js
import { fetchFridgeItemRegister } from '../api/fetchFridgeItemRegister.js';

// フォームの入力値を取得してAPIに送信する関数
function handleFridgeItemRegisterPack(registerForm) {
    // フォームの入力値を取得
    const name = registerForm.querySelector('[name="fridgeItemName"]').value;
    const category = registerForm.querySelector('[name="fridgeItemCategory"]').value;
    const expirationDate = registerForm.querySelector('[name="fridgeItemExpirationDate"]').value;
    const quantity = registerForm.querySelector('[name="fridgeItemQuantity"]').value;

    // ログ出力（確認用）
    console.log('ユーザーが入力した食材追加データを取得:', JSON.stringify({ name, category, expirationDate, quantity }));

    fetchFridgeItemRegister(name, category, expirationDate, quantity);
};

export { handleFridgeItemRegisterPack };