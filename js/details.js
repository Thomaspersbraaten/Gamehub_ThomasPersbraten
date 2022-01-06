const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const detailsContainer = document.querySelector(".details");
const addToBasketMessage = document.querySelector(".add-to-basket");
const popUpBasket = document.querySelector(".popup-basket");
const message = document.querySelector(".message");
const reviewHeaderOne = document.querySelector(".review-header-one");
const reviewHeaderTwo = document.querySelector(".review-header-two");
const reviewHeaderThree = document.querySelector(".review-header-three");
const ratingOne = document.querySelector(".rating-one");
const ratingTwo = document.querySelector(".rating-two");
const ratingThree = document.querySelector(".rating-three");

const url =
  "https://api.rawg.io/api/games/" +
  id +
  "?key=cdf875c74f4a4975a6fac3dd5dd7b70b";

async function fetchUrl() {
  try {
    const response = await fetch(url);
    const gameDetails = await response.json();
    console.log(gameDetails);

    const timedFunction = setInterval(createHtml(gameDetails), 5000);
    // createHtml(gameDetails);
  } catch (error) {
    // const errorMessage = errorDuringApiCall(error);
    detailsContainer.innerHTML = error;
  }
}
fetchUrl();

// try

async function getDataFromAPI(data) {
  try {
    const response = await fetch(url);
  } catch {
    detailsContainer.innerHTML = error;
  }
}

function createHtml(game) {
  const genres = game.genres;
  // console.log(genres);
  reviewHeaderOne.innerHTML += `: ${game.name}`;
  reviewHeaderTwo.innerHTML += `: ${game.name}`;
  reviewHeaderThree.innerHTML += `: ${game.name}`;
  ratingOne.innerHTML += ` ${game.rating}`;
  ratingTwo.innerHTML += ` ${game.rating}`;
  ratingThree.innerHTML += ` ${game.rating}`;

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
  <div class="breadcrumbs" ><a href="store.html" style="text-decoration:none">Store</a> > <a>${game.genres[0].name}</a> > <a>${game.name}</a></div>
  <h1>${game.name}</h1>
    <div class="top-details">
      <img src="${game.background_image}" class="details-img">
      <div class="right-container">
      <div>
      <h2> Prices </h2>
      </div>
        <div class="new">
      
          <p class="details-price new-price">New product - Price: ${price} </p>
          <div>   
            <p> 50+ Product's in stock   </p> 
            <div class="stock"></div>
          </div>
          <button class="game-button new-button"> Add to cart </button>
        </div>
        <div class="old">
          <p class="details-price used-price">Used Product - Price: ${usedCopyPrice} </p>
          <div class="used-stock">   
          <p> 50+ Product's in stock   </p> 
          <div class="stock"></div>
        </div>
          <button class="game-button old-button"> Add to cart </button>
        </div>
      </div>
    </div>
    <section class="bottom-info"> 
      <div class="description">
      <h2> Game description</h2>
      <p> ${game.description_raw}</p>
      </div>
      <div class="right-info">
        <h2>Genres</h2>
        <div class="genres"></div>
        
    </section>
    `;
  const genresContainer = document.querySelector(".genres");

  for (let i = 0; i < genres.length; i++) {
    genresContainer.innerHTML += `<p>${genres[i].name} </p>`;
  }
  const addToBasketButtonNew = document.querySelector(".new-button");
  const addToBasketButtonOld = document.querySelector(".old-button");

  addToBasketButtonNew.addEventListener("click", function () {
    addToBasketMessage.style.display = "flex";
    popUpBasket.style.display = "block";
    addToBasketMessage.innerHTML = `
    <div class="message">✅  Item has been added to your shopping cart</div>
    <div style="color: black" class="content">
    <img src="${game.background_image}" class="basket-img">
    <h2>1 x ${game.name} </h2>
    <p>  New product </p>
    <p> Price: ${price}</p>
    </div>`;
  });

  addToBasketButtonOld.addEventListener("click", function () {
    addToBasketMessage.style.display = "flex";
    popUpBasket.style.display = "block";
    addToBasketMessage.innerHTML = `
    <div class="message">✅  Item has been added to your shopping cart</div>
    <div style="color: black" class="content">
    <img src="${game.background_image}" class="basket-img">
    <h2>1 x ${game.name} </h2>
    <p> Used product </p>
    <p> Price: ${usedCopyPrice}</p>
    </div>`;
  });
}

// function addUsedProduct() {
//   addToBasketMessage.style.display = "flex";
//   popUpBasket.style.display = "block";
//   addToBasketMessage.innerHTML = `
//   <div class="message">✅  Item has been added to your shopping basket</div>
//   <div style="color: black" class="content">
//   <img src="${game.background_image}" class="basket-img">
//   <h2>${game.name} </h2>
//   <p> Price: $${price}</p>
//   </div>`;
// }

// addToBasketButtonOld.addEventListener("click", addUsedProduct);

// closeButton.addEventListener("click", function () {
//   addToBasketMessage.style.display = "none";
//   popUpBasket.style.display = "none";
// });
popUpBasket.onclick = function () {
  popUpBasket.style.display = "none";
};
