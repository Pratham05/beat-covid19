/** 
  * @desc This module imports functionalities from other modules
  * and is bundled into the final js for adding to the website
*/

// Import Statements
const modalHandler = require("./modalHandler");
const addCountries = require("./countryOptionHandler");
const scrollEffectHandler = require("./effectsHandler").scrollEffectHandler;
const changingTextEffectHandler = require("./effectsHandler").changingTextEffectHandler;
const updateData = require("./fetchDataHandler");
const responsiveHandler = require("./responsiveHandler");

// Add Modal Handler 
modalHandler();

// Add Scroll Handler
scrollEffectHandler();

// Add Changing Text Handler
changingTextEffectHandler();

// Add Countries to option list
addCountries();

// Get and Update the country data
updateData();

// Add responsive Handler
responsiveHandler();

