/* =============================================================
   Udit Kumar — Portfolio
   assets/js/script.js   (vanilla JS, no dependencies)

   1.  Helpers
   2.  Footer year
   3.  Sticky navbar
   4.  Mobile navigation
   5.  Scroll spy
   6.  Scroll reveal
   7.  Card spotlight
   8.  Hero parallax
   9.  Contact form
   ============================================================= */

(function () {
  'use strict';

  /* ---------- 1. Helpers ---------- */
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = motionQuery.matches;
  // keep it live if the user flips the OS setting while the page is open
  var onMotionChange = function (e) { reduced = e.matches; };
  if (motionQuery.addEventListener) motionQuery.addEventListener('change', onMotionChange);
  else if (motionQuery.addListener) motionQuery.addListener(onMotionChange);

  function throttleRaf(fn) {
    var queued = false;
    return function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        fn();
      });
    };
  }

  /* ---------- 2. Footer year ---------- */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- 3. Sticky navbar ---------- */
  var nav = $('#nav');
  var onScrollNav = throttleRaf(function () {
    if (!nav) return;
    nav.classList.toggle('is-stuck', window.scrollY > 24);
  });
  window.addEventListener('scroll', onScrollNav, { passive: true });
  onScrollNav();

  /* ---------- 4. Mobile navigation ---------- */
  var burger   = $('#burger');
  var navLinks = $('#navLinks');
  var scrim    = $('#navScrim');

  function setMenu(open) {
    if (!burger || !navLinks) return;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navLinks.classList.toggle('is-open', open);
    document.body.classList.toggle('is-locked', open);
    if (scrim) scrim.hidden = !open;
  }

  function menuIsOpen() {
    return burger && burger.getAttribute('aria-expanded') === 'true';
  }

  if (burger) {
    burger.addEventListener('click', function () { setMenu(!menuIsOpen()); });
  }
  if (scrim) {
    scrim.addEventListener('click', function () { setMenu(false); });
  }

  // close after tapping a link
  $$('#navLinks a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  // Esc closes, and focus goes back to the toggle
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuIsOpen()) {
      setMenu(false);
      if (burger) burger.focus();
    }
  });

  // reset when resizing up to desktop
  window.addEventListener('resize', throttleRaf(function () {
    if (window.innerWidth > 760 && menuIsOpen()) setMenu(false);
  }));

  /* ---------- 5. Scroll spy ---------- */
  var sections = $$('main section[id]');
  var navAnchors = $$('#navLinks .nav__link');

  function markCurrent(id) {
    navAnchors.forEach(function (a) {
      var match = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-current', match);
      if (match) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) markCurrent(entry.target.id);
      });
    }, {
      // a band across the upper-middle of the viewport
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 6. Scroll reveal ----------
     Classes are added by JS so that content stays visible
     if JavaScript is unavailable.                          */
  var revealTargets = $$([
    '.about__head', '.about__body', '.fact',
    '.section__head', '.skill', '.project',
    '.service', '.step', '.contact'
  ].join(','));

  if (!reduced && 'IntersectionObserver' in window) {
    revealTargets.forEach(function (el, i) {
      el.classList.add('reveal');
      // a short stagger inside each group, capped so nothing lags behind
      el.style.transitionDelay = (Math.min(i % 6, 5) * 60) + 'ms';
    });

    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    revealTargets.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------- 7. Card spotlight ---------- */
  if (!reduced && window.matchMedia('(hover: hover)').matches) {
    $$('.skill').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- 8. Hero parallax ----------
     Nudges the 3D deck toward the pointer. Pure CSS keeps
     animating underneath; this only adds a small offset.    */
  var stage = $('#stage');
  var deck  = $('#deck');

  if (stage && deck && !reduced && window.matchMedia('(hover: hover)').matches) {
    var tiltX = 0, tiltY = 0, curX = 0, curY = 0, raf = null;

    stage.addEventListener('mousemove', function (e) {
      var r = stage.getBoundingClientRect();
      tiltY = ((e.clientX - r.left) / r.width  - 0.5) * 14; // left/right
      tiltX = ((e.clientY - r.top)  / r.height - 0.5) * 10; // up/down
      if (!raf) raf = window.requestAnimationFrame(loop);
    });

    stage.addEventListener('mouseleave', function () {
      tiltX = 0; tiltY = 0;
      if (!raf) raf = window.requestAnimationFrame(loop);
    });

    function loop() {
      curX += (tiltX - curX) * 0.08;
      curY += (tiltY - curY) * 0.08;
      deck.style.setProperty('transform',
        'rotateX(' + (58 - curX) + 'deg) rotateZ(' + (-42 + curY) + 'deg)');

      if (Math.abs(tiltX - curX) > 0.05 || Math.abs(tiltY - curY) > 0.05) {
        raf = window.requestAnimationFrame(loop);
      } else {
        raf = null;
        // hand control back to the idle CSS animation when at rest
        if (tiltX === 0 && tiltY === 0) deck.style.removeProperty('transform');
      }
    }
  }

  /* ---------- 9. Contact form ----------
     No backend: this composes a mailto: link, so the site stays
     a free static site. The address is read from the Email card
     above the form, so you only edit it in one place (index.html). */
  var form   = $('#contactForm');
  var status = $('#formStatus');

  if (form) {
    var fields = [
      { input: $('#fName'),  err: $('#fNameErr'),  test: function (v) { return v.trim().length > 1; } },
      { input: $('#fEmail'), err: $('#fEmailErr'), test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); } },
      { input: $('#fMsg'),   err: $('#fMsgErr'),   test: function (v) { return v.trim().length > 4; } }
    ];

    function validate(field) {
      if (!field.input) return true;
      var ok = field.test(field.input.value);
      field.input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (field.err) {
        field.err.hidden = ok;
        field.input.setAttribute('aria-describedby', ok ? '' : field.err.id);
      }
      return ok;
    }

    fields.forEach(function (field) {
      if (!field.input) return;
      field.input.addEventListener('blur', function () { validate(field); });
      field.input.addEventListener('input', function () {
        if (field.input.getAttribute('aria-invalid') === 'true') validate(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var allOk = true;
      var firstBad = null;
      fields.forEach(function (field) {
        var ok = validate(field);
        if (!ok && !firstBad) firstBad = field.input;
        allOk = allOk && ok;
      });

      if (!allOk) {
        if (status) status.textContent = 'Please fix the highlighted fields.';
        if (firstBad) firstBad.focus();
        return;
      }

      // pull the address out of the Email card so there is one source of truth
      var mailLink = $('.contact__mail');
      var to = mailLink
        ? (mailLink.getAttribute('href') || '').replace('mailto:', '').trim()
        : '';

      if (!to) {
        if (status) status.textContent = 'No email address is set on this site yet.';
        return;
      }

      var name = fields[0].input.value.trim();
      var from = fields[1].input.value.trim();
      var msg  = fields[2].input.value.trim();

      var subject = 'Project enquiry from ' + name;
      var body = name + ' (' + from + ') wrote:\n\n' + msg;

      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (status) status.textContent = 'Opening your email app…';
      form.reset();
    });
  }
})();
