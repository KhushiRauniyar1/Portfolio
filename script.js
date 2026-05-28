// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 600);
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active nav link via IntersectionObserver
const navLinks = document.querySelectorAll('.nav-links a[data-link]');
const sections = ['about', 'education', 'skills', 'services', 'projects']
  .map(id => document.getElementById(id))
  .filter(Boolean);
const navObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => navObs.observe(s));

// Typewriter
const words = ['Creative Coder', 'BSc Computer Science'];
const typeEl = document.getElementById('typewriter');
let wIdx = 0, cIdx = 0, deleting = false;
function type() {
  const word = words[wIdx];
  if (!deleting) {
    typeEl.textContent = word.slice(0, ++cIdx);
    if (cIdx === word.length) { deleting = true; setTimeout(type, 1500); return; }
  } else {
    typeEl.textContent = word.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
  }
  setTimeout(type, deleting ? 60 : 110);
}
type();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObs.observe(el));

// Project filters
document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.toggle('hidden', f !== 'All' && card.dataset.category !== f);
    });
  });
});

// Contact form
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const original = btn.textContent;
  btn.textContent = "Thanks — I'll be in touch!";
  e.target.reset();
  setTimeout(() => { btn.textContent = original; }, 3000);
});
