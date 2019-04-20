const CACHE_STATIC_NAME = "static-v8";
const CACHE_DYNAMIC_NAME = "dynamic-v3";
const STATIC_FILES = [
  "/", // think that you are caching requests
  "/index.html",
  "/offline.html",
  "/src/images/trump.jpg",
  "/src/js/app.js",
  "/src/js/feed.js",
  "/src/css/app.css",
  "/favicon.ico",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
  "https://code.jquery.com/jquery-3.3.1.slim.min.js",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
  "https://fonts.googleapis.com/css?family=Raleway:400,700"
];

function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keyList => {
      if (keyList.length > maxItems) {
        // Delete oldest item in cache until the condition above is false
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
}

// Self refers to the service worker process
self.addEventListener("install", function(event) {
  console.log("[SW] Installing service worker");
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(cache => {
      console.log("[SW]: Caching app shell");
      cache.addAll(STATIC_FILES);
    })
  );
});

// it triggers when all instances of the service worker are closed, ie, after user installed the pwa and closed all tabs related to the page
self.addEventListener("activate", function(event) {
  console.log("[SW]: Activating");
  // Clean older versions of caches
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log("[SW] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();

  // try {
  //   const options = {};
  //   const subscription = await self.registration.pushManager.subscribe(options);

  //   console.log(JSON.stringify(subscription));
  // } catch (error) {
  //   console.log("Error", error);
  // }
});

function isInArray(string, array) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element === string) {
      return true;
    }
    return false;
  }
}

self.addEventListener("fetch", function(event) {
  const url = "https://httpbin.org/get";
  // If the fetch is for this url, save to dynamic cache
  if (event.request.url.indexOf(url) > -1) {
    event.respondWith(
      caches.open(CACHE_DYNAMIC_NAME).then(cache => {
        return fetch(event.request).then(res => {
          cache.put(event.request, res.clone());
          return res;
        });
      })
    );
  } else if (isInArray(event.request.url, STATIC_FILES)) {
    // If the url is for the STATIC_FILES, send the cached version
    event.respondWith(caches.match(event.request));
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(res => {
              return caches.open(CACHE_DYNAMIC_NAME).then(cache => {
                cache.put(event.request.url, res.clone());
                return res;
              });
            })
            .catch(err => {
              return caches.open(CACHE_STATIC_NAME).then(cache => {
                if (event.request.headers.get("accept").includes("text/html")) {
                  return cache.match("/offline.html");
                }
              });
            });
        }
      })
    );
  }
});
