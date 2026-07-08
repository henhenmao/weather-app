export default async function (apiKey, location, unitGroup) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitGroup}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`request failed: ${response.status}`);
    }
    const weatherData = await response.json();
    console.log(weatherData);
    
    return weatherData;
  } catch (error) {
    console.log(error);
  }
};
