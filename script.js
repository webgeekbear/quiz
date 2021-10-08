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
        answers: [{
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
        answers: [{
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
        answers: [{
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
bodyContainerEl.addEventListener("keypress", keyPressHandler);

var contentContainerEl = document.getElementById("content-container");

var timerEl = document.getElementById("timer");

var highScores = [];
var savedScores = window.localStorage.getItem("high-scores");
if (savedScores) {
    highScores = JSON.parse(savedScores);
}

beginChallenge();

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
        timeCounter--;
        displayTime();
    } else {
        clearCenter();
        endQuiz();
    }
}

function startQuiz() {
    timeCounter = quiz.length * 15; // 15 seconds per question on the quiz
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

        answerEl.className = "answer-button";
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

    switch (target.className) {
        case "answer-button":
            handleAnswer(target);
            break;

        case "submit-button":
            handleInput();
            break;

        case "go-back":
            clearCenter();
            beginChallenge();
            break;

        case "clear-high-scores":
            highScores = [];
            clearCenter();
            saveHighScores();
            showHighScores();
            break;

        case "start-quiz":
            clearCenter();
            startQuiz();
            break;

        case "display-high-scores":
            clearCenter();
            showHighScores();
            break;

        default:
            // Explicitly ignore all other clicks
            break;
    }
}

function beginChallenge() {
    let contentHolderEl = createContentHolder();

    let headingEl = document.createElement("h2");
    headingEl.innerText = "Coding Quiz Challenge";
    headingEl.className = "center-text";

    let infoText1El = document.createElement("div");
    infoText1El.innerText = "Try to answer the following code-related questions within the time limit.";
    infoText1El.className = "center-text";

    let infoText2El = document.createElement("div");
    infoText2El.innerText = "Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    infoText2El.className = "center-text";

    let buttonContainerEl = document.createElement("div");
    buttonContainerEl.className = "center-text";

    let startQuizButtonEl = document.createElement("button");
    startQuizButtonEl.innerText = "Start Quiz";
    startQuizButtonEl.className = "start-quiz";

    buttonContainerEl.appendChild(startQuizButtonEl);
    
    contentHolderEl.appendChild(headingEl);
    contentHolderEl.appendChild(infoText1El);
    contentHolderEl.appendChild(infoText2El);
    contentHolderEl.appendChild(buttonContainerEl);

    contentContainerEl.appendChild(contentHolderEl);
}

function keyPressHandler(event) {
    // If we are on the input field
    if (event.target.className === "input-field") {
        // If enter key was pressed...
        if (event.keyCode == 13 || event.which == 13) {
            handleInput();
        }
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
        clearCenter();

        let currIndex = parseInt(index) + 1;
        if (currIndex < quiz.length && timeCounter) {
            createQuizQuestion(currIndex);
        } else {
            endQuiz();
        }
    }, 0.5 * 1000);

    // DON'T do anything here!
}

function handleInput() {
    let contentHolderEl = document.getElementById("content-holder")
    if (contentHolderEl) {
        let inputFieldEl = document.getElementById("input-field");
        if (inputFieldEl) {
            let input = inputFieldEl.value;
            if (input) {
                clearCenter();
                let tempScores = [];

                let currScore = {
                    initials: input,
                    score: timeCounter
                }

                let inserted = false;
                if (!highScores.length) {
                    tempScores.push(currScore);
                } else {
                    // Insert in order of highest score (most recent first if duplicates)
                    for (let i = 0; i < highScores.length; i++) {
                        if (!inserted && currScore.score >= highScores[i].score) {
                            inserted = true;
                            tempScores.push(currScore);
                        }
                        tempScores.push(highScores[i]);
                    }

                    if (!inserted) {
                        tempScores.push(currScore);
                    }
                }

                highScores = tempScores;

                saveHighScores();
                showHighScores();
            } else {
                alert("Please input your initials");
                inputFieldEl.focus();
            }
        }
    }
}

function saveHighScores() {
    let saveScores = JSON.stringify(highScores);
    window.localStorage.setItem("high-scores", saveScores);
}

function clearCenter() {
    let contentHolderEl = document.getElementById("content-holder");
    if (contentHolderEl) {
        contentContainerEl.removeChild(contentHolderEl);
    }
}

function createContentHolder() {
    let contentHolderEl = document.createElement("div");
    contentHolderEl.id = "content-holder";
    contentHolderEl.className = "content-holder";

    return contentHolderEl;
}

function showHighScores() {
    let contentHolderEl = createContentHolder();

    let highScoresTitleEl = document.createElement("h2");
    highScoresTitleEl.textContent = "High scores";

    contentHolderEl.appendChild(highScoresTitleEl);

    for (let i = 0; i < highScores.length; i++) {
        let currScoreEl = document.createElement("div");
        currScoreEl.className = "high-score";
        currScoreEl.textContent = (i + 1) + ":" + highScores[i].initials.trim() + " - " + highScores[i].score;

        contentHolderEl.appendChild(currScoreEl);
    }

    let buttonHolderEl = document.createElement("div");

    let goBackButtonEl = document.createElement("button");
    goBackButtonEl.className = "go-back";
    goBackButtonEl.innerText = "Go back"

    let clearHighScoresEl = document.createElement("button");
    clearHighScoresEl.className = "clear-high-scores";
    clearHighScoresEl.innerText = "Clear high scores";

    buttonHolderEl.appendChild(goBackButtonEl);
    buttonHolderEl.appendChild(clearHighScoresEl);

    contentHolderEl.appendChild(buttonHolderEl);

    contentContainerEl.appendChild(contentHolderEl);
}