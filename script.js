//welcome message
window.addEventListener('DOMContentLoaded', () => {
  const msg = document.createElement('div');
  msg.textContent = 'Bem-vindo ao site dos Encontros Universitários da UFC de Itapajé!';
  Object.assign(msg.style, {
    position: 'fixed',
    top: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#1C4931',
    color: '#fff',
    padding: '12px 32px',
    borderRadius: '24px',
    fontSize: '1.2rem',
    boxShadow: '0 2px 12px #0002',
    zIndex: '2000',
    opacity: '0',
    transition: 'opacity 0.7s'
  });
  document.body.appendChild(msg);
  setTimeout(() => { msg.style.opacity = '1'; }, 200);
  setTimeout(() => { msg.style.opacity = '0'; }, 3200);
  setTimeout(() => { msg.remove(); }, 4000);
});

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
const navAnchors = links ? Array.from(links.querySelectorAll('a')).filter(a => a.getAttribute('href').startsWith('#')) : [];
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

//fade-in for all sections
document.querySelectorAll('section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s, transform 0.7s';
  new IntersectionObserver(([entry], obs) => {
    if (entry.isIntersecting) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      obs.disconnect();
    }
  }, { threshold: 0.15 }).observe(el);
});

const backToTop = document.createElement('button');
backToTop.textContent = '↑';
Object.assign(backToTop.style, {
  display: 'none',
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  padding: '12px 16px',
  borderRadius: '50%',
  background: '#D85841',
  color: '#fff',
  border: '0',
  cursor: 'pointer',
  fontSize: '20px',
  zIndex: '1000'
});
backToTop.title = 'Voltar ao topo';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

//dark mode
(function(){
  const hora = new Date().getHours();
  if (hora >= 19 || hora < 7) {
    document.body.style.background = '#181a1b';
    document.body.style.color = '#eee';
    const topbar = document.getElementById('topbar');
    if (topbar) topbar.style.background = '#222';
    document.querySelectorAll('button').forEach(btn => {
      btn.style.background = '#333';
      btn.style.color = '#fff';
    });
  }
})();