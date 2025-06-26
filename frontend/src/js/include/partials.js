import { handleUserLogoutClick } from '../handlers/handleUserLogoutClick.js';

async function includeHTML(selector, file, callback) {
  const element = document.querySelector(selector);
  if (!element) return;
  const res = await fetch(file);
  const html = await res.text();
  element.innerHTML = html;
  if (typeof callback === 'function') callback();
}
includeHTML('#header', '/public/partials/header.html');
includeHTML('#footer', '/public/partials/footer.html', () => {
  handleUserLogoutClick();
});