const CACHE='pi-command-center-v4';
const ASSETS=[
'/pi-command-center.html','/pi-command-center.css','/pi-command-center-enhancements.css','/pi-responsive-pwa.css','/pi-native-setup.css','/pi-project-visual-pass.css','/pi-command-center-data.js','/pi-command-center-app.js','/pi-project-deep-dive.js','/pi-project-deep-commands.js','/pi-native-setup.js','/pi-project-visual-pass.js','/pi-command-center.webmanifest','/pi-pwa-icon.svg'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('/pi-command-center.html'))))});