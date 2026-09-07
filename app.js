(() => {
  'use strict';

  const NEWSLETTER_ENDPOINT = 'https://gta6-community-submissions.keen-olive-1713.chatgpt.site/submit';
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

  // Lucia character card — official Rockstar Lucia Caminos screenshot.
  const luciaArt = qs('.person-art.lucia');
  if (luciaArt) {
    luciaArt.style.backgroundImage = 'linear-gradient(0deg, rgba(15,14,22,.14), rgba(15,14,22,0)), url("https://www.rockstargames.com/VI/_next/static/media/Lucia_Caminos_01.0a7yqvewctkfp.jpg?akim=1&imdensity=1&imwidth=3840")';
    luciaArt.style.backgroundSize = 'cover';
    luciaArt.style.backgroundPosition = 'center 28%';
    luciaArt.style.backgroundRepeat = 'no-repeat';
  }

  // Story color identities.
  const storyCards = qsa('#story .story-grid .feature-card');
  if (storyCards.length >= 4) {
    const [setupCard, luciaCard, jasonCard, missionCard] = storyCards;
    setupCard.style.background = 'linear-gradient(135deg, rgba(24,108,119,.72) 0%, rgba(74,55,112,.68) 42%, rgba(198,61,112,.60) 72%, rgba(236,125,75,.48) 100%), #12131a';
    setupCard.style.borderColor = 'rgba(184,111,180,.38)';
    setupCard.style.boxShadow = '0 18px 55px rgba(125,62,132,.18)';

    luciaCard.style.background = 'radial-gradient(circle at 92% 0%, rgba(255,111,97,.24), transparent 34%), linear-gradient(145deg, rgba(117,27,75,.66), rgba(54,21,45,.92) 56%, #121119 100%)';
    luciaCard.style.borderColor = 'rgba(255,93,149,.34)';
    luciaCard.style.boxShadow = '0 18px 52px rgba(205,55,116,.14)';
    luciaCard.querySelector('h3')?.style.setProperty('color', '#ffc0d6');

    jasonCard.style.background = 'radial-gradient(circle at 8% 0%, rgba(69,216,220,.20), transparent 34%), linear-gradient(145deg, rgba(21,91,103,.68), rgba(15,44,57,.94) 58%, #101118 100%)';
    jasonCard.style.borderColor = 'rgba(69,216,220,.32)';
    jasonCard.style.boxShadow = '0 18px 52px rgba(45,154,165,.13)';
    jasonCard.querySelector('h3')?.style.setProperty('color', '#b9f3f1');

    missionCard.style.background = 'radial-gradient(circle at 92% 0%, rgba(255,209,102,.10), transparent 34%), linear-gradient(145deg, rgba(91,68,31,.34), rgba(31,29,25,.96) 58%, #111116 100%)';
    missionCard.style.borderColor = 'rgba(255,209,102,.20)';
  }

  // Supporting character cards — official Rockstar character artwork.
  const supportingCharacterArt = {
    'CAL HAMPTON': 'https://www.rockstargames.com/VI/_next/static/media/Cal_Hampton_landscape.17k7bnt3myg.2.jpg?akim=1&imdensity=1&imwidth=3840',
    'BOOBIE IKE': 'https://www.rockstargames.com/VI/_next/static/media/Boobie_Ike_landscape.0ldnbn87k-8mq.jpg?akim=1&imdensity=1&imwidth=3840',
    'DRE’QUAN PRIEST': 'https://www.rockstargames.com/VI/_next/static/media/DreQuan_Priest_landscape.0_b7hszyze6cy.jpg?akim=1&imdensity=1&imwidth=3840',
    "DRE'QUAN PRIEST": 'https://www.rockstargames.com/VI/_next/static/media/DreQuan_Priest_landscape.0_b7hszyze6cy.jpg?akim=1&imdensity=1&imwidth=3840',
    'REAL DIMEZ': 'https://www.rockstargames.com/VI/_next/static/media/Real_Dimez_landscape.0637akp_a5a_q.jpg?akim=1&imdensity=1&imwidth=3840',
    'RAUL BAUTISTA': 'https://www.rockstargames.com/VI/_next/static/media/Raul_Bautista_landscape.11_3hd0fr69~j.jpg?akim=1&imdensity=1&imwidth=3840',
    'BRIAN HEDER': 'https://www.rockstargames.com/VI/_next/static/media/Brian_Heder_landscape.0a-egj5b8yo1q.jpg?akim=1&imdensity=1&imwidth=3840'
  };
  qsa('.card-grid.characters .person-card:not(.hero-person)').forEach(card => {
    const name = card.querySelector('h3')?.textContent?.trim().toUpperCase();
    const imageUrl = supportingCharacterArt[name];
    if (!imageUrl || card.querySelector('.supporting-character-art')) return;
    const art = document.createElement('div');
    art.className = 'supporting-character-art';
    art.setAttribute('aria-hidden', 'true');
    art.style.backgroundImage = `linear-gradient(0deg, rgba(15,14,22,.12), rgba(15,14,22,0)), url("${imageUrl}")`;
    art.style.backgroundSize = 'cover';
    art.style.backgroundPosition = 'center 28%';
    art.style.backgroundRepeat = 'no-repeat';
    art.style.minHeight = '190px';
    card.style.display = 'grid';
    card.style.gridTemplateRows = '190px 1fr';
    card.style.minHeight = '410px';
    card.prepend(art);
  });

  // Extra styling for countdown and vehicle imagery.
  if (!qs('#gta6-enhancement-styles')) {
    const style = document.createElement('style');
    style.id = 'gta6-enhancement-styles';
    style.textContent = `
      .release-countdown-section{position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.10);background:radial-gradient(circle at 82% 10%,rgba(255,76,166,.18),transparent 28%),radial-gradient(circle at 14% 90%,rgba(69,216,220,.14),transparent 30%),linear-gradient(135deg,#11121a,#17101c 55%,#0f1118)}
      .release-countdown-section:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.20;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:58px 58px}
      .release-countdown-inner{position:relative;z-index:1;max-width:1240px;margin:0 auto;text-align:center}
      .release-countdown-inner h2{margin:6px 0 12px;font-family:Oswald,sans-serif;text-transform:uppercase;line-height:.94;font-size:clamp(2.7rem,6vw,5.4rem)}
      .release-countdown-inner h2 span{background:linear-gradient(90deg,#45d8dc,#ff4ca6 48%,#ff9b54);-webkit-background-clip:text;background-clip:text;color:transparent}
      .countdown-subcopy{max-width:760px;margin:0 auto 28px;color:#aaa4b4}
      .countdown-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;max-width:900px;margin:0 auto}
      .countdown-unit{padding:24px 14px;border:1px solid rgba(255,255,255,.12);border-radius:22px;background:rgba(12,12,18,.62);backdrop-filter:blur(14px)}
      .countdown-value{display:block;font-family:Oswald,sans-serif;font-weight:700;line-height:1;font-size:clamp(2.6rem,7vw,5.2rem)}
      .countdown-label{display:block;margin-top:7px;font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:#aaa4b4;font-weight:800}
      .countdown-note{display:block;margin-top:18px;color:#77717e;font-size:.72rem}
      .countdown-live-message{font-family:Oswald,sans-serif;text-transform:uppercase;font-size:clamp(2.4rem,7vw,5rem);color:#ffd166}
      .vehicle-card.has-official-art{padding:0;min-height:360px;display:flex;flex-direction:column}
      .vehicle-art{height:178px;flex:0 0 178px;background-size:cover;background-position:center;background-repeat:no-repeat;border-bottom:1px solid rgba(255,255,255,.10);position:relative}
      .vehicle-art:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 52%,rgba(12,12,18,.36))}
      .vehicle-copy{padding:19px 20px 21px;display:flex;flex-direction:column;align-items:flex-start;flex:1}
      .vehicle-copy .vehicle-year{font-size:1.75rem;line-height:1}
      .vehicle-copy h3{margin:12px 0 4px}.vehicle-copy p{margin:0 0 13px}.vehicle-copy .status{margin-top:auto}
      .vehicle-image-note{margin:18px 0 0;color:#77717e;font-size:.72rem}
      @media(max-width:820px){.countdown-grid{grid-template-columns:repeat(2,1fr)}}
    `;
    document.head.appendChild(style);
  }

  // GTA VI release-day countdown. Rockstar has confirmed the date, not one universal exact unlock time.
  const quickStrip = qs('.quick-strip');
  if (quickStrip && !qs('#release-countdown')) {
    const countdownSection = document.createElement('section');
    countdownSection.id = 'release-countdown';
    countdownSection.className = 'release-countdown-section section-pad';
    countdownSection.innerHTML = `
      <div class="release-countdown-inner">
        <p class="kicker">THE CLOCK IS TICKING</p>
        <h2>Countdown to <span>GTA VI Release Day</span></h2>
        <p class="countdown-subcopy">Grand Theft Auto VI launches November 19, 2026 on PlayStation 5 and Xbox Series X|S.</p>
        <div class="countdown-grid" aria-live="polite">
          <div class="countdown-unit"><span class="countdown-value" data-countdown="days">--</span><span class="countdown-label">Days</span></div>
          <div class="countdown-unit"><span class="countdown-value" data-countdown="hours">--</span><span class="countdown-label">Hours</span></div>
          <div class="countdown-unit"><span class="countdown-value" data-countdown="minutes">--</span><span class="countdown-label">Minutes</span></div>
          <div class="countdown-unit"><span class="countdown-value" data-countdown="seconds">--</span><span class="countdown-label">Seconds</span></div>
        </div>
        <small class="countdown-note">Countdown reaches midnight at the start of November 19 in your local time. Exact platform and regional unlock times may differ.</small>
      </div>`;
    quickStrip.insertAdjacentElement('afterend', countdownSection);
    const target = new Date(2026, 10, 19, 0, 0, 0, 0);
    const values = {
      days: qs('[data-countdown="days"]', countdownSection),
      hours: qs('[data-countdown="hours"]', countdownSection),
      minutes: qs('[data-countdown="minutes"]', countdownSection),
      seconds: qs('[data-countdown="seconds"]', countdownSection)
    };
    let intervalId;
    const renderCountdown = () => {
      const remaining = target.getTime() - Date.now();
      if (remaining <= 0) {
        if (intervalId) clearInterval(intervalId);
        const grid = qs('.countdown-grid', countdownSection);
        if (grid) grid.innerHTML = '<div class="countdown-live-message" style="grid-column:1/-1">GTA VI RELEASE DAY IS HERE</div>';
        return;
      }
      const totalSeconds = Math.floor(remaining / 1000);
      values.days.textContent = String(Math.floor(totalSeconds / 86400));
      values.hours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0');
      values.minutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
      values.seconds.textContent = String(totalSeconds % 60).padStart(2, '0');
    };
    renderCountdown();
    intervalId = window.setInterval(renderCountdown, 1000);
  }

  // Official Rockstar vehicle imagery.
  const officialVehicleArt = {
    'GROTTI CHEETAH': 'https://www.rockstargames.com/VI/_next/static/media/ULTIMATE_EDITION_GROTTI_CHEETAH_01.0a.wy3s_ogjey.jpg?akim=1&imdensity=1&imwidth=3840',
    'VAPID DOMINATOR BUGGY': 'https://www.rockstargames.com/VI/_next/static/media/ULTIMATE_EDITION_VAPID_BUGGY_01.0jxfiql~371ik.jpg?akim=1&imdensity=1&imwidth=3840',
    'VAPID STANIER SEDAN': 'https://www.rockstargames.com/VI/_next/static/media/VINTAGE_VICE_CITY_PACK_VAPID_STANIER_01.004m_8d1~qngy.jpg?akim=1&imdensity=1&imwidth=3840',
    'SHITZU SQUALO': 'https://www.rockstargames.com/VI/_next/static/media/ULTIMATE_EDITION_SQUALO_01.0cim7hj58ypb1.jpg?akim=1&imdensity=1&imwidth=3840',
    'GANADO RETRO BUILD': 'https://www.rockstargames.com/VI/_next/static/media/ULTIMATE_EDITION_VAPID_GANADO_RETRO_BUILD_01.062dgvkwdynw5.jpg?akim=1&imdensity=1&imwidth=3840',
    'JASON’S SAFEHOUSE VEHICLES': 'https://www.rockstargames.com/VI/_next/static/media/ULTIMATE_EDITION_SAFEHOUSE_VEHICLES_01.0wv6pw3t-mky3.jpg?akim=1&imdensity=1&imwidth=3840',
    "JASON'S SAFEHOUSE VEHICLES": 'https://www.rockstargames.com/VI/_next/static/media/ULTIMATE_EDITION_SAFEHOUSE_VEHICLES_01.0wv6pw3t-mky3.jpg?akim=1&imdensity=1&imwidth=3840',
    'CLASSIC CAR COLLECTION': 'https://www.rockstargames.com/VI/_next/static/media/ULTIMATE_EDITION_WYMAN_CAR_COLLECTION_01.0swhrm__iu~6b.jpg?akim=1&imdensity=1&imwidth=3840'
  };
  qsa('#vehicles .vehicle-card:not(.unknown-vehicle)').forEach(card => {
    if (card.classList.contains('has-official-art')) return;
    const name = card.querySelector('h3')?.textContent?.trim().toUpperCase();
    const imageUrl = officialVehicleArt[name];
    if (!imageUrl) return;
    const art = document.createElement('div');
    art.className = 'vehicle-art';
    art.setAttribute('role', 'img');
    art.setAttribute('aria-label', `Official Rockstar image of ${card.querySelector('h3')?.textContent?.trim() || 'GTA VI vehicle'}`);
    art.style.backgroundImage = `url("${imageUrl}")`;
    const copy = document.createElement('div');
    copy.className = 'vehicle-copy';
    while (card.firstChild) copy.appendChild(card.firstChild);
    card.appendChild(art);
    card.appendChild(copy);
    card.classList.add('has-official-art');
  });
  const vehicleGrid = qs('#vehicles .vehicle-grid');
  if (vehicleGrid && !qs('.vehicle-image-note', vehicleGrid.parentElement)) {
    const note = document.createElement('p');
    note.className = 'vehicle-image-note';
    note.textContent = 'Vehicle imagery shown here comes from Rockstar Games’ official GTA VI media library.';
    vehicleGrid.insertAdjacentElement('afterend', note);
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

  // Newsletter overlay.
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
  qsa('[data-open-newsletter]').forEach(button => button.addEventListener('click', openNewsletter));
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
    const newsletter = newsletterConsent.checked;
    const gamertag = qs('#playerGamertag').value.trim();
    const platform = qs('#playerPlatform').value;
    const fail = (message, element) => {
      newsletterMessage.classList.add('error');
      newsletterMessage.textContent = message;
      element?.focus();
    };
    if (!newsletter && !gamertag && !platform) {
      fail('Choose email updates or enter your gamertag and platform, or close this box to keep browsing.', newsletterConsent);
      return;
    }
    if (newsletter && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fail('Enter a valid email address for email updates.', newsletterEmail);
      return;
    }
    if ((gamertag && !platform) || (platform && !gamertag)) {
      fail('Enter both your gamertag and platform to save your player details.', qs(gamertag ? '#playerPlatform' : '#playerGamertag'));
      return;
    }
    if (!NEWSLETTER_ENDPOINT) {
      fail('Submissions are not available yet. Nothing has been sent or saved. Please try again later.');
      return;
    }
    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    const oldText = submitButton?.textContent;
    if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'Saving…'; }
    try {
      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletter ? email : '', newsletter, gamertag, platform, website: qs('#submissionWebsite').value })
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      newsletterMessage.classList.add('success');
      newsletterMessage.textContent = newsletter ? (gamertag ? 'Your player details and email signup request are saved. Thanks!' : 'Your email signup request is saved. Thanks!') : 'Your player details are saved for later. Thanks!';
      try { localStorage.setItem(DISMISSED_KEY, '1'); if (newsletter) localStorage.setItem(SUBSCRIBED_KEY, '1'); } catch (_) {}
      newsletterForm.reset();
      window.setTimeout(() => closeNewsletter(false), 1200);
    } catch (error) {
      console.error('Newsletter signup failed:', error);
      newsletterMessage.classList.add('error');
      newsletterMessage.textContent = 'Your choices could not be saved. Please try again later.';
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
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach(link => link.removeAttribute('aria-current'));
      linkById.get(visible.target.id)?.setAttribute('aria-current', 'page');
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] });
    sections.forEach(section => observer.observe(section));
  }
})();