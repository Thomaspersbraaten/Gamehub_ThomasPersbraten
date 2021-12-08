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
  document.title = "Gamehub | " + game.name;
  detailsContainer.innerHTML = "";
  const priceCalc = game.rating * 5;
  const price = priceCalc.toFixed(1);

  detailsContainer.innerHTML += `
           <div class="game-details">
           <img src="${game.background_image}" class="details-img">
            <h2>${game.name}</h2>
             <p>  ${game.description_raw}</p>
             <p class="price"> $${price} </p>
             <button class="game-button"> Add to Basket </button>
             </div>
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

  // closeButton.addEventListener("click", function () {
  //   addToBasketMessage.style.display = "none";
  //   popUpBasket.style.display = "none";
  // });
  popUpBasket.onclick = function () {
    popUpBasket.style.display = "none";
  };
}
