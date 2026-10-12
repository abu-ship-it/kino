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
const HISTORY_KEY = 'kinoxana-watch-history';
const WATCHLIST_KEY = 'kinoxana-watchlist';
const PROGRESS_KEY = 'kinoxana-playback-progress';
const REVIEW_KEY = 'kinoxana-reviews';
const VOTE_KEY = 'kinoxana-weekly-vote';
const ARCHIVE_CACHE_TTL = 30 * 60 * 1000;
const COLLECTIONS = [
  { id: 'silent', title: 'جىمجىت كىنو دەۋرى', intro: 'ئاۋازسىز ئېكراندا ھېكايە كامېرا ھەرىكىتى، چىراي ئىپادىسى ۋە رىتىم بىلەن سۆزلىنىدۇ. بۇ ئۈچ فىلىم كىنو تىلىنىڭ قانداق شەكىللەنگەنلىكىنى كۆرسىتىدۇ.', movies: ['metropolis', 'last-laugh', 'the-general'] },
  { id: 'horror', title: 'قورقۇنچنىڭ باشلىنىشى', intro: 'سايە، بوشلۇق ۋە يوشۇرۇن تەھدىت ئارقىلىق قورقۇنچنىڭ ئۈچ دەۋرىنى كۆرۈڭ: گېرمانچە ئېكسپرېسىئونىزم، گوتىك چۈش ۋە زامانىۋى زومبى ھېكايىسى.', movies: ['nosferatu', 'night-living-dead', 'carnival-souls'] },
  { id: 'comedy', title: 'كومېدىيە ۋە چاپلىن', intro: 'جىمجىت كومېدىيەنىڭ بەدەن ھەرىكىتىدىن تېز دىئالوگقا قەدەر. كۈلكىنىڭ دەۋر ئۆزگىرىشىگە ئەگىشىپ قانداق يېڭىلانغانلىقىنى سېلىشتۇرۇڭ.', movies: ['the-kid', 'the-general', 'his-girl-friday'] },
  { id: 'noir', title: 'قارا كىنو ۋە قاراڭغۇ سىر', intro: 'تەقدىر، جىنايەت ۋە ئىشەنچسىز بايانچىنىڭ ئىزىدىن مېڭىڭ. «دېمېنتىيە 13» قارا كىنو ئەمەس، گوتىك قورقۇنچ بولۇپ، بۇ پروگراممىغا سېلىشتۇرۇش ئۈچۈن قوشۇلدى.', movies: ['detour', 'dementia-13'] },
];
const DAILY_NOTES = [
  'بۈگۈن يېڭى دۇنيالارغا نەزەر سېلىڭ.',
  'ياخشى ھېكايە كەيپىياتنى ئۆزگەرتىدۇ.',
  'بۈگۈن كەچتە بىر كىنوغا ۋاقىت ئاجرىتىڭ.',
  'يېڭى بىر ژانىرنى سىناپ بېقىڭ.',
  'ياخشى كىنو دوستلار بىلەن تېخىمۇ ياخشى.',
  'بۈگۈنكى تاللاش سىزنىڭ كەيپىياتىڭىزغا ماس.',
  'كىنو دۇنياسىدا بايقىغۇدەك يەنە نۇرغۇن نەرسە بار.',
];
const MOVIES = [
  { id: 'metropolis', archiveId: 'metropolis1927', title: 'مېتروپولىس', titleAlt: 'Metropolis', category: 'scifi', year: '1927', rating: '—', runtimeMinutes: 153, duration: '153 مىنۇت ئەتراپىدا', director: 'Fritz Lang', desc: 'كەلگۈسىدىكى شەھەردە، يەر ئۈستىدىكى بايلار بىلەن يەر ئاستىدىكى ئىشچىلار ئايرىم دۇنيادا ياشايدۇ.', recommendation: '1927-يىلدىكى بۇ ئەسەر كېيىنكى ئىلمىي فانتازىيەنىڭ شەكلىگە تەسىر كۆرسەتتى. يەر ئۈستىدىكى ھەيۋەت بىلەن يەر ئاستىدىكى ئەمگەك ھاياتىنىڭ سېلىشتۇرمىسىغا دىققەت قىلىڭ.', collections: ['silent', 'future'], premiere: '01-10', addedOn: '2026-10-12', color: '#604b32' },
  { id: 'last-laugh', archiveId: 'thelastlaugh', title: 'ئەڭ ئاخىرقى ئادەم', titleAlt: 'The Last Laugh', category: 'drama', year: '1924', rating: '—', runtimeMinutes: 90, duration: '90 مىنۇت ئەتراپىدا', director: 'F. W. Murnau', desc: 'ياشانغان مېھمانخانا دەرۋازىۋىنى خىزمىتى ۋە ئىززەت-ھۆرمىتىدىن ئايرىلىشقا دۇچ كېلىدۇ.', recommendation: 'كامېرانىڭ ئۆزى ھەرىكەت قىلىپ ھېكايە سۆزلەيدىغان ئۇسلۇبى بۇ فىلىمنى جىمجىت كىنو تىلىنىڭ مۇھىم باسقۇچىغا ئايلاندۇردى. دىئالوگ كارتىلىرىنىڭ ئازلىقىغا دىققەت قىلىڭ.', collections: ['silent'], color: '#5a4939' },
  { id: 'the-general', archiveId: 'The_General_1926', title: 'گېنېرال', titleAlt: 'The General', category: 'comedy', year: '1926', rating: '—', runtimeMinutes: 78, duration: '78 مىنۇت ئەتراپىدا', director: 'Buster Keaton, Clyde Bruckman', desc: 'پويىز شوپۇرى جەنۇب ئۇرۇشى مەزگىلىدە سۆيگىنى ۋە پويىزىنى قۇتقۇزۇشقا ئاتلىنىدۇ.', recommendation: 'بۇستېر كىتوننىڭ ئېنىق ۋاقىتلاشقان ھەرىكىتى ھەقىقىي پويىز ۋە مۇرەككەپ سەھنە ئىشلىتىش بىلەن بىرلەشكەن. كۈلكىنىڭ قانداق قىلىپ ھەرىكەتتىن چىقىدىغانلىقىنى كۆزىتىڭ.', collections: ['silent', 'comedy'], color: '#5c503d' },
  { id: 'nosferatu', archiveId: 'Nosferatu_1922', title: 'نوسفېراتۇ', titleAlt: 'Nosferatu', category: 'horror', year: '1922', rating: '—', runtimeMinutes: 94, duration: '94 مىنۇت ئەتراپىدا', director: 'F. W. Murnau', desc: 'ۋامپېر ئورلوك بىر كىچىك شەھەرگە قاراڭغۇلۇق ۋە ۋابا ئېلىپ كېلىدۇ.', recommendation: 'گېرمانچە ئېكسپرېسىئونىزم سايىنى ۋە ئۆتكۈر شەكىللەرنى قورقۇنچقا ئايلاندۇرىدۇ. ئورلوكنىڭ ئىشىك رامكىلىرىدا پەيدا بولۇشىغا دىققەت قىلىڭ.', collections: ['horror'], premiere: '03-04', addedOn: '2026-10-12', color: '#433b33' },
  { id: 'night-living-dead', archiveId: 'night_of_the_living_dead', title: 'تىرىك ئۆلۈكلەر كېچىسى', titleAlt: 'Night of the Living Dead', category: 'horror', year: '1968', rating: '—', runtimeMinutes: 96, duration: '96 مىنۇت ئەتراپىدا', director: 'George A. Romero', desc: 'نامەلۇم ئۆلۈكلەرنىڭ ھۇجۇمىدىن قېچىپ، بىر ئۆيدە قالغان كىشىلەر ھايات قېلىش ئۈچۈن كۈرەش قىلىدۇ.', recommendation: 'رومېرونىڭ تۆۋەن خامچوتلۇق فىلىمى زامانىۋى زومبى ھېكايىلىرىگە يول ئاچتى. سىرتتىكى خەتەر بىلەن ئۆي ئىچىدىكى ئىختىلاپنىڭ تەڭ كۈچىيىشىگە قاراڭ.', collections: ['horror'], color: '#45413a' },
  { id: 'carnival-souls', archiveId: 'carnival_of_souls', title: 'روھلار كارناۋالى', titleAlt: 'Carnival of Souls', category: 'horror', year: '1962', rating: '—', runtimeMinutes: 78, duration: '78 مىنۇت ئەتراپىدا', director: 'Herk Harvey', desc: 'ھادىسەدىن ئامان قالغان بىر ئايال تاشلاندۇق كۆڭۈل ئېچىش باغچىسىغا قايتا-قايتا تارتىلىدۇ.', recommendation: 'كىچىك خامچوت، بىكار بوشلۇق ۋە غەلىتە ئاۋاز بۇ فىلىمنى كېيىنكى پىسخىكىلىق قورقۇنچقا تەسىر كۆرسەتكەن ئەسەر قىلدى. مۇھىتنىڭ ئۆزىنىڭ قانداق قىلىپ پېرسوناژغا ئايلىنىدىغانلىقىنى سەزىڭ.', collections: ['horror'], color: '#4c443b' },
  { id: 'the-kid', archiveId: 'The_Kid_1921', title: 'بالا', titleAlt: 'The Kid', category: 'comedy', year: '1921', rating: '—', runtimeMinutes: 68, duration: '68 مىنۇت ئەتراپىدا', director: 'Charles Chaplin', desc: 'سەرگەردان بىر بوۋاقنى بېقىۋېلىپ، ئۇنىڭ بىلەن كۈلكە ۋە قىيىنچىلىققا تولغان ھاياتنى باشتىن كەچۈرىدۇ.', recommendation: 'چاپلىن كومېدىيە بىلەن مېلودرامىنى بىرلەشتۈرۈپ، جىمجىت كىنو پېرسوناژلىرىغا چوڭقۇر ھېسسىيات بەردى. كۈلكە بىلەن كۆڭۈل يېرىملىقنىڭ قانداق نۆۋەتلىشىدىغانلىقىغا دىققەت قىلىڭ.', collections: ['comedy', 'silent'], color: '#645644' },
  { id: 'his-girl-friday', archiveId: 'his_girl_friday', title: 'ئۇنىڭ قىز دوستى جۈمە', titleAlt: 'His Girl Friday', category: 'comedy', year: '1940', rating: '—', runtimeMinutes: 92, duration: '92 مىنۇت ئەتراپىدا', director: 'Howard Hawks', desc: 'مۇخبىر خىلدىي جونسون قايتا توي قىلىشتىن بۇرۇن ئاخىرقى بىر خەۋەرنى يېزىشقا كىرىشىدۇ.', recommendation: 'تېز سۆھبەت ۋە ئۈستى-ئۈستىگە كىرگەن دىئالوگ كېيىنكى خىزمەت ئورنى كومېدىيەلىرىنىڭ رىتىمىغا تەسىر كۆرسەتتى. ئارتىسلارنىڭ قەستەن بىر-بىرىنىڭ گېپىنى بۆلۈشىنى ئاڭلاڭ.', collections: ['comedy'], color: '#5c4938' },
  { id: 'detour', archiveId: 'detour_1945', title: 'بۇرۇلۇش', titleAlt: 'Detour', category: 'drama', year: '1945', rating: '—', runtimeMinutes: 68, duration: '68 مىنۇت ئەتراپىدا', director: 'Edgar G. Ulmer', desc: 'نيۇيوركقا بارماقچى بولغان پىئانىنوچىنىڭ يول ئۈستىدىكى قارارى ئۇنى جىنايەت ۋە تەقدىر تۇزىقىغا باشلايدۇ.', recommendation: 'بىر قىسىم سەھنە ۋە تار خامچوتقا قارىماي، بۇ نوئار كىنو ئۈمىدسىز بايانچىسى بىلەن تەسىر قالدۇردى. ئالېكنىڭ ئۆزىنى ئاقلاش سۆزلىرىنى قانچىلىك ئىشەنچلىك دەپ قارايدىغانلىقىڭىزنى ئويلاڭ.', collections: ['noir'], color: '#3d3935' },
  { id: 'dementia-13', archiveId: 'dementia_13', title: 'دېمېنتىيە 13', titleAlt: 'Dementia 13', category: 'horror', year: '1963', rating: '—', runtimeMinutes: 75, duration: '75 مىنۇت ئەتراپىدا', director: 'Francis Ford Coppola', desc: 'كونا قەلئەدىكى بىر ئائىلە ئۆتمۈشتىكى ئۆلۈم ۋە يېڭى جىنايەتنىڭ سىرىغا پېتىپ قالىدۇ.', recommendation: 'كوپپولانىڭ دەسلەپكى گوتىك قورقۇنچ فىلىمىدە سايە ۋە قەلئە كەيپىياتى مۇھىم رول ئوينايدۇ. بۇ ئەسەرنىڭ تىپىك نوئار ئەمەس، بەلكى قورقۇنچ ژانىرىغا تەۋە ئىكەنلىكىنى سېلىشتۇرۇپ كۆرۈڭ.', collections: ['noir', 'horror'], rightsReview: true, color: '#433c35' },
].map((movie) => ({
  ...movie,
  poster: `https://archive.org/services/img/${encodeURIComponent(movie.archiveId)}`,
}));

