export const AnalogClock = () => {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  if (h > 12) h = h - 12;

  let dh = h * 30 + m / 2;
  dh = parseInt(dh);
  let dm = m * 6;
  let ds = s * 6;

  const secondDOM = document.querySelectorAll('.second');
  const minuteDOM = document.querySelectorAll('.minute');
  const hourDOM = document.querySelectorAll('.hour');

  secondDOM.forEach((dom) => {
    dom.style.transform = `rotate(${ds}deg)`;
  });
  minuteDOM.forEach((dom) => {
    dom.style.transform = `rotate(${dm}deg)`;
  });
  hourDOM.forEach((dom) => {
    dom.style.transform = `rotate(${dh}deg)`;
  });
};

