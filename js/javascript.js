const numberButtons = document.querySelectorAll('.button.number');
const operationButtons = document.querySelectorAll('.button.operator');
const previousResult = document.getElementById('previous-result');
const screen = document.getElementById('result');
const allCleanButton = document.querySelector('.button.clean');
const equalsButton = document.querySelector('.button.equal');
const decimalButton = document.querySelector('.button.decimal');

  // add eventList end transition
const buttons= document.querySelectorAll(".button");

window.addEventListener('keydown', manageKey);

function manageKey(e) {
    const number = document.querySelector(`div[data-key="${e.keyCode}"]`);
    console.log(number);
}


let calc = {
    previousOperand:'0',
    operator:'',
    currentOperand:'',
    operationResult:'',
    displayValue:'0',
}


screen.textContent = calc.previousOperand;


function add(a, b) {
	return a + b;
};

function subtract(a, b) {
	return a - b;
};


function multiply(a, b) {
  return a * b;
};

function divide(a, b) {
    if (b === 0) {
        throw "Division by 0 impossible";
    }
    return a / b;
  };


function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return parseFloat(Number(Number(a) + Number(b)).toFixed(7));
        case '-': 
            return parseFloat(Number(a - b).toFixed(7));
        case '*': 
            return parseFloat(Number(a * b).toFixed(7));
        case '/': 
            return parseFloat(Number(a / b).toFixed(7));
        default:
            throw 'Illegal operation'

    }
}

function isDividingBy0() {
    if (calc.operator === '/' && calc.currentOperand === '0') {
        alert('Dividing by 0 !')
        return true
    }
    return false;
}


function updateOperandDisplay(e) {
    if (calc.displayValue.length > 30) { // don't manage operation with big operande
        return;
    }
    if (calc.operator === '' ) { // No operator, so the user is typing the first operand

        if (calc.operationResult !=='') { // the user is calculating another operation (ex: result=19, the user is typing 6)
            clean();
        }
        if (calc.previousOperand === '0' ) { // We replace 0 (ex: 0 -> the user typed 9 so we replace 0 by 9)
            calc.previousOperand = e.target.textContent
        } else {
            calc.previousOperand += e.target.textContent;
        }

        calc.displayValue = calc.previousOperand
    }

    else if (calc.operator !== '') { // Operator is already present, so the user is typing the second operand
        if (calc.currentOperand === '' || calc.currentOperand ==='0') {// right operande is 0 or empty, we replace it (ex: 23 + 0, or 23 + '')
            calc.currentOperand = e.target.textContent;
            calc.displayValue += calc.currentOperand;
        } else {
            calc.currentOperand += e.target.textContent;
            calc.displayValue += e.target.textContent;
        }

    }

    screen.textContent = calc.displayValue;
    console.table(calc);
}

function updateOperatorDisplay(e) {
    if (endsWithOperator()) { // operator already present, we juste replace the operator (ex: 9+9+)
        calc.operator = e.target.textContent;
        calc.displayValue = calc.displayValue.substring(0, calc.displayValue.length-1) + calc.operator;
    }

    else if (calc.currentOperand === '' && calc.operator === '') { // case where we have only the first operand
        calc.operator = e.target.textContent;
        calc.displayValue += calc.operator;
    }

    else if (calc.previousOperand !== '' && calc.currentOperand !== '' && calc.operator !== '') { // 2 operandes, we do the maths;
        if (isDividingBy0()) {
            return;
        }
        calc.operationResult = operate(calc.operator, calc.previousOperand, calc.currentOperand).toString();
        calc.previousOperand = calc.operationResult;
        calc.currentOperand = '';
        calc.operator = e.target.textContent;
        calc.displayValue += calc.operator;
    }

    screen.textContent = calc.displayValue;
    console.table(calc);
}

function updateEqualsDisplay(e) {

    if (!calc.previousOperand || !calc.operator || !calc.currentOperand) {
        return;
    }
    if (!endsWithOperator()) {
        if (isDividingBy0()) {
            return;
        }
        calc.operationResult = operate(calc.operator, parseFloat(calc.previousOperand), parseFloat(calc.currentOperand)).toString();
        calc.previousOperand = calc.operationResult;
        calc.displayValue = calc.operationResult;
        screen.textContent = calc.displayValue;
        calc.operator = '';
        calc.currentOperand = '';
        console.table(calc);
    }
}

function updateDecimalDisplay(e) {
    if (endsWithOperator()) {
        console.table(calc);
        return;
    }

    if (calc.operator === '' ) { // No operator, so the user is typing the first operand
        if (calc.previousOperand.includes('.')) {
            console.table(calc);
            return;
        }

        else {
            calc.previousOperand += e.target.textContent;
            screen.textContent = calc.previousOperand;
            console.table(calc);
        }
    }
    
    else if (calc.operator !== '') { // Operator is already present, so the user is typing the second operand
        if (calc.currentOperand.includes('.')) {
            return;
        }
        if (calc.currentOperand === '') {
            return
        }
        else {
            calc.currentOperand += e.target.textContent;
            calc.displayValue += e.target.textContent;
            screen.textContent = calc.displayValue;
        }
        console.table(calc);

    }
}

function endsWithOperator() {
    const lastChar = calc.displayValue[calc.displayValue.length-1]
    return lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/';
}

function endsWithDecimal() {
    const lastChar = calc.displayValue[calc.displayValue.length-1]
    return lastChar === '.';
}

function clean(){
    calc.previousOperand = '0';
    calc.operator = '';
    calc.currentOperand = '';
    calc.operationResult = '';
    calc.displayValue = '0';
    screen.textContent = '0';
    console.table(calc);
}

allCleanButton.addEventListener('mousedown', clean);

numberButtons.forEach(number => number.addEventListener('mousedown', updateOperandDisplay));

operationButtons.forEach(operation => operation.addEventListener('mousedown', updateOperatorDisplay));

decimalButton.addEventListener('mousedown', updateDecimalDisplay);

equalsButton.addEventListener('mousedown', updateEqualsDisplay);




