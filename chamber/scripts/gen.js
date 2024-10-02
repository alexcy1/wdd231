
// Function to fetch weather data using async/await
async function fetchWeatherData() {
    const apiUrl = 'https://weatherapi-com.p.rapidapi.com/forecast.json';
    const query = '6.5244,3.3792'; // Coordinates for Lagos
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
        const currentTemp = `${data.current.temp_f}°F`;
        const condition = data.current.condition.text;
        const highTemp = `${data.forecast.forecastday[0].day.maxtemp_f}°F`;
        const lowTemp = `${data.forecast.forecastday[0].day.mintemp_f}°F`;
        const humidity = `${data.current.humidity}%`;
        const sunrise = data.forecast.forecastday[0].astro.sunrise;
        const sunset = data.forecast.forecastday[0].astro.sunset;

        // Update current weather in the DOM
        document.getElementById('current-temp').textContent = currentTemp;
        document.getElementById('current-condition').textContent = condition;
        document.getElementById('current-high').textContent = `High: ${highTemp}`;
        document.getElementById('current-low').textContent = `Low: ${lowTemp}`;
        document.getElementById('current-humidity').textContent = `Humidity: ${humidity}`;
        document.getElementById('current-sunrise').textContent = `Sunrise: ${sunrise}`;
        document.getElementById('current-sunset').textContent = `Sunset: ${sunset}`;

        // Get day names for forecast
        const getDayName = (dateStr) => {
            const date = new Date(dateStr);
            const options = { weekday: 'long' }; // Display full weekday name
            return date.toLocaleDateString('en-US', options);
        };

        // Extract forecast details
        const forecastToday = `Today: ${data.forecast.forecastday[0].day.avgtemp_f}°F`;
        const forecastDay1 = `${getDayName(data.forecast.forecastday[1].date)}: ${data.forecast.forecastday[1].day.avgtemp_f}°F`;
        const forecastDay2 = `${getDayName(data.forecast.forecastday[2].date)}: ${data.forecast.forecastday[2].day.avgtemp_f}°F`;

        // Update forecast in the DOM
        document.getElementById('forecast-day1').textContent = forecastToday;
        document.getElementById('forecast-day2').textContent = forecastDay1;
        document.getElementById('forecast-day3').textContent = forecastDay2;

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

fetchWeatherData();
