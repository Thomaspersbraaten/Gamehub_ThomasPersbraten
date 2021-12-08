const fullName = document.querySelector("#name");
const nameValidator = document.querySelector(".name-validation");
const emailField = document.querySelector("#email");
const emailValidator = document.querySelector(".email-validation");
const passwordField = document.querySelector("#password");
const passwordValidator = document.querySelector(".password-validation");
const rePasswordField = document.querySelector("#re-password");
const rePasswordValidationField = document.querySelector(
  ".re-password-validation"
);
const phoneField = document.querySelector("#phonenumber");
const phoneValidationField = document.querySelector(".phone-validation");
const streetField = document.querySelector("#streetname");
const streetValidationField = document.querySelector(".street-validation");
const zipField = document.querySelector("#zip-code");
const zipValidationField = document.querySelector(".zip-validation");
const cityField = document.querySelector("#city");
const cityValidationField = document.querySelector(".city-validation");
const nameInfo = document.querySelector(".name-info");
const emailInfo = document.querySelector(".email-info");
const passwordInfo = document.querySelector(".password-info");
const rePasswordInfo = document.querySelector(".re-password-info");
const phoneInfo = document.querySelector(".phone-info");
const streetInfo = document.querySelector(".street-info");
const zipInfo = document.querySelector(".zip-info");
const cityInfo = document.querySelector(".city-info");
const form = document.querySelector(".form");

function validateName() {
  nameValidator.innerHTML = "";
  if (checkLength(fullName.value, 1)) {
    greenValidationStatus(nameValidator);
    removeInputInformation(nameInfo);
  } else {
    redValidationStatus(nameValidator);
    addInputInformation(nameInfo);
  }
}

function validateEmail() {
  emailValidator.innerHTML = "";
  if (checkEmail(email.value)) {
    greenValidationStatus(emailValidator);
    removeInputInformation(emailInfo);
  } else {
    redValidationStatus(emailValidator);
    addInputInformation(emailInfo);
  }
}

function validatePassword() {
  passwordValidator.innerHTML = "";
  if (checkPassword(password.value)) {
    greenValidationStatus(passwordValidator);
    removeInputInformation(passwordInfo);
  } else {
    redValidationStatus(passwordValidator);
    addInputInformation(passwordInfo);
  }
}

function checkIfPasswordsMatches() {
  rePasswordValidationField.innerHTML = "";
  if (passwordField.value === rePasswordField.value) {
    greenValidationStatus(rePasswordValidationField);
    removeInputInformation(rePasswordInfo);
  } else {
    redValidationStatus(rePasswordValidationField);
    addInputInformation(rePasswordInfo);
  }
}

function validatePhoneNumber() {
  phoneValidationField.innerHTML = "";
  if (checkPhonenumber(phoneField.value)) {
    greenValidationStatus(phoneValidationField);
    removeInputInformation(phoneInfo);
  } else {
    redValidationStatus(phoneValidationField);
    addInputInformation(phoneInfo);
  }
}

function validateStreetname() {
  streetValidationField.innerHTML = "";
  if (checkLength(streetField.value, 1)) {
    greenValidationStatus(streetValidationField);
    removeInputInformation(streetInfo);
  } else {
    redValidationStatus(streetValidationField);
    addInputInformation(streetInfo);
  }
}

function validateZip() {
  zipValidationField.innerHTML = "";
  if (checkZip(zipField.value)) {
    greenValidationStatus(zipValidationField);
    removeInputInformation(zipInfo);
  } else {
    redValidationStatus(zipValidationField);
    addInputInformation(zipInfo);
  }
}

function validateCity() {
  cityValidationField.innerHTML = "";
  if (checkLength(cityField.value, 1)) {
    greenValidationStatus(cityValidationField);
    removeInputInformation(cityInfo);
  } else {
    redValidationStatus(cityValidationField);
    addInputInformation(cityInfo);
  }
}

// loader and green checkmark\red cross validation

function greenValidationStatus(container) {
  console.log(container);
  container.classList.add("loader");
  setTimeout(function () {
    container.classList.remove("loader");
    container.innerHTML = `✔️`;
    console.log(container);
  }, 400);
}

function redValidationStatus(container) {
  container.classList.add("loader");
  setTimeout(function () {
    container.classList.remove("loader");
    container.innerHTML = `❌`;
  }, 400);
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
// Events

fullName.addEventListener("blur", validateName);
emailField.addEventListener("blur", validateEmail);
passwordField.addEventListener("blur", validatePassword);
rePasswordField.addEventListener("blur", checkIfPasswordsMatches);
phoneField.addEventListener("blur", validatePhoneNumber);
streetField.addEventListener("blur", validateStreetname);
zipField.addEventListener("blur", validateZip);
cityField.addEventListener("blur", validateCity);
// Checks

function checkLength(value, length) {
  if (value.trim().length >= length) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patterMatches = regEx.test(email);
  return patterMatches;
}

function checkPassword(password) {
  const regEx = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
  const passwordMatch = regEx.test(password);
  return passwordMatch;
}

function checkPhonenumber(phone) {
  const regEx = /\b\d{8}\b/;
  const phoneMatch = regEx.test(phone);
  return phoneMatch;
}

function checkZip(zip) {
  const regEx = /\b\d{4}\b/;
  const zipMatch = regEx.test(zip);
  return zipMatch;
}
