

let inserter = require("./modalInjector.js");


inserter();

document.querySelector(".modal__close").addEventListener(onclick, function () {
    console.log("clicked");
  });