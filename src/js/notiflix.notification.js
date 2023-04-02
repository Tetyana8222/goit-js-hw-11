//----ф-ція при відсутності збігів----//
function noMatchesNotification() {
  Notiflix.Notify.warning(
    'Sorry, there are no images matching your search query. Please try again.',
    {
      timeout: 3000,
    }
  );
}
//------ф-ція на пустий запит----//
function noSearchValueNotification() {
  Notiflix.Notify.failure('Please enter a keyword to continue the search', {
    timeout: 3000,
  });
}

//---- ф-ція повідомлення про закінчення збігів
function endOfPicturesNotification() {
  Notiflix.Notify.info(
    'We are sorry, but you have reached the end of search results.',
    {
      timeout: 3000,
    }
  );
}

//----ф-ція для першого пошуку з вірним запитом---//
function numberOfResultsNotification() {
  Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`, {
    timeout: 4000,
  });
}
