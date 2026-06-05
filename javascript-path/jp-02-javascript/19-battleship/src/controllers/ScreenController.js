import { formatCoords } from "../utils/helpers.js";

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
    };

    this.renderer.bindEvents(actions);

    this.init();
  }

  init() {
    this.renderer.renderGameboards(this.gameboardSize);
  }

  setComputerPlayer(value) {
    this.game.isComputerPlaying = value;
  }

  startGame() {
    this.game.startGame();
    this.updateTurnDisplay();
    this.updateLockComputerButtonDisplay();
  }

  resetGame() {
    this.game.resetGame();
    this.renderer.renderGameboards(this.gameboardSize);
    this.updateTurnDisplay();
    this.updateLockComputerButtonDisplay();
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

    if (this.game.isComputerPlaying && this.game.playerTurn === "computer") {
      this.triggerComputerAttack();
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
    }, 600);
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

  updateLockComputerButtonDisplay() {
    let gameStatus = this.game.gameStatus;
    if (gameStatus) {
      this.renderer.swapLockComputerButton(true);
    } else {
      this.renderer.swapLockComputerButton(false);
    }
  }
}
