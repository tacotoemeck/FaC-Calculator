const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const parenthesesButtons = document.querySelectorAll(".parentheses");
const calculator = document.querySelector(".calculator");

const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");

const plus = document.getElementById("add");
const equals = document.getElementById("equals");

numberButtons.forEach(button => {
  button.addEventListener("click", enterNumberClick);
});

operatorButtons.forEach(button => {
  button.addEventListener("click", enterOperatorClick);
});
parenthesesButtons.forEach(button => {
  button.addEventListener("click", handleParenthesesClick);
});

let currentFormula = [];
let currentValue = [0];
let currentValueType = "number";

// parentheses count
let openParentheses = 0;

// display functions

function updateCurrentDisplay() {
  display.innerText = currentValue;
}

function updateCurrentFormula() {
  if (currentFormula == 0) {
    currentFormula = [];
  }
  formulaDisplay.innerText = currentFormula.join("");
}

function clearDisplay() {
  currentFormula = [];
  currentValue = [0];
  openParentheses = 0;
  currentValueType = "number";
  updateCurrentDisplay();
  updateCurrentFormula();
}

clear.addEventListener("click", clearDisplay);

// ================
// button functions
// ================

function enterNumber(num) {
  if (
    currentFormula.length === 1 &&
    currentValueType === "number" &&
    currentFormula[currentFormula.length - 1] !== "("
  )
    return;

  if (currentValue.length == 0 && currentFormula.length == 0) return;
  if (num === ".") {
    if (currentValue == "0") {
      currentValue = "0.";
      updateCurrentDisplay();
      return;
    }
    if (currentValueType === "operator") {
      currentFormula.push(currentValue);
      updateCurrentFormula();
      currentValue = "0.";
      updateCurrentDisplay();
      currentValueType = "number";
      return;
    }
  }

  if (currentValue == "0") {
    currentValue = num;
    updateCurrentDisplay();
    return;
  }
  if (currentValueType !== "number") {
    currentFormula.push(currentValue);
    updateCurrentFormula();
    currentValue = [];
    currentValueType = "number";
  }

  if (num === "." && currentValue.includes(".")) {
    return;
  }
  if (num == "0" && currentValue == "0") {
    currentValue == [0];
    return;
  }

  if (currentFormula[currentFormula.length - 1] === ")") return;

  currentValue += num;
  updateCurrentDisplay();
}

function enterNumberClick() {
  enterNumber(this.innerText);
}

function enterOperator(operator) {
  if (
    currentFormula[currentFormula.length - 1] === "(" &&
    currentValue.length == 0 &&
    operator !== "-"
  )
    return;
  if (currentValue == "0" && currentFormula.length == 0) return;
  if (currentValue.length == 0) {
    updateCurrentValue(operator);
    currentValueType = "operator";
    return;
  }
  if (currentValue == "0.") return;

  if (currentValue === "-" && operator === "-") return;

  if (currentValueType === "number" && currentValue === "-") {
    currentFormula.pop();
    updateCurrentFormula();
    updateCurrentValue(operator);
    currentValueType = "operator";
    return;
  }
  if (currentValueType === "operator") {
    updateCurrentValue(operator);
    return;
  }

  if (currentValueType !== "operator" && currentValue != "-") {
    currentFormula.push(currentValue);
    updateCurrentFormula();
    currentValue = [];
    currentValueType = "operator";
  }
  currentValue += operator;
  updateCurrentDisplay();
}

function enterOperatorClick() {
  enterOperator(this.innerText);
}

function updateCurrentValue(op) {
  currentValue = op;
  updateCurrentDisplay();
}

function enterParentheses(operator) {
  if (operator === "(") {
    if (
      (updateCurrentFormula.length > 0 &&
        currentValueType === "number" &&
        currentValue.length === 0) ||
      currentValue.length === 0
    )
      return;

    if (
      currentFormula[currentFormula.length - 1] === ")" &&
      currentValueType !== "operator"
    ) {
      return;
    }
    if (currentValueType === "operator") {
      parenthesesHelper(operator, currentValue);
      currentValueType = "number";
    } else {
      currentFormula.push(operator);
    }
    openParentheses++;
    updateCurrentFormula();
    return;
  }
  if (operator === ")") {
    if (currentFormula[currentFormula.length - 1] === "(") return;
    if (openParentheses == 0) return;
    if (currentValueType === "number") {
      parenthesesHelper(operator, currentValue);
      updateCurrentFormula();
      openParentheses--;
    }
  }
}
function parenthesesHelper(op, val) {
  currentFormula.push(val);
  currentFormula.push(op);
  currentValue = [];
  updateCurrentDisplay();
}

