// sign in consts
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
const nameInfo = document.querySelector(".name-info");
const emailInfo = document.querySelector(".email-info");
const passwordInfo = document.querySelector(".password-info");
const rePasswordInfo = document.querySelector(".re-password-info");

const signUpForm = document.querySelector(".signup-form");
const signupContainer = document.querySelector(".signup");
const messageContainer = document.querySelector(".message");

// form event

var nameValid = false;
var emailValid = false;
var passwordValid = false;
var rePasswordValid = false;
var signInArray = [];

function formValidation(event) {
  event.preventDefault();
  if (nameValid && emailValid && passwordValid && rePasswordValid) {
    signInArray.push(email.value);
    signInArray.push(passwordField.value);
    console.log(signInArray);
    signUpForm.reset();
    signUpForm.innerHTML = `    <div class="message">
    Thank you for registering for a Gamehub account! <br />
    Please login below
  </div>
  `;
    messageContainer.style.display = "inline";
    return signInArray;
  } else {
    validateName();
    validatePassword();
    validateEmail();
    checkIfPasswordsMatches();
  }
}
signUpForm.addEventListener("submit", formValidation);

// validation functions

function validateName() {
  nameValidator.innerHTML = "";
  if (checkLength(fullName.value, 1)) {
    greenValidationStatus(nameValidator, fullName);
    removeInputInformation(nameInfo);
    nameValid = true;
    return nameValid;
  } else {
    redValidationStatus(nameValidator, fullName);
    addInputInformation(nameInfo);
    nameValid = false;
    return nameValid;
  }
}

function validateEmail() {
  emailValidator.innerHTML = "";
  if (checkEmail(email.value)) {
    greenValidationStatus(emailValidator, email);
    removeInputInformation(emailInfo);
    emailValid = true;
    return emailValid;
  } else {
    redValidationStatus(emailValidator, email);
    addInputInformation(emailInfo);
    emailValid = false;
    return emailValid;
  }
}

function validatePassword() {
  passwordValidator.innerHTML = "";
  if (checkPassword(passwordField.value)) {
    greenValidationStatus(passwordValidator, password);
    removeInputInformation(passwordInfo);
    passwordValid = true;
    return passwordValid;
  } else {
    redValidationStatus(passwordValidator, password);
    addInputInformation(passwordInfo);
    passwordValid = false;
    return passwordValid;
  }
}

function checkIfPasswordsMatches() {
  rePasswordValidationField.innerHTML = "";
  if (
    passwordField.value === rePasswordField.value &&
    checkPassword(rePasswordField.value)
  ) {
    greenValidationStatus(rePasswordValidationField, rePasswordField);
    removeInputInformation(rePasswordInfo);
    rePasswordValid = true;
    return rePasswordValid;
  } else {
    redValidationStatus(rePasswordValidationField, rePasswordField);
    addInputInformation(rePasswordInfo);
    rePasswordValid = false;
    return rePasswordValid;
  }
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
// Events

fullName.addEventListener("blur", validateName);
emailField.addEventListener("blur", validateEmail);
passwordField.addEventListener("blur", validatePassword);
rePasswordField.addEventListener("blur", checkIfPasswordsMatches);

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

// login

const loginPassword = document.querySelector("#password-login");
const loginEmail = document.querySelector("#email-login");
const loginInfo = document.querySelector(".login-info");
const loginForm = document.querySelector(".login-form");

function ValidateLogin(event) {
  console.log("test");
  console.log(loginPassword.value);
  console.log(loginEmail.value);
  event.preventDefault();
  if (
    signInArray[0] === loginEmail.value &&
    signInArray[1] === loginPassword.value
  ) {
    loginForm.reset();
    console.log("wohoo");
    loginInfo.style.display = "flex";
    loginInfo.innerHTML = `<div class="message" style="color:black">
    You are logged in as ${signInArray[0]} <br />
    Redirecting to homepage in 5seconds or <a href="index.html">click here</a>
  </div>`;

    setTimeout(function () {
      window.location.href = "index.html";
    }, 5000);
  } else {
    loginInfo.style.display = "flex";
  }
}

loginForm.addEventListener("submit", ValidateLogin);
