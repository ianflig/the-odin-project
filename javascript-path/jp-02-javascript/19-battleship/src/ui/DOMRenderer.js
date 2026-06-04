export class Renderer {
  constructor() {}

  renderGameboards(size) {
    const playerOneGameboard = `<div class="gameboard-cell">test</div>`;
    const playerTwoGameboard = `<div class="gameboard-cell">test</div>`;

    document.querySelector(".player-one-gameboard").innerHTML =
      playerOneGameboard.repeat(size * size);
    document.querySelector(".player-two-gameboard").innerHTML =
      playerTwoGameboard.repeat(size * size);
  }
}
