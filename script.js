// Get the game container
const gameDiv = document.getElementById("game");

// Start the first question
startNewQuestion();

function startNewQuestion() {
    // Clear the area
    gameDiv.innerHTML = "";

    // Choose a random question type: before, after, between
    const types = ["before", "after", "between"];
    const qType = types[Math.floor(Math.random() * types.length)];

    // Choose a base number between 2 and 19 (to keep within safe range)
    const n = Math.floor(Math.random() * 18) + 2; // 2 to 19

    let questionText = "";
    let correctAnswer;
    let displayNumbers = "";

    if (qType === "before") {
        questionText = `Which number comes BEFORE ${n}?`;
        correctAnswer = n - 1;
        displayNumbers = `${correctAnswer} , ${n}`;
    } else if (qType === "after") {
        questionText = `Which number comes AFTER ${n}?`;
        correctAnswer = n + 1;
        displayNumbers = `${n} , ${correctAnswer}`;
    } else {
        // between
        questionText = `Which number comes BETWEEN ${n - 1} and ${n + 1}?`;
        correctAnswer = n;
        displayNumbers = `${n - 1} , ? , ${n + 1}`;
    }

    // Show question text
    const qElem = document.createElement("p");
    qElem.textContent = questionText;
    gameDiv.appendChild(qElem);

    // Optionally show the sequence for clarity
    const seqElem = document.createElement("p");
    seqElem.textContent = "Sequence: " + displayNumbers;
    gameDiv.appendChild(seqElem);

    // Create options (one correct, two wrong)
    const options = createOptions(correctAnswer);

    // Container for buttons
    const btnContainer = document.createElement("div");

    options.forEach(value => {
        const btn = document.createElement("button");
        btn.textContent = value;
        btn.onclick = () => checkAnswer(value, correctAnswer);
        btnContainer.appendChild(btn);
    });

    gameDiv.appendChild(btnContainer);
}

// Create 3 options: correct, and two random wrong ones
function createOptions(correct) {
    const options = [correct];

    while (options.length < 3) {
        // generate a nearby wrong option
        const wrong = correct + (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? -1 : 1);
        if (!options.includes(wrong) && wrong > 0 && wrong < 100) {
            options.push(wrong);
        }
    }

    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
}

// Check button click
function checkAnswer(selected, correct) {
    // Remove previous feedback if any
    const oldFeedback = document.getElementById("feedback");
    if (oldFeedback) oldFeedback.remove();

    const feedback = document.createElement("p");
    feedback.id = "feedback";

    if (selected === correct) {
        feedback.textContent = "Correct! Well done.";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Wrong. Correct answer is ${correct}.`;
        feedback.style.color = "red";
    }

    gameDiv.appendChild(feedback);

    // Add "Next Question" button
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next Question";
    nextBtn.onclick = startNewQuestion;
    gameDiv.appendChild(nextBtn);
}
