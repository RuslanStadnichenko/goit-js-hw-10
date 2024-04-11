import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector('[data-start]');
const inputData = document.querySelector("#datetime-picker");
const dataDays = document.querySelectorAll('[data-days]');
const dataHours = document.querySelectorAll('[data-hours]');
const dataMinutes = document.querySelectorAll('[data-minutes]');
const dataSeconds = document.querySelectorAll('[data-seconds]');

let timerInterval;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let userSelectedDate = selectedDates[0];
    let currentDate = new Date();

    if (userSelectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight'
      });
    } else {
       startButton.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

startButton.addEventListener('click', () => {
  let selectedDate = flatpickr.parseDate(inputData.value);
  let currentDate = new Date();

  if (selectedDate <= currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight'
    }),
    startButton.disabled = true;
      return;
  }

  let timeRemaining = selectedDate - currentDate;

  function updateTimer() {
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    dataDays.forEach(el => el.textContent = addLeadingZero(days));
    dataHours.forEach(el => el.textContent = addLeadingZero(hours));
    dataMinutes.forEach(el => el.textContent = addLeadingZero(minutes));
    dataSeconds.forEach(el => el.textContent = addLeadingZero(seconds));

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      iziToast.success({
        title: 'Success',
        message: 'Countdown timer has finished!',
        position: 'topRight'
      });
      inputData.disabled = false;
    }

    timeRemaining -= 1000;
  }

 
  timerInterval = setInterval(updateTimer, 1000);
});

updateTimer();
 

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

