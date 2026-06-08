export class Renderer {
  constructor() {
    this.startGameBtn = document.querySelector("#start-game-button");
    this.resetGameBtn = document.querySelector("#reset-game-button");
    this.playerOneGameboard = document.querySelector(".player-one-gameboard");
    this.playerTwoGameboard = document.querySelector(".player-two-gameboard");
    this.isComputerPlayingBtn = document.querySelector(
      "#is-computer-playing-button",
    );
    this.isComputerPlayingSpan = document.querySelector(
      "#is-computer-playing-span",
    );
    this.generateRandomShipsPlayerOneBtn = document.querySelector(
      "#generate-random-ships-player-one-button",
    );
    this.generateRandomShipsPlayerTwoBtn = document.querySelector(
      "#generate-random-ships-player-two-button",
    );
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
    this.isComputerPlayingBtn.addEventListener("click", () => {
      let ele = this.isComputerPlayingSpan;
      if (ele.textContent === "No") {
        ele.textContent = "Yes";
        actions.toSetComputerPlayer(true);
        actions.toGenRandomShips(2); // todo
      } else {
        ele.textContent = "No";
        actions.toSetComputerPlayer(false);
      }
    });
    this.generateRandomShipsPlayerOneBtn.addEventListener("click", () => {
      actions.toGenRandomShips(1);
      actions.toRenderRandomShips(1); // todo
    });
    this.generateRandomShipsPlayerTwoBtn.addEventListener("click", () => {
      actions.toGenRandomShips(2);
      actions.toRenderRandomShips(2); // todo
    });
  }

  //player equals to player's gameboard to update
  renderAndLockCell(coords, player, result) {
    let gameboard;

    if (player === 1) {
      gameboard = this.playerOneGameboard;
    } else {
      gameboard = this.playerTwoGameboard;
    }

    let cell = gameboard.querySelector(`[data-cell="${coords}"]`);
    if (!cell) return;

    if (result === "miss") {
      cell.classList.add("miss-shot");
    }
    if (result === "hit" || result === "sunk") {
      cell.classList.add("hit-shot");
    }

    return cell.classList.add("locked-button");
  }

  renderGameboard(player, gameboard, removeShips, size) {
    let playerGameboard = "";

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!removeShips && gameboard[i][j] !== null) {
          playerGameboard += `<div class="gameboard-cell ship" data-cell="${i},${j}"></div>`;
        } else {
          playerGameboard += `<div class="gameboard-cell" data-cell="${i},${j}"></div>`;
        }
      }
    }

    player === 1
      ? (this.playerOneGameboard.innerHTML = playerGameboard)
      : (this.playerTwoGameboard.innerHTML = playerGameboard);
  }

  //player equals to player's gameboard to update
  swapGameboardLock(player) {
    this.playerOneGameboard.classList.remove("locked-button", "button-opacity");
    this.playerTwoGameboard.classList.remove("locked-button", "button-opacity");

    const targetBoard =
      player === 1 ? this.playerOneGameboard : this.playerTwoGameboard;

    targetBoard.classList.add("locked-button", "button-opacity");
  }

  swapLockGenerateRandomShips(value) {
    if (value) {
      this.generateRandomShipsPlayerOneBtn.classList.add(
        "locked-button",
        "button-opacity",
      );
      this.generateRandomShipsPlayerTwoBtn.classList.add(
        "locked-button",
        "button-opacity",
      );
    } else {
      this.generateRandomShipsPlayerOneBtn.classList.remove(
        "locked-button",
        "button-opacity",
      );
      this.generateRandomShipsPlayerTwoBtn.classList.remove(
        "locked-button",
        "button-opacity",
      );
    }
  }

  swapAllGameboardsLock(value) {
    if (value) {
      this.playerOneGameboard.classList.add("locked-button", "button-opacity");
      this.playerTwoGameboard.classList.add("locked-button", "button-opacity");
    } else {
      this.playerOneGameboard.classList.remove(
        "locked-button",
        "button-opacity",
      );
      this.playerTwoGameboard.classList.remove(
        "locked-button",
        "button-opacity",
      );
    }
  }

  unlockGameboards() {
    this.playerOneGameboard.classList.remove("locked-button", "button-opacity");
    this.playerTwoGameboard.classList.remove("locked-button", "button-opacity");
  }

  swapLockComputerButton(value) {
    if (value) {
      this.isComputerPlayingBtn.classList.add(
        "locked-button",
        "button-opacity",
      );
    } else {
      //if game not started and this method is called = reset span textcontent
      this.isComputerPlayingBtn.classList.remove(
        "locked-button",
        "button-opacity",
      );
      this.isComputerPlayingSpan.textContent = "No";
    }
  }
}
