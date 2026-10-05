document.addEventListener('DOMContentLoaded', () => {
  // GSAP Entry Reveal Animation
  if (typeof gsap !== 'undefined') {
    const collTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    collTl
      .fromTo('.coll-breadcrumb', { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo('.coll-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
      .fromTo('.coll-hero-title span', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15 }, '-=0.5')
      .fromTo('.coll-hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
      .fromTo('.coll-stats-strip', { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, '-=0.5')
      .fromTo('.filter-chip', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, '-=0.4');
  }

  // Interactive Chip Selection
  const filterChips = document.querySelectorAll('.filter-chip');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      
      const selectedCategory = chip.getAttribute('data-category');
      
      // Custom event to dispatch for your upcoming product grid
      document.dispatchEvent(new CustomEvent('filterCollection', {
        detail: { category: selectedCategory }
      }));
    });
  });
});







document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const pinWrapper = document.getElementById('timelinePinWrapper');
  const track = document.getElementById('timelineTrack');
  const progressBar = document.getElementById('timelineProgressBar');

  let mm = gsap.matchMedia();

  mm.add('(min-width: 769px)', () => {
    function getScrollAmount() {
      return -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.05);
    }

    const horizontalTween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: pinWrapper,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressBar) {
            progressBar.style.width = `${self.progress * 100}%`;
          }
        }
      }
    });

    return () => {
      horizontalTween.kill();
    };
  });

  mm.add('(max-width: 768px)', () => {
    gsap.set(track, { clearProps: 'all' });
    if (progressBar) {
      progressBar.style.width = '0%';
    }

    const cards = document.querySelectorAll('.timeline-card');
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
  const cards = document.querySelectorAll('.holo-card');

  if (window.matchMedia('(min-width: 769px)').matches) {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        const rotateX = deltaY * -8;
        const rotateY = deltaX * 8;

        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) + 90;
        card.style.setProperty('--holo-angle', `${angle}deg`);

        const sheen = card.querySelector('.holo-sheen');
        if (sheen) {
          sheen.style.transform = `translate(${deltaX * 25}px, ${deltaY * 25}px)`;
        }

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        const sheen = card.querySelector('.holo-sheen');
        if (sheen) {
          sheen.style.transform = '';
        }
      });
    });
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.holo-card', {
      scrollTrigger: {
        trigger: '.aurora-grid',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out'
    });
  }
});









document.addEventListener('DOMContentLoaded', () => {
  const thumbButtons = document.querySelectorAll('.thumb-btn');
  const mainImg = document.getElementById('archiveMainImg');

  if (thumbButtons.length && mainImg) {
    thumbButtons.forEach(button => {
      button.addEventListener('click', () => {
        thumbButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const newSrc = button.getAttribute('data-img');

        mainImg.style.opacity = '0';
        mainImg.style.transform = 'scale(0.97)';

        setTimeout(() => {
          mainImg.src = newSrc;
          mainImg.style.opacity = '1';
          mainImg.style.transform = 'scale(1)';
        }, 250);
      });
    });
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.split-image-stage', {
      scrollTrigger: {
        trigger: '.split-collection-section',
        start: 'top 75%'
      },
      x: -40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.from('.split-story-inner > *', {
      scrollTrigger: {
        trigger: '.split-story-panel',
        start: 'top 80%'
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
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.heritage-bg-img', {
      scrollTrigger: {
        trigger: '.heritage-overlay-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      },
      y: 70
    });

    gsap.from('.heritage-inner > *', {
      scrollTrigger: {
        trigger: '.heritage-overlay-section',
        start: 'top 75%'
      },
      y: 35,
      opacity: 0,
      stagger: 0.14,
      duration: 1,
      ease: 'power3.out'
    });
  }
});









document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.final-cta-vault-card', {
      scrollTrigger: {
        trigger: '.final-cta-section',
        start: 'top 80%',
      },
      y: 45,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    gsap.from('.final-cta-inner > *', {
      scrollTrigger: {
        trigger: '.final-cta-vault-card',
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