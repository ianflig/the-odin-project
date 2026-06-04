import "./css/styles.css";
import { Player } from "./models/BattleShipModel.js";
import { ScreenController } from "./controllers/ScreenController.js";
import { Renderer } from "./ui/DOMRenderer.js";

const playerOne = new Player();
const playerTwo = new Player();
const renderer = new Renderer();
const screen = new ScreenController(playerOne, playerTwo, renderer);

window.app = screen;
