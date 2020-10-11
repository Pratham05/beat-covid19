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