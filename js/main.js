// Mobile menu
const menu = document.getElementById('menu'), links = document.getElementById('links');
menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Waitlist form — front-end only.
const form = document.getElementById('waitlist'), msg = document.getElementById('form-msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const email = form.email.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = 'Please enter a valid email address.'; msg.classList.add('err'); return;
  }
  // TODO: Send `email` to a real form endpoint here, e.g.:
  // await fetch('https://YOUR-FORM-ENDPOINT', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email }) });
  msg.classList.remove('err');
  msg.textContent = "Thank you — you're on the list. We'll be in touch before launch.";
  form.reset();
});

// Bottom CTA focuses the email field
document.querySelector('[data-focus-email]').addEventListener('click', () => setTimeout(() => form.email.focus(), 400));
