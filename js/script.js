const DEFAULT_COLOR = "#3b82f6";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;
const DEFAULT_BACKGROUND_COLOR = "#000000ff";

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;
let currentBackgroundColor = DEFAULT_BACKGROUND_COLOR;

let isMouseDown = false;
let solidColorStatus = true;
let eraserStatus = false;


const divContainer = document.querySelector("#grid-container");
const colorBtn = document.querySelector("#colorBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const clearGrid = document.querySelector("#clearGrid");

colorBtn.onclick = () => {
    currentMode = "color";
    activateButton("color");
} 
rainbowBtn.onclick = () => {
    currentMode = "rainbow";
    activateButton("rainbow");
} 
eraserBtn.onclick = () => {
    currentMode = "eraser";
    activateButton("eraser");
} 

document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);
sizeSlider.onmousemove = (e) => updateCurrentSize(e.target.value);
sizeSlider.onchange = (e) => {
    eraseGrid(), 
    createGrid(currentSize);
}

colorInput.oninput = (e) => (currentColor = e.target.value);

clearGrid.onclick = (e) => {
    eraseGrid(), 
    createGrid(currentSize)
}

function activateButton (newMode){
    colorBtn.classList.remove("active");
    rainbowBtn.classList.remove("active");
    eraserBtn.classList.remove("active");

    if (newMode == "color"){
        colorBtn.classList.add("active");
    } else if (newMode == "rainbow"){
        rainbowBtn.classList.add("active");
    } else if (newMode == "eraser"){
        eraserBtn.classList.add("active");
    }
}

function updateCurrentSize(value) {
    sizeValue.innerHTML = `${value}x${value}`;
    currentSize = value;
}

function eraseGrid(){
    divContainer.innerHTML = "";
}

function changeColor(e) {
    if (e.type === 'mouseover' && !isMouseDown) return; 
    
    e.preventDefault(); // evita el arrastre del elemento

    if (currentMode === "color") {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === "rainbow") {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === "eraser") {
        e.target.style.backgroundColor = currentBackgroundColor;
    }
}

function createGrid(value) {

    for (let i = 0; i < value * value; i++) {

        const gridDiv = document.createElement("div");

        gridDiv.style.width = `${630 / value}px`;
    
        gridDiv.addEventListener("mouseover", changeColor);
        gridDiv.addEventListener("mousedown", changeColor);

        divContainer.appendChild(gridDiv)
    }
}

window.onload = () => {
  createGrid(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE)
}
