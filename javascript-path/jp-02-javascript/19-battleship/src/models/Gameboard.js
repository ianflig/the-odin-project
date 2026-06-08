import { Ship } from "./Ship.js";

export class Gameboard {
  constructor() {
    this.gameboardSize = 10;
    this.gameboard = [];
    this.missedShots = {};
    this.allShots = {};
    this.activeShips = 0;
    this.toOverrideCoords = {};

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
      this.allShots[`${coordinates[0]},${coordinates[1]}`] = true;
      return "sunk";
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
      let key = `${currentX},${currentY}`;

      // out of board
      if (
        currentX > this.gameboardSize - 1 ||
        currentY > this.gameboardSize - 1
      )
        return false;

      // already a ship in it
      if (this.gameboard[currentX][currentY] !== null) return false;

      // 1 div of space between ships
      if (this.toOverrideCoords[key]) {
        return false;
      }
    }

    return true;
  }

  placeRandomShip(shipSize) {
    let maxAttempts = 500;
    let attempts = 0;
    let placed = false;

    while (!placed && attempts < maxAttempts) {
      let randomX = Math.floor(Math.random() * this.gameboardSize);
      let randomY = Math.floor(Math.random() * this.gameboardSize);

      let isHorizontal = Math.random() > 0.5;

      if (this.canPlaceShip(randomX, randomY, shipSize, isHorizontal)) {
        let shipCoordinates = [];

        for (let i = 0; i < shipSize; i++) {
          let currentX = isHorizontal ? randomX + i : randomX;
          let currentY = isHorizontal ? randomY : randomY + i;

          shipCoordinates.push([currentX, currentY]);
        }

        this.placeShip(shipSize, ...shipCoordinates);
        this.markBufferZone(shipCoordinates);

        placed = true;
      }
      attempts++;
    }
    return placed;
  }

  markBufferZone(shipCoordinates) {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    shipCoordinates.forEach(([x, y]) => {
      directions.forEach(([dx, dy]) => {
        let haloX = x + dx;
        let haloY = y + dy;

        if (
          haloX >= 0 &&
          haloX <= this.gameboardSize - 1 &&
          haloY >= 0 &&
          haloY <= this.gameboardSize - 1
        ) {
          this.toOverrideCoords[`${haloX},${haloY}`] = true;
        }
      });
    });
  }

  autoPlaceShips(sizesArr) {
    let success = false;

    while (!success) {
      this.resetGameboard();
      success = true;

      for (let i = 0; i < sizesArr.length; i++) {
        let placedShip = this.placeRandomShip(sizesArr[i]);

        if (!placedShip) {
          success = false;
          break;
        }
      }
    }
  }

  loadGameboard() {
    for (let i = 0; i < this.gameboardSize; i++) {
      this.gameboard[i] = [];
      for (let j = 0; j < this.gameboardSize; j++) {
        this.gameboard[i][j] = null;
      }
    }
  }

  resetGameboard() {
    this.loadGameboard();
    this.activeShips = 0;
    this.toOverrideCoords = {};
  }

  getGameboard() {
    return this.gameboard;
  }

  getMissedShots() {
    return this.missedShots;
  }
}
