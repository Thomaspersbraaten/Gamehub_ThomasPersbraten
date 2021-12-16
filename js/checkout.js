const continueButton = document.querySelector(".first-continue");
const shippingInformation = document.querySelector(".shipping-information");
const secondContinueButton = document.querySelector(".second-continue");
const paymentInformation = document.querySelector(".payment-information");
const firstHeader = document.querySelector(".first-header");
const thirdContinueButton = document.querySelector(".third-continue");
const secondHeader = document.querySelector(".second-header");
const removeItem = document.querySelector(".remove");

const phoneField = document.querySelector("#phone");
const phoneValidationField = document.querySelector(".phone-validation");
const phoneInfo = document.querySelector(".phone-info");

const addressField = document.querySelector("#address");
const addressValidationField = document.querySelector(".address-validation");
const addressInfo = document.querySelector(".address-info");

const countryField = document.querySelector("#country");
const countryValidationField = document.querySelector(".country-validation");
const countryInfo = document.querySelector(".country-info");

const zipField = document.querySelector("#zipcode");
const zipValidationField = document.querySelector(".zipcode-validation");
const zipInfo = document.querySelector(".zipcode-info");

const shippingForm = document.querySelector(".shipping-form");

var phoneValid = false;
var addressValid = false;
var countryValid = false;
var zipValid = false;
var shippingArray = [];

//

function formValidation(event) {
  event.preventDefault();
  if (phoneValid && addressValid && countryValid && zipValid) {
    shippingArray.push(phoneField.value);
    shippingArray.push(addressField.value);
    shippingArray.push(countryField.value);
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
    countryValidation();
    zipValidation();
  }
}
shippingForm.addEventListener("submit", formValidation);

//

function showShipmentInformation() {
  shippingInformation.style.display = "flex";
}

function showPaymentInformation() {
  paymentInformation.style.display = "flex";
  shippingInformation.style.display = "none";
  firstHeader.innerHTML = `1. Shipping Information ✔️`;
}

function reviewOrder() {
  paymentInformation.style.display = "none";
  secondHeader.innerHTML = "2. Payment Information ✔️";
}

continueButton.addEventListener("click", showShipmentInformation);
// secondContinueButton.addEventListener("click", showPaymentInformation);
thirdContinueButton.addEventListener("click", reviewOrder);

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
  if (addressField.textLength >= 1) {
    greenValidationStatus(addressValidationField, addressField);
    removeInputInformation(addressInfo);
    addressValid = true;
  } else {
    redValidationStatus(addressValidationField, addressField);
    addInputInformation(addressInfo);
  }
}
function countryValidation() {
  countryValidationField.innerHTML = "";
  if (countryField.textLength >= 1) {
    greenValidationStatus(countryValidationField, countryField);
    removeInputInformation(countryInfo);
    countryValid = true;
  } else {
    redValidationStatus(countryValidationField, countryField);
    addInputInformation(countryInfo);
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

// events
phoneField.addEventListener("blur", phonevalidation);
addressField.addEventListener("blur", addressValidation);
countryField.addEventListener("blur", countryValidation);
zipField.addEventListener("blur", zipValidation);
