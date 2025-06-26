// -- template/createFridgeItemForm.js

function createfridgeItemForm() {
  const template = document.getElementById('fridgeItemFormTemplate');
  const clone = template.content.cloneNode(true);
  const wrapper = document.createElement('div');
  wrapper.appendChild(clone);
  const form = wrapper.querySelector('form'); 
  return form;
}

export { createfridgeItemForm };