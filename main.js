//아이템 리스트 배경색상 랜덤으로 주기
const itemHoverBoxes = document.querySelectorAll('.hover-box');

itemHoverBoxes.forEach((box) => {
  const randomNum = makeRandomNumber(1, 6);
  box.classList.add(`bg${randomNum}`);
});

function makeRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + 1);
}


