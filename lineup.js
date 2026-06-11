/* ============================================
   lineup.js
   Features: day tab switching
   Syllabus: DOM, functions, loops (ch08-09)
   ============================================ */

function switchDay(day, btn) {
  var grids = document.querySelectorAll('.artist-grid');
  var tabs = document.querySelectorAll('.day-tab');
  var i;

  // Deactivate all tabs
  for (i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('active');
  }
  btn.classList.add('active');

  // Hide all grids
  for (i = 0; i < grids.length; i++) {
    grids[i].classList.add('hidden');
  }

  // Show selected grid
  var target = document.getElementById('day-' + day);
  if (target) {
    target.classList.remove('hidden');
  }
}