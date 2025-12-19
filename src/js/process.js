export function processData(response) {
  const data = {
    current: {
      conditions: response.currentConditions.conditions.split(',')[0],
      icon: response.currentConditions.icon,
      temp: response.currentConditions.temp,
      feelsLike: response.currentConditions.feelslike,
      precip: response.currentConditions.precipprob,
      wind: response.currentConditions.windspeed,
      humidity: response.currentConditions.humidity,
      uv: response.currentConditions.uvindex,
    },
    hourly: {
      today: response.days[0].hours.map((hour) => ({
        time: hour.datetime,
        icon: hour.icon,
        temp: hour.temp,
        conditions: hour.conditions.split(',')[0],
      })),
      tomorrow: response.days[1].hours.map((hour) => ({
        time: hour.datetime,
        icon: hour.icon,
        temp: hour.temp,
        conditions: hour.conditions.split(',')[0],
      })),
    },
    week: response.days.slice(0, 8).map((day) => ({
      day: day.datetime,
      tempmax: day.tempmax,
      tempmin: day.tempmin,
      conditions: day.conditions.split(',')[0],
      icon: day.icon,
    })),
  };
  return data;
}
