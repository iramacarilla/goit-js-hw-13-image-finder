
import './styles.css';
import template from './template/template.hbs';
import api from './js/api.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import "@pnotify/core/dist/PNotify.css";
import { info, error } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";


const refs = {
  search: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  btn: document.querySelector('[data-action="show-more"]'),
}

refs.search.addEventListener('submit', event => {
  event.preventDefault();
  const searchQ = event.currentTarget;
  api.query  = searchQ.elements.query.value;
  refs.gallery.innerHTML = '';
  searchQ.reset();

if (api.query === '') {
    return info({
      text: 'Enter the value!',
      delay: 2000,
    });
    refs.btn.classList.remove('is-hidden');
  }


 api.resetPage();
 refs.btn.classList.add('is-hidden');

 api.fearchHits().then(hits => {
  updateMarkup (hits);
  refs.btn.classList.remove('is-hidden');
  window.scrollTo ({
    top: 1000,
    behavior: 'smooth',
  })
 });
})

function updateMarkup (hits) {
  const markup = template(hits);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

refs.btn.addEventListener('click', () => {
  api.fearchHits().then(hits => {
    updateMarkup (hits);
    window.scrollTo ({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    })
  })
})

const onOpenModal = (event) => {
  if (event.target.nodeName !== 'IMG') {
  return;
  }
  const largeImageURL = `<img src= ${event.target.dataset.source}>`;
  basicLightbox.create(largeImageURL).show();
}

refs.gallery.addEventListener('click', onOpenModal);

