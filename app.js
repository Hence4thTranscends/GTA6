(() => {
  'use strict';

  // Set this to a newsletter provider endpoint when the mailing list is ready.
  // Example providers: Buttondown, Brevo, Mailchimp, ConvertKit, Formspree, etc.
  // Do not put a private/personal inbox address directly into this public file.
  const NEWSLETTER_ENDPOINT = '';

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Mobile navigation
  const menuToggle = qs('.menu-toggle');
  const nav = qs('.main-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? '✕' : '☰';
    });

    qsa('.main-nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      });
    });
  }

  // World/map subtabs
  qsa('[data-tabs]').forEach(tabBar => {
    const panelRoot = qs(`#${tabBar.dataset.tabs}`);
    if (!panelRoot) return;

    qsa('.tab', tabBar).forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        qsa('.tab', tabBar).forEach(btn => btn.classList.toggle('active', btn === tab));
        qsa('.tab-panel', panelRoot).forEach(panel => {
          panel.classList.toggle('active', panel.dataset.panel === target);
        });
      });
    });
  });

  // Gallery filtering
  const galleryFilters = qsa('.gallery-filter');
  const galleryItems = qsa('.gallery-item');
  galleryFilters.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      galleryFilters.forEach(btn => btn.classList.toggle('active', btn === button));
      galleryItems.forEach(item => {
        const categories = (item.dataset.category || '').split(/\s+/);
        const visible = filter === 'all' || categories.includes(filter);
        item.classList.toggle('hidden', !visible);
      });
    });
  });

  // Image lightbox
  const lightbox = qs('#lightbox');
  const lightboxImage = qs('#lightboxImage');
  const lightboxCaption = qs('#lightboxCaption');
  const lightboxClose = qs('.lightbox-close');

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lightboxImage) lightboxImage.src = '';
  };

  qsa('.gallery-item img').forEach(image => {
    image.closest('.gallery-item')?.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      if (lightboxCaption) {
        const caption = image.closest('figure')?.querySelector('figcaption')?.innerText || image.alt;
        lightboxCaption.textContent = caption;
      }
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });

  // Newsletter overlay: optional, dismissible, and remembered.
  const newsletterOverlay = qs('#newsletterOverlay');
  const newsletterForm = qs('#newsletterForm');
  const newsletterEmail = qs('#newsletterEmail');
  const newsletterConsent = qs('#newsletterConsent');
  const newsletterMessage = qs('#newsletterMessage');
  const DISMISSED_KEY = 'everything-gta6-newsletter-dismissed';
  const SUBSCRIBED_KEY = 'everything-gta6-newsletter-subscribed';

  const openNewsletter = () => {
    if (!newsletterOverlay) return;
    newsletterOverlay.classList.add('open');
    newsletterOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    window.setTimeout(() => newsletterEmail?.focus(), 180);
  };

  const closeNewsletter = (remember = true) => {
    if (!newsletterOverlay) return;
    newsletterOverlay.classList.remove('open');
    newsletterOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (remember) {
      try { localStorage.setItem(DISMISSED_KEY, '1'); } catch (_) {}
    }
  };

  qsa('[data-close-newsletter]').forEach(button => {
    button.addEventListener('click', () => closeNewsletter(true));
  });

  // The first visit gets one polite prompt. Closing it prevents repeated prompts on that browser.
  try {
    const dismissed = localStorage.getItem(DISMISSED_KEY) === '1';
    const subscribed = localStorage.getItem(SUBSCRIBED_KEY) === '1';
    if (!dismissed && !subscribed) {
      window.setTimeout(openNewsletter, 3200);
    }
  } catch (_) {
    window.setTimeout(openNewsletter, 3200);
  }

  newsletterForm?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!newsletterMessage || !newsletterEmail || !newsletterConsent) return;

    newsletterMessage.className = 'form-message';
    newsletterMessage.textContent = '';

    const email = newsletterEmail.value.trim();
    const looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!looksValid) {
      newsletterMessage.classList.add('error');
      newsletterMessage.textContent = 'Please enter a valid email address.';
      newsletterEmail.focus();
      return;
    }

    if (!newsletterConsent.checked) {
      newsletterMessage.classList.add('error');
      newsletterMessage.textContent = 'Please check the consent box if you want email updates.';
      newsletterConsent.focus();
      return;
    }

    if (!NEWSLETTER_ENDPOINT) {
      newsletterMessage.classList.add('notice');
      newsletterMessage.textContent = 'The signup box is ready, but the mailing-list connection has not been activated yet. Your email was not sent or stored.';
      return;
    }

    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    const oldText = submitButton?.textContent;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Joining…';
    }

    try {
      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Everything GTA VI website' })
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      newsletterMessage.classList.add('success');
      newsletterMessage.textContent = 'You’re on the list. Thanks!';
      try {
        localStorage.setItem(SUBSCRIBED_KEY, '1');
        localStorage.removeItem(DISMISSED_KEY);
      } catch (_) {}
      newsletterForm.reset();
      window.setTimeout(() => closeNewsletter(false), 1200);
    } catch (error) {
      console.error('Newsletter signup failed:', error);
      newsletterMessage.classList.add('error');
      newsletterMessage.textContent = 'Signup could not be completed. Please try again later.';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = oldText || 'Keep Me Updated';
      }
    }
  });

  // Escape closes whichever modal is open.
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (lightbox?.classList.contains('open')) closeLightbox();
    else if (newsletterOverlay?.classList.contains('open')) closeNewsletter(true);
  });

  // Soft active-navigation highlighting as sections enter view.
  const sectionLinks = qsa('.main-nav a[href^="#"]');
  const linkById = new Map(sectionLinks.map(link => [link.getAttribute('href')?.slice(1), link]));
  const sections = qsa('main section[id]').filter(section => linkById.has(section.id));

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach(link => link.removeAttribute('aria-current'));
      linkById.get(visible.target.id)?.setAttribute('aria-current', 'page');
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] });
    sections.forEach(section => observer.observe(section));
  }
})();
