// const queryString = document.location.search;
// const params = new URLSearchParams(queryString);
// const genres = params.get("genres");
//
import { createHTML, createStoreNav } from "../components/store/index.js";
let pageCount = 1;
const cors = "https://noroffcors.herokuapp.com/";
// const apiUrl =
//   "https://api.rawg.io/api/games?" + "page_size=15" + "&page=" + pageCount;
const apiUrl = "https://api.rawg.io/api/games?" + "page=" + pageCount + "&page_size=15";
const apiKey = "&key=cdf875c74f4a4975a6fac3dd5dd7b70b";
const searchQuery = "https://api.rawg.io/api/games?search=";

const fullUrl = cors + apiUrl + apiKey;
const fullSearchUrl = cors + searchQuery;

const genreUrl = "https://api.rawg.io/api/genres?";
const fullGenreUrl = cors + genreUrl + apiKey;
//
const storeHeader = document.querySelector(".store-header");

const loaderContainer = document.querySelector(".loader-container");

const genresContainer = document.querySelector(".genres-container");
const storeContainer = document.querySelector(".store-container");
const selector = document.querySelector("#selector-container");
const radioSelector = document.querySelector(".radio-selector");
const storeNavigation = document.querySelector(".store-navigation");

const storeNavigationContainerUpper = document.querySelector(".store-navigation_container");

const storeNavigationContainerLower = document.querySelector(".store-navigation_container_lower");

// store nav upper
const navLeft = document.querySelector(".nav-left");
const navRight = document.querySelector(".nav-right");
const navIndex = document.querySelector(".store-index");

// store nav lower
const navIndexLower = document.querySelector(".store-index_lower");
const navLeftLower = document.querySelector(".nav-left_lower");
const navRightLower = document.querySelector(".nav-right_lower");
const realUrl = cors + "https://api.rawg.io/api/games?" + "page=" + pageCount + "&page_size=15" + apiKey;
// createHTML(realUrl, pageCount);

createStoreNav(pageCount);

navLeft.addEventListener("click", function () {
  if (pageCount === 1) {
    return;
  } else {
    pageCount--;
    createStoreNav(pageCount);
    // createHTML(realUrl);
  }
});
navRight.addEventListener("click", function () {
  pageCount++;
  createStoreNav(pageCount);
  // createHTML(realUrl);
});

navIndex.addEventListener("click", (e) => {
  const target = e.target.closest("div");
  console.log(target.dataset.value);
  // const numberedTarget = Number(target.value);

  const value = Number(target.innerText);
  pageCount = value;
  createStoreNav(pageCount);

  // createHTML(realUrl);
});

navIndexLower.addEventListener("click", (e) => {
  const target = e.target.closest("div");
  // const numberedTarget = Number(target.value);

  const value = Number(target.innerText);
  pageCount = value;
  createStoreNav(pageCount);

  // createHTML(realUrl);
});

navLeftLower.addEventListener("click", function () {
  if (pageCount === 1) {
    return;
  } else {
    pageCount--;
    createStoreNav(pageCount);
    // createHTML();
  }
});
navRightLower.addEventListener("click", function () {
  pageCount++;
  createStoreNav(pageCount);
  // createHTML();
});

// createHTML(fullUrl);

async function genreFunction(url) {
  const response = await fetch(url);
  const results = await response.json();

  const data = results.results;

  for (let i = 0; i < data.length; i++) {
    selector.innerHTML += `
      <option class="filter genre-${data[i].name}" value=${data[i].id}> ${data[i].name} </option>
  `;

    radioSelector.innerHTML += `
    <div class="radio-genre">   
      <label for="${data[i].name}">${data[i].name}</label>
      <input type="radio" id="${data[i].name}" name="radio-genre" value="${data[i].id}">
    </div>
    <hr/>
  
    
    `;

    selector.onchange = function (event) {
      storeNavigationContainerUpper.style.display = "none";
      storeNavigationContainerLower.style.display = "none";
      const selectedGenre = apiUrl + "genres=" + `${event.target.value}` + "&" + apiKey;

      storeContainer.innerHTML = "";
      createHTML(selectedGenre);
    };
    radioSelector.onchange = function (event) {
      storeNavigationContainerUpper.style.display = "none";
      storeNavigationContainerLower.style.display = "none";
      const selectedGenre = apiUrl + "genres=" + `${event.target.value}` + "&" + apiKey;

      storeContainer.innerHTML = "";
      createHTML(selectedGenre);
    };
  }
}
genreFunction(fullGenreUrl);

