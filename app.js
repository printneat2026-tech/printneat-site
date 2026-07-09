'use strict';

// ── CONFIG — update with real hosted download URLs when ready ──
const DOWNLOADS = {
  lite: { url: 'https://github.com/printneat2026-tech/printneat-releases/releases/download/v1.2.0/PRINTNEAT-Workspace-LITE-v1.2.0.exe', file: 'PRINTNEAT-Workspace-LITE-v1.2.0.exe', size: '75 MB', price: 'Free',   label: 'LITE', color: '#4A7C6F', bg: 'rgba(74,124,111,.18)'   },
  pro:  { url: 'https://github.com/printneat2026-tech/printneat-releases/releases/download/v1.2.0/PRINTNEAT-Workspace-PRO-v1.2.0.exe',  file: 'PRINTNEAT-Workspace-PRO-v1.2.0.exe',  size: '75 MB', price: '€29.90', label: 'PRO',  color: '#C8705A', bg: 'rgba(200,112,90,.18)'  },
  xl:   { url: 'https://github.com/printneat2026-tech/printneat-releases/releases/download/v1.2.0/PRINTNEAT-Workspace-XL-v1.2.0.exe',   file: 'PRINTNEAT-Workspace-XL-v1.2.0.exe',   size: '75 MB', price: '€49.90', label: 'XL',   color: '#a78bfa', bg: 'rgba(138,100,200,.18)' }
};

// ── PAYMENT CONFIG — add Gumroad URLs after publishing products ──
const PAYMENTS = {
  pro: {
    gumroadUrl: '#',  // substituir: https://printneat.gumroad.com/l/XXXXX
    price: '€29.90',
    label: 'PRO',
    color: '#C8705A',
    bg: 'rgba(200,112,90,.12)',
    border: 'rgba(200,112,90,.3)',
    features: [
      'Everything in LITE',
      'Unlimited orders',
      'Invoice generator (PDF)',
      'Client CRM',
      'Etsy SEO tools',
      'Print failure tracker',
      'Finance charts & goals',
      'Shipping label generator',
    ]
  },
  xl: {
    gumroadUrl: '#',  // substituir: https://printneat.gumroad.com/l/YYYYY
    price: '€49.90',
    label: 'XL',
    color: '#a78bfa',
    bg: 'rgba(138,100,200,.12)',
    border: 'rgba(138,100,200,.3)',
    features: [
      'Everything in PRO',
      'Business simulator',
      'Time vs Profit analysis',
      'Multi-machine support',
      'Batch invoicing & labels',
      'Early beta access',
      'Priority future updates',
      'All upcoming modules',
    ]
  }
};

// ── PAYMENT MODAL ──
var _payModalBuilt = false;

