// -- handlers/handleUserSearchPack.js

import { fetchUserSearch } from '../api/fetchUserSearch.js';

async function handleUserSearchPack(form) {
    const val = form.querySelector('input[name="userSearchEmail"]').value;
    if (val) {
        fetchUserSearch(val);
    }
};

export { handleUserSearchPack };