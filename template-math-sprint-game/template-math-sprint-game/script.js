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

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

// Time

// Scroll
let valueY = 0;

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