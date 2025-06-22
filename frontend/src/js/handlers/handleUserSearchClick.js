// -- handlers/handleUserSearchClick.js

import { handleUserSearchPack } from './handleUserSearchPack.js';

let ishandleUserSearchClickInitialized = false;

function handleUserSearchClick() {

    if (ishandleUserSearchClickInitialized) return;
    ishandleUserSearchClickInitialized = true;

    const form = document.getElementById('usersSearchForm');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("送信成功");
            handleUserSearchPack(form);
        })
    }
};
handleUserSearchClick();