const $ = (id) => document.getElementById(id);
const favorites = new Map();
const watchlist = new Map();
const history = loadHistory();
let dailyRecommendation = null;
let currentMovies = [...MOVIES];
let searchRequest = 0;
let searchTimer;
let searchController = null;
let detailController = null;
const archiveCache = new Map();
let activeCollection = 'all';
let activeMovie = null;
let detailRequestId = 0;

function loadHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter((entry) => entry?.movie?.id) : [];
  } catch {
    return [];
  }
}

function saveFavorites() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites.values()]));
}

function hydrateFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!Array.isArray(saved)) return;
    saved.forEach((entry) => {
      const movie = typeof entry === 'string'
        ? MOVIES.find((item) => item.id === entry)
        : entry?.id ? entry : null;
      if (movie) favorites.set(movie.id, movie);
    });
    saveFavorites();
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function hydrateWatchlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || '[]');
    if (!Array.isArray(saved)) return;
    saved.forEach((movie) => {
      if (movie?.id) watchlist.set(movie.id, movie);
    });
  } catch {
    localStorage.removeItem(WATCHLIST_KEY);
  }
}

hydrateFavorites();
hydrateWatchlist();

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
  </svg>`;
}

function escapeXml(value) {
  return String(value).replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character]);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function posterData(movie) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(posterSvg(movie))}`;
}

