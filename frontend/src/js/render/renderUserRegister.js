// -- render/renderUserRegister.js

function renderUserRegister() {
    document.getElementById('userRegisterForm').reset();
    document.getElementById('userRegisterSuccess').classList.add('is-active');
    document.getElementById('userRegisterDefault').classList.add('is-hidden');
};

export { renderUserRegister };