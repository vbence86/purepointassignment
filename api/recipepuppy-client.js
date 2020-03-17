import axios from 'axios';

const BASE_URL = 'http://www.recipepuppy.com/api/';
export const PAGE_SIZE = 10;

// @see https://www.npmjs.com/package/react-native-axios
const singleton = axios.create({
  baseURL: BASE_URL,
});

// transforms the axios Response Object to a list of recepies
const transform = resp => resp.data.results || [];

/**
 * Gets the results of the given keywords using pagination and
 * returns a Promise that is resolved with an array of recepies
 *
 * @param {string} keywords
 * @param {number} page
 * @returns {Promise}
 */
const getPage = (keywords, page) => 
  singleton.get(`?q=${keywords}&p=${page}`)
    .then(transform);

/**
 * Fetches the given number of results and it returns 
 * a Promise that is resolved with an array of recepies
 *
 * @param {string} keywords
 * @param {number} maxResults
 * @param {number} pageOffset
 * @returns {Promise}
 */
const fetch = (keywords, maxResults = PAGE_SIZE, pageOffset = 0) => {
  const promises = [];
  for (let i = 1; i <= Math.floor(maxResults / PAGE_SIZE); i +=1 ) {
    promises.push(getPage(keywords, i + pageOffset));
  }
  
  return Promise.all(promises)
    .then(pages => pages.reduce((acc, arr) => [...acc, ...arr], []));
};

export default {
  fetch,
};
