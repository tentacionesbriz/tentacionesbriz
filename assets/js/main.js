
/* =========================================
   TENTACIONES BRIZ — Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── SIDEBAR TOGGLE (mobile) ──
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebarOverlay');
  const hamburger = document.getElementById('hamburger');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  overlay?.addEventListener('click', closeSidebar);

  // Close sidebar on nav link click (mobile)
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 860) closeSidebar();
    });
  });

  // ── ACTIVE NAV LINK on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');

  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 55);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.10 });
  reveals.forEach(el => revealObs.observe(el));

  // ── CATALOG FILTER ──
  window.filterCatalog = (cat, btn) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.glass-card').forEach(card => {
      const cardCat = card.dataset.cat;
      const show = cat === 'all' || cardCat === cat ||
                   (cardCat === 'pasteles' && cat === 'pasteles') ||
                   card.classList.contains('featured-card');

      if (cat === 'all') {
        card.style.display = '';
      } else if (card.classList.contains('featured-card')) {
        card.style.display = (cat === 'pasteles') ? '' : 'none';
      } else {
        card.style.display = (cardCat === cat) ? '' : 'none';
      }
    });
  };

  // ── SMOOTH SCROLL for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = window.innerWidth <= 860 ? 70 : 0;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

});
