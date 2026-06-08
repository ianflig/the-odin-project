import { Gameboard } from "./Gameboard.js";

export class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.nickname;
  }

  setNickname(nickname) {
    this.nickname = nickname;
  }

  getNickname() {
    return this.nickname;
  }
}
