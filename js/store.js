const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const genres = params.get("genres");

const storeHeader = document.querySelector(".store-header");

const genresapi =
  "https://api.rawg.io/api/genres?key=cdf875c74f4a4975a6fac3dd5dd7b70b";
const genresContainer = document.querySelector(".genres-container");
const storeContainer = document.querySelector(".store-container");
const genreForm = document.querySelector(".genre-form");

async function myFunction() {
  const response = await fetch(genresapi);
  const results = await response.json();
  const data = results.results;
  console.log(results);

  for (let i = 0; i < data.length; i++) {
    console.log(data[i].name);
  }
  for (let i = 0; i < data.length; i++) {
    genreForm.innerHTML += `
 
      <input type="radio" id="${data[i].name}" name="${data[i].name}"> 
      <label for="${data[i].name}">${data[i].name}</label>
  
      
      `;
  }
}

myFunction();

const searchQuery = "https://api.rawg.io/api/games?search=";
const apiKey = "key=cdf875c74f4a4975a6fac3dd5dd7b70b";
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
