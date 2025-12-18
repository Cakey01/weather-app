async function getIcon(name) {
  const icon = await import(`../icons/${name}.png`);
  return icon.default;
}

async function displayCurrent(current) {
  const main = document.querySelector('main');

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
  temp.textContent = current.temp;

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

export async function displayWeather(data) {
  await displayCurrent(data.current);
}