const container = document.querySelector('.container');
const calendar = document.querySelector('.calendar');
const calendarYear = document.querySelector('#year');
const calendarDays = document.querySelector('.calendar-days');
const monthPicker = document.querySelector('#month-picker');
const calendarMonths = document.querySelector('.calendar-months');
const monthList = document.querySelector('.month-list');
const prevYearBtn = document.querySelector('#prev-year');
const nextYearBtn = document.querySelector('#next-year');
const selectedDay = document.querySelector('#selected_day');
const btnCalendar = document.querySelector('#btn-calendar');

const currDate = new Date();
let currMonth = currDate.getMonth();
let currYear = currDate.getFullYear();

const monthNames = [
  'January 1월',
  'February 2월',
  'March 3월',
  'April 4월',
  'May 5월',
  'June 6월',
  'July 7월',
  'August 8월',
  'September 9월',
  'October 10월',
  'November 11월',
  'December 12월',
];

calendar.addEventListener('click', (event) => {
  const target = event.target;
  if (target == monthPicker) {
    showMonthPicker();
  } else if (target == prevYearBtn) {
    onPrevYear();
  } else if (target == nextYearBtn) {
    onNextYear();
  }
});

const onPrevYear = () => {
  currYear--;
  createCalendar(currMonth, currYear);
};
const onNextYear = () => {
  currYear++;
  createCalendar(currMonth, currYear);
};

const showMonthPicker = () => {
  calendarMonths.classList.add('show');
};
const hideMonthPicker = () => {
  calendarMonths.classList.remove('show');
};

monthNames.forEach((monthName, index) => {
  const month = document.createElement('li');
  month.innerHTML = `<span>${monthName}</span>`;
  monthList.appendChild(month);

  month.addEventListener('click', () => {
    hideMonthPicker();
    currMonth = index;
    createCalendar(currMonth, currYear);
  });
});

//윤년구하기
const isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

// 캘린더날짜 만들기
const createCalendar = (month, year) => {
  calendarDays.innerHTML = '';

  //날짜의 갯수 미리 지정
  const daysOfMonth = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  monthPicker.innerHTML = monthNames[month];
  calendarYear.textContent = year;

  //1일 구하기
  const firstDay = new Date(year, month, 1);
  const prevEmptyDays = firstDay.getDay() - 1;
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  const lastDayOfMonth = new Date(year, month, lastDateOfMonth).getDay();
  const lastDateOfLastMonth = new Date(year, month, 0).getDate();

  //일-0/월-1/화-2/수-3/목-4/금-5/토-6
  //날짜를 몇개 만들것인지에 대한 반복문

  //현재달에 이전달 불러오기
  for (let i = prevEmptyDays; i >= 0; i--) {
    const day = document.createElement('li');
    day.classList.add('notCurrDay');
    day.innerHTML = `${lastDateOfLastMonth - i}`;

    calendarDays.appendChild(day);
  }

  //현재달 만들기
  for (let i = 0; i <= daysOfMonth[month] + prevEmptyDays; i++) {
    if (i >= firstDay.getDay()) {
      const day = document.createElement('li');
      day.dataset.id = i;
      day.classList.add('day');
      day.innerHTML = `${i - firstDay.getDay() + 1}
                      <span></span>
                      <span></span>
                      <span></span> 
                      <span></span>`;
      //오늘찾기
      if (
        i - prevEmptyDays === currDate.getDate() &&
        year === currDate.getFullYear() &&
        month === currDate.getMonth()
      ) {
        day.classList.add('today');
      }
      calendarDays.appendChild(day);
    }
  }
  //현재달에 다음달 부러오기
  for (let i = lastDayOfMonth; i < 6; i++) {
    const day = document.createElement('li');
    day.classList.add('notCurrDay');
    day.innerHTML = `${i - lastDayOfMonth + 1}`;
    calendarDays.appendChild(day);
  }

  const $days = document.querySelectorAll('.day');

  $days.forEach((day, index) =>
    day.addEventListener('click', () => {
      onClickDay(index);
    })
  );
  //onClickDay($days);
};

// 날짜 클릭시 선택한날 가져오기
function onClickDay(index) {
  const originalSeleted = document.querySelectorAll('.selected')?.[0];
  originalSeleted?.classList.remove('selected');
  event.target.classList.add('selected');

  btnCalendar.innerHTML = `
        <span class="txt">선택된 날 : </span> 
        ${currYear} 년  
        ${currMonth + 1} 월
        ${index + 1} 일
    `;
}

//캘린더 픽커 버튼 클릭
let clicked = false;
btnCalendar.onclick = () => {
  if (clicked) {
    calendar.classList.add('hide');
  } else {
    calendar.classList.remove('hide');
  }
  clicked = !clicked;
  //console.log(clicked);
};

// 캘린더외에 영역 클릭시 닫기
document.addEventListener('click', function (e) {
  if (clicked == true) {
    if (e.target.id != 'btn-calendar') {
      let calendarDOM = e.target.closest('.calendar');
      if (!calendarDOM) {
        calendar.classList.add('hide');
        return (clicked = false);
      }
    }
  }
});

createCalendar(currMonth, currYear);
