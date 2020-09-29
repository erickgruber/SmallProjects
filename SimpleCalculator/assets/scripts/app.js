const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];
function getUserNumberInput() {
  return parseInt(userInput.value);
}

// Generates and writes calculation log
function createAndWiteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult,calcDescription); //from vednor file
}

function writeToLog(operationIdentifier, prevResult, operationNumber, newResult) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult
  };

  logEntries.push(logEntry);
  console.log(logEntries);
}


function add() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult += enteredNumber;
  createAndWiteOutput('+', initialResult, enteredNumber);
  writeToLog('ADD', initialResult, enteredNumber, currentResult);
}

function subtract() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult -= enteredNumber;
  createAndWiteOutput('-', initialResult, enteredNumber);
  writeToLog('SUBTRACT', initialResult, enteredNumber, currentResult);
}

function multiply() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult *= enteredNumber;
  createAndWiteOutput('*', initialResult, enteredNumber);
  writeToLog('MULTIPLY', initialResult, enteredNumber, currentResult);
}

function divide() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult /= enteredNumber;
  createAndWiteOutput('/', initialResult, enteredNumber);
  writeToLog('DIVIDE', initialResult, enteredNumber, currentResult);
}

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener("click", divide);
