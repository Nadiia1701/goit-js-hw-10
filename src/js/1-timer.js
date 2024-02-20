
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputfield = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const showdays = document.querySelector('[data-days]');
const showhours = document.querySelector('[data-hours]');
const showminutes = document.querySelector('[data-minutes]');
const showseconds = document.querySelector('[data-seconds]');
startBtn.disabled = true;

startBtn.addEventListener('click', () => {
  timer.start();
  startBtn.disabled = true;
  inputfield.disabled = true;
});

const options = {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const userDate = new Date(selectedDates[0]).getTime();
    const startDate = Date.now();

    if (userDate > startDate) {
      startBtn.disabled = false;
      delta = userDate - startDate;
      const { days, hours, minutes, seconds } = convertMs(delta);
      showdays.textContent = days;
      showhours.textContent = hours;
      showminutes.textContent = minutes;
      showseconds.textContent = seconds;
    } else {
      iziToast.error({
        fontSize: 'large',
        close: false,
        position: 'topRight',
        messageColor: 'white',
        timeout: 2000,
        backgroundColor: 'red',
        message: "Please choose a date in the future"
      });
    }
  }
};

flatpickr('#datetime-picker', options);

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

class Timer {

  constructor({ onTick }) {
    this.onTick = onTick;
    this.interval = null;
  }

  start() {
    this.interval = setInterval(() => {
      delta -= 1000;
      const time = convertMs(delta);
      this.onTick(time);
      if (delta <= 0) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

}

let delta = 0;

const timer = new Timer({
  onTick: updateClockface,
});

function updateClockface({ days, hours, minutes, seconds }) {
  showdays.textContent = timer.pad(days);
  showhours.textContent = timer.pad(hours);
  showminutes.textContent = timer.pad(minutes);
  showseconds.textContent = timer.pad(seconds);
}