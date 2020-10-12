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