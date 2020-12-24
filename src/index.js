import 'bootstrap';
import './style/main.scss';

const searchBox = document.getElementById('searchbox');
const searchIcon = document.getElementById('searchicon');
const errorTxt = document.getElementById('errortxt');
const input = document.getElementById('location');



function processData(weatherData) {
    // grab all the data i want to display on the page
    const myData = { 
      location: weatherData.name.toUpperCase(),
    };
  
    myData['region'] = weatherData.country;
    return myData;
  }

  function displayData(newData) { 
    document.querySelector('.condition').textContent = newData.condition;
    document.querySelector(
      '.location'
    ).textContent = `${newData.location}, ${newData.region}`;
    document.querySelector('.degrees').textContent = newData.currentTemp.f;
    document.querySelector(
      '.feels-like'
    ).textContent = `FEELS LIKE: ${newData.feelsLike.f}`;
    document.querySelector('.wind-mph').textContent = `WIND: ${newData.wind} MPH`;
    document.querySelector(
      '.humidity'
    ).textContent = `HUMIDITY: ${newData.humidity}`;
}
  

async function getWeatherData(location) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?APPID=85543fa448f54a66d6f9b8c88d388027&q=${location}`,
    {
    mode: 'cors',
    }
  );
  if (response.status === 400) {
    // throwErrorMsg();
  } else {
    // error.style.display = 'none';
    const weatherData = await response.json();
    console.log("WeatherData");
    console.log(weatherData);
    const newData = processData(weatherData);
    displayData(newData);
    reset();
  }
}



const fetchWeather =() => {  
  const userLocation = input.value;
  getWeatherData(userLocation);
}

const submitHandler = (e) => {
    console.log("I am inside the form.")
    e.preventDefault();
    fetchWeather();
    
};

searchBox.addEventListener('submit', submitHandler);
searchIcon.addEventListener('click', submitHandler);

function reset() {
    searchBox.reset();
}
