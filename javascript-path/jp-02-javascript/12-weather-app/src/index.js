import "./css/styles.css";
// import { darkMode } from "./js/darkMode.js";
import { Controller } from "./js/Controller.js";
import { DOMRenderer } from "./js/DOMRenderer.js";
import { ScreenController } from "./js/ScreenController.js";

// new darkMode();
const controller = new Controller();
const renderer = new DOMRenderer();
const screen = new ScreenController(controller, renderer);

window.app = screen;
