// do something!
'use strict';

export default function StarRating(starContainers) {
  const dataset = starContainers.dataset;
  const starNum = dataset.maxRating;

  addStar(starContainers, starNum);

  starContainers.addEventListener('click', (event) => {
    commonEvents(event, 'selected');
    showRating(event);
  });
  starContainers.addEventListener('mouseover', (event) => {
    commonEvents(event, 'hovered');
  });
  starContainers.addEventListener('mouseout', (event) => {
    event.target.classList.remove('hovered');
  });
}

//마우스 클릭, 마우스오버 공통 이벤트
function commonEvents(e, className) {
  const targetContainer = e.target.parentElement;
  const targetStars = targetContainer.querySelectorAll('.bxs-star');
  if (e.target.matches('.star-rating')) return;

  targetStars.forEach((star, index) => {
    if (e.target === star) {
      targetStars.forEach((otherStar, otherIndex) => {
        index >= otherIndex
          ? otherStar.classList.add(className)
          : otherStar.classList.remove(className);
      });
    }
  });
}
//브라우저에 별 추가
function addStar(container, starNum) {
  for (let i = 0; i < starNum; i++) {
    const star = document.createElement('i');
    star.className = 'bx bxs-star';
    container.appendChild(star);
  }
}

//점수 보여주기
function showRating(event) {
  const targetContainer = event.target.parentElement;
  const targetStars = [...targetContainer.querySelectorAll('.selected')];
  const ratingContainer = targetContainer.nextElementSibling;
  const rating = ratingContainer.children.item(0);
  rating.textContent = targetStars.length;
}
