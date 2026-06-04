export class ScreenController {
  constructor(renderer, game) {
    this.renderer = renderer;
    this.game = game;

    const actions = {
      toStartGame: () => {
        this.startGame();
      },
    };

    this.renderer.bindEvents(actions);

    this.init();
  }

  init() {
    this.renderer.renderGameboards(4);
  }

  startGame() {
    return this.game.startGame();
  }
}
