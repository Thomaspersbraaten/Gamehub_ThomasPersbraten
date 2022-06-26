const loaderContainer = document.querySelector(".loader-container");
const storeContainer = document.querySelector(".store-container");
import { createStoreNav } from "./index.js";
export async function createHTML(url, pageCount) {
  loaderContainer.style.display = "flex";

  try {
    // const response = await fetch(cors + apiUrl + apiKey);
    // const response = await fetch(cors + "https://api.rawg.io/api/games?" + "page=" + pageCount + "&page_size=15" + apiKey);
    const response = await fetch(url);
    const results = await response.json();

    const data = results.results;
    console.log(data);

    // let gameCategories = [];

    storeContainer.innerHTML = "";
    // createHtml(data);
    // if (data[i].rating > 1) {
    //   let priceCalc = parseInt(data[i].rating * 5);
    // } else {
    //   let priceCalc = Math.floor(Math.random() * 50);
    // }
    for (let i = 0; i < data.length; i++) {
      const image = data[i].background_image;
      //   storeContainer.innerHTML += `
      //       <a href="details.html?id=${data[i].id}" class="game-card" style="text-decoration:none">
      //         <div class="img-container">
      //           <img src="${image}" class="game-img" alt="${data[i].name}">
      //         </div>
      //         <div class="game-info">
      //           <h2 class="game-card-header"> ${data[i].name}</h2>
      //           <p class="game-card_price">Price: ${priceCalc} $ </p>
      //           <button class="game-button">View product </button>
      //         </div>
      //       </a>`;
      storeContainer.innerHTML += `
          <a href="details.html?id=${data[i].id}" class="game-card" style="text-decoration:none">
            <div class="img-container"> 
              <img src="${image}" class="game-img" alt="${data[i].name}">
            </div>
            <div class="game-info">
              <h2 class="game-card-header"> ${data[i].name}</h2>
      
              <button class="game-button">View product </button>
            </div>
          </a>`;
    }
    createStoreNav(pageCount);
    loaderContainer.style.display = "none";
  } catch (error) {
    storeContainer.innerHTML = `<div class="error"> This error occurred: ${error} </div>`;
  }
}
