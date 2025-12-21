const divContainer = document.querySelector("#container");
const changeGridValueBtn = document.querySelector("#change-grid-value");
let isMouseDown = false;
document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);

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
            gridDiv.style.outline = "1px solid lightgray";

            gridDiv.classList.add("gridDiv");
            divContainer.appendChild(gridDiv)

            gridDiv.addEventListener("mouseover", changeColor);
            gridDiv.addEventListener("mousedown", changeColor);
        }
    } else {
        alert("Debe ingresar un valor menor a 100");
    }
}

createGrid(16);

changeGridValueBtn.addEventListener("click", () => {
    createGrid(prompt("Valor del a nueva grid", 64));
});

