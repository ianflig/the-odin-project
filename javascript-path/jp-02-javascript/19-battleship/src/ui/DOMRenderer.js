export class Renderer {
  constructor() {
    this.startGameBtn = document.querySelector("#start-game-button");
  }

  bindEvents(actions) {
    this.startGameBtn.addEventListener("click", actions.toStartGame);
  }

  renderGameboards(size) {
    let playerOneGameboard = "";
    let playerTwoGameboard = "";

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        playerOneGameboard += `<div class="gameboard-cell" data-cell="${i},${j}"></div>`;
        playerTwoGameboard += `<div class="gameboard-cell" data-cell="${i},${j}"></div>`;
      }
    }

    document.querySelector(".player-one-gameboard").innerHTML =
      playerOneGameboard;
    document.querySelector(".player-two-gameboard").innerHTML =
      playerTwoGameboard;
  }
}
