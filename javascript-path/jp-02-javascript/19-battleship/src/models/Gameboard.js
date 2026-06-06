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

  canPlaceShip(startX, startY, shipSize, isHorizontal) {
    for (let i = 0; i < shipSize; i++) {
      let currentX = isHorizontal ? startX + i : startX;
      let currentY = isHorizontal ? startY : startY + i;

      if (currentX > 7 || currentY > 7) return false;

      if (this.gameboard[currentX][currentY] !== null) return false;
    }

    return true;
  }

  placeRandomShip(shipSize) {
    let placed = false;

    while (!placed) {
      let randomX = Math.floor(Math.random() * 8);
      let randomY = Math.floor(Math.random() * 8);

      let isHorizontal = Math.random() > 0.5;

      if (this.canPlaceShip(randomX, randomY, shipSize, isHorizontal)) {
        let shipCoordinates = [];

        for (let i = 0; i < shipSize; i++) {
          let currentX = isHorizontal ? randomX + i : randomX;
          let currentY = isHorizontal ? randomY : randomY + i;

          shipCoordinates.push([currentX, currentY]);
        }

        this.placeShip(shipSize, ...shipCoordinates);

        placed = true;
      }
    }
  }

  autoPlaceShips(sizesArr) {
    sizesArr.forEach((size) => {
      this.placeRandomShip(size);
    });
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