function buildPaymentModal() {
  if (_payModalBuilt) return;
  _payModalBuilt = true;
  var el = document.createElement('div');
  el.id = 'pay-backdrop';
  el.style.cssText = 'display:none;position:fixed;inset:0;z-index:1100;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .25s';
  el.innerHTML = [
    '<div id="pay-box" style="position:relative;background:#0d1020;border:1px solid rgba(255,255,255,.08);border-radius:24px;width:100%;max-width:480px;overflow:hidden;transform:scale(.94) translateY(24px);transition:transform .28s cubic-bezier(.4,0,.2,1),opacity .28s">',

      // Header
      '<div id="pay-header" style="padding:32px 32px 24px;border-bottom:1px solid rgba(255,255,255,.06)">',
        '<button onclick="closePayModal()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);color:#8a9ab8;border-radius:50%;width:32px;height:32px;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;font-family:inherit">×</button>',
        '<div id="pay-badge" style="display:inline-flex;align-items:center;gap:6px;padding:4px 14px;border-radius:99px;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:16px"></div>',
        '<div style="font-size:26px;font-weight:900;color:#e8eef8;margin-bottom:4px" id="pay-title"></div>',
        '<div style="font-size:13px;color:#4a5a72" id="pay-subtitle"></div>',
      '</div>',

      // Price block
      '<div id="pay-price-block" style="padding:24px 32px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:space-between">',
        '<div>',
          '<div style="font-size:42px;font-weight:900;color:#fff;line-height:1" id="pay-price"></div>',
          '<div style="font-size:11px;color:#4a5a72;margin-top:4px">One-time payment · No subscription</div>',
        '</div>',
        '<div style="text-align:right">',
          '<div style="font-size:11px;color:#4a5a72;text-decoration:line-through;margin-bottom:2px" id="pay-old-price"></div>',
          '<div style="font-size:11px;background:rgba(74,124,111,.15);color:#6db8a8;border:1px solid rgba(74,124,111,.25);border-radius:99px;padding:3px 10px;font-weight:700">Save vs monthly tools</div>',
        '</div>',
      '</div>',

      // Features
      '<div style="padding:20px 32px;border-bottom:1px solid rgba(255,255,255,.06)">',
        '<div style="font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#4a5a72;margin-bottom:12px">What\'s included</div>',
        '<ul id="pay-features" style="list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:8px"></ul>',
      '</div>',

      // Trust row
      '<div style="padding:16px 32px;border-bottom:1px solid rgba(255,255,255,.06);display:flex;gap:20px;flex-wrap:wrap">',
        '<div style="display:flex;align-items:center;gap:6px;font-size:11px;color:#4a5a72"><span>🔒</span>Secure checkout</div>',
        '<div style="display:flex;align-items:center;gap:6px;font-size:11px;color:#4a5a72"><span>🛡️</span>30-day guarantee</div>',
        '<div style="display:flex;align-items:center;gap:6px;font-size:11px;color:#4a5a72"><span>⚡</span>Instant delivery</div>',
      '</div>',

      // CTA
      '<div style="padding:24px 32px">',
        '<button id="pay-cta-btn" onclick="proceedToPayment()" style="width:100%;padding:16px;border-radius:14px;border:none;font-size:15px;font-weight:800;cursor:pointer;font-family:inherit;letter-spacing:.02em;transition:all .2s;margin-bottom:12px">',
          '🛒 Buy now — Secure checkout →',
        '</button>',
        '<div style="text-align:center;font-size:11px;color:#2a3850">',
          'Powered by <strong style="color:#4a5a72">Gumroad</strong> · Card, PayPal &amp; more · VAT included',
        '</div>',
      '</div>',
    '</div>'
  ].join('');
  document.body.appendChild(el);

  el.addEventListener('click', function(e) { if (e.target === el) closePayModal(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closePayModal(); });
}

var _activePay = null;

function openPayModal(tier) {
  buildPaymentModal();
  _activePay = tier;
  var cfg = PAYMENTS[tier];
  var backdrop = document.getElementById('pay-backdrop');

  // Badge
  var badge = document.getElementById('pay-badge');
  badge.textContent = 'PrintNeat ' + cfg.label;
  badge.style.background = cfg.bg;
  badge.style.color = cfg.color;
  badge.style.border = '1px solid ' + cfg.border;

  // Title
  document.getElementById('pay-title').textContent = 'PrintNeat ' + cfg.label + ' — ' + (tier === 'pro' ? 'Professional' : 'Scale');
  document.getElementById('pay-subtitle').textContent = tier === 'pro'
    ? 'Full control over your 3D printing business.'
    : 'Every tool. Every feature. Built to scale.';

  // Price
  document.getElementById('pay-price').textContent = cfg.price;
  document.getElementById('pay-old-price').textContent = tier === 'pro' ? '€89/year' : '€149/year';

  // Features
  var ul = document.getElementById('pay-features');
  ul.innerHTML = cfg.features.map(function(f) {
    return '<li style="display:flex;align-items:flex-start;gap:6px;font-size:12px;color:#8a9ab8"><span style="color:#4A7C6F;font-weight:900;flex-shrink:0;margin-top:1px">✓</span>' + f + '</li>';
  }).join('');

  // CTA button color
  var btn = document.getElementById('pay-cta-btn');
  btn.style.background = 'linear-gradient(135deg,' + cfg.color + ',' + cfg.color + 'cc)';
  btn.style.color = tier === 'xl' ? '#0a0010' : '#fff';
  btn.style.boxShadow = '0 4px 24px ' + cfg.color + '44';

  // Show
  backdrop.style.display = 'flex';
  requestAnimationFrame(function() {
    backdrop.style.opacity = '1';
    document.getElementById('pay-box').style.transform = 'scale(1) translateY(0)';
  });
  document.body.style.overflow = 'hidden';
  track('payment_modal_open', { tier: tier });
}

function closePayModal() {
  var backdrop = document.getElementById('pay-backdrop');
  if (!backdrop) return;
  backdrop.style.opacity = '0';
  document.getElementById('pay-box').style.transform = 'scale(.94) translateY(24px)';
  setTimeout(function() { backdrop.style.display = 'none'; }, 260);
  document.body.style.overflow = '';
}

function proceedToPayment() {
  var cfg = PAYMENTS[_activePay];
  if (!cfg) return;
  if (!cfg.gumroadUrl || cfg.gumroadUrl === '#') {
    // Gumroad ainda não configurado
    var btn = document.getElementById('pay-cta-btn');
    btn.textContent = '⏳ Payment coming soon...';
    btn.disabled = true;
    setTimeout(function() {
      btn.textContent = '🛒 Buy now — Secure checkout →';
      btn.disabled = false;
    }, 2500);
    toast('Payment setup in progress — check back soon!', 'info', 4000);
    return;
  }
  track('payment_click', { tier: _activePay });
  window.open(cfg.gumroadUrl, '_blank', 'noopener');
}

// ── ANALYTICS — swap body for real provider (gtag, plausible, etc.) ──
function track(event, data) {
  console.info('[PN Analytics]', event, data || {});
  // if (typeof gtag !== 'undefined') gtag('event', event, data);
}

// ── TOAST ──
let _toastEl = null, _toastTimer = null;
function toast(msg, type, duration) {
  type = type || 'info';
  duration = duration || 3500;
  if (!_toastEl) {
    _toastEl = document.createElement('div');
    _toastEl.id = 'pn-toast';
    Object.assign(_toastEl.style, {
      position: 'fixed', bottom: '28px', left: '50%',
      transform: 'translateX(-50%) translateY(20px)',
      background: '#1a1f30', border: '1px solid rgba(255,255,255,.1)',
      borderRadius: '12px', padding: '12px 22px',
      fontSize: '13px', fontWeight: '600', color: '#e8eef8',
      boxShadow: '0 8px 32px rgba(0,0,0,.5)', zIndex: '9999',
      transition: 'all .3s cubic-bezier(.4,0,.2,1)', opacity: '0',
      whiteSpace: 'nowrap', fontFamily: 'Inter,system-ui,sans-serif',
      display: 'flex', alignItems: 'center', gap: '10px', pointerEvents: 'none'
    });
    document.body.appendChild(_toastEl);
  }
  const icons   = { success: '✓', error: '✕', info: 'ℹ' };
  const colors  = { success: '#4A7C6F', error: '#C8705A', info: '#D4A843' };
  const ic = icons[type] || icons.info;
  const cl = colors[type] || colors.info;
  _toastEl.innerHTML = '<span style="color:' + cl + ';font-size:15px;font-weight:900">' + ic + '</span>' + msg;
  _toastEl.style.borderColor = cl;
  Object.assign(_toastEl.style, { opacity: '1', transform: 'translateX(-50%) translateY(0)' });
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function () {
    _toastEl.style.opacity = '0';
    _toastEl.style.transform = 'translateX(-50%) translateY(20px)';
  }, duration);
}

// ── DOWNLOAD MODAL ──
let _activeTier = 'lite';

