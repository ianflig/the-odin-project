export class GameController {
  constructor(playerOne, playerTwo) {
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.gameStatus = false;
    this.playerTurn = 1;
  }

  startGame() {
    if (this.gameStatus) {
      return;
    }

    this.gameStatus = true;

    this.playerOne.gameboard.placeShip(1, [0, 0]);
    this.playerTwo.gameboard.placeShip(3, [0, 0], [0, 1], [0, 2]);

    console.log("Game started");
    console.log("Now playing: Player " + this.playerTurn);
  }

  resetGame() {
    console.log("Restarting game...");
    this.playerOne.gameboard.resetGameboard();
    this.playerTwo.gameboard.resetGameboard();
    this.gameStatus = false;
    this.playerTurn = 1;
  }

  switchPlayerTurn() {
    this.playerTurn === 1 ? (this.playerTurn = 2) : (this.playerTurn = 1);
    console.log("Now playing: Player " + this.playerTurn);
  }
}
