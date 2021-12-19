const continueButton = document.querySelector(".first-continue");
const shippingInformation = document.querySelector(".shipping-information");
const shipmentButton = document.querySelector(".shipment-button");
const paymentInformation = document.querySelector(".payment-information");
const firstHeader = document.querySelector(".first-header");
const paymentButton = document.querySelector(".payment-button");
const secondHeader = document.querySelector(".second-header");
const removeItem = document.querySelector(".remove");

const phoneField = document.querySelector("#phone");
const phoneValidationField = document.querySelector(".phone-validation");
const phoneInfo = document.querySelector(".phone-info");

const addressField = document.querySelector("#address");
const addressValidationField = document.querySelector(".address-validation");
const addressInfo = document.querySelector(".address-info");

const cityField = document.querySelector("#city");
const cityValidationField = document.querySelector(".city-validation");
const cityInfo = document.querySelector(".city-info");

const zipField = document.querySelector("#zipcode");
const zipValidationField = document.querySelector(".zipcode-validation");
const zipInfo = document.querySelector(".zipcode-info");

const shippingForm = document.querySelector(".shipping-form");

// payment consts

const cardNumberField = document.querySelector("#card-nr");
const cardNumberValidationField = document.querySelector(".card-nr-validation");
const cardNumberInfo = document.querySelector(".card-nr-info");

const cardNameField = document.querySelector("#card-name");
const cardNameValidationField = document.querySelector(".card-name-validation");
const cardNameInfo = document.querySelector(".card-name-info");

const expireField = document.querySelector("#expire");
const expireValidationField = document.querySelector(".expire-validation");
const expireInfo = document.querySelector(".expire-info");

const cvcField = document.querySelector("#cvc");
const cvcValidationField = document.querySelector(".cvc-validation");
const cvcInfo = document.querySelector(".cvc-info");

const paymentForm = document.querySelector(".payment-form");

// review ordre consts

const reviewOrderContainer = document.querySelector(".review-order");
const reviewDiv = document.querySelector(".review-div");

//

var phoneValid = false;
var addressValid = false;
var cityValid = false;
var zipValid = false;
var shippingArray = [];

//

var cardNumberValid = false;
var cardNameValid = false;
var expireValid = false;
var cvcValid = false;
var paymentArray = [];

// shipping form

function shipmentFormValidation(event) {
  event.preventDefault();
  if (phoneValid && addressValid && cityValid && zipValid) {
    shippingArray.push(phoneField.value);
    shippingArray.push(addressField.value);
    shippingArray.push(cityField.value);
    shippingArray.push(zipField.value);
    console.log(shippingArray);
    shippingForm.reset();
    paymentInformation.style.display = "flex";
    shippingInformation.style.display = "none";
    firstHeader.innerHTML = `1. Shipping Information ✔️`;
    //   shippingForm.innerHTML = `    <div class="message">
    //   Thank you for registering for a Gamehub account! <br />
    //   Please login below
    // </div>
    // `;

    return shippingArray;
  } else {
    phonevalidation();
    addressValidation();
    cityValidation();
    zipValidation();
  }
}
shippingForm.addEventListener("submit", shipmentFormValidation);

// payment form

function paymentFormValidation(event) {
  event.preventDefault();
  if (cardNumberValid && cardNameValid && expireValid && cvcValid) {
    paymentArray.push(cardNameField.value);
    paymentArray.push(cardNumberField.value);

    console.log(paymentArray);
    paymentForm.reset();
    paymentInformation.style.display = "none";
    // reviewOrder.style.display = "none";
    secondHeader.innerHTML = `2. Payment Information ✔️`;
    createReviewOrder();

    return paymentArray;
  } else {
    cardNumberValidation();
    cardNameValidation();
    expireValidation();
    cvcValidation();
  }
}
paymentForm.addEventListener("submit", paymentFormValidation);
const reviewInfo = document.querySelector(".review-info");

// review order HTML

function createReviewOrder() {
  reviewOrderContainer.style.display = "flex";
  reviewInfo.innerHTML = `
  <h2> Your shipment will be delivered to your address</h2> 
  <h3> ${shippingArray[1]}</h3>
  <h3> ${shippingArray[2]} ${shippingArray[3]}</h3>
  <h3> Phone: ${shippingArray[0]}</h3>
  <h2> Payed with credit card: </h2>
    <h3> Card Owner: ${paymentArray[0]}</h3>
    <h3> Card Number: ${paymentArray[1]}</h3>

    `;
}

// step by step confirmations

function showShipmentInformation() {
  shippingInformation.style.display = "flex";
}

// function showPaymentInformation() {
//   paymentInformation.style.display = "flex";
//   shippingInformation.style.display = "none";
//   firstHeader.innerHTML = `1. Shipping Information ✔️`;
// }

// function reviewOrder() {
//   paymentInformation.style.display = "none";
//   secondHeader.innerHTML = "2. Payment Information ✔️";
// }

continueButton.addEventListener("click", showShipmentInformation);

// shipment functions

function phonevalidation() {
  phoneValidationField.innerHTML = "";
  if (checkPhone(phoneField.value)) {
    greenValidationStatus(phoneValidationField, phoneField);
    removeInputInformation(phoneInfo);
    phoneValid = true;
  } else {
    redValidationStatus(phoneValidationField, phoneField);
    addInputInformation(phoneInfo);
  }
}

