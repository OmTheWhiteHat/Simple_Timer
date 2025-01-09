// script.js
let timer;
let isRunning = false;
let seconds = 0;
let customTime = 0;

const timeDisplay = document.getElementById('time');
const startStopBtn = document.getElementById('startStopBtn');
const resetToZeroBtn = document.getElementById('resetToZeroBtn');
const setTimeBtn = document.getElementById('setTimeBtn');
const customTimeInput = document.getElementById('customTime');
const timeUpSound = document.getElementById('timeUpSound');  // Audio element

function updateDisplay() {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;
  timeDisplay.textContent = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
  if (seconds <= 0) {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    return;
  }

  timer = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      startStopBtn.textContent = 'Start';
      timeUpSound.play(); // Play sound when the timer reaches zero
      alert("Time's up!"); // Optional alert message
    }
  }, 1000);
  isRunning = true;
  startStopBtn.textContent = 'Pause';
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
  startStopBtn.textContent = 'Resume';
}

startStopBtn.addEventListener('click', () => {
  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
});

resetToZeroBtn.addEventListener('click', () => {
  clearInterval(timer);
  seconds = 0;
  updateDisplay();
  isRunning = false;
  startStopBtn.textContent = 'Start';
});

setTimeBtn.addEventListener('click', () => {
  const customSeconds = parseInt(customTimeInput.value, 10);
  if (customSeconds && customSeconds > 0) {
    customTime = customSeconds;
    seconds = customTime;
    updateDisplay();
    customTimeInput.value = '';
  } else {
    alert('Please enter a valid number of seconds!');
  }
});

// Initial display update
updateDisplay();
