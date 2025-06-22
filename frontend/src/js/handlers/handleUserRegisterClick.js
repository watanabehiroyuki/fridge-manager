// -- handlers/handleUserRegisterClick.js

import { handleUserRegisterPack } from './handleUserRegisterPack.js';

function handleUserRegisterClick() {
    const form = document.getElementById('userRegisterForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleUserRegisterPack(form);
        });
    }
};
handleUserRegisterClick();

