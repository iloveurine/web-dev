const scheduleItems = [
  { day: 'Friday', stage: 'Neon Dome', type: 'Headline', time: '18:00 - 19:00', title: 'Opening Ceremony', venue: 'Main Stage', status: 'upcoming' },
  { day: 'Friday', stage: 'Neon Dome', type: 'Headline', time: '19:00 - 21:00', title: 'After Hours Concert', venue: 'Main Stage', status: 'upcoming' },
  { day: 'Friday', stage: 'Neon Dome', type: 'Secondary', time: '21:30 - 22:30', title: 'DJ Session', venue: 'Neon Arena', status: 'upcoming' },
  { day: 'Friday', stage: 'Neon Dome', type: 'After Party', time: '23:00 - 00:30', title: 'Closing Performance', venue: 'Main Stage', status: 'upcoming' },
  { day: 'Saturday', stage: 'Pulse Garden', type: 'Workshop', time: '16:00 - 17:30', title: 'Immersive Lighting Lab', venue: 'Sound Tent', status: 'upcoming' }
];

function getScheduleFilterValues() {
  return {
    day: document.getElementById('dayFilter')?.value || 'All',
    stage: document.getElementById('stageFilter')?.value || 'All',
    type: document.getElementById('typeFilter')?.value || 'All'
  };
}

function renderSchedule() {
  const { day } = getScheduleFilterValues();
  const cardContainer = document.getElementById('scheduleList');
  const tableBody = document.querySelector('#scheduleTable tbody');
  const todayHighlight = document.getElementById('todayHighlight');

  if (!cardContainer || !tableBody || !todayHighlight) return;

  const filtered = scheduleItems.filter(item => {
    return day === 'All' || item.day === day;
  });

  cardContainer.innerHTML = filtered.map(function(item) {
    return (
      '<div class="schedule-card">' +
      '<div class="schedule-card-header">' +
      '<span>Upcoming: ' + item.day + '</span>' +
      '</div>' +
      '<h3>' + item.title + '</h3>' +
      '<p>' + item.stage + ' · ' + item.time + ' · ' + item.type + '</p>' +
      '</div>'
    );
  }).join('');

  tableBody.innerHTML = filtered.map(function(item) {
    return (
      '<tr>' +
      '<td>' + item.time + '</td>' +
      '<td>' + item.title + '</td>' +
      '<td>' + item.venue + '</td>' +
      '<td>' + item.stage + '</td>' +
      '</tr>'
    );
  }).join('');

  var today = new Date().getDay();
  var dayName = '';
  if (today === 5) {
    dayName = 'Friday';
  }
  if (today === 6) {
    dayName = 'Saturday';
  }

  var todayEvents = [];
  for (var i = 0; i < scheduleItems.length; i++) {
    if (scheduleItems[i].day === dayName) {
      todayEvents.push(scheduleItems[i]);
    }
  }

  if (todayEvents.length > 0) {
    todayHighlight.textContent = 'Today\'s highlighted event: ' + todayEvents[0].title + ' at ' + todayEvents[0].time + '.';
  } else {
    todayHighlight.textContent = 'No events scheduled today.';
  }
}

function initSchedulePage() {
  var daySelect = document.getElementById('dayFilter');
  if (daySelect) {
    daySelect.addEventListener('change', renderSchedule);
  }
  renderSchedule();
}

document.addEventListener('DOMContentLoaded', initSchedulePage);
