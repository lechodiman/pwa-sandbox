// Created under public directory so it has scope over all of my pages
// This guy is event driven
// The main usage is caching
// the cache stores a key value pair of request-response

// Self refers to the service worker process
self.addEventListener("install", function(event) {
  console.log("SW installed");
  // wait until, because sw go idle after a certain amount of time and I don't want it to sleep while I cache data
  event.waitUntil(
    caches.open("static").then(cache => {
      // cache.add("/");
      // cache.add("/index.html");
      // cache.add("/src/js/app.js");
      cache.addAll([
        "/",
        "/index.html",
        "/src/js/app.js",
        "/src/css/app.css",
        "src/images/pwa.jpg",
        "https://fonts.googleapis.com/css?family=Raleway:400,700"
      ]);
    })
  );
});

// it triggers when all instances of the service worker are closed, ie, after user installed the pwa and closed all tabs related to the page
self.addEventListener("activate", function() {
  console.log("SW activated");
});
