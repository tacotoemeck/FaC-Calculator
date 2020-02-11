const formulas_display = document.getElementById('formula_display');
const current_value = document.getElementById('current_value');

const allButtons = document.querySelectorAll('.calc-button');

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

    if (
        (currentInputType == 'operator' && lastFormulaChar == 'number')
        ||
        (currentInputType == 'number' && lastFormulaChar == 'operator')
    ) {
        formulaArray.push(valueToSubmit)
        current_value.innerText = this.innerText;
    }

    if (currentInputType == 'operator' && lastFormulaChar == 'operator') {
        current_value.innerText = this.innerText;
    }

    formulas_display.innerText = formulaArray.join('');


}

// add click handler for each button
allButtons.forEach(button => {
    button.addEventListener('click', handleButtonClick)
})



// determine value type
function determineValueType(value) {
    if (value.charCodeAt(0) >= 40 && value.charCodeAt(0) <= 48
        || value.charCodeAt(0) === 94) {
        return "operator"
    } else {
        return "number"
    }
}