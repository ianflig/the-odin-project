import { Player } from "../models/Player.js";

export class GameController {
  constructor() {
    this.gameboardSize = 10;
    this.playerOne = new Player();
    this.playerTwo = new Player();
    this.gameStatus = false;
    this.playerTurn = 1;
    this.isComputerPlaying = false;
    this.allowedShipSizes = [5, 4, 4, 3, 3, 3, 2, 2, 1];
    this.shipToCheckForAdjacents;
    this.adjacencyToCheck = [];
    this.firstHit = null;
  }

  startGame(player1Nickname, player2Nickname = "Player 2") {
    if (this.gameStatus) {
      return;
    }

    this.gameStatus = true;

    player1Nickname
      ? this.playerOne.setNickname(player1Nickname)
      : this.playerOne.setNickname("Player 1");

    this.isComputerPlaying
      ? this.playerTwo.setNickname("Computer")
      : this.playerTwo.setNickname(player2Nickname);

    // console.log("Game started");

    // console.log("Now playing: " + this.getPlayerNickname());
  }

  getPlayerNickname() {
    return this.playerTurn === 1
      ? this.playerOne.getNickname()
      : this.playerTwo.getNickname();
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
      console.log("Now playing: " + this.getPlayerNickname());
      return;
    }

    this.playerTurn === 1 ? (this.playerTurn = 2) : (this.playerTurn = 1);
    console.log("Now playing: " + this.getPlayerNickname());
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

  // workflow: attack at a random coord -> hit?: yes -> is there an adjacency list? no: generate adjacency list for next shot. yes: check adjacency list and hit that coord -> repeat until adjacency list length === 0
  playComputerTurn() {
    let randomCoords;
    let isLegal = false;
    let allShots = this.playerOne.gameboard.allShots;
    let result;

    //adjacency mechanism
    if (this.adjacencyToCheck.length !== 0) {
      let attackCoords = this.adjacencyToCheck.shift();
      result = this.attackShip(attackCoords);

      //check horizontal || vertical after second hit
      if (result.result === "hit") {
        this.generateAdjacency(result.coords);

        let isHorizontal = this.firstHit[1] === result.coords[1];
        let isVertical = this.firstHit[0] === result.coords[0];

        this.adjacencyToCheck = this.adjacencyToCheck.filter((pendingCoord) => {
          if (isHorizontal) {
            return pendingCoord[1] === this.firstHit[1];
          }
          if (isVertical) {
            return pendingCoord[0] === this.firstHit[0];
          }
        });
      }

      if (result.result === "sunk") {
        this.firstHit = null;
        this.adjacencyToCheck = [];
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

    // first hit
    if (result.result === "hit") {
      this.firstHit = result.coords;
      this.generateAdjacency(result.coords);
    }

    // just in case it hits a 1 length ship
    if (result.result === "sunk") {
      this.firstHit = null;
      this.adjacencyToCheck = [];
    }

    return result;
  }

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
    // to refactor some day...
    directions.forEach(([x, y]) => {
      let adjacencyX = coords[0] + x;
      let adjacencyY = coords[1] + y;
      // out of board
      if (
        adjacencyX >= 0 &&
        adjacencyX <= this.gameboardSize - 1 &&
        adjacencyY >= 0 &&
        adjacencyY <= this.gameboardSize - 1
      ) {
        // already a shot in that div
        if (!instance.allShots[`${adjacencyX},${adjacencyY}`]) {
          let isAlreadyPending = this.adjacencyToCheck.some(
            (pendingCoord) =>
              pendingCoord[0] === adjacencyX && pendingCoord[1] === adjacencyY,
          );
          // lifo queue check
          if (!isAlreadyPending) {
            this.adjacencyToCheck.unshift([adjacencyX, adjacencyY]);
          }
        }
      }
    });
  }

  generateRandomCoords() {
    let result = [];
    let min = Math.ceil(0);
    let max = Math.floor(this.gameboardSize - 1);

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
