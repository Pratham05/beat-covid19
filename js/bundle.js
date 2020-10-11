(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


let inserter = require("./modalInjector.js");


inserter();

document.querySelector(".modal__close").addEventListener(onclick, function () {
    console.log("clicked");
  });
},{"./modalInjector.js":2}],2:[function(require,module,exports){
/** 
  * @desc This module injects the iframes for youtube videos into the modal
  * HTML code for different options available in the website
*/

let handWashVideo = `<div><iframe width="560" height="315" src="https://www.youtube.com/embed/3PmVJQUCm4E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;


document.querySelector(".modal__close").addEventListener("click", () => {
  document.querySelector(".modal__video").firstChild.remove();
});



let inserter = () => {
    document.querySelector(".modal__video").insertAdjacentHTML("afterbegin", handWashVideo);
};



module.exports = inserter;

},{}]},{},[1]);
