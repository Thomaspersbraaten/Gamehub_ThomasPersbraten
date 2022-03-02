const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const genres = params.get("genres");
//

const cors = "https://noroffcors.herokuapp.com/";
const apiUrl = "https://api.rawg.io/api/games?";
const apiKey = "key=cdf875c74f4a4975a6fac3dd5dd7b70b";
const searchQuery = "https://api.rawg.io/api/games?search=";
const fullUrl = cors + apiUrl + apiKey;

const genreUrl =  "https://api.rawg.io/api/genres?";
const fullGenreUrl = cors + genreUrl + apiKey;
//
const storeHeader = document.querySelector(".store-header");

const genresContainer = document.querySelector(".genres-container");
const storeContainer = document.querySelector(".store-container");
const selector = document.querySelector("#selector-container");


async function genreFunction(url) {
  const response = await fetch(url);
  const results = await response.json();
  
    const data = results.results;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
    selector.innerHTML += `<option class="filter genre-${data[i].name}" value=${data[i].id}> ${data[i].name} </option>`;
    selector.onchange = function (event) {
      console.log(event.value);
      const selectedGenre = apiUrl + "genres=" + `${event.target.value}` + "&" +  apiKey;
      console.log(selectedGenre);
      storeContainer.innerHTML = "";
      createHTML(selectedGenre);
    };
  }
}
genreFunction(fullGenreUrl)
 

// async function genreSelection() {
//   const response = await fetch(categoryUrl);
//   const results = await response.json();
// for (let i = 0; i < results.length; i++) {
//   selector.innerHTML += `<option class="filter genre-${results[i].name}" value=${results[i].id}> ${results[i].name} </option>`;
//   selector.onchange = function (event) {
//     const selectedCategoryUrl = apiUrl + `?category=${event.target.value}`;
//     storeContainer.innerHTML = "";
//     createHTML(selectedCategoryUrl);
//   };
  // }


// genreSelection();

// const searchForm = document.querySelector(".search-form");
// const searchContainer = document.querySelector(".search-bar");
// async function searchFunction(event) {
//   try {
//     event.preventDefault();
//     const searchValue = searchContainer.value;
//     const response = await fetch(apiUrl + `?search=${searchValue}`);

//     const result = await response.json();
//     // console.log(result);

//     homeHeader.innerHTML = `showing search results for "${searchValue}"`;
//     recentlyReleasedContainer.style.display = "none";
//     gameIndex.style.display = "none";
//     storeContainer.innerHTML = "";
//     sectionHeader.innerHTML = "";

//     if (result.length === 0) {
//       storeContainer.innerHTML = `<div class="no-results"> No results where found during your search....</div>`;
//     } else {
//       result.forEach(function (results) {
//         const priceCalc = parseInt(results.prices.price) / 100;
//         const image = results.images;

//         const imageSource = image[0].src;

//         storeContainer.innerHTML += `<a href="details.html?id=${results.id}" class="game-card" style="text-decoration:none">
//       <img src="${imageSource}" class="game-img" alt="${results.name}">
//       <div class="game-info">
//       <h2> ${results.name}</h2>
//       <p>Rating:  / 5</p>
//       <p>Price: ${priceCalc} </p>
//       <button class="game-button">View product </button>
//       </div>
//       </a>`;
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// searchForm.addEventListener("submit", searchFunction);

async function createHTML(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();
    // console.log(results.results);
    const data = results.results;
    console.log(data);

    // console.log(results);
    // let gameCategories = [];

    storeContainer.innerHTML = "";
    // createHtml(data);
    for (let i = 0; i < data.length; i++) {
      if (i === 9) {
        return;
      } else {
        const priceCalc = parseInt(data[i].rating * 5);
        const image = data[i].background_image;
     
        storeContainer.innerHTML += `<a href="details.html?id=${data[i].id}" class="game-card" style="text-decoration:none">
        <img src="${image}" class="game-img" alt="${data[i].name}">
        <div class="game-info">
        <h2 class="game-card-header"> ${data[i].name}</h2>
        <p>Price: ${priceCalc} $ </p>
        <button class="game-button">View product </button>
        </div>
        </a>`;
      }
    }

    // data.forEach(function (game) {
    //   const priceCalc = game.rating * 40;
    //   const price = priceCalc.toFixed(0) + ",-";
    //   resultsContainer.innerHTML += `

    //   <a href="details.html?id=${game.id}" class="game-card" style="text-decoration:none">
    //   <img src="${game.background_image}" class="game-img" alt="${game.name}">
    //      <div class="game-info">
    //   <h3 class="game-name"> ${game.name}</h3>
    //   <p>Rating: ${game.rating} / 5</p>
    //   <p>Price: ${price} </p>
    //   <button class="game-button">View product </button>
    //   </div>
    //   </a>`;
    // });
  } catch (error) {
    storeContainer.innerHTML = `<div class="error"> This error occured: ${error} </div>`;
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

createHTML(fullUrl);
