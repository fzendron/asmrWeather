const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const inputCity = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const errorMessage = document.querySelector('.errorMessage p');


inputCity.addEventListener('keyup', (e) => {
    if (e.data === 'Enter' || e.keyCode === 13) {
        searchWeatherData();
    }
});

search.addEventListener('click', () => {
    searchWeatherData();
})

function searchWeatherData() {
    const APIKey = '33eec12a1146baf5de56ec5fa8837554';
    const city = document.querySelector('.search-box input').value;

    eraseModel();

    if (city === '') {
        errorMessage.style.display = 'block';
        container.style.height = '200px';
        return;
    }
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if(json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .windy span');

            switch(json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/haze.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

    });
};

function eraseModel() {    
    error404.style.display = 'none';
    errorMessage.style.display = 'none'
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    container.style.height = '105px';
}