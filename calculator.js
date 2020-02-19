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
        if (this.innerText == '0') {
            currentValue == [0];
            return;
        }
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
        subtractHelper('operator', this.innerText)
        return;
    };

    if (currentValueType == 'number') {
        currentFormula.push(currentValue);
        currentValue = [];
        subtractHelper('number', this.innerText)
    };
};

function subtractHelper(valuetype, button) {
    updateCurrentFormula();
    currentValueType = valuetype;
    currentValue += button;
    updateCurrentDisplay();
}

subtract.addEventListener('click', handleSubstract);


equals.addEventListener('click', function () {
    evaluate(currentFormula)
    currentFormula = [currentValue];
    updateCurrentDisplay()
    updateCurrentFormula();
    currentValue = [];
    currentValueType = 'number';
});


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
