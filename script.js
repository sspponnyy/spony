const range = document.querySelector('.comparison-range');
const before = document.querySelector('.comparison-before');
const divider = document.querySelector('.comparison-divider');

function updateComparison(value) {
  if (!before || !divider) return;
  before.style.right = `${100 - value}%`;
  divider.style.left = `${value}%`;
}

if (range) {
  updateComparison(range.value);
  range.addEventListener('input', (event) => updateComparison(event.target.value));
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }));
}