function buildModal() {
  if (document.getElementById('dl-modal')) return;
  const m = document.createElement('div');
  m.id = 'dl-modal';
  m.setAttribute('role', 'dialog');
  m.setAttribute('aria-modal', 'true');
  m.setAttribute('aria-labelledby', 'dl-modal-title');
  m.innerHTML = [
    '<div id="dl-backdrop" style="position:fixed;inset:0;background:rgba(0,0,0,.78);backdrop-filter:blur(10px);z-index:1000;display:none;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .25s">',
      '<div id="dl-box" style="background:#0f1220;border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:40px 36px;max-width:440px;width:100%;position:relative;transform:scale(.94) translateY(24px);transition:all .3s cubic-bezier(.4,0,.2,1);box-shadow:0 40px 100px rgba(0,0,0,.8)">',
        '<button onclick="closeModal()" aria-label="Close" class="modal-close-btn">×</button>',
        '<div id="dl-state-default">',
          '<div style="font-size:40px;margin-bottom:14px">⬇️</div>',
          '<h3 id="dl-modal-title" style="font-size:22px;font-weight:900;color:#e8eef8;margin-bottom:8px">Download PrintNeat</h3>',
          '<p id="dl-modal-desc" style="font-size:13px;color:#4a5a72;margin-bottom:20px;line-height:1.65"></p>',
          '<div id="dl-tier-badge" style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:99px;font-size:11px;font-weight:800;letter-spacing:.1em;margin-bottom:24px"></div>',
          '<label for="dl-email" style="font-size:11px;font-weight:700;color:#8a9ab8;letter-spacing:.08em;text-transform:uppercase;display:block;margin-bottom:8px">',
            'Email <span style="color:#3a4a62;font-weight:400;text-transform:none;letter-spacing:0">(optional — updates & support)</span>',
          '</label>',
          '<input id="dl-email" type="email" placeholder="your@email.com" autocomplete="email" style="width:100%;padding:11px 14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;color:#e8eef8;font-size:13px;font-family:inherit;outline:none;transition:border-color .2s;margin-bottom:16px">',
          '<button id="dl-btn" onclick="startDownload()" style="width:100%;padding:14px;border:none;border-radius:12px;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:10px;letter-spacing:.02em;color:#fff">',
            '<span id="dl-btn-txt">⬇ Download — Windows</span>',
          '</button>',
          '<p style="font-size:11px;color:#2a3850;text-align:center;margin-top:14px">Windows 10/11 · No account required · 30-day guarantee</p>',
        '</div>',
        '<div id="dl-state-success" style="display:none;text-align:center;padding:10px 0">',
          '<div style="font-size:56px;margin-bottom:16px">🎉</div>',
          '<div style="font-size:18px;font-weight:900;color:#e8eef8;margin-bottom:10px">Download started!</div>',
          '<div style="font-size:13px;color:#4a5a72;line-height:1.7">Run the installer and follow the setup.<br>Your data stays on your computer — always.</div>',
          '<button onclick="closeModal()" style="margin-top:24px;padding:10px 28px;border-radius:10px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:#c8d4e0;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s">Close</button>',
        '</div>',
      '</div>',
    '</div>'
  ].join('');
  document.body.appendChild(m);

  // Email focus style
  var emailEl = document.getElementById('dl-email');
  emailEl.addEventListener('focus', function () { this.style.borderColor = '#C8705A'; });
  emailEl.addEventListener('blur',  function () { this.style.borderColor = 'rgba(255,255,255,.08)'; });
  emailEl.addEventListener('keydown', function (e) { if (e.key === 'Enter') startDownload(); });

  // Backdrop click closes
  document.getElementById('dl-backdrop').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });
}

function openModal(tier) {
  buildModal();
  _activeTier = tier || 'lite';
  var cfg = DOWNLOADS[_activeTier];

  document.getElementById('dl-modal-desc').textContent =
    'You are downloading PrintNeat ' + cfg.label + ' (' + cfg.file + ', ' + cfg.size + '). ' +
    'Leave your email to receive setup tips and update notifications.';

  var badge = document.getElementById('dl-tier-badge');
  badge.textContent = 'PrintNeat ' + cfg.label + (cfg.price !== 'Free' ? ' · ' + cfg.price + ' one-time' : ' · Free forever');
  badge.style.cssText = 'display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:99px;font-size:11px;font-weight:800;letter-spacing:.1em;margin-bottom:24px;background:' + cfg.bg + ';color:' + cfg.color + ';border:1px solid ' + cfg.color + '55';

  var btn = document.getElementById('dl-btn');
  btn.style.background = 'linear-gradient(135deg,' + cfg.color + ',' + cfg.color + 'aa)';
  btn.style.boxShadow  = '0 4px 20px ' + cfg.color + '44';
  document.getElementById('dl-btn-txt').textContent = '⬇ Download ' + cfg.label + ' — Windows';

  document.getElementById('dl-state-default').style.display = 'block';
  document.getElementById('dl-state-success').style.display = 'none';
  document.getElementById('dl-email').value = localStorage.getItem('pn_email') || '';

  var backdrop = document.getElementById('dl-backdrop');
  backdrop.style.display = 'flex';
  requestAnimationFrame(function () {
    backdrop.style.opacity = '1';
    document.getElementById('dl-box').style.transform = 'scale(1) translateY(0)';
  });

  setTimeout(function () { document.getElementById('dl-email').focus(); }, 300);
  document.body.style.overflow = 'hidden';
  track('modal_open', { tier: _activeTier });
}

function closeModal() {
  var backdrop = document.getElementById('dl-backdrop');
  if (!backdrop) return;
  backdrop.style.opacity = '0';
  document.getElementById('dl-box').style.transform = 'scale(.94) translateY(24px)';
  setTimeout(function () { backdrop.style.display = 'none'; }, 260);
  document.body.style.overflow = '';
}

function startDownload() {
  var email = (document.getElementById('dl-email').value || '').trim();
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRe.test(email)) {
    toast('Please enter a valid email address', 'error');
    document.getElementById('dl-email').focus();
    return;
  }

  var cfg = DOWNLOADS[_activeTier];
  var btn = document.getElementById('dl-btn');

  // Animate button
  btn.style.opacity = '0.7';
  btn.style.pointerEvents = 'none';
  document.getElementById('dl-btn-txt').textContent = '⏳ Preparing download...';

  setTimeout(function () {
    // Trigger actual file download
    if (cfg.url !== '#') {
      var a = document.createElement('a');
      a.href = cfg.url;
      a.download = cfg.file;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    // Persist email & tier
    if (email) localStorage.setItem('pn_email', email);
    localStorage.setItem('pn_downloaded', _activeTier);

    // Enviar email para Formspree
    if (email) {
      fetch('https://formspree.io/f/xnjkrbqd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email, tier: _activeTier, source: 'download-modal' })
      }).catch(function() {}); // silencioso — não bloquear o download se falhar
    }

    // Switch to success state
    document.getElementById('dl-state-default').style.display = 'none';
    document.getElementById('dl-state-success').style.display = 'block';

    // Injetar nota de segurança no estado de sucesso
    var successEl = document.getElementById('dl-state-success');
    if (successEl && !document.getElementById('dl-smartscreen-note')) {
      var note = document.createElement('div');
      note.id = 'dl-smartscreen-note';
      note.style.cssText = 'margin-top:18px;padding:14px 16px;background:rgba(74,124,111,.12);border:1px solid rgba(74,124,111,.3);border-radius:12px;text-align:left';
      note.innerHTML = '<div style="font-size:12px;font-weight:700;color:#4A7C6F;margin-bottom:6px">⚠️ Windows may show a security warning</div>'
        + '<div style="font-size:12px;color:#8a9ab8;line-height:1.6">This is normal for new software. To install:<br>'
        + '1. Click <b style="color:#e8eef8">More info</b> on the blue screen<br>'
        + '2. Click <b style="color:#e8eef8">Run anyway</b><br>'
        + 'PRINTNEAT is safe — your data stays on your computer, never uploaded.</div>';
      successEl.appendChild(note);
    }

    toast('Download started — check your Downloads folder!', 'success', 5000);
    track('download_complete', { tier: _activeTier, email: email ? 'provided' : 'skipped' });
  }, 800);
}

