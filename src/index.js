import './css/style.css';
import PostApiService from './service';
import Notiflix from 'notiflix';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btn = document.querySelector('.load-more');

const postApiService = new PostApiService();

form.addEventListener('submit', onSearch);
btn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  const value = e.target.elements.searchQuery.value.trim();
  if (value === '') {
    removeClassBtn();
    Notiflix.Notify.warning('Please enter something');
    clearGallery();
    return;
  }
  postApiService.query = value;
  postApiService.resetPage();
  const post = await postApiService.fetchPost()
 try {
    if (post.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      clearGallery();
      removeClassBtn();
      return;
    } else {
      clearGallery();
      Notiflix.Notify.success(`Hooray! We found ${post.totalHits} images`);
      if(post.hits.length < 40){
        endPage(post);
      }else{
        appendPostMarkup(post);
        addClassBtn();
      }
      
    }
  }
  catch (error) {
  console.error(error);
};
 
}

async function onLoadMore() {
  const post = await postApiService.fetchPost()
  console.log(post);
  try {
    if (post.hits.length < 40) {
        endPage(post);
    } else {
      appendPostMarkup(post);
    }
  }catch(error){
    console.error(error);
  };
}

function appendPostMarkup(obj) {
  obj.hits.map(elem => {
    gallery.insertAdjacentHTML(
      'beforeend',
      `<div class="photo-card">
        <img src="${elem.webformatURL}" alt="${elem.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${elem.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${elem.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${elem.comments} 
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${elem.downloads}
          </p>
        </div>
      </div>`
    );
  });
}

function clearGallery() {
  gallery.innerHTML = '';
}

function addClassBtn() {
  btn.classList.add('is-hidden');
}

function removeClassBtn() {
  btn.classList.remove('is-hidden');
}

function endPage(post) {
  const btn = document.querySelector(".btn");
      appendPostMarkup(post);
      removeClassBtn();
      gallery.insertAdjacentHTML(
        'beforeend',
        `<div class="message"><b>We're sorry, but you've reached the end of search results.<b></biv>`
      );
}