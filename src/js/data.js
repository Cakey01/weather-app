export async function getData(location, units) {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${units}&include=days%2Ccurrent%2Calerts%2Chours&key=BQW4JJHJ6K7WPXEDJZLTMNTAB&contentType=json`);
    return response.json();
  } catch(error) {
    console.log(error);
  }
}