// -- render/renderFetchError.js
import { createModal } from '../template/createModal.js';

function renderFetchError(err) {
  const modal = createModal();
  document.body.after(modal);
  const txtBox = modal.querySelector('p[data-txt="result"]');
  txtBox.textContent = err.message;
}

export { renderFetchError };
