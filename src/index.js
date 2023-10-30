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

// ... (your existing code)

// Function to update weather based on user input
async function updateWeather() {
    const userInput = document.getElementById('userInput').value; // Get the value from the input field

    if (userInput) {
        try {
            const weatherData = await getCurrentWeather(userInput);
            const weatherInfoElement = document.getElementById('weatherInfo');

            if (weatherData) {
                if (weatherData.current) {
                    const temperature = weatherData.current.temp_c;
                    const description = weatherData.current.condition.text;
                    weatherInfoElement.innerText = `Temperature: ${temperature}°C, Description: ${description}`;
                } else {
                    weatherInfoElement.innerText = "Weather data not available.";
                }
            } else {
                weatherInfoElement.innerText = "Failed to fetch weather data for " + userInput;
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        alert("Please enter a location.");
    }
}

// Function to load elements and set up event listener
async function loadElements() {
    const userInputField = createElement('input', 'userInput');
    userInputField.setAttribute('placeholder', 'Enter location');
    document.body.appendChild(userInputField);

    const updateButton = createElement('button', 'updateButton');
    updateButton.innerText = 'Get Weather';
    document.body.appendChild(updateButton);

    const weatherInfo = createElement('div', 'weatherInfo');
    document.body.appendChild(weatherInfo);

    document.getElementById('updateButton').addEventListener('click', updateWeather);
}

loadElements();


//getWeatherForecast('Paris');