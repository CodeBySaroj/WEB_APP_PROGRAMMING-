/* ============================================================
   SAROJ YADAV PORTFOLIO — MAIN JAVASCRIPT
   Features: Custom cursor, typewriter, scroll reveal,
             skill bars, nav scroll, hamburger, form handler
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. CUSTOM CURSOR
  ========================================== */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Smooth follower
    (function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(animateFollower);
    })();

    // Enlarge on interactive elements
    const interactives = document.querySelectorAll('a, button, .tool-pill, .project-card, .skill-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.width  = '50px';
        follower.style.height = '50px';
        follower.style.borderColor = 'rgba(0,201,167,0.7)';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.width  = '32px';
        follower.style.height = '32px';
        follower.style.borderColor = 'rgba(0,201,167,0.4)';
      });
    });
  }

  /* ==========================================
     2. NAVBAR — scroll state
  ========================================== */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ==========================================
     3. HAMBURGER / MOBILE DRAWER
  ========================================== */
  const hamburger   = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks  = document.querySelectorAll('.drawer-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileDrawer.classList.toggle('open');
    document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
  });

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ==========================================
     4. TYPEWRITER EFFECT
  ========================================== */
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const phrases = [
      'studying kernel internals...',
      'running nmap on 192.168.1.0/24',
      'analyzing EUR/USD price action...',
      'writing Python automation scripts...',
      'hunting vulnerabilities in burp...',
      'reading CVEs and exploit-db...',
      'focused. disciplined. building.',
    ];

    let pIdx = 0, cIdx = 0, deleting = false;

    function type() {
      const phrase = phrases[pIdx];
      if (!deleting) {
        typeEl.textContent = phrase.slice(0, ++cIdx);
        if (cIdx === phrase.length) {
          deleting = true;
          setTimeout(type, 2200);
          return;
        }
      } else {
        typeEl.textContent = phrase.slice(0, --cIdx);
        if (cIdx === 0) {
          deleting = false;
          pIdx = (pIdx + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 32 : 60);
    }
    setTimeout(type, 800);
  }

  /* ==========================================
     5. SCROLL REVEAL
  ========================================== */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals
        const siblings = Array.from(entry.target.parentElement?.children || []);
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 400);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ==========================================
     6. SKILL BARS — animate on scroll
  ========================================== */
  const barFills = document.querySelectorAll('.bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const pct  = fill.dataset.width;
        fill.style.setProperty('--w', pct + '%');
        fill.classList.add('animated');
        barObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  barFills.forEach(b => barObserver.observe(b));

  /* ==========================================
     7. ACTIVE NAV LINK ON SCROLL
  ========================================== */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--teal)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ==========================================
     8. CONTACT FORM (mock handler)
  ========================================== */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#22C55E';
      btn.style.color = '#fff';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

  /* ==========================================
     9. SMOOTH SCROLL for anchors
  ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ==========================================
     10. TOOL PILLS — stagger entrance
  ========================================== */
  const toolPills = document.querySelectorAll('.tool-pill');
  const toolObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      toolPills.forEach((pill, i) => {
        setTimeout(() => {
          pill.style.opacity = '1';
          pill.style.transform = 'translateY(0)';
        }, i * 50);
      });
      toolObserver.disconnect();
    }
  }, { threshold: 0.2 });

  // Set initial state
  toolPills.forEach(pill => {
    pill.style.opacity = '0';
    pill.style.transform = 'translateY(16px)';
    pill.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });

  const toolsSection = document.getElementById('tools');
  if (toolsSection) toolObserver.observe(toolsSection);

});
