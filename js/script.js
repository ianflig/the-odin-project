const divContainer = document.querySelector("#container");
const changeGridValueBtn = document.querySelector("#change-grid-value");

createGrid(16);

function changeColor(e) {
    e.target.style.backgroundColor = 'yellow';
}

function createGrid(value) {
    
    if (!(value > 100)){
        
        divContainer.innerHTML = "";

        for (let i = 0; i < value * value; i++) {

            const gridDiv = document.createElement("div");

            gridDiv.style.width = `${630 / value}px`;
            gridDiv.style.outline = "1px solid black";

            gridDiv.classList.add("gridDiv");
            divContainer.appendChild(gridDiv)

            gridDiv.addEventListener("mouseenter", changeColor);
        }
    } else {
        alert("Debe ingresar un valor menor a 100");
    }
}

changeGridValueBtn.addEventListener("click", () => {
    createGrid(prompt("Valor del a nueva grid", 64));
});
