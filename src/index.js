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
            const weatherBox = document.getElementById('weather-box');
            console.log(weatherData);
            if (weatherData) {
                if (weatherData.current) {
                    temperature.innerHTML = 'Temperature: ' + weatherData.current.temp_c +' C';
                    description.innerHTML = weatherData.current.condition.text;
                    image.setAttribute('src', weatherData.current.condition.icon);
                    weatherBox.style.display = 'flex';
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
    const tempSwitchBox = createElement('div', 'temp-button-container');
    const farenheight = createElement('button', 'farenheight-button');
    farenheight.addEventListener('click', function(){
        farenheight.style.color = 'white';
        celcius.style.color = 'black'
    })
    const divider = createElement('div', 'divider');
    farenheight.innerHTML = 'F'
    divider.innerHTML = '|'
    const celcius = createElement('button', 'celcius-button');
    celcius.addEventListener('click', function(){
        celcius.style.color = 'white';
        farenheight.style.color = 'black';
    })
    celcius.innerHTML = 'C';
    tempSwitchBox.appendChild(farenheight);
    tempSwitchBox.appendChild(divider);
    tempSwitchBox.appendChild(celcius);
    const weatherBox = createElement('div', 'weather-box');
    const topHeader = createElement('div', 'header');
    const searchBox = createElement('div', 'search-box');
    const userInputField = createElement('input', 'userInput');
    userInputField.setAttribute('placeholder', 'Enter location');
    const updateButton = createElement('button', 'updateButton');
    updateButton.innerText = 'Get Weather';
    searchBox.appendChild(userInputField);
    searchBox.appendChild(updateButton);
    topHeader.appendChild(searchBox);
    topHeader.appendChild(tempSwitchBox);

    document.body.appendChild(topHeader);

    const weatherInfo = createElement('div', 'weatherInfo');
    const temperature = createElement('div', 'temperature');
    const description = createElement('div', 'description');
    const image = createElement('img', 'image');
    weatherBox.appendChild(image);
    weatherBox.appendChild(temperature);
    weatherBox.appendChild(description);
    weatherInfo.appendChild(weatherBox);
    document.body.appendChild(weatherInfo);

    document.getElementById('updateButton').addEventListener('click', updateWeather);
}

loadElements();


//getWeatherForecast('Paris');