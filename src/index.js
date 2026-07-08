
import "./styles.css";
import getData from "./weather.js";
import { renderWeather, showWeather, hideWeather } from "./weatherPage.js";


const apiKey = "C8TDLXEQ7VVN385TZ3TACNCM7"; // i don't care that this is hardcoded
const unitGroup = 'metric';

const weatherPage = document.getElementById('weather-page');

const searchForm = document.getElementById("search-form")
const locationInput = document.getElementById("location-input");
const searchButton = document.getElementById("search-btn");


searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = locationInput.value;

  try {
    const weatherData = await getData(apiKey, location, unitGroup); // returns .json().conditions from the API response
    await renderWeather(weatherData);
    showWeather();
  } catch (error) {
    console.log(`failed to get data! error: ${error}`)
  }
});

// initial input into the form so i don't have to re enter it every refresh
const location = 'vancouver';

(async () => {
  const conditions = await getData(apiKey, location, unitGroup);
  await renderWeather(conditions);
  showWeather();
})();