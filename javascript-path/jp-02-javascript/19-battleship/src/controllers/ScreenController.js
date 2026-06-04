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
    return this.game.startGame();
  }

  resetGame() {
    return this.game.resetGame();
  }

  attackShip(coords) {
    let coordsFormatted = [];
    coords.split(",").forEach((ele) => {
      coordsFormatted.push(Number(ele));
    });
    this.game.attackShip(coordsFormatted);
  }
}
