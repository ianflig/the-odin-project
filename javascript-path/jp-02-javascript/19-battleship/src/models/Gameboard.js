import { Ship } from "./Ship.js";

export class Gameboard {
  constructor(size) {
    this.gameboard = [];
    this.missedShots = {};
    this.activeShips = 0;

    this.loadGameboard(size);
  }

  allShipsSunk() {
    return this.activeShips === 0;
  }

  receiveAttack(coordinates) {
    let gameboardCoords = this.gameboard[coordinates[0]][coordinates[1]];

    if (gameboardCoords === null) {
      return (this.missedShots[`${coordinates[0]},${coordinates[1]}`] = true);
    }

    gameboardCoords.hit();
    if (gameboardCoords.isSunk()) {
      this.activeShips--;
    }
  }

  placeShip(shipSize, ...args) {
    const ship = new Ship(shipSize);

    args.forEach((ele) => {
      this.gameboard[ele[0]][ele[1]] = ship;
    });

    this.activeShips++;
  }

  loadGameboard(size) {
    for (let i = 0; i < size; i++) {
      this.gameboard[i] = [];
      for (let j = 0; j < size; j++) {
        this.gameboard[i][j] = null;
      }
    }
  }

  getGameboard() {
    return this.gameboard;
  }

  getMissedShots() {
    return this.missedShots;
  }
}
