const buttons = document.querySelectorAll('button');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');


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

function enterNumber() {
    if (currentValue.length == 0) {
        return;
    }

    if (currentValue == '0') {
        currentValue = this.innerText;
        updateCurrentDisplay();
        return;
    }
    if (currentValueType !== 'number') {
        currentFormula.push(currentValue);
        updateCurrentFormula()
        currentValue = [];
        currentValueType = 'number';
    }
    if (this.innerText == '.' && currentValue.includes('.')) {
        return;
    }
    if (this.innerText == '0' && currentValue == '0') {
        currentValue == [0];
        return;
    }

    currentValue += this.innerText;
    updateCurrentDisplay();

}

function enterOperator() {
    if (currentValue == '0' && currentFormula.length == 0) return;
    if (currentValue.length == 0) {
        currentValue = this.innerText;
        currentValueType = 'operator'
        updateCurrentDisplay()
        return;
    }
    if (currentValue == '-' && this.innerText == '-') return;

    if (currentValueType == 'number' && currentValue == '-') {
        currentFormula.pop()
        updateCurrentFormula()
        currentValue = this.innerText;
        updateCurrentDisplay();
        currentValueType = 'operator';
        return;
    }
    if (currentValueType == 'operator') {
        currentValue = this.innerText;
        updateCurrentDisplay()
        return;
    };

    if (currentValueType !== 'operator' && currentValue != '-') {
        currentFormula.push(currentValue);
        updateCurrentFormula();
        currentValue = [];
        currentValueType = 'operator';
    }

    currentValue += this.innerText;
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


// equals.addEventListener('click', function () {
//     evaluate(currentFormula)
//     currentFormula = [currentValue];
//     updateCurrentDisplay()
//     updateCurrentFormula();
//     currentValue = [];
//     currentValueType = 'number';
// });

equals.addEventListener('click', function () {
    evaluate(currentFormula)
    currentFormula = [currentValue];
    updateCurrentDisplay()
    updateCurrentFormula();
    currentValue = [];
    currentValueType = 'number';
});

// arythmetic
// create a handleExponents function
// function handleExponents(val, exp) {
//     return Math.pow(val, exp);
// };

// // create a multiply function
// function multiply(val1, val2) {
//     return val1 * val2;
// };

// // create a divide function
// function divide(val1, val2) {
//     return val1 / val2;
// };

// // create add function
// function add(val1, val2) {
//     return val1 + val2;
// }

// // create minus function
// function minus(val1, val2) {
//     return val1 - val2;
// }


// function calculateSection(formula, operator1, operator2, function1, function2) {

//     for (let i = 0; i < formula.length; i++) {

//         if (formula[i] === operator1 || formula[i] === operator2) {
//             // evaluate the result using provided function. Use splice to work on two numbers only each time (including negative numbers if applicable)
//             let left = Number(formula[i - 1]);
//             let right = Number(formula[i + 1]);
//             let result = (formula[i] === operator1) ? function1(left, right) : function2(left, right);
//             // return the result of the evaluation in the place of the Parentheses () - use splice or substring
//             formula.splice(i - 1, 3, result);
//             break;
//         }
//     }
//     return formula;
// }

// function evaluate(formula) {
//     // evaluate formula in a given order 
//     // Please Excuse My Dear Aunt Sally
//     // recursion stop
//     if (formula.length === 1) return;
//     //  1. Parentheses
//     if (formula.filter(elem => typeof elem === 'object')) {
//         let parenthesesFormula = formula.filter(elem => typeof elem === 'object');
//         parenthesesFormula.forEach(arr => arr.length > 1 ? evaluate(arr) : arr.toString())
//     }
//     // 2. Exponents
//     if (formula.includes('^')) {
//         calculateSection(formula, '^', null, handleExponents, null);
//     }
//     // 3. Multiplication and Division (from left to right)
//     if (formula.includes('*') || formula.includes('/')) {
//         calculateSection(formula, '*', '/', multiply, divide);
//     }
//     // 4. Addition and Subtraction (from left to right)
//     if (formula.includes('+') || formula.includes('-')) {
//         calculateSection(formula, '+', '-', add, minus);
//     }
//     evaluate(formula)
//     return formula;
// }

function evaluate(arr) {
    console.log(arr)

    if (arr.length == 1) {
        currentValue = Number(arr[0]);
        return;
    }

    else {

        if (arr.includes('*')) {
            let i = arr.indexOf('*')
            let a = Number(arr[i - 1]);
            let b = Number(arr[i + 1]);
            let c = a * b;
            arr.splice(i - 1, 3, c)
        }
        else if (arr.includes('/')) {
            let i = arr.indexOf('/')
            let a = Number(arr[i - 1]);
            let b = Number(arr[i + 1]);
            let c = a / b;
            arr.splice(i - 1, 3, c)
        }
        else if (arr.includes('-')) {
            let i = arr.indexOf('-')
            let a = Number(arr[i - 1]);
            let b = Number(arr[i + 1]);
            let c = a - b;
            arr.splice(i - 1, 3, c)
        }
        else if (arr.includes('+')) {
            let i = arr.indexOf('+')
            let a = Number(arr[i - 1]);
            let b = Number(arr[i + 1]);
            let c = a + b;
            arr.splice(i - 1, 3, c)
        }

        calculateInOrder(arr)
    }
}


updateCurrentDisplay();
updateCurrentFormula();
