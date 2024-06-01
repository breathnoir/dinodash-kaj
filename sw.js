const CACHE_NAME = 'dino-game-v1';
const urlsToCache = [
    '/dinodash-kaj/',
    '/dinodash-kaj/index.html',
    '/dinodash-kaj/game.css',
    '/dinodash-kaj/scripts/setup.js',
    '/dinodash-kaj/scripts/menu.js',
    '/dinodash-kaj/scripts/game.js',
    '/dinodash-kaj/scripts/gameover.js',
    '/dinodash-kaj/assets/music.mp3',
    '/dinodash-kaj/assets/ARCADECLASSIC.TTF',
    '/dinodash-kaj/assets/Blox2.ttf',
    '/dinodash-kaj/assets/sprite_dino1.svg',
    '/dinodash-kaj/assets/sprite_dino2.svg',
    '/dinodash-kaj/assets/sprite_frog1.svg',
    '/dinodash-kaj/assets/sprite_frog2.svg',
    '/dinodash-kaj/assets/sprite_mouse1.svg',
    '/dinodash-kaj/assets/sprite_mouse2.svg',
    '/dinodash-kaj/assets/reedmace1.svg',
    '/dinodash-kaj/assets/reedmace2.svg',
    '/dinodash-kaj/assets/reedmace3.svg'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
                .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
