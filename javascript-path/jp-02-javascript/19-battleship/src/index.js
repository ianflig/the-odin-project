import "./css/styles.css";
import { Player } from "./models/Player.js";
import { ScreenController } from "./controllers/ScreenController.js";
import { Renderer } from "./ui/DOMRenderer.js";
import { GameController } from "./controllers/GameController.js";

const game = new GameController();
const renderer = new Renderer();
const screen = new ScreenController(renderer, game);

window.app = screen;
