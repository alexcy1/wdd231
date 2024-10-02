
import { getUserLocation } from './weather.js'; 
import { initSpotlight } from './spotlight.js';

// Call the function to get the user's location and fetch weather data
getUserLocation();

document.addEventListener('DOMContentLoaded', async function() {
    // Call the function to initialize spotlight members
    await initSpotlight();
});