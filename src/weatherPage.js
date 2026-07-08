import getIconSrc from "./icons.js";
const weatherPage = document.getElementById("weather-page");

const tempQuantities = {
  temp: "Temperature",
  feelslike: "Feels Like",
};

const speedQuantities = {
  windspeed: "Wind Speed",
  windgust: "Wind Gust",
};

const otherQuantities = {
  humidity: "Humidity",
};

const other = ["icon"];

let lastWeatherData = null;

const unitToggle = document.createElement("button");
unitToggle.classList.add("unit-toggle-btn");
unitToggle.textContent = "°C";
unitToggle.addEventListener("click", () => {
  toggleUnits();
});

async function renderWeather(weatherData) {
  // function creates subDivs that contain the quantity name and quantity value
  function createSubDivs(quantities) {
    Object.entries(quantities).forEach(([condition, name]) => {
      const newDiv = document.createElement("div");
      const headerSubDiv = document.createElement("div");
      const infoDiv = document.createElement("div");

      newDiv.classList.add("weather-sub-div");
      headerSubDiv.classList.add("sub-div-header");
      infoDiv.classList.add("info-div");

      const value = conditions[condition];
      headerSubDiv.textContent = `${name}:`;
      infoDiv.textContent = `${typeof value === "number" ? value.toFixed(1) : value}`;

      // special case where temperature is listed on the header
      if (condition === "temp") {
        infoDiv.classList.add("header-temp");
        headerDiv.append(infoDiv);
        return;
      }

      newDiv.append(headerSubDiv, infoDiv);
      weatherDiv.append(newDiv);
    });
  }

  lastWeatherData = weatherData;
  const conditions = weatherData.currentConditions;
  const location = weatherData.address;

  weatherPage.replaceChildren(); // clears last search's weather

  // main weather div: contains the header and sub-div (containing the data)
  const weatherDiv = document.createElement("div");
  weatherDiv.classList.add("weather-div");

  // header stuff
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("weather-header");

  // adding images (icons, etc) -> goes to the left of the header
  const iconDiv = document.createElement("div");
  iconDiv.classList.add("weather-icon-div");

  for (const condition of other) {
    const img = document.createElement("img");
    img.classList.add("weather-icon");
    img.src = await getIconSrc(conditions[condition]);

    iconDiv.append(img);
  }

  const headerContent = document.createElement("div");
  headerContent.classList.add("header-content");

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("weather-title");
  titleDiv.textContent = `${location}`;

  headerDiv.append(iconDiv, titleDiv);

  // adding quantities with F/C units (temperature, feelslike, etc.)
  createSubDivs(tempQuantities);

  // other quantities with other units (humidity, etc.)
  createSubDivs(otherQuantities);

  // adding speed quantities kph/mph (wind, etc.)
  createSubDivs(speedQuantities);

  headerDiv.append(unitToggle);
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

function kmhToMph(kmh) {
  return kmh / 1.609344;
}

function mphToKmh(mph) {
  return mph * 1.609344;
}

// switch between F and C units
async function toggleUnits() {
  if (!lastWeatherData) return;

  const switchingToFahrenheit = unitToggle.textContent === "°C";
  const convertTemp = switchingToFahrenheit
    ? celsiusToFahrenheit
    : fahrenheitToCelsius;

  const convertSpeed = switchingToFahrenheit ? kmhToMph : mphToKmh;

  const conditions = lastWeatherData.currentConditions;
  Object.entries(tempQuantities).forEach(([condition, name]) => {
    conditions[condition] = convertTemp(conditions[condition]);
  });

  Object.entries(speedQuantities).forEach(([condition, name]) => {
    conditions[condition] = convertSpeed(conditions[condition]);
  });

  unitToggle.textContent = switchingToFahrenheit ? "°F" : "°C";

  await renderWeather(lastWeatherData);
}

export { renderWeather, showWeather, hideWeather };
