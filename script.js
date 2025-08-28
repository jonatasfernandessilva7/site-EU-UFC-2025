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
    padding: '2vw 4vw',
    borderRadius: '24px',
    fontSize: 'clamp(10px, 2vw, 17px)',
    maxWidth: '90',
    boxShadow: '0 2px 12px #0002',
    zIndex: '2000',
    opacity: '0',
    transition: 'opacity 0.7s',
    textAlign: 'center'
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
  //visual event in animated click
  t.style.transition = 'background 0.4s, color 0.4s, box-shadow 0.4s, transform 0.3s, opacity 0.3s';
  t.style.background = '#f5e663';
  t.style.color = '#333';
  t.style.boxShadow = '0 4px 16px #D8584188';
  t.style.transform = 'scale(1.08)';
  t.style.opacity = '0.8';
  //return in normal mode
  setTimeout(() => {
    t.style.background = '';
    t.style.color = '';
    t.style.boxShadow = '';
    t.style.transform = '';
    t.style.opacity = '';
  }, 400);
  // Rolagem suave
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

// fade-in for all sections
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

// button for home page
const backToTop = document.createElement('button');
backToTop.textContent = '↑';
backToTop.title = 'Voltar ao topo';
Object.assign(backToTop.style, {
  display: 'none',
  position: 'fixed',
  bottom: '25px',
  right: '25px',
  width: '40px',
  height: '40px',
  padding: '0',
  justifyContent: 'center',
  alignItems: 'center',
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

/* MODO NOTURNO VIA BOTÃO */
const toggleBtn = document.getElementById('darkToggle');
const toggleIcon = toggleBtn ? toggleBtn.querySelector('.icon-dark') : null;

function aplicarTema(escuro) {
  if (escuro) {
    document.body.classList.add('dark');
    if (toggleIcon) {
      toggleIcon.src = 'imgs/sol.png';
      toggleIcon.alt = 'Tema claro';
    }
    localStorage.setItem('darkmode', 'on');
  } else {
    document.body.classList.remove('dark');
    if (toggleIcon) {
      toggleIcon.src = 'imgs/lua.png';   // mostra lua quando está NO claro (para ir ao escuro)
      toggleIcon.alt = 'Tema escuro';
    }
    localStorage.setItem('darkmode', 'off');
  }
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const escuro = !document.body.classList.contains('dark');
    aplicarTema(escuro);
  });

  // Inicializa com a preferência salva (padrão: claro)
  const saved = localStorage.getItem('darkmode');
  aplicarTema(saved === 'on');
}

// dates animations
window.addEventListener('DOMContentLoaded', () => {
  const card = document.querySelector('#card-date');
  if (card) {
    card.style.transition = 'box-shadow 0.7s, transform 0.7s';
    card.style.boxShadow = '0 0 0 #1C4931ff';
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
      card.style.boxShadow = '0 8px 32px #1C4931ff';
      card.style.transform = 'scale(1.03)';
    }, 200);
    setTimeout(() => {
      card.style.boxShadow = '';
      card.style.transform = '';
    }, 1200);
  }
});

// modal for subscribe button
document.addEventListener('click', function(e) {
  const btn = e.target.closest('[data-inscrever]');
  if (!btn) return;

  //create modal
  const modalBg = document.createElement('div');
  Object.assign(modalBg.style, {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 3000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

  const modal = document.createElement('div');
  Object.assign(modal.style, {
    background: '#fff',
    color: '#222',
    padding: '32px 24px',
    borderRadius: '16px',
    boxShadow: '0 4px 24px #0003',
    textAlign: 'center',
    maxWidth: '90vw',
    fontSize: '1.1rem'
  });
  modal.innerHTML = `
    <p>Você gostaria de ser redirecionado para o formulário de inscrição?</p>
    <button id="modalConfirm" style="margin:16px 8px 0 0;padding:8px 18px;border-radius:8px;background:#1C4931;color:#fff;border    :0;cursor:pointer;">Sim</button>
    <button id="modalCancel" style="margin:16px 0 0 8px;padding:8px 18px;border-radius:8px;background:#D85841;color:#fff;border:0;cursor:pointer;">Não</button>
  `;
  modalBg.appendChild(modal);
  document.body.appendChild(modalBg);

  //continue button
  modal.querySelector('#modalConfirm').onclick = function() {
    modalBg.remove();
    //redirect to form
    window.open('https://forms.gle/ULJDgDThfGPnFRtp8', '_blank');
  };
  //cancel button
  modal.querySelector('#modalCancel').onclick = function() {
    modalBg.remove();
  };
});
