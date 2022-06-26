const navLeft = document.querySelector(".nav-left");
const navRight = document.querySelector(".nav-right");
const navIndex = document.querySelector(".store-index");
const storeNavigationContainerUpper = document.querySelector(".store-navigation_container");
// let pageCount = 1;
const storeNavigationContainerLower = document.querySelector(".store-navigation_container_lower");
// store nav lower
const navIndexLower = document.querySelector(".store-index_lower");
const navLeftLower = document.querySelector(".nav-left_lower");
const navRightLower = document.querySelector(".nav-right_lower");
export function createStoreNav(pageCount) {
  navIndex.innerHTML = "";
  navIndexLower.innerHTML = "";

  if (pageCount === 1) {
    navLeft.style.opacity = 0.5;
    navLeftLower.style.opacity = 0.5;
    const indexOne = `
      <div class="active-nav" data-value=${pageCount}>${pageCount}</div>
      <div data-value=${pageCount + 1}>${pageCount + 1} </div>
      <div data-value=${pageCount + 2}>${pageCount + 2} </div>
      </div>...</div>
      `;
    navIndex.innerHTML = indexOne;
    navIndexLower.innerHTML = indexOne;
  }
  if (pageCount === 2) {
    navLeft.style.opacity = 1;
    const indexTwo = `
      <div data-value=${pageCount - 1}>${pageCount - 1}</div>    
      <div class="active-nav" data-value=${pageCount}>${pageCount}</div>
      <div data-value=${pageCount + 1}>${pageCount + 1} </div>
      <div data-value=${pageCount + 2}>${pageCount + 2} </div>
      `;
    navIndex.innerHTML = indexTwo;
    navLeftLower.style.opacity = 1;
    navIndexLower.innerHTML = indexTwo;
  }
  if (pageCount > 2) {
    navIndex.innerHTML = `
      <div>${pageCount - 2}</div> 
      <div>${pageCount - 1}</div>    
      <div class="active-nav">${pageCount}</div>
      <div>${pageCount + 1} </div>
      <div>${pageCount + 2} </div>
      `;
    navIndexLower.innerHTML = `
      <div>${pageCount - 2}</div> 
      <div>${pageCount - 1}</div>    
      <div class="active-nav">${pageCount}</div>
      <div>${pageCount + 1} </div>
      <div>${pageCount + 2} </div>
      `;
  }
}
