import './sass/_common.scss';
// import fetchImages from './js/fetchImages';
import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const KEY = '34781743-09d11a08c8aa729d147b2c9f6';
const BASE_URL = 'https://pixabay.com/api/';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

let searchValue = '';
let gallery = new SimpleLightbox('.gallery a');
let perPage = 40;
let currentPage = 1;
let currentHits = 0;
let hits = 0;
// ------робимо кноку loadMoreBtn невидимою-------
loadMoreBtnEl.style.display = 'none';

searchFormEl.addEventListener('submit', onSearch);
// refs.loadMoreBtnEl.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  searchValue = event.currentTarget.searchQuery.value.trim();
  console.log(searchValue);
  currentPage = 1;
  //-------якщо вікно пошуку пусте, то повідомлення
  if (searchValue === '') {
    galleryEl.refresh();
    Notiflix.Notify.warning('Please enter a keyword to continue the search');
    console.log('empty');
    return;
  }
  const data = await addImagesList(currentPage, searchValue);
  console.log(data);
  const arrayOfResults = data.hits;
  // console.log(arrayOfResults);
  // console.log(data.totalHits);
  //-------якщо результат пошуку 0, то повідомлення
  if (data.totalHits === 0) {
    page = 1;
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    galleryEl.refresh();
    return;
  }
  // ----якщо результат пошуку - непорожній масив, то
  if (data.hits.length > 0) {
    markupCard(arrayOfResults);
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    loadMoreBtnEl.style.display = 'block';
    galleryEl.refresh();
  }
}

addImagesList();
async function addImagesList() {
  return fetch(
    `${BASE_URL}?key=${KEY}&q=${searchValue}&type=photo&orientation=horizontal&safesearch=true&per_page=10&page=${currentPage}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}

function markupCard(arrayOfResults) {
  let markup = arrayOfResults
    .map(
      card =>
        `<div class="photo-card">
              <a href="${card.largeImageURL}">
              <div class="thumb">
              <img 
                src="${card.webformatURL}"
                alt=" ${card.webformatURL}"
                loading="lazy"
                />
                </div>
              </a>
              <div class="info">
                <p class="info-item"><b>Likes</b><br> ${card.likes}</p>
                <p class="info-item"><b>Views</b><br> ${card.views}</p>
                <p class="info-item"><b>Comments</b><br> ${card.comments}</p>
                <p class="info-item"><b>Downloads</b><br> ${card.downloads}</p>
              </div>
            </div>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
}

function resetPage() {
  currentPage = 1;
}
