// game.js

let currentQuestion = null;

// ----- Stopwatch variables -----
let timerInterval = null;
let timerStartTime = null;

// ----- Best time (per browser) -----
const BEST_TIME_KEY = 'kids_numbers_best_time_ms';

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load best time on startup
function loadBestTime() {
  const stored = localStorage.getItem(BEST_TIME_KEY);
  const bestTimeEl = document.getElementById('best-time');

  if (!bestTimeEl) return;

  if (stored) {
    const ms = Number(stored);
    bestTimeEl.textContent = formatTime(ms);
  } else {
    bestTimeEl.textContent = '--:--';
  }
}

function generateQuestion() {
  const types = ['before', 'after', 'between'];
  const type = types[randInt(0, types.length - 1)];

  let questionText = '';
  let correctAnswer = 0;

  if (type === 'before') {
    const n = randInt(2, 40);
    questionText = `What number comes before ${n}?`;
    correctAnswer = n - 1;
    currentQuestion = { type, n, correctAnswer };
  } else if (type === 'after') {
    const n = randInt(1, 39);
    questionText = `What number comes after ${n}?`;
    correctAnswer = n + 1;
    currentQuestion = { type, n, correctAnswer };
  } else if (type === 'between') {
    let a = randInt(1, 39);
    let b = a + 2;
    questionText = `What number comes between ${a} and ${b}?`;
    correctAnswer = a + 1;
    currentQuestion = { type, a, b, correctAnswer };
  }

  document.getElementById('question').textContent = questionText;
  document.getElementById('answer').value = '';
  const resultEl = document.getElementById('result');
  resultEl.textContent = '';
  resultEl.className = '';

  // Start stopwatch for this new question
  startQuestionTimer();
}

// ----- Time formatting -----
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// ----- Stopwatch functions -----
function startQuestionTimer() {
  // Clear any previous timer
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerStartTime = Date.now();
  const timerEl = document.getElementById('question-timer');
  if (!timerEl) return;

  // Reset display
  timerEl.textContent = '00:00';

  timerInterval = setInterval(() => {
    const elapsed = Date.now() - timerStartTime;
    timerEl.textContent = formatTime(elapsed);
  }, 500); // update every 0.5s
}

function stopQuestionTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// ----- Best time update -----
function updateBestTimeIfNeeded() {
  if (!timerStartTime) return;

  const endTime = Date.now();
  const elapsedMs = endTime - timerStartTime;

  const stored = localStorage.getItem(BEST_TIME_KEY);
  let storedMs = stored ? Number(stored) : null;

  // If no stored time or current is faster, update
  if (storedMs === null || elapsedMs < storedMs) {
    localStorage.setItem(BEST_TIME_KEY, String(elapsedMs));

    const bestTimeEl = document.getElementById('best-time');
    if (bestTimeEl) {
      bestTimeEl.textContent = formatTime(elapsedMs);
    }
  }
}

// ----- Answer checking -----
function checkAnswer() {
  if (!currentQuestion) return;

  const ansInput = document.getElementById('answer').value;
  const userAnswer = Number(ansInput);
  const resultEl = document.getElementById('result');

  if (userAnswer === currentQuestion.correctAnswer) {
    resultEl.textContent = 'Correct! 🎉';
    resultEl.className = 'correct';

    // Stop timer when answer is correct
    stopQuestionTimer();

    // Update best time if this attempt is faster
    updateBestTimeIfNeeded();
  } else {
    resultEl.textContent = `Oops, try again. Correct answer is ${currentQuestion.correctAnswer}.`;
    resultEl.className = 'wrong';
  }
}

// ----- Event bindings -----
document.getElementById('checkBtn').addEventListener('click', checkAnswer);
document.getElementById('nextBtn').addEventListener('click', generateQuestion);

// Initial load: best time + first question
loadBestTime();
generateQuestion();
