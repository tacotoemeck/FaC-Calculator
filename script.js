// This calculator is built as a part of my application for Founders and Coders bootcamp (London) FAC19

let formulaArray = ["2", "+", "2", "*", '10', "+", "10", "+", ["1", "+", "3"], "*", "14", "-", ["1", "+", ["1", "+", "3"], "-", "3"], "+", "2", "*", "8.8", "+", "2", "**", "2"]
// let formulaArray = ["2", "**", "2"]



// ================================
// First create own eval() function
// ================================



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
    // evaluate formula in a given order 
    // Please Excuse My Dear Aunt Sally
    // recursion stop
    if (formula.length === 1) return;
    //  1. Parentheses
    if (formula.filter(elem => typeof elem === 'object')) {
        let parenthesesFormula = formula.filter(elem => typeof elem === 'object');
        parenthesesFormula.forEach(arr => arr.length > 1 ? evaluate(arr) : arr.toString())
    }
    // 2. Exponents
    if (formula.includes('**')) {
        calculateSection(formula, '**', null, handleExponents, null);
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


evaluate(formulaArray)



// ================================
// =Second - handle formula entry =
// ================================

