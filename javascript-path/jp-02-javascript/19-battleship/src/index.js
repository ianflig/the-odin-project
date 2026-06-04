import "./css/styles.css";
import { Player } from "./models/Player.js";
import { ScreenController } from "./controllers/ScreenController.js";
import { Renderer } from "./ui/DOMRenderer.js";
import { GameController } from "./controllers/GameController.js";

const playerOne = new Player();
const playerTwo = new Player();
const game = new GameController(playerOne, playerTwo);
const renderer = new Renderer();
const screen = new ScreenController(renderer, game);

window.app = screen;
