import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import errorIcon from '../img/error-icon.svg';

let userSelectedDate;

const dateTimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');

function btnOn() {
  startButton.disabled = false;
}
function btnOff() {
  startButton.disabled = true;
}

btnOff(); // btn disabled

const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < currentDate) {
      iziToast.show({
        title: 'Error',
        titleColor: 'white',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        color: 'red',
        backgroundColor: '#ef4040',
        iconUrl: errorIcon,
        position: 'topRight',
        closeOnEscape: true,
        close: false,
      });
      btnOn();
    } else {
      btnOn();
    }
  },
};

flatpickr(dateTimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer() {
  const currentTime = new Date();
  const timeDifference = userSelectedDate - currentTime;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    timerFields.days.textContent = '00';
    timerFields.hours.textContent = '00';
    timerFields.minutes.textContent = '00';
    timerFields.seconds.textContent = '00';
    btnOn();
    dateTimePicker.disabled = false;
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(timeDifference);
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}

let timerInterval;
function startTimer() {
  btnOff();
  dateTimePicker.disabled = true;
  timerInterval = setInterval(updateTimer, 1000);
}

startButton.addEventListener('click', startTimer);
