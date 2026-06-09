export class Ship {
  constructor(size) {
    this.length = size;
    this.hits = 0;
    this._isSunk = false;
    this.id;
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

  setId(value) {
    this.id = value;
  }
}
