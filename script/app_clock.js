import { AnalogClock } from './AnalogClock.js';

const analogClockDOM = document.querySelectorAll('.analog-clock');

analogClockDOM.forEach(AnalogClock);

setInterval(function () {
  AnalogClock();
}, 1000);
