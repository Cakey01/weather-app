export function processData(response) {
  const data = {
    temp: response.currentConditions.temp,
    tempmax: response.days[0].tempmax,
    tempmin: response.days[0].tempmin,
    feelslike: response.currentConditions.feelslike,
    conditions: response.currentConditions.conditions
  };
  return data;
}