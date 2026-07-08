
import getIconSrc from './icons.js';
const weatherPage = document.getElementById("weather-page");

const tempQuantities = {
  'temp': 'Temperature',
  'feelslike': 'Feels Like',
};

const otherQuantities = {
  'humidity': 'Humidity',
}

const other = [
  "icon"
]


let lastWeatherData = null;

const temperatureToggle = document.createElement('button');
temperatureToggle.textContent = 'C';
temperatureToggle.addEventListener("click", () => {
  toggleTemperature();
});

async function renderWeather(weatherData) {
  lastWeatherData = weatherData;
  const conditions = weatherData.currentConditions;
  const location = weatherData.address;

  weatherPage.replaceChildren(); // clears last search's weather 
  
  // main weather div: contains the header and sub-div (containing the data)
  const weatherDiv = document.createElement("div");
  weatherDiv.classList.add('weather-div');

  // header stuff
  const headerDiv = document.createElement('div');
  headerDiv.classList.add('weather-header');

  const titleDiv = document.createElement('div');
  titleDiv.classList.add("weather-title");
  titleDiv.textContent = `${location}`;


  headerDiv.append(titleDiv, temperatureToggle);


  // adding quantities with F/C units (temperature, feelslike, etc.)
  Object.entries(tempQuantities).forEach(([condition, name]) => {
    const newDiv = document.createElement("div");
    const headerDiv = document.createElement("div");
    const infoDiv = document.createElement("div");

    newDiv.classList.add('weather-sub-div')
    headerDiv.classList.add('header-div')
    infoDiv.classList.add('info-div');

    const value = conditions[condition];
    headerDiv.textContent = name;
    infoDiv.textContent = typeof value === 'number' ? value.toFixed(1) : value;
    newDiv.append(headerDiv, infoDiv);
    weatherDiv.append(newDiv);
  });

  // other quantities with other units (humidity, etc.)
  Object.entries(otherQuantities).forEach(([condition, name]) => {
    const newDiv = document.createElement("div");
    const headerDiv = document.createElement("div");
    const infoDiv = document.createElement("div");

    newDiv.classList.add('weather-sub-div')
    headerDiv.classList.add('header-div')
    infoDiv.classList.add('info-div');

    const value = conditions[condition];
    headerDiv.textContent = name;
    infoDiv.textContent = typeof value === 'number' ? value.toFixed(1) : value;
    newDiv.append(headerDiv, infoDiv);
    weatherDiv.append(newDiv);
  });


  // adding images (icons, etc)
  for (const condition of other) {
    const newDiv = document.createElement("div");
    newDiv.classList.add('weather-icon-div')

    const img = document.createElement("img");
    img.classList.add('weather-icon')
    img.src = await getIconSrc(conditions[condition]);

    newDiv.append(img);
    weatherDiv.append(newDiv);
  }

  weatherPage.append(headerDiv);
  weatherPage.append(weatherDiv);
}

function showWeather() {
  weatherPage.classList.add("visible");
}

function hideWeather() {
  weatherPage.classList.remove("visible");
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

// switch between F and C units
async function toggleTemperature() {
  if (!lastWeatherData) return;

  const switchingToFahrenheit = temperatureToggle.textContent === 'C';
  const convert = switchingToFahrenheit ? celsiusToFahrenheit : fahrenheitToCelsius;

  const conditions = lastWeatherData.currentConditions;
  Object.entries(tempQuantities).forEach(([condition, name]) => {
    conditions[condition] = convert(conditions[condition]);
    console.log(`${condition}: ${conditions[condition]}`)
  });

  temperatureToggle.textContent = switchingToFahrenheit ? 'F' : 'C';

  await renderWeather(lastWeatherData);
}

export {renderWeather, showWeather, hideWeather};