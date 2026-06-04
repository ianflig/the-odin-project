import "./css/styles.css";
import { Player } from "./models/Player.js";
import { ScreenController } from "./controllers/ScreenController.js";
import { Renderer } from "./ui/DOMRenderer.js";
import { GameController } from "./controllers/GameController.js";

const playerOne = new Player();
const playerTwo = new Player();

playerOne.gameboard.placeShip(1, [0, 0]);
playerTwo.gameboard.placeShip(3, [0, 0], [0, 1], [0, 2]);
const renderer = new Renderer();
const logic = new GameController(playerOne, playerTwo);
const screen = new ScreenController(renderer, logic);

window.app = screen;
