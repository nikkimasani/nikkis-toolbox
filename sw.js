const CACHE_NAME = 'toolbox-v3';

const STATIC_ASSETS = [
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg',
  '/icon-maskable.svg',
];

function updateLifeOsCard(html) {
  return String(html)
    .replace('<span class="card-glyph">LCC</span>', '<span class="card-glyph">OS</span>')
    .replace('<div class="card-name">Life Command Center</div>', '<div class="card-name">Life OS</div>')
    .replace('Open Life Command Center <span class="arrow">→</span>', 'Open Life OS <span class="arrow">→</span>');
}

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (url.origin !== location.origin) return;

  const accept = e.request.headers.get('accept') || '';
  const isNavigation = e.request.mode === 'navigate' || accept.includes('text/html');
  if (isNavigation || url.pathname === '/' || url.pathname.endsWith('/index.html')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }).then(async resp => {
        if (!resp.ok) return resp;
        const html = updateLifeOsCard(await resp.text());
        const headers = new Headers(resp.headers);
        headers.set('content-type', 'text/html; charset=utf-8');
        headers.set('cache-control', 'no-store');
        const updated = new Response(html, { status: resp.status, statusText: resp.statusText, headers });
        caches.open(CACHE_NAME).then(cache => cache.put('/index.html', updated.clone()));
        return updated;
      }).catch(() =>
        caches.match('/index.html').then(cached =>
          cached || new Response('Toolbox needs a connection for first load.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          })
        )
      )
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return resp;
      });
    })
  );
});