// ── STICKY BAR ──
(function() {
  var bar = document.getElementById('sticky-bar');
  if (!bar) return;
  var hero = document.getElementById('hero');
  function onScroll() {
    var heroH = hero ? hero.offsetHeight : 600;
    bar.classList.toggle('visible', window.pageYOffset > heroH * 0.7);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ── SMOOTH SCROLL with nav offset ──
var NAV_H = 68;
function smoothScroll(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var top = el.getBoundingClientRect().top + window.pageYOffset - NAV_H - 12;
  window.scrollTo({ top: top, behavior: 'smooth' });
  if (document.getElementById('mobile-menu').classList.contains('open')) toggleMenu();
  track('scroll', { to: id });
}

// Intercept all anchor clicks
document.addEventListener('click', function (e) {
  var a = e.target.closest('a[href^="#"],button[data-dl]');
  if (!a) return;
  var tier = a.dataset.dl;
  var href = a.getAttribute('href') || '';
  var id = href.startsWith('#') ? href.slice(1) : '';

  // Botões com data-dl
  if (tier) {
    e.preventDefault();
    if (tier === 'lite') {
      openModal('lite'); // download direto grátis
    } else {
      window.location.href = 'checkout.html?plan=' + tier; // página de pagamento
    }
    track('cta_click', { tier: tier, loc: a.dataset.loc || 'unknown' });
    return;
  }

  if (!id) return;
  e.preventDefault();
  smoothScroll(id);
});

// ── MOBILE MENU ──
function toggleMenu() {
  var m   = document.getElementById('mobile-menu');
  var btn = document.getElementById('burger-btn');
  var isOpen = m.classList.toggle('open');
  btn.setAttribute('aria-expanded', String(isOpen));
  btn.textContent = isOpen ? '✕' : '☰';
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
document.addEventListener('click', function (e) {
  var m = document.getElementById('mobile-menu');
  if (!m.classList.contains('open')) return;
  if (!m.contains(e.target) && !e.target.closest('#burger-btn')) toggleMenu();
});

// ── NAV ACTIVE SECTION on scroll ──
var _scrollSections = ['hero', 'features', 'how', 'pricing', 'testimonials', 'faq'];
var _ticking = false;
function updateNav() {
  var y = window.pageYOffset + NAV_H + 40;
  var current = 'hero';
  _scrollSections.forEach(function (id) {
    var el = document.getElementById(id);
    if (el && el.offsetTop <= y) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var match = a.getAttribute('href').slice(1) === current;
    a.style.color      = match ? '#e8eef8' : '';
    a.style.fontWeight = match ? '700' : '';
  });
  // Nav opacity
  document.getElementById('nav').style.background =
    window.pageYOffset > 20 ? 'rgba(6,8,16,.97)' : 'rgba(6,8,16,.8)';
  // Scroll-to-top
  var s = document.getElementById('scroll-top');
  if (s) s.style.opacity = window.pageYOffset > 600 ? '1' : '0';
}
window.addEventListener('scroll', function () {
  if (_ticking) return;
  _ticking = true;
  requestAnimationFrame(function () { updateNav(); _ticking = false; });
}, { passive: true });

// ── FAQ ACCORDION with keyboard ──
function toggleFAQ(btn) {
  var item   = btn.closest('.faq-item');
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function (i) {
    i.classList.remove('open');
    i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    track('faq', { q: btn.querySelector('span:first-child') ? btn.textContent.trim().slice(0, -1) : '' });
  } else {
    btn.setAttribute('aria-expanded', 'false');
  }
}
document.querySelectorAll('.faq-q').forEach(function (btn) {
  btn.setAttribute('aria-expanded', 'false');
  btn.addEventListener('keydown', function (e) { if (e.key === ' ') { e.preventDefault(); this.click(); } });
});

// ── SCROLL REVEAL ──
var revealObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(function (el) { revealObs.observe(el); });
setTimeout(function () {
  document.querySelectorAll('#hero .reveal').forEach(function (el) { el.classList.add('visible'); });
}, 80);

// ── ANIMATED COUNTERS ──
function animateCount(el) {
  var raw    = el.dataset.count || el.textContent;
  var suffix = raw.replace(/[\d.]/g, '');
  var target = parseFloat(raw);
  if (isNaN(target)) return;
  var start = null, dur = 1400;
  function frame(ts) {
    if (!start) start = ts;
    var p    = Math.min((ts - start) / dur, 1);
    var ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * ease) + suffix;
    if (p < 1) requestAnimationFrame(frame); else el.textContent = raw;
  }
  requestAnimationFrame(frame);
}
var cntObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) { animateCount(e.target); cntObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-val').forEach(function (el) {
  el.dataset.count = el.textContent;
  cntObs.observe(el);
});

// ── SCROLL-TO-TOP button ──
(function () {
  var btn = document.createElement('button');
  btn.id = 'scroll-top';
  btn.title = 'Back to top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.textContent = '↑';
  Object.assign(btn.style, {
    position: 'fixed', bottom: '28px', right: '28px',
    width: '42px', height: '42px', borderRadius: '50%',
    background: 'rgba(200,112,90,.85)', border: 'none', color: '#fff',
    fontSize: '18px', cursor: 'pointer', zIndex: '500',
    opacity: '0', transition: 'all .3s', backdropFilter: 'blur(8px)',
    boxShadow: '0 4px 16px rgba(200,112,90,.4)',
    fontWeight: '700', lineHeight: '1', fontFamily: 'inherit'
  });
  btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); track('scroll_top'); });
  btn.addEventListener('mouseenter', function () { this.style.transform = 'scale(1.1)'; });
  btn.addEventListener('mouseleave', function () { this.style.transform = 'scale(1)'; });
  document.body.appendChild(btn);
}());

