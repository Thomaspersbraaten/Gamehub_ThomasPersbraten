const navMenu = document.querySelector("nav");
// const hamburgerMenu = document.querySelector(".hamburger");
// const hamburgerBars = document.querySelector(".fa-bars");
// const hamburgerX = document.querySelector(".fa-times-circle");
// hamburgerX.style.display = "none";
// Shows and hides the navigation menu on smaller screens

const hamburgerContainer = document.querySelector(".ham-container");
const lineOne = document.querySelector(".ham-line-one");
const lineTwo = document.querySelector(".ham-line-two");
const lineThree = document.querySelector(".ham-line-three");
const lineFour = document.querySelector(".ham-line-four");

hamburgerContainer.addEventListener("click", showmenu);

function showmenu() {
  lineOne.classList.toggle("opacity");
  lineFour.classList.toggle("opacity");
  if (navMenu.style.display === "none") {
    // hamburgerBars.style.display = "none";
    // hamburgerX.style.display = "block";
    navMenu.style.display = "flex";
  } else {
    navMenu.style.display = "none";
    // hamburgerBars.style.display = "block";
    // hamburgerX.style.display = "none";
  }
  //
  lineTwo.classList.toggle("rotate-two");
  lineThree.classList.toggle("rotate-three");
}

// hamburgerMenu.addEventListener("click", function () {
//   if (navMenu.style.display === "none") {
//     // hamburgerBars.style.display = "none";
//     // hamburgerX.style.display = "block";
//     navMenu.style.display = "flex";
//   } else {
//     navMenu.style.display = "none";
//     // hamburgerBars.style.display = "block";
//     // hamburgerX.style.display = "none";
//   }
// });
