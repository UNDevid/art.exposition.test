const CACHE_NAME = 'art-exhibition-v1';
const urlsToCache = [
    './',
    './index.html',
    './opera_1.html',
    './opera_2.html',
    './opera_3.html',
    './opera_4.html',
    './opera_5.html',
    './opera_6.html',
    './images/briefly.png',
    './audio/briefly.mp3',
    './images/opera_1.jpg',
    './audio/one.mp3',
    './images/opera_2.jpg',
    './audio/two.mp3',
    './images/opera_3.jpg',
    './audio/three.mp3',
    './images/opera_4.jpg',
    './audio/four.mp3',
    './images/opera_5.jpg',
    './audio/five.mp3',
    './images/opera_6.jpg',
    './audio/six.mp3',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
