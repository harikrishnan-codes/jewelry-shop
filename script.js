document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const desktopLinks = document.querySelectorAll('.desktop-menu .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-menu .mobile-nav-link');

  // ==========================================
  // 1. MOBILE DRAWER CONTROLS
  // ==========================================
  function openMenu() {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.classList.add('active');
    
    // Prevent background scrolling while keeping the logo visible
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop.classList.remove('active');
    
    // Re-enable background scrolling
    document.body.classList.remove('menu-open');
  }

  // Toggle button click
  hamburgerBtn.addEventListener('click', () => {
    const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when tapping the dark background backdrop
  drawerBackdrop.addEventListener('click', closeMenu);

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('active')) {
      closeMenu();
    }
  });

  // Reset drawer state when viewport is resized past 768px desktop breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileDrawer.classList.contains('active')) {
      closeMenu();
    }
  });

  // ==========================================
  // 2. HEADER SCROLL GLASS STATE
  // ==========================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // ==========================================
  // 3. CURRENT PAGE ACTIVE LINK HIGHLIGHTING
  // ==========================================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  function setActiveLinks(links) {
    links.forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPath) {
        link.classList.add('active');
      } else if (!linkHref.startsWith('#')) {
        link.classList.remove('active');
      }
    });
  }

  setActiveLinks(desktopLinks);
  setActiveLinks(mobileLinks);
});








// ==========================================
// CURRENT PAGE ACTIVE LINK HIGHLIGHTING
// Synchronizes Header and Footer navigation
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('.desktop-menu .nav-link, .mobile-menu .mobile-nav-link, .footer-links .footer-link');

  allNavLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // Check if the link corresponds to the active page file
    if (linkHref === currentPath) {
      link.classList.add('active');
    } else if (!linkHref.startsWith('#')) {
      link.classList.remove('active');
    }
  });
});








document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .fromTo(
      '.hero-video',
      { scale: 1.25, filter: 'brightness(0.3) contrast(1.15)' },
      { scale: 1.08, filter: 'brightness(0.65) contrast(1.15)', duration: 2.4, ease: 'power2.out' },
      0
    )
    .fromTo(
      '.hero-badge',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      0.3
    )
    .fromTo(
      '.title-line span',
      { yPercent: 110, rotate: 3 },
      { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.15 },
      0.5
    )
    .fromTo(
      '.hero-description',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      1.1
    )
    .fromTo(
      '.hero-cta-group .btn',
      { y: 20, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15 },
      1.3
    )
    .fromTo(
      ['.metric-item', '.metric-divider'],
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
      1.5
    )
    .fromTo(
      '.hero-scroll-indicator',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8 },
      1.8
    );

  gsap.to('.scroll-pip', {
    y: 12,
    opacity: 0,
    duration: 1.6,
    repeat: -1,
    ease: 'power2.inOut'
  });

  gsap.to('.hero-video', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2
    },
    y: 120,
    scale: 1.15
  });

  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: '80% top',
      scrub: 1
    },
    y: -80,
    opacity: 0.15
  });
});









document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const marqueeTrack = document.querySelector('.marquee-track');
  const marqueeContainer = document.getElementById('marqueeContainer');
  const gemIcons = document.querySelectorAll('.gem-icon');

  const marqueeAnim = gsap.to(marqueeTrack, {
    xPercent: -50,
    ease: 'none',
    duration: 28,
    repeat: -1
  });

  if (marqueeContainer) {
    marqueeContainer.addEventListener('mouseenter', () => {
      gsap.to(marqueeAnim, { timeScale: 0.35, duration: 0.8, ease: 'power2.out' });
    });

    marqueeContainer.addEventListener('mouseleave', () => {
      gsap.to(marqueeAnim, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
    });
  }

  gsap.to(gemIcons, {
    rotate: 360,
    duration: 12,
    repeat: -1,
    ease: 'none',
    stagger: {
      each: 0.5,
      from: 'random'
    }
  });

  ScrollTrigger.create({
    trigger: '.marquee-section',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const scrollVelocity = self.getVelocity() / 350;
      const targetScale = Math.min(Math.max(1 + Math.abs(scrollVelocity), 1), 3.2);

      gsap.to(marqueeAnim, {
        timeScale: targetScale,
        duration: 0.3,
        ease: 'power1.out',
        overwrite: 'auto',
        onComplete: () => {
          gsap.to(marqueeAnim, { timeScale: 1, duration: 1.2, ease: 'power2.out' });
        }
      });
    }
  });
});









