import '../css/style.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
// // Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPtotos } from './fetchPhoto.js';

const galerryList = document.querySelector('.gallery');
const inputEl = document.querySelector('input');
const formEl = document.querySelector('.search-form');
const imagesPerPage = 40;

let searchString;
let page = 1;
let markup = '';

const elem = {
  search: document.querySelector('input'),
};

const loadBtn = document.querySelector('.load-more');
// console.log(loadBtn);
inputEl.addEventListener('input', inputIn);
formEl.addEventListener('submit', renderPhotos);
loadBtn.addEventListener('click', loadNextPage);

function inputIn(event) {
  event.preventDefault();
  galerryList.innerHTML = '';
  if (!loadBtn.classList.contains('is-hidden')) {
    loadBtn.classList.toggle('is-hidden');
  }
  const current = event.target.value.trim();
  searchString = current;

  //   if (!current) {
  //     return;
  //   }
  //   fetchPtotos(current).then(data => {
  //     console.log(data);
  //     // return renderGalerry(data);
  //   });
}

function renderPhotos(event) {
  //   console.log('we are in renderPhotos ');
  if (page == 1) {
    event.preventDefault();
  }
  fetchPtotos(searchString, page, imagesPerPage)
    .then(data => {
      //   console.log(data);
      if (data.total > 0) {
        loadBtn.classList.toggle('is-hidden');
        renderGalerry(data.hits);
      } else {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(() => {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
  function renderGalerry(photos) {
    markup =
      markup +
      photos
        .map(photo => {
          return `<a href="${photo.largeImageURL}"><div class="photo-card">
  <img src='${photo.webformatURL}' alt="${photo.tags}" loading="lazy" class="gall-img"/>
  <div class="info">
    <p class="info-item">
      <b>Likes:${photo.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${photo.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${photo.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${photo.downloads}</b>
    </p>
  </div>
</div></a>`;
        })
        .join(' ');
    console.log(markup);

    galerryList.innerHTML = markup;
    let lightbox = new SimpleLightbox('.gallery a', {});
  }
}

function loadNextPage(event) {
  event.preventDefault();
  page = page + 1;
  renderPhotos();
}
