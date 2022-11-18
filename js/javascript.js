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
            return a + b;
        case '-': 
            return a - b;
        case '*': 
            return a * b;
        case '/': 
            return a / b;
        default:
            throw 'Illegal operation'

    }
}

operate("fefe",1, 4);