function addPosterFallback(image, movie) {
  image.onerror = () => {
    image.onerror = null;
    image.src = posterData(movie);
  };
}

function posterCard(movie) {
  const el = document.createElement('div');
  el.className = 'poster-card';
  el.innerHTML = `
    <div class="pc-img">
      <img alt="${escapeHtml(movie.title)}" loading="lazy" />
      <div class="pc-overlay">
        ${movie.rating !== '—' ? `<span class="pc-score">★ ${escapeHtml(movie.rating)}</span>` : ''}
        <span class="pc-year">${escapeHtml(movie.year)}</span>
      </div>
    </div>
    <div class="pc-title">${escapeHtml(movie.title)}</div>
  `;
  const image = el.querySelector('img');
  addPosterFallback(image, movie);
  image.src = movie.poster;
  el.addEventListener('click', () => openDetail(movie));
  return el;
}

function renderRows() {
  const today = getDailyMovies();
  const weekNumber = Math.floor(Date.now() / (7 * 86400000));
  const weeklyCollection = COLLECTIONS[weekNumber % COLLECTIONS.length];
  const weeklyMovie = currentMovies.find((movie) => movie.id === weeklyCollection.movies[0]) || currentMovies[0];
  const dateKey = new Date().toISOString().slice(5, 10);
  const premieredToday = currentMovies.filter((movie) => movie.premiere === dateKey);
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 6);
  const newMovies = currentMovies.filter((movie) => movie.addedOn && new Date(`${movie.addedOn}T00:00:00`) >= new Date(thisWeek.toDateString()));
  const watchedIds = new Set(history.map((entry) => entry.movie.id));
  const categoryWeights = new Map();
  favorites.forEach((movie) => categoryWeights.set(movie.category, (categoryWeights.get(movie.category) || 0) + 3));
  history.forEach((entry) => categoryWeights.set(entry.movie.category, (categoryWeights.get(entry.movie.category) || 0) + 2));
  const personalized = [...currentMovies]
    .filter((movie) => !watchedIds.has(movie.id) && !favorites.has(movie.id))
    .sort((a, b) => ((categoryWeights.get(b.category) || 0) * 10 + Number(b.rating)) - ((categoryWeights.get(a.category) || 0) * 10 + Number(a.rating)))
    .slice(0, 6);
  $('continueSection').hidden = history.length === 0;
  $('rowContinue').replaceChildren(...history.slice(0, 8).map((entry) => posterCard(entry.movie)));
  $('personalizedRow').hidden = categoryWeights.size === 0 || personalized.length === 0;
  $('rowPersonalized').replaceChildren(...personalized.map(posterCard));
  $('weeklyPoster').src = weeklyMovie.poster;
  $('weeklyPoster').alt = weeklyCollection.title;
  $('weeklyTitle').textContent = weeklyCollection.title;
  $('weeklyIntro').textContent = weeklyCollection.intro;
  $('weeklyOpen').onclick = () => openCollection(weeklyCollection.id);
  $('historyNote').textContent = premieredToday.length
    ? `بۈگۈن ${premieredToday.map((movie) => `${movie.year}-يىلى «${movie.title}» تۇنجى قېتىم قويۇلغان.`).join(' ')} `
    : 'بۈگۈن ئۈچۈن خاتىرىلەنگەن تۇنجى قويۇلۇش يوق؛ كلاسسىكلارنى ئەركىن ئايلىنىپ كۆرۈڭ.';
  $('rowHistory').replaceChildren(...(premieredToday.length ? premieredToday : getDailyMovies().slice(0, 2)).map(posterCard));
  $('rowNew').replaceChildren(...newMovies.slice(0, 2).map(posterCard));
  $('newMoviesNote').textContent = newMovies.length ? 'بۇ ھەپتىنىڭ يېڭى قوشۇلغان تاللانمىلىرى.' : 'بۇ ھەپتە يېڭى فىلىم قوشۇلمىدى؛ ھەپتىلىك تېمىنى كۆرۈڭ.';
  $('collectionList').replaceChildren(...[
    ...COLLECTIONS,
  ].map((collection) => {
    const button = document.createElement('button');
    button.className = 'collection-tile';
    button.type = 'button';
    button.textContent = collection.title;
    button.addEventListener('click', () => openCollection(collection.id));
    return button;
  }));
  $('rowToday').replaceChildren(...today.map(posterCard));
}

