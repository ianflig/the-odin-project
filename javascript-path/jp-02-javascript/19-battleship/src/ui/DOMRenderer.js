export class Renderer {
  constructor() {}

  renderGameboards(size) {
    let playerOneGameboard = "";
    let playerTwoGameboard = "";

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        playerOneGameboard += `<div class="gameboard-cell" data-cell="${i},${j}">test</div>`;
        playerTwoGameboard += `<div class="gameboard-cell" data-cell="${i},${j}">test</div>`;
      }
    }

    document.querySelector(".player-one-gameboard").innerHTML =
      playerOneGameboard;
    document.querySelector(".player-two-gameboard").innerHTML =
      playerTwoGameboard;
  }
}
