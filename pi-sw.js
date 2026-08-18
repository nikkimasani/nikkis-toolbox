const CACHE='pi-command-center-v3';
const ASSETS=[
'/pi-command-center.html','/pi-setup-guide-v2.html','/pi-command-center.css','/pi-command-center-enhancements.css','/pi-responsive-pwa.css','/pi-command-center-data.js','/pi-command-center-app.js','/pi-project-deep-dive.js','/pi-project-deep-commands.js','/pi-command-center.webmanifest','/pi-pwa-icon.svg','/pi-shot-hardware-flatlay.svg','/pi-shot-imager-download.svg','/pi-shot-sd-reader.svg','/pi-shot-imager-main.svg','/pi-shot-imager-customize.svg','/pi-shot-ssh-enable.svg','/pi-shot-imager-write.svg','/pi-shot-first-boot.svg','/pi-shot-network-check.svg','/pi-shot-ssh-terminal.svg'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('/pi-command-center.html'))))});
