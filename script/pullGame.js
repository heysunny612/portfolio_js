const CARROT_NUMBER = 10;
const BUG_NUMBER = 5;
const CARROT_IMAGE = '../assets/img/carrot.png';
const BUG_IMAGE = '../assets/img/bug.png';
const IMAGE_SIZE = 80;
const GAME_DURATION = 10;

const startBtn = document.querySelector('.game__button');
const gameField = document.querySelector('.game__field');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUpLayer = document.querySelector('.pop-up');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const soundAlert = new Audio('../assets/sound/alert.wav');
const soundBg = new Audio('../assets//sound/bg.mp3');
const soundBugPull = new Audio('../assets//sound/bug_pull.mp3');
const soundCarrotPull = new Audio('../assets//sound/carrot_pull.mp3');
const soundGameWin = new Audio('../assets//sound/game_win.mp3');

let start = false;
let score = 0;
let timer = null;

// 게임 START 이벤트
startBtn.addEventListener('click', () => {
  if (!start) {
    //플레이버튼을 눌렀다면,
    startGame();
  } else if (start) {
    //정지버튼을 눌렀다면
    stopGame();
  }
  start = !start;
});

// 당근을 눌렀을 때 이벤트
gameField.addEventListener('click', (event) => {
  if (event.target.matches('.game__field')) {
    return;
  }
  if (event.target.matches('.carrot')) {
    event.target.remove();
    score++;
    countScore(score);
    audioPlay(soundCarrotPull);
  } else if (event.target.matches('.bug')) {
    showPopUp('YOU LOST 😂');
    audioPlay(soundBugPull);
  }
});
// 팝업을 눌렀을 때, 이벤트
popUpRefresh.addEventListener('click', () => {
  start = true;
  startGame();
  hidePopUp();
});

// 게임 스타트
function startGame() {
  init();
  showPauseBtn();
  showItems();
  showScoreAndTimer();
  startGameTimer();
  audioPlay(soundBg);
}

//게임정지
function stopGame() {
  showPlayBtn();
  showPopUp('RESTART? 😎');
  audioPause(soundBg);
}

//게임 실행 함수
function init() {
  //start = true;
  score = 0;
  gameScore.innerHTML = CARROT_NUMBER;
  gameField.innerHTML = '';
  startBtn.style.visibility = 'visible';
}

// 게임이 시작되면 스코어, 타이머 보여주기
function showScoreAndTimer() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

// 클릭된 당근 수 스코어로 계산해주기
function countScore(score) {
  gameScore.innerHTML = CARROT_NUMBER - score;
  if (score === CARROT_NUMBER) {
    showPopUp('YOU WON 😊');
  }
}

// 타이머
function startGameTimer() {
  let remainingSec = GAME_DURATION;
  updateTimerText(remainingSec);
  timer = setInterval(() => {
    if (remainingSec <= 0) {
      showPopUp('YOU LOST 😂');
      return;
    }
    updateTimerText(--remainingSec);
  }, 1000);
}

function updateTimerText(time) {
  const min = Math.floor(time / 60);
  const sec = time % 60;

  return (gameTimer.innerText = `${min}:${sec}`);
}

// 팝업뜨기 (이겼을때, 정지했을때, 졌을때)
function showPopUp(text) {
  clearInterval(timer);
  const popUpTxt = document.querySelector('.pop-up__message');
  popUpLayer.style.display = 'block';
  popUpTxt.innerText = text;
  startBtn.style.visibility = 'hidden';
  audioPlay(soundAlert);
  audioPause(soundBg);
}

// Refresh 버튼을 눌렀을때 popup 숨기기
function hidePopUp() {
  popUpLayer.style.display = 'none';
}

//플레이버튼->정지버튼
function showPauseBtn() {
  const icon = startBtn.querySelector('.fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

//정지버튼->플레이버튼
function showPlayBtn() {
  const icon = startBtn.querySelector('.fas');
  icon.classList.add('fa-play');
  icon.classList.remove('fa-stop');
}

//게임이 시작되었다면, 필드에 아이템 보여주기
function showItems() {
  for (let i = 0; i < CARROT_NUMBER; i++) {
    const carrot = document.createElement('img');
    carrot.className = 'carrot';
    carrot.setAttribute('src', CARROT_IMAGE);
    gameField.appendChild(carrot);
  }
  for (let i = 0; i < BUG_NUMBER; i++) {
    const bug = document.createElement('img');
    bug.className = 'bug';
    bug.setAttribute('src', BUG_IMAGE);
    gameField.appendChild(bug);
  }
  randomItems();
}

//carrot, bug를 받아와서, 랜덤하게 위치시키기
function randomItems() {
  const items = gameField.querySelectorAll('img');
  const fieldRect = gameField.getBoundingClientRect();
  const x = fieldRect.width;
  const y = fieldRect.height;

  items.forEach((item) => {
    const resultY = randomInt(0, y) - IMAGE_SIZE;
    const resultX = randomInt(0, x) - IMAGE_SIZE;
    item.style.top = Math.abs(resultY) + 'px';
    item.style.left = Math.abs(resultX) + 'px';
  });
}

//숫자 랜덤으로 뽑기
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + 1);
}

//오디오 플레이
function audioPlay(audio) {
  audio.play();
}

//오디오 정지
function audioPause(audio) {
  audio.pause();
}
