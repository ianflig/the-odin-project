class Ship {
  constructor() {
    this.length = 0;
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
    this.Gameboard;
  }
}

