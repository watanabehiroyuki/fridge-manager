async function includeHTML(selector, file) {
  const element = document.querySelector(selector);
  if (!element) return;
  const res = await fetch(file);
  const html = await res.text();
  element.innerHTML = html;
}
includeHTML('#header', '/public/partials/header.html');
includeHTML('#footer', '/public/partials/footer.html');