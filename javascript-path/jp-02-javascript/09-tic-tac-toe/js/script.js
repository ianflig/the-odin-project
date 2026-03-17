function gameBoard() {
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
}

function Cell(){
  let value = 0;

  const addToken = (player) => 
    value = player;

  const getValue = () => value;

  const reset = () => value = 0;

  return {addToken, getValue, reset};
}

function GameController(player1 = "ian", player2 = "debris") {
  const board = gameBoard();
  const players = [
    {
      name : player1,
      token : "x"
    },
    {
      name : player2,
      token : "o"
    }
  ]
  let activePlayer = players[0];

  const getActivePlayer = () => activePlayer;
  
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const playRound = (row, column) => {
    const validMove = board.dropToken(row, column, getActivePlayer().token);

    if (!validMove) {
      return console.log("Invalid movement");
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

  return {playRound};
}

const game = GameController();