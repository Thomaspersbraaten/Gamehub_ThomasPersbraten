const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const genres = params.get("genres");

const storeHeader = document.querySelector(".store-header");

const genresapi =
  "https://api.rawg.io/api/genres?key=cdf875c74f4a4975a6fac3dd5dd7b70b";
const genresContainer = document.querySelector(".genres-container");
const storeContainer = document.querySelector(".store-container");

async function genreSelection() {
  const response = await fetch(genresapi);
  const results = await response.json();
  const data = results.results;
  console.log(results);
  const queryArray = [];

  for (let i = 0; i < data.length; i++) {
    console.log(data[i].name);
  }
  for (let i = 0; i < data.length; i++) {
    genresContainer.innerHTML += `
      <button class="genre-${data[i].name}"> ${data[i].name} </button>    `;
  }
}

genreSelection();

const apiUrl = "https://api.rawg.io/api/games?";
const apiKey = "key=cdf875c74f4a4975a6fac3dd5dd7b70b";

async function callApiRawg() {
  try {
    const response = await fetch(apiUrl + apiKey);
    const results = await response.json();
    const data = results.results;
    console.log(data);

    storeContainer.innerHTML = "";
    // createHtml(data);
    for (let i = 0; i < data.length; i++) {
      if (i === 9) {
        return;
      } else {
        const priceCalc = data[i].rating * 40;
        const price = priceCalc.toFixed(0) + ",-";
        storeContainer.innerHTML += `<a href="details.html?id=${data[i].id}" class="game-card" style="text-decoration:none">
        <img src="${data[i].background_image}" class="game-img" alt="${data[i].name}">
        <div class="game-info">
        <h2 class="game-card-header"> ${data[i].name}</h2>
        <p>Rating: ${data[i].rating} / 5</p>
        <p>Price: ${price} </p>
        <button class="game-button">View product </button>
        </div>
        </a>`;
      }
    }
  } catch (error) {
    storeContainer.innerHTML = `<div class="error"> This error occured: ${error} </div>`;
  }
}

callApiRawg();

const searchQuery = "https://api.rawg.io/api/games?search=";

const searchForm = document.querySelector(".search-form");
const searchContainer = document.querySelector(".search-bar");
async function searchFunction(event) {
  try {
    event.preventDefault();
    const searchValue = searchContainer.value;
    const response = await fetch(searchQuery + searchValue + "&" + apiKey);
    const result = await response.json();
    const game = result.results;
    console.log(game);
    storeHeader.innerHTML = `showing search results for "${searchValue}"`;
    storeContainer.innerHTML = "";

    if (!game) {
      storeContainer.innerHTML = `<div class="no-results"> No results where found during your search....</div>`;
    } else {
      game.forEach(function (game) {
        const priceCalc = game.rating * 40;
        const price = priceCalc.toFixed(0) + ",-";
        storeContainer.innerHTML += `<a href="details.html?id=${game.id}" class="game-card" style="text-decoration:none">
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
