/* main.js — Ruslan Pisarenko Portfolio */

// NAV SCROLL
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// SCROLL REVEAL
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// VAULT EASTER EGG
let vaultClickCount = 0;
const vaultMessages = [
  { title: "ACCESS DENIED",  sub: "classification level: ██████" },
  { title: "STILL DENIED",   sub: "please stop clicking" },
  { title: "WHO ARE YOU",    sub: "how did you get this url" },
  { title: "FINE.",          sub: "it's about bartenders. that's all you get." },
  { title: "STOP.",          sub: "i mean it this time" },
  { title: "...okay fine",   sub: "one is horror. one is not. happy?" },
  { title: "ACCESS DENIED",  sub: "classification level: ██████" },
];

function vaultClick() {
  vaultClickCount++;
  const msg = vaultMessages[Math.min(vaultClickCount - 1, vaultMessages.length - 1)];
  const titleEl = document.querySelector('.vault-message-title');
  const subEl = document.querySelector('.vault-message-sub');
  if (titleEl) { titleEl.style.opacity='0'; setTimeout(()=>{titleEl.textContent=msg.title;titleEl.style.opacity='';},150); }
  if (subEl)   { subEl.style.opacity='0';   setTimeout(()=>{subEl.textContent=msg.sub;subEl.style.opacity='';},150); }
  const vault = document.querySelector('.vault-container');
  if (vault) { vault.style.transform=`translateX(${Math.random()*4-2}px)`; setTimeout(()=>{vault.style.transform='';},100); }
}

// CURSOR TRAIL
document.addEventListener('mousemove', e => {
  if (Math.random() > 0.94) {
    const dot = document.createElement('div');
    dot.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:3px;height:3px;background:rgba(192,57,43,0.4);border-radius:50%;pointer-events:none;z-index:9998;transition:opacity 0.6s,transform 0.6s;`;
    document.body.appendChild(dot);
    requestAnimationFrame(()=>{ dot.style.opacity='0'; dot.style.transform='scale(3)'; });
    setTimeout(()=>dot.remove(), 600);
  }
});
