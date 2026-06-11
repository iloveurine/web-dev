/* ============================================
   gallery.js
   Features: filter tabs, lightbox
   Syllabus: DOM manipulation, functions,
             if/else, arrays, loops (ch08-09)
   ============================================ */

/* ── Gallery filter ── */
function filterGallery(category, btn) {
  var items = document.querySelectorAll('.gallery-item');
  var buttons = document.querySelectorAll('.filter-btn');
  var i;

  // Update active button
  for (i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }
  btn.classList.add('active');

  // Show / hide items
  for (i = 0; i < items.length; i++) {
    var itemCat = items[i].getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      items[i].classList.remove('hidden');
    } else {
      items[i].classList.add('hidden');
    }
  }
}

/* ── Lightbox ── */
function openLightbox(el) {
  var img = el.querySelector('img');
  var caption = el.querySelector('.gallery-overlay span');

  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightboxImg').alt = img.alt;
  document.getElementById('lightboxCaption').innerHTML = caption ? caption.innerHTML : '';

  var box = document.getElementById('lightbox');
  box.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  var box = document.getElementById('lightbox');
  box.classList.remove('open');
  document.body.style.overflow = '';
}

// Close lightbox with Escape key
document.onkeydown = function(e) {
  if (e && e.key === 'Escape') {
    closeLightbox();
  }
};