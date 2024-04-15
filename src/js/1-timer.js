import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
const inputData = document.querySelector("#datetime-picker");
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let timerInterval;
let userSelectedDate;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    let currentDate = new Date();

    if (userSelectedDate < currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight'
      });
       startButton.disabled = true;
    } else {
       startButton.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

startButton.addEventListener('click', () => {
  if (!userSelectedDate || userSelectedDate < new Date()) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a valid future date',
      position: 'topRight'
    });
    return;
  }

  
  startButton.disabled = true;
  inputData.disabled = true;
  let timeRemaining = userSelectedDate - new Date();

  function updateTimer() {
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      iziToast.success({
        title: 'Success',
        message: 'Countdown timer has finished!',
        position: 'topRight'
      });
       inputData.disabled = false;
      dataDays.textContent = '00';
      dataHours.textContent = '00';
      dataMinutes.textContent = '00';
      dataSeconds.textContent = '00';
    } else {
      dataDays.textContent = addLeadingZero(days);
      dataHours.textContent = addLeadingZero(hours);
      dataMinutes.textContent = addLeadingZero(minutes);
      dataSeconds.textContent = addLeadingZero(seconds);
    }

    timeRemaining -= 1000;
  }

  updateTimer();

  timerInterval = setInterval(updateTimer, 1000);
});


 

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

