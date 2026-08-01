// game.js – Before / After / Between numbers game

(function () {
  const MIN_NUMBER = 1;
  const MAX_NUMBER = 100; // You can change to 20, 50, etc.

  const questionTitle = document.getElementById('questionTitle');
  const leftNumberEl = document.getElementById('leftNumber');
  const rightNumberEl = document.getElementById('rightNumber');
  const questionTextEl = document.getElementById('questionText');
  const answerInput = document.getElementById('answerInput');
  const feedbackEl = document.getElementById('feedback');

  const checkBtn = document.getElementById('checkBtn');
  const newQuestionBtn = document.getElementById('newQuestionBtn');

  const modeLabel = document.getElementById('modeLabel');
  const correctCountEl = document.getElementById('correctCount');
  const totalCountEl = document.getElementById('totalCount');
  const scoreLabel = document.getElementById('scoreLabel');

  const MODES = ['Before', 'After', 'Between'];
  let currentMode = 'Between';
  let correctAnswer = null;
  let correctCount = 0;
  let totalCount = 0;

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pickMode() {
    const index = randomInt(0, MODES.length - 1);
    currentMode = MODES[index];
    modeLabel.textContent = currentMode;
  }

  function makeQuestion() {
    // Pick mode and a base number
    pickMode();
    const n = randomInt(MIN_NUMBER + 2, MAX_NUMBER - 2); // keep space around

    let left = null;
    let right = null;
    let titleText = '';
    let helperText = '';

    if (currentMode === 'Before') {
      // Example: ? comes before 18
      left = '?';
      right = n;
      correctAnswer = n - 1;
      titleText = 'What number comes BEFORE?';
      helperText = 'Type the number that comes just before the right number.';
    } else if (currentMode === 'After') {
      // Example: 18 comes before ?
      left = n;
      right = '?';
      correctAnswer = n + 1;
      titleText = 'What number comes AFTER?';
      helperText = 'Type the number that comes just after the left number.';
    } else {
      // Between
      // Example: 12 ? 14
      left = n - 1;
      right = n + 1;
      correctAnswer = n;
      titleText = 'What number comes BETWEEN?';
      helperText = 'Type the number that lies between the two numbers.';
    }

    // Update UI
    questionTitle.textContent = titleText;
    leftNumberEl.textContent = String(left);
    rightNumberEl.textContent = String(right);
    questionTextEl.textContent = '?';
    feedbackEl.textContent = helperText;
    feedbackEl.style.color = '#ffffff';

    answerInput.value = '';
    answerInput.focus();
  }

  function updateStats() {
    correctCountEl.textContent = String(correctCount);
    totalCountEl.textContent = String(totalCount);
    const score = totalCount === 0 ? 0 : Math.round((correctCount / totalCount) * 100);
    scoreLabel.textContent = score + '%';
  }

  function checkAnswer() {
    const value = answerInput.value.trim();
    if (value === '') {
      feedbackEl.textContent = 'Type a number to check!';
      feedbackEl.style.color = '#ffeb3b';
      return;
    }

    const userNumber = parseInt(value, 10);
    totalCount += 1;

    if (userNumber === correctAnswer) {
      correctCount += 1;
      feedbackEl.textContent = 'Great job! That is correct ✅';
      feedbackEl.style.color = '#00ffb0';
      questionTextEl.textContent = String(correctAnswer);
    } else {
      feedbackEl.textContent =
        'Oops! Try again. The correct answer is ' + correctAnswer + '.';
      feedbackEl.style.color = '#ff5252';
      questionTextEl.textContent = String(correctAnswer);
    }

    updateStats();
  }

  // Event listeners
  checkBtn.addEventListener('click', checkAnswer);
  newQuestionBtn.addEventListener('click', function () {
    makeQuestion();
  });

  answerInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  });

  // Initial question
  makeQuestion();
  updateStats();
})();
