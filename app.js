(() => {
  'use strict';

  // Connect this only after the public MailerLite signup endpoint is ready.
  const NEWSLETTER_ENDPOINT = '';
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Homepage hero artwork — Rockstar's official GTA VI landscape cover art.
  const heroBg = qs('.hero-bg');
  const heroOverlay = qs('.hero-overlay');
  if (heroBg) {
    heroBg.style.backgroundImage = 'url("https://www.rockstargames.com/VI/_next/static/media/Official_Cover_Art_landscape.12.uu2irr.2_a.jpg?akim=1&imdensity=1&imwidth=3840")';
    heroBg.style.backgroundSize = 'cover';
    heroBg.style.backgroundPosition = 'center center';
    heroBg.style.backgroundRepeat = 'no-repeat';
  }
  if (heroOverlay) {
    heroOverlay.style.background = 'linear-gradient(90deg, rgba(8,8,13,.94) 0%, rgba(8,8,13,.78) 34%, rgba(8,8,13,.55) 58%, rgba(8,8,13,.28) 100%)';
  }

  // Lucia character card — official Rockstar glam/nightlife image.
  const luciaArt = qs('.person-art.lucia');
  if (luciaArt) {
    luciaArt.style.backgroundImage = 'linear-gradient(0deg, rgba(15,14,22,.16), rgba(15,14,22,0)), url("https://www.rockstargames.com/VI/_next/static/media/Lucia_Caminos_Video_Clip.729fd223.jpg")';
    luciaArt.style.backgroundSize = 'cover';
    luciaArt.style.backgroundPosition = 'center 36%';
    luciaArt.style.backgroundRepeat = 'no-repeat';
  }

  // Official preorder shortcut beside Explore and Watch.
  const heroActions = qs('.hero-actions');
  if (heroActions && !qs('.hero-actions .preorder-btn')) {
    const preorderLink = document.createElement('a');
    preorderLink.href = 'https://www.rockstargames.com/VI/editions';
    preorderLink.target = '_blank';
    preorderLink.rel = 'noopener';
    preorderLink.className = 'btn ghost preorder-btn';
    preorderLink.textContent = 'Pre-Order GTA VI';
    heroActions.appendChild(preorderLink);
  }

  // Add the broader Everything GTA VI database section.
  const onlineSection = qs('#online');
  if (onlineSection && !qs('#database')) {
    onlineSection.insertAdjacentHTML('beforebegin', `
      <section id="database" class="content-section section-pad">
        <div class="section-heading">
          <p class="kicker">EVERYTHING ELSE</p>
          <h2>GTA VI World Database</h2>
          <p>Every major GTA VI category gets a home here. Confirmed items stay separate from things Rockstar has only shown visually or has not explained yet.</p>
        </div>
        <div class="systems-grid">
          <article><span class="status confirmed">Confirmed via edition content</span><h3>Weapons</h3><p>Hawk & Little Morgan Revolvers and personalized weapon variants are named officially. A complete weapon catalog has not been released.</p></article>
          <article><span class="status partial">Seen in Official Media</span><h3>Wildlife</h3><p>Leonida wildlife appears throughout Rockstar media. Individual species can be tracked as reliable identifications become possible.</p></article>
          <article><span class="status partial">Seen in Official Media</span><h3>Police & Law Enforcement</h3><p>Law-enforcement activity is visible in official footage, while Cal Hampton's profile references Coast Guard communications. A complete agency list is not published.</p></article>
          <article><span class="status unknown">Not fully detailed</span><h3>Gangs & Criminal Networks</h3><p>Drug runners, smugglers, robbers, music-business figures, and criminal associates are confirmed, but a complete faction roster is not.</p></article>
          <article><span class="status unknown">Not fully detailed</span><h3>Activities</h3><p>Side activities, recreation, minigames, hobbies, and world interactions will be added as Rockstar identifies them.</p></article>
          <article><span class="status confirmed">Confirmed via edition content</span><h3>Customization</h3><p>Vehicle modification, clothing, hair, tattoos, and weapon variants all have official support through named edition benefits.</p></article>
          <article><span class="status unknown">Partial</span><h3>Properties & Safehouses</h3><p>Jason's safehouse vehicles are officially referenced, but a complete property purchase system has not been announced.</p></article>
          <article><span class="status confirmed">Confirmed via edition content</span><h3>Stores & Style</h3><p>Stock 305 Clothing Store, Sara's Unisex Salon, and Electric Fang Tattoo Parlor are named official locations/content.</p></article>
          <article><span class="status unknown">Not fully detailed</span><h3>Economy & Money</h3><p>The criminal economy is central to the story, but Rockstar has not published a complete pricing, ownership, or progression breakdown.</p></article>
          <article><span class="status partial">Seen in Official Media</span><h3>Social Media</h3><p>Social-media-style posts and live-video culture are prominent in official GTA VI media. The extent of player interaction remains unannounced.</p></article>
          <article><span class="status partial">Seen in Official Media</span><h3>Weather & Environment</h3><p>Tropical coastlines, wetlands, urban nights, beaches, waterways, and varied Leonida environments are official. A complete weather-system feature list is not.</p></article>
          <article><span class="status partial">Seen in Official Media</span><h3>Transportation</h3><p>Cars, trucks, motorcycles, boats, aircraft, and emergency vehicles appear across official media. The complete transport roster remains unknown.</p></article>
          <article><span class="status confirmed">Confirmed</span><h3>Businesses & Brands</h3><p>Only Raw Records and multiple Ultimate Edition businesses are named and cross-referenced in Map & World.</p></article>
          <article><span class="status unknown">Not announced</span><h3>PC Requirements</h3><p>No official PC version or hardware requirements have been announced.</p></article>
          <article><span class="status unknown">Not announced</span><h3>Online Systems</h3><p>Multiplayer, cross-play, online player count, online economy, and GTA VI Online launch timing remain unannounced.</p></article>
          <article><span class="status partial">Growing</span><h3>Brands, Ads & Culture</h3><p>Leonida's parody brands, signs, businesses, entertainment, and culture will be cataloged as official names become reliably attributable.</p></article>
        </div>
      </section>
    `);
  }

  // Add navigation links for the extended database and the separate speculation page.
  const nav = qs('.main-nav');
  if (nav) {
    if (!qs('.main-nav a[href="#database"]')) {
      const moreLink = document.createElement('a');
      moreLink.href = '#database';
      moreLink.textContent = 'More';
      nav.appendChild(moreLink);
    }
    if (!qs('.main-nav a[href="speculation.html"]')) {
      const specLink = document.createElement('a');
      specLink.href = 'speculation.html';
      specLink.textContent = 'Speculation';
      specLink.className = 'speculation-nav-link';
      specLink.title = 'Creator theories, reactions, rumors, and community hype';
      nav.appendChild(specLink);
    }
  }

  // Mobile navigation.
  const menuToggle = qs('.menu-toggle');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? '✕' : '☰';
    });
    qsa('.main-nav a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    }));
  }

  // World/map subtabs.
  qsa('[data-tabs]').forEach(tabBar => {
    const panelRoot = qs(`#${tabBar.dataset.tabs}`);
    if (!panelRoot) return;
    qsa('.tab', tabBar).forEach(tab => tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      qsa('.tab', tabBar).forEach(btn => btn.classList.toggle('active', btn === tab));
      qsa('.tab-panel', panelRoot).forEach(panel => panel.classList.toggle('active', panel.dataset.panel === target));
    }));
  });

  // Gallery filters.
  const galleryFilters = qsa('.gallery-filter');
  const galleryItems = qsa('.gallery-item');
  galleryFilters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    galleryFilters.forEach(btn => btn.classList.toggle('active', btn === button));
    galleryItems.forEach(item => {
      const categories = (item.dataset.category || '').split(/\s+/);
      item.classList.toggle('hidden', !(filter === 'all' || categories.includes(filter)));
    });
  }));

  // Gallery lightbox.
  const lightbox = qs('#lightbox');
  const lightboxImage = qs('#lightboxImage');
  const lightboxCaption = qs('#lightboxCaption');
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lightboxImage) lightboxImage.src = '';
  };
  qsa('.gallery-item img').forEach(image => image.closest('.gallery-item')?.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    if (lightboxCaption) lightboxCaption.textContent = image.closest('figure')?.querySelector('figcaption')?.innerText || image.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }));
  qs('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });

  // Newsletter overlay: optional, dismissible, and remembered locally.
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
    if (remember) { try { localStorage.setItem(DISMISSED_KEY, '1'); } catch (_) {} }
  };
  qsa('[data-close-newsletter]').forEach(button => button.addEventListener('click', () => closeNewsletter(true)));

  try {
    if (localStorage.getItem(DISMISSED_KEY) !== '1' && localStorage.getItem(SUBSCRIBED_KEY) !== '1') window.setTimeout(openNewsletter, 3200);
  } catch (_) { window.setTimeout(openNewsletter, 3200); }

  newsletterForm?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!newsletterMessage || !newsletterEmail || !newsletterConsent) return;
    newsletterMessage.className = 'form-message';
    newsletterMessage.textContent = '';
    const email = newsletterEmail.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newsletterMessage.classList.add('error'); newsletterMessage.textContent = 'Please enter a valid email address.'; newsletterEmail.focus(); return;
    }
    if (!newsletterConsent.checked) {
      newsletterMessage.classList.add('error'); newsletterMessage.textContent = 'Please check the consent box if you want email updates.'; newsletterConsent.focus(); return;
    }
    if (!NEWSLETTER_ENDPOINT) {
      newsletterMessage.classList.add('notice'); newsletterMessage.textContent = 'The signup box is ready, but the mailing-list connection has not been activated yet. Your email was not sent or stored.'; return;
    }
    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    const oldText = submitButton?.textContent;
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'Joining…'; }
    try {
      const response = await fetch(NEWSLETTER_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,source:'Everything GTA VI website'}) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      newsletterMessage.classList.add('success'); newsletterMessage.textContent = 'You’re on the list. Thanks!';
      try { localStorage.setItem(SUBSCRIBED_KEY,'1'); localStorage.removeItem(DISMISSED_KEY); } catch (_) {}
      newsletterForm.reset(); window.setTimeout(() => closeNewsletter(false), 1200);
    } catch (error) {
      console.error('Newsletter signup failed:', error); newsletterMessage.classList.add('error'); newsletterMessage.textContent = 'Signup could not be completed. Please try again later.';
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.textContent = oldText || 'Keep Me Updated'; }
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (lightbox?.classList.contains('open')) closeLightbox();
    else if (newsletterOverlay?.classList.contains('open')) closeNewsletter(true);
  });

  // Active navigation highlighting for in-page sections.
  const sectionLinks = qsa('.main-nav a[href^="#"]');
  const linkById = new Map(sectionLinks.map(link => [link.getAttribute('href')?.slice(1), link]));
  const sections = qsa('main section[id]').filter(section => linkById.has(section.id));
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach(link => link.removeAttribute('aria-current'));
      linkById.get(visible.target.id)?.setAttribute('aria-current','page');
    }, { rootMargin:'-25% 0px -60% 0px', threshold:[0.05,0.2,0.5] });
    sections.forEach(section => observer.observe(section));
  }
})();