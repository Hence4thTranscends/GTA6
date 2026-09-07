(() => {
  'use strict';

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Inject styles for the release countdown and official vehicle imagery.
  if (!qs('#gta6-enhancement-styles')) {
    const style = document.createElement('style');
    style.id = 'gta6-enhancement-styles';
    style.textContent = `
      .release-countdown-section{
        position:relative;
        overflow:hidden;
        border-bottom:1px solid rgba(255,255,255,.10);
        background:
          radial-gradient(circle at 82% 10%,rgba(255,76,166,.18),transparent 28%),
          radial-gradient(circle at 14% 90%,rgba(69,216,220,.14),transparent 30%),
          linear-gradient(135deg,#11121a,#17101c 55%,#0f1118);
      }
      .release-countdown-section:before{
        content:"";
        position:absolute;
        inset:0;
        pointer-events:none;
        opacity:.20;
        background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);
        background-size:58px 58px;
      }
      .release-countdown-inner{position:relative;z-index:1;max-width:1240px;margin:0 auto;text-align:center}
      .release-countdown-inner h2{
        margin:6px 0 12px;
        font-family:Oswald,sans-serif;
        text-transform:uppercase;
        line-height:.94;
        font-size:clamp(2.7rem,6vw,5.4rem);
      }
      .release-countdown-inner h2 span{
        background:linear-gradient(90deg,#45d8dc,#ff4ca6 48%,#ff9b54);
        -webkit-background-clip:text;background-clip:text;color:transparent;
      }
      .countdown-subcopy{max-width:760px;margin:0 auto 28px;color:#aaa4b4}
      .countdown-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;max-width:900px;margin:0 auto}
      .countdown-unit{
        padding:24px 14px;
        border:1px solid rgba(255,255,255,.12);
        border-radius:22px;
        background:rgba(12,12,18,.62);
        backdrop-filter:blur(14px);
      }
      .countdown-value{
        display:block;
        font-family:Oswald,sans-serif;
        font-weight:700;
        line-height:1;
        font-size:clamp(2.6rem,7vw,5.2rem);
      }
      .countdown-label{display:block;margin-top:7px;font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:#aaa4b4;font-weight:800}
      .countdown-note{display:block;margin-top:18px;color:#77717e;font-size:.72rem}
      .countdown-live-message{font-family:Oswald,sans-serif;text-transform:uppercase;font-size:clamp(2.4rem,7vw,5rem);color:#ffd166}

      .vehicle-card.has-official-art{padding:0;min-height:360px;display:flex;flex-direction:column}
      .vehicle-card.has-official-art:before{z-index:2;pointer-events:none}
      .vehicle-art{height:178px;flex:0 0 178px;background-size:cover;background-position:center;background-repeat:no-repeat;border-bottom:1px solid rgba(255,255,255,.10);position:relative}
      .vehicle-art:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 52%,rgba(12,12,18,.36))}
      .vehicle-copy{padding:19px 20px 21px;display:flex;flex-direction:column;align-items:flex-start;flex:1}
      .vehicle-copy .vehicle-year{font-size:1.75rem;line-height:1}
      .vehicle-copy h3{margin:12px 0 4px}
      .vehicle-copy p{margin:0 0 13px}
      .vehicle-copy .status{margin-top:auto}
      .vehicle-card.has-official-art:hover .vehicle-art{filter:saturate(1.08) brightness(1.04)}
      .vehicle-image-note{margin:18px 0 0;color:#77717e;font-size:.72rem}

      @media(max-width:820px){
        .countdown-grid{grid-template-columns:repeat(2,1fr)}
      }
      @media(max-width:460px){
        .countdown-unit{padding:19px 10px}
      }
    `;
    document.head.appendChild(style);
  }

  // GTA VI release-day countdown.
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
        <small class="countdown-note">Countdown reaches midnight at the start of November 19 in your local time. Rockstar has confirmed the release date; exact platform/region unlock times may differ.</small>
      </div>`;
    quickStrip.insertAdjacentElement('afterend', countdownSection);

    const target = new Date(2026, 10, 19, 0, 0, 0, 0);
    const values = {
      days: qs('[data-countdown="days"]', countdownSection),
      hours: qs('[data-countdown="hours"]', countdownSection),
      minutes: qs('[data-countdown="minutes"]', countdownSection),
      seconds: qs('[data-countdown="seconds"]', countdownSection)
    };

    let intervalId = null;
    const renderCountdown = () => {
      const remaining = target.getTime() - Date.now();
      if (remaining <= 0) {
        if (intervalId) clearInterval(intervalId);
        const grid = qs('.countdown-grid', countdownSection);
        if (grid) grid.innerHTML = '<div class="countdown-live-message" style="grid-column:1/-1">GTA VI RELEASE DAY IS HERE</div>';
        return;
      }
      const totalSeconds = Math.floor(remaining / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      values.days.textContent = String(days);
      values.hours.textContent = String(hours).padStart(2, '0');
      values.minutes.textContent = String(minutes).padStart(2, '0');
      values.seconds.textContent = String(seconds).padStart(2, '0');
    };
    renderCountdown();
    intervalId = window.setInterval(renderCountdown, 1000);
  }

  // Official Rockstar vehicle/group images from the GTA VI media library.
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
})();