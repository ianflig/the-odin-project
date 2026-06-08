import { Player } from "../models/Player.js";
import { formatCoords } from "../utils/helpers.js";

export class GameController {
  constructor() {
    this.playerOne = new Player();
    this.playerTwo = new Player();
    this.gameStatus = false;
    this.playerTurn = 1;
    this.isComputerPlaying = false;
    this.allowedShipSizes = [3, 3, 2, 2, 1];
    this.checkForAdjacency = false;
    this.shipToCheckForAdjacents;
    this.adjacencyToCheck = [];
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

  // todo -> better computer movements

  playComputerTurn() {
    let randomCoords;
    let isLegal = false;
    let allShots = this.playerOne.gameboard.allShots;
    let result;

    // --------- //
    if (this.adjacencyToCheck.length !== 0) {
      let attackCoords = this.adjacencyToCheck.shift();
      result = this.attackShip(attackCoords);

      if (result.result === "hit") {
        this.adjacencyToCheck = [];
        this.generateAdjacency(result.coords);
      }

      return result;
    }

    while (!isLegal) {
      let tempCoords = this.generateRandomCoords();
      let coordKey = `${tempCoords[0]},${tempCoords[1]}`;

      if (!allShots[coordKey]) {
        isLegal = true;
        randomCoords = tempCoords;
      }
    }

    result = this.attackShip(randomCoords);

    // before generating random coords should check for adjacents
    if (result.result === "hit") {
      this.generateAdjacency(result.coords);
    }

    return result;
  }

  // todo -> reset adjacency arr (after hit and after ship is sunk)
  generateAdjacency(coords) {
    let instance = this.playerOne.gameboard;
    const directions = [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ];
    this.shipToCheckForAdjacents =
      instance.getGameboard()[coords[0]][coords[1]];
    this.checkForAdjacency = true;
    // to fix
    directions.forEach(([x, y]) => {
      let adjacencyX = coords[0] + x;
      let adjacencyY = coords[1] + y;
      if (
        adjacencyX >= 0 &&
        adjacencyX <= 7 &&
        adjacencyY >= 0 &&
        adjacencyY <= 7
      ) {
        if (!instance.allShots[`${adjacencyX[0]},${adjacencyY[1]}`]) {
          this.adjacencyToCheck.push([adjacencyX, adjacencyY]);
        }
      }
    });
  }

  generateRandomCoords() {
    let result = [];
    let min = Math.ceil(0);
    let max = Math.floor(7);

    result.push(Math.floor(Math.random() * (max - min + 1)) + min);
    result.push(Math.floor(Math.random() * (max - min + 1)) + min);

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
}
