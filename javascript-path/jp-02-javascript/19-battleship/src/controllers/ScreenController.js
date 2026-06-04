export class ScreenController {
  constructor(playerOne, playerTwo, renderer) {
    this.renderer = renderer;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;

    this.init();
  }

  init() {
    this.renderer.renderGameboards(4);
  }
}
