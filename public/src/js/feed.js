const sharedPostsArea = document.querySelector("#shared-posts");

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

function clearCards() {
  while (sharedPostsArea.hasChildNodes()) {
    sharedPostsArea.removeChild(sharedPostsArea.lastChild);
  }
}

const url = "https://httpbin.org/post";
let networkDataReceived = false;

// So, you can store POST requests in the cache
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    message: "Some message"
  })
})
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    networkDataReceived = true;
    console.log("From web", data);
    clearCards();
    createCard();
  });

if ("caches" in window) {
  caches
    .match(url)
    .then(response => {
      if (response) {
        return response.json();
      }
    })
    .then(data => {
      console.log("From cache", data);
      if (!networkDataReceived) {
        clearCards();
        createCard();
      }
    });
}
