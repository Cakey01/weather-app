import { getData } from './data.js';
import { processData } from './process.js';

import '../styles.css';

// dom elements
const location = document.querySelector('input');
const submit = document.querySelector('button');

submit.addEventListener('click', async (e) => {
  e.preventDefault();
  const response = await getData(location.value);
  console.log(processData(response));
})

