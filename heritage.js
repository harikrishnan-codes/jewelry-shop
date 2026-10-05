document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Subtle background parallax on scroll
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to('.heritage-hero-bg-img', {
        scrollTrigger: {
          trigger: '.heritage-hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        },
        y: 60
      });
    }

    // Sequence entry reveal
    heroTl
      .fromTo('.heritage-breadcrumb', { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo('.heritage-hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
      .fromTo('.heritage-hero-title span', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15 }, '-=0.5')
      .fromTo('.heritage-hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
      .fromTo('.heritage-hero-metrics', { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, '-=0.5')
      .fromTo('.heritage-hero-actions .btn', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, '-=0.4');
  }
});









document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('refractiveCard');
  const img = document.getElementById('gemInteractiveImg');
  const sheen = document.getElementById('prismaticSheen');
  const halo = document.querySelector('.gem-spotlight-halo');
  const scintVal = document.getElementById('scintillationVal');

  // 1. Desktop 3D Interactive Gyro / Tilt
  if (card && img && window.matchMedia('(min-width: 769px)').matches) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      img.style.transform = `translateZ(30px) rotateX(${rotateX * 0.4}deg) rotateY(${rotateY * 0.4}deg)`;

      // Dynamic angle calculation for prismatic flare
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;
      card.style.setProperty('--dispersion-deg', `${angle}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      img.style.transform = '';
    });
  }

  // 2. Dispersion Slider Control
  const dispersionSlider = document.getElementById('dispersionSlider');
  const dispersionVal = document.getElementById('dispersionVal');

  if (dispersionSlider && dispersionVal) {
    dispersionSlider.addEventListener('input', (e) => {
      const deg = e.target.value;
      dispersionVal.textContent = `${deg}°`;
      if (card) card.style.setProperty('--dispersion-deg', `${deg}deg`);
      if (scintVal) {
        const computed = (95 + (deg / 360) * 4.9).toFixed(1);
        scintVal.textContent = `${computed}%`;
      }
    });
  }

  // 3. Prong Chip Toggle
  const chips = document.querySelectorAll('.tool-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });

  // 4. Photoluminescence Spectrum Swatches
  const swatches = document.querySelectorAll('.spectrum-swatch');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      const mode = swatch.getAttribute('data-light');
      if (mode === 'daylight') {
        card.style.setProperty('--halo-color', 'rgba(253, 251, 247, 0.35)');
        img.style.filter = 'drop-shadow(0 20px 30px rgba(0,0,0,0.9)) brightness(1)';
      } else if (mode === 'candle') {
        card.style.setProperty('--halo-color', 'rgba(255, 170, 68, 0.45)');
        img.style.filter = 'drop-shadow(0 20px 30px rgba(0,0,0,0.9)) sepia(0.25) contrast(1.1)';
      } else if (mode === 'uv') {
        card.style.setProperty('--halo-color', 'rgba(136, 85, 255, 0.55)');
        img.style.filter = 'drop-shadow(0 20px 30px rgba(0,0,0,0.9)) hue-rotate(240deg) brightness(1.2)';
      }
    });
  });

  // Entrance animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.kinetic-specimen-card', {
      scrollTrigger: {
        trigger: '.motion-bench-section',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out'
    });

    gsap.from('.motion-tool-card', {
      scrollTrigger: {
        trigger: '.motion-controls-panel',
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
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.clay-card', {
      scrollTrigger: {
        trigger: '.clay-grid',
        start: 'top 80%',
      },
      y: 45,
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: 'power3.out'
    });
  }
});









document.addEventListener('DOMContentLoaded', () => {
  // GSAP High-Contrast Minimalist Reveal
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered reveal for monochrome cards
    gsap.from('.mono-card', {
      scrollTrigger: {
        trigger: '.mono-grid',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out'
    });

    // Ledger strip line-by-line entrance
    gsap.from('.mono-ledger-col', {
      scrollTrigger: {
        trigger: '.mono-ledger-strip',
        start: 'top 88%',
      },
      y: 20,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out'
    });
  }
});









document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.prov-card');
  const mainImg = document.getElementById('provMainImage');
  const statusLabel = document.getElementById('provStatusLabel');

  const statusMap = [
    'Verified Dossier • Archive GIA #749201',
    'Geographic Origin • Muzo Vein Sector III',
    'Hallmarked Standard • BIS 916 & 950 Pt',
    'Armored Security • Malca-Amit Vault Route'
  ];

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (card.classList.contains('active')) return;

      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const targetImg = card.getAttribute('data-img');

      if (mainImg && targetImg) {
        mainImg.style.opacity = '0';
        mainImg.style.transform = 'scale(0.96)';

        setTimeout(() => {
          mainImg.src = targetImg;
          if (statusLabel && statusMap[index]) {
            statusLabel.textContent = statusMap[index];
          }
          mainImg.style.opacity = '1';
          mainImg.style.transform = 'scale(1)';
        }, 220);
      }
    });
  });

  // GSAP Entrance
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.prov-card', {
      scrollTrigger: {
        trigger: '.prov-accordion-group',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.prov-showcase-panel', {
      scrollTrigger: {
        trigger: '.prov-showcase-panel',
        start: 'top 80%',
      },
      scale: 0.96,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  }
});









document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.heritage-cta-monolith', {
      scrollTrigger: {
        trigger: '.heritage-cta-section',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out'
    });

    gsap.from('.heritage-cta-content > *', {
      scrollTrigger: {
        trigger: '.heritage-cta-monolith',
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