function gameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++){
    board[i] = [];
    for (let j = 0; j < columns; j++){
      board[i].push(Cell());
    }
  }

  const dropToken = (row, column, player) => {
    board[row][column].addToken(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithCellValues);
  };

  return {printBoard, dropToken};
}

function Cell(){
  let value = 0;

  const addToken = (player) => 
    value = player;

  const getValue = () => value;

  return {addToken, getValue};
}

function GameController(player1 = "ian", player2 = "debris") {
  const players = [
    {
      name : player1,
      token : 1
    },
    {
      name : player2,
      token : 2
    }
  ]

  let activePlayer = players[0];
  
  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const board = gameBoard();

  const playRound = (row, column) => {
    board.dropToken(row, column, getActivePlayer().token);
    switchPlayerTurn();
    printNewRound();
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound= () => {
    board.printBoard();
    console.log(`Now playing: ${getActivePlayer().name}`);
  }

  printNewRound();

  return {playRound};
}

const game = GameController();