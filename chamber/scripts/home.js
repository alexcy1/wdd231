
import { fetchWeatherData } from './weather.js'; 
import { initSpotlight } from './spotlight.js';

// Call the function to fetch weather data
fetchWeatherData();

document.addEventListener('DOMContentLoaded', async function() {
    // Call the function to initialize spotlight members
    await initSpotlight();
});