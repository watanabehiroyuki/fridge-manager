fetch('/partials/head.html')
  .then(res => res.text())
  .then(html => document.head.innerHTML += html);