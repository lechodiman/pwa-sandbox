const CACHE_STATIC_NAME = "static-v6";
const CACHE_DYNAMIC_NAME = "dynamic-v3";

// Self refers to the service worker process
self.addEventListener("install", function(event) {
  console.log("SW installed");
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME).then(cache => {
      console.log("[SW]: caching app shell");
      cache.addAll([
        "/", // think that you are caching requests
        "/index.html",
        "/offline.html",
        "/src/images/trump.jpg",
        "/src/js/app.js",
        "/src/css/app.css",
        "/favicon.ico",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
        "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
        "https://fonts.googleapis.com/css?family=Raleway:400,700"
      ]);
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

  // try {
  //   const options = {};
  //   const subscription = await self.registration.pushManager.subscribe(options);

  //   console.log(JSON.stringify(subscription));
  // } catch (error) {
  //   console.log("Error", error);
  // }
});

self.addEventListener("fetch", function(event) {
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
              if (event.request.url.indexOf("/help")) {
                return cache.match("/offline.html");
              }
            });
          });
      }
    })
  );
});
