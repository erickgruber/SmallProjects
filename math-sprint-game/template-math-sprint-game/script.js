// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Equations
let questionAmount = 0;
let equationsArray = [];
let playerGuessArray = [];
let bestScoreArray = [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDisplay = '0.0';

// Scroll
let valueY = 0;

// Refresh splash page best scores
function bestScoresToDOM() {
    bestScores.forEach((bestScore, index) => {
        const bestScoreEl = bestScore;
        bestScoreEl.textContent = `${bestScoreArray[index].bestScore}s`;
    });
}

// Check local storage  for best scores and set bestscoreArray
function getSavedBestScores() {
    if (localStorage.getItem('bestScores')) {
        bestScoreArray = JSON.parse(localStorage.bestScores);
    } else {
        bestScoreArray = [
            { questions: 10, bestScore: finalTimeDisplay },
            { questions: 25, bestScore: finalTimeDisplay },
            { questions: 50, bestScore: finalTimeDisplay },
            { questions: 99, bestScore: finalTimeDisplay },

        ];
        localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
    }
    bestScoresToDOM();
}

// Update best score array
function updateBestScore() {
    bestScoreArray.forEach((score, index) => {
        // Select correct best score to update
        if (questionAmount == score.questios) {
            // Return best score as a number with one decimal
            const getSavedBestScores = Number(bestScoreArray[index].bestScore);
            // Update if the new final score is less or replacing zero
            if (getSavedBestScores === 0 || getSavedBestScores > finalTime) {
                bestScoreArray[index].bestScore = finalTimeDisplay;
            }
        }
    });
    // Update splash page
    bestScoresToDOM();
    // Save to local storeage
    localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
}


// Reset Game
function playAgain() {
    gamePage.addEventListener('click', startTimer);
    scorePage.hidden = true;
    splashPage.hidden = false;
    equationsArray = [];
    playerGuessArray = [];
    valueY = 0;
    playAgainBtn.hidden = true;
}

// Show scorepage
function showScorePage() {
    // Show play again button after 1s.
    setTimeout(() => {
        playAgainBtn.hidden = false;
    }, 1000);
    gamePage.hidden = true;
    scorePage.hidden = false;
}

// Format and display time in DOM
function scoresToDOM() {
    finalTimeDisplay = finalTime.toFixed(1);
    baseTime = timePlayed.toFixed(1);
    penaltyTime = penaltyTime.toFixed(1);
    baseTimeEl.textContent = `Base Time: ${baseTime}s`;
    penaltyTimeEl.textContent = `Penalty: +${penaltyTime}s`;
    finalTimeEl.textContent = `${finalTimeDisplay}s`;
    updateBestScore();
    // Scroll to top, go to score page
    itemContainer.scrollTo({
        top: 0,
        behavior: 'instant'
    });
    showScorePage();
}

// Stop the timer, Process Results, go to Score Page
function checkTime() {
    console.log(timePlayed);
    if (playerGuessArray.length == questionAmount) {
        console.log('player guess array: ', playerGuessArray);
        clearInterval(timer);
        // cHECK FOR WRONG GUESSES , ADD PENALTY TIME
        equationsArray.forEach((equation, index) => {
            if (equation.evaluated === playerGuessArray[index]) {
                // Corret guess, no penalty

            } else {
                // Incorrect Guess, Addpenalty
                penaltyTime += .5;
            }
        });
        finalTime = timePlayed + penaltyTime;
        console.log('time', timePlayed, 'penalty', penaltyTime, 'final', finalTime);
        scoresToDOM();
    }
}

// Add a tenth of a second to timePlayed
function addTime() {
    timePlayed += .1;
    checkTime();
}

// Start timer when game page is clicked 
function startTimer() {
    // Reset times
    timePlayed = 0;
    penaltyTime = 0;
    finalTime = 0;
    timer = setInterval(addTime, 100);
    gamePage.removeEventListener('click', startTimer);
}

// Scroll, Store user selection in playerGuessArray
function select(guessedTrue) {
    // console.log('player guess array: ', playerGuessArray);
    // scroll 80px
    valueY += 80;
    itemContainer.scroll(0, valueY);
    // Add player guess to array
    return guessedTrue ? playerGuessArray.push('true') : playerGuessArray.push('false');
}

// Display game page
function showGamePage() {
    gamePage.hidden = false;
    countdownPage.hidden = true;
}

// Get random number up to a max number

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Create Correct/Incorrect Random Equations
function createEquations() {
    // Randomly choose how many correct equations there should be
    const correctEquations = getRandomInt(questionAmount);
    // Set amount of wrong equations
    const wrongEquations = questionAmount - correctEquations;
    // Loop through, multiply random numbers up to 9, push to array
    for (let i = 0; i < correctEquations; i++) {
        firstNumber = getRandomInt(9);
        secondNumber = getRandomInt(9);
        const equationValue = firstNumber * secondNumber;
        const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
        equationObject = { value: equation, evaluated: 'true' };
        equationsArray.push(equationObject);
    }
    // Loop through, mess with the equation results, push to array
    for (let i = 0; i < wrongEquations; i++) {
        firstNumber = getRandomInt(9);
        secondNumber = getRandomInt(9);
        const equationValue = firstNumber * secondNumber;
        wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
        wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
        wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
        const formatChoice = getRandomInt(3);
        const equation = wrongFormat[formatChoice];
        equationObject = { value: equation, evaluated: 'false' };
        equationsArray.push(equationObject);
    }
    shuffle(equationsArray);
    // console.log('equations array: ', equationsArray);
    equationsToDOM();
}

// Adding equations to DOM

function equationsToDOM() {
    equationsArray.forEach((equation) => {
        // Item
        const item = document.createElement('div');
        item.classList.add('item');
        // Equation Text
        const equationText = document.createElement('h1');
        equationText.textContent = equation.value;
        // Append
        item.appendChild(equationText);
        itemContainer.appendChild(item);
    });
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
    //   // Reset DOM, Set Blank Space Above
    itemContainer.textContent = '';
    //   // Spacer
    const topSpacer = document.createElement('div');
    topSpacer.classList.add('height-240');
    //   // Selected Item
    const selectedItem = document.createElement('div');
    selectedItem.classList.add('selected-item');
    //   // Append
    itemContainer.append(topSpacer, selectedItem);

    //   // Create Equations, Build Elements in DOM
    createEquations();
    equationsToDOM();
    //   // Set Blank Space Below
    const bottomSpacer = document.createElement('div');
    bottomSpacer.classList.add('height-500');
    itemContainer.appendChild(bottomSpacer);
}

// Run the countdown
function countdownStart() {
    countdown.textContent = '3';
    setTimeout(() => {
        countdown.textContent = '2';
    }, 1000);
    setTimeout(() => {
        countdown.textContent = '1';
    }, 2000);
    setTimeout(() => {
        countdown.textContent = 'GO!';
    }, 3000);
}


// Navigate from Splash Page to Countdown Page
function showCountDown() {
    countdownPage.hidden = false;
    splashPage.hidden = true;
    countdownStart();
    // createEquations();
    populateGamePage();
    setTimeout(showGamePage, 500);
}

// Get the Value from selected radio Button
function getRadioValue() {
    let radioValue;
    radioInputs.forEach((radioInput) => {
        if (radioInput.checked) {
            radioValue = radioInput.value;
        }
    });
    return radioValue;
}


// Form that decides amount of the questions
function selectQuestionAmount(e) {
    e.preventDefault();
    // console.log('e value in SelectQuestionAmount: ', e);
    questionAmount = getRadioValue();
    console.log('questionAmount: ', questionAmount);
    if (questionAmount) {
        showCountDown();
    }
}



startForm.addEventListener('click', () => {
    radioContainers.forEach((radioEl) => {
        // Remove Selected label
        radioEl.classList.remove('selected-label');
        // Add it back if the radio input is checked
        if (radioEl.children[1].checked) {
            radioEl.classList.add('selected-label');
        }
    });
});

// Event Listeners
startForm.addEventListener('submit', selectQuestionAmount);
gamePage.addEventListener('click', startTimer);

// On load
getSavedBestScores();