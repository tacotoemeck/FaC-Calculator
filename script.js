// This calculator is built as a part of my application for Founders and Coders bootcamp (London) FAC19

let formulaArray = ["2", "+", "2", "*", '10']

// First create own eval() function

// Please Excuse My Dear Aunt Sally
// 1. Parentheses
// 2. Exponents
// 3. Multiplication and Division (from left to right)
// 4. Addition and Subtraction (from left to right)

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

// evaluate the formula

// function evaluate(formula) {
//     // loop over the array 
//     for (let i = 0; i < formulaArray.length; i++) {
//         // if there are Parentheses - evaluate them first ( if there are Parentheses inside they need to be evaluated first)
//         // evaluate the result using provided function. Use substring to work on two numbers only each time (including negative numbers if applicable)
//         // return the result of the evaluation in the place of the Parentheses () - use splice or substring

//         // if there are exponents evaluate them as second priority
//         // evaluate the result using provided function. Use substring to work on two numbers only each time (including negative numbers if applicable)
//         // return the result of the evaluation in the place of the Parentheses () - use splice or substring

//         // if there are Multiplication and Division evaluate them from left to right
//         if (formula[i] === '*' || formula[i] === '/') {
//             // evaluate the result using provided function. Use splice to work on two numbers only each time (including negative numbers if applicable)
//             let left = Number(formula[i - 1]);
//             let right = Number(formula[i + 1]);
//             let result = (formula[i] === '*') ? multiply(left, right) : divide(left, right)
//             // return the result of the evaluation in the place of the Parentheses () - use splice or substring
//             formula.splice(i - 1, 3, result);
//             break;
//         }
//         // if there are Addition and Subtraction evaluate them from left to right
//         if (formula[i] === '+' || formula[i] === '-') {
//             // evaluate the result using provided function. Use splice to work on two numbers only each time (including negative numbers if applicable)
//             let left = Number(formula[i - 1]);
//             let right = Number(formula[i + 1]);
//             let result = (formula[i] === '+') ? add(left, right) : minus(left, right)
//             // return the result of the evaluation in the place of the Parentheses () - use splice or substring
//             formula.splice(i - 1, 3, result);
//             break;
//         }
//     }

//     return formula;
// }

function calculateSection(formula, operator1, operator2, function1, function2) {

    for (let i = 0; i < formula.length; i++) {

        if (formula[i] === operator1 || formula[i] === operator2) {
            // evaluate the result using provided function. Use splice to work on two numbers only each time (including negative numbers if applicable)
            let left = Number(formula[i - 1]);
            let right = Number(formula[i + 1]);
            let result = (formula[i] === '*') ? function1(left, right) : function2(left, right)
            // return the result of the evaluation in the place of the Parentheses () - use splice or substring
            formula.splice(i - 1, 3, result);
            break;
        }
    }
    return formula;
}

function evaluate(formula) {

    if (formula.includes('*') || formula.includes('/')) {
        calculateSection(formula, '*', '/', multiply, divide);
    }
    if (formula.includes('+') || formula.includes('-')) {
        calculateSection(formula, '+', '-', add, minus);
    }
    return formula;
}


evaluate(formulaArray)