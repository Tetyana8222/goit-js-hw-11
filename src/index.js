import './sass/_common.scss';

import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';

const KEY = '34781743-09d11a08c8aa729d147b2c9f6';
const BASE_URL = 'https://pixabay.com/api/';

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

let lastSearchValue = '';
var lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});
let perPage = 40;
let currentPage = 1;
let total = '';

// ------робимо кноку loadMoreBtn невидимою-------
loadMoreBtnEl.style.display = 'none';

searchFormEl.addEventListener('submit', onSearch);
loadMoreBtnEl.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  searchValue = event.currentTarget.searchQuery.value.trim();
  //-------якщо вікно пошуку пусте, то повідомлення
  if (searchValue === '') {
    Notiflix.Notify.warning('Please enter a keyword to continue the search');
    loadMoreBtnEl.style.display = 'none';
    return;
  }
  if (searchValue === lastSearchValue) {
    currentPage += 1;
  }
  if (searchValue !== lastSearchValue) {
    lastSearchValue = searchValue;
    currentPage = 1;
    galleryEl.innerHTML = '';
  }

  const data = await addImagesList(currentPage, searchValue);
  // console.log(data);
  const arrayOfResults = data.hits;

  //-------якщо результат пошуку 0, то повідомлення------//
  if (data.totalHits === 0) {
    page = 1;
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    return;
  }
  // --якщо результат пошуку - непорожній масив, то повідомлення---//
  if (data.hits.length > 0) {
    markupCard(arrayOfResults);
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    loadMoreBtnEl.style.display = 'block';
  }
  onLoadMore();
}
async function onLoadMore() {
  let data = await addImagesList(lastSearchValue, currentPage);
  const arrayOfResults = data.hits;
  console.log(arrayOfResults);
  console.log(data.totalHits);

  if (arrayOfResults.length > 0) {
    markupCard(arrayOfResults);
    loadMoreBtnEl.style.display = 'block';
    if (currentPage === 1) {
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    }
    currentPage += 1;
  }
  if (currentPage >= Math.ceil(data.totalHits / 40)) {
    Notiflix.Notify.warning(
      `We're sorry, but you've reached the end of search results.`
    );
    loadMoreBtnEl.style.display = 'none';
  }
}
async function addImagesList() {
  const response = await fetch(
    `${BASE_URL}?key=${KEY}&q=${searchValue}&type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${currentPage}`
  );

  const promice = response.json();
  return promice;
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
  lightbox.refresh();
}

function resetPage() {
  currentPage = 1;
}

//функція-слухач скролу
window.addEventListener('scroll', () => {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom < document.documentElement.clientHeight + 150) {
    currentPage++;
    onLoadMore();
  }
});
