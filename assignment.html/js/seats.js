const seatMap = Array.from({ length: 4 }, (_, row) => {
  return Array.from({ length: 8 }, (_, col) => {
    const number = `${String.fromCharCode(65 + row)}${col + 1}`;
    const type = row < 2 ? 'VIP' : 'General';
    return { seatNumber: number, type, status: 'available' };
  });
});

const pricing = { VIP: 160, General: 90 };
let selectedSeat = null;

function buildSeatChart() {
  const chart = document.getElementById('seatGrid');
  if (!chart) return;
  chart.innerHTML = seatMap.flat().map(seat => {
    return `<button class="seat ${seat.type.toLowerCase()}" data-seat-number="${seat.seatNumber}" data-seat-type="${seat.type}">${seat.seatNumber}</button>`;
  }).join('');

  chart.querySelectorAll('.seat').forEach(button => {
    button.addEventListener('click', () => {
      const number = button.dataset.seatNumber;
      const type = button.dataset.seatType;
      selectedSeat = { seatNumber: number, ticketType: type, ticketPrice: pricing[type] };
      updateSeatSummary();
      chart.querySelectorAll('.seat.selected').forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
    });
  });
}

function updateSeatSummary() {
  const summary = document.getElementById('seatSummary');
  if (!summary) return;
  if (!selectedSeat) {
    summary.innerHTML = '<p>No seat selected yet.</p>';
    return;
  }
  summary.innerHTML = `
    <p><strong>Seat:</strong> ${selectedSeat.seatNumber}</p>
    <p><strong>Section:</strong> ${selectedSeat.ticketType}</p>
    <p><strong>Price:</strong> $${selectedSeat.ticketPrice}</p>
  `;
}

function confirmBooking(event) {
  event.preventDefault();
  const user = JSON.parse(localStorage.getItem('ahpu_session') || localStorage.getItem('ahpu_remember') || 'null');
  if (!user) {
    localStorage.setItem('ahpu_post_login', 'seat-booking.html');
    window.location.href = 'login.html';
    return;
  }
  if (!selectedSeat) {
    alert('Please select a seat before confirming.');
    return;
  }
  localStorage.setItem('ahpu_booking', JSON.stringify({
    seatNumber: selectedSeat.seatNumber,
    ticketType: selectedSeat.ticketType,
    ticketPrice: selectedSeat.ticketPrice,
    status: 'Reserved',
    confirmedAt: new Date().toISOString()
  }));
  alert('Booking confirmed. You can now view details in your dashboard.');
  window.location.href = 'dashboard.html';
}

function initSeatBookingPage() {
  buildSeatChart();
  updateSeatSummary();
  document.getElementById('bookingForm')?.addEventListener('submit', confirmBooking);
}

document.addEventListener('DOMContentLoaded', initSeatBookingPage);
