const cors = "https://noroffcors.herokuapp.com/";
// If i could not get access to the API due to "cross-origin request blocked", i would use this proxy variable: fixedUrl.
// const cors = "https://noroffcors.herokuapp.com/";
// const fixedUrl = cors + url;

const resultsContainer = document.querySelector(".results");

async function callApiRawg() {
  try {
    const response = await fetch(
      "https://api.rawg.io/api/games?key=cdf875c74f4a4975a6fac3dd5dd7b70b"
    );
    const results = await response.json();
    const data = results.results;
    console.log(data);
    resultsContainer.innerHTML = "";
    data.forEach(function (game) {
      const priceCalc = game.rating * 5;
      const price = priceCalc.toFixed(1);
      console.log(price);

      resultsContainer.innerHTML += `<a href="details.html?id=${game.id}" class="game-card" style="text-decoration:none">
      <img src="${game.background_image}" class="game-img">
      <div style="background-image: url(${game.background_image})" class="game-img"> </div>
      <h2> ${game.name}</h2>
      <p>Rating: ${game.rating} / 5</p>
      <p>Price: $${price} </p> 
      <button class="game-button">View product </button>
        </a>`;
    });
    // for (let i = 0; i < data.length; i++) {
    //   const priceCalc = data[i].rating * 5;
    //   const price = priceCalc.toFixed(1);
    //   console.log(price);
    //   resultsContainer.innerHTML += `<a href="details.html?id=${data[i].id}" class="game-card" style="text-decoration:none">
    //   <img src="${data[i].background_image}">
    //   <p>Name: ${data[i].name}</p>
    //   <p>Rating: ${data[i].rating}</p>
    //   <p>Price: $${price} </p>
    //   </a>`;
    //   if (i === 7) {
    //     break;
    //   }
    // }
  } catch (error) {
    resultsContainer.innerHTML = `<div class="error"> This error occured: ${error} </div>`;
  }
}

callApiRawg();

// let count = 0;

// setInterval(function () {
//   count++;
//   console.log(count);
// }, 5000);
