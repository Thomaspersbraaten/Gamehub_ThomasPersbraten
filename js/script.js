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

const searchForm = document.querySelector(".search-form");
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
    // const response = await fetch(url + "?per_page=10");
    // const results = await response.json();
    // const feaResp = await fetch(url + "?featured=true");
    // const feaRes = await feaResp.json();
    resultsContainer.innerHTML = "";
    // feaRes.forEach(function (data) {
    //   const priceCalc = parseInt(data.prices.price) / 100;
    //   const image = data.images;
    //   const imageSource = image[0].src;

    //   featuredGames.innerHTML += `<a href="details.html?id=${data.id}" class="game-card" style="text-decoration:none">
    //   <img src="${imageSource}" class="game-img" alt="${data.name}">
    //   <div class="game-info">
    //   <h2 class="game-card-header"> ${data.name}</h2>

    //   <p>Price: ${priceCalc} </p>
    //   <button class="game-button">View product </button>
    //   </div>
    //   </a>`;
    // });

    // const notFeaturedGame = await fetch(url + "?featured=false");
    // const notFeaturedGameResponse = await notFeaturedGame.json();
    // console.log(notFeaturedGameResponse);

    for (let i = 0; i < data.length; i++) {
      const priceCalc = parseInt(data[i].rating * 5);
      const image = data[i].background_image;
    
      // const imageSource = image[0].src;
      resultsContainer.innerHTML += `<a href="details.html?id=${data[i].id}" class="game-card" style="text-decoration:none">
            <div class="img-container"> 
            <img src="${image}" class="game-img" alt="${data[i].name}">
            </div>
         
            <div class="game-info">
            <h2 class="game-card-header"> ${data[i].name}</h2>

            <p>Price: ${priceCalc} $ </p>
            <button class="game-button">View product </button>
            </div>
            </a>`;
    }
    // for (let i = 0; i < notFeaturedGameResponse.length; i++) {
    //   const priceCalc = parseInt(notFeaturedGameResponse[i].prices.price) / 100;
    //   const image = notFeaturedGameResponse[i].images;
    //   const imageSource = image[0].src;
    //   resultsContainer.innerHTML += `<a href="details.html?id=${notFeaturedGameResponse[i].id}" class="game-card" style="text-decoration:none">
    //         <img src="${imageSource}" class="game-img" alt="${notFeaturedGameResponse[i].name}">
    //         <div class="game-info">
    //         <h2 class="game-card-header"> ${notFeaturedGameResponse[i].name}</h2>

    //         <p>Price: ${priceCalc} $ </p>
    //         <button class="game-button">View product </button>
    //         </div>
    //         </a>`;
    // }
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

callApiRawg(fullUrl);

async function searchFunction(event) {
  event.preventDefault();
  try {
    const searchValue = searchContainer.value;
    console.log(searchValue);
    const response = await fetch(apiUrl + `?search=${searchValue}`);

    const result = await response.json();

    homeHeader.innerHTML = `showing search results for: ${searchValue}`;
    featuredGames.style.display = "none";
    featuredBackground.style.display = "none";
    gameIndex.style.display = "none";
    resultsContainer.innerHTML = "";
    // sectionHeader.innerHTML = "";

    if (result.length === 0 || searchValue === "") {
      resultsContainer.innerHTML = `<div class="no-results"> No results where found during your search....</div>`;
    } else {
      result.forEach(function (results) {
        const priceCalc = parseInt(results.prices.price) / 100;
        const image = results.images;

        const imageSource = image[0].src;

        resultsContainer.innerHTML += `<a href="details.html?id=${results.id}" class="game-card" style="text-decoration:none">
      <img src="${imageSource}" class="game-img" alt="${results.name}">
      <div class="game-info">
      <h2 class="game-card-header"> ${results.name}</h2>
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
