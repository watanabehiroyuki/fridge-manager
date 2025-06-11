// -- handlers/handleUserLoginPack.js

import { fetchUserLogin } from '../api/fetchUserLogin.js';

async function handleUserLoginPack(form) {
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    await fetchUserLogin(email, password);
};
  
export { handleUserLoginPack }