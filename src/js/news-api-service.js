// import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
  }
  // метод, що відповідає за HTPP-запити
  fetchArticles(searchQuery) {
    console.log(this);
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '28143013-44919de38ad9e5402793063fb';

    const url = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&&per_page=40&page=1`;
    fetch(url)
      .then(response => response.json())
      .then(console.log);
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuary = newQuery;
  }
}
