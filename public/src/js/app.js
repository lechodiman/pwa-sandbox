const pwaCard = document.querySelector("#pwa");
const pwaCardContent = pwaCard.querySelector(".card__content");
const pwaCardDetails = pwaCard.querySelector(".card__details");
let detailsShown = false;

// Make sure that even if the user visits another page (like about) the service worker is registered
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(() => console.log("Service worker registered"));
}

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
