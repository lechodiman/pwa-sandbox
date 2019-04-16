const pwaCard = document.querySelector("#pwa");
const pwaCardContent = pwaCard.querySelector(".card__content");
const pwaCardDetails = pwaCard.querySelector(".card__details");
let detailsShown = false;

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    const swRegistration = await navigator.serviceWorker.register("/sw.js");
    console.log("SW Registered");
    return swRegistration;
  }
};

const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
};

const main = async () => {
  const swRegistration = await registerServiceWorker();
  const permission = await requestNotificationPermission();
};

pwaCard.addEventListener("click", function(event) {
  if (!detailsShown) {
    detailsShown = true;
    pwaCardContent.style.opacity = 0;
    pwaCardDetails.style.display = "block";
    pwaCardContent.style.display = "none";
    setTimeout(function() {
      pwaCardDetails.style.opacity = 1;
    }, 300);
  } else {
    detailsShown = false;
    pwaCardDetails.style.opacity = 0;
    pwaCardContent.style.display = "block";
    pwaCardDetails.style.display = "none";
    setTimeout(function() {
      pwaCardContent.style.opacity = 1;
    }, 300);
  }
});

main();
