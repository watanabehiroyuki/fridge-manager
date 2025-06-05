// -- template/createFridgeAddForm.js

function createFridgeAddForm() {
  const template = document.getElementById('fridgeAddFormTemplate');
  const clone = template.content.cloneNode(true);
  const wrapper = document.createElement('div');
  wrapper.appendChild(clone);
  const form = wrapper.querySelector('form'); 
  return form;
}

export { createFridgeAddForm };