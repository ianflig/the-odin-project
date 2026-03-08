const rockBtn = document.querySelector("#rockBtn");
const paperBtn = document.querySelector("#paperBtn");
const scissorsBtn = document.querySelector("#scissorsBtn");

const roundElement = document.querySelector("#round-number");
const messageSpan = document.querySelector("#message");
const playerScoreSpan = document.querySelector("#player-score");
const computerScoreSpan = document.querySelector("#computer-score");

//Funcion random piedra papel o tijera
let getComputerChoice = () => {
    let value = Math.floor(Math.random() * 3);
    return (value === 0) ? "piedra"
        : (value === 1) ? "papel"
            : "tijera";
};

let humanScore = 0;
let computerScore = 0;
let round = 1;


function playRound(humanChoice) {

    let computerChoice = getComputerChoice();

    let result = "";

    if (humanChoice == computerChoice) {
        result = "Empate";
    } else if (
        (humanChoice == "papel" && computerChoice == "piedra") ||
        (humanChoice == "tijera" && computerChoice == "papel") ||
        (humanChoice == "piedra" && computerChoice == "tijera")
    ) {
        humanScore++;
        result = "Ganaste";
        messageSpan.style.color = "green";
    } else {
        computerScore++;
        result = "Perdiste";
        messageSpan.style.color = "red";
    }

    playerScoreSpan.textContent = humanScore;
    computerScoreSpan.textContent = computerScore;
    messageSpan.textContent = `${result}! La PC eligió ${computerChoice}.`;
    
    round++;
    roundElement.textContent = round;

    checkWinner();
}

function checkWinner(){
    if(humanScore === 5){
        messageSpan.textContent = "GANASTE";
        messageSpan.style.color = "green";
        disableButtons();
    } else if (computerScore === 5){
        messageSpan.textContent = "PERDISTE";
        messageSpan.style.color = "red";
        disableButtons();
    }
}

function disableButtons() {
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;
}

rockBtn.addEventListener("click", () => playRound("piedra"));
paperBtn.addEventListener("click", () => playRound("papel"));
scissorsBtn.addEventListener("click", () => playRound("tijera"));