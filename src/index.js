import './sass/_common.scss';
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
let perPage = 10;
let currentPage = 1;
let currentHits = 0;

searchFormEl.addEventListener('submit', onSearch);
// refs.loadMoreBtnEl.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  resetPage();
  searchValue = event.currentTarget.searchQuery.value.trim();
  console.log(searchValue);
  currentPage = 1;
  if (searchValue === '') {
    // galleryEl.innerHTML = '';
    console.log('empty');
    return;
  }
  const data = await addImagesList(currentPage, searchValue);
  console.log(data);
  const arrayOfResults = data.hits;
  // console.log(arrayOfResults);
  // console.log(data.totalHits);
  if (data.hits.length > 0) {
    markupCard();
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
                 <img class="photo-card-img" src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
                 </a>
                     <div class="info">
                         <p class="info-item">
                         <b>Likes</b>
                           <span class="span">${card.likes}</span>
                         </p>
                         <p class="info-item">
                           <b>Views</b>
                           <span class="span">${card.views}</span>
                         </p>
                         <p class="info-item">
                           <b>Comments</b>
                           <span class="span">${card.comments}</span>
                         </p>
                         <p class="info-item">
                           <b>Downloads</b>
                           <span class="span">${card.downloads}</span>
                          </p>
                  </div>
            </div>`
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforebegin', markup);
}

function resetPage() {
  currentPage = 1;
}
