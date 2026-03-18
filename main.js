/* ═══════════════════════════════════════════
   RUSLAN PISARENKO — PORTFOLIO
   main.js
═══════════════════════════════════════════ */

const ADMIN_PASSWORD = 'ruslangd2025'; // CHANGE THIS
let isAdmin = false;

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── VAULT EASTER EGG ──
let vaultClickCount = 0;
const vaultMessages = [
  { title: "ACCESS DENIED", sub: "classification level: ██████" },
  { title: "STILL DENIED", sub: "please stop clicking" },
  { title: "WHO ARE YOU", sub: "how did you get this url" },
  { title: "FINE.", sub: "it's about bartenders. that's all you get." },
  { title: "STOP.", sub: "i mean it this time" },
  { title: "...okay fine", sub: "one is horror. one is not. happy?" },
  { title: "ACCESS DENIED", sub: "classification level: ██████" },
];

function vaultClick() {
  vaultClickCount++;
  const msg = vaultMessages[Math.min(vaultClickCount - 1, vaultMessages.length - 1)];
  const titleEl = document.querySelector('.vault-message-title');
  const subEl = document.querySelector('.vault-message-sub');
  if (titleEl) {
    titleEl.style.opacity = '0';
    setTimeout(() => {
      titleEl.textContent = msg.title;
      titleEl.style.opacity = '';
    }, 150);
  }
  if (subEl) {
    subEl.style.opacity = '0';
    setTimeout(() => {
      subEl.textContent = msg.sub;
      subEl.style.opacity = '';
    }, 150);
  }

  // Glitch effect on vault
  const vault = document.querySelector('.vault-container');
  if (vault) {
    vault.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
    setTimeout(() => { vault.style.transform = ''; }, 100);
  }
}

// ── ADMIN LOGIN ──
function openAdminLogin() {
  if (isAdmin) {
    toggleAdminPanel();
    return;
  }
  document.getElementById('loginModal').classList.add('visible');
  setTimeout(() => document.getElementById('adminPassword').focus(), 100);
}

function closeAdminLogin() {
  document.getElementById('loginModal').classList.remove('visible');
  document.getElementById('adminPassword').value = '';
  document.getElementById('loginError').style.display = 'none';
}

function checkPassword() {
  const pwd = document.getElementById('adminPassword').value;
  if (pwd === ADMIN_PASSWORD) {
    isAdmin = true;
    closeAdminLogin();
    activateAdmin();
  } else {
    document.getElementById('loginError').style.display = 'block';
    document.getElementById('adminPassword').value = '';
    document.getElementById('adminPassword').focus();

    // Shake animation
    const input = document.getElementById('adminPassword');
    input.style.transform = 'translateX(-8px)';
    setTimeout(() => { input.style.transform = 'translateX(8px)'; }, 80);
    setTimeout(() => { input.style.transform = 'translateX(-4px)'; }, 160);
    setTimeout(() => { input.style.transform = ''; }, 240);
  }
}

function activateAdmin() {
  document.getElementById('adminBtn').classList.add('active');
  document.body.classList.add('admin-mode');
  document.getElementById('adminPanel').classList.add('visible');
  buildGalleryToggles();
}

function toggleAdminPanel() {
  document.getElementById('adminPanel').classList.toggle('visible');
}

function logoutAdmin() {
  isAdmin = false;
  document.getElementById('adminBtn').classList.remove('active');
  document.body.classList.remove('admin-mode');
  document.getElementById('adminPanel').classList.remove('visible');
}

// ── SECTION VISIBILITY ──
function toggleSection(sectionId, visible) {
  const el = document.querySelector(`[data-section="${sectionId}"]`);
  if (el) {
    el.classList.toggle('hidden-section', !visible);
    const badge = el.querySelector('.visibility-badge');
    if (badge) badge.textContent = visible ? 'Visible' : 'Hidden';
  }
}

// ── GALLERY TOGGLES ──
function buildGalleryToggles() {
  const container = document.getElementById('galleryToggles');
  const items = document.querySelectorAll('.gallery-item');
  if (!container) return;
  container.innerHTML = '';
  items.forEach((item, i) => {
    const row = document.createElement('div');
    row.className = 'toggle-row';
    row.innerHTML = `
      <span class="toggle-label">Photo ${String(i+1).padStart(2,'0')}</span>
      <label class="toggle">
        <input type="checkbox" checked onchange="toggleGalleryItem('${item.id}', this.checked)">
        <span class="slider"></span>
      </label>`;
    container.appendChild(row);
  });
}

function toggleGalleryItem(id, visible) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('hidden-item', !visible);
}

// ── CLOSE MODAL ON BACKDROP ──
document.getElementById('loginModal').addEventListener('click', function(e) {
  if (e.target === this) closeAdminLogin();
});

// ── KEYBOARD SHORTCUTS ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAdminLogin();
  if (e.key === 'Enter' && document.getElementById('loginModal').classList.contains('visible')) {
    checkPassword();
  }
});

// ── CURSOR TRAIL (subtle red dots) ──
document.addEventListener('mousemove', e => {
  if (Math.random() > 0.92) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: 3px;
      height: 3px;
      background: rgba(192,57,43,0.4);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transition: opacity 0.6s, transform 0.6s;
    `;
    document.body.appendChild(dot);
    requestAnimationFrame(() => {
      dot.style.opacity = '0';
      dot.style.transform = 'scale(3)';
    });
    setTimeout(() => dot.remove(), 600);
  }
});
