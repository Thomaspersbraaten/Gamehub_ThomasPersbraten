const hamburgerContainer = document.querySelector(".ham-container");
const lineOne = document.querySelector(".ham-line-one");
const lineTwo = document.querySelector(".ham-line-two");
const lineThree = document.querySelector(".ham-line-three");
const lineFour = document.querySelector(".ham-line-four");

hamburgerContainer.addEventListener("click", showmenu);

function showmenu() {
  lineOne.classList.toggle("opacity");
  lineFour.classList.toggle("opacity");
  //
  lineTwo.classList.toggle("rotate-two");
  lineThree.classList.toggle("rotate-three");
}
