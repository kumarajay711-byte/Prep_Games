// game.js

(function () {
  const MIN_NUMBER = 1;
  const MAX_NUMBER = 10; // you can change range

  const numberDisplay = document.getElementById('numberDisplay');
  const currentNumberLabel = document.getElementById('currentNumber');
  const attemptsLabel = document.getElementById('attempts');
  const bestTimeLabel = document.getElementById('bestTime');
  const lastTimeLabel = document.getElementById('lastTime');

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const randomBtn = document.getElementById('randomBtn');

  let currentNumber = MIN_NUMBER;
  let attempts = 0;
  let gameStartTime = null;

  const BEST_TIME_KEY = 'kids_numbers_best_time_ms';

  function formatTime(ms) {
    if (ms == null) return '–';
    const seconds = ms / 1000;
    return seconds.toFixed(2) + 's';
  }

  function loadBestTime() {
    const stored = localStorage.getItem(BEST_TIME_KEY);
    if (!stored) {
      bestTimeLabel.textContent = '–';
      return null;
    }
    const value = parseFloat(stored);
    bestTimeLabel.textContent = formatTime(value);
    return value;
  }

  function saveBestTime(ms) {
    localStorage.setItem(BEST_TIME_KEY, String(ms));
    bestTimeLabel.textContent = formatTime(ms);
  }

  function updateUI() {
    numberDisplay.textContent = String(currentNumber);
    currentNumberLabel.textContent = String(currentNumber);
    attemptsLabel.textContent = String(attempts);
  }

  function startGameIfNeeded() {
    if (!gameStartTime) {
      gameStartTime = performance.now();
    }
  }

  function completeAttempt() {
    if (!gameStartTime) return;

    const elapsed = performance.now() - gameStartTime;
    lastTimeLabel.textContent = formatTime(elapsed);

    const best = loadBestTime();
    if (best == null || elapsed < best) {
      saveBestTime(elapsed);
    }

    gameStartTime = performance.now();
    attempts += 1;
    updateUI();
  }

  function setNumber(n) {
    if (n < MIN_NUMBER) n = MIN_NUMBER;
    if (n > MAX_NUMBER) n = MAX_NUMBER;
    currentNumber = n;
    updateUI();
  }

  // Button handlers
  prevBtn.addEventListener('click', function () {
    startGameIfNeeded();
    setNumber(currentNumber - 1);
    completeAttempt();
  });

  nextBtn.addEventListener('click', function () {
    startGameIfNeeded();
    setNumber(currentNumber + 1);
    completeAttempt();
  });

  randomBtn.addEventListener('click', function () {
    startGameIfNeeded();
    const randomNumber =
      Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
    setNumber(randomNumber);
    completeAttempt();
  });

  // Initial load
  loadBestTime();
  updateUI();
})();
