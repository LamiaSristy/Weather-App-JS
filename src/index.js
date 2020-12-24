import 'bootstrap';
import './style/main.scss';

const searchBox = document.getElementById('searchbox');
const searchIcon = document.getElementById('searchicon');
const errorTxt = document.getElementById('errortxt');
const input = document.getElementById('location');

const containerEl = document.querySelector('.container');
const weatherConditionEl = document.querySelector('.weathercondition');
const locationEl = document.querySelector('.location');
const temparatureEl = document.querySelector('.temparature');
const temparatureFeelsLikeEl = document.querySelector('.feels-like');
const humidityEl = document.querySelector('.humidity');
const windSpeedEl = document.querySelector('.windspeed');

const processData = (weatherInfo) => {
  const myData = {
    location: weatherInfo.name,
    country: weatherInfo.sys.country.toUpperCase(),
    condition: weatherInfo.weather[0].description,
    Temparature: {
      f: Math.round((Math.ceil(weatherInfo.main.temp) - 273) * (9 / 5) + 32),
      c: (Math.ceil(weatherInfo.main.temp) - 273),
    },
    feelsLike: {
      f: Math.round((Math.ceil(weatherInfo.main.feels_like) - 273) * (9 / 5) + 32),
      c: (Math.ceil(weatherInfo.main.feels_like) - 273),
    },
    humidity: weatherInfo.main.humidity,
    wind: Math.round(weatherInfo.wind.speed),
  };

  return myData;
};

const displayData = (newData) => {
  containerEl.classList.add('w3-animate-zoom');
  weatherConditionEl.textContent = newData.condition;
  locationEl.textContent = `${newData.location}, ${newData.country}`;
  temparatureEl.textContent = `${newData.Temparature.f} ° F / ${newData.Temparature.c} ° C`;
  temparatureFeelsLikeEl.textContent = `Feels-Like: ${newData.feelsLike.f} ° F`;
  humidityEl.textContent = `Humidity: ${newData.humidity} % `;
  windSpeedEl.textContent = `Wind-Speed: ${newData.wind} MPH`;
};

const throwErrorMsg = () => {
  errorTxt.style.display = 'block';
};

const reset = () => {
  searchBox.reset();
};

const getWeatherData = async (location) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?APPID=85543fa448f54a66d6f9b8c88d388027&q=${location}`,
    {
      mode: 'cors',
    },
  );
  if (response.status === 400) {
    throwErrorMsg();
  } else {
    errorTxt.style.display = 'none';
    const weatherData = await response.json();
    console.log('WeatherData');
    console.log(weatherData);
    const newData = processData(weatherData);
    displayData(newData);
    reset();
  }
};

const fetchWeather = () => {
  const userLocation = input.value;
  getWeatherData(userLocation);
};

const submitHandler = (e) => {
  console.log('I am inside the form.');
  e.preventDefault();
  containerEl.classList.remove('w3-animate-zoom');
  fetchWeather();
};

searchBox.addEventListener('submit', submitHandler);
searchIcon.addEventListener('click', submitHandler);
getWeatherData('London');
