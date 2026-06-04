class Ship {
  constructor(size) {
    this.length = size;
    this.hits = 0;
    this._isSunk = false;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.hits === this.length) {
      this._isSunk = true;
    }

    return this._isSunk;
  }
}

export class Gameboard {
  constructor(size) {
    this.Gameboard = [];
    this.missedShots = {};

    this.loadGameboard(size);
  }

  receiveAttack(coordinates) {
    let gameboardCoords = this.Gameboard[coordinates[0]][coordinates[1]];
    gameboardCoords !== null
      ? gameboardCoords.hit()
      : (this.missedShots[`${coordinates[0]},${coordinates[1]}`] = true);
  }

  placeShip(shipSize, ...args) {
    const ship = new Ship(shipSize);

    args.forEach((ele) => {
      this.Gameboard[ele[0]][ele[1]] = ship;
    });
  }

  loadGameboard(size) {
    for (let i = 0; i < size; i++) {
      this.Gameboard[i] = [];
      for (let j = 0; j < size; j++) {
        this.Gameboard[i][j] = null;
      }
    }
  }

  getGameboard() {
    return this.Gameboard;
  }

  getMissedShots() {
    return this.missedShots;
  }
}
