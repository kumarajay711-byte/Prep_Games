// game.js

let currentQuestion = null;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  document.getElementById('result').textContent = '';
}

function checkAnswer() {
  if (!currentQuestion) return;

  const ansInput = document.getElementById('answer').value;
  const userAnswer = Number(ansInput);
  const resultEl = document.getElementById('result');

  if (userAnswer === currentQuestion.correctAnswer) {
    resultEl.textContent = 'Correct! 🎉';
    resultEl.className = 'correct';
  } else {
    resultEl.textContent =
      `Oops, try again. Correct answer is ${currentQuestion.correctAnswer}.`;
    resultEl.className = 'wrong';
  }
}

document.getElementById('checkBtn').addEventListener('click', checkAnswer);
document.getElementById('nextBtn').addEventListener('click', generateQuestion);

generateQuestion();