const searchForm = document.querySelector(".search-form");
const searchContainer = document.querySelector("#search");
const searchDropdown = document.querySelector(".search-dropdown");
const searchHeader = document.querySelector(".search-header");

async function searchFunction(event, url) {
  loaderContainer.style.display = "flex";
  storeNavigationContainerUpper.style.display = "none";
  storeNavigationContainerLower.style.display = "none";
  try {
    event.preventDefault();
    const searchValue = searchContainer.value;
    const response = await fetch(url + searchValue + "&search_precise=true" + "search_exact=true" + `&${apiKey}`);

    const result = await response.json();
    const data = result.results;

    const priceCalc = Math.floor(Math.random() * 50);

    searchHeader.innerHTML = `showing search results for "${searchValue}"`;
    storeContainer.innerHTML = "";
    searchDropdown.innerHTML = "";
    opacityContainer.classList.remove("is-visible");

    if (data.length === 0) {
      storeContainer.innerHTML = `<div class="no-results"> No results where found during your search....</div>`;
      searchHeader.innerHTML = "";
    } else {
      for (let i = 0; i < data.length; i++) {
        const image = data[i].background_image;
        // storeContainer.innerHTML += `
        // <a href="details.html?id=${data[i].id}" class="game-card" style="text-decoration:none">
        //   <div class="img-container">
        //    <img src="${image}" class="game-img" alt="${data[i].name}">
        //   </div>

        //   <div class="game-info">
        //     <h2 class="game-card-header"> ${data[i].name}</h2>
        //     <p>Price: ${priceCalc} $ </p>
        //     <button class="game-button">View product </button>
        //   </div>
        // </a>`;
        storeContainer.innerHTML += `
        <a href="details.html?id=${data[i].id}" class="game-card" style="text-decoration:none">
          <div class="img-container"> 
            <img src="${image}" class="game-img" alt="${data[i].name}">
          </div>
          <div class="game-info">
            <h2 class="game-card-header"> ${data[i].name}</h2>
            <p class="game-card_price">Price: ${priceCalc} $ </p>
            <button class="game-button">View product </button>
          </div>
        </a>`;
      }
    }
    loaderContainer.style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

searchForm.addEventListener("submit", function () {
  searchFunction(event, fullSearchUrl);
});

async function onTypeSearchFunction(event, url) {
  try {
    event.preventDefault();
    searchDropdown.innerHTML = "";

    const searchValue = searchContainer.value;
    const response = await fetch(url + searchValue + "&search_precise=true" + "search_exact=true" + `&${apiKey}`);
    const result = await response.json();
    const data = result.results;

    if (searchValue.length >= 3 && data.length > 0) {
      searchDropdown.innerHTML = "";
      for (let i = 0; i < 3; i++) {
        const priceCalc = Math.floor(Math.random() * 50);

        searchDropdown.innerHTML += `
        <a class="search-dropdown-results" href="details.html?id=${data[i].id}" style="text-decoration:none">
        <img class="search-dropdown-image" src="${data[i].background_image}">
        <div class="search-dropdown-name" > ${data[i].name}</div>
        <div class="search-dropdown-price" style="border:1px solid black">$${priceCalc}</div>
         </a>
         `;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

searchContainer.addEventListener("input", function () {
  onTypeSearchFunction(event, fullSearchUrl);
});

const opacityContainer = document.querySelector(".opacity-container");

function inputFocus() {
  opacityContainer.classList.add("is-visible");
  searchForm.style.zIndex = 3;
}

// opacityContainer.addEventListener("click", function () {
//   opacityContainer.classList.remove("is-visible");
//   searchDropdown.innerHTML = "";
//   searchForm.style.zIndex = 0;
// });
searchContainer.addEventListener("focus", inputFocus);

searchContainer.addEventListener("blur", function () {
  setTimeout(async function () {
    opacityContainer.classList.remove("is-visible");
    searchDropdown.innerHTML = "";
    searchForm.style.zIndex = 0;
  }, 500);
});
