(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/** 
  * @desc This module is used to add the list of all countries into the DOM
*/

const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

const addCountries = _ =>{
    const menu = document.getElementById('countries');
    let option = null;
    country_list.forEach(country => {
        option = document.createElement("option");
        option.text = country;
        menu.add(option);
    });
};

module.exports = addCountries;
},{}],2:[function(require,module,exports){
// Scroll Effects

const navigation = document.querySelector(".navigation");

const scrollEffectHandler = _ => {
    let lastScrollTop = window.pageYOffset;
    
    window.onscroll = _ => {
        if (window.pageYOffset > 0.98* window.innerHeight) {
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
    };     
};

const changingTextEffectHandler = _ => {
    const phrases = ["<div>Wear a <span>Mask</span></div>", 
                        "<div>Stay at <span>Home</span></div>", "<div>Wash <span>Hands</span></div>",];
    const textHolder = document.querySelector(".heading-primary__changing-text");
    let index = 0, pos = 100;
    textHolder.innerHTML = phrases[index];
    textHolder.style.top = pos/10 + 'rem';
    setInterval(_ => {
        if (pos > -90) {
            textHolder.style.top = pos/10 + 'rem';
            pos--;
        } else {
            pos = 100;
            index++;
            if (index === phrases.length) index = 0;
            textHolder.firstChild.remove();
            textHolder.insertAdjacentHTML("afterbegin", phrases[index]);
        }
    }, 20);
};

module.exports = changingTextEffectHandler;
},{}],3:[function(require,module,exports){
let dataLoaded = false;

const getOverallData = _ => {
    const fetchData = fetch("https://api.covid19api.com/summary");

    // Handle on success
    fetchData.then(response => {
        return response.json();
    }).then(data => {
        dataLoaded = true;
        data = data.Global;
        const totalCases = data.TotalConfirmed;
        const deaths = data.TotalDeaths;
        const recovered = data.TotalRecovered;
        const active = totalCases - recovered;
        document.getElementById('total__cases').textContent = totalCases;
        document.getElementById('recovered__cases').textContent = recovered;
        document.getElementById('total__deaths').textContent = deaths;
        document.getElementById('active__cases').textContent = active;
        document.querySelector('.section-world-report__loader').remove();
        document.getElementById('world-data-report').classList.remove('u-inactive');
    });

    fetchData.catch(error => {
        let errorSection = document.querySelector('.section-world-report__loader');
        errorSection.classList.add('section-world-report__error');
        errorSection.textContent = "Could not get data from the server. Please refresh the website to try again..";
    });
};

const getCountryData = _ => {
    e = document.getElementById('countries');
    console.log(e.options[e.selectedIndex].textContent);
};

document.getElementById('countries').addEventListener("change", event => {
    
});



module.exports = getOverallData;
},{}],4:[function(require,module,exports){
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


},{"./countryOptionHandler":1,"./effectsHandler":2,"./fetchDataHandler":3,"./modalHandler":5}],5:[function(require,module,exports){
/** 
  * @desc This module handles the opening and closing of the modal
  * When the modal is opened video cooresponding to the button is inserted
  * Closing, removes the video from modal
  * Also facilitates closing modal on a backdrop click
*/

const modalHandler = () => {

  // Video iframs corresponding to each feature
  const videoHandler = {
    "hand-wash" : `<iframe width="560" height="315" src="https://www.youtube.com/embed/3PmVJQUCm4E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "keep-distance" : `<iframe width="560" height="315" src="https://www.youtube.com/embed/2WCtGFNENYU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "wear-mask" : `<iframe width="560" height="315" src="https://www.youtube.com/embed/adB8RW4I3o4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "elbow-coughing" : `<iframe width="560" height="315" src="https://www.youtube.com/embed/mMzaiZ2n0cw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "stay-home" : `<iframe width="560" height="315" src="https://www.youtube.com/embed/8ZfWp7Zdp9M" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    "get-tested" : `<iframe width="560" height="315" src="https://www.youtube.com/embed/zulEwoIIlrM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
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
  document.querySelector(".modal").addEventListener("click", _ => {
    removeVideo();
    window.location.href = '#section-how';
  });

  // For removing the video when the cross button is clicked
  document.querySelector(".modal__close").addEventListener("click", () => {
    removeVideo();
  });

  // Event listener for adding the corresponding videos for all the buttons
  document.querySelectorAll(".card__btn").forEach((btn) => {
    btn.addEventListener("click", event => {
      // Extract button identifier
      const identifier = event.target.classList[event.target.classList.length -1].split('--')[1];
      // Add corresponding video using the video object
      document.querySelector(".modal__video").insertAdjacentHTML("beforeend", videoHandler[identifier]);
    });
  });
};

module.exports = modalHandler;

},{}]},{},[4]);
