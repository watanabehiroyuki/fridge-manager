// -- handlers/handleUserShareClick.js

import { handleUserSharePack } from './handleUserSharePack.js';

function handleUserShareClick() {

    const shareBoxes = document.querySelectorAll('.m-users__share');
    if (shareBoxes.length) {
        shareBoxes.forEach((shareBox) => {
            const shareBtn = shareBox.querySelector('button[data-action="share"]');
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                handleUserSharePack(shareBox);
            })
        })
    }
};

export { handleUserShareClick }