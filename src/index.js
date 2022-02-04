import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');

const showCountries = (countries = []) => {
  switch (true) {
    case (countries.length === 1):
      const countryItem = document.querySelector('.country-info');
      const country = countries[0];
      countryItem.innerHTML = `
        <div class="logo-name"><img src="${country.flags.svg}" /> ${country.name.official}</div>
        <ul>
          <li><b>Capital: </b>${country.capital.join(', ')}</li>
          <li><b>Population: </b>${country.population}</li>
          <li><b>Languages: </b>${Object.values(country.languages).join(', ')}</li>
        </ul>
      `;
      document.querySelector('.country-list').innerHTML = '';
      break;
    case (countries.length > 1):
      const countryList = document.querySelector('.country-list');
      const list = countries.map((country) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img src="${country.flags.svg}" /> ${country.name.official}
        `;
        return li.outerHTML;
      });
      countryList.innerHTML = list.join('');
      document.querySelector('.country-info').innerHTML = '';
      break;
    default:
      document.querySelector('.country-list').innerHTML = '';
      document.querySelector('.country-info').innerHTML = '';
  }
};

input.addEventListener('keyup', debounce(() => {
  const countryName = input.value;

  if (countryName.length === 0) {
    return showCountries();
  }

  fetchCountries(countryName).then((data) => {
    if (data.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      return showCountries();
    }

    showCountries(data);
  });
}, DEBOUNCE_DELAY));
