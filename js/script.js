const apiUrl =
  "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=e22366ffd2474d1dab07f27c78147445";

// If i could not get access to the API due to "cross-origin request blocked", i would use this proxy variable: fixedUrl.
// const cors = "https://noroffcors.herokuapp.com/";
// const fixedUrl = cors + url;

const resultsContainer = document.querySelector(".results");

async function callApiRawg() {
  try {
    const response = await fetch(apiUrl);
    const results = await response.json();
    const data = results.results;
    console.log(data);
    resultsContainer.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      const priceCalc = data[i].rating * 5;
      const price = priceCalc.toFixed(1);
      console.log(price);
      resultsContainer.innerHTML += `<a href="details.html?id=${data[i].id}" class="game-card" style="text-decoration:none">
      <img src="${data[i].background_image}">
      <p>Name: ${data[i].name}</p>
      <p>Rating: ${data[i].rating}</p>
      <p>Price: $${price} </p> 
      </a>`;
      if (i === 7) {
        break;
      }
    }
  } catch (error) {
    resultsContainer.innerHTML = `<div class="error"> This error occured: ${error} </div>`;
  }
}

callApiRawg();
