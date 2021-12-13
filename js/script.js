// const cors = "https://noroffcors.herokuapp.com/";

const resultsContainer = document.querySelector(".results");
const recentlyReleasedContainer = document.querySelector(".recently-released");
const gameIndex = document.querySelector(".game-index");

async function callApiRawg() {
  try {
    const response = await fetch(
      "https://api.rawg.io/api/games?key=cdf875c74f4a4975a6fac3dd5dd7b70b"
    );
    const results = await response.json();
    const data = results.results;
    // console.log(data);
    resultsContainer.innerHTML = "";
    data.forEach(function (game) {
      const priceCalc = game.rating * 40;
      const price = priceCalc.toFixed(0) + ",-";

      resultsContainer.innerHTML += `<a href="details.html?id=${game.id}" class="game-card" style="text-decoration:none">
      <img src="${game.background_image}" class="game-img" alt="${game.name}">
      <div class="game-info">
      <h2> ${game.name}</h2>
      <p>Rating: ${game.rating} / 5</p>
      <p>Price: ${price} </p> 
      <button class="game-button">View product </button>
      </div>
      </a>`;
    });
  } catch (error) {
    resultsContainer.innerHTML = `<div class="error"> This error occured: ${error} </div>`;
  }
}

callApiRawg();

const recentlyReleasedApi =
  "https://api.rawg.io/api/games?dates=2021-12-12,2021-12-13&key=cdf875c74f4a4975a6fac3dd5dd7b70b";
let counter = 0;
let counterMinus = -1;

async function recentlyReleasedSection() {
  const response = await fetch(recentlyReleasedApi);
  const results = await response.json();
  var releasedData = results.results;
  console.log(releasedData);
  createHtml(releasedData);
  // if (releasedData.length >= 20) {
  //   for (let i = 0; i < releasedData.length; i++) {
  //     gameIndex.innerHTML += `<button class="item"></button>`;
  //   }
  // }
  var activeItem = document.querySelector(".item");
  var itemChildren = document.querySelector(".game-index").childNodes;
  // for (let i = 0; i < itemChildren.length; i++) {}

  if (releasedData[counter] === undefined) {
    counter = 0;
    counterMinus = -1;
    itemChildren[19].classList.remove("active-item");
  } else {
    if (counterMinus >= 0) {
      itemChildren[counterMinus].classList.remove("active-item");
    }
    itemChildren[counter].classList.add("active-item");

    let price = 99 + ",-";
    recentlyReleasedContainer.innerHTML = `<a class="released-game" href="details.html?id=${releasedData[counter].id}">
     <img src="${releasedData[counter].background_image}">
     <div class="wrapper">
     <h2 class="game-name"> ${releasedData[counter].name}</h2>
     <h2 class="price"> ${price} </h2> 
     </div>
      </a>
     `;
    counter++;
    counterMinus++;
  }
}
recentlyReleasedSection();

function createHtml(games) {
  const gamesArray = [];
  for (let i = 0; i <= 19; i++) {
    if (games[i]) {
      gamesArray.push(games[i]);
    }
  }
  // console.log(gamesArray);
  for (let i = 0; i < games.length; i++) {
    if (gameIndex.childElementCount === 20) {
      return;
    } else {
      gameIndex.innerHTML += `<button class="item"></button>`;
    }
  }
}

const createInterval = setInterval(recentlyReleasedSection, 5000);
