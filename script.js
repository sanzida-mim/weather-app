function QS(selector) {
    document.querySelector(selector);
}

const apiKey = 'b3bea81781680d5db14b8d136c9809b6';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = QS('.search input');
const searchBtn = QS('.search button');
const weatherIcon = QS('.weather-icon');

async function checkWeather (city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        QS('.error').style.display = 'block';
        QS('.weather').style.display = 'none';
    } else {
        var data = await response.json();

        QS('.temp').innerHTML = Math.round(data.main.temp) + `&deg;c`;
        QS('.city').innerHTML = data.name;
        QS('.humidity').innerHTML = data.main.humidity + '%';
        QS('.wind').innerHTML = data.wind.speed + 'km/h';

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'images/clouds.png';
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = 'images/rain.png';
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = 'images/drizzle.png';
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = 'images/mist.png';
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'images/clear.png';
        } else if (data.weather[0].main == 'Snow') {
            weatherIcon.src = 'images/snow.png';
        } else if (data.weather[0].main == 'Haze') {
            weatherIcon.src = 'images/haze.png';
        }

        QS('.weather').style.display = 'block';
        QS('.error').style.display = 'none';
        searchBox.value = '';
    }  
}

searchBox.addEventListener('keydown', (event)=>{
    if (event.key === 'Enter') {
        searchBtn.click();
    }
})

searchBtn.addEventListener('click', ()=>{
    if (searchBox.value == '') {
        alert('Please Enter A City Name First.');
        return;
    }

    checkWeather(searchBox.value);
})