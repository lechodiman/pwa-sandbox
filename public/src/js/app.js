const sharedPostsArea = document.querySelector("#shared-posts");

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

function createCard() {
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "card";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  cardBody.textContent = "This a super cool post";

  cardWrapper.appendChild(cardBody);
  sharedPostsArea.appendChild(cardWrapper);
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

fetch("https://httpbin.org/get")
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    if (sharedPostsArea) {
      createCard();
    }
  });

registerServiceWorker();

// main();
