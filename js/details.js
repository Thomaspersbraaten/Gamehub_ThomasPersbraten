const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const detailsContainer = document.querySelector(".details");
const addToBasketMessage = document.querySelector(".add-to-basket");
const popUpBasket = document.querySelector(".popup-basket");
const message = document.querySelector(".message");

const url =
  "https://api.rawg.io/api/games/" +
  id +
  "?key=cdf875c74f4a4975a6fac3dd5dd7b70b";

async function fetchUrl() {
  try {
    const response = await fetch(url);
    const gameDetails = await response.json();
    console.log(gameDetails);
    createHtml(gameDetails);
  } catch (error) {
    // const errorMessage = errorDuringApiCall(error);
    detailsContainer.innerHTML = error;
  }
}
fetchUrl();

function createHtml(game) {
  const genres = game.genres;
  // for (let i = 0; i < genres.length; i++) {
  //   console.log(genres[i].name);
  //   document.title = game.name + " | " + game.genres[0].name + " | Gamehub  ";
  // }
  // console.log(game.genres[0].name);
  document.title = game.name + " | " + game.genres[0].name + " | Gamehub  ";
  detailsContainer.innerHTML = "";

  if (game.rating === 0) {
    var price = 80;
    var usedCopyPrice = 40;
  } else {
    var price = game.rating.toFixed(0) * 40 + ",-";
    var usedCopyPrice = game.rating.toFixed(0) * 20 + ",-";
  }

  detailsContainer.innerHTML += `
    <div class="top-details">
    <img src="${game.background_image}" class="details-img">
    <div>
    <div class="new">
    <p class="details-price new-price">Price: ${price} </p>
    <button class="game-button"> Add to Basket </button>

    </div>
    <div class="old">
    <p class="details-price used-price">Used Product - Price: ${usedCopyPrice} </p>
    <button class="game-button"> Add to Basket </button>
    </div>
 
     
    </div>
    </div>
      <h2>${game.name}</h2>
      <p> ${game.description_raw}</p>
    `;
  const addToBasketButton = document.querySelector(".game-button");
  addToBasketButton.addEventListener("click", function () {
    addToBasketMessage.style.display = "flex";
    popUpBasket.style.display = "block";
    addToBasketMessage.innerHTML = `
    <div class="message">✅  Item has been added to your shopping basket</div>
    <div style="color: black" class="content">
    <img src="${game.background_image}" class="basket-img">
    <h2>${game.name} </h2> 
    <p> Price: $${price}</p>
    </div>`;
  });
}

// closeButton.addEventListener("click", function () {
//   addToBasketMessage.style.display = "none";
//   popUpBasket.style.display = "none";
// });
popUpBasket.onclick = function () {
  popUpBasket.style.display = "none";
};
