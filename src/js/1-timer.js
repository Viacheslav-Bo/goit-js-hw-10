import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const timerInput = document.getElementById('datetime-picker');
const dataDays = document.querySelectorAll('[data-days]');
const dataHours = document.querySelectorAll('[data-hours]');
const dataMinutes = document.querySelectorAll('[data-minutes]');
const dataSeconds = document.querySelectorAll('[data-seconds]');
const btnStart = document.querySelector('[data-start]');

btnStart.disabled = true;

let userSelectedDate = [];

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const nowDate = new Date();
    const chosenDate = selectedDates[0];
    if (chosenDate > nowDate) {
      btnStart.disabled = false;
      userSelectedDate = chosenDate;
    } else {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: 'rgb(255, 215, 163)',
      });
      btnStart.disabled = true;
    }
  },
};

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', () => {
  const chosenDate = userSelectedDate;
  btnStart.disabled = true;
  timerInput.disabled = true;

  const intervalId = setInterval(() => {
    const nowDate = new Date();
    const diff = chosenDate - nowDate;

    if (diff <= 0) {
      clearInterval(intervalId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    function addLeadingZero(value) {
      return String(value).padStart(2, '0');
    }

    dataDays[0].textContent = addLeadingZero(days);
    dataHours[0].textContent = addLeadingZero(hours);
    dataMinutes[0].textContent = addLeadingZero(minutes);
    dataSeconds[0].textContent = addLeadingZero(seconds);
  }, 1000);
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
