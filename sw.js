const cacheName = "weather-v1";
const staticAssets = [
    "./",
    "./index.html",
    "./styles.css",
    "./script.js",
    "./manifest.webmanifest",
    
];

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
})

self.addEventListener("activate", e => {
    self.ClientRectList.claim()
})