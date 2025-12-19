import { parse, format } from 'date-fns';

const main = document.querySelector('main');

async function getIcon(name) {
  const icon = await import(`../icons/${name}.png`);
  return icon.default;
}

async function displayCurrent(current) {
  const container = document.createElement('div');
  container.id = 'current';

  const conditionsHeader = document.createElement('h2');
  conditionsHeader.id = 'current-conditions';
  conditionsHeader.textContent = current.conditions;

  const icon = document.createElement('img');
  icon.id = 'current-icon';
  icon.src = await getIcon(current.icon);
  icon.alt = current.conditions;

  const temp = document.createElement('h1');
  temp.id = 'current-temp';
  temp.textContent = `${current.temp}°`;

  const conditionsDiv = document.createElement('div');
  conditionsDiv.id = 'current-conditions-div';

  const feels = document.createElement('h5');
  feels.classList.add('condition-desc');
  feels.textContent = `Feels like: ${current.feelsLike}`;

  const humid = document.createElement('h5');
  humid.classList.add('condition-desc');
  humid.textContent = `Humidity: ${current.humidity}%`

  const precip = document.createElement('h5');
  precip.classList.add('condition-desc');
  precip.textContent = `Precipitation: ${current.precip}%`;

  const wind = document.createElement('h5');
  wind.classList.add('condition-desc');
  wind.textContent = `Wind: ${current.wind} mph`;

  const uv = document.createElement('h5');
  uv.classList.add('condition-desc');
  uv.textContent = `UV: ${current.uv}`;
  
  conditionsDiv.append(feels, precip, humid, wind, uv);
  container.append(conditionsHeader, icon, temp, conditionsDiv);

  main.appendChild(container);
}

async function displayHourly(hourly) {
  // find index of current time
  const datetime = new Date();
  const currentTime = `${datetime.getHours()}:00:00`;
  const startTime = (hour) => hour.time == currentTime;
  const index = hourly.today.findIndex(startTime);

  // create arr starting from current time to +7 hours
  const hours = hourly.today.slice(index, index + 7);
  if (hours.length < 7) {
    const remaining = 7 - hours.length;
    for (let i = 0; i < remaining; i++) {
      hours.push(hourly.today[i]);
    }
  }

  // create elements
  const container = document.createElement('div');
  container.id = 'today';

  const header = document.createElement('h2');
  header.id = 'today-header';
  header.textContent = 'Hourly';
  container.appendChild(header);

  const hourlyContainer = document.createElement('div');
  hourlyContainer.id = 'hourly-container';
  
  for (const [index, hour] of hours.entries()) {
    const hourDiv = document.createElement('div');
    hourDiv.classList.add('hour');

    const time = document.createElement('h5');
    time.classList.add('time');

    if (index === 0) {
      time.textContent = 'Now';
    } else {
      const parsedTime = parse(hour.time, 'HH:mm:ss', new Date());
      const formattedTime = format(parsedTime, 'haaa');
      time.textContent = formattedTime;
    }

    const icon = document.createElement('img');
    icon.classList.add('hourly-icon');
    icon.src = await getIcon(hour.icon);
    icon.alt = hour.conditions;

    const temp = document.createElement('h4');
    temp.classList.add('hourly-temp');
    temp.textContent = `${hour.temp}°`

    hourDiv.append(time, icon, temp);
    hourlyContainer.appendChild(hourDiv);
  };
  container.appendChild(hourlyContainer);
  main.appendChild(container);
}

export async function displayWeather(data) {
  await displayCurrent(data.current);
  await displayHourly(data.hourly);
}