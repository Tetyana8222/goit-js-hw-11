import './sass/_common.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import NewsApiService from './js/news-api-service';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const newsApiService = new NewsApiService();

let perPage = 40;
let currentPage = 1;
let currentHits = 0;

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.searchQuery.value.trim();
  newsApiService.fetchArticles();

  // if (searchQuery === '') {
  //   return;
  // }
}
function onLoadMore(params) {
  newsApiService.fetchArticles();
}
// function noMatchingSearch() {
//   Notiflix.Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again.'
//   );
// }