function handleParenthesesClick() {
  enterParentheses(this.innerText);
}

function handleSubstract(operator) {
  if (currentValue === "-" && operator === "-") return;

  if (
    (currentValueType === "operator" && operator === "-") ||
    currentValue === "empty"
  ) {
    currentValue = currentValue.split("");
    currentFormula.push(currentValue[0]);
    updateCurrentFormula();
    currentValue = operator;
    currentValueType = "number";
    updateCurrentDisplay();
    return;
  }

  if (currentValueType === "number") {
    currentValue.length > 0 && currentFormula.push(currentValue);
    updateCurrentFormula();
    currentValue = [];
    currentValueType = "operator";
    currentValue += operator;
    updateCurrentDisplay();
  }
}

function handleSubstractClick() {
  handleSubstract(this.innerText);
}

subtract.addEventListener("click", handleSubstractClick);

equals.addEventListener("click", function() {
  currentValue = evaluate(currentFormula);
  updateCurrentDisplay();
  currentFormula = [currentValue];
  currentValue = [];
  currentValueType = "number";
});

// ==================
// ====arythmetics====
// ==================

// create a handleExponents function
function handleExponents(val, exp) {
  return Math.pow(val, exp);
}
// create a multiply function
function multiply(val1, val2) {
  return val1 * val2;
}
// create a divide function
function divide(val1, val2) {
  return val1 / val2;
}
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
      let result =
        formula[i] === operator1
          ? function1(left, right)
          : function2(left, right);
      // return the result of the evaluation in the place of the Parentheses () - use splice or substring
      formula.splice(i - 1, 3, result);
      break;
    }
  }
  return formula;
}

function evaluate(formula) {
  // place parentheses
  formula = evaluateParetheses(formula);
  console.log(formula);

  if (!/[0-9]/.test(formula[0])) {
    if (formula[0] === "-") {
      formula[1] = `-${formula[1]}`;
    }
    formula.shift();
  }

  // recursion stop
  if (formula.length === 1) return formula;

  // evaluate formula in a given order
  // Please Excuse My Dear Aunt Sally

  //  1. Parentheses
  if (formula.filter(elem => typeof elem === "object")) {
    let parenthesesFormula = formula.filter(elem => typeof elem === "object");
    parenthesesFormula.forEach(arr =>
      arr.length > 1 ? evaluate(arr) : arr.toString()
    );
  }
  // 2. Exponents
  if (formula.includes("^")) {
    calculateSection(formula, "^", null, handleExponents, null);
  }
  // 3. Multiplication and Division (from left to right)
  if (formula.includes("*") || formula.includes("/")) {
    calculateSection(formula, "*", "/", multiply, divide);
  }
  // 4. Addition and Subtraction (from left to right)
  if (formula.includes("+") || formula.includes("-")) {
    calculateSection(formula, "+", "-", add, minus);
  }
  evaluate(formula);
  return formula;
}

// ==============================
// ======formula validation======
// ==============================

function evaluateParetheses(arr) {
  if (openParentheses > 0) {
    arr = addMissingParentheses(arr);
  }

  let opening = 0;
  let closing = 0;

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      arr[i] = evaluateParetheses(arr[i]);
    }
    if (arr[i] === "(") {
      openingIndex = i;
      opening++;
    }
    if (arr[i] === ")") {
      closing++;
    }
    if (opening > 0 && opening == closing) {
      arr.splice(arr.indexOf("("), i - arr.indexOf("(") + 1, [
        ...arr.slice(arr.indexOf("(") + 1, i)
      ]);
      opening--;
      closing--;
    }
  }
  if (opening > 0 || arr.includes("(")) evaluateParetheses(arr);
  return arr;
}

function addMissingParentheses(arr) {
  let result = [...arr];
  for (let i = 0; i <= openParentheses; i++) {
    result.push(")");
  }
  openParentheses = 0;
  return result;
}

updateCurrentDisplay();
updateCurrentFormula();

// ==============================
// keyboard character entry logic
// ==============================

function handleKeys(e) {
  switch (e.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
    case ".":
      enterNumber(e.key);
      break;

    case "=":
      enterOperator(e.key);
      currentValue = evaluate(currentFormula);
      updateCurrentDisplay();
      currentFormula = [currentValue];
      currentValue = [];
      currentValueType = "number";
      break;

    case "+":
    case "*":
    case "/":
    case "^":
      enterOperator(e.key);
      break;
    case "-":
      enterOperator(e.key);
      handleSubstract(e.key);
      break;
    case "(":
    case ")":
      enterParentheses(e.key);
      break;
  }
}

// handle keyboard entry
document.addEventListener("keypress", handleKeys);
