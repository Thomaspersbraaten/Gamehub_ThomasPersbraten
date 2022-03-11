const navMenu = document.querySelector("nav");
const hamburgerMenu = document.querySelector(".hamburger");
const hamburgerBars = document.querySelector(".fa-bars");
const hamburgerX = document.querySelector(".fa-times-circle");
hamburgerX.style.display = "none";
// Shows and hides the navigation menu on smaller screens

hamburgerMenu.addEventListener("click", function () {
  if (navMenu.style.display === "none") {
    hamburgerBars.style.display = "none";
    hamburgerX.style.display = "block";
    navMenu.style.display = "flex";
  } else {
    navMenu.style.display = "none";
    hamburgerBars.style.display = "block";
    hamburgerX.style.display = "none";
  }
});
