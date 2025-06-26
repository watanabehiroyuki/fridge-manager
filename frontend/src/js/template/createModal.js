// -- template/createModal.js

function createModal() {
  const template = document.getElementById('modalTemplate');
  const clone = template.content.cloneNode(true);
  const wrapper = document.createElement('div');
  wrapper.appendChild(clone);
  const modal = wrapper.querySelector('.m-modal'); 
  const closeBtn = modal.querySelector('button[data-action="close"]');
  closeBtn.addEventListener('click', (e) => {
    modal.remove();
  })
  return modal;
}


export { createModal };