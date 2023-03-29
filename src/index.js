import './sass/_common.scss';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let perPage = 20;
let page = 1;
// let searchQuery = '';

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(event) {
  e.preventDefault();
  searchQuery = event.currentTarget.elements.query.value.trim();
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '28143013-44919de38ad9e5402793063fb';
  const response = get(
    `${BASE_URL}?key=${KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
}