// ── COUNTDOWN TIMER ──
(function () {
  var END_DATE = (function () {
    // Target: last day of current month at 23:59:59 local time
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  }());

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    var diff = Math.max(0, Math.floor((END_DATE - Date.now()) / 1000));
    var d = Math.floor(diff / 86400);
    var h = Math.floor((diff % 86400) / 3600);
    var m = Math.floor((diff % 3600) / 60);
    var s = diff % 60;

    ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(function (id, i) {
      var el = document.getElementById(id);
      if (!el) return;
      var val = pad([d,h,m,s][i]);
      if (el.textContent !== val) el.textContent = val;
    });

    if (diff > 0) setTimeout(tick, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tick);
  } else {
    tick();
  }
}());

// ── KEYBOARD: Escape closes modal ──
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closePayModal(); closePolicy(); } });

// ── POLICIES ──
var POLICIES = {
  privacy: {
    title: '🔒 Privacy Policy',
    updated: 'Last updated: July 2026',
    body: [
      '<h3>1. Who we are</h3>',
      '<p>PrintNeat ("we", "our") is a software product developed by Rapid 3D Access Manufacturing. Contact: <a href="mailto:printneat2026@gmail.com" style="color:#C8705A">printneat2026@gmail.com</a></p>',

      '<h3>2. What data we collect</h3>',
      '<p>PrintNeat is a <strong>100% offline desktop application</strong>. The app itself collects no data — all your orders, clients, finances and products are stored exclusively on your local computer and never transmitted to any server.</p>',
      '<p>Our <strong>website</strong> may collect:</p>',
      '<ul><li>Email address (optional, only if you voluntarily provide it during download)</li><li>Download tier chosen (LITE, PRO or XL)</li><li>Basic analytics (page visits, button clicks) — anonymised, no personal identifiers</li></ul>',

      '<h3>3. How we use your data</h3>',
      '<ul><li>Email: to send product updates, security notices and support responses. We never sell or share your email with third parties.</li><li>Analytics: to improve the website and understand which features matter most.</li></ul>',

      '<h3>4. Third-party services</h3>',
      '<ul><li><strong>Gumroad</strong> — processes payments for PRO and XL. Gumroad\'s own privacy policy applies to payment data.</li><li><strong>Formspree</strong> — receives email submissions from our website form.</li><li><strong>GitHub</strong> — hosts the download files.</li></ul>',

      '<h3>5. Data retention</h3>',
      '<p>Email addresses are retained until you request deletion. You can email us at any time to be removed from our list.</p>',

      '<h3>6. Your rights (GDPR)</h3>',
      '<p>If you are in the EU/EEA, you have the right to access, correct, delete or export your personal data. Contact us at <a href="mailto:printneat2026@gmail.com" style="color:#C8705A">printneat2026@gmail.com</a> and we will respond within 30 days.</p>',

      '<h3>7. Cookies</h3>',
      '<p>Our website does not use tracking cookies. We use localStorage in your browser only to remember your download preference (tier selected). No advertising or third-party cookies are set.</p>',

      '<h3>8. Changes</h3>',
      '<p>We may update this policy occasionally. The "Last updated" date at the top will always reflect the most recent version.</p>',
    ]
  },
  terms: {
    title: '📄 Terms of Use',
    updated: 'Last updated: July 2026',
    body: [
      '<h3>1. Acceptance</h3>',
      '<p>By downloading or using PrintNeat ("the Software"), you agree to these Terms. If you do not agree, do not install or use the Software.</p>',

      '<h3>2. License</h3>',
      '<p><strong>LITE:</strong> Free personal and commercial use license for one computer.<br><strong>PRO / XL:</strong> Paid single-user license for one computer per purchase. Each license may only be used by the purchaser. You may not resell, sublicense, redistribute or share the software with others.</p>',

      '<h3>3. What you may do</h3>',
      '<ul><li>Install and use the Software on your own computer</li><li>Use it for personal or commercial business purposes</li><li>Export your own data at any time</li></ul>',

      '<h3>4. What you may not do</h3>',
      '<ul><li>Reverse engineer, decompile or modify the Software</li><li>Resell or redistribute the Software or your license key</li><li>Use the Software to develop a competing product</li><li>Remove copyright or branding notices</li></ul>',

      '<h3>5. Updates</h3>',
      '<p>Updates within the same major version are included. We reserve the right to release future major versions as separate paid upgrades. Existing licenses remain valid and functional indefinitely.</p>',

      '<h3>6. Disclaimer of warranties</h3>',
      '<p>The Software is provided "as is" without warranty of any kind. We do not guarantee uninterrupted or error-free operation. You use the Software at your own risk. Always keep a backup of your data.</p>',

      '<h3>7. Limitation of liability</h3>',
      '<p>To the maximum extent permitted by law, PrintNeat and its developers shall not be liable for any indirect, incidental, special or consequential damages arising from your use of the Software, including but not limited to data loss or loss of profit.</p>',

      '<h3>8. Governing law</h3>',
      '<p>These Terms are governed by the laws of Portugal. Any disputes shall be subject to the exclusive jurisdiction of the courts of Portugal.</p>',

      '<h3>9. Contact</h3>',
      '<p><a href="mailto:printneat2026@gmail.com" style="color:#C8705A">printneat2026@gmail.com</a></p>',
    ]
  },
  refund: {
    title: '🛡️ Refund Policy',
    updated: 'Last updated: July 2026',
    body: [
      '<h3>Our guarantee</h3>',
      '<p>We stand behind PrintNeat. If you are not satisfied with your purchase for any reason, we offer a <strong>30-day full refund</strong> — no questions asked.</p>',

      '<h3>How to request a refund</h3>',
      '<ol><li>Email us at <a href="mailto:printneat2026@gmail.com" style="color:#C8705A">printneat2026@gmail.com</a> within 30 days of purchase</li><li>Include your order number (found in your Gumroad receipt)</li><li>We will process the refund within 5 business days</li></ol>',

      '<h3>Conditions</h3>',
      '<ul><li>Refunds are available within <strong>30 days</strong> of the original purchase date</li><li>Each customer may request a refund once per product</li><li>After a refund is issued, your license is deactivated and you must uninstall the software</li></ul>',

      '<h3>Exceptions</h3>',
      '<ul><li>Refunds will not be issued for purchases older than 30 days</li><li>If we detect abuse of the refund policy (repeated purchases and refunds), we reserve the right to refuse future purchases</li></ul>',

      '<h3>LITE (Free) version</h3>',
      '<p>The LITE version is completely free — no payment, no refund needed.</p>',

      '<h3>Questions?</h3>',
      '<p>Email us any time at <a href="mailto:printneat2026@gmail.com" style="color:#C8705A">printneat2026@gmail.com</a> — we reply within 24 hours on business days.</p>',
    ]
  }
};

