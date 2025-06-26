// -- handlers/handleUserShareClick.js

import { handleUserSharePack } from './handleUserSharePack.js';

function handleUserShareClick() {

    const shareBoxes = document.querySelectorAll('.m-share-add');
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