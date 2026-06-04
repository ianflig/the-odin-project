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
    this.activeShips = 0;

    this.loadGameboard(size);
  }

  allShipsSunk() {
    return this.activeShips === 0;
  }

  receiveAttack(coordinates) {
    let gameboardCoords = this.Gameboard[coordinates[0]][coordinates[1]];

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
      this.Gameboard[ele[0]][ele[1]] = ship;
    });

    this.activeShips++;
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
