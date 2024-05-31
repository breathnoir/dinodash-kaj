// sw.js
const CACHE_NAME = 'dino-game-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/game.css',
    '/assets',
    '/scripts/setup.js',
    '/scripts/menu.js',
    '/scripts/game.js',
    '/scripts/gameover.js',
    '/assets/music.mp3',
    '/assets/ARCADECLASSIC.TTF',
    '/assets/Blox2.ttf',
    '/assets/sprite_dino1.svg',
    '/assets/sprite_dino2.svg',
    '/assets/sprite_frog1.svg',
    '/assets/sprite_frog2.svg',
    '/assets/sprite_mouse1.svg',
    '/assets/sprite_mouse2.svg',
    '/assets/reedmace1.svg',
    '/assets/reedmace2.svg',
    '/assets/reedmace3.svg'
    
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
