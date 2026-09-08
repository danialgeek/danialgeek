/**
 * Danial Geek (دانیال گیگ) - Main JavaScript
 * Vanilla JS, no framework, no dependencies, GitHub Pages compatible
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileDrawer.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close drawer when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Active Link Highlight based on current pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // 3. Toast Notification Helper
  window.showToast = function(message, duration = 3000) {
    let toast = document.getElementById('customToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'customToast';
      toast.className = 'custom-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary-cyan);">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.style.display = 'flex';
    
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.style.display = 'none';
    }, duration);
  };

  // 4. Handle Platform Links and Copy Actions
  const platformCards = document.querySelectorAll('.platform-card');
  platformCards.forEach((card) => {
    // Make entire card interactive
    card.addEventListener('click', (e) => {
      // If clicked element wasn't already an anchor tag
      if (!e.target.closest('a') && !e.target.closest('button')) {
        const linkBtn = card.querySelector('.card-btn, a');
        if (linkBtn && linkBtn.getAttribute('href')) {
          const target = linkBtn.getAttribute('target') || '_self';
          window.open(linkBtn.getAttribute('href'), target);
        }
      }
    });
  });

  // 5. Contact Form Handler (if present)
  const contactForm = document.getElementById('collaborationForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `<span>در حال ارسال...</span>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        window.showToast('پیام شما با موفقیت ارسال شد! به زودی با شما در ارتباط خواهیم بود.');
      }, 900);
    });
  }

  // 6. Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
          });
        }
      }
    });
  });

  console.log('Danial Geek Cyber Obsidian Creator initialized successfully.');
});
