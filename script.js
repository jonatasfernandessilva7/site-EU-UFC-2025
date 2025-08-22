// Util: rolagem suave via data-scrollto
addEventListener('click', (e) => {
const t = e.target.closest('[data-scrollto]');
if (!t) return;
e.preventDefault();
const sel = t.getAttribute('data-scrollto');
const el = document.querySelector(sel);
el?.scrollIntoView({behavior:'smooth'});
});


// ===== Menu hambúrguer =====
const burger = document.getElementById('burger');
const links = document.getElementById('navLinks');

if (burger && links) {
  burger.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Fecha o menu ao clicar em um link
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}


// Hide-on-scroll topbar
let lastY = window.scrollY;
const topbar = document.getElementById('topbar');
const threshold = 12; // px para ignorar micro rolagens
addEventListener('scroll', () => {
const y = window.scrollY;
if (y > 6) topbar.classList.add('scrolled'); else topbar.classList.remove('scrolled');
if (Math.abs(y - lastY) > threshold){
if (y > lastY && y > 80){ topbar.classList.add('hide'); }
else { topbar.classList.remove('hide'); }
lastY = y;
}
}, {passive:true});


// Active link highlight por seção
const navAnchors = links ? Array.from(links.querySelectorAll('a')) : [];
const targets = navAnchors.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const io = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting){
const id = '#' + entry.target.id;
navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
}
})
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.1 });


targets.forEach(sec => io.observe(sec));