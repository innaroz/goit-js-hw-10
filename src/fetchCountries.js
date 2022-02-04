import Notiflix from 'notiflix';

const fetchCountries = (name) => {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        if (response.status === 404) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        }

        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      return error;
    });
};

export { fetchCountries };
