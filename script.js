const apiKey = 'b3bea81781680d5db14b8d136c9809b6';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather (city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        var data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + `&deg;c`;
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

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

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
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