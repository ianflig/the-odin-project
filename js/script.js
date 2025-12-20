const divContainer = document.querySelector("#container");

function changeColor(e){
    e.target.style.backgroundColor = 'yellow';
}

for(let i = 0; i < 16*16; i++){
    
    const gridDiv = document.createElement("div");

    gridDiv.classList.add("gridDiv");
    divContainer.appendChild(gridDiv)

    gridDiv.addEventListener("mouseenter", changeColor);
}
