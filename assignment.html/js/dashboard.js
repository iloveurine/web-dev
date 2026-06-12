function getSessionUser() {
  return JSON.parse(localStorage.getItem('ahpu_session') || localStorage.getItem('ahpu_remember') || 'null');
}

function getBooking() {
  return JSON.parse(localStorage.getItem('ahpu_booking') || 'null');
}

function getSavedEventIdsList() {
  return JSON.parse(localStorage.getItem('ahpu_bookmarks') || '[]');
}

function getEventById(eventId) {
  return eventCatalog.find(event => event.id === eventId);
}

function renderDashboard() {
  const user = getSessionUser();
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  document.getElementById('userName').textContent = user.fullName;
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('welcomeBanner').textContent = `Welcome back, ${user.fullName}`;

  const booking = getBooking();
  const ticketBlock = document.getElementById('ticketInfo');
  if (booking) {
    ticketBlock.innerHTML = `
      <p><strong>Ticket type:</strong> ${booking.ticketType}</p>
      <p><strong>Seat number:</strong> ${booking.seatNumber}</p>
      <p><strong>Status:</strong> ${booking.status}</p>
      <p><strong>Price:</strong> ${booking.ticketPrice}</p>
    `;
  } else {
    ticketBlock.innerHTML = '<p>No booking found yet. Reserve a seat to see ticket details.</p>';
  }

  const bookmarks = getSavedEventIdsList();
  const savedEvents = document.getElementById('savedEvents');
  if (bookmarks.length === 0) {
    savedEvents.innerHTML = '<p>You haven\'t saved any events yet.</p>';
  } else {
    savedEvents.innerHTML = bookmarks.map(id => {
      const event = getEventById(id);
      return event ? `
        <div class="saved-event">
          <img src="${event.image}" alt="${event.name}">
          <div class="event-summary">
            <h4>${event.name}</h4>
            <p>${event.category} &middot; ${event.time}</p>
            <p>${event.venue}</p>
          </div>
        </div>
      ` : '';
    }).join('');
  }

  const upcoming = document.getElementById('upcomingEvent');
  const nextEvent = getEventById(bookmarks[0]) || eventCatalog[0];
  if (nextEvent) {
    upcoming.innerHTML = `
      <div class="saved-event">
        <img src="${nextEvent.image}" alt="${nextEvent.name}">
        <div class="event-summary">
          <h4>${nextEvent.name}</h4>
          <p>${nextEvent.category} &middot; ${nextEvent.time}</p>
          <p>${nextEvent.venue}</p>
        </div>
      </div>
    `;
  } else {
    upcoming.textContent = 'No upcoming events selected.';
  }

  const announcements = document.getElementById('eventAnnouncements');
  announcements.innerHTML = `
    <li>VIP entry opens at 19:00 near Neon Dome.</li>
    <li>Doors close 10 minutes before the main set.</li>
    <li>Schedule updates will appear here in real time.</li>
  `;
}

function logoutUser() {
  localStorage.removeItem('ahpu_session');
  window.location.href = 'login.html';
}

function initDashboardPage() {
  if (!document.getElementById('dashboardPage')) return;
  renderDashboard();
  document.getElementById('logoutBtn')?.addEventListener('click', logoutUser);
}

document.addEventListener('DOMContentLoaded', initDashboardPage);
