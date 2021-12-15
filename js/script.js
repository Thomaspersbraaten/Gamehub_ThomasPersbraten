// const cors = "https://noroffcors.herokuapp.com/";

const resultsContainer = document.querySelector(".results");
const recentlyReleasedContainer = document.querySelector(".recently-released");
const gameIndex = document.querySelector(".game-index");
const searchContainer = document.querySelector(".search-bar");
const apiUrl = "https://api.rawg.io/api/games?";
const apiKey = "key=cdf875c74f4a4975a6fac3dd5dd7b70b";
const searchQuery = "https://api.rawg.io/api/games?search=";
const homeHeader = document.querySelector(".homepage-header");

const searchForm = document.querySelector(".search-form");

async function callApiRawg() {
  try {
    const response = await fetch(apiUrl + apiKey);
    const results = await response.json();
    const data = results.results;
    console.log(data);
    // console.log(data);
    resultsContainer.innerHTML = "";
    // createHtml(data);

    data.forEach(function (game) {
      const priceCalc = game.rating * 40;
      const price = priceCalc.toFixed(0) + ",-";
      resultsContainer.innerHTML += `
 
      <a href="details.html?id=${game.id}" class="game-card" style="text-decoration:none">
      <img src="${game.background_image}" class="game-img" alt="${game.name}">
         <div class="game-info">
      <h3 class="game-name"> ${game.name}</h3>
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

// function createHtml(game) {
//   data.forEach(function (game) {
//     const priceCalc = game.rating * 40;
//     const price = priceCalc.toFixed(0) + ",-";

//     resultsContainer.innerHTML += `<a href="details.html?id=${game.id}" class="game-card" style="text-decoration:none">
//       <img src="${game.background_image}" class="game-img" alt="${game.name}">
//       <div class="game-info">
//       <h2> ${game.name}</h2>
//       <p>Rating: ${game.rating} / 5</p>
//       <p>Price: ${price} </p>
//       <button class="game-button">View product </button>
//       </div>
//       </a>`;
//   });
// }

async function searchFunction(event) {
  try {
    event.preventDefault();
    const searchValue = searchContainer.value;
    const response = await fetch(searchQuery + searchValue + "&" + apiKey);

    const result = await response.json();
    const game = result.results;
    console.log(game);
    homeHeader.innerHTML = `showing search results for "${searchValue}"`;
    recentlyReleasedContainer.style.display = "none";
    gameIndex.style.display = "none";
    resultsContainer.innerHTML = "";
    if (!game) {
      resultsContainer.innerHTML = `<div class="no-results"> No results where found during your search....</div>`;
    } else {
      game.forEach(function (game) {
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
    }
  } catch (error) {
    console.log(error);
  }
}

searchForm.addEventListener("submit", searchFunction);

const recentlyReleasedApi =
  "https://api.rawg.io/api/games?dates=2021-12-12,2021-12-13&key=cdf875c74f4a4975a6fac3dd5dd7b70b";
let counter = 0;
let counterMinus = -1;

async function recentlyReleasedSection() {
  const response = await fetch(recentlyReleasedApi);
  const results = await response.json();
  var releasedData = results.results;
  createHtml(releasedData);

  var itemChildren = document.querySelector(".game-index").childNodes;

  if (counter === 5) {
    counter = 0;
    counterMinus = -1;
    itemChildren[4].classList.remove("active-item");
  } else {
    console.log(counter);
    if (counterMinus >= 0) {
      itemChildren[counterMinus].classList.remove("active-item");
    }
    itemChildren[counter].classList.add("active-item");
    let price = 99 + ",-";
    recentlyReleasedContainer.innerHTML = `
      <a class="released-game" href="details.html?id=${releasedData[counter].id}" style="text-decoration:none;">
       <img src="${releasedData[counter].background_image}">
       <div class="wrapper">
       <p class="game-name"> ${releasedData[counter].name}</p>
       <p class="price"> ${price} </p> 
       </div>
        </a>
       `;
    counter++;
    counterMinus++;
  }
}

recentlyReleasedSection();

function createHtml(games) {
  // const gamesArray = [];
  // for (let i = 0; i <= 19; i++) {
  //   if (games[i]) {
  //     gamesArray.push(games[i]);
  //   }
  // }
  // console.log(gamesArray);
  for (let i = 0; i < games.length; i++) {
    if (gameIndex.childElementCount === 5) {
      return;
    } else {
      gameIndex.innerHTML += `<button class="item"></button>`;
    }
  }
}

const createInterval = setInterval(recentlyReleasedSection, 5000);
