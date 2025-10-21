const CACHE_NAME = 'anban-cache-v1';
const OFFLINE_URL = 'offline.html';
const urlsToCache = [
  '/an-ban/',
  '/an-ban/index.html',
  '/an-ban/css/style.css',
  '/an-ban/js/main.js',
  '/an-ban/js/particles.min.js',
  '/an-ban/manifest.json',
  '/an-ban/icons/icon-72x72.png',
  '/an-ban/icons/icon-192x192.png',
  '/an-ban/icons/icon-512x512.png'
];

// 安装Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('缓存已打开');
        return cache.addAll(urlsToCache);
      })
  );
});

// 拦截请求并返回缓存
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 缓存命中 - 返回响应
        if (response) {
          return response;
        }

        // 重要：克隆请求
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // 检查响应是否有效
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 重要：克隆响应
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        ).catch(() => {
          // 离线时返回离线页面
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
        });
      })
  );
});

// 清理旧缓存
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
