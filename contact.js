document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined') {
    const contactHeroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    contactHeroTl
      .fromTo('.atelier-breadcrumb', { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo('.atelier-kicker-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
      .fromTo('.atelier-hero-title span', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15 }, '-=0.5')
      .fromTo('.atelier-hero-lead', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
      .fromTo('.direct-channel-card', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, '-=0.4')
      .fromTo('.salon-credential-card', { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9 }, '-=0.6');
  }
});







document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const form = document.getElementById('bespokeCommissionForm');
  const nameInput = document.getElementById('commName');
  const phoneInput = document.getElementById('commPhone');
  const emailInput = document.getElementById('commEmail');
  const notesInput = document.getElementById('commNotes');

  const nameGroup = document.getElementById('nameGroup');
  const phoneGroup = document.getElementById('phoneGroup');
  const emailGroup = document.getElementById('emailGroup');

  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const emailError = document.getElementById('emailError');

  // Summary Ledger Elements
  const summaryCategory = document.getElementById('summaryCategory');
  const summaryStone = document.getElementById('summaryStone');
  const summaryCarat = document.getElementById('summaryCarat');
  const summaryMetal = document.getElementById('summaryMetal');

  // 1. Custom Dropdown Initializer Function
  function setupCustomDropdown(wrapId, hiddenInputId, displayTextId, onSelectCallback) {
    const wrap = document.getElementById(wrapId);
    if (!wrap) return;

    const trigger = wrap.querySelector('.custom-dropdown-trigger');
    const displayText = document.getElementById(displayTextId);
    const hiddenInput = document.getElementById(hiddenInputId);
    const options = wrap.querySelectorAll('.custom-option');

    // Toggle dropdown menu
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      // Close other dropdowns
      document.querySelectorAll('.custom-dropdown-wrap').forEach(w => {
        if (w !== wrap) w.classList.remove('open');
      });
      wrap.classList.toggle('open');
    });

    // Select option
    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        const val = opt.getAttribute('data-value');
        hiddenInput.value = val;
        displayText.textContent = opt.textContent;
        wrap.classList.remove('open');

        if (onSelectCallback) onSelectCallback(val);
      });
    });
  }

  // Setup Stone Dropdown
  setupCustomDropdown('stoneDropdownWrap', 'hiddenStoneInput', 'selectedStoneText', (val) => {
    if (summaryStone) summaryStone.textContent = val;
  });

  // Setup Carat Dropdown
  setupCustomDropdown('caratDropdownWrap', 'hiddenCaratInput', 'selectedCaratText', (val) => {
    if (summaryCarat) summaryCarat.textContent = val;
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-dropdown-wrap').forEach(w => w.classList.remove('open'));
  });

  // 2. Category Radio Chips Setup
  const catChips = document.querySelectorAll('.spec-chip');
  catChips.forEach(chip => {
    chip.addEventListener('click', () => {
      catChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const radio = chip.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        if (summaryCategory) summaryCategory.textContent = radio.value;
      }
    });
  });

  // 3. Metallurgy Radio Cards Setup
  const metalCards = document.querySelectorAll('.metal-card');
  metalCards.forEach(card => {
    card.addEventListener('click', () => {
      metalCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        if (summaryMetal) summaryMetal.textContent = radio.value;
      }
    });
  });

  // 4. Strict Validation Functions
  function validateName() {
    const val = nameInput.value.trim();
    // Only alphabets and spaces allowed, minimum 2 characters
    const alphaRegex = /^[A-Za-z\s]{2,50}$/;

    if (!val) {
      showError(nameGroup, nameError, 'Full name is required.');
      return false;
    } else if (!alphaRegex.test(val)) {
      showError(nameGroup, nameError, 'Name must contain alphabets only (no numbers or symbols).');
      return false;
    } else {
      clearError(nameGroup, nameError);
      return true;
    }
  }

  function validatePhone() {
    const rawVal = phoneInput.value.trim();
    // Strips spaces, dashes, parentheses
    const cleanNum = rawVal.replace(/[\s\-\(\)]/g, '');
    
    // Accepts 10-digit mobile numbers or optional international prefix (+91 or 91)
    const phoneRegex = /^(\+?[0-9]{1,3})?[6-9][0-9]{9}$/;

    if (!rawVal) {
      showError(phoneGroup, phoneError, 'Mobile number is required.');
      return false;
    } else if (!phoneRegex.test(cleanNum)) {
      showError(phoneGroup, phoneError, 'Please enter a valid 10-digit mobile number.');
      return false;
    } else {
      clearError(phoneGroup, phoneError);
      return true;
    }
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    // Standard RFC email pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!val) {
      showError(emailGroup, emailError, 'Email address is required.');
      return false;
    } else if (!emailRegex.test(val)) {
      showError(emailGroup, emailError, 'Please enter a valid email address.');
      return false;
    } else {
      clearError(emailGroup, emailError);
      return true;
    }
  }

  function showError(group, errorElem, message) {
    group.classList.add('has-error');
    errorElem.textContent = message;
  }

  function clearError(group, errorElem) {
    group.classList.remove('has-error');
    errorElem.textContent = '';
  }

  // Real-time input listeners to clear errors while typing
  nameInput.addEventListener('input', () => {
    if (nameGroup.classList.contains('has-error')) validateName();
  });

  phoneInput.addEventListener('input', () => {
    if (phoneGroup.classList.contains('has-error')) validatePhone();
  });

  emailInput.addEventListener('input', () => {
    if (emailGroup.classList.contains('has-error')) validateEmail();
  });

  // 5. Form Submission Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();

    // If any validation fails, do not redirect
    if (!isNameValid || !isPhoneValid || !isEmailValid) {
      return;
    }

    // On proper validation:
    // 1. Clear all input and textarea fields
    nameInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';
    if (notesInput) notesInput.value = '';

    // Clear error classes
    clearError(nameGroup, nameError);
    clearError(phoneGroup, phoneError);
    clearError(emailGroup, emailError);

    // 2. Redirect to existing error.html page
    window.location.href = 'error.html';
  });

  // 6. GSAP Entrance Animation
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.spec-block', {
      scrollTrigger: {
        trigger: '.stage-form-panel',
        start: 'top 80%',
      },
      y: 35,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.summary-vault-card', {
      scrollTrigger: {
        trigger: '.stage-summary-panel',
        start: 'top 80%',
      },
      y: 35,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }
});







