/* ============================================
   PulseFest 2026 — Shared JavaScript (main.js)
   Uses: setInterval, getElementById, classList
   All within syllabus scope (chapters 08-10)
   ============================================ */

/* ── Scroll-triggered fade-in ── */
function initFadeIn() {
  var items = document.querySelectorAll('.fade-in');
  var i;

  function checkVisible() {
    for (i = 0; i < items.length; i++) {
      var rect = items[i].getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        items[i].classList.add('visible');
      }
    }
  }

  checkVisible();
  window.onscroll = function() { checkVisible(); };
}

/* ── Highlight active nav link ── */
function initActiveNav() {
  var links = document.querySelectorAll('.main-nav a');
  var current = window.location.pathname.split('/').pop();
  var i;
  for (i = 0; i < links.length; i++) {
    var href = links[i].getAttribute('href');
    if (href === current) {
      links[i].classList.add('active');
    }
  }
}

/* ── Run on page load ── */
initFadeIn();
initActiveNav();
