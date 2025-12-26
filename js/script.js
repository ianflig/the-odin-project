// leak: result round to decimal, zero division error, negative numbers operations, DEL and % operators.

const operatorList = ["/", "+", "x", "-", "%"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]

let previousValue = "";
let currentValue = "";
let operator = null;
let resetScreen = false;

const buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    //AC input
    if (btn.textContent == "AC") {return deleteAll()}
    //number input
    if (numbers.includes(btn.textContent)){handleNumber(btn.textContent)}
    //operator input
    if (operatorList.includes(btn.textContent) && (btn.textContent !== "=") ){handleOperator(btn.textContent)}
    //getResult
    if (btn.textContent === "=" && currentValue && previousValue && operator){getResult()}

  });
});

function handleNumber(value){
    if (resetScreen == "downText"){
        currentValue = "";
        resetScreen = null;
    } else if (resetScreen == "all") {deleteAll()}

    currentValue += value;
    downText.innerHTML = currentValue;
}

function handleOperator(value){
    if ((operator !== null) && resetScreen){
        operator = value;
        upText.innerHTML = previousValue + " " + operator;
        return;}

    if (operator !== null){getResult()}

    operator = value;
    previousValue = currentValue;
    resetScreen = "downText"
    upText.innerHTML = previousValue + " " + operator;
}

function getResult(){
    let result = 0;

    const a = parseFloat(previousValue);
    const b = parseFloat(currentValue);

    switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "x": result = a * b; break;
        case "/": if (currentValue == 0){result = "Not possible"} else {result = a / b;} break;
    }

    downText.innerHTML = result;
    upText.innerHTML = previousValue + " " + operator + " " + currentValue + " =";
    currentValue = result;
    operator = null;
    resetScreen = "all";
}

function deleteAll(){
    previousValue = "";
    currentValue = "";
    operator = null;
    resetScreen = null;
    upText.innerHTML = "";
    downText.innerHTML = "";
}