function getDailyMovies() {
  if (!currentMovies.length) return [];
  const dayNumber = Math.floor(Date.now() / 86400000);
  const start = dayNumber % currentMovies.length;
  const featured = currentMovies.filter((movie) => movie.premiere === new Date().toISOString().slice(5, 10));
  const remaining = Array.from({ length: currentMovies.length }, (_, index) => currentMovies[(start + index) % currentMovies.length])
    .filter((movie) => !featured.some((item) => item.id === movie.id));
  return [...featured, ...remaining].slice(0, 6);
}

function renderHero() {
  const movie = getDailyMovies()[0];
  if (!movie) return;
  addPosterFallback($('heroPoster'), movie);
  $('heroPoster').src = movie.poster;
  $('heroPoster').alt = movie.title;
  $('heroTitle').textContent = movie.title;
  $('heroMeta').textContent = `${movie.year} · ★ ${movie.rating}`;
  $('dailyNote').textContent = 'ئەسلىدىكى كىنولار، ئەبەدىي چۈشلەر';
  $('heroDetails').onclick = () => openDetail(movie);
  const favoriteButton = $('heroFavorite');
  const syncFavorite = () => {
    const saved = favorites.has(movie.id);
    favoriteButton.textContent = saved ? '♥' : '♡';
    favoriteButton.classList.toggle('is-on', saved);
  };
  syncFavorite();
  favoriteButton.onclick = () => toggleFavorite(movie, syncFavorite);
}

function refreshMovieViews() {
  renderHero();
  renderRows();
  renderCategories();
  renderSearch($('searchInput').value);
  renderFavorites();
}

function renderCategories() {
  $('collectionGrid').replaceChildren(...COLLECTIONS.map((collection) => {
    const button = document.createElement('button');
    button.className = `collection-card${activeCollection === collection.id ? ' is-active' : ''}`;
    button.type = 'button';
    button.innerHTML = `<strong>${escapeHtml(collection.title)}</strong><span>${escapeHtml(collection.intro)}</span><small>${collection.movies.length} كىنو</small>`;
    button.addEventListener('click', () => {
      activeCollection = activeCollection === collection.id ? 'all' : collection.id;
      renderCategories();
    });
    return button;
  }));
  renderCategoryGrid();
}

function renderCategoryGrid() {
  const collection = COLLECTIONS.find((item) => item.id === activeCollection);
  const maximum = Number($('maxRuntime').value);
  const era = $('eraFilter').value;
  const ids = collection ? collection.movies : currentMovies.map((movie) => movie.id);
  const list = ids.map((id) => currentMovies.find((movie) => movie.id === id)).filter(Boolean)
    .filter((movie) => !maximum || movie.runtimeMinutes <= maximum)
    .filter((movie) => era === 'all' || Math.floor(Number(movie.year) / 10) * 10 === Number(era));
  $('collectionMovies').replaceChildren(...list.map(posterCard));
}

