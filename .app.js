const CATEGORIES = [
  { key: 'all', ug: 'ھەممىسى' },
  { key: 'action', ug: 'ئەكسىيە' },
  { key: 'comedy', ug: 'كومېدىيە' },
  { key: 'drama', ug: 'دراما' },
  { key: 'horror', ug: 'قورقۇنچ' },
  { key: 'scifi', ug: 'ئىلمىي فانتاستىكا' },
  { key: 'romance', ug: 'مۇھەببەت' },
  { key: 'animation', ug: 'ئەنئەنىۋى' },
  { key: 'doc', ug: 'ھۆججەتلىك' },
];

const STORAGE_KEY = 'kinoxana-favorites';

const MOVIES = [
  { id: 'm1', title: 'يۇلتۇزلار ئارا', category: 'scifi', year: '2014', rating: '9.2', duration: '169 مىنۇت', director: 'كرىستوفېر نولان', desc: 'بىر گۇرۇپپا ئالەم ئۇچقۇچىلىرى يېڭى ماكان ئىزدەيدۇ.', color: '#2b3a55' },
  { id: 'm2', title: 'شەھەر چىراغلىرى', category: 'drama', year: '2019', rating: '8.4', duration: '128 مىنۇت', director: 'لى يۈ', desc: 'چوڭ شەھەردە ياشلىق چۈشى ۋە ئەمەلىيەت ئوتتۇرىسىدىكى تاللىش.', color: '#553b2b' },
  { id: 'm3', title: 'كۈلكە كۈنى', category: 'comedy', year: '2021', rating: '7.8', duration: '104 مىنۇت', director: 'ئەنۋەر', desc: 'بىر ئائىلىنىڭ كۈندىلىك تۇرمۇشىدىكى كۈلكىلىك ۋەقەلەر.', color: '#3a553b' },
  { id: 'm4', title: 'قاراڭغۇ ئۆي', category: 'horror', year: '2018', rating: '7.1', duration: '96 مىنۇت', director: 'سارا', desc: 'بىر كونا ئۆيدە يوشۇرۇنغان سىرلار.', color: '#2b2b2b' },
  { id: 'm5', title: 'مۇھەببەت خېتى', category: 'romance', year: '2020', rating: '8.0', duration: '112 مىنۇت', director: 'نۇرىيە', desc: 'ئىككى ياشنىڭ خەت ئارقىلىق تونۇشۇشى.', color: '#552b45' },
  { id: 'm6', title: 'پولات قول', category: 'action', year: '2022', rating: '8.6', duration: '134 مىنۇت', director: 'جون', desc: 'بىر قەھرىماننىڭ ئادالەت ئۈچۈن كۈرىشى.', color: '#553a2b' },
  { id: 'm7', title: 'كۈچۈك قوش', category: 'animation', year: '2023', rating: '8.9', duration: '98 مىنۇت', director: 'مىيا', desc: 'بىر كىچىك قوشنىڭ ئۇچۇشنى ئۆگىنىشى.', color: '#2b5548' },
  { id: 'm8', title: 'دېڭىز ئاستى', category: 'doc', year: '2021', rating: '9.0', duration: '88 مىنۇت', director: 'بېك', desc: 'دېڭىز ئاستىدىكى ھاياتلىقنىڭ ھەيران قالارلىق مەنزىرىسى.', color: '#1f3a55' },
  { id: 'm9', title: 'ئالەم سىرى', category: 'scifi', year: '2023', rating: '8.3', duration: '142 مىنۇت', director: 'لى', desc: 'ئىنسانىيەتنىڭ يېڭى پلانېتىغا كۆچۈش سەپىرى.', color: '#332b55' },
  { id: 'm10', title: 'ياز كۈنلىرى', category: 'drama', year: '2017', rating: '7.6', duration: '118 مىنۇت', director: 'ئاي', desc: 'بىر يازدا يۈز بەرگەن ئۆسمۈرلۈك ھېكايىسى.', color: '#55502b' },
].map((m) => ({
  ...m,
  poster: `data:image/svg+xml;utf8,${encodeURIComponent(posterSvg(m))}`,
  video: '',
}));

const favorites = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));

const $ = (id) => document.getElementById(id);

function posterCard(movie) {
  const el = document.createElement('div');
  el.className = 'poster-card';
  el.innerHTML = `
    <div class="pc-img">
      <img src="${movie.poster}" alt="${movie.title}" loading="lazy" />
      <div class="pc-overlay">
        <span class="pc-score">★ ${movie.rating}</span>
        <span class="pc-year">${movie.year}</span>
      </div>
    </div>
    <div class="pc-title">${movie.title}</div>
  `;
  el.addEventListener('click', () => openDetail(movie));
  return el;
}

