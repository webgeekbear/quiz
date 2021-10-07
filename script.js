var quiz = [{
        question: "How much wood would a wood chuck chuck?",
        answers: [{
                correct: false,
                display: "Unknown"
            },
            {
                correct: true,
                display: "If a wood chuck could chuck wood"
            }
        ]
    },
    {
        "question": "Mares eat oats and does eat oats?",
        "answers": [{
                correct: false,
                display: "Unknown"
            },
            {
                correct: true,
                display: "and little lambs eat ivy"
            }
        ]
    }
];

var timeCounter = quiz.length * 10; // 10 seconds per question on the quiz
var countdownInterval = null;

var quizContainerEl = document.getElementById("quiz-container");
quizContainerEl.addEventListener("click", clickHandler);

runQuiz();

function displayTime() {
    console.log(timeCounter);
}

function endQuiz() {
    clearInterval(countdownInterval);

}

function countdown() {
    if (timeCounter > 0) {
        timeCounter--;
        displayTime();
    } else {
        removeQuestion();
        endQuiz();
    }
}

function runQuiz() {
    timeCounter = quiz.length * 15; // 10 seconds per question on the quiz
    countdownInterval = setInterval(countdown, 1000);
    displayTime();
    createQuizQuestion(0);
}

function createQuizQuestion(index) {

    let quizQuestionEl = document.createElement("h2");
    quizQuestionEl.className = "quiz-question";
    quizQuestionEl.id = "quiz-question";
    let quizItem = quiz[index];
    quizQuestionEl.textContent = quizItem.question;

    for (let i = 0; i < quizItem.answers.length; i++) {
        const answer = quizItem.answers[i];
        let answerDivEl = document.createElement("div");
        answerDivEl.className = "button-holder";
        let answerEl = document.createElement("button");

        answerEl.className = "data-answer";
        answerEl.textContent = (i + 1) + ". " + answer.display;
        answerEl.setAttribute("data-index", index);

        if (answer.correct === true) {
            answerEl.setAttribute("data-correct", "true");
        }

        answerDivEl.appendChild(answerEl);

        quizQuestionEl.appendChild(answerDivEl);
    }

    quizContainerEl.appendChild(quizQuestionEl);
}

function clickHandler(event) {
    let target = event.target;

    if (target.className === "data-answer") {
        handleAnswer(target);
    }
}

function handleAnswer(buttonEl) {
    let index = buttonEl.getAttribute("data-index");
    let answerStsEl = document.createElement("div");
    answerStsEl.className = "answer";

    if (buttonEl.hasAttribute("data-correct")) {
        answerStsEl.textContent = "Correct";
    } else {
        answerStsEl.textContent = "Incorrect";
        timeCounter -= 10; // User loses 10 seconds for incorrect answer.
        if (timeCounter <= 0) {
            timeCounter = 0;
        }

        displayTime();
    }

    quizContainerEl.appendChild(answerStsEl);

    setTimeout(function () {
        removeQuestion();
        quizContainerEl.removeChild(answerStsEl);
        let currIndex = parseInt(index) + 1;
        if (currIndex < quiz.length) {
            createQuizQuestion(currIndex);
        } else {
            endQuiz();
        }
    }, 0.5 * 1000);

    // DON'T do anything here!
}

function removeQuestion() {
    let quizQuestionEl = document.getElementById("quiz-question");
    if (quizQuestionEl) {
        quizContainerEl.removeChild(quizQuestionEl);
    }
}