function renderSearch(query, results = null) {
  const q = (query || '').trim();
  const list = results || (q
    ? currentMovies.filter((m) => `${m.title} ${m.titleAlt || ''} ${m.director}`.toLocaleLowerCase().includes(q.toLocaleLowerCase()))
    : currentMovies.slice(0, 9));
  $('searchGrid').replaceChildren(...list.map(posterCard));
  $('searchEmpty').hidden = list.length > 0;
  $('searchHint').textContent = q ? 'ئىزدەش نەتىجىسى' : 'قىزىق ئىزدەشلەر';
}

function renderFavorites() {
  const list = [...favorites.values()].sort((a, b) => a.title.localeCompare(b.title));
  $('favoritesGrid').replaceChildren(...list.map(posterCard));
  $('favoritesEmpty').hidden = list.length > 0;
}

function renderWatchlist() {
  const list = [...watchlist.values()].sort((a, b) => a.title.localeCompare(b.title));
  $('watchlistGrid').replaceChildren(...list.map(posterCard));
  $('watchlistEmpty').hidden = list.length > 0;
}

function toggleFavorite(movie, afterChange = () => {}) {
  favorites.has(movie.id) ? favorites.delete(movie.id) : favorites.set(movie.id, { ...movie });
  saveFavorites();
  afterChange();
  renderFavorites();
  renderRows();
}

function toggleWatchlist(movie, afterChange = () => {}) {
  watchlist.has(movie.id) ? watchlist.delete(movie.id) : watchlist.set(movie.id, { ...movie });
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...watchlist.values()]));
  afterChange();
  renderWatchlist();
}

function recordWatch(movie) {
  const watchedAt = Date.now();
  const next = history.filter((entry) => entry.movie.id !== movie.id);
  next.unshift({ movie: { ...movie }, watchedAt });
  history.splice(0, history.length, ...next.slice(0, 30));
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderRows();
}

