import "./css/styles.css";
// import { darkMode } from "./js/darkMode.js";
import { Controller } from "./js/Controller.js";
import { ScreenController } from "./js/ScreenController.js";

// new darkMode();
const controller = new Controller();
const screen = new ScreenController(controller);

window.app = screen;
