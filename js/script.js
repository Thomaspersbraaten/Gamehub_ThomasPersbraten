// const cors = "https://noroffcors.herokuapp.com/";

const resultsContainer = document.querySelector(".results");
// const recentlyReleasedContainer = document.querySelector(".recently-released");
const featuredGames = document.querySelector(".featured-games");

const gameIndex = document.querySelector(".game-index");
const searchContainer = document.querySelector(".search-bar");
// const apiUrl = "https://api.rawg.io/api/games?";
// const apiKey = "key=cdf875c74f4a4975a6fac3dd5dd7b70b";
const searchQuery = "https://api.rawg.io/api/games?search=";
const homeHeader = document.querySelector(".homepage-header");

const searchForm = document.querySelector(".search-form");
const sectionHeader = document.querySelector(".section-header");
sectionHeader.innerHTML = "Featured Games";

const apiUrl = "https://tpbro.online/Gamehub-CMS/wp-json/wc/store/products";

async function callApiRawg(url) {
  try {
    const response = await fetch(url + "?per_page=10");
    const results = await response.json();
    console.log(results);

    const feaResp = await fetch(url + "?featured=true");
    const feaRes = await feaResp.json();
    console.log(feaRes);
    resultsContainer.innerHTML = "";
    feaRes.forEach(function (data) {
      const priceCalc = parseInt(data.prices.price) / 100;
      const image = data.images;
      const imageSource = image[0].src;

      featuredGames.innerHTML += `<a href="details.html?id=${data.id}" class="game-card" style="text-decoration:none">
      <img src="${imageSource}" class="game-img" alt="${data.name}">
      <div class="game-info">
      <h2 class="game-card-header"> ${data.name}</h2>
     
      <p>Price: ${priceCalc} </p>
      <button class="game-button">View product </button>
      </div>
      </a>`;
    });

    const featuredCheck = url + "?featured=true";
    const nonFearesp = await fetch(url + "?featured=false");
    const nonFeaRes = await nonFearesp.json();
    console.log(nonFeaRes);

    // for (let i = 0; i < results.length; i++) {
    //   const priceCalc = parseInt(results[i].prices.price) / 100;
    //   const image = results[i].images;
    //   const imageSource = image[0].src;
    //   resultsContainer.innerHTML += `<a href="details.html?id=${results[i].id}" class="game-card" style="text-decoration:none">
    //         <img src="${imageSource}" class="game-img" alt="${results[i].name}">
    //         <div class="game-info">
    //         <h2 class="game-card-header"> ${results[i].name}</h2>

    //         <p>Price: ${priceCalc} $ </p>
    //         <button class="game-button">View product </button>
    //         </div>
    //         </a>`;
    // }
    for (let i = 0; i < nonFeaRes.length; i++) {
      const priceCalc = parseInt(nonFeaRes[i].prices.price) / 100;
      const image = nonFeaRes[i].images;
      const imageSource = image[0].src;
      resultsContainer.innerHTML += `<a href="details.html?id=${nonFeaRes[i].id}" class="game-card" style="text-decoration:none">
            <img src="${imageSource}" class="game-img" alt="${nonFeaRes[i].name}">
            <div class="game-info">
            <h2 class="game-card-header"> ${nonFeaRes[i].name}</h2>
        
            <p>Price: ${priceCalc} $ </p>
            <button class="game-button">View product </button>
            </div>
            </a>`;
    }
  } catch (error) {
    resultsContainer.innerHTML = `<div class="error"> This error occured: ${error} </div>`;
  }
}

// searchContainer.addEventListener("submit", function (event) {
//   event.preventDefault();

//   console.log(searchValue.value);
//   const value = searchValue.value;
//   const newUrl = apiUrl + `?search=${value}`;
//   productContainer.innerHTML = "";
//   callApiRawg(newUrl);
// });

callApiRawg(apiUrl);

async function searchFunction(event) {
  try {
    event.preventDefault();
    const searchValue = searchContainer.value;
    const response = await fetch(apiUrl + `?search=${searchValue}`);

    const result = await response.json();
    console.log(result);

    homeHeader.innerHTML = `showing search results for "${searchValue}"`;
    recentlyReleasedContainer.style.display = "none";
    gameIndex.style.display = "none";
    resultsContainer.innerHTML = "";
    sectionHeader.innerHTML = "";

    if (result.length === 0) {
      resultsContainer.innerHTML = `<div class="no-results"> No results where found during your search....</div>`;
    } else {
      result.forEach(function (results) {
        const priceCalc = parseInt(results.prices.price) / 100;
        const image = results.images;

        const imageSource = image[0].src;

        resultsContainer.innerHTML += `<a href="details.html?id=${results.id}" class="game-card" style="text-decoration:none">
      <img src="${imageSource}" class="game-img" alt="${results.name}">
      <div class="game-info">
      <h2> ${results.name}</h2>
      <p>Rating:  / 5</p>
      <p>Price: ${priceCalc} </p>
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
