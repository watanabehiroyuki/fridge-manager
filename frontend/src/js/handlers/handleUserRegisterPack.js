// -- handlers/handleUserRegisterPack.js

import { fetchUserRegister } from '../api/fetchUserRegister.js';

function handleUserRegisterPack(form) {
    const username = form.querySelector('input[name="username"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    const confirmPassword = form.querySelector('input[name="confirmPassword"]').value;
    fetchUserRegister(username, email, password, confirmPassword);
};
export { handleUserRegisterPack }

