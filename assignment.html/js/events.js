const eventCatalog = [
  {
    id: 'afterhours',
    name: 'AfterHours',
    category: 'Main Stage',
    genre: 'Electronic',
    date: 'Nov 8, 2026',
    venue: 'Neon Dome',
    venueDetail: 'Main stage with full laser production and crowd lighting.',
    time: '22:00 - 00:30',
    location: 'Neon Dome',
    performers: ['DJ Flux', 'Nova Rae', 'Echo Drift'],
    description: 'A thunderous headline show with neon lasers, immersive visuals, and an epic closing performance.',
    price: 'VIP & General',
    image: '../../assets/images/After%20Hours.png',
    slug: 'afterhours.html'
  },
  {
    id: 'midnightpulse',
    name: 'Midnight Pulse',
    category: 'Secondary Stage',
    genre: 'Synthwave',
    date: 'Nov 8, 2026',
    venue: 'Pulse Garden',
    venueDetail: 'A glowing venue area with strong synthwave atmosphere.',
    time: '20:00 - 22:00',
    location: 'Pulse Garden',
    performers: ['Luna Vector', 'Pulse Drive'],
    description: 'An electric concert experience with multimedia art and crowd-driven energy.',
    price: 'General',
    image: '../../assets/images/Midnight%20Pulse.png',
    slug: 'midnightpulse.html'
  },
  {
    id: 'neonlounge',
    name: 'Neon Lounge Session',
    category: 'After Party',
    genre: 'House',
    date: 'Nov 9, 2026',
    venue: 'Lounge Terrace',
    venueDetail: 'Late-night lounge stage with ambient neon visuals.',
    time: '00:45 - 02:30',
    location: 'Lounge Terrace',
    performers: ['Satin Wave', 'The Glow Set'],
    description: 'A chill late-night set featuring rising DJs and luminous installations.',
    price: 'General',
    image: '../../assets/images/Neon%20Lounge.png',
    slug: 'events.html'
  }
];

function renderEventsList() {
  var container = document.getElementById('eventCards');
  var searchTerm = document.getElementById('eventSearch')?.value.trim().toLowerCase() || '';
  if (!container) return;

  var filtered = [];
  for (var i = 0; i < eventCatalog.length; i++) {
    var e = eventCatalog[i];
    var text = (e.name + ' ' + e.description + ' ' + e.genre + ' ' + e.venue).toLowerCase();
    if (text.indexOf(searchTerm) !== -1 || searchTerm === '') {
      filtered.push(e);
    }
  }

  var html = '';
  for (var j = 0; j < filtered.length; j++) {
    var ev = filtered[j];
    html += '<article class="event-card">';
    html += '<img class="event-card-image" src="' + ev.image + '" alt="' + ev.name + '">';
    html += '<h3>' + ev.name + '</h3>';
    html += '<p>' + ev.description + '</p>';
    html += '<p class="event-performers"><strong>Performers:</strong> ' + ev.performers.join(', ') + '</p>';
    html += '<div class="event-meta">' + ev.genre + ' · ' + ev.date + ' · ' + ev.venue + '</div>';
    html += '<div class="event-actions"><a class="btn" href="' + ev.slug + '">View Details</a></div>';
    html += '</article>';
  }
  container.innerHTML = html;
}

function initEventsPage() {
  var searchInput = document.getElementById('eventSearch');
  if (searchInput) {
    searchInput.addEventListener('input', renderEventsList);
  }
  renderEventsList();
}

document.addEventListener('DOMContentLoaded', initEventsPage);
