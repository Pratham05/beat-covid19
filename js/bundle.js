(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/** 
  * @desc This module is used to add the list of all countries into the DOM
*/

// List of all the world countries 
const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

const addCountries = _ =>{
    const menu = document.getElementById('countries');
    let option = null;
    country_list.forEach(country => {
      // This is because australia has already been added as default
      if (country !== "Australia") {
        option = document.createElement("option");
        // Done to clean the data in th array
        country = country.replace("&amp;", "and");
        option.text = country;
        menu.add(option);
      }
    });
};

module.exports = addCountries;
},{}],2:[function(require,module,exports){
/** 
  * @desc This module adds in effects for the website
  * 2 effects are added - ScrollEffect for Navigation scroll
  * and Changing text on Hero component
*/


/** 
  * @desc Adds in the navigation scroll effect
*/
const scrollEffectHandler = _ => {
    const navigation = document.querySelector(".navigation");
    let lastScrollTop = window.pageYOffset;
    window.onscroll = _ => {
        // The scroll effect should not work on screen sizes less than 900
        // to support responsive design
        if (window.innerWidth > 900) {
            if (window.pageYOffset > 0.20* window.innerHeight) {
                let scrollTop = window.pageYOffset;
                // navigation__inactive has css code for hiding the navigation bar
                if (scrollTop > lastScrollTop) {
                    navigation.classList.add('navigation__inactive'); 
                } else {
                    navigation.classList.remove('navigation__inactive');
                }
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            } else {
                // Added for a possible scenario where scroll was near 98vh and was very fast
                navigation.classList.remove('navigation__inactive');
            }
        } else {
            // Make visible in case window resized when invisible
            navigation.classList.remove('navigation__inactive');
        }
    };     
};

/** 
  * @desc Adds in the Change of text on hero component
*/
const changingTextEffectHandler = _ => {
    const phrases = ["<div>Wear a <span>Mask</span></div>", 
                        "<div>Stay at <span>Home</span></div>", "<div>Wash <span>Hands</span></div>",];
    const textHolder = document.querySelector(".heading-primary__changing-text");
    let index = 0;
    textHolder.insertAdjacentHTML("afterbegin", phrases[index]);
    setInterval(_ => {
        let timer = setInterval(_ => {
            textHolder.firstChild.remove();
            textHolder.insertAdjacentHTML("afterbegin", phrases[index]);
            textHolder.classList.remove("u-inactive");
            clearInterval(timer);
            timer = null;
        }, 400);
        
        textHolder.classList.add("u-inactive");
        index += 1;
        if (index === phrases.length) {
            index = 0;
        }
    }, 3000);
};

exports.changingTextEffectHandler = changingTextEffectHandler;
exports.scrollEffectHandler = scrollEffectHandler;
},{}],3:[function(require,module,exports){
/** 
  * @desc This module is used to get data from covid API
  * and update the correesponding values in DOM
  * 
  * API used - https://documenter.getpostman.com/view/10808728/SzS8rjbc
*/

/** 
  * @desc Converts a number to a comma seperated string 
  * according to the number format for DOM display
  * eg. 1134567 is converted to 1,134,567
*/
const getCommaSeperatedString = (num) => {
    // convert to string 
    str = num.toString();
    let stringArray = str.split('');
    let i = stringArray.length - 1;
    if (i > 2) {
        i -= 2;
        while (i > 0) {
            stringArray.splice(i, 0, ',');
            i -= 3;
        }
    } 
    return stringArray.join('');
};

/** 
  * @desc used to set data on the DOM for the world report
  * @param data - the total data object obtained from the API
*/
const setWorldData = (data) => {
    data = data.Global;
    const totalCases = data.TotalConfirmed;
    const deaths = data.TotalDeaths;
    const recovered = data.TotalRecovered;
    const active = totalCases - recovered;
    //update DOM
    document.getElementById('total__cases').textContent = getCommaSeperatedString(totalCases);
    document.getElementById('recovered__cases').textContent = getCommaSeperatedString(recovered);
    document.getElementById('total__deaths').textContent = getCommaSeperatedString(deaths);
    document.getElementById('active__cases').textContent = getCommaSeperatedString(active);
};

/** 
  * @desc used to set data on the DOM for the individual country report
  * @param data - the total data object obtained from the API
*/
const setCountryData = (data) => {
    const countryElement = document.getElementById('countries');
    const country = countryElement.options[countryElement.selectedIndex].textContent;
    let totalCases = 0;
    let deaths = 0;
    let recovered = 0;
    let active = 0;
    for (countryData of data.Countries) {
        if (countryData.Country === country) {
            totalCases = countryData.TotalConfirmed;
            deaths = countryData.TotalDeaths;
            recovered = countryData.TotalRecovered;
            active = totalCases - recovered;
            break;
        }
    }
    //update DOM
    document.getElementById('country__total__cases').textContent = getCommaSeperatedString(totalCases);
    document.getElementById('country__recovered__cases').textContent = getCommaSeperatedString(recovered);
    document.getElementById('country__total__deaths').textContent = getCommaSeperatedString(deaths);
    document.getElementById('country__active__cases').textContent = getCommaSeperatedString(active);
};

/** 
  * @desc used to remove loader and make country and world data visible
*/
const removeLoader = _ => {
    document.querySelector('.section-world-report__loader').remove();
    document.getElementById('world-data-report').classList.remove('u-inactive');
};

/** 
  * @desc used to display error message in case the API server doesnt return data
*/
const displayError = _ => {
    let errorSection = document.querySelector('.section-world-report__loader');
    errorSection.classList.add('section-world-report__error');
    errorSection.textContent = "Could not get data from the server. Please refresh the website to try again..";
};

/** 
  * @desc used to add event listener on the drop down of countries
  * @param data - the total data object obtained from the API
*/
const addCountryListener = (data) => {
    document.getElementById('countries').addEventListener("change", event => {
        setCountryData(data);
    });
};

/** 
  * @desc used to create a request and to the API
  * and then watch for promise to return data or an error message
*/
const fetchDataHandler = _ => {
    const fetchData = fetch("https://api.covid19api.com/summary");

    // Handle on success
    fetchData.then(response => {
        return response.json();
    }).then(data => {
        setWorldData(data);
        setCountryData(data);
        addCountryListener(data);
        removeLoader();
    });

    fetchData.catch(error => {
        displayError();
    });
};

module.exports = fetchDataHandler;
},{}],4:[function(require,module,exports){
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


},{"./countryOptionHandler":1,"./effectsHandler":2,"./fetchDataHandler":3,"./modalHandler":5,"./responsiveHandler":6}],5:[function(require,module,exports){
/** 
  * @desc This module handles the opening and closing of the modal
  * When the modal is opened video cooresponding to the button is inserted
  * Closing, removes the video from modal
  * Also facilitates closing modal on a backdrop click
*/

const modalHandler = () => {

  // Video iframs corresponding to each feature
  const videoHandler = {
    "hand-wash" : `<iframe src="https://www.youtube.com/embed/3PmVJQUCm4E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "keep-distance" : `<iframe src="https://www.youtube.com/embed/2WCtGFNENYU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "wear-mask" : `<iframe src="https://www.youtube.com/embed/adB8RW4I3o4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "elbow-coughing" : `<iframe src="https://www.youtube.com/embed/mMzaiZ2n0cw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "stay-home" : `<iframe src="https://www.youtube.com/embed/8ZfWp7Zdp9M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "get-tested" : `<iframe src="https://www.youtube.com/embed/zulEwoIIlrM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  };

  /** 
    * @desc Removes The video from the modal
  */
  const removeVideo = _ => {
    const videoElement = document.querySelector(".modal__video").firstChild;
    if (videoElement) document.querySelector(".modal__video").firstChild.remove();
  };

  // Set Event Listeners

  // For closing the modal and removing the button on backdrop click
  document.querySelector(".modal").addEventListener("click", event => {
    // Ensuring close only on modal click down and not its children like modal__content
    if (event.target.classList.value === "modal") {
      removeVideo();
      window.location.href = '#section-how';
    }
  });

  // For removing the video when the cross button is clicked
  document.querySelector(".modal__close").addEventListener("click", () => {
    removeVideo();
  });

  // Event listener for adding the corresponding videos for all the buttons
  document.querySelectorAll(".card__btn").forEach((btn) => {
    btn.addEventListener("click", event => {
      // Extract button identifier
      removeVideo();
      const identifier = event.target.classList[event.target.classList.length -1].split('--')[1];
      // Add corresponding video using the video object
      document.querySelector(".modal__video").insertAdjacentHTML("beforeend", videoHandler[identifier]);
    });
  });
};

module.exports = modalHandler;

},{}],6:[function(require,module,exports){
/** 
  * @desc This module adds in event listenrs for responsive navigation menu
  * 1. Close menu on size increase more than 900px
  * 2. Show and hide backdrop on menu closing and opening
  * 3. Close menu and backdrop on backdrop click
*/

/** 
  * @desc Close menu by unchecking checkbox and giving inactive class to backdrop
*/
const closeMenu = _ => {
    // Close hamburger Menu
    document.querySelector('#navigation__menu-btn').checked = false;
    // Close BackDrop
    document.querySelector(".backdrop").classList.add("u-inactive");
};

/** 
  * @desc Adds listener on window size change for menu closing
*/
const addResizingListener = _ => {
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });
};


/** 
  * @desc Adds backdrop listeners
*/
const addBackdroplListeners = _ => {
    // Appearing and Disappearing
    document.querySelector('#navigation__menu-btn').addEventListener("change", (event) => {
        document.querySelector(".backdrop").classList.toggle("u-inactive");
    });

    // Close menu on backdrop click
    document.querySelector('.backdrop').addEventListener("click", _ => {
        closeMenu();
    });
};


/** 
  * @desc Main function 
  * calss other listener adders and is exported for the main js
*/
const responsiveHandler = _ => {
    // close menu on resizing
    addResizingListener();
    // Backdrop Manipulation
    addBackdroplListeners();
};

module.exports = responsiveHandler;
},{}]},{},[4]);
