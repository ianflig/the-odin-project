export class Renderer {
  constructor() {
    this.startGameBtn = document.querySelector("#start-game-button");
    this.resetGameBtn = document.querySelector("#reset-game-button");
    this.playerOneGameboard = document.querySelector(".player-one-gameboard");
    this.playerTwoGameboard = document.querySelector(".player-two-gameboard");
  }

  bindEvents(actions) {
    this.startGameBtn.addEventListener("click", actions.toStartGame);
    this.resetGameBtn.addEventListener("click", actions.toResetGame);
    this.playerOneGameboard.addEventListener("click", (e) => {
      let element = e.target.closest(".gameboard-cell");
      if (element) {
        actions.toAttackShip(e.dataset.cell);
      }
    });
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

    this.playerOneGameboard.innerHTML = playerOneGameboard;
    this.playerTwoGameboard.innerHTML = playerTwoGameboard;
  }
}
