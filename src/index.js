import _ from 'lodash';
import './style.css';

function createElement(element, idValue){
    const newElement = document.createElement(element);
    newElement.id = idValue;
    return newElement;
}

async function getCurrentWeather(city){
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q='+city;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c9d3418c5cmshec80d187e318367p146557jsn363029664d81',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    return result;
} catch (error) {
	console.error(error);
}

}

async function getWeatherForecast(city){
    const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q='+city+'&days=3';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c9d3418c5cmshec80d187e318367p146557jsn363029664d81',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function loadElements() {
    const weatherInfo = createElement('div', 'weatherInfo');
    document.body.appendChild(weatherInfo);

    try {
        const weatherData = await getCurrentWeather('Paris');
        const weatherInfoElement = document.getElementById('weatherInfo');

        // Display specific information from the weather data
        if (weatherData && weatherData.current) {
            const temperature = weatherData.current.temp_c;
            const description = weatherData.current.condition.text;
            const location = weatherData.location.name;
            weatherInfoElement.innerText = `Location: ${location}
            Temperature: ${temperature}°C
            Description: ${description}`;
        } else {
            weatherInfoElement.innerText = "Weather data not available.";
        }
    } catch (error) {
        console.error(error);
    }
};

loadElements();


//getWeatherForecast('Paris');