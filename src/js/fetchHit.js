const apiKey = '19520761-48ad5b9d4b9d0975ec43def51'


export const fetchHits = (searchQ, page=1) => {
const url = `https://pixabay.com/api/?q=${searchQ}&image_type=photo&orientation=horizontal&page=${page}&per_page=12&key=${apiKey}`;
 return fetch(url)
  .then(response => response.json())
  .then(data => data.hits)
  .catch(error => (console.log(error)))
}


