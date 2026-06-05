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
        actions.toAttackShip(element.dataset.cell);
      }
    });
    this.playerTwoGameboard.addEventListener("click", (e) => {
      let element = e.target.closest(".gameboard-cell");
      if (element) {
        actions.toAttackShip(element.dataset.cell);
      }
    });
  }

  //player equals to player's gameboard to update
  renderCell(coords, player, result) {
    let gameboard;

    if (player === 1) {
      gameboard = this.playerOneGameboard;
    } else {
      gameboard = this.playerTwoGameboard;
    }

    let cell = gameboard.querySelector(`[data-cell="${coords}"]`);
    if (!cell) return;

    if (result === "miss") {
      return cell.classList.add("miss-shot");
    }
    if (result === "hit") {
      return cell.classList.add("hit-shot");
    }
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

  //player equals to player's gameboard to update
  swapGameboardLock(player) {
    this.playerOneGameboard.classList.remove("locked-gameboard");
    this.playerTwoGameboard.classList.remove("locked-gameboard");

    const targetBoard =
      player === 1 ? this.playerOneGameboard : this.playerTwoGameboard;

    targetBoard.classList.add("locked-gameboard");
  }
}
