document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. Sticky Header Scroll Effect
     ========================================== */
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ==========================================
     1.5. Hero Background Slideshow Auto-Slider
     ========================================== */
  const heroBgs = document.querySelectorAll('.hero-bg');
  const heroTitle = document.getElementById('heroTitle');
  const heroBrandMain = document.getElementById('heroBrandMain');
  const heroBrandSub = document.getElementById('heroBrandSub');
  const heroDetailsTop = document.getElementById('heroDetailsTop');
  const heroDetailsTitle = document.getElementById('heroDetailsTitle');
  const heroDetailsStatus = document.getElementById('heroDetailsStatus');
  const heroWhatsappBtn = document.getElementById('heroWhatsappBtn');
  const heroEnquireBtn = document.getElementById('heroEnquireBtn');
  const heroDots = document.querySelectorAll('.hero-dot');
  const heroTabBtns = document.querySelectorAll('.hero-tab-btn');

  function updateHeroPanel(slide) {
    const d = slide.dataset;
    if (heroTitle) heroTitle.textContent = d.title || '';
    if (heroBrandMain) heroBrandMain.textContent = d.brandMain || '';
    if (heroBrandSub) heroBrandSub.textContent = d.brandSub || '';
    if (heroDetailsTop) heroDetailsTop.innerHTML = d.detailsTop || '';
    if (heroDetailsTitle) heroDetailsTitle.textContent = d.detailsTitle || '';
    if (heroDetailsStatus) heroDetailsStatus.textContent = d.detailsStatus || '';
    if (heroWhatsappBtn) heroWhatsappBtn.href = d.whatsapp || 'https://wa.me/917387522292';
  }

  if (heroBgs.length > 0) {
    updateHeroPanel(heroBgs[0]);

    // Hero background click — scroll to property section when slide is active
    heroBgs.forEach(bg => {
      bg.addEventListener('click', () => {
        const target = bg.dataset.scroll;
        if (target && bg.classList.contains('active')) {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  if (heroBgs.length > 1) {
    let currentSlide = 0;

    function goToSlide(idx) {
      heroBgs[currentSlide].classList.remove('active');
      heroDots[currentSlide] && heroDots[currentSlide].classList.remove('active');
      heroTabBtns[currentSlide] && heroTabBtns[currentSlide].classList.remove('active');
      
      currentSlide = (idx + heroBgs.length) % heroBgs.length;
      
      heroBgs[currentSlide].classList.add('active');
      heroDots[currentSlide] && heroDots[currentSlide].classList.add('active');
      heroTabBtns[currentSlide] && heroTabBtns[currentSlide].classList.add('active');
      
      updateHeroPanel(heroBgs[currentSlide]);
    }

    // Auto slide
    let autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 2000);

    // Reset interval helper on manual click so it doesn't slide immediately after click
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 2000);
    }

    heroDots.forEach(dot => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.index));
        resetAutoSlide();
      });
    });

    heroTabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.dataset.index);
        goToSlide(index);
        resetAutoSlide();

        // Scroll to the corresponding details section
        const targetId = index === 0 ? '#about' : '#magnus-about';
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }, 350); // Delay for slide transition
        }
      });
    });
  }


  /* ==========================================
     2. Mobile Hamburger Menu Drawer
     ========================================== */
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');

  const openDrawer = () => {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (menuToggle) menuToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close mobile drawer when clicking on any navigation link inside it
  if (mobileDrawer) {
    const drawerLinks = mobileDrawer.querySelectorAll('.drawer-link, .drawer-sublink');
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }


  /* ==========================================
     3. Mobile Drawer Accordion Submenus
     ========================================== */
  const drawerDropdownBtns = document.querySelectorAll('.drawer-dropdown-btn');

  drawerDropdownBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const submenu = btn.nextElementSibling;
      
      // Close other submenus first for accordion behavior
      drawerDropdownBtns.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.parentElement.classList.remove('active');
          otherBtn.nextElementSibling.classList.remove('active');
        }
      });

      // Toggle current submenu
      parent.classList.toggle('active');
      submenu.classList.toggle('active');
    });
  });


  /* ==========================================
     4. Interactive Projects Filter (Tab system)
     ========================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectsGrid = document.getElementById('projectsGrid');

  const filterProjects = (filterValue) => {
    // Fade out grid before shuffling items
    if (projectsGrid) projectsGrid.style.opacity = '0.3';

    setTimeout(() => {
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Trigger slight entry animation
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
      if (projectsGrid) projectsGrid.style.opacity = '1';
    }, 300);
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active to current tab
      button.classList.add('active');
      
      const filterValue = button.getAttribute('data-filter');
      filterProjects(filterValue);
    });
  });

  // Switch all page sections to the selected project (0 = Melange, 1 = Magnus)
  function switchProject(index) {
    const suffixes = ['melange', 'magnus'];
    const suffix = suffixes[index];

    // Hero slider
    const heroTab = document.querySelector(`.hero-tab-btn[data-index="${index}"]`);
    if (heroTab) heroTab.click();

    // Highlights section
    const highlightTab = document.querySelector(`.highlight-tab-btn[data-target="highlight-${suffix}"]`);
    if (highlightTab) highlightTab.click();

    // Elevations & Plans section
    const plansTab = document.querySelector(`.level1-tab-btn[data-target="plan-${suffix}"]`);
    if (plansTab) plansTab.click();

    // Amenities section
    const amenitiesTab = document.querySelector(`.amenities-tab-btn[data-target="amenities-${suffix}"]`);
    if (amenitiesTab) amenitiesTab.click();

    // Pre-launch section
    const prelaunchTab = document.querySelector(`.prelaunch-tab-btn[data-target="prelaunch-${suffix}"]`);
    if (prelaunchTab) prelaunchTab.click();

    // Video section
    const videoTab = document.querySelector(`.video-tab-btn[data-target="video-${suffix}"]`);
    if (videoTab) videoTab.click();

    // Location section
    const locationTab = document.querySelector(`.location-tab-btn[data-target="location-${suffix}"]`);
    if (locationTab) locationTab.click();

    // Map section
    const mapTab = document.querySelector(`.map-tab-btn[data-target="map-${suffix}"]`);
    if (mapTab) mapTab.click();
  }

  // Handle dropdown clicks (nav menu, mega cards & drawer)
  const dropdownItems = document.querySelectorAll('.dropdown-item, .mega-card, .drawer-sublink, .footer-links ul a');
  dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const heroIndex = item.getAttribute('data-hero-index');
      if (heroIndex !== null) {
        e.preventDefault();
        switchProject(parseInt(heroIndex));
        document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
        closeDrawer();
        return;
      }
      const category = item.getAttribute('data-filter');
      if (category) {
        const targetTab = document.querySelector(`.tab-btn[data-filter="${category}"]`);
        if (targetTab) {
          targetTab.click();
        }
        closeDrawer();
      }
    });
  });





  /* ==========================================
     6. Stats Counter Micro-Animation
     ========================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const text = stat.innerText;
      const suffix = text.replace(/[0-9]/g, ''); // Extract +, M+, k+ etc.
      let count = 0;
      const speed = target / 50; // speed threshold

      const updateCount = () => {
        if (count < target) {
          count = Math.ceil(count + speed);
          if (count > target) count = target;
          stat.innerText = count + suffix;
          setTimeout(updateCount, 30);
        } else {
          stat.innerText = target + suffix;
        }
      };

      updateCount();
    });
  };

  // Trigger counters on visibility intersection
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, { threshold: 0.6 });

    const statsRow = document.querySelector('.stats-row');
    if (statsRow) observer.observe(statsRow);
  } else {
    // Fallback if IntersectionObserver not supported
    animateStats();
  }


  /* ==========================================
     7. Enquiry Form submission (Simulated)
     ========================================== */
  const mainEnquiryForm = document.getElementById('mainEnquiryForm');
  const successMessage = document.getElementById('successMessage');
  const btnSubmitEnquiry = document.getElementById('btnSubmitEnquiry');

  if (mainEnquiryForm && successMessage) {
    mainEnquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get values
      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const email = document.getElementById('clientEmail').value.trim();
      const project = document.getElementById('preferredProject').value;

      if (!name || !phone || !email || !project) {
        alert('Please fill out all required fields.');
        return;
      }

      // Show loader simulation
      btnSubmitEnquiry.disabled = true;
      const originalText = btnSubmitEnquiry.innerHTML;
      btnSubmitEnquiry.innerHTML = '<span>SENDING...</span>';

      // Send to Email via FormSubmit
      const formData = {
        name: name,
        phone: phone,
        email: email,
        project: project,
        message: document.getElementById('clientMessage')?.value || '',
        _subject: "New Lead - Mantra Properties (Main Form)"
      };

      // Save details to sessionStorage
      sessionStorage.setItem('leadName', name);
      sessionStorage.setItem('leadPhone', phone);
      sessionStorage.setItem('leadEmail', email);

      fetch('https://formsubmit.co/ajax/saurabhkhandelia@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(() => {
        window.location.href = 'thank-you.html';
      })
      .catch((err) => {
        console.error('Email send failed:', err);
        window.location.href = 'thank-you.html';
      })
      .finally(() => {
        btnSubmitEnquiry.disabled = false;
        btnSubmitEnquiry.innerHTML = originalText;
      });
    });
  }


  /* ==========================================
     12. About, Highlights & Plans Section Entrance Animation (Scroll Trigger)
     ========================================== */
  ['about', 'magnus-about', 'project-highlights', 'project-plans', 'project-amenities', 'location-advantage', 'about-mantra'].forEach(id => {
    const sec = document.getElementById(id);
    if (!sec) return;
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { sec.classList.add('visible'); observer.unobserve(entry.target); }
        });
      }, { threshold: 0.02 });
      obs.observe(sec);
    } else {
      sec.classList.add('visible');
    }
  });

  /* ==========================================
     13. Video Showcase Section Entrance Animation (Scroll Trigger)
     ========================================== */
  const videoSection = document.getElementById('video-showcase');
  if (videoSection) {
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            videoSection.classList.add('visible');
            observer.unobserve(entry.target); // Trigger only once
          }
        });
      }, { threshold: 0.02 }); // Trigger when 2% of the section is visible
      videoObserver.observe(videoSection);
    } else {
      // Fallback if IntersectionObserver not supported
      videoSection.classList.add('visible');
    }
  }

  /* ==========================================
     13b. Video Showcase Tab System
     ========================================== */
  const videoTabBtns = document.querySelectorAll('.video-tab-btn');
  const videoPanes = document.querySelectorAll('.video-pane');

  videoTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      videoTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      videoPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  /* ==========================================
     13c. Location Advantage Tab System
     ========================================== */
  const locationTabBtns = document.querySelectorAll('.location-tab-btn');
  const locationPanes = document.querySelectorAll('.location-pane');

  locationTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      locationTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      locationPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  /* ==========================================
     13d. Location Lightbox Modal
     ========================================== */
  const locationLightbox = document.getElementById('locationLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const closeLightboxBtn = document.getElementById('closeLightbox');
  const zoomBtns = document.querySelectorAll('.location-visual-zoom, .location-visual-wrapper img');

  if (locationLightbox && lightboxImg && closeLightboxBtn) {
    zoomBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        let imgSrc = '';
        if (btn.tagName.toLowerCase() === 'img') {
          imgSrc = btn.getAttribute('src');
        } else {
          const parent = btn.closest('.location-visual-wrapper');
          const img = parent.querySelector('img');
          imgSrc = img.getAttribute('src');
        }
        
        lightboxImg.setAttribute('src', imgSrc);
        locationLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      locationLightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        lightboxImg.setAttribute('src', '');
      }, 300);
    };

    closeLightboxBtn.addEventListener('click', closeLightbox);
    locationLightbox.addEventListener('click', (e) => {
      if (e.target === locationLightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && locationLightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* ==========================================
     13e. Google Map Tab System
     ========================================== */
  const mapTabBtns = document.querySelectorAll('.map-tab-btn');
  const mapPanes = document.querySelectorAll('.map-pane');
  const mapWhatsappBtn = document.getElementById('btn-map-whatsapp');

  mapTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mapTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      const waLink = btn.getAttribute('data-whatsapp');

      // Update WhatsApp link href
      if (mapWhatsappBtn && waLink) {
        mapWhatsappBtn.setAttribute('href', waLink);
      }

      mapPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  /* ==========================================
     ENQUIRY POPUP MODAL
     ========================================== */
  const enquiryModal    = document.getElementById('enquiryModal');
  const btnNavEnquire   = document.getElementById('btnNavEnquire');
  const btnEnquiryModalClose = document.getElementById('btnEnquiryModalClose');
  const enquiryForm     = document.getElementById('enquiryPopupForm');
  const epfSuccess      = document.getElementById('epfSuccess');

  function openEnquiryModal() {
    enquiryModal.classList.add('active');
    enquiryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeEnquiryModal() {
    enquiryModal.classList.remove('active');
    enquiryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Reset form after close animation
    setTimeout(() => {
      if (enquiryForm) enquiryForm.reset();
      if (enquiryForm) enquiryForm.style.display = '';
      if (epfSuccess) epfSuccess.style.display = 'none';
    }, 350);
  }

  if (heroEnquireBtn) {
    heroEnquireBtn.addEventListener('click', openEnquiryModal);
  }

  // Open modal on Download Brochure clicks
  const modalTriggers = document.querySelectorAll('.btn-open-modal');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openEnquiryModal();
    });
  });

  if (btnEnquiryModalClose) {
    btnEnquiryModalClose.addEventListener('click', closeEnquiryModal);
  }

  // Close on backdrop click
  if (enquiryModal) {
    enquiryModal.addEventListener('click', (e) => {
      if (e.target === enquiryModal) closeEnquiryModal();
    });
  }

  // Auto-open modal after 2 seconds on page load (Disabled as requested)
  // setTimeout(() => {
  //   if (enquiryModal) {
  //     openEnquiryModal();
  //   }
  // }, 2000);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && enquiryModal && enquiryModal.classList.contains('active')) {
      closeEnquiryModal();
    }
  });

  // Form Submit
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation
      const name  = document.getElementById('epfName')?.value.trim();
      const phone = document.getElementById('epfPhone')?.value.trim();
      const email = document.getElementById('epfEmail')?.value.trim();
      if (!name || !phone || !email) {
        // Highlight missing fields
        [document.getElementById('epfName'), document.getElementById('epfPhone'), document.getElementById('epfEmail')].forEach(el => {
          if (el && !el.value.trim()) {
            el.style.borderColor = '#e05252';
            el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
          }
        });
        return;
      }

      // Show sending state
      const btnSubmit = document.getElementById('btnEpfSubmit');
      const originalText = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = '<span>SENDING...</span>';

      // Send to Email via FormSubmit
      const formData = {
        name: name,
        phone: phone,
        email: email,
        project: document.getElementById('epfProject')?.value || 'Not specified',
        message: document.getElementById('epfMessage')?.value || '',
        _subject: "New Lead - Mantra Properties (Popup Form)"
      };

      // Save details to sessionStorage
      sessionStorage.setItem('leadName', name);
      sessionStorage.setItem('leadPhone', phone);
      sessionStorage.setItem('leadEmail', email);

      fetch('https://formsubmit.co/ajax/saurabhkhandelia@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(() => {
        window.location.href = 'thank-you.html';
      })
      .catch((err) => {
        console.error('Email send failed:', err);
        // Fallback: still redirect to thank you page
        window.location.href = 'thank-you.html';
      });
    });
  }

  /* ==========================================
     THANK YOU POPUP MODAL
     ========================================== */
  const thankYouModal = document.getElementById('thankYouModal');
  const btnThankYouModalClose = document.getElementById('btnThankYouModalClose');
  const btnThankYouClose = document.getElementById('btnThankYouClose');

  function openThankYouModal() {
    if (thankYouModal) {
      thankYouModal.classList.add('active');
      thankYouModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Reset animations for checkmark SVG
      const checkmarkSvg = thankYouModal.querySelector('.checkmark-svg');
      if (checkmarkSvg) {
        checkmarkSvg.style.animation = 'none';
        checkmarkSvg.offsetHeight; /* trigger reflow */
        checkmarkSvg.style.animation = '';
      }
      const checkmarkCircle = thankYouModal.querySelector('.checkmark-circle');
      if (checkmarkCircle) {
        checkmarkCircle.style.animation = 'none';
        checkmarkCircle.offsetHeight;
        checkmarkCircle.style.animation = '';
      }
      const checkmarkCheck = thankYouModal.querySelector('.checkmark-check');
      if (checkmarkCheck) {
        checkmarkCheck.style.animation = 'none';
        checkmarkCheck.offsetHeight;
        checkmarkCheck.style.animation = '';
      }
    }
  }

  function closeThankYouModal() {
    if (thankYouModal) {
      thankYouModal.classList.remove('active');
      thankYouModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (btnThankYouModalClose) {
    btnThankYouModalClose.addEventListener('click', closeThankYouModal);
  }
  if (btnThankYouClose) {
    btnThankYouClose.addEventListener('click', closeThankYouModal);
  }

  // Close on backdrop click
  if (thankYouModal) {
    thankYouModal.addEventListener('click', (e) => {
      if (e.target === thankYouModal) closeThankYouModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && thankYouModal && thankYouModal.classList.contains('active')) {
      closeThankYouModal();
    }
  });

  /* ==========================================
     INLINE CONTACT FORM SUBMISSION
     ========================================== */
  const overlapEnquiryForm = document.getElementById('overlapEnquiryForm');
  if (overlapEnquiryForm) {
    overlapEnquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const inputs = overlapEnquiryForm.querySelectorAll('input[required], select[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#e05252';
          input.addEventListener('input', () => { input.style.borderColor = ''; }, { once: true });
        }
      });

      if (!isValid) return;

      const name = overlapEnquiryForm.querySelector('input[type="text"]')?.value.trim();
      const email = overlapEnquiryForm.querySelector('input[type="email"]')?.value.trim();
      const phone = overlapEnquiryForm.querySelector('input[type="tel"]')?.value.trim();
      const property = overlapEnquiryForm.querySelector('select')?.value;
      const message = overlapEnquiryForm.querySelector('textarea')?.value.trim();

      // Show sending state
      const btnSubmit = overlapEnquiryForm.querySelector('button[type="submit"]');
      const originalText = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = '<span>SENDING...</span>';

      const selectedProp = property === 'melange' ? 'Mantra Melange' : (property === 'magnus' ? 'Mantra Magnus' : (property === 'marvilla' ? 'Mantra Marvilla' : 'Mantra Properties'));

      // Send to Email via FormSubmit
      const formData = {
        name: name,
        email: email,
        phone: phone,
        project: selectedProp,
        message: message || '',
        _subject: "New Lead - Mantra Properties (Bottom Form)"
      };

      // Save details to sessionStorage
      sessionStorage.setItem('leadName', name);
      sessionStorage.setItem('leadPhone', phone);
      sessionStorage.setItem('leadEmail', email);

      fetch('https://formsubmit.co/ajax/saurabhkhandelia@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(() => {
        // Construct WhatsApp URL
        const textMsg = `Hello, I am interested in ${selectedProp}. Here are my details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
${message ? `- Message: ${message}` : ''}`;
        const waUrl = `https://wa.me/917387522292?text=${encodeURIComponent(textMsg)}`;
        
        // Open WhatsApp in new tab
        window.open(waUrl, '_blank');
        
        // Redirect current tab to Thank You page
        window.location.href = 'thank-you.html';
      })
      .catch((err) => {
        console.error('Email send failed:', err);
        // Fallback: still open WhatsApp and redirect
        const textMsg = `Hello, I am interested in ${selectedProp}. Here are my details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
${message ? `- Message: ${message}` : ''}`;
        const waUrl = `https://wa.me/917387522292?text=${encodeURIComponent(textMsg)}`;
        window.open(waUrl, '_blank');
        window.location.href = 'thank-you.html';
      })
      .finally(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalText;
      });
    });
  }


  /* ==========================================
     15. Project Highlights Tab System
     ========================================== */
  const highlightTabs = document.querySelectorAll('.highlight-tab-btn');
  const highlightPanes = document.querySelectorAll('.highlight-pane');

  highlightTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      highlightTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetId = tab.dataset.target;
      highlightPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  /* ==========================================
     16. Elevations & Master Plans Nested Tab System
     ========================================== */
  const level1Tabs = document.querySelectorAll('.level1-tab-btn');
  const plansPanes = document.querySelectorAll('.plans-pane');

  level1Tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Switch level 1 active tab
      level1Tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetId = tab.dataset.target;
      plansPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
          // Reset Level 2 state to Elevations
          const level2Btns = pane.querySelectorAll('.level2-tab-btn');
          const subPanes = pane.querySelectorAll('.sub-plans-pane');
          
          level2Btns.forEach((btn, idx) => {
            if (idx === 0) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
          subPanes.forEach((sp, idx) => {
            if (idx === 0) {
              sp.classList.add('active');
            } else {
              sp.classList.remove('active');
            }
          });
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // Level 2 sub-tab clicks
  plansPanes.forEach(pane => {
    const level2Btns = pane.querySelectorAll('.level2-tab-btn');
    const subPanes = pane.querySelectorAll('.sub-plans-pane');
    
    level2Btns.forEach(btn => {
      btn.addEventListener('click', () => {
        level2Btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const targetSubId = btn.dataset.target;
        subPanes.forEach(sp => {
          if (sp.id === targetSubId) {
            sp.classList.add('active');
          } else {
            sp.classList.remove('active');
          }
        });
      });
    });
  });

  /* ==========================================
     17. Melange Elevation Sub-slider
     ========================================== */
  const melangeElevSlides = document.querySelectorAll('#melangeElevationSlides .plan-slide');
  const melangeElevDots = document.querySelectorAll('#melangeElevDots .plan-slide-dot');
  const btnMelangeElevPrev = document.getElementById('btnMelangeElevPrev');
  const btnMelangeElevNext = document.getElementById('btnMelangeElevNext');

  if (melangeElevSlides.length > 1 && btnMelangeElevPrev && btnMelangeElevNext) {
    let currentElevIndex = 0;

    function goToElevSlide(idx) {
      melangeElevSlides[currentElevIndex].classList.remove('active');
      melangeElevDots[currentElevIndex] && melangeElevDots[currentElevIndex].classList.remove('active');
      currentElevIndex = (idx + melangeElevSlides.length) % melangeElevSlides.length;
      melangeElevSlides[currentElevIndex].classList.add('active');
      melangeElevDots[currentElevIndex] && melangeElevDots[currentElevIndex].classList.add('active');
    }

    btnMelangeElevPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      goToElevSlide(currentElevIndex - 1);
    });

    btnMelangeElevNext.addEventListener('click', (e) => {
      e.stopPropagation();
      goToElevSlide(currentElevIndex + 1);
    });

    melangeElevDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goToElevSlide(parseInt(dot.dataset.index));
      });
    });
  }

  /* ==========================================
     18. Amenities Section Tabs & Slider Interaction
     ========================================== */
  const amenitiesTabBtns = document.querySelectorAll('.amenities-tab-btn');
  const amenitiesPanes = document.querySelectorAll('.amenities-pane');

  amenitiesTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amenitiesTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      amenitiesPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // Slider arrows scroll
  const setupAmenitiesSlider = (paneId, prevBtnId, nextBtnId) => {
    const pane = document.getElementById(paneId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (pane && prevBtn && nextBtn) {
      const sliderOuter = pane.querySelector('.amenities-slider-outer');
      
      if (sliderOuter) {
        prevBtn.addEventListener('click', () => {
          sliderOuter.scrollBy({ left: -260, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
          sliderOuter.scrollBy({ left: 260, behavior: 'smooth' });
        });
      }
    }
  };

  setupAmenitiesSlider('amenities-melange', 'btn-melange-amenities-prev', 'btn-melange-amenities-next');
  setupAmenitiesSlider('amenities-magnus', 'btn-magnus-amenities-prev', 'btn-magnus-amenities-next');

  /* ==========================================
     19. Pre-Launch & Exclusive Configurations Tab System
     ========================================== */
  const prelaunchTabBtns = document.querySelectorAll('.prelaunch-tab-btn');
  const prelaunchPanes = document.querySelectorAll('.prelaunch-pane');

  prelaunchTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      prelaunchTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      prelaunchPanes.forEach(pane => {
        if (pane.id === targetId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

});

