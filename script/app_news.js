'use strict';
let PAGE = 1;
const LIMIT = 5;
const END = 100; // 총 뉴스갯수
let TOTAL = 5; // 늘어나는 갯수

let API = 'f5c71aa0270a4f13934783d88ed46400';
//  '9b2ca07206554952864d472264a3ee79';
//'76280f683ae24efd8f507020e50fa56e';
//
const NOIMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

const wrapper = document.querySelector('.wrapper');
const observer = document.querySelector('.scroll-observer');

const displayNewsList = (newsList) => {
  const listContainer = document.querySelector('.news-list-container');
  newsList.forEach((news) => {
    const newsList = document.createElement('article');
    newsList.classList.add('news-list');
    newsList.innerHTML = `
      <section class="news-item">
        <div class="thumbnail">
          <a href="${news.url}" target="_blank" rel="noopener noreferrer">
            <img
              src="${news.urlToImage ? news.urlToImage : NOIMAGE}"
              alt="thumbnail" />
          </a>
        </div>
        <div class="contents">
          <h3>
            <a href="${news.url}" target="_blank" rel="noopener noreferrer">
              ${news.title}
            </a>
          </h3>
          <p>${news.content !== null ? news.content : ''}</p>
        </div>
      </section>               
    `;
    listContainer.appendChild(newsList);
  });
};

const onScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (TOTAL == END) {
    window.removeEventListener('scroll', onScroll);
    return;
  }
  if (scrollTop + clientHeight >= scrollHeight + 5) {
    PAGE++;
    TOTAL += LIMIT;
    loadNews();
  }
};
const showLoader = () => {
  observer.style.opacity = 1;
};
const hideLoader = () => {
  observer.style.opacity = 0;
};

const getNews = () => {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=er&category=business&pageSize=${LIMIT}&page=${PAGE}&apiKey=${API}`
    )
    .then((res) => displayNewsList(res.data.articles))
    .catch((error) => {
      errorHandling();
      console.log('에러인거니...?');
    });
};
const errorHandling = () => {
  API = 'f5c71aa0270a4f13934783d88ed46400';
  loadNews();
};
const loadNews = async () => {
  //로딩 엘리멘트를 보여줌
  showLoader();
  try {
    getNews();
  } catch (error) {
    console.log(error);
  } finally {
    //로딩 엘리멘트를 사라지게함
  }
};

window.addEventListener('load', () => {
  loadNews();
  window.addEventListener('scroll', onScroll);
});
