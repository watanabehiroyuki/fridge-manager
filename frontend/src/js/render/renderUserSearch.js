// -- render/renderUserSearch.js

import { createUserShareBox } from '../template/createUserShareBox.js'
import { handleUserShareClick } from '../handlers/handleUserShareClick.js'

function renderUserSearch(email) {

    const box = createUserShareBox();
    const namebox = box.querySelector('[data-text="userName"]');
    namebox.textContent = email;
    document.getElementById('usersSearchForm').after(box);
    document.getElementById('usersSearchForm').reset();
    handleUserShareClick();
};

export { renderUserSearch };