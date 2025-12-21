const divContainer = document.querySelector("#container");
let isMouseDown = false;

document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)
sizeSlider.onchange = (e) => createGrid(e.target.value)

function updateSizeValue(value) {
    sizeValue.innerHTML = `${value} x ${value}`
}

function changeColor(e) {
    if (e.type === 'mouseover' && !isMouseDown) return; 
    
    e.preventDefault(); // evita el arrastre del elemento
    e.target.style.backgroundColor = 'yellow';
}

function createGrid(value) {
    
    if (!(value > 100)){
        
        divContainer.innerHTML = "";

        for (let i = 0; i < value * value; i++) {

            const gridDiv = document.createElement("div");

            gridDiv.style.width = `${630 / value}px`;
        
            gridDiv.addEventListener("mouseover", changeColor);
            gridDiv.addEventListener("mousedown", changeColor);

            divContainer.appendChild(gridDiv)
        }
    } else {
        alert("Debe ingresar un valor menor a 100");
    }
}

createGrid(16);
