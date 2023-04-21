const body = document.body;
const toggleBtn = document.querySelector('#ChangeToggle');
const navigation = document.querySelector('#navigation');
const getStorage = localStorage.getItem('status');
const innerContainer = document.querySelector('.common-inner');

let toggle = false;

//클릭 이벤트
toggleBtn.addEventListener('click', () => {
  if (!toggle) {
    openMenu();
  } else {
    closeMenu();
  }
  body.classList.remove('preload');
  toggle = !toggle;
});

//새로고침이나, 페이지이동 시, 로컬 스토리지를 이용한 상태(open,close) 유지
if (getStorage === 'open') {
  toggle = true;
  openMenu();
} else if (getStorage === 'close') {
  closeMenu();
}

function openMenu() {
  body.classList.add('preload');
  navigation.classList.add('active');
  setLocalStorage('status', 'open');
  innerContainer.style.left = '-100px';
}

function closeMenu() {
  navigation.classList.remove('active');
  setLocalStorage('status', 'close');
  innerContainer.style.left = '0px';
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

/*
 * HTML과 Script가 로드된 시점에 발생하는 이벤트(DOMContentLoaded)를 사용한
 * active 클래스가 추가된 이후에 body를 표시
 */
window.addEventListener('DOMContentLoaded', () => {
  body.style.visibility = 'visible';
});
