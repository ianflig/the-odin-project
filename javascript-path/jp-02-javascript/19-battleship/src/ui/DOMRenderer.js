export class Renderer {
  constructor() {}

  renderGameboards(size) {
    const playerOneGameboard = document.querySelector(".player-one-gameboard");
    const playerTwoGameboard = document.querySelector(".player-two-gameboard");
    for (let i = 0; i < size * size; i++) {
      let div = document.createElement("div");
      div.textContent = "test";
      div.classList.add("gameboard-cell");
      playerOneGameboard.append(div);
      playerTwoGameboard.append(div);
    }
  }
}
