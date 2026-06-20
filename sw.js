// sw.js - Service Worker for Naruto Ultimate Update System
const CACHE_NAME = 'naruto-game-v2'; // Version-ah mathuna thaan update trigger aagum
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './bg1.jpg',
  './rnaruto.png',
  './rsasuke.png'
];

// 1. INSTALL: Files-ah cache-la save pannum
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Ninja Assets Cached!');
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. ACTIVATE: Palaiya version cache-ah delete pannum
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old Jutsu cache...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. FETCH: Offline-la irundhaalum game-ah open panna help pannum
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});