function openPolicy(key) {
  var p = POLICIES[key];
  if (!p) return;
  var content = document.getElementById('policy-content');
  content.innerHTML = [
    '<div style="font-size:28px;font-weight:900;color:#e8eef8;margin-bottom:6px">' + p.title + '</div>',
    '<div style="font-size:11px;color:#3a4a62;margin-bottom:36px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,.06)">' + p.updated + '</div>',
    '<div class="policy-body">' + p.body.join('') + '</div>'
  ].join('');
  var backdrop = document.getElementById('policy-backdrop');
  backdrop.style.display = 'flex';
  requestAnimationFrame(function() {
    backdrop.style.opacity = '1';
    document.getElementById('policy-box').style.transform = 'translateY(0)';
  });
  document.body.style.overflow = 'hidden';
}

function closePolicy() {
  var backdrop = document.getElementById('policy-backdrop');
  if (!backdrop || backdrop.style.display === 'none') return;
  backdrop.style.opacity = '0';
  document.getElementById('policy-box').style.transform = 'translateY(24px)';
  setTimeout(function() { backdrop.style.display = 'none'; }, 260);
  document.body.style.overflow = '';
}

document.getElementById('policy-backdrop').addEventListener('click', function(e) {
  if (e.target === this) closePolicy();
});

// ══════════════════════════════════════════
// ── AUTH SYSTEM (Supabase) ──
// ══════════════════════════════════════════

// !! SUBSTITUIR com as tuas credenciais Supabase !!
var SUPABASE_URL  = 'https://synopdrgmnbytrytqtdf.supabase.co';
var SUPABASE_ANON = 'sb_publishable_R521wHC9mzI-c2D06749-g_knjf6sGY';

var _sb = null; // cliente Supabase
var _authUser = null;

function _initSupabase() {
  if (_sb) return Promise.resolve();
  return new Promise(function(resolve) {
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    s.onload = function() {
      _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
      // Ouvir mudanças de sessão
      _sb.auth.onAuthStateChange(function(event, session) {
        _authUser = session ? session.user : null;
        _updateNavAuth();
      });
      // Sessão existente
      _sb.auth.getSession().then(function(r) {
        _authUser = r.data.session ? r.data.session.user : null;
        _updateNavAuth();
        resolve();
      });
    };
    s.onerror = function() { console.warn('Supabase not loaded'); resolve(); };
    document.head.appendChild(s);
  });
}

function _updateNavAuth() {
  var guestArea = document.getElementById('nav-guest');
  var userBtn   = document.getElementById('nav-user-btn');
  var avatarEl  = document.getElementById('nav-avatar');
  var nameEl    = document.getElementById('nav-user-name');
  var udEmail   = document.getElementById('ud-email');

  if (_authUser) {
    var email   = _authUser.email || '';
    var initial = email.charAt(0).toUpperCase();
    var meta    = _authUser.user_metadata || {};
    var name    = (meta.full_name || email.split('@')[0] || 'User').split(' ')[0];
    if (guestArea) guestArea.style.display = 'none';
    if (userBtn)   userBtn.style.display   = 'flex';
    if (avatarEl)  avatarEl.textContent    = initial;
    if (nameEl)    nameEl.textContent      = name;
    if (udEmail)   udEmail.textContent     = email;
    var pEl = document.getElementById('profile-email-display');
    if (pEl) pEl.textContent = email;
  } else {
    if (guestArea) guestArea.style.display = 'flex';
    if (userBtn)   userBtn.style.display   = 'none';
    toggleUserDropdown(false);
  }
}

// ── Open / Close Auth Modal ──
function openAuth(tab) {
  _initSupabase().then(function() {
    document.getElementById('auth-backdrop').style.display = 'flex';
    setTimeout(function() { document.getElementById('auth-backdrop').classList.add('visible'); }, 20);
    document.body.style.overflow = 'hidden';
    switchAuthTab(tab || (_authUser ? 'profile' : 'login'));
    _clearAuthMsg();
  });
}

function closeAuth() {
  var bd = document.getElementById('auth-backdrop');
  bd.classList.remove('visible');
  setTimeout(function() { bd.style.display = 'none'; document.body.style.overflow = ''; }, 280);
}

document.getElementById('auth-backdrop').addEventListener('click', function(e) {
  if (e.target === this) closeAuth();
});

// ── Tab switching ──
function switchAuthTab(tab) {
  var forms = ['login','register','reset','profile'];
  forms.forEach(function(f) {
    document.getElementById('auth-form-' + f).style.display = f === tab ? '' : 'none';
  });
  var tabs  = document.getElementById('auth-tabs');
  var title = document.getElementById('auth-title');
  var sub   = document.getElementById('auth-sub');
  var btns  = document.querySelectorAll('.auth-tab');

  if (tab === 'login')    { btns[0].classList.add('active');    btns[1].classList.remove('active'); tabs.style.display=''; title.textContent='Welcome back'; sub.textContent='Sign in to manage your license and downloads.'; }
  if (tab === 'register') { btns[1].classList.add('active');    btns[0].classList.remove('active'); tabs.style.display=''; title.textContent='Create account'; sub.textContent='Free to start. Manage your license and downloads in one place.'; }
  if (tab === 'reset')    { tabs.style.display='none'; title.textContent='Reset password'; sub.textContent=''; }
  if (tab === 'profile')  { tabs.style.display='none'; title.textContent='My account'; sub.textContent=''; }
  _clearAuthMsg();
}

function _showAuthMsg(msg, type) {
  var el = document.getElementById('auth-msg');
  el.textContent = msg; el.className = 'auth-msg ' + type; el.style.display = 'block';
}
function _clearAuthMsg() {
  var el = document.getElementById('auth-msg');
  el.style.display = 'none'; el.textContent = '';
}
function _setAuthLoading(btnId, loading) {
  var btn = document.getElementById(btnId);
  if (!btn) return;
  btn.disabled = loading;
  btn.textContent = loading ? '⏳ Please wait...' : btn.getAttribute('data-label') || btn.textContent;
}

