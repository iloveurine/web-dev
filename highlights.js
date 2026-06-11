/* ============================================
   highlights.js
   Features: ticket card highlight toggle
   Syllabus: DOM, functions, loops (ch08-09)
   ============================================ */

function initTicketCards() {
  var cards = document.querySelectorAll('.ticket-card');
  var i;

  for (i = 0; i < cards.length; i++) {
    cards[i].onclick = function() {
      var allCards = document.querySelectorAll('.ticket-card');
      var j;
      for (j = 0; j < allCards.length; j++) {
        allCards[j].classList.remove('selected');
      }
      this.classList.add('selected');
    };
  }
}

window.onload = function() {
  initTicketCards();
};
 