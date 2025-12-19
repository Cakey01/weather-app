import { getData } from './data.js';
import { processData } from './process.js';
import { displayWeather } from './display.js';

import '../styles.css';

async function handleSubmit(location, unit) {
  const response = await getData(location, unit);
  const data = processData(response);
  console.log(data)
  await displayWeather(data, handleSubmit);
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.getElementById('location').value;
  const unit = document.getElementById('units').value;
  handleSubmit(location, unit);
});