function readStoredObject(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function archiveFileUrl(identifier, name) {
  return `https://archive.org/download/${encodeURIComponent(identifier)}/${name.split('/').map(encodeURIComponent).join('/')}`;
}

async function fetchArchiveMetadata(movie, signal) {
  const cached = archiveCache.get(movie.archiveId);
  if (cached && Date.now() - cached.savedAt < ARCHIVE_CACHE_TTL) return cached.data;
  const requestItem = async (identifier) => {
    const response = await fetch(`https://archive.org/metadata/${encodeURIComponent(identifier)}`, {
      headers: { accept: 'application/json' },
      signal,
    });
    return response.ok ? response.json() : null;
  };
  let data = await requestItem(movie.archiveId);
  if (!data?.metadata) {
    const searchUrl = new URL('https://archive.org/advancedsearch.php');
    searchUrl.searchParams.set('q', `mediatype:movies AND title:"${movie.titleAlt}"`);
    ['identifier', 'title', 'mediatype'].forEach((field) => searchUrl.searchParams.append('fl[]', field));
    searchUrl.searchParams.set('rows', '10');
    searchUrl.searchParams.set('output', 'json');
    const searchResponse = await fetch(searchUrl, { headers: { accept: 'application/json' }, signal });
    if (searchResponse.ok) {
      const search = await searchResponse.json();
      const expectedTitle = movie.titleAlt.toLocaleLowerCase();
      const candidate = search.response?.docs?.find((entry) => entry.mediatype === 'movies'
        && entry.title?.toLocaleLowerCase().includes(expectedTitle));
      if (candidate?.identifier) {
        data = await requestItem(candidate.identifier);
        if (data?.metadata) {
          movie.archiveId = candidate.identifier;
          movie.poster = `https://archive.org/services/img/${encodeURIComponent(candidate.identifier)}`;
        }
      }
    }
  }
  if (!data?.metadata || (data.metadata.mediatype && data.metadata.mediatype !== 'movies')) throw new Error('Archive item not found');
  archiveCache.set(movie.archiveId, { data, savedAt: Date.now() });
  return data;
}

function getVideoFiles(files) {
  return files.filter((file) => {
    const name = file.name?.toLowerCase() || '';
    return /\.(mp4|webm|ogv)$/.test(name) && !file.name.includes('_thumb');
  }).sort((left, right) => {
    const leftHeight = Number(left.height) || 0;
    const rightHeight = Number(right.height) || 0;
    return rightHeight - leftHeight || (Number(right.size) || 0) - (Number(left.size) || 0);
  });
}

function getArchiveRights(metadata) {
  return [metadata.licenseurl, metadata.rights, metadata.license].filter(Boolean).join(' · ');
}

function restorePlaybackProgress(movie, video) {
  const progress = readStoredObject(PROGRESS_KEY)[movie.id];
  if (progress?.currentTime > 5) {
    video.currentTime = Math.min(progress.currentTime, Number.isFinite(video.duration) ? video.duration : progress.currentTime);
    $('playerStatus').textContent = 'ئالدىنقى كۆرۈش ئورنىڭىز ئەسلىگە كەلتۈرۈلدى.';
  }
}

function savePlaybackProgress(movie, video) {
  if (!Number.isFinite(video.currentTime) || video.currentTime < 1) return;
  const progress = readStoredObject(PROGRESS_KEY);
  progress[movie.id] = { currentTime: video.currentTime, updatedAt: Date.now() };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function setVideoFile(movie, file, preserveTime = false) {
  const video = $('moviePlayer');
  const currentTime = preserveTime ? video.currentTime : 0;
  const wasPlaying = preserveTime && !video.paused;
  video.src = archiveFileUrl(movie.archiveId, file.name);
  video.load();
  video.addEventListener('loadedmetadata', () => {
    if (preserveTime && currentTime > 0) video.currentTime = Math.min(currentTime, video.duration || currentTime);
    else restorePlaybackProgress(movie, video);
    if (wasPlaying) video.play().catch(() => {});
  }, { once: true });
}

async function attachSubtitles(movie, subtitleFile, signal) {
  const video = $('moviePlayer');
  const track = document.createElement('track');
  track.kind = 'subtitles';
  track.label = subtitleFile.name.split('/').pop().replace(/\.(vtt|srt)$/i, '');
  track.srclang = /ug|uyghur/i.test(subtitleFile.name) ? 'ug' : 'en';
  if (/\.vtt$/i.test(subtitleFile.name)) {
    track.src = archiveFileUrl(movie.archiveId, subtitleFile.name);
  } else {
    const response = await fetch(archiveFileUrl(movie.archiveId, subtitleFile.name), { signal });
    if (!response.ok) throw new Error('Subtitle could not be loaded');
    const srt = (await response.text()).replace(/^\uFEFF/, '').replace(/\r/g, '').replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');
    track.src = URL.createObjectURL(new Blob([`WEBVTT\n\n${srt}`], { type: 'text/vtt' }));
  }
  video.append(track);
  $('subtitleToggle').disabled = false;
  $('subtitleToggle').textContent = '字幕: ئۆچ';
  $('subtitleToggle').setAttribute('aria-pressed', 'false');
  $('subtitleToggle').onclick = () => {
    const enabled = track.track.mode !== 'showing';
    track.track.mode = enabled ? 'showing' : 'disabled';
    $('subtitleToggle').textContent = enabled ? '字幕: ئوچۇق' : '字幕: ئۆچ';
    $('subtitleToggle').setAttribute('aria-pressed', String(enabled));
  };
}

function renderReviews(movie) {
  const reviews = readStoredObject(REVIEW_KEY)[movie.id] || {};
  $('personalRating').value = reviews.rating || '';
  $('reviewInput').value = reviews.text || '';
  $('reviewList').replaceChildren();
  if (reviews.rating || reviews.text) {
    const entry = document.createElement('p');
    entry.textContent = `${reviews.rating ? `★ ${reviews.rating}/5 · ` : ''}${reviews.text || ''}`;
    $('reviewList').append(entry);
  }
}

async function loadMovieDetails(movie, requestId) {
  detailController?.abort();
  detailController = new AbortController();
  const { signal } = detailController;
  $('detailLoading').hidden = false;
  $('detailLoading').querySelector('span').textContent = 'Internet Archive دىن يۈكلىنىۋاتىدۇ...';
  $('detailRetry').hidden = true;
  $('playerSection').hidden = true;
  $('playerStatus').textContent = '';
  $('playerStatus').hidden = false;
  $('rightsNote').hidden = true;
  try {
    const item = await fetchArchiveMetadata(movie, signal);
    if (requestId !== detailRequestId || activeMovie?.id !== movie.id) return;
    const metadata = item.metadata;
    const files = item.files || [];
    const videos = getVideoFiles(files);
    const subtitles = files.filter((file) => /\.(vtt|srt)$/i.test(file.name || ''));
    const rights = getArchiveRights(metadata);
    movie.duration = metadata.runtime || movie.duration;
    $('detailMeta').textContent = `${movie.year} · ${movie.duration} · ${movie.director}`;
    $('detailGenres').textContent = CATEGORIES.find((category) => category.key === movie.category)?.ug || '—';
    $('detailDirector').textContent = movie.director || '—';
    $('detailCast').textContent = '—';
    $('detailInfo').hidden = false;
    $('rightsNote').textContent = rights
      ? `Archive ھوقۇق ئۇچۇرى: ${rights}. ھەقسىز كۆرگىلى بولۇشى ھەر بىر نۇسخىنىڭ قانۇنىي ھالىتىنى ئۆزلۈكىدىن ئىسپاتلىمايدۇ.`
      : 'بۇ Archive تۈرىدە ئېنىق ئىجازەت بەلگىسى يوق؛ ھوقۇق ئۇچۇرىنى ئايرىم تەكشۈرۈڭ.';
    $('rightsNote').hidden = false;
    if (movie.rightsReview) $('rightsNote').textContent += ' بۇ فىلىمنىڭ ھوقۇق ئەھۋالى تەكشۈرۈلمىگەن.';
    if (!videos.length) {
      $('playerStatus').textContent = 'بۇ Archive تۈرىدە تور كۆرگۈچتە قويغىلى بولىدىغان MP4، WebM ياكى Ogg تېپىلمىدى.';
      $('playerSection').hidden = false;
      $('detailLoading').hidden = true;
      return;
    }
    const video = $('moviePlayer');
    video.pause();
    video.removeAttribute('src');
    video.querySelectorAll('track').forEach((track) => track.remove());
    const quality = $('videoQuality');
    quality.replaceChildren(...videos.map((file, index) => {
      const option = document.createElement('option');
      const height = Number(file.height) || 0;
      option.value = file.name;
      option.textContent = height ? `${height}p` : index === videos.length - 1 ? 'SD' : `نۇسخا ${index + 1}`;
      return option;
    }));
    quality.disabled = videos.length < 2;
    quality.onchange = () => {
      const file = videos.find((candidate) => candidate.name === quality.value);
      if (file) setVideoFile(movie, file, true);
    };
    $('subtitleToggle').disabled = true;
    $('subtitleToggle').textContent = subtitles.length ? '字幕 يۈكلىنىۋاتىدۇ' : '字幕 يوق';
    $('subtitleToggle').setAttribute('aria-pressed', 'false');
    setVideoFile(movie, videos[0]);
    $('playerStatus').textContent = subtitles.length ? 'مەنبە ھۆججىتىدە字幕 بار.' : 'بۇ نۇسخىدا字幕 ھۆججىتى تېپىلمىدى.';
    $('playerSection').hidden = false;
    if (subtitles.length) attachSubtitles(movie, subtitles[0], signal).catch(() => {
      $('subtitleToggle').disabled = true;
      $('subtitleToggle').textContent = '字幕نى يۈكلىيەلمىدى';
    });
    $('detailLoading').hidden = true;
  } catch {
    if (requestId === detailRequestId && activeMovie?.id === movie.id) {
      $('detailLoading').querySelector('span').textContent = 'Archive ئۇچۇرىنى يۈكلىيەلمىدى؛ تورنى تەكشۈرۈپ قايتا سىناڭ.';
      $('detailRetry').hidden = false;
      $('detailLoading').hidden = false;
    }
  }
}

function openCollection(collectionId) {
  activeCollection = collectionId;
  renderCategories();
  switchView('categories');
}

function renderRelated(movie) {
  const collection = COLLECTIONS.find((item) => item.movies.includes(movie.id));
  const related = (collection?.movies || []).map((id) => currentMovies.find((entry) => entry.id === id))
    .filter((entry) => entry && entry.id !== movie.id).slice(0, 4);
  $('relatedMovies').replaceChildren(...related.map(posterCard));
  $('relatedSection').hidden = related.length === 0;
}

function openDetail(movie) {
  activeMovie = movie;
  const requestId = ++detailRequestId;
  $('detailTitle').textContent = movie.title;
  $('detailMeta').textContent = `${movie.year} · ${movie.duration} · ${movie.director}`;
  $('detailDesc').textContent = movie.desc;
  $('detailRecommendation').textContent = movie.recommendation;
  $('detailAltTitle').textContent = movie.titleAlt || '';
  $('detailAltTitle').hidden = !movie.titleAlt;
  $('detailLoading').querySelector('span').textContent = navigator.onLine
    ? 'Internet Archive دىن يۈكلىنىۋاتىدۇ...'
    : 'تور يوق؛ سىن مېتا سانلىق مەلۇماتىنى يۈكلىيەلمەيدۇ.';
  $('detailLoading').hidden = false;
  $('detailRetry').hidden = !navigator.onLine;
  $('detailGenres').textContent = CATEGORIES.find((category) => category.key === movie.category)?.ug || '—';
  $('detailDirector').textContent = movie.director || '—';
  $('detailCast').textContent = '—';
  $('detailInfo').hidden = false;
  renderRelated(movie);
  renderReviews(movie);
  $('detailWatchlist').textContent = watchlist.has(movie.id) ? 'تىزىملىكتىن چىقىرىش' : 'كۆرمەكچى';
  $('detailWatchlist').onclick = () => toggleWatchlist(movie, () => {
    $('detailWatchlist').textContent = watchlist.has(movie.id) ? 'تىزىملىكتىن چىقىرىش' : 'كۆرمەكچى';
  });

  const favBtn = $('detailFavorite');
  const sync = () => {
    const on = favorites.has(movie.id);
    favBtn.textContent = on ? 'ياقتۇرۇلدى' : 'ياقتۇردۇم';
    favBtn.classList.toggle('is-on', on);
  };
  sync();
  favBtn.onclick = () => {
    toggleFavorite(movie, sync);
  };

  $('watchOptions').onclick = () => {
    $('playerSection').hidden = false;
    $('playerSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
    if ($('moviePlayer').src) $('moviePlayer').play().catch(() => {});
    else if (navigator.onLine) loadMovieDetails(movie, requestId);
  };
  $('shareMovie').onclick = async () => {
    const shareData = { title: movie.title, text: `${movie.title} (${movie.year})`, url: location.href };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => {});
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        window.alert('ئۇلىنىش كۆچۈرۈلدى؛ ئۇنى WeChat ياكى Telegram غا يوللىيالايسىز.');
      } catch {
        const telegram = `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`;
        window.open(telegram, '_blank', 'noopener,noreferrer');
      }
    } else {
      const telegram = `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`;
      window.open(telegram, '_blank', 'noopener,noreferrer');
    }
  };

  $('detail').hidden = false;
  $('moviePlayer').pause();
  $('moviePlayer').removeAttribute('src');
  $('moviePlayer').querySelectorAll('track').forEach((track) => track.remove());
  $('videoQuality').replaceChildren();
  $('videoQuality').disabled = true;
  $('subtitleToggle').disabled = true;
  $('subtitleToggle').textContent = '字幕 يوق';
  $('playerSection').hidden = true;
  $('rightsNote').hidden = true;
  if (navigator.onLine) loadMovieDetails(movie, requestId);
}

