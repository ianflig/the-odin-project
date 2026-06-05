import { formatCoords } from "../utils/helpers.js";

export class ScreenController {
  constructor(renderer, game) {
    this.renderer = renderer;
    this.game = game;

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
    this.renderer.renderGameboards(8);
  }

  startGame() {
    this.game.startGame();
    this.updateTurnDisplay();
  }

  resetGame() {
    return this.game.resetGame();
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

    this.renderer.swapGameboardLock(currentPlayer);
  }
}