function posterSvg(movie) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${movie.color}"/>
        <stop offset="100%" stop-color="#000000"/>
      </linearGradient>
    </defs>
    <rect width="400" height="600" fill="url(#g)"/>
    <rect width="400" height="600" fill="rgba(0,0,0,0.28)"/>
    <circle cx="315" cy="120" r="90" fill="rgba(255,255,255,0.08)"/>
    <circle cx="110" cy="520" r="150" fill="rgba(0,0,0,0.18)"/>
    <text x="50%" y="46%" fill="#fff" font-size="28" font-weight="700" text-anchor="middle" font-family="Arial, sans-serif">${escapeXml(movie.title)}</text>
    <text x="50%" y="55%" fill="#d0d4dc" font-size="18" text-anchor="middle" font-family="Arial, sans-serif">${movie.year}</text>
    <text x="36" y="48" fill="#ffd166" font-size="16" font-weight="700" font-family="Arial, sans-serif">★ ${movie.rating}</text>
  </svg>`;
}

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]));
}

function renderRows() {
  const today = MOVIES.slice(0, 6);
  const fresh = [...MOVIES].reverse().slice(0, 6);
  const top = [...MOVIES].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 6);
  $('rowToday').replaceChildren(...today.map(posterCard));
  $('rowNew').replaceChildren(...fresh.map(posterCard));
  $('rowTop').replaceChildren(...top.map(posterCard));
}

function renderCategories() {
  const chips = $('categoryChips');
  chips.replaceChildren(...CATEGORIES.map((c) => {
    const b = document.createElement('button');
    b.className = 'chip' + (c.key === activeCategory ? ' is-active' : '');
    b.type = 'button';
    b.textContent = c.ug;
    b.addEventListener('click', () => {
      activeCategory = c.key;
      renderCategories();
      renderCategoryGrid();
    });
    return b;
  }));
  renderCategoryGrid();
}

let activeCategory = 'all';

function renderCategoryGrid() {
  const list = activeCategory === 'all' ? MOVIES : MOVIES.filter((m) => m.category === activeCategory);
  $('categoryGrid').replaceChildren(...list.map(posterCard));
}

function renderSearch(query) {
  const q = (query || '').trim();
  const list = q
    ? MOVIES.filter((m) => `${m.title} ${m.director} ${m.category}`.includes(q))
    : MOVIES.slice(0, 9);
  $('searchGrid').replaceChildren(...list.map(posterCard));
  $('searchEmpty').hidden = list.length > 0;
  $('searchHint').textContent = q ? 'ئىزدەش نەتىجىسى' : 'قىزىق ئىزدەشلەر';
}

function renderFavorites() {
  const list = MOVIES.filter((m) => favorites.has(m.id));
  $('favoritesGrid').replaceChildren(...list.map(posterCard));
  $('favoritesEmpty').hidden = list.length > 0;
}

function openDetail(movie) {
  const poster = $('detailPoster');
  const video = $('detailVideo');
  const player = $('player');
  const canPlayVideo = Boolean(movie.video && movie.video.trim());

  poster.src = movie.poster;
  poster.alt = movie.title;
  video.hidden = true;
  video.pause();
  if (canPlayVideo) {
    if (video.src !== movie.video) video.src = movie.video;
  } else {
    video.removeAttribute('src');
  }
  player.hidden = false;

  $('detailTitle').textContent = movie.title;
  $('detailMeta').textContent = `${movie.year} · ${movie.rating} · ${movie.duration} · ${movie.director}`;
  $('detailDesc').textContent = movie.desc;

  const startPlay = () => {
    if (!canPlayVideo) {
      player.hidden = false;
      video.hidden = true;
      return;
    }
    player.hidden = true;
    video.hidden = false;
    if (video.src !== movie.video) video.src = movie.video;
    video.play().catch(() => {});
  };

  $('playBtn').onclick = startPlay;
  $('detailPlay').onclick = startPlay;

  const favBtn = $('detailFavorite');
  const sync = () => {
    const on = favorites.has(movie.id);
    favBtn.textContent = on ? 'ياقتۇرۇلدى' : 'ياقتۇردۇم';
    favBtn.classList.toggle('is-on', on);
  };
  sync();
  favBtn.onclick = () => {
    favorites.has(movie.id) ? favorites.delete(movie.id) : favorites.add(movie.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
    sync();
    renderFavorites();
  };
  $('detail').hidden = false;
}

function closeDetail() { $('detail').hidden = true; }

function switchView(name) {
  ['home', 'categories', 'search', 'me', 'favorites'].forEach((v) => {
    $(`view-${v}`).hidden = v !== name;
  });
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('is-active', t.dataset.view === name));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 事件绑定
document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => switchView(tab.dataset.view));
});

$('searchToggle').addEventListener('click', () => switchView('search'));
$('searchInput').addEventListener('input', (e) => renderSearch(e.target.value));
$('homeSearchInput').addEventListener('focus', () => switchView('search'));

$('menuFavorites').addEventListener('click', () => { renderFavorites(); switchView('favorites'); });
$('favoritesBack').addEventListener('click', () => switchView('me'));

$('detailClose').addEventListener('click', closeDetail);
$('detail').addEventListener('click', (e) => { if (e.target === $('detail')) closeDetail(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetail(); });

// 初始化
renderRows();
renderCategories();
renderSearch('');
renderFavorites();