document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.curators-header > *', {
      scrollTrigger: {
        trigger: '.curators-section',
        start: 'top 85%',
      },
      y: 25,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.curator-card', {
      scrollTrigger: {
        trigger: '.curators-grid',
        start: 'top 85%',
      },
      y: 35,
      opacity: 0,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.curator-discretion-strip', {
      scrollTrigger: {
        trigger: '.curator-discretion-strip',
        start: 'top 92%',
      },
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  }
});








document.addEventListener('DOMContentLoaded', () => {
  const verifyBtn = document.getElementById('verifyCertBtn');
  const serialInput = document.getElementById('registrySerialInput');
  const dossierBlock = document.getElementById('specimenDossier');

  if (verifyBtn && serialInput && dossierBlock) {
    verifyBtn.addEventListener('click', () => {
      const code = serialInput.value.trim().toUpperCase();

      // Subtle pulse verification animation
      dossierBlock.style.opacity = '0.4';
      dossierBlock.style.transform = 'scale(0.98)';

      setTimeout(() => {
        dossierBlock.style.opacity = '1';
        dossierBlock.style.transform = 'scale(1)';

        const codeDisplay = dossierBlock.querySelector('.specimen-code');
        if (codeDisplay && code) {
          codeDisplay.textContent = `RECORD // ${code}`;
        }
      }, 350);
    });
  }

  // GSAP Entrance
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.registry-header > *', {
      scrollTrigger: {
        trigger: '.registry-section',
        start: 'top 85%',
      },
      y: 25,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.registry-card', {
      scrollTrigger: {
        trigger: '.registry-lookup-col',
        start: 'top 85%',
      },
      y: 35,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.tenet-card', {
      scrollTrigger: {
        trigger: '.registry-tenets-col',
        start: 'top 85%',
      },
      y: 30,
      opacity: 0,
      stagger: 0.14,
      duration: 0.85,
      ease: 'power2.out'
    });
  }
});








document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.vault-dispatch-card', {
      scrollTrigger: {
        trigger: '.vault-cta-section',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out'
    });

    gsap.from('.vault-dispatch-inner > *', {
      scrollTrigger: {
        trigger: '.vault-dispatch-card',
        start: 'top 75%',
      },
      y: 20,
      opacity: 0,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power2.out'
    });
  }
});