
// Function to fetch weather data using async/await
export async function fetchWeatherData() {
    const apiUrl = 'https://weatherapi-com.p.rapidapi.com/forecast.json';
    const query = '6.5530,3.3510'; // Coordinates for Ikeja
    const apiKey = 'e2f2a0785bmsh99c39524ed0016ep12963ejsn3b96e13a4f74';

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
            'x-rapidapi-key': apiKey
        }
    };

    try {
        const response = await fetch(`${apiUrl}?q=${query}&days=3`, options);
        const data = await response.json();

        // Extract current weather details
        const currentTemp = `<strong>${data.current.temp_f}°F</strong>`;
        const condition = data.current.condition.text;
        const highTemp = `High: <strong>${data.forecast.forecastday[0].day.maxtemp_f}°F</strong>`;
        const lowTemp = `Low: <strong>${data.forecast.forecastday[0].day.mintemp_f}°F</strong>`;
        const humidity = `Humidity: ${data.current.humidity}%`;
        const sunrise = `Sunrise: ${data.forecast.forecastday[0].astro.sunrise}`;
        const sunset = `Sunset: ${data.forecast.forecastday[0].astro.sunset}`;
        let weatherIconUrl = data.current.condition.icon; // Get weather icon URL

        // Ensure weather icon URL uses HTTPS
        if (weatherIconUrl.startsWith('http://')) {
            weatherIconUrl = weatherIconUrl.replace('http://', 'https://');
        }

        // Update current weather in the DOM
        document.getElementById('weather-icon').src = weatherIconUrl; // Set weather icon
        document.getElementById('current-temp').innerHTML = currentTemp;
        document.getElementById('current-condition').textContent = condition;
        document.getElementById('current-high').innerHTML = highTemp;
        document.getElementById('current-low').innerHTML = lowTemp;
        document.getElementById('current-humidity').innerHTML = humidity; // Updated to use innerHTML
        document.getElementById('current-sunrise').innerHTML = sunrise; // Updated to use innerHTML
        document.getElementById('current-sunset').innerHTML = sunset; // Updated to use innerHTML

        // Get day names for forecast
        const getDayName = (dateStr) => {
            const date = new Date(dateStr);
            const options = { weekday: 'long' }; // Display full weekday name
            return date.toLocaleDateString('en-US', options);
        };

        // Extract forecast details
        const forecastToday = `Today: <strong>${data.forecast.forecastday[0].day.avgtemp_f}°F</strong>`;
        const forecastDay1 = `${getDayName(data.forecast.forecastday[1].date)}: <strong>${data.forecast.forecastday[1].day.avgtemp_f}°F</strong>`;
        const forecastDay2 = `${getDayName(data.forecast.forecastday[2].date)}: <strong>${data.forecast.forecastday[2].day.avgtemp_f}°F</strong>`;

        // Update forecast in the DOM
        document.getElementById('forecast-day1').innerHTML = forecastToday;
        document.getElementById('forecast-day2').innerHTML = forecastDay1;
        document.getElementById('forecast-day3').innerHTML = forecastDay2;

        // Update the location name in the DOM
        const locationName = `<strong>${data.location.name}, ${data.location.region}, ${data.location.country}</strong>`;
        document.getElementById('location-name').innerHTML = `Location: ${locationName}`;

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
