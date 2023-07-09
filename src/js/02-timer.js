import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";
import "notiflix/dist/notiflix-aio-3.2.6.min.js"

const inputData = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const dayValue = document.querySelector('span[data-days]');
const hoursValue = document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

let countDay;
let countInterval;

function updateTimer() {
    const currentDate = new Date().getTime();
    const difference = countInterval - currentDate;

    if (difference <= 0) {
      clearInterval(countDay);
      startBtn.disabled = false;
      Notiflix.Notify.success('Countdown completed!');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(difference);

    dayValue.textContent = addNumberZero(days);
    hoursValue.textContent = addNumberZero(hours);
    minutesValue.textContent = addNumberZero(minutes);
    secondsValue.textContent = addNumberZero(seconds);
}


function startCountdown() {
    const selectedDate = new Date(inputData.value).getTime();

    if (selectedDate <= new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    countInterval = selectedDate;
    startBtn.disabled = true;

    countDay = setInterval(updateTimer, 1000);
  }

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


  function addNumberZero(value) {
    return value.toString().padStart(2, '0');
  }

  inputData.addEventListener('change', handlerData());
  startBtn.addEventListener('click', startCountdown);

  function handlerData() {
    const selectedDate = new Date(inputData.value).getTime();
    const currentDate = new Date().getTime();

    if (selectedDate > currentDate) {
      startBtn.disabled = false;
    } else {
      startBtn.disabled = true;
    }
  }

  

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
        const selectedDate = selectedDates[0].getTime();
        const currentDate = new Date().getTime();

        if (selectedDate <= currentDate) {
        startBtn.disabled = true;
        Notiflix.Notify.failure('Plesure choose the date in the feature');
        } else {
            startBtn.disabled = false;
        }
    }

  };

  flatpickr("#datetime-picker", options)
  