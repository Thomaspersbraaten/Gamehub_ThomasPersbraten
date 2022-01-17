// const cors = "https://noroffcors.herokuapp.com/";

const resultsContainer = document.querySelector(".results");
const recentlyReleasedContainer = document.querySelector(".recently-released");
const gameIndex = document.querySelector(".game-index");
const searchContainer = document.querySelector(".search-bar");
// const apiUrl = "https://api.rawg.io/api/games?";
// const apiKey = "key=cdf875c74f4a4975a6fac3dd5dd7b70b";
const searchQuery = "https://api.rawg.io/api/games?search=";
const homeHeader = document.querySelector(".homepage-header");

const searchForm = document.querySelector(".search-form");
const sectionHeader = document.querySelector(".section-header");
// const topParagraph = document.querySelector(".top-paragraph");

// async function callApiRawg() {
//   try {
//     const response = await fetch(apiUrl + apiKey);
//     const results = await response.json();
//     const data = results.results;

//     for (let i = 0; i < data.length; i++) {
//       gameArray.push(data[i]);
//     }

//     console.log(gameArray);
//     console.log(data);
//     // console.log(data);
//     resultsContainer.innerHTML = "";
//     // createHtml(data);
//     for (let i = 0; i < data.length; i++) {
//       if (i === 9) {
//         return;
//       } else {
//         const priceCalc = data[i].rating * 40;
//         const price = priceCalc.toFixed(0) + ",-";
//         resultsContainer.innerHTML += `<a href="details.html?id=${data[i].id}" class="game-card" style="text-decoration:none">
//         <img src="${data[i].background_image}" class="game-img" alt="${data[i].name}">
//         <div class="game-info">
//         <h2 class="game-card-header"> ${data[i].name}</h2>
//         <p>Rating: ${data[i].rating} / 5</p>
//         <p>Price: ${price} </p>
//         <button class="game-button">View product </button>
//         </div>
//         </a>`;
//       }
//     }

//     // data.forEach(function (game) {
//     //   const priceCalc = game.rating * 40;
//     //   const price = priceCalc.toFixed(0) + ",-";
//     //   resultsContainer.innerHTML += `

//     //   <a href="details.html?id=${game.id}" class="game-card" style="text-decoration:none">
//     //   <img src="${game.background_image}" class="game-img" alt="${game.name}">
//     //      <div class="game-info">
//     //   <h3 class="game-name"> ${game.name}</h3>
//     //   <p>Rating: ${game.rating} / 5</p>
//     //   <p>Price: ${price} </p>
//     //   <button class="game-button">View product </button>
//     //   </div>
//     //   </a>`;
//     // });
//   } catch (error) {
//     resultsContainer.innerHTML = `<div class="error"> This error occured: ${error} </div>`;
//   }
// }
// Interaction design above , CMS Below

async function callApiRawg(url) {
  try {
    const response = await fetch(url);
    const results = await response.json();

    console.log(results);

    resultsContainer.innerHTML = "";
    // createHtml(data);
    for (let i = 0; i < results.length; i++) {
      if (i === 9) {
        return;
      } else {
        const priceCalc = parseInt(results[i].prices.price) / 100;
        const image = results[i].images;
        const imageSource = image[0].src;
        resultsContainer.innerHTML += `<a href="details.html?id=${results[i].id}" class="game-card" style="text-decoration:none">
        <img src="${imageSource}" class="game-img" alt="${results[i].name}">
        <div class="game-info">
        <h2 class="game-card-header"> ${results[i].name}</h2>
    
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

const apiUrl = "https://tpbro.online/Gamehub-CMS/wp-json/wc/store/products";
callApiRawg(apiUrl);

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

// async function recentlyReleasedSection() {
//   const response = await fetch(recentlyReleasedApi);
//   const results = await response.json();
//   var releasedData = results.results;
//   createHtml(releasedData);

//   var itemChildren = document.querySelector(".game-index").childNodes;

//   if (counter === 5) {
//     counter = 0;
//     counterMinus = -1;
//     itemChildren[4].classList.remove("active-item");
//   } else {
//     console.log(counter);
//     if (counterMinus >= 0) {
//       itemChildren[counterMinus].classList.remove("active-item");
//     }
//     itemChildren[counter].classList.add("active-item");
//     let price = 99 + ",-";
//     recentlyReleasedContainer.innerHTML = `
//       <a class="released-game" href="details.html?id=${releasedData[counter].id}" style="text-decoration:none;">
//        <img src="${releasedData[counter].background_image}">
//        <div class="wrapper">
//        <h2 class="game-name"> ${releasedData[counter].name}</h2>
//        <p class="price"> ${price} </p>
//        </div>
//         </a>
//        `;
//     counter++;
//     counterMinus++;
//   }
// }

// recentlyReleasedSection();

// function createHtml(games) {
//   for (let i = 0; i < games.length; i++) {
//     if (gameIndex.childElementCount === 5) {
//       return;
//     } else {
//       gameIndex.innerHTML += `<button class="item"></button>`;
//     }
//   }
// }

// const createInterval = setInterval(recentlyReleasedSection, 5000);
