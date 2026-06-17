const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('a[href^="#"], .site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const page = document.body.dataset.page;
document.querySelectorAll(`[data-nav="${page}"]`).forEach((link) => link.classList.add('active'));

const form = document.querySelector('.signup-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const value = input?.value.trim();
    alert(value ? `Bedankt. ${value} is aangemeld voor de demo.` : 'Vul eerst een e-mailadres in.');
  });
}

const timelineList = document.querySelector('[data-timeline-list]');
const timelineSearch = document.querySelector('#timeline-search');
const filterChips = Array.from(document.querySelectorAll('.filter-chip'));
const emptyState = document.querySelector('[data-empty-state]');
let activeTimelineFilter = 'all';

function typeLabel(type) {
  const labels = { advies: 'Advies', besluit: 'Besluit', onderzoek: 'Onderzoek', lobby: 'Lobby', kamer: 'Kamer', wet: 'Wetgeving' };
  return labels[type] || type;
}

function renderTimeline(items) {
  if (!timelineList) return;
  timelineList.innerHTML = items.map((item) => `
    <article class="timeline-item" data-type="${item.type}" data-search="${item.titel} ${item.samenvatting} ${item.bronhouder} ${item.impact}">
      <div class="timeline-year">${item.jaar}</div>
      <div class="timeline-card">
        <span class="badge">${typeLabel(item.type)}</span>
        <h2>${item.titel}</h2>
        <p>${item.samenvatting}</p>
        <dl class="timeline-meta">
          <div><dt>Bronhouder</dt><dd>${item.bronhouder}</dd></div>
          <div><dt>Betekenis</dt><dd>${item.impact}</dd></div>
          ${item.link ? `<div><dt>Bron</dt><dd><a href="${item.link}" target="_blank" rel="noopener">Open bron</a></dd></div>` : ''}
        </dl>
      </div>
    </article>
  `).join('');
}

function updateTimelineVisibility() {
  if (!timelineList) return;
  const query = timelineSearch?.value.trim().toLowerCase() || '';
  const items = Array.from(timelineList.querySelectorAll('.timeline-item'));
  let visibleCount = 0;

  items.forEach((item) => {
    const type = item.dataset.type || '';
    const searchableText = `${item.dataset.search || ''} ${item.textContent || ''}`.toLowerCase();
    const matchesFilter = activeTimelineFilter === 'all' || type === activeTimelineFilter;
    const matchesQuery = !query || searchableText.includes(query);
    const shouldShow = matchesFilter && matchesQuery;
    item.hidden = !shouldShow;
    if (shouldShow) visibleCount += 1;
  });

  if (emptyState) emptyState.hidden = visibleCount !== 0;
}

async function initTimeline() {
  if (!timelineList) return;
  try {
    const response = await fetch('data/timeline.json');
    const timelineData = await response.json();
    renderTimeline(timelineData);
    updateTimelineVisibility();
  } catch (error) {
    timelineList.innerHTML = '<p>De tijdlijn kon niet worden geladen. Controleer of data/timeline.json bestaat.</p>';
    console.error(error);
  }
}

if (timelineSearch) timelineSearch.addEventListener('input', updateTimelineVisibility);
filterChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    activeTimelineFilter = chip.dataset.filter || 'all';
    filterChips.forEach((button) => button.classList.remove('active'));
    chip.classList.add('active');
    updateTimelineVisibility();
  });
});

initTimeline();
