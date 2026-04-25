/* ===================================================
   gSapio — GSAP Animations & ScrollTrigger
   =================================================== */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ---------- LOADER / INTRO ANIMATION ---------- */
(function loaderAnimation() {
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to('#loader', {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          document.getElementById('loader').style.display = 'none';
          initScrollAnimations();
          initCountUp();
        }
      });
    }
  });

  tl.to('.loader-sun', { opacity: 1, scale: 1, rotation: 360, duration: 1.2, ease: 'back.out(1.7)' })
    .to('.loader-cloud', { opacity: 0.8, x: 20, duration: 0.8, stagger: 0.2, ease: 'power2.out' }, '-=0.6')
    .to('.loader-word', {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(2)'
    }, '-=0.4')
    .to({}, { duration: 0.8 });
})();

/* ---------- NAVBAR ---------- */
(function navbar() {
  const nav = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-link, .mobile-btn').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
})();

/* ---------- SMOOTH SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      gsap.to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 1, ease: 'power3.inOut' });
    }
  });
});

/* ---------- HERO ANIMATIONS ---------- */
(function heroAnimations() {
  // Floating clouds
  gsap.to('.hero-cloud-1', { x: 40, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.hero-cloud-2', { x: -30, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.hero-cloud-3', { x: 25, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  // Sun pulse
  gsap.to('.hero-sun circle:first-child', {
    r: 85, opacity: 0.4, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  // Sun rays
  gsap.to('.sun-rays', { opacity: 0.25, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  // Character bob
  gsap.to('.hero-character', { y: -8, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  // Panels subtle movement
  gsap.to('.hero-panels', {
    y: -5, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });

  // Hero banner entrance
  gsap.from('.hero-banner', {
    y: 80, opacity: 0, duration: 1.2, delay: 0.3, ease: 'back.out(1.5)',
    scrollTrigger: { trigger: '.hero-section', start: 'top center' }
  });

  // Parallax on hero illustration
  gsap.to('.hero-illustration', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
})();

/* ---------- MAIN SCROLL ANIMATIONS ---------- */
function initScrollAnimations() {

  // Service cards — stacking with rotation (like reference)
  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card, i) => {
    const rotation = card.dataset.rotation || 0;
    gsap.from(card, {
      y: 100,
      opacity: 0,
      rotation: parseFloat(rotation) * 2,
      scale: 0.9,
      duration: 0.8,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        end: 'top 40%',
        toggleActions: 'play none none reverse'
      }
    });

    // Add slight rotation on scroll
    gsap.to(card, {
      rotation: parseFloat(rotation),
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1
      }
    });
  });

  // Floating clouds in services section
  gsap.to('.float-cloud-1', { x: 30, y: -10, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  gsap.to('.float-cloud-2', { x: -20, y: 10, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  // Quote section
  gsap.from('.quote-text', {
    y: 60, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.quote-section', start: 'top 70%' }
  });
  gsap.from('.quote-cta', {
    scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(2)',
    scrollTrigger: { trigger: '.quote-cta', start: 'top 85%' }
  });

  // Big words
  const bigWords = document.querySelectorAll('.big-word');
  bigWords.forEach((word, i) => {
    gsap.from(word, {
      x: i % 2 === 0 ? -200 : 200,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: word,
        start: 'top 85%',
        end: 'top 40%',
        scrub: 1
      }
    });
  });

  // About section
  gsap.from('.about-heading-line', {
    y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-heading', start: 'top 75%' }
  });
  gsap.from('.about-text-block', {
    y: 40, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-text-block', start: 'top 80%' }
  });
  gsap.from('.about-illustration svg', {
    scale: 1.1, opacity: 0, duration: 1.2, ease: 'power2.out',
    scrollTrigger: { trigger: '.about-visual', start: 'top 70%' }
  });

  // Illustration break — parallax
  gsap.to('.break-character', {
    y: -30, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });
  gsap.from('.break-bubble', {
    scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(2)',
    scrollTrigger: { trigger: '.break-bubble', start: 'top 80%' }
  });
  gsap.from('.break-panels', {
    x: -50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.break-panels', start: 'top 85%' }
  });

  // Process steps
  const steps = document.querySelectorAll('.process-step');
  steps.forEach((step, i) => {
    gsap.from(step, {
      y: 80, opacity: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: step, start: 'top 85%' }
    });
  });
  gsap.from('.process-header', {
    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.process-header', start: 'top 80%' }
  });

  // Stats section
  gsap.from('.stat-item', {
    y: 50, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.stats-section', start: 'top 75%' }
  });

  // Next/CTA section
  gsap.from('.next-content', {
    x: -60, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.next-section', start: 'top 70%' }
  });
  gsap.from('.next-character', {
    y: 100, opacity: 0, duration: 1, ease: 'back.out(1.5)',
    scrollTrigger: { trigger: '.next-section', start: 'top 70%' }
  });

  // Footer
  gsap.from('.footer-heading', {
    y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.footer-section', start: 'top 80%' }
  });
  gsap.from('.footer-col a', {
    y: 20, opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out',
    scrollTrigger: { trigger: '.footer-top', start: 'top 85%' }
  });
}

/* ---------- COUNT-UP ANIMATION ---------- */
function initCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(num => {
    const target = parseInt(num.dataset.target, 10);
    ScrollTrigger.create({
      trigger: num,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(num, {
          innerText: target,
          duration: 2,
          ease: 'power1.out',
          snap: { innerText: 1 },
          onUpdate: function () {
            num.textContent = Math.floor(parseFloat(num.textContent)).toLocaleString();
          }
        });
      }
    });
  });
}

/* ---------- HERO ARROW SCROLL ---------- */
document.querySelector('.hero-arrow-right')?.addEventListener('click', () => {
  gsap.to(window, { scrollTo: { y: '#services', offsetY: 80 }, duration: 1, ease: 'power3.inOut' });
});
document.querySelector('.hero-arrow-left')?.addEventListener('click', () => {
  gsap.to(window, { scrollTo: { y: 0 }, duration: 1, ease: 'power3.inOut' });
});

/* ---------- SCROLL PROGRESS BAR (subtle top bar) ---------- */
(function scrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#F9A825,#F57F17);z-index:10000;width:0;transition:none;';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = (scrolled * 100) + '%';
  });
})();
