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
            const temperature = document.getElementById('temperature');
            const description = document.getElementById('description');
            const image = document.getElementById('image');
            console.log(weatherData);
            if (weatherData) {
                if (weatherData.current) {
                    temperature.innerHTML = 'Temperature: ' + weatherData.current.temp_c;
                    description.innerHTML = weatherData.current.condition.text;
                    image.setAttribute('src', weatherData.current.condition.icon);
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
    const topHeader = createElement('div', 'header');   
    const userInputField = createElement('input', 'userInput');
    userInputField.setAttribute('placeholder', 'Enter location');
    topHeader.appendChild(userInputField)

    const updateButton = createElement('button', 'updateButton');
    updateButton.innerText = 'Get Weather';
    topHeader.appendChild(updateButton);

    document.body.appendChild(topHeader);

    const weatherInfo = createElement('div', 'weatherInfo');
    const temperature = createElement('div', 'temperature');
    const description = createElement('div', 'description');
    const image = createElement('img', 'image');
    weatherInfo.appendChild(image);
    weatherInfo.appendChild(temperature);
    weatherInfo.appendChild(description);
    document.body.appendChild(weatherInfo);

    document.getElementById('updateButton').addEventListener('click', updateWeather);
}

loadElements();


//getWeatherForecast('Paris');