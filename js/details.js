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
const shoppingCart = document.querySelector(".fa-shopping-cart");

let cartArray = [];

const url =
  "https://api.rawg.io/api/games/" +
  id +
  "?key=cdf875c74f4a4975a6fac3dd5dd7b70b";

async function fetchUrl(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const gameDetails = await response.json();
    console.log(gameDetails);

    // const timedFunction = setInterval(createHtml(gameDetails), 5000);
    createHtml(gameDetails);
  } catch (error) {
    // const errorMessage = errorDuringApiCall(error);
    detailsContainer.innerHTML = error;
    console.log(error);
  }
}
fetchUrl(url);

function createHtml(game) {
  // const genres = game.genres;
  // console.log(genres);
  reviewHeaderOne.innerHTML += `: ${game.name}`;
  reviewHeaderTwo.innerHTML += `: ${game.name}`;
  reviewHeaderThree.innerHTML += `: ${game.name}`;
  ratingOne.innerHTML += ` 4 / 5  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star"></span>`;
  ratingTwo.innerHTML += ` 4 / 5  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star"></span>`;
  ratingThree.innerHTML += ` 4 / 5  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star checked"></span>
  <span class="fa fa-star"></span>`;

  document.title = game.name + " | " + "  Gamehub  ";
  detailsContainer.innerHTML = "";

  const priceCalc = parseInt(game.rating * 5);

  const image = game.background_image;

  detailsContainer.innerHTML += `
  <div class="breadcrumbs" ><a href="store.html" style="text-decoration:none">Store</a> > <a>${game.genres[0].name}</a> > <a>${game.name}</a></div>
  <h1>${game.name}</h1>
    <div class="top-details">
      <img src="${image}" class="details-img">
      <div class="right-container">
      <div>
      <h2> Prices </h2>
      </div>
        <div class="new">
      
          <p class="details-price new-price">New product - Price: ${priceCalc} $</p>
          <div>   
            <p> 50+ Product's in stock   </p> 
            <div class="stock"></div>
          </div>
          <button class="game-button new-button" data-product="${game.id}"> Add to cart </button>
        </div>
        <div class="old">
          <p class="details-price used-price">Used Product - Price: ${priceCalc} $</p>
          <div class="used-stock">   
          <p> 50+ Product's in stock   </p> 
          <div class="stock"></div>
        </div>
          <button class="game-button old-button" data-product="${game.id}"> Add to cart </button>
        </div>
      </div>
    </div>
    <section class="bottom-info"> 
      <div class="description">
      <h2> Game description</h2>
      <p> ${game.description}</p>
      </div>
      <div class="right-info">
        <h2>Genres</h2>
        <div class="genres"></div>
        
    </section>
    `;
  const genresContainer = document.querySelector(".genres");

  for (let i = 0; i < game.genres.length; i++) {
    genresContainer.innerHTML += `<p>${game.genres[i].name} </p>`;
  }
  const addToBasketButtonNew = document.querySelector(".new-button");
  const addToBasketButtonOld = document.querySelector(".old-button");

  addToBasketButtonNew.addEventListener("click", function (e) {
    addToBasketMessage.style.display = "flex";
    popUpBasket.style.display = "block";
    addToBasketMessage.innerHTML = `
    <button class="added-button">X</button>
    <div class="message">✅  Item has been added to your shopping cart</div>
    <div style="color: black" class="content">
    <img src="${image}" class="basket-img">
    <h2>1 x ${game.name} </h2>
    <p>  New product </p>
    <p> Price: ${priceCalc}</p>
    </div>`;
    console.log(e.target.dataset.product);
    cartArray.push({
      name: game.name,
      price: priceCalc,
      image: image,
      condition: "New Product",
    });
    console.log(cartArray);
    showCart(cartArray);
  });

  addToBasketButtonOld.addEventListener("click", function () {
    addToBasketMessage.style.display = "flex";
    popUpBasket.style.display = "block";
    addToBasketMessage.innerHTML = `
    <button class="added-button">X</button>
    <div class="message">✅  Item has been added to your shopping cart</div>
    <div style="color: black" class="content">
    <img src="${image}" class="basket-img">
    <h2>1 x ${game.name} </h2>
    <p> Used product </p>
    <p> Price: ${priceCalc}</p>
    </div>`;
    cartArray.push({
      name: game.name,
      price: priceCalc,
      image: image,
      condition: "Old Product",
    });
    console.log(cartArray);
    showCart(cartArray);
  });
}

const cartInfo = document.querySelector(".cart-info");
const cartInfoCount = document.querySelector(".cart-info_item-count");
const cartInfoSum = document.querySelector(".cart-info_sum");

function showCart(cartItems) {
  // cartInfo.style.right = 0;
  // cartInfo.style.left = 0;

  // cartInfo.style.display = "block";
  let total = 0;
  console.log(cartItems);
  cartInfoCount.innerHTML = `
  Quantity: ${cartItems.length}.`;
  cartItems.forEach((element) => {
    total += element.price;
    // cartInfo.innerHTML += `
    // <div class="cart-game-name">${element.name}</div>
    // <div class="cart-game-price"> ${total}</div>
    // `;

    cartInfoSum.innerHTML = `Sum: $${total}`;
  });
  localStorage.setItem("cartList", JSON.stringify(cartArray));
}

shoppingCart.addEventListener("mouseover", function () {
  if (cartArray.length > 0) {
    if (window.innerWidth >= 1000) {
      cartInfo.style.display = "flex";
      cartInfo.style.right = 25 + "%";
      cartInfo.style.left = "auto";
    }
    cartInfo.style.display = "flex";
  }
});
shoppingCart.addEventListener("mouseout", function () {
  // setTimeout(function () {
  //   cartInfo.style.display = "none";
  // }, 800);
  cartInfo.style.display = "none";
});

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
