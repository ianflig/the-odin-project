export class ScreenController {
  constructor(renderer, logic) {
    this.renderer = renderer;
    this.game = logic;

    // const actions = {
    //     toAttack:
    // }

    this.init();
  }

  init() {
    this.renderer.renderGameboards(4);
  }
}