function closeDetail() {
  detailController?.abort();
  detailController = null;
  savePlaybackProgress(activeMovie, $('moviePlayer'));
  $('moviePlayer').pause();
  $('moviePlayer').removeAttribute('src');
  $('moviePlayer').load();
  detailRequestId += 1;
  $('detail').hidden = true;
}

function renderWeeklyVote() {
  const stored = readStoredObject(VOTE_KEY);
  const weekKey = String(Math.floor(Date.now() / (7 * 86400000)));
  const entry = stored[weekKey] || { counts: {}, choice: '' };
  $('voteButtons').replaceChildren(...COLLECTIONS.map((collection) => {
    const button = document.createElement('button');
    button.className = `vote-option${entry.choice === collection.id ? ' is-selected' : ''}`;
    button.type = 'button';
    button.textContent = `${collection.title} · ${entry.counts[collection.id] || 0}`;
    button.addEventListener('click', () => {
      const next = readStoredObject(VOTE_KEY);
      const current = next[weekKey] || { counts: {}, choice: '' };
      if (current.choice === collection.id) return;
      if (current.choice) current.counts[current.choice] = Math.max(0, (current.counts[current.choice] || 1) - 1);
      current.counts[collection.id] = (current.counts[collection.id] || 0) + 1;
      current.choice = collection.id;
      next[weekKey] = current;
      localStorage.setItem(VOTE_KEY, JSON.stringify(next));
      renderWeeklyVote();
    });
    return button;
  }));
}

