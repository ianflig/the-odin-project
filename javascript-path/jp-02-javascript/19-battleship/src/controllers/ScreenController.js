import { formatCoords } from "../utils/helpers.js";
import { GameController } from "./GameController.js";

export class ScreenController {
  constructor(renderer, game) {
    this.renderer = renderer;
    this.game = game;
    this.gameboardSize = 8;

    const actions = {
      toStartGame: () => {
        this.startGame();
      },
      toResetGame: () => {
        this.resetGame();
      },
      toAttackShip: (coords) => {
        this.attackShip(coords);
      },
      toSetComputerPlayer: (value) => {
        this.setComputerPlayer(value);
      },
      toGenRandomShips: (player) => {
        this.generateRandomShips(player);
      },
      toRenderRandomShips: (player) => {
        this.renderRandomShips(player);
      },
    };

    this.renderer.bindEvents(actions);

    this.init();
  }

  init() {
    this.generateRandomShips(1);
    this.renderRandomShips(1);

    this.generateRandomShips(2);
    this.renderRandomShips(2);
  }

  setComputerPlayer(value) {
    this.game.isComputerPlaying = value;
  }

  startGame() {
    let gameStatus = this.game.gameStatus;

    if (gameStatus) return;
    this.game.startGame();
    this.updateTurnDisplay();
    this.updateComputerButtonDisplay();
    this.updateGenerateRandomShipsDisplay();

    if (this.game.isComputerPlaying) {
      this.updateShipsFromGameboard(2);
      this.generateRandomShips(2);
    } else {
      this.updateShipsFromGameboard(1);
      this.updateShipsFromGameboard(2);
    }
  }

  resetGame() {
    this.game = new GameController();
    this.generateRandomShips(1);
    this.renderRandomShips(1);

    this.generateRandomShips(2);
    this.renderRandomShips(2);

    this.updateTurnDisplay();
    this.updateComputerButtonDisplay();
    this.updateGenerateRandomShipsDisplay();
  }

  attackShip(coords) {
    let coordsFormatted = formatCoords(coords);
    let humanResult = this.game.attackShip(coordsFormatted);

    if (!humanResult) return;

    this.renderer.renderAndLockCell(
      humanResult.coords,
      humanResult.player,
      humanResult.result,
    );
    this.updateTurnDisplay();

    if (humanResult.winner) {
      this.updateAllGameboardsLockDisplay(true);
      console.log("Player " + humanResult.winner + " wins");
      return;
    }

    if (this.game.isComputerPlaying && this.game.playerTurn === "computer") {
      this.triggerComputerAttack();
    }
  }

  generateRandomShips(player) {
    const playerOneGameboard = this.game.playerOne.gameboard;
    const playerTwoGameboard = this.game.playerTwo.gameboard;

    if (player === 1) {
      playerOneGameboard.resetGameboard();
      this.game.generateRandomShips(player);
    } else {
      playerTwoGameboard.resetGameboard();
      this.game.generateRandomShips(player);
    }
  }

  renderRandomShips(player) {
    const playerOneGameboard = this.game.playerOne.gameboard;
    const playerTwoGameboard = this.game.playerTwo.gameboard;

    if (player === 1) {
      this.renderer.renderGameboard(
        1,
        playerOneGameboard.getGameboard(),
        false,
        this.gameboardSize,
      );
    } else {
      this.renderer.renderGameboard(
        2,
        playerTwoGameboard.getGameboard(),
        false,
        this.gameboardSize,
      );
    }
  }

  triggerComputerAttack() {
    this.updateAllGameboardsLockDisplay(true);

    setTimeout(() => {
      let compResult = this.game.playComputerTurn();

      this.renderer.renderAndLockCell(
        compResult.coords,
        compResult.player,
        compResult.result,
      );

      this.updateAllGameboardsLockDisplay(false);
      this.updateTurnDisplay();

      if (compResult.winner) {
        this.updateAllGameboardsLockDisplay(true);
        console.log("computer wins");
        return;
      }
    }, 600);
  }

  // remove RENDER of random ships generated
  updateShipsFromGameboard(player) {
    let gameStatus = this.game.gameStatus;

    if (gameStatus) {
      this.renderer.renderGameboard(
        player,
        undefined,
        true,
        this.gameboardSize,
      );
    }
  }

  updateGenerateRandomShipsDisplay() {
    let gameStatus = this.game.gameStatus;
    if (gameStatus) {
      this.renderer.swapLockGenerateRandomShips(true);
    } else {
      this.renderer.swapLockGenerateRandomShips(false);
    }
  }

  updateAllGameboardsLockDisplay(value) {
    return this.renderer.swapAllGameboardsLock(value);
  }

  updateTurnDisplay() {
    let currentPlayer = this.game.playerTurn;
    let gameStatus = this.game.gameStatus;

    if (gameStatus) {
      this.renderer.swapGameboardLock(currentPlayer);
    } else {
      this.renderer.unlockGameboards();
    }
  }

  updateComputerButtonDisplay() {
    let gameStatus = this.game.gameStatus;
    if (gameStatus) {
      this.renderer.swapLockComputerButton(true);
    } else {
      this.renderer.swapLockComputerButton(false);
    }
  }
}
