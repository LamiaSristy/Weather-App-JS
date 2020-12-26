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
const temparature2El = document.querySelector('.temparature2');

const temparatureFeelsLikeEl = document.querySelector('.feels-like');
const humidityEl = document.querySelector('.humidity');
const windSpeedEl = document.querySelector('.windspeed');
const weatherIcon = document.querySelector('.weathericon');
const bodyEl = document.querySelector('body');

const processData = (weatherInfo) => {
  const myData = {
    location: weatherInfo.name,
    country: weatherInfo.sys.country.toUpperCase(),
    weatherMain: weatherInfo.weather[0].main,
    weatherDescription: weatherInfo.weather[0].description,
    weatherIcon: weatherInfo.weather[0].icon,
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
  if (newData.weatherMain === 'Rain') bodyEl.classList.add('background-rain');
  else if (newData.weatherMain === 'Thunderstorm') bodyEl.classList.add('background-thunder');
  else if (newData.weatherMain === 'Clouds') bodyEl.classList.add('background-cloud');
  else if (newData.weatherMain === 'Snow') bodyEl.classList.add('background-snow');
  else bodyEl.classList.add('background1');
  weatherIcon.src = `http://openweathermap.org/img/wn/${newData.weatherIcon}.png`;  
  weatherConditionEl.textContent = `${newData.weatherMain}: ${newData.weatherDescription}`;
  locationEl.textContent = `${newData.location}, ${newData.country}`;

  temparatureEl.textContent = `${newData.Temparature.f} °F `;
  temparature2El.textContent = `${newData.Temparature.c} ° C`;

  temparatureEl.onclick = function changeContent() {
    temparatureEl.classList.toggle('none');
    temparature2El.classList.toggle('show');
  };
  temparature2El.onclick = function changeContent() {
    temparature2El.className = '';
    temparature2El.classList.toggle('temparature2');
    temparatureEl.className = '';
    temparatureEl.classList.add('temparature');
  };
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
    `https://api.openweathermap.org/data/2.5/weather?APPID=85543fa448f54a66d6f9b8c88d388027&q=${location}`,
    {
      mode: 'cors',
    },
  );
  if (response.status === 400) {
    throwErrorMsg();
  } else {
    errorTxt.style.display = 'none';
    const weatherData = await response.json();
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
  e.preventDefault();
  containerEl.classList.remove('w3-animate-zoom');
  bodyEl.className = '';
  fetchWeather();
};

searchBox.addEventListener('submit', submitHandler);
searchIcon.addEventListener('click', submitHandler);
getWeatherData('London');
