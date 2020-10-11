/** 
  * @desc This module imports functionalities from other modules
  * and is bundled into the final js for adding to the website
*/

// Import Statements
const modalHandler = require("./modalHandler");
const addCountries = require("./countryOptionHandler");
const scrollEffectHandler = require("./effectsHandler");
const updateData = require("./fetchDataHandler");

// Add Modal Handler 
modalHandler();

// Add Countries to option list
addCountries();

scrollEffectHandler();

console.log(updateData());

