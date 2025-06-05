// -- template/createFridgeBox.js

function createFridgeBox() {
  const template = document.getElementById('fridgeBoxTemplate');
  const clone = template.content.cloneNode(true);
  const li = clone.querySelector('li'); 
  return li;
}

export { createFridgeBox };