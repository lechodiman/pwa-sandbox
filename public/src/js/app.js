async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    const swRegistration = await navigator.serviceWorker.register("/sw.js");
    console.log("SW Registered");
    return swRegistration;
  }
}

async function requestNotificationPermission() {
  const permission = await window.Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
}

function showLocalNotification(title, body, swRegistration) {
  const options = { body };

  swRegistration.showNotification(title, options);
}

// Currently not in use, allows to save on demand
function onSaveButtonClick(event) {
  // Manually add to cache
  console.log("clicked");
  if ("caches" in window) {
    caches.open("user-requested").then(cache => {
      cache.add("https://httpbin.org/get");
      cache.add("/src/images/sf-boat.jpg");
    });
  }
}

async function main() {
  const swRegistration = await registerServiceWorker();
  const permission = await requestNotificationPermission();

  showLocalNotification(
    "Hello World",
    "You have approved notifications",
    swRegistration
  );
}

registerServiceWorker();

// main();
