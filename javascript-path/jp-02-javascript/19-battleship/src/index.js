import "./css/styles.css";
import { Player } from "./models/BattleShipModel.js";
import { ScreenController } from "./controllers/ScreenController.js";
import { Renderer } from "./ui/DOMRenderer.js";

const playerOne = new Player();
const playerTwo = new Player();
const renderer = new Renderer();
playerOne.gameboard.placeShip(1, [0, 0]);
playerTwo.gameboard.placeShip(3, [0, 0], [0, 1], [0, 2]);
const screen = new ScreenController(playerOne, playerTwo, renderer);

window.app = screen;
