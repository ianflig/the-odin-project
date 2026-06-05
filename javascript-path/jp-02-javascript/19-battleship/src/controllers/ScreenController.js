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
    };

    this.renderer.bindEvents(actions);

    this.init();
  }

  init() {
    this.renderer.renderGameboards(this.gameboardSize);
  }

  startGame() {
    this.game.startGame();
    this.updateTurnDisplay();
  }

  resetGame() {
    this.game.resetGame();
    this.renderer.renderGameboards(this.gameboardSize);
    this.updateTurnDisplay();
  }

  attackShip(coords) {
    let coordsFormatted = formatCoords(coords);
    let result = this.game.attackShip(coordsFormatted);

    if (!result) return;

    this.renderer.renderCell(coords, result.player, result.result);
    this.updateTurnDisplay();
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
}
