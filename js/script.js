DOWNTEXT_DEFAULT = "0";
const operatorList = ["/", "+", "x", "-", "%"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]

let previousValue = "";
let currentValue = "";
let operator = null;
let resetScreen = false;

const buttons = document.querySelectorAll("button");

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {

    const val = btn.textContent;
    //negative numbers
    if (val === "-") {
        if (currentValue === "" || resetScreen === "downText") {
            handleNumber("-"); 
        } else {
            handleOperator("-"); 
        }
        return; 
    }

    //AC input
    if (btn.textContent == "AC") {return deleteAll()}
    //DEL input
    if (btn.textContent == "DEL") {return deleteNumber()}
    //number input
    if (numbers.includes(btn.textContent)){handleNumber(btn.textContent)}
    //operator input
    if (operatorList.includes(btn.textContent) && (btn.textContent !== "=")){handleOperator(btn.textContent)}
    //getResult
    if (btn.textContent === "=" && currentValue && previousValue && operator){getResult()}


  });
});

function deleteNumber(){
    currentValue = currentValue.toString().slice(0, -1);
    downText.innerHTML = currentValue;
}

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
        return;
    }

    if (operator !== null && (previousValue)){
        if (Number.isInteger(+currentValue)){
        getResult()
        } else {
            return;
            }
        }

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
        case "%": result = a % b; break;
        case "/": if (currentValue == 0){result = "Not possible"
        } else {
            result = a / b;} break;
    }

    downText.innerHTML = Math.round(result * 100000000) / 100000000;
    upText.innerHTML = previousValue + " " + operator + " " + currentValue + " =";
    currentValue = result.toString();
    operator = null;
    resetScreen = "all";
}

function deleteAll(){
    previousValue = "";
    currentValue = "";
    operator = null;
    resetScreen = null;
    upText.innerHTML = "";
    downText.innerHTML = DOWNTEXT_DEFAULT;
    negativeNumber = false;
}