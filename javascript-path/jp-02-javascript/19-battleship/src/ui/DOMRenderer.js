export class Renderer {
  constructor() {
    this.startGameBtn = document.querySelector("#play-game-button");
    this.resetGameBtn = document.querySelector("#reset-game-button");
    this.playerOneGameboard = document.querySelector(".player-one-gameboard");
    this.playerTwoGameboard = document.querySelector(".player-two-gameboard");
    // this.isComputerPlayingBtn = document.querySelector(
    //   "#is-computer-playing-button",
    // );
    // this.isComputerPlayingSpan = document.querySelector(
    //   "#is-computer-playing-span",
    // );
    this.generateRandomShipsPlayerOneBtn = document.querySelector(
      "#generate-random-ships-player-one-button",
    );
    // this.generateRandomShipsPlayerTwoBtn = document.querySelector(
    //   "#generate-random-ships-player-two-button",
    // );
    this.player1NicknameInput = document.querySelector("#player1-input");
    this.player2NicknameInput = document.querySelector("#player2-input");
    this.playerNextTurn = document.querySelector("#current-player");
    this.shipsPreviewPlayerOne = document.querySelector(
      "#ships-preview-player-one",
    );
    this.shipsPreviewPlayerTwo = document.querySelector(
      "#ships-preview-player-two",
    );
  }

  bindEvents(actions) {
    this.startGameBtn.addEventListener("click", () =>
      actions.toStartGame(
        this.player1NicknameInput.value,
        this.player2NicknameInput.value,
      ),
    );
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
    // this.isComputerPlayingBtn.addEventListener("click", () => {
    //   let ele = this.isComputerPlayingSpan;
    //   if (ele.textContent === "No") {
    //     ele.textContent = "Yes";
    //     actions.toSetComputerPlayer(true);
    //     actions.toGenRandomShips(2);
    //   } else {
    //     ele.textContent = "No";
    //     actions.toSetComputerPlayer(false);
    //   }
    // });
    this.generateRandomShipsPlayerOneBtn.addEventListener("click", () => {
      actions.toGenRandomShips(1);
      actions.toRenderRandomShips(1);
      actions.toRenderPreviewShips(1);
    });
    // this.generateRandomShipsPlayerTwoBtn.addEventListener("click", () => {
    //   actions.toGenRandomShips(2);
    //   actions.toRenderRandomShips(2);
    // });
    this.player1NicknameInput.addEventListener("input", () => {
      actions.toSetNickname(1, this.player1NicknameInput.value);
    });
  }

  // todo ->  add live name changing
  displayPlayerNextTurn(nickname) {
    if (nickname) {
      this.playerNextTurn.textContent = nickname + "'s turn";
    } else {
      this.playerNextTurn.textContent = "Press start button to play";
    }
  }

  displayWinner(nickname) {
    this.playerNextTurn.textContent = nickname + " wins!";
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
        if (gameboard) {
          if (!removeShips && gameboard[i][j] !== null) {
            playerGameboard += `<div class="gameboard-cell ship" data-cell="${i},${j}"></div>`;
          } else {
            playerGameboard += `<div class="gameboard-cell" data-cell="${i},${j}"></div>`;
          }
        } else {
          playerGameboard += `<div class="gameboard-cell" data-cell="${i},${j}"></div>`;
        }
      }
    }

    player === 1
      ? (this.playerOneGameboard.innerHTML = playerGameboard)
      : (this.playerTwoGameboard.innerHTML = playerGameboard);
  }

  renderGameboardShipsPreview(player, shipsArr) {
    player === 1
      ? (this.shipsPreviewPlayerOne.innerHTML = "")
      : (this.shipsPreviewPlayerTwo.innerHTML = "");
    shipsArr.forEach((element) => {
      let divContainer = document.createElement("div");
      let shipContainer = "";
      for (let i = 0; i < element.length; i++) {
        shipContainer += `<div class="gameboard-cell ship-preview-cell"></div>`;
      }
      divContainer.classList.add("ship-preview-container");
      divContainer.dataset.id = element.id;
      divContainer.innerHTML = shipContainer;
      player === 1
        ? this.shipsPreviewPlayerOne.append(divContainer)
        : this.shipsPreviewPlayerTwo.append(divContainer);
    });
  }

  renderSunkShipPreview(player, shipsArr) {
    shipsArr.forEach((ele) => {
      if (ele.isSunk()) {
        let playerContainer =
          player === 1
            ? this.shipsPreviewPlayerOne
            : this.shipsPreviewPlayerTwo;
        let target = playerContainer.querySelector(`[data-id="${ele.id}"]`);
        target.classList.add("ship-sunk");
      }
    });
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
      // this.generateRandomShipsPlayerTwoBtn.classList.add(
      //   "locked-button",
      //   "button-opacity",
      // );
    } else {
      this.generateRandomShipsPlayerOneBtn.classList.remove(
        "locked-button",
        "button-opacity",
      );
      // this.generateRandomShipsPlayerTwoBtn.classList.remove(
      //   "locked-button",
      //   "button-opacity",
      // );
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

  // swapLockComputerButton(value) {
  //   if (value) {
  //     this.isComputerPlayingBtn.classList.add(
  //       "locked-button",
  //       "button-opacity",
  //     );
  //   } else {
  //     //if game not started and this method is called = reset span textcontent
  //     this.isComputerPlayingBtn.classList.remove(
  //       "locked-button",
  //       "button-opacity",
  //     );
  //     this.isComputerPlayingSpan.textContent = "No";
  //   }
  // }
}
