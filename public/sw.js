// Created under public directory so it has scope over all of my pages

// This guy is event driven

// Self refers to the service worker process
self.addEventListener("install", function() {
  console.log("SW installed");
});

// it triggers when all instances of the service worker are closed, ie, after user installed the pwa and closed all tabs related to the page
self.addEventListener("activate", function() {
  console.log("SW activated");
});
