/* DARK MODE */
let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

const enableDarkMode = () => {
    document.documentElement.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
};
const disableDarkMode = () => {
    document.documentElement.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
};

if (darkmode === "active"){
    enableDarkMode();
}

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkMode() : disableDarkMode();
});

/* TIC TAC TOE */

const gameBoard = () => {
  const rows = 3;
  const columns = 3;
  let board = [];

  for (let i = 0; i < rows; i++){
    board[i] = [];
    for (let j = 0; j < columns; j++){
      board[i].push(Cell());
    }
  }

  const resetBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j].reset();
      };
    };
  };

  const getBoard = () => board;

  const dropToken = (row, column, player) => {
    let cellIsAvailable = board[row][column];

    if ((cellIsAvailable.getValue()) !== 0){
      return false;
    };

    board[row][column].addToken(player);
    return true;
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithCellValues);
  };

  return {getBoard, printBoard, dropToken, resetBoard};
};

const Cell = () => {
  let value = 0;

  const addToken = (player) => 
    value = player;

  const getValue = () => value;

  const reset = () => value = 0;

  return {addToken, getValue, reset};
};

const GameController = () => {
  const board = gameBoard();
  const players = [
    {
      name : "Player 1",
      token : "x"
    },
    {
      name : "Player 2",
      token : "o"
    }
  ]

  const setPlayers = (player1, player2) => {
    players[0].name = player1 === "" ? "Player 1" : player1;
    players[1].name = player2 === "" ? "Player 2" : player2;
  };

  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;
  
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (row, column) => {
    const validMove = board.dropToken(row, column, getActivePlayer().token);

    if (!validMove) {
      console.log("Invalid movement");
      return false;
    }

    if (checkWinner()) {
      console.log(`${getActivePlayer().name} won`);
      resetGame();
      return;
    }

    if(checkTie()) {
      console.log("tie");
      resetGame();
      return;
    }
    
    switchPlayerTurn();
    printNewRound();

    return true;
  };

  const getActualToken = () => getActivePlayer().token;
  const actualBoard = board.getBoard();

  const checkTie = () => {
    let counter = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (actualBoard[i][j].getValue() !== 0){
          counter ++;
        };
      };
    };

    if (counter === 9){
      return true;
    }
  };

  const checkWinner = () => {
    const actualToken = getActualToken();
    for (let i = 0; i < 3; i++) {
      if ( // winner column
      (actualBoard[0][i].getValue() === actualToken) && 
      (actualBoard[1][i].getValue() === actualToken) && 
      (actualBoard[2][i].getValue() === actualToken)
      ) { return true; }

      if ( // winner row
      (actualBoard[i][0].getValue() === actualToken) && 
      (actualBoard[i][1].getValue() === actualToken) && 
      (actualBoard[i][2].getValue() === actualToken)
      ) { return true; }
    } 

    // last 2 posibilities
    if (
      (actualBoard[0][0].getValue() === actualToken) && 
      (actualBoard[1][1].getValue() === actualToken) && 
      (actualBoard[2][2].getValue() === actualToken)
    ) {return true;}
    if (
      (actualBoard[0][2].getValue() === actualToken) && 
      (actualBoard[1][1].getValue() === actualToken) && 
      (actualBoard[2][0].getValue() === actualToken)
    ) {return true;}
  };

  const resetGame = () => {
    board.resetBoard();
    console.log("Tablero reiniciado");
    printNewRound();
  };

  const printNewRound= () => {
    board.printBoard();
    console.log(`Now playing: ${getActivePlayer().name}`);
  }

  printNewRound();

  return {playRound, printNewRound, setPlayers, getActivePlayer};
}

const ScreenController = () => {
  const game = GameController();
  const boardDiv = document.querySelector(".gameboard");
  const player1NicknameInput = document.querySelector("#player1-input");
  const player2NicknameInput = document.querySelector("#player2-input");
  const playerNextTurn = document.querySelector("#current-player");

  const getNicknames = () => {
    return {player1: player1NicknameInput.value, player2: player2NicknameInput.value}
  };

  const clickHandlerBoard = (e) => {
    const row = e.target.dataset.row;
    const column = e.target.dataset.column;
    const cell = e.target;
    const playerToken = game.getActivePlayer().token;
    const nicknames =  getNicknames();
    
    if (!row || !column) return;
    game.setPlayers(nicknames.player1, nicknames.player2);
    if (!(game.playRound(row, column))) return;
    boardUpdater(cell, playerToken);
  };

  const boardUpdater = (cell, token) => {
    cell.textContent = token;

    updateTurnDisplay();
  };

  const updateTurnDisplay = () => {
    let currentPlayer = "";

    if (game.getActivePlayer().token === "x") {
      currentPlayer = getNicknames().player1;
    } else {
      if (game.getActivePlayer().token === "o"){
        currentPlayer = getNicknames().player2;
      }
    }

    if (currentPlayer === "") {
      currentPlayer = game.getActivePlayer().name;
    }

    playerNextTurn.textContent = currentPlayer;
  };

  boardDiv.addEventListener("click", clickHandlerBoard)

  player1NicknameInput.addEventListener("input", updateTurnDisplay)
  player2NicknameInput.addEventListener("input", updateTurnDisplay)

  updateTurnDisplay();
};

const screen = ScreenController();