import { Player } from "../models/Player.js";

export class GameController {
  constructor() {
    this.playerOne = new Player();
    this.playerTwo = new Player();
    this.gameStatus = false;
    this.playerTurn = 1;
    this.isComputerPlaying = false;
    this.allowedShipSizes = [3, 3, 2, 2, 1];
  }

  startGame() {
    if (this.gameStatus) {
      return;
    }

    this.gameStatus = true;

    console.log("Game started");
    console.log("Now playing: Player " + this.playerTurn);
  }

  generateRandomShips(player) {
    if (player === 1) {
      this.playerOne.gameboard.resetGameboard();
      this.playerOne.gameboard.autoPlaceShips(this.allowedShipSizes);
    } else {
      this.playerTwo.gameboard.resetGameboard();
      this.playerTwo.gameboard.autoPlaceShips(this.allowedShipSizes);
    }
  }

  switchPlayerTurn() {
    if (this.isComputerPlaying) {
      this.playerTurn === 1
        ? (this.playerTurn = "computer")
        : (this.playerTurn = 1);
      console.log("Now playing: Player " + this.playerTurn);
      return;
    }

    this.playerTurn === 1 ? (this.playerTurn = 2) : (this.playerTurn = 1);
    console.log("Now playing: Player " + this.playerTurn);
  }

  // todo -> keep attacking after a hit
  // todo -> better computer movements

  attackShip(coords) {
    if (!this.gameStatus) return;

    let result;

    if (this.playerTurn === 1) {
      result = {
        player: 2,
        result: this.playerTwo.gameboard.receiveAttack(coords),
        coords: coords,
        winner: this.checkWinner(),
      };
    } else {
      result = {
        player: 1,
        result: this.playerOne.gameboard.receiveAttack(coords),
        coords: coords,
        winner: this.checkWinner(),
      };
    }

    if (result.result === "miss") {
      this.switchPlayerTurn();
    }

    return result;
  }

  checkWinner() {
    if (this.playerOne.gameboard.allShipsSunk()) {
      return 2;
    } else if (this.playerTwo.gameboard.allShipsSunk()) {
      return 1;
    }

    return;
  }

  playComputerTurn() {
    let randomCoords;
    let isLegal = false;
    let allShots = this.playerOne.gameboard.allShots;

    while (!isLegal) {
      let tempCoords = this.generateRandomCoords();
      let coordKey = `${tempCoords[0]},${tempCoords[1]}`;

      if (!allShots[coordKey]) {
        isLegal = true;
        randomCoords = tempCoords;
      }
    }

    return this.attackShip(randomCoords);
  }

  generateRandomCoords() {
    let result = [];
    let min = Math.ceil(0);
    let max = Math.floor(7);

    result.push(Math.floor(Math.random() * (max - min + 1)) + min);
    result.push(Math.floor(Math.random() * (max - min + 1)) + min);

    return result;
  }
}
