var quiz = [{
        question: "Commonly used data types do not include?",
        answers: [{
                correct: false,
                display: "Strings"
            },
            {
                correct: false,
                display: "booleans"
            },
            {
                correct: true,
                display: "alerts"
            },
            {
                correct: false,
                display: "numbers"
            }
        ]
    },
    {
        question: "The condition in a IF/ELSE statement is enclosed with __________?",
        answers: [{
                correct: false,
                display: "Quotes"
            },
            {
                correct: false,
                display: "curly brackets"
            },
            {
                correct: true,
                display: "parenthesis"
            },
            {
                correct: false,
                display: "square brackets"
            }
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store __________?",
        answers: [
            {
                correct: false,
                display: "numbers and strings"
            },
            {
                correct: false,
                display: "other arrays"
            },
            {
                correct: false,
                display: "booleans"
            },
            {
                correct: true,
                display: "all of the above"
            }
        ]
    },
    {
        question: "String values must be enclosed with __________ when being assigned to variables?",
        answers: [
            {
                correct: false,
                display: "commas"
            },
            {
                correct: false,
                display: "curly brackets"
            },
            {
                correct: true,
                display: "quotes"
            },
            {
                correct: false,
                display: "parenthesis"
            }
        ]
    },
    {
        question: "A very useful tool used in development and debugging " +
            "for printing content to the debugger is?",
        answers: [
            {
                correct: false,
                display: "JavaScript"
            },
            {
                correct: false,
                display: "terminal/bash"
            },
            {
                correct: false,
                display: "for loops"
            },
            {
                correct: true,
                display: "console.log()"
            }
        ]
    }
];

var timeCounter = 0; // number of seconds remaining on the quiz
var countdownInterval = null;

var bodyContainerEl = document.getElementById("body");
bodyContainerEl.addEventListener("click", clickHandler);

var contentContainerEl = document.getElementById("content-container");

var timerEl = document.getElementById("timer");

runQuiz();

function displayTime() {
    timerEl.textContent = " " + timeCounter;
}

function endQuiz() {
    clearInterval(countdownInterval);

    // Prompt the user for their initials
    let contentHolderEl = document.createElement("div");
    contentHolderEl.className = "content-holder";
    contentHolderEl.id = "content-holder";

    let inputHeaderTextEl = document.createElement("h2");
    inputHeaderTextEl.innerText = "All done!";
    contentHolderEl.appendChild(inputHeaderTextEl);

    let inputNormalTextEl = document.createElement("div");
    inputNormalTextEl.innerText = "Your final score is " + timeCounter + ".";    
    contentHolderEl.appendChild(inputNormalTextEl);

    let inputHolderEl = document.createElement("div");
    inputNormalTextEl.appendChild(inputHolderEl);

    let labelEl = document.createElement("label");
    labelEl.innerText = "Enter Initials:";
    labelEl.setAttribute("for", "input-field");
    inputHolderEl.appendChild(labelEl);

    let initialInputEl = document.createElement("input");
    initialInputEl.className = "input-field";
    initialInputEl.name = "input-field";
    initialInputEl.id = "input-field";
    inputHolderEl.appendChild(initialInputEl);

    let submitButtonEl = document.createElement("button");
    submitButtonEl.className = "submit-button";
    submitButtonEl.id = "submit-button";
    submitButtonEl.innerText = "Submit";
    inputHolderEl.appendChild(submitButtonEl);

    contentContainerEl.appendChild(contentHolderEl);
}

function countdown() {
    if (timeCounter > 0) {
        // timeCounter--;
        displayTime();
    } else {
        removeQuestion();
        endQuiz();
    }
}

function runQuiz() {
    timeCounter = quiz.length * 15; // seconds per question on the quiz
    displayTime();

    countdownInterval = setInterval(countdown, 1000);
    createQuizQuestion(0);
}

function createQuizQuestion(index) {
    let contentHolderEl = document.createElement("div");
    contentHolderEl.className = "content-holder";
    contentHolderEl.id = "content-holder";
    
    contentContainerEl.appendChild(contentHolderEl);

    let contentEl = document.createElement("h2");
    contentEl.className = "content";

    contentHolderEl.appendChild(contentEl);

    let quizItem = quiz[index];
    contentEl.textContent = quizItem.question;

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

        contentEl.appendChild(answerDivEl);
    }

    contentContainerEl.appendChild(contentHolderEl);
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
    
    let contentHolderEl = document.getElementById("content-holder");
    contentHolderEl.appendChild(answerStsEl);

    setTimeout(function () {
        removeQuestion();
        
        let currIndex = parseInt(index) + 1;
        if (currIndex < quiz.length && timeCounter) {
            createQuizQuestion(currIndex);
        } else {
            endQuiz();
        }
    }, 0.5 * 1000);

    // DON'T do anything here!
}

function removeQuestion() {
    let contentHolderEl = document.getElementById("content-holder");
    if (contentHolderEl) {
        contentContainerEl.removeChild(contentHolderEl);
    }
}