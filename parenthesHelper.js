let a = ['2', '*', '(', '2', '*', '2', ')']
let b = ['2', '*', '(', '2', '*', '2', '+', '(', '2', '+', '2', ')', ')']
let c = ['2', '*', '2', '+', '(', '2', '+', '2', '*', '(', '2', '*', '2', '+', '(', '2', '+', '2', ')', ')', '+', '2', ')']

function evaluateParetheses(arr) {

    let opening = 0;
    let closing = 0;

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            arr[i] = evaluateParetheses(arr[i])
        }
        if (arr[i] == '(') {
            openingIndex = i;
            opening++;
        }
        if (arr[i] == ')') {
            closing++;
        }
        if (opening > 0 && opening == closing) {
            arr.splice(arr.indexOf('('), i - arr.indexOf('(') + 1, [...arr.slice(arr.indexOf('(') + 1, i)])
            opening--;
            closing--;
        }
    }
    if (opening > 0) evaluateParetheses(arr);

    return arr;

}
evaluateParetheses(c)