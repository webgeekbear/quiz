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

var quizContainerEl = document.getElementById("quiz-container");
quizContainerEl.addEventListener("click", clickHandler);

runQuiz();

function runQuiz() {
    createQuizQuestion(0);
}

function createQuizQuestion(index) {

    let quizQuestionEl = document.createElement("h2");
    quizQuestionEl.className = "quiz-question";
    quizQuestionEl.id = "quiz-question";
    let quizItem = quiz[index];
    console.log(index);
    console.log(quizItem);
    quizQuestionEl.textContent = quizItem.question;

    for (let i = 0; i < quiz[index].answers.length; i++) {
        const answer = quiz[index].answers[i];
        let answerDivEl = document.createElement("div");
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
    }

    quizContainerEl.appendChild(answerStsEl);

    setTimeout(function () {
        let quizQuestionEl = document.getElementById("quiz-question");
        quizContainerEl.removeChild(quizQuestionEl);
        quizContainerEl.removeChild(answerStsEl);
        if (parseInt(index) + 1 < quiz.length) {
            createQuizQuestion(parseInt(index) + 1);
        }
    }, 1 * 1000);

    // DON'T do anything here!
}