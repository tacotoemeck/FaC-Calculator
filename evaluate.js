const buttons = document.querySelectorAll('button');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const calculator = document.querySelector('.calculator');

buttons.forEach(button => {
    button.style.gridArea = button.id;
})

numberButtons.forEach(button => {
    button.addEventListener('click', enterNumber)
})

operatorButtons.forEach(button => {
    button.addEventListener('click', enterOperator)
})

let currentFormula = [];
let currentValue = [0];
let currentValueType = 'number';

// display functions

function updateCurrentDisplay() {
    display.innerText = currentValue;
}

function updateCurrentFormula() {

    if (currentFormula == 0) {
        currentFormula = [];
    }
    formulaDisplay.innerText = currentFormula.join('');
}

function clearDisplay() {
    currentFormula = [];
    currentValue = [0];
    currentValueType = 'number';
    updateCurrentDisplay()
    updateCurrentFormula()
}

clear.addEventListener('click', clearDisplay);


// button functions

function enterNumber(num) {
    if (typeof num == 'object') {
        num = this.innerText;
    }
    if (currentValue.length == 0) {
        return;
    }

    if (currentValue == '0') {
        currentValue = num;
        updateCurrentDisplay();
        return;
    }
    if (currentValueType !== 'number') {
        currentFormula.push(currentValue);
        updateCurrentFormula()
        currentValue = [];
        currentValueType = 'number';
    }
    if (num == '.' && currentValue.includes('.')) {
        return;
    }
    if (num == '0' && currentValue == '0') {
        currentValue == [0];
        return;
    }

    currentValue += num;
    updateCurrentDisplay();

}

function enterOperator(operator) {
    if (typeof operator == 'object') {
        operator = this.innerText;
    }
    if (currentValue == '0' && currentFormula.length == 0) return;
    if (currentValue.length == 0) {
        currentValue = operator;
        currentValueType = 'operator'
        updateCurrentDisplay()
        return;
    }
    if (currentValue == '-' && operator == '-') return;

    if (currentValueType == 'number' && currentValue == '-') {
        currentFormula.pop()
        updateCurrentFormula()
        currentValue = operator;
        updateCurrentDisplay();
        currentValueType = 'operator';
        return;
    }
    if (currentValueType == 'operator') {
        currentValue = operator;
        updateCurrentDisplay()
        return;
    };

    if (currentValueType !== 'operator' && currentValue != '-') {
        currentFormula.push(currentValue);
        updateCurrentFormula();
        currentValue = [];
        currentValueType = 'operator';
    }

    currentValue += operator;
    updateCurrentDisplay();
};

function handleSubstract() {
    if (currentValue == '-' && this.innerText == '-') return;

    if (currentValueType == 'operator' && this.innerText == '-' || currentValue == 'empty') {
        currentValue = currentValue.split('')
        currentFormula.push(currentValue[0]);
        updateCurrentFormula()
        currentValue = this.innerText;
        currentValueType = 'number';
        updateCurrentDisplay();
        return;
    };

    if (currentValueType == 'number') {
        currentFormula.push(currentValue);
        updateCurrentFormula();
        currentValue = [];
        currentValueType = 'operator';
        currentValue += this.innerText;
        updateCurrentDisplay();
    };

};

subtract.addEventListener('click', handleSubstract);

equals.addEventListener('click', function () {
    currentValue = evaluate(currentFormula)
    updateCurrentDisplay()
    currentFormula = [currentValue];
    currentValue = [];
    currentValueType = 'number';
});

// arythmetic


// create a handleExponents function
function handleExponents(val, exp) {
    return Math.pow(val, exp);
};

// create a multiply function
function multiply(val1, val2) {
    return val1 * val2;
};

// create a divide function
function divide(val1, val2) {
    return val1 / val2;
};

// create add function
function add(val1, val2) {
    return val1 + val2;
}

// create minus function
function minus(val1, val2) {
    return val1 - val2;
}


function calculateSection(formula, operator1, operator2, function1, function2) {

    for (let i = 0; i < formula.length; i++) {

        if (formula[i] === operator1 || formula[i] === operator2) {
            // evaluate the result using provided function. Use splice to work on two numbers only each time (including negative numbers if applicable)
            let left = Number(formula[i - 1]);
            let right = Number(formula[i + 1]);
            let result = (formula[i] === operator1) ? function1(left, right) : function2(left, right);
            // return the result of the evaluation in the place of the Parentheses () - use splice or substring
            formula.splice(i - 1, 3, result);
            break;
        }
    }
    return formula;
}

function evaluate(formula) {
    if (!/[0-9]/.test(formula[0])) {
        if (formula[0] == '-') {
            formula[1] = `-${formula[1]}`
        };
        formula.shift();
    }
    // evaluate formula in a given order 
    // Please Excuse My Dear Aunt Sally
    // recursion stop
    if (formula.length === 1) return formula;
    //  1. Parentheses
    if (formula.filter(elem => typeof elem === 'object')) {
        let parenthesesFormula = formula.filter(elem => typeof elem === 'object');
        parenthesesFormula.forEach(arr => arr.length > 1 ? evaluate(arr) : arr.toString())
    }
    // 2. Exponents
    if (formula.includes('^')) {
        calculateSection(formula, '^', null, handleExponents, null);
    }
    // 3. Multiplication and Division (from left to right)
    if (formula.includes('*') || formula.includes('/')) {
        calculateSection(formula, '*', '/', multiply, divide);
    }
    // 4. Addition and Subtraction (from left to right)
    if (formula.includes('+') || formula.includes('-')) {
        calculateSection(formula, '+', '-', add, minus);
    }
    evaluate(formula)
    return formula;
}

function validateDecimalCalculations(val) {

}


updateCurrentDisplay();
updateCurrentFormula();

function handleKeys(e) {
    console.log(e.key)
    let number = "";
    let operator = "";
    if (e.keyCode >= 48 && e.keyCode <= 58) {
        switch (e.keyCode) {
            case 49:
                number = '1';
                break;
            case 50:
                number = '2';
                break;
            case 51:
                number = '3';
                break;
            case 52:
                number = '4';
                break;
            case 53:
                number = '5';
                break;
            case 54:
                number = '6';
                break;
            case 55:
                number = '7';
                break;
            case 56:
                number = '8';
                break;
            case 57:
                number = '9';
                break;
            case 48:
                number = '0';
                break;
        }
        enterNumber(number)
    }
    if (e.keyCode >= 100 && e.keyCode <= 187) {
        console.log('gaga')
        switch (e.keyCode) {
            case 187:
                operator = '*';
                break;
            case 107:
                operator = '+';
                break;
            case 109:
                operator = '-';
                break;
            case 110:
                operator = '.';
                break;
            case 111:
                operator = '/';
                break;
        }
        enterOperator(operator)
    }
}


// handle keyboard entry
document.addEventListener('keyup', handleKeys)