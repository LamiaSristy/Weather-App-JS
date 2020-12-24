import 'bootstrap';
import './style/main.scss';

const searchBox = document.getElementById('searchbox');
const searchIcon = document.getElementById('searchicon');
const errorTxt = document.getElementById('errortxt');
const input = document.getElementById('location');

function processData(weatherData) {    
    const myData = { 
      location: weatherData.name,
      country: weatherData.sys.country.toUpperCase(),
      condition: weatherData.weather[0].description,
      Temparature: {
        f: Math.round((Math.ceil(weatherData.main.temp) - 273) * (9/5) + 32),
        c: (Math.ceil(weatherData.main.temp) - 273),
      },
      feelsLike: {
        f: Math.round((Math.ceil(weatherData.main.feels_like) - 273) * (9/5) + 32),
        c: (Math.ceil(weatherData.main.feels_like) - 273),
      },
      humidity: weatherData.main.humidity,
      wind: Math.round(weatherData.wind.speed),
    };    
   
    return myData;
  }

function displayData(newData) { 
  document.querySelector('.condition').textContent = newData.condition;
  document.querySelector('.location').textContent = `${newData.location}, ${newData.country}`;
  document.querySelector('.degrees').textContent = `${newData.Temparature.f} ° F`;
  document.querySelector('.feels-like').textContent = `Feels-Like: ${newData.feelsLike.f} ° F`;
  document.querySelector('.humidity').textContent = `Humidity: ${newData.humidity} % `;
  document.querySelector('.wind-mph').textContent = `Wind-Speed: ${newData.wind} MPH`;
}

const throwErrorMsg = () => {
    errorTxt.style.display = 'block';
};

const getWeatherData = async (location) => {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?APPID=85543fa448f54a66d6f9b8c88d388027&q=${location}`,
    {
    mode: 'cors',
    }
  );
  if (response.status === 400) {
    throwErrorMsg();
  } else {
    errorTxt.style.display = 'none';
    const weatherData = await response.json();
    console.log("WeatherData");
    console.log(weatherData);
    const newData = processData(weatherData);
    displayData(newData);
    reset();
  }
};

const fetchWeather =() => {  
  const userLocation = input.value;
  getWeatherData(userLocation);
};

const submitHandler = (e) => {
    console.log("I am inside the form.")
    e.preventDefault();
    fetchWeather();
    
};

searchBox.addEventListener('submit', submitHandler);
searchIcon.addEventListener('click', submitHandler);

const reset = () => {
  searchBox.reset();
};

getWeatherData('London');