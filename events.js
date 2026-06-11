/* ============================================
   mainstage.js
   Features: schedule tab switching, countdown
   Syllabus: setInterval, Date(), functions,
             DOM, if/else (ch08-10)
   ============================================ */

/* ── Schedule tab switching ── */
function switchSchedule(day, btn) {
  var wraps = document.querySelectorAll('.schedule-wrap');
  var tabs = document.querySelectorAll('.day-tab');
  var i;

  for (i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  btn.classList.add('active');

  for (i = 0; i < wraps.length; i++) {
    wraps[i].classList.add('hidden');
  }

  var target = document.getElementById('sched-' + day);
  if (target) {
    target.classList.remove('hidden');
  }
}

/* ── Countdown to PulseFest (15 Aug 2026, 15:00) ── */
function startCountdown() {
  var festDate = new Date('2026-08-15T15:00:00');

  function updateCountdown() {
    var now = new Date();
    var diff = festDate.getTime() - now.getTime();

    if (diff <= 0) {
      document.getElementById('cd-days').innerHTML  = '00';
      document.getElementById('cd-hours').innerHTML = '00';
      document.getElementById('cd-mins').innerHTML  = '00';
      document.getElementById('cd-secs').innerHTML  = '00';
      return;
    }

    var days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var secs  = Math.floor((diff % (1000 * 60)) / 1000);

    // Pad to 2 digits
    if (days  < 10) { days  = '0' + days;  }
    if (hours < 10) { hours = '0' + hours; }
    if (mins  < 10) { mins  = '0' + mins;  }
    if (secs  < 10) { secs  = '0' + secs;  }

    document.getElementById('cd-days').innerHTML  = days;
    document.getElementById('cd-hours').innerHTML = hours;
    document.getElementById('cd-mins').innerHTML  = mins;
    document.getElementById('cd-secs').innerHTML  = secs;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

window.onload = function() {
  startCountdown();
};