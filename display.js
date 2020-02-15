const formulas_display = document.getElementById('formula_display');
const current_value = document.getElementById('current_value');

const allButtons = document.querySelectorAll('.calc-button');

let showingResult = false;
let currentResult = 0;

// handle various value entry and prevent incorrect formula formations

// set of rules
// 1 . multiple numbers can form one string
// 2 . when number is entered and operator button clicked, number will be added to the formula 
// 3 . only one operator ( *,/,+,-) can be entered at a given time
// 4 . if operator is eneterd without a number beforehand, 0 will be added in front of it in the formula
// 5 . if decimal is enetered as a first char, zero will be added in front of it. If followed by a operator, zero will be submited to the formula array
// 6 . parhenteses will be counted for opening, once closed number will go away, if equal bottom is pressed and no closing pharenteses is found - it will be added to the end of the string 

function handleButtonClick(e) {

    current_value.innerText += this.innerText;

    let currentInputType = determineValueType(this.innerText);
    let lastFormulaChar = determineValueType(current_value.innerText[current_value.innerText.length - 2]);
    let valueToSubmit = current_value.innerText.substring(0, current_value.innerText.length - 1);
    // prevent additional input once result is displayed


    if (currentInputType == 'number' && showingResult == true) {
        current_value.innerText = currentResult;
    };
    //   handle power input and display
    // if (currentInputType == 'power') {
    //     valueToSubmit = validateInput(valueToSubmit);

    // }
    if (currentInputType == 'power' && lastFormulaChar == 'power') {
        current_value.innerText = valueToSubmit;
    }
    //   handle point (dot) input
    if (currentInputType == 'number' && this.innerText == '.') {
        if (current_value.innerText.split('').slice(0, current_value.innerText.length - 1).includes('.')) current_value.innerText = valueToSubmit;
    }
    // handle numbers and operators input
    if (
        (currentInputType == 'operator' && lastFormulaChar == 'number')
        ||
        (currentInputType == 'number' && lastFormulaChar == 'operator')
    ) {
        if (showingResult == false) {

            valueToSubmit = validateInput(valueToSubmit);
            // if returned value is an array ( power ) spread the values at the end of the formula arrey, else push
            if (typeof valueToSubmit == "object") {
                formulaArray = [...formulaArray, ...valueToSubmit]
            } else {
                formulaArray.push(valueToSubmit);
            }

            current_value.innerText = this.innerText;
        } else {
            current_value.innerText = this.innerText;
            showingResult = false;
        }
    }
    //   prevent more than 1 zero as a start of the input 
    if (currentInputType == 'number' && current_value.innerText[0] == 0) {
        current_value.innerText = this.innerText;
    }
    // prevent more than one operator to be entered into a formula
    if (currentInputType == 'operator' && lastFormulaChar == 'operator') {
        current_value.innerText = this.innerText;
    }
    if (currentInputType == 'openParentheses') {
        // need to work it out!
    }
    if (currentInputType == 'equals') {
        if (!showingResult) {
            if (determineValueType(valueToSubmit) == "number") {
                valueToSubmit = validateInput(valueToSubmit);
                if (typeof valueToSubmit == "object") {
                    formulaArray = [...formulaArray, ...valueToSubmit]
                } else {
                    formulaArray.push(valueToSubmit);
                }
            }
            if (formulaArray.length <= 1) {
                currentResult = formulaArray;
                current_value.innerText = currentResult;
                showingResult = true;
                return;
            };
            let tempFormula = [...formulaArray];
            currentResult = evaluate(tempFormula);
            current_value.innerText = currentResult;
            showingResult = true;
        } else {
            current_value.innerText = currentResult;
        }
    }
    formulas_display.innerText = formulaArray.join('');
};

// add click handler for each button
allButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick)
})

// determine value type
function determineValueType(value) {

    if (value.charCodeAt(0) >= 42 && value.charCodeAt(0) <= 47) {
        return "operator";
    }
    if (value.charCodeAt(0) == 94) {
        return 'power';
    }
    if (value.charCodeAt(0) == 40) {
        return "openParentheses";
    }
    if (value.charCodeAt(0) == 61) {
        return "equals";
    }
    else {
        return "number";
    }
}

// validate input
function validateInput(input) {

    let validatedInput = '';
    // if input starts with a power
    if (input.split('').includes("^")) {
        // prevent power of an empty value, replace with zero if so
        if (input[0] == "^") input = "0" + input;
        // return an array
        return input.split('');
    };
    // if input starts with a dot 
    if (input[0] == ".") validatedInput = `0${input}`;

    // if there's not value following dot
    else if (input[input.length - 1] == ".") validatedInput = `${input}0`;
    else {
        validatedInput = input;
    }
    if (validatedInput.length < 3 && input[0] == ".") validatedInput = 0;
    return validatedInput;
}