function switchView(name) {
  ['home', 'categories', 'search', 'me', 'favorites', 'watchlist'].forEach((v) => {
    $(`view-${v}`).hidden = v !== name;
  });
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('is-active', t.dataset.view === name));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.tab').forEach((tab) => {
  tab.addEventListener('click', () => switchView(tab.dataset.view));
});
$('searchToggle').addEventListener('click', () => switchView('search'));
$('searchInput').addEventListener('input', (e) => {
  renderSearch(e.target.value);
});
$('homeSearchInput').addEventListener('input', (e) => {
  $('searchInput').value = e.target.value;
});
$('homeSearchInput').addEventListener('focus', () => {
  $('searchInput').value = $('homeSearchInput').value;
  switchView('search');
  $('searchInput').focus();
  renderSearch($('searchInput').value);
});
$('maxRuntime').addEventListener('change', renderCategoryGrid);
$('eraFilter').addEventListener('change', renderCategoryGrid);
$('clearLocalData').addEventListener('click', () => {
  if (!window.confirm('بۇ ئۈسكۈنىدە ساقلانغان ياقتۇرغانلار، كۆرۈش تارىخى، باھا ۋە قىسقا ئىنكاسلار ئۆچۈرۈلىدۇ. داۋاملاشتۇرامسىز؟')) return;
  [STORAGE_KEY, HISTORY_KEY, WATCHLIST_KEY, PROGRESS_KEY, REVIEW_KEY, VOTE_KEY].forEach((key) => localStorage.removeItem(key));
  window.location.reload();
});
$('menuFavorites').addEventListener('click', () => { renderFavorites(); switchView('favorites'); });
$('menuWatchlist').addEventListener('click', () => { renderWatchlist(); switchView('watchlist'); });
$('favoritesBack').addEventListener('click', () => switchView('me'));
$('watchlistBack').addEventListener('click', () => switchView('me'));
$('detailClose').addEventListener('click', closeDetail);
$('detailRetry').addEventListener('click', () => {
  if (activeMovie && navigator.onLine) loadMovieDetails(activeMovie, detailRequestId);
});
$('saveReview').addEventListener('click', () => {
  if (!activeMovie) return;
  const reviews = readStoredObject(REVIEW_KEY);
  const rating = $('personalRating').value;
  const text = $('reviewInput').value.trim();
  if (!rating && !text) return;
  reviews[activeMovie.id] = { rating, text, updatedAt: Date.now() };
  localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews));
  renderReviews(activeMovie);
});
$('moviePlayer').addEventListener('play', () => {
  if (activeMovie) recordWatch(activeMovie);
});
$('moviePlayer').addEventListener('timeupdate', () => {
  const video = $('moviePlayer');
  if (activeMovie && Date.now() - Number(video.dataset.savedAt || 0) > 5000) {
    savePlaybackProgress(activeMovie, video);
    video.dataset.savedAt = String(Date.now());
  }
});
$('moviePlayer').addEventListener('pause', () => {
  if (activeMovie) savePlaybackProgress(activeMovie, $('moviePlayer'));
});
$('moviePlayer').addEventListener('ended', () => {
  const progress = readStoredObject(PROGRESS_KEY);
  if (activeMovie) delete progress[activeMovie.id];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
});
$('detail').addEventListener('click', (e) => { if (e.target === $('detail')) closeDetail(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetail(); });

refreshMovieViews();
renderWeeklyVote();

window.addEventListener('offline', () => { $('sourceStatus').textContent = 'تور يوق؛ تەپسىلات ۋە سىن مەنبەسى ۋاقىتلىق يوق.'; });
window.addEventListener('online', () => {
  $('sourceStatus').textContent = 'Internet Archive بىلەن باغلىنىشقا تەييار.';
  if (activeMovie && $('detail').hidden === false) loadMovieDetails(activeMovie, detailRequestId);
});
window.addEventListener('unhandledrejection', () => {
  $('sourceStatus').textContent = 'بىر مەشغۇلات تاماملانمىدى؛ كىنو تىزىملىكى يەرلىكتە بار.';
});
window.addEventListener('error', () => {
  $('sourceStatus').textContent = 'بىر خاتالىق يۈز بەردى؛ قايتا سىناپ بېقىڭ.';
});

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
}