document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.carousel-card'));
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const dots = Array.from(document.querySelectorAll('.indicator-dot'));
  const stage = document.getElementById('carouselStage');

  if (!cards.length) return;

  let currentIndex = 0;
  const total = cards.length;
  let isAnimating = false;
  let touchStartX = 0;
  let touchEndX = 0;

  function updateCarousel(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + total) % total;

    cards.forEach((card, idx) => {
      card.classList.remove('card-active', 'card-next', 'card-prev', 'card-hidden');

      if (idx === currentIndex) {
        card.classList.add('card-active');
      } else if (idx === (currentIndex + 1) % total) {
        card.classList.add('card-next');
      } else if (idx === (currentIndex - 1 + total) % total) {
        card.classList.add('card-prev');
      } else {
        card.classList.add('card-hidden');
      }
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });

    setTimeout(() => {
      isAnimating = false;
    }, 650);
  }

  nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));
  prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
      if (targetIdx !== currentIndex) {
        updateCarousel(targetIdx);
      }
    });
  });

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const clickedIdx = parseInt(card.getAttribute('data-index'), 10);
      if (clickedIdx !== currentIndex) {
        updateCarousel(clickedIdx);
      }
    });
  });

  if (stage) {
    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 45;
    if (touchEndX < touchStartX - swipeThreshold) {
      updateCarousel(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      updateCarousel(currentIndex - 1);
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') updateCarousel(currentIndex + 1);
    if (e.key === 'ArrowLeft') updateCarousel(currentIndex - 1);
  });
});








document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.vault-bezel', {
      scrollTrigger: {
        trigger: '.craft-vault-card',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      rotationX: 10,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.from('.spec-tab-card', {
      scrollTrigger: {
        trigger: '.craft-details-panel',
        start: 'top 80%',
      },
      x: 40,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power2.out'
    });
  }

  // Interactive specimen switching demo
  const specTabs = document.querySelectorAll('.spec-tab-card');
  const specimenTitle = document.querySelector('.plate-title');
  const specimenMeta = document.querySelector('.plate-meta');
  const specimenTag = document.querySelector('.specimen-tag span:last-child');

  const specimenData = {
    '1': {
      title: 'Cold-Forged 950 Platinum Solitaire',
      meta: 'D-Color • VVS1 • 1,768°C Vacuum Cast',
      tag: 'Specimen #AU-950'
    },
    '2': {
      title: 'Acoustic Micro-Pavé Band',
      meta: '0.4mm Wire Setting • E-Color • VVS2',
      tag: 'Specimen #MP-040'
    },
    '3': {
      title: 'Certified BIS Hallmark Solitaire',
      meta: 'GIA #63829104 • 24K Solid Gold Core',
      tag: 'Specimen #GIA-HALL'
    }
  };

  specTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      specTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const step = tab.getAttribute('data-step');
      if (specimenData[step]) {
        specimenTitle.textContent = specimenData[step].title;
        specimenMeta.textContent = specimenData[step].meta;
        specimenTag.textContent = specimenData[step].tag;
      }
    });
  });
});








document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.split-frame-wrapper', {
      scrollTrigger: {
        trigger: '.split-showcase-section',
        start: 'top 75%'
      },
      x: -50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.from('.split-narrative-content > *', {
      scrollTrigger: {
        trigger: '.split-narrative-col',
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: 'power2.out'
    });
  }
});









document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.expand-card');

  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const isActive = card.classList.contains('active');
        cards.forEach(c => c.classList.remove('active'));
        if (!isActive) {
          card.classList.add('active');
        }
      } else {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      }
    });

    card.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      }
    });
  });
});








document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.testimonial-card'));
  const pills = Array.from(document.querySelectorAll('.t-pill'));
  const prevBtn = document.getElementById('tPrevBtn');
  const nextBtn = document.getElementById('tNextBtn');

  if (!cards.length) return;

  let currentIndex = 0;
  const total = cards.length;
  let isTransitioning = false;

  function setTestimonial(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex = (index + total) % total;

    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx === currentIndex);
    });

    pills.forEach((pill, idx) => {
      pill.classList.toggle('active', idx === currentIndex);
    });

    setTimeout(() => {
      isTransitioning = false;
    }, 650);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => setTestimonial(currentIndex + 1));
  if (prevBtn) prevBtn.addEventListener('click', () => setTestimonial(currentIndex - 1));

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const idx = parseInt(pill.getAttribute('data-index'), 10);
      setTestimonial(idx);
    });
  });

  let touchStartX = 0;
  let touchEndX = 0;
  const track = document.getElementById('testimonialTrack');

  if (track) {
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 40) {
        setTestimonial(currentIndex + 1);
      } else if (touchEndX > touchStartX + 40) {
        setTestimonial(currentIndex - 1);
      }
    }, { passive: true });
  }
});








document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.cta-card', {
      scrollTrigger: {
        trigger: '.luxury-cta-section',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.from('.cta-content > *', {
      scrollTrigger: {
        trigger: '.cta-card',
        start: 'top 75%',
      },
      y: 25,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power2.out'
    });
  }
});








document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (item.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
          otherItem.querySelector('.faq-content').style.maxHeight = '0px';
        }
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
      }
    });
  });
});