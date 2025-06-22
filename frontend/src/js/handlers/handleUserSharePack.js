
// -- handlers/handleUserShareClick.js

import { fetchUserShare } from '../api/fetchUserShare.js';

function handleUserSharePack(shareBox) {
    const shareEmail = shareBox.querySelector('[data-text="userName"]').textContent;
    fetchUserShare(shareBox,shareEmail);
};

export { handleUserSharePack }

