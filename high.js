document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    const highTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    highTl
      .fromTo('.high-breadcrumb', { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo('.high-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
      .fromTo('.high-hero-title span', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15 }, '-=0.5')
      .fromTo('.high-hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
      .fromTo('.high-credentials-bar', { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, '-=0.5')
      .fromTo('.high-hero-actions .btn', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, '-=0.4');
  }
});









document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.matrix-tab-btn');
  const panels = document.querySelectorAll('.matrix-panel');
  const indicator = document.getElementById('tabIndicator');

  function updateIndicator(activeTab) {
    if (!indicator || !activeTab) return;
    
    // Position cleanly over the active tab button
    indicator.style.width = `${activeTab.offsetWidth}px`;
    indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
  }

  // Handle immediate initialization and post-font-load recalculation
  const initialActive = document.querySelector('.matrix-tab-btn.active');
  if (initialActive) {
    updateIndicator(initialActive);
    // Recalculate after web fonts finish rendering
    if (document.fonts) {
      document.fonts.ready.then(() => updateIndicator(initialActive));
    }
  }

  window.addEventListener('resize', () => {
    const current = document.querySelector('.matrix-tab-btn.active');
    if (current) updateIndicator(current);
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = `panel-${tab.getAttribute('data-target')}`;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      updateIndicator(tab);

      panels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(panel, 
              { opacity: 0, y: 16 }, 
              { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
            );
          }
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
});









document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.skeuo-instrument-card');
  const imgElement = document.getElementById('activeSpecimenImg');
  const titleElement = document.getElementById('plateTitle');
  const specsElement = document.getElementById('plateSpecs');
  const serialElement = document.getElementById('traySerial');

  let activeCard = document.querySelector('.skeuo-instrument-card.active') || cards[0];

  function updateLeftTray(card) {
    if (!card) return;

    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    const newTitle = card.getAttribute('data-title');
    const newSpecs = card.getAttribute('data-specs');
    const newImg = card.getAttribute('data-img');
    const newSerial = card.getAttribute('data-serial');

    if (imgElement && newImg && imgElement.src !== newImg) {
      imgElement.style.opacity = '0';
      imgElement.style.transform = 'scale(0.92)';

      if (titleElement) titleElement.style.opacity = '0';
      if (specsElement) specsElement.style.opacity = '0';

      setTimeout(() => {
        imgElement.src = newImg;
        if (titleElement) {
          titleElement.textContent = newTitle;
          titleElement.style.opacity = '1';
        }
        if (specsElement) {
          specsElement.innerHTML = newSpecs;
          specsElement.style.opacity = '1';
        }
        if (serialElement && newSerial) {
          serialElement.textContent = newSerial;
        }

        imgElement.style.opacity = '1';
        imgElement.style.transform = 'scale(1)';
      }, 180);
    }
  }

  cards.forEach(card => {
    // Primary requirement: mouseenter / hover triggers left-side display
    card.addEventListener('mouseenter', () => {
      updateLeftTray(card);
    });

    // Click support for mobile/touch screens
    card.addEventListener('click', () => {
      activeCard = card;
      updateLeftTray(card);
    });
  });

  // GSAP Entrance Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.tray-outer-rim', {
      scrollTrigger: {
        trigger: '.skeuo-craft-section',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out'
    });

    gsap.from('.skeuo-instrument-card', {
      scrollTrigger: {
        trigger: '.skeuo-controls-panel',
        start: 'top 80%',
      },
      x: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power2.out'
    });
  }
});









document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  // Desktop Scroll-Driven Stacking Scale & Dim Effect
  mm.add('(min-width: 769px)', () => {
    const cards = gsap.utils.toArray('.kinetic-card');

    cards.forEach((card, i) => {
      if (i !== cards.length - 1) {
        gsap.to(card, {
          scale: 0.93 + i * 0.015,
          filter: 'brightness(0.65)',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top 35%',
            end: 'top 15%',
            scrub: true
          }
        });
      }
    });
  });

  // Mobile Clean Fade-Up Animation
  mm.add('(max-width: 768px)', () => {
    const cards = document.querySelectorAll('.kinetic-card');
    cards.forEach(card => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  });
});










document.addEventListener('DOMContentLoaded', () => {
  const stage = document.getElementById('loupeStage');
  const baseImg = document.getElementById('loupeBaseImg');
  const lens = document.getElementById('opticalLens');
  const zoomContent = document.getElementById('lensZoomContent');

  if (!stage || !baseImg || !lens || !zoomContent) return;

  const zoomFactor = 2.5;

  zoomContent.style.backgroundImage = `url('${baseImg.src}')`;

  function moveLens(clientX, clientY) {
    const rect = stage.getBoundingClientRect();

    let x = clientX - rect.left;
    let y = clientY - rect.top;

    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));

    lens.style.left = `${x}px`;
    lens.style.top = `${y}px`;

    const bgWidth = rect.width * zoomFactor;
    const bgHeight = rect.height * zoomFactor;

    zoomContent.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;

    const bgPosX = x * zoomFactor - lens.offsetWidth / 2;
    const bgPosY = y * zoomFactor - lens.offsetHeight / 2;

    zoomContent.style.backgroundPosition = `-${bgPosX}px -${bgPosY}px`;
  }

  // Mouse Inspection
  stage.addEventListener('mouseenter', () => lens.classList.add('active'));
  stage.addEventListener('mouseleave', () => lens.classList.remove('active'));
  stage.addEventListener('mousemove', (e) => moveLens(e.clientX, e.clientY));

  // Touch Support for Mobile
  stage.addEventListener('touchstart', (e) => {
    lens.classList.add('active');
    moveLens(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  stage.addEventListener('touchmove', (e) => {
    moveLens(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  stage.addEventListener('touchend', () => {
    lens.classList.remove('active');
  });

  // Entrance animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.loupe-bezel-frame', {
      scrollTrigger: {
        trigger: '.loupe-section',
        start: 'top 80%',
      },
      scale: 0.95,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out'
    });

    gsap.from('.dossier-vault-card', {
      scrollTrigger: {
        trigger: '.loupe-dossier-panel',
        start: 'top 80%',
      },
      y: 35,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out'
    });
  }
});









document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax background drift
    gsap.to('.banner-cta-bg-img', {
      scrollTrigger: {
        trigger: '.banner-cta-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      },
      y: 60
    });

    // Staggered text elevation
    gsap.from('.banner-cta-inner > *', {
      scrollTrigger: {
        trigger: '.banner-cta-frame',
        start: 'top 80%'
      },
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out'
    });
  }
});