import { formatCoords } from "../utils/helpers.js";
import { GameController } from "./GameController.js";
import { darkMode } from "../ui/darkMode.js";

export class ScreenController {
  constructor(renderer, game) {
    this.renderer = renderer;
    this.game = game;
    this.darkMode = new darkMode();
    this.gameboardSize = 10;

    const actions = {
      toStartGame: (player1Nickname, player2Nickname) => {
        this.startGame(player1Nickname, player2Nickname);
      },
      toResetGame: () => {
        this.resetGame();
      },
      toAttackShip: (coords) => {
        this.attackShip(coords);
      },
      toSetComputerPlayer: (value) => {
        this.setComputerPlayer(value);
      },
      toGenRandomShips: (player) => {
        this.generateRandomShips(player);
      },
      toRenderRandomShips: (player) => {
        this.renderRandomShips(player);
      },
      toSetNickname: (player, nickname) => {
        this.setNickname(player, nickname);
      },
      toRenderPreviewShips: (player) => {
        this.renderPreviewShips(player);
      },
    };

    this.renderer.bindEvents(actions);

    this.init();
  }

  init() {
    this.generateRandomShips(1);
    this.renderRandomShips(1);
    this.renderPreviewShips(1);

    this.generateRandomShips(2);
    // this.renderRandomShips(2); // to future compatibility 2 local players passing the device
    this.renderGameboardOnly(2);
    this.renderPreviewShips(2);

    this.updateTurnDisplay();
  }

  setComputerPlayer(value) {
    this.game.isComputerPlaying = value;
  }

  startGame(player1Nickname, player2Nickname) {
    let gameStatus = this.game.gameStatus;

    if (gameStatus) return;
    this.setComputerPlayer(true);
    this.game.startGame(player1Nickname, player2Nickname);
    this.updateTurnDisplay();
    // this.updateComputerButtonDisplay(); // to future compatibility 2 local players passing the device
    this.updateGenerateRandomShipsDisplay();

    if (this.game.isComputerPlaying) {
      this.updateShipsFromGameboard(2);
      this.generateRandomShips(2);
      this.renderPreviewShips(2);
    } else {
      this.updateShipsFromGameboard(1);
      this.updateShipsFromGameboard(2);
    }
  }

  resetGame() {
    this.game = new GameController();
    this.generateRandomShips(1);
    this.renderRandomShips(1);
    this.renderPreviewShips(1);

    this.generateRandomShips(2);
    // this.generateRandomShips(2); // to future compatibility 2 local players passing the device
    this.renderGameboardOnly(2);
    this.renderPreviewShips(2);

    this.updateTurnDisplay();
    // this.updateComputerButtonDisplay(); // to future compatibility 2 local players passing the device
    this.updateGenerateRandomShipsDisplay();
  }

  attackShip(coords) {
    let coordsFormatted = formatCoords(coords);
    let humanResult = this.game.attackShip(coordsFormatted);

    if (!humanResult) return;

    this.renderer.renderAndLockCell(
      humanResult.coords,
      humanResult.player,
      humanResult.result,
    );
    this.updateTurnDisplay();

    if (humanResult.result === "sunk") {
      this.updatePreviewShip(2);
    }

    if (humanResult.winner) {
      this.updateAllGameboardsLockDisplay(true);
      this.renderer.displayWinner(this.game.getPlayerNickname());
      console.log("Player " + humanResult.winner + " wins");
      return;
    }

    if (this.game.isComputerPlaying && this.game.playerTurn === "computer") {
      this.triggerComputerAttack();
    }
  }

  generateRandomShips(player) {
    player === 1
      ? this.game.generateRandomShips(player)
      : this.game.generateRandomShips(player);
  }

  renderRandomShips(player) {
    const playerOneGameboard = this.game.playerOne.gameboard;
    const playerTwoGameboard = this.game.playerTwo.gameboard;

    if (player === 1) {
      this.renderer.renderGameboard(
        1,
        playerOneGameboard.getGameboard(),
        false,
        this.gameboardSize,
      );
    } else {
      this.renderer.renderGameboard(
        2,
        playerTwoGameboard.getGameboard(),
        false,
        this.gameboardSize,
      );
    }
  }

  renderGameboardOnly(player) {
    this.renderer.renderGameboard(player, undefined, false, this.gameboardSize);
  }

  renderPreviewShips(player) {
    let shipsArr =
      player === 1
        ? this.game.playerOne.gameboard.shipsGenerated
        : this.game.playerTwo.gameboard.shipsGenerated;

    this.renderer.renderGameboardShipsPreview(player, shipsArr);
  }

  // when a ship is sunk, updates preview ship
  updatePreviewShip(player) {
    player === 1
      ? this.renderer.renderSunkShipPreview(
          player,
          this.game.playerOne.gameboard.shipsGenerated,
        )
      : this.renderer.renderSunkShipPreview(
          player,
          this.game.playerTwo.gameboard.shipsGenerated,
        );
  }

  triggerComputerAttack() {
    this.updateAllGameboardsLockDisplay(true);

    setTimeout(() => {
      if (!this.game.gameStatus) {
        return;
      }
      let compResult = this.game.playComputerTurn();

      this.renderer.renderAndLockCell(
        compResult.coords,
        compResult.player,
        compResult.result,
      );

      if (compResult.result === "sunk") {
        this.updatePreviewShip(1);
      }

      this.updateAllGameboardsLockDisplay(false);
      this.updateTurnDisplay();

      if (compResult.winner) {
        this.updateAllGameboardsLockDisplay(true);
        this.renderer.displayWinner(this.game.getPlayerNickname());
        console.log("computer wins");
        return;
      }

      if (this.game.playerTurn === "computer") {
        this.triggerComputerAttack();
      }
    }, 600);
  }

  // remove RENDER of random ships generated
  updateShipsFromGameboard(player) {
    let gameStatus = this.game.gameStatus;

    if (gameStatus) {
      this.renderer.renderGameboard(
        player,
        undefined,
        true,
        this.gameboardSize,
      );
    }
  }

  updateGenerateRandomShipsDisplay() {
    let gameStatus = this.game.gameStatus;
    if (gameStatus) {
      this.renderer.swapLockGenerateRandomShips(true);
    } else {
      this.renderer.swapLockGenerateRandomShips(false);
    }
  }

  updateAllGameboardsLockDisplay(value) {
    return this.renderer.swapAllGameboardsLock(value);
  }

  updateTurnDisplay() {
    let currentPlayer = this.game.playerTurn;
    let currentPlayerNickname = this.game.getPlayerNickname();
    let gameStatus = this.game.gameStatus;

    if (gameStatus) {
      this.renderer.swapGameboardLock(currentPlayer);
      this.renderer.displayPlayerNextTurn(currentPlayerNickname);
    } else {
      this.renderer.unlockGameboards();
      this.renderer.displayPlayerNextTurn("");
    }
  }

  // to future compatibility 2 local players passing the device
  // updateComputerButtonDisplay() {
  //   let gameStatus = this.game.gameStatus;
  //   if (gameStatus) {
  //     this.renderer.swapLockComputerButton(true);
  //   } else {
  //     this.renderer.swapLockComputerButton(false);
  //   }
  // }

  setNickname(player, nickname) {
    player === 1
      ? this.game.playerOne.setNickname(nickname)
      : this.game.playerTwo.setNickname(nickname);
  }

  themeSwitch() {
    this.darkMode.themeSwitcher();
  }
}