function addressValidation() {
  addressValidationField.innerHTML = "";
  if (checkLength(addressField.value, 1)) {
    greenValidationStatus(addressValidationField, addressField);
    removeInputInformation(addressInfo);
    addressValid = true;
  } else {
    redValidationStatus(addressValidationField, addressField);
    addInputInformation(addressInfo);
  }
}

function cityValidation() {
  cityValidationField.innerHTML = "";
  if (checkLength(cityField.value, 1)) {
    greenValidationStatus(cityValidationField, cityField);
    removeInputInformation(cityInfo);
    cityValid = true;
  } else {
    redValidationStatus(cityValidationField, cityField);
    addInputInformation(cityInfo);
  }
}

function zipValidation() {
  zipValidationField.innerHTML = "";
  if (checkZip(zipField.value)) {
    greenValidationStatus(zipValidationField, zipField);
    removeInputInformation(zipInfo);
    zipValid = true;
  } else {
    redValidationStatus(zipValidationField, zipField);
    addInputInformation(zipInfo);
  }
}

function checkPhone(phone) {
  const regex = /\b\d{8}\b/;
  const phoneMAtch = regex.test(phone);
  return phoneMAtch;
}

function checkZip(zip) {
  const regex = /\b\d{4}\b/;
  const zipMAtch = regex.test(zip);
  return zipMAtch;
}

function checkLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

// payment functions

function cardNumberValidation() {
  cardNumberValidationField.innerHTML = "";
  if (checkCardNumber(cardNumberField.value)) {
    greenValidationStatus(cardNumberValidationField, cardNumberField);
    removeInputInformation(cardNumberInfo);
    cardNumberValid = true;
  } else {
    redValidationStatus(cardNumberValidationField, cardNumberField);
    addInputInformation(cardNumberInfo);
  }
}

function cardNameValidation() {
  cardNameValidationField.innerHTML = "";
  if (checkLength(cardNameField.value, 1)) {
    greenValidationStatus(cardNameValidationField, cardNameField);
    removeInputInformation(cardNameInfo);
    cardNameValid = true;
  } else {
    redValidationStatus(cardNameValidationField, cardNameField);
    addInputInformation(cardNameInfo);
  }
}

function expireValidation() {
  expireValidationField.innerHTML = "";
  if (checkExpire(expireField.value)) {
    greenValidationStatus(expireValidationField, expireField);
    removeInputInformation(expireInfo);
    expireValid = true;
  } else {
    redValidationStatus(expireValidationField, expireField);
    addInputInformation(expireInfo);
  }
}

function cvcValidation() {
  cvcValidationField.innerHTML = "";
  if (checkcvc(cvcField.value)) {
    greenValidationStatus(cvcValidationField, cvcField);
    removeInputInformation(cvcInfo);
    cvcValid = true;
  } else {
    redValidationStatus(cvcValidationField, cvcField);
    addInputInformation(cvcInfo);
  }
}

function checkExpire(expire) {
  const regex = /\b\d{4}\b/;
  const cardMatch = regex.test(expire);
  return cardMatch;
}

function checkcvc(cvc) {
  const regex = /\b\d{3}\b/;
  const cvcMatch = regex.test(cvc);
  return cvcMatch;
}

function checkCardNumber(cardnumber) {
  const regex = /\b\d{16}\b/;
  const cardMatch = regex.test(cardnumber);
  return cardMatch;
}
// loader and green checkmark/red cross validation + border

function greenValidationStatus(container, input) {
  container.classList.add("loader");
  setTimeout(function () {
    container.classList.remove("loader");
    container.innerHTML = `✔️`;
    input.style.border = "1px solid black";
  }, 250);
}

function redValidationStatus(container, input) {
  container.classList.add("loader");
  setTimeout(function () {
    container.classList.remove("loader");
    container.innerHTML = `❌`;
    input.style.border = "1px solid red";
  }, 250);
}

// red information text under inputs

function addInputInformation(container) {
  setTimeout(function () {
    container.style.display = "flex";
  }, 400);
}

function removeInputInformation(container) {
  setTimeout(function () {
    container.style.display = "none";
  }, 400);
}

//  shipment events
phoneField.addEventListener("blur", phonevalidation);
addressField.addEventListener("blur", addressValidation);
cityField.addEventListener("blur", cityValidation);
zipField.addEventListener("blur", zipValidation);

// payment events

cardNumberField.addEventListener("blur", cardNumberValidation);
cardNameField.addEventListener("blur", cardNameValidation);
expireField.addEventListener("blur", expireValidation);
cvcField.addEventListener("blur", cvcValidation);

// confirm

const confirmButton = document.querySelector(".confirm-button");
const checkoutContainer = document.querySelector(".checkout");
const basketContainer = document.querySelector(".basket_contents");

function createConfirmationInfo() {
  checkoutContainer.style.display = "none";
  reviewDiv.style.display = "none";
  basketContainer.innerHTML = `
  <h1>Order received!</h1>
  <div class="order__info">
    <p>Your order has been received.</p>
    <p>Order nr: 1894</p>
    <p>You will receive an email confirmation shortly.</p>
  </div>
  <div class="go__home">
    <h2>Click here to go back to the home page</h2>
    <a href="index.html" class="cta home_button">Home</a>
  </div>
  `;
}

confirmButton.addEventListener("click", createConfirmationInfo);
