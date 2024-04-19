const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    // weatherFn('Pune'); 
});

async function getWeather() {
    const city = $('#city-input').val();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
    await weatherFn(city);
}

async function weatherFn(cityName) {
    const temp = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);

    const weatherIcons = {
        '01d': 'fas fa-sun', 
        '01n': 'fas fa-moon', 
        '02d': 'fas fa-cloud-sun', 
        '02n': 'fas fa-cloud-moon', 
        '03d': 'fas fa-cloud', 
        '03n': 'fas fa-cloud', 
        '04d': 'fas fa-cloud', 
        '04n': 'fas fa-cloud', 
        '09d': 'fas fa-cloud-showers-heavy', 
        '09n': 'fas fa-cloud-showers-heavy',
        '10d': 'fas fa-cloud-sun-rain', 
        '10n': 'fas fa-cloud-moon-rain', 
        '11d': 'fas fa-bolt', 
        '11n': 'fas fa-bolt', 
        '13d': 'fas fa-snowflake', 
        '13n': 'fas fa-snowflake', 
        '50d': 'fas fa-smog', 
        '50n': 'fas fa-smog'
    };

   
    const weatherIconClass = weatherIcons[data.weather[0].icon];
    if (weatherIconClass) {
        $('#weather-icon').removeClass().addClass(weatherIconClass);
    } else {
        $('#weather-icon').removeClass().addClass('fas fa-question-circle'); 
    }

    // Get the length of the city name
    const cityNameLength = data.name.length;

    // Calculate the new size for the weather card based on the city name length
    const newSize = 250 + cityNameLength * 5; // Adjust the multiplier as needed

    // Set the new width and height for the weather card
    $('.weather-card').css({
        width: newSize + 'px',
        height: newSize + 'px'
    });

    // Adjust font size based on the length of the city name
    const fontSize = 18 + cityNameLength * 0.5; // Adjust the multiplier as needed
    $('.weather-card').css('font-size', fontSize + 'px');

    // Show weather information
    $('#weather-info').fadeIn();
}