// ── Sign In ──
function authSignIn() {
  if (!_sb) return;
  var email = document.getElementById('auth-login-email').value.trim();
  var pass  = document.getElementById('auth-login-pass').value;
  if (!email || !pass) { _showAuthMsg('Please fill in all fields.', 'error'); return; }
  var btn = document.getElementById('auth-login-btn');
  btn.disabled = true; btn.textContent = '⏳ Signing in...';
  _sb.auth.signInWithPassword({ email: email, password: pass }).then(function(r) {
    btn.disabled = false; btn.textContent = 'Sign in →';
    if (r.error) { _showAuthMsg(r.error.message, 'error'); return; }
    _authUser = r.data.user;
    _updateNavAuth();
    closeAuth();
    toast('👋 Welcome back, ' + (r.data.user.email.split('@')[0]) + '!', 'success', 4000);
    track('auth_signin');
  });
}

// ── Register ──
function authRegister() {
  if (!_sb) return;
  var name  = document.getElementById('auth-reg-name').value.trim();
  var email = document.getElementById('auth-reg-email').value.trim();
  var pass  = document.getElementById('auth-reg-pass').value;
  if (!name || !email || !pass) { _showAuthMsg('Please fill in all fields.', 'error'); return; }
  if (pass.length < 8) { _showAuthMsg('Password must be at least 8 characters.', 'error'); return; }
  var btn = document.getElementById('auth-reg-btn');
  btn.disabled = true; btn.textContent = '⏳ Creating account...';
  _sb.auth.signUp({ email: email, password: pass, options: { data: { full_name: name }, emailRedirectTo: window.location.origin + window.location.pathname } }).then(function(r) {
    btn.disabled = false; btn.textContent = 'Create account →';
    if (r.error) { _showAuthMsg(r.error.message, 'error'); return; }
    _showAuthMsg('✅ Account created! Check your email to confirm your address.', 'success');
    // Enviar também para Formspree
    fetch('https://formspree.io/f/xnjkrbqd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: email, name: name, source: 'register' })
    }).catch(function(){});
    track('auth_register');
  });
}

// ── Reset Password ──
function authReset() {
  if (!_sb) return;
  var email = document.getElementById('auth-reset-email').value.trim();
  if (!email) { _showAuthMsg('Please enter your email.', 'error'); return; }
  _sb.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin }).then(function(r) {
    if (r.error) { _showAuthMsg(r.error.message, 'error'); return; }
    _showAuthMsg('✅ Reset link sent! Check your inbox.', 'success');
  });
}

// ── Sign Out ──
function authSignOut() {
  if (!_sb) return;
  _sb.auth.signOut().then(function() {
    _authUser = null;
    _updateNavAuth();
    closeAuth();
    toast('Signed out successfully.', 'info', 3000);
    track('auth_signout');
  });
}

// ── User dropdown toggle ──
function toggleUserDropdown(force) {
  var dd = document.getElementById('user-dropdown');
  if (!dd) return;
  var open = typeof force === 'boolean' ? force : !dd.classList.contains('open');
  dd.classList.toggle('open', open);
  if (open) {
    setTimeout(function() {
      document.addEventListener('click', function handler(e) {
        if (!document.getElementById('nav-user-btn').contains(e.target)) {
          dd.classList.remove('open');
          document.removeEventListener('click', handler);
        }
      });
    }, 10);
  }
}

// Inicializar Supabase ao carregar (silencioso)
_initSupabase();

// ── NEWSLETTER SUBMIT ──
function nlSubmit() {
  var email = (document.getElementById('nl-email').value || '').trim();
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !re.test(email)) {
    toast('Please enter a valid email address', 'error'); return;
  }
  fetch('https://formspree.io/f/xnjkrbqd', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ email: email, source: 'newsletter' })
  }).catch(function(){});
  localStorage.setItem('pn_email', email);
  document.getElementById('nl-email').value = '';
  toast('🎉 You\'re subscribed! Welcome to the community.', 'success', 5000);
  track('newsletter_subscribe', { email: 'yes' });
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.activeElement && document.activeElement.id === 'nl-email') nlSubmit();
});

// ── YEAR ──
document.getElementById('yr').textContent = new Date().getFullYear();

// ══════════════════════════════════════════
// ── POPUP SYSTEM ──
// ══════════════════════════════════════════

var POPUP_CSS = [
  '#pn-popup-backdrop{position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .3s}',
  '#pn-popup-backdrop.visible{opacity:1}',
  '#pn-popup-box{background:#0d1020;border:1px solid rgba(255,255,255,.09);border-radius:24px;max-width:440px;width:100%;position:relative;overflow:hidden;transform:scale(.93) translateY(20px);transition:transform .32s cubic-bezier(.4,0,.2,1)}',
  '#pn-popup-backdrop.visible #pn-popup-box{transform:scale(1) translateY(0)}',
  '.pn-popup-close{position:absolute;top:14px;right:14px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);color:#6a7a92;border-radius:50%;width:30px;height:30px;font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;font-family:inherit;transition:all .2s;z-index:1}',
  '.pn-popup-close:hover{background:rgba(255,255,255,.13);color:#e8eef8}',
  '.pn-popup-top{padding:32px 32px 0;text-align:center}',
  '.pn-popup-icon{font-size:48px;margin-bottom:14px;display:block}',
  '.pn-popup-title{font-size:22px;font-weight:900;color:#e8eef8;margin-bottom:8px;line-height:1.2}',
  '.pn-popup-sub{font-size:13px;color:#4a5a72;line-height:1.7;margin-bottom:0}',
  '.pn-popup-body{padding:24px 32px 32px}',
  '.pn-popup-label{font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#4a5a72;display:block;margin-bottom:8px}',
  '.pn-popup-input{width:100%;padding:11px 14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;color:#e8eef8;font-size:13px;font-family:inherit;outline:none;transition:border-color .2s;margin-bottom:12px}',
  '.pn-popup-input:focus{border-color:#C8705A}',
  '.pn-popup-btn{width:100%;padding:14px;border:none;border-radius:12px;font-size:14px;font-weight:800;cursor:pointer;font-family:inherit;transition:all .2s;margin-bottom:10px}',
  '.pn-popup-btn-primary{background:linear-gradient(135deg,#C8705A,#a85040);color:#fff;box-shadow:0 4px 20px rgba(200,112,90,.35)}',
  '.pn-popup-btn-primary:hover{transform:translateY(-1px);box-shadow:0 8px 28px rgba(200,112,90,.5)}',
  '.pn-popup-btn-ghost{background:transparent;border:1px solid rgba(255,255,255,.08);color:#4a5a72;font-size:12px;padding:10px}',
  '.pn-popup-btn-ghost:hover{color:#8a9ab8;border-color:rgba(255,255,255,.15)}',
  '.pn-popup-trust{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-top:4px}',
  '.pn-popup-trust span{font-size:10px;color:#2a3850;display:flex;align-items:center;gap:4px}',
  '.pn-popup-bar{height:3px;background:linear-gradient(90deg,#C8705A,#D4A843)}',
].join('');

