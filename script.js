const apiKey = 'b3bea81781680d5db14b8d136c9809b6';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=sylhet';

async function checkWeather () {
    const response = await fetch(apiURL + `&appid=${apiKey}`);
    var data = await response.json();

    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + `&deg;c`;
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';
}

checkWeather ();