const apiKey = '19520761-48ad5b9d4b9d0975ec43def51'


export default {
 searchQ: '',
  page: 1,
  fearchHits ()  {
    const url = `https://pixabay.com/api/?q=${this.searchQ}&image_type=photo&orientation=horizontal&page=${this.page}&per_page=12&key=${apiKey}`;

     return fetch(url)
      .then(response => response.json())
      .then(({hits}) => {
        this.page += 1;
        return hits;
        })
      .catch(error => (console.log(error)))
    },
    resetPage () {
      this.page = 1;
    },

    get query () {
      return this.searchQ;
    },
    set query (value) {
      this.searchQ = value;
    },
}
