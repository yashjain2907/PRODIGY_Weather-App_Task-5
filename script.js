document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weatherDescription');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');
  
    searchBtn.addEventListener('click', function () {
      const city = cityInput.value.trim();
      if (city !== '') {
        getWeatherData(city);
      }
    });
  
    function getWeatherData(city) {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.cod === '404') {
            alert('City not found. Please enter a valid city.');
            return;
          }
  
          updateWeatherInfo(data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  
    function updateWeatherInfo(data) {
      cityName.textContent = `Weather in ${data.name}, ${data.sys.country}`;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      weatherDescription.textContent = `Weather: ${data.weather[0].description}`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
  
      weatherInfo.classList.remove('hidden');
    }
  });
  