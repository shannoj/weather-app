import _ from 'lodash';
import './style.css';

function createElement(element, idValue){
    const newElement = document.createElement(element);
    newElement.id = idValue;
    return newElement;
}

function appendElement(parentElement, childElement){
    parentElement.appendChild(childElement);
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
	const result = await response.text();
	console.log(result);
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
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

getCurrentWeather('Paris');

//getWeatherForecast('Paris');