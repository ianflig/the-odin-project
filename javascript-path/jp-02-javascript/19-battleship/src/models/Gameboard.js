import { Ship } from "./Ship.js";

export class Gameboard {
  constructor() {
    this.size = 8;
    this.gameboard = [];
    this.missedShots = {};
    this.allShots = {};
    this.activeShips = 0;

    this.loadGameboard();
  }

  allShipsSunk() {
    return this.activeShips === 0;
  }

  receiveAttack(coordinates) {
    let gameboardCoords = this.gameboard[coordinates[0]][coordinates[1]];

    if (gameboardCoords === null) {
      this.missedShots[`${coordinates[0]},${coordinates[1]}`] = true;
      this.allShots[`${coordinates[0]},${coordinates[1]}`] = true;
      return "miss";
    }

    gameboardCoords.hit();
    if (gameboardCoords.isSunk()) {
      this.activeShips--;
    }

    this.allShots[`${coordinates[0]},${coordinates[1]}`] = true;

    return "hit";
  }

  placeShip(shipSize, ...args) {
    const ship = new Ship(shipSize);

    args.forEach((ele) => {
      this.gameboard[ele[0]][ele[1]] = ship;
    });

    this.activeShips++;
  }

  loadGameboard() {
    for (let i = 0; i < this.size; i++) {
      this.gameboard[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.gameboard[i][j] = null;
      }
    }
  }

  resetGameboard() {
    return this.loadGameboard();
  }

  getGameboard() {
    return this.gameboard;
  }

  getMissedShots() {
    return this.missedShots;
  }
}
