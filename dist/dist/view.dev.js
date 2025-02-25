"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;

// import {} from "./controller.js"
function init(addMealButton, formDisplay) {
  addMealButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var style = window.getComputedStyle(formDisplay);
    var displayValue = style.display;
    console.log(displayValue);

    switch (displayValue) {
      case "none":
        formDisplay.style.display = 'block';
        break;

      case "block":
        formDisplay.style.display = "none";
        break;

      default:
        formDisplay.style.display = "block";
        break;
    }
  });
  document.addEventListener('click', function (e) {
    formDisplay.style.display = "none";
  });
  formDisplay.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}