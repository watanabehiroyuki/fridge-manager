// -- template/createFridgeItemForm.js

function createfridgeItemForm() {
  const template = document.getElementById('fridgeItemFormTemplate');
  const clone = template.content.cloneNode(true);
  const form = clone.querySelector('form'); 
  return form;
}

export { createfridgeItemForm };