(function injectPopupStyles() {
  var s = document.createElement('style');
  s.textContent = POPUP_CSS;
  document.head.appendChild(s);
})();

// ── Popup state ──
var _popupShown = false;
var _popupDismissed = false;

function _getPopupFreq(key) {
  try { return localStorage.getItem(key); } catch(e) { return null; }
}
function _setPopupFreq(key) {
  try { localStorage.setItem(key, Date.now()); } catch(e) {}
}
function _canShowPopup() {
  if (_popupShown || _popupDismissed) return false;
  // Uma vez por sessão (limpa ao fechar browser)
  if (sessionStorage.getItem('pn_popup_shown')) return false;
  return true;
}

// ── Build popup DOM ──
var _popupBuilt = false;
function _buildPopup() {
  if (_popupBuilt) return;
  _popupBuilt = true;
  var el = document.createElement('div');
  el.id = 'pn-popup-backdrop';
  el.innerHTML = [
    '<div id="pn-popup-box">',
      '<div class="pn-popup-bar"></div>',
      '<button class="pn-popup-close" onclick="closePopup()">×</button>',
      '<div class="pn-popup-top">',
        '<span class="pn-popup-icon" id="pp-icon">🎁</span>',
        '<div class="pn-popup-title" id="pp-title">Before you go...</div>',
        '<p class="pn-popup-sub" id="pp-sub">Get PrintNeat LITE free — no strings attached.</p>',
      '</div>',
      '<div class="pn-popup-body">',
        '<label class="pn-popup-label">Your email (optional — for updates)</label>',
        '<input class="pn-popup-input" id="pp-email" type="email" placeholder="your@email.com" autocomplete="email">',
        '<button class="pn-popup-btn pn-popup-btn-primary" onclick="popupDownload()">⬇ Download free — Windows</button>',
        '<button class="pn-popup-btn pn-popup-btn-ghost" onclick="closePopup()">No thanks, I\'ll pass</button>',
        '<div class="pn-popup-trust">',
          '<span>🔒 100% offline</span>',
          '<span>⚡ Instant download</span>',
          '<span>🛡️ No account needed</span>',
        '</div>',
      '</div>',
    '</div>'
  ].join('');
  document.body.appendChild(el);
  el.addEventListener('click', function(e) { if (e.target === el) closePopup(); });
}

// ── Popup variants ──
var POPUP_VARIANTS = {
  exit: {
    icon: '👋',
    title: 'Wait — before you go!',
    sub: 'Try PrintNeat free. No credit card, no account, 100% offline.'
  },
  scroll: {
    icon: '🚀',
    title: 'Ready to run your business smarter?',
    sub: 'Download PrintNeat LITE free and start today.'
  },
  time: {
    icon: '⏱️',
    title: 'Still exploring?',
    sub: 'PrintNeat is free to start — download in seconds and see it for yourself.'
  },
  welcome: {
    icon: '🎁',
    title: 'Welcome! Grab PrintNeat free',
    sub: 'The all-in-one app for 3D printing entrepreneurs. Free forever on LITE.'
  }
};

function showPopup(variant) {
  if (!_canShowPopup()) return;
  _buildPopup();
  var v = POPUP_VARIANTS[variant] || POPUP_VARIANTS.exit;
  document.getElementById('pp-icon').textContent = v.icon;
  document.getElementById('pp-title').textContent = v.title;
  document.getElementById('pp-sub').textContent = v.sub;
  document.getElementById('pp-email').value = localStorage.getItem('pn_email') || '';
  var bd = document.getElementById('pn-popup-backdrop');
  bd.style.display = 'flex';
  setTimeout(function() { bd.classList.add('visible'); }, 20);
  document.body.style.overflow = 'hidden';
  _popupShown = true;
  sessionStorage.setItem('pn_popup_shown', '1');
  track('popup_show', { variant: variant });
}

function closePopup() {
  var bd = document.getElementById('pn-popup-backdrop');
  if (!bd) return;
  bd.classList.remove('visible');
  setTimeout(function() { bd.style.display = 'none'; document.body.style.overflow = ''; }, 300);
  _popupDismissed = true;
  track('popup_dismiss');
}

function popupDownload() {
  var email = (document.getElementById('pp-email').value || '').trim();
  if (email) {
    localStorage.setItem('pn_email', email);
    fetch('https://formspree.io/f/xnjkrbqd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email: email, source: 'popup', tier: 'lite' })
    }).catch(function(){});
  }
  closePopup();
  setTimeout(function() { openModal('lite'); }, 350);
  track('popup_convert', { email: email ? 'yes' : 'no' });
}

// ── Triggers ──

// 1. EXIT INTENT — rato sobe para fora do viewport
document.addEventListener('mouseleave', function(e) {
  if (e.clientY <= 5) showPopup('exit');
});

// 2. TEMPO NA PÁGINA — 35 segundos
setTimeout(function() { showPopup('time'); }, 35000);

// 3. SCROLL — 65% da página
var _scrollPopupFired = false;
window.addEventListener('scroll', function() {
  if (_scrollPopupFired) return;
  var scrolled = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
  if (scrolled >= 0.65) {
    _scrollPopupFired = true;
    showPopup('scroll');
  }
}, { passive: true });

// 4. WELCOME — 6 segundos após entrada (só se nunca viu)
if (!localStorage.getItem('pn_visited')) {
  localStorage.setItem('pn_visited', '1');
  setTimeout(function() { showPopup('welcome'); }, 6000);
}
