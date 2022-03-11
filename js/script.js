const cors = "https://noroffcors.herokuapp.com/";

const resultsContainer = document.querySelector(".results");
// const recentlyReleasedContainer = document.querySelector(".recently-released");
const featuredGames = document.querySelector(".featured-games");

const gameIndex = document.querySelector(".game-index");
const searchContainer = document.querySelector(".search-bar");
const apiUrl = "https://api.rawg.io/api/games?";
const apiKey = "key=cdf875c74f4a4975a6fac3dd5dd7b70b";
const searchQuery = "https://api.rawg.io/api/games?search=";
const homeHeader = document.querySelector(".homepage-header");
const featuredBackground = document.querySelector(".background");

// const sectionHeader = document.querySelector(".section-header");
// sectionHeader.innerHTML = "Featured Games";

// const apiUrl = "https://tpbro.online/Gamehub-CMS/wp-json/wc/store/products";
const fullUrl = cors + apiUrl + apiKey;

async function callApiRawg(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results.results);
    const data = results.results;
    resultsContainer.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      const priceCalc = parseInt(data[i].rating * 5);
      const image = data[i].background_image;

      // const imageSource = image[0].src;
      resultsContainer.innerHTML += `
      <a href="details.html?id=${data[i].id}" class="game-card" style="text-decoration:none">
        <div class="img-container"> 
          <img src="${image}" class="game-img" alt="${data[i].name}">
        </div>
        <div class="game-info">
          <h2 class="game-card-header"> ${data[i].name}</h2>
          <p class="game-card_price"> $ ${priceCalc}  </p>
          <button class="game-button">View product </button>
        </div>
      </a>`;
    }
  } catch (error) {
    resultsContainer.innerHTML = `<div class="error"> This error occured: ${error} </div>`;
  }
}

callApiRawg(fullUrl);
