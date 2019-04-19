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

function createCard() {
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "card";

  const cardImage = document.createElement("img");
  cardImage.setAttribute("src", "src/images/sf-boat.jpg");
  cardImage.className = "card-img-top";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.textContent = "This a super cool post";

  const cardButton = document.createElement("button");
  cardButton.classList.add("btn", "btn-primary");
  cardButton.textContent = "Save offline";
  cardButton.addEventListener("click", onSaveButtonClick);

  cardBody.appendChild(cardImage);
  cardBody.appendChild(cardTitle);
  // cardBody.appendChild(cardButton);

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
