// -- template/createUserShareBox.js

function createUserShareBox() {
    const template = document.getElementById('userShareTemplate');
    const clone = template.content.cloneNode(true);
    const wrapper = document.createElement('div');
    wrapper.appendChild(clone);
    const box = wrapper.querySelector('.m-share-add');
    return box;
  }
  
  export { createUserShareBox };