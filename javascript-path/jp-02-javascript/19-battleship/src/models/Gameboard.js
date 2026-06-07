import { Ship } from "./Ship.js";

export class Gameboard {
  constructor() {
    this.size = 8;
    this.gameboard = [];
    this.missedShots = {};
    this.allShots = {};
    this.activeShips = 0;
    //test - remove after
    this.toOverrideCoords = {};
    //

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

      //test
      // toOverrideCoords obj condition.
      // to achieve 1 space between ships in each direction
      let key = `${currentX},${currentY}`;
      if (this.toOverrideCoords[key]) {
        return false;
      }

      //
    }

    return true;
  }

  placeRandomShip(shipSize) {
    let placed = false;

    // test
    let tempCoords = [];
    //

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
        //test
        tempCoords.push(...shipCoordinates);
        //

        placed = true;
      }
    }

    //test
    tempCoords.forEach((ele) => {
      let x1 = `${ele[0] + 1},${ele[1]}`;
      let x2 = `${ele[0] - 1},${ele[1]}`;
      let y1 = `${ele[0]},${ele[1] + 1}`;
      let y2 = `${ele[0]},${ele[1] - 1}`;
      let leftTopCorner = `${ele[0] - 1},${ele[1] - 1}`;
      let leftDownCorner = `${ele[0] - 1},${ele[1] + 1}`;
      let rightTopCorner = `${ele[0] + 1},${ele[1] - 1}`;
      let rightDownCorner = `${ele[0] + 1},${ele[1] + 1}`;

      this.toOverrideCoords[x1] = true;
      this.toOverrideCoords[x2] = true;
      this.toOverrideCoords[y1] = true;
      this.toOverrideCoords[y2] = true;
      this.toOverrideCoords[leftTopCorner] = true;
      this.toOverrideCoords[leftDownCorner] = true;
      this.toOverrideCoords[rightTopCorner] = true;
      this.toOverrideCoords[rightDownCorner] = true;
      // ele[0] & ele[1] save into toOverrideCoords obj.
      //
    });
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
