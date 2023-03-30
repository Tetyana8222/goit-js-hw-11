import './sass/_common.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import refs from './js/refs';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

let searchValue = '';
let gallery = new SimpleLightbox('.gallery a');
let perPage = 10;
let currentPage = 1;
let currentHits = 0;

searchFormEl.addEventListener('submit', onSearch);
// refs.loadMoreBtnEl.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  searchValue = event.currentTarget.searchQuery.value.trim();
  currentPage = 1;
  if (searchValue === '') {
    // galleryEl.innerHTML = '';
    console.log('empty');
    return;
  }
}
const KEY = '34781743-09d11a08c8aa729d147b2c9f6';
const BASE_URL = 'https://pixabay.com/api/';

addImagesList();
function addImagesList() {
  return fetch(
    `${BASE_URL}?key=${KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=4&page=${